import { memo, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PageSectionShell } from "../../components/sections/PageSectionShell";
import { HeroSection } from "../../components/ui/HeroSection";
import { Card } from "../../components/ui/Card";
import { usePageMeta } from "../../hooks/usePageMeta";
import { ROUTES } from "../../app/routes/routes";
import { quotesApi } from "../../services/api/quotes";
import { eventInvitationsApi } from "../../services/api/eventInvitations";
import { onlineSatsangApi } from "../../services/api/onlineSatsang";
import { membershipApi } from "../../services/api/membership";
import { BhagwatKathaMahotsavPremiumPage } from "../events/BhagwatKathaMahotsavPremiumPage";
import FestivalsCelebrationsPremiumPage from "../events/FestivalsCelebrationsPremiumPage";
import { MISSION_BODY_TEXT_CLASS, MISSION_SECTION_HEADING_CLASS, MISSION_SECTION_LABEL_CLASS } from "../mission/missionTypography";
import { SevaHeroBanner } from "../seva/SevaHeroBanner";
import {
  ABOUT_BODY_CLASS,
  ABOUT_CARD_TITLE_CLASS,
  ABOUT_HERO_SUBTITLE_CLASS,
  ABOUT_HERO_TITLE_CLASS,
  ABOUT_SECTION_HEADING_CLASS,
  ABOUT_SECTION_LABEL_CLASS,
} from "../about/aboutTypography";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_HIGHLIGHT_TITLE_CLASS,
  SEVA_HIGHLIGHT_VALUE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "../seva/sevaTypography";

type NavCard = {
  title: string;
  desc: string;
  href: string;
};

type RecognitionCategory = "All" | "National" | "Seva" | "Education" | "Cultural";

type RecognitionItem = {
  year: string;
  title: string;
  presenter: string;
  category: Exclude<RecognitionCategory, "All">;
  summary: string;
  impact: string;
};

type StructureCategory = "Governance" | "Spiritual Leadership" | "Seva Operations" | "Administration & Outreach";

type StructureUnit = {
  title: string;
  category: StructureCategory;
  lead: string;
  summary: string;
  duties: string[];
};

type ActivityStream = "All" | "Spiritual" | "Seva" | "Education" | "Cultural";

type TrustActivity = {
  title: string;
  stream: Exclude<ActivityStream, "All">;
  unit: string;
  cadence: string;
  timeWindow: string;
  location: string;
  summary: string;
  days: number[];
};

type DailyQuoteEntry = {
  _id?: string;
  title?: string;
  quoteText: string;
  theme: string;
  language: string;
  source: string;
  author?: string;
  publishDate: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
};

type VideoGalleryCategory = "Katha" | "Seva" | "Festival" | "Youth";

type VideoGalleryItem = {
  slug: string;
  category: VideoGalleryCategory;
  theme: "Gita" | "Avatar Stories" | "Sacred Places" | "Practices" | "Rituals" | "Teachings" | "Heritage";
  title: string;
  duration: string;
  image: string;
  note: string;
  summary: string;
  videoUrl: string;
  views: string;
};

const DEFAULT_DAILY_QUOTES: DailyQuoteEntry[] = [
  {
    _id: "quote-1",
    title: "Daily Reflection",
    quoteText: "Where remembrance of Bhagwan becomes steady, the mind slowly becomes peaceful and the heart becomes gentle.",
    theme: "Bhakti",
    language: "en",
    source: "Bhagwat Reflection Desk",
    author: "Bhagwat Reflection Desk",
    publishDate: "2026-03-08",
    isFeatured: true,
    isPublished: true,
    createdAt: "2026-03-08T06:00:00.000Z",
    createdBy: "admin",
  },
  {
    _id: "quote-2",
    title: "Daily Reflection",
    quoteText: "Seva performed with humility purifies intention more deeply than action performed for recognition.",
    theme: "Seva",
    language: "en",
    source: "Bhagwat Reflection Desk",
    author: "Bhagwat Reflection Desk",
    publishDate: "2026-03-07",
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-03-07T06:00:00.000Z",
    createdBy: "admin",
  },
  {
    _id: "quote-3",
    title: "Daily Reflection",
    quoteText: "Daily discipline is the bridge between inspiration and spiritual growth.",
    theme: "Discipline",
    language: "en",
    source: "Bhagwat Reflection Desk",
    author: "Bhagwat Reflection Desk",
    publishDate: "2026-03-06",
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-03-06T06:00:00.000Z",
    createdBy: "admin",
  },
  {
    _id: "quote-4",
    title: "Daily Reflection",
    quoteText: "Dharma begins when personal comfort bows before truth and responsibility.",
    theme: "Dharma",
    language: "en",
    source: "Bhagwat Reflection Desk",
    author: "Bhagwat Reflection Desk",
    publishDate: "2026-03-05",
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-03-05T06:00:00.000Z",
    createdBy: "admin",
  },
  {
    _id: "quote-5",
    title: "Daily Reflection",
    quoteText: "True sanskar is reflected in speech, conduct, respect, and self-control.",
    theme: "Sanskar",
    language: "en",
    source: "Bhagwat Reflection Desk",
    author: "Bhagwat Reflection Desk",
    publishDate: "2026-03-04",
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-03-04T06:00:00.000Z",
    createdBy: "admin",
  },
  {
    _id: "quote-6",
    title: "Daily Reflection",
    quoteText: "Guru bhakti opens the heart to wisdom that cannot be received through intellect alone.",
    theme: "Guru Bhakti",
    language: "en",
    source: "Bhagwat Reflection Desk",
    author: "Bhagwat Reflection Desk",
    publishDate: "2026-03-03",
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-03-03T06:00:00.000Z",
    createdBy: "admin",
  },
];

const MEDIA_VIDEO_GALLERY_ITEMS: VideoGalleryItem[] = [
  {
    slug: "shreemad-bhagwat-katha-day-1",
    category: "Katha",
    theme: "Teachings",
    title: "Bhagwat Katha: Eternal Leela of Sri Krishna",
    duration: "8:15",
    image: "/images/kathaimage.webp",
    note: "Bhagwat Katha discourse on Sri Krishna's leela, bhakti, and scripture reflection.",
    summary: "A satsang-centered Bhagwat Katha session introducing Krishna leela, devotion, and scripture-linked reflection for regular listeners.",
    videoUrl: "https://www.youtube.com/watch?v=Z-zaUl-uazk",
    views: "18.4K",
  },
  {
    slug: "bhagwat-pravachan-clip-series",
    category: "Katha",
    theme: "Teachings",
    title: "Bhagwat Katha: Introduction to Shrimad Bhagavatam",
    duration: "12:20",
    image: "/images/katha4.jfif",
    note: "Pravachan introducing Shrimad Bhagavatam listening with spiritual context.",
    summary: "A guided Bhagwat Katha introduction to Shrimad Bhagavatam for devotees who want structured listening and clear spiritual orientation.",
    videoUrl: "https://www.youtube.com/watch?v=cOFNyxt4MhM",
    views: "12.8K",
  },
  {
    slug: "gau-seva-field-documentary",
    category: "Seva",
    theme: "Practices",
    title: "Spiritual Pravachan: Govardhan Leela Explained",
    duration: "12:20",
    image: "/images/katha7.jfif",
    note: "A spiritual pravachan on protection, surrender, and remembrance.",
    summary: "This devotional spiritual talk connects Govardhan leela with faith, surrender, and practical spiritual discipline in daily life.",
    videoUrl: "https://www.youtube.com/watch?v=wrg8NMrPwOs",
    views: "10.1K",
  },
  {
    slug: "festival-darshan-atmosphere-reel",
    category: "Festival",
    theme: "Heritage",
    title: "Cultural Heritage Journey Through Vrindavan",
    duration: "10:05",
    image: "/images/katha5.jfif",
    note: "A cultural heritage tour through sacred devotional geography.",
    summary: "A cultural heritage-focused video exploring Vrindavan atmosphere, pilgrimage value, and visual devotion rooted in sacred memory.",
    videoUrl: "https://www.youtube.com/watch?v=ZYX6zpiY-6w",
    views: "14.7K",
  },
  {
    slug: "pathshala-youth-session-recap",
    category: "Youth",
    theme: "Teachings",
    title: "Youth Sanskar Session: Creative Values and Discipline",
    duration: "10:05",
    image: "/images/manish.PNG",
    note: "Youth-friendly teaching content combining discipline, guidance, and growth.",
    summary: "A youth-oriented sanskar session designed to connect modern learning with spiritual grounding, discipline, and mindful progress.",
    videoUrl: "https://www.youtube.com/watch?v=oW_Z8hICrHo",
    views: "6.9K",
  },
  {
    slug: "aarti-prasad-highlight-film",
    category: "Festival",
    theme: "Avatar Stories",
    title: "Spiritual Katha: Prahlad and Narasimha",
    duration: "8:16",
    image: "/images/spiritual1.png",
    note: "Avatar katha focused on protection, devotion, and courage.",
    summary: "A spiritual storytelling video reflecting on Prahlad bhakti, Narasimha protection, and unwavering faith.",
    videoUrl: "https://www.youtube.com/watch?v=Rq5iBnW8UEQ",
    views: "22.4K",
  },
  {
    slug: "dasha-avatar-ten-divine-forms",
    category: "Katha",
    theme: "Avatar Stories",
    title: "Bhagwat Katha: Dasha Avatar Divine Forms",
    duration: "8:15",
    image: "/images/katha6.jfif",
    note: "A concise Bhagwat Katha overview of divine manifestations and dharmic meaning.",
    summary: "This video introduces the ten avatar forms and their place in devotional understanding and dharma restoration.",
    videoUrl: "https://www.youtube.com/watch?v=Z-zaUl-uazk",
    views: "17.2K",
  },
  {
    slug: "gitas-essence-in-bhagavatam",
    category: "Katha",
    theme: "Gita",
    title: "Gita Wisdom in Bhagwat Katha",
    duration: "15:30",
    image: "/images/ram1.webp",
    note: "A teaching session connecting Gita wisdom with Bhagwat Katha listening.",
    summary: "A deeper spiritual talk showing how Gita themes of duty, surrender, and wisdom appear in Bhagavatam-centered devotion.",
    videoUrl: "https://www.youtube.com/watch?v=cOFNyxt4MhM",
    views: "11.6K",
  },
  {
    slug: "discovering-dwarka-ancient-ruins",
    category: "Festival",
    theme: "Sacred Places",
    title: "Sacred Dwarka Darshan and Cultural History",
    duration: "10:05",
    image: "/images/hanuman3.JPG",
    note: "A sacred geography video with pilgrimage atmosphere and cultural memory.",
    summary: "A cultural and spiritual exploration video showing Dwarka-linked imagery, sacred location value, and pilgrimage interest for devotees.",
    videoUrl: "https://www.youtube.com/watch?v=ZYX6zpiY-6w",
    views: "9.4K",
  },
  {
    slug: "vedic-chants-and-stotras",
    category: "Katha",
    theme: "Rituals",
    title: "Spiritual Chants, Stotras, and Daily Bhakti",
    duration: "8:15",
    image: "/images/swaminarayan.jpg",
    note: "Chanting and recitation for prayerful listening and devotional rhythm.",
    summary: "A chanting-focused spiritual media piece designed for calm repetition, remembrance, and prayer atmosphere.",
    videoUrl: "https://www.youtube.com/watch?v=Z-zaUl-uazk",
    views: "13.1K",
  },
  {
    slug: "rasa-leela-divine-dance",
    category: "Youth",
    theme: "Practices",
    title: "Cultural Rasa Leela and Devotional Dance",
    duration: "8:15",
    image: "/images/sanskriti.png",
    note: "A cultural devotional story suited for younger audiences and family viewers.",
    summary: "A graceful cultural presentation of rasa leela intended for devotional inspiration, youth engagement, and family viewing.",
    videoUrl: "https://www.youtube.com/watch?v=oW_Z8hICrHo",
    views: "15.8K",
  },
  {
    slug: "architectural-marvels-of-bhakti",
    category: "Festival",
    theme: "Heritage",
    title: "Cultural Architecture of Bhakti Heritage",
    duration: "10:05",
    image: "/images/hanuman4.JPG",
    note: "Temple architecture, sacred design, and devotional public space.",
    summary: "A visual cultural heritage feature exploring temple form, sacred architecture, and bhakti-centered public spiritual design.",
    videoUrl: "https://www.youtube.com/watch?v=Rq5iBnW8UEQ",
    views: "8.7K",
  },
  {
    slug: "festivals-of-bhagwat-heritage",
    category: "Festival",
    theme: "Heritage",
    title: "Social and Cultural Festivals of Bhagwat Heritage",
    duration: "10:05",
    image: "/images/sanskriti (2).png",
    note: "Festival color, devotional celebration, and community participation.",
    summary: "A social and cultural festival highlight video capturing celebration mood, family participation, and devotional togetherness across trust events.",
    videoUrl: "https://www.youtube.com/watch?v=ZYX6zpiY-6w",
    views: "19.6K",
  },
];

function getYouTubeVideoId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? "";
}

function getYouTubeEmbedUrl(url: string) {
  const videoId = getYouTubeVideoId(url);
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`
    : url;
}

function sortQuotes(items: DailyQuoteEntry[]) {
  return [...items].sort((a, b) => {
    if (a.publishDate === b.publishDate) return b.createdAt.localeCompare(a.createdAt);
    return b.publishDate.localeCompare(a.publishDate);
  });
}

const RECOGNITION_FILTERS: RecognitionCategory[] = ["All", "National", "Seva", "Education", "Cultural"];

const RECOGNITION_ITEMS: RecognitionItem[] = [
  {
    year: "2025",
    title: "Community Seva Excellence Honor",
    presenter: "Regional Dharma and Welfare Forum",
    category: "Seva",
    summary: "Recognized for sustained ann, jal, and medical support delivered through disciplined volunteer coordination.",
    impact: "Expanded direct-service operations for pilgrims, rural families, and festival gatherings.",
  },
  {
    year: "2024",
    title: "Cultural Heritage Preservation Citation",
    presenter: "Indian Culture Outreach Council",
    category: "Cultural",
    summary: "Acknowledged for preserving devotional traditions through katha programs, temple initiatives, and youth engagement.",
    impact: "Strengthened cultural education visibility across trust events and public programs.",
  },
  {
    year: "2024",
    title: "Education Support Appreciation Award",
    presenter: "District Student Welfare Collective",
    category: "Education",
    summary: "Honored for scholarship guidance, study support, and value-based educational outreach for children and youth.",
    impact: "Improved educational assistance planning for underserved students and family beneficiaries.",
  },
  {
    year: "2023",
    title: "National Spiritual Service Recognition",
    presenter: "Bharat Seva Samman Parishad",
    category: "National",
    summary: "Recognized for integrating devotion, seva, and social welfare through trust-led public initiatives.",
    impact: "Created stronger institutional credibility for future social and spiritual collaborations.",
  },
  {
    year: "2023",
    title: "Volunteer-Led Public Welfare Commendation",
    presenter: "Jan Kalyan Coordination Board",
    category: "Seva",
    summary: "Awarded for responsive volunteer deployment during high-footfall events and community support drives.",
    impact: "Validated the trust's ground-level service model and volunteer training discipline.",
  },
  {
    year: "2022",
    title: "Youth Sanskriti Inspiration Plaque",
    presenter: "Bal Sanskar and Youth Mission Circle",
    category: "Cultural",
    summary: "Presented for engaging youth in satsang, spiritual learning, and value-led cultural participation.",
    impact: "Increased youth-facing programming and family participation in ongoing trust activities.",
  },
];

const STRUCTURE_CATEGORIES: StructureCategory[] = [
  "Governance",
  "Spiritual Leadership",
  "Seva Operations",
  "Administration & Outreach",
];

const STRUCTURE_UNITS: StructureUnit[] = [
  {
    title: "Trust Board and Core Governance",
    category: "Governance",
    lead: "Trustees and senior decision-making body",
    summary: "Provides strategic direction, financial oversight, policy alignment, and approval for major trust initiatives.",
    duties: ["Vision setting and annual planning", "Compliance and accountability review", "Approval of major projects and budgets"],
  },
  {
    title: "Advisory and Dharmic Guidance Council",
    category: "Governance",
    lead: "Senior advisors and dharmic mentors",
    summary: "Supports the trust with institutional guidance, ethical review, and program recommendations rooted in Sanatan values.",
    duties: ["Long-range mission guidance", "Cultural and dharmic alignment", "Strategic counsel for expansion initiatives"],
  },
  {
    title: "Founder and Spiritual Direction",
    category: "Spiritual Leadership",
    lead: "Shri Manish Bhaiji Maharaj",
    summary: "Anchors the spiritual mission of the trust through discourse, inspiration, discipline, and value-centered leadership.",
    duties: ["Spiritual vision and discourse leadership", "Guidance for satsang and katha programs", "Value-based direction for trust initiatives"],
  },
  {
    title: "Satsang and Scriptural Programs Wing",
    category: "Spiritual Leadership",
    lead: "Program coordinators and discourse support teams",
    summary: "Plans bhagwat katha, satsang sabhas, study circles, and devotional learning experiences for devotees and families.",
    duties: ["Program planning and event coordination", "Volunteer deployment for spiritual gatherings", "Audience support and devotional engagement"],
  },
  {
    title: "Ann, Jal, and Medical Seva Wing",
    category: "Seva Operations",
    lead: "Seva coordinators and field volunteers",
    summary: "Executes food distribution, water support, basic care initiatives, and relief-oriented trust service delivery.",
    duties: ["Ground-level seva execution", "Distribution planning and volunteer scheduling", "Beneficiary support and response coordination"],
  },
  {
    title: "Education, Youth, and Family Support Wing",
    category: "Seva Operations",
    lead: "Education volunteers and family outreach team",
    summary: "Focuses on student aid, youth development, scholarship support, value education, and family-centered assistance.",
    duties: ["Student and youth support planning", "Scholarship and mentorship coordination", "Family engagement and outreach activities"],
  },
  {
    title: "Operations, Finance, and Documentation Cell",
    category: "Administration & Outreach",
    lead: "Administrative coordinators",
    summary: "Handles records, reporting, program logistics, financial process support, and internal documentation flow.",
    duties: ["Administrative process control", "Documentation and reporting", "Budget coordination and logistics tracking"],
  },
  {
    title: "Communications, Partnerships, and Public Outreach",
    category: "Administration & Outreach",
    lead: "Media, donor, and outreach coordinators",
    summary: "Builds community relations, donor communication, partnership development, and trust visibility across channels.",
    duties: ["Donor and partner communication", "Public messaging and media coordination", "Community engagement and outreach support"],
  },
];

const STRUCTURE_FLOW = [
  {
    step: "Vision",
    title: "Spiritual and strategic direction",
    desc: "Mission priorities originate from spiritual guidance and trust-level planning.",
  },
  {
    step: "Review",
    title: "Governance and advisory validation",
    desc: "Trust leadership reviews feasibility, compliance, impact, and alignment with values.",
  },
  {
    step: "Execution",
    title: "Department and seva deployment",
    desc: "Operational wings convert the approved direction into field execution and public programs.",
  },
  {
    step: "Reporting",
    title: "Feedback and accountability loop",
    desc: "Teams report outcomes, lessons, and next requirements back to leadership for refinement.",
  },
];

const ACTIVITY_STREAMS: ActivityStream[] = ["All", "Spiritual", "Seva", "Education", "Cultural"];

const TRUST_ACTIVITY_ITEMS: TrustActivity[] = [
  {
    title: "Morning Bhagwat Path and Satsang",
    stream: "Spiritual",
    unit: "Spiritual Programs Wing",
    cadence: "Daily",
    timeWindow: "06:30-08:00",
    location: "Main satsang hall",
    summary: "Daily scriptural recitation, satsang reflection, and devotee guidance to begin the day in discipline.",
    days: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    title: "Ann and Jal Seva Coordination",
    stream: "Seva",
    unit: "Food and relief service teams",
    cadence: "Daily",
    timeWindow: "10:00-13:00",
    location: "Community seva kitchen and distribution points",
    summary: "Volunteer-led food preparation, water logistics, and beneficiary support coordination.",
    days: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    title: "Student Mentoring and Study Support",
    stream: "Education",
    unit: "Education and youth support wing",
    cadence: "Weekdays",
    timeWindow: "16:00-18:00",
    location: "Learning support rooms",
    summary: "Guided learning sessions, mentorship, and scholarship follow-up for students and families.",
    days: [1, 2, 3, 4, 5],
  },
  {
    title: "Bal Sanskar and Youth Circle",
    stream: "Cultural",
    unit: "Youth and cultural development teams",
    cadence: "Weekends",
    timeWindow: "17:30-19:00",
    location: "Cultural activity hall",
    summary: "Value education, devotional learning, and youth participation activities rooted in Sanatan heritage.",
    days: [0, 6],
  },
  {
    title: "Volunteer Review and Duty Allocation",
    stream: "Seva",
    unit: "Operations and volunteer desk",
    cadence: "Daily",
    timeWindow: "19:00-20:00",
    location: "Coordination office",
    summary: "Next-shift planning, duty assignment, response updates, and service quality review.",
    days: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    title: "Weekly Katha and Outreach Planning",
    stream: "Spiritual",
    unit: "Trust leadership and event planning team",
    cadence: "Weekly",
    timeWindow: "11:00-12:30",
    location: "Program planning room",
    summary: "Review of upcoming katha programs, outreach priorities, and devotee engagement plans.",
    days: [2],
  },
];

const WEEKDAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const GAU_SEVA_FEATURES = [
  {
    title: "Daily Fodder Support",
    desc: "Green grass, dry fodder, mineral mix, and nutrition planning for gaushala care.",
  },
  {
    title: "Medical and Rescue Care",
    desc: "Periodic health checkups, emergency care coordination, and support for weak or injured cows.",
  },
  {
    title: "Volunteer Gaushala Seva",
    desc: "Ground seva through feeding, cleaning, water support, and disciplined care routines.",
  },
];

const GAU_QUICK_HIGHLIGHTS = [
  { title: "Daily Grass Requirement", value: "2.5 Tons", note: "Fresh green fodder for routine nourishment" },
  { title: "Volunteer Sevadars", value: "350+", note: "Active contributors in gaushala and field seva" },
  { title: "Cows Supported", value: "180+", note: "Regularly cared for through trust seva support" },
  { title: "Emergency Response", value: "< 4 hrs", note: "Average support time for urgent cow care requests" },
];

const GAU_IMPACT_STATS = [
  { value: "180+", label: "Cows Receiving Daily Support" },
  { value: "75+", label: "Fodder Sponsorships Each Month" },
  { value: "24x7", label: "Basic Water and Shelter Attention" },
  { value: "52", label: "Major Seva Drives Per Year" },
];

const GAU_ROUTINE = [
  {
    step: "1. Morning Feeding",
    desc: "Fresh grass, dry fodder, and water distribution begin the day with nourishment and care.",
  },
  {
    step: "2. Cleanliness and Shelter Care",
    desc: "Gaushala areas are cleaned, resting zones are maintained, and water points are checked.",
  },
  {
    step: "3. Health Monitoring",
    desc: "Daily observation helps identify weakness, injury, or veterinary attention requirements early.",
  },
  {
    step: "4. Evening Seva and Review",
    desc: "Final feeding rounds, calm supervision, and next-day support planning are completed.",
  },
];

const GAU_JOIN_OPTIONS = [
  {
    title: "Join Gau Seva",
    desc: "Register as a volunteer for gaushala service, feeding rounds, cleaning support, and field coordination.",
    cta: "Join as Volunteer",
    href: ROUTES.involved.volunteer,
    tone: "bg-[linear-gradient(135deg,#0f5a98_0%,#0d8f91_100%)] text-white",
  },
  {
    title: "Donate Grass / Fodder",
    desc: "Sponsor green grass, dry fodder bundles, mineral feed, and seasonal nutrition support for daily care.",
    cta: "Donate Grass",
    href: ROUTES.donate,
    tone: "bg-[linear-gradient(135deg,#ff8a00_0%,#cf4f00_100%)] text-white",
  },
  {
    title: "Support Medical Care",
    desc: "Help fund checkups, treatment, supplements, and emergency rescue support for vulnerable cows.",
    cta: "Support Medical Seva",
    href: ROUTES.donate,
    tone: "bg-[linear-gradient(135deg,#17384b_0%,#102837_100%)] text-white",
  },
];

const GAU_DONATION_TIERS = [
  { label: "One Day Grass Seva", amount: "Rs 1,100", note: "Fresh fodder support for one day" },
  { label: "Weekly Fodder Seva", amount: "Rs 7,500", note: "Grass and dry feed sponsorship for one week" },
  { label: "Monthly Gau Support", amount: "Rs 21,000", note: "Nutrition, water, and daily care support" },
];

const GAU_STORIES = [
  {
    name: "Gaushala Care Team",
    quote: "When fodder arrives on time, the entire gaushala routine becomes stable and the cows remain calm and healthy.",
  },
  {
    name: "Volunteer Sevadar",
    quote: "Gau Seva taught me patience, humility, and devotion. Even one hour of seva in the gaushala changes the heart.",
  },
  {
    name: "Donor Family",
    quote: "Sponsoring grass seva gave our family a meaningful way to contribute regularly to dharmic service.",
  },
];

const GAU_FAQS = [
  {
    q: "How can I join Gau Seva as a volunteer?",
    a: "Use the Join Gau Seva button on this page. The trust team can connect you for feeding, cleaning, water support, and gaushala duty scheduling.",
  },
  {
    q: "Can I donate only for grass and fodder?",
    a: "Yes. You can specifically support green grass, dry fodder, nutrition mix, or general daily cow care through the donation options.",
  },
  {
    q: "Can I sponsor a day of Gau Seva in the name of my family?",
    a: "Yes. Day-wise and monthly Gau Seva sponsorship options can be dedicated for family seva intentions and remembrance.",
  },
];

const DISASTER_FEATURES = [
  {
    title: "Rapid Relief Deployment",
    desc: "Quick mobilization of food kits, water, blankets, medicines, and essential family support.",
  },
  {
    title: "Volunteer Field Response",
    desc: "Trained sevadars coordinate rescue support, camp logistics, and beneficiary registration on the ground.",
  },
  {
    title: "Recovery and Follow-up",
    desc: "Beyond emergency aid, the trust supports families with follow-up relief, care, and rehabilitation assistance.",
  },
];

const DISASTER_PROCESS = [
  {
    step: "1. Alert and Assessment",
    desc: "Field teams verify the situation, identify urgent needs, and map affected families and areas.",
  },
  {
    step: "2. Relief Mobilization",
    desc: "Food, water, medical supplies, blankets, and volunteer teams are assembled for dispatch.",
  },
  {
    step: "3. Camp Distribution",
    desc: "Essential aid is delivered through organized camps, direct household support, and local coordination points.",
  },
  {
    step: "4. Recovery Support",
    desc: "Post-crisis follow-up helps families with recurring essentials, medical support, and welfare guidance.",
  },
];

const DISASTER_JOIN_OPTIONS = [
  {
    title: "Join Relief Volunteer Team",
    desc: "Assist with packing, field distribution, registration, logistics support, and camp coordination.",
    cta: "Join Disaster Relief",
    href: ROUTES.involved.volunteer,
    tone: "bg-[linear-gradient(135deg,#0f5a98_0%,#0d8f91_100%)] text-white",
  },
  {
    title: "Donate Relief Supplies",
    desc: "Help provide dry ration kits, blankets, medicine support, water, and hygiene essentials.",
    cta: "Donate for Relief",
    href: ROUTES.donate,
    tone: "bg-[linear-gradient(135deg,#ff8a00_0%,#cf4f00_100%)] text-white",
  },
  {
    title: "Sponsor Recovery Support",
    desc: "Support post-disaster rehabilitation assistance for affected families and vulnerable communities.",
    cta: "Support Recovery",
    href: ROUTES.donate,
    tone: "bg-[linear-gradient(135deg,#17384b_0%,#102837_100%)] text-white",
  },
];

const DISASTER_DONATION_TIERS = [
  { label: "Emergency Family Kit", amount: "Rs 1,500", note: "Dry ration, water, and essential supplies" },
  { label: "Camp Support Sponsor", amount: "Rs 7,500", note: "Support one active relief camp response cycle" },
  { label: "Recovery Assistance", amount: "Rs 25,000", note: "Extended support for affected families and communities" },
];

const DISASTER_STORIES = [
  {
    name: "Field Volunteer Team",
    quote: "Disaster relief seva requires speed and discipline. When supplies reach families on time, hope returns immediately.",
  },
  {
    name: "Beneficiary Family",
    quote: "The support arrived when we had lost food, bedding, and daily essentials. It gave us strength to restart.",
  },
  {
    name: "Seva Coordinator",
    quote: "The most important part of disaster relief is organized compassion. Every volunteer becomes a lifeline for someone.",
  },
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.62, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function ReliefSectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#b96a22]`}>{eyebrow}</p> : null}
      <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-3 text-[#1d4f63]`}>{title}</h2>
      {intro ? <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{intro}</p> : null}
    </div>
  );
}

function ReliefButton({
  to,
  children,
  variant = "solid",
}: {
  to: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light";
}) {
  const className =
    variant === "solid"
      ? "bg-[#e4b45e] text-[#fff7df] shadow-[0_18px_34px_rgba(196,109,26,0.25)] hover:bg-[#d08a32]"
      : variant === "light"
        ? "border border-[#f7e0a0]/60 bg-black/10 text-[#f9e6a8] hover:bg-[#f9e6a8] hover:text-[#33210f]"
        : "border border-[#D89B2B] bg-white/85 text-[#8A5B16] shadow-[0_10px_24px_rgba(111,78,25,0.08)] hover:bg-[#FFF4D6]";

  return (
    <Link
      to={to}
      className={`inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full px-8 text-base font-bold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F0C36A]/45 ${className}`}
    >
      {children}
    </Link>
  );
}

function ReliefIcon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const iconClass = className;

  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E7D3AE] bg-[#FFF0D6] text-[#C46D1A]">
      {name === "alert" ? (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="M12 3 3.8 18.2a1.4 1.4 0 0 0 1.2 2.1h14a1.4 1.4 0 0 0 1.2-2.1L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12 8v5M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : name === "package" ? (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="m4 7.5 8-4 8 4v9l-8 4-8-4v-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m4.5 8 7.5 4 7.5-4M12 12v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : name === "volunteer" ? (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3.5 19c.6-3 2.8-5 5.7-5h1.1c2.9 0 5.1 2 5.7 5M15.5 14.2c2.2.3 3.9 1.9 4.3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : name === "water" ? (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 15.2A3.4 3.4 0 0 0 12 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : name === "food" ? (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="M6 3v8M9 3v8M6 7h3M15 3v18M18.5 4.5c1 1.3 1.5 3 1.5 5.2 0 3.1-1.7 4.8-5 5.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7.5 11v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : name === "medicine" ? (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="M8 4h8a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : name === "shelter" ? (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="m4 19 8-14 8 14H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12 5v14M9.5 19 12 14l2.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : name === "donation" ? (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="M7 12.5h4a1.8 1.8 0 0 1 0 3.6H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3.5 12H6c1 0 1.8.4 2.5 1.1M12.4 15.2l4.4-2.2c.9-.4 2 0 2.4.9.4.8.1 1.8-.7 2.3L12 20H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.2 8.8s-2.5-1.7-2.5-3.6a2 2 0 0 1 3.4-1.4 2 2 0 0 1 3.4 1.4c0 1.9-2.5 3.6-2.5 3.6l-.9.6-.9-.6Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ) : name === "recovery" ? (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="M4.5 13.2a7.5 7.5 0 0 1 12.8-5.3L19.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19.5 6.2V10h-3.8M19.5 10.8a7.5 7.5 0 0 1-12.8 5.3L4.5 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 17.8V14h3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : name === "help" ? (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="M12 20a8 8 0 1 0-8-8 8 8 0 0 0 8 8Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.8 9.2a2.4 2.4 0 0 1 4.6.9c0 1.8-2.1 2-2.1 3.5M12.2 16.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path d="M12 3 19 6v5.8c0 4.2-2.9 7.7-7 9.2-4.1-1.5-7-5-7-9.2V6l7-3Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

function ReliefInfoCard({
  title,
  text,
  icon,
  centered = false,
}: {
  title: string;
  text: string;
  icon: string;
  centered?: boolean;
}) {
  return (
    <article className={`relief-card h-full rounded-[26px] border border-[#E7D3AE] bg-[#FFFDF8] p-6 shadow-[0_14px_34px_rgba(115,78,31,0.08)] ${centered ? "text-center" : ""}`}>
      <div className={centered ? "flex justify-center" : ""}>
        <ReliefIcon name={icon} />
      </div>
      <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{title}</h3>
      <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{text}</p>
    </article>
  );
}

function parseTimeWindow(timeWindow: string) {
  const [start, end] = timeWindow.split("-");

  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return { startMinutes: toMinutes(start), endMinutes: toMinutes(end) };
}

function getActivityStatus(now: Date, activity: TrustActivity) {
  const today = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const { startMinutes, endMinutes } = parseTimeWindow(activity.timeWindow);
  const isScheduledToday = activity.days.includes(today);

  if (isScheduledToday && currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
    return {
      label: "Live Now",
      tone: "bg-[#e8fff1] text-[#0d7a43] border-[#b7e6c9]",
      note: `Active until ${activity.timeWindow.split("-")[1]}`,
    };
  }

  if (isScheduledToday && currentMinutes < startMinutes) {
    return {
      label: "Upcoming Today",
      tone: "bg-[#eef6ff] text-[#1d4d75] border-[#cfe0f1]",
      note: `Starts at ${activity.timeWindow.split("-")[0]}`,
    };
  }

  return {
    label: "Scheduled",
    tone: "bg-[#fff7ea] text-[#9a5b1d] border-[#efd9ba]",
    note: activity.cadence,
  };
}

function formatCountdownParts(diffMs: number) {
  const totalMinutes = Math.max(0, Math.floor(diffMs / 60000));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
}

function ArchitectureHubPage({
  title,
  subtitle,
  cards,
  extraSection,
}: {
  title: string;
  subtitle: string;
  cards: NavCard[];
  extraSection?: ReactNode;
}) {
  usePageMeta(title, subtitle);

  return (
    <div className="pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <div className="rounded-3xl border border-[#f1d6b0] bg-gradient-to-r from-[#fff8ef] via-[#fff5e8] to-[#fff1df] p-6 md:p-8 shadow-[0_14px_30px_rgba(172,85,22,0.16)]">
          <h1 className="text-3xl md:text-5xl font-black text-[#8a3d06]">{title}</h1>
          <p className="mt-3 text-[#7a4d28] md:text-lg">{subtitle}</p>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <article key={card.href} className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-black text-[#123753]">{card.title}</h2>
              <p className="text-sm text-[#4f6272] mt-2 mb-4">{card.desc}</p>
              <Link to={card.href} className="btn-primary text-sm">
                Open Section
              </Link>
            </article>
          ))}
        </div>
      </PageSectionShell>

      {extraSection ? <PageSectionShell className="pt-4">{extraSection}</PageSectionShell> : null}
    </div>
  );
}

const SEVA_INITIATIVE_ITEMS = [
  {
    title: "Gau Seva",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg",
    href: ROUTES.seva.gau,
  },
  {
    title: "Jal Seva",
    image: "/images/jal1.png",
    href: ROUTES.seva.jal,
  },
  {
    title: "Ann Seva",
    image: "/images/annseva.png",
    href: ROUTES.seva.ann,
  },
  {
    title: "Chikitsa Seva",
    image: "/images/chikitsa.png",
    href: ROUTES.seva.medicine,
  },
  {
    title: "Education Support",
    image: "/images/education.png",
    href: ROUTES.seva.education,
  },
  {
    title: "Scholarship Program",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772699279/scholorship_ki7aes.png",
    href: ROUTES.seva.scholarship,
  },
  {
    title: "Kanyadaan Seva",
    image: "/images/kanyadan.png",
    href: ROUTES.seva.kanyadaan,
  },
  {
    title: "Vyasanmukti Abhiyan",
    image: "/images/vyasanmukti.png",
    href: ROUTES.seva.vyasanmukti,
  },
  {
    title: "Disaster Relief",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772911110/disaster-relief_lg6qcp.webp",
    href: ROUTES.seva.disasterRelief,
  },
] as const;

function SevaInitiativesSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[#e7d4b7] bg-[radial-gradient(circle_at_top_left,rgba(249,242,169,0.28),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(82,156,176,0.14),transparent_28%),linear-gradient(135deg,#fff9f0_0%,#fffefb_42%,#f7fbff_100%)] px-5 py-10 shadow-[0_24px_60px_rgba(18,55,83,0.10)] md:px-8 md:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute -left-14 top-10 h-36 w-36 rounded-full bg-[#f4ce5a]/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-6 right-4 h-40 w-40 rounded-full bg-[#529cb0]/14 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#d38a1f]">Seva Initiatives</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-[#123753] md:text-5xl">Seva Initiatives</h2>
        <p className="mt-4 text-base leading-7 text-[#5c6f7f] md:text-lg">Serving Humanity Through Selfless Actions</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="relative mt-5 flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#9c6f3f]"
      >
        <span>Scroll to explore</span>
        <span aria-hidden="true">→</span>
      </motion.div>

      <div className="relative mt-8 overflow-hidden">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SEVA_INITIATIVE_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
              className="min-w-[18.5rem] max-w-[18.5rem] snap-start md:min-w-[19.5rem] md:max-w-[19.5rem] xl:min-w-[20rem] xl:max-w-[20rem]"
            >
              <Link to={item.href} className="group block">
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative h-[23rem] overflow-hidden rounded-[1.6rem] shadow-[0_18px_44px_rgba(18,55,83,0.12)]"
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,32,49,0.04),rgba(10,32,49,0.18)_38%,rgba(8,23,37,0.82)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(10,32,49,0.08),rgba(10,32,49,0.24)_34%,rgba(8,23,37,0.9)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-end justify-between gap-4"
                    >
                      <h3 className="max-w-[12rem] text-2xl font-black leading-tight text-white">{item.title}</h3>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-white/90">
                        Explore
                        <span aria-hidden="true">→</span>
                      </span>
                    </motion.div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitecturePlaceholderPage({
  title,
  summary,
  bullets,
}: {
  title: string;
  summary: string;
  bullets: string[];
}) {
  usePageMeta(title, summary);

  return (
    <div className="pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <div className="rounded-3xl border border-[#dce8f5] bg-white p-6 md:p-8 shadow-sm">
          <p className="inline-flex rounded-full border border-[var(--color-border-nav)] bg-[#f5f9ff] px-3 py-1 text-xs font-semibold text-[#1d4d75]">
            Content Placeholder
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-black text-[#123753]">{title}</h1>
          <p className="mt-2 text-[#4f6272] max-w-3xl">{summary}</p>
          <div className="mt-4 rounded-xl border border-[#f1d8b9] bg-[#fff7ea] p-4">
            <p className="text-sm text-[#7a4f1f]">
              This page is active in the new architecture and ready for detailed trust content.
            </p>
          </div>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-[#123753] mb-3">Planned Highlights</h2>
          <ul className="space-y-2 text-[#4f6272]">
            {bullets.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageSectionShell>
    </div>
  );
}

type EventHighlight = {
  title: string;
  value: string;
  note: string;
};

type EventFeature = {
  title: string;
  desc: string;
};

type EventTier = {
  label: string;
  amount: string;
  note: string;
};

type EventVoice = {
  name: string;
  quote: string;
};

type EventFaq = {
  q: string;
  a: string;
};

const EVENT_SEVA_HERO_CONTENT_CLASS =
  "flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]";
const EVENT_SEVA_HERO_SUBTITLE_WRAP_CLASS =
  "text-[18px] font-semibold leading-tight text-white sm:text-[24px] md:text-[34px]";
const EVENT_SEVA_PRIMARY_BUTTON_CLASS =
  "inline-flex items-center rounded-lg bg-[#f3a11f] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] transition-colors hover:bg-[#ffaf31]";
const EVENT_SEVA_SECONDARY_BUTTON_CLASS =
  "inline-flex items-center rounded-lg bg-[#0f7994] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(15,121,148,0.28)] transition-colors hover:bg-[#1492b1]";
const EVENT_SEVA_SECTION_CLASS =
  "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
const EVENT_SEVA_CARD_CLASS =
  "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]";
const EVENT_SEVA_HIGHLIGHT_CARD_CLASS =
  "rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]";
const EVENT_SEVA_DETAIL_CARD_CLASS = "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm";

function EventShowcasePage({
  title,
  subtitle,
  backgroundImage,
  metaDescription,
  aboutTitle,
  aboutParagraphs,
  highlights,
  features,
  supportTracks,
  donationTiers,
  testimonials,
  faqs,
  primaryCta,
  secondaryCta,
  extraSection,
  gauSevaStyle = false,
  hideHighlightValues = false,
  supportIntro,
}: {
  title: string;
  subtitle: string;
  backgroundImage: string;
  metaDescription: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  highlights: EventHighlight[];
  features: EventFeature[];
  supportTracks: string[];
  donationTiers: EventTier[];
  testimonials: EventVoice[];
  faqs: EventFaq[];
  primaryCta: string;
  secondaryCta: string;
  extraSection?: ReactNode;
  gauSevaStyle?: boolean;
  hideHighlightValues?: boolean;
  supportIntro?: string | null;
}) {
  usePageMeta(title, metaDescription);

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title={title}
        subtitle={subtitle}
        subtitleClassName={gauSevaStyle ? SEVA_HERO_SUBTITLE_CLASS : undefined}
        contentClassName={gauSevaStyle ? EVENT_SEVA_HERO_CONTENT_CLASS : undefined}
        backgroundImage={backgroundImage}
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass={gauSevaStyle ? "bg-black/55" : undefined}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className={gauSevaStyle ? EVENT_SEVA_PRIMARY_BUTTON_CLASS : "inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"}
          >
            {primaryCta}
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className={gauSevaStyle ? EVENT_SEVA_SECONDARY_BUTTON_CLASS : "inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"}
          >
            {secondaryCta}
          </Link>
        </div>
      </HeroSection>

      <section className={`${gauSevaStyle ? "relative z-20 mt-[10px]" : "-mt-10 relative z-20"} pb-6`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className={gauSevaStyle ? EVENT_SEVA_HIGHLIGHT_CARD_CLASS : "rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg"}
              >
                <p className={gauSevaStyle ? SEVA_HIGHLIGHT_TITLE_CLASS : "text-[#ffb06a] text-xs uppercase tracking-wide"}>{item.title}</p>
                {hideHighlightValues ? null : (
                  <p className={gauSevaStyle ? SEVA_HIGHLIGHT_VALUE_CLASS : "text-white text-2xl font-black mt-1"}>{item.value}</p>
                )}
                <p className={gauSevaStyle ? `${hideHighlightValues ? "mt-3" : "mt-1"} ${SEVA_BODY_TEXT_CLASS}` : "text-[#c7d7e1] text-sm mt-1"}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${gauSevaStyle ? "max-w-7xl mx-auto px-4 py-10" : "bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16"}`}>
        <div className={gauSevaStyle ? EVENT_SEVA_SECTION_CLASS : "max-w-7xl mx-auto px-4"}>
          <p className={gauSevaStyle ? SEVA_SECTION_LABEL_CLASS : "hidden"}>{aboutTitle}</p>
          {gauSevaStyle ? <h2 className={SEVA_SECTION_HEADING_CLASS}>{title}</h2> : <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">{aboutTitle}</h2>}
          {aboutParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className={gauSevaStyle ? `mt-4 first:mt-5 ${SEVA_BODY_TEXT_CLASS}` : "max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5 first:mt-0"}
            >
              {paragraph}
            </p>
          ))}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {features.map((item) => (
              <div key={item.title} className={gauSevaStyle ? EVENT_SEVA_CARD_CLASS : "rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center"}>
                <h3 className={gauSevaStyle ? SEVA_CARD_TITLE_CLASS : "text-3xl font-black text-white mb-3"}>{item.title}</h3>
                <p className={gauSevaStyle ? `mt-3 ${SEVA_BODY_TEXT_CLASS}` : "text-[#c8d6df] text-xl"}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {extraSection}

      <section className={`${gauSevaStyle ? "max-w-7xl mx-auto px-4 py-10" : "bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16"}`}>
        <div className={gauSevaStyle ? `${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-2 gap-6` : "max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6"}>
          <div className={gauSevaStyle ? EVENT_SEVA_DETAIL_CARD_CLASS : "rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8"}>
            {gauSevaStyle ? <p className={SEVA_SECTION_LABEL_CLASS}>Event Support Tracks</p> : null}
            <h3 className={gauSevaStyle ? SEVA_SECTION_HEADING_CLASS : "text-4xl font-black text-white mb-5"}>Event Support Tracks</h3>
            <ul className={gauSevaStyle ? `space-y-3 mt-5 ${SEVA_BODY_TEXT_CLASS}` : "space-y-3 text-[#d4e1e8] text-xl"}>
              {supportTracks.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={gauSevaStyle ? EVENT_SEVA_DETAIL_CARD_CLASS : "rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm"}>
            {gauSevaStyle ? <p className={SEVA_SECTION_LABEL_CLASS}>Join or Support This Event</p> : null}
            <h3 className={gauSevaStyle ? SEVA_SECTION_HEADING_CLASS : "text-4xl font-black mb-4"}>Join or Support This Event</h3>
            {supportIntro !== null ? (
              <p className={gauSevaStyle ? `mt-4 ${SEVA_BODY_TEXT_CLASS}` : "text-xl text-white/95 mb-6"}>
                {supportIntro ?? "Support venue readiness, hospitality, volunteer coordination, digital outreach, and event execution through your seva."}
              </p>
            ) : null}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 ${gauSevaStyle ? "mt-6 mb-6" : "mb-6"}`}>
              {donationTiers.map((tier) => (
                <div key={tier.label} className={gauSevaStyle ? "rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4" : "rounded-xl bg-white/15 p-4 text-center"}>
                  <p className={gauSevaStyle ? "text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]" : "text-base font-semibold"}>{tier.label}</p>
                  <p className={gauSevaStyle ? "mt-2 text-2xl font-black text-white" : "text-2xl font-black mt-1"}>{tier.amount}</p>
                  <p className={gauSevaStyle ? `mt-3 ${SEVA_BODY_TEXT_CLASS}` : "text-sm text-white/85 mt-2"}>{tier.note}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={ROUTES.donate}
                className={gauSevaStyle ? "inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]" : "inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl"}
              >
                Donate Now
              </Link>
              <Link
                to={ROUTES.involved.volunteer}
                className={gauSevaStyle ? "inline-flex rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]" : "inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl"}
              >
                Join Volunteer Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${gauSevaStyle ? "max-w-7xl mx-auto px-4 py-10" : "bg-[#0a2534] py-16"}`}>
        <div className={gauSevaStyle ? EVENT_SEVA_SECTION_CLASS : "max-w-7xl mx-auto px-4"}>
          {gauSevaStyle ? <p className={SEVA_SECTION_LABEL_CLASS}>Voices from the Event</p> : <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">Voices from the Event</h2>}
          {gauSevaStyle ? <h2 className={SEVA_SECTION_HEADING_CLASS}>Experiences from devotees and volunteers</h2> : null}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 ${gauSevaStyle ? "mt-8" : ""}`}>
            {testimonials.map((item) => (
              <div key={item.name} className={gauSevaStyle ? EVENT_SEVA_DETAIL_CARD_CLASS : "rounded-2xl border border-white/10 bg-[#17384b] p-6"}>
                <p className={gauSevaStyle ? SEVA_BODY_TEXT_CLASS : "text-[#dbe7ee] text-xl leading-relaxed"}>"{item.quote}"</p>
                <p className={gauSevaStyle ? "mt-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]" : "text-[#ffb06a] font-semibold text-lg mt-4"}>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${gauSevaStyle ? "max-w-5xl mx-auto px-4 py-10" : "bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16"}`}>
        <div className={gauSevaStyle ? EVENT_SEVA_SECTION_CLASS : "max-w-5xl mx-auto px-4"}>
          {gauSevaStyle ? <p className={SEVA_SECTION_LABEL_CLASS}>Frequently Asked Questions</p> : <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Frequently Asked Questions</h2>}
          {gauSevaStyle ? <h2 className={SEVA_SECTION_HEADING_CLASS}>Helpful answers for visitors, donors, and volunteers</h2> : null}
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className={`rounded-xl border border-white/10 ${gauSevaStyle ? "bg-[var(--campaign-surface)]" : "bg-[#163548]"} p-5`}>
                <summary className={gauSevaStyle ? "cursor-pointer text-white text-lg font-black md:text-xl" : "cursor-pointer text-white text-xl font-semibold"}>{item.q}</summary>
                <p className={gauSevaStyle ? `mt-3 ${SEVA_BODY_TEXT_CLASS}` : "text-[#d4e1e8] text-lg mt-3"}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const MissionHubPage = memo(function MissionHubPage() {
  return (
    <ArchitectureHubPage
      title="Mission & Philosophy"
      subtitle="Spiritual mission, social service mission, cultural renaissance, and global outreach vision."
      cards={[
        { title: "Spiritual Mission", desc: "Bhakti, satsang, and scriptural guidance programs.", href: ROUTES.mission.spiritual },
        { title: "Social Service Mission", desc: "Compassion-led initiatives for families and society.", href: ROUTES.mission.social },
        { title: "Cultural Renaissance", desc: "Protection and revival of values and heritage.", href: ROUTES.mission.cultural },
        { title: "Global Outreach Vision", desc: "Vision for global satsang and service collaboration.", href: ROUTES.mission.global },
      ]}
    />
  );
});

export const SevaHubPage = memo(function SevaHubPage() {
  return (
    <ArchitectureHubPage
      title="Seva"
      subtitle="A structured seva ecosystem covering food, water, education, healthcare, and social upliftment."
      cards={[
        { title: "Gau Seva", desc: "Cow care, protection, and sattvik seva support.", href: ROUTES.seva.gau },
        { title: "Jal Seva", desc: "Water relief, hydration support, and compassionate public water seva.", href: ROUTES.seva.jal },
        { title: "Ann Seva", desc: "Meal service, annadaan support, and dignified food seva for communities.", href: ROUTES.seva.ann },
        { title: "Chikitsa Seva", desc: "Medical support and medicine access programs.", href: ROUTES.seva.medicine },
        { title: "Education Support", desc: "Student aid, mentoring, and educational seva.", href: ROUTES.seva.education },
        { title: "Scholarship Program", desc: "Scholarship support for deserving learners.", href: ROUTES.seva.scholarship },
        { title: "Kanyadaan Seva", desc: "Support with dignity for family ceremonies.", href: ROUTES.seva.kanyadaan },
        { title: "Vyasanmukti Abhiyan", desc: "Addiction recovery and rehabilitation support.", href: ROUTES.seva.vyasanmukti },
        { title: "Disaster Relief", desc: "Rapid response support during emergencies.", href: ROUTES.seva.disasterRelief },
        { title: "Volunteer Programs", desc: "Seva teams and volunteer coordination models.", href: ROUTES.seva.volunteerPrograms },
      ]}
      extraSection={<SevaInitiativesSection />}
    />
  );
});

export const EventsKathaHubPage = memo(function EventsKathaHubPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Katha" | "Festivals" | "Youth" | "Spiritual">("All");

  const eventItems = useMemo(
    () => [
      {
        title: "Bhagwat Katha Mahotsav",
        description: "Large-scale katha assemblies and devotional discourse.",
        href: ROUTES.eventsKatha.bhagwatKatha,
        image: "/images/kathapravachan.png",
        badge: "Upcoming",
        date: "May 2026",
        category: "Katha" as const,
      },
      {
        title: "Spiritual Events",
        description: "Satsang sabhas, path, and spiritual gatherings.",
        href: ROUTES.eventsKatha.spiritualEvents,
        image: "/images/spiritual1.png",
        badge: "Live",
        date: "Every Week",
        category: "Spiritual" as const,
      },
      {
        title: "Festivals & Celebrations",
        description: "Traditional utsavs and seasonal observances.",
        href: ROUTES.eventsKatha.festivals,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/festival_axzy0v.jpg",
        badge: "Seasonal",
        date: "All Year",
        category: "Festivals" as const,
      },
      {
        title: "Guru Purnima",
        description: "Guru bhakti and spiritual gratitude programs.",
        href: ROUTES.eventsKatha.guruPurnima,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913532/gurupurnima_gthuvv.jpg",
        badge: "Sacred",
        date: "Annual",
        category: "Festivals" as const,
      },
      {
        title: "Annakut Mahotsav",
        description: "Devotional offering and community celebration.",
        href: ROUTES.eventsKatha.annakut,
        image: "/images/annseva.png",
        badge: "Popular",
        date: "Festival Day",
        category: "Festivals" as const,
      },
      {
        title: "Dharmik Events",
        description: "Dharmic programs including youth tracks, culture, and seva.",
        href: ROUTES.eventsKatha.dharmikEvents,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/youth_xj81l3.jpg",
        badge: "Dharmik",
        date: "Monthly",
        category: "Youth" as const,
      },
    ],
    [],
  );

  const visibleItems =
    activeFilter === "All" ? eventItems : eventItems.filter((item) => item.category === activeFilter);
  const featuredItem = visibleItems[0] ?? eventItems[0];
  const spotlightItems = visibleItems.slice(1, 3);
  const supportingItems = visibleItems.slice(3);

  usePageMeta(
    "Events & Katha",
    "Bhagwat Katha and devotional events calendar with youth and festival engagement.",
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#FFF9F1_0%,#FFFDF8_42%,#F6EAD4_100%)] text-[#51463C]">
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(4, 18, 30, 0.34), rgba(4, 18, 30, 0.78)), url('/images/kathapravachan.png')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(228,180,94,0.14),transparent_24%)]" />
        <div aria-hidden="true" className="absolute left-[6%] top-24 h-28 w-28 rounded-full bg-[#E4B45E]/20 blur-3xl" />
        <div aria-hidden="true" className="absolute right-[10%] top-36 h-32 w-32 rounded-full bg-[#529CB0]/14 blur-3xl" />

        <div className="relative flex min-h-[420px] w-full items-end px-4 py-16 sm:px-6 md:min-h-[540px] md:px-10 md:py-24 lg:px-16 lg:py-32 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className={`${ABOUT_SECTION_LABEL_CLASS} text-[#F9F2A9] md:text-base`}>Spiritual Calendar</p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
              className="mt-3 text-4xl font-black leading-tight text-white md:text-6xl"
            >
              Events & Katha
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }}
              className="mt-4 max-w-3xl text-base leading-7 text-white/90 md:text-lg"
            >
              Bhagwat Katha and devotional events calendar with youth and festival engagement.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 w-full px-4 pb-12 sm:px-6 md:px-10 md:pb-20 lg:-mt-10 lg:px-16 lg:pb-24 xl:px-24">
        <div className="rounded-[28px] border border-[#E7D3B5] bg-[#FFFDF8]/95 p-3 shadow-[0_20px_55px_rgba(29,79,99,0.08)] backdrop-blur-xl sm:p-4">
          <div className="flex flex-wrap gap-2">
            {(["All", "Katha", "Festivals", "Youth", "Spiritual"] as const).map((filter) => {
              const active = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-[#E4B45E] text-[#33210F] shadow-[0_12px_28px_rgba(228,180,94,0.28)] hover:bg-[#D08A32]"
                      : "border border-[#D8C3A2] bg-[#FFF9F1] text-[#51463C] hover:border-[#E4B45E] hover:bg-[#FFFDF8]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-12 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pb-24 xl:px-24">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Link to={featuredItem.href} className="group block">
              <motion.article
                whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative h-[26rem] overflow-hidden rounded-[28px] border border-[#D8C3A2] bg-[#FFFDF8] shadow-[0_22px_60px_rgba(29,79,99,0.12)] md:h-[34rem]"
              >
                <motion.img
                  src={featuredItem.image}
                  alt={featuredItem.title}
                  loading="lazy"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,79,99,0.08),rgba(29,79,99,0.16)_38%,rgba(20,48,64,0.84)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(29,79,99,0.12),rgba(29,79,99,0.24)_32%,rgba(20,48,64,0.92)_100%)]" />
                <div className="absolute left-6 top-6 flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#E7D3B5] bg-[#E4B45E]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#33210F]">
                    {featuredItem.badge}
                  </span>
                  <span className="rounded-full border border-[#E7D3B5] bg-[#FFFDF8]/88 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#51463C]">
                    {featuredItem.date}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <h2 className="text-2xl font-black text-white md:text-4xl">{featuredItem.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/88 md:text-base">{featuredItem.description}</p>
                  </div>
                  <motion.span whileHover={{ x: 4 }} className="text-sm font-semibold text-white/92">
                    Open Section →
                  </motion.span>
                </div>
              </motion.article>
            </Link>
          </motion.div>

          <div className="grid gap-6">
            {spotlightItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
              >
                <Link to={item.href} className="group block">
                  <motion.article
                    whileHover={{ y: -8, rotateX: 1.2, rotateY: 1.2 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="relative h-[16rem] overflow-hidden rounded-[26px] border border-[#D8C3A2] bg-[#FFFDF8] shadow-[0_18px_46px_rgba(29,79,99,0.1)]"
                  >
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,79,99,0.08),rgba(29,79,99,0.18)_32%,rgba(20,48,64,0.84)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(29,79,99,0.12),rgba(29,79,99,0.26)_26%,rgba(20,48,64,0.92)_100%)]" />
                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#E7D3B5] bg-[#E4B45E]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#33210F]">
                        {item.badge}
                      </span>
                      <span className="rounded-full border border-[#E7D3B5] bg-[#FFFDF8]/88 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#51463C]">
                        {item.date}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <div>
                        <h3 className="text-[14px] font-black text-white md:text-[20px]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/88">{item.description}</p>
                      </div>
                      <motion.span whileHover={{ x: 4 }} className="text-sm font-semibold text-white/92">
                        Open →
                      </motion.span>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {supportingItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
            >
              <Link to={item.href} className="group block">
                <motion.article
                  whileHover={{ y: -8, rotateX: 1, rotateY: -1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative h-[18rem] overflow-hidden rounded-[24px] border border-[#D8C3A2] bg-[#FFFDF8] shadow-[0_16px_40px_rgba(29,79,99,0.1)]"
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,79,99,0.06),rgba(29,79,99,0.16)_30%,rgba(20,48,64,0.84)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(29,79,99,0.12),rgba(29,79,99,0.26)_24%,rgba(20,48,64,0.92)_100%)]" />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full border border-[#E7D3B5] bg-[#E4B45E]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#33210F]">
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <div>
                      <h3 className="text-[14px] font-black text-white md:text-[20px]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/88">{item.description}</p>
                    </div>
                    <motion.span whileHover={{ x: 4 }} className="text-sm font-semibold text-white/92">
                      →
                    </motion.span>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
          className="mt-14 text-center"
        >
          <p className="text-base leading-7 text-[#5E5247] md:text-lg">Join Our Spiritual Gatherings</p>
          <Link
            to={ROUTES.eventsKatha.festivals}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#E4B45E] px-8 py-3 text-sm font-semibold text-[#33210F] shadow-[0_16px_32px_rgba(228,180,94,0.26)] transition duration-300 hover:scale-[1.04] hover:bg-[#D08A32] hover:shadow-[0_20px_38px_rgba(208,138,50,0.28)]"
          >
            View Full Calendar →
          </Link>
        </motion.div>
      </section>
    </div>
  );
});

export const KnowledgeHubPage = memo(function KnowledgeHubPage() {
  return (
    <ArchitectureHubPage
      title="Knowledge & Learning"
      subtitle="Digital learning ecosystem for scriptural study, children learning, and daily inspiration."
      cards={[
        { title: "E-Pathshala", desc: "Interactive dharmic learning modules and admissions.", href: ROUTES.knowledge.pathshala },
        { title: "Digital Library", desc: "Curated spiritual catalog and reading resources.", href: ROUTES.knowledge.library },
        { title: "Bhagwat Study Resources", desc: "Structured notes and guided study material.", href: ROUTES.knowledge.studyResources },
        { title: "Children Spiritual Learning", desc: "Bal sanskar and value-based spiritual modules.", href: ROUTES.knowledge.children },
        { title: "Daily Spiritual Quotes", desc: "Daily reflection and inspirational quote stream.", href: ROUTES.knowledge.dailyQuotes },
      ]}
    />
  );
});

export const MandirTeerthHubPage = memo(function MandirTeerthHubPage() {
  return (
    <ArchitectureHubPage
      title="Mandir & Teerth"
      subtitle="Temple vision, architecture, murti concept, construction updates, and pilgrimage guidance."
      cards={[
        { title: "Bhagwat Dham Project", desc: "Swaminarayan Mandir project overview and seva matrix.", href: ROUTES.mandirTeerth.bhagwatDham },
        { title: "Mahamandir Architecture", desc: "Hanuman Mahamandir design and darshan details.", href: ROUTES.mandirTeerth.mahamandir },
        { title: "24 Avatars Installation", desc: "Planned avatar installation concept updates.", href: ROUTES.mandirTeerth.avatars },
        { title: "Shree Kasthbhanjan Hanuman", desc: "Kasthbhanjan Hanuman murti and darshan concept.", href: ROUTES.mandirTeerth.hanuman },
        { title: "Temple Construction Updates", desc: "Milestones and progress reports.", href: ROUTES.mandirTeerth.construction },
        { title: "Pilgrimage Information", desc: "Travel and teerth visitor support details.", href: ROUTES.mandirTeerth.pilgrimage },
      ]}
    />
  );
});

export const MediaGalleryHubPage = memo(function MediaGalleryHubPage() {
  return (
    <ArchitectureHubPage
      title="Media & Gallery"
      subtitle="Photo and video gallery, event highlights, publications, and social media feed."
      cards={[
        { title: "Photo Gallery", desc: "Temple events and trust activities photo archive.", href: ROUTES.media.photos },
        { title: "Video Gallery", desc: "Katha clips and devotional event videos.", href: ROUTES.media.videos },
        { title: "Event Highlights", desc: "High-impact moments from recent programs.", href: ROUTES.media.highlights },
        { title: "Publications", desc: "Trust publications and downloadable content.", href: ROUTES.media.publications },
        { title: "Social Media Feed", desc: "Connected trust social updates and links.", href: ROUTES.media.socialFeed },
      ]}
    />
  );
});

export const DigitalServicesHubPage = memo(function DigitalServicesHubPage() {
  const digitalCards = [
    {
      title: "E-Store",
      desc: "Books, puja items, and devotional essentials in a clean digital storefront.",
      href: ROUTES.digital.store,
    },
    {
      title: "Donation System",
      desc: "Support temple, seva, and trust initiatives through a simple online contribution flow.",
      href: ROUTES.digital.donation,
    },
    {
      title: "Online Satsang",
      desc: "Join live discourse, digital darshan, and replay access from anywhere.",
      href: ROUTES.digital.satsang,
    },
    {
      title: "Membership Portal",
      desc: "Stay connected with member benefits, registration, and digital identity tools.",
      href: ROUTES.digital.membership,
    },
    {
      title: "Kundli",
      desc: "Request traditional kundli guidance with booking, details, and delivery support.",
      href: ROUTES.digital.kundli,
    },
  ];

  usePageMeta(
    "Digital Services",
    "Digital services hub for e-store, online donations, satsang access, membership support, and kundli booking.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-16">
      <HeroSection
        title="Digital Services"
        subtitle="Devotional access, online seva support, and spiritual tools in one place"
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName={EVENT_SEVA_HERO_CONTENT_CLASS}
        backgroundImage="/images/spiritual1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.digital.store} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
            Visit E-Store
          </Link>
          <Link to={ROUTES.digital.satsang} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
            Join Online Satsang
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Digital Reach",
                label: "Daily access for devotees",
                note: "Simple routes for seva, study, satsang, and spiritual support.",
              },
              {
                title: "Clean Experience",
                label: "Easy to browse",
                note: "Each service is organized with clear entry points and focused actions.",
              },
              {
                title: "Connected Seva",
                label: "Support from anywhere",
                note: "Donate, join, request, and stay connected through digital channels.",
              },
              {
                title: "Platform Design",
                label: "Fast and functional",
                note: "A cleaner visual system inspired by the Gau Seva page style.",
              },
            ].map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>* {item.title}</p>
                <p className={SEVA_HIGHLIGHT_VALUE_CLASS}>{item.label}</p>
                <p className={`mt-1 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Digital Service Routes</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Explore every major online service with the same clean visual language</h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {digitalCards.map((card) => (
              <article key={card.href} className={EVENT_SEVA_CARD_CLASS}>
                <h3 className={SEVA_CARD_TITLE_CLASS}>{card.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{card.desc}</p>
                <Link to={card.href} className={`mt-5 inline-flex ${EVENT_SEVA_PRIMARY_BUTTON_CLASS}`}>
                  Open Section
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 gap-6 lg:grid-cols-2`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Why This Hub Matters</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>A clearer digital entry point for devotees, donors, and families</h3>
            <p className={`mt-5 ${SEVA_BODY_TEXT_CLASS}`}>
              The Digital Services area now follows the same structured look as Gau Seva so visitors can move through
              online sections without facing mismatched fonts, banners, or scattered layouts.
            </p>
            <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS}`}>
              This makes the project feel more polished, more trustworthy, and easier to use across donation, satsang,
              membership, shopping, and kundli support.
            </p>
          </div>

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Start With These</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Quick digital actions for common visitor needs</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={ROUTES.digital.donation} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
                Open Donation System
              </Link>
              <Link to={ROUTES.digital.membership} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
                View Membership Portal
              </Link>
              <Link to={ROUTES.digital.kundli} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
                Book Kundli
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const GetInvolvedHubPage = memo(function GetInvolvedHubPage() {
  return (
    <ArchitectureHubPage
      title="Get Involved"
      subtitle="Volunteer, donate, partner, and sponsor meaningful seva and spiritual initiatives."
      cards={[
        { title: "Volunteer Registration", desc: "Join trust seva teams with skill-based assignment.", href: ROUTES.involved.volunteer },
        { title: "Become a Donor", desc: "Support causes with transparent donation flow.", href: ROUTES.involved.donor },
        { title: "Partner With Us", desc: "Collaborate as an institution or service partner.", href: ROUTES.involved.partner },
        { title: "Sponsor Programs", desc: "Sponsor events, education, and social outreach programs.", href: ROUTES.involved.sponsor },
      ]}
    />
  );
});

export const AboutAwardsPage = memo(function AboutAwardsPage() {
  const [activeFilter, setActiveFilter] = useState<RecognitionCategory>("All");
  const awardsLabel = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]";
  const awardsHeading = "text-[14px] font-black text-white md:text-[20px]";
  const awardsBody = "text-base leading-7 text-[var(--campaign-text)] md:text-lg";
  const awardsCardTitle = "text-2xl font-black text-white md:text-[1.75rem]";
  const awardsPanel =
    "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
  const awardsCardPanel =
    "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]";

  usePageMeta(
    "Awards & Recognition",
    "Recognitions, honors, and milestone acknowledgements reflecting the trust's spiritual, social, and cultural impact.",
  );

  const visibleRecognitions =
    activeFilter === "All"
      ? RECOGNITION_ITEMS
      : RECOGNITION_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-12">
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-10 md:pt-10">
        <section className={awardsPanel}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className={awardsLabel}>International Award</p>
              <h2 className={`mt-2 ${awardsHeading}`}>
                Maharshi Honor Conferred at Jio World Centre, Mumbai
              </h2>
              <div className={`mt-5 space-y-4 ${awardsBody}`}>
                <p>
                  Shri Manish Bhaiji Maharaj, the revered founder and spiritual guide of Bhagwat Heritage Service Foundation
                  Trust, was honored with the prestigious <strong>&ldquo;Maharshi Award&rdquo;</strong> at the renowned{" "}
                  <strong>Jio World Centre, Mumbai</strong>.
                </p>
                <p>
                  This distinguished recognition was bestowed upon him in appreciation of his unwavering dedication to spiritual
                  awakening, cultural preservation, and humanitarian service. Through his inspiring discourses on{" "}
                  <strong>Shreemad Bhagwat Katha</strong> and his continuous efforts in guiding society toward dharma,
                  compassion, and selfless service, Manish Bhaiji Maharaj has touched the lives of countless devotees across
                  the nation.
                </p>
                <p>
                  The conferment of the <strong>&ldquo;Maharshi&rdquo; title</strong> symbolizes respect for his deep
                  spiritual wisdom, commitment to Sanatan values, and his mission to spread divine knowledge for the upliftment
                  of humanity.
                </p>
                <p>
                  This moment stands as a proud milestone for the entire <strong>Bhagwat Heritage family</strong>, inspiring
                  devotees and followers to continue the path of spirituality, service, and righteousness.
                </p>
              </div>
            </div>

            <div className="grid gap-3 lg:w-[280px]">
              <div className={awardsCardPanel}>
                <p className={awardsLabel}>Award Scope</p>
                <p className={`mt-2 ${awardsCardTitle}`}>International Recognition</p>
              </div>
              <div className={awardsCardPanel}>
                <p className={awardsLabel}>Award Title</p>
                <p className={`mt-2 ${awardsCardTitle}`}>Maharshi Award</p>
              </div>
              <div className={awardsCardPanel}>
                <p className={awardsLabel}>Venue</p>
                <p className={`mt-2 ${awardsCardTitle}`}>Jio World Centre, Mumbai</p>
              </div>
              <div className={awardsCardPanel}>
                <p className={awardsLabel}>Honoree</p>
                <p className={`mt-2 ${awardsCardTitle}`}>Shri Manish Bhaiji Maharaj</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
          <section className={awardsPanel}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={awardsLabel}>New Feature</p>
                <h2 className={`mt-2 ${awardsHeading}`}>Recognition Explorer</h2>
                <p className={`mt-2 max-w-2xl ${awardsBody}`}>
                  Filter recognitions by category to quickly review honors related to national acknowledgement, seva impact,
                  education support, and cultural preservation.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {RECOGNITION_FILTERS.map((filter) => {
                  const active = filter === activeFilter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? "bg-[var(--campaign-accent)] text-white shadow-sm"
                          : "border border-white/15 bg-white/10 text-white hover:border-white/25 hover:bg-white/15"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {visibleRecognitions.map((item) => (
                <article
                  key={`${item.year}-${item.title}`}
                  className={awardsCardPanel}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--campaign-accent)]">
                          {item.category}
                        </span>
                        <span className="text-sm font-semibold text-[var(--campaign-text)]">{item.year}</span>
                      </div>
                      <h3 className={`mt-3 ${awardsCardTitle}`}>{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-[var(--campaign-accent)]">{item.presenter}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] px-4 py-3 md:max-w-[240px]">
                      <p className={awardsLabel}>Outcome</p>
                      <p className={`mt-2 ${awardsBody}`}>{item.impact}</p>
                    </div>
                  </div>

                  <p className={`mt-4 ${awardsBody}`}>{item.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className={awardsPanel}>
              <h2 className={awardsHeading}>Recognition Focus</h2>
              <ul className={`mt-4 space-y-3 ${awardsBody}`}>
                <li className="rounded-2xl bg-[var(--campaign-surface)] px-4 py-3">
                  Seva programs are evaluated on continuity, discipline, and measurable community relief.
                </li>
                <li className="rounded-2xl bg-[var(--campaign-surface)] px-4 py-3">
                  Educational support recognitions highlight long-term child and youth development impact.
                </li>
                <li className="rounded-2xl bg-[var(--campaign-surface)] px-4 py-3">
                  Cultural honors reflect preservation of devotion, heritage, and spiritual participation.
                </li>
              </ul>
            </section>

            <section className={awardsPanel}>
              <h2 className={awardsHeading}>Milestone Snapshot</h2>
              <div className="mt-4 space-y-4">
                <div className={awardsCardPanel}>
                  <p className={awardsLabel}>Public Trust</p>
                  <p className={`mt-1 ${awardsBody}`}>
                    Recognition strengthens transparency, credibility, and long-term support for trust-led initiatives.
                  </p>
                </div>
                <div className={awardsCardPanel}>
                  <p className={awardsLabel}>Service Quality</p>
                  <p className={`mt-1 ${awardsBody}`}>
                    Awards validate disciplined execution across social relief, event operations, and volunteer engagement.
                  </p>
                </div>
                <div className={awardsCardPanel}>
                  <p className={awardsLabel}>Future Readiness</p>
                  <p className={`mt-1 ${awardsBody}`}>
                    The archive creates a strong narrative base for upcoming partnerships, sponsorships, and institutional outreach.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
});


export const AboutActivitiesOverviewPage = memo(function AboutActivitiesOverviewPage() {
  const [activeStream, setActiveStream] = useState<ActivityStream>("All");
  const [currentTime, setCurrentTime] = useState(() => new Date());

  usePageMeta(
    "Trust Activities Overview",
    "A real-time styled overview of spiritual, seva, educational, and cultural activities run by the trust.",
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  const visibleActivities =
    activeStream === "All"
      ? TRUST_ACTIVITY_ITEMS
      : TRUST_ACTIVITY_ITEMS.filter((activity) => activity.stream === activeStream);

  const liveCount = TRUST_ACTIVITY_ITEMS.filter((activity) => getActivityStatus(currentTime, activity).label === "Live Now").length;
  const upcomingCount = TRUST_ACTIVITY_ITEMS.filter((activity) => getActivityStatus(currentTime, activity).label === "Upcoming Today").length;
  const weekdayName = WEEKDAY_LABELS[currentTime.getDay()];
  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <div className="rounded-[2rem] border border-[#dce8f5] bg-[linear-gradient(135deg,#fff8ef_0%,#ffffff_45%,#edf7ff_100%)] p-6 md:p-8 shadow-[0_18px_36px_rgba(18,55,83,0.10)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-[#e7c79b] bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#9a5b1d]">
                Live Trust Dashboard
              </p>
              <h1 className="mt-4 text-3xl font-black text-[#123753] md:text-5xl">Trust Activities Overview</h1>
              <p className="mt-3 text-base leading-7 text-[#4f6272] md:text-lg">
                This page should feel operational, not static. It now presents a live-style overview of daily trust work
                across satsang, seva delivery, education support, and cultural programs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[440px]">
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[var(--color-secondary)]">{liveCount}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Live Now</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[var(--color-secondary)]">{upcomingCount}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Upcoming Today</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[var(--color-secondary)]">{TRUST_ACTIVITY_ITEMS.length}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Tracked Programs</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[var(--color-secondary)]">4</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Work Streams</p>
              </div>
            </div>
          </div>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(290px,0.8fr)]">
          <section className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">New Feature</p>
                <h2 className="mt-2 text-2xl font-black text-[#123753]">Activity Control Center</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4f6272]">
                  Real-time style status tracking updates activity cards based on the current day and time, helping visitors
                  understand what is running now, what is coming next, and which teams are responsible.
                </p>
              </div>

              <div className="rounded-2xl border border-[#e1ebf5] bg-[var(--color-surface-hover)] px-4 py-3 text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a7f90]">Live Snapshot</p>
                <p className="mt-1 text-lg font-black text-[#123753]">{formattedTime}</p>
                <p className="text-sm text-[var(--color-text-soft)]">{weekdayName}, {formattedDate}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {ACTIVITY_STREAMS.map((stream) => {
                const active = stream === activeStream;

                return (
                  <button
                    key={stream}
                    type="button"
                    onClick={() => setActiveStream(stream)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#123753] text-white shadow-sm"
                        : "border border-[#d7e5f2] bg-[var(--color-surface-hover)] text-[#36526b] hover:border-[#b7cfe3] hover:bg-white"
                    }`}
                  >
                    {stream}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4">
              {visibleActivities.map((activity) => {
                const status = getActivityStatus(currentTime, activity);

                return (
                  <article
                    key={`${activity.stream}-${activity.title}`}
                    className="rounded-2xl border border-[#e1ebf5] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#fff3e0] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#9a5b1d]">
                            {activity.stream}
                          </span>
                          <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${status.tone}`}>
                            {status.label}
                          </span>
                        </div>
                        <h3 className="mt-3 text-xl font-black text-[#123753]">{activity.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-[#8a4d14]">{activity.unit}</p>
                        <p className="mt-3 text-sm leading-7 text-[#4f6272]">{activity.summary}</p>
                      </div>

                      <div className="rounded-2xl border border-[#e7eef6] bg-white px-4 py-3 md:min-w-[240px]">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a7f90]">Operational Details</p>
                        <div className="mt-2 space-y-2 text-sm leading-6 text-[#48606f]">
                          <p><span className="font-semibold text-[#123753]">Timing:</span> {activity.timeWindow}</p>
                          <p><span className="font-semibold text-[#123753]">Cadence:</span> {activity.cadence}</p>
                          <p><span className="font-semibold text-[#123753]">Location:</span> {activity.location}</p>
                          <p><span className="font-semibold text-[#123753]">Status Note:</span> {status.note}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-[#123753]">Operational Signals</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#4f6272]">
                <li className="rounded-2xl bg-[var(--color-surface-hover)] px-4 py-3">Spiritual programs maintain daily rhythm and anchor community participation.</li>
                <li className="rounded-2xl bg-[#fff7ea] px-4 py-3">Seva teams operate through scheduled coordination blocks for consistency and accountability.</li>
                <li className="rounded-2xl bg-[var(--color-surface-hover)] px-4 py-3">Education and cultural activities are timed to maximize youth and family participation.</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-[#f1d8b9] bg-[#fff8ef] p-6 shadow-sm">
              <h2 className="text-2xl font-black text-[#8a3d06]">Realtime Working Logic</h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-[#efd9ba] bg-white/75 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">What I Added</p>
                  <p className="mt-2 text-sm leading-6 text-[#7a4f1f]">
                    A live-style activity tracker that changes status based on the current time and day.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#efd9ba] bg-white/75 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Why It Fits</p>
                  <p className="mt-2 text-sm leading-6 text-[#7a4f1f]">
                    This page should show ongoing trust work in motion, not only describe departments and programs.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#efd9ba] bg-white/75 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Next Upgrade</p>
                  <p className="mt-2 text-sm leading-6 text-[#7a4f1f]">
                    This can later connect to backend APIs for actual volunteer counts, event attendance, and seva completion updates.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </PageSectionShell>
    </div>
  );
});

export const MissionGlobalOutreachPage = memo(function MissionGlobalOutreachPage() {
  const outreachTracks = [
    {
      label: "All",
      title: "Global Trust Network",
      summary: "A unified global vision connecting satsang, seva, digital learning, and Sanatan cultural outreach.",
    },
    {
      label: "Digital Satsang",
      title: "Digital Satsang Expansion",
      summary: "Online katha, livestream satsang, multilingual clips, and devotional study access across borders.",
    },
    {
      label: "Diaspora Communities",
      title: "Diaspora Community Chapters",
      summary: "Support for devotee communities abroad through local gatherings, seva circles, and value-led engagement.",
    },
    {
      label: "Service Partnerships",
      title: "Global Seva Collaboration",
      summary: "Partnerships with social, spiritual, and community organizations for compassionate service delivery.",
    },
    {
      label: "Youth and Culture",
      title: "Youth and Heritage Outreach",
      summary: "Programs for children and youth to stay connected with scripture, language, culture, and devotional identity.",
    },
  ] as const;

  const missionPillars = [
    {
      title: "Global Satsang Access",
      desc: "Enable devotees in every region to access Bhagwat Katha, satsang guidance, and spiritual reflections through digital and local formats.",
    },
    {
      title: "Sanatan Cultural Preservation",
      desc: "Carry forward devotional traditions, family values, and dharmic practices for communities living far from traditional centers.",
    },
    {
      title: "Cross-Border Seva",
      desc: "Create service models that support humanitarian needs, volunteer collaboration, and disciplined compassion at an international level.",
    },
    {
      title: "Youth Continuity",
      desc: "Build global youth participation through value education, cultural learning, leadership circles, and devotional identity programs.",
    },
  ];

  const globalMissions = [
    {
      track: "Digital Satsang",
      region: "Worldwide",
      mission: "Build a continuous online satsang ecosystem",
      details:
        "Develop regular livestream katha sessions, archived pravachan libraries, and devotional content access for global followers in different time zones.",
    },
    {
      track: "Diaspora Communities",
      region: "United States, UK, Canada, Australia",
      mission: "Support local chapter-based devotional gatherings",
      details:
        "Help overseas devotees organize satsang circles, festival observances, study groups, and family-centered dharmic events under a shared trust vision.",
    },
    {
      track: "Service Partnerships",
      region: "India and overseas collaboration hubs",
      mission: "Create seva partnerships with aligned institutions",
      details:
        "Coordinate social welfare campaigns, food support, relief work, and community service with trusted spiritual and service organizations.",
    },
    {
      track: "Youth and Culture",
      region: "Global youth communities",
      mission: "Preserve identity through youth learning tracks",
      details:
        "Offer youth camps, Bal Sanskar modules, scripture introduction, and heritage-centered engagement for the next generation of global families.",
    },
  ] as const;

  const expansionRoadmap = [
    {
      phase: "Phase 1",
      title: "Digital Foundation",
      desc: "Strengthen livestream satsang, recorded discourse archives, and online devotion resources.",
    },
    {
      phase: "Phase 2",
      title: "Community Anchors",
      desc: "Support trusted coordinators and satsang groups in key overseas devotee regions.",
    },
    {
      phase: "Phase 3",
      title: "Partnership-Led Seva",
      desc: "Launch collaborative outreach with aligned organizations for service and cultural engagement.",
    },
    {
      phase: "Phase 4",
      title: "Global Learning Ecosystem",
      desc: "Develop multilingual study, youth formation, and devotional education pathways for families worldwide.",
    },
  ];

  const [activeTrack, setActiveTrack] = useState<(typeof outreachTracks)[number]["label"]>("All");

  usePageMeta(
    "Global Outreach Vision",
    "Global satsang expansion, cultural preservation, international seva collaboration, and youth outreach under the trust mission.",
  );

  const activeTrackContent = outreachTracks.find((track) => track.label === activeTrack) ?? outreachTracks[0];
  const visibleMissions =
    activeTrack === "All" ? globalMissions : globalMissions.filter((mission) => mission.track === activeTrack);

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#12394A] p-6 md:p-8 shadow-[0_18px_36px_rgba(0,0,0,0.24)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#F59E0B]">
                Mission Beyond Borders
              </p>
              <h1 className="mt-4 text-3xl font-black text-white md:text-5xl">Global Outreach Vision</h1>
              <p className="mt-3 text-base leading-7 text-[#d9e6ec] md:text-lg">
                Bhagwat Heritage envisions a global devotional network where spiritual knowledge, seva, and Sanatan culture
                reach families across nations through both digital access and trusted community partnerships.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[440px]">
              <div className="rounded-2xl border border-white/10 bg-[#0f3140] p-4">
                <p className="text-2xl font-black text-white">4</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#d9e6ec]">Mission Pillars</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0f3140] p-4">
                <p className="text-2xl font-black text-white">4</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#d9e6ec]">Expansion Phases</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0f3140] p-4">
                <p className="text-2xl font-black text-white">Global</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#d9e6ec]">Target Reach</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0f3140] p-4">
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#d9e6ec]">Digital Presence</p>
              </div>
            </div>
          </div>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {missionPillars.map((pillar) => (
            <article key={pillar.title} className="rounded-3xl border border-white/10 bg-[#12394A] p-5 shadow-sm">
              <h2 className="text-xl font-black text-white">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#d9e6ec]">{pillar.desc}</p>
            </article>
          ))}
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(290px,0.8fr)]">
          <section className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">New Feature</p>
                <h2 className="mt-2 text-2xl font-black text-white">Global Mission Explorer</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#d9e6ec]">
                  Browse the global vision by outreach track to understand how the trust can expand through digital satsang,
                  diaspora communities, seva partnerships, and youth-centered cultural continuity.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0f3140] px-4 py-3 md:max-w-[300px]">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F59E0B]">Active Vision Track</p>
                <p className="mt-1 text-lg font-black text-white">{activeTrackContent.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#d9e6ec]">{activeTrackContent.summary}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {outreachTracks.map((track) => {
                const active = track.label === activeTrack;

                return (
                  <button
                    key={track.label}
                    type="button"
                    onClick={() => setActiveTrack(track.label)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#F59E0B] text-white shadow-sm"
                        : "border border-white/10 bg-[#0f3140] text-white hover:border-[#F59E0B]/40 hover:bg-[#12394A]"
                    }`}
                  >
                    {track.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4">
              {visibleMissions.map((item) => (
                <article
                  key={`${item.track}-${item.mission}`}
                  className="rounded-2xl border border-white/10 bg-[#0f3140] p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#F59E0B]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F59E0B]">
                          {item.track}
                        </span>
                        <span className="rounded-full bg-[#12394A] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                          {item.region}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-black text-white">{item.mission}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#d9e6ec]">{item.details}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <h2 className="text-2xl font-black text-white">Global Mission Priorities</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#d9e6ec]">
                <li className="rounded-2xl bg-[#0f3140] px-4 py-3">Make satsang and Bhagwat knowledge accessible regardless of geography.</li>
                <li className="rounded-2xl bg-[#0f3140] px-4 py-3">Preserve Sanatan values for families growing up outside traditional cultural environments.</li>
                <li className="rounded-2xl bg-[#0f3140] px-4 py-3">Create trusted channels for seva, partnerships, and community-building beyond India.</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <h2 className="text-2xl font-black text-[#F59E0B]">Expansion Roadmap</h2>
              <div className="mt-4 space-y-4">
                {expansionRoadmap.map((item) => (
                  <div key={item.phase} className="rounded-2xl border border-white/10 bg-[#0f3140] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F59E0B]">{item.phase}</p>
                    <h3 className="mt-1 text-lg font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#d9e6ec]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </PageSectionShell>
    </div>
  );
});

export const SevaGauSevaPage = memo(function SevaGauSevaPage() {
  const heroCowImage = "/images/maharaj%20ji/gau.jpg";
  const scenicCowImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg";

  const heroButtons = [
    {
      label: "Donate for Gau Seva",
      to: ROUTES.donate,
      className: "bg-gradient-to-b from-[#c76d28] via-[#8f3f13] to-[#6f2806] text-[#fff5df] shadow-[inset_0_1px_0_rgba(255,237,201,0.35),0_10px_18px_rgba(86,39,14,0.22)] hover:brightness-105",
    },
    {
      label: "Sponsor a Cow",
      to: ROUTES.donate,
      className: "bg-gradient-to-b from-[#59733c] via-[#395b24] to-[#23421a] text-[#fff5df] shadow-[inset_0_1px_0_rgba(237,249,197,0.25),0_10px_18px_rgba(48,63,27,0.22)] hover:brightness-105",
    },
    {
      label: "Visit Kamdhenu Ashram",
      to: ROUTES.contact,
      className: "bg-gradient-to-b from-[#cc9c55] via-[#9c6b28] to-[#6d4512] text-[#fff5df] shadow-[inset_0_1px_0_rgba(255,243,210,0.35),0_10px_18px_rgba(86,56,15,0.22)] hover:brightness-105",
    },
  ];

  const topStats = [
    {
      title: "2.5 Tons",
      label: "Daily Bhojan Seva",
      note: "Fresh green fodder and dry feed offered every day.",
    },
    {
      title: "Open",
      label: "Cow Sponsorship",
      note: "Devotees can sponsor routine nourishment and care.",
    },
    {
      title: "365 Days",
      label: "Volunteer Presence",
      note: "Gaushala seva continues throughout the year.",
    },
  ];

  const sevaActivities = [
    {
      icon: "CF",
      title: "Cow Feeding",
      desc: "Daily bhojan seva with green fodder, dry feed, mineral support, and seasonal nourishment planning.",
      className: "bg-gradient-to-b from-[#8d6632] via-[#6c4a1d] to-[#4f3511] text-[#fff8e9]",
    },
    {
      icon: "MC",
      title: "Medical Care",
      desc: "Veterinary consultation, emergency treatment, health checks, and recovery care for weak or injured cows.",
      className: "bg-gradient-to-b from-[#b86b20] via-[#8f4710] to-[#6c2c07] text-[#fff8e9]",
    },
    {
      icon: "SP",
      title: "Shelter & Protection",
      desc: "Safe shelter, rescue coordination, and long-term care for abandoned, elderly, and vulnerable cows.",
      className: "bg-gradient-to-b from-[#4d6a3a] via-[#32512a] to-[#233b1f] text-[#fff8e9]",
    },
    {
      icon: "HE",
      title: "Healthy Environment",
      desc: "Clean sheds, hygiene management, water access, shaded rest areas, and disciplined daily maintenance.",
      className: "bg-gradient-to-b from-[#425467] via-[#304355] to-[#1f3141] text-[#fff8e9]",
    },
  ];

  const donationOptions = [
    {
      title: "Feed a Cow",
      amount: "Rs 501",
      desc: "Support one day of bhojan seva with green fodder and daily nourishment.",
      className: "bg-gradient-to-b from-[#b56a22] via-[#8d4510] to-[#6d3008] text-[#fff6e3]",
    },
    {
      title: "Monthly Cow Care",
      amount: "Rs 5,100",
      desc: "Contribute toward recurring feed, care, water, and shelter support for one month.",
      className: "bg-gradient-to-b from-[#446676] via-[#29485a] to-[#1c3241] text-[#eff8ff]",
    },
    {
      title: "Medical Support",
      amount: "Rs 2,100",
      desc: "Help cover veterinary consultation, medicines, supplements, and emergency treatment.",
      className: "bg-gradient-to-b from-[#61733b] via-[#425525] to-[#2a3918] text-[#f5ffe7]",
    },
    {
      title: "Gaushala Support",
      amount: "Rs 11,000",
      desc: "Support shed upkeep, water systems, sanitation, and protective infrastructure.",
      className: "bg-gradient-to-b from-[#59627f] via-[#414a64] to-[#2f3548] text-[#f5f6ff]",
    },
    {
      title: "Lifetime Seva",
      amount: "Rs 51,000",
      desc: "Offer long-term support to sustain protection, nourishment, and dharmic Gau Seva.",
      className: "bg-gradient-to-b from-[#8b511d] via-[#6c3310] to-[#4f2207] text-[#fff7e8]",
    },
  ];

  const sponsorCows = [
    {
      name: "Gauri",
      age: "6 years",
      status: "Available for Sponsorship",
      note: "Gentle, healthy, and part of the regular feeding seva circle.",
      image: scenicCowImage,
      objectPosition: "center 35%",
    },
    {
      name: "Shyama",
      age: "9 years",
      status: "Partially Sponsored",
      note: "Requires recurring care, nutrition support, and shelter maintenance attention.",
      image: heroCowImage,
      objectPosition: "center 18%",
    },
    {
      name: "Kamdhenu",
      age: "11 years",
      status: "Medical Care Needed",
      note: "Needs focused health monitoring, supplement support, and devotional care sponsorship.",
      image: scenicCowImage,
      objectPosition: "center 45%",
    },
  ];

  const galleryItems = [
    {
      title: "Morning Gau Darshan",
      image: scenicCowImage,
      wrapperClassName: "md:col-span-2",
      heightClassName: "h-64 md:h-full",
      objectPosition: "center 35%",
    },
    {
      title: "Ashram Care Space",
      image: heroCowImage,
      wrapperClassName: "",
      heightClassName: "h-52",
      objectPosition: "center 18%",
    },
    {
      title: "Sacred Heritage Atmosphere",
      image: "/images/heritage1.png",
      wrapperClassName: "",
      heightClassName: "h-52",
      objectPosition: "center",
    },
    {
      title: "Volunteer and Devotional Spirit",
      image: "/images/spiritual1.png",
      wrapperClassName: "",
      heightClassName: "h-52",
      objectPosition: "center",
    },
    {
      title: "Care and Nourishment",
      image: scenicCowImage,
      wrapperClassName: "md:col-span-2",
      heightClassName: "h-56",
      objectPosition: "center 40%",
    },
  ];

  const impactItems = [
    { label: "Total Cows Protected", value: "180+" },
    { label: "Daily Fodder Provided", value: "2.5 Tons" },
    { label: "Volunteers Involved", value: "350+" },
    { label: "Donors Supporting Gau Seva", value: "900+" },
  ];

  const volunteerPoints = [
    "Morning feeding seva and water preparation",
    "Gaushala cleaning, upkeep, and support duty",
    "Care support for weak, elderly, or recovering cows",
    "Prayer participation and devotional ashram discipline",
  ];

  const volunteerAreas = ["Feeding & Care", "Gaushala Cleaning", "Prayer & Seva"];

  const bottomButtons = [
    {
      label: "Donate for Gau Seva",
      to: ROUTES.donate,
      className: "bg-gradient-to-b from-[#c76d28] via-[#8f3f13] to-[#6f2806] text-[#fff6de]",
    },
    {
      label: "Sponsor a Cow",
      to: ROUTES.donate,
      className: "bg-gradient-to-b from-[#59733c] via-[#395b24] to-[#23421a] text-[#fff6de]",
    },
    {
      label: "Volunteer for Gau Seva",
      to: ROUTES.involved.volunteer,
      className: "bg-gradient-to-b from-[#b26c1f] via-[#8d4b0e] to-[#653008] text-[#fff6de]",
    },
    {
      label: "Contact Kamdhenu Ashram",
      to: ROUTES.contact,
      className: "bg-gradient-to-b from-[#46627b] via-[#30495f] to-[#203447] text-[#fff6de]",
    },
  ];

  usePageMeta(
    "Gau Seva - Kamdhenu Ashram",
    "Kamdhenu Ashram page with Gau Seva activities, donation options, cow sponsorship, volunteer support, and spiritual significance.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Gau Seva - Kamdhenu Ashram"
        subtitle="Protecting and Serving Sacred Cows with Love and Devotion"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center rounded-lg bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
          >
            Donate for Gau Seva
          </Link>
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center rounded-lg bg-[#12394A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
          >
            Sponsor a Cow
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Kamdhenu Ashram", value: "Sacred Care", note: "A devotional space for Gau Mata protection, nourishment, and seva." },
              { title: "Daily Bhojan Seva", value: "2.5 Tons", note: "Green fodder, dry feed, and nutritional support managed every day." },
              { title: "Cow Sponsorship", value: "Open", note: "Devotees can sponsor specific cows for recurring care and support." },
              { title: "Volunteer Presence", value: "365 Days", note: "Daily seva by trusted volunteers, donors, and ashram supporters." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#12394A] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className="text-xs uppercase tracking-wide text-[#F59E0B]">{item.title}</p>
                <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm text-[var(--campaign-text)]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">About Kamdhenu Ashram</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">A Sacred Space for Gau Mata Protection</h2>
            <p className="mt-5 text-lg leading-8 text-white">
              Kamdhenu Ashram is dedicated to protecting, feeding, sheltering, and serving sacred cows with devotion and discipline.
              It is designed as a living seva space where compassion, daily care, and dharmic gratitude come together.
            </p>
            <p className="mt-4 text-lg leading-8 text-white">
              In Sanatan Dharma, Gau Seva is considered deeply auspicious because the cow is honored as a nourisher, a symbol of gentle abundance,
              and a sacred presence connected with selfless giving. Kamdhenu represents spiritual prosperity, harmony, and divine nurturing.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Mission",
                desc: "Protect cows with food, medical care, shelter, and devotional service rooted in Sanatan values.",
              },
              {
                title: "Vision",
                desc: "Build a compassionate, clean, and spiritually grounded gaushala where every cow is served with dignity.",
              },
              {
                title: "Dharma Significance",
                desc: "Gau Seva teaches gratitude, non-violence, nourishment, humility, and disciplined seva for all beings.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-[var(--campaign-text)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Our Gau Seva Activities</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Service at Kamdhenu Ashram</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {sevaActivities.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-white/10 bg-[#0f3140] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F59E0B]/15 text-sm font-black text-[#F59E0B]">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--campaign-text)]">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Gau Seva Donation Options</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Different Ways to Contribute</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {donationOptions.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-[#0f3140] p-5 shadow-sm">
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-2 text-2xl font-black text-[#F59E0B]">{item.amount}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--campaign-text)]">{item.desc}</p>
                <Link
                  to={ROUTES.donate}
                  className="mt-5 inline-flex rounded-xl bg-[#F59E0B] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                >
                  Donate
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Sponsor a Cow Program</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Adopt Care with Devotion</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {sponsorCows.map((cow) => (
              <article key={cow.name} className="overflow-hidden rounded-[26px] border border-white/10 bg-[#0f3140] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <img src={cow.image} alt={cow.name} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-black text-white">{cow.name}</h3>
                    <span className="rounded-full bg-[#F59E0B]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F59E0B]">
                      {cow.age}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#F59E0B]">{cow.status}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--campaign-text)]">{cow.note}</p>
                  <Link
                    to={ROUTES.donate}
                    className="mt-5 inline-flex rounded-xl bg-[#F59E0B] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                  >
                    Sponsor Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {impactItems.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-[#12394A] p-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-3xl font-black text-[#F59E0B] md:text-4xl">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-white">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Photo Gallery of Kamdhenu Ashram</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Sacred Seva Moments</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {galleryItems.map((item) => (
              <figure key={item.title} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0f3140] shadow-sm">
                <img src={item.image} alt={item.title} className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105" />
                <figcaption className="px-4 py-3 text-sm font-semibold text-white">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Volunteer for Gau Seva</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Visit and Serve at the Ashram</h2>
            <p className="mt-4 text-lg leading-8 text-white">
              Devotees, families, youth groups, and service-minded volunteers are welcome to participate in practical Gau Seva.
              Volunteers can support feeding, care, cleanliness, and devotional ashram routines.
            </p>
            <ul className="mt-6 space-y-3">
              {volunteerPoints.map((item) => (
                <li key={item} className="rounded-2xl bg-[#0f3140] px-4 py-3 text-[var(--campaign-text)] shadow-sm">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to={ROUTES.involved.volunteer}
              className="mt-6 inline-flex rounded-xl bg-[#F59E0B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
            >
              Volunteer Registration
            </Link>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Spiritual Message</p>
              <blockquote className="mt-4 text-3xl font-black leading-tight text-white">
                "Î±Ã±Ã¹Î±Ã±â•›Î±Ã±â•¡Î±Ã‘Ã¯ Î±Ã±â•¡Î±Ã±â”Î±Ã±â•¢Î±Ã‘Ã¬Î±Ã±â•¡Î±Ã±â••Î±Ã‘Ã¬Î±Ã±Â» Î±Ã±Â«Î±Ã±â•›Î±Ã±Ã±Î±Ã±â–‘Î±Ã±Ã¢"
              </blockquote>
              <p className="mt-3 text-lg text-[#F59E0B]">The cows are the mothers of the universe.</p>
              <p className="mt-4 text-base leading-7 text-[var(--campaign-text)]">
                Gau Mata represents nourishment, gentleness, and sacred abundance. Serving her is an offering of gratitude,
                protection, and dharmic responsibility.
              </p>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Contact Kamdhenu Ashram</p>
              <h2 className="mt-2 text-3xl font-black text-white">Visit or Connect</h2>
              <div className="mt-5 space-y-4 text-[var(--campaign-text)]">
                <p><span className="font-black text-white">Address:</span> Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital ward, Chandrapur, Maharashtra 442402</p>
                <p><span className="font-black text-white">Phone:</span> +91-866-889-7445</p>
                <p><span className="font-black text-white">Email:</span> join@bhagwatheritage.org</p>
                <p><span className="font-black text-white">Map Location:</span> Available through the contact desk for visitor guidance and ashram visit planning.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={ROUTES.contact} className="inline-flex rounded-xl bg-[#F59E0B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]">
                  Contact Ashram
                </Link>
                <Link to={ROUTES.contact} className="inline-flex rounded-xl border border-white/10 bg-[#0f3140] px-5 py-3 text-sm font-semibold text-white">
                  Map and Visit Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const SevaDisasterReliefPage = memo(function SevaDisasterReliefPage() {
  const heroBadges = ["Rapid Response", "Food & Medical Aid", "Camp Support", "Recovery Assistance"];
  const snapshotCards = [
    ["Rapid Deployment", "Timely response with relief planning and local coordination.", "alert", "https://res.cloudinary.com/der8zinu8/image/upload/v1776834111/ri1_hewl38.png"],
    ["Relief Distribution", "Food, water, essentials, blankets, and emergency support.", "package", "https://res.cloudinary.com/der8zinu8/image/upload/v1776834110/ri2_zdo8gr.png"],
    ["Volunteer Support", "Disciplined field seva, logistics help, and camp assistance.", "volunteer", "https://res.cloudinary.com/der8zinu8/image/upload/v1776834111/ri1_hewl38.png"],
    ["Recovery Follow-up", "Support beyond immediate aid with rehabilitation guidance.", "recovery", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri5_oaxa1h.png"],
  ];
  const aboutCards = [
    ["Field Assessment", "alert", "https://res.cloudinary.com/der8zinu8/image/upload/v1776834111/ri1_hewl38.png"],
    ["Relief Materials", "package", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838097/r16_t4ot4b.png"],
    ["Camp Support", "shelter", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri4_pdnyp2.png"],
    ["Recovery Help", "recovery", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri5_oaxa1h.png"],
  ];
  const processSteps = [
    ["Alert & Assessment", "Field teams verify local needs, affected families, and urgent essentials.", "alert", "https://res.cloudinary.com/der8zinu8/image/upload/v1776834111/ri1_hewl38.png"],
    ["Emergency Mobilization", "Food packets, water, blankets, medicines, and supplies are prepared.", "package", "https://res.cloudinary.com/der8zinu8/image/upload/v1776834110/ri2_zdo8gr.png"],
    ["Relief Distribution", "Essential aid is delivered through organized support points or field visits.", "food", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri4_pdnyp2.png"],
    ["Camp Coordination", "Volunteers support camp setup, basic management, and assistance flow.", "shelter", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri5_oaxa1h.png"],
    ["Recovery Follow-up", "Post-crisis support may include material help, medical guidance, or family assistance.", "recovery", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri5_oaxa1h.png"],
  ];
  const supportCards = [
    ["Food Packets", "Nutritious ready-to-distribute food for affected families.", "food", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838098/r11_kyltbd.png"],
    ["Clean Drinking Water", "Safe water support for camps and emergency points.", "water", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838098/r12_seykwy.png"],
    ["Medicines & First Aid", "Urgent first aid, medicine support, and care material.", "medicine", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838098/r13_wqlkqx.png"],
    ["Blankets & Shelter Materials", "Warmth, bedding, tarpaulin, and basic shelter items.", "shelter", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri4_pdnyp2.png"],
    ["Family Essential Kits", "Core daily-use essentials for one affected household.", "package", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838097/r16_t4ot4b.png"],
    ["Recovery & Rehabilitation Assistance", "Follow-up help for families restarting after crisis.", "recovery", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri5_oaxa1h.png"],
  ];
  const volunteerCards = [
    ["Field Volunteer", "Assist during distribution, camp support, and relief coordination.", "volunteer", "https://res.cloudinary.com/der8zinu8/image/upload/v1776834111/ri1_hewl38.png"],
    ["Packing & Logistics", "Help prepare and organize essential material dispatch.", "package", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838097/r16_t4ot4b.png"],
    ["Camp Assistance", "Support emergency arrangements and beneficiary assistance.", "shelter", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri4_pdnyp2.png"],
    ["Relief Sponsorship Support", "Contribute resources for timely relief and recovery.", "donation", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri5_oaxa1h.png"],
  ];
  const donationCards = [
    ["Family Relief Kit", "Rs 1,500", "Supports basic essential items for one affected family.", "package", "Donate Now", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838097/r16_t4ot4b.png"],
    ["Camp Essentials Support", "Rs 5,000", "Helps supply food, water, and camp-use materials.", "shelter", "Sponsor Relief", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri4_pdnyp2.png"],
    ["Medical & Supplies Support", "Rs 12,000", "Supports medicine, first aid, and urgent emergency materials.", "medicine", "Donate Now", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838098/r13_wqlkqx.png"],
    ["Recovery Assistance", "Rs 25,000", "Helps families with post-crisis support and rehabilitation needs.", "recovery", "Sponsor Relief", "https://res.cloudinary.com/der8zinu8/image/upload/v1776836078/ri5_oaxa1h.png"],
  ];
  const testimonials = [
    ["Field Volunteer Team", "Disaster relief needs speed and discipline. When supplies reach families on time, hope returns immediately.", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838096/v1_hidqfn.png"],
    ["Beneficiary Family", "Food, bedding, and basic essentials gave us strength to restart during a difficult moment.", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838097/v2_scujtu.png"],
    ["Seva Coordinator", "The most important part of relief work is dignified compassion. Every volunteer becomes a lifeline for someone.", "https://res.cloudinary.com/der8zinu8/image/upload/v1776838096/v3_ysaljs.png"],
  ];

  usePageMeta(
    "Disaster Relief Seva",
    "Emergency response, relief kits, volunteer deployment, donation support, and recovery assistance for affected communities.",
  );

  return (
    <div className="bg-[#F8F1E5] pb-0 text-[#5F4D3F] md:pb-0">
      <style>{`
        .relief-card { transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease; }
        .relief-card:hover { transform: translateY(-5px); box-shadow: 0 24px 54px rgba(115, 78, 31, 0.13); border-color: #DFC28A; }
        .relief-faq summary::-webkit-details-marker { display: none; }
        .relief-gold-texture {
          background-image:
            radial-gradient(circle at 18% 18%, rgba(217, 150, 43, 0.15), transparent 28%),
            radial-gradient(circle at 82% 8%, rgba(29, 61, 92, 0.08), transparent 24%),
            linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,244,222,0.7));
        }
        @media (prefers-reduced-motion: reduce) {
          .relief-card, .relief-card:hover { transform: none; transition: none; }
        }
      `}</style>

      <section className="relative -mx-6 -mt-12 overflow-hidden bg-[#fff8ef] pb-8 md:-mx-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,180,94,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(196,109,26,0.09),transparent_32%)]" />
        <div
          className="relative min-h-[640px] overflow-hidden rounded-b-[40px] bg-cover bg-center shadow-[0_18px_40px_rgba(23,12,5,0.14)]"
          style={{ backgroundImage: "url('https://res.cloudinary.com/der8zinu8/image/upload/v1776834111/hero_relief_i1mjda.png')" }}
          role="img"
          aria-label="Volunteers providing disaster relief support to families in India"
        >
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-end justify-center px-6 py-16 text-center md:px-8 md:py-20"
          >
            <div className="w-full max-w-4xl px-2 py-4 text-white md:px-6 md:py-6">
              <h1 className="text-4xl font-bold leading-tight text-[#f9e6a8] md:text-5xl">Disaster Relief</h1>
              <p className={`mt-5 ${SEVA_HERO_SUBTITLE_CLASS} text-[#f7e0a0]`}>Relief with care, response with discipline</p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <ReliefButton to={ROUTES.donate}>Donate for Relief</ReliefButton>
                <ReliefButton to={ROUTES.involved.volunteer} variant="light">Join Relief Team</ReliefButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="relative z-10 mt-[5px]">
          <div className="rounded-[30px] border border-[#E8D9BD] bg-[#FFFDF8]/96 p-4 shadow-[0_20px_48px_rgba(111,78,25,0.12)] backdrop-blur md:p-5">
            <div className="mb-4 rounded-[24px] border border-[#E8D9BD] bg-[#FFF9F0] px-5 py-6 text-center">
              <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#b96a22]`}>Emergency Service Initiative</p>
              <p className={`mx-auto mt-3 max-w-3xl ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
                Rapid support for families affected by flood, fire, storm, displacement, and sudden crisis.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {heroBadges.map((badge) => (
                  <span key={badge} className="rounded-full border border-[#E8D9BD] bg-white px-4 py-2 text-sm font-bold text-[#8A5B16]">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {snapshotCards.map(([title, text, , image]) => (
                <article key={title} className="relief-card flex h-full flex-col items-center justify-center rounded-[26px] border border-[#E7D3AE] bg-[#FFFDF8] p-6 text-center shadow-[0_14px_34px_rgba(115,78,31,0.08)]">
                  <span className="inline-flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full">
                    <img src={image} alt={`${title} relief snapshot icon`} className="h-full w-full rounded-full object-contain" loading="lazy" />
                  </span>
                  <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-20 grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[32px] border border-[#E7D3AE] bg-[#FFFDF8] p-6 shadow-[0_18px_44px_rgba(115,78,31,0.08)] md:p-10">
            <ReliefSectionHeader eyebrow="About Disaster Relief" title="Emergency response with compassion and discipline" align="left" />
            <div className={`mt-6 space-y-5 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
              <p>
                Disaster Relief Seva is the trust's humanitarian response initiative for communities facing flood, fire, storm, displacement, and sudden emergency conditions. The focus is not only on quick response, but also on dignified service, coordination, and practical relief support.
              </p>
              <p>
                Through relief materials, volunteer mobilization, emergency camp support, and follow-up recovery assistance, this initiative helps affected families receive timely care in moments of urgent need.
              </p>
            </div>
          </section>
          <section className="overflow-hidden rounded-[32px] border border-[#E7D3AE] bg-[#FFF7E9] shadow-[0_18px_44px_rgba(115,78,31,0.08)]">
            <div className="relative">
              <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1776834111/about_relief_fbx1d2.png" alt="Relief volunteers coordinating support materials" className="h-72 w-full object-cover lg:h-80" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-3 p-5">
              {aboutCards.map(([title, , image]) => (
                <div key={title} className="rounded-2xl border border-[#E7D3AE] bg-white/88 p-4 text-center">
                  <span className="mx-auto inline-flex h-[84px] w-[84px] items-center justify-center overflow-hidden rounded-full">
                    <img src={image} alt={`${title} relief support icon`} className="h-full w-full rounded-full object-contain" loading="lazy" />
                  </span>
                  <p className={`mt-3 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{title}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-20 rounded-[34px] border border-[#E7D3AE] bg-[#FFF9EF] p-6 shadow-[0_18px_44px_rgba(115,78,31,0.08)] md:p-10">
          <ReliefSectionHeader eyebrow="Relief Process" title="How Disaster Relief Works" intro="A calm, verified sequence helps the team respond quickly without losing dignity, safety, or accountability in the field." />
          <div className="mt-10 grid gap-5 lg:grid-cols-5">
            {processSteps.map(([title, text, icon, image], index) => (
              <article key={title} className="relief-card relative rounded-[26px] border border-[#E7D3AE] bg-white p-5 text-center">
                {index < processSteps.length - 1 ? <span className="absolute left-[calc(100%-6px)] top-10 hidden h-px w-5 bg-[#DFC28A] lg:block" aria-hidden="true" /> : null}
                <div className="flex items-center justify-center gap-4">
                  {image ? (
                    <span className="inline-flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full">
                      <img src={image} alt={`${title} relief process icon`} className="h-full w-full rounded-full object-contain" loading="lazy" />
                    </span>
                  ) : (
                    <span className="inline-flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full">
                      <ReliefIcon name={icon} />
                    </span>
                  )}
                </div>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#B97916]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className={`mt-3 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{text}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <ReliefSectionHeader eyebrow="What We Support" title="Relief essentials delivered with care" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {supportCards.map(([title, text, , image]) => (
              <article key={title} className="relief-card flex h-full flex-col items-center justify-center rounded-[26px] border border-[#E7D3AE] bg-[#FFFDF8] p-6 text-center shadow-[0_14px_34px_rgba(115,78,31,0.08)]">
                <span className="inline-flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full">
                  <img src={image} alt={`${title} relief support icon`} className="h-full w-full rounded-full object-contain" loading="lazy" />
                </span>
                <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{text}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-20 rounded-[34px] border border-[#E7D3AE] bg-[#FFFDF8] p-6 shadow-[0_18px_44px_rgba(115,78,31,0.08)] md:p-10">
          <ReliefSectionHeader eyebrow="Join Relief Seva" title="Serve with discipline, compassion, and coordination" intro="Relief seva needs steady hands: people who can pack, coordinate, distribute, document, and care for families respectfully." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {volunteerCards.map(([title, text, , image]) => (
              <article key={title} className="relief-card flex h-full flex-col items-center rounded-[26px] border border-[#E7D3AE] bg-[#FFFDF8] p-6 text-center shadow-[0_14px_34px_rgba(115,78,31,0.08)]">
                <span className="inline-flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full">
                  <img src={image} alt={`${title} relief seva icon`} className="h-full w-full rounded-full object-contain" loading="lazy" />
                </span>
                <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-9 text-center">
            <ReliefButton to={ROUTES.involved.volunteer}>Join Disaster Relief Seva</ReliefButton>
          </div>
        </Reveal>

        <Reveal className="mt-20 rounded-[36px] border border-[#DEBF82] bg-[linear-gradient(135deg,#FFF0D6_0%,#FFFDF8_48%,#F8EFE0_100%)] p-6 shadow-[0_24px_58px_rgba(196,109,26,0.12)] md:p-10">
          <ReliefSectionHeader eyebrow="Donation Options" title="Emergency donation support" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {donationCards.map(([title, amount, text, , cta, image]) => (
              <article key={title} className="relief-card flex h-full flex-col rounded-[28px] border border-[#E7D3AE] bg-white p-6">
                <span className="inline-flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full">
                  <img src={image} alt={`${title} donation support icon`} className="h-full w-full rounded-full object-contain" loading="lazy" />
                </span>
                <p className="mt-6 text-2xl font-black text-[#B66B17]">{amount}</p>
                <h3 className={`mt-3 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{title}</h3>
                <p className={`mt-3 flex-1 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{text}</p>
                <Link to={ROUTES.donate} className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#D9962B] px-5 text-sm font-black text-white shadow-[0_14px_26px_rgba(196,109,26,0.2)] transition hover:-translate-y-0.5 hover:bg-[#B66B17] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F0C36A]/45">
                  {cta}
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ReliefButton to={ROUTES.donate}>Donate Now</ReliefButton>
            <ReliefButton to={ROUTES.donate} variant="outline">Sponsor Relief</ReliefButton>
            <ReliefButton to={ROUTES.involved.volunteer} variant="outline">Become a Volunteer</ReliefButton>
          </div>
        </Reveal>

        <Reveal className="mt-20 rounded-[34px] border border-[#E7D3AE] bg-[#FFFDF8] p-6 shadow-[0_18px_44px_rgba(115,78,31,0.08)] md:p-10">
          <ReliefSectionHeader eyebrow="Relief Stories" title="Dignified compassion in the field" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map(([name, quote, image]) => (
              <article key={name} className="relief-card rounded-[28px] border border-[#E7D3AE] bg-[radial-gradient(circle_at_top_left,#FFF2D9_0%,#FFFDF8_46%,#FFFFFF_100%)] p-6 text-center">
                <span className="mx-auto inline-flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full">
                  <img src={image} alt={`${name} relief story`} className="h-full w-full rounded-full object-contain" loading="lazy" />
                </span>
                <span className="text-5xl font-black leading-none text-[#D9962B]">&quot;</span>
                <p className={`mt-3 italic ${SEVA_BODY_TEXT_CLASS} text-[#4A3422]`}>&quot;{quote}&quot;</p>
                <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-[#B66B17]">{name}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-20 pb-0 md:pb-0">
          <section className="overflow-hidden rounded-[38px] border border-[#dcb884] bg-[linear-gradient(135deg,#c46d1a_0%,#e4b45e_45%,#f3d8a0_100%)] px-6 py-10 text-white shadow-[0_22px_46px_rgba(196,109,26,0.2)] md:px-10 md:py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className={`${SEVA_SECTION_LABEL_CLASS} text-white/80`}>Final Call to Serve</p>
                <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-4 text-white`}>Stand with families in times of crisis</h2>
                <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-white/92`}>
                  Your contribution can support urgent relief, dignified care, and recovery assistance.
                </p>
              </div>
              <div className="flex w-full max-w-md flex-col gap-3">
                <Link
                  to={ROUTES.donate}
                  className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-white px-6 text-base font-semibold text-[#9b4b11] transition-colors hover:bg-[#fff4df]"
                >
                  Support Relief Work
                </Link>
                <Link
                  to={ROUTES.involved.volunteer}
                  className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/60 px-6 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#9b4b11]"
                >
                  Join as Volunteer
                </Link>
                <Link
                  to={ROUTES.contact}
                  className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/60 px-6 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#9b4b11]"
                >
                  Contact Relief Team
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E7D3AE] bg-[#FFFDF8]/96 px-4 py-3 shadow-[0_-10px_26px_rgba(93,61,28,0.14)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <Link to={ROUTES.donate} className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-full bg-[#D9962B] text-sm font-black text-white">Donate</Link>
          <Link to={ROUTES.involved.volunteer} className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-full border border-[#D9962B] bg-white text-sm font-black text-[#B66B17]">Volunteer</Link>
        </div>
      </div>
    </div>
  );
});

export const EventsBhagwatKathaPageLegacy = memo(function EventsBhagwatKathaPageLegacy() {
  const [mahotsavStart] = useState(() => {
    const start = new Date();
    start.setDate(start.getDate() + 12);
    start.setHours(9, 0, 0, 0);
    return start;
  });

  usePageMeta(
    "Bhagwat Katha Mahotsav",
    "Bhagwat Katha program vision, seva participation, and mahotsav schedule overview.",
  );

  const heroHighlights = [
    { title: "Live Katha Days", value: "7", note: "Structured discourse, darshan, and seva programming" },
    { title: "Volunteer Network", value: "900+", note: "Hospitality, crowd, stage, and logistics support" },
    { title: "Daily Seating", value: "12,000+", note: "Managed devotee attendance capacity" },
    { title: "Broadcast Reach", value: "24/7", note: "Digital access for distant devotees and families" },
  ];

  const featureCards = [
    {
      title: "Scriptural Discourse Experience",
      desc: "Daily Bhagwat Katha sessions with spiritual explanation, devotional immersion, and structured audience participation.",
    },
    {
      title: "Integrated Seva Management",
      desc: "Volunteer coordination for reception, seating, water, prasad, discipline, and family assistance across the venue.",
    },
    {
      title: "Digital and On-Ground Reach",
      desc: "A hybrid mahotsav model with on-site presence, livestream support, announcements, and recorded session access.",
    },
  ];

  const supportTracks = [
    "Reception and devotee help desk",
    "Stage, sound, and katha operations",
    "Prasad, water, and hospitality seva",
    "Volunteer roster, access, and queue discipline",
  ];

  const donationTiers = [
    { label: "One Session Seva", amount: "Rs 2,100", note: "Support one discourse session with service logistics" },
    { label: "Daily Mahotsav Sponsor", amount: "Rs 15,000", note: "Support one full day of seva coordination" },
    { label: "Grand Event Support", amount: "Rs 51,000", note: "Contribute to stage, hospitality, and program execution" },
  ];

  const testimonials = [
    {
      name: "Mahotsav Volunteer Desk",
      quote: "When the event system is organized well, devotees can focus fully on katha and spiritual experience.",
    },
    {
      name: "Visiting Devotee Family",
      quote: "The discipline, seating management, and seva care made the entire Katha Mahotsav peaceful and uplifting.",
    },
    {
      name: "Digital Satsang Viewer",
      quote: "The livestream and timely updates helped our family stay connected even from far away.",
    },
  ];

  const faqs = [
    {
      q: "How can I join Bhagwat Katha Mahotsav seva?",
      a: "You can register through the volunteer route and support reception, seating, discipline, hospitality, announcements, or backstage operations.",
    },
    {
      q: "Can I sponsor a full day or a specific session?",
      a: "Yes. Donors can support session-level seva, daily event sponsorship, or broader mahotsav logistics and hospitality arrangements.",
    },
    {
      q: "Will the event also be available online?",
      a: "Yes. The page now includes a digital-first event concept with livestream, remote updates, and recorded access planning.",
    },
  ];

  const dayLabels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
  const sessionTemplates = [
    { slot: "Morning", title: "Mangalacharan and Bhajan", hour: 8, minute: 0, durationHours: 2 },
    { slot: "Afternoon", title: "Bhagwat Katha Main Session", hour: 15, minute: 0, durationHours: 3 },
    { slot: "Evening", title: "Aarti, Sankirtan, and Reflection", hour: 19, minute: 30, durationHours: 2 },
  ];

  const sessionSchedule = dayLabels.flatMap((dayLabel, dayIndex) =>
    sessionTemplates.map((template) => {
      const start = new Date(mahotsavStart);
      start.setDate(mahotsavStart.getDate() + dayIndex);
      start.setHours(template.hour, template.minute, 0, 0);

      const end = new Date(start);
      end.setHours(end.getHours() + template.durationHours);

      return {
        id: `${dayLabel}-${template.slot}`,
        dayLabel,
        slot: template.slot,
        title: template.title,
        start,
        end,
      };
    }),
  );

  const visibleSchedule = sessionSchedule.slice(0, 9);

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Bhagwat Katha Mahotsav"
        subtitle="Live wisdom, active seva, divine experience"
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName={EVENT_SEVA_HERO_CONTENT_CLASS}
        backgroundImage="/images/kathapravachan.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.donate} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
            Sponsor Mahotsav
          </Link>
          <Link to={ROUTES.involved.volunteer} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
            Join Katha Seva
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {heroHighlights.map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>{item.title}</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>About Bhagwat Katha Mahotsav</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>A devotional gathering rooted in katha, seva, and spiritual discipline</h2>
          <p className={`mt-5 ${SEVA_BODY_TEXT_CLASS}`}>
            Bhagwat Katha Mahotsav is envisioned as a disciplined spiritual event where sacred discourse, devotional music,
            seva participation, and community hospitality work together in one integrated devotional ecosystem.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {featureCards.map((item) => (
              <div key={item.title} className={EVENT_SEVA_CARD_CLASS}>
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-6`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Mahotsav Experience</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>A devotional rhythm from prayer to discourse and evening aarti</h2>
            <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS}`}>
              Each day of the mahotsav is designed around bhajan, Bhagwat discourse, darshan, hospitality seva, and calm devotee guidance.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-5">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">Daily Flow</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>
                  Morning prayer, afternoon katha, and evening aarti create a complete devotional journey through the day.
                </p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-5">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">Devotee Support</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>
                  Seating, water, prasad, and volunteer guidance help families and devotees participate peacefully.
                </p>
              </div>
            </div>
          </div>

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Join or Sponsor Mahotsav</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Support stage, hospitality, and digital access</h3>
            <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS}`}>
              Support stage readiness, devotee hospitality, water seva, seating management, and digital access for the Katha Mahotsav.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 mb-6">
              {donationTiers.map((tier) => (
                <div key={tier.label} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{tier.label}</p>
                  <p className="mt-2 text-2xl font-black text-white">{tier.amount}</p>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{tier.note}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className="inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]">
                Donate Now
              </Link>
              <Link to={ROUTES.involved.volunteer} className="inline-flex rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]">
                Join Volunteer Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Mahotsav Schedule Snapshot</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Day-wise sessions and devotional flow</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {visibleSchedule.map((session) => {
              return (
                <div
                  key={session.id}
                  className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{session.dayLabel}</p>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--campaign-text)]">
                      {session.slot}
                    </span>
                  </div>
                  <h3 className={`mt-3 ${SEVA_CARD_TITLE_CLASS}`}>{session.title}</h3>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--campaign-text)]">{session.slot}</p>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>
                    {session.start.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} |{" "}
                    {session.start.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-2 gap-6`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Operational Support Tracks</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>How seva teams can contribute during the mahotsav</h3>
            <ul className={`mt-5 space-y-3 ${SEVA_BODY_TEXT_CLASS}`}>
              {supportTracks.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Mahotsav Participation</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>A welcoming and disciplined experience for all devotees</h3>
            <div className={`mt-5 space-y-4 ${SEVA_BODY_TEXT_CLASS}`}>
              <p>
                The mahotsav is organized so families, devotees, and volunteers can participate in katha with peace, order, and devotional focus.
              </p>
              <p>
                Seating guidance, darshan flow, hospitality seva, and prayerful discipline help create a calm atmosphere throughout the gathering.
              </p>
              <p>
                Every session is designed to support scripture listening, devotional music, and respectful participation across the full event.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Devotee Experience</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Feedback from volunteers, families, and online viewers</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((item) => (
              <div key={item.name} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                <p className={SEVA_BODY_TEXT_CLASS}>"{item.quote}"</p>
                <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Frequently Asked Questions</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Helpful answers for donors, devotees, and seva teams</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-xl border border-white/10 bg-[var(--campaign-surface)] p-5">
                <summary className="cursor-pointer text-lg font-black text-white md:text-xl">{item.q}</summary>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export const EventsBhagwatKathaPage = memo(function EventsBhagwatKathaPage() {
  return <BhagwatKathaMahotsavPremiumPage />;
});

export const EventsSpiritualPage = memo(function EventsSpiritualPage() {
  return (
    <EventShowcasePage
      title="Spiritual Events"
      subtitle="A living spiritual calendar of satsang, bhajan, path, and devotional gatherings"
      backgroundImage="/images/spiritual1.png"
      metaDescription="Spiritual events calendar, satsang gatherings, devotional programs, and structured volunteer support."
      aboutTitle="About Spiritual Events"
      aboutParagraphs={[
        "Spiritual Events bring together satsang, kirtan, scripture listening, bhajan, and collective devotion in a disciplined atmosphere.",
        "This page is designed to feel active and mission-led, aligned with the same dark event style as the Seva pages.",
      ]}
      highlights={[
        { title: "Weekly Satsang", value: "12+", note: "Recurring devotional gatherings each month" },
        { title: "Volunteer Teams", value: "250+", note: "Hospitality, discipline, and event support" },
        { title: "Digital Reach", value: "24/7", note: "Recorded clips and livestream support" },
        { title: "Bhajan Sessions", value: "40+", note: "Community-led devotional music gatherings" },
      ]}
      features={[
        { title: "Satsang Sabhas", desc: "Regular spiritual gatherings with discourse, reflection, and collective prayer." },
        { title: "Bhajan and Kirtan", desc: "Devotional music events that deepen emotional and spiritual participation." },
        { title: "Path and Reflection", desc: "Scriptural reading circles and thematic spiritual study sessions." },
      ]}
      supportTracks={[
        "Reception and registration support",
        "Bhajan, aarti, and stage coordination",
        "Devotee seating and movement discipline",
        "Digital updates and remote satsang access",
      ]}
      donationTiers={[
        { label: "One Sabha Support", amount: "Rs 1,500", note: "Hospitality and basic event logistics" },
        { label: "Monthly Spiritual Sponsor", amount: "Rs 9,000", note: "Recurring satsang event support" },
        { label: "Bhajan Mahotsav Support", amount: "Rs 31,000", note: "Larger devotional event assistance" },
      ]}
      primaryCta="Sponsor Spiritual Event"
      secondaryCta="Join Spiritual Seva"
      testimonials={[
        { name: "Satsang Volunteer", quote: "A well-managed spiritual event creates peace before the discourse even begins." },
        { name: "Devotee Family", quote: "The satsang environment helps families reconnect with devotion in a practical way." },
        { name: "Bhajan Team", quote: "When seva and music flow together, the spiritual atmosphere becomes transformative." },
      ]}
      faqs={[
        { q: "Can I join regular spiritual event seva?", a: "Yes. Volunteers can help with reception, stage support, audio, and devotee guidance." },
        { q: "Are spiritual events announced in advance?", a: "Yes. This page is designed for structured spiritual programming and advance participation planning." },
        { q: "Can I sponsor a satsang or bhajan session?", a: "Yes. Individual sabha support and monthly devotional sponsorship options can be contributed." },
      ]}
    />
  );
});

export const EventsFestivalsPageLegacy = memo(function EventsFestivalsPageLegacy() {
  const annualFestivals = [
    {
      month: "January",
      dayDate: "Wednesday, 14 Jan 2026",
      lunar: "Posh Krishna Ekadashi, VS 2082",
      title: "Makar Sankranti / Uttarayan",
      focus: "Sunrise darshan, festive satsang, and seasonal offering seva.",
    },
    {
      month: "January",
      dayDate: "Friday, 23 Jan 2026",
      lunar: "Magh Shukl Pancham, VS 2082",
      title: "Vasant Panchmi",
      focus: "Yellow-themed celebration, prayer, learning blessing, and devotional music.",
    },
    {
      month: "January",
      dayDate: "Monday, 26 Jan 2026",
      lunar: "Magh Shukl Ashtami, VS 2082",
      title: "Republic Day",
      focus: "National spirit, community gathering, and values-based remembrance.",
    },
    {
      month: "February",
      dayDate: "Sunday, 15 Feb 2026",
      lunar: "Maha Vad Teras, VS 2082",
      title: "Shivratri",
      focus: "Night prayer, dhun, abhishek support, and disciplined devotee flow.",
    },
    {
      month: "March",
      dayDate: "Monday, 2 Mar 2026",
      lunar: "Fagan Shukl Shashti, VS 2082",
      title: "Holika Dahan",
      focus: "Ceremonial preparation, safety coordination, and family participation.",
    },
    {
      month: "March",
      dayDate: "Tuesday, 3 Mar 2026",
      lunar: "Fagan Shukl Purnima, VS 2082",
      title: "Pushpadolotsav Rangotsav",
      focus: "Phooldol celebration, color utsav support, and festive hospitality seva.",
    },
    {
      month: "March",
      dayDate: "Thursday, 27 Mar 2026",
      lunar: "Chaitra Shukl Navmi, VS 2082",
      title: "Shri Ramnavmi - Bhagwan Swaminarayan Pragat Utsav",
      focus: "Major devotional observance with katha, aarti, and crowd discipline planning.",
    },
    {
      month: "April",
      dayDate: "Thursday, 2 Apr 2026",
      lunar: "Chaitra Shukl Purnima, VS 2082",
      title: "Hanuman Janmotsav",
      focus: "Hanuman bhakti, recitation support, and mandir celebration seva.",
    },
    {
      month: "July",
      dayDate: "Thursday, 16 Jul 2026",
      lunar: "Ashadh Shukl 8, VS 2082",
      title: "Rathyatra",
      focus: "Route discipline, procession seva, and public devotional participation.",
    },
    {
      month: "July",
      dayDate: "Wednesday, 29 Jul 2026",
      lunar: "Ashadh Shukl Purnima, VS 2082",
      title: "Guru Purnima",
      focus: "Guru bhakti, gratitude offerings, and reverent event coordination.",
    },
    {
      month: "August",
      dayDate: "Saturday, 15 Aug 2026",
      lunar: "Shravan Shukl Tij, VS 2082",
      title: "Independence Day",
      focus: "Patriotic observance with satsang values, family presence, and seva spirit.",
    },
    {
      month: "August",
      dayDate: "Friday, 28 Aug 2026",
      lunar: "Shravan Shukl Punam, VS 2082",
      title: "Raksha Bandhan",
      focus: "Family celebration, blessings, and values-centered participation.",
    },
    {
      month: "September",
      dayDate: "Friday, 4 Sep 2026",
      lunar: "Shravan Krishna Atham, VS 2082",
      title: "Janmashtami Utsav",
      focus: "Midnight celebration, bhajan support, and high-devotee footfall management.",
    },
    {
      month: "September",
      dayDate: "Monday, 14 Sep 2026",
      lunar: "Bhadrapada Shukl Chaturthi, VS 2082",
      title: "Start of Ganesh Utsav",
      focus: "Mandap readiness, welcome seva, and ceremonial setup support.",
    },
    {
      month: "September",
      dayDate: "Tuesday, 22 Sep 2026",
      lunar: "Bhadrapada Shukl Ekadashi, VS 2082",
      title: "Jal Jhilani Ekadashi / Nauka Vihar Utsav",
      focus: "Water procession coordination, devotional celebration, and family guidance.",
    },
    {
      month: "October",
      dayDate: "Sunday, 11 Oct 2026",
      lunar: "Ashvin Shukl Pancham, VS 2082",
      title: "Start of Navratri Mahotsav",
      focus: "Festival launch, garba discipline, and decoration-led seva preparation.",
    },
    {
      month: "October",
      dayDate: "Tuesday, 20 Oct 2026",
      lunar: "Ashvin Shukl Dashmi, VS 2082",
      title: "Vijaya Dashmi / Dashera",
      focus: "Victory-themed celebration, family gathering, and satsang observance.",
    },
    {
      month: "October",
      dayDate: "Monday, 26 Oct 2026",
      lunar: "Ashvin Shukl Purnima, VS 2082",
      title: "Sharad Purnima Utsav",
      focus: "Moonlit devotional celebration, prasad seva, and serene festival hosting.",
    },
    {
      month: "November",
      dayDate: "Saturday, 7 Nov 2026",
      lunar: "Ashvin Krishna Choudas, VS 2082",
      title: "Narak Chaturdashi / 21000 Deep Mahotsav",
      focus: "Deep lighting ceremony, safety management, and mass devotional participation.",
    },
    {
      month: "November",
      dayDate: "Sunday, 8 Nov 2026",
      lunar: "Ashvin Krishna Amavas, VS 2082",
      title: "Dipawali",
      focus: "Festival darshan, family arrivals, diya preparation, and hospitality seva.",
    },
    {
      month: "November",
      dayDate: "Tuesday, 10 Nov 2026",
      lunar: "Kartak Shukl Pratipada, VS 2083",
      title: "Vikram Samvat Hindu Nav Varsh",
      focus: "New year blessings, mandir visit planning, and festive devotee reception.",
    },
    {
      month: "November",
      dayDate: "Wednesday, 14 Nov 2026",
      lunar: "Kartak Shukl Panchami, VS 2083",
      title: "Annaji Utsav",
      focus: "Offering support, prasad management, and temple celebration readiness.",
    },
    {
      month: "November",
      dayDate: "Saturday, 21 Nov 2026",
      lunar: "Kartak Sud Ekadashi/Baras, VS 2083",
      title: "Prabodhini Ekadashi / Tulsi Vivah",
      focus: "Sacred ceremonial observance, bhajan participation, and floral seva support.",
    },
  ];

  return (
    <EventShowcasePage
      title="Festivals & Celebrations"
      subtitle="Tradition, devotion, and joy, celebrated together"
      backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/festival_axzy0v.jpg"
      metaDescription="Annual Swaminarayan Bhagwat Dham festival calendar, utsav planning, seva participation, and celebration support."
      aboutTitle="Annual Festival Vision"
      aboutParagraphs={[]}
      highlights={[
        { title: "Annual Utsavs", value: "12+", note: "Major devotional celebrations across the year" },
        { title: "Festival Volunteers", value: "700+", note: "Decoration, prasad, hospitality, and discipline teams" },
        { title: "Family Footfall", value: "50,000+", note: "Estimated annual festival participation" },
        { title: "Temple Calendar", value: "Year-Round", note: "Integrated devotional observance planning" },
      ]}
      features={[
        { title: "Annual Festival Calendar", desc: "A month-wise devotional rhythm for major utsavs and temple-led observances." },
        { title: "Celebration Operations", desc: "Planning for darshan movement, hospitality, decoration, and prasad distribution." },
        { title: "Family and Cultural Participation", desc: "Programs designed for devotees, children, youth, and community gathering." },
      ]}
      supportTracks={[
        "Decoration, floral, and mandap seva",
        "Prasad preparation and distribution",
        "Darshan and queue discipline",
        "Festival announcements and family support desks",
      ]}
      donationTiers={[
        { label: "Festival Seva Support", amount: "Rs 2,100", note: "Decoration and hospitality support" },
        { label: "One Utsav Sponsor", amount: "Rs 15,000", note: "Support a major temple festival day" },
        { label: "Seasonal Festival Partner", amount: "Rs 51,000", note: "Contribute to multi-event festival readiness" },
      ]}
      primaryCta="Sponsor Festival"
      secondaryCta="Join Festival Seva"
      gauSevaStyle
      hideHighlightValues
      supportIntro={null}
      testimonials={[
        { name: "Festival Volunteer", quote: "A well-planned utsav turns devotion into a graceful and joyful experience for every family." },
        { name: "Temple Visitor", quote: "The calendar-based preparation helps us plan our family participation in advance." },
        { name: "Prasad Seva Team", quote: "Festival discipline matters as much as celebration. The structure makes seva effective." },
      ]}
      faqs={[
        { q: "Does this page cover all annual temple festivals?", a: "Yes. It is now structured to reflect the annual festival rhythm of Swaminarayan Bhagwat Dham." },
        { q: "Can I volunteer for a specific festival?", a: "Yes. You can join by festival type and support decoration, prasad, discipline, and hospitality seva." },
        { q: "Can I sponsor a festival day or major utsav?", a: "Yes. Event-level and season-level support options are included in the page structure." },
      ]}
      extraSection={
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className={EVENT_SEVA_SECTION_CLASS}>
            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
                <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                  <p className={SEVA_SECTION_LABEL_CLASS}>Year 2026</p>
                  <h2 className={SEVA_SECTION_HEADING_CLASS}>Annual Swaminarayan Bhagwat Dham Festival Calendar</h2>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Festival Days", value: `${annualFestivals.length}` },
                      { label: "Months Covered", value: "Jan-Nov" },
                      { label: "Temple Support", value: "Join + Donate" },
                      { label: "Planning Style", value: "Date-Wise" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-[var(--campaign-deep)] p-4">
                        <p className="text-[20px] font-black uppercase tracking-wide text-[var(--campaign-accent)] md:text-[24px]">{item.label}</p>
                        <p className="mt-1 text-[14px] font-black text-white md:text-[20px]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to={ROUTES.involved.volunteer}
                      className="inline-flex rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
                    >
                      Join Festival Seva
                    </Link>
                    <Link
                      to={ROUTES.donate}
                      className="inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                    >
                      Donate for Festivals
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      title: "Volunteer Path",
                      desc: "Choose decoration, prasad, queue, hospitality, or mandap seva according to each festival.",
                    },
                    {
                      title: "Family Path",
                      desc: "Track the exact festival dates and prepare annual family participation in advance.",
                    },
                    {
                      title: "Puja Support Path",
                      desc: "Support diya, flowers, prasad, mandir decor, and festival arrangements through donation.",
                    },
                  ].map((item) => (
                    <div key={item.title} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                      <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                      <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {annualFestivals.map((festival) => (
                <div
                  key={`${festival.dayDate}-${festival.title}`}
                  className="group rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{festival.month}</p>
                      <p className="mt-2 text-[14px] font-black text-white md:text-[20px]">{festival.dayDate}</p>
                    </div>
                    <span className="rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--campaign-accent)]">
                      2026
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[var(--campaign-deep)] p-4">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[var(--campaign-text)]">{festival.lunar}</p>
                    <h3 className={`mt-3 ${SEVA_CARD_TITLE_CLASS}`}>{festival.title}</h3>
                    <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{festival.focus}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to={ROUTES.involved.volunteer}
                      className="inline-flex items-center justify-center rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
                    >
                      Join Us
                    </Link>
                    <Link
                      to={ROUTES.donate}
                      className="inline-flex items-center justify-center rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                    >
                      Donate for Puja
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
              {[
                {
                  title: "Festival Operations Layer",
                  desc: "Each festival card now acts like a mini participation block with exact date, tithi, festival purpose, and direct action buttons.",
                },
                {
                  title: "Devotee Planning Layer",
                  desc: "Families can use the calendar to prepare annual temple visits, darshan, fasting, celebration planning, and child participation.",
                },
                {
                  title: "Donation and Puja Layer",
                  desc: "The donate action on every festival card makes puja, decor, prasad, diya, and celebration support easier to organize year-round.",
                },
              ].map((item) => (
                <div key={item.title} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
    />
  );
});

export const EventsGuruPurnimaPage = memo(function EventsGuruPurnimaPage() {
  return (
    <EventShowcasePage
      title="Guru Purnima"
      subtitle="A sacred day of guru bhakti, gratitude, discipline, and spiritual rededication"
      backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772913532/gurupurnima_gthuvv.jpg"
      metaDescription="Guru Purnima celebration, guru vandana, satsang programming, and seva participation."
      aboutTitle="About Guru Purnima"
      aboutParagraphs={[
        "Guru Purnima is not only a festival but a spiritual alignment day centered on gratitude, humility, and the guru-disciple bond.",
        "This page now carries title-specific content focused on guru pujan, disciple participation, devotional order, and event seva.",
      ]}
      highlights={[
        { title: "Guru Vandana Sessions", value: "3", note: "Structured prayer, discourse, and reflection windows" },
        { title: "Devotee Attendance", value: "8,000+", note: "Expected participation across the day" },
        { title: "Seva Volunteers", value: "350+", note: "Reception, puja, queue, and hospitality support" },
        { title: "Bhakti Focus", value: "100%", note: "Centered on gratitude and spiritual surrender" },
      ]}
      features={[
        { title: "Guru Pujan Discipline", desc: "Managed pujan flow with respect, order, and proper devotee guidance." },
        { title: "Satsang and Reflection", desc: "Discourses and bhajans focused on gratitude, guru tattva, and spiritual introspection." },
        { title: "Family Participation", desc: "Designed for families and devotees to engage in a calm and meaningful way." },
      ]}
      supportTracks={[
        "Guru pujan queue and devotee guidance",
        "Bhajan, stage, and discourse support",
        "Prasad seva and hospitality",
        "Volunteer-managed prayer flow and discipline",
      ]}
      donationTiers={[
        { label: "Guru Pujan Support", amount: "Rs 1,500", note: "Seva support for pujan arrangements" },
        { label: "Full Day Sponsor", amount: "Rs 11,000", note: "Support satsang, bhajan, and hospitality logistics" },
        { label: "Festival Seva Partner", amount: "Rs 31,000", note: "Contribute to wider event organization and service" },
      ]}
      primaryCta="Support Guru Purnima"
      secondaryCta="Join Guru Seva"
      testimonials={[
        { name: "Devotee Volunteer", quote: "Guru Purnima works best when every seva role reflects reverence and order." },
        { name: "Family Participant", quote: "The peaceful arrangement helps us experience the day with focus and gratitude." },
        { name: "Satsang Team", quote: "Guru bhakti grows when event structure supports stillness, respect, and devotion." },
      ]}
      faqs={[
        { q: "Can I participate in Guru Pujan seva?", a: "Yes. Volunteers can support queue management, pujan arrangements, hospitality, and satsang flow." },
        { q: "Can I sponsor Guru Purnima programs?", a: "Yes. You can contribute toward pujan, satsang, prasad, and overall event support." },
        { q: "Is Guru Purnima suitable for family participation?", a: "Yes. This page is structured around orderly and family-friendly spiritual participation." },
      ]}
    />
  );
});

export const EventsAnnakutPage = memo(function EventsAnnakutPage() {
  return (
    <EventShowcasePage
      title="Annakut Mahotsav"
      subtitle="A grand offering celebration of devotion, gratitude, hospitality, and festive abundance"
      backgroundImage="/images/annseva.png"
      metaDescription="Annakut Mahotsav offering planning, seva support, hospitality, and festival operations."
      aboutTitle="About Annakut Mahotsav"
      aboutParagraphs={[
        "Annakut Mahotsav is a devotional celebration of offering, gratitude, collective participation, and prasad-centered festival joy.",
        "This page is now focused specifically on Annakut readiness, offering coordination, volunteer seva, and family participation.",
      ]}
      highlights={[
        { title: "Offering Counters", value: "25+", note: "Managed arrangement for devotional offerings" },
        { title: "Prasad Volunteers", value: "450+", note: "Cooking, serving, and crowd flow support" },
        { title: "Devotee Capacity", value: "15,000+", note: "Managed darshan and prasad experience" },
        { title: "Festival Support", value: "All Day", note: "Continuous hospitality and event operations" },
      ]}
      features={[
        { title: "Offering Management", desc: "Coordinated devotional offerings with order, beauty, and proper presentation." },
        { title: "Prasad and Hospitality", desc: "Large-scale food seva and devotee support with disciplined volunteer execution." },
        { title: "Festival Darshan Flow", desc: "Darshan movement planning for family participation, safety, and comfort." },
      ]}
      supportTracks={[
        "Offering arrangement and decoration seva",
        "Prasad preparation and serving coordination",
        "Darshan movement and queue support",
        "Family help desk and event discipline",
      ]}
      donationTiers={[
        { label: "Offering Seva", amount: "Rs 2,100", note: "Support one devotional offering block" },
        { label: "Prasad Support", amount: "Rs 11,000", note: "Help fund prasad seva and hospitality" },
        { label: "Annakut Mahotsav Sponsor", amount: "Rs 31,000", note: "Contribute to full event execution" },
      ]}
      primaryCta="Sponsor Annakut"
      secondaryCta="Join Annakut Seva"
      testimonials={[
        { name: "Prasad Volunteer", quote: "Annakut seva is beautiful when the scale is large but the discipline remains precise." },
        { name: "Festival Devotee", quote: "The offering arrangements and darshan flow made the celebration peaceful and memorable." },
        { name: "Hospitality Team", quote: "A strong seva system transforms crowd pressure into graceful festival management." },
      ]}
      faqs={[
        { q: "Can I sponsor prasad or offering seva?", a: "Yes. You can support offerings, prasad arrangements, and larger event hospitality." },
        { q: "Can volunteers help during Annakut Mahotsav?", a: "Yes. Volunteers are needed for decoration, prasad seva, discipline, and devotee assistance." },
        { q: "Is this page specific to Annakut planning?", a: "Yes. The page now reflects Annakut-specific seva and event structure instead of generic placeholder content." },
      ]}
    />
  );
});

export const EventsFestivalsPage = memo(function EventsFestivalsPage() {
  return <FestivalsCelebrationsPremiumPage />;
});

export const EventsYouthProgramsPage = memo(function EventsYouthProgramsPage() {
  const youthTracks = [
    { title: "Bal Sanskar Track", focus: "Values, chanting, and early devotional formation" },
    { title: "Yuva Leadership Track", focus: "Confidence, communication, and responsibility through seva" },
    { title: "Cultural Expression Track", focus: "Music, drama, presentation, and dharmic creativity" },
    { title: "Service Labs", focus: "Hands-on seva projects with planning and execution discipline" },
  ];

  return (
    <EventShowcasePage
      title="Dharmik Events"
      subtitle="Dharmic programs that inspire values and discipline"
      backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/youth_xj81l3.jpg"
      metaDescription="Dharmik events, youth programs, Bal Sanskar, leadership, cultural growth, and community seva development."
      aboutTitle="About Dharmik Events"
      aboutParagraphs={[]}
      highlights={[
        { title: "Youth Participants", value: "4,000+", note: "Children and youth engaged through annual programs" },
        { title: "Mentor Team", value: "160+", note: "Guides for discipline, leadership, and culture" },
        { title: "Program Modules", value: "20+", note: "Leadership, chanting, service, and creative tracks" },
        { title: "Family Involvement", value: "High", note: "Parent and guardian-linked participation model" },
      ]}
      features={[
        { title: "Value Formation", desc: "Youth-centered programming for discipline, devotion, empathy, and character building." },
        { title: "Leadership Practice", desc: "Confidence-building through seva roles, event hosting, and community coordination." },
        { title: "Creative and Cultural Growth", desc: "Expression through music, drama, speaking, and devotional presentation." },
      ]}
      supportTracks={[
        "Youth mentor and volunteer guidance",
        "Program registration and parent coordination",
        "Activity setup and on-ground supervision",
        "Showcase, performance, and seva lab support",
      ]}
      donationTiers={[
        { label: "Youth Session Support", amount: "Rs 1,100", note: "Basic support for one youth event block" },
        { label: "Workshop Sponsor", amount: "Rs 7,500", note: "Support one focused youth program module" },
        { label: "Annual Youth Partner", amount: "Rs 25,000", note: "Contribute to recurring youth engagement tracks" },
      ]}
      primaryCta="Support Youth Program"
      secondaryCta="Join Youth Seva"
      gauSevaStyle
      hideHighlightValues
      testimonials={[
        { name: "Youth Mentor", quote: "Young people flourish when programs combine responsibility, values, and expression." },
        { name: "Parent Participant", quote: "This kind of structured youth event gives our child both confidence and direction." },
        { name: "Youth Volunteer", quote: "The seva element made the program practical, not just motivational." },
      ]}
      faqs={[
        { q: "Are youth programs only for teenagers?", a: "No. The structure can serve children, teens, and young adults through age-appropriate tracks." },
        { q: "Can parents stay involved?", a: "Yes. Parent coordination is a key strength of healthy youth event design." },
        { q: "Can I sponsor a youth workshop or annual track?", a: "Yes. Support can be directed to single sessions, workshops, or recurring youth initiatives." },
      ]}
      extraSection={
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className={EVENT_SEVA_SECTION_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Program Tracks</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Structured pathways for values, leadership, culture, and seva</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {youthTracks.map((track) => (
                <div key={track.title} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{track.title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{track.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
    />
  );
});

export const EventsSocioCulturalEventsPage = memo(function EventsSocioCulturalEventsPage() {
  const sectionClass = "mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 md:py-16";
  const labelClass = `${SEVA_SECTION_LABEL_CLASS} !text-[#C4741F]`;
  const headingClass = `${SEVA_SECTION_HEADING_CLASS} !text-[#1E4A5E]`;
  const bodyClass = `${SEVA_BODY_TEXT_CLASS} !text-[#5F5142]`;
  const cardTitleClass = `${SEVA_CARD_TITLE_CLASS} !text-[#1F4F63]`;
  const cardTextClass = `${SEVA_BODY_TEXT_CLASS} !text-[#61513F]`;
  const heroTitleClass = "text-4xl font-bold leading-tight text-[#FFF4DF] sm:text-5xl md:text-6xl";
  const heroBodyClass = `${SEVA_BODY_TEXT_CLASS} !text-[#FFE2AA]`;
  const cardClass =
    "rounded-[28px] border border-[#EADCC8] bg-[#FFFCF6] p-6 shadow-[0_18px_42px_rgba(90,62,26,0.10)] md:p-7";
  const inputClass =
    "w-full rounded-xl border border-[#E2D2B9] bg-[#FFFDF8] px-3.5 py-2.5 text-sm text-[#2B2118] outline-none transition placeholder:text-[#9A8569] focus:border-[#C4741F] focus:ring-4 focus:ring-[#F3C269]/25";

  const corePurposeCards = [
    {
      title: "Cultural Preservation",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193611/ChatGPT_Image_Apr_26_2026_01_44_24_PM_ybqb4j.png",
      text: "Protecting Indian traditions, rituals, festivals, values, scriptures, arts, and family-based cultural practices.",
    },
    {
      title: "Social Harmony",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777191420/ChatGPT_Image_Apr_26_2026_01_44_18_PM_cu3nce.png",
      text: "Bringing together different communities, castes, sects, organizations, and families under shared cultural values.",
    },
    {
      title: "Youth & Family Development",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777191419/ChatGPT_Image_Apr_26_2026_01_44_31_PM_tmftmk.png",
      text: "Inspiring youth, strengthening families, and creating a sanskar-based foundation for the next generation.",
    },
    {
      title: "Divine Society Building",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_41_57_AM_wsv00f.png",
      text: "Creating a disciplined, devotional, responsible, and spiritually awakened society through culture and seva.",
    },
  ];

  const eventStreams = [
    {
      title: "Matru-Pitru Pujan & Family Value Events",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193614/ChatGPT_Image_Apr_26_2026_01_43_25_PM_uhqvw7.png",
      icon: "/assets/icons/socio-cultural/icon-matru-pitru-pujan.svg",
      text: "Restoring respect, gratitude, and devotion toward parents through emotional, spiritual, and family-centered programs.",
    },
    {
      title: "Youth Sanskar & Leadership Programs",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193609/ChatGPT_Image_Apr_26_2026_01_42_25_PM_olmo6v.png",
      icon: "/assets/icons/socio-cultural/icon-youth-seminar.svg",
      text: "Guidance sessions for students and youth on discipline, values, leadership, dharma, and purposeful living.",
    },
    {
      title: "Hindu Sammelan & Cultural Gatherings",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777206436/ChatGPT_Image_Apr_26_2026_05_56_15_PM_ouukoq.png",
      icon: "/assets/icons/socio-cultural/icon-hindu-sammelan.svg",
      text: "Grand public platforms for cultural awakening, national devotion, unity, and Sanatan values.",
    },
    {
      title: "Festivals & Traditional Celebrations",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777206439/ChatGPT_Image_Apr_26_2026_05_55_58_PM_lcrpun.png",
      icon: "/assets/icons/socio-cultural/icon-festival-celebration.svg",
      text: "Celebrating Indian festivals with devotion, meaning, community participation, and cultural education.",
    },
    {
      title: "Seminars & Workshops",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777025579/ChatGPT_Image_Apr_24_2026_03_38_45_PM_om4yrp.png",
      icon: "/assets/icons/socio-cultural/icon-workshop.svg",
      text: "Programs in schools, colleges, corporate sectors, and communities for betterment of life, values, ethics, and inner development.",
    },
    {
      title: "Personal Family Blessing Events",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032984/ChatGPT_Image_Apr_24_2026_05_42_03_PM_qnuuqc.png",
      icon: "/assets/icons/socio-cultural/icon-family-blessing.svg",
      text: "Spiritual presence and blessings for family functions, community gatherings, and meaningful life occasions.",
    },
  ];

  const invitationFormats = [
    "Socio-Cultural Programs",
    "Hindu Sammelans",
    "Youth Seminars",
    "School and College Programs",
    "Family and Community Events",
    "Joint Programs with Sansthas and Trusts",
  ];

  const eventJourney = [
    { title: "Spiritual Opening", text: "Deep Prajwalan, Mangalacharan, prayer, and devotional beginning." },
    { title: "Cultural Presentation", text: "Music, dance, drama, youth performance, and cultural expression." },
    { title: "Guidance & Pravachan", text: "Inspirational guidance by Sant Shri Manish Bhaiji Maharaj or appointed speakers." },
    { title: "Collective Sankalp", text: "Value-based resolution for family, society, culture, and nation." },
    { title: "Seva & Participation", text: "Volunteer involvement, coordination, discipline, prasad, and hospitality." },
    { title: "Blessings & Conclusion", text: "Aarti, blessings, prasad, and spiritual completion." },
  ];

  const impactPoints = [
    "Strengthens family values",
    "Inspires youth consciousness",
    "Connects communities and institutions",
    "Promotes cultural pride",
    "Encourages devotion toward nation and dharma",
    "Builds a sanskar-based future generation",
    "Expands Bhagwat Heritage globally",
  ];

  const galleryItems = [
    { image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032984/ChatGPT_Image_Apr_24_2026_05_42_03_PM_qnuuqc.png", label: "Cultural Family Gathering" },
    { image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193614/ChatGPT_Image_Apr_26_2026_01_43_25_PM_uhqvw7.png", label: "Matru-Pitru Pujan" },
    { image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193609/ChatGPT_Image_Apr_26_2026_01_42_25_PM_olmo6v.png", label: "Youth Seminar" },
    { image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777206436/ChatGPT_Image_Apr_26_2026_05_56_15_PM_ouukoq.png", label: "Hindu Sammelan" },
    { image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777206439/ChatGPT_Image_Apr_26_2026_05_55_58_PM_lcrpun.png", label: "Festival Celebration" },
    { image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777191430/ChatGPT_Image_Apr_26_2026_01_43_38_PM_cpi5u0.png", label: "Volunteer Seva" },
  ];

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isSubmittingInvite, setIsSubmittingInvite] = useState(false);
  const [inviteNotice, setInviteNotice] = useState("");
  const [inviteAttachment, setInviteAttachment] = useState<File | null>(null);
  const [inviteForm, setInviteForm] = useState({
    fullName: "",
    organizationName: "",
    phone: "",
    email: "",
    country: "",
    state: "",
    city: "",
    eventType: "Socio-Cultural Event",
    proposedDate: "",
    audienceSize: "",
    venueAddress: "",
    invitationPurpose: "",
    requiredSupport: "Maharaj Ji Presence",
    message: "",
    consent: false,
  });

  const openInviteModal = () => {
    setInviteNotice("");
    setIsInviteOpen(true);
  };

  const resetInviteForm = () => {
    setInviteForm({
      fullName: "",
      organizationName: "",
      phone: "",
      email: "",
      country: "",
      state: "",
      city: "",
      eventType: "Socio-Cultural Event",
      proposedDate: "",
      audienceSize: "",
      venueAddress: "",
      invitationPurpose: "",
      requiredSupport: "Maharaj Ji Presence",
      message: "",
      consent: false,
    });
    setInviteAttachment(null);
  };

  const handleInviteFieldChange = (field: keyof typeof inviteForm, value: string | boolean) => {
    setInviteForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleInviteSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inviteForm.consent) {
      setInviteNotice("Please accept the consent before submitting your request.");
      return;
    }

    setIsSubmittingInvite(true);
    setInviteNotice("");

    try {
      const payload = new FormData();
      payload.append("fullName", inviteForm.fullName);
      payload.append("organizationName", inviteForm.organizationName);
      payload.append("phone", inviteForm.phone);
      payload.append("email", inviteForm.email);
      payload.append("country", inviteForm.country);
      payload.append("state", inviteForm.state);
      payload.append("city", inviteForm.city);
      payload.append("eventType", inviteForm.eventType);
      payload.append("proposedDate", inviteForm.proposedDate);
      payload.append("audienceSize", inviteForm.audienceSize);
      payload.append("venueAddress", inviteForm.venueAddress);
      payload.append("invitationPurpose", inviteForm.invitationPurpose);
      payload.append("requiredSupport", inviteForm.requiredSupport);
      payload.append("message", inviteForm.message);
      payload.append("consent", String(inviteForm.consent));
      payload.append("status", "Pending");
      if (inviteAttachment) {
        payload.append("attachment", inviteAttachment);
      }

      await eventInvitationsApi.create(payload);
      setInviteNotice("Thank you for submitting your invitation request. Our Bhagwat Heritage team will review your proposal and contact you shortly.");
      resetInviteForm();
    } catch {
      setInviteNotice("Submission endpoint is not available right now. Please try again shortly.");
    } finally {
      setIsSubmittingInvite(false);
    }
  };

  usePageMeta(
    "Socio-Cultural Events | Bhagwat Heritage",
    "Invite Bhagwat Heritage and Sant Shri Manish Bhaiji Maharaj for socio-cultural events, seminars, Hindu Sammelans, family programs, and cultural collaborations across India and the world.",
  );

  return (
    <div className="-mx-6 -my-12 min-h-screen overflow-hidden bg-[#FFF9EE] text-[#2B2118]">
      <section className="relative isolate h-[74vh] min-h-[560px] w-full overflow-hidden">
          <img
            src="https://res.cloudinary.com/der8zinu8/image/upload/v1777206448/ChatGPT_Image_Apr_26_2026_05_55_00_PM_opkas9.png"
            alt="Socio-cultural gathering led by Bhagwat Heritage Service Foundation Trust"
            className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-105 saturate-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,240,205,0.30),rgba(255,224,163,0.22),rgba(255,255,255,0.10))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,247,224,0.34),transparent_44%)]" />
          <div className="absolute inset-0 z-10 mx-auto flex max-w-5xl flex-col items-center justify-end px-4 pb-10 text-center text-white sm:px-6 sm:pb-14 md:pb-16">
            <h1 className={heroTitleClass}>Socio-Cultural Events</h1>
          <p className={`mt-2 ${SEVA_HERO_SUBTITLE_CLASS} !text-[#FFEAC4]`}>सामाजिक एवं सांस्कृतिक आयोजन</p>
          <p className={`mt-3 max-w-4xl uppercase tracking-[0.08em] ${heroBodyClass}`}>
            A living movement of culture, unity, sanskar, and spiritual awakening across India and the world.
          </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={openInviteModal} className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#E5A13A] px-7 text-sm font-black text-[#2A1B0B] shadow-[0_16px_34px_rgba(122,77,20,0.30)] transition hover:bg-[#CF8B26]">
              Invite Maharaj Ji
            </button>
            <a href="#event-streams" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#F4D29B] bg-white/15 px-7 text-sm font-black text-white backdrop-blur-sm transition hover:bg-white/25">
              Explore Events
            </a>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={`${cardClass} relative overflow-hidden`}>
          <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(225,180,95,0.22),transparent_72%)]" />
          <p className={labelClass}>Foundation Vision</p>
          <h2 className={headingClass}>A Living Heritage, A Global Mission</h2>
          <p className={`${bodyClass} mt-5`}>
            Bhagwat Heritage Service Foundation Trust represents Indian culture in its living form. The mission is not only to preserve traditions, but to serve, strengthen, and carry forward the foundation of this heritage culture for future generations.
          </p>
          <p className={`${bodyClass} mt-4`}>
            Through socio-cultural events, seminars, workshops, community gatherings, family programs, and spiritual guidance, the Sanstha works to develop a divine, disciplined, value-based, and culturally awakened society.
          </p>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="grid grid-cols-1 gap-4">
            <figure className="overflow-hidden rounded-[28px] border border-[#E8D8C3] shadow-[0_16px_38px_rgba(94,67,31,0.14)]">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777206447/ChatGPT_Image_Apr_26_2026_05_55_12_PM_gmfp5w.png"
                alt="Sant Shri Manish Bhaiji Maharaj spiritual leadership moment"
                className="h-[240px] w-full object-cover md:h-[300px]"
              />
            </figure>
            <figure className="overflow-hidden rounded-[28px] border border-[#E8D8C3] shadow-[0_16px_38px_rgba(94,67,31,0.14)]">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777206437/ChatGPT_Image_Apr_26_2026_05_55_42_PM_vgj8v7.png"
                alt="Sant Shri Manish Bhaiji Maharaj cultural guidance gathering"
                className="h-[240px] w-full object-cover md:h-[300px]"
              />
            </figure>
          </div>
          <div className={cardClass}>
            <p className={labelClass}>Spiritual Leadership</p>
            <h2 className={headingClass}>Guidance of Sant Shri Manish Bhaiji Maharaj</h2>
            <p className={`${bodyClass} mt-4`}>
              Sant Shri Manish Bhaiji Maharaj, as Bhagwat Manishi, is the motivating force behind this great cultural mission. His guidance inspires families, communities, institutions, youth, and organizations to reconnect with Indian values, dharma, devotion, and social harmony.
            </p>
            <p className={`${bodyClass} mt-4`}>
              He actively guides and attends various socio-cultural events as a spiritual margadarshak, blessing presence, keynote speaker, and cultural unifier.
            </p>
            <ul className={`mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 ${bodyClass}`}>
              {[
                "Bhagwat Manishi and spiritual guide",
                "Head Margadarshak for many Sansthas and initiatives",
                "Speaker for Hindu Sammelans and cultural platforms",
                "Guide for schools, colleges, corporate sectors, and community seminars",
                "Blessing presence in family and social events",
                "Unifier of communities, castes, sects, and institutions",
              ].map((point) => (
                <li key={point} className="rounded-xl border border-[#E8D9C3] bg-[#FFF6E8] px-3 py-2">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <p className={labelClass}>Core Purpose</p>
        <h2 className={headingClass}>Divine Objectives of Socio-Cultural Events</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {corePurposeCards.map((item) => (
            <article key={item.title} className={cardClass}>
              <span className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#E6D5B7] bg-[#FFF1D6]">
                <img src={item.icon} alt={`${item.title} icon`} className="h-full w-full object-cover" loading="lazy" />
              </span>
              <h3 className={`mt-4 ${cardTitleClass}`}>{item.title}</h3>
              <p className={`mt-3 ${cardTextClass}`}>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="event-streams" className={sectionClass}>
        <p className={labelClass}>Event Categories</p>
        <h2 className={headingClass}>Our Socio-Cultural Event Streams</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {eventStreams.map((event) => (
            <article key={event.title} className="overflow-hidden rounded-[26px] border border-[#E8D7C0] bg-[#FFFCF7] shadow-[0_18px_42px_rgba(91,64,28,0.10)]">
              <img src={event.image} alt={`${event.title} by Bhagwat Heritage`} className="h-52 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className={cardTitleClass}>{event.title}</h3>
                <p className={`mt-3 ${cardTextClass}`}>{event.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-[30px] border border-[#E6D5B8] bg-[#FFFDF8] shadow-[0_20px_48px_rgba(102,73,33,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
          <img
            src="https://res.cloudinary.com/der8zinu8/image/upload/v1777032984/ChatGPT_Image_Apr_24_2026_05_42_03_PM_qnuuqc.png"
            alt="Invitation and collaboration for socio-cultural event"
            className="h-[320px] w-full object-cover sm:h-[460px] lg:h-full lg:min-h-0"
          />
          <div className="p-6 md:p-8">
            <p className={labelClass}>Invitation & Collaboration System</p>
            <h2 className={`${headingClass} md:text-[36px]`}>Invite for Joint Socio-Cultural Events</h2>
            <p className={`mt-2 ${cardTitleClass} !text-[#295E72]`}>Organize Divine Events with Guidance, Blessings, and Cultural Direction</p>
            <p className={`${bodyClass} mt-4`}>
              Bhagwat Heritage welcomes institutions, communities, and families to organize meaningful socio-cultural events with spiritual direction.
            </p>
            <p className={`${bodyClass} mt-4`}>
              Organizers can invite Sant Shri Manish Bhaiji Maharaj for blessings, keynote guidance, and cultural inspiration.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {invitationFormats.map((format) => (
                <div key={format} className={`rounded-xl border border-[#E8DAC3] bg-[#FFF5E6] px-3 py-2 ${bodyClass} !text-[#5E4630]`}>
                  {format}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={openInviteModal} className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#E19B35] px-6 text-sm font-black text-[#2B1C0A] transition hover:bg-[#C9831E]">
                Invite Maharaj Ji
              </button>
              <button type="button" onClick={openInviteModal} className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#D29A49] bg-white px-6 text-sm font-black text-[#7C4D12] transition hover:bg-[#FFF1D8]">
                Submit Event Proposal
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <p className={labelClass}>Event Experience Journey</p>
        <h2 className={headingClass}>How a Socio-Cultural Event Becomes a Divine Experience</h2>
          <figure className="mt-6 overflow-hidden rounded-[24px] border border-[#E7D8C3] shadow-[0_16px_36px_rgba(93,64,26,0.14)]">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1777212556/ChatGPT_Image_Apr_26_2026_07_38_06_PM_zkr7mf.png"
              alt="Spiritual and cultural event journey steps in one experience"
              className="w-full bg-[#FFF8EC] object-contain"
              loading="lazy"
            />
          </figure>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {eventJourney.map((step, index) => (
            <article key={step.title} className={cardClass}>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0F6A79] text-sm font-black text-white">{index + 1}</div>
              <h3 className={`mt-3 ${cardTitleClass}`}>{step.title}</h3>
              <p className={`mt-2 ${cardTextClass} !text-[#5D4E3C]`}>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="rounded-[30px] border border-[#175B68]/20 bg-[linear-gradient(135deg,#0D5161_0%,#154A5C_60%,#9B6A26_100%)] p-6 text-[#FFF4DF] shadow-[0_22px_56px_rgba(23,71,82,0.28)] md:p-9">
          <p className={`${SEVA_SECTION_LABEL_CLASS} !text-[#FFDFA5]`}>Featured Impact</p>
          <span className="mt-3 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_41_57_AM_wsv00f.png"
              alt="Featured impact icon"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </span>
          <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-2 !text-[#FFF4DF]`}>A Movement of Cultural Awakening</h2>
          <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} !text-[#F7E8CB]`}>
            These events are not ordinary programs. They are living platforms for cultural revival, family bonding, spiritual discipline, and social unity.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-2 text-sm font-semibold sm:grid-cols-2 lg:grid-cols-3">
            {impactPoints.map((point) => (
              <div key={point} className="rounded-xl border border-white/20 bg-white/10 px-3 py-2">
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <p className={labelClass}>Gallery Preview</p>
        <h2 className={headingClass}>Moments of Living Culture</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <figure key={item.label} className="group relative overflow-hidden rounded-[22px] border border-[#E7D8C0]">
              <img src={item.image} alt={`${item.label} socio-cultural event`} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent)] px-4 py-4 text-sm font-bold text-[#FFF3DD]">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-[30px] border border-[#E7D6BE] bg-[#FFFCF7] shadow-[0_20px_48px_rgba(100,72,33,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
          <img
            src="https://res.cloudinary.com/der8zinu8/image/upload/v1777025579/ChatGPT_Image_Apr_24_2026_03_38_45_PM_om4yrp.png"
            alt="Volunteers serving during socio-cultural event"
            className="h-full min-h-[320px] w-full object-cover"
          />
          <div className="p-6 md:p-8">
            <p className={labelClass}>Volunteer & Participation</p>
            <span className="mt-3 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#E4D2B5] bg-[#FFF1D8]">
                <img
                  src="https://res.cloudinary.com/der8zinu8/image/upload/v1777191420/ChatGPT_Image_Apr_26_2026_01_44_18_PM_cu3nce.png"
                  alt="Volunteer seva icon"
                  className="h-full w-full object-cover"
                  loading="lazy"
              />
            </span>
            <h2 className={`${headingClass} md:text-[36px]`}>Become a Part of Cultural Seva</h2>
            <p className={`${bodyClass} mt-4`}>
              Every divine event is made successful through dedicated seva. Volunteers can support planning, coordination, discipline, decoration, registration, media, hospitality, prasad distribution, family assistance, and youth engagement.
            </p>
            <Link to={ROUTES.involved.volunteer} className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#0F6F7A] px-6 text-sm font-black text-white transition hover:bg-[#0B5B64]">
              Register as Volunteer
            </Link>
          </div>
        </div>
      </section>
      <section className={`${sectionClass} pt-2`}>
        <div className="relative overflow-hidden rounded-[30px] border border-[#DBB982] bg-[linear-gradient(120deg,#FFE7A0_0%,#FFD06B_48%,#F6B43A_100%)] shadow-[0_26px_58px_rgba(101,68,25,0.25)]">
          <div className="z-10 flex min-h-[360px] flex-col items-center justify-center px-5 text-center text-white md:min-h-[420px]">
            <h2 className={`${cardTitleClass} text-3xl leading-tight !text-[#FFF4DF] md:text-5xl`}>Expand Culture. Unite Society. Inspire Generations.</h2>
            <p className={`mt-4 max-w-4xl ${SEVA_BODY_TEXT_CLASS} !text-[#FBE9CA]`}>
              Invite Bhagwat Heritage for meaningful socio-cultural events and become part of a global movement to preserve Indian culture, strengthen families, guide youth, and build a divine society.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={openInviteModal} className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#E6A339] px-7 text-sm font-black text-[#311F0C] transition hover:bg-[#CF8D24]">
                Invite for Event
              </button>
              <button type="button" onClick={openInviteModal} className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#F3D6A8] bg-white/10 px-7 text-sm font-black text-white transition hover:bg-white/20">
                Collaborate With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {isInviteOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-3 sm:p-6">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[24px] border border-[#E5D6C0] bg-[#FFFBF4] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)] sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className={labelClass}>Invite Maharaj Ji Form</p>
                <h3 className={`mt-2 ${cardTitleClass}`}>Submit Event Invitation Proposal</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D9C5A7] bg-white text-lg font-bold text-[#8B5A21] transition hover:bg-[#FFF2DC]"
                aria-label="Close invitation form"
              >
                ×
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleInviteSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-[#5E4D3C]">Full Name
                  <input required value={inviteForm.fullName} onChange={(e) => handleInviteFieldChange("fullName", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C]">Organization / Sanstha / Institution Name
                  <input required value={inviteForm.organizationName} onChange={(e) => handleInviteFieldChange("organizationName", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C]">Contact Number
                  <input required value={inviteForm.phone} onChange={(e) => handleInviteFieldChange("phone", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C]">Email Address
                  <input type="email" required value={inviteForm.email} onChange={(e) => handleInviteFieldChange("email", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C]">Country
                  <input required value={inviteForm.country} onChange={(e) => handleInviteFieldChange("country", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C]">State
                  <input required value={inviteForm.state} onChange={(e) => handleInviteFieldChange("state", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C]">City
                  <input required value={inviteForm.city} onChange={(e) => handleInviteFieldChange("city", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C]">Event Type
                  <select value={inviteForm.eventType} onChange={(e) => handleInviteFieldChange("eventType", e.target.value)} className={inputClass}>
                    {[
                      "Socio-Cultural Event",
                      "Hindu Sammelan",
                      "School Seminar",
                      "College Seminar",
                      "Corporate Workshop",
                      "Family Program",
                      "Festival Celebration",
                      "International Event",
                      "Other",
                    ].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C]">Proposed Event Date
                  <input type="date" required value={inviteForm.proposedDate} onChange={(e) => handleInviteFieldChange("proposedDate", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C]">Expected Audience Size
                  <input required value={inviteForm.audienceSize} onChange={(e) => handleInviteFieldChange("audienceSize", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C] md:col-span-2">Venue Address
                  <input required value={inviteForm.venueAddress} onChange={(e) => handleInviteFieldChange("venueAddress", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C] md:col-span-2">Invitation Purpose
                  <input required value={inviteForm.invitationPurpose} onChange={(e) => handleInviteFieldChange("invitationPurpose", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C] md:col-span-2">Required Support
                  <select value={inviteForm.requiredSupport} onChange={(e) => handleInviteFieldChange("requiredSupport", e.target.value)} className={inputClass}>
                    {[
                      "Maharaj Ji Presence",
                      "Keynote Guidance",
                      "Blessings Only",
                      "Joint Organization",
                      "Seminar / Workshop",
                      "Cultural Program Guidance",
                    ].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C] md:col-span-2">Message / Additional Details
                  <textarea rows={4} value={inviteForm.message} onChange={(e) => handleInviteFieldChange("message", e.target.value)} className={inputClass} />
                </label>
                <label className="text-sm font-semibold text-[#5E4D3C] md:col-span-2">Upload Invitation PDF/Image (optional)
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => setInviteAttachment(e.target.files?.[0] ?? null)}
                    className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-[#F4D49D] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-[#6A4215]`}
                  />
                </label>
              </div>
              <label className="flex items-start gap-2 rounded-xl border border-[#E8D9C3] bg-[#FFF4E1] p-3 text-sm text-[#5D4C3B]">
                <input type="checkbox" checked={inviteForm.consent} onChange={(e) => handleInviteFieldChange("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-[#C97B1E]" />
                <span>
                  I understand that submission of this invitation request does not guarantee confirmation. The organizing team will review and contact me.
                </span>
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" disabled={isSubmittingInvite} className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#0F6F7A] px-7 text-sm font-black text-white transition hover:bg-[#0A5D66] disabled:cursor-not-allowed disabled:opacity-70">
                  {isSubmittingInvite ? "Submitting..." : "Submit Event Proposal"}
                </button>
                <button type="button" onClick={resetInviteForm} className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#D2A560] bg-white px-7 text-sm font-black text-[#7A4A16] transition hover:bg-[#FFF1D9]">
                  Reset Form
                </button>
              </div>
              {inviteNotice ? <p className="rounded-xl border border-[#CFE3D6] bg-[#EAF8EF] px-4 py-2 text-sm font-semibold text-[#1E6A4D]">{inviteNotice}</p> : null}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
});

export const KnowledgeStudyResourcesPage = memo(function KnowledgeStudyResourcesPage() {
  const resourceImageBase = "/images/bhagwat-study-resources/";
  const heroImage =
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777055209/ChatGPT_Image_Apr_24_2026_11_56_04_PM_l9735k.png";
  const categories = [
    "All Resources",
    "Bhagwat Introduction",
    "Skandha-wise Study",
    "Shloka Meaning",
    "Tattvik Notes",
    "Katha Topics",
    "Audio Pravachan",
    "Children Learning",
    "Downloadable PDFs",
  ];
  const skandhaOptions = ["All Skandhas", "General", "Skandha 1", "Selected Shlokas", "Thematic Study", "Katha Index", "Daily Listening", "Children", "PDF Library"];
  const languageOptions = ["All Languages", "Hindi", "English", "Hindi / English"];
  const formatOptions = ["All Formats", "Article", "PDF", "Audio", "Video"];
  const aboutCards = [
    {
      icon: "icon-authentic-study.svg",
      title: "Authentic Bhagwat Learning",
      text: "Study resources inspired by the sacred tradition of Shrimad Bhagwat Mahapuran with devotional clarity and practical understanding.",
    },
    {
      icon: "icon-skandha-path.svg",
      title: "Skandha-wise Study Path",
      text: "Organised learning material to understand Bhagwat chapter by chapter, topic by topic and shloka by shloka.",
    },
    {
      icon: "icon-family-learning.svg",
      title: "For Families, Youth & Seekers",
      text: "Resources designed for children, youth, families, students and sincere spiritual aspirants.",
    },
  ];
  const categoryFocusCards = [
    {
      title: "Beginner Study",
      category: "Bhagwat Introduction",
      text: "Start with Bhagwat purpose, glory and structure before moving into deeper skandha study.",
    },
    {
      title: "Skandha Learning",
      category: "Skandha-wise Study",
      text: "Follow a chapter-wise path with key themes, stories and spiritual insights.",
    },
    {
      title: "Shloka & Tattva",
      category: "Shloka Meaning",
      text: "Learn selected shlokas, meanings and devotional philosophy with practical relevance.",
    },
    {
      title: "Listening & PDFs",
      category: "Audio Pravachan",
      text: "Use pravachan audio and printable notes for daily satsang and family study.",
    },
  ];
  const studyResources = [
    {
      title: "Introduction to Shrimad Bhagwat Mahapuran",
      category: "Bhagwat Introduction",
      format: "Article",
      language: "Hindi",
      skandha: "General",
      image: "resource-bhagwat-introduction.jpg",
      description: "A simple and devotional introduction to the purpose, glory and structure of Shrimad Bhagwat.",
    },
    {
      title: "Skandha 1 Study Guide",
      category: "Skandha-wise Study",
      format: "PDF",
      language: "Hindi",
      skandha: "Skandha 1",
      image: "resource-skandha-study.jpg",
      description: "Chapter-wise guide for understanding the first skandha with key themes and spiritual insights.",
    },
    {
      title: "Selected Bhagwat Shlokas with Meaning",
      category: "Shloka Meaning",
      format: "Article",
      language: "Hindi / English",
      skandha: "Selected Shlokas",
      image: "resource-shloka-meaning.jpg",
      description: "Important shlokas with simple meanings and practical life application.",
    },
    {
      title: "Bhagwat Tattvik Notes",
      category: "Tattvik Notes",
      format: "PDF",
      language: "Hindi",
      skandha: "Thematic Study",
      image: "resource-tattvik-notes.jpg",
      description: "Philosophical notes explaining devotion, dharma, vairagya and divine knowledge.",
    },
    {
      title: "Bhagwat Katha Topic Index",
      category: "Katha Topics",
      format: "Article",
      language: "Hindi",
      skandha: "Katha Index",
      image: "resource-katha-topics.jpg",
      description: "A helpful index of major Bhagwat Katha topics for speakers, students and devotees.",
    },
    {
      title: "Audio Pravachan Collection",
      category: "Audio Pravachan",
      format: "Audio",
      language: "Hindi",
      skandha: "Daily Listening",
      image: "resource-audio-pravachan.jpg",
      description: "Selected pravachan and satsang audio resources for daily listening and reflection.",
    },
    {
      title: "Bhagwat Learning for Children",
      category: "Children Learning",
      format: "Article",
      language: "Hindi / English",
      skandha: "Children",
      image: "resource-children-learning.jpg",
      description: "Simple stories, values and activities to introduce children to Bhagwat wisdom.",
    },
    {
      title: "Downloadable Study PDFs",
      category: "Downloadable PDFs",
      format: "PDF",
      language: "Hindi",
      skandha: "PDF Library",
      image: "resource-download-pdfs.jpg",
      description: "Study sheets, notes and printable material for regular learning and satsang groups.",
    },
  ];
  const studyPath = [
    { icon: "icon-bhagwat-mahatmya.svg", title: "Begin with Bhagwat Mahatmya" },
    { icon: "icon-purpose-study.svg", title: "Understand the purpose of Bhagwat" },
    { icon: "icon-skandha-study.svg", title: "Study Skandha-wise" },
    { icon: "icon-shloka-learning.svg", title: "Learn selected shlokas" },
    { icon: "icon-satsang-pravachan.svg", title: "Attend satsang / pravachan" },
    { icon: "icon-life-practice.svg", title: "Practice Bhagwat teachings in daily life" },
  ];
  const [resourceFilters, setResourceFilters] = useState({
    search: "",
    category: "All Resources",
    skandha: "All Skandhas",
    language: "All Languages",
    format: "All Formats",
  });
  const [studyCircleForm, setStudyCircleForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    mode: "",
    interest: "",
    message: "",
  });
  const [resourceRequestForm, setResourceRequestForm] = useState({
    name: "",
    contact: "",
    resource: "",
    language: "",
    message: "",
  });
  const [studyCircleNotice, setStudyCircleNotice] = useState("");
  const [resourceRequestNotice, setResourceRequestNotice] = useState("");
  const filteredResources = useMemo(() => {
    const query = resourceFilters.search.trim().toLowerCase();

    return studyResources.filter((resource) => {
      const matchesSearch =
        !query ||
        [resource.title, resource.category, resource.description, resource.language].some((field) => field.toLowerCase().includes(query));
      const matchesCategory = resourceFilters.category === "All Resources" || resource.category === resourceFilters.category;
      const matchesSkandha = resourceFilters.skandha === "All Skandhas" || resource.skandha === resourceFilters.skandha;
      const matchesLanguage =
        resourceFilters.language === "All Languages" ||
        resource.language === resourceFilters.language ||
        resource.language.includes(resourceFilters.language);
      const matchesFormat = resourceFilters.format === "All Formats" || resource.format === resourceFilters.format;

      return matchesSearch && matchesCategory && matchesSkandha && matchesLanguage && matchesFormat;
    });
  }, [resourceFilters]);
  const setResourceFilter = (key: keyof typeof resourceFilters, value: string) => {
    setResourceFilters((currentFilters) => ({ ...currentFilters, [key]: value }));
  };
  const handleStudyCircleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requiredValues = [
      studyCircleForm.fullName,
      studyCircleForm.mobile,
      studyCircleForm.email,
      studyCircleForm.city,
      studyCircleForm.mode,
      studyCircleForm.interest,
    ];

    if (requiredValues.some((value) => !value.trim())) {
      setStudyCircleNotice("Please fill all required study circle fields.");
      return;
    }

    setStudyCircleNotice("Thank you. Your interest in Bhagwat Study Circle has been received.");
    setStudyCircleForm({ fullName: "", mobile: "", email: "", city: "", mode: "", interest: "", message: "" });
  };
  const handleResourceRequestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requiredValues = [resourceRequestForm.name, resourceRequestForm.contact, resourceRequestForm.resource, resourceRequestForm.language];

    if (requiredValues.some((value) => !value.trim())) {
      setResourceRequestNotice("Please fill all required resource request fields.");
      return;
    }

    setResourceRequestNotice("Your resource request has been submitted.");
    setResourceRequestForm({ name: "", contact: "", resource: "", language: "", message: "" });
  };
  const sectionClass = "mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 md:py-[72px]";
  const labelClass = `${MISSION_SECTION_LABEL_CLASS} !text-[#C96F18]`;
  const headingClass = `${MISSION_SECTION_HEADING_CLASS} mt-4 !text-[#2B2118]`;
  const lightHeadingClass = `${MISSION_SECTION_HEADING_CLASS} mt-4 !text-[#FFF8EC]`;
  const bodyClass = `${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`;
  const cardTitleClass = "text-[15px] font-bold !text-[#2B2118]";
  const lightCardTitleClass = "text-[15px] font-bold !text-[#FFF8EC]";
  const cardTextClass = "text-sm leading-6 text-[#6F6255]";
  const lightCardTextClass = "text-sm leading-6 text-[#F8EAD2]";
  const smallLabelClass = "text-sm font-black uppercase tracking-[0.14em] text-[#C96F18] md:text-[15px]";
  const cardClass =
    "rounded-[26px] border border-[#E8D9BD] bg-white/88 p-6 shadow-[0_18px_42px_rgba(101,71,35,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(101,71,35,0.14)]";
  const inputClass =
    "w-full rounded-2xl border border-[#E8D9BD] bg-[#FFFDF8] px-4 py-3 text-sm text-[#2B2118] outline-none transition placeholder:text-[#9B8976] focus:border-[#D99A2B] focus:ring-4 focus:ring-[#F4A43C]/20";

  usePageMeta(
    "Shrimad Bhagwat Study Resources",
    "Authentic study material, shloka meanings, chapter-wise guidance and devotional learning resources for seekers, students and families.",
    "Shrimad Bhagwat Study Resources, Bhagwat Study Material, Bhagwat Shloka Meaning, Skandha Study Guide, Bhagwat Katha Topics",
  );

  return (
    <div className="-mx-6 -my-12 min-h-screen overflow-hidden bg-[#FFF8EC] text-[#2B2118]">
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="relative h-[430px] overflow-hidden rounded-[32px] shadow-[0_28px_72px_rgba(7,55,99,0.24)] md:h-[560px]">
          <img
            src={heroImage}
            alt="Open Shrimad Bhagwat scripture with devotional study setting"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,236,0.04),rgba(255,244,224,0.02)_42%,rgba(7,55,99,0.56))]" />
          <div className="relative z-10 flex h-full items-end justify-center px-5 pb-10 text-center md:pb-14">
            <div className="max-w-3xl">
              <h1 className="hero-title mb-3 text-4xl font-bold leading-tight !text-[#FFF8EC] drop-shadow-[0_4px_18px_rgba(7,55,99,0.45)] md:text-5xl">
                Bhagwat Study
              </h1>
              <p className="hero-subtitle mx-auto max-w-2xl text-lg text-[#FFECCB] drop-shadow-[0_3px_14px_rgba(7,55,99,0.48)] md:text-xl">
                Bhagwat a journey from self to divine
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#featured-resources" className="rounded-full bg-[#F4A43C] px-7 py-3 text-sm font-black text-[#073763] shadow-[0_18px_36px_rgba(244,164,60,0.32)] transition hover:-translate-y-0.5 hover:bg-[#FFD084]">
                  Start Study
                </a>
                <a href="#study-path" className="rounded-full border border-[#FFF4E0]/80 bg-white/10 px-7 py-3 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#073763]">
                  Explore Skandhas
                </a>
                <a
                  href="#featured-resources"
                  onClick={() => {
                    setResourceFilter("category", "Downloadable PDFs");
                    setResourceFilter("format", "PDF");
                  }}
                  className="rounded-full bg-[#D99A2B] px-7 py-3 text-sm font-black text-white shadow-[0_18px_36px_rgba(217,154,43,0.28)] transition hover:-translate-y-0.5 hover:bg-[#F4A43C]"
                >
                  Download Resources
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={labelClass}>About This Resource Center</p>
          <h2 className={headingClass}>A devotional study hub for clear Bhagwat learning</h2>
          <p className={`mt-5 ${bodyClass}`}>
            Learn with organized resources that support family satsang, student study, guided reading, youth learning and sincere personal sadhana.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {aboutCards.map((card) => (
            <article key={card.title} className={`${cardClass} text-center`}>
              <img src={`${resourceImageBase}${card.icon}`} alt={`${card.title} icon`} className="mx-auto h-20 w-20" loading="lazy" />
              <h3 className={`mt-5 ${cardTitleClass}`}>{card.title}</h3>
              <p className={`mt-3 ${cardTextClass}`}>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="rounded-[30px] border border-[#E8D9BD] bg-[#FFF4E0]/82 p-5 shadow-[0_20px_52px_rgba(101,71,35,0.10)] md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={labelClass}>Study Categories</p>
              <h2 className={headingClass}>Choose a focused Bhagwat learning route</h2>
            </div>
            <p className={`max-w-xl ${bodyClass}`}>
              Use chips to quickly narrow resources by study intent, then refine with search, language, skandha and format filters.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = resourceFilters.category === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setResourceFilter("category", category)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    isActive
                      ? "bg-[#073763] text-white shadow-[0_12px_26px_rgba(7,55,99,0.22)]"
                      : "border border-[#E8D9BD] bg-white/78 text-[#65584A] hover:border-[#F4A43C] hover:text-[#073763]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categoryFocusCards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => setResourceFilter("category", card.category)}
                className="rounded-[22px] border border-[#E8D9BD] bg-white/84 p-5 text-left shadow-[0_14px_34px_rgba(101,71,35,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#F4A43C] hover:shadow-[0_20px_48px_rgba(101,71,35,0.13)]"
              >
                <span className={smallLabelClass}>{card.category}</span>
                <h3 className={`mt-3 ${cardTitleClass}`}>{card.title}</h3>
                <p className={`mt-2 ${cardTextClass}`}>{card.text}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-resources" className={sectionClass}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={labelClass}>Featured Study Resources</p>
          <h2 className={headingClass}>Dynamic Bhagwat resources for reading, listening and satsang</h2>
        </div>

        <div className="mt-10 rounded-[28px] border border-[#E8D9BD] bg-white/82 p-5 shadow-[0_18px_42px_rgba(101,71,35,0.09)] md:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#C46D1A]">Search and Filter</span>
              <input
                type="search"
                placeholder="Search shloka, topic, skandha, chapter or resource..."
                value={resourceFilters.search}
                onChange={(event) => setResourceFilter("search", event.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#C46D1A]">Category</span>
              <select value={resourceFilters.category} onChange={(event) => setResourceFilter("category", event.target.value)} className={inputClass}>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#C46D1A]">Skandha</span>
              <select value={resourceFilters.skandha} onChange={(event) => setResourceFilter("skandha", event.target.value)} className={inputClass}>
                {skandhaOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#C46D1A]">Format</span>
              <select value={resourceFilters.format} onChange={(event) => setResourceFilter("format", event.target.value)} className={inputClass}>
                {formatOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="mt-4 block max-w-sm">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#C46D1A]">Language</span>
            <select value={resourceFilters.language} onChange={(event) => setResourceFilter("language", event.target.value)} className={inputClass}>
              {languageOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        {filteredResources.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredResources.map((resource) => (
              <article key={resource.title} className="group overflow-hidden rounded-[26px] border border-[#E8D9BD] bg-white shadow-[0_18px_42px_rgba(101,71,35,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(101,71,35,0.16)]">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${resourceImageBase}${resource.image}`}
                    alt={`${resource.title} visual`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#F4A43C] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#073763]">
                    {resource.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#073763] px-3 py-1 text-xs font-black text-white">{resource.format}</span>
                    <span className="rounded-full bg-[#DDEEDB] px-3 py-1 text-xs font-black text-[#073763]">{resource.language}</span>
                  </div>
                  <h3 className={`mt-4 leading-snug ${cardTitleClass}`}>{resource.title}</h3>
                  <p className={`mt-3 ${cardTextClass}`}>{resource.description}</p>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <a href="#join-study-circle" className="flex-1 rounded-full border border-[#D99A2B] px-4 py-2 text-center text-sm font-black text-[#9B5B14] transition hover:bg-[#FFF4E0]">
                      View Details
                    </a>
                    <a href="#join-study-circle" className="flex-1 rounded-full bg-[#F4A43C] px-4 py-2 text-center text-sm font-black text-[#073763] transition hover:bg-[#FFD084]">
                      {resource.format === "PDF" ? "Download" : "Start Reading"}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[26px] border border-dashed border-[#D99A2B] bg-[#FFF4E0] p-8 text-center shadow-[0_18px_42px_rgba(101,71,35,0.08)]">
            <p className={cardTitleClass}>No study resource found. Please try another search.</p>
          </div>
        )}
      </section>

      <section id="study-path" className={sectionClass}>
        <div className="rounded-[32px] bg-[#073763] p-6 shadow-[0_28px_70px_rgba(7,55,99,0.22)] md:p-8">
          <p className={`${MISSION_SECTION_LABEL_CLASS} !text-[#F4A43C]`}>Recommended Study Path</p>
          <h2 className={lightHeadingClass}>Move from Bhagwat reverence to living practice</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {studyPath.map((step, index) => (
              <article key={step.title} className="rounded-[22px] border border-white/12 bg-white/8 p-5 text-center shadow-[0_14px_34px_rgba(0,0,0,0.18)]">
                <img src={`${resourceImageBase}${step.icon}`} alt={`${step.title} icon`} className="mx-auto h-16 w-16 rounded-full" loading="lazy" />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-[#F4A43C]">Step {index + 1}</p>
                <h3 className={`mt-2 leading-6 ${lightCardTitleClass}`}>{step.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div id="join-study-circle" className={cardClass}>
            <p className={labelClass}>Join Bhagwat Study Circle</p>
            <h2 className={headingClass}>Receive guidance for structured Bhagwat learning</h2>
            <form onSubmit={handleStudyCircleSubmit} className="mt-6 grid gap-4">
              <input type="text" required placeholder="Full Name" value={studyCircleForm.fullName} onChange={(event) => setStudyCircleForm((form) => ({ ...form, fullName: event.target.value }))} className={inputClass} />
              <div className="grid gap-4 md:grid-cols-2">
                <input type="tel" required placeholder="Mobile Number" value={studyCircleForm.mobile} onChange={(event) => setStudyCircleForm((form) => ({ ...form, mobile: event.target.value }))} className={inputClass} />
                <input type="email" required placeholder="Email" value={studyCircleForm.email} onChange={(event) => setStudyCircleForm((form) => ({ ...form, email: event.target.value }))} className={inputClass} />
              </div>
              <input type="text" required placeholder="City" value={studyCircleForm.city} onChange={(event) => setStudyCircleForm((form) => ({ ...form, city: event.target.value }))} className={inputClass} />
              <div className="grid gap-4 md:grid-cols-2">
                <select required value={studyCircleForm.mode} onChange={(event) => setStudyCircleForm((form) => ({ ...form, mode: event.target.value }))} className={inputClass}>
                  <option value="">Preferred Study Mode</option>
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Both</option>
                </select>
                <select required value={studyCircleForm.interest} onChange={(event) => setStudyCircleForm((form) => ({ ...form, interest: event.target.value }))} className={inputClass}>
                  <option value="">Interest Area</option>
                  <option>Shloka Study</option>
                  <option>Bhagwat Katha</option>
                  <option>Children Learning</option>
                  <option>Youth Learning</option>
                  <option>Sanskrit Study</option>
                  <option>General Devotional Study</option>
                </select>
              </div>
              <textarea placeholder="Message" rows={4} value={studyCircleForm.message} onChange={(event) => setStudyCircleForm((form) => ({ ...form, message: event.target.value }))} className={`${inputClass} resize-none`} />
              {studyCircleNotice ? <p className="rounded-2xl bg-[#DDEEDB] px-4 py-3 text-sm font-bold text-[#073763]">{studyCircleNotice}</p> : null}
              <button type="submit" className="rounded-full bg-[#073763] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0A2F52]">
                Join Study Circle
              </button>
            </form>
          </div>

          <div className={cardClass}>
            <p className={labelClass}>Request a Resource</p>
            <h2 className={headingClass}>Ask for a topic, shloka note or study sheet</h2>
            <form onSubmit={handleResourceRequestSubmit} className="mt-6 grid gap-4">
              <input type="text" required placeholder="Name" value={resourceRequestForm.name} onChange={(event) => setResourceRequestForm((form) => ({ ...form, name: event.target.value }))} className={inputClass} />
              <input type="tel" required placeholder="Contact Number" value={resourceRequestForm.contact} onChange={(event) => setResourceRequestForm((form) => ({ ...form, contact: event.target.value }))} className={inputClass} />
              <input type="text" required placeholder="Resource Requested" value={resourceRequestForm.resource} onChange={(event) => setResourceRequestForm((form) => ({ ...form, resource: event.target.value }))} className={inputClass} />
              <input type="text" required placeholder="Preferred Language" value={resourceRequestForm.language} onChange={(event) => setResourceRequestForm((form) => ({ ...form, language: event.target.value }))} className={inputClass} />
              <textarea placeholder="Message" rows={5} value={resourceRequestForm.message} onChange={(event) => setResourceRequestForm((form) => ({ ...form, message: event.target.value }))} className={`${inputClass} resize-none`} />
              {resourceRequestNotice ? <p className="rounded-2xl bg-[#DDEEDB] px-4 py-3 text-sm font-bold text-[#073763]">{resourceRequestNotice}</p> : null}
              <button type="submit" className="rounded-full bg-[#F4A43C] px-6 py-3 text-sm font-black text-[#073763] transition hover:-translate-y-0.5 hover:bg-[#FFD084]">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="relative overflow-hidden rounded-[34px] border border-[#F0C77E] bg-[linear-gradient(105deg,#EA8A24_0%,#F5C948_48%,#FFE6BF_100%)] p-6 shadow-[0_24px_60px_rgba(193,116,31,0.18)] md:p-10">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.75)_1px,transparent_0)] [background-size:28px_28px]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
            <div>
              <p className={labelClass}>Knowledge Seva</p>
              <h2 className={headingClass}>Support the Bhagwat Knowledge Mission</h2>
              <p className={`mt-6 max-w-3xl ${bodyClass}`}>
                Your contribution helps us prepare, publish and distribute authentic Bhagwat study material for students, families, seekers and future generations.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to={ROUTES.donate} className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-[#2B2118] shadow-[0_14px_30px_rgba(111,78,25,0.10)] transition hover:-translate-y-0.5 hover:bg-[#FFF8EC]">
                Donate for Knowledge Seva
              </Link>
              <Link to={ROUTES.involved.sponsor} className="rounded-full border border-white/80 bg-white/20 px-6 py-3 text-center text-sm font-black text-[#2B2118] transition hover:-translate-y-0.5 hover:bg-white">
                Sponsor Study Material
              </Link>
              <Link to={ROUTES.volunteer} className="rounded-full border border-white/80 bg-white/20 px-6 py-3 text-center text-sm font-black text-[#2B2118] transition hover:-translate-y-0.5 hover:bg-white">
                Volunteer as Content Sevak
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );

});

export const KnowledgeChildrenPage = memo(function KnowledgeChildrenPage() {
  const [activeTrack, setActiveTrack] = useState<"All" | "Bal Sanskar" | "Primary" | "Teens" | "Family">("All");

  const childTracks = [
    {
      category: "Bal Sanskar" as const,
      title: "Early Bal Sanskar Foundations",
      desc: "Simple prayers, moral habits, greeting culture, and joyful devotional exposure for young children.",
      format: "Story, prayer, and activity cards",
    },
    {
      category: "Primary" as const,
      title: "Primary Spiritual Learning Track",
      desc: "Age-friendly katha stories, memory verses, value-building games, and temple culture understanding.",
      format: "Weekly guided modules",
    },
    {
      category: "Teens" as const,
      title: "Youth Transition and Character Track",
      desc: "Dharmic decision-making, discipline, seva responsibility, and confidence-building through guided discussions.",
      format: "Reflection and mentor sessions",
    },
    {
      category: "Family" as const,
      title: "Family Satsang Participation Track",
      desc: "Home-based parent-child learning activities that strengthen shared spiritual habits and respectful conduct.",
      format: "Family routines and practice plans",
    },
  ];

  const visibleTracks = activeTrack === "All" ? childTracks : childTracks.filter((item) => item.category === activeTrack);

  const dailyFocus = [
    {
      day: "Sunday",
      title: "Family Satsang Day",
      desc: "Read one short katha story together, offer prarthana, and discuss one value children can practice this week.",
    },
    {
      day: "Monday",
      title: "Prayer and Discipline Day",
      desc: "Start the week with morning prayer, respectful speech practice, and one simple seva task at home.",
    },
    {
      day: "Tuesday",
      title: "Courage and Character Day",
      desc: "Teach one inspiring story of dharma and ask children how they can show honesty and courage in daily life.",
    },
    {
      day: "Wednesday",
      title: "Memory and Recitation Day",
      desc: "Revise one shlok, one bhajan line, or one spiritual quote with gentle repetition and encouragement.",
    },
    {
      day: "Thursday",
      title: "Guru and Gratitude Day",
      desc: "Offer gratitude to parents, teachers, and gurus while practicing humility and attentive listening.",
    },
    {
      day: "Friday",
      title: "Creative Devotion Day",
      desc: "Use drawing, storytelling, or role-play to help children connect joyful learning with spiritual values.",
    },
    {
      day: "Saturday",
      title: "Temple and Seva Day",
      desc: "Prepare children for mandir discipline, seva participation, and respectful interaction with the community.",
    },
  ][new Date().getDay()];

  usePageMeta(
    "Children Spiritual Learning",
    "Child-focused spiritual learning with bal sanskar modules, family participation, age-wise tracks, and guided devotional practice.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Children Spiritual Learning"
        subtitle="Bal Sanskar today, strong character tomorrow"
        subtitleClassName="text-[18px] font-semibold text-white sm:text-[24px] md:text-[34px]"
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772915579/children_hrarip.jpg"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.knowledge.pathshala}
            className="inline-flex items-center rounded-lg bg-[#f3a11f] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] transition-colors hover:bg-[#ffaf31]"
          >
            Join Bal Sanskar Path
          </Link>
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center rounded-lg bg-[#0f7994] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(15,121,148,0.28)] transition-colors hover:bg-[#1492b1]"
          >
            Connect With Mentor
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Age Tracks", value: "4", note: "Bal sanskar, primary, teens, and family participation routes" },
              { title: "Learning Style", value: "Story + Practice", note: "Children learn through stories, prayer, action, and repetition" },
              { title: "Family Role", value: "Active", note: "Parents are included as learning partners and spiritual anchors" },
              { title: "Weekly Rhythm", value: "7 Day", note: "Simple daily habits designed for steady sanskar development" },
            ].map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>{item.title}</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>About Children Spiritual Learning</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Joyful sanskar learning guided by family, prayer, and daily practice</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Story-Led Value Learning",
                desc: "Children absorb spiritual values more naturally through stories, examples, songs, and guided discussion.",
              },
              {
                title: "Family Participation Model",
                desc: "Parents become part of the learning journey so sanskar continues at home and not only during class time.",
              },
              {
                title: "Age-Appropriate Growth",
                desc: "The page separates early years, school-age learners, and teens so guidance stays practical and relevant.",
              },
            ].map((item) => (
              <div key={item.title} className={EVENT_SEVA_CARD_CLASS}>
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={SEVA_SECTION_LABEL_CLASS}>Children Learning Journey Explorer</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>Choose the most suitable track by age and family role</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Bal Sanskar", "Primary", "Teens", "Family"] as const).map((track) => {
                const active = track === activeTrack;
                return (
                  <button
                    key={track}
                    type="button"
                    onClick={() => setActiveTrack(track)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[var(--campaign-accent)] text-white"
                        : "border border-white/10 bg-[var(--campaign-surface)] text-[var(--campaign-text)] hover:border-[var(--campaign-accent)]/40"
                    }`}
                  >
                    {track}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {visibleTracks.map((item) => (
              <div key={item.title} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--campaign-accent)]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--campaign-text)]">
                    {item.format}
                  </span>
                </div>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
              <p className={SEVA_SECTION_LABEL_CLASS}>Weekly Sanskar Routine</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>A practical family rhythm for prayer, story, action, and reflection</h2>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    step: "1. Prayer Start",
                    desc: "Begin with a short prayer, folded hands, and a calm one-minute devotional focus.",
                  },
                  {
                    step: "2. Story Time",
                    desc: "Read or narrate one dharmic story that teaches truth, compassion, respect, or seva.",
                  },
                  {
                    step: "3. Practice Action",
                    desc: "Choose one small value-based action for the child to practice during the day or week.",
                  },
                  {
                    step: "4. Family Reflection",
                    desc: "End with one gratitude thought and a simple parent-child discussion about what was learned.",
                  },
                ].map((item) => (
                  <div key={item.step} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-5">
                    <h3 className="text-xl font-black text-white">{item.step}</h3>
                    <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
          </div>

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
              <p className={SEVA_SECTION_LABEL_CLASS}>Today&apos;s Focus</p>
              <h3 className={SEVA_SECTION_HEADING_CLASS}>{dailyFocus.title}</h3>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{dailyFocus.day}</p>

              <div className="mt-8 grid grid-cols-1 gap-3">
                {[
                  "Short daily practice for home use",
                  "Family-friendly and child-safe learning rhythm",
                  "Designed for both beginners and regular satsang families",
                ].map((line) => (
                  <div key={line} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] px-4 py-3 text-base font-semibold text-[var(--campaign-text)]">
                    {line}
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-2 gap-6`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Page Support</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>What this page adds for children and families</h3>
            <ul className={`mt-5 space-y-3 ${SEVA_BODY_TEXT_CLASS}`}>
              {[
                "Age-wise learning tracks for better guidance clarity",
                "A child-focused explorer instead of a static placeholder section",
                "A real weekly family use routine for practical sanskar building",
                "Family mentorship and Pathshala support actions",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Start Children Learning Support</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Connect home learning, mentors, and Pathshala routes</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Home Start", amount: "Family Ready" },
                { label: "Guided Track", amount: "Mentor Supported" },
                { label: "Pathshala Route", amount: "Joinable" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{tier.label}</p>
                  <p className="mt-2 text-2xl font-black text-white">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={ROUTES.knowledge.pathshala}
                className="inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
              >
                Join Pathshala
              </Link>
              <Link
                to={ROUTES.knowledge.library}
                className="inline-flex rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
              >
                Open Library
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const KnowledgeDailyQuotesPage = memo(function KnowledgeDailyQuotesPage() {
  const [archiveQuotes, setArchiveQuotes] = useState<DailyQuoteEntry[]>([]);
  const [todayQuote, setTodayQuote] = useState<DailyQuoteEntry | null>(null);
  const [activeTheme, setActiveTheme] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const themeFilters = [
    "All",
    "Bhakti",
    "Seva",
    "Discipline",
    "Dharma",
    "Sanskar",
    "Guru Bhakti",
    "Youth Inspiration",
    "Family Values",
  ];
  const sectionLabelClass = "text-sm font-black uppercase tracking-[0.14em] text-[#C96F18] md:text-[15px]";
  const sectionHeadingClass = `${MISSION_SECTION_HEADING_CLASS} !text-[#2B2118]`;
  const sectionBodyClass = `${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`;
  const cardTitleClass = "text-[15px] font-bold !text-[#2B2118]";
  const cardTextClass = "text-sm leading-6 text-[#6F6255]";

  useEffect(() => {
    let active = true;

    const loadQuotes = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const [publicResponse, todayResponse] = await Promise.all([
          quotesApi.getPublic({ page: 1, limit: 100 }),
          quotesApi.getToday(),
        ]);

        if (!active) return;

        const publicItems = sortQuotes(publicResponse.data.items.length > 0 ? publicResponse.data.items : DEFAULT_DAILY_QUOTES);
        setArchiveQuotes(publicItems);
        setTodayQuote(todayResponse.data ?? publicItems[0] ?? DEFAULT_DAILY_QUOTES[0] ?? null);
      } catch {
        if (!active) return;
        const fallback = sortQuotes(DEFAULT_DAILY_QUOTES);
        setArchiveQuotes(fallback);
        setTodayQuote(fallback[0] ?? null);
        setErrorMessage("Quote service is temporarily unavailable. Showing devotional fallback reflections.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadQuotes();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeTheme, searchTerm]);

  useEffect(() => {
    if (!copyMessage) return;
    const timer = window.setTimeout(() => setCopyMessage(""), 1800);
    return () => window.clearTimeout(timer);
  }, [copyMessage]);

  const filteredQuotes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return archiveQuotes.filter((item) => {
      const matchesTheme = activeTheme === "All" || item.theme === activeTheme;
      if (!matchesTheme) return false;
      if (!query) return true;
      return [item.quoteText, item.theme, item.publishDate, item.source, item.author ?? ""].some((field) =>
        field.toLowerCase().includes(query),
      );
    });
  }, [activeTheme, archiveQuotes, searchTerm]);

  const pagedQuotes = filteredQuotes.slice(0, visibleCount);
  const hasMoreQuotes = visibleCount < filteredQuotes.length;

  const copyQuote = async (quote: DailyQuoteEntry) => {
    const text = `"${quote.quoteText}"\nTheme: ${quote.theme}\nDate: ${quote.publishDate}\nSource: ${quote.source}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage("Quote copied");
    } catch {
      setCopyMessage("Copy failed");
    }
  };

  const shareQuote = async (quote: DailyQuoteEntry) => {
    const shareTitle = quote.title || "Daily Spiritual Quote";
    const shareText = `"${quote.quoteText}"\nTheme: ${quote.theme}\nDate: ${quote.publishDate}\nSource: ${quote.source}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: `${window.location.origin}${ROUTES.knowledge.dailyQuotes}`,
        });
        return;
      }

      await navigator.clipboard.writeText(`${shareTitle}\n${shareText}`);
      setCopyMessage("Share text copied");
    } catch {
      setCopyMessage("Share cancelled");
    }
  };

  const formatDisplayDate = (dateText?: string) => {
    if (!dateText) return "";
    const parsed = new Date(dateText);
    if (Number.isNaN(parsed.getTime())) return dateText;
    return parsed.toISOString().slice(0, 10);
  };

  usePageMeta(
    "Daily Spiritual Quotes",
    "Read daily Bhagwat-inspired spiritual quotes on devotion, seva, dharma, discipline, sanskar, and inner peace from Bhagwat Heritage Service Foundation Trust.",
    "Daily Spiritual Quotes, Bhagwat Quotes, Bhakti Quotes, Seva Quotes, Dharma Quotes, Sanskar Quotes, Bhagwat Heritage",
  );

  return (
    <div className="min-h-screen bg-[#f7f1e4] text-[#4f3521]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
        <section
          className="relative overflow-hidden rounded-[34px] border border-[#e7d3ae] bg-cover bg-center shadow-[0_22px_54px_rgba(86,58,28,0.18)]"
          style={{ backgroundImage: "url('/images/daily-spiritual-quotes-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(71,40,11,0.70),rgba(180,114,28,0.58),rgba(8,83,90,0.48))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(247,220,151,0.28),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(255,240,194,0.22),transparent_40%)]" />
          <div className="relative z-10 flex min-h-[340px] flex-col items-center justify-center px-6 py-10 text-center md:min-h-[480px]">
            <p className={`${sectionLabelClass} !text-[#f7ddb0]`}>Bhagwat Daily Wisdom</p>
            <h1 className="hero-title mb-3 mt-3 text-4xl font-bold leading-tight !text-[#fff8ea] md:text-5xl">Daily Spiritual Quotes</h1>
            <p className={`${MISSION_BODY_TEXT_CLASS} mt-2 max-w-3xl !text-[#f4e9d0]`}>
              Daily reflections from Bhagwat wisdom for inner peace, devotion, discipline, and spiritual remembrance.
            </p>
            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to={ROUTES.knowledge.dailyQuotesToday}
                className="inline-flex min-w-[210px] items-center justify-center rounded-full bg-[#dc8d20] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(220,141,32,0.35)] transition hover:bg-[#c17a18]"
              >
                View Today&apos;s Quote
              </Link>
              <a
                href="#quote-archive"
                className="inline-flex min-w-[210px] items-center justify-center rounded-full bg-[#0f7b80] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(15,123,128,0.35)] transition hover:bg-[#0d696d]"
              >
                Explore Quote Archive
              </a>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_41_57_AM_wsv00f.png",
              title: "Today’s Reflection",
              desc: "Read today’s highlighted Bhagwat quote with source, date, and devotional context.",
            },
            {
              icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032974/ChatGPT_Image_Apr_24_2026_05_42_39_PM_hoklrs.png",
              title: "Theme-wise Quotes",
              desc: "Explore quotes by themes like Bhakti, Seva, Discipline, Sanskar, and Dharma.",
            },
            {
              icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g10_db02lr.png",
              title: "Public Archive",
              desc: "Access earlier published quotes in a searchable and filter-ready devotional archive.",
            },
            {
              icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776838096/v3_ysaljs.png",
              title: "Admin Managed Publishing",
              desc: "Authorized admins publish quotes in dashboard and updates appear automatically here.",
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-[#ead8b7] bg-[#fff8ec] p-5 shadow-[0_12px_24px_rgba(72,48,21,0.10)]"
            >
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#e2c792] bg-[#fffaf0] shadow-[0_6px_12px_rgba(115,83,39,0.10)]">
                <img
                  src={feature.icon}
                  alt={`${feature.title} icon`}
                  className="h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className={`mt-4 ${cardTitleClass}`}>{feature.title}</h3>
              <p className={`mt-2 ${cardTextClass}`}>{feature.desc}</p>
            </article>
          ))}
        </section>

        <section id="todays-quote" className="mt-10 rounded-[30px] border border-[#ecd7b2] bg-[#fff9ef] p-6 shadow-[0_16px_30px_rgba(88,56,24,0.12)] md:p-8">
          <p className={sectionLabelClass}>Featured Daily Reflection</p>
          <h2 className={`${sectionHeadingClass} mt-2`}>Today’s Spiritual Quote</h2>
          <p className={`${sectionBodyClass} mt-5 !text-lg !leading-8 md:!text-xl`}>
            &quot;{todayQuote?.quoteText || "Where remembrance of Bhagwan becomes steady, the mind slowly becomes peaceful and the heart becomes gentle."}&quot;
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-[#f2d5a2] px-4 py-2 font-bold text-[#7a4a17]">Theme: {todayQuote?.theme || "Bhakti"}</span>
            <span className="rounded-full bg-[#e7f2ef] px-4 py-2 font-semibold text-[#1d6163]">Date: {formatDisplayDate(todayQuote?.publishDate) || "2026-03-08"}</span>
            <span className="rounded-full bg-[#efdfc7] px-4 py-2 font-semibold text-[#6c4628]">Source: {todayQuote?.source || "Bhagwat Reflection Desk"}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => todayQuote && copyQuote(todayQuote)}
              className="inline-flex items-center gap-2 rounded-full bg-[#f3e2bf] px-5 py-3 text-sm font-bold text-[#6f451e] transition hover:bg-[#edd6a7]"
            >
              <img src="/icons/icon-copy-quote.svg" alt="" className="h-4 w-4" />
              Copy Quote
            </button>
            <button
              type="button"
              onClick={() => todayQuote && shareQuote(todayQuote)}
              className="inline-flex items-center gap-2 rounded-full bg-[#d8ece7] px-5 py-3 text-sm font-bold text-[#1b6766] transition hover:bg-[#c9e4dd]"
            >
              <img src="/icons/icon-share-quote.svg" alt="" className="h-4 w-4" />
              Share Quote
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTheme("Bhakti");
                document.getElementById("quote-archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center rounded-full bg-[#b9782a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9f651f]"
            >
              View More Bhakti Quotes
            </button>
          </div>
          {copyMessage ? <p className="mt-3 text-sm font-semibold text-[#8c591f]">{copyMessage}</p> : null}
        </section>

        <section className="mt-10">
          <p className={sectionLabelClass}>Browse by Themes</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {themeFilters.map((theme) => {
              const active = theme === activeTheme;
              return (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setActiveTheme(theme)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active ? "bg-[#c7832f] text-white" : "bg-[#fff8ed] text-[#6b482c] border border-[#e7d4b2] hover:bg-[#f8eddb]"
                  }`}
                >
                  {theme}
                </button>
              );
            })}
          </div>
        </section>

        <section id="quote-archive" className="mt-8 rounded-[30px] border border-[#ead4ad] bg-[#fffaf2] p-6 shadow-[0_16px_30px_rgba(88,56,24,0.10)] md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={sectionLabelClass}>Public Quote Archive</p>
              <h2 className={`${sectionHeadingClass} mt-2`}>Search and Explore Reflections</h2>
            </div>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search quotes by keyword, theme, or date..."
              className="w-full rounded-2xl border border-[#dfcba7] bg-white px-4 py-3 text-sm font-medium text-[#5b3f28] outline-none transition focus:border-[#c7832f] md:max-w-md"
            />
          </div>

          {loading ? (
            <div className="mt-8 rounded-2xl border border-[#ecdabd] bg-[#fdf3de] p-5 text-sm font-semibold text-[#7e541f]">Loading quotes...</div>
          ) : null}
          {!loading && errorMessage ? (
            <div className="mt-8 rounded-2xl border border-[#f2cba8] bg-[#fff2e4] p-5 text-sm font-semibold text-[#9b4e18]">{errorMessage}</div>
          ) : null}
          {!loading && !errorMessage && filteredQuotes.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-[#ecdabd] bg-[#fdf3de] p-5 text-sm font-semibold text-[#7e541f]">
              No quotes found for this filter. Try another theme or search phrase.
            </div>
          ) : null}

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pagedQuotes.map((item) => (
              <article key={item._id ?? `${item.theme}-${item.publishDate}-${item.quoteText.slice(0, 24)}`} className="rounded-3xl border border-[#e8d4b3] bg-white p-5 shadow-[0_10px_20px_rgba(88,56,24,0.08)]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#f2d5a2] px-3 py-1 text-xs font-bold text-[#7a4a17]">{item.theme}</span>
                  <span className="rounded-full bg-[#e8f3ef] px-3 py-1 text-xs font-semibold text-[#1f6261]">{formatDisplayDate(item.publishDate)}</span>
                </div>
                <p className={`mt-4 ${sectionBodyClass}`}>&quot;{item.quoteText}&quot;</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#8a6846]">Source: {item.source || "Bhagwat Reflection Desk"}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button type="button" onClick={() => copyQuote(item)} className="inline-flex items-center gap-1 rounded-full bg-[#f4e3c1] px-3 py-2 text-xs font-bold text-[#74491f] transition hover:bg-[#efd7aa]">
                    <img src="/icons/icon-copy-quote.svg" alt="" className="h-3.5 w-3.5" />
                    Copy
                  </button>
                  <button type="button" onClick={() => shareQuote(item)} className="inline-flex items-center gap-1 rounded-full bg-[#d9ebe8] px-3 py-2 text-xs font-bold text-[#1b6565] transition hover:bg-[#cce4df]">
                    <img src="/icons/icon-share-quote.svg" alt="" className="h-3.5 w-3.5" />
                    Share
                  </button>
                </div>
              </article>
            ))}
          </div>

          {!loading && hasMoreQuotes ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + 6)}
                className="inline-flex items-center rounded-full bg-[#0f7b80] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0d696d]"
              >
                Load More
              </button>
            </div>
          ) : null}
        </section>

        <section className="mt-10 rounded-[30px] border border-[#ead2a8] bg-[linear-gradient(135deg,#fff9ef,#f2e5cf)] p-6 shadow-[0_16px_30px_rgba(88,56,24,0.11)] md:p-8">
          <p className={sectionLabelClass}>Admin Quote Publishing Flow</p>
          <h2 className={`${sectionHeadingClass} mt-2`}>CMS-ready Daily Quote Management</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              "Admins can publish daily quotes from admin dashboard.",
              "Quotes can be categorized by theme for easy public filtering.",
              "Published quotes appear automatically in today’s section and archive.",
              "Old quotes remain safely available in public archive.",
            ].map((line) => (
              <div key={line} className="rounded-2xl bg-white/80 p-4 text-sm font-semibold text-[#5e3f24]">
                {line}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link to="/admin/login" className="inline-flex items-center rounded-full bg-[#0f7b80] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0d696d]">
              Admin Login
            </Link>
          </div>
        </section>

        <section
          className="relative mt-10 overflow-hidden rounded-[32px] border border-[#e8d2aa] shadow-[0_20px_40px_rgba(86,58,28,0.16)]"
          style={{
            backgroundColor: "#FFF8EC",
            backgroundImage:
              "radial-gradient(circle at 8% 8%, rgba(244,164,60,0.16), transparent 26rem), radial-gradient(circle at 92% 18%, rgba(7,55,99,0.10), transparent 24rem), radial-gradient(circle at 22% 88%, rgba(221,238,219,0.92), transparent 24rem)",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,248,236,0.70),rgba(255,248,236,0.55),rgba(255,248,236,0.72))]" />
          <div className="relative z-10 px-6 py-12 text-center md:px-10 md:py-16">
            <h2 className="hero-title text-4xl font-bold leading-tight !text-[#114266] md:text-5xl">Begin Every Day with Spiritual Remembrance</h2>
            <p className={`${MISSION_BODY_TEXT_CLASS} mx-auto mt-3 max-w-2xl text-[#5a3e22]`}>
              Read, reflect, share, and preserve daily Bhagwat-inspired wisdom.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to={ROUTES.knowledge.dailyQuotesToday} className="inline-flex min-w-[210px] items-center justify-center rounded-full bg-[#dc8d20] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c17a18]">
                Read Today’s Quote
              </Link>
              <button type="button" onClick={() => todayQuote && shareQuote(todayQuote)} className="inline-flex min-w-[210px] items-center justify-center rounded-full bg-[#0f7b80] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0d696d]">
                Share with Devotees
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

export const KnowledgeTodayQuotePage = memo(function KnowledgeTodayQuotePage() {
  const [featuredQuote, setFeaturedQuote] = useState<DailyQuoteEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadTodayQuote = async () => {
      try {
        const response = await quotesApi.getToday();
        if (!active) return;
        setFeaturedQuote(response.data ?? DEFAULT_DAILY_QUOTES[0] ?? null);
      } catch {
        if (!active) return;
        setFeaturedQuote(DEFAULT_DAILY_QUOTES[0] ?? null);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadTodayQuote();
    return () => {
      active = false;
    };
  }, []);

  usePageMeta(
    "Today Quote",
    "A devotional daily quote view with an immersive featured reflection design for devotees.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/der8zinu8/image/upload/v1774775572/quotes_kdamdm.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,15,21,0.72)_0%,rgba(8,31,43,0.7)_45%,rgba(5,18,27,0.82)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center px-4 py-10 md:py-16">
          <div className="w-full rounded-[32px] border border-white/10 bg-black/40 p-6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-10 lg:p-14">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Today&apos;s Spiritual Quote</p>
            <h1 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Today Quote</h1>

            <p className="mx-auto mt-8 max-w-4xl text-3xl font-semibold leading-[1.6] text-white md:text-5xl md:leading-[1.45]">
              {loading ? "Loading today’s reflection..." : `“${featuredQuote?.quoteText || "A new spiritual quote will appear here soon."}”`}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-[var(--campaign-accent)]/15 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--campaign-accent)]">
                {featuredQuote?.theme || "Daily Reflection"}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--campaign-text)]">
                {featuredQuote?.publishDate ? new Date(featuredQuote.publishDate).toISOString().slice(0, 10) : ""}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--campaign-text)]">
                {featuredQuote?.source || "Bhagwat Reflection Desk"}
              </span>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                to={ROUTES.knowledge.dailyQuotes}
                className="inline-flex items-center rounded-xl bg-[var(--campaign-accent)] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
              >
                Back to Quotes Page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const MandirAvatarsPage = memo(function MandirAvatarsPage() {
  const [activeZone, setActiveZone] = useState<"All" | "Cosmic" | "Dharma" | "Bhakti" | "Protection">("All");

  const installationZones = [
    {
      category: "Cosmic" as const,
      title: "Cosmic Origin Zone",
      avatars: "Matsya, Kurma, Varaha and creation-preserving forms",
      desc: "This zone presents the avatars connected with protection of cosmic order, rescue, stabilization, and the preservation of divine balance.",
      experience: "Water, earth, and emergence-themed storytelling panels with guided spiritual notes.",
    },
    {
      category: "Protection" as const,
      title: "Divine Protection Zone",
      avatars: "Narasimha and other crisis-response manifestations",
      desc: "The focus here is divine intervention during moments of fear, injustice, and threat to devotees or dharma.",
      experience: "Higher-contrast lighting, powerful inscriptions, and contemplation points around divine courage.",
    },
    {
      category: "Dharma" as const,
      title: "Dharma Restoration Zone",
      avatars: "Vamana, Parashurama, Rama and justice-centered manifestations",
      desc: "This installation layer emphasizes maryada, truth, righteous kingship, discipline, and the restoration of sacred social order.",
      experience: "Narrative panels for youth learning, family reading, and guided temple explanation.",
    },
    {
      category: "Bhakti" as const,
      title: "Bhakti and Lila Zone",
      avatars: "Krishna, Balarama and devotion-centered manifestations",
      desc: "This area is designed to feel emotionally devotional, highlighting lila, love, satsang, and spiritual intimacy with Bhagwan.",
      experience: "Softer visual treatment with kirtan-linked reflection points and family-friendly interpretation boards.",
    },
    {
      category: "Dharma" as const,
      title: "Wisdom and Teaching Zone",
      avatars: "Instructional and reformative manifestations",
      desc: "This zone explains how divine descent also teaches, reforms, and guides society toward higher understanding and dharmic living.",
      experience: "Teacher-led walkthrough support and knowledge-linked QR interpretation concept.",
    },
    {
      category: "Protection" as const,
      title: "Future Hope Zone",
      avatars: "Transformative and future-restoring manifestations",
      desc: "The final section symbolizes continuity, hope, and divine assurance that restoration remains part of the cosmic spiritual rhythm.",
      experience: "Conclusion wall, prayer pause point, and guided exit toward reflection and seva commitment.",
    },
  ];

  const visibleZones =
    activeZone === "All" ? installationZones : installationZones.filter((item) => item.category === activeZone);

  usePageMeta(
    "24 Avatars Installation",
    "Temple installation concept for 24 avatars with darshan flow, interpretation zones, devotional education features, and support pathways.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="24 Avatars Installation"
        subtitle="A sacred installation concept designed to guide devotees through divine manifestations, darshan meaning, and spiritual reflection"
        backgroundImage="/images/spiritual1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.involved.sponsor}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Support Installation
          </Link>
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Request Details
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Manifestations", value: "24", note: "A complete avatar installation concept rooted in darshan and interpretation" },
              { title: "Interpretation Zones", value: "6", note: "Grouped to make the installation easier to understand and experience" },
              { title: "Learning Layer", value: "Guided", note: "Supports children, families, satsang groups, and temple explanation routes" },
              { title: "Visitor Flow", value: "Sequential", note: "Designed as a proper mandir journey instead of a static sculpture corridor" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 p-4 shadow-lg backdrop-blur-sm">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About 24 Avatars Installation</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            This page should do more than say the installation is planned. It should explain how the 24 avatars are being
            presented, why the route matters spiritually, and how devotees will move through the installation with
            understanding instead of only visual observation.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            I updated it as a concept-driven experience page with interpretation zones, darshan flow, family learning
            value, and support actions because this installation is both spiritual art and a teaching environment.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Sacred Narrative Design",
                desc: "The installation can be understood as a divine story path, not just separate murti placements.",
              },
              {
                title: "Temple Learning Feature",
                desc: "Families, children, and guided satsang groups need interpretation support as they move through the route.",
              },
              {
                title: "Darshan With Meaning",
                desc: "Every avatar should connect to one spiritual teaching, one dharmic value, and one reflective takeaway.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">New Feature</p>
              <h2 className="mt-2 text-5xl font-black text-white">Avatar Installation Explorer</h2>
              <p className="mt-3 max-w-3xl text-[#d4e1e8] text-lg leading-7">
                Explore the installation concept by spiritual zone. This makes the page more useful for design review,
                donor understanding, and devotee orientation before visiting the final space.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Cosmic", "Dharma", "Bhakti", "Protection"] as const).map((zone) => {
                const active = zone === activeZone;
                return (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => setActiveZone(zone)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {zone}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {visibleZones.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    {item.avatars}
                  </span>
                </div>
                <h3 className="text-white text-2xl font-black mt-4">{item.title}</h3>
                <p className="text-[#d4e1e8] mt-3 text-lg leading-7">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#0f2c3d] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">Visitor Experience</p>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#09202d] to-[#081925] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#153446] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Concept Blueprint</p>
            <h2 className="mt-2 text-4xl font-black text-white">Installation Features I Added</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Sequential Darshan Path",
                  desc: "Visitors move through the avatar story in a meaningful order instead of seeing unrelated visual points.",
                },
                {
                  title: "Teaching Plaque System",
                  desc: "Each avatar can carry short interpretation notes to support guided reading and temple education.",
                },
                {
                  title: "Family Learning Stops",
                  desc: "Children and families need pause points where the meaning of each cluster can be explained simply.",
                },
                {
                  title: "Festival Integration",
                  desc: "The installation can connect with special discourses, guided tours, and temple festival programming.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Darshan Flow</p>
            <h3 className="mt-3 text-4xl font-black">Guided Visitor Journey</h3>
            <div className="mt-6 space-y-4">
              {[
                "Arrival orientation with a brief explanation of the 24 avatar concept.",
                "Sequential movement through grouped avatar zones with visual and spiritual context.",
                "Reflection pause areas for prayer, understanding, and family discussion.",
                "Exit linked to seva, sponsorship, and deeper mandir learning routes.",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white/75">Step {index + 1}</p>
                  <p className="mt-1 text-lg text-white/95">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h3 className="text-4xl font-black text-white mb-5">Support and Planning Tracks</h3>
            <ul className="space-y-3 text-[#d4e1e8] text-xl">
              {[
                "Murti and sculptural installation sponsorship support",
                "Plaque, inscription, and interpretation board planning",
                "Lighting, path, and visitor guidance infrastructure",
                "Temple-led educational walkthrough and volunteer guide training",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Participate in the Installation Vision</h3>
            <p className="text-xl text-white/95 mb-6">
              This page is now structured for devotees, sponsors, and temple planners who want to understand and support the
              24 avatars installation as a sacred long-term mandir experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Visitor Planning", amount: "Guided" },
                { label: "Sponsor Track", amount: "Available" },
                { label: "Design Vision", amount: "Concept Ready" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.involved.sponsor} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Sponsor This Vision
              </Link>
              <Link to={ROUTES.contact} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Talk to Temple Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const MandirConstructionPage = memo(function MandirConstructionPage() {
  const [activePhase, setActivePhase] = useState<"All" | "Planning" | "Structural" | "Sacred" | "Visitor">("All");

  const constructionPhases = [
    {
      category: "Planning" as const,
      title: "Concept Planning and Site Readiness",
      desc: "This phase covers sacred layout thinking, space allocation, movement planning, and project readiness before major construction progress begins.",
      updates: "Masterplan alignment, zoning logic, access planning, and early structural preparation.",
    },
    {
      category: "Structural" as const,
      title: "Core Structural Development",
      desc: "The construction page should explain how foundational and primary mandir structures are progressing toward usable sacred and community space.",
      updates: "Base structure work, load-bearing progress, framework milestones, and project stability direction.",
    },
    {
      category: "Sacred" as const,
      title: "Mandir Detail and Sacred Zone Buildout",
      desc: "This layer focuses on the devotional identity of the mandir through sanctified spaces, darshan alignment, and worship-linked readiness planning.",
      updates: "Garbhagruh preparation, darshan-facing details, sacred pathways, and ritual-space planning.",
    },
    {
      category: "Visitor" as const,
      title: "Pilgrim and Public Access Infrastructure",
      desc: "Temple construction should also show how devotees, families, and yatris will be served through practical infrastructure and movement support.",
      updates: "Queue lines, approach paths, help points, family movement, and visitor support readiness.",
    },
    {
      category: "Sacred" as const,
      title: "Installation and Spiritual Interpretation Layer",
      desc: "As the site grows, construction must connect with spiritual teaching elements, installations, and explanatory features that deepen the mandir experience.",
      updates: "Interpretation areas, installation planning, devotional signage, and sacred narrative support.",
    },
    {
      category: "Visitor" as const,
      title: "Operational Readiness and Seva Systems",
      desc: "This final stage is not only about completion but about making the mandir ready for disciplined daily operation, festivals, and volunteer coordination.",
      updates: "Support desks, seva flow, crowd management points, and event-readiness systems.",
    },
  ];

  const visiblePhases =
    activePhase === "All" ? constructionPhases : constructionPhases.filter((item) => item.category === activePhase);

  usePageMeta(
    "Temple Construction Updates",
    "Construction milestones, phase-wise development, mandir readiness planning, and support opportunities for Bhagwat Dham temple development.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Temple Construction Updates"
        subtitle="Construction progress, mandir development phases, milestone tracking, and support pathways for Bhagwat Dham"
        backgroundImage="/images/hanuman4.JPG"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Support Construction
          </Link>
          <Link
            to={ROUTES.involved.sponsor}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Sponsor Temple Work
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Update Format", value: "Phase-Wise", note: "Construction information is now structured around clear development stages" },
              { title: "Milestone Areas", value: "6", note: "Planning, structure, sacred zones, installations, and visitor readiness" },
              { title: "Project Lens", value: "Mandir + Public", note: "The page covers both sacred development and devotee-facing usability" },
              { title: "Support Route", value: "Open", note: "Devotees can connect support directly with temple development progress" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 p-4 shadow-lg backdrop-blur-sm">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Temple Construction Updates</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            A construction page should not remain vague. Devotees want to understand what is being built, how the mandir is progressing, and where the project is moving next.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            I updated this page to explain the temple development journey in a more structured way, with clearer phase-based information, public understanding, and support direction.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Visible Project Clarity",
                desc: "The page now explains what kind of construction work is happening instead of staying generic.",
              },
              {
                title: "Devotee-Focused Updates",
                desc: "Construction is presented from the perspective of how it will improve darshan, satsang, and visitor experience.",
              },
              {
                title: "Support-Linked Progress",
                desc: "This page now gives a clearer bridge between construction updates and sponsor or donor participation.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">New Feature</p>
              <h2 className="mt-2 text-5xl font-black text-white">Construction Phase Explorer</h2>
              <p className="mt-3 max-w-3xl text-[#d4e1e8] text-lg leading-7">
                Filter the construction story by project phase so devotees can better understand how Bhagwat Dham is evolving from plan to sacred public space.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Planning", "Structural", "Sacred", "Visitor"] as const).map((phase) => {
                const active = phase === activePhase;
                return (
                  <button
                    key={phase}
                    type="button"
                    onClick={() => setActivePhase(phase)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {phase}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {visiblePhases.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    Construction Update
                  </span>
                </div>
                <h3 className="text-white text-2xl font-black mt-4">{item.title}</h3>
                <p className="text-[#d4e1e8] mt-3 text-lg leading-7">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#0f2c3d] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">Current Focus</p>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.updates}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#09202d] to-[#081925] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#153446] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Important Points Added</p>
            <h2 className="mt-2 text-4xl font-black text-white">What This Page Now Covers Better</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Milestone-Based Explanation",
                  desc: "The page now explains progress through meaningful phases instead of only saying construction is ongoing.",
                },
                {
                  title: "Sacred + Practical View",
                  desc: "Construction is shown as both mandir development and public devotional infrastructure.",
                },
                {
                  title: "Visitor Readiness Layer",
                  desc: "The page now includes future-facing visitor and pilgrim usability as part of construction progress.",
                },
                {
                  title: "Sponsor and Support Entry",
                  desc: "The page gives devotees a direct role in supporting temple growth through sponsorship and donation.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Construction Support</p>
            <h3 className="mt-3 text-4xl font-black">Be Part of Bhagwat Dham Growth</h3>
            <div className="mt-6 space-y-4">
              {[
                "Support structural and sacred development through donor participation.",
                "Sponsor temple-facing infrastructure that improves darshan and devotee experience.",
                "Stay connected to the project journey through milestone-oriented updates.",
                "Help move Bhagwat Dham toward a stronger mandir, satsang, and seva future.",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white/75">Step {index + 1}</p>
                  <p className="mt-1 text-lg text-white/95">{line}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Donate Now
              </Link>
              <Link to={ROUTES.involved.sponsor} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Sponsor Temple Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const MandirPilgrimagePage = memo(function MandirPilgrimagePage() {
  const [activeStage, setActiveStage] = useState<"All" | "Before Visit" | "Arrival" | "Darshan" | "Family Support">("All");

  const pilgrimStages = [
    {
      category: "Before Visit" as const,
      title: "Travel Planning and Preparation",
      desc: "This section helps yatris prepare for the visit with timing awareness, basic route planning, and a simple understanding of the mandir environment before arrival.",
      details: "Recommended arrival windows, essential items, clothing discipline, and advance coordination guidance.",
    },
    {
      category: "Arrival" as const,
      title: "Arrival and Entry Support",
      desc: "Pilgrims need clarity the moment they arrive. This covers reception points, entry movement, parking, and first-touch support for families and groups.",
      details: "Reception flow, support desk access, shoe counter, queue entry, and first-time visitor guidance.",
    },
    {
      category: "Darshan" as const,
      title: "Darshan and Mandir Conduct",
      desc: "A pilgrimage page should guide devotees on how to move respectfully through darshan, prayer, aarti participation, and sacred temple spaces.",
      details: "Queue discipline, silence zones, prayer etiquette, aarti participation, and darshan sequence awareness.",
    },
    {
      category: "Family Support" as const,
      title: "Family and Elder Support",
      desc: "Families, senior citizens, and children often need specific guidance to make the pilgrimage experience smoother and more comfortable.",
      details: "Seating pause points, assistance counters, child guidance, and senior-friendly movement support.",
    },
    {
      category: "Darshan" as const,
      title: "Festival and Peak-Day Readiness",
      desc: "Pilgrimage changes during festival days, so this page now includes guidance for visiting during larger crowds and major devotional events.",
      details: "Peak-hour darshan planning, festival entry discipline, and public gathering awareness.",
    },
    {
      category: "Before Visit" as const,
      title: "Stay, Food, and Seva Orientation",
      desc: "Pilgrims should understand how their visit can connect with prasadi, seva participation, and practical temple support systems.",
      details: "Meal timing orientation, seva inquiry points, and trust support touchpoints during the visit.",
    },
  ];

  const visibleStages =
    activeStage === "All" ? pilgrimStages : pilgrimStages.filter((item) => item.category === activeStage);

  usePageMeta(
    "Pilgrimage Information",
    "Pilgrimage planning, darshan guidance, family support, and visitor information for devotees coming to Bhagwat Dham and temple routes.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Pilgrimage Information"
        subtitle="Travel guidance, darshan support, family-ready pilgrimage planning, and visitor assistance for devotees coming to Bhagwat Dham"
        backgroundImage="/images/hanuman5.JPG"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Plan Your Visit
          </Link>
          <Link
            to={ROUTES.mandirTeerth.bhagwatDham}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Explore Bhagwat Dham
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Darshan Guidance", value: "Available", note: "Structured visitor orientation for respectful temple movement" },
              { title: "Family Readiness", value: "Supported", note: "Helpful planning for children, elders, and group visits" },
              { title: "Festival Visits", value: "Managed", note: "Guidance improves planning for high-footfall devotional days" },
              { title: "Pilgrim Flow", value: "Step-Based", note: "Before visit, arrival, darshan, and support information all in one page" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 p-4 shadow-lg backdrop-blur-sm">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Pilgrimage Information</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            A pilgrimage page should help devotees visit with peace, clarity, and preparation. It should not remain a short placeholder because yatris need real guidance before they travel and after they arrive.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            I updated this page to function as a practical pilgrim guide with planning help, darshan support, family-readiness direction, and useful temple visit structure.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Travel Clarity",
                desc: "Visitors need to know how to prepare before they come so the pilgrimage begins smoothly.",
              },
              {
                title: "Mandir Etiquette Support",
                desc: "Darshan becomes better when devotees understand temple discipline, movement, and respectful conduct.",
              },
              {
                title: "Family-Friendly Guidance",
                desc: "This page now reflects real family needs including elder care, children, and peak day visits.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">New Feature</p>
              <h2 className="mt-2 text-5xl font-black text-white">Pilgrim Support Explorer</h2>
              <p className="mt-3 max-w-3xl text-[#d4e1e8] text-lg leading-7">
                Filter pilgrimage guidance by stage so visitors can quickly find the part of the journey they need help with most.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Before Visit", "Arrival", "Darshan", "Family Support"] as const).map((stage) => {
                const active = stage === activeStage;
                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => setActiveStage(stage)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {visibleStages.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    Pilgrim Guide
                  </span>
                </div>
                <h3 className="text-white text-2xl font-black mt-4">{item.title}</h3>
                <p className="text-[#d4e1e8] mt-3 text-lg leading-7">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#0f2c3d] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">What This Covers</p>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#09202d] to-[#081925] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#153446] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Visitor Readiness</p>
            <h2 className="mt-2 text-4xl font-black text-white">Practical Visit Information</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Best Visit Preparation",
                  desc: "Arrive with modest clothing, enough time for darshan, and a calm spiritual mindset rather than treating the visit as a rushed stop.",
                },
                {
                  title: "What Families Should Keep in Mind",
                  desc: "Plan the visit keeping children, elders, and waiting time in mind so the experience stays peaceful for everyone.",
                },
                {
                  title: "Temple Conduct",
                  desc: "Respect sacred areas, maintain silence where needed, follow queue discipline, and support an atmosphere of devotion.",
                },
                {
                  title: "Festival Days",
                  desc: "On major utsav days, arrive earlier, expect larger crowds, and follow volunteer guidance for smoother entry and darshan movement.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Pilgrim Flow</p>
            <h3 className="mt-3 text-4xl font-black">Suggested Visit Journey</h3>
            <div className="mt-6 space-y-4">
              {[
                "Plan the visit and connect with the trust if special support is needed.",
                "Arrive calmly and use the reception, entry, and queue systems in order.",
                "Take darshan with attention, reverence, and awareness of temple discipline.",
                "Use available support for family, elders, prasadi orientation, or further seva interest.",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white/75">Step {index + 1}</p>
                  <p className="mt-1 text-lg text-white/95">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h3 className="text-4xl font-black text-white mb-5">Helpful Pilgrimage Content Added</h3>
            <ul className="space-y-3 text-[#d4e1e8] text-xl">
              {[
                "A real hero banner and pilgrim-focused page structure",
                "Stage-wise guidance through the new Pilgrim Support Explorer",
                "Practical darshan, conduct, family, and festival-day support information",
                "Clear visit-planning and trust-contact actions",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Need Visit Assistance?</h3>
            <p className="text-xl text-white/95 mb-6">
              This page is now structured to help pilgrims, families, and first-time visitors approach Bhagwat Dham with better clarity, readiness, and devotional comfort.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Visit Planning", amount: "Ready" },
                { label: "Family Support", amount: "Guided" },
                { label: "Darshan Help", amount: "Available" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.contact} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Contact Temple Desk
              </Link>
              <Link to={ROUTES.involved.volunteer} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Join Visitor Seva
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

type MediaVideoFilter = "All" | "Pravachan" | "Bhajan" | "Events" | "Live Darshan";

const MEDIA_VIDEO_FILTERS: MediaVideoFilter[] = ["All", "Pravachan", "Bhajan", "Events", "Live Darshan"];

function getMediaVideoFilter(item: VideoGalleryItem): MediaVideoFilter {
  if (item.category === "Festival") return "Events";
  if (item.theme === "Rituals") return "Live Darshan";
  if (item.theme === "Practices" || item.theme === "Heritage") return "Bhajan";
  return "Pravachan";
}

function parseViews(views: string) {
  return Number.parseFloat(views.replace(/K/i, ""));
}

function buildVideoMeta(item: VideoGalleryItem, index: number) {
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index % 6];
  return `${month} ${index + 5}, 2024`;
}

type MediaVideoModalProps = {
  video: VideoGalleryItem | null;
  onClose: () => void;
};

const MediaVideoModal = memo(function MediaVideoModal({ video, onClose }: MediaVideoModalProps) {
  useEffect(() => {
    if (!video) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#102332]/70 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            className="w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/20 bg-[#0f2331] shadow-[0_28px_70px_rgba(16,35,50,0.42)]"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F4CE5A]">{getMediaVideoFilter(video)}</p>
                <h2 id="video-modal-title" className="mt-2 text-xl font-bold text-white md:text-2xl">
                  {video.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close video modal"
                onClick={onClose}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#102332]"
              >
                Close
              </button>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_360px]">
              <div className="bg-black">
                <iframe
                  title={video.title}
                  src={getYouTubeEmbedUrl(video.videoUrl)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-[260px] w-full md:h-[460px]"
                />
              </div>
              <div className="bg-[linear-gradient(180deg,rgba(31,115,160,0.18)_0%,rgba(16,35,50,0.92)_100%)] px-5 py-5 text-white md:px-6 md:py-6">
                <p className="text-sm leading-7 text-white/85">{video.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Like", "Share", "Save"].map((action) => (
                    <button
                      key={action}
                      type="button"
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#102332]"
                    >
                      {action}
                    </button>
                  ))}
                </div>
                <div className="mt-6 space-y-3 text-sm text-white/75">
                  <p>Duration: {video.duration}</p>
                  <p>Views: {video.views}</p>
                  <p>Theme: {video.theme}</p>
                </div>
                <Link
                  to={`${ROUTES.media.videos}/${video.slug}`}
                  className="mt-6 inline-flex items-center rounded-full bg-[linear-gradient(135deg,#F4CE5A_0%,#E9932D_100%)] px-5 py-3 text-sm font-bold text-[#102332] shadow-[0_18px_30px_rgba(233,147,45,0.28)] transition hover:-translate-y-0.5"
                >
                  Open Dedicated Player
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});

type MediaVideoFilterBarProps = {
  activeFilter: MediaVideoFilter;
  onFilterChange: (filter: MediaVideoFilter) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const MediaVideoFilterBar = memo(function MediaVideoFilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: MediaVideoFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="grid grid-cols-2 gap-2 rounded-[22px] border border-[#e8dcc7] bg-white/95 p-2 shadow-[0_14px_35px_rgba(31,115,160,0.08)] sm:flex sm:flex-wrap">
        {MEDIA_VIDEO_FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onFilterChange(item)}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
              activeFilter === item
                ? "bg-[linear-gradient(135deg,#F4CE5A_0%,#E9932D_100%)] text-[#17344A] shadow-[0_14px_24px_rgba(233,147,45,0.25)]"
                : "text-[#33586d] hover:bg-[#fff8e4]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <label className="relative block w-full lg:max-w-[320px]">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#529CB0]">⌕</span>
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search videos..."
          className="w-full rounded-[22px] border border-[#e8dcc7] bg-white/95 py-3 pl-12 pr-5 text-sm text-[#33586d] shadow-[0_14px_35px_rgba(31,115,160,0.08)] outline-none transition focus:border-[#F4CE5A]"
        />
      </label>
    </div>
  );
});

type MediaVideoCardProps = {
  item: VideoGalleryItem;
  index: number;
  onOpen: (item: VideoGalleryItem) => void;
};

const MediaVideoCard = memo(function MediaVideoCard({ item, index, onOpen }: MediaVideoCardProps) {
  const category = getMediaVideoFilter(item);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[24px] border border-[#e7d9c2] bg-white/95 shadow-[0_18px_40px_rgba(31,115,160,0.08)]"
    >
      <button type="button" onClick={() => onOpen(item)} className="block w-full text-left">
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,35,50,0.05)_0%,rgba(16,35,50,0.58)_100%)]" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(24,31,39,0.54)] text-xl font-semibold text-white shadow-[0_0_0_10px_rgba(255,255,255,0.10)]">
              ▶
            </div>
          </motion.div>
          <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1F73A0]">
            {category}
          </span>
          <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
            {item.duration}
          </span>
          <div className="absolute inset-x-4 bottom-0 h-1 overflow-hidden rounded-t-full bg-white/20">
            <div className="h-full rounded-t-full bg-[linear-gradient(90deg,#F4CE5A_0%,#E9932D_100%)]" style={{ width: `${36 + (index % 5) * 10}%` }} />
          </div>
        </div>
      </button>

      <div className="space-y-3 px-5 py-5">
        <h3 className="line-clamp-2 text-xl font-semibold leading-snug text-[#17344A]">{item.title}</h3>
        <p className="line-clamp-2 text-sm leading-7 text-[#5d6f79]">{item.note}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#70848d]">
          <span>{item.duration}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#E9932D]" />
          <span>{buildVideoMeta(item, index)}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#A9CAD1]" />
          <span>{item.views} views</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="rounded-full bg-[linear-gradient(135deg,#F4CE5A_0%,#E9932D_100%)] px-5 py-2.5 text-sm font-bold text-[#17344A] shadow-[0_16px_28px_rgba(233,147,45,0.22)] transition hover:-translate-y-0.5"
          >
            Watch
          </button>
          <Link
            to={`${ROUTES.media.videos}/${item.slug}`}
            className="rounded-full border border-[#d9e7eb] px-5 py-2.5 text-sm font-semibold text-[#1F73A0] transition hover:border-[#F4CE5A] hover:bg-[#fff9e8]"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
});

type VideoGalleryCategoryV2 = "Pravachan" | "Bhagwat Katha" | "Bhajan" | "Events" | "Live Darshan" | "Youth" | "Festivals";
type VideoGalleryActiveCategoryV2 = "All" | VideoGalleryCategoryV2;
type VideoSortOptionV2 = "Latest" | "Most Viewed" | "Featured" | "Oldest";

type VideoGalleryItemV2 = {
  id: string;
  title: string;
  slug: string;
  category: VideoGalleryCategoryV2;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  embedUrl?: string;
  duration: string;
  date: string;
  views: number;
  featured: boolean;
  playlist: string;
  tags: string[];
};

type PlaylistCardItemV2 = {
  title: string;
  description: string;
  videos: number;
  icon: string;
};

type FaqItemV2 = {
  question: string;
  answer: string;
};

const VIDEO_GALLERY_DATA_V2: VideoGalleryItemV2[] = [
  {
    id: "vid-1",
    title: "Bhagwat Katha: Eternal Leela of Sri Krishna",
    slug: "bhagwat-katha-eternal-leela",
    category: "Bhagwat Katha",
    description: "A devotional discourse revealing the eternal leelas of Shri Krishna through Bhagwat wisdom.",
    thumbnail: "/assets/images/media-gallery/featured-bhagwat-katha-video.jpg",
    embedUrl: "https://www.youtube.com/embed/Z-zaUl-uazk",
    duration: "38:42",
    date: "2026-04-10",
    views: 28400,
    featured: true,
    playlist: "Bhagwat Katha Series",
    tags: ["Krishna", "Bhagwat", "Leela", "Satsang"],
  },
  {
    id: "vid-2",
    title: "Daily Pravachan: Bhakti and Inner Discipline",
    slug: "daily-pravachan-bhakti-discipline",
    category: "Pravachan",
    description: "Practical spiritual guidance for daily discipline, seva mindset, and mindful living.",
    thumbnail: "/assets/images/media-gallery/pravachan-thumbnail-01.jpg",
    embedUrl: "https://www.youtube.com/embed/cOFNyxt4MhM",
    duration: "24:18",
    date: "2026-04-08",
    views: 14120,
    featured: false,
    playlist: "Daily Pravachan",
    tags: ["Pravachan", "Daily", "Bhakti"],
  },
  {
    id: "vid-3",
    title: "Bhajan Sandhya: Naam Smaran Kirtan",
    slug: "bhajan-sandhya-naam-smaran",
    category: "Bhajan",
    description: "Evening bhajan and kirtan session for collective devotion and peaceful remembrance.",
    thumbnail: "/assets/images/media-gallery/bhajan-thumbnail-01.jpg",
    embedUrl: "https://www.youtube.com/embed/wrg8NMrPwOs",
    duration: "17:09",
    date: "2026-04-05",
    views: 9800,
    featured: false,
    playlist: "Bhajan & Kirtan",
    tags: ["Bhajan", "Kirtan", "Naam"],
  },
  {
    id: "vid-4",
    title: "Spiritual Event Highlights: Mandir Utsav",
    slug: "spiritual-event-highlights-mandir-utsav",
    category: "Events",
    description: "Key moments from Bhagwat Heritage spiritual gatherings and mandir celebrations.",
    thumbnail: "/assets/images/media-gallery/event-video-thumbnail-01.jpg",
    embedUrl: "https://www.youtube.com/embed/ZYX6zpiY-6w",
    duration: "13:26",
    date: "2026-04-01",
    views: 11150,
    featured: false,
    playlist: "Social & Cultural Events",
    tags: ["Events", "Mandir", "Highlights"],
  },
  {
    id: "vid-5",
    title: "Live Darshan: Evening Aarti Stream",
    slug: "live-darshan-evening-aarti",
    category: "Live Darshan",
    description: "Experience live darshan and aarti with a devotional atmosphere from the temple.",
    thumbnail: "/assets/images/media-gallery/live-darshan-video.jpg",
    embedUrl: "https://www.youtube.com/embed/oW_Z8hICrHo",
    duration: "41:05",
    date: "2026-03-30",
    views: 20740,
    featured: true,
    playlist: "Live Darshan",
    tags: ["Live", "Darshan", "Aarti"],
  },
  {
    id: "vid-6",
    title: "Youth Sanskar Session: Values in Action",
    slug: "youth-sanskar-values-in-action",
    category: "Youth",
    description: "Youth-centered spiritual learning session focused on values, clarity, and discipline.",
    thumbnail: "/assets/images/gallery/youth-family-session.jpg",
    embedUrl: "https://www.youtube.com/embed/Rq5iBnW8UEQ",
    duration: "19:14",
    date: "2026-03-26",
    views: 7430,
    featured: false,
    playlist: "Youth Sanskar Videos",
    tags: ["Youth", "Sanskar", "Family"],
  },
  {
    id: "vid-7",
    title: "Festival Celebrations: Guru Purnima Darshan",
    slug: "festival-celebrations-guru-purnima",
    category: "Festivals",
    description: "A devotional visual journey through Guru Purnima offerings, satsang, and bhakti.",
    thumbnail: "/assets/images/gallery/guru-purnima-event.jpg",
    embedUrl: "https://www.youtube.com/embed/Z-zaUl-uazk",
    duration: "15:52",
    date: "2026-03-22",
    views: 13480,
    featured: false,
    playlist: "Festival Celebrations",
    tags: ["Festival", "Guru Purnima", "Celebration"],
  },
  {
    id: "vid-8",
    title: "Bhagwat Katha Episode 2: Bhakti and Dharma",
    slug: "bhagwat-katha-episode-2-bhakti-dharma",
    category: "Bhagwat Katha",
    description: "Continuing the Katha series with deeper insight into bhakti, dharma, and life wisdom.",
    thumbnail: "/assets/images/media-gallery/featured-bhagwat-katha-video.jpg",
    embedUrl: "https://www.youtube.com/embed/cOFNyxt4MhM",
    duration: "33:11",
    date: "2026-03-20",
    views: 16890,
    featured: false,
    playlist: "Bhagwat Katha Series",
    tags: ["Bhagwat", "Episode", "Dharma"],
  },
  {
    id: "vid-9",
    title: "Special Pravachan: Gita in Daily Life",
    slug: "special-pravachan-gita-daily-life",
    category: "Pravachan",
    description: "Applying Gita wisdom through practical discipline, seva, and spiritual steadiness.",
    thumbnail: "/assets/images/media-gallery/pravachan-thumbnail-01.jpg",
    embedUrl: "https://www.youtube.com/embed/wrg8NMrPwOs",
    duration: "28:09",
    date: "2026-03-18",
    views: 12640,
    featured: false,
    playlist: "Special Discourses",
    tags: ["Pravachan", "Gita", "Discourse"],
  },
  {
    id: "vid-10",
    title: "Bhajan Series: Hari Naam Mahima",
    slug: "bhajan-series-hari-naam-mahima",
    category: "Bhajan",
    description: "Melodic devotional singing session centered around Hari naam and divine remembrance.",
    thumbnail: "/assets/images/media-gallery/bhajan-thumbnail-01.jpg",
    embedUrl: "https://www.youtube.com/embed/oW_Z8hICrHo",
    duration: "16:44",
    date: "2026-03-15",
    views: 8540,
    featured: false,
    playlist: "Bhajan & Kirtan",
    tags: ["Bhajan", "Naam", "Kirtan"],
  },
  {
    id: "vid-11",
    title: "Event Documentary: Seva and Community Outreach",
    slug: "event-documentary-seva-community-outreach",
    category: "Events",
    description: "A visual documentary of seva-led outreach initiatives and trust-driven community support.",
    thumbnail: "/assets/images/media-gallery/event-video-thumbnail-01.jpg",
    embedUrl: "https://www.youtube.com/embed/Rq5iBnW8UEQ",
    duration: "21:35",
    date: "2026-03-11",
    views: 7920,
    featured: false,
    playlist: "Social & Cultural Events",
    tags: ["Seva", "Community", "Events"],
  },
  {
    id: "vid-12",
    title: "Festival Reflection: Deepotsav Darshan",
    slug: "festival-reflection-deepotsav-darshan",
    category: "Festivals",
    description: "Sacred festival moments with deep daan, darshan, and devotional gatherings.",
    thumbnail: "/assets/images/gallery/festival-celebration.jpg",
    embedUrl: "https://www.youtube.com/embed/ZYX6zpiY-6w",
    duration: "14:22",
    date: "2026-03-05",
    views: 10860,
    featured: false,
    playlist: "Festival Celebrations",
    tags: ["Festival", "Deepotsav", "Darshan"],
  },
];

const VIDEO_FILTERS_V2: VideoGalleryActiveCategoryV2[] = ["All", "Pravachan", "Bhagwat Katha", "Bhajan", "Events", "Live Darshan", "Youth", "Festivals"];

const PLAYLIST_CARDS_V2: PlaylistCardItemV2[] = [
  { title: "Bhagwat Katha Series", description: "Structured episode-based katha sessions and scripture reflections.", videos: 24, icon: "/assets/images/media-gallery/icons/icon-bhagwat-katha-video.svg" },
  { title: "Daily Pravachan", description: "Daily guidance discourses for spiritual clarity and discipline.", videos: 31, icon: "/assets/images/media-gallery/icons/icon-pravachan-video.svg" },
  { title: "Bhajan & Kirtan", description: "Devotional bhajan and kirtan archives for satsang listening.", videos: 18, icon: "/assets/images/media-gallery/icons/icon-bhajan-video.svg" },
  { title: "Festival Celebrations", description: "Major utsav highlights, darshan moments, and cultural devotion.", videos: 22, icon: "/assets/images/media-gallery/icons/icon-festival-video.svg" },
  { title: "Youth Sanskar Videos", description: "Youth-focused sessions rooted in values and spiritual responsibility.", videos: 15, icon: "/assets/images/media-gallery/icons/icon-youth-video.svg" },
  { title: "Live Darshan", description: "Live and archived temple darshan and aarti broadcast recordings.", videos: 12, icon: "/assets/images/media-gallery/icons/icon-live-darshan.svg" },
  { title: "Social & Cultural Events", description: "Field events, social programs, and cultural initiative coverage.", videos: 19, icon: "/assets/images/media-gallery/icons/icon-event-video.svg" },
  { title: "Special Discourses", description: "Theme-based deep dives on dharma, bhakti, and life practice.", videos: 14, icon: "/assets/images/media-gallery/icons/icon-playlist.svg" },
];

const VIDEO_FAQS_V2: FaqItemV2[] = [
  { question: "How can I watch Bhagwat Katha videos?", answer: "You can watch directly from this page by clicking Watch on any video card or using the Featured Video section." },
  { question: "Are videos available in Hindi?", answer: "Yes. Core pravachan, katha, and bhajan content is published primarily in Hindi with spiritual context suitable for broad audiences." },
  { question: "Can I share these videos with family and groups?", answer: "Yes. You may share video links across family, satsang groups, and communities to spread devotional learning." },
  { question: "How can I request a specific pravachan topic?", answer: "Use the Contact Media Team option to submit a topic request. The trust reviews requests for future sessions." },
  { question: "Can live events be watched later?", answer: "Most live sessions are archived and published in this gallery after event completion, based on media review." },
];

function toEmbedUrlV2(video: VideoGalleryItemV2): string {
  if (video.embedUrl) return `${video.embedUrl}?autoplay=1&rel=0`;
  if (!video.videoUrl) return "";
  const watchMatch = video.videoUrl.match(/[?&]v=([^&#]+)/);
  const shortMatch = video.videoUrl.match(/youtu\.be\/([^?&#]+)/);
  const id = watchMatch?.[1] || shortMatch?.[1];
  if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  return video.videoUrl;
}

function formatViewCountV2(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return `${views}`;
}

export const MediaVideoGalleryPage = memo(function MediaVideoGalleryPage() {
  const [activeCategory, setActiveCategory] = useState<VideoGalleryActiveCategoryV2>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<VideoSortOptionV2>("Latest");
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedVideo, setSelectedVideo] = useState<VideoGalleryItemV2 | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const popularTrackRef = useRef<HTMLDivElement | null>(null);
  const [showPopularArrows, setShowPopularArrows] = useState(false);

  usePageMeta(
    "Video Gallery",
    "Watch Bhagwat Katha, pravachan, bhajan, live darshan, and spiritual event videos from Bhagwat Heritage.",
  );

  const filteredAndSortedVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = VIDEO_GALLERY_DATA_V2.filter((video) => {
      const categoryMatch = activeCategory === "All" || video.category === activeCategory;
      const searchPool = `${video.title} ${video.description} ${video.category} ${video.playlist} ${video.tags.join(" ")}`.toLowerCase();
      const searchMatch = q.length === 0 || searchPool.includes(q);
      return categoryMatch && searchMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sortOption === "Latest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortOption === "Oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortOption === "Most Viewed") return b.views - a.views;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [activeCategory, searchQuery, sortOption]);

  const featuredVideo = useMemo(
    () => filteredAndSortedVideos.find((video) => video.featured) ?? filteredAndSortedVideos[0] ?? VIDEO_GALLERY_DATA_V2[0],
    [filteredAndSortedVideos],
  );

  const latestVideos = useMemo(() => filteredAndSortedVideos.slice(0, visibleCount), [filteredAndSortedVideos, visibleCount]);
  const popularVideos = useMemo(() => [...VIDEO_GALLERY_DATA_V2].sort((a, b) => b.views - a.views).slice(0, 8), []);

  useEffect(() => {
    setVisibleCount(9);
  }, [activeCategory, searchQuery, sortOption]);

  useEffect(() => {
    const node = popularTrackRef.current;
    if (!node) return;

    const evaluateOverflow = () => {
      setShowPopularArrows(node.scrollWidth > node.clientWidth + 8);
    };

    evaluateOverflow();
    window.addEventListener("resize", evaluateOverflow);
    return () => window.removeEventListener("resize", evaluateOverflow);
  }, [popularVideos.length]);

  useEffect(() => {
    if (!selectedVideo) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedVideo(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedVideo]);

  const scrollPopularBy = (direction: "left" | "right") => {
    const node = popularTrackRef.current;
    if (!node) return;
    const offset = direction === "left" ? -360 : 360;
    node.scrollBy({ left: offset, behavior: "smooth" });
  };

  const VideoHero = () => (
    <section className="relative overflow-hidden rounded-[34px] border border-[#EAD8BC] bg-[#1D1A17] shadow-[0_24px_54px_rgba(83,57,24,0.22)]">
      <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777267204/ChatGPT_Image_Apr_27_2026_09_51_10_AM_hlbplt.png" alt="Bhagwat Heritage video gallery hero" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(36,24,12,0.88),rgba(18,41,51,0.76),rgba(200,146,46,0.52))]" />
      <div className="relative z-10 px-6 py-14 text-white md:px-10 md:py-20">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F8DDA9]">Home / Media Gallery / Video Gallery</p>
        <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Video Gallery</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/90 md:text-lg">
          Watch Bhagwat Katha, pravachan, bhajan, live darshan, and spiritual event videos from Bhagwat Heritage.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" onClick={() => setSelectedVideo(featuredVideo)} className="rounded-full bg-[#D89B2B] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#BE7D17]">Watch Latest Video</button>
          <a href="#video-playlists" className="rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#3A2A1B]">Explore Playlists</a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#3A2A1B]">Subscribe Channel</a>
        </div>
      </div>
    </section>
  );

  const VideoFilterBar = () => (
    <section className="relative z-20 -mt-5 rounded-[24px] border border-[#E6D3B1] bg-[#FFF9EB]/95 p-4 shadow-[0_16px_30px_rgba(92,64,28,0.15)] backdrop-blur md:p-5">
      <div className="grid gap-3 lg:grid-cols-[1.1fr_0.55fr_0.35fr]">
        <div className="relative">
          <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#B87918]">⌕</span>
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search videos by title, category, or devotion theme..."
            aria-label="Search videos"
            className="w-full rounded-full border border-[#E0C8A0] bg-white px-10 py-3 text-sm text-[#4E3928] outline-none focus:border-[#C8922E] focus:ring-2 focus:ring-[#EFD8A8]"
          />
        </div>
        <div>
          <label htmlFor="video-sort" className="sr-only">Sort videos</label>
          <select
            id="video-sort"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value as VideoSortOptionV2)}
            className="w-full rounded-full border border-[#E0C8A0] bg-white px-4 py-3 text-sm font-semibold text-[#4E3928] outline-none focus:border-[#C8922E]"
          >
            <option>Latest</option>
            <option>Most Viewed</option>
            <option>Featured</option>
            <option>Oldest</option>
          </select>
        </div>
        <div className="flex items-center justify-start lg:justify-end">
          <p className="text-sm font-bold text-[#735433]">Showing {filteredAndSortedVideos.length} videos</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {VIDEO_FILTERS_V2.map((filter) => {
          const isActive = activeCategory === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(filter)}
              className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.08em] transition ${
                isActive ? "border-[#C8922E] bg-[#D89B2B] text-white" : "border-[#E2CCA6] bg-white text-[#6D5132] hover:border-[#C8922E] hover:bg-[#FFF1D6]"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </section>
  );

  const FeaturedVideo = () => (
    <section className="mt-8 overflow-hidden rounded-[30px] border border-[#EAD6B9] bg-[linear-gradient(140deg,#FFF4D8_0%,#FFFDF8_40%,#F6E8CA_100%)] shadow-[0_18px_42px_rgba(104,75,38,0.13)]">
      <div className="grid gap-0 lg:grid-cols-[1fr_1.15fr]">
        <div className="p-6 md:p-8">
          <p className="inline-flex rounded-full bg-[#0F6B6B] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">Featured Video</p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-[#1D342C] md:text-4xl">Bhagwat Katha: Eternal Leela of Sri Krishna</h2>
          <p className="mt-4 text-base leading-7 text-[#5A4736]">{featuredVideo.description}</p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-[#6F5230]">
            <span>Duration: {featuredVideo.duration}</span>
            <span>Date: {new Date(featuredVideo.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
            <span>Views: {formatViewCountV2(featuredVideo.views)}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => setSelectedVideo(featuredVideo)} className="rounded-full bg-[#D89B2B] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#BE7D17]">Watch Now</button>
            <button type="button" onClick={() => setSelectedVideo(featuredVideo)} className="rounded-full border border-[#D6B17A] bg-white px-6 py-3 text-sm font-black text-[#845116] transition hover:bg-[#FFF3DA]">Open Player</button>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden">
          <img src={featuredVideo.thumbnail} alt={featuredVideo.title} className="h-full w-full object-cover" loading="lazy" />
          <span className="absolute left-4 top-4 rounded-full bg-[#D89B2B] px-3 py-1 text-xs font-black text-white">{featuredVideo.category}</span>
          <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-black text-white">{featuredVideo.duration}</span>
          <button
            type="button"
            onClick={() => setSelectedVideo(featuredVideo)}
            aria-label={`Play ${featuredVideo.title}`}
            className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-3xl text-white shadow-[0_0_0_10px_rgba(255,255,255,0.16)] transition hover:scale-105"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );

  const VideoCard = ({ video }: { video: VideoGalleryItemV2 }) => (
    <article className="group overflow-hidden rounded-[22px] border border-[#E8D8BC] bg-white shadow-[0_14px_30px_rgba(103,75,37,0.10)] transition hover:-translate-y-1.5 hover:shadow-[0_22px_38px_rgba(103,75,37,0.15)]">
      <div className="relative aspect-video overflow-hidden">
        <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-[#D89B2B] px-3 py-1 text-[11px] font-black text-white">{video.category}</span>
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-black text-white">{video.duration}</span>
        <button
          type="button"
          onClick={() => setSelectedVideo(video)}
          aria-label={`Play ${video.title}`}
          className="absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-lg text-white shadow-[0_0_0_7px_rgba(255,255,255,0.16)]"
        >
          ▶
        </button>
      </div>
      <div className="space-y-2 p-5">
        <h3 className="line-clamp-2 text-xl font-black leading-tight text-[#2A2118]">{video.title}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-[#5F4B38]">{video.description}</p>
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-[#775839]">
          <span>{new Date(video.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
          <span>•</span>
          <span>{formatViewCountV2(video.views)} views</span>
        </div>
        <div className="pt-2 flex gap-3">
          <button type="button" onClick={() => setSelectedVideo(video)} className="rounded-full bg-[#D89B2B] px-4 py-2 text-sm font-black text-white transition hover:bg-[#BE7D17]">Watch</button>
          <button type="button" onClick={() => setSelectedVideo(video)} className="rounded-full border border-[#D8B17A] bg-[#FFF7E6] px-4 py-2 text-sm font-black text-[#845116] transition hover:bg-[#FFEAC2]">Details</button>
        </div>
      </div>
    </article>
  );

  const PlaylistCard = ({ item }: { item: PlaylistCardItemV2 }) => (
    <article className="rounded-[20px] border border-[#E7D5B5] bg-white p-5 shadow-[0_12px_28px_rgba(104,75,38,0.09)]">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF1D8]">
        <img src={item.icon} alt={`${item.title} icon`} className="h-7 w-7 object-contain" loading="lazy" />
      </div>
      <h3 className="mt-4 text-xl font-black text-[#2A2118]">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#5F4B38]">{item.description}</p>
      <div className="mt-3 flex items-center justify-between text-sm font-semibold text-[#705130]">
        <span>{item.videos} videos</span>
        <button type="button" className="text-[#B87518] hover:underline">View Playlist</button>
      </div>
    </article>
  );

  const PopularVideos = () => (
    <section className="mt-12">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Popular Videos</h2>
          <p className="mt-2 text-sm text-[#5F4B38]">Most watched spiritual videos across Bhagwat Heritage channels.</p>
        </div>
        {showPopularArrows ? (
          <div className="hidden items-center gap-2 md:flex">
            <button type="button" onClick={() => scrollPopularBy("left")} aria-label="Scroll popular videos left" className="rounded-full border border-[#E2CCA6] bg-white px-3 py-2 text-[#916022] hover:bg-[#FFF2D8]">←</button>
            <button type="button" onClick={() => scrollPopularBy("right")} aria-label="Scroll popular videos right" className="rounded-full border border-[#E2CCA6] bg-white px-3 py-2 text-[#916022] hover:bg-[#FFF2D8]">→</button>
          </div>
        ) : null}
      </div>
      <div ref={popularTrackRef} className="mt-5 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {popularVideos.map((video) => (
          <article key={video.id} className="min-w-[280px] max-w-[320px] flex-1 rounded-[20px] border border-[#E8D8BC] bg-white shadow-[0_10px_24px_rgba(103,75,37,0.10)]">
            <div className="aspect-video overflow-hidden rounded-t-[20px]">
              <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-4">
              <h3 className="line-clamp-2 text-lg font-black text-[#2A2118]">{video.title}</h3>
              <p className="mt-2 text-sm text-[#6D5030]">{formatViewCountV2(video.views)} views • {video.category}</p>
              <button type="button" onClick={() => setSelectedVideo(video)} className="mt-3 rounded-full bg-[#D89B2B] px-4 py-2 text-xs font-black text-white">Watch</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const LiveDarshanSection = () => (
    <section className="mt-12 rounded-[28px] border border-[#E6D3B1] bg-[linear-gradient(135deg,#FFF5DE_0%,#FFFDF8_42%,#F4E8CC_100%)] p-6 shadow-[0_16px_36px_rgba(95,67,30,0.11)] md:p-8">
      <div className="grid gap-6 md:grid-cols-[1fr_320px] md:items-center">
        <div>
          <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Live Darshan &amp; Upcoming Broadcasts</h2>
          <p className="mt-4 text-base leading-7 text-[#5F4B38]">Next Live Satsang: Sunday, 7:00 PM IST • Platform: YouTube / Website Live</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="rounded-full bg-[#0F6B6B] px-5 py-3 text-sm font-black text-white">Join Live</button>
            <button type="button" className="rounded-full border border-[#0F6B6B] bg-white px-5 py-3 text-sm font-black text-[#0F6B6B]">Set Reminder</button>
          </div>
        </div>
        <div className="overflow-hidden rounded-[20px] border border-[#DFC7A0] shadow-[0_12px_28px_rgba(95,67,30,0.12)]">
          <img src="/assets/images/media-gallery/live-darshan-video.jpg" alt="Live darshan preview" className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );

  const YoutubeCTA = () => (
    <section className="relative mt-12 overflow-hidden rounded-[28px] border border-[#E5C88E] p-6 shadow-[0_20px_38px_rgba(95,67,30,0.16)] md:p-8">
      <img src="/assets/images/media-gallery/youtube-cta-bg.jpg" alt="YouTube CTA background" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(180,117,24,0.86),rgba(216,155,43,0.84),rgba(15,107,107,0.74))]" />
      <div className="relative z-10 text-white">
        <h2 className="text-3xl font-black md:text-4xl">Stay Connected with Bhagwat Heritage</h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-white/90">Subscribe to receive latest Bhagwat Katha, pravachan, bhajan, live darshan, and spiritual event videos.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="rounded-full bg-white px-6 py-3 text-sm font-black text-[#8A5515]">Subscribe on YouTube</a>
          <button type="button" className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-black text-white">Share Video Gallery</button>
          <Link to={`${ROUTES.contact}?subject=media-team`} className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-black text-white">Contact Media Team</Link>
        </div>
      </div>
    </section>
  );

  const FAQAccordion = () => (
    <section className="mt-12 rounded-[28px] border border-[#E8D8BC] bg-[#FFFCF5] p-6 shadow-[0_14px_32px_rgba(103,75,37,0.10)] md:p-8">
      <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Frequently Asked Questions</h2>
      <div className="mt-6 space-y-3">
        {VIDEO_FAQS_V2.map((item, index) => {
          const isOpen = openFaq === index;
          return (
            <article key={item.question} className="rounded-[18px] border border-[#E6D4B4] bg-white p-4">
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-3 text-left"
                aria-expanded={isOpen}
                aria-label={item.question}
              >
                <span className="text-base font-black text-[#2A2118] md:text-lg">{item.question}</span>
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF0D6] text-[#9A5E14] transition ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              {isOpen ? <p className="mt-3 text-sm leading-7 text-[#5F4B38]">{item.answer}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );

  const VideoModal = () => {
    if (!selectedVideo) return null;
    const src = toEmbedUrlV2(selectedVideo);

    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-3 md:p-6" role="dialog" aria-modal="true" aria-label={`Playing ${selectedVideo.title}`} onClick={() => setSelectedVideo(null)}>
        <button
          type="button"
          onClick={() => setSelectedVideo(null)}
          aria-label="Close video modal"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-2xl text-white hover:bg-white hover:text-[#2B1E13]"
        >
          ×
        </button>
        <div className="w-full max-w-5xl overflow-hidden rounded-[20px] border border-white/20 bg-[#120F0D]" onClick={(event) => event.stopPropagation()}>
          <div className="aspect-video bg-black">
            {src ? (
              <iframe src={src} title={selectedVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full" />
            ) : selectedVideo.videoUrl ? (
              <video src={selectedVideo.videoUrl} controls autoPlay className="h-full w-full" />
            ) : null}
          </div>
          <div className="p-4 text-white md:p-5">
            <h3 className="text-xl font-black">{selectedVideo.title}</h3>
            <p className="mt-2 text-sm text-white/85">{selectedVideo.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-0 pb-14">
      <VideoHero />
      <VideoFilterBar />
      <FeaturedVideo />

      <section className="mt-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Latest Videos</h2>
            <p className="mt-2 text-sm text-[#5F4B38]">Fresh uploads from Bhagwat Katha, pravachan, bhajan, events, and spiritual media.</p>
          </div>
        </div>

        {filteredAndSortedVideos.length === 0 ? (
          <div className="mt-6 rounded-[22px] border border-dashed border-[#DDBF90] bg-[#FFF7E6] px-6 py-12 text-center text-[#6D4F2F]">No videos found. Try another search or category.</div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latestVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            {visibleCount < filteredAndSortedVideos.length ? (
              <div className="mt-8 flex justify-center">
                <button type="button" onClick={() => setVisibleCount((count) => count + 6)} className="rounded-full bg-[#D89B2B] px-7 py-3 text-sm font-black text-white hover:bg-[#BE7D17]">Load More</button>
              </div>
            ) : null}
          </>
        )}
      </section>

      <section id="video-playlists" className="mt-12">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Playlist Categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PLAYLIST_CARDS_V2.map((playlist) => (
            <PlaylistCard key={playlist.title} item={playlist} />
          ))}
        </div>
      </section>

      <PopularVideos />

      <LiveDarshanSection />

      <section className="mt-12 rounded-[28px] border border-[#E8D8BC] bg-[#FFFCF5] p-6 shadow-[0_14px_32px_rgba(103,75,37,0.10)] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-center">
          <div className="overflow-hidden rounded-[20px] border border-[#E0CAA3]">
            <img src="/assets/images/media-gallery/bhagwat-katha-series.jpg" alt="Bhagwat Katha series" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Complete Bhagwat Katha Video Series</h2>
            <p className="mt-3 text-base leading-7 text-[#5F4B38]">Organized spiritual discourses for seekers, families, youth, and devotees.</p>
            <div className="mt-4 grid gap-2 text-sm font-semibold text-[#6C4F2F] md:grid-cols-2">
              <p>Series Progress: 24 / 36 episodes</p>
              <p>Topics: Leela, Bhakti, Dharma, Gita Wisdom</p>
            </div>
            <button type="button" onClick={() => setSelectedVideo(featuredVideo)} className="mt-5 rounded-full bg-[#0F6B6B] px-6 py-3 text-sm font-black text-white">Start Watching Series</button>
          </div>
        </div>
      </section>

      <YoutubeCTA />
      <FAQAccordion />

      <section className="relative mt-12 overflow-hidden rounded-[28px] border border-[#E2C68D] p-6 shadow-[0_20px_38px_rgba(95,67,30,0.16)] md:p-8">
        <img src="/assets/images/media-gallery/final-video-gallery-cta.jpg" alt="Final video gallery call to action" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,24,13,0.84),rgba(15,107,107,0.74),rgba(216,155,43,0.70))]" />
        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-black md:text-4xl">Let Divine Knowledge Reach Every Home</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-white/90">Share Bhagwat Heritage videos with your family, friends, and community.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => setSelectedVideo(featuredVideo)} className="rounded-full bg-[#D89B2B] px-6 py-3 text-sm font-black text-white">Watch Latest Videos</button>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-black text-white">Join WhatsApp Updates</a>
            <Link to={ROUTES.donate} className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-black text-white">Support Digital Seva</Link>
          </div>
        </div>
      </section>

      <VideoModal />
    </div>
  );
});


export const MediaVideoPlayerPage = memo(function MediaVideoPlayerPage() {
  const { videoId } = useParams();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const currentVideo = MEDIA_VIDEO_GALLERY_ITEMS.find((item) => item.slug === videoId) ?? MEDIA_VIDEO_GALLERY_ITEMS[0];
  const relatedVideos = MEDIA_VIDEO_GALLERY_ITEMS.filter((item) => item.slug !== currentVideo.slug).slice(0, 4);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMuted(false);
    setIsPlaying(true);
  }, [currentVideo.slug]);

  const postPlayerCommand = (func: string, args: (string | number | boolean)[] = []) => {
    const frame = iframeRef.current;
    if (!frame?.contentWindow) return;

    frame.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "*",
    );
  };

  const togglePlayback = () => {
    if (!isPlaying) {
      postPlayerCommand("playVideo");
      setIsPlaying(true);
      return;
    }

    postPlayerCommand("pauseVideo");
    setIsPlaying(false);
  };

  const restartVideo = () => {
    postPlayerCommand("seekTo", [0, true]);
    postPlayerCommand("playVideo");
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (isMuted) {
      postPlayerCommand("unMute");
      setIsMuted(false);
      return;
    }

    postPlayerCommand("mute");
    setIsMuted(true);
  };

  usePageMeta(
    `${currentVideo.title} | Video Gallery`,
    "Dedicated video player page with autoplay, pause control, and related devotional video navigation.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <section className="rounded-[32px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-[22px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)] md:text-[24px]">Now Playing</p>
              <h1 className="mt-2 text-[16px] font-black text-white md:text-[22px]">{currentVideo.title}</h1>
              <p className="mt-3 text-base leading-8 text-[var(--campaign-text)] md:text-lg">{currentVideo.summary}</p>
            </div>

            <Link
              to={ROUTES.media.videos}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Back to Video Gallery
            </Link>
          </div>

          <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#071b28]">
            <iframe
              key={currentVideo.slug}
              ref={iframeRef}
              src={getYouTubeEmbedUrl(currentVideo.videoUrl)}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-[260px] w-full bg-black md:h-[560px]"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={togglePlayback}
              className="rounded-xl bg-[#ff8a00] px-5 py-3 text-sm font-bold text-white"
            >
              {isPlaying ? "Pause Video" : "Play Video"}
            </button>
            <button
              type="button"
              onClick={restartVideo}
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
            >
              Restart
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <a
              href={currentVideo.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
            >
              Open on YouTube
            </a>
            <span className="inline-flex items-center rounded-xl border border-white/10 bg-[#17384b] px-4 py-3 text-sm font-semibold text-[#d4e1e8]">
              Auto-play enabled on open
            </span>
          </div>
        </section>

      </div>
    </div>
  );
});

type EventHighlightCategoryV2 = "Spiritual Events" | "Seva Events" | "Cultural Events" | "Youth Events" | "Festivals";
type ActiveEventHighlightCategoryV2 = "All" | EventHighlightCategoryV2;

/**
 * CMS-ready Event Highlight model:
 * {
 *   title: string,
 *   slug: string,
 *   category: string,
 *   eventDate: string,
 *   location: string,
 *   shortDescription: string,
 *   fullDescription: string,
 *   coverImage: string,
 *   galleryImages: string[],
 *   videoUrl: string,
 *   youtubeEmbedUrl: string,
 *   isFeatured: boolean,
 *   status: "published" | "draft",
 *   photoCount: number,
 *   videoCount: number,
 *   createdAt: string,
 *   updatedAt: string
 * }
 *
 * Admin actions:
 * - add/edit/delete highlights
 * - upload cover + gallery images
 * - add video URL / YouTube embed URL
 * - set category and featured
 * - publish/unpublish
 * - reorder highlights
 */
type EventHighlightItemV2 = {
  title: string;
  slug: string;
  category: EventHighlightCategoryV2;
  eventDate: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  galleryImages: string[];
  videoUrl?: string;
  youtubeEmbedUrl?: string;
  isFeatured: boolean;
  status: "published" | "draft";
  photoCount: number;
  videoCount: number;
  createdAt: string;
  updatedAt: string;
};

type EventVideoHighlightV2 = {
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  youtubeEmbedUrl: string;
};

type EventCategoryCardV2 = {
  title: string;
  icon: string;
  text: string;
};

type ImpactMetricV2 = {
  label: string;
  value: string;
};

type EventJourneyStepV2 = {
  title: string;
  icon: string;
  text: string;
};

type ReflectionItemV2 = {
  name: string;
  text: string;
};

const EVENT_HIGHLIGHT_CATEGORY_FILTERS_V2: ActiveEventHighlightCategoryV2[] = [
  "All",
  "Spiritual Events",
  "Seva Events",
  "Cultural Events",
  "Youth Events",
  "Festivals",
];

const EVENT_CATEGORY_CARDS_V2: EventCategoryCardV2[] = [
  {
    title: "Bhagwat Katha Mahotsav",
    icon: "/assets/images/media-gallery/icons/icon-bhagwat-katha.svg",
    text: "Sacred discourses, devotional gatherings, satsang and spiritual awakening through Shrimad Bhagwat Katha.",
  },
  {
    title: "Festival Celebrations",
    icon: "/assets/images/media-gallery/icons/icon-festival-celebration.svg",
    text: "Divine celebrations of traditional festivals with puja, bhajan, aarti, prasad and family participation.",
  },
  {
    title: "Guru Purnima",
    icon: "/assets/images/media-gallery/icons/icon-guru-purnima.svg",
    text: "Moments of guru bhakti, samarpan, gurupujan, blessings and spiritual gratitude.",
  },
  {
    title: "Annakut Mahotsav",
    icon: "/assets/images/media-gallery/icons/icon-annakut.svg",
    text: "Grand devotional offerings, 56 bhog, aarti, mahaprasad and community participation.",
  },
  {
    title: "Youth & Cultural Programs",
    icon: "/assets/images/media-gallery/icons/icon-youth-cultural.svg",
    text: "Programs for youth inspiration, sanskar education, cultural performance and values-based leadership.",
  },
  {
    title: "Seva Events",
    icon: "/assets/images/media-gallery/icons/icon-seva-event.svg",
    text: "Food seva, education support, medical assistance, gau seva, disaster relief and social welfare activities.",
  },
];

const EVENT_IMPACT_METRICS_V2: ImpactMetricV2[] = [
  { label: "Events Organised", value: "100+" },
  { label: "Devotees Reached", value: "50,000+" },
  { label: "Volunteers Engaged", value: "1,000+" },
  { label: "Cities & Communities Connected", value: "25+" },
  { label: "Beneficiaries Through Seva", value: "Thousands" },
];

const EVENT_HIGHLIGHTS_DATA_V2: EventHighlightItemV2[] = [
  {
    title: "Bhagwat Katha Mahotsav",
    slug: "bhagwat-katha-mahotsav-highlight",
    category: "Spiritual Events",
    eventDate: "2026-04-02",
    location: "Bhagwat Dham, Chandrapur",
    shortDescription: "A devotional gathering filled with Bhagwat wisdom, satsang, bhajan and spiritual guidance.",
    fullDescription:
      "Bhagwat Katha Mahotsav brought together devotees, families, and youth in a sacred space of learning, remembrance, and collective spiritual upliftment.",
    coverImage: "/assets/images/media-gallery/highlight-bhagwat-katha.jpg",
    galleryImages: ["/assets/images/media-gallery/event-moment-1.jpg", "/assets/images/media-gallery/event-moment-2.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/Z-zaUl-uazk",
    isFeatured: true,
    status: "published",
    photoCount: 58,
    videoCount: 9,
    createdAt: "2026-04-03T10:00:00.000Z",
    updatedAt: "2026-04-05T10:00:00.000Z",
  },
  {
    title: "Guru Purnima Samarpan Parv",
    slug: "guru-purnima-samarpan-parv",
    category: "Spiritual Events",
    eventDate: "2026-03-16",
    location: "Main Mandap",
    shortDescription: "A sacred celebration of gratitude, gurupujan, blessings and disciple devotion.",
    fullDescription: "Devotees offered guru vandana with humility, bhakti, and collective prayer under guidance of the trust.",
    coverImage: "/assets/images/media-gallery/highlight-guru-purnima.jpg",
    galleryImages: ["/assets/images/media-gallery/event-moment-3.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/cOFNyxt4MhM",
    isFeatured: false,
    status: "published",
    photoCount: 42,
    videoCount: 6,
    createdAt: "2026-03-17T10:00:00.000Z",
    updatedAt: "2026-03-17T10:00:00.000Z",
  },
  {
    title: "Annakut Mahotsav",
    slug: "annakut-mahotsav",
    category: "Festivals",
    eventDate: "2026-02-22",
    location: "Temple Courtyard",
    shortDescription: "Grand divine offering, 56 bhog darshan, aarti and mahaprasad seva.",
    fullDescription: "Annakut Mahotsav offered vibrant devotional participation with ceremonial offerings and prasad distribution.",
    coverImage: "/assets/images/media-gallery/highlight-annakut.jpg",
    galleryImages: ["/assets/images/media-gallery/event-moment-4.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/wrg8NMrPwOs",
    isFeatured: false,
    status: "published",
    photoCount: 50,
    videoCount: 5,
    createdAt: "2026-02-23T10:00:00.000Z",
    updatedAt: "2026-02-24T10:00:00.000Z",
  },
  {
    title: "Matru-Pitru Pujan",
    slug: "matru-pitru-pujan",
    category: "Cultural Events",
    eventDate: "2026-02-10",
    location: "Cultural Hall",
    shortDescription: "A values-based family event inspiring respect, gratitude and Indian sanskar.",
    fullDescription: "Children honored parents with traditional rituals and gratitude-focused values sessions.",
    coverImage: "/assets/images/media-gallery/highlight-matru-pitru-pujan.jpg",
    galleryImages: ["/assets/images/media-gallery/event-moment-5.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/ZYX6zpiY-6w",
    isFeatured: false,
    status: "published",
    photoCount: 36,
    videoCount: 4,
    createdAt: "2026-02-11T10:00:00.000Z",
    updatedAt: "2026-02-11T10:00:00.000Z",
  },
  {
    title: "Youth Sanskar Program",
    slug: "youth-sanskar-program",
    category: "Youth Events",
    eventDate: "2026-01-29",
    location: "Youth Learning Center",
    shortDescription: "Youth-focused session for character building, leadership and cultural awareness.",
    fullDescription: "A practical youth initiative combining values education, discipline, and future-focused service awareness.",
    coverImage: "/assets/images/media-gallery/highlight-youth-program.jpg",
    galleryImages: ["/assets/images/media-gallery/event-moment-6.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/oW_Z8hICrHo",
    isFeatured: false,
    status: "published",
    photoCount: 29,
    videoCount: 3,
    createdAt: "2026-01-30T10:00:00.000Z",
    updatedAt: "2026-01-30T10:00:00.000Z",
  },
  {
    title: "Ann Seva Community Drive",
    slug: "ann-seva-community-drive",
    category: "Seva Events",
    eventDate: "2026-01-21",
    location: "Community Service Zone",
    shortDescription: "Community service activity dedicated to food distribution, compassion and human welfare.",
    fullDescription: "Volunteers and devotees collectively delivered food seva with dignity and care to families in need.",
    coverImage: "/assets/images/media-gallery/highlight-ann-seva.jpg",
    galleryImages: ["/assets/images/media-gallery/event-moment-7.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/Rq5iBnW8UEQ",
    isFeatured: false,
    status: "published",
    photoCount: 47,
    videoCount: 4,
    createdAt: "2026-01-22T10:00:00.000Z",
    updatedAt: "2026-01-22T10:00:00.000Z",
  },
  {
    title: "Festival Deepotsav Gathering",
    slug: "festival-deepotsav-gathering",
    category: "Festivals",
    eventDate: "2025-12-20",
    location: "Mandir Prangan",
    shortDescription: "Evening diyas, devotional bhajans, and family participation in festival darshan.",
    fullDescription: "Deepotsav was celebrated through collective prayer, light offerings, and devotional singing.",
    coverImage: "/assets/images/media-gallery/highlight-annakut.jpg",
    galleryImages: ["/assets/images/media-gallery/event-moment-8.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/Z-zaUl-uazk",
    isFeatured: false,
    status: "published",
    photoCount: 39,
    videoCount: 3,
    createdAt: "2025-12-21T10:00:00.000Z",
    updatedAt: "2025-12-21T10:00:00.000Z",
  },
  {
    title: "Bhakti Satsang Sabha",
    slug: "bhakti-satsang-sabha",
    category: "Spiritual Events",
    eventDate: "2025-12-08",
    location: "Bhagwat Satsang Hall",
    shortDescription: "Collective satsang with scriptural reflection and spiritual guidance.",
    fullDescription: "A reflective satsang gathering focused on daily bhakti, inner discipline, and dharmic living.",
    coverImage: "/assets/images/media-gallery/highlight-bhagwat-katha.jpg",
    galleryImages: [],
    youtubeEmbedUrl: "https://www.youtube.com/embed/cOFNyxt4MhM",
    isFeatured: false,
    status: "published",
    photoCount: 21,
    videoCount: 2,
    createdAt: "2025-12-08T10:00:00.000Z",
    updatedAt: "2025-12-09T10:00:00.000Z",
  },
  {
    title: "Cultural Sanskar Showcase",
    slug: "cultural-sanskar-showcase",
    category: "Cultural Events",
    eventDate: "2025-11-26",
    location: "Community Cultural Stage",
    shortDescription: "Cultural performances showcasing values, tradition, and devotional expression.",
    fullDescription: "Students and families presented value-rich performances rooted in spiritual heritage.",
    coverImage: "/assets/images/media-gallery/highlight-matru-pitru-pujan.jpg",
    galleryImages: [],
    youtubeEmbedUrl: "https://www.youtube.com/embed/wrg8NMrPwOs",
    isFeatured: false,
    status: "published",
    photoCount: 33,
    videoCount: 3,
    createdAt: "2025-11-27T10:00:00.000Z",
    updatedAt: "2025-11-27T10:00:00.000Z",
  },
  {
    title: "Youth Leadership Circle",
    slug: "youth-leadership-circle",
    category: "Youth Events",
    eventDate: "2025-11-11",
    location: "Youth Sanskar Campus",
    shortDescription: "Leadership and service orientation for youth through value-based sessions.",
    fullDescription: "An interactive forum building confidence, teamwork, and spiritual responsibility among youth.",
    coverImage: "/assets/images/media-gallery/highlight-youth-program.jpg",
    galleryImages: [],
    youtubeEmbedUrl: "https://www.youtube.com/embed/ZYX6zpiY-6w",
    isFeatured: false,
    status: "published",
    photoCount: 24,
    videoCount: 2,
    createdAt: "2025-11-12T10:00:00.000Z",
    updatedAt: "2025-11-12T10:00:00.000Z",
  },
  {
    title: "Medical Seva Outreach",
    slug: "medical-seva-outreach",
    category: "Seva Events",
    eventDate: "2025-10-30",
    location: "Service Wing",
    shortDescription: "Medical support outreach with compassion, coordination, and volunteer care.",
    fullDescription: "Medical seva camp addressing community health needs with trust-led support and volunteers.",
    coverImage: "/assets/images/media-gallery/highlight-ann-seva.jpg",
    galleryImages: [],
    youtubeEmbedUrl: "https://www.youtube.com/embed/oW_Z8hICrHo",
    isFeatured: false,
    status: "published",
    photoCount: 18,
    videoCount: 2,
    createdAt: "2025-10-31T10:00:00.000Z",
    updatedAt: "2025-10-31T10:00:00.000Z",
  },
];

const EVENT_VIDEO_HIGHLIGHTS_V2: EventVideoHighlightV2[] = [
  {
    title: "Bhagwat Katha Divine Moments",
    category: "Spiritual Events",
    duration: "12:22",
    thumbnail: "/assets/images/media-gallery/highlight-bhagwat-katha.jpg",
    youtubeEmbedUrl: "https://www.youtube.com/embed/Z-zaUl-uazk",
  },
  {
    title: "Guru Purnima Samarpan Highlights",
    category: "Spiritual Events",
    duration: "10:38",
    thumbnail: "/assets/images/media-gallery/highlight-guru-purnima.jpg",
    youtubeEmbedUrl: "https://www.youtube.com/embed/cOFNyxt4MhM",
  },
  {
    title: "Annakut Mahotsav Darshan",
    category: "Festivals",
    duration: "09:11",
    thumbnail: "/assets/images/media-gallery/highlight-annakut.jpg",
    youtubeEmbedUrl: "https://www.youtube.com/embed/wrg8NMrPwOs",
  },
  {
    title: "Youth Sanskar Program",
    category: "Youth Events",
    duration: "08:49",
    thumbnail: "/assets/images/media-gallery/highlight-youth-program.jpg",
    youtubeEmbedUrl: "https://www.youtube.com/embed/oW_Z8hICrHo",
  },
  {
    title: "Seva Activity Highlights",
    category: "Seva Events",
    duration: "11:16",
    thumbnail: "/assets/images/media-gallery/highlight-ann-seva.jpg",
    youtubeEmbedUrl: "https://www.youtube.com/embed/Rq5iBnW8UEQ",
  },
  {
    title: "Festival Celebration Moments",
    category: "Festivals",
    duration: "07:54",
    thumbnail: "/assets/images/media-gallery/event-moment-4.jpg",
    youtubeEmbedUrl: "https://www.youtube.com/embed/ZYX6zpiY-6w",
  },
];

const EVENT_MOMENT_IMAGES_V2 = [
  { src: "/assets/images/media-gallery/event-moment-1.jpg", caption: "Devotee gathering in satsang atmosphere" },
  { src: "/assets/images/media-gallery/event-moment-2.jpg", caption: "Aarti and collective prayer moments" },
  { src: "/assets/images/media-gallery/event-moment-3.jpg", caption: "Seva and volunteer support in action" },
  { src: "/assets/images/media-gallery/event-moment-4.jpg", caption: "Festival celebration with devotional energy" },
  { src: "/assets/images/media-gallery/event-moment-5.jpg", caption: "Cultural participation and family values" },
  { src: "/assets/images/media-gallery/event-moment-6.jpg", caption: "Youth sessions with sanskar learning" },
  { src: "/assets/images/media-gallery/event-moment-7.jpg", caption: "Prasad seva and distribution support" },
  { src: "/assets/images/media-gallery/event-moment-8.jpg", caption: "Volunteer team and community harmony" },
];

const EVENT_JOURNEY_STEPS_V2: EventJourneyStepV2[] = [
  {
    title: "Planning with Purpose",
    icon: "/assets/images/media-gallery/icons/icon-event-planning.svg",
    text: "Each event begins with a clear spiritual, cultural or seva-based purpose.",
  },
  {
    title: "Community Invitation",
    icon: "/assets/images/media-gallery/icons/icon-community-invitation.svg",
    text: "Families, devotees, youth, volunteers and community members are invited with respect.",
  },
  {
    title: "Devotional Participation",
    icon: "/assets/images/media-gallery/icons/icon-devotional-participation.svg",
    text: "The event becomes alive through satsang, puja, katha, seva, bhajan and collective prayer.",
  },
  {
    title: "Volunteer Seva",
    icon: "/assets/images/media-gallery/icons/icon-volunteer-seva.svg",
    text: "Dedicated volunteers support arrangements, discipline, hospitality and seva.",
  },
  {
    title: "Prasad & Blessings",
    icon: "/assets/images/media-gallery/icons/icon-prasad-blessings.svg",
    text: "Participants receive spiritual inspiration, mahaprasad and divine blessings.",
  },
  {
    title: "Impact Archive",
    icon: "/assets/images/media-gallery/icons/icon-impact-archive.svg",
    text: "Photos, videos and reports are preserved as a meaningful media archive.",
  },
];

const EVENT_REFLECTIONS_V2: ReflectionItemV2[] = [
  {
    name: "Devotee Participant",
    text: "The event was not only well organised but spiritually uplifting. It gave our family a deep feeling of devotion and togetherness.",
  },
  {
    name: "Volunteer Sevak",
    text: "Serving in these events gives us discipline, humility and the joy of contributing to a divine mission.",
  },
  {
    name: "Youth Participant",
    text: "The cultural and spiritual programs helped us understand our roots and responsibilities in a practical way.",
  },
];

export const MediaEventHighlightsPage = memo(function MediaEventHighlightsPage() {
  const [activeCategory, setActiveCategory] = useState<ActiveEventHighlightCategoryV2>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [videoModalIndex, setVideoModalIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  usePageMeta(
    "Event Highlights",
    "Explore event highlights from Bhagwat Katha Mahotsav, spiritual festivals, seva activities, cultural programs, Guru Purnima, Annakut Mahotsav, youth programs and community gatherings by Bhagwat Heritage Service Foundation Trust.",
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ogTitle = "Event Highlights | Bhagwat Heritage Service Foundation Trust";
    const ogDescription =
      "Explore event highlights from Bhagwat Katha Mahotsav, spiritual festivals, seva activities, cultural programs, Guru Purnima, Annakut Mahotsav, youth programs and community gatherings by Bhagwat Heritage Service Foundation Trust.";
    const ogImage = "/assets/images/media-gallery/event-highlights-hero.jpg";

    const setMeta = (property: string, content: string) => {
      let node = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute("property", property);
        document.head.appendChild(node);
      }
      node.setAttribute("content", content);
    };

    setMeta("og:title", ogTitle);
    setMeta("og:description", ogDescription);
    setMeta("og:image", ogImage);
  }, []);

  useEffect(() => {
    setVisibleCount(9);
  }, [activeCategory, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVideoModalIndex(null);
        setLightboxIndex(null);
      }
      if (lightboxIndex !== null && event.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % EVENT_MOMENT_IMAGES_V2.length));
      }
      if (lightboxIndex !== null && event.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + EVENT_MOMENT_IMAGES_V2.length) % EVENT_MOMENT_IMAGES_V2.length));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  const publishedHighlights = useMemo(() => EVENT_HIGHLIGHTS_DATA_V2.filter((item) => item.status === "published"), []);

  const featuredHighlight = useMemo(() => publishedHighlights.find((item) => item.isFeatured) ?? publishedHighlights[0], [publishedHighlights]);

  const filteredHighlights = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publishedHighlights.filter((item) => {
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      const queryMatch =
        q.length === 0 || item.title.toLowerCase().includes(q) || item.location.toLowerCase().includes(q) || item.shortDescription.toLowerCase().includes(q);
      return categoryMatch && queryMatch;
    });
  }, [publishedHighlights, activeCategory, query]);

  const visibleHighlights = useMemo(() => filteredHighlights.slice(0, visibleCount), [filteredHighlights, visibleCount]);
  const activeVideo = videoModalIndex !== null ? EVENT_VIDEO_HIGHLIGHTS_V2[videoModalIndex] : null;
  const activeImage = lightboxIndex !== null ? EVENT_MOMENT_IMAGES_V2[lightboxIndex] : null;

  return (
    <div className="space-y-0 pb-14">
      <section className="relative overflow-hidden rounded-[34px] border border-[#E6D0AF] shadow-[0_24px_52px_rgba(95,62,26,0.18)]">
        <img src="/assets/images/media-gallery/event-highlights-hero.jpg" alt="Large spiritual event gathering with devotees and warm lights" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(54,20,10,0.78),rgba(88,24,18,0.60),rgba(15,107,107,0.45))]" />
        <div className="relative z-10 px-6 py-14 text-white md:px-10 md:py-20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F3D8A5]">Home / Media Gallery / Event Highlights</p>
          <p className="mt-5 inline-flex rounded-full bg-white/12 px-4 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">Media Gallery</p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Event Highlights</h1>
          <h2 className="mt-4 text-xl font-black text-[#FFE9C3] md:text-3xl">Moments of Seva, Sanskar, Bhakti &amp; Cultural Awakening</h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-white/90 md:text-lg">
            Explore the inspiring moments from Bhagwat Heritage events where devotion, service, culture, family values, youth participation, and community awakening come together as a living celebration of Dharma.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#latest-event-highlights" className="rounded-full bg-[#D89B2B] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#BD7A14]">View Latest Highlights</a>
            <Link to={ROUTES.media.photos} className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#3A2416]">Explore Photo Gallery</Link>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[28px] border border-[#E8D8BC] bg-[#FFFCF4] p-6 shadow-[0_14px_36px_rgba(98,69,30,0.10)] md:p-8">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Highlights by Event Category</h2>
        <p className="mt-3 text-base leading-7 text-[#5F4A37]">A curated archive of our major spiritual, cultural, social and community-based events.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {EVENT_CATEGORY_CARDS_V2.map((card) => (
            <article key={card.title} className="rounded-[20px] border border-[#E6D4B5] bg-white p-5 shadow-[0_10px_24px_rgba(104,75,38,0.08)] transition hover:-translate-y-1 hover:border-[#D6A34F]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF2DC]">
                <img src={card.icon} alt={`${card.title} icon`} className="h-7 w-7 object-contain" loading="lazy" />
              </div>
              <h3 className="mt-4 text-xl font-black text-[#2A2018]">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5F4A37]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 overflow-hidden rounded-[30px] border border-[#E7D4B7] bg-[linear-gradient(140deg,#FFF6DE_0%,#FFFDF8_50%,#F6E8CB_100%)] shadow-[0_16px_40px_rgba(103,75,37,0.12)]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
          <div className="aspect-[4/3] lg:aspect-auto">
            <img src="/assets/images/media-gallery/featured-event-highlight.jpg" alt="Sant giving discourse while devotees listen with devotion" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="p-6 md:p-8">
            <p className="inline-flex rounded-full bg-[#0F6B6B] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">Featured Highlight</p>
            <h2 className="mt-4 text-3xl font-black text-[#1D342C] md:text-4xl">Divine Moments from Bhagwat Heritage Events</h2>
            <p className="mt-4 text-base leading-7 text-[#5F4A37]">
              Every event organised by Bhagwat Heritage is designed to connect people with devotion, service, sanskar and cultural consciousness. These highlights preserve the most meaningful moments of collective prayer, seva, satsang, youth participation and community harmony.
            </p>
            <ul className="mt-4 space-y-2 text-sm font-semibold text-[#6F5030]">
              <li>Event Type: Spiritual &amp; Cultural Gathering</li>
              <li>Location: Bhagwat Dham / Community Event Venue</li>
              <li>Participation: Devotees, Families, Youth &amp; Volunteers</li>
              <li>Focus: Bhakti, Seva, Sanskar &amp; Social Awakening</li>
            </ul>
            <button type="button" className="mt-6 rounded-full bg-[#D89B2B] px-6 py-3 text-sm font-black text-white transition hover:bg-[#BE7D17]">
              View Complete Highlight
            </button>
          </div>
        </div>
      </section>

      <section id="latest-event-highlights" className="mt-12">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Latest Event Highlights</h2>
        <p className="mt-3 text-base leading-7 text-[#5F4A37]">Browse recent and past event highlights from our spiritual, social and cultural activities.</p>

        <div className="mt-5 rounded-[24px] border border-[#E6D3B1] bg-[#FFF9EA] p-4 shadow-[0_14px_30px_rgba(99,71,31,0.11)] md:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_0.4fr]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by event title or location..."
              aria-label="Search highlights"
              className="w-full rounded-full border border-[#E0C8A0] bg-white px-5 py-3 text-sm text-[#4E3928] outline-none focus:border-[#C8922E] focus:ring-2 focus:ring-[#F0D79D]"
            />
            <p className="flex items-center justify-start text-sm font-bold text-[#6F522F] lg:justify-end">Showing {filteredHighlights.length} highlights</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {EVENT_HIGHLIGHT_CATEGORY_FILTERS_V2.map((filter) => {
              const isActive = activeCategory === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(filter)}
                  className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.08em] transition ${
                    isActive ? "border-[#C8922E] bg-[#D89B2B] text-white" : "border-[#E2CCA6] bg-white text-[#6D5132] hover:border-[#C8922E] hover:bg-[#FFF1D6]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="overflow-hidden rounded-[22px] border border-[#E8D8BC] bg-white p-5">
                <div className="aspect-[4/3] animate-pulse rounded-[14px] bg-[#F4E7CE]" />
                <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-[#F2E1C2]" />
                <div className="mt-3 h-4 w-full animate-pulse rounded bg-[#F5EAD3]" />
                <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-[#F5EAD3]" />
              </div>
            ))}
          </div>
        ) : filteredHighlights.length === 0 ? (
          <div className="mt-6 rounded-[22px] border border-dashed border-[#DDBF90] bg-[#FFF7E6] px-6 py-12 text-center text-[#6D4F2F]">
            No event highlights found. Please try another search or category.
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleHighlights.map((item) => (
                <article key={item.slug} className="overflow-hidden rounded-[22px] border border-[#E8D8BC] bg-white shadow-[0_12px_28px_rgba(104,75,38,0.09)] transition hover:-translate-y-1 hover:shadow-[0_20px_36px_rgba(104,75,38,0.14)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={item.coverImage} alt={`${item.title} event highlight`} className="h-full w-full object-cover" loading="lazy" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#D89B2B] px-3 py-1 text-[11px] font-black text-white">{item.category}</span>
                    <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-black text-white">
                      {item.photoCount} Photos • {item.videoCount} Videos
                    </span>
                  </div>
                  <div className="space-y-2 p-5">
                    <h3 className="line-clamp-2 text-xl font-black leading-tight text-[#2A2118]">{item.title}</h3>
                    <p className="text-sm font-semibold text-[#0F6B6B]">
                      {new Date(item.eventDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} • {item.location}
                    </p>
                    <p className="line-clamp-3 text-sm leading-6 text-[#5F4A37]">{item.shortDescription}</p>
                    <button type="button" className="mt-2 rounded-full bg-[#FFF1D5] px-4 py-2 text-sm font-black text-[#8A5617] transition hover:bg-[#FFE6B9]">
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {visibleCount < filteredHighlights.length ? (
              <div className="mt-8 flex justify-center">
                <button type="button" onClick={() => setVisibleCount((count) => count + 6)} className="rounded-full bg-[#D89B2B] px-7 py-3 text-sm font-black text-white hover:bg-[#BE7D17]">
                  Load More
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>

      <section className="mt-12 rounded-[28px] border border-[#E4CCA0] bg-[linear-gradient(120deg,#FFF0CF_0%,#FFF8E6_42%,#F8E7C0_100%)] p-6 shadow-[0_16px_34px_rgba(98,71,31,0.13)] md:p-8">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Events That Create Spiritual &amp; Social Impact</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {EVENT_IMPACT_METRICS_V2.map((metric) => (
            <article key={metric.label} className="rounded-[16px] border border-[#E5C88F] bg-white/90 p-4 text-center">
              <p className="text-2xl font-black text-[#B87415]">{metric.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-[#6A4C2C]">{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Video Highlights</h2>
        <p className="mt-3 text-base leading-7 text-[#5F4A37]">Watch selected moments from our major events, satsangs, seva activities and cultural programs.</p>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {EVENT_VIDEO_HIGHLIGHTS_V2.map((video, index) => (
            <article key={video.title} className="overflow-hidden rounded-[20px] border border-[#E8D8BC] bg-white shadow-[0_12px_28px_rgba(104,75,38,0.09)]">
              <div className="relative aspect-video overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" loading="lazy" />
                <button
                  type="button"
                  onClick={() => setVideoModalIndex(index)}
                  aria-label={`Watch ${video.title}`}
                  className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white shadow-[0_0_0_8px_rgba(255,255,255,0.14)]"
                >
                  ▶
                </button>
                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-black text-white">{video.duration}</span>
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-xl font-black text-[#2A2118]">{video.title}</h3>
                <p className="text-sm font-semibold text-[#0F6B6B]">{video.category}</p>
                <button type="button" onClick={() => setVideoModalIndex(index)} className="rounded-full bg-[#D89B2B] px-4 py-2 text-sm font-black text-white">
                  Watch
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Moments Captured in Devotion</h2>
        <p className="mt-3 text-base leading-7 text-[#5F4A37]">A visual glimpse of devotion, service, cultural celebration and community participation.</p>
        <div className="mt-6 columns-1 gap-4 sm:columns-2 xl:columns-4">
          {EVENT_MOMENT_IMAGES_V2.map((image, index) => (
            <figure key={image.src} className="mb-4 overflow-hidden rounded-[16px] border border-[#E6D5B5] bg-white shadow-[0_10px_20px_rgba(104,75,38,0.08)]">
              <button type="button" onClick={() => setLightboxIndex(index)} className="block w-full text-left">
                <img src={image.src} alt={image.caption} loading="lazy" className="h-auto w-full object-cover transition duration-300 hover:scale-[1.03]" />
              </button>
              <figcaption className="px-3 py-2 text-xs font-semibold text-[#6A4E30]">{image.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-5">
          <Link to={ROUTES.media.photos} className="inline-flex rounded-full bg-[#0F6B6B] px-6 py-3 text-sm font-black text-white">
            View Full Photo Gallery
          </Link>
        </div>
      </section>

      <section className="mt-12 rounded-[28px] border border-[#E8D8BC] bg-[#FFFCF5] p-6 shadow-[0_14px_32px_rgba(103,75,37,0.10)] md:p-8">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">How Every Event Becomes a Divine Experience</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {EVENT_JOURNEY_STEPS_V2.map((step) => (
            <article key={step.title} className="rounded-[18px] border border-[#E7D5B6] bg-white p-5">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF2DC]">
                <img src={step.icon} alt={`${step.title} icon`} className="h-6 w-6 object-contain" loading="lazy" />
              </div>
              <h3 className="mt-4 text-xl font-black text-[#2A2118]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5F4A37]">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[28px] border border-[#E8D8BC] bg-[#FFFCF5] p-6 shadow-[0_14px_32px_rgba(103,75,37,0.10)] md:p-8">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Voices from Our Events</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {EVENT_REFLECTIONS_V2.map((reflection) => (
            <article key={reflection.name} className="rounded-[18px] border border-[#E6D4B4] bg-white p-5">
              <p className="text-sm leading-7 text-[#5F4A37]">"{reflection.text}"</p>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-[#8A5A1B]">{reflection.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mt-12 overflow-hidden rounded-[28px] border border-[#E2C68D] p-6 shadow-[0_20px_38px_rgba(95,67,30,0.16)] md:p-8">
        <img src="/assets/images/media-gallery/event-highlights-cta.jpg" alt="Golden devotional event ambience with diya and temple lights" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,24,13,0.84),rgba(88,24,18,0.70),rgba(15,107,107,0.68))]" />
        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-black md:text-4xl">Be Part of Our Upcoming Divine Events</h2>
          <p className="mt-3 max-w-4xl text-base leading-7 text-white/90">
            Join Bhagwat Heritage Service Foundation Trust as a devotee, volunteer, supporter or well-wisher and become part of events that spread bhakti, seva, sanskar and cultural awakening.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={ROUTES.involved.volunteer} className="rounded-full bg-[#D89B2B] px-6 py-3 text-sm font-black text-white">Join as Volunteer</Link>
            <Link to={ROUTES.donate} className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-black text-white">Support Event Seva</Link>
            <Link to={`${ROUTES.contact}?subject=invite-event`} className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-black text-white">Invite for Event</Link>
          </div>
        </div>
      </section>

      {activeVideo ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-3 md:p-6" role="dialog" aria-modal="true" aria-label={`Video modal for ${activeVideo.title}`} onClick={() => setVideoModalIndex(null)}>
          <button type="button" aria-label="Close video modal" onClick={() => setVideoModalIndex(null)} className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-2xl text-white hover:bg-white hover:text-[#2B1E13]">
            ×
          </button>
          <div className="w-full max-w-5xl overflow-hidden rounded-[20px] border border-white/20 bg-[#120F0D]" onClick={(event) => event.stopPropagation()}>
            <div className="aspect-video bg-black">
              <iframe src={`${activeVideo.youtubeEmbedUrl}?autoplay=1&rel=0`} title={activeVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full" />
            </div>
          </div>
        </div>
      ) : null}

      {activeImage ? (
        <div className="fixed inset-0 z-[91] flex items-center justify-center bg-black/85 p-3 md:p-6" role="dialog" aria-modal="true" aria-label={activeImage.caption} onClick={() => setLightboxIndex(null)}>
          <button type="button" aria-label="Close image lightbox" onClick={() => setLightboxIndex(null)} className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-2xl text-white hover:bg-white hover:text-[#2B1E13]">
            ×
          </button>
          <button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + EVENT_MOMENT_IMAGES_V2.length) % EVENT_MOMENT_IMAGES_V2.length)); }} className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white hover:bg-white hover:text-[#2B1E13]">
            ‹
          </button>
          <div className="w-full max-w-4xl overflow-hidden rounded-[20px] border border-white/20 bg-[#120F0D]" onClick={(event) => event.stopPropagation()}>
            <img src={activeImage.src} alt={activeImage.caption} className="max-h-[75vh] w-full object-contain" />
            <p className="p-4 text-sm font-semibold text-white/90">{activeImage.caption}</p>
          </div>
          <button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % EVENT_MOMENT_IMAGES_V2.length)); }} className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white hover:bg-white hover:text-[#2B1E13]">
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
});


type PublicationCategoryV3 = "Reports" | "Brochures" | "Study" | "Festival Notes";
type ActivePublicationCategoryV3 = "All" | PublicationCategoryV3;
type PublicationLanguageV3 = "Hindi" | "English" | "Marathi" | "Gujarati";
type PublicationSortV3 = "Latest First" | "Oldest First" | "Title A-Z";

/**
 * CMS/API-ready schema for GET /api/publications
 * {
 *   title: string;
 *   slug: string;
 *   category: "Reports" | "Brochures" | "Study" | "Festival Notes";
 *   year: string;
 *   language: "Hindi" | "English" | "Marathi" | "Gujarati";
 *   description: string;
 *   fileUrl: string;
 *   thumbnail: string;
 *   featured: boolean;
 *   fileType: "PDF";
 *   pageCount: number;
 *   fileSize: string;
 *   createdAt: string;
 *   updatedAt: string;
 *   isPublished: boolean;
 * }
 */
type PublicationItemV3 = {
  title: string;
  slug: string;
  category: PublicationCategoryV3;
  year: string;
  language: PublicationLanguageV3;
  type: "PDF";
  description: string;
  fileUrl: string;
  thumbnail: string;
  featured: boolean;
  pageCount: number;
  fileSize: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
};

type PublicationOverviewCardV3 = {
  title: string;
  icon: string;
  description: string;
  bestUse: string;
};

const PUBLICATION_OVERVIEW_CARDS_V3: PublicationOverviewCardV3[] = [
  {
    title: "Annual & Impact Reports",
    icon: "/assets/icons/publications/icon-annual-report.svg",
    description: "Formal reporting documents covering seva outcomes, accountability, and annual trust progress.",
    bestUse: "Best Use: Donors, institutions, compliance, and long-term understanding.",
  },
  {
    title: "Trust & Mandir Brochures",
    icon: "/assets/icons/publications/icon-brochure.svg",
    description: "Public-facing brochure materials for trust mission, mandir identity, and support directions.",
    bestUse: "Best Use: First-time visitors, outreach teams, and partner introductions.",
  },
  {
    title: "Bhagwat Study Resources",
    icon: "/assets/icons/publications/icon-study-booklet.svg",
    description: "Spiritual study notes and devotional learning companions for satsang and Pathshala use.",
    bestUse: "Best Use: Satsang circles, youth groups, and family devotional study.",
  },
  {
    title: "Festival & Event Notes",
    icon: "/assets/icons/publications/icon-festival-notes.svg",
    description: "Seasonal publication notes, utsav guides, and event-linked devotional participation materials.",
    bestUse: "Best Use: Festival planning, volunteer teams, and public event support.",
  },
];

const PUBLICATION_TYPE_CARDS_V3 = [
  {
    category: "Reports" as const,
    title: "Annual and Impact Reports",
    text: "Formal trust reporting content for accountability, growth summaries, seva outcomes, and program visibility.",
    use: "Ideal for donors, institutions, and long-term trust understanding.",
  },
  {
    category: "Brochures" as const,
    title: "Trust and Mandir Brochures",
    text: "Public-facing introduction material for programs, campus vision, values, and organizational identity.",
    use: "Useful for first-time visitors and outreach distribution.",
  },
  {
    category: "Study" as const,
    title: "Study and Spiritual Booklets",
    text: "Short publications that support satsang learning, event interpretation, and devotional reading paths.",
    use: "Useful for Pathshala, satsang circles, and scriptural orientation.",
  },
  {
    category: "Festival Notes" as const,
    title: "Festival and Event Publications",
    text: "Event-specific notes, annual utsav guides, devotional schedules, and celebration-linked publication material.",
    use: "Useful during public festivals and seasonal devotional planning.",
  },
];

const PUBLICATION_ARCHIVE_V3: PublicationItemV3[] = [
  {
    title: "Annual Trust Report 2026",
    slug: "annual-trust-report-2026",
    category: "Reports",
    year: "2026",
    language: "English",
    type: "PDF",
    description: "Progress, seva reach, and annual trust summary.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    thumbnail: "/assets/images/publications/annual-report-2026.jpg",
    featured: true,
    pageCount: 46,
    fileSize: "5.2 MB",
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-10T10:00:00.000Z",
    isPublished: true,
  },
  {
    title: "Bhagwat Dham Vision Brochure",
    slug: "bhagwat-dham-vision-brochure",
    category: "Brochures",
    year: "2026",
    language: "Hindi",
    type: "PDF",
    description: "Mandir vision, visitor appeal, and support direction.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    thumbnail: "/assets/images/publications/bhagwat-dham-brochure.jpg",
    featured: true,
    pageCount: 18,
    fileSize: "2.1 MB",
    createdAt: "2026-02-01T10:00:00.000Z",
    updatedAt: "2026-02-03T10:00:00.000Z",
    isPublished: true,
  },
  {
    title: "Bhagwat Study Companion Notes",
    slug: "bhagwat-study-companion-notes",
    category: "Study",
    year: "2025",
    language: "Hindi",
    type: "PDF",
    description: "Learning aid for satsang and study circles.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    thumbnail: "/assets/images/publications/study-companion-notes.jpg",
    featured: true,
    pageCount: 62,
    fileSize: "6.4 MB",
    createdAt: "2025-09-14T10:00:00.000Z",
    updatedAt: "2025-09-18T10:00:00.000Z",
    isPublished: true,
  },
  {
    title: "Festival Calendar and Seva Guide",
    slug: "festival-calendar-seva-guide",
    category: "Festival Notes",
    year: "2025",
    language: "Hindi",
    type: "PDF",
    description: "Annual celebration guide and participation structure.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    thumbnail: "/assets/images/publications/festival-calendar-guide.jpg",
    featured: false,
    pageCount: 28,
    fileSize: "3.0 MB",
    createdAt: "2025-10-08T10:00:00.000Z",
    updatedAt: "2025-10-09T10:00:00.000Z",
    isPublished: true,
  },
  {
    title: "Trust Program Introduction Deck",
    slug: "trust-program-introduction-deck",
    category: "Brochures",
    year: "2026",
    language: "English",
    type: "PDF",
    description: "Overview of seva, education, and outreach routes.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    thumbnail: "/assets/images/publications/program-introduction-deck.jpg",
    featured: true,
    pageCount: 24,
    fileSize: "2.7 MB",
    createdAt: "2026-01-22T10:00:00.000Z",
    updatedAt: "2026-01-24T10:00:00.000Z",
    isPublished: true,
  },
  {
    title: "Impact Snapshot Publication",
    slug: "impact-snapshot-publication",
    category: "Reports",
    year: "2025",
    language: "English",
    type: "PDF",
    description: "Short-form donor and public-facing trust impact review.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    thumbnail: "/assets/images/publications/impact-snapshot.jpg",
    featured: false,
    pageCount: 14,
    fileSize: "1.6 MB",
    createdAt: "2025-12-15T10:00:00.000Z",
    updatedAt: "2025-12-16T10:00:00.000Z",
    isPublished: true,
  },
];

export const MediaPublicationsPage = memo(function MediaPublicationsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ActivePublicationCategoryV3>("All");
  const [activeYear, setActiveYear] = useState<"All Years" | "2026" | "2025" | "2024">("All Years");
  const [activeLanguage, setActiveLanguage] = useState<"All Languages" | PublicationLanguageV3>("All Languages");
  const [sortBy, setSortBy] = useState<PublicationSortV3>("Latest First");
  const [visibleCount, setVisibleCount] = useState(9);

  usePageMeta(
    "Publications",
    "Explore reports, brochures, study notes, festival guides, and official publications of Bhagwat Heritage Service Foundation Trust.",
  );

  useEffect(() => {
    setVisibleCount(9);
  }, [query, activeCategory, activeYear, activeLanguage, sortBy]);

  const publishedItems = useMemo(() => PUBLICATION_ARCHIVE_V3.filter((item) => item.isPublished), []);
  const featuredPublications = useMemo(() => publishedItems.filter((item) => item.featured).slice(0, 4), [publishedItems]);

  const filteredPublications = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = publishedItems.filter((item) => {
      const queryMatch = q.length === 0 || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      const yearMatch = activeYear === "All Years" || item.year === activeYear;
      const languageMatch = activeLanguage === "All Languages" || item.language === activeLanguage;
      return queryMatch && categoryMatch && yearMatch && languageMatch;
    });

    return [...base].sort((a, b) => {
      if (sortBy === "Latest First") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "Oldest First") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return a.title.localeCompare(b.title);
    });
  }, [publishedItems, query, activeCategory, activeYear, activeLanguage, sortBy]);

  const visiblePublications = useMemo(() => filteredPublications.slice(0, visibleCount), [filteredPublications, visibleCount]);

  return (
    <div className="space-y-0 pb-14">
      <section className="relative overflow-hidden rounded-[34px] border border-[#E6D0AF] bg-[linear-gradient(140deg,#FFF5DE_0%,#FFFDF8_50%,#F6E8CB_100%)] p-6 shadow-[0_22px_48px_rgba(95,62,26,0.14)] md:p-10">
        <img src="/assets/images/publications/publication-hero.jpg" alt="Devotional publication desk with booklet, diya, and temple silhouette" className="absolute inset-0 h-full w-full object-cover opacity-20" loading="lazy" />
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B97615]">Media Gallery</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#1D342C] md:text-6xl">Publications</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-[#5F4A37] md:text-lg">
            Reports, brochures, study notes, festival documents, and trust publications arranged for devotees, donors, visitors, and well-wishers.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Annual Reports", "Brochures", "Study Notes", "Festival Guides"].map((badge) => (
              <span key={badge} className="rounded-full border border-[#E2C48D] bg-white/85 px-4 py-1.5 text-xs font-black uppercase tracking-[0.08em] text-[#7D5119]">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[28px] border border-[#E8D8BC] bg-[#FFFCF4] p-6 shadow-[0_14px_36px_rgba(98,69,30,0.10)] md:p-8">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Trust Publication Overview</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PUBLICATION_OVERVIEW_CARDS_V3.map((item) => (
            <article key={item.title} className="rounded-[20px] border border-[#E6D4B5] bg-white p-5 shadow-[0_10px_24px_rgba(104,75,38,0.08)]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF2DC]">
                <img src={item.icon} alt={`${item.title} icon`} className="h-7 w-7 object-contain" loading="lazy" />
              </div>
              <h3 className="mt-4 text-xl font-black text-[#2A2018]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5F4A37]">{item.description}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-[#8A5A1B]">{item.bestUse}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Featured Publications</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredPublications.map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-[22px] border border-[#E8D8BC] bg-white shadow-[0_12px_28px_rgba(104,75,38,0.09)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.thumbnail} alt={`${item.title} cover`} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="space-y-2 p-5">
                <span className="inline-flex rounded-full bg-[#D89B2B] px-3 py-1 text-[11px] font-black text-white">{item.category}</span>
                <h3 className="text-lg font-black leading-tight text-[#2A2118]">{item.title}</h3>
                <p className="text-sm leading-6 text-[#5F4A37]">{item.description}</p>
                <div className="pt-1 flex gap-2">
                  <a href={item.fileUrl} target="_blank" rel="noreferrer" aria-label={`Open ${item.title}`} className="rounded-full bg-[#0F6B6B] px-3 py-2 text-xs font-black text-white">
                    View Publication
                  </a>
                  <a href={item.fileUrl} download={`${item.slug}.pdf`} aria-label={`Download ${item.title} PDF`} className="rounded-full border border-[#D8B17A] bg-[#FFF7E6] px-3 py-2 text-xs font-black text-[#845116]">
                    Download PDF
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[24px] border border-[#E6D3B1] bg-[#FFF9EA] p-4 shadow-[0_14px_30px_rgba(99,71,31,0.11)] md:p-5">
        <div className="grid gap-3 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search publications..."
              aria-label="Search publications"
              className="w-full rounded-full border border-[#E0C8A0] bg-white px-5 py-3 text-sm text-[#4E3928] outline-none focus:border-[#C8922E] focus:ring-2 focus:ring-[#F0D79D]"
            />
          </div>
          <select value={activeYear} onChange={(event) => setActiveYear(event.target.value as "All Years" | "2026" | "2025" | "2024")} className="rounded-full border border-[#E0C8A0] bg-white px-4 py-3 text-sm font-semibold text-[#4E3928] outline-none">
            <option>All Years</option>
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
          <select value={activeLanguage} onChange={(event) => setActiveLanguage(event.target.value as "All Languages" | PublicationLanguageV3)} className="rounded-full border border-[#E0C8A0] bg-white px-4 py-3 text-sm font-semibold text-[#4E3928] outline-none">
            <option>All Languages</option>
            <option>Hindi</option>
            <option>English</option>
            <option>Marathi</option>
            <option>Gujarati</option>
          </select>
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_220px]">
          <div className="flex flex-wrap gap-2">
            {(["All", "Reports", "Brochures", "Study", "Festival Notes"] as const).map((filter) => {
              const isActive = activeCategory === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(filter)}
                  className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.08em] transition ${
                    isActive ? "border-[#C8922E] bg-[#D89B2B] text-white" : "border-[#E2CCA6] bg-white text-[#6D5132] hover:border-[#C8922E] hover:bg-[#FFF1D6]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value as PublicationSortV3)} className="rounded-full border border-[#E0C8A0] bg-white px-4 py-3 text-sm font-semibold text-[#4E3928] outline-none">
            <option>Latest First</option>
            <option>Oldest First</option>
            <option>Title A-Z</option>
          </select>
        </div>
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PUBLICATION_TYPE_CARDS_V3.map((item) => (
            <article key={item.title} className="rounded-[18px] border border-[#E7D5B6] bg-white p-5 shadow-[0_10px_22px_rgba(104,75,38,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B37415]">{item.category}</p>
              <h3 className="mt-3 text-xl font-black text-[#2A2118]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5F4A37]">{item.text}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-[#8A5A1B]">Best Use: {item.use}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Publications Archive</h2>
        {filteredPublications.length === 0 ? (
          <div className="mt-6 rounded-[22px] border border-dashed border-[#DDBF90] bg-[#FFF7E6] px-6 py-12 text-center text-[#6D4F2F]">
            No publications found. Please try another search or category.
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visiblePublications.map((item) => (
                <article key={item.slug} className="overflow-hidden rounded-[22px] border border-[#E8D8BC] bg-white shadow-[0_12px_28px_rgba(104,75,38,0.09)] transition hover:-translate-y-1 hover:shadow-[0_20px_36px_rgba(104,75,38,0.14)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F7EAD3]">
                    <img src={item.thumbnail} alt={`${item.title} publication cover`} className="h-full w-full object-cover" loading="lazy" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#D89B2B] px-3 py-1 text-[11px] font-black text-white">{item.category}</span>
                  </div>
                  <div className="space-y-2 p-5">
                    <h3 className="line-clamp-2 text-xl font-black leading-tight text-[#2A2118]">{item.title}</h3>
                    <p className="line-clamp-2 text-sm leading-6 text-[#5F4A37]">{item.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.06em] text-[#6D5132]">
                      <span>{item.year}</span>
                      <span>•</span>
                      <span>{item.language}</span>
                      <span>•</span>
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>{item.pageCount} Pages</span>
                      <span>•</span>
                      <span>{item.fileSize}</span>
                    </div>
                    <div className="pt-2 flex gap-2">
                      <a href={item.fileUrl} target="_blank" rel="noreferrer" aria-label={`Open publication ${item.title}`} className="rounded-full bg-[#0F6B6B] px-4 py-2 text-sm font-black text-white">
                        Open Publication
                      </a>
                      <a href={item.fileUrl} download={`${item.slug}.pdf`} aria-label={`Download publication ${item.title}`} className="rounded-full border border-[#D8B17A] bg-[#FFF7E6] px-4 py-2 text-sm font-black text-[#845116]">
                        Download PDF
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {visibleCount < filteredPublications.length ? (
              <div className="mt-8 flex justify-center">
                <button type="button" onClick={() => setVisibleCount((count) => count + 6)} className="rounded-full bg-[#D89B2B] px-7 py-3 text-sm font-black text-white hover:bg-[#BE7D17]">
                  Load More
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[18px] border border-[#E8D8BC] bg-[#FFFCF5] p-5 shadow-[0_10px_24px_rgba(104,75,38,0.08)]">
          <h2 className="text-2xl font-black text-[#1D342C]">Annual Reports &amp; Impact Documents</h2>
          <p className="mt-3 text-sm leading-6 text-[#5F4A37]">Transparent documentation of seva activities, organizational growth, community impact, and future direction.</p>
          <button type="button" className="mt-4 rounded-full bg-[#D89B2B] px-5 py-2 text-xs font-black text-white">Explore Reports</button>
        </article>
        <article className="rounded-[18px] border border-[#E8D8BC] bg-[#FFFCF5] p-5 shadow-[0_10px_24px_rgba(104,75,38,0.08)]">
          <h2 className="text-2xl font-black text-[#1D342C]">Brochures &amp; Program Introductions</h2>
          <p className="mt-3 text-sm leading-6 text-[#5F4A37]">Simple, shareable introduction documents for devotees, visitors, donors, institutions, and event participants.</p>
        </article>
        <article className="rounded-[18px] border border-[#E8D8BC] bg-[#FFFCF5] p-5 shadow-[0_10px_24px_rgba(104,75,38,0.08)]">
          <h2 className="text-2xl font-black text-[#1D342C]">Study Notes &amp; Spiritual Booklets</h2>
          <p className="mt-3 text-sm leading-6 text-[#5F4A37]">Devotional learning resources for Bhagwat study, satsang circles, Pathshala learning, and family reading.</p>
        </article>
        <article className="rounded-[18px] border border-[#E8D8BC] bg-[#FFFCF5] p-5 shadow-[0_10px_24px_rgba(104,75,38,0.08)]">
          <h2 className="text-2xl font-black text-[#1D342C]">Festival Notes &amp; Event Guides</h2>
          <p className="mt-3 text-sm leading-6 text-[#5F4A37]">Publication material for utsavs, celebrations, schedules, seva participation, and cultural programs.</p>
        </article>
      </section>

      <section className="relative mt-12 overflow-hidden rounded-[28px] border border-[#E2C68D] p-6 shadow-[0_20px_38px_rgba(95,67,30,0.16)] md:p-8">
        <img src="/assets/images/publications/publication-cta-banner.jpg" alt="Spiritual document table with diya and brochure in golden atmosphere" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,24,13,0.84),rgba(88,24,18,0.70),rgba(15,107,107,0.62))]" />
        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-black md:text-4xl">Need a Publication or Trust Document?</h2>
          <p className="mt-3 max-w-4xl text-base leading-7 text-white/90">
            For official reports, brochures, event notes, or institutional sharing material, please contact the Bhagwat Heritage team.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={ROUTES.contact} className="rounded-full bg-[#D89B2B] px-6 py-3 text-sm font-black text-white">Contact Trust</Link>
            <Link to={ROUTES.media.photos} className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-black text-white">View Gallery</Link>
          </div>
        </div>
      </section>
    </div>
  );
});


type SocialPlatformV4 = "Instagram" | "YouTube" | "Facebook" | "WhatsApp";
type SocialCategoryV4 = "Announcements" | "Festival" | "Seva" | "Youth" | "Spiritual";
type SocialFilterV4 = "All" | "Announcements" | "Festival" | "Seva" | "Youth" | "YouTube" | "Instagram" | "WhatsApp";

type SocialPostV4 = {
  platform: SocialPlatformV4;
  category: SocialCategoryV4;
  title: string;
  date: string;
  image: string;
  description: string;
  link: string;
};

type SocialChannelCardV4 = {
  platform: SocialPlatformV4;
  icon: string;
  description: string;
  link: string;
};

const SOCIAL_CHANNEL_CARDS_V4: SocialChannelCardV4[] = [
  {
    platform: "Instagram",
    icon: "/assets/images/media-gallery/icons/icon-instagram.svg",
    description: "Reels, festival glimpses, and seva moments from trust activities.",
    link: "#",
  },
  {
    platform: "YouTube",
    icon: "/assets/images/media-gallery/icons/icon-youtube.svg",
    description: "Katha videos, pravachan clips, and event highlights.",
    link: "#",
  },
  {
    platform: "Facebook",
    icon: "/assets/images/media-gallery/icons/icon-facebook.svg",
    description: "Official updates and public announcements from Bhagwat Heritage.",
    link: "#",
  },
  {
    platform: "WhatsApp",
    icon: "/assets/images/media-gallery/icons/icon-whatsapp.svg",
    description: "Fast seva coordination and community alerts.",
    link: "#",
  },
];

const SOCIAL_FEED_POSTS_V4: SocialPostV4[] = [
  {
    platform: "Instagram",
    category: "Festival",
    title: "Festival Reel Feedback",
    date: "2026-04-12",
    image: "/assets/images/media-gallery/social-festival-reel.jpg",
    description:
      "Festival reels feel vibrant and devotional when celebration atmosphere, darshan, aarti and community joy are shown clearly.",
    link: "#",
  },
  {
    platform: "Facebook",
    category: "Announcements",
    title: "Public Update Response",
    date: "2026-04-10",
    image: "/assets/images/media-gallery/social-announcement.jpg",
    description:
      "Structured announcement posts help followers stay informed about event dates, seva notices and official trust messages.",
    link: "#",
  },
  {
    platform: "WhatsApp",
    category: "Seva",
    title: "Seva Group Feedback",
    date: "2026-04-08",
    image: "/assets/images/media-gallery/social-whatsapp-seva.jpg",
    description:
      "WhatsApp updates are helpful for volunteer coordination, last-minute seva alerts and quick festival information sharing.",
    link: "#",
  },
  {
    platform: "YouTube",
    category: "Spiritual",
    title: "YouTube Viewer Response",
    date: "2026-04-05",
    image: "/assets/images/media-gallery/social-youtube-katha.jpg",
    description:
      "Long-form katha videos and highlight clips help devotees stay connected even when they cannot physically attend programs.",
    link: "#",
  },
  {
    platform: "Instagram",
    category: "Youth",
    title: "Youth Participation Moment",
    date: "2026-04-03",
    image: "/assets/images/media-gallery/social-youth-engagement.jpg",
    description:
      "Youth-focused posts should highlight discipline, cultural pride, seva participation and positive community engagement.",
    link: "#",
  },
  {
    platform: "Facebook",
    category: "Seva",
    title: "Ground Seva Update",
    date: "2026-04-01",
    image: "/assets/images/media-gallery/social-ground-seva.jpg",
    description:
      "Seva posts should show real impact through field clips, volunteer activity, food distribution and human service moments.",
    link: "#",
  },
];

export const MediaSocialFeedPage = memo(function MediaSocialFeedPage() {
  const [activeFilter, setActiveFilter] = useState<SocialFilterV4>("All");

  usePageMeta(
    "Social Feed",
    "Official updates, seva moments, festival highlights, youth participation, and community voices from Bhagwat Heritage Service Foundation Trust.",
  );

  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") return SOCIAL_FEED_POSTS_V4;
    if (activeFilter === "YouTube" || activeFilter === "Instagram" || activeFilter === "WhatsApp") {
      return SOCIAL_FEED_POSTS_V4.filter((post) => post.platform === activeFilter);
    }
    return SOCIAL_FEED_POSTS_V4.filter((post) => post.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-0 pb-14">
      <section className="relative overflow-hidden rounded-[34px] border border-[#E6D0AF] bg-[linear-gradient(140deg,#FFF5DE_0%,#FFFDF8_50%,#F6E8CB_100%)] shadow-[0_24px_52px_rgba(95,62,26,0.16)]">
        <img src="/assets/images/media-gallery/social-feed-hero.jpg" alt="Devotional social media hero with temple glow and community atmosphere" className="absolute inset-0 h-full w-full object-cover opacity-45" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,245,221,0.88),rgba(255,252,245,0.82),rgba(230,196,138,0.72))]" />
        <div className="relative z-10 px-6 py-14 md:px-10 md:py-20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B97615]">Media Gallery</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#1D342C] md:text-6xl">Social Feed</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-[#5F4A37] md:text-lg">
            Official updates, seva moments, festival highlights, youth participation, and community voices from Bhagwat Heritage Service Foundation Trust.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Instagram", "YouTube", "Facebook", "WhatsApp"].map((badge) => (
              <span key={badge} className="rounded-full border border-[#E2C48D] bg-white/90 px-4 py-1.5 text-xs font-black uppercase tracking-[0.08em] text-[#7D5119]">
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="rounded-full bg-[#D89B2B] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#BD7A14]">
              Follow Official Channels
            </button>
            <button type="button" className="rounded-full border border-[#0F6B6B] bg-white px-6 py-3 text-sm font-black text-[#0F6B6B] transition hover:bg-[#EEF9F9]">
              Share Your Seva Story
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {SOCIAL_CHANNEL_CARDS_V4.map((item) => (
            <article key={item.platform} className="rounded-[20px] border border-[#E6D4B5] bg-white p-5 shadow-[0_10px_24px_rgba(104,75,38,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(104,75,38,0.12)]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF2DC]">
                <img src={item.icon} alt={`${item.platform} icon`} className="h-7 w-7 object-contain" loading="lazy" />
              </div>
              <h2 className="mt-4 text-2xl font-black text-[#1D342C]">{item.platform}</h2>
              <p className="mt-2 text-sm leading-6 text-[#5F4A37]">{item.description}</p>
              <a href={item.link} className="mt-4 inline-flex rounded-full bg-[#0F6B6B] px-4 py-2 text-xs font-black text-white" aria-label={`Open ${item.platform} channel`}>
                Open Channel
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[24px] border border-[#E6D3B1] bg-[#FFF9EA] p-4 shadow-[0_14px_30px_rgba(99,71,31,0.11)] md:p-5">
        <div className="flex flex-wrap gap-2">
          {(["All", "Announcements", "Festival", "Seva", "Youth", "YouTube", "Instagram", "WhatsApp"] as SocialFilterV4[]).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.08em] transition ${
                  isActive ? "border-[#C8922E] bg-[linear-gradient(120deg,#0F6B6B,#D89B2B)] text-white" : "border-[#E2CCA6] bg-white text-[#6D5132] hover:border-[#C8922E] hover:bg-[#FFF1D6]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <article key={post.title} className="overflow-hidden rounded-[22px] border border-[#E8D8BC] bg-white shadow-[0_12px_28px_rgba(104,75,38,0.09)] transition hover:-translate-y-1 hover:shadow-[0_20px_36px_rgba(104,75,38,0.14)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={post.image} alt={`${post.title} social update`} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-3 top-3 rounded-full bg-[#D89B2B] px-3 py-1 text-[11px] font-black text-white">{post.category}</span>
              </div>
              <div className="space-y-2 p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#6C4F2F]">
                  <img src={`/assets/images/media-gallery/icons/icon-${post.platform.toLowerCase()}.svg`} alt={`${post.platform} icon`} className="h-4 w-4 object-contain" loading="lazy" />
                  <span>{post.platform}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                </div>
                <h3 className="text-xl font-black leading-tight text-[#2A2118]">{post.title}</h3>
                <p className="text-sm leading-6 text-[#5F4A37]">{post.description}</p>
                <a href={post.link} className="inline-flex rounded-full bg-[#0F6B6B] px-4 py-2 text-sm font-black text-white" aria-label={`View update: ${post.title}`}>
                  View Update
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Featured Social Highlights</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            { title: "Festival Live Pulse", image: "/assets/images/media-gallery/featured-festival-pulse.jpg", text: "Darshan atmosphere, festival devotion, and public celebration moments." },
            { title: "Seva in Motion", image: "/assets/images/media-gallery/featured-seva-motion.jpg", text: "On-ground seva activity and volunteer effort in real-time action frames." },
            { title: "Youth & Family Engagement", image: "/assets/images/media-gallery/featured-youth-family.jpg", text: "Youth participation and family-centered values through spiritual community activities." },
          ].map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[22px] border border-[#E8D8BC] bg-white shadow-[0_12px_28px_rgba(104,75,38,0.09)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={`${item.title} highlight`} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-xl font-black text-[#2A2118]">{item.title}</h3>
                <p className="text-sm leading-6 text-[#5F4A37]">{item.text}</p>
                <button type="button" className="rounded-full bg-[#D89B2B] px-4 py-2 text-xs font-black text-white">Explore Highlights</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[28px] border border-[#E8D8BC] bg-[#FFFCF5] p-6 shadow-[0_14px_32px_rgba(103,75,37,0.10)] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Video &amp; Reel Highlights</h2>
            <p className="mt-3 text-base leading-7 text-[#5F4A37]">
              Watch selected katha clips, devotional reels, seva highlights and event memories from our official media channels.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Bhagwat Katha Clip", image: "/assets/images/media-gallery/youtube-katha-preview.jpg" },
              { title: "Festival Aarti Moment", image: "/assets/images/media-gallery/reel-aarti-preview.jpg" },
              { title: "Seva Highlight Reel", image: "/assets/images/media-gallery/seva-reel-preview.jpg" },
            ].map((video) => (
              <article key={video.title} className="overflow-hidden rounded-[18px] border border-[#E7D5B6] bg-white">
                <a href="#" className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={video.image} alt={`${video.title} preview`} className="h-full w-full object-cover" loading="lazy" />
                    <span className="absolute left-1/2 top-1/2 inline-flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white">▶</span>
                  </div>
                </a>
                <div className="p-3">
                  <h3 className="text-sm font-black text-[#2A2118]">{video.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-[28px] border border-[#E8D8BC] bg-[#FFFCF5] p-6 shadow-[0_14px_32px_rgba(103,75,37,0.10)] md:p-8">
        <h2 className="text-3xl font-black text-[#1D342C] md:text-4xl">Community Voices</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            "The updates help us remain connected with Bhagwat Heritage activities.",
            "Festival posts bring devotional energy even from a distance.",
            "Seva updates inspire more people to participate and contribute.",
          ].map((text, idx) => (
            <article key={idx} className="rounded-[18px] border border-[#E6D4B4] bg-white p-5">
              <p className="text-[#B87415] text-2xl leading-none">“</p>
              <p className="mt-2 text-sm leading-7 text-[#5F4A37]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mt-12 overflow-hidden rounded-[28px] border border-[#E2C68D] p-6 shadow-[0_20px_38px_rgba(95,67,30,0.16)] md:p-8">
        <img src="/assets/images/media-gallery/social-feed-cta.jpg" alt="Devotional community and seva volunteers with temple light ambience" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,24,13,0.84),rgba(88,24,18,0.68),rgba(15,107,107,0.62))]" />
        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-black md:text-4xl">Share Your Seva Story With Us</h2>
          <p className="mt-3 max-w-4xl text-base leading-7 text-white/90">
            If you participated in seva, festivals, satsang, youth programs or cultural activities, share your experience and selected moments may be featured on our official channels.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="rounded-full bg-[#D89B2B] px-6 py-3 text-sm font-black text-white">Submit Story</button>
            <Link to={`${ROUTES.contact}?subject=media-team`} className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-black text-white">Contact Media Team</Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["YouTube", "Facebook", "Instagram", "WhatsApp"].map((channel) => (
              <a key={channel} href="#" className="rounded-full border border-white/70 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-white">
                {channel}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});


export const DigitalSatsangPage = memo(function DigitalSatsangPage() {
  usePageMeta(
    "Online Satsang | Bhagwat Heritage Service Foundation Trust",
    "Join Online Satsang, live pravachan, Bhagwat Katha, bhajan, replay sessions, and digital satsang services by Bhagwat Heritage Service Foundation Trust.",
  );

  const satsangEvents = [
    {
      title: "Weekly Gita Pravachan",
      date: "Every Sunday",
      time: "07:00 PM IST",
      speaker: "Bhagwat Heritage Satsang Team",
      mode: "Live Video",
      joinLink: "https://youtube.com/@bhagwatheritage",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    cityCountry: "",
    satsangType: "Family" as "Family" | "Group" | "Community" | "Institution" | "Festival" | "Special Occasion",
    preferredMode: "Audio" as "Audio" | "Video" | "Zoom" | "YouTube" | "WhatsApp" | "Website Live",
    preferredDate: "",
    preferredTime: "",
    messagePurpose: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const quickCards = [
    { icon: "/assets/icons/online-satsang/icon-live-audio.svg", title: "Live Audio", text: "Listen to pravachan, bhajan, and satsang through audio-friendly access." },
    { icon: "/assets/icons/online-satsang/icon-live-video.svg", title: "Live Video", text: "Watch satsang, katha, and spiritual programs through digital broadcast." },
    { icon: "/assets/icons/online-satsang/icon-replay-access.svg", title: "Replay Access", text: "Revisit selected satsang sessions for peaceful listening and reflection." },
    { icon: "/assets/icons/online-satsang/icon-digital-booking.svg", title: "Book Satsang", text: "Request a special online satsang session for family, group, or community." },
  ];

  const modes = [
    {
      badge: "Live Audio",
      title: "Listen to Satsang in Audio Mode",
      text: "Best for devotees who want peaceful listening during travel, home routine, or low-bandwidth situations.",
      cta: "Listen Now",
      href: "https://youtube.com/@bhagwatheritage",
      image: "/assets/images/online-satsang/online-satsang-audio.jpg",
    },
    {
      badge: "Live Video",
      title: "Watch Satsang in Video Mode",
      text: "Best for devotees who want darshan, pravachan, bhajan, festival broadcast, and visual participation.",
      cta: "Watch Now",
      href: "https://youtube.com/@bhagwatheritage",
      image: "/assets/images/online-satsang/online-satsang-video.jpg",
    },
    {
      badge: "Replay",
      title: "Access Replay Satsang",
      text: "Selected satsang sessions may be made available for later listening and spiritual reflection.",
      cta: "View Replay",
      href: ROUTES.media.videos,
      image: "/assets/images/online-satsang/online-satsang-replay.jpg",
    },
    {
      badge: "Booking",
      title: "Book or Request Online Satsang",
      text: "Families, groups, communities, and institutions can request special digital satsang sessions.",
      cta: "Request Satsang",
      href: "#satsang-request-form",
      image: "/assets/images/online-satsang/online-satsang-booking.jpg",
    },
  ];

  const steps = [
    { icon: "/assets/icons/online-satsang/icon-select-mode.svg", title: "Step 1", text: "Choose your mode - Audio, Video, Replay, or Booking." },
    { icon: "/assets/icons/online-satsang/icon-platform-link.svg", title: "Step 2", text: "Select the official platform link or request form." },
    { icon: "/assets/icons/online-satsang/icon-join-live.svg", title: "Step 3", text: "Join the live session or submit your satsang request." },
    { icon: "/assets/icons/online-satsang/icon-confirmation.svg", title: "Step 4", text: "Receive confirmation, link, timing, or replay support." },
  ];

  const platforms = [
    { icon: "/assets/icons/online-satsang/icon-youtube-satsang.svg", name: "YouTube Satsang", desc: "Watch live pravachan, katha, bhajan, event broadcast, and replay videos.", actions: [{ label: "Watch Live", href: "https://youtube.com/@bhagwatheritage" }, { label: "Join Channel", href: "https://youtube.com/@bhagwatheritage" }] },
    { icon: "/assets/icons/online-satsang/icon-facebook-updates.svg", name: "Facebook Satsang Updates", desc: "Receive announcements, event updates, live posts, and community satsang highlights.", actions: [{ label: "Follow Page", href: "https://www.facebook.com/share/1AtpQtn1SL/" }, { label: "View Updates", href: "https://www.facebook.com/share/1AtpQtn1SL/" }] },
    { icon: "/assets/icons/online-satsang/icon-instagram-feed.svg", name: "Instagram Devotional Feed", desc: "Short clips, spiritual moments, quotes, reels, and devotional highlights.", actions: [{ label: "Follow Instagram", href: "https://www.instagram.com/bhagwat.heritage" }, { label: "View Reels", href: "https://www.instagram.com/bhagwat.heritage" }] },
    { icon: "/assets/icons/online-satsang/icon-whatsapp-group.svg", name: "WhatsApp Satsang Groups", desc: "Receive satsang links, reminders, seva notices, and important announcements.", actions: [{ label: "Join WhatsApp", href: "https://wa.me/918668897445" }, { label: "Get Updates", href: "https://wa.me/918668897445" }] },
    { icon: "/assets/icons/online-satsang/icon-website-live.svg", name: "Website Live Join Page", desc: "Central website-based joining area for live, replay, and digital satsang access.", actions: [{ label: "Open Live Page", href: ROUTES.media.videos }, { label: "View Schedule", href: ROUTES.eventsKatha.index }] },
    { icon: "/assets/icons/online-satsang/icon-replay-archive.svg", name: "Replay Archive", desc: "Access selected satsang sessions and spiritual discourses for later reflection.", actions: [{ label: "View Replay", href: ROUTES.media.videos }, { label: "Request Recording", href: "#satsang-request-form" }] },
  ];

  const faqs = [
    { q: "Can I join Online Satsang from outside India?", a: "Yes, devotees from any location can join through available digital platforms." },
    { q: "Is Online Satsang free?", a: "Regular digital satsang access may be free. Special family, group, or institutional sessions can be requested through the booking form." },
    { q: "Can we request a special online satsang?", a: "Yes, families, groups, and institutions can submit a request with preferred date, time, and purpose." },
    { q: "Will replay be available?", a: "Replay access depends on the type of satsang and availability of recordings." },
    { q: "Which platforms are used?", a: "YouTube, Facebook, Instagram, WhatsApp, website live page, and other suitable digital platforms may be used." },
  ];

  const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof typeof form, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!/^\d{10}$/.test(form.mobileNumber.trim())) nextErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!form.cityCountry.trim()) nextErrors.cityCountry = "City / Country is required.";
    if (!form.preferredDate) nextErrors.preferredDate = "Preferred date is required.";
    if (!form.preferredTime) nextErrors.preferredTime = "Preferred time is required.";
    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    if (!validateForm()) return;

    try {
      setLoading(true);
      await onlineSatsangApi.request(form);
      setSuccessMsg("Your online satsang request has been received. Our team will contact you soon.");
      setForm({
        fullName: "",
        mobileNumber: "",
        email: "",
        cityCountry: "",
        satsangType: "Family",
        preferredMode: "Audio",
        preferredDate: "",
        preferredTime: "",
        messagePurpose: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit request right now. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const sectionCard = "rounded-[22px] border border-[#f4dcb4] bg-[#fffdf8] p-6 shadow-[0_16px_35px_rgba(120,81,16,0.08)]";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff9ee_0%,#fffdf8_100%)] pb-16 text-[#3b2b1f]">
      <HeroSection
        title="Online Satsang"
        subtitle="Digital darshan, real devotion - connect with pravachan, bhajan, katha, and spiritual guidance from anywhere."
        subtitleClassName="mx-auto mt-4 max-w-3xl text-base font-medium text-[#f5ead7] md:text-lg"
        contentClassName="mx-auto max-w-5xl px-4 text-center"
        backgroundImage="/assets/images/online-satsang/online-satsang-hero.jpg"
        boxed
        heightClass="h-[380px] md:h-[520px]"
        overlayClass="bg-[linear-gradient(120deg,rgba(27,21,18,0.78),rgba(110,66,16,0.62))]"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://youtube.com/@bhagwatheritage" target="_blank" rel="noreferrer" className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>Watch Live Satsang</a>
          <a href="https://youtube.com/@bhagwatheritage" target="_blank" rel="noreferrer" className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>Listen Audio Satsang</a>
          <a href="#satsang-request-form" className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>Book Digital Satsang</a>
        </div>
      </HeroSection>

      <section className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-4 px-4 md:grid-cols-2 xl:grid-cols-4">
        {quickCards.map((item) => (
          <article key={item.title} className={sectionCard}>
            <img src={item.icon} alt={item.title} className="h-12 w-12" loading="lazy" />
            <h2 className="mt-4 text-lg font-semibold text-[#8a4b08]">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5a4a3e]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className={sectionCard}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b66d0d]">About Online Satsang</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#4d2d12] md:text-3xl">What is Online Satsang?</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5a4a3e]">
            Online Satsang is a digital seva initiative by Bhagwat Heritage Service Foundation Trust to help devotees remain connected with spiritual learning, Bhagwat Katha, bhajan, pravachan, and guidance even when they are unable to attend physically. Through live audio, video, replay, and digital booking support, devotees can participate in satsang from home, workplace, travel, or community spaces.
          </p>
        </article>
        <article className={`${sectionCard} overflow-hidden p-0`}>
          <img src="/assets/images/online-satsang/online-satsang-about.jpg" alt="Devotees joining online satsang from home" className="h-full min-h-[260px] w-full object-cover" loading="lazy" />
        </article>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4">
        <div className={sectionCard}>
          <h2 className="text-2xl font-semibold text-[#4d2d12] md:text-3xl">Choose the Right Way to Join Satsang</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {modes.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[20px] border border-[#f2d8ad] bg-white shadow-[0_10px_28px_rgba(120,81,16,0.08)]">
                <img src={item.image} alt={item.title} className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <span className="rounded-full bg-[#fde7c6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a4b08]">{item.badge}</span>
                  <h3 className="mt-3 text-lg font-semibold text-[#4d2d12]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#5a4a3e]">{item.text}</p>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="mt-4 inline-flex rounded-full bg-[#c87515] px-4 py-2 text-sm font-semibold text-white hover:bg-[#a8600f]">{item.cta}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4">
        <div className={sectionCard}>
          <h2 className="text-2xl font-semibold text-[#4d2d12] md:text-3xl">How Devotees Can Join</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-[#f2d8ad] bg-white p-5">
                <img src={step.icon} alt={step.title} className="h-10 w-10" loading="lazy" />
                <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#8a4b08]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#5a4a3e]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4">
        <div className={sectionCard}>
          <h2 className="text-2xl font-semibold text-[#4d2d12] md:text-3xl">Official Digital Platforms</h2>
          <p className="mt-2 text-sm text-[#5a4a3e]">Connect through verified Bhagwat Heritage digital channels.</p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {platforms.map((platform) => (
              <article key={platform.name} className="rounded-2xl border border-[#f2d8ad] bg-white p-5">
                <div className="flex items-start gap-3">
                  <img src={platform.icon} alt={platform.name} className="h-10 w-10" loading="lazy" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#4d2d12]">{platform.name}</h3>
                    <p className="mt-2 text-sm text-[#5a4a3e]">{platform.desc}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {platform.actions.map((action) => (
                    <a key={action.label} href={action.href} target={action.href.startsWith("http") ? "_blank" : undefined} rel={action.href.startsWith("http") ? "noreferrer" : undefined} className="rounded-full border border-[#dfb26a] px-3 py-2 text-xs font-semibold text-[#7a4309] hover:bg-[#fff1d9]">{action.label}</a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4">
        <div className={sectionCard}>
          <h2 className="text-2xl font-semibold text-[#4d2d12] md:text-3xl">Current & Upcoming Online Satsang</h2>
          {satsangEvents.length ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {satsangEvents.map((eventItem) => (
                <article key={eventItem.title} className="rounded-2xl border border-[#f2d8ad] bg-white p-5">
                  <h3 className="text-lg font-semibold text-[#4d2d12]">{eventItem.title}</h3>
                  <p className="mt-2 text-sm text-[#5a4a3e]">Date: {eventItem.date}</p>
                  <p className="text-sm text-[#5a4a3e]">Time: {eventItem.time}</p>
                  <p className="text-sm text-[#5a4a3e]">Speaker / Guide: {eventItem.speaker}</p>
                  <p className="text-sm text-[#5a4a3e]">Mode: {eventItem.mode}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={eventItem.joinLink} target="_blank" rel="noreferrer" className="rounded-full bg-[#c87515] px-4 py-2 text-sm font-semibold text-white">Join</a>
                    <button type="button" className="rounded-full border border-[#dfb26a] px-4 py-2 text-sm font-semibold text-[#7a4309]">Add to Calendar</button>
                    <a href="https://wa.me/918668897445" target="_blank" rel="noreferrer" className="rounded-full border border-[#dfb26a] px-4 py-2 text-sm font-semibold text-[#7a4309]">WhatsApp Reminder</a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-[#5a4a3e]">Upcoming online satsang details will be announced soon. Please join our official channels for updates.</p>
          )}
        </div>
      </section>

      <section id="satsang-request-form" className="mx-auto mt-10 max-w-7xl px-4">
        <div className={sectionCard}>
          <h2 className="text-2xl font-semibold text-[#4d2d12] md:text-3xl">Request a Digital Satsang Session</h2>
          <form className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={submitRequest} noValidate>
            <label className="text-sm font-medium text-[#4d2d12]">Full Name
              <input name="fullName" value={form.fullName} onChange={handleInput} className="mt-1 w-full rounded-xl border border-[#dfc49c] bg-white px-3 py-2 text-sm" />
              {formErrors.fullName && <span className="mt-1 block text-xs text-red-700">{formErrors.fullName}</span>}
            </label>
            <label className="text-sm font-medium text-[#4d2d12]">Mobile Number
              <input name="mobileNumber" value={form.mobileNumber} onChange={handleInput} className="mt-1 w-full rounded-xl border border-[#dfc49c] bg-white px-3 py-2 text-sm" />
              {formErrors.mobileNumber && <span className="mt-1 block text-xs text-red-700">{formErrors.mobileNumber}</span>}
            </label>
            <label className="text-sm font-medium text-[#4d2d12]">Email
              <input name="email" type="email" value={form.email} onChange={handleInput} className="mt-1 w-full rounded-xl border border-[#dfc49c] bg-white px-3 py-2 text-sm" />
              {formErrors.email && <span className="mt-1 block text-xs text-red-700">{formErrors.email}</span>}
            </label>
            <label className="text-sm font-medium text-[#4d2d12]">City / Country
              <input name="cityCountry" value={form.cityCountry} onChange={handleInput} className="mt-1 w-full rounded-xl border border-[#dfc49c] bg-white px-3 py-2 text-sm" />
              {formErrors.cityCountry && <span className="mt-1 block text-xs text-red-700">{formErrors.cityCountry}</span>}
            </label>
            <label className="text-sm font-medium text-[#4d2d12]">Satsang Type
              <select name="satsangType" value={form.satsangType} onChange={handleInput} className="mt-1 w-full rounded-xl border border-[#dfc49c] bg-white px-3 py-2 text-sm">
                {['Family','Group','Community','Institution','Festival','Special Occasion'].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-[#4d2d12]">Preferred Mode
              <select name="preferredMode" value={form.preferredMode} onChange={handleInput} className="mt-1 w-full rounded-xl border border-[#dfc49c] bg-white px-3 py-2 text-sm">
                {['Audio','Video','Zoom','YouTube','WhatsApp','Website Live'].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-[#4d2d12]">Preferred Date
              <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleInput} className="mt-1 w-full rounded-xl border border-[#dfc49c] bg-white px-3 py-2 text-sm" />
              {formErrors.preferredDate && <span className="mt-1 block text-xs text-red-700">{formErrors.preferredDate}</span>}
            </label>
            <label className="text-sm font-medium text-[#4d2d12]">Preferred Time
              <input name="preferredTime" type="time" value={form.preferredTime} onChange={handleInput} className="mt-1 w-full rounded-xl border border-[#dfc49c] bg-white px-3 py-2 text-sm" />
              {formErrors.preferredTime && <span className="mt-1 block text-xs text-red-700">{formErrors.preferredTime}</span>}
            </label>
            <label className="md:col-span-2 text-sm font-medium text-[#4d2d12]">Message / Purpose
              <textarea name="messagePurpose" rows={4} value={form.messagePurpose} onChange={handleInput} className="mt-1 w-full rounded-xl border border-[#dfc49c] bg-white px-3 py-2 text-sm" />
            </label>
            <div className="md:col-span-2 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={loading} className="rounded-full bg-[#c87515] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Submitting...' : 'Submit Request'}</button>
              <a href="https://wa.me/918668897445" target="_blank" rel="noreferrer" className="rounded-full border border-[#dfb26a] px-6 py-3 text-sm font-semibold text-[#7a4309]">WhatsApp Support</a>
            </div>
            {successMsg ? <p className="md:col-span-2 text-sm text-green-700">{successMsg}</p> : null}
            {errorMsg ? <p className="md:col-span-2 text-sm text-red-700">{errorMsg}</p> : null}
          </form>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4">
        <div className={sectionCard}>
          <h2 className="text-2xl font-semibold text-[#4d2d12] md:text-3xl">FAQ</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((item, index) => (
              <details key={item.q} className="rounded-2xl border border-[#f2d8ad] bg-white p-4" open={index === 0}>
                <summary className="cursor-pointer list-none text-sm font-semibold text-[#4d2d12]">{item.q}</summary>
                <p className="mt-2 text-sm text-[#5a4a3e]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[24px] border border-[#f2d8ad] p-6 text-white shadow-[0_20px_45px_rgba(84,52,14,0.24)] md:p-10">
          <img src="/assets/images/online-satsang/online-satsang-cta-banner.jpg" alt="Devotional online satsang banner" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(33,24,20,0.8),rgba(112,72,23,0.6))]" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-2xl font-semibold md:text-3xl">Stay Connected with Satsang</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#f3e7d4] md:text-base">Join Bhagwat Heritage's digital satsang initiative and remain connected with devotion, knowledge, and spiritual inspiration wherever you are.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="https://youtube.com/@bhagwatheritage" target="_blank" rel="noreferrer" className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>Join Online Satsang</a>
              <a href="#satsang-request-form" className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>Request Digital Satsang</a>
              <Link to={ROUTES.contact} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>Contact Team</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
export const DigitalMembershipPage = memo(function DigitalMembershipPage() {
  const membershipPlans = [
    {
      name: "Basic Member",
      price: "Rs 499 / year",
      benefits: [
        "Access to spiritual programs",
        "Festival and satsang notices",
        "Basic membership ID",
      ],
    },
    {
      name: "Premium Member",
      price: "Rs 1,999 / year",
      benefits: [
        "Priority participation in Bhagwat events",
        "Digital certificate and membership card",
        "Volunteer and workshop preference",
      ],
    },
    {
      name: "Lifetime Member",
      price: "Rs 11,000 one-time",
      benefits: [
        "Lifetime spiritual community membership",
        "Priority devotional event access",
        "Recognition, certificate, and long-term portal identity",
      ],
    },
  ];

  const [membershipForm, setMembershipForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    plan: membershipPlans[0].name,
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [idProofName, setIdProofName] = useState("");

  const selectedPlan = membershipPlans.find((plan) => plan.name === membershipForm.plan) ?? membershipPlans[0];
  const memberId =
    membershipForm.fullName.trim().length > 0
      ? `BHSF-${membershipForm.fullName.trim().replace(/\s+/g, "").slice(0, 6).toUpperCase()}-2026`
      : "BHSF-MEMBER-2026";
  const joinDate = "March 8, 2026";

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return previewUrl;
    });
  };

  const handleIdProofChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setIdProofName(file?.name ?? "");
  };

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const handleShareCard = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: "Bhagwat Heritage Membership Card",
        text: `${membershipForm.fullName || "Member"} - ${selectedPlan.name} - ${memberId}`,
      });
    } catch {
      // Ignore cancelled share actions.
    }
  };

  usePageMeta(
    "Membership Portal",
    "Membership portal for community joining, membership plans, registration, digital membership card, payments, activities, and admin management concepts.",
  );

  const membershipSectionClass = "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
  const membershipCardClass = "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm";
  const membershipInputClass =
    "rounded-2xl border border-white/10 bg-[var(--campaign-surface)] px-4 py-3 text-white outline-none placeholder:text-[#aac0ca] focus:border-[var(--campaign-accent)]";
  const membershipButtonClass =
    "rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]";
  const membershipSecondaryButtonClass =
    "rounded-xl border border-white/10 bg-[var(--campaign-surface)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[var(--campaign-accent)]";

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-16">
      <HeroSection
        title="Membership Portal"
        subtitle="Join the Bhagwat Heritage community"
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName={EVENT_SEVA_HERO_CONTENT_CLASS}
        backgroundImage="/images/spiritual1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="#member-registration" className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
            Join Now
          </a>
          <Link
            to={ROUTES.login}
            className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}
          >
            Login
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Membership Plans", value: "Basic, Premium, and Lifetime", note: "Flexible ways to stay connected with the trust community." },
              { title: "Member Benefits", value: "Programs, seva, and events", note: "A clean route to participation, updates, and devotional connection." },
              { title: "Digital Access", value: "Profile, card, and certificate", note: "Useful member tools presented with a clearer visual layout." },
              { title: "Payment Support", value: "Online contribution ready", note: "Payment-friendly membership flow with simple action points." },
            ].map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>* {item.title}</p>
                <p className={SEVA_HIGHLIGHT_VALUE_CLASS}>{item.value}</p>
                <p className={`mt-1 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className={membershipSectionClass}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Membership Benefits</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Why become a member</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {[
              { icon: "SP", title: "Spiritual Programs", desc: "Regular access to satsang, discourse, and devotional learning paths." },
              { icon: "ME", title: "Member-Only Events", desc: "Special member access to selected spiritual and community gatherings." },
              { icon: "VO", title: "Volunteer Opportunities", desc: "Priority connection to seva, event support, and service roles." },
              { icon: "DC", title: "Digital Certificates", desc: "Receive member documentation and recognition in digital format." },
              { icon: "PP", title: "Priority Participation", desc: "Get preference in Bhagwat events, workshops, and major trust activities." },
            ].map((item) => (
              <div key={item.title} className={membershipCardClass}>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--campaign-accent)]/15 text-sm font-black text-[var(--campaign-accent)]">
                  {item.icon}
                </div>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className={membershipSectionClass}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Membership Plans</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Choose your plan</h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {membershipPlans.map((plan) => (
              <div key={plan.name} className={membershipCardClass}>
                <p className={SEVA_SECTION_LABEL_CLASS}>{plan.name}</p>
                <p className={`mt-3 ${SEVA_CARD_TITLE_CLASS}`}>{plan.price}</p>
                <ul className={`mt-5 space-y-3 ${SEVA_BODY_TEXT_CLASS}`}>
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--campaign-accent)]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setMembershipForm((current) => ({ ...current, plan: plan.name }))}
                  className={`mt-6 inline-flex ${membershipButtonClass}`}
                >
                  Join {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="member-registration" className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={membershipSectionClass}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Member Registration</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Join the community</h2>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                value={membershipForm.fullName}
                onChange={(event) => setMembershipForm((current) => ({ ...current, fullName: event.target.value }))}
                placeholder="Full Name"
                className={membershipInputClass}
              />
              <input
                value={membershipForm.email}
                onChange={(event) => setMembershipForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Email"
                className={membershipInputClass}
              />
              <input
                value={membershipForm.phone}
                onChange={(event) => setMembershipForm((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Phone Number"
                className={membershipInputClass}
              />
              <select
                value={membershipForm.plan}
                onChange={(event) => setMembershipForm((current) => ({ ...current, plan: event.target.value }))}
                className={membershipInputClass}
              >
                {membershipPlans.map((plan) => (
                  <option key={plan.name} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </select>
              <input
                value={membershipForm.address}
                onChange={(event) => setMembershipForm((current) => ({ ...current, address: event.target.value }))}
                placeholder="Address"
                className={`${membershipInputClass} md:col-span-2`}
              />
              <input
                value={membershipForm.city}
                onChange={(event) => setMembershipForm((current) => ({ ...current, city: event.target.value }))}
                placeholder="City"
                className={membershipInputClass}
              />
              <input
                value={membershipForm.state}
                onChange={(event) => setMembershipForm((current) => ({ ...current, state: event.target.value }))}
                placeholder="State"
                className={membershipInputClass}
              />
              <input
                value={membershipForm.country}
                onChange={(event) => setMembershipForm((current) => ({ ...current, country: event.target.value }))}
                placeholder="Country"
                className={`${membershipInputClass} md:col-span-2`}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="rounded-2xl border border-dashed border-[var(--campaign-accent)]/50 bg-[var(--campaign-surface)] px-4 py-5 text-sm font-semibold text-white">
                Profile Photo Upload
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-3 block w-full text-sm text-[#d9e6ec]" />
              </label>
              <label className="rounded-2xl border border-dashed border-[var(--campaign-accent)]/50 bg-[var(--campaign-surface)] px-4 py-5 text-sm font-semibold text-white">
                ID Proof Upload
                <input type="file" onChange={handleIdProofChange} className="mt-3 block w-full text-sm text-[#d9e6ec]" />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className={membershipButtonClass}>
                Submit Registration
              </button>
              <button type="button" className={membershipSecondaryButtonClass}>
                Save Form Draft
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className={membershipSectionClass}>
              <p className={SEVA_SECTION_LABEL_CLASS}>Digital Membership Card</p>
              <div className="mt-5 rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[var(--campaign-bg)]">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Member" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm font-black text-[var(--campaign-accent)]">PHOTO</span>
                    )}
                  </div>
                  <div>
                    <p className={SEVA_SECTION_LABEL_CLASS}>Bhagwat Heritage Member ID</p>
                    <h3 className={`mt-2 ${SEVA_CARD_TITLE_CLASS}`}>{membershipForm.fullName || "Member Name"}</h3>
                    <p className="mt-1 text-sm text-[#d9e6ec]">{memberId}</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[var(--campaign-bg)] p-3">
                    <p className="text-xs uppercase tracking-wide text-[var(--campaign-accent)]">Membership Type</p>
                    <p className="mt-1 font-semibold text-white">{selectedPlan.name}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--campaign-bg)] p-3">
                    <p className="text-xs uppercase tracking-wide text-[var(--campaign-accent)]">Join Date</p>
                    <p className="mt-1 font-semibold text-white">{joinDate}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--campaign-bg)] p-3">
                    <p className="text-xs uppercase tracking-wide text-[var(--campaign-accent)]">Status</p>
                    <p className="mt-1 font-semibold text-white">Pending Approval</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--campaign-bg)] p-3">
                    <p className="text-xs uppercase tracking-wide text-[var(--campaign-accent)]">ID Proof</p>
                    <p className="mt-1 font-semibold text-white">{idProofName || "Not uploaded"}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => window.print()} className={membershipButtonClass}>
                    Download Card
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void handleShareCard();
                    }}
                    className={membershipSecondaryButtonClass}
                  >
                    Share Card
                  </button>
                </div>
              </div>
            </div>

            <div className={membershipSectionClass}>
              <p className={SEVA_SECTION_LABEL_CLASS}>Payment Integration</p>
              <h3 className={SEVA_SECTION_HEADING_CLASS}>Online payment methods</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {["UPI", "Credit Card", "Debit Card", "Net Banking"].map((method) => (
                  <div key={method} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-4 text-center text-white font-semibold">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
          <div className={membershipSectionClass}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Member Dashboard</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Dashboard preview after login</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                "View profile and edit personal details",
                "Download membership certificate",
                "See membership ID and status",
                "Track event participation and activity",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5 text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={membershipSectionClass}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Member Activity</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Upcoming activities</h2>
            <div className="mt-8 grid grid-cols-1 gap-4">
              {[
                { title: "Bhagwat Event Participation", desc: "Priority member invitations for key satsang and festival gatherings." },
                { title: "Volunteer Programs", desc: "Join seva teams, digital support, and trust-led service activities." },
                { title: "Spiritual Workshops", desc: "Take part in guided learning, chanting, and dharmic growth sessions." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5">
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className={membershipSectionClass}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Admin Features Concept</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Admin management layer</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Approve or Reject Memberships", desc: "Admin review flow for incoming member registrations." },
              { title: "Manage Member Database", desc: "Searchable records for profiles, plans, and statuses." },
              { title: "Export Member List", desc: "Admin-ready export for reporting and communication workflows." },
              { title: "Send Announcements", desc: "Push notices to members for events, updates, and digital programs." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5">
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export const InvolvedPartnerPage = memo(function InvolvedPartnerPage() {
  type PartnerFormState = {
    organizationName: string;
    contactPersonName: string;
    emailAddress: string;
    phoneNumber: string;
    organizationType: string;
    partnershipType: string;
    preferredCollaborationArea: string;
    cityStateCountry: string;
    websiteOrSocialMedia: string;
    organizationProfile: File | null;
    messageProposal: string;
    consent: boolean;
  };

  const initialFormState: PartnerFormState = {
    organizationName: "",
    contactPersonName: "",
    emailAddress: "",
    phoneNumber: "",
    organizationType: "Corporate",
    partnershipType: "CSR Partnership",
    preferredCollaborationArea: "Spiritual Education",
    cityStateCountry: "",
    websiteOrSocialMedia: "",
    organizationProfile: null,
    messageProposal: "",
    consent: false,
  };

  const [partnerForm, setPartnerForm] = useState<PartnerFormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  usePageMeta(
    "Partner With Us | Bhagwat Heritage Service Foundation Trust",
    "Partner with Bhagwat Heritage Service Foundation Trust for spiritual education, seva initiatives, cultural programs, CSR collaboration, NGO partnerships, and community upliftment.",
  );

  const pageContainerClass = "mx-auto max-w-[1180px] px-4 md:px-6";
  const sectionClass = "rounded-[28px] border border-[#E9D3A8] bg-[#FFFDF8] p-6 shadow-[0_16px_36px_rgba(140,87,27,0.10)] md:p-8";
  const inputBaseClass =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#3E2A16] outline-none transition placeholder:text-[#9E7E55] focus:border-[#B97822] focus:ring-2 focus:ring-[#EBC98B]/60";
  const labelClass = "mb-2 block text-sm font-semibold text-[#6A4520]";
  const errorClass = "mt-1 text-xs font-semibold text-[#B42318]";
  const GI_LABEL_CLASS = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#c07017]";
  const GI_HEADING_CLASS = "mt-2 text-3xl font-black text-[#1f3550] md:text-4xl";
  const GI_CARD_TITLE_CLASS = "text-2xl font-black text-[#1f3550]";
  const GI_BODY_CLASS = "text-base leading-7 text-[#5e5247] md:text-lg";
  const partnerCloudinaryIconMap: Record<string, string> = {
    "icon-spiritual-education.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-spiritual-education.svg",
    "icon-charity-seva.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-charity-seva.svg",
    "icon-seva-network.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-seva-network.svg",
    "icon-cultural-program.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-cultural-program.svg",
    "icon-csr-partnership.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-csr-partnership.svg",
    "icon-ngo-collaboration.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-ngo-collaboration.svg",
    "icon-event-partnership.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-event-partnership.svg",
    "icon-education-partnership.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-education-partnership.svg",
    "icon-community-partnership.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-community-partnership.svg",
    "icon-digital-media.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-digital-media.svg",
    "icon-document-review.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-document-review.svg",
    "icon-ethical-collaboration.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-ethical-collaboration.svg",
    "icon-handshake.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-handshake.svg",
    "icon-youth-development.svg": "https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/icon-youth-development.svg",
  };

  const getPartnerCloudinaryIconUrl = (localIconPath: string) => {
    const iconFile = localIconPath.split("/").pop() ?? "";
    return partnerCloudinaryIconMap[iconFile] ?? `https://res.cloudinary.com/der8zinu8/image/upload/partner-icons/${iconFile}`;
  };

  const heroHighlights = [
    {
      title: "Collaboration Tracks",
      text: "CSR, NGO, events, education, and community partnerships.",
    },
    {
      title: "Partnership Style",
      text: "Project-based, long-term, institutional, and seva-led models.",
    },
    {
      title: "Mission Areas",
      text: "Spiritual education, gau seva, charity, and youth development.",
    },
    {
      title: "Response Flow",
      text: "Review, discussion, approval, and implementation.",
    },
  ];

  const introductionCards = [
    {
      title: "Spiritual Education",
      description: "Value-based study programs, satsang circles, and sanskar learning.",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777215185/ChatGPT_Image_Apr_26_2026_08_21_35_PM_vpi1qj.png",
      bottomText: "Focus: Scriptures, values, and disciplined learning circles.",
    },
    {
      title: "Charity and Seva",
      description: "Service-led outreach through ann seva, aid support, and relief actions.",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_41_57_AM_wsv00f.png",
      bottomText: "Focus: Relief, care support, and practical seva initiatives.",
    },
    {
      title: "Community Service",
      description: "Volunteer coordination, welfare action, and disciplined local support.",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097561/ChatGPT_Image_Apr_25_2026_11_42_05_AM_bij6a0.png",
      bottomText: "Focus: Local coordination, outreach teams, and impact delivery.",
    },
    {
      title: "Cultural Renaissance",
      description: "Programs that preserve dharma, festivals, and living heritage values.",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_43_12_PM_ark4ok.png",
      bottomText: "Focus: Dharma continuity, festivals, and heritage preservation.",
    },
  ];

  const partnershipTypes = [
    {
      title: "Corporate CSR Partnerships",
      description:
        "For companies supporting social impact, spiritual initiatives, employee volunteering, and CSR-led seva alignment.",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777461512/ChatGPT_Image_Apr_29_2026_04_46_42_PM_cf4r3e.png",
      icon: "/assets/icons/partner-with-us/icon-csr-partnership.svg",
    },
    {
      title: "NGO Collaborations",
      description:
        "For NGOs working in education, welfare, health, de-addiction, disaster relief, social awareness, and community upliftment.",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777461512/ChatGPT_Image_Apr_29_2026_04_46_50_PM_n77rvw.png",
      icon: "/assets/icons/partner-with-us/icon-ngo-collaboration.svg",
    },
    {
      title: "Event Partnerships",
      description: "For Bhagwat Katha, festivals, spiritual gatherings, youth programs, and large devotional events.",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777461510/ChatGPT_Image_Apr_29_2026_04_47_06_PM_odlp6v.png",
      icon: "/assets/icons/partner-with-us/icon-event-partnership.svg",
    },
    {
      title: "Educational Partnerships",
      description:
        "For schools, colleges, gurukuls, and institutions focused on values, sanskar, leadership, and cultural learning.",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777461510/ChatGPT_Image_Apr_29_2026_04_47_31_PM_dt1iud.png",
      icon: "/assets/icons/partner-with-us/icon-education-partnership.svg",
    },
    {
      title: "Community Partnerships",
      description:
        "For local groups, residential associations, mandir committees, social groups, and community networks.",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777461510/ChatGPT_Image_Apr_29_2026_04_47_23_PM_tkpska.png",
      icon: "/assets/icons/partner-with-us/icon-community-partnership.svg",
    },
    {
      title: "Digital & Media Partnerships",
      description:
        "For content creators, media teams, publishers, platforms, and digital outreach collaborators.",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777461510/ChatGPT_Image_Apr_29_2026_04_47_31_PM_dt1iud.png",
      icon: "/assets/icons/partner-with-us/icon-digital-media.svg",
    },
  ];

  const partnershipBenefits = [
    {
      text: "Expand seva impact through a trusted spiritual platform",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/reintagration_auqczv.png",
    },
    {
      text: "Participate in structured social and cultural programs",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/famillyfollowup_azd4ol.png",
    },
    {
      text: "Reach families, youth, communities, and devotees",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/reintagration_auqczv.png",
    },
    {
      text: "Collaborate with a mission-driven organisation",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/planning_lvxbdo.png",
    },
    {
      text: "Support value-based education and cultural preservation",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/coordination_pex250.png",
    },
    {
      text: "Build long-term devotional and social goodwill",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776864448/ChatGPT_Image_Apr_22_2026_06_54_46_PM_e3jpix.png",
    },
  ];

  const collaborationAreas = [
    "Bhagwat Katha & Spiritual Events",
    "Gau Seva and Ann Seva",
    "Education Support and Scholarship",
    "Health and Medicine Distribution",
    "Youth Sanskar and Leadership",
    "Cultural Festivals and Community Programs",
    "Digital Learning and Publications",
    "Disaster Relief and Humanitarian Seva",
  ];

  const showcasePartners = [
    "Volunteer Seva Circle",
    "Sanskar Community Forum",
    "Youth Dharma Network",
    "Educational Support Alliance",
    "Bhagwat Seva Initiative",
    "Community Welfare Partners",
  ];

  const processPreview = [
    "Proposal intake and acknowledgement",
    "Mission fit review by trust desk",
    "Collaborative roadmap and scheduling",
  ];

  const processTimeline = [
    {
      title: "Submit Partnership Request",
      description: "Share organisation profile, purpose, and collaboration intent through the partnership form.",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777215185/ChatGPT_Image_Apr_26_2026_08_21_35_PM_vpi1qj.png",
    },
    {
      title: "Review by Trust Team",
      description: "Trust representatives evaluate mission alignment, scope, and practical feasibility.",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_41_57_AM_wsv00f.png",
    },
    {
      title: "Discussion and Planning",
      description: "A focused dialogue defines responsibilities, expected outcomes, and execution pathway.",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/planning_lvxbdo.png",
    },
    {
      title: "Formal Partnership Understanding",
      description: "Agreed terms, governance expectations, and implementation milestones are finalized.",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_43_12_PM_ark4ok.png",
    },
    {
      title: "Collaboration Implementation",
      description: "Programs are executed with periodic reviews for transparent, mission-aligned impact.",
      icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/coordination_pex250.png",
    },
  ];

  const faqs = [
    {
      question: "Who can apply to partner with the Trust?",
      answer:
        "Corporates, NGOs, community groups, educational institutions, event teams, mandirs, trusts, and mission-aligned organisations can submit a partnership request.",
    },
    {
      question: "Can partnerships be project-based instead of long-term?",
      answer:
        "Yes. The Trust welcomes one-time, campaign-based, seasonal, event-based, and long-term partnerships depending on the need.",
    },
    {
      question: "What documents are helpful for application?",
      answer:
        "Organisation profile, contact details, collaboration proposal, registration details if applicable, and any summary of past work are helpful.",
    },
    {
      question: "How does approval work?",
      answer:
        "Requests are reviewed by the Trust team, followed by discussion, planning, and formal confirmation before implementation.",
    },
    {
      question: "Can international organisations collaborate?",
      answer: "Yes. International collaborations may be reviewed based on mission alignment, documentation, and feasibility.",
    },
  ];

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!partnerForm.organizationName.trim()) nextErrors.organizationName = "Organization / Institution Name is required.";
    if (!partnerForm.contactPersonName.trim()) nextErrors.contactPersonName = "Contact Person Name is required.";
    if (!partnerForm.emailAddress.trim()) nextErrors.emailAddress = "Email Address is required.";
    if (!partnerForm.phoneNumber.trim()) nextErrors.phoneNumber = "Phone Number is required.";
    if (!partnerForm.organizationType.trim()) nextErrors.organizationType = "Organization Type is required.";
    if (!partnerForm.partnershipType.trim()) nextErrors.partnershipType = "Partnership Type is required.";
    if (!partnerForm.messageProposal.trim()) nextErrors.messageProposal = "Message / Proposal is required.";
    if (!partnerForm.consent) nextErrors.consent = "Please confirm consent before submitting.";

    if (partnerForm.emailAddress.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(partnerForm.emailAddress.trim())) {
      nextErrors.emailAddress = "Please enter a valid email address.";
    }

    if (partnerForm.phoneNumber.trim() && !/^[+]?[\d\s()-]{7,20}$/.test(partnerForm.phoneNumber.trim())) {
      nextErrors.phoneNumber = "Please enter a valid phone number.";
    }

    return nextErrors;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const checked = event.target instanceof HTMLInputElement ? event.target.checked : false;
    const nextValue = event.target instanceof HTMLInputElement && event.target.type === "checkbox" ? checked : value;

    setPartnerForm((current) => ({ ...current, [name]: nextValue }));
    setFormErrors((current) => ({ ...current, [name]: "" }));
    setRequestSubmitted(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setPartnerForm((current) => ({ ...current, organizationProfile: selectedFile }));
    setRequestSubmitted(false);
  };

  const handlePartnerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setRequestSubmitted(false);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    const payload = {
      organizationName: partnerForm.organizationName.trim(),
      contactPersonName: partnerForm.contactPersonName.trim(),
      emailAddress: partnerForm.emailAddress.trim(),
      phoneNumber: partnerForm.phoneNumber.trim(),
      organizationType: partnerForm.organizationType,
      partnershipType: partnerForm.partnershipType,
      preferredCollaborationArea: partnerForm.preferredCollaborationArea,
      cityStateCountry: partnerForm.cityStateCountry.trim(),
      websiteOrSocialMedia: partnerForm.websiteOrSocialMedia.trim(),
      organizationProfileFileName: partnerForm.organizationProfile?.name ?? "",
      messageProposal: partnerForm.messageProposal.trim(),
      consent: partnerForm.consent,
    };

    try {
      // TODO: Backend integration when API becomes available:
      // await apiClient.post("/api/partnerships", payload);
      void payload;
      await new Promise((resolve) => setTimeout(resolve, 650));

      setRequestSubmitted(true);
      setPartnerForm(initialFormState);
    } catch (_error) {
      setFormErrors((current) => ({
        ...current,
        submit: "We could not submit the request right now. Please try again in a moment.",
      }));
      setRequestSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (fieldName: string) =>
    `${inputBaseClass} ${formErrors[fieldName] ? "border-[#B42318]" : "border-[#E3CDA7]"}`;

  return (
    <div className="bg-[#FFF9ED] pb-16 font-['Poppins'] text-[#3E2A16]">
      <section className="relative overflow-hidden">
        <img
          src="https://res.cloudinary.com/der8zinu8/image/upload/v1777461512/ChatGPT_Image_Apr_29_2026_04_46_26_PM_jtyw8e.png"
          alt="Bhagwat Heritage partnership hero visual"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,236,199,0.22),rgba(255,214,140,0.18),rgba(177,233,241,0.14))]" />
        <div className="absolute -right-28 top-12 h-72 w-72 rounded-full bg-[#F8CF82]/20 blur-3xl" />
        <div className="relative flex h-[430px] items-end md:h-[560px]">
          <div className={`${pageContainerClass} pb-10 md:pb-14`}>
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">Collaborate for Seva, Sanskar &amp; Society</h1>
              <p className="mt-4 text-base font-semibold text-[#FCE3AF] md:text-lg">Partner With Bhagwat Heritage</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#partnership-form"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#C56E1F] to-[#E19A35] px-5 py-2.5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(143,80,22,0.38)] transition hover:-translate-y-0.5"
              >
                Become a Partner
              </a>
              <a
                href="#partnership-contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#F6D4A2] bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Discuss Collaboration
              </a>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${pageContainerClass} mt-10`}>
        <div className={sectionClass}>
          <p className={GI_BODY_CLASS}>
            Join hands with Bhagwat Heritage Service Foundation Trust to expand spiritual education, seva initiatives,
            cultural programs, and community upliftment through purposeful collaboration.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {heroHighlights.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#E7D3AE] bg-white p-4 shadow-[0_10px_22px_rgba(145,95,37,0.10)]">
                <h3 className={GI_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-2 ${GI_BODY_CLASS}`}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${pageContainerClass} mt-10`}>
        <div className={sectionClass}>
          <h2 className={GI_HEADING_CLASS}>Partnerships That Multiply Real Impact</h2>
          <div className="mt-6">
            <p className={GI_BODY_CLASS}>
              Bhagwat Heritage Service Foundation Trust welcomes meaningful partnerships with institutions, organisations,
              community groups, corporates, temples, educational bodies, and seva-oriented teams that wish to contribute
              to spiritual awakening, social welfare, cultural preservation, and value-based development.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {introductionCards.map((item) => (
                <article key={item.title} className="flex h-full flex-col rounded-2xl border border-[#ECDAB7] bg-white p-4 shadow-[0_10px_22px_rgba(145,95,37,0.10)]">
                  <img
                    src={getPartnerCloudinaryIconUrl(item.icon)}
                    onError={(e) => (e.currentTarget.src = item.icon)}
                    alt={`${item.title} icon`}
                    className="h-[86px] w-[86px] rounded-full object-cover"
                    loading="lazy"
                  />
                  <h3 className={`mt-3 ${GI_CARD_TITLE_CLASS}`}>{item.title}</h3>
                  <p className={`mt-1 ${GI_BODY_CLASS}`}>{item.description}</p>
                  <p className="mt-auto pt-3 text-sm font-semibold text-[#8A5B22]">{item.bottomText}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${pageContainerClass} mt-10`}>
        <div className={sectionClass}>
          <h2 className={GI_HEADING_CLASS}>Types of Partnerships</h2>
          <p className={`mt-2 ${GI_LABEL_CLASS}`}>Choose the right collaboration path</p>
          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {partnershipTypes.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-[#E8D5B3] bg-white shadow-[0_12px_24px_rgba(146,95,30,0.10)]">
                <img src={item.image} alt={item.title} className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className={`mt-3 ${GI_CARD_TITLE_CLASS}`}>{item.title}</h3>
                  <p className={`mt-2 ${GI_BODY_CLASS}`}>{item.description}</p>
                  <a
                    href="#partnership-form"
                    className="mt-4 inline-flex items-center rounded-full border border-[#DFAF66] bg-[#FFF3DF] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#9A601E] transition hover:bg-[#FFE9C8]"
                  >
                    Learn More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${pageContainerClass} mt-10`}>
        <div className={sectionClass}>
          <h2 className={GI_HEADING_CLASS}>Why Partner With Bhagwat Heritage?</h2>
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {partnershipBenefits.map((benefit) => (
              <article key={benefit.text} className="rounded-2xl border border-[#F0DFC1] bg-[#FFF8EC] p-5">
                <img
                  src={benefit.icon}
                  onError={(e) => (e.currentTarget.src = "/assets/icons/partner-with-us/icon-handshake.svg")}
                  alt="Benefit icon"
                  className="h-[86px] w-[86px] rounded-full object-cover"
                  loading="lazy"
                />
                <h3 className={`mt-3 ${GI_CARD_TITLE_CLASS}`}>{benefit.text}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${pageContainerClass} mt-10`}>
        <div className={sectionClass}>
          <h2 className={GI_HEADING_CLASS}>Core Areas for Collaboration</h2>
          <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="overflow-hidden rounded-2xl border border-[#E9D6B5]">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777461510/ChatGPT_Image_Apr_29_2026_04_47_38_PM_y7pdnh.png"
                alt="Community collaboration in spiritual and seva activities"
                className="h-full min-h-[300px] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-3">
              {collaborationAreas.map((item) => (
                <article key={item} className="rounded-2xl border border-[#EFDDBE] bg-white px-4 py-3">
                  <h3 className={GI_CARD_TITLE_CLASS}>{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="partnership-form" className={`${pageContainerClass} mt-10`}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={sectionClass}>
            <h2 className={GI_HEADING_CLASS}>Partnership Application Form</h2>
            <form className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handlePartnerSubmit} noValidate>
              <div>
                <label className={labelClass} htmlFor="organizationName">Organization / Institution Name</label>
                <input
                  id="organizationName"
                  name="organizationName"
                  value={partnerForm.organizationName}
                  onChange={handleInputChange}
                  className={fieldClass("organizationName")}
                />
                {formErrors.organizationName ? <p className={errorClass}>{formErrors.organizationName}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="contactPersonName">Contact Person Name</label>
                <input
                  id="contactPersonName"
                  name="contactPersonName"
                  value={partnerForm.contactPersonName}
                  onChange={handleInputChange}
                  className={fieldClass("contactPersonName")}
                />
                {formErrors.contactPersonName ? <p className={errorClass}>{formErrors.contactPersonName}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  value={partnerForm.emailAddress}
                  onChange={handleInputChange}
                  className={fieldClass("emailAddress")}
                  type="email"
                />
                {formErrors.emailAddress ? <p className={errorClass}>{formErrors.emailAddress}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={partnerForm.phoneNumber}
                  onChange={handleInputChange}
                  className={fieldClass("phoneNumber")}
                  inputMode="tel"
                />
                {formErrors.phoneNumber ? <p className={errorClass}>{formErrors.phoneNumber}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="organizationType">Organization Type</label>
                <select
                  id="organizationType"
                  name="organizationType"
                  value={partnerForm.organizationType}
                  onChange={handleInputChange}
                  className={fieldClass("organizationType")}
                >
                  {[
                    "Corporate",
                    "NGO",
                    "Educational Institution",
                    "Temple or Trust",
                    "Community Group",
                    "Event Organizer",
                    "Media Partner",
                    "Other",
                  ].map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {formErrors.organizationType ? <p className={errorClass}>{formErrors.organizationType}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="partnershipType">Partnership Type</label>
                <select
                  id="partnershipType"
                  name="partnershipType"
                  value={partnerForm.partnershipType}
                  onChange={handleInputChange}
                  className={fieldClass("partnershipType")}
                >
                  {[
                    "CSR Partnership",
                    "Seva Collaboration",
                    "Event Partnership",
                    "Educational Partnership",
                    "Cultural Program",
                    "Digital Collaboration",
                    "Other",
                  ].map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {formErrors.partnershipType ? <p className={errorClass}>{formErrors.partnershipType}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="preferredCollaborationArea">Preferred Collaboration Area</label>
                <select
                  id="preferredCollaborationArea"
                  name="preferredCollaborationArea"
                  value={partnerForm.preferredCollaborationArea}
                  onChange={handleInputChange}
                  className={fieldClass("preferredCollaborationArea")}
                >
                  {[
                    "Spiritual Education",
                    "Gau Seva",
                    "Ann Seva",
                    "Education Support",
                    "Health Support",
                    "Youth Programs",
                    "Cultural Events",
                    "Digital Outreach",
                    "Other",
                  ].map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="cityStateCountry">City / State / Country</label>
                <input
                  id="cityStateCountry"
                  name="cityStateCountry"
                  value={partnerForm.cityStateCountry}
                  onChange={handleInputChange}
                  className={fieldClass("cityStateCountry")}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="websiteOrSocialMedia">Website or Social Media Link</label>
                <input
                  id="websiteOrSocialMedia"
                  name="websiteOrSocialMedia"
                  value={partnerForm.websiteOrSocialMedia}
                  onChange={handleInputChange}
                  className={fieldClass("websiteOrSocialMedia")}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="organizationProfile">Upload organization profile/document</label>
                <label
                  htmlFor="organizationProfile"
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-[#D8B079] bg-[#FFF9EC] px-4 py-3"
                >
                  <span className="truncate pr-2 text-sm text-[#694629]">
                    {partnerForm.organizationProfile?.name || "Choose file to upload"}
                  </span>
                  <span className="rounded-lg bg-[#FFE5BD] px-3 py-1 text-xs font-bold text-[#965B19]">Browse</span>
                </label>
                <input
                  id="organizationProfile"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="messageProposal">Message / Proposal</label>
                <textarea
                  id="messageProposal"
                  name="messageProposal"
                  value={partnerForm.messageProposal}
                  onChange={handleInputChange}
                  rows={5}
                  className={fieldClass("messageProposal")}
                />
                {formErrors.messageProposal ? <p className={errorClass}>{formErrors.messageProposal}</p> : null}
              </div>
              <div className="md:col-span-2">
                <label className="flex items-start gap-3 rounded-xl border border-[#ECD6B2] bg-[#FFF7E8] p-3">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={partnerForm.consent}
                    onChange={handleInputChange}
                    className="mt-0.5 h-4 w-4 rounded border-[#C79A62]"
                  />
                  <span className="text-sm leading-6 text-[#5B452E]">
                    I confirm that the shared information is accurate and our proposed collaboration is aligned with
                    ethical, social, cultural, and spiritual values.
                  </span>
                </label>
                {formErrors.consent ? <p className={errorClass}>{formErrors.consent}</p> : null}
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#C56E1F] to-[#E09B36] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(145,84,24,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit Partnership Request"}
                </button>
              </div>
            </form>
            {requestSubmitted ? (
              <p className="mt-4 rounded-xl border border-[#E4BF89] bg-[#FFF3DE] px-4 py-3 text-sm font-semibold text-[#6C4315]">
                Your partnership request has been received. Our team will review and contact you soon.
              </p>
            ) : null}
            {formErrors.submit ? <p className={errorClass}>{formErrors.submit}</p> : null}
          </div>

          <div className="space-y-6">
            <aside className={sectionClass}>
              <h3 className={GI_CARD_TITLE_CLASS}>Collaboration Process Snapshot</h3>
              <div className="mt-4 space-y-3">
                {processPreview.map((item) => (
                  <p key={item} className="rounded-xl border border-[#EDD9B6] bg-white px-4 py-3 text-sm font-semibold text-[#64411D]">{item}</p>
                ))}
              </div>
            </aside>
            <aside id="partnership-contact" className={sectionClass}>
              <h3 className={GI_CARD_TITLE_CLASS}>Partnership Help Desk</h3>
              <div className="mt-4 space-y-2 text-sm leading-7 text-[#5C452E]">
                <p><span className="font-bold text-[#7A4A17]">Email:</span> join@bhagwatheritage.org</p>
                <p><span className="font-bold text-[#7A4A17]">Phone:</span> +91-866-889-7445</p>
                <p>
                  <span className="font-bold text-[#7A4A17]">Address:</span> Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital Ward, Chandrapur, Maharashtra 442402
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://www.instagram.com/bhagwat.heritage"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#DAB27A] bg-[#FFF2DB] px-4 py-2 text-xs font-bold uppercase tracking-[0.06em] text-[#915A1B]"
                >
                  Instagram
                </a>
                <a
                  href="https://youtube.com/@bhagwatheritage"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#DAB27A] bg-[#FFF2DB] px-4 py-2 text-xs font-bold uppercase tracking-[0.06em] text-[#915A1B]"
                >
                  YouTube
                </a>
                <a
                  href="https://wa.me/918668897445"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#DAB27A] bg-[#FFF2DB] px-4 py-2 text-xs font-bold uppercase tracking-[0.06em] text-[#915A1B]"
                >
                  WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="partnership-process" className={`${pageContainerClass} mt-10`}>
        <div className={sectionClass}>
          <h2 className={GI_HEADING_CLASS}>How Collaboration Moves Forward</h2>
          <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="overflow-hidden rounded-2xl border border-[#E8D3B0] self-start">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777461509/ChatGPT_Image_Apr_29_2026_04_47_50_PM_esiiwf.png"
                alt="Partnership process and planning"
                className="h-auto w-full object-contain object-center"
                loading="lazy"
              />
            </div>
            <div className="space-y-4">
              {processTimeline.map((step, index) => (
                <article key={step.title} className="relative rounded-2xl border border-[#ECD9B7] bg-white p-4">
                  {index < processTimeline.length - 1 ? <span className="absolute left-[38px] top-[60px] h-8 w-px bg-[#D9B179]" /> : null}
                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF2DC] text-sm font-black text-[#9A5D1A]">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <img
                          src={getPartnerCloudinaryIconUrl(step.icon)}
                          onError={(e) => (e.currentTarget.src = step.icon)}
                          alt={`${step.title} icon`}
                          className="h-[56px] w-[56px] rounded-full object-cover"
                          loading="lazy"
                        />
                        <h3 className={GI_CARD_TITLE_CLASS}>{step.title}</h3>
                      </div>
                      <p className={`mt-2 ${GI_BODY_CLASS}`}>{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${pageContainerClass} mt-10`}>
        <div className="rounded-2xl border border-[#E7C58E] bg-[#FFF3DB] p-6 shadow-[0_10px_22px_rgba(156,102,32,0.12)]">
          <div className="flex items-start gap-3">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1777193608/ChatGPT_Image_Apr_26_2026_01_45_08_PM_v3dyke.png"
              onError={(e) => (e.currentTarget.src = "/assets/icons/partner-with-us/icon-ethical-collaboration.svg")}
              alt="Ethical collaboration icon"
              className="h-[86px] w-[86px] rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <h2 className={GI_HEADING_CLASS}>Ethical &amp; Mission-Aligned Collaboration</h2>
              <p className={`mt-3 ${GI_BODY_CLASS}`}>
                Bhagwat Heritage Service Foundation Trust accepts partnerships that are aligned with seva, spirituality,
                cultural dignity, education, social upliftment, and ethical community development. The Trust reserves the
                right to review, approve, or decline collaboration proposals based on mission alignment, documentation, and
                public interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${pageContainerClass} mt-10`}>
        <div className={sectionClass}>
          <h2 className={GI_HEADING_CLASS}>Common Partnership Questions</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((item, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <article key={item.question} className="overflow-hidden rounded-2xl border border-[#ECD9B9] bg-white">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <h3 className={GI_CARD_TITLE_CLASS}>{item.question}</h3>
                    <span className="text-xl font-black text-[#A56721]">{isOpen ? "-" : "+"}</span>
                  </button>
                  {isOpen ? <p className={`px-5 pb-5 ${GI_BODY_CLASS}`}>{item.answer}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${pageContainerClass} mt-10`}>
        <div className="overflow-hidden rounded-[30px] border border-[#E3C28D] bg-[linear-gradient(120deg,#FFE8B8_0%,#FFD57A_45%,#F4BE57_100%)] p-8 md:p-12">
          <div>
            <h2 className="max-w-3xl text-3xl font-black text-[#6F4212] md:text-4xl">Let Us Join Hands for Dharma, Seva and Society</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#6C4A1E]">
              Your organisation can become a meaningful force in expanding spiritual education, seva, culture, and community welfare.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#partnership-form"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#C56E1F] to-[#E19A35] px-6 py-3 text-sm font-bold text-white"
              >
                Become a Partner
              </a>
              <a
                href="#partnership-contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C58C3B] bg-[#FFF3DA] px-6 py-3 text-sm font-bold text-[#7A4A12]"
              >
                Contact Partnership Desk
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const InvolvedSponsorPage = memo(function InvolvedSponsorPage() {
  type SponsorTrack = "All" | "Spiritual" | "Seva" | "Education" | "Mandir" | "Emergency";

  const [activeTrack, setActiveTrack] = useState<SponsorTrack>("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const thirdButtonClass =
    "inline-flex items-center rounded-lg border border-white/70 bg-white/12 px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(23,26,32,0.18)] transition hover:-translate-y-0.5 hover:bg-white hover:text-[#7A4A12]";
  const ctaPrimaryClass =
    "inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#C86B19] via-[#D88B2A] to-[#E6A642] px-6 py-3 text-sm font-black text-white shadow-[0_14px_28px_rgba(182,98,28,0.28)] transition duration-300 hover:-translate-y-0.5 hover:from-[#B85E14] hover:to-[#D4973B]";
  const ctaSecondaryClass =
    "inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#D5B589] bg-[#FFF4DF] px-6 py-3 text-sm font-black text-[#7A4A12] shadow-[0_10px_22px_rgba(108,67,25,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FEE9C5]";
  const surfaceCardClass =
    "rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-[0_14px_28px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_32px_rgba(0,0,0,0.26)]";
  const iconBadgeClass = "inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#E7CFA5] bg-[#FFF8EA]";
  const iconImageClass = "h-7 w-7 object-contain";

  const sponsorPrograms = [
    {
      category: "Spiritual" as const,
      title: "Bhagwat Katha and Festival Sponsorship",
      badge: "Featured Sponsor Route",
      description:
        "Support major spiritual programs, festival celebrations, stage arrangements, prasad, hospitality, and devotee experience.",
      impact: "Creates devotional impact during high-footfall events and temple celebrations.",
      supports: "Event setup, katha logistics, decor, sound, seating, prasad, and spiritual hospitality.",
      icon: "/assets/icons/sponsor-programs/icon-katha-sponsorship.svg",
    },
    {
      category: "Seva" as const,
      title: "Gau Seva Sponsorship",
      description: "Sponsor grass, fodder, medical care, shelter support, and daily gau-shala seva continuity.",
      impact: "Provides disciplined care support for cows through recurring and need-based seva.",
      supports: "Fodder, green grass, emergency care, routine nourishment, and gaushala operations.",
      icon: "/assets/icons/sponsor-programs/icon-gau-seva-sponsor.svg",
    },
    {
      category: "Emergency" as const,
      title: "Disaster Relief Sponsorship",
      description: "Fund emergency kits, food distribution, blankets, temporary essentials, and field response support.",
      impact: "Helps the trust respond quickly when families need urgent practical support.",
      supports: "Relief kits, transport, volunteer deployment, and rapid-response coordination.",
      icon: "/assets/icons/sponsor-programs/icon-disaster-relief-sponsor.svg",
    },
    {
      category: "Education" as const,
      title: "Scholarship and Student Sponsorship",
      description:
        "Support students through scholarship assistance, books, learning tools, and value-based educational guidance.",
      impact: "Creates measurable long-term upliftment through education and character support.",
      supports: "Fees, study materials, mentoring, and structured student support routes.",
      icon: "/assets/icons/sponsor-programs/icon-education-sponsor.svg",
    },
    {
      category: "Education" as const,
      title: "Pathshala and Children Learning Sponsorship",
      description:
        "Enable Bal Sanskar programs, digital Pathshala support, child learning modules, and family spiritual education initiatives.",
      impact: "Builds the next generation through dharmic learning and disciplined spiritual formation.",
      supports: "Class material, mentor support, event days, learning resources, and children’s workshops.",
      icon: "/assets/icons/sponsor-programs/icon-education-sponsor.svg",
    },
    {
      category: "Mandir" as const,
      title: "Mandir and Installation Sponsorship",
      description:
        "Support temple construction-linked features, sacred installations, devotional infrastructure, and visitor experience planning.",
      impact: "Strengthens long-term mandir vision and the spiritual environment for devotees.",
      supports: "Murti support, installation, visitor pathways, decor, lighting, and sacred-space readiness.",
      icon: "/assets/icons/sponsor-programs/icon-mandir-sponsor.svg",
    },
    {
      category: "Seva" as const,
      title: "Medicine Distribution Sponsorship",
      description:
        "Fund medicine kits, recurring patient support, health camps, and essential care outreach for vulnerable families.",
      impact: "Converts sponsor contribution into direct healthcare relief for beneficiaries.",
      supports: "Medicine supply, camp support, distribution logistics, and chronic care assistance.",
      icon: "/assets/icons/sponsor-programs/icon-medical-sponsor.svg",
    },
    {
      category: "Spiritual" as const,
      title: "Annakut and Prasad Sponsorship",
      description: "Sponsor offering arrangements, prasad preparation, festival hospitality, and temple celebration support.",
      impact: "Creates direct devotional participation through large-scale offering and guest care.",
      supports: "Bhog, prasad seva, utensils, serving support, and festival hospitality infrastructure.",
      icon: "/assets/icons/sponsor-programs/icon-prasad-sponsor.svg",
    },
  ];

  const tracks: readonly SponsorTrack[] = ["All", "Spiritual", "Seva", "Education", "Mandir", "Emergency"];
  const visiblePrograms =
    activeTrack === "All" ? sponsorPrograms : sponsorPrograms.filter((item) => item.category === activeTrack);

  usePageMeta(
    "Sponsor Programs",
    "Sponsor Bhagwat Katha, Gau Seva, Ann Seva, Education Support, Mandir Development, Medical Seva, Disaster Relief, Pathshala, and Prasad Seva through Bhagwat Heritage Service Foundation Trust.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-16">
      <HeroSection
        title="Sponsor Programs"
        subtitle="Sponsor meaningful seva, education, mandir development, and spiritual initiatives through structured contribution paths."
        backgroundImage="/assets/images/sponsor-programs/sponsor-programs-hero.jpg"
        subtitleClassName={EVENT_SEVA_HERO_SUBTITLE_WRAP_CLASS}
        contentClassName={EVENT_SEVA_HERO_CONTENT_CLASS}
        boxed
        heightClass="h-[460px] md:h-[600px]"
        overlayClass="bg-[linear-gradient(120deg,rgba(57,26,0,0.84),rgba(119,53,4,0.66),rgba(12,57,67,0.35))]"
      >
        <p className="mx-auto mt-2 max-w-4xl text-sm leading-7 text-white/90 md:text-base">
          Your support can become a living form of seva by helping Bhagwat Katha, Gau Seva, Ann Seva, Education
          Support, Mandir Development, Medical Seva, Disaster Relief, Pathshala, and Prasad Seva reach more families,
          devotees, students, and communities.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.donate} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
            Sponsor Now
          </Link>
          <Link to={ROUTES.contact} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
            Talk to Sponsor Team
          </Link>
          <a href="/assets/docs/sponsorship-brief.txt" download className={thirdButtonClass}>
            Download Sponsorship Brief
          </a>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-2 pb-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Sponsor Tracks", value: "8+", note: "Purpose-led sponsorship tracks for trust-led outcomes." },
              {
                title: "Impact Areas",
                value: "Spiritual, Seva, Education & Mandir",
                note: "Structured routes across core trust work areas.",
              },
              {
                title: "Support Options",
                value: "One-time, Monthly, Annual",
                note: "Support flow designed for every sponsor profile.",
              },
              { title: "Contribution Clarity", value: "Purpose-based", note: "Clear contribution direction and communication flow." },
            ].map((item) => (
              <article key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>{item.title}</p>
                <p className="mt-1 text-lg font-black leading-tight text-white">{item.value}</p>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <div className={`${EVENT_SEVA_SECTION_CLASS} relative overflow-hidden`}>
            <div className="pointer-events-none absolute -right-10 -top-10 opacity-[0.08]">
              <img src="/assets/icons/sponsor-programs/icon-mandir-sponsor.svg" alt="" className="h-52 w-52" loading="lazy" />
            </div>
            <p className={SEVA_SECTION_LABEL_CLASS}>About Sponsor Programs</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>A clearer structure for meaningful sponsorship</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  title: "Cause-Focused Sponsorship",
                  text: "Sponsors can choose a real program area instead of contributing without clear purpose.",
                },
                {
                  title: "Visible Seva Direction",
                  text: "Each sponsorship route explains what part of trust work it strengthens in practice.",
                },
                {
                  title: "Flexible Contribution Entry",
                  text: "Sponsors may support one-time, monthly, seasonal, annual, or program-based seva.",
                },
                {
                  title: "Transparent Support Flow",
                  text: "Every sponsorship should include clear purpose, receipt, acknowledgement, and impact communication.",
                },
              ].map((item) => (
                <article key={item.title} className={`${surfaceCardClass} h-full`}>
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className={`${EVENT_SEVA_SECTION_CLASS} overflow-hidden p-0`}>
            <img
              src="/assets/images/sponsor-programs/sponsor-seva-impact.jpg"
              alt="Seva impact collage showing gau seva, food service, education support, and mandir care"
              className="h-[300px] w-full object-cover md:h-[360px]"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className={SEVA_CARD_TITLE_CLASS}>Seva impact that sponsors can connect with clearly</h3>
              <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>
                Sponsorship options are organized for families, devotees, institutions, and businesses that want clear
                intent, dignified seva communication, and practical trust coordination.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={SEVA_SECTION_LABEL_CLASS}>Sponsor Program Explorer</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>Choose the right sponsor route by category</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {tracks.map((track) => {
                const active = track === activeTrack;
                return (
                  <button
                    key={track}
                    type="button"
                    onClick={() => setActiveTrack(track)}
                    aria-pressed={active}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      active
                        ? "bg-gradient-to-r from-[#C86B19] to-[#E6A642] text-white shadow-[0_12px_24px_rgba(196,109,26,0.24)]"
                        : "border border-white/15 bg-[var(--campaign-surface)] text-[var(--campaign-text)] hover:border-[#E3B56B]"
                    }`}
                  >
                    {track}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {visiblePrograms.map((item) => (
              <article key={item.title} className={`${EVENT_SEVA_DETAIL_CARD_CLASS} flex h-full flex-col`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={iconBadgeClass}>
                    <img src={item.icon} alt="" loading="lazy" className={iconImageClass} />
                  </span>
                  <span className="rounded-full bg-[#E8A03A] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#31210D]">
                    {item.category}
                  </span>
                  {item.badge ? (
                    <span className="rounded-full border border-[#86B9B1] bg-[#0F7D81]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#8AD7CD]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.description}</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F0B65A]">Impact</p>
                    <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.impact}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F0B65A]">Supports</p>
                    <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.supports}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to={ROUTES.donate} className={ctaPrimaryClass}>
                    Sponsor This Program
                  </Link>
                  <Link to={ROUTES.contact} className={ctaSecondaryClass}>
                    Request Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Sponsor Seva Ideas</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Program ideas sponsors can support directly</h2>
          <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>Program ideas sponsors can support directly</p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Monthly Gau Grass Seva",
                text: "Recurring support for daily grass and nourishment in gaushala.",
                icon: "/assets/icons/sponsor-programs/icon-gau-seva-sponsor.svg",
              },
              {
                title: "Festival Decoration and Puja Seva",
                text: "Support mandap decor, flowers, lighting, and puja-related arrangements.",
                icon: "/assets/icons/sponsor-programs/icon-katha-sponsorship.svg",
              },
              {
                title: "Child Sanskar Kit Sponsorship",
                text: "Support books, activity material, and learning kits for children and Pathshala batches.",
                icon: "/assets/icons/sponsor-programs/icon-education-sponsor.svg",
              },
              {
                title: "Medical Camp Support",
                text: "Fund health camps, medicine distribution days, and practical wellness support.",
                icon: "/assets/icons/sponsor-programs/icon-medical-sponsor.svg",
              },
              {
                title: "Prasad Distribution Seva",
                text: "Support prasad preparation, packing, serving, and distribution.",
                icon: "/assets/icons/sponsor-programs/icon-ann-seva-sponsor.svg",
              },
              {
                title: "Scholarship Support",
                text: "Support fee assistance, books, uniforms, and guidance for deserving students.",
                icon: "/assets/icons/sponsor-programs/icon-education-sponsor.svg",
              },
            ].map((item) => (
              <article key={item.title} className={`${surfaceCardClass} flex h-full flex-col`}>
                <span className={iconBadgeClass}>
                  <img src={item.icon} alt="" loading="lazy" className={iconImageClass} />
                </span>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.06fr_0.94fr]">
          <div className={EVENT_SEVA_SECTION_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Transparent Support Model</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>How sponsorship remains clear and purpose-based</h2>
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[
                "Sponsor selects program area",
                "Trust confirms scope and estimated use",
                "Contribution is received through official channel",
                "Receipt and acknowledgement are issued",
                "Program support is executed",
                "Update/report is shared where applicable",
              ].map((step, index) => (
                <article key={step} className={`${surfaceCardClass} h-full p-4`}>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D8A244]">Step {index + 1}</p>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{step}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-[#D9BC8F]/40 bg-[#FFF4DF]/10 p-4 text-sm leading-7 text-[#F7E5C8]">
              All sponsorships should be routed through official trust channels only. Program execution depends on
              current need, feasibility, event calendar, and trust approval.
            </p>
          </div>

          <aside className={`${EVENT_SEVA_SECTION_CLASS} overflow-hidden p-0`}>
            <img
              src="/assets/images/sponsor-programs/sponsor-transparency.jpg"
              alt="Donation receipt and seva reporting documents arranged for transparency"
              className="h-[300px] w-full object-cover md:h-[360px]"
              loading="lazy"
            />
            <div className="p-6">
              <div className="flex items-center gap-3">
                <span className={iconBadgeClass}>
                  <img
                    src="/assets/icons/sponsor-programs/icon-transparency-report.svg"
                    alt=""
                    loading="lazy"
                    className={iconImageClass}
                  />
                </span>
                <h3 className={SEVA_CARD_TITLE_CLASS}>Trust transparency and communication</h3>
              </div>
              <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>
                Sponsors receive structured communication aligned to trust process, practical feasibility, and dignified
                seva standards.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Sponsor Journey</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>How sponsorship can work</h2>
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              "Choose the trust program or seva area you want to support.",
              "Connect with the sponsor desk for scope, amount, and sponsorship type.",
              "Complete contribution through the donation route or guided sponsor coordination.",
              "Receive acknowledgement, receipt, and program communication.",
              "Stay connected with the purpose and continuity of the supported trust work.",
            ].map((step, index) => (
              <article key={step} className={`${surfaceCardClass} h-full p-4`}>
                <span className={iconBadgeClass}>
                  <img
                    src={
                      index === 3
                        ? "/assets/icons/sponsor-programs/icon-receipt.svg"
                        : index === 4
                          ? "/assets/icons/sponsor-programs/icon-recognition.svg"
                          : "/assets/icons/sponsor-programs/icon-sponsor-journey.svg"
                    }
                    alt=""
                    loading="lazy"
                    className={iconImageClass}
                  />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#D8A244]">Step {index + 1}</p>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Recognition and Reporting</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Sponsor Recognition &amp; Seva Reporting</h2>
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Official Receipt",
                text: "Sponsors receive appropriate official donation receipt as per trust process.",
                icon: "/assets/icons/sponsor-programs/icon-receipt.svg",
              },
              {
                title: "Seva Acknowledgement",
                text: "The trust may acknowledge sponsorship through certificate, event mention, or appreciation note.",
                icon: "/assets/icons/sponsor-programs/icon-recognition.svg",
              },
              {
                title: "Program Update",
                text: "Where possible, sponsors may receive photos, summary updates, or impact notes.",
                icon: "/assets/icons/sponsor-programs/icon-transparency-report.svg",
              },
              {
                title: "Annual Impact Summary",
                text: "Regular sponsors can be included in broader impact reporting and seva summaries.",
                icon: "/assets/icons/sponsor-programs/icon-transparency-report.svg",
              },
              {
                title: "Donor Wall / Website Mention",
                text: "Selected sponsors may be recognized on the website or trust publications where appropriate.",
                icon: "/assets/icons/sponsor-programs/icon-recognition.svg",
              },
            ].map((item) => (
              <article key={item.title} className={`${surfaceCardClass} h-full`}>
                <span className={iconBadgeClass}>
                  <img src={item.icon} alt="" loading="lazy" className={iconImageClass} />
                </span>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-[#D9BC8F]/40 bg-[#FFF4DF]/10 p-4 text-sm leading-7 text-[#F7E5C8]">
            Recognition must remain dignified, devotional, and compliant with trust policy. Spiritual seva should not
            become commercial promotion.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Why This Page Helps</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Why this page helps sponsors give better now</h2>
          <ul className={`mt-6 space-y-3 ${SEVA_BODY_TEXT_CLASS}`}>
            {[
              "Sponsors can now choose real trust programs instead of reading generic sponsorship text.",
              "The page includes both seva and spiritual sponsorship routes for broader participation.",
              "It explains what each sponsorship supports in practice.",
              "It builds confidence through transparency, recognition, and structured communication.",
              "It gives a direct path to sponsor now or request details from the trust team.",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#E5A13D]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>FAQ</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Sponsor questions answered clearly</h2>
          <div className="mt-7 space-y-3">
            {[
              {
                q: "Can I sponsor a specific program?",
                a: "Yes. Sponsors may choose from available sponsor routes such as Gau Seva, Ann Seva, Education Support, Bhagwat Katha, Mandir Development, Medical Seva, Disaster Relief, or Prasad Seva.",
              },
              {
                q: "Can sponsorship be monthly?",
                a: "Yes. Some programs may be supported monthly, seasonally, annually, or one-time depending on the seva route.",
              },
              {
                q: "Will I receive a receipt?",
                a: "Yes. Contributions should be processed through official trust channels and receipts should be issued as per trust process.",
              },
              {
                q: "Can a family sponsor in memory of someone?",
                a: "Yes. Families may request memorial or occasion-based sponsorship subject to trust approval and program suitability.",
              },
              {
                q: "Can businesses or institutions sponsor?",
                a: "Yes. Businesses, institutions, and community groups may support selected trust programs through structured sponsorship routes.",
              },
              {
                q: "Will I get photos or reports?",
                a: "Where appropriate and feasible, the trust may share program updates, photos, summary notes, or impact communication.",
              },
            ].map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <article key={item.q} className="overflow-hidden rounded-2xl border border-white/12 bg-[var(--campaign-surface)]">
                  <h3>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`sponsor-faq-${index}`}
                    >
                      <span className="text-base font-semibold text-white">{item.q}</span>
                      <span className="text-xl font-black text-[#E3A440]" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div id={`sponsor-faq-${index}`} className={`px-5 pb-4 ${isOpen ? "block" : "hidden"}`}>
                    <p className={SEVA_BODY_TEXT_CLASS}>{item.a}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8">
        <div
          className="relative overflow-hidden rounded-[30px] border border-[#E7C794]/40 p-7 md:p-10"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(51, 23, 1, 0.76), rgba(103, 50, 7, 0.58), rgba(13, 54, 56, 0.42)), url('/assets/images/sponsor-programs/sponsor-cta-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F9D38C]">Final CTA</p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Start Sponsoring Trust Work</h2>
            <p className="mt-3 text-sm leading-7 text-white/90 md:text-base">
              Choose a purposeful seva route and support spiritual, cultural, educational, and humanitarian work through
              Bhagwat Heritage Service Foundation Trust.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className={ctaPrimaryClass}>
                Sponsor Now
              </Link>
              <Link to={ROUTES.contact} className={ctaSecondaryClass}>
                Contact Sponsor Desk
              </Link>
              <a href="/assets/docs/sponsorship-brief.txt" download className={ctaSecondaryClass}>
                Download Sponsorship Brief
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const NotFoundPage = memo(function NotFoundPage() {
  usePageMeta("Page Not Found");
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-3xl border border-[#dce8f5] bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl md:text-4xl font-black text-[#123753]">Page Not Found</h1>
        <p className="text-[#4f6272] mt-3">The requested page does not exist in the current trust website architecture.</p>
        <Link to={ROUTES.home} className="btn-primary mt-5 inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
});











