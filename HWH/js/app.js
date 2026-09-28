/**
 * SOCIAL PULSE ✳ — Interactive AI Social Media Agent Application Logic
 * Full-featured, modern JavaScript single-page application.
 */

// ==========================================================================
// DATA REPOSITORY: BRANDS, FORMAT SERVICES, GOALS & RECOMMENDATIONS
// ==========================================================================

const BRANDS = {
  bloom: {
    name: "Bloom & Co.",
    handle: "bloomandco",
    platform: "Instagram",
    platformIcon: "📸",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Mindful Lifestyle & Wellness",
    tone: "Warm, grounding, and encouraging",
    audience: "Busy, wellness-minded professionals aged 25–40",
    hindsightBank: "social-pulse-demo",
    postsCount: 8,
    avgEngagement: 7.2,
    topFormat: "Reels 🚀",
    previewImage: "assets/ritual_preview.jpg"
  },
  lumina: {
    name: "Lumina Tech",
    handle: "luminatech_ai",
    platform: "LinkedIn & X",
    platformIcon: "💼",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Enterprise AI & Developer Tools",
    tone: "Sharp, authoritative, and data-backed",
    audience: "Engineering leads, Founders & Product Architects",
    hindsightBank: "lumina-enterprise-pulse",
    postsCount: 14,
    avgEngagement: 5.8,
    topFormat: "Carousels 📚",
    previewImage: "assets/studio_preview.jpg"
  },
  aura: {
    name: "Aura Studio",
    handle: "aurawellness",
    platform: "TikTok & Reels",
    platformIcon: "🎬",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Holistic Health & Slow Living",
    tone: "Poetic, serene, and habit-centric",
    audience: "Gen-Z & Millennial mindful creators",
    hindsightBank: "aura-genz-community",
    postsCount: 11,
    avgEngagement: 8.9,
    topFormat: "Reels / Shorts 🎬",
    previewImage: "assets/ritual_preview.jpg"
  }
};

const SERVICE_CONFIGS = {
  reel: {
    name: "Reel / Short",
    badge: "🎬 REEL · 9:16",
    framework: "Hook-Problem-Quick Fix (30s 3-Act Structure)",
    hookStyle: "POV: Sunday Reset / Stop-the-Scroll Micro-Dopamine",
    optimalTime: "Tuesday & Thursday · 7:45 PM EST (Peak Saves)",
    aspectRatio: "9:16",
    viewText: "Reel Format (9:16)"
  },
  feed: {
    name: "Feed Post",
    badge: "📸 PHOTO POST · 1:1",
    framework: "Aesthetic Anchor + High-Value Micro-Essay",
    hookStyle: "Contrarian Observation / First-Line Pattern Interrupt",
    optimalTime: "Monday & Wednesday · 8:30 AM EST (Morning Commute)",
    aspectRatio: "1:1",
    viewText: "High-Res Square Photo"
  },
  carousel: {
    name: "Carousel Guide",
    badge: "📚 CAROUSEL · 7 SLIDES",
    framework: "Save-Stacker 7-Slide Actionable Swipe File",
    hookStyle: "Curated Resource List: '5 Rules I Wish I Knew Earlier'",
    optimalTime: "Sunday · 10:00 AM EST (Weekend Deep Dives)",
    aspectRatio: "4:5",
    viewText: "Swipe Gallery (Slide 1/7)"
  },
  story: {
    name: "24h Story",
    badge: "⏳ 24H STORY · 9:16",
    framework: "Interactive Poll + Behind-The-Curtain Micro-Teaser",
    hookStyle: "Raw Confession + 'Tap to vote your honest answer'",
    optimalTime: "Daily · 12:15 PM & 6:30 PM EST (Lunch & Evening Check-ins)",
    aspectRatio: "9:16",
    viewText: "Active 24h Story (Tap to reply)"
  },
  thread: {
    name: "Thread / X",
    badge: "🧵 THREAD · 5 TWEETS",
    framework: "Pattern-Interrupt 1-Liner + 5 Bullet Takeaways",
    hookStyle: "High-Conviction Thesis: 'Most people do X wrong. Here is why.'",
    optimalTime: "Weekdays · 8:15 AM EST (Peak Feed Refresh)",
    aspectRatio: "16:9",
    viewText: "Thread Chain (1/5)"
  }
};

