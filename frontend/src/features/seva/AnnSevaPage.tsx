import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EXTERNAL_RAZORPAY_DONATE_URL,
  ROUTES,
} from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "./sevaTypography";

type AnnIconKey =
  | "plate"
  | "festival"
  | "community"
  | "relief"
  | "heart"
  | "shield"
  | "location"
  | "calendar"
  | "spark"
  | "temple"
  | "pilgrim"
  | "medical";

type ImpactStat = {
  value: string;
  label: string;
};

type HighlightItem = {
  title: string;
  description: string;
  icon: AnnIconKey;
};

type DonationPlan = {
  amount: string;
  description: string;
  buttonLabel: string;
  featured?: boolean;
};

type ReportCardItem = {
  slug: string;
  title: string;
  date: string;
  location: string;
  mealsServed: string;
  occasion: string;
  image: string;
  summary: string;
  highlights: readonly string[];
  supporterNote: string;
};

type SponsorshipOption = {
  title: string;
  amount: string;
  description: string;
};

type Testimonial = {
  quote: string;
  author: string;
};

const SECTION_SHELL =
  "mx-auto max-w-6xl rounded-[34px] border border-[#e7d3b5] bg-white/88 px-6 py-8 shadow-[0_18px_38px_rgba(101,71,35,0.08)] md:px-10 md:py-12";

const trustBadges = [
  {
    label: "Daily Meal Support",
    icon: "plate" as const,
  },
  {
    label: "Festival Food Seva",
    icon: "location" as const,
  },
  {
    label: "Community Distribution",
    icon: "community" as const,
  },
  {
    label: "Sponsor a Full Day",
    icon: "festival" as const,
  },
] as const;

const quickImpactStats: readonly ImpactStat[] = [
  { value: "50,000+", label: "Meals Supported" },
  { value: "20+", label: "Seva Locations" },
  { value: "500+", label: "Seva Participants" },
  { value: "10+", label: "Multiple Occasions" },
] as const;

const annHighlights: readonly HighlightItem[] = [
  {
    title: "Daily Meal Support",
    description:
      "Regular food support for individuals in need, seva centers, and service-linked community spaces.",
    icon: "plate",
  },
  {
    title: "Festival Ann Seva",
    description:
      "Meal service offered during sacred festivals, devotional gatherings, and special spiritual occasions.",
    icon: "festival",
  },
  {
    title: "Community Feeding",
    description:
      "Food distribution in community spaces, outreach programs, and organized seva initiatives.",
    icon: "community",
  },
  {
    title: "Emergency Meal Relief",
    description:
      "Prompt food support during difficult conditions, urgent needs, or relief-driven situations.",
    icon: "relief",
  },
] as const;

const donationPlans: readonly DonationPlan[] = [
  {
    amount: "\u20B9501",
    description: "Supports meal seva for approximately 10-15 individuals",
    buttonLabel: "Contribute Now",
  },
  {
    amount: "\u20B91100",
    description: "Ideal for a small seva offering on a special occasion",
    buttonLabel: "Offer This Seva",
  },
  {
    amount: "\u20B92100",
    description: "Monthly support for continued Ann Seva efforts",
    buttonLabel: "Support Monthly",
    featured: true,
  },
  {
    amount: "\u20B95000 / Custom",
    description:
      "Sponsor a full day of meal seva or a dedicated food support initiative",
    buttonLabel: "Sponsor a Day",
  },
] as const;

const serviceCoverageItems = [
  "Daily Food Support",
  "Festival and Occasion-Based Meal Seva",
  "Support for Pilgrims and Passersby",
  "Food Assistance Around Medical Need Zones",
  "Community Meal Distribution",
  "Relief-Oriented Meal Support",
] as const;

const serviceLocationCards = [
  {
    title: "Temples and Ashram Spaces",
    icon: "temple" as const,
  },
  {
    title: "Spiritual Gatherings and Festivals",
    icon: "festival" as const,
  },
  {
    title: "Pilgrim and Traveler Support Areas",
    icon: "pilgrim" as const,
  },
  {
    title: "Medical Assistance Zones",
    icon: "medical" as const,
  },
  {
    title: "Community Service Locations",
    icon: "community" as const,
  },
  {
    title: "Special Relief and Support Environments",
    icon: "relief" as const,
  },
] as const;

