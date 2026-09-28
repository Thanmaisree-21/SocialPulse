# Social Media Engagement Agent

A Streamlit prototype that helps a business review social post performance and create evidence-aware content ideas. Pandas processes uploaded post data, Plotly displays measured results, an LLM writes focused recommendations, and Hindsight stores and retrieves persistent brand and performance memories across app restarts.

## Architecture

- `app.py` — Streamlit pages, form handling, charts, and user workflow.
- `src/data_loader.py` — CSV header normalization, validation, incremental history merging, engagement counts, and engagement rates.
- `src/analytics.py` — observed performance summaries, format/topic/weekday patterns, and timing coverage.
- `src/memory.py` — the Hindsight SDK boundary: bank setup, `retain`, and `recall`. There is no local substitute memory store.
- `src/recommender.py` — recalls Hindsight context, combines it with measured data, and calls the Groq Chat Completions API.
- `data/sample_posts.csv` — sample dataset for trying the UI.

The upload → Pandas analysis → Hindsight retain → Hindsight recall → LLM recommendation path keeps historical results available between app sessions. The LLM is not retrained; recommendations adapt to the memory and new data supplied to it.

## Install and configure

Use Python 3.10 or newer. From this project directory:

```bash
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```

Copy `.env.example` to `.env`, then set:

```dotenv
HINDSIGHT_API_KEY=your_hindsight_api_key
HINDSIGHT_BASE_URL=https://api.hindsight.vectorize.io
HINDSIGHT_BANK_ID=social-pulse-demo
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

The Hindsight bank ID should remain stable between runs. Keep `.env` private. Restart Streamlit after changing configuration. The app shows a clear configuration/integration error and does not claim persistence when a Hindsight operation fails. Agent generation also requires a valid LLM key/model and reachable service.

Hindsight's official Python SDK and operation reference: [Hindsight Python SDK](https://docs.hindsight.vectorize.io/python-sdk/). LLM requests use Groq's official API SDK: [Groq Console](https://console.groq.com).

## Run

```bash
streamlit run app.py
```

Use **Brand profile** to save the brand and audience details. The sample dataset is loaded when the app starts. In **Upload posts**, the first CSV replaces that demo data; later CSV uploads add new rows to the loaded history (duplicate date/text/type rows are skipped). The app validates and analyzes the data, then submits new post-level results and an analysis summary to Hindsight. In **AI recommendations**, request ideas and inspect the actual Hindsight recall results shown alongside the answer. Publish externally, then upload the new result row and any user feedback to update future context. Hindsight may need a short time to process newly retained memories.

CSV columns (header capitalization is flexible; common post-text/date/type aliases are supported):

```text
Post text, Post date, Post type, Likes, Comments, Shares, Impressions
```

Dates must parse as dates. Engagement fields must be non-negative numbers; blank counts mean zero. Invalid required data is reported with row information instead of silently dropped or converted. A date-only CSV does not provide evidence for a best posting hour.

## Three-minute demonstration

Before the demo, install dependencies and configure working Hindsight and Groq credentials in `.env`.

1. **0:00–0:30 — Brand:** In Brand profile, set “Bloom & Co.”, “Wellness”, “Busy wellness-minded professionals”, “Warm and encouraging”, and Instagram. Save to show the Hindsight retain confirmation.
2. **0:30–1:00 — History:** Load or upload `data/sample_posts.csv`. Show the post count and measured engagement chart, then the message confirming Hindsight accepted the posts and analysis.
3. **1:00–1:50 — Recommendation:** Ask for two ideas that encourage saves and comments. Show the returned Hindsight memories, the recommendation’s specific post-count/metric evidence, and its note that date-only data cannot establish a posting hour.
4. **1:50–2:30 — New result:** Upload a one-row CSV for a newly published post with all required columns. Add a short note such as “This guide was based on the saved routine recommendation; several followers asked for a shorter checklist.” Show that the result and note were submitted to Hindsight.
5. **2:30–3:00 — Learning:** Request another recommendation and point to any newly recalled result or feedback in the displayed memory list. Compare how the new idea accounts for the added evidence. Avoid promising a specific change: retrieval relevance depends on Hindsight's results and the selected request.

The demo uses real configured services for memory and generation. Without credentials or service access, the application surfaces errors rather than simulating a successful retain or recall.