// Curated idea sets mapped by format and goal
const RECOMMENDATIONS_DATABASE = {
  reel: {
    "boost-comments": [
      {
        id: "reel-c1",
        title: "The 3 Morning Rituals That Cut Mental Clutter",
        hookAngle: "Curiosity Gap + Relatable Friction",
        tone: "Warm & Grounding",
        score: 94,
        metrics: { hook: 96, share: 91, comment: 95, memory: 98 },
        caption: `POV: The 3 morning habits that transformed our focus — without waking up at 5:00 AM ☀️\n\nSave this for your next Sunday reset:\n1. 10 minutes of screen-free natural light\n2. 1 single intention written on paper\n3. Hydration before caffeine\n\nWhich one is already part of your morning? Tell us below 👇`,
        hashtags: "#MorningRitual #MindfulLiving #WellnessCommunity #SundayReset #IntentionalHabits",
        insight: "Direct question at the end drives +38% more replies according to historical post #4 analysis.",
        memories: [
          "Hindsight memory bank recalled: Audience strongly responds to non-dogmatic morning routines.",
          "Post #7 (Carousel) generated 73 comments when asking followers about their personal routine.",
          "Benchmark rate for Reels in your bank is 7.2% (highest format across all channels)."
        ]
      },
      {
        id: "reel-c2",
        title: "Unpopular Opinion: Self-Care Isn't Always Warm Baths",
        hookAngle: "Contrarian Reality Check",
        tone: "Empathetic & Honest",
        score: 92,
        metrics: { hook: 94, share: 93, comment: 92, memory: 95 },
        caption: `Sometimes self-care is saying 'no' without over-explaining.\nSometimes it's turning off notifications at 7 PM.\nSometimes it's going to sleep instead of forcing one more chapter.\n\nWhat does real self-care look like for you this week? Drop your definition in the comments ✨`,
        hashtags: "#SelfCareTruth #GentleReminders #BoundariesMatter #MentalHealthMoments",
        insight: "Contrarian empathy hooks trigger emotional validation comments.",
        memories: [
          "Founder post on 2026-09-18 scored 83 comments by focusing on authentic boundaries.",
          "Hindsight signal: Audience appreciates realistic balance over toxic positivity."
        ]
      },
      {
        id: "reel-c3",
        title: "Pick Your Sunday Reset Mood (A, B, or C)",
        hookAngle: "Interactive Gamified Choice",
        tone: "Playful & Community-Driven",
        score: 90,
        metrics: { hook: 92, share: 88, comment: 96, memory: 93 },
        caption: `Quick check-in! Which Sunday Reset mood are you stepping into today?\n\nA) Complete digital detox & slow coffee ☕\nB) Reorganize workspace & grocery prep 🌿\nC) Total couch hibernate & zero obligations 🛋️\n\nDrop your letter in the comments!`,
        hashtags: "#SundayReset #WeekendVibes #MindfulHabits #WellnessCommunity",
        insight: "Low-friction single-letter comment prompts drive 2.4x higher comment velocity in first 30 minutes.",
        memories: [
          "Historical posts with multi-choice prompts achieved lowest drop-off rates.",
          "Audience segment data highlights Sunday as the peak engagement day for wellness resets."
        ]
      }
    ],
    "drive-profile-visits": [
      {
        id: "reel-p1",
        title: "The Free Morning Ritual Planner We Secretly Use",
        hookAngle: "Value Cliffhanger & Resource Teaser",
        tone: "Inspiring & Generous",
        score: 93,
        metrics: { hook: 95, share: 94, comment: 89, memory: 96 },
        caption: `We spent 6 months designing the simplest one-page routine planner so you never feel overwhelmed on Monday mornings.\n\nNo 20-step checklists. Just clarity, breath, and focus.\n\nLink in bio to download your copy free this week 🌿✨`,
        hashtags: "#FreeResource #MorningRitual #MindfulRoutine #ProductivityHabits",
        insight: "Clear value-first incentive lifts bio link taps by up to 54%.",
        memories: [
          "Audience survey from Hindsight memory bank: 68% requested downloadable template.",
          "Reels with profile CTAs converted 3.2x better when showing a physical printout."
        ]
      },
      {
        id: "reel-p2",
        title: "Why We Built Bloom & Co. (Behind the Founder Journey)",
        hookAngle: "Founder Origin Story",
        tone: "Intimate & Inspiring",
        score: 91,
        metrics: { hook: 91, share: 90, comment: 91, memory: 94 },
        caption: `In 2023, burnout made me question everything about modern hustle culture.\n\nHere’s how building a deliberate morning reset changed my entire life — and inspired our collective.\n\nTap our profile to read our full story & explore our ethos.`,
        hashtags: "#FounderStory #MindfulBusiness #SlowLiving #BurnoutRecovery",
        insight: "Personal storytelling creates brand intimacy and attracts high-intent profile visits.",
        memories: [
          "Post #6 (Founder letter) scored top 10% engagement in Impressions/Profile Visit ratio.",
          "Hindsight profile reflects strong loyalty to genuine vulnerability."
        ]
      },
      {
        id: "reel-p3",
        title: "3 Things We Removed From Our Routine to Double Our Peace",
        hookAngle: "Negative Elimination Strategy",
        tone: "Minimalist & Direct",
        score: 89,
        metrics: { hook: 93, share: 89, comment: 87, memory: 92 },
        caption: `Growth isn't about adding more tasks. It's about taking away what drains you.\n\nHere are 3 micro-habits we eliminated this month.\n\nVisit our page for daily peaceful living frameworks 🕊️`,
        hashtags: "#LessIsMore #MinimalistLiving #DailyReset #IntentionalLife",
        insight: "Subtraction advice stands out against overwhelming 'do more' content.",
        memories: [
          "Audience data shows high fatigue around complicated 10-step morning routines."
        ]
      }
    ],
    "save-worthy-checklist": [
      {
        id: "reel-s1",
        title: "The Sunday Reset Checklist You'll Actually Keep",
        hookAngle: "Save-Stacker Micro Checklist",
        tone: "Practical & High-Utility",
        score: 96,
        metrics: { hook: 97, share: 96, comment: 93, memory: 99 },
        caption: `🔖 Tap the bookmark icon to save this for Sunday night:\n\n1. Clear your digital desktop (10 mins)\n2. Write down your top 3 non-negotiables for Monday\n3. Pre-pack your bag or set out your journal\n4. Drink 16oz of water before sleep\n\nYour Monday morning self will thank you.`,
        hashtags: "#SundayReset #WeeklyPlanning #MindfulHabits #SaveForLater #LifeHacks",
        insight: "Actionable 4-point checklists generate 64% of total engagement in Saves & Bookmarks.",
        memories: [
          "Post #7 ('Save this guide for later') had 142 shares and 468 likes — your top-shared post.",
          "Hindsight memory bank recommends explicitly asking for the bookmark in line 1."
        ]
      },
      {
        id: "reel-s2",
        title: "5 Micro-Habits That Take Less Than 60 Seconds",
        hookAngle: "Ultra-Low Friction Stacking",
        tone: "Supportive & Actionable",
        score: 95,
        metrics: { hook: 96, share: 95, comment: 90, memory: 97 },
        caption: `Tiny habits create massive calm.\n\nSave this 60-second toolkit:\n• 3 deep box breaths before opening emails\n• Stretch your spine at 11 AM & 3 PM\n• Leave phone in another room during lunch\n• Write 1 good thing from today\n\nSave this for days when life feels fast ✨`,
        hashtags: "#MicroHabits #GentleProductivity #MentalHealthMatters #SaveThis",
        insight: "Low-effort high-reward framing has the highest completion rate in video formats.",
        memories: [
          "Hindsight signal: Audience loves 'bite-sized' wellness actionable in under 2 minutes."
        ]
      },
      {
        id: "reel-s3",
        title: "The 8-Hour Workday Energy Protect Checklist",
        hookAngle: "Professional Burnout Shield",
        tone: "Smart & Compassionate",
        score: 93,
        metrics: { hook: 94, share: 93, comment: 89, memory: 95 },
        caption: `How to protect your nervous system during a demanding 9-to-5:\n\n1. Block 15 mins of buffer time between calls\n2. 20-20-20 rule for screen fatigue\n3. Drink water with lemon mid-afternoon\n4. Establish a firm shutdown ritual\n\nSave this to protect your energy tomorrow 🔋`,
        hashtags: "#WorkplaceWellness #WorkLifeBalance #EnergyManagement #CorporateWellness",
        insight: "Direct appeal to working professionals matches primary audience persona demographics.",
        memories: [
          "Demographic filter: 74% of followers are working professionals aged 25-40."
        ]
      }
    ],
    "behind-the-scenes": [
      {
        id: "reel-b1",
        title: "How We Curate Our Morning Brew Ritual in the Studio",
        hookAngle: "Sensory ASMR + Studio Atmosphere",
        tone: "Warm, Organic & Atmospheric",
        score: 91,
        metrics: { hook: 93, share: 89, comment: 94, memory: 95 },
        caption: `Come spend the first 30 minutes in our creative studio with us 🌿\n\nNo loud alarms, no rush. Just ceramic mugs, organic matcha, soft ambient light, and planning our weekly journal.\n\nWhat’s your favorite quiet moment of the day?`,
        hashtags: "#BehindTheScenes #StudioVlog #SlowMorning #AestheticVibes #CreativeLife",
        insight: "Atmospheric ASMR styling increases 3-second watch-through retention by 42%.",
        memories: [
          "Post #1 (Behind the scenes look) gathered 426 likes with strong sentiment analysis.",
          "Hindsight note: Sensory aesthetic content builds distinct brand recognition."
        ]
      },
      {
        id: "reel-b2",
        title: "What Happens When a Creative Idea Fails? (Real Talk)",
        hookAngle: "Transparent Process Revelation",
        tone: "Candid & Relatable",
        score: 89,
        metrics: { hook: 90, share: 88, comment: 92, memory: 92 },
        caption: `Not every product sample or content idea makes the cut.\n\nHere’s a peek behind our studio doors at 3 concepts that didn't work out this month — and why we're glad they didn't.\n\nWould you want to see more candid studio reflections?`,
        hashtags: "#CreativeProcess #AuthenticBusiness #StudioDiaries #MakersGottaMake",
        insight: "Showing imperfections builds deep organic trust with community members.",
        memories: [
          "Audience signals demonstrate high engagement on candid maker retrospectives."
        ]
      },
      {
        id: "reel-b3",
        title: "A Day in the Life: Sourcing Sustainable Ceramics",
        hookAngle: "Makers Craft & Sustainable Values",
        tone: "Thoughtful & Educational",
        score: 90,
        metrics: { hook: 92, share: 90, comment: 91, memory: 93 },
        caption: `Every piece in our morning kit has a story.\n\nToday, we took a drive to meet local artisans shaping our limited ceramic cups by hand.\n\nNotice the tiny speckled texture? Tell us your favorite artisan touch!`,
        hashtags: "#HandmadeCeramics #ArtisanMade #SlowCraft #MindfulLiving",
        insight: "Craft-oriented posts receive high value-sharing among eco-conscious followers.",
        memories: [
          "Post #3 ('Meet the makers') achieved high qualitative praise in past campaign cycles."
        ]
      }
    ]
  },
  feed: {
    "boost-comments": [
      {
        id: "feed-c1",
        title: "The Quiet Art of Doing One Thing at a Time",
        hookAngle: "Monotasking Philosophy",
        tone: "Reflective & Elegant",
        score: 92,
        metrics: { hook: 93, share: 89, comment: 95, memory: 96 },
        caption: `We’ve normalized having 24 browser tabs open while sipping cold coffee and checking Slack.\n\nWhat happens when you close 23 of them and give your full, patient presence to the task right in front of you?\n\nTry this today: one notebook, one cup, one intention.\n\nWhat is your #1 focus today? Let's hold space together in the comments 👇`,
        hashtags: "#Monotasking #DeepWork #SlowLiving #MindfulFocus",
        insight: "Reflective essays with prompt questions attract thoughtful paragraph responses.",
        memories: ["Audience values thoughtful essay-style photo captions on mid-week mornings."]
      },
      {
        id: "feed-c2",
        title: "A Gentle Question for Your Mid-Week Reset",
        hookAngle: "Vulnerable Community Prompt",
        tone: "Tender & Reassuring",
        score: 89,
        metrics: { hook: 90, share: 87, comment: 94, memory: 92 },
        caption: `Pause right where you are.\nUnclench your jaw. Drop your shoulders away from your ears. Take one deep breath in... and let it go.\n\nHow is your heart feeling today, really? We're reading and responding to every note below 🤍`,
        hashtags: "#MentalHealthCheckIn #MindfulnessPractice #CommunityLove #GentleLiving",
        insight: "Somatic check-in prompts generate high emotional resonance and community loyalty.",
        memories: ["Hindsight bank tracks high comment density on check-in style photo posts."]
      },
      {
        id: "feed-c3",
        title: "Which Corner of Your Home Gives You the Most Peace?",
        hookAngle: "Home Sanctuary & Visual Aesthetic",
        tone: "Warm & Cozy",
        score: 88,
        metrics: { hook: 89, share: 85, comment: 93, memory: 91 },
        caption: `It doesn't have to be a big room. Sometimes it's just the armchair near the window where the morning light hits first.\n\nWhere is your sanctuary spot at home? Describe it or drop an emoji below 🌿`,
        hashtags: "#HomeSanctuary #AestheticInteriors #CozyVibes #MindfulHome",
        insight: "Simple evocative lifestyle questions invite effortless participation.",
        memories: ["Lifestyle imagery paired with home-living themes ranks in top 20% engagement."]
      }
    ]
  },
  carousel: {
    "save-worthy-checklist": [
      {
        id: "car-s1",
        title: "The 7-Day Mindful Reset (Swipe-Ready Blueprint)",
        hookAngle: "7-Slide Day-by-Day System",
        tone: "Structured & Inspiring",
        score: 97,
        metrics: { hook: 98, share: 97, comment: 94, memory: 99 },
        caption: `👉 Swipe through to save our complete 7-Day Mindful Reset.\n\nSlide 1: Sunday Prep\nSlide 2: Mon Monotask\nSlide 3: Tue Digital Sunset\nSlide 4: Wed Mid-week Stroll\nSlide 5: Thu Energy Audit\nSlide 6: Fri Gratitude Journal\nSlide 7: Weekend Stillness\n\n🔖 Save this post so it's ready whenever you need a reset!`,
        hashtags: "#CarouselGuide #WeeklyReset #MindfulnessGuide #LifeOrganization #SaveThis",
        insight: "Multi-slide guides achieve the highest save-to-impression ratio (14.2%).",
        memories: [
          "Post #7 (Carousel Guide) generated 142 shares and 73 comments.",
          "Hindsight memory bank identifies 'Save this guide for later' as the highest converting hook."
        ]
      },
      {
        id: "car-s2",
        title: "5 Books That Will Redefine How You Rest",
        hookAngle: "Curated Thought Leadership Library",
        tone: "Literary & Elevated",
        score: 94,
        metrics: { hook: 95, share: 96, comment: 90, memory: 96 },
        caption: `Rest isn't just sleeping. It's sensory, creative, emotional, and social.\n\nHere are 5 books that helped us unlearn exhaustion and rebuild sustainable peace:\n\n1. Rest Is Resistance\n2. The Comfort Book\n3. Digital Minimalism\n4. Wintering\n5. Slow Productivity\n\nSwipe to read key takeaways from each! 📚✨`,
        hashtags: "#BookRecommendations #ReadingList #RestCulture #SlowProductivity",
        insight: "Book recommendation carousels are universally shared to Instagram Stories.",
        memories: ["Audiences regularly request resource lists and curated reading guides."]
      },
      {
        id: "car-s3",
        title: "How to Build a Morning Routine That Actually Survives Chaos",
        hookAngle: "Adaptive Systems Framework",
        tone: "Realistic & Practical",
        score: 93,
        metrics: { hook: 94, share: 94, comment: 91, memory: 95 },
        caption: `Most routines fail because they only work on your best days.\n\nSwipe to learn our '3-Tier Routine' method:\n• Tier 1: Ideal Days (30 mins)\n• Tier 2: Busy Days (10 mins)\n• Tier 3: Survival Days (2 mins)\n\nWhich tier are you leaning into today? Save for future reference!`,
        hashtags: "#HabitDesign #MorningRoutine #AdaptiveHabits #MindfulProductivity",
        insight: "Tiered routine concepts reduce overwhelm and encourage bookmarking.",
        memories: ["Post #4 ('Routine that actually sticks') hit 392 likes with high retention."]
      }
    ]
  },
  story: {
    "boost-comments": [
      {
        id: "story-1",
        title: "Behind-The-Scenes Studio Poll & Q&A",
        hookAngle: "Interactive Tap-to-Vote Sticker",
        tone: "Spontaneous & Personal",
        score: 93,
        metrics: { hook: 96, share: 88, comment: 96, memory: 94 },
        caption: `Quick poll on our story today!\n\nAre you a 'brew coffee before checking emails' or 'check emails while the kettle boils'?\n\nTap your answer on the sticker, or reply to this story with your exact ritual ☕👀`,
        hashtags: "#StoryPoll #MorningCoffee #CommunityPoll #StudioLife",
        insight: "Stickers double story completion rates and drive direct DM conversations.",
        memories: ["Hindsight bank: Direct DM conversations correlate with 4x higher brand loyalty."]
      }
    ]
  },
  thread: {
    "save-worthy-checklist": [
      {
        id: "thread-1",
        title: "7 Micro-Lessons on Focus From Analyzing 1,000 Mornings",
        hookAngle: "Data-Backed Thesis Thread",
        tone: "Crisp & Punchy",
        score: 95,
        metrics: { hook: 97, share: 96, comment: 92, memory: 97 },
        caption: `Over the past year, we analyzed the daily habits of 1,000 high-focus creators.\n\nHere are 7 counterintuitive truths about morning routines:\n\n1/ Waking up at 5 AM is overrated. Consistent sleep timing beats early alarms.\n2/ Cortisol peaks naturally 30m after waking. Delay caffeine to avoid the 2 PM crash.\n3/ If you look at phone screens before natural sunlight, your brain skips morning recalibration.\n\nBookmark this thread for your next review 🧵👇`,
        hashtags: "#FocusTips #MindsetThread #ProductivityFramework #HabitDesign",
        insight: "Numbered listicles with bold opening sentences drive high bookmark and repost rates on X.",
        memories: ["Hindsight shows high viral amplification on high-conviction health assertions."]
      }
    ]
  }
};

