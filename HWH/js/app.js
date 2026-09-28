/**
 * SOCIAL PULSE ✳ — Interactive AI Social Media Agent Application Logic
 * Full-featured, modern JavaScript single-page application.
 */

// ==========================================================================
// DATA REPOSITORY: BRANDS, FORMAT SERVICES, GOALS & RECOMMENDATIONS
// ==========================================================================

const BRANDS = {
  wanderlust: {
    name: "Wanderlust Chronicles",
    handle: "wanderlust.chronicles",
    platform: "Instagram & YouTube",
    platformIcon: "✈️",
    avatar: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=120&h=120&q=80",
    industry: "Travel & Cultural Exploration",
    tone: "Inspiring, practical, and adventure-seeking",
    audience: "Independent travelers, weekend explorers, and adventure seekers looking for authentic itineraries, destination guides, and budget tips",
    hindsightBank: "social-pulse-demo",
    postsCount: 30,
    avgEngagement: 13.9,
    topFormat: "Carousels 📚 (15.5%)",
    previewImage: "assets/kashmir_preview.jpg"
  }
};

const IMAGE_MAP = {
  kashmir: "assets/kashmir_preview.jpg",
  bali: "assets/bali_preview.jpg",
  goa: "assets/goa_preview.jpg",
  ladakh: "assets/ladakh_preview.jpg",
  manali: "assets/manali_preview.jpg",
  singapore: "assets/singapore_preview.jpg",
  hampi: "assets/hampi_preview.jpg",
  default: "assets/studio_preview.jpg"
};

function resolveImageForContent(text, fallback) {
  if (!text) return fallback || IMAGE_MAP.default;
  const lower = String(text).toLowerCase();
  for (const [kw, path] of Object.entries(IMAGE_MAP)) {
    if (kw !== "default" && lower.includes(kw)) {
      return path;
    }
  }
  return fallback || IMAGE_MAP.default;
}

const SERVICE_CONFIGS = {
  carousel: {
    name: "Carousel Guide",
    badge: "📚 CAROUSEL · 4:5",
    framework: "5-Slide Save-Stacker Destination Blueprint",
    hookStyle: "Mistakes Checklist: '5 Things to Avoid on Your First Visit'",
    optimalTime: "Friday & Saturday · 10:30 AM (Peak Saves - 18.8%)",
    aspectRatio: "4:5",
    viewText: "Swipe Gallery (4:5 Ratio)"
  },
  reel: {
    name: "Reel / Short",
    badge: "🎬 REEL · 9:16",
    framework: "Hook-Expense Ticker-CTA (30s Vertical Video)",
    hookStyle: "POV: What 1 Day in Bali / Ladakh Actually Costs",
    optimalTime: "Friday & Sunday · 7:45 PM (Peak Shares - 397 Avg)",
    aspectRatio: "9:16",
    viewText: "Vertical Reel (9:16 Ratio)"
  },
  feed: {
    name: "Feed Post",
    badge: "📸 PHOTO POST · 1:1",
    framework: "Aesthetic Anchor + High-Utility Destination Micro-Guide",
    hookStyle: "Essential Packing List / Secret Sunset Spot",
    optimalTime: "Wednesday · 8:30 AM (Morning Commute)",
    aspectRatio: "1:1",
    viewText: "High-Res Square Photo (1:1 Ratio)"
  },
  story: {
    name: "24h Story",
    badge: "⏳ 24H STORY · 9:16",
    framework: "Interactive Destination Poll + Behind-The-Curtain Teaser",
    hookStyle: "Mountains vs Beaches: 'Tap to vote your next trip'",
    optimalTime: "Daily · 1:00 PM & 7:00 PM (Lunch & Evening)",
    aspectRatio: "9:16",
    viewText: "Vertical 24h Story (9:16 Ratio)"
  },
  thread: {
    name: "Thread / X",
    badge: "🧵 THREAD · 16:9",
    framework: "High-Conviction 1-Liner + 5 Bullet Travel Rules",
    hookStyle: "Non-Obvious Budget Rules: '10 Things I Learned After 30 Trips'",
    optimalTime: "Monday & Thursday · 9:00 AM (Peak Retweets)",
    aspectRatio: "16:9",
    viewText: "Thread Chain Preview (16:9 Ratio)"
  }
};

