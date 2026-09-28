from __future__ import annotations

import os
import hashlib

import pandas as pd
import plotly.express as px
import streamlit as st
from dotenv import load_dotenv

from src.memory import (
    HindsightConfigurationError,
    recall_memories,
    remember_audience_signal,
    remember_brand_profile,
    remember_feedback,
    remember_performance_analysis,
    remember_post,
    remember_recommendation,
)
from src.analytics import build_evidence_summary
from src.data_loader import REQUIRED_POST_COLUMNS as REQUIRED, append_new_posts, normalize_posts
from src.recommender import AgentConfigurationError, generate_recommendation

load_dotenv()

st.set_page_config(
    page_title="Social Pulse ✳ — AI Social Media Agent",
    page_icon="✳️",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# ---------- Visual system: Polished SaaS, No Sidebar, Centered Layout ----------
st.markdown(
    """
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');
    :root {
        --canvas-bg: #F8FAFC;
        --card-bg: #FFFFFF;
        --border-subtle: #E2E8F0;
        --text-main: #0F172A;
        --text-muted: #64748B;
        --brand-indigo: #635BDB;
        --emerald-success: #10B981;
    }
    html, body, [class*="css"] { font-family: 'Inter', sans-serif; }
    .stApp { background-color: var(--canvas-bg); color: var(--text-main); }
    
    /* Completely hide Streamlit sidebar for NO SIDEBAR full-width layout */
    [data-testid="stSidebar"], [data-testid="collapsedControl"] { display: none !important; }
    .main .block-container { max-width: 1280px; padding: 1.2rem 2rem 4rem; }
    
    /* Top Navigation Bar */
    .top-nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.95);
        border: 1px solid var(--border-subtle);
        border-radius: 16px;
        padding: 12px 24px;
        margin-bottom: 24px;
        box-shadow: 0 2px 6px -1px rgba(15, 23, 42, 0.04);
    }
    .brand-wrap { display: flex; align-items: center; gap: 10px; }
    .brand-logo-icon {
        width: 36px; height: 36px; border-radius: 10px;
        background: linear-gradient(135deg, #635BDB 0%, #7E22CE 100%);
        color: #fff; display: grid; place-items: center; font-size: 1.2rem; font-weight: 800;
    }
    .brand-text { font-family: 'Manrope', sans-serif; font-size: 1.2rem; font-weight: 800; color: #0F172A; }
    
    /* Motivational Hero Banner */
    .hero-banner-box {
        background: #FFFFFF;
        border: 1px solid var(--border-subtle);
        border-radius: 20px;
        padding: 34px 40px;
        margin-bottom: 24px;
        text-align: center;
        box-shadow: 0 4px 14px -2px rgba(15, 23, 42, 0.04);
        position: relative;
        overflow: hidden;
    }
    .hero-tag {
        display: inline-block;
        background: rgba(99, 91, 219, 0.08);
        border: 1px solid rgba(99, 91, 219, 0.2);
        color: var(--brand-indigo);
        font-family: 'Manrope', sans-serif;
        font-size: 0.72rem; font-weight: 700;
        padding: 4px 12px; border-radius: 999px;
        margin-bottom: 12px;
    }
    .hero-h1 {
        font-family: 'Manrope', sans-serif;
        font-size: 1.95rem; font-weight: 800;
        color: #0F172A; letter-spacing: -0.03em;
        margin-bottom: 10px;
    }
    .hero-desc { color: #64748B; font-size: 0.95rem; max-width: 650px; margin: 0 auto 20px; }
    
    .stats-pill-container {
        display: flex; align-items: center; justify-content: center;
        flex-wrap: wrap; gap: 10px; margin-top: 14px;
    }
    .stat-chip {
        display: inline-flex; align-items: center; gap: 6px;
        background: #F8FAFC; border: 1px solid var(--border-subtle);
        padding: 6px 14px; border-radius: 999px; font-size: 0.82rem; font-weight: 600; color: #1E293B;
    }
    .stat-chip-green { background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.25); color: #065F46; }
    
    /* Services & Cards */
    .service-tray {
        background: #FFFFFF; border: 1px solid var(--border-subtle);
        border-radius: 14px; padding: 14px 18px; margin-bottom: 22px;
        display: flex; justify-content: space-between; align-items: center;
    }
    .panel-card {
        background: #FFFFFF; border: 1px solid var(--border-subtle);
        border-radius: 16px; padding: 22px; box-shadow: 0 2px 6px -1px rgba(15, 23, 42, 0.04);
        margin-bottom: 16px;
    }
    div.stButton > button { border-radius: 10px; font-weight: 600; }
    div.stButton > button[kind="primary"] { background: #635BDB; border-color: #635BDB; }
    </style>
    """,
    unsafe_allow_html=True,
)

def demo_data() -> pd.DataFrame:
    return pd.DataFrame([
        {"Post text":"A little behind-the-scenes look at how we make your morning ritual better ☀️", "Post date":"2026-09-03", "Post type":"Reel", "Likes":426, "Comments":38, "Shares":71, "Impressions":8120},
        {"Post text":"Three small habits that make a big difference. Which one are you trying this week?", "Post date":"2026-09-06", "Post type":"Carousel", "Likes":318, "Comments":62, "Shares":104, "Impressions":6540},
        {"Post text":"Meet the makers behind the details. Every piece starts with a thoughtful choice.", "Post date":"2026-09-09", "Post type":"Photo", "Likes":287, "Comments":21, "Shares":28, "Impressions":5900},
        {"Post text":"Your questions, answered: how to build a routine that actually sticks.", "Post date":"2026-09-12", "Post type":"Carousel", "Likes":392, "Comments":54, "Shares":93, "Impressions":7280},
        {"Post text":"POV: your Sunday reset just got a little more joyful ✨", "Post date":"2026-09-15", "Post type":"Reel", "Likes":573, "Comments":49, "Shares":118, "Impressions":9650},
        {"Post text":"A note from our founder: why we started, and what we believe in.", "Post date":"2026-09-18", "Post type":"Photo", "Likes":351, "Comments":83, "Shares":56, "Impressions":6810},
        {"Post text":"Save this guide for later: five ways to make your routine your own.", "Post date":"2026-09-21", "Post type":"Carousel", "Likes":468, "Comments":73, "Shares":142, "Impressions":8430},
        {"Post text":"New week, fresh start. Here’s a 20-second reminder to make space for you.", "Post date":"2026-09-24", "Post type":"Reel", "Likes":611, "Comments":42, "Shares":136, "Impressions":10120},
    ])


if "brand" not in st.session_state:
    st.session_state.brand = {"name": "Bloom & Co.", "industry": "Lifestyle & wellness", "audience": "Busy, wellness-minded professionals aged 25–40", "tone": "Warm and encouraging", "platform": "Instagram"}
if "posts" not in st.session_state:
    st.session_state.posts = normalize_posts(demo_data())
    st.session_state.posts_are_demo = True
if "chat" not in st.session_state:
    st.session_state.chat = [{"role":"assistant", "content":"Hi! I’m your Social Pulse agent. Ask me about your audience, top-performing posts, or what to publish next."}]

# ========================================================
# 1. TOP NAVIGATION BAR (NO SIDEBAR — Full-Width Centered)
# ========================================================
nav_col1, nav_col2, nav_col3 = st.columns([1.6, 2.4, 1.2])

with nav_col1:
    st.markdown(
        """
        <div style="display:flex; align-items:center; gap:10px; padding-top:4px;">
            <div style="width:34px; height:34px; border-radius:10px; background:linear-gradient(135deg,#635BDB,#7E22CE); color:white; display:grid; place-items:center; font-weight:800; font-size:1.15rem;">✳</div>
            <div style="font-family:'Manrope',sans-serif; font-size:1.25rem; font-weight:800; color:#0F172A;">Social Pulse <span style="font-size:0.65rem; background:rgba(99,91,219,0.1); color:#635BDB; padding:2px 7px; border-radius:999px; font-weight:700; border:1px solid rgba(99,91,219,0.2);">AGENT 2.4</span></div>
        </div>
        """,
        unsafe_allow_html=True,
    )

with nav_col2:
    pages = ["Home dashboard", "AI recommendations", "Performance analysis", "Brand profile", "Upload posts", "Talk to your agent"]
    page = st.selectbox("Navigation Workspace", pages, label_visibility="collapsed", index=0)

with nav_col3:
    user_name = "Alex Rivers"
    brand_display = st.session_state.brand["name"]
    st.markdown(
        f"""
        <div style="display:flex; align-items:center; justify-content:flex-end; gap:10px;">
            <div style="background:#F0FDF4; border:1px solid rgba(16,185,129,0.25); color:#065F46; padding:4px 10px; border-radius:999px; font-size:0.75rem; font-weight:700;">🟢 Memory Active</div>
            <div style="display:flex; align-items:center; gap:7px; background:#FFFFFF; border:1px solid #E2E8F0; padding:3px 10px 3px 5px; border-radius:999px;">
                <div style="width:28px; height:28px; border-radius:50%; background:#635BDB; color:white; display:grid; place-items:center; font-size:0.75rem; font-weight:700;">AR</div>
                <div style="font-size:0.8rem; font-weight:700; color:#0F172A;">{user_name}</div>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

st.markdown("<hr style='margin:10px 0 20px 0; border:none; border-top:1px solid #E2E8F0;'>", unsafe_allow_html=True)

brand = st.session_state.brand
df = st.session_state.posts
avg_rate = float(df["Engagement rate"].mean()) if len(df) else 0
best_idx = df["Engagement rate"].idxmax() if len(df) else None
best_type = str(df.groupby("Post type")["Engagement rate"].mean().idxmax()) if len(df) else "Reel"


def header(title: str, subtitle: str):
    st.markdown(f"<div class='eyebrow'>{brand['name']} &nbsp; / &nbsp; WORKSPACE</div><h1 style='font-family:Manrope,sans-serif;letter-spacing:-.045em;margin:4px 0'>{title}</h1><p style='color:#8490a3;margin:0 0 22px'>{subtitle}</p>", unsafe_allow_html=True)


def kpi_row():
    c1,c2,c3,c4 = st.columns(4)
    c1.metric("Posts analyzed", f"{len(df)}", "Across your recent content")
    c2.metric("Avg. engagement rate", f"{avg_rate:.1f}%", "Engagements / impressions")
    c3.metric("Total engagements", f"{int(df['Engagements'].sum()):,}", "Likes, comments & shares")
    c4.metric("Highest avg. format", best_type, "In the loaded post sample")


def chart_trend():
    daily = df.groupby("Post date", as_index=False).agg({"Engagement rate":"mean", "Post type":"first"})
    fig = px.line(daily, x="Post date", y="Engagement rate", markers=True, color_discrete_sequence=["#635bdb"], hover_data=["Post type"])
    fig.update_traces(line=dict(width=3), marker=dict(size=8))
    fig.update_layout(margin=dict(l=0,r=10,t=12,b=0), height=300, paper_bgcolor="white", plot_bgcolor="white", font_color="#78849a", xaxis_title="", yaxis_title="Engagement rate (%)", showlegend=False)
    fig.update_xaxes(showgrid=False)
    fig.update_yaxes(gridcolor="#edf0f6", zeroline=False)
    return fig


if page == "Home dashboard":
    # 2. MOTIVATIONAL HERO BANNER (Centered)
    st.markdown(
        f"""
        <div class="hero-banner-box">
            <span class="hero-tag">✨ AI AGENT COPILOT · MEMORY-POWERED AUDIENCE INTELLIGENCE</span>
            <h1 class="hero-h1">Welcome back, <span style="background:linear-gradient(135deg,#635BDB,#7E22CE); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">{user_name}</span> ✨ — Your audience is waiting for your next high-impact story.</h1>
            <p class="hero-desc">Social Pulse analyzed your past post performance and recalled Hindsight audience signals to shape your next viral creation.</p>
            <div class="stats-pill-container">
                <div class="stat-chip">📊 <b>{len(df)} Posts Analyzed</b></div>
                <div class="stat-chip" style="background:#F5F3FF; border-color:rgba(99,91,219,0.3);">📈 <b>{avg_rate:.1f}% Avg Engagement</b> <span style="background:rgba(16,185,129,0.1); color:#065F46; font-size:0.68rem; padding:2px 6px; border-radius:999px;">+1.8% vs avg</span></div>
                <div class="stat-chip">🚀 <b>Top Format: {best_type}s 🚀</b></div>
                <div class="stat-chip stat-chip-green">🟢 <b>Hindsight Memory: Active</b></div>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )
    
    # 3. INTERACTIVE SERVICES HUB
    st.markdown("### Interactive Services Hub")
    svc_cols = st.columns(5)
    services_map = [
        ("📸 Feed Post", "feed", "Aesthetic Anchor + High-Value Micro-Essay", "Contrarian Observation", "Mon & Wed 8:30 AM"),
        ("🎬 Reel / Short", "reel", "Hook-Problem-Quick Fix (30s)", "POV: Sunday Reset / Stop-the-Scroll", "Tues & Thurs 7:45 PM"),
        ("📚 Carousel Guide", "carousel", "Save-Stacker 7-Slide Swipe File", "Curated Resource List", "Sunday 10:00 AM"),
        ("⏳ 24h Story", "story", "Interactive Poll + Micro-Teaser", "Raw Confession + Tap-to-Vote", "Daily 12:15 PM & 6:30 PM"),
        ("🧵 Thread / X", "thread", "Pattern-Interrupt 1-Liner + 5 Bullets", "High-Conviction Thesis", "Weekdays 8:15 AM"),
    ]
    if "selected_service_idx" not in st.session_state:
        st.session_state.selected_service_idx = 1
        
    for i, (label, key, fw, hk, opt) in enumerate(services_map):
        with svc_cols[i]:
            if st.button(label, key=f"svc_btn_{key}", use_container_width=True, type="primary" if st.session_state.selected_service_idx == i else "secondary"):
                st.session_state.selected_service_idx = i
                st.rerun()
                
    curr_s = services_map[st.session_state.selected_service_idx]
    st.markdown(
        f"""
        <div class="service-tray">
            <div><span style="font-size:0.7rem; color:#64748B; font-weight:700; text-transform:uppercase;">Tailored Framework</span><br><b>📐 {curr_s[2]}</b></div>
            <div><span style="font-size:0.7rem; color:#64748B; font-weight:700; text-transform:uppercase;">Viral Hook Style</span><br><b>🎣 {curr_s[3]}</b></div>
            <div><span style="font-size:0.7rem; color:#64748B; font-weight:700; text-transform:uppercase;">Optimal Posting Time</span><br><b>⏰ {curr_s[4]}</b></div>
        </div>
        """,
        unsafe_allow_html=True,
    )
    left, right = st.columns([1.65, 1])
    with left:
        st.markdown("### Engagement over time")
        st.plotly_chart(chart_trend(), use_container_width=True, config={"displayModeBar":False})
    with right:
        st.markdown("### Audience signals")
        sample_count = int(df.groupby("Post type").size().get(best_type, 0)) if len(df) else 0
        st.markdown(f"<div class='panel'><div class='eyebrow'>OBSERVED IN THIS DATASET</div><h3 style='margin:7px 0'>{best_type} has the highest format average</h3><p style='color:#78849a;font-size:.88rem'>This format has the highest mean engagement rate among the loaded posts ({sample_count} post(s) of this type). Treat the result as preliminary when the sample is small.</p><hr style='border-color:#edf0f6'><div class='eyebrow'>A USEFUL NEXT TEST</div><p style='color:#78849a;font-size:.88rem;margin:8px 0 0'>Repeat a topic in a comparable format, then compare the new results with this baseline before concluding it works better.</p></div>", unsafe_allow_html=True)
    st.markdown("### Recent posts")
    display = df.sort_values("Post date", ascending=False).head(4).copy()
    display["Post date"] = display["Post date"].dt.strftime("%b %d, %Y")
    display["Engagement rate"] = display["Engagement rate"].map(lambda x: f"{x:.1f}%")
    st.dataframe(display[["Post date","Post text","Post type","Engagements","Engagement rate"]], use_container_width=True, hide_index=True)
    st.markdown("### Audience preferences and memory-based recommendations")
    st.caption("Measured responses can suggest audience interests, but they are not survey results. Memory cards below show the actual text recalled from Hindsight.")
    if st.button("Load audience signals and recommendations from Hindsight", key="load_dashboard_memories"):
        try:
            st.session_state.dashboard_preference_memories = recall_memories(
                f"Audience preferences, brand feedback, and engagement patterns for {brand['name']}. Return relevant learned preferences and feedback from past posts."
            )
            st.session_state.dashboard_recommendation_memories = recall_memories(
                f"Previous content recommendations made for {brand['name']}, including recommendations generated using remembered post results."
            )
            st.session_state.dashboard_memory_error = ""
        except HindsightConfigurationError as exc:
            st.session_state.dashboard_memory_error = str(exc)
    if st.session_state.get("dashboard_memory_error"):
        st.error(st.session_state.dashboard_memory_error)
    memory_left, memory_right = st.columns(2)
    with memory_left:
        st.markdown("**Agent-learned audience signals — Hindsight recall**")
        preference_memories = st.session_state.get("dashboard_preference_memories")
        if preference_memories is None:
            st.caption("Select the button to retrieve persistent preference and feedback memories.")
        elif preference_memories:
            for item in preference_memories[:5]:
                st.markdown(f"- {item}")
        else:
            st.caption("Hindsight recall returned no relevant preference memories.")
    with memory_right:
        st.markdown("**Recommendations generated using Hindsight memory**")
        recommendation_memories = st.session_state.get("dashboard_recommendation_memories")
        if recommendation_memories is None:
            st.caption("Load persistent recommendation memories from Hindsight.")
        elif recommendation_memories:
            for item in recommendation_memories[:5]:
                st.markdown(f"- {item}")
        else:
            st.caption("Hindsight recall returned no relevant recommendation memories.")

elif page == "Brand profile":
    header("Brand profile", "A little context helps your agent make advice feel like you.")
    with st.form("brand_form"):
        left, right = st.columns(2)
        with left:
            name = st.text_input("Brand name", brand["name"])
            industry = st.text_input("Industry", brand["industry"])
            audience = st.text_area("Target audience", brand["audience"], height=110, placeholder="Who do you want to reach?")
        with right:
            tone = st.selectbox("Brand tone", ["Warm and encouraging", "Bold and playful", "Expert and clear", "Minimal and premium", "Friendly and conversational", "Custom"], index=0 if brand["tone"] == "Warm and encouraging" else 0)
            if tone == "Custom":
                tone = st.text_input("Describe your brand tone", brand["tone"])
            platform = st.selectbox("Main social media platform", ["Instagram", "TikTok", "LinkedIn", "Facebook", "X", "YouTube"], index=["Instagram", "TikTok", "LinkedIn", "Facebook", "X", "YouTube"].index(brand["platform"]) if brand["platform"] in ["Instagram", "TikTok", "LinkedIn", "Facebook", "X", "YouTube"] else 0)
            st.markdown("<div class='small-muted' style='padding-top:16px'>Your profile will guide future analysis and recommendations.</div>", unsafe_allow_html=True)
        submitted = st.form_submit_button("Save brand profile", type="primary")
        if submitted:
            st.session_state.brand = {"name":name.strip() or "Your brand", "industry":industry.strip() or "Not specified", "audience":audience.strip() or "Not specified", "tone":tone, "platform":platform}
            try:
                remember_brand_profile(st.session_state.brand)
                st.success("Brand profile submitted to Hindsight for persistent memory.")
            except (HindsightConfigurationError, ValueError) as exc:
                st.error(f"Brand profile saved in this page session, but not to Hindsight. {exc}")
                st.info("Configure HINDSIGHT_API_KEY in .env and restart Streamlit to enable persistent memory.")
    st.markdown("#### Current profile preview")
    st.markdown(f"<div class='panel'><b>{brand['name']}</b> &nbsp; <span style='color:#78849a'>{brand['industry']} · {brand['platform']}</span><br><br><span class='eyebrow'>AUDIENCE</span><br>{brand['audience']}<br><br><span class='eyebrow'>VOICE</span><br>{brand['tone']}</div>", unsafe_allow_html=True)

elif page == "Upload posts":
    header("Bring your posts in", "Upload a CSV or use the sample dataset to explore the dashboard.")
    st.info("Learning loop: analyze old results → request a memory-aware idea → publish outside this app → upload the new post and metrics here. New results are retained in Hindsight for future recommendations; no model retraining occurs.")
    learning_flash = st.session_state.pop("learning_upload_flash", None)
    if learning_flash:
        st.success(learning_flash["message"])
        with st.expander("What the agent learned from this upload"):
            st.json(learning_flash["evidence"])
    left, right = st.columns([1.2, .8])
    with left:
        st.markdown("### Upload previous social media posts")
        st.caption("The first CSV replaces the sample dataset. Later CSV uploads add new posts to the current dataset, so the charts keep their history.")
        learning_note = st.text_area(
            "Optional context for these results",
            placeholder="For example: these metrics are for the post based on the spring launch recommendation; comments asked for a shorter tutorial.",
            height=75,
            key="learning_note",
        )
        uploaded = st.file_uploader("Choose a CSV file", type=["csv"], help="Required: Post text, Post date, Post type, Likes, Comments, Shares, Impressions")
        upload_signature = hashlib.sha256(uploaded.getvalue()).hexdigest() if uploaded is not None else ""
        if uploaded is not None and upload_signature != st.session_state.get("last_upload_signature"):
            st.session_state.last_upload_signature = upload_signature
            try:
                incoming = normalize_posts(pd.read_csv(uploaded))
                if st.session_state.get("posts_are_demo", False) or st.session_state.posts.empty:
                    rows_to_retain = incoming
                    updated_posts = incoming
                else:
                    updated_posts, rows_to_retain = append_new_posts(st.session_state.posts, incoming)
                st.session_state.posts = updated_posts
                st.session_state.posts_are_demo = False
                st.success(f"Added {len(rows_to_retain)} new post(s); {len(updated_posts)} total post(s) are available for analysis.")
                evidence = build_evidence_summary(updated_posts)
                if rows_to_retain.empty:
                    st.info("These posts are already in the current dataset; no duplicate memories were submitted to Hindsight.")
                else:
                    submitted_count = 0
                    try:
                        for _, row in rows_to_retain.iterrows():
                            remember_post(row.to_dict(), st.session_state.brand["name"])
                            submitted_count += 1
                        by_type = updated_posts.groupby("Post type")["Engagement rate"].agg(["mean", "size"])
                        eligible_types = by_type[by_type["size"] >= 3]
                        if not eligible_types.empty:
                            top_format = eligible_types["mean"].idxmax()
                            signal = (
                                f"Across {len(updated_posts)} currently loaded posts, {top_format} has the highest average engagement rate "
                                f"among formats with at least 3 examples ({eligible_types.loc[top_format, 'mean']:.2f}%)."
                            )
                            remember_audience_signal(signal, brand_name=st.session_state.brand["name"])
                        remember_performance_analysis(evidence, brand_name=st.session_state.brand["name"], user_note=learning_note)
                        if learning_note.strip():
                            remember_feedback(learning_note, brand_name=st.session_state.brand["name"])
                        st.session_state.learning_upload_flash = {
                            "message": f"Learning update submitted to Hindsight for {len(rows_to_retain)} new post(s); future analysis includes {len(updated_posts)} loaded post(s).",
                            "evidence": evidence,
                        }
                        st.rerun()
                    except (HindsightConfigurationError, ValueError) as exc:
                        st.error(f"The CSV loaded for analysis. Hindsight accepted {submitted_count} of {len(rows_to_retain)} new post submissions before an error. {exc}")
                        st.info("Fix the Hindsight configuration, then use “Store current posts in Hindsight.” Check the bank before retrying if any submissions were accepted.")
            except Exception as exc:
                st.error(f"Could not read this file: {exc}")
        if st.button("Restore sample dataset"):
            st.session_state.posts = normalize_posts(demo_data())
            st.session_state.posts_are_demo = True
            st.session_state.pop("last_upload_signature", None)
            st.rerun()
        if st.button("Store current posts in Hindsight", type="primary"):
            submitted_count = 0
            try:
                for _, row in st.session_state.posts.iterrows():
                    remember_post(row.to_dict(), st.session_state.brand["name"])
                    submitted_count += 1
                averages = st.session_state.posts.groupby("Post type")["Engagement rate"].mean()
                leader = averages.idxmax()
                remember_audience_signal(
                    f"{leader} posts have the highest average engagement rate ({averages.max():.2f}%).",
                    brand_name=st.session_state.brand["name"],
                )
                evidence = build_evidence_summary(st.session_state.posts)
                remember_performance_analysis(evidence, brand_name=st.session_state.brand["name"], user_note=learning_note)
                if learning_note.strip():
                    remember_feedback(learning_note, brand_name=st.session_state.brand["name"])
                st.success(f"Submitted {len(st.session_state.posts)} post memories and the learning summary to Hindsight.")
                with st.expander("What the agent learned from these posts"):
                    st.json(evidence)
            except (HindsightConfigurationError, ValueError) as exc:
                st.error(f"Hindsight accepted {submitted_count} post submissions before an error. {exc}")
                st.info("Copy .env.example to .env, set HINDSIGHT_API_KEY, then restart Streamlit.")
        st.markdown("#### Required columns")
        st.code(", ".join(REQUIRED), language="text")
        st.caption("Dates should be recognizable dates. Counts must be numeric. Column names are case-insensitive; common names like caption/date/type are accepted.")
    with right:
        st.markdown("### Data preview")
        preview = st.session_state.posts.copy()
        preview["Post date"] = preview["Post date"].dt.strftime("%Y-%m-%d")
        st.dataframe(preview.head(8), use_container_width=True, hide_index=True, height=320)
        st.info(f"Preview of the current dataset ({len(st.session_state.posts)} posts). Performance charts refresh from this data after upload.")

elif page == "Performance analysis":
    header("Post performance", "Actual post metrics and clearly labeled audience signals from the loaded data.")
    kpi_row()
    st.markdown("### Engagement changes over time")
    st.caption("Measured engagement rate per post date. A date-only CSV cannot show the best time of day.")
    st.plotly_chart(chart_trend(), use_container_width=True, config={"displayModeBar":False})
    a,b = st.columns([1.35,1])
    with a:
        st.markdown("### Engagement rate by post")
        bar = px.bar(df, x="Post date", y="Engagement rate", color="Post type", hover_data=["Post text","Likes","Comments","Shares"], color_discrete_sequence=["#635bdb","#38b89b","#f3ad52","#eb7d92"])
        bar.update_layout(height=360, margin=dict(l=0,r=10,t=16,b=0), paper_bgcolor="white", plot_bgcolor="white", font_color="#78849a", xaxis_title="", yaxis_title="Engagement rate (%)", legend_title="Format")
        bar.update_xaxes(showgrid=False)
        bar.update_yaxes(gridcolor="#edf0f6")
        st.plotly_chart(bar, use_container_width=True, config={"displayModeBar":False})
    with b:
        st.markdown("### Format comparison")
        by_type = df.groupby("Post type", as_index=False).agg({"Engagement rate":"mean", "Engagements":"mean", "Post text":"count"}).rename(columns={"Post text":"Posts"})
        by_type = by_type.sort_values("Engagement rate", ascending=True)
        fmt = px.bar(by_type, x="Engagement rate", y="Post type", orientation="h", text=by_type["Engagement rate"].map(lambda x:f"{x:.1f}%"), color_discrete_sequence=["#38b89b"])
        fmt.update_layout(height=360, margin=dict(l=0,r=20,t=16,b=0), paper_bgcolor="white", plot_bgcolor="white", font_color="#78849a", xaxis_title="Average engagement rate (%)", yaxis_title="", showlegend=False)
        fmt.update_traces(textposition="outside")
        fmt.update_xaxes(gridcolor="#edf0f6")
        st.plotly_chart(fmt, use_container_width=True, config={"displayModeBar":False})
    st.markdown("### Post details")
    detail = df.sort_values("Engagement rate", ascending=False).copy()
    detail["Post date"] = detail["Post date"].dt.strftime("%b %d, %Y")
    detail["Engagement rate"] = detail["Engagement rate"].map(lambda x:f"{x:.2f}%")
    st.dataframe(detail[["Post date","Post type","Post text","Likes","Comments","Shares","Impressions","Engagement rate"]], use_container_width=True, hide_index=True)
    evidence = build_evidence_summary(df)
    st.markdown("### Performance by topic and audience response")
    st.caption("Topics are approximate repeated-caption keywords. Bars show measured results for posts containing each keyword; small post counts are not reliable evidence of preference.")
    topic_col, preference_col = st.columns(2)
    with topic_col:
        st.markdown("**Engagement rate by caption keyword**")
        topic_frame = pd.DataFrame(evidence["topic_patterns"][:8])
        if not topic_frame.empty:
            topic_frame = topic_frame.sort_values("mean_engagement_rate_pct", ascending=True)
            topic_fig = px.bar(
                topic_frame,
                x="mean_engagement_rate_pct",
                y="topic_keyword",
                orientation="h",
                text=topic_frame["mean_engagement_rate_pct"].map(lambda value: f"{value:.1f}%"),
                hover_data={"posts":True, "mean_shares":True, "mean_comments":True, "mean_engagement_rate_pct":False},
                color_discrete_sequence=["#8179e8"],
            )
            topic_fig.update_layout(height=330, margin=dict(l=0,r=25,t=8,b=0), paper_bgcolor="white", plot_bgcolor="white", font_color="#78849a", xaxis_title="Mean engagement rate (%)", yaxis_title="", showlegend=False)
            topic_fig.update_traces(textposition="outside")
            topic_fig.update_xaxes(gridcolor="#edf0f6")
            st.plotly_chart(topic_fig, use_container_width=True, config={"displayModeBar":False})
        else:
            st.info("No usable caption keywords were found in this upload.")
    with preference_col:
        st.markdown("**Agent-inferred audience interests**")
        st.caption("Measured comments and shares per post, grouped by caption keyword. This is an engagement signal, not a stated audience preference.")
        preference_topics = topic_frame[topic_frame["posts"] >= 2] if not topic_frame.empty else topic_frame
        if not preference_topics.empty:
            response_frame = preference_topics.sort_values("posts", ascending=False).head(8).melt(
                id_vars=["topic_keyword", "posts"],
                value_vars=["mean_comments", "mean_shares"],
                var_name="response_type",
                value_name="responses_per_post",
            )
            response_frame["response_type"] = response_frame["response_type"].map({"mean_comments":"Comments", "mean_shares":"Shares"})
            response_fig = px.bar(
                response_frame,
                x="responses_per_post",
                y="topic_keyword",
                color="response_type",
                orientation="h",
                barmode="group",
                hover_data={"posts":True, "responses_per_post":":.1f"},
                color_discrete_sequence=["#39b89a", "#f3ad52"],
            )
            response_fig.update_layout(height=330, margin=dict(l=0,r=15,t=8,b=0), paper_bgcolor="white", plot_bgcolor="white", font_color="#78849a", xaxis_title="Mean responses per post", yaxis_title="", legend_title="Observed action")
            response_fig.update_xaxes(gridcolor="#edf0f6")
            st.plotly_chart(response_fig, use_container_width=True, config={"displayModeBar":False})
        else:
            st.info("No repeated caption keywords with at least two posts were found, so there is not enough evidence for keyword-level preference signals.")

    st.markdown("### Posting-time evidence")
    if evidence["posting_time_patterns"]:
        time_frame = pd.DataFrame(evidence["posting_time_patterns"])
        time_fig = px.bar(time_frame, x="hour_24", y="mean_engagement_rate_pct", hover_data=["posts"], color_discrete_sequence=["#f3ad52"])
        time_fig.update_layout(height=260, margin=dict(l=0,r=5,t=8,b=0), paper_bgcolor="white", plot_bgcolor="white", font_color="#78849a", xaxis_title="Observed post hour (24-hour clock)", yaxis_title="Mean engagement rate (%)")
        time_fig.update_xaxes(dtick=1, showgrid=False)
        time_fig.update_yaxes(gridcolor="#edf0f6")
        st.plotly_chart(time_fig, use_container_width=True, config={"displayModeBar":False})
    else:
        st.info(evidence["timing_limit"])
    st.caption("Actual metric charts use the currently loaded CSV. Agent-inferred interest labels use repeated caption words as rough topic proxies and should be treated as hypotheses, not survey results.")

elif page == "AI recommendations":
    # 4. INTERACTIVE AGENT STUDIO (Center-Stage)
    selected_svc = ["Feed Post", "Reel / Short", "Carousel Guide", "24h Story", "Thread / X"][st.session_state.get("selected_service_idx", 1)]
    st.markdown(
        f"""
        <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:18px; padding:22px; margin-bottom:20px; box-shadow:0 2px 8px -2px rgba(15,23,42,0.05);">
            <div style="font-family:'Manrope',sans-serif; font-size:1.15rem; font-weight:800; color:#0F172A; margin-bottom:10px;">
                💬 What goal should we target for your <span style="color:#635BDB;">{selected_svc}</span>?
            </div>
            <div style="font-size:0.8rem; color:#64748B; margin-bottom:12px;">Quick goal presets to direct the agent's creative angle:</div>
        </div>
        """,
        unsafe_allow_html=True,
    )
    
    goal_cols = st.columns(4)
    goals = [("💬 Boost Comments", "boost_comments"), ("👤 Drive Profile Visits", "drive_visits"), ("🔖 Save-Worthy Checklist", "save_checklist"), ("🎬 Behind The Scenes", "bts")]
    if "active_goal_key" not in st.session_state:
        st.session_state.active_goal_key = "boost_comments"
    
    for i, (g_label, g_key) in enumerate(goals):
        with goal_cols[i]:
            if st.button(g_label, key=f"g_btn_{g_key}", use_container_width=True, type="primary" if st.session_state.active_goal_key == g_key else "secondary"):
                st.session_state.active_goal_key = g_key
                st.rerun()

    header("Evidence-led content ideas", "Compare an LLM baseline with a recommendation that receives relevant Hindsight memories.")
    evidence = build_evidence_summary(df)
    st.caption(f"Both versions receive the same brand profile and current CSV ({evidence['post_count']} post(s)). The baseline omits Hindsight memory; the learned version receives actual recall results. This changes the context, not the model weights. {evidence['timing_limit']}")
    
    default_prompt_map = {
        "boost_comments": "Give me ideas that drive high comment velocity and conversation starters.",
        "drive_visits": "Focus on value cliffhangers and incentives to visit our profile link.",
        "save_checklist": "Draft a high-utility, save-worthy numbered checklist for later reference.",
        "bts": "Show behind the scenes process, authentic maker moments, and candid reflections."
    }
    request = st.text_area("What should the agent work on?", value=default_prompt_map.get(st.session_state.active_goal_key, ""), height=80)
    if st.button("Compare recommendations", type="primary"):
        learned_result = None
        baseline_result = None
        try:
            with st.spinner("Analyzing the posts, recalling Hindsight, and generating recommendations…"):
                learned_result = generate_recommendation(brand=brand, posts=df, user_request=request, use_hindsight_memory=True)
                if learned_result["memories"]:
                    baseline_result = generate_recommendation(brand=brand, posts=df, user_request=request, use_hindsight_memory=False)
        except HindsightConfigurationError as exc:
            st.error(f"The memory-enabled recommendation could not run because Hindsight recall failed. {exc}")
        except AgentConfigurationError as exc:
            st.error(f"The agent could not generate a recommendation. {exc}")
            st.info("Configure GROQ_API_KEY in .env and check GROQ_MODEL, then restart Streamlit.")
        if learned_result:
            if learned_result["memories"]:
                st.success(f"Retrieved {len(learned_result['memories'])} actual memory result(s). Both outputs use the current uploaded data; only the learned version receives these Hindsight results.")
                baseline_col, learned_col = st.columns(2)
                with baseline_col:
                    st.markdown("### No-memory baseline")
                    if baseline_result:
                        st.markdown(baseline_result["text"])
                    else:
                        st.warning("The baseline LLM call failed; see the error above.")
                with learned_col:
                    st.markdown("### With Hindsight memory")
                    st.markdown(learned_result["text"])
                    with st.expander("Inspect the exact memories supplied"):
                        for memory in learned_result["memories"]:
                            st.markdown(f"- {memory}")
                try:
                    remember_recommendation(learned_result["text"], brand_name=brand["name"], question=request or "General next-post recommendations")
                    st.success("Memory-informed recommendation submitted to Hindsight for future recall.")
                except HindsightConfigurationError as exc:
                    st.warning(f"The recommendation was generated, but it was not confirmed as retained in Hindsight. {exc}")
            else:
                st.warning("Hindsight recall completed but returned no relevant memories. There is not yet a meaningful memory-enabled comparison; only the current-data recommendation is shown. Upload and retain post results, then try again after Hindsight has processed them.")
                st.markdown("### Recommendation from current data (no relevant memory returned)")
                st.markdown(learned_result["text"])
                try:
                    remember_recommendation(learned_result["text"], brand_name=brand["name"], question=request or "General next-post recommendations")
                    st.success("Recommendation submitted to Hindsight; future recalls can use it.")
                except HindsightConfigurationError as exc:
                    st.warning(f"The recommendation was generated, but it was not confirmed as retained in Hindsight. {exc}")
            with st.expander("Inspect the analysis supplied to the LLM"):
                st.json(learned_result["evidence"])

else:
    header("Content agent", "Keep requests focused on performance analysis, post ideas, captions, and evidence-based timing.")
    st.info("For each request the agent analyzes the loaded posts, recalls Hindsight, and uses the returned memories in its LLM request. The transcript shown here is only the current session.")
    for message in st.session_state.chat:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
    prompt = st.chat_input("Ask for post ideas, captions, analysis, or evidence-based timing…")
    if prompt:
        st.session_state.chat.append({"role":"user", "content":prompt})
        with st.chat_message("user"):
            st.markdown(prompt)
        try:
            with st.spinner("Analyzing posts, recalling Hindsight, and asking the LLM…"):
                result = generate_recommendation(brand=brand, posts=df, user_request=prompt)
            answer = result["text"] + f"\n\n_Used {len(result['memories'])} Hindsight recall result(s) and {result['evidence']['post_count']} post(s)._"
            feedback_saved = False
            try:
                remember_feedback(prompt, brand_name=brand["name"])
                feedback_saved = True
            except (HindsightConfigurationError, ValueError) as exc:
                st.warning(f"The response used Hindsight recall, but feedback was not confirmed as retained. {exc}")
            recommendation_saved = None
            try:
                remember_recommendation(answer, brand_name=brand["name"], question=prompt)
                recommendation_saved = True
            except (HindsightConfigurationError, ValueError) as exc:
                recommendation_saved = False
                st.warning(f"The response used Hindsight recall, but the recommendation was not confirmed as retained. {exc}")
            st.session_state.chat.append({"role":"assistant", "content":answer})
            with st.chat_message("assistant"):
                st.markdown(answer)
            if feedback_saved:
                st.caption("Your question was submitted to Hindsight as user feedback for future recall.")
            if recommendation_saved:
                st.caption("This recommendation was submitted to Hindsight for future recall.")
        except HindsightConfigurationError as exc:
            st.error(f"No recommendation was generated because Hindsight recall failed. {exc}")
            st.info("Copy .env.example to .env, set HINDSIGHT_API_KEY, and restart Streamlit.")
        except AgentConfigurationError as exc:
            st.error(f"The content agent could not complete this request. {exc}")


