"""CLI runner to execute the Social Pulse Engagement Agent directly."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
import pandas as pd
from dotenv import load_dotenv

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from src.data_loader import normalize_posts
from src.analytics import build_evidence_summary
from src.recommender import generate_recommendation, AgentConfigurationError
from src.memory import HindsightConfigurationError

load_dotenv()


def main():
    parser = argparse.ArgumentParser(description="Execute the Social Pulse Content Recommender Agent.")
    parser.add_argument("--data", default="data/sample_posts.csv", help="Path to posts CSV file (default: data/sample_posts.csv)")
    parser.add_argument("--request", default="Suggest 3 evidence-aware content ideas for next week with captions.", help="Agent prompt/request")
    parser.add_argument("--no-memory", action="store_true", help="Bypass Hindsight memory recall")
    args = parser.parse_args()

    data_path = Path(args.data)
    if not data_path.exists():
        print(f"Error: Data file not found: {data_path}", file=sys.stderr)
        sys.exit(1)

    print(f"=== Loading and Normalizing Posts ({data_path}) ===")
    df = normalize_posts(pd.read_csv(data_path))
    print(f"Loaded {len(df)} posts successfully.\n")

    print("=== Generating Historical Evidence Summary ===")
    evidence = build_evidence_summary(df)
    print(f"Post Count: {evidence['post_count']}")
    print(f"Mean Engagement Rate: {evidence['overall'].get('mean_engagement_rate_pct')}%\n")

    brand = {
        "name": "Wanderlust Chronicles",
        "industry": "Travel & Exploration",
        "audience": "Independent travelers, weekend explorers, and adventure seekers looking for authentic itineraries, destination guides, and budget tips",
        "tone": "Inspiring, practical, and adventure-seeking",
        "platform": "Instagram & YouTube",
    }

    print("=== Executing Agent ===")
    print(f"Brand: {brand['name']} ({brand['platform']})")
    print(f"User Request: {args.request}")
    print(f"Memory Mode: {'No Hindsight (Baseline)' if args.no_memory else 'Hindsight Memory Enabled'}\n")

    try:
        result = generate_recommendation(
            brand=brand,
            posts=df,
            user_request=args.request,
            use_hindsight_memory=not args.no_memory,
        )
        print("=== Recommendation Output ===")
        print(result["text"])
        print(f"\nRecalled Memories: {len(result['memories'])}")
        print(f"Model: {result['model']}")
    except (HindsightConfigurationError, AgentConfigurationError) as exc:
        print(f"[Configuration Required] {exc}", file=sys.stderr)
        print("\nPlease update your .env file with your API keys:", file=sys.stderr)
        print("  - GROQ_API_KEY", file=sys.stderr)
        print("  - HINDSIGHT_API_KEY (optional if running with --no-memory)", file=sys.stderr)


if __name__ == "__main__":
    main()