// Travel dataset recommendations for Wanderlust Chronicles
const WANDERLUST_RECOMMENDATIONS = {
  carousel: {
    "boost-comments": [
      {
        id: "w-car-c1",
        title: "5 Kashmir Travel Mistakes Most First-Timers Regret",
        hookAngle: "Curiosity Gap + Local Insider Secret",
        tone: "Practical & Adventure-Seeking",
        score: 97,
        metrics: { hook: 97, share: 95, comment: 96, memory: 99 },
        caption: `Save this before your Kashmir trip 🏔️✨\n\n5 mistakes everyone makes on their first visit (and how to avoid them):\n1. Booking Gulmarg gondola tickets on the spot (they sell out weeks ahead)\n2. Staying only in Dal Lake houseboats instead of Pahalgam valleys\n3. Underestimating sub-zero evening temps in spring\n4. Forgetting local postpaid SIM requirements\n5. Skipping local bakery Harissa breakfasts\n\nWhich of these surprised you most? Drop your Kashmir questions below! 👇`,
        hashtags: "#KashmirDiaries #TravelTips #IncredibleIndia #Himalayas #KashmirTravel #WanderlustChronicles",
        insight: "Directly mirrors the top-performing Kashmir mistakes carousel (#27 in dataset: 18.81% engagement, 2,100 saves).",
        memories: [
          "Hindsight memory bank recalled: Kashmir mistakes carousel on 2026-08-28 achieved peak engagement of 18.81% with 2,100 saves.",
          "Dataset analysis confirms Carousels lead all formats at 15.52% mean engagement rate across 10 posts.",
          "Travel tips and packing advice generate 3.4x higher comment velocity than generic scenic posts."
        ]
      },
      {
        id: "w-car-c2",
        title: "A Complete Weekend Travel Guide to Hampi",
        hookAngle: "Architectural Wonder Itinerary",
        tone: "Historical & Inspiring",
        score: 93,
        metrics: { hook: 94, share: 92, comment: 93, memory: 95 },
        caption: `Step back into 14th-century boulder-strewn ruins 🏛️\n\nHere’s how to do Hampi in 48 hours:\nDay 1: Virupaksha Temple at sunrise + Coracle boat ride across Tungabhadra\nDay 2: Matanga Hill panoramic sunset hike + Hippie Island cafe hopping\n\nFull itinerary breakdown across these slides 👉 Have you ever visited Hampi?`,
        hashtags: "#HampiRuins #UNESCOHeritage #SouthIndiaTravel #SoloTravelIndia #WeekendGetaway",
        insight: "Itinerary guides hold an average engagement rate of 15.6% across 5 dataset posts.",
        memories: [
          "Hampi weekend guide on 2026-04-04 generated 1,243 engagements with steady saves.",
          "Audience signals indicate high interest in ancient architecture itineraries."
        ]
      }
    ],
    "save-worthy-checklist": [
      {
        id: "w-car-s1",
        title: "Realistic 3-Day Goa Budget Breakdown (Stay, Food & Scooters)",
        hookAngle: "Transparent Budget Save-Stacker",
        tone: "Practical & High-Utility",
        score: 98,
        metrics: { hook: 98, share: 97, comment: 94, memory: 99 },
        caption: `🔖 Bookmark this for your next Goa escape! Exact budget breakdown for 3 days without overpaying:\n\n• Stay (Peaceful Mandrem/Arambol homestay): ₹4,500 total\n• Scooter rental + fuel: ₹900\n• Beachside shacks & cafes: ₹3,600\n• Sunset cruise & kayaking: ₹1,500\nTotal for 3 days: ₹10,500 (~$125 USD)\n\nSwipe through for our exact stay names and map links! 👉`,
        hashtags: "#GoaTrip #BudgetTravel #GoaDiaries #TravelHacks #WanderlustChronicles",
        insight: "Budget breakdown category is #1 in saves across your dataset, averaging 1,380 saves per post.",
        memories: [
          "Historical Goa budget breakdown post scored 16.90% engagement and 1,640 saves.",
          "Hindsight memory bank notes transparent cost breakdowns drive maximum bookmark rates."
        ]
      },
      {
        id: "w-car-s2",
        title: "Singapore in 4 Days: Route and Costs",
        hookAngle: "City Itinerary + Spending Breakdown",
        tone: "Crisp & Actionable",
        score: 96,
        metrics: { hook: 96, share: 95, comment: 93, memory: 97 },
        caption: `Singapore doesn't have to break your bank 🇸🇬\n\nSwipe through our exact 4-day route + metro passes + hawker center recommendations.\n\nSlide 1: Jewel Changi & Marina Bay\nSlide 2: Chinatown & Little India walking trail\nSlide 3: Sentosa & Gardens by the Bay light show\nSlide 4: Cost spreadsheet per person\n\nSave this guide for your international planning! 📌`,
        hashtags: "#SingaporeTravel #CityGuide #TravelOnABudget #ExploreSingapore #TravelTips",
        insight: "Post #18 in your historical dataset reached 17.48% engagement with 1,780 saves.",
        memories: [
          "Singapore itinerary post generated 3,635 engagements and 1,780 saves on 2026-07-01.",
          "International travel guides achieve higher share velocity among travel-minded professionals."
        ]
      }
    ],
    "drive-profile-visits": [
      {
        id: "w-car-p1",
        title: "The Complete 4-Day Manali & Spiti Valley Route Map",
        hookAngle: "Downloadable Route Map Cliffhanger",
        tone: "Adventure-Seeking & Authoritative",
        score: 95,
        metrics: { hook: 95, share: 94, comment: 92, memory: 97 },
        caption: `Planning a Himachal road trip this season? 🏔️🚗\n\nWe spent 3 weeks charting the best high-altitude cafes, safe mountain passes, and secret waterfalls between Manali and Spiti.\n\nSwipe through for key highlights — and tap the link in our bio to grab our free offline Google Maps pinboard with 45+ verified locations!`,
        hashtags: "#ManaliTrip #SpitiValley #RoadTripIndia #HimachalPradesh #TravelGuide",
        insight: "Offline pinboard CTAs lift profile visit conversions by over 45%.",
        memories: [
          "Manali 4-day itinerary generated 14.04% engagement and high share velocity.",
          "Audience profile indicates high demand for actionable step-by-step route PDFs."
        ]
      }
    ],
    "behind-the-scenes": [
      {
        id: "w-car-b1",
        title: "A Day on a Kerala Houseboat in Alleppey: The Unfiltered Reality",
        hookAngle: "Slow Travel Candid Experience",
        tone: "Candid & Scenic",
        score: 92,
        metrics: { hook: 93, share: 89, comment: 94, memory: 93 },
        caption: `What staying on a traditional Alleppey backwater boat really looks like from sunrise to nightfall 🛶🌴\n\nFresh pearl spot fish fried on deck, sleeping under mosquito nets while water laps against wood, and morning village tea stalls.\n\nSwipe to see the galley kitchen in action! Would you sleep on the backwaters?`,
        hashtags: "#KeralaBackwaters #AlleppeyHouseboat #SlowTravel #KeralaTourism #IncredibleIndia",
        insight: "Experience-focused storytelling builds authentic emotional connection and boosts comments.",
        memories: [
          "Alleppey houseboat post on 2026-05-09 had 1,490 likes and 760 saves (13.54% engagement).",
          "Audience repeatedly favors authentic experiential travel over polished luxury ads."
        ]
      }
    ]
  },
  reel: {
    "boost-comments": [
      {
        id: "w-reel-c1",
        title: "Hidden Beaches in Bali You Should Save for Your Next Trip",
        hookAngle: "Secret Discovery + Stop-the-Scroll",
        tone: "Inspiring & Energetic",
        score: 95,
        metrics: { hook: 96, share: 93, comment: 95, memory: 97 },
        caption: `POV: You skipped the crowded beach clubs in Seminyak and drove 40 minutes south to these secret coves 🌊🏝️\n\n1. Nyang Nyang Beach (300-step cliff hike)\n2. Green Bowl Beach (caves & turquoise water)\n3. Gunung Payung (crystal-clear reef)\n\nWhich one are you pinning first? Drop your Bali travel month below! 👇`,
        hashtags: "#BaliTravel #HiddenBeaches #ExploreBali #WanderlustChronicles #TravelReel",
        insight: "Reel #2 in dataset scored 18,400 views and 740 saves with 12.8% engagement.",
        memories: [
          "Hindsight memory confirms Bali destination posts maintain top replay and save ratios.",
          "Beach guide category holds strong evergreen replay value."
        ]
      },
      {
        id: "w-reel-c2",
        title: "Road Trip Views That Don't Look Real: Ladakh Expedition",
        hookAngle: "Cinematic High-Dopamine Visual",
        tone: "Epic & Majestic",
        score: 97,
        metrics: { hook: 99, share: 96, comment: 94, memory: 98 },
        caption: `Tell me this doesn't look like another planet 🏔️✨ Driving through Khardung La pass at 17,982 ft.\n\nHave you ever done a high-altitude road trip? Comment your dream road trip destination! 👇`,
        hashtags: "#LadakhDiaries #HimalayanRoadTrip #KhardungLa #IncredibleIndia #EpicViews",
        insight: "Ladakh road trip reel achieved 41,200 impressions and 5,808 total engagements (#14 in dataset).",
        memories: [
          "Highest impression post in dataset (41,200 views, 14.10% engagement).",
          "Hindsight notes epic road trip reels generate highest organic shares."
        ]
      }
    ],
    "save-worthy-checklist": [
      {
        id: "w-reel-s1",
        title: "What I Spent in One Day in Bali: Full Budget",
        hookAngle: "Rapid Expense Breakdown Ticker",
        tone: "Transparent & Fast-Paced",
        score: 98,
        metrics: { hook: 98, share: 97, comment: 95, memory: 99 },
        caption: `🔖 Tap save before your Bali flight! Exactly what 24 hours costs in Bali:\n\n• Scooter: ₹350 ($4)\n• Nasi Campur lunch: ₹120 ($1.50)\n• Specialty cafe iced matcha: ₹240 ($3)\n• Sunset villa room: ₹2,100 ($25)\n• Traditional massage: ₹600 ($7)\nTotal: ₹3,410 ($40.50 USD)\n\nSave this for your trip planning! 🌴`,
        hashtags: "#BaliBudget #TravelExpenses #BudgetTravelBali #BaliTips #WanderlustChronicles",
        insight: "Itemized expense tickers achieve highest save-to-view ratios.",
        memories: [
          "Bali daily spend reel generated 33,700 views and 1,950 saves (15.43% engagement).",
          "Dataset indicates budget breakdowns in Reels achieve 15%+ engagement rates."
        ]
      }
    ],
    "drive-profile-visits": [
      {
        id: "w-reel-p1",
        title: "Waterfalls and Winding Roads in Meghalaya",
        hookAngle: "Untouched Paradise Cliffhanger",
        tone: "Serene & Adventurous",
        score: 94,
        metrics: { hook: 96, share: 94, comment: 91, memory: 96 },
        caption: `Cherrapunji & Mawlynnong: where clouds touch the road 🌿🌧️\n\nFull 3-day Meghalaya waterfall route with homestay contacts now linked in our profile bio! Tap to plan your trip.`,
        hashtags: "#MeghalayaTourism #NorthEastIndia #Cherrapunji #WaterfallHike #OffbeatTravel",
        insight: "Meghalaya post scored 38,600 views and 5,212 engagements (#29 in dataset).",
        memories: [
          "Scenic Reels from Northeast India yield strong viewer curiosity and profile inquiries."
        ]
      }
    ],
    "behind-the-scenes": [
      {
        id: "w-reel-b1",
        title: "Taj Mahal at Sunrise: What to Know Before You Go",
        hookAngle: "5 AM Reality vs Instagram",
        tone: "Honest & Practical",
        score: 93,
        metrics: { hook: 95, share: 91, comment: 93, memory: 95 },
        caption: `What getting into the Taj Mahal at 5:30 AM actually looks like 🌅\n\nGates open 30 minutes before sunrise. Which gate has the shortest line? The East gate. Save this tip!`,
        hashtags: "#TajMahal #AgraDiaries #SunriseAtTaj #TravelHacks #IncredibleIndia",
        insight: "Short post #10 gained 30,500 views and 980 saves.",
        memories: [
          "Sunrise tip formats provide instant practical value to travelers."
        ]
      }
    ]
  },
  feed: {
    "save-worthy-checklist": [
      {
        id: "w-feed-s1",
        title: "What I Packed for 5 Days in Kashmir: Layering Essentials",
        hookAngle: "Essential Gear & Wardrobe Guide",
        tone: "Clean, Aesthetic & Practical",
        score: 94,
        metrics: { hook: 95, share: 93, comment: 92, memory: 96 },
        caption: `The exact packing list that kept us warm in Gulmarg without lugging 3 suitcases 🧳❄️\n\n1. 2 merino wool base thermals\n2. 1 windproof down jacket (rated -5°C)\n3. Waterproof ankle boots with grip\n4. 2 fleece mid-layers\n5. Woolen beanies & touch-screen gloves\n\nBookmark this before packing! 📌`,
        hashtags: "#PackingTips #KashmirTravel #WinterTravel #TravelEssentials #WanderlustChronicles",
        insight: "Packing tips post generated 810 saves and 12.53% engagement.",
        memories: [
          "Packing tips category has zero negative feedback in Hindsight memory."
        ]
      }
    ],
    "boost-comments": [
      {
        id: "w-feed-c1",
        title: "Golden Hour in Galle Fort: The Street of Lighthouses",
        hookAngle: "Contrarian Cultural Observation",
        tone: "Poetic & Warm",
        score: 92,
        metrics: { hook: 93, share: 90, comment: 95, memory: 94 },
        caption: `Walking through 400-year-old Dutch ramparts as the Indian Ocean breezes blow in 🇱🇰🌊\n\nIf you could pack a bag right now and board a flight tomorrow morning, where is your soul calling you? Tell us in the comments! ✈️`,
        hashtags: "#GalleFort #SriLankaTravel #WanderlustChronicles #TravelPhotography",
        insight: "Galle Fort post generated 28,900 views and 14.18% engagement.",
        memories: [
          "Sri Lanka travel content had strong cross-audience engagement in July."
        ]
      }
    ]
  },
  story: {
    "boost-comments": [
      {
        id: "w-story-c1",
        title: "Quick Poll: Mountains vs Beaches for Your Next Long Weekend?",
        hookAngle: "High-Interaction Tap-to-Vote",
        tone: "Playful & Community-Driven",
        score: 95,
        metrics: { hook: 96, share: 88, comment: 97, memory: 96 },
        caption: `Help us plan our next in-depth guide! 🗺️\n\nOption A: Himachal & Kashmir Mountain Valleys 🏔️\nOption B: Goa & Varkala Cliffside Coast 🌊\n\nTap your vote on the sticker!`,
        hashtags: "#TravelPoll #WanderlustChronicles #WeekendGetaway",
        insight: "Destination choice stories generate 78%+ sticker participation.",
        memories: [
          "Audience split is roughly 52% mountain enthusiasts, 48% beach lovers."
        ]
      }
    ]
  },
  thread: {
    "save-worthy-checklist": [
      {
        id: "w-thread-s1",
        title: "10 Travel Rules I Follow After Visiting 25 Indian Destinations",
        hookAngle: "High-Conviction Travel Manifesto",
        tone: "Crisp & Punchy",
        score: 97,
        metrics: { hook: 98, share: 98, comment: 94, memory: 99 },
        caption: `After documenting 30 trips across Bali, Kashmir, Goa, and Ladakh, here are 10 non-obvious travel rules that will save you money and stress:\n\n1/ Never exchange currency at airports. Use zero-forex debit cards.\n2/ Always book Gulmarg gondola Phase 2 weeks in advance.\n3/ Off-season Goa (August-September) has the cleanest beaches and 50% cheaper stays.\n4/ In Ladakh, take 48 hours to acclimatize before attempting mountain passes.\n\nBookmark this thread for your next trip 🧵👇`,
        hashtags: "#TravelThread #TravelTips #BudgetTravel #IndiaTravel #WanderlustChronicles",
        insight: "Comprehensive multi-destination threads score top bookmark numbers on X.",
        memories: [
          "Hindsight shows multi-destination summary threads achieve 4.2x bookmark rates."
        ]
      }
    ]
  }
};

