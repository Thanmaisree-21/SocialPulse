"""Evidence summaries for the engagement agent.

All claims in this module are derived from the supplied post DataFrame. It does
not infer time-of-day from date-only values and carries sample counts forward so
the LLM can distinguish a small signal from a repeated pattern.
"""

from __future__ import annotations

import re
from collections import defaultdict
from typing import Any

import pandas as pd

STOP_WORDS = {
    "about", "after", "again", "also", "and", "are", "because", "been", "before", "being",
    "between", "both", "but", "can", "could", "did", "does", "doing", "down", "each", "for",
    "from", "get", "got", "had", "has", "have", "here", "how", "into", "its", "just", "like",
    "made", "make", "many", "more", "most", "much", "our", "out", "over", "own", "same", "she",
    "should", "some", "such", "than", "that", "the", "their", "them", "then", "there", "these",
    "they", "this", "those", "through", "too", "under", "very", "was", "were", "what", "when",
    "where", "which", "while", "who", "will", "with", "would", "you", "your", "post", "posts",
    "https", "http", "www", "com",
}


def _clean_number(value: Any) -> float:
    try:
        number = float(value)
        return number if pd.notna(number) else 0.0
    except (TypeError, ValueError):
        return 0.0


def build_evidence_summary(posts: pd.DataFrame) -> dict[str, Any]:
    """Summarize only observed post data, including counts and timing coverage."""
    if posts is None or posts.empty:
        return {
            "data_sufficiency": "No historical posts are available.",
            "post_count": 0,
            "overall": {},
            "post_type_patterns": [],
            "topic_patterns": [],
            "weekday_patterns": [],
            "posting_time_patterns": [],
            "timing_limit": "No historical posting dates or times are available.",
            "sample_posts": [],
        }

    frame = posts.copy()
    if "Engagements" not in frame:
        frame["Engagements"] = frame[["Likes", "Comments", "Shares"]].sum(axis=1)
    if "Engagement rate" not in frame:
        impressions = pd.to_numeric(frame["Impressions"], errors="coerce").fillna(0)
        frame["Engagement rate"] = (frame["Engagements"] / impressions.where(impressions > 0) * 100).fillna(0)
    frame["Post date"] = pd.to_datetime(frame["Post date"], errors="coerce")
    frame = frame.dropna(subset=["Post date"])
    n_posts = len(frame)
    if n_posts == 0:
        return build_evidence_summary(pd.DataFrame())

    mean_rate = _clean_number(frame["Engagement rate"].mean())
    total_impressions = _clean_number(frame["Impressions"].sum())
    overall = {
        "mean_engagement_rate_pct": round(mean_rate, 2),
        "weighted_engagement_rate_pct": round(_clean_number(frame["Engagements"].sum()) / total_impressions * 100, 2) if total_impressions else None,
        "mean_likes": round(_clean_number(frame["Likes"].mean()), 1),
        "mean_comments": round(_clean_number(frame["Comments"].mean()), 1),
        "mean_shares": round(_clean_number(frame["Shares"].mean()), 1),
        "total_impressions": int(total_impressions),
    }

    type_patterns = []
    for post_type, group in frame.groupby("Post type", dropna=False):
        type_patterns.append({
            "post_type": str(post_type),
            "posts": int(len(group)),
            "mean_engagement_rate_pct": round(_clean_number(group["Engagement rate"].mean()), 2),
            "mean_shares": round(_clean_number(group["Shares"].mean()), 1),
            "mean_comments": round(_clean_number(group["Comments"].mean()), 1),
        })
    type_patterns.sort(key=lambda entry: entry["mean_engagement_rate_pct"], reverse=True)

    token_stats: dict[str, dict[str, float]] = defaultdict(
        lambda: {"posts": 0, "rate_sum": 0.0, "shares_sum": 0.0, "comments_sum": 0.0, "likes_sum": 0.0}
    )
    for _, row in frame.iterrows():
        text = str(row.get("Post text", "")).lower()
        tokens = {token for token in re.findall(r"[a-zA-Z][a-zA-Z0-9']{2,}", text) if token not in STOP_WORDS}
        for token in tokens:
            token_stats[token]["posts"] += 1
            token_stats[token]["rate_sum"] += _clean_number(row["Engagement rate"])
            token_stats[token]["shares_sum"] += _clean_number(row["Shares"])
            token_stats[token]["comments_sum"] += _clean_number(row["Comments"])
            token_stats[token]["likes_sum"] += _clean_number(row["Likes"])
    topic_patterns = [
        {
            "topic_keyword": word,
            "posts": int(stats["posts"]),
            "mean_engagement_rate_pct": round(stats["rate_sum"] / stats["posts"], 2),
            "mean_shares": round(stats["shares_sum"] / stats["posts"], 1),
            "mean_comments": round(stats["comments_sum"] / stats["posts"], 1),
            "mean_likes": round(stats["likes_sum"] / stats["posts"], 1),
            "evidence_note": "A repeated keyword is only a rough topic proxy; review the post examples before treating it as a theme.",
        }
        for word, stats in sorted(
            token_stats.items(),
            key=lambda pair: (
                pair[1]["posts"] >= 2,
                pair[1]["posts"],
                pair[1]["rate_sum"] / pair[1]["posts"],
            ),
            reverse=True,
        )[:10]
    ]

    weekday_frame = frame.assign(weekday=frame["Post date"].dt.day_name())
    weekday_patterns = [
        {"weekday": str(day), "posts": int(len(group)), "mean_engagement_rate_pct": round(_clean_number(group["Engagement rate"].mean()), 2)}
        for day, group in weekday_frame.groupby("weekday")
    ]
    weekday_patterns.sort(key=lambda entry: entry["mean_engagement_rate_pct"], reverse=True)

    # A timestamp at midnight is indistinguishable from date-only data. Require
    # at least one non-midnight value before reporting observed hours.
    has_time_values = ((frame["Post date"].dt.hour != 0) | (frame["Post date"].dt.minute != 0)).any()
    posting_time_patterns = []
    if has_time_values:
        by_hour = frame.assign(hour=frame["Post date"].dt.hour).groupby("hour")
        posting_time_patterns = [
            {"hour_24": int(hour), "posts": int(len(group)), "mean_engagement_rate_pct": round(_clean_number(group["Engagement rate"].mean()), 2)}
            for hour, group in by_hour
        ]
        posting_time_patterns.sort(key=lambda entry: entry["mean_engagement_rate_pct"], reverse=True)
        timing_limit = "Time-of-day values were present in the supplied timestamps; each hour still has the shown sample count."
    else:
        timing_limit = "Post dates contain no time-of-day information, so no best posting hour can be inferred."

    if "Saves" in frame.columns:
        overall["mean_saves"] = round(_clean_number(frame["Saves"].mean()), 1)
        overall["total_saves"] = int(_clean_number(frame["Saves"].sum()))

    category_patterns = []
    if "Category" in frame.columns and frame["Category"].notna().any():
        for cat, group in frame.groupby("Category"):
            category_patterns.append({
                "category": str(cat),
                "posts": int(len(group)),
                "mean_engagement_rate_pct": round(_clean_number(group["Engagement rate"].mean()), 2),
                "mean_shares": round(_clean_number(group["Shares"].mean()), 1),
                "mean_comments": round(_clean_number(group["Comments"].mean()), 1),
            })
        category_patterns.sort(key=lambda x: x["mean_engagement_rate_pct"], reverse=True)

    destination_patterns = []
    if "Destination" in frame.columns and frame["Destination"].notna().any():
        for dest, group in frame.groupby("Destination"):
            destination_patterns.append({
                "destination": str(dest),
                "posts": int(len(group)),
                "mean_engagement_rate_pct": round(_clean_number(group["Engagement rate"].mean()), 2),
                "mean_saves": round(_clean_number(group["Saves"].mean()), 1) if "Saves" in group else 0,
            })
        destination_patterns.sort(key=lambda x: x["mean_engagement_rate_pct"], reverse=True)

    examples = []
    for _, row in frame.sort_values("Engagement rate", ascending=False).head(5).iterrows():
        example_dict = {
            "date": row["Post date"].isoformat(),
            "post_type": str(row["Post type"]),
            "post_text": str(row["Post text"])[:500],
            "engagement_rate_pct": round(_clean_number(row["Engagement rate"]), 2),
            "likes": int(_clean_number(row["Likes"])),
            "comments": int(_clean_number(row["Comments"])),
            "shares": int(_clean_number(row["Shares"])),
            "impressions": int(_clean_number(row["Impressions"])),
        }
        if "Destination" in row and pd.notna(row["Destination"]):
            example_dict["destination"] = str(row["Destination"])
        if "Category" in row and pd.notna(row["Category"]):
            example_dict["category"] = str(row["Category"])
        if "Saves" in row and pd.notna(row["Saves"]):
            example_dict["saves"] = int(_clean_number(row["Saves"]))
        examples.append(example_dict)
        
    return {
        "data_sufficiency": f"{n_posts} historical post(s). Treat individual formats/topics as preliminary when they have fewer than 3 examples.",
        "post_count": n_posts,
        "overall": overall,
        "post_type_patterns": type_patterns,
        "topic_patterns": topic_patterns,
        "category_patterns": category_patterns,
        "destination_patterns": destination_patterns,
        "weekday_patterns": weekday_patterns,
        "posting_time_patterns": posting_time_patterns,
        "timing_limit": timing_limit,
        "sample_posts": examples,
    }