// Fallback generator for combinations
function getRecommendationsFor(service, goal) {
  if (RECOMMENDATIONS_DATABASE[service] && RECOMMENDATIONS_DATABASE[service][goal]) {
    return RECOMMENDATIONS_DATABASE[service][goal];
  }
  // Try fallback in same service
  if (RECOMMENDATIONS_DATABASE[service]) {
    const keys = Object.keys(RECOMMENDATIONS_DATABASE[service]);
    if (keys.length > 0) return RECOMMENDATIONS_DATABASE[service][keys[0]];
  }
  // Fallback to reel recommendations
  return RECOMMENDATIONS_DATABASE["reel"]["boost-comments"];
}

// ==========================================================================
// APPLICATION STATE
// ==========================================================================
let currentBrand = "bloom";
let currentService = "reel";
let currentGoal = "boost-comments";
let currentAcceptedIdea = null;
let currentRecommendations = [];
let isChatCollapsed = false;
let isLiked = false;
let isSaved = false;
let likeCount = 642;

// ==========================================================================
// DOM ELEMENT SELECTORS
// ==========================================================================
const brandSelect = document.getElementById("brandSelect");
const currentPlatformIcon = document.getElementById("currentPlatformIcon");
const displayUsername = document.getElementById("displayUsername");
const greetingUsername = document.getElementById("greetingUsername");
const userAvatarImg = document.getElementById("userAvatarImg");