const RECOMMENDATIONS_DATABASE = WANDERLUST_RECOMMENDATIONS;

function getRecommendationsFor(service, goal) {
  if (WANDERLUST_RECOMMENDATIONS[service] && WANDERLUST_RECOMMENDATIONS[service][goal]) {
    return WANDERLUST_RECOMMENDATIONS[service][goal];
  }
  if (WANDERLUST_RECOMMENDATIONS[service]) {
    const keys = Object.keys(WANDERLUST_RECOMMENDATIONS[service]);
    if (keys.length > 0) return WANDERLUST_RECOMMENDATIONS[service][keys[0]];
  }
  return WANDERLUST_RECOMMENDATIONS["carousel"]["boost-comments"];
}

// ==========================================================================
// APPLICATION STATE
// ==========================================================================
let currentBrand = "wanderlust";
let currentService = "carousel";
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
  initServicesCards();
  initStudioParallax();
  initScrollSpy();
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

  const agentContextSub = document.getElementById("agentContextSub");
  if (agentContextSub) {
    agentContextSub.textContent = `Synthesizing ${brand.postsCount} historical posts & Hindsight recall signals`;
  }

  if (brand.previewImage) {
    mockupImage.src = brand.previewImage;
  }

  showToast(`Switched brand to ${brand.name} (${brand.platform})`);
}

