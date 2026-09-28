"""CSV schema normalization and validation for post-performance data."""

from __future__ import annotations

import pandas as pd

REQUIRED_POST_COLUMNS = [
    "Post text", "Post date", "Post type", "Likes", "Comments", "Shares", "Impressions",
]

ALIASES = {
    "post text": "Post text", "post_text": "Post text", "caption": "Post text",
    "caption_or_topic": "Post text", "topic": "Post text",
    "post date": "Post date", "post_date": "Post date", "date": "Post date",
    "post type": "Post type", "post_type": "Post type", "type": "Post type",
    "content_type": "Post type", "content type": "Post type",
    "likes": "Likes", "comments": "Comments", "shares": "Shares",
    "impressions": "Impressions", "views": "Impressions", "view count": "Impressions",
    "saves": "Saves", "platform": "Platform", "destination": "Destination",
    "content_category": "Category", "category": "Category",
}


def normalize_posts(raw: pd.DataFrame) -> pd.DataFrame:
    """Normalize accepted header aliases and reject rows with corrupt required data.

    Blank engagement counts are treated as zero. Non-empty non-numeric counts,
    negative counts, missing required columns, and invalid post dates are errors
    rather than silently becoming misleading engagement results.
    """
    if raw is None or raw.empty:
        raise ValueError("The CSV contains no data rows.")

    normalized_names = [ALIASES.get(str(column).strip().lower(), str(column).strip()) for column in raw.columns]
    duplicates = sorted({name for name in normalized_names if normalized_names.count(name) > 1})
    if duplicates:
        raise ValueError("The CSV contains duplicate columns after header normalization: " + ", ".join(duplicates))
    frame = raw.copy()
    frame.columns = normalized_names

    missing = [column for column in REQUIRED_POST_COLUMNS if column not in frame.columns]
    if missing:
        raise ValueError("Missing required columns: " + ", ".join(missing))
    
    # Retain required columns and any recognized rich metadata columns (Destination, Category, Platform, Saves)
    extra_cols = [c for c in frame.columns if c not in REQUIRED_POST_COLUMNS and c in ["Destination", "Category", "Platform", "Saves"]]
    frame = frame[REQUIRED_POST_COLUMNS + extra_cols].copy()

    frame["Post date"] = pd.to_datetime(frame["Post date"], errors="coerce", format="mixed", dayfirst=True)
    invalid_dates = frame["Post date"].isna()
    if invalid_dates.any():
        invalid_rows = [position + 2 for position, invalid in enumerate(invalid_dates.tolist()) if invalid]
        rows = ", ".join(map(str, invalid_rows[:8]))
        extra = "…" if len(invalid_rows) > 8 else ""
        raise ValueError(f"{int(invalid_dates.sum())} row(s) have a blank or invalid post date (CSV row(s): {rows}{extra}).")

    numeric_cols = ["Likes", "Comments", "Shares", "Impressions"]
    if "Saves" in frame.columns:
        numeric_cols.append("Saves")

    for column in numeric_cols:
        original = frame[column]
        parsed = pd.to_numeric(original, errors="coerce")
        invalid = original.notna() & original.astype(str).str.strip().ne("") & parsed.isna()
        if invalid.any():
            invalid_rows = [position + 2 for position, is_invalid in enumerate(invalid.tolist()) if is_invalid]
            rows = ", ".join(map(str, invalid_rows[:8]))
            extra = "…" if len(invalid_rows) > 8 else ""
            raise ValueError(f"Column '{column}' has non-numeric value(s) in CSV row(s): {rows}{extra}.")
        parsed = parsed.fillna(0)
        negative = parsed < 0
        if negative.any():
            invalid_rows = [position + 2 for position, is_negative in enumerate(negative.tolist()) if is_negative]
            rows = ", ".join(map(str, invalid_rows[:8]))
            extra = "…" if len(invalid_rows) > 8 else ""
            raise ValueError(f"Column '{column}' cannot contain negative counts (CSV row(s): {rows}{extra}).")
        frame[column] = parsed

    frame["Post text"] = frame["Post text"].fillna("").astype(str).str.strip()
    blank_text = frame["Post text"].eq("")
    if blank_text.any():
        invalid_rows = [position + 2 for position, is_blank in enumerate(blank_text.tolist()) if is_blank]
        rows = ", ".join(map(str, invalid_rows[:8]))
        extra = "…" if len(invalid_rows) > 8 else ""
        raise ValueError(f"Post text is blank in CSV row(s): {rows}{extra}.")
    frame["Post type"] = frame["Post type"].fillna("Other").astype(str).str.strip().replace("", "Other")
    
    # Calculate engagements (including Saves if present)
    engagement_components = ["Likes", "Comments", "Shares"]
    if "Saves" in frame.columns:
        engagement_components.append("Saves")
    frame["Engagements"] = frame[engagement_components].sum(axis=1)
    impressions = frame["Impressions"].where(frame["Impressions"] > 0)
    frame["Engagement rate"] = (frame["Engagements"] / impressions * 100).fillna(0.0)
    return frame.sort_values("Post date").reset_index(drop=True)


def append_new_posts(existing: pd.DataFrame, incoming: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Append posts with new date/text/type identities, returning combined and new rows.

    The post identity is intentionally simple for this prototype. It prevents a
    repeated full-history CSV from inflating charts or creating duplicate memories.
    """
    identity = ["Post date", "Post text", "Post type"]
    existing = existing.copy() if existing is not None else pd.DataFrame(columns=incoming.columns)
    seen = set(map(tuple, existing[identity].astype(str).to_numpy())) if not existing.empty else set()
    new_mask = []
    for values in incoming[identity].astype(str).to_numpy():
        key = tuple(values)
        new_mask.append(key not in seen)
        seen.add(key)
    new_rows = incoming.loc[new_mask].copy()
    combined = pd.concat([existing, new_rows], ignore_index=True)
    if not combined.empty:
        combined = combined.sort_values("Post date").reset_index(drop=True)
    return combined, new_rows
