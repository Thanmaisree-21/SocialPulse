"""Hindsight-backed persistent memory operations for Social Pulse.

This module contains no local memory store. Streamlit may cache the SDK client,
but all retained information is sent to the configured Hindsight bank.
"""

from __future__ import annotations

import os
from datetime import datetime, timezone
from functools import lru_cache
from typing import Any

from dotenv import load_dotenv

load_dotenv()


class HindsightConfigurationError(RuntimeError):
    """Raised when Hindsight cannot be configured or reached."""


def _settings() -> tuple[str, str, str]:
    api_key = os.getenv("HINDSIGHT_API_KEY", "").strip()
    base_url = os.getenv("HINDSIGHT_BASE_URL", "https://api.hindsight.vectorize.io").strip()
    bank_id = os.getenv("HINDSIGHT_BANK_ID", "social-pulse-demo").strip()
    if not api_key:
        raise HindsightConfigurationError(
            "Hindsight is not configured. Set HINDSIGHT_API_KEY in a local .env "
            "file (copy .env.example), and optionally set HINDSIGHT_BASE_URL and "
            "HINDSIGHT_BANK_ID. Restart Streamlit after changing the environment."
        )
    if not base_url or not bank_id:
        raise HindsightConfigurationError(
            "HINDSIGHT_BASE_URL and HINDSIGHT_BANK_ID must both be non-empty. "
            "Set them in .env and restart Streamlit."
        )
    return base_url.rstrip("/"), api_key, bank_id


@lru_cache(maxsize=1)
def _client_for_config(base_url: str, api_key: str):
    try:
        from hindsight_client import Hindsight
    except ImportError as exc:
        raise HindsightConfigurationError(
            "The Hindsight SDK is not installed. Run `pip install -r requirements.txt` "
            "in the project environment, then restart Streamlit."
        ) from exc
    try:
        return Hindsight(base_url=base_url, api_key=api_key)
    except Exception as exc:
        raise HindsightConfigurationError(f"Could not initialize the Hindsight client: {exc}") from exc


def get_client_and_bank():
    """Return the SDK client and stable bank ID, ensuring the bank is usable."""
    base_url, api_key, bank_id = _settings()
    client = _client_for_config(base_url, api_key)
    _ensure_bank(base_url, api_key, bank_id)
    return client, bank_id


@lru_cache(maxsize=8)
def _ensure_bank(base_url: str, api_key: str, bank_id: str) -> None:
    client = _client_for_config(base_url, api_key)
    try:
        client.create_bank(
            bank_id=bank_id,
            name="Social Pulse — Brand Memory",
            background="Persistent brand, social content performance, audience feedback, and recommendation context.",
        )
    except Exception as create_error:
        # A stable bank already exists after a restart. Verify access by querying it;
        # do not treat a failed create call by itself as successful configuration.
        try:
            client.recall(bank_id=bank_id, query="Social Pulse memory bank connection check")
        except Exception as verify_error:
            raise HindsightConfigurationError(
                f"Could not create or access Hindsight bank '{bank_id}'. "
                f"Check the API key, base URL, bank ID, and Hindsight account access. "
                f"Details: {verify_error}"
            ) from create_error


def retain_memory(content: str, *, context: str, metadata: dict[str, Any] | None = None) -> None:
    """Submit one memory to Hindsight. Raises unless the SDK call succeeds."""
    client, bank_id = get_client_and_bank()
    if not content.strip():
        raise ValueError("Cannot retain empty content in Hindsight.")
    try:
        safe_metadata = {str(k): str(v) for k, v in (metadata or {}).items()}
        client.retain(
            bank_id=bank_id,
            content=content,
            context=context,
            timestamp=datetime.now(timezone.utc),
            metadata=safe_metadata,
        )
    except Exception as exc:
        raise HindsightConfigurationError(f"Hindsight retain failed: {exc}") from exc


def recall_memories(query: str) -> list[str]:
    """Recall relevant Hindsight memories for the supplied natural-language query."""
    client, bank_id = get_client_and_bank()
    try:
        result = client.recall(bank_id=bank_id, query=query, budget="mid")
    except Exception as exc:
        raise HindsightConfigurationError(f"Hindsight recall failed: {exc}") from exc
    return [item.text for item in (result.results or []) if getattr(item, "text", "").strip()]