// ==========================================================================
// DYNAMIC FORMAT & CAROUSEL SLIDE CONTROLS
// ==========================================================================
let currentCarouselSlides = [];
let currentSlideIndex = 0;

function setCarouselSlides(slides, fallbackImage) {
  if (Array.isArray(slides) && slides.length > 0) {
    currentCarouselSlides = slides.map((s, idx) => ({
      slide_num: s.slide_num || idx + 1,
      heading: s.heading || s.title || `Point #${idx + 1}`,
      body: s.body || s.text || "",
      image: s.image || (s.image_keyword ? IMAGE_MAP[s.image_keyword.toLowerCase()] : null) || fallbackImage || IMAGE_MAP.kashmir
    }));
  } else {
    // 5-slide Wanderlust travel carousel
    currentCarouselSlides = [
      { slide_num: 1, heading: "Mistake #1: Skipping Early Shikara Rides", body: "Arrive at Dal Lake by 6:30 AM for glass-like reflections before tourist crowds and boat wake.", image: IMAGE_MAP.kashmir },
      { slide_num: 2, heading: "Mistake #2: Not Pre-Booking Gondola Phase 2", body: "Phase 2 tickets to Apharwat peak (13,780 ft) sell out weeks in advance online. On-spot queue is rarely available.", image: IMAGE_MAP.kashmir },
      { slide_num: 3, heading: "Mistake #3: Staying Only in Srinagar Houseboats", body: "Split your itinerary: 2 days in Srinagar, 2 days in Aru Valley / Betaab Valley in Pahalgam for pine forest tranquility.", image: IMAGE_MAP.kashmir },
      { slide_num: 4, heading: "Mistake #4: Cash Shortages at High Passes", body: "Carry adequate cash. Card terminals and ATMs frequently lose connectivity in remote Sonamarg and Gulmarg valleys.", image: IMAGE_MAP.kashmir },
      { slide_num: 5, heading: "Mistake #5: Underestimating Evening Drops", body: "Even in summer, temperatures drop to 8°C after sunset. Always pack windproof thermal base layers.", image: IMAGE_MAP.kashmir }
    ];
  }
  currentSlideIndex = 0;
  renderCurrentSlide();
}