// Stats
const statPostsCount = document.getElementById("statPostsCount");
const statAvgEngagement = document.getElementById("statAvgEngagement");
const statTopFormat = document.getElementById("statTopFormat");

// Service Hub
const servicePills = document.querySelectorAll(".service-pill-btn");
const activeFormatLabel = document.getElementById("activeFormatLabel");
const serviceFramework = document.getElementById("serviceFramework");
const serviceHookStyle = document.getElementById("serviceHookStyle");
const serviceOptimalTime = document.getElementById("serviceOptimalTime");

// Studio
const dynamicPromptQuestion = document.getElementById("dynamicPromptQuestion");
const goalChips = document.querySelectorAll(".goal-chip");
const customStudioPrompt = document.getElementById("customStudioPrompt");
const generateIdeasBtn = document.getElementById("generateIdeasBtn");
const recommendationCardsGrid = document.getElementById("recommendationCardsGrid");
const agentThinkingIndicator = document.getElementById("agentThinkingIndicator");

// Chat
const chatCard = document.getElementById("chatCard");
const chatCollapseToggle = document.getElementById("chatCollapseToggle");
const chatMessagesStream = document.getElementById("chatMessagesStream");
const chatForm = document.getElementById("chatForm");
const chatInputText = document.getElementById("chatInputText");
const quickPromptPills = document.querySelectorAll(".quick-prompt-pill");

