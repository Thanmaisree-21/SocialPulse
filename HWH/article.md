# Why I Store Results, Not Just Preferences, in Hindsight

A recommendation that says “your audience likes carousels” sounds useful right up until I ask what that conclusion is based on. I wanted Social Pulse to carry evidence forward between sessions without turning a small set of post metrics into a permanent, overconfident persona.

## The system I wanted to build

Social Pulse helps a brand review social-post performance and plan what to publish next. A user uploads a CSV of post text, dates, formats, and engagement counts. The application validates and normalizes those rows, calculates performance metrics, and builds an evidence summary. It can then combine that current analysis with relevant history recalled from Hindsight to generate practical content ideas.

The pieces have distinct jobs. Pandas and the analytics module calculate what the loaded dataset says. Hindsight retains durable context across sessions: post-level outcomes, analysis updates, brand details, feedback, and past recommendations. The language model turns the supplied evidence into a response. It does not update its weights or “learn” by retraining after each upload.

That boundary is the central design decision. I don’t want a model to receive one unqualified sentence like “the audience prefers reels” when the underlying evidence is three posts, two of them published during a campaign. I want it to have the observations, their counts, and the caveats that make those observations interpretable.

## Why outcomes belong in memory

Preferences are convenient summaries. They are also easy to overstate. “People prefer practical guides” hides which people, which posts, how many examples, and whether “prefer” means likes, saves, shares, or comments. A summary can be useful, but it shouldn’t be the only artifact that survives.

So I retain the event behind the interpretation. For each post, Social Pulse records its format, date, text, impressions, and engagement results in Hindsight:

```python
content = (
    f"{brand_name} published a {row['Post type']} post on {row['Post date']}: "
    f"{row['Post text']} Engagement results: {int(row['Likes'])} likes, "
    f"{int(row['Comments'])} comments, {int(row['Shares'])} shares, "
    f"{int(row['Impressions'])} impressions, {int(row['Engagements'])} total engagements, "
    f"{float(row['Engagement rate']):.2f}% engagement rate."
)
```

This is not a claim that raw rows are always the ideal memory representation. It is a choice to preserve enough detail that a future question can retrieve a relevant result instead of inheriting only a conclusion. Record-type metadata and context labels distinguish a post result from an audience signal or a user note. That makes memory useful for retrieval while keeping the stored text legible to an engineer debugging what the agent saw.

The system also retains an analysis update. It includes format-level averages, recurring caption keywords, weekday and hour observations when available, sample limitations, and optional context supplied by the user. That last part matters: metrics tell me what happened, but a person may know that a post was boosted, tied to a launch, or prompted a particular kind of comment.

```python
parts = [
    f"Analysis update for {brand_name}: {analysis.get('post_count', 0)} post(s) in the newly supplied dataset.",
    f"Overall observed data: {overall}.",
    "Post format results: " + ("; ".join(format_lines) if format_lines else "not enough categorized posts"),
    "Caption keyword proxies (not verified semantic topics): " + ("; ".join(topic_lines) if topic_lines else "no recurring keywords"),
    f"Sample limitations: {analysis.get('data_sufficiency', 'unknown')}",
]
if user_note.strip():
    parts.append(f"User-provided result context or audience feedback: {user_note.strip()}")
```

I deliberately describe keyword matches as proxies, not verified topics. A caption containing “guide” is not proof that a post belongs to a coherent “guide” category, much less that its audience likes that category. The analytics preserve sample counts, and recommendation instructions tell the model to treat fewer than three examples as preliminary. Those aren’t glamorous details. They are the difference between a useful hypothesis and confident folklore.

## Current evidence and remembered evidence are different

A new recommendation has two evidence sources. First, the application calculates a structured summary from the current post DataFrame. Second, it issues a natural-language recall query based on the brand and the user’s request. The returned Hindsight text is passed to the model as its own field:

```python
context = {
    "brand_profile": brand,
    "user_request": request,
    "historical_data_analysis": evidence,
    "hindsight_recall_results": memories,
    "memory_status": memory_status,
    "recommendation_mode": "Hindsight memory enabled" if use_hindsight_memory else "No Hindsight memory supplied",
}
```

That structure is intentionally plain. The current dataset is computed now; the memories are recalled from prior activity. The model receives both, and its instructions require it to cite observed counts and metrics, use recalled text only for claims about remembered preferences or history, and say when the evidence is insufficient. The application returns the recalled memory text alongside the response, so a user can inspect the context rather than treating “the agent remembers” as an invisible assertion.

This is where [Hindsight’s persistent agent memory on GitHub](https://github.com/vectorize-io/hindsight) fits the architecture. Social Pulse uses a stable bank as its memory boundary and the Hindsight SDK’s retain and recall operations. Its [Hindsight memory documentation](https://hindsight.vectorize.io/) describes the service and SDK surface; the project’s own adapter keeps configuration and those calls in one module. That lets the rest of the application ask for a memory operation without maintaining a second, subtly different local memory store.

I think of this as application evidence plus agent memory, not a replacement of one by the other. The distinction is close to the broader idea of [agent memory for carrying useful context across interactions](https://vectorize.io/what-is-agent-memory), but the implementation only earns that label when the retrieved context can be tied back to things the user actually uploaded or said.

## What a recommendation interaction looks like

Suppose a travel brand uploads a batch of posts and asks, “What should I try next if I want more saves?” The analytics can report which formats and posts had higher save counts if those fields exist, how many posts support each observation, and whether the dataset contains actual posting times. Hindsight can return relevant prior post results, feedback, or recommendations that were retained earlier. The model can then propose a new post format and caption as a test, explain which current measurements informed it, and mention a relevant remembered result.

If the CSV contains dates but no clock times, the answer should not invent a best hour. The analytics explicitly distinguish midnight-only date values from observed timestamps. Likewise, a high average from one post should remain a weak signal, not become an audience law. When no relevant memory comes back, the system can still use current evidence, but it should not pretend the agent recalled something.

After publishing outside the app, the user can upload the new result and include an optional note. The next recommendation can retrieve that outcome in relation to the request at hand. The model is not magically becoming more capable; the application is giving it a better record of what this brand tried and what happened afterward.

That loop is why I store results rather than only preferences. A preference summary can answer “what do we think works?” An outcome record can also help answer “what led us to think that, how strong was the evidence, and what should we test next?”

## Lessons I’d reuse

1. **Keep observation and interpretation separate.** Store measured outcomes as outcomes, and label inferred patterns as signals. Don’t encode a weak correlation as a durable fact.
2. **Carry sample size with the result.** A percentage without its denominator invites bad decisions. Preserve counts and make the model explain uncertainty in ordinary language.
3. **Treat user context as evidence with provenance.** A note can explain a metric or add feedback that analytics cannot infer. Keep it distinguishable from automatically calculated results.
4. **Make recalled context inspectable.** Returning the actual memory text makes it easier to audit why a recommendation mentioned a past post and to spot irrelevant retrieval.
5. **Persist the application’s memory contract in one adapter.** Stable bank configuration, retain, and recall belong behind a small boundary. That keeps the rest of the app from quietly depending on a local fallback that behaves differently from persistent memory.

The main lesson is not that every event belongs in an agent’s memory forever. Retention still needs sensible scope, access controls, lifecycle rules, and deletion behavior in a production system. It is that summaries should not erase the evidence they summarize. If I want an agent to make better recommendations tomorrow, I need to give it more than yesterday’s conclusion: I need to preserve enough of yesterday’s result to question that conclusion later.