function renderCurrentSlide() {
  if (!currentCarouselSlides || currentCarouselSlides.length === 0) return;
  const slide = currentCarouselSlides[currentSlideIndex];

  if (slide.image) {
    mockupImage.src = slide.image;
  }
  mockupImage.alt = slide.heading || "Carousel slide image";

  const badge = document.getElementById("carouselSlideBadge");
  if (badge) {
    badge.textContent = `Slide ${currentSlideIndex + 1} of ${currentCarouselSlides.length}`;
  }

  const titleEl = document.getElementById("carouselSlideTitle");
  if (titleEl) {
    titleEl.textContent = slide.heading;
  }

  const bodyEl = document.getElementById("carouselSlideBody");
  if (bodyEl) {
    bodyEl.textContent = slide.body;
  }

  const dotsRow = document.getElementById("carouselDotsRow");
  if (dotsRow) {
    dotsRow.innerHTML = currentCarouselSlides.map((_, i) =>
      `<span class="carousel-dot ${i === currentSlideIndex ? 'active' : ''}" onclick="goToSlide(${i})"></span>`
    ).join("");
  }
}

function prevSlide() {
  if (currentCarouselSlides.length <= 1) return;
  currentSlideIndex = (currentSlideIndex - 1 + currentCarouselSlides.length) % currentCarouselSlides.length;
  renderCurrentSlide();
}

function nextSlide() {
  if (currentCarouselSlides.length <= 1) return;
  currentSlideIndex = (currentSlideIndex + 1) % currentCarouselSlides.length;
  renderCurrentSlide();
}

function goToSlide(idx) {
  if (idx >= 0 && idx < currentCarouselSlides.length) {
    currentSlideIndex = idx;
    renderCurrentSlide();
  }
}

function applyFormatUI(formatKey) {
  const stage = document.getElementById("mockupMediaStage");
  if (stage) {
    stage.setAttribute("data-format", formatKey);
  }

  const carouselLayer = document.getElementById("carouselControlsLayer");
  const reelLayer = document.getElementById("reelControlsLayer");
  const storyLayer = document.getElementById("storyControlsLayer");
  const formatBadgeText = document.getElementById("mockupFormatBadgeText");

  if (carouselLayer) carouselLayer.style.display = (formatKey === "carousel") ? "block" : "none";
  if (reelLayer) reelLayer.style.display = (formatKey === "reel") ? "block" : "none";
  if (storyLayer) storyLayer.style.display = (formatKey === "story") ? "block" : "none";

  if (formatKey === "carousel") {
    if (formatBadgeText) formatBadgeText.textContent = "Carousel Guide (4:5)";
    if (currentCarouselSlides.length === 0) {
      setCarouselSlides([], mockupImage.src);
    } else {
      renderCurrentSlide();
    }
  } else if (formatKey === "reel") {
    if (formatBadgeText) formatBadgeText.textContent = "Reel / Short (9:16)";
  } else if (formatKey === "story") {
    if (formatBadgeText) formatBadgeText.textContent = "24h Story (9:16)";
  } else if (formatKey === "feed") {
    if (formatBadgeText) formatBadgeText.textContent = "Feed Post (1:1)";
  } else if (formatKey === "thread") {
    if (formatBadgeText) formatBadgeText.textContent = "Thread / X (16:9)";
  }
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
  previewPlatformTitle.textContent = `${config.name} Preview (${config.aspectRatio})`;

  // Apply format aspect ratio immediately to live mockup
  applyFormatUI(serviceKey);

  // Synchronize interactive Services Mind Cards active state
  const mindCards = document.querySelectorAll(".service-mind-card");
  mindCards.forEach(card => {
    const cardService = card.dataset.service;
    const isThis = cardService === serviceKey || ((serviceKey === "carousel" || serviceKey === "feed") && card.id === "cardPost");
    card.classList.toggle("is-active", isThis);
  });

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
  if (agentThinkingIndicator) {
    agentThinkingIndicator.hidden = false;
  }

  setTimeout(() => {
    if (agentThinkingIndicator) {
      agentThinkingIndicator.hidden = true;
    }

    currentRecommendations = getRecommendationsFor(currentService, currentGoal);
    renderRecommendationCards(currentRecommendations);

    if (currentRecommendations.length > 0) {
      applyIdeaToPreview(currentRecommendations[0]);
    }
  }, 250);
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

  // Synchronize Agent Chat with notification
  appendChatMessage("agent", `I've loaded **"${idea.title}"** into your live mockup (${SERVICE_CONFIGS[currentService].name}, ${SERVICE_CONFIGS[currentService].aspectRatio}). Feel free to ask questions, request caption tweaks, or test new viral hooks!`);

  showToast(`Accepted idea: "${idea.title.slice(0, 30)}..." ✨`);
}