// Mockup & Live Preview
const previewPlatformTitle = document.getElementById("previewPlatformTitle");
const mockupBrandAvatar = document.getElementById("mockupBrandAvatar");
const mockupBrandHandle = document.getElementById("mockupBrandHandle");
const captionUser = document.getElementById("captionUser");
const mockupImage = document.getElementById("mockupImage");
const mockupCaptionBody = document.getElementById("mockupCaptionBody");
const mockupTags = document.getElementById("mockupTags");
const mockupLikeBtn = document.getElementById("mockupLikeBtn");
const mockupLikeCount = document.getElementById("mockupLikeCount");
const mockupSaveBtn = document.getElementById("mockupSaveBtn");
const copyMediaKitBtn = document.getElementById("copyMediaKitBtn");

// Predictor
const predictorScoreNum = document.getElementById("predictorScoreNum");
const metricHookPercent = document.getElementById("metricHookPercent");
const metricHookBar = document.getElementById("metricHookBar");
const metricSharePercent = document.getElementById("metricSharePercent");
const metricShareBar = document.getElementById("metricShareBar");
const metricCommentPercent = document.getElementById("metricCommentPercent");
const metricCommentBar = document.getElementById("metricCommentBar");
const metricMemoryPercent = document.getElementById("metricMemoryPercent");
const metricMemoryBar = document.getElementById("metricMemoryBar");
const predictorInsightText = document.getElementById("predictorInsightText");

// Notifications & Popover
const notifButton = document.getElementById("notifButton");
const notifPopover = document.getElementById("notifPopover");
const clearNotifsBtn = document.getElementById("clearNotifsBtn");