def remember_brand_profile(profile: dict[str, str]) -> None:
    content = (
        f"Brand profile for {profile['name']}: industry {profile['industry']}; "
        f"target audience {profile['audience']}; brand tone {profile['tone']}; "
        f"main social platform {profile['platform']}."
    )
    retain_memory(content, context="brand profile and audience", metadata={"record_type": "brand_profile"})


def remember_post(row: dict[str, Any], brand_name: str) -> None:
    content = (
        f"{brand_name} published a {row['Post type']} post on {row['Post date']}: "
        f"{row['Post text']} Engagement results: {int(row['Likes'])} likes, "
        f"{int(row['Comments'])} comments, {int(row['Shares'])} shares, "
        f"{int(row['Impressions'])} impressions, {int(row['Engagements'])} total engagements, "
        f"{float(row['Engagement rate']):.2f}% engagement rate."
    )
    retain_memory(
        content,
        context="social media post and engagement results",
        metadata={"record_type": "post_performance", "post_type": str(row["Post type"])},
    )


def remember_audience_signal(signal: str, *, brand_name: str) -> None:
    retain_memory(
        f"Performance-based audience signal for {brand_name}: {signal}",
        context="inferred audience preferences from post performance",
        metadata={"record_type": "audience_preference_signal"},
    )


def remember_performance_analysis(
    analysis: dict[str, Any], *, brand_name: str, user_note: str = ""
) -> None:
    """Retain observed patterns from a newly analyzed upload for later learning."""
    overall = analysis.get("overall", {})
    format_lines = [
        f"{item['post_type']}: {item['posts']} post(s), mean engagement rate "
        f"{item['mean_engagement_rate_pct']:.2f}%, mean shares {item['mean_shares']:.1f}"
        for item in analysis.get("post_type_patterns", [])
    ]
    topic_lines = [
        f"keyword '{item['topic_keyword']}': {item['posts']} post(s), mean engagement rate "
        f"{item['mean_engagement_rate_pct']:.2f}%"
        for item in analysis.get("topic_patterns", [])[:8]
    ]
    weekday_lines = [
        f"{item['weekday']}: {item['posts']} post(s), mean engagement rate {item['mean_engagement_rate_pct']:.2f}%"
        for item in analysis.get("weekday_patterns", [])
    ]
    hour_lines = [
        f"hour {item['hour_24']}: {item['posts']} post(s), mean engagement rate {item['mean_engagement_rate_pct']:.2f}%"
        for item in analysis.get("posting_time_patterns", [])
    ]
    parts = [
        f"Analysis update for {brand_name}: {analysis.get('post_count', 0)} post(s) in the newly supplied dataset.",
        f"Overall observed data: {overall}.",
        "Post format results: " + ("; ".join(format_lines) if format_lines else "not enough categorized posts"),
        "Caption keyword proxies (not verified semantic topics): " + ("; ".join(topic_lines) if topic_lines else "no recurring keywords"),
        "Observed weekdays: " + ("; ".join(weekday_lines) if weekday_lines else "none"),
        "Observed hours: " + ("; ".join(hour_lines) if hour_lines else "no time-of-day data"),
        f"Timing coverage: {analysis.get('timing_limit', 'unknown')}",
        f"Sample limitations: {analysis.get('data_sufficiency', 'unknown')}",
    ]
    if user_note.strip():
        parts.append(f"User-provided result context or audience feedback: {user_note.strip()}")
    retain_memory(
        " ".join(parts),
        context="new social media performance analysis and learning update",
        metadata={"record_type": "performance_learning_update", "post_count": analysis.get("post_count", 0)},
    )


def remember_recommendation(recommendation: str, *, brand_name: str, question: str) -> None:
    retain_memory(
        f"The agent recommended this for {brand_name} in response to '{question}': {recommendation}",
        context="previous content recommendation",
        metadata={"record_type": "agent_recommendation"},
    )


def remember_feedback(feedback: str, *, brand_name: str) -> None:
    retain_memory(
        f"User feedback from {brand_name}: {feedback}",
        context="user feedback and audience interaction",
        metadata={"record_type": "user_feedback"},
    )