function applyIdeaToPreview(idea) {
  currentAcceptedIdea = idea;

  // Format aspect ratio sync
  applyFormatUI(currentService);

  // Relevant image
  const resolvedImg = resolveImageForContent((idea.caption || "") + " " + (idea.title || ""), IMAGE_MAP.kashmir);
  mockupImage.src = resolvedImg;

  // If carousel, setup slides
  if (currentService === "carousel") {
    setCarouselSlides(idea.slides, resolvedImg);
  } else if (currentService === "reel") {
    const scriptText = document.getElementById("reelScriptText");
    if (scriptText) {
      scriptText.textContent = idea.title || idea.hookAngle || "Viral 9:16 Reel Hook";
    }
  }

  // Update mockup caption & tags
  mockupCaptionBody.innerHTML = formatMarkdown(idea.caption);
  mockupTags.textContent = idea.hashtags;

  // Update Predictor score
  predictorScoreNum.textContent = idea.score;
  if (idea.metrics) {
    metricHookPercent.textContent = `${idea.metrics.hook}%`;
    metricHookBar.style.width = `${idea.metrics.hook}%`;
    metricSharePercent.textContent = `${idea.metrics.share}%`;
    metricShareBar.style.width = `${idea.metrics.share}%`;
    metricCommentPercent.textContent = `${idea.metrics.comment}%`;
    metricCommentBar.style.width = `${idea.metrics.comment}%`;
    metricMemoryPercent.textContent = `${idea.metrics.memory}%`;
    metricMemoryBar.style.width = `${idea.metrics.memory}%`;
  }

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
    const travelHooks = [
      "5 things I wish someone told me before traveling here (Bookmark this!).",
      "Why 90% of tourists miss the most magical spot in this valley.",
      "POV: You woke up at 6 AM to see this without tourist crowds.",
      "The exact budget you need for a 3-day trip without cutting corners."
    ];
    const travelTones = [
      "Inspiring, Practical & Adventure-Seeking",
      "Cinematic & Scenic",
      "Curious & Local Insider",
      "Actionable & Budget-Savvy"
    ];

    const newHook = travelHooks[Math.floor(Math.random() * travelHooks.length)];
    const newTone = travelTones[Math.floor(Math.random() * travelTones.length)];
    
    idea.hookAngle = newHook;
    idea.tone = newTone;
    idea.title = `${idea.title} (Remixed)`;
    idea.score = Math.min(99, idea.score + 1);
    if (idea.metrics) {
      idea.metrics.hook = Math.min(99, idea.metrics.hook + 1);
    }

    if (card) {
      card.style.opacity = "1";
      card.style.transform = "none";
    }

    renderRecommendationCards(currentRecommendations);
    acceptIdeaById(idea.id);
    showToast("Remixed recommendation with fresh viral travel hook 🎯");
  }, 350);
}