const reportCards: readonly ReportCardItem[] = [
  {
    slug: "community-meal-support-drive",
    title: "Community Meal Support Drive",
    date: "12 January 2026",
    location: "Chandrapur",
    mealsServed: "350+",
    occasion: "Special Seva Initiative",
    image:
      "https://res.cloudinary.com/der8zinu8/image/upload/v1776691875/ChatGPT_Image_Apr_20_2026_06_57_15_PM_a88bdy.png",
    summary:
      "A focused Ann Seva initiative was carried out in Chandrapur to support families and community members facing temporary hardship with fresh, respectfully served meals.",
    highlights: [
      "350+ meals prepared and distributed in one coordinated seva drive",
      "Local volunteers supported meal packing, serving, and orderly distribution",
      "Priority was given to families, elders, and workers in need of immediate support",
    ],
    supporterNote:
      "This drive reflected how collective support can quickly become nourishment, dignity, and emotional reassurance for an entire community.",
  },
  {
    slug: "festival-prasad-distribution",
    title: "Festival Prasad Distribution",
    date: "28 February 2026",
    location: "Bhagwat Dham",
    mealsServed: "500+",
    occasion: "Festival Seva",
      image:
        "https://res.cloudinary.com/der8zinu8/image/upload/v1776691874/ChatGPT_Image_Apr_20_2026_06_59_14_PM_s8t1dx.png",
    summary:
      "During a sacred festival observance at Bhagwat Dham, Ann Seva was offered as prasad distribution with devotion, care, and disciplined coordination.",
    highlights: [
      "500+ prasad meals served during the festival gathering",
      "Devotees, pilgrims, and visiting families were served through organized counters",
      "The seva was carried out in a calm devotional atmosphere with volunteer support",
    ],
    supporterNote:
      "Festival Ann Seva helps transform celebration into shared nourishment, making devotion visible through hospitality and care.",
  },
  {
    slug: "pilgrim-meal-seva",
    title: "Pilgrim Meal Seva",
    date: "10 March 2026",
    location: "Seva Center",
    mealsServed: "200+",
    occasion: "Ongoing Support",
    image:
      "https://res.cloudinary.com/der8zinu8/image/upload/v1776691875/ChatGPT_Image_Apr_20_2026_06_58_29_PM_cpf0ns.png",
    summary:
      "An ongoing meal support effort served pilgrims and passersby at the seva center, ensuring that travel and devotion were met with warmth and nourishment.",
    highlights: [
      "200+ meals served through a regular support initiative",
      "Pilgrims and visitors received clean, timely, and dignified food service",
      "This seva strengthened continuity in daily care beyond festival-only moments",
    ],
    supporterNote:
      "Regular Ann Seva creates quiet but lasting impact by making sure help is available even outside major events and campaigns.",
  },
] as const;

const occasionChips = [
  "Birthday",
  "Memorial",
  "Anniversary",
  "Festival",
  "Other",
] as const;

const sponsorshipOptions: readonly SponsorshipOption[] = [
  {
    title: "One Day Meal Sponsorship",
    amount: "\u20B95000",
    description: "Support a dedicated day of meal seva",
  },
  {
    title: "Community or Event Support",
    amount: "\u20B911,000",
    description: "Support a larger group meal seva or special community initiative",
  },
  {
    title: "Monthly Family Support",
    amount: "\u20B92100",
    description: "Offer regular support toward ongoing Ann Seva efforts",
  },
] as const;

const testimonials: readonly Testimonial[] = [
  {
    quote:
      "Supporting Ann Seva gave our family a deep sense of peace. A small act of contribution became a meaningful way to share care and gratitude with others.",
    author: "A Supporting Family",
  },
  {
    quote:
      "Organizing a seva initiative with the trust felt simple, sincere, and beautifully coordinated.",
    author: "Seva Volunteer",
  },
  {
    quote:
      "Offering food seva on a special family occasion made the day truly meaningful for us.",
    author: "Donor",
  },
] as const;

function PlateIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 14.7C5 14.7 6.7 11.9 10.8 11.9C14.9 11.9 16.6 14.7 16.6 14.7L15.8 17.3H5.8L5 14.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M4.4 14.4H17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.4 18.7H15.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.2 4.8V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.8 6L9.3 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12.8 6L11.4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19.2 6V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 6H20.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 9.2H20.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 12.4H19.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="10.8" cy="19.6" rx="5.2" ry="0.8" fill="currentColor" opacity="0.16" />
    </svg>
  );
}

function FestivalIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4.7 7.1C6.6 8.1 8.4 8.5 10.3 8.5C12.2 8.5 14.1 8.1 16 7.1C17.3 6.4 18.6 6 19.3 5.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5.8 7.6L6.5 11.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.3 8.6V12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14.7 8.4V12.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18.6 7.1L17.9 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11.8 13.2C11.8 12.3 12.4 11.7 13.2 11.7C14 11.7 14.6 12.4 14.6 13.2C14.6 14.4 13.5 15.2 13.2 16C12.9 15.2 11.8 14.3 11.8 13.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.2 17.7H17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.2 17.8C10.2 16.1 11.5 14.8 13.2 14.8C14.9 14.8 16.2 16.1 16.2 17.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CommunityIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="7.2" cy="8.2" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.8" cy="8.2" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.7 18.1C4.9 15.7 6.4 14.1 8.8 14.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15.2 14.1C17.6 14.1 19.1 15.7 19.3 18.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.2 13.4C10.3 12.8 11 11.7 11 10.5C11 8.7 9.6 7.3 7.8 7.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14.8 13.4C13.7 12.8 13 11.7 13 10.5C13 8.7 14.4 7.3 16.2 7.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.1 16.2H13.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 12.2V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.3 19.1H13.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.9 11.9C9.2 10.8 10.2 10 11.4 10H12.6C13.8 10 14.8 10.8 15.1 11.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 5.5C11.4 4.7 12.6 4.7 13 5.5C13.3 6.2 12.9 7 12 7C11.1 7 10.7 6.2 11 5.5Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ReliefIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 19.3C15.7 19.3 18.8 16.4 19.4 12.9L20 9.7L16.9 8.7C15.1 8.1 13.4 7.2 12 6C10.6 7.2 8.9 8.1 7.1 8.7L4 9.7L4.6 12.9C5.2 16.4 8.3 19.3 12 19.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 16.2C13.6 14.8 14.5 13.5 14.5 12.1C14.5 10.9 13.5 10 12.3 10C11.8 10 11.3 10.2 12 10.8C10.7 10.2 10.2 10 9.7 10C8.5 10 7.5 10.9 7.5 12.1C7.5 13.5 8.4 14.8 12 16.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M17.7 5.5V8.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16.3 6.9H19.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21C12 21 5 16.36 5 10.8C5 8.149 7.149 6 9.8 6C11.07 6 12.289 6.504 13.2 7.402C14.111 6.504 15.33 6 16.6 6C19.251 6 21.4 8.149 21.4 10.8C21.4 16.36 14.4 21 14.4 21H12Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ShieldIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3L19 6V11.6C19 15.915 16.086 19.787 12 21C7.914 19.787 5 15.915 5 11.6V6L12 3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.4 12.3L11.1 14L14.8 10.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LocationIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21C12 21 18 15.6 18 10.5C18 7.186 15.314 4.5 12 4.5C8.686 4.5 6 7.186 6 10.5C6 15.6 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function TempleIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3.8L19 8.6V9.9H5V8.6L12 3.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6.3 10V17.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 10V17.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 10V17.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17.7 10V17.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4.5 18H19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.3 18V15.1C9.3 13.9 10.2 13 11.4 13H12.6C13.8 13 14.7 13.9 14.7 15.1V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 3.8V2.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 2.3H13.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PilgrimIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12.2" cy="5.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12.1 8.2V13.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12.1 10.4L8.7 12.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12.1 10.6L15.7 12.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 13.1L9.8 18.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12.2 13.1L14.8 18.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.1 9.8L8.9 18.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.7 10.2H5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 18.9H6.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15.7 7.9C17.4 8.3 18.6 9.4 18.9 11.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MedicalIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="6.2" width="16" height="11.6" rx="2.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 9V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 12H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 6.2V4.5C9 3.7 9.7 3 10.5 3H13.5C14.3 3 15 3.7 15 4.5V6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 4V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 4V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 9H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="4" y="5.5" width="16" height="14.5" rx="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SparkIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3L13.4 6.6L17 8L13.4 9.4L12 13L10.6 9.4L7 8L10.6 6.6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M18 14L18.9 16.1L21 17L18.9 17.9L18 20L17.1 17.9L15 17L17.1 16.1L18 14Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 15L6.7 16.3L8 17L6.7 17.7L6 19L5.3 17.7L4 17L5.3 16.3L6 15Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function QuoteMarkIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M10.4 6.6C8.2 7.6 6.9 9.6 6.7 11.9C6.9 11.8 7.2 11.8 7.5 11.8C9.4 11.8 10.8 13.3 10.8 15.2C10.8 17.2 9.2 18.8 7.2 18.8C4.9 18.8 3.3 16.9 3.3 14.1C3.3 10.1 5.8 6.9 9.8 5.4L10.4 6.6Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4 6.6C18.2 7.6 16.9 9.6 16.7 11.9C16.9 11.8 17.2 11.8 17.5 11.8C19.4 11.8 20.8 13.3 20.8 15.2C20.8 17.2 19.2 18.8 17.2 18.8C14.9 18.8 13.3 16.9 13.3 14.1C13.3 10.1 15.8 6.9 19.8 5.4L20.4 6.6Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnnIcon({
  icon,
  className = "h-6 w-6",
}: {
  icon: AnnIconKey;
  className?: string;
}) {
  if (icon === "festival") return <FestivalIcon className={className} />;
  if (icon === "community") return <CommunityIcon className={className} />;
  if (icon === "relief") return <ReliefIcon className={className} />;
  if (icon === "heart") return <HeartIcon className={className} />;
  if (icon === "shield") return <ShieldIcon className={className} />;
  if (icon === "location") return <LocationIcon className={className} />;
  if (icon === "calendar") return <CalendarIcon className={className} />;
  if (icon === "spark") return <SparkIcon className={className} />;
  if (icon === "temple") return <TempleIcon className={className} />;
  if (icon === "pilgrim") return <PilgrimIcon className={className} />;
  if (icon === "medical") return <MedicalIcon className={className} />;
  return <PlateIcon className={className} />;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#b96a22]`}>{eyebrow}</p>
      ) : null}
      <h2 className={`${SEVA_SECTION_HEADING_CLASS} text-[#1d4f63]`}>{title}</h2>
      {description ? (
        <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{description}</p>
      ) : null}
    </div>
  );
}