// Modal
const rationaleModal = document.getElementById("rationaleModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalDismissBtn = document.getElementById("modalDismissBtn");
const modalAcceptFromModalBtn = document.getElementById("modalAcceptFromModalBtn");
const modalBodyContent = document.getElementById("modalBodyContent");
let modalTargetIdea = null;

// Toast
const toastContainer = document.getElementById("toastContainer");

// ==========================================================================
// CORE INITIALIZATION & RENDERING
// ==========================================================================
function initApp() {
  closeRationaleModal(); // Enforce modal is closed on initial page load
  attachEventListeners();
  updateBrandUI(currentBrand);
  switchService(currentService);
  loadRecommendations();
}

function updateBrandUI(brandKey) {
  const brand = BRANDS[brandKey];
  if (!brand) return;

  currentPlatformIcon.textContent = brand.platformIcon;
  displayUsername.textContent = brand.name;
  greetingUsername.textContent = brand.name;
  
  statPostsCount.textContent = `${brand.postsCount} Posts Analyzed`;
  statAvgEngagement.textContent = `${brand.avgEngagement}% Avg Engagement`;
  statTopFormat.textContent = `Top Format: ${brand.topFormat}`;

  mockupBrandHandle.textContent = brand.handle;
  captionUser.textContent = brand.handle;
  mockupBrandAvatar.src = brand.avatar;
  userAvatarImg.src = brand.avatar;

  if (brand.previewImage) {
    mockupImage.src = brand.previewImage;
  }

  showToast(`Switched brand to ${brand.name} (${brand.platform})`);
}

function switchService(serviceKey) {
  currentService = serviceKey;
  const config = SERVICE_CONFIGS[serviceKey];
  if (!config) return;

  // Update pills
  servicePills.forEach(pill => {
    const isThis = pill.dataset.service === serviceKey;
    pill.classList.toggle("active", isThis);
    pill.setAttribute("aria-selected", isThis ? "true" : "false");
  });

  // Update label & tray
  activeFormatLabel.textContent = `Format: ${config.name} (${config.badge})`;
  serviceFramework.textContent = config.framework;
  serviceHookStyle.textContent = config.hookStyle;
  serviceOptimalTime.textContent = config.optimalTime;

  // Update Studio dynamic question
  dynamicPromptQuestion.innerHTML = `What goal should we target for your <strong>${config.name}</strong>?`;

  // Update Preview Platform title
  previewPlatformTitle.textContent = `${BRANDS[currentBrand].platform} Feed Preview (${config.name})`;

  loadRecommendations();
}

function selectGoal(goalKey) {
  currentGoal = goalKey;
  goalChips.forEach(chip => {
    chip.classList.toggle("active", chip.dataset.goal === goalKey);
  });
  loadRecommendations();
}

function loadRecommendations() {
  // Show thinking indicator briefly
  if (agentThinkingIndicator) {
    agentThinkingIndicator.hidden = false;
  }

  setTimeout(() => {
    if (agentThinkingIndicator) {
      agentThinkingIndicator.hidden = true;
    }

    currentRecommendations = getRecommendationsFor(currentService, currentGoal);
    renderRecommendationCards(currentRecommendations);

    // Default select first idea if none selected or if format changed
    if (currentRecommendations.length > 0) {
      applyIdeaToPreview(currentRecommendations[0]);
    }
  }, 280);
}

function renderRecommendationCards(ideas) {
  recommendationCardsGrid.innerHTML = "";

  ideas.forEach((idea, index) => {
    const isAccepted = currentAcceptedIdea && currentAcceptedIdea.id === idea.id;
    const card = document.createElement("div");
    card.className = `recommendation-card ${isAccepted ? "accepted" : ""}`;
    card.id = `rec-card-${idea.id}`;

    card.innerHTML = `
      <div class="rec-card-top">
        <span class="rec-format-badge">${SERVICE_CONFIGS[currentService].badge}</span>
        <span class="rec-score-pill">📈 ${idea.score}/100 Match</span>
      </div>
      <h4 class="rec-title-line">${idea.title}</h4>
      <div class="rec-hook-angle-box">
        <span class="hook-angle-label">Hook Angle</span>
        <span class="hook-angle-text">${idea.hookAngle}</span>
      </div>
      <div class="rec-tone-indicator">
        <span class="tone-dot"></span>
        <span>Tone: ${idea.tone}</span>
      </div>
      <div class="rec-caption-box">${escapeHtml(idea.caption)}</div>
      <div class="rec-actions-group">
        <button class="btn-accept-idea" onclick="acceptIdeaById('${idea.id}')">
          <span>${isAccepted ? "✅ Idea Accepted & Active" : "✅ Accept Idea"}</span>
        </button>
        <div class="rec-secondary-actions">
          <button class="btn-card-secondary" onclick="remixIdeaById('${idea.id}')" title="Generate alternative hook & caption variations">
            <span>🔄 Remix with Agent</span>
          </button>
          <button class="btn-card-secondary" onclick="openRationaleModalById('${idea.id}')" title="Inspect Hindsight memories and data proof">
            <span>📊 View Rationale</span>
          </button>
        </div>
      </div>
    `;

    recommendationCardsGrid.appendChild(card);
  });
}

function acceptIdeaById(ideaId) {
  const idea = currentRecommendations.find(i => i.id === ideaId);
  if (!idea) return;

  currentAcceptedIdea = idea;
  applyIdeaToPreview(idea);

  // Update card visuals
  document.querySelectorAll(".recommendation-card").forEach(c => c.classList.remove("accepted"));
  const activeCard = document.getElementById(`rec-card-${ideaId}`);
  if (activeCard) {
    activeCard.classList.add("accepted");
    const acceptBtn = activeCard.querySelector(".btn-accept-idea span");
    if (acceptBtn) acceptBtn.textContent = "✅ Idea Accepted & Active";
  }

  showToast(`Accepted idea: "${idea.title.slice(0, 30)}..." ✨`);
}

function applyIdeaToPreview(idea) {
  currentAcceptedIdea = idea;

  // Update mockup caption & tags
  mockupCaptionBody.innerHTML = idea.caption.replace(/\n/g, "<br>");
  mockupTags.textContent = idea.hashtags;

  // Update Predictor score
  predictorScoreNum.textContent = idea.score;
  metricHookPercent.textContent = `${idea.metrics.hook}%`;
  metricHookBar.style.width = `${idea.metrics.hook}%`;

  metricSharePercent.textContent = `${idea.metrics.share}%`;
  metricShareBar.style.width = `${idea.metrics.share}%`;

  metricCommentPercent.textContent = `${idea.metrics.comment}%`;
  metricCommentBar.style.width = `${idea.metrics.comment}%`;

  metricMemoryPercent.textContent = `${idea.metrics.memory}%`;
  metricMemoryBar.style.width = `${idea.metrics.memory}%`;

  predictorInsightText.innerHTML = `<strong>Strongest signal:</strong> ${idea.insight}`;
}

function remixIdeaById(ideaId) {
  const idea = currentRecommendations.find(i => i.id === ideaId);
  if (!idea) return;

  const card = document.getElementById(`rec-card-${ideaId}`);
  if (card) {
    card.style.opacity = "0.5";
    card.style.transform = "scale(0.98)";
  }

  setTimeout(() => {
    // Variations pool
    const hooks = [
      "Contrarian First Principle: Stop trying to do it all before 8 AM.",
      "The 60-second micro habit that gave our team their mornings back.",
      "POV: What happens when you eliminate 80% of routine friction?",
      "3 non-negotiables we swear by for sustainable energy."
    ];
    const tones = [
      "Crisp, Authoritative & Inspiring",
      "Gentle, Intimate & Vulnerable",
      "Dynamic & High-Energy",
      "Poetic & Grounded"
    ];

    const newHook = hooks[Math.floor(Math.random() * hooks.length)];
    const newTone = tones[Math.floor(Math.random() * tones.length)];
    
    idea.hookAngle = newHook;
    idea.tone = newTone;
    idea.title = `${idea.title} (Remixed)`;
    idea.score = Math.min(98, idea.score + 2);
    idea.metrics.hook = Math.min(99, idea.metrics.hook + 1);

    if (card) {
      card.style.opacity = "1";
      card.style.transform = "none";
    }

    renderRecommendationCards(currentRecommendations);
    acceptIdeaById(idea.id);
    showToast("Remixed idea with fresh viral hook & tone variation 🎯");
  }, 400);
}

// ==========================================================================
// RATIONALE & HINDSIGHT MEMORY MODAL
// ==========================================================================
function openRationaleModalById(ideaId) {
  // Attempt to locate idea in current recommendations
  let idea = currentRecommendations.find(i => i.id === ideaId);
  
  // Fallback search across all database formats if not found in active list
  if (!idea) {
    for (const sKey in RECOMMENDATIONS_DATABASE) {
      for (const gKey in RECOMMENDATIONS_DATABASE[sKey]) {
        const match = RECOMMENDATIONS_DATABASE[sKey][gKey].find(i => i.id === ideaId);
        if (match) {
          idea = match;
          break;
        }
      }
      if (idea) break;
    }
  }

  // If still not found, fallback to accepted idea
  if (!idea && currentAcceptedIdea && currentAcceptedIdea.id === ideaId) {
    idea = currentAcceptedIdea;
  }

  modalTargetIdea = idea;
  const brand = BRANDS[currentBrand] || {
    name: "Bloom & Co.",
    hindsightBank: "social-pulse-demo",
    postsCount: 8,
    avgEngagement: 7.2
  };

  if (!idea) {
    // Graceful fallback when idea data is unavailable
    modalBodyContent.innerHTML = `
      <div class="rationale-block" style="text-align:center; padding:32px 18px;">
        <div style="font-size:2.2rem; margin-bottom:10px;">🧠</div>
        <h5 style="font-size:1.02rem; color:#0F172A; margin-bottom:8px;">Hindsight Rationale Currently Unavailable</h5>
        <p style="color:#64748B; font-size:0.86rem; line-height:1.5; max-width:440px; margin:0 auto;">
          No stored memory signals or performance rationale could be retrieved for this item. Please select or remix an active recommendation card to view its evidence bank.
        </p>
      </div>
    `;
  } else {
    // Render actual AI rationale and Hindsight memories
    const memoriesList = (idea.memories && idea.memories.length > 0)
      ? idea.memories.map(m => `<li>${escapeHtml(m)}</li>`).join("")
      : `<li>Audience preferences and signals dynamically tracked across ${brand.postsCount} posts in bank: <strong>${escapeHtml(brand.hindsightBank)}</strong>.</li>`;

    modalBodyContent.innerHTML = `
      <div class="rationale-block">
        <h5>🎯 Recommendation Focus</h5>
        <p><strong>${escapeHtml(idea.title)}</strong> — Targeted at the <em>${escapeHtml(idea.hookAngle)}</em> angle with a <em>${escapeHtml(idea.tone)}</em> tone.</p>
      </div>

      <div class="rationale-block">
        <h5>🧠 Hindsight Memory Bank Signals (${escapeHtml(brand.hindsightBank)})</h5>
        <ul>
          ${memoriesList}
        </ul>
        <div class="memory-tags-list">
          <span class="memory-tag">#HindsightBank: ${escapeHtml(brand.hindsightBank)}</span>
          <span class="memory-tag">#AudienceRecall: Active</span>
          <span class="memory-tag">#HistoricalPostCount: ${brand.postsCount}</span>
          <span class="memory-tag">#AvgEngagementRate: ${brand.avgEngagement}%</span>
        </div>
      </div>

      <div class="rationale-block">
        <h5>📊 Algorithmic Engagement Rationale</h5>
        <p>${escapeHtml(idea.insight || "Optimized based on historical format conversion metrics.")}</p>
        <p style="margin-top: 6px; font-size: 0.78rem; color: #64748B;">
          Predicted Score: <strong>${idea.score || 90}/100</strong> (Hook retention: ${idea.metrics?.hook || 95}%, Shareability: ${idea.metrics?.share || 90}%, Memory alignment: ${idea.metrics?.memory || 95}%).
        </p>
      </div>
    `;
  }

  // Open modal explicitly only upon user click
  rationaleModal.style.display = "grid";
  rationaleModal.removeAttribute("hidden");
  rationaleModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeRationaleModal() {
  rationaleModal.style.display = "none";
  rationaleModal.setAttribute("hidden", "");
  rationaleModal.classList.remove("active");
  modalTargetIdea = null;
  document.body.style.overflow = "";
}

// ==========================================================================
// INTERACTIVE AGENT CHAT
// ==========================================================================
function handleChatSubmit(e) {
  if (e) e.preventDefault();
  const text = chatInputText.value.trim();
  if (!text) return;

  chatInputText.value = "";
  appendChatMessage("user", text);

  // Agent response simulation
  setTimeout(() => {
    generateAgentRefinement(text);
  }, 500);
}

function appendChatMessage(role, text) {
  const bubble = document.createElement("div");
  bubble.className = `message-bubble ${role === "user" ? "user-message" : "agent-message"}`;

  const timeStr = "Just now";
  bubble.innerHTML = `
    <div class="message-sender">
      <span class="agent-tag">${role === "user" ? "You" : "Social Pulse Agent"}</span>
      <span class="message-time">${timeStr}</span>
    </div>
    <div class="message-text">${text}</div>
  `;

  chatMessagesStream.appendChild(bubble);
  chatMessagesStream.scrollTop = chatMessagesStream.scrollHeight;
}

function generateAgentRefinement(userPrompt) {
  let reply = "";
  const lower = userPrompt.toLowerCase();

  if (lower.includes("punchier") || lower.includes("short")) {
    reply = `I’ve streamlined your caption by 25%, sharpened the first line, and focused solely on high-retention bullet points. Check your live preview — it now reads with maximum punch! ⚡`;
    if (currentAcceptedIdea) {
      currentAcceptedIdea.caption = `POV: 3 habits that changed our mornings (without waking up early ☀️):\n\n• 10m natural light\n• 1 written intention\n• Hydrate before caffeine\n\nWhich one is yours? 👇`;
      applyIdeaToPreview(currentAcceptedIdea);
    }
  } else if (lower.includes("hook") || lower.includes("variation")) {
    reply = `Here are 3 viral hook variations for this post:\n\n1. "The morning routine that fixed our burnout (in 7 days)." 🚀\n2. "Most people start their day with dopamine overload. Try this instead." 🎯\n3. "If you do one thing tomorrow morning, make it this." ✨\n\nI’ve loaded Variation #1 directly into your active card!`;
    if (currentAcceptedIdea) {
      currentAcceptedIdea.caption = `The morning routine that fixed our burnout (in 7 days):\n\n1. Screen-free first 10 minutes\n2. One priority on paper\n3. High-protein breakfast\n\nTell us your morning ritual below 👇`;
      applyIdeaToPreview(currentAcceptedIdea);
    }
  } else if (lower.includes("cta") || lower.includes("comment")) {
    reply = `I added an irresistible open question at the end: *"What’s the one morning habit you refuse to compromise on? Drop it below!"* This pattern consistently drives a 40% boost in comment replies. 💬`;
    if (currentAcceptedIdea) {
      currentAcceptedIdea.caption += `\n\nWhat’s the one morning habit you refuse to compromise on? Drop it below! 👇`;
      applyIdeaToPreview(currentAcceptedIdea);
    }
  } else if (lower.includes("tone") || lower.includes("bold")) {
    reply = `Shifted tone to bold and inspiring! Strengthened the verbs, removed hesitant language, and positioned your brand as a confident leader in mindful productivity. 🔥`;
    if (currentAcceptedIdea) {
      currentAcceptedIdea.tone = "Bold, Inspiring & Authentic";
      currentAcceptedIdea.caption = `Stop sacrificing your peace for busyness. Here are the 3 non-negotiables our team lives by every single day.\n\nTake back your mornings. Which habit starts tomorrow? ⚡`;
      applyIdeaToPreview(currentAcceptedIdea);
    }
  } else {
    reply = `Refinement applied! I tailored your recommendation based on: "${userPrompt}". I also updated your engagement predictor score to reflect this higher-affinity angle.`;
    if (currentAcceptedIdea) {
      currentAcceptedIdea.caption = `${userPrompt}\n\n${currentAcceptedIdea.caption}`;
      applyIdeaToPreview(currentAcceptedIdea);
    }
  }

  appendChatMessage("agent", reply);
}

// ==========================================================================
// UTILITY FUNCTIONS: COPY, TOAST, NOTIFICATIONS
// ==========================================================================
function copyMediaKit() {
  if (!currentAcceptedIdea) return;

  const kitText = `--- SOCIAL PULSE AGENT MEDIA KIT ---
Brand: ${BRANDS[currentBrand].name} (@${BRANDS[currentBrand].handle})
Format: ${SERVICE_CONFIGS[currentService].name} (${SERVICE_CONFIGS[currentService].badge})
Optimal Posting Time: ${SERVICE_CONFIGS[currentService].optimalTime}
Hook Angle: ${currentAcceptedIdea.hookAngle}
Tone: ${currentAcceptedIdea.tone}
Predicted Engagement Score: ${currentAcceptedIdea.score}/100

[READY-TO-USE CAPTION]
${currentAcceptedIdea.caption}

[HASHTAGS]
${currentAcceptedIdea.hashtags}

[PRODUCTION NOTES]
Visual Aspect Ratio: ${SERVICE_CONFIGS[currentService].aspectRatio}
Audio Style: Soft acoustic / Sunday reset ambient
Framework: ${SERVICE_CONFIGS[currentService].framework}
Hindsight Alignment: Verified against ${BRANDS[currentBrand].postsCount} past posts.
-------------------------------------`;

  navigator.clipboard.writeText(kitText).then(() => {
    showToast("📋 Copied caption & media production kit to clipboard! ✨");
  }).catch(() => {
    showToast("Copied to clipboard!");
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✨</span><span>${escapeHtml(message)}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================================================
// EVENT LISTENERS BINDING
// ==========================================================================
function attachEventListeners() {
  // Brand selection
  brandSelect.addEventListener("change", (e) => {
    currentBrand = e.target.value;
    updateBrandUI(currentBrand);
    loadRecommendations();
  });

  // Services tabs
  servicePills.forEach(pill => {
    pill.addEventListener("click", () => {
      switchService(pill.dataset.service);
    });
  });

  // Goal chips
  goalChips.forEach(chip => {
    chip.addEventListener("click", () => {
      selectGoal(chip.dataset.goal);
    });
  });

  // Custom prompt synthesis
  generateIdeasBtn.addEventListener("click", () => {
    const val = customStudioPrompt.value.trim();
    if (val) {
      appendChatMessage("user", `Goal: "${val}"`);
      showToast(`Synthesizing recommendations for: "${val}"`);
      setTimeout(() => {
        generateAgentRefinement(val);
      }, 300);
    } else {
      loadRecommendations();
      showToast("Refreshed agent recommendations with latest signals.");
    }
  });

  customStudioPrompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      generateIdeasBtn.click();
    }
  });

  // Chat collapse toggle
  chatCollapseToggle.addEventListener("click", () => {
    isChatCollapsed = !isChatCollapsed;
    chatCard.classList.toggle("collapsed", isChatCollapsed);
  });

  // Chat quick action pills
  quickPromptPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const prompt = pill.dataset.prompt;
      chatInputText.value = prompt;
      handleChatSubmit();
    });
  });

  // Chat submit form
  chatForm.addEventListener("submit", handleChatSubmit);

  // Copy Media Kit
  copyMediaKitBtn.addEventListener("click", copyMediaKit);

  // Mockup like button interaction
  mockupLikeBtn.addEventListener("click", () => {
    isLiked = !isLiked;
    mockupLikeBtn.classList.toggle("liked", isLiked);
    likeCount = isLiked ? likeCount + 1 : likeCount - 1;
    mockupLikeCount.textContent = likeCount;
  });

  // Mockup save button interaction
  mockupSaveBtn.addEventListener("click", () => {
    isSaved = !isSaved;
    mockupSaveBtn.classList.toggle("saved", isSaved);
    showToast(isSaved ? "Saved post to collection 🔖" : "Removed from saved posts");
  });

  // Notifications popover
  notifButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = notifPopover.hidden;
    notifPopover.hidden = !isHidden;
    notifButton.setAttribute("aria-expanded", isHidden ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    if (!notifPopover.contains(e.target) && !notifButton.contains(e.target)) {
      notifPopover.hidden = true;
      notifButton.setAttribute("aria-expanded", "false");
    }
  });

  if (clearNotifsBtn) {
    clearNotifsBtn.addEventListener("click", () => {
      document.querySelectorAll(".notif-item").forEach(item => item.classList.remove("unread"));
      const badge = document.querySelector(".notif-badge");
      if (badge) badge.style.display = "none";
      showToast("Notifications marked as read");
    });
  }

  // Modal actions
  modalCloseBtn.addEventListener("click", closeRationaleModal);
  modalDismissBtn.addEventListener("click", closeRationaleModal);
  modalAcceptFromModalBtn.addEventListener("click", () => {
    if (modalTargetIdea) {
      acceptIdeaById(modalTargetIdea.id);
    }
    closeRationaleModal();
  });

  rationaleModal.addEventListener("click", (e) => {
    if (e.target === rationaleModal) {
      closeRationaleModal();
    }
  });

  // Close modal on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && rationaleModal.classList.contains("active")) {
      closeRationaleModal();
    }
  });
}

// Global exposure for inline onclick handlers
window.acceptIdeaById = acceptIdeaById;
window.remixIdeaById = remixIdeaById;
window.openRationaleModalById = openRationaleModalById;

// Kick off when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