// ==========================================================================
// RATIONALE & HINDSIGHT MEMORY MODAL
// ==========================================================================
function openRationaleModalById(ideaId) {
  let idea = currentRecommendations.find(i => i.id === ideaId);
  if (!idea && currentAcceptedIdea && currentAcceptedIdea.id === ideaId) {
    idea = currentAcceptedIdea;
  }
  if (!idea) {
    for (const sKey in WANDERLUST_RECOMMENDATIONS) {
      for (const gKey in WANDERLUST_RECOMMENDATIONS[sKey]) {
        const m = WANDERLUST_RECOMMENDATIONS[sKey][gKey].find(i => i.id === ideaId);
        if (m) { idea = m; break; }
      }
      if (idea) break;
    }
  }

  modalTargetIdea = idea;
  const brand = BRANDS["wanderlust"];

  if (!idea) {
    modalBodyContent.innerHTML = `
      <div class="rationale-block" style="text-align:center; padding:32px 18px;">
        <div style="font-size:2.2rem; margin-bottom:10px;">🧠</div>
        <h5 style="font-size:1.02rem; color:#0F172A; margin-bottom:8px;">Hindsight Rationale Currently Unavailable</h5>
        <p style="color:#64748B; font-size:0.86rem; line-height:1.5; max-width:440px; margin:0 auto;">
          No stored memory signals could be retrieved for this item. Please select an active recommendation card to view its data evidence.
        </p>
      </div>
    `;
  } else {
    const memoriesList = (idea.memories && idea.memories.length > 0)
      ? idea.memories.map(m => `<li>${escapeHtml(m)}</li>`).join("")
      : `<li>Audience preferences dynamically tracked across ${brand.postsCount} posts in bank: <strong>${escapeHtml(brand.hindsightBank)}</strong>.</li>`;

    modalBodyContent.innerHTML = `
      <div class="rationale-block">
        <h5>🎯 Recommendation Focus</h5>
        <p><strong>${escapeHtml(idea.title)}</strong> — Targeted at the <em>${escapeHtml(idea.hookAngle)}</em> angle with an <em>${escapeHtml(idea.tone)}</em> tone.</p>
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
        <p>${escapeHtml(idea.insight || "Optimized based on Wanderlust Chronicles historical performance metrics.")}</p>
        <p style="margin-top: 6px; font-size: 0.78rem; color: #64748B;">
          Predicted Score: <strong>${idea.score || 94}/100</strong> (Hook: ${idea.metrics?.hook || 96}%, Share: ${idea.metrics?.share || 93}%, Comment: ${idea.metrics?.comment || 95}%, Memory: ${idea.metrics?.memory || 98}%).
        </p>
      </div>
    `;
  }

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
// CONVERSATIONAL SOCIAL PULSE AGENT & LIVE MOCKUP SYNCHRONIZATION
// ==========================================================================
let chatHistory = [];

function formatMarkdown(str) {
  if (!str) return "";
  let formatted = escapeHtml(str);
  // Bold: **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italic: *text*
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Line breaks
  formatted = formatted.replace(/\n/g, "<br>");
  return formatted;
}

function showTypingIndicator() {
  removeTypingIndicator();
  const typing = document.createElement("div");
  typing.id = "chatTypingIndicator";
  typing.className = "chat-typing-indicator";
  typing.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span style="font-size:0.75rem; color:#64748B; margin-left:6px;">Social Pulse Agent is analyzing &amp; generating...</span>
  `;
  chatMessagesStream.appendChild(typing);
  chatMessagesStream.scrollTop = chatMessagesStream.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById("chatTypingIndicator");
  if (el) el.remove();
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
    <div class="message-text">${formatMarkdown(text)}</div>
  `;

  chatMessagesStream.appendChild(bubble);
  chatMessagesStream.scrollTop = chatMessagesStream.scrollHeight;
}

function applyMockupUpdate(mockup) {
  if (!mockup) return;

  const format = (mockup.format || currentService).toLowerCase();
  currentService = format;

  // Highlight pill in Services Hub
  servicePills.forEach(pill => {
    const isThis = pill.dataset.service === format;
    pill.classList.toggle("active", isThis);
    pill.setAttribute("aria-selected", isThis ? "true" : "false");
  });

  const config = SERVICE_CONFIGS[format] || SERVICE_CONFIGS.carousel;
  activeFormatLabel.textContent = `Format: ${config.name} (${config.badge})`;
  serviceFramework.textContent = config.framework;
  serviceHookStyle.textContent = config.hookStyle;
  serviceOptimalTime.textContent = mockup.optimal_time || config.optimalTime;
  previewPlatformTitle.textContent = `${config.name} Preview (${config.aspectRatio})`;

  // Apply format aspect ratio immediately
  applyFormatUI(format);

  // Determine relevant destination image
  const resolvedImg = mockup.image || resolveImageForContent((mockup.caption || "") + " " + (mockup.title || ""), IMAGE_MAP.kashmir);
  mockupImage.src = resolvedImg;

  // Format-specific content updates
  if (format === "carousel") {
    setCarouselSlides(mockup.slides, resolvedImg);
  } else if (format === "reel") {
    const scriptEl = document.getElementById("reelScriptText");
    if (scriptEl) {
      scriptEl.textContent = mockup.reel_script || mockup.title || mockup.caption.slice(0, 110);
    }
  } else if (format === "story") {
    const qEl = document.getElementById("storyQuestionText");
    if (qEl) {
      qEl.textContent = mockup.title || "Which travel destination are you visiting next?";
    }
  }

  // Update Caption & Tags
  if (mockup.caption) {
    mockupCaptionBody.innerHTML = formatMarkdown(mockup.caption);
  }
  if (mockup.hashtags) {
    mockupTags.textContent = mockup.hashtags;
  }

  // Update Predictor score
  if (mockup.score) {
    predictorScoreNum.textContent = mockup.score;
  }
  if (mockup.metrics) {
    if (mockup.metrics.hook) {
      metricHookPercent.textContent = `${mockup.metrics.hook}%`;
      metricHookBar.style.width = `${mockup.metrics.hook}%`;
    }
    if (mockup.metrics.share) {
      metricSharePercent.textContent = `${mockup.metrics.share}%`;
      metricShareBar.style.width = `${mockup.metrics.share}%`;
    }
    if (mockup.metrics.comment) {
      metricCommentPercent.textContent = `${mockup.metrics.comment}%`;
      metricCommentBar.style.width = `${mockup.metrics.comment}%`;
    }
    if (mockup.metrics.memory) {
      metricMemoryPercent.textContent = `${mockup.metrics.memory}%`;
      metricMemoryBar.style.width = `${mockup.metrics.memory}%`;
    }
  }

  if (mockup.optimal_time) {
    mockupPostTime.textContent = mockup.optimal_time;
  }

  currentAcceptedIdea = {
    id: "live-gen-" + Date.now(),
    title: mockup.title || "Social Pulse Recommendation",
    hookAngle: mockup.title || "Tailored Travel Angle",
    tone: "Inspiring & Practical",
    score: mockup.score || 96,
    caption: mockup.caption,
    hashtags: mockup.hashtags,
    insight: `Synthesized live by Social Pulse Agent with ${format} format optimization and Hindsight memory grounding.`,
    memories: ["Validated against 30 historical travel posts for Wanderlust Chronicles."]
  };
}

async function handleChatSubmit(e) {
  if (e) e.preventDefault();
  const text = chatInputText.value.trim();
  if (!text) return;

  chatInputText.value = "";
  appendChatMessage("user", text);
  // Send prior history excluding the current message so backend can properly order turns
  const priorHistory = [...chatHistory];
  chatHistory.push({ role: "user", content: text });

  showTypingIndicator();

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        history: priorHistory,
        format: currentService
      })
    });

    removeTypingIndicator();

    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok || !data || !data.success) {
      const errNotice = data?.error || (res.ok ? "Unrecognized response from agent" : `Server returned HTTP ${res.status}`);
      appendChatMessage("agent", `⚠️ Agent notice: ${errNotice}`);
      // Remove failed user turn from history
      chatHistory.pop();
      return;
    }

    appendChatMessage("agent", data.reply);
    chatHistory.push({ role: "assistant", content: data.reply });

    if (data.mockup) {
      applyMockupUpdate(data.mockup);
      showToast("Live mockup synchronized with agent generation! ✨");
    }
  } catch (err) {
    removeTypingIndicator();
    chatHistory.pop();
    appendChatMessage("agent", `⚠️ Connection notice: Could not reach the Social Pulse backend (${err.message}). Verify server.py is running on port 8080.`);
  }
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
// STUDIO PARALLAX & SMOOTH SCROLL INTERACTIONS
// ==========================================================================
function initStudioParallax() {
  const cluster = document.getElementById("floating3DCluster");
  const stickers = document.querySelectorAll(".floating-studio-label");
  const heroLines = document.querySelectorAll(".hero-giant-line");

  if (!cluster && stickers.length === 0) return;

  const satElements = cluster ? cluster.querySelectorAll("[data-parallax-depth]") : [];

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let isMoving = false;

  window.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;
    targetX = (e.clientX / innerWidth - 0.5) * 2;
    targetY = (e.clientY / innerHeight - 0.5) * 2;
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(renderParallax);
    }
  }, { passive: true });

  function renderParallax() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    satElements.forEach(el => {
      const depth = parseFloat(el.dataset.parallaxDepth) || 0.1;
      const moveX = currentX * depth * 70;
      const moveY = currentY * depth * 70;
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    heroLines.forEach(line => {
      const depth = parseFloat(line.dataset.depth) || 0.02;
      const moveX = currentX * depth * 35;
      line.style.transform = `translateX(${moveX}px)`;
    });

    if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
      requestAnimationFrame(renderParallax);
    } else {
      isMoving = false;
    }
  }

  // Floating stickers tilt interactions
  stickers.forEach(sticker => {
    const baseTilt = parseFloat(sticker.dataset.tilt) || 0;
    sticker.addEventListener("mouseenter", () => {
      sticker.style.transform = `translateY(-8px) scale(1.1) rotate(0deg)`;
    });
    sticker.addEventListener("mouseleave", () => {
      sticker.style.transform = `rotate(${baseTilt}deg)`;
    });
  });
}

