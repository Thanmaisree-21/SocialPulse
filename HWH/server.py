"""HTTP Server for Social Pulse: serves modern SPA and provides live AI Agent API endpoints."""

from __future__ import annotations

import json
import os
import sys
import traceback
from http.server import HTTPServer, SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

import pandas as pd
from dotenv import load_dotenv

load_dotenv()

# Add project root to sys.path
BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from src.data_loader import normalize_posts
from src.recommender import chat_with_agent, generate_recommendation

# Global brand configuration
BRAND_PROFILE = {
    "name": "Wanderlust Chronicles",
    "handle": "wanderlust.chronicles",
    "industry": "Travel & Cultural Exploration",
    "audience": "Independent travelers, weekend explorers, and adventure seekers looking for authentic itineraries, destination guides, and budget tips",
    "tone": "Inspiring, practical, and adventure-seeking",
    "platform": "Instagram & YouTube",
}

# Image mapping by keyword and format
IMAGE_MAP = {
    "kashmir": "assets/kashmir_preview.jpg",
    "bali": "assets/bali_preview.jpg",
    "goa": "assets/goa_preview.jpg",
    "ladakh": "assets/ladakh_preview.jpg",
    "manali": "assets/manali_preview.jpg",
    "singapore": "assets/singapore_preview.jpg",
    "hampi": "assets/hampi_preview.jpg",
    "default": "assets/studio_preview.jpg",
}


def load_dataset() -> pd.DataFrame:
    for path in [BASE_DIR / "data" / "posts.csv", BASE_DIR / "data" / "sample_posts.csv"]:
        if path.exists():
            try:
                raw = pd.read_csv(path)
                if not raw.empty:
                    return normalize_posts(raw)
            except Exception:
                pass
    return pd.DataFrame()


class SocialPulseHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self._send_cors_headers()
            self.end_headers()
            posts = load_dataset()
            status_data = {
                "status": "online",
                "brand": BRAND_PROFILE["name"],
                "posts_analyzed": len(posts),
                "model": os.getenv("GROQ_MODEL", "openai/gpt-oss-120b"),
                "hindsight_bank": os.getenv("HINDSIGHT_BANK_ID", "social-pulse-demo"),
            }
            self.wfile.write(json.dumps(status_data).encode("utf-8"))
            return

        # Serve static assets
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"

        try:
            payload = json.loads(body) if body else {}
        except Exception:
            payload = {}

        if parsed.path == "/api/chat":
            self._handle_chat(payload)
        elif parsed.path == "/api/generate":
            self._handle_generate(payload)
        else:
            self.send_response(404)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

    def _handle_chat(self, payload: dict):
        message = str(payload.get("message", "")).strip()
        history = payload.get("history", [])
        current_format = str(payload.get("format", "carousel")).lower()

        posts = load_dataset()
        if posts.empty:
            self._send_json_error("Historical posts dataset could not be loaded from data/posts.csv.")
            return

        try:
            res = chat_with_agent(
                brand=BRAND_PROFILE,
                posts=posts,
                user_message=message,
                conversation_history=history,
                current_format=current_format,
                use_hindsight_memory=True,
            )

            # Resolve local image paths for mockup if available
            mockup = res.get("mockup")
            if mockup:
                kw = str(mockup.get("image_keyword", "default")).lower()
                mockup["image"] = IMAGE_MAP.get(kw, IMAGE_MAP["default"])
                # Resolve slide images if carousel
                if "slides" in mockup and isinstance(mockup["slides"], list):
                    for s in mockup["slides"]:
                        skw = str(s.get("image_keyword", kw)).lower()
                        s["image"] = IMAGE_MAP.get(skw, mockup["image"])

            response_data = {
                "success": True,
                "reply": res["reply"],
                "mockup": mockup,
                "memories": res.get("memories", []),
            }
            self._send_json_success(response_data)
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError, OSError):
            pass
        except Exception as exc:
            traceback.print_exc()
            self._send_json_error(f"Agent failed to respond: {exc}")

    def _handle_generate(self, payload: dict):
        current_format = str(payload.get("format", "carousel")).lower()
        goal = str(payload.get("goal", "boost-comments")).lower()
        prompt = str(payload.get("prompt", "")).strip()

        request_text = prompt or f"Generate a high-impact {current_format} post for {goal} based on our travel performance."
        posts = load_dataset()

        try:
            res = chat_with_agent(
                brand=BRAND_PROFILE,
                posts=posts,
                user_message=request_text,
                current_format=current_format,
                use_hindsight_memory=True,
            )
            mockup = res.get("mockup")
            if mockup:
                kw = str(mockup.get("image_keyword", "default")).lower()
                mockup["image"] = IMAGE_MAP.get(kw, IMAGE_MAP["default"])
                if "slides" in mockup and isinstance(mockup["slides"], list):
                    for s in mockup["slides"]:
                        skw = str(s.get("image_keyword", kw)).lower()
                        s["image"] = IMAGE_MAP.get(skw, mockup["image"])

            self._send_json_success({
                "success": True,
                "reply": res["reply"],
                "mockup": mockup,
                "memories": res.get("memories", []),
            })
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError, OSError):
            pass
        except Exception as exc:
            traceback.print_exc()
            self._send_json_error(f"Generation failed: {exc}")

    def _send_json_success(self, data: dict):
        try:
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError, OSError):
            pass

    def _send_json_error(self, message: str, code: int = 200):
        try:
            self.send_response(code)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"success": False, "error": message}, ensure_ascii=False).encode("utf-8"))
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError, OSError):
            pass


def run(port: int = 8080):
    server_address = ("", port)
    httpd = ThreadingHTTPServer(server_address, SocialPulseHandler)
    print(f"Social Pulse Agent Server running at http://localhost:{port}/")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        httpd.server_close()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    run(port)