function AnnSevaHero({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#fff8ef] pb-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,180,94,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(196,109,26,0.09),transparent_32%)]" />
      <div
        className="relative min-h-[640px] overflow-hidden rounded-b-[40px] bg-cover bg-center shadow-[0_18px_40px_rgba(23,12,5,0.14)]"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/der8zinu8/image/upload/v1776686941/1776685478090_pwj1rr.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-end justify-center px-6 py-16 text-center md:px-8 md:py-20">
          <div
            className="w-full max-w-4xl px-2 py-4 text-white md:px-6 md:py-6"
            style={{ animation: "annFadeUp 0.85s ease-out both" }}
          >
            <h1 className="text-4xl font-bold leading-tight text-[#f9e6a8] md:text-5xl">
              Ann Seva
            </h1>
            <p className={`mt-5 ${SEVA_HERO_SUBTITLE_CLASS} text-[#f7e0a0]`}>
              One Plate of Food, One Lifeline of Hope
            </p>
            <div className="hero-actions mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={EXTERNAL_RAZORPAY_DONATE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full bg-[#e4b45e] px-8 text-base font-bold text-[#fff7df] shadow-[0_18px_34px_rgba(196,109,26,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d08a32]"
              >
                Donate Now
              </a>
              <button
                type="button"
                onClick={onJoin}
                className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full border border-[#f7e0a0]/60 bg-black/10 px-8 text-base font-bold text-[#f9e6a8] transition-all duration-300 hover:bg-[#f9e6a8] hover:text-[#33210f]"
              >
                Join the Seva Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroIntroSection() {
  return (
    <section className="px-4 pt-10 md:px-8">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-[#ead6bb] bg-[linear-gradient(180deg,#fffdf8_0%,#fff7eb_100%)] px-6 py-8 shadow-[0_16px_34px_rgba(101,71,35,0.08)] md:px-8 md:py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#b96a22]`}>
            Bhagwat Heritage Seva
          </p>
          <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
            Through Ann Seva, Bhagwat Heritage strives to serve lovingly prepared
            food to the needy, pilgrims, families in difficulty, and communities
            during festivals, service drives, and special occasions. Every
            contribution helps turn compassion into nourishment.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex min-h-[64px] items-center justify-center gap-3 rounded-full border border-[#e0c6a2] bg-white px-5 py-3 text-[22px] font-semibold uppercase tracking-[0.08em] text-[#8c5a23]"
              >
                <AnnIcon icon={badge.icon} className="h-[26px] w-[26px] shrink-0 text-[#f39b19]" />
                <span>{badge.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactStatsStrip() {
  return (
    <section className="relative z-20 bg-[#fff8ef] px-4 pb-10 pt-2 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mt-[5px] rounded-[30px] border border-[#ead6bb] bg-[linear-gradient(180deg,rgba(255,253,249,0.97)_0%,rgba(255,246,232,0.99)_100%)] p-3 shadow-[0_18px_36px_rgba(101,71,35,0.14)] backdrop-blur md:p-4">
          <div className="grid gap-3 md:grid-cols-4">
            {quickImpactStats.map((item) => (
              <article
                key={`${item.value}-${item.label}`}
                className="rounded-[22px] border border-[#e6d4bb] bg-white/92 px-4 py-5 text-center shadow-[0_12px_24px_rgba(101,71,35,0.06)]"
              >
                <p className="whitespace-nowrap text-[21px] font-black uppercase tracking-wide text-[#c46d1a] md:text-[24px]">
                  {item.value}
                </p>
                <p className="mt-1 whitespace-nowrap text-[12px] font-black text-[#5e5247] md:text-[16px]">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyAnnSevaSection() {
  return (
    <section className="px-4 py-10 md:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[36px] border border-[#e7d3b5] bg-white/82 px-6 py-8 shadow-[0_18px_38px_rgba(101,71,35,0.08)] md:grid-cols-[1.08fr_0.92fr] md:px-10 md:py-12">
        <div>
          <SectionHeading
            eyebrow="Spiritual Foundation"
            title="Why Ann Seva Matters"
            align="left"
            description="Ann Seva is more than the act of giving food. It is an offering of dignity, care, and human warmth. When someone receives a meal in a moment of need, it nourishes not only the body but also the spirit with reassurance and compassion. Our mission is to make food seva a living channel of kindness through regular efforts, service campaigns, sacred occasions, and community outreach."
          />
          <div className="mt-6 rounded-[26px] border border-[#ead9c2] bg-[#fff8ef] p-5">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#fff0da] text-[#c46d1a]">
              <SparkIcon />
            </div>
            <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
              In the Indian spiritual tradition, offering food is regarded as one of
              the most direct and meaningful forms of service because it supports
              life itself.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[30px]">
          <img
            src="https://res.cloudinary.com/der8zinu8/image/upload/v1776689113/ChatGPT_Image_Apr_20_2026_06_11_50_PM_ezah15.png"
            alt="Ann Seva devotional food service"
            className="h-auto max-h-none w-full bg-[#fff0da] object-contain md:h-[360px] md:object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d4f63]/40 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

function HighlightsGrid() {
  return (
    <section className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Key Paths of Ann Seva" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {annHighlights.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-[28px] border border-[#e6d4bb] bg-[#fffdfa] p-6 shadow-[0_18px_34px_rgba(101,71,35,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(101,71,35,0.12)]"
            >
              <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-[22px] bg-[#fff1dd] text-[#c46d1a]">
                <AnnIcon icon={item.icon} className="h-12 w-12" />
              </div>
              <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>
                {item.title}
              </h3>
              <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GivingOptionsSection() {
  const [selectedOccasion, setSelectedOccasion] = useState<string>(occasionChips[0]);

  return (
    <section className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[42px] border border-[#e4c89f] bg-[linear-gradient(135deg,#fff1d8_0%,#fff8ef_42%,#fffdf9_100%)] shadow-[0_24px_56px_rgba(196,109,26,0.12)]">
        <div className="px-6 py-8 md:px-10 md:py-10">
          <SectionHeading
            eyebrow="Ann Seva Giving"
            title="Choose How You Would Like to Support"
            description="Support daily meal seva, sponsor a meaningful occasion, or begin with a contribution plan that fits your intention."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {occasionChips.map((chip) => (
              <button
                type="button"
                key={chip}
                onClick={() => setSelectedOccasion(chip)}
                aria-pressed={selectedOccasion === chip}
                className={`rounded-full px-4 py-2 text-sm font-semibold shadow-[0_8px_18px_rgba(101,71,35,0.06)] transition-all duration-200 ${
                  selectedOccasion === chip
                    ? "border border-[#c46d1a] bg-[#c46d1a] text-white"
                    : "border border-[#dfc3a2] bg-white/88 text-[#6a5848] hover:border-[#d6ae74] hover:bg-[#fff7ea]"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-sm font-medium text-[#7a6a5d]">
            Selected occasion: <span className="font-bold text-[#b96a22]">{selectedOccasion}</span>
          </p>
        </div>

        <div className="px-6 pb-8 md:px-10">
          <div className="grid gap-4 lg:grid-cols-3">
            {sponsorshipOptions.map((option) => (
              <article
                key={option.title}
                className="rounded-[28px] border border-[#e4cfb2] bg-white/92 p-6 shadow-[0_16px_30px_rgba(101,71,35,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_38px_rgba(101,71,35,0.12)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#fff0da] text-[#c46d1a]">
                  <CalendarIcon />
                </div>
                <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>
                  {option.title}
                </h3>
                <p className="mt-3 text-2xl font-black text-[#c46d1a]">
                  {option.amount}
                </p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
                  {option.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 text-center md:px-10">
          <div className="rounded-[28px] border border-[#e5cfb2] bg-[linear-gradient(135deg,rgba(29,79,99,0.96)_0%,rgba(47,106,127,0.94)_100%)] p-6 text-white shadow-[0_18px_36px_rgba(29,79,99,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ffd88a]">
              Direct Support
            </p>
            <p className="mt-4 text-[1.45rem] font-black leading-tight text-[#fff6df]">
              Every contribution helps carry Ann Seva forward with dignity and care.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={EXTERNAL_RAZORPAY_DONATE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#f1c770] px-6 text-sm font-semibold text-[#7b4b0f] transition-colors hover:bg-[#e7b555]"
              >
                Donate with Confidence
              </a>
              <a
                href={EXTERNAL_RAZORPAY_DONATE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/45 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Sponsor a Day
              </a>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8 md:px-10 md:pb-10">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {donationPlans.map((plan) => (
              <article
                key={plan.amount}
                className={`relative flex h-full flex-col rounded-[30px] border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? "border-[#e4b45e] bg-[linear-gradient(180deg,#fff8ed_0%,#fffdf8_100%)] shadow-[0_22px_42px_rgba(196,109,26,0.14)]"
                    : "border-[#e6d4bb] bg-white/92 shadow-[0_18px_34px_rgba(101,71,35,0.08)]"
                }`}
              >
                {plan.featured ? (
                  <span className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-[#c46d1a] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">
                    Most Chosen
                  </span>
                ) : null}
                <p className="mt-3 text-2xl font-black text-[#c46d1a]">{plan.amount}</p>
                <p className={`mt-4 flex-1 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
                  {plan.description}
                </p>
                <a
                  href={EXTERNAL_RAZORPAY_DONATE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#e4b45e] px-5 text-base font-semibold text-white shadow-[0_14px_28px_rgba(196,109,26,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d08a32]"
                >
                  {plan.buttonLabel}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceReachSection() {
  return (
    <section className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-[#e2c79c] bg-[linear-gradient(135deg,#fff6e8_0%,#fffdfa_45%,#f8fbfd_100%)] p-6 shadow-[0_22px_48px_rgba(101,71,35,0.1)] md:p-8">
        <SectionHeading
          eyebrow="Reach and Coverage"
          title="How Ann Seva Reaches People with Care"
          description="Ann Seva is carried forward across meaningful moments, service locations, and ongoing support spaces so nourishment reaches people with dignity."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-[#ead7bc] bg-white/92 p-3 shadow-[0_18px_34px_rgba(101,71,35,0.08)]">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1776690805/ChatGPT_Image_Apr_20_2026_06_42_18_PM_mqjbjq.png"
              alt="Ann Seva offering and meal service"
              className="w-full rounded-[24px] object-cover"
            />
            <div className="mt-3 rounded-[24px] bg-[linear-gradient(135deg,#1d4f63_0%,#2f6a7f_100%)] px-5 py-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ffd88a]">
                Service Flow
              </p>
              <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#ffe7b8]`}>
                From daily meals to festival support and relief-focused outreach,
                Ann Seva is designed to move where nourishment is most needed.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[30px] border border-[#e5d2b7] bg-white/90 p-6 shadow-[0_16px_30px_rgba(101,71,35,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b96a22]">
                Coverage Highlights
              </p>
              <div className="mt-5 grid gap-3">
                {serviceCoverageItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-[22px] border border-[#eee1cd] bg-[#fffaf3] px-4 py-4"
                  >
                    <div className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0da] text-[#c46d1a]">
                      <ShieldIcon className="h-5 w-5" />
                    </div>
                    <p className={`${SEVA_BODY_TEXT_CLASS} font-medium text-[#5e5247]`}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[30px] border border-[#dbe6ec] bg-[linear-gradient(180deg,#f8fcff_0%,#ffffff_100%)] p-6 shadow-[0_16px_30px_rgba(29,79,99,0.08)]">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#1d4f63]">
            Service Locations
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {serviceLocationCards.map((item) => (
              <article
                key={item.title}
                className="flex items-center gap-4 rounded-[22px] border border-[#dbe8ef] bg-white/95 px-4 py-4 shadow-[0_10px_22px_rgba(29,79,99,0.05)]"
              >
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef3f7] text-[#d18612]">
                  <AnnIcon icon={item.icon} className="h-6 w-6" />
                </div>
                <p className={`${SEVA_BODY_TEXT_CLASS} font-medium text-[#4f5e66]`}>
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportsSection({
  selectedReport,
  onOpenReport,
  onCloseReport,
  onSeeAllReports,
}: {
  selectedReport: ReportCardItem | null;
  onOpenReport: (report: ReportCardItem) => void;
  onCloseReport: () => void;
  onSeeAllReports: () => void;
}) {
  return (
    <section className="px-4 py-10 md:px-8">
      <div className={`${SECTION_SHELL} bg-[linear-gradient(180deg,#fffdf8_0%,#fff8ef_100%)]`}>
        <SectionHeading
          eyebrow="Transparency"
          title="Recent Glimpses of Ann Seva"
          description="Transparency and visible impact help strengthen faith in service. Share recent seva moments through curated report cards."
        />
        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          {reportCards.map((card) => (
            <article
              key={`${card.title}-${card.date}`}
              className="overflow-hidden rounded-[30px] border border-[#e6d4bb] bg-white/92 shadow-[0_18px_36px_rgba(101,71,35,0.08)]"
            >
              <div className="relative overflow-hidden md:h-48">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-auto max-h-none w-full bg-[#fff0da] object-contain md:h-full md:object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
              <div className="px-6 py-4">
                <h3 className={`${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>
                  {card.title}
                </h3>
                <div className="mt-3 grid gap-3 text-sm text-[#4c3d31] md:grid-cols-2">
                  <div className="rounded-2xl bg-[#fff8ef] px-4 py-2.5">
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-[#9f5717]">
                      Date
                    </span>
                    <span className="mt-1 block font-semibold text-[#3f3126]">{card.date}</span>
                  </div>
                  <div className="rounded-2xl bg-[#fff8ef] px-4 py-2.5">
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-[#9f5717]">
                      Location
                    </span>
                    <span className="mt-1 block font-semibold text-[#3f3126]">{card.location}</span>
                  </div>
                  <div className="rounded-2xl bg-[#fff8ef] px-4 py-2.5">
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-[#9f5717]">
                      Meals Served
                    </span>
                    <span className="mt-1 block font-semibold text-[#3f3126]">{card.mealsServed}</span>
                  </div>
                  <div className="rounded-2xl bg-[#fff8ef] px-4 py-2.5">
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-[#9f5717]">
                      Occasion
                    </span>
                    <span className="mt-1 block font-semibold text-[#3f3126]">{card.occasion}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenReport(card)}
                  className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#d9c2a5] px-5 text-sm font-semibold text-[#1d4f63] transition-colors hover:bg-[#fff5e6]"
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onSeeAllReports}
            className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#d9c2a5] bg-white px-6 text-sm font-semibold text-[#1d4f63] transition-colors hover:bg-[#fff4e5]"
          >
            See All Ann Seva Reports
          </button>
        </div>

      </div>

      {selectedReport ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1207]/45 px-4 py-8 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-[#e3c7a0] bg-[#fffdf8] shadow-[0_24px_60px_rgba(101,71,35,0.24)]">
            <div className="relative overflow-hidden md:h-64">
              <img
                src={selectedReport.image}
                alt={selectedReport.title}
                className="h-auto max-h-none w-full bg-[#fff0da] object-contain md:h-full md:object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
              <button
                type="button"
                onClick={onCloseReport}
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-[#1d4f63] shadow-sm transition-colors hover:bg-white"
                aria-label="Close report details"
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffe0b1]">
                  Ann Seva Report
                </p>
                <h3 className="mt-2 text-2xl font-black text-white md:text-[1.75rem]">
                  {selectedReport.title}
                </h3>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-[#fff7ec] px-4 py-3">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#b96a22]">
                    Date
                  </span>
                  <span className="mt-1 block font-semibold text-[#5e5247]">
                    {selectedReport.date}
                  </span>
                </div>
                <div className="rounded-2xl bg-[#fff7ec] px-4 py-3">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#b96a22]">
                    Location
                  </span>
                  <span className="mt-1 block font-semibold text-[#5e5247]">
                    {selectedReport.location}
                  </span>
                </div>
                <div className="rounded-2xl bg-[#fff7ec] px-4 py-3">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#b96a22]">
                    Meals Served
                  </span>
                  <span className="mt-1 block font-semibold text-[#5e5247]">
                    {selectedReport.mealsServed}
                  </span>
                </div>
                <div className="rounded-2xl bg-[#fff7ec] px-4 py-3">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#b96a22]">
                    Occasion
                  </span>
                  <span className="mt-1 block font-semibold text-[#5e5247]">
                    {selectedReport.occasion}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-[20px] font-black text-[#1d4f63]">Report Summary</h4>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
                  {selectedReport.summary}
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-[20px] font-black text-[#1d4f63]">Key Highlights</h4>
                <div className="mt-4 grid gap-3">
                  {selectedReport.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 rounded-[20px] border border-[#ead6bb] bg-white px-4 py-4"
                    >
                      <div className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff0da] text-[#c46d1a]">
                        <SparkIcon className="h-4 w-4" />
                      </div>
                      <p className={`${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-[#ead6bb] bg-[linear-gradient(180deg,#fff8ed_0%,#fffdf8_100%)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b96a22]">
                  Supporter Reflection
                </p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
                  {selectedReport.supporterNote}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={EXTERNAL_RAZORPAY_DONATE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#e4b45e] px-6 text-base font-semibold text-white transition-colors hover:bg-[#d08a32]"
                >
                  Support More Ann Seva
                </a>
                <button
                  type="button"
                  onClick={onCloseReport}
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#d9c2a5] px-6 text-base font-semibold text-[#1d4f63] transition-colors hover:bg-[#fff5e6]"
                >
                  Close Report
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Voices from the Seva Journey" />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <article className="rounded-[30px] border border-[#e4b45e] bg-[linear-gradient(180deg,#fff7ea_0%,#fffdf8_100%)] p-6 shadow-[0_20px_40px_rgba(196,109,26,0.12)]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#fff0da] text-[#c46d1a]">
                <QuoteMarkIcon className="h-7 w-7" />
              </div>
              <p className={`mt-5 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
                "{testimonials[0].quote}"
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#b96a22]">
              {testimonials[0].author}
            </p>
          </article>
          {testimonials.slice(1).map((item) => (
            <article
              key={item.author}
              className="rounded-[30px] border border-[#e6d4bb] bg-white/92 p-6 shadow-[0_18px_34px_rgba(101,71,35,0.08)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#fff0da] text-[#c46d1a]">
                  <QuoteMarkIcon className="h-7 w-7" />
                </div>
                <p className={`mt-5 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
                  "{item.quote}"
              </p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#b96a22]">
                {item.author}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTABanner() {
  return (
    <section className="px-4 pb-24 pt-10 md:px-8 md:pb-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[38px] border border-[#dcb884] bg-[linear-gradient(135deg,#c46d1a_0%,#e4b45e_45%,#f3d8a0_100%)] px-6 py-10 text-white shadow-[0_22px_46px_rgba(196,109,26,0.2)] md:px-10 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className={`${SEVA_SECTION_LABEL_CLASS} text-white/80`}>
              Final Call to Serve
            </p>
            <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-4 text-white`}>
              Be the Reason Someone Receives a Meal Today
            </h2>
            <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-white/92`}>
              Your support can help deliver food with dignity and care to someone in
              need. Contribute now, dedicate a special occasion, or sponsor a full day
              of Ann Seva.
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-3">
            <a
              href={EXTERNAL_RAZORPAY_DONATE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-white px-6 text-base font-semibold text-[#9b4b11] transition-colors hover:bg-[#fff4df]"
            >
              Donate Now
            </a>
            <a
              href={EXTERNAL_RAZORPAY_DONATE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/60 px-6 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#9b4b11]"
            >
              Sponsor a Day
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileDonationBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e2c9a8] bg-[#fffaf2]/95 px-4 py-3 shadow-[0_-10px_24px_rgba(101,71,35,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={EXTERNAL_RAZORPAY_DONATE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-full bg-[#e4b45e] px-4 text-sm font-semibold text-white"
        >
          Donate
        </a>
        <a
          href={EXTERNAL_RAZORPAY_DONATE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-full border border-[#d9c2a5] bg-white px-4 text-sm font-semibold text-[#1d4f63]"
        >
          Sponsor a Day
        </a>
      </div>
    </div>
  );
}

export default memo(function AnnSevaPage() {
  const navigate = useNavigate();
  const [selectedReportSlug, setSelectedReportSlug] = useState<string | null>(null);
  const selectedReport =
    reportCards.find((report) => report.slug === selectedReportSlug) ?? null;

  usePageMeta(
    "Ann Seva",
    "Support Bhagwat Heritage Ann Seva through meal sponsorship, special occasion seva, and recurring food support.",
  );

  const handleSeeAllReports = () => {
    const archive = document.getElementById("ann-seva-report-archive");
    archive?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative -mx-6 -my-12 overflow-hidden md:-mx-8">
      <style>{`
        @keyframes annFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <AnnSevaHero onJoin={() => navigate(ROUTES.involved.index)} />
      <ImpactStatsStrip />
      <HeroIntroSection />
      <WhyAnnSevaSection />
      <HighlightsGrid />
      <GivingOptionsSection />
      <ServiceReachSection />
      <ReportsSection
        selectedReport={selectedReport}
        onOpenReport={(report) => setSelectedReportSlug(report.slug)}
        onCloseReport={() => setSelectedReportSlug(null)}
        onSeeAllReports={handleSeeAllReports}
      />
      <TestimonialSection />
      <FinalCTABanner />
      <MobileDonationBar />
    </div>
  );
});