// ==========================================================================
// INTERACTIVE SERVICES CARDS ("WHAT'S ON YOUR MIND?")
// ==========================================================================
function initServicesCards() {
  const mindCards = document.querySelectorAll(".service-mind-card");

  mindCards.forEach(card => {
    const header = card.querySelector(".card-mind-header");
    const expanded = card.querySelector(".service-card-expanded");
    if (!header || !expanded) return;

    header.addEventListener("click", (e) => {
      // Don't toggle expansion if user directly clicked an action button
      if (e.target.closest("button") && !e.target.closest(".card-expand-toggle-bar")) {
        return;
      }

      const isCurrentlyExpanded = card.classList.contains("is-expanded");

      // Toggle expanded state
      card.classList.toggle("is-expanded", !isCurrentlyExpanded);
      expanded.hidden = isCurrentlyExpanded;
      header.setAttribute("aria-expanded", !isCurrentlyExpanded ? "true" : "false");

      // When expanding, also switch the active service format in the studio preview
      const serviceKey = card.dataset.service;
      if (!isCurrentlyExpanded && serviceKey) {
        switchService(serviceKey);
      }
    });

    // Keyboard accessibility for header (Enter or Space)
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        header.click();
      }
    });

    // Action button inside expanded card
    const actionBtn = card.querySelector(".service-card-action-btn");
    if (actionBtn && actionBtn.id !== "consultCommunityAgentBtn") {
      actionBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const serviceKey = actionBtn.dataset.service;
        if (serviceKey) {
          switchService(serviceKey);
          showToast(`Activated ${serviceKey.toUpperCase()} format in Live Studio Workbench! ✨`);
        }
      });
    }
  });

  // Dedicated Community Agent consult button
  const consultCommunityBtn = document.getElementById("consultCommunityAgentBtn");
  if (consultCommunityBtn) {
    consultCommunityBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (chatInputText) {
        chatInputText.value = "What are our audience members asking for the most based on past post comments and Hindsight memory?";
        chatInputText.focus();
      }
      showToast("Pre-filled audience inquiry in Social Pulse Chat! 💬");
      const agentStudioSec = document.getElementById("agentStudio");
      if (agentStudioSec) {
        agentStudioSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}

function initScrollSpy() {
  const sections = [
    { id: "home", el: document.getElementById("home") },
    { id: "works", el: document.getElementById("works") },
    { id: "services", el: document.getElementById("services") },
    { id: "agentStudio", el: document.getElementById("agentStudio") },
    { id: "contact", el: document.getElementById("contact") }
  ];
  const navLinks = document.querySelectorAll(".studio-nav-item");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 160;
    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec.el && scrollPos >= sec.el.offsetTop) {
        navLinks.forEach(link => {
          const href = link.getAttribute("href");
          link.classList.toggle("active", href === `#${sec.id}`);
        });
        break;
      }
    }
  }, { passive: true });
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
  generateIdeasBtn.addEventListener("click", async () => {
    const val = customStudioPrompt.value.trim();
    if (val) {
      appendChatMessage("user", `Goal / Angle: "${val}"`);
      showToast(`Synthesizing recommendations for: "${val}"...`);
      showTypingIndicator();
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            format: currentService,
            goal: currentGoal,
            prompt: val,
          }),
        });
        removeTypingIndicator();
        let data = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }
        if (response.ok && data && data.success) {
          if (data.reply) {
            appendChatMessage("assistant", data.reply);
          }
          if (data.mockup) {
            applyMockupUpdate(data.mockup);
            showToast("Mockup updated with newly synthesized strategy! ✨");
          }
        } else {
          const notice = data?.error || `Server status ${response.status}`;
          appendChatMessage("agent", `⚠️ Recommendation notice: ${notice}`);
          showToast("Loaded offline recommendations.");
        }
      } catch (err) {
        removeTypingIndicator();
        console.warn("Could not reach /api/generate:", err);
        showToast("Loaded offline recommendations.");
      }
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

  // Carousel Next/Prev Controls
  const carouselPrevBtn = document.getElementById("carouselPrevBtn");
  const carouselNextBtn = document.getElementById("carouselNextBtn");
  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      prevSlide();
    });
  }
  if (carouselNextBtn) {
    carouselNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nextSlide();
    });
  }

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
window.goToSlide = goToSlide;
window.prevSlide = prevSlide;
window.nextSlide = nextSlide;

// Kick off when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
