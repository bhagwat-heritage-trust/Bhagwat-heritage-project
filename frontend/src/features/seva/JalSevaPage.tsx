import { memo, type ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type IconProps = { className?: string };

type StatItem = {
  value: string;
  label: string;
};

type CardItem = {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
};

type DonationPlan = {
  amount: string;
  description: string;
  button: string;
  icon: ComponentType<IconProps>;
  featured?: boolean;
};

type CampaignItem = {
  title: string;
  date: string;
  location: string;
  support: string;
  image: string;
};

type TestimonialItem = {
  quote: string;
  by: string;
};

const heroImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1776750819/ChatGPT_Image_Apr_21_2026_11_22_26_AM_f9bkft.png";
const whyImage = "/images/jal.png";
const serviceImage = "/images/seva/1.jpg";
const campaignImages = ["/images/jal1.png", "/images/seva/1.jpg", "/images/nihsulksevasivir.png"];

const stats: StatItem[] = [
  { value: "100,000+", label: "People Supported" },
  { value: "20+", label: "Seva Locations" },
  { value: "Seasonal & Ongoing", label: "Service Campaigns" },
  { value: "Volunteers & Donors", label: "Actively Engaged" },
];

const trustBadges: Array<{ label: string; icon: ComponentType<IconProps> }> = [
  { label: "Summer Water Camps", icon: SunIcon },
  { label: "Water Pot Support", icon: WaterPotIcon },
  { label: "Community Water Seva", icon: CommunityIcon },
  { label: "Sponsor a Water Point", icon: WaterPointIcon },
];

const jalIntroText =
  "Bhagwat Heritage works to carry water seva to pilgrims, communities, public spaces, and people in need through organized summer drives, water support initiatives, and compassionate outreach. Every contribution helps deliver comfort, dignity, and essential care.";

const keyAreas: CardItem[] = [
  {
    title: "Summer Relief Support",
    description: "Providing access to drinking water during peak heat conditions and seasonal hardship.",
    icon: WaterDropIcon,
  },
  {
    title: "Pilgrim & Traveler Support",
    description: "Supporting those on spiritual journeys, public routes, and long-distance movement.",
    icon: TravelerIcon,
  },
  {
    title: "Community Water Access",
    description: "Serving public spaces, gathering points, and local community-focused distribution areas.",
    icon: CommunityIcon,
  },
  {
    title: "Emergency & Relief Support",
    description: "Water support during urgent situations, special drives, or difficult conditions.",
    icon: ReliefIcon,
  },
];

const donationPlans: DonationPlan[] = [
  { amount: "₹101", description: "Supports basic water distribution", button: "Contribute Now", icon: OfferingIcon },
  { amount: "₹1000", description: "Supports a small water seva activity", button: "Support Seva", icon: HandHeartIcon },
  {
    amount: "₹5000",
    description: "Sponsor a water service point or small camp",
    button: "Sponsor Now",
    icon: WaterPointIcon,
    featured: true,
  },
  { amount: "₹10000+", description: "Support a larger water seva initiative", button: "Become a Sponsor", icon: SponsorIcon },
];

const donationChips = ["Summer Drive", "Water Pot Support", "Public Seva", "Special Occasion"];

const serviceModes = [
  "Summer Water Camps",
  "Public Water Distribution Points",
  "Support at Temples and Ashram Spaces",
  "Pilgrim and Traveler Hydration Support",
  "Medical and Care-Based Locations",
  "Emergency Relief Initiatives",
];

const reachItems: CardItem[] = [
  { title: "Temples & Ashrams", description: "", icon: TempleIcon },
  { title: "Festivals & Gatherings", description: "", icon: FestivalIcon },
  { title: "Pilgrim Routes", description: "", icon: TravelerIcon },
  { title: "Medical Support Areas", description: "", icon: MedicalIcon },
  { title: "Public Community Spaces", description: "", icon: CommunityIcon },
  { title: "Relief & Support Locations", description: "", icon: ReliefIcon },
];

const campaigns: CampaignItem[] = [
  {
    title: "Water Camp Drive",
    date: "May 2026",
    location: "Chandrapur",
    support: "2000+ people",
    image: campaignImages[0],
  },
  {
    title: "Festival Water Support",
    date: "March 2026",
    location: "Bhagwat Dham",
    support: "1500+ people",
    image: campaignImages[1],
  },
  {
    title: "Public Water Distribution",
    date: "April 2026",
    location: "City Center",
    support: "1000+ people",
    image: campaignImages[2],
  },
];

const testimonials: TestimonialItem[] = [
  {
    quote: "Supporting Jal Seva gave us a meaningful way to serve and respond to a real human need with care and sincerity.",
    by: "A Supporting Family",
  },
  {
    quote: "Organizing a water seva camp with the trust was simple, purposeful, and deeply fulfilling.",
    by: "Volunteer Supporter",
  },
  {
    quote: "Even a small contribution created visible impact and helped us feel connected to a larger cause.",
    by: "Donor",
  },
];

function WaterDropIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3C12 3 6.5 9.7 6.5 14a5.5 5.5 0 0 0 11 0C17.5 9.7 12 3 12 3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.5 14.5c0-1.5 1.1-2.7 2.5-2.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HandHeartIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 12.6h3.9c1 0 1.8.8 1.8 1.8S11.9 16 10.9 16H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.5 11.8H6c1 0 1.8.4 2.5 1.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12.4 15.1l4.5-2.2c.9-.4 1.9-.1 2.3.8.4.8.1 1.8-.7 2.3L12 19.8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.1 8.4s-2-1.3-2-3.1c0-1 .8-1.8 1.8-1.8.5 0 .9.2 1.2.5.3-.3.8-.5 1.2-.5 1 0 1.8.8 1.8 1.8 0 1.8-2 3.1-2 3.1l-1 .7-1-.7Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CommunityIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19c.6-3 2.8-5 5.7-5h1.1c2.9 0 5.1 2 5.7 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15.5 14.2c2.2.3 3.9 1.9 4.3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TravelerIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 21V9.5a4 4 0 0 1 8 0V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 21h12M9.5 8h5M10 12h4M7 15H4m16 0h-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 3.5V2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ReliefIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 19 6v5.8c0 4.2-2.9 7.7-7 9.2-4.1-1.5-7-5-7-9.2V6l7-3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v7M8.5 11.5h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function OfferingIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 6h8.5a2.5 2.5 0 0 1 0 5H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 6v12M7 12h8M7 18h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 4h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WaterPointIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 20h12M8 20V8h8v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.5 8V5.5h5V8M10 12h4M10 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 10.5h1.5v3H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SponsorIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 15.1l-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M7 21h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TempleIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 10h16L12 4 4 10ZM6 10v8M10 10v8M14 10v8M18 10v8M4.5 20h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FestivalIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 8c4 3 10 3 14 0M6 8l1.5 6M18 8l-1.5 6M9 8l.8 5.5M15 8l-.8 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 17h8l-1 3H9l-1-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MedicalIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 21V6.5A2.5 2.5 0 0 1 8.5 4h7A2.5 2.5 0 0 1 18 6.5V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 21v-4h6v4M12 8v5M9.5 10.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WaterPotIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 10h10l-1.2 9H8.2L7 10ZM8 10c.4-2.7 2-4 4-4s3.6 1.3 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M17 12.5h1.5a2 2 0 0 1 0 4H16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SunIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function QuoteIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 6H5.8C4.8 6 4 6.8 4 7.8V11c0 1 .8 1.8 1.8 1.8H8c0 2.1-1 3.6-3 4.4M20 6h-3.2c-1 0-1.8.8-1.8 1.8V11c0 1 .8 1.8 1.8 1.8H19c0 2.1-1 3.6-3 4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeader({
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
      {eyebrow ? <p className="text-sm font-semibold text-[#3A6D8C]">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl font-bold leading-tight text-[#17324D] md:text-5xl">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-8 text-[#5A6472] md:text-lg">{intro}</p> : null}
    </div>
  );
}

function PrimaryButton({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#E9932D] px-6 py-3 text-base font-bold text-white shadow-[0_16px_28px_rgba(233,147,45,0.24)] transition hover:bg-[#d9822b]"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, light = false }: { children: string; onClick: () => void; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-bold transition ${
        light
          ? "border border-white/75 bg-white/10 text-white hover:bg-white hover:text-[#17324D]"
          : "border border-[#D8C3A2] bg-white/75 text-[#1F4E79] hover:bg-[#FAF7F1]"
      }`}
    >
      {children}
    </button>
  );
}

function IconBadge({ icon: Icon, className = "" }: { icon: ComponentType<IconProps>; className?: string }) {
  return (
    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9932D]/12 text-[#E9932D] ${className}`}>
      <Icon />
    </div>
  );
}

function JalSevaHero({ onDonate, onStartSeva }: { onDonate: () => void; onStartSeva: () => void }) {
  return (
    <section className="inner-hero relative -mx-6 -mt-12 pb-16 md:-mx-8 md:pb-20">
      <div className="overflow-hidden rounded-b-[40px] bg-[#17324D] shadow-[0_24px_60px_rgba(23,50,77,0.18)]">
        <div className="relative flex min-h-[560px] items-center justify-center bg-cover bg-center px-5 pb-28 pt-20 text-center md:min-h-[620px] md:px-10 md:pb-32" style={{ backgroundImage: `url('${heroImage}')` }}>
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="mt-4 text-5xl font-bold leading-none text-white md:text-7xl">Jal Seva</h1>
          <p className="mt-5 text-2xl font-semibold leading-tight text-white md:text-4xl">For Every Thirst, With Care and Kindness</p>
          <div className="hero-actions mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryButton onClick={onDonate}>Donate for Jal Seva</PrimaryButton>
            <SecondaryButton onClick={onStartSeva} light>
              Start Seva in Your Area
            </SecondaryButton>
          </div>
        </div>
        </div>
      </div>
      <ImpactStatsStrip />
    </section>
  );
}

function ImpactStatsStrip() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-[calc(100%-2rem)] max-w-6xl rounded-[26px] border border-[#E8DECF] bg-white/95 p-4 shadow-[0_22px_48px_rgba(101,71,35,0.14)] backdrop-blur md:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="flex min-h-[112px] flex-col items-center justify-center rounded-[18px] border border-[#E8DECF] bg-white px-4 py-5 text-center">
            <p className="max-w-[14rem] text-balance text-2xl font-extrabold leading-tight !text-[#C46D1A] md:text-3xl">{stat.value}</p>
            <p className="mt-2 max-w-[13rem] text-balance text-base font-bold leading-6 !text-[#5A5249]">{stat.label}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function JalSevaIntroPanel() {
  return (
    <section className="-mx-4 mt-6 rounded-[28px] border border-[#E8DECF] bg-[#FFFDF8] px-5 py-9 text-center shadow-[0_14px_34px_rgba(101,71,35,0.06)] md:mx-0 md:px-10 md:py-12">
      <p className="text-sm font-bold uppercase tracking-[0.38em] text-[#C46D1A] md:text-base">Bhagwat Heritage Seva</p>
      <p className="mx-auto mt-5 max-w-5xl text-base leading-8 text-[#51463C] md:text-lg">
        {jalIntroText}
      </p>
      <div className="mx-auto mt-8 grid max-w-5xl gap-3 md:grid-cols-2">
        {trustBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.label} className="flex min-h-14 items-center justify-center gap-4 rounded-full border border-[#E4C7A2] bg-white/70 px-5 py-4 text-base font-bold uppercase tracking-[0.16em] text-[#8A531E] md:text-lg">
              <Icon className="h-5 w-5 shrink-0 text-[#E9932D]" />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WhyJalSevaSection() {
  return (
    <section className="mt-20 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <SectionHeader title="Why Jal Seva Matters" align="left" />
        <p className="mt-6 text-lg leading-9 text-[#5A6472]">
          Water is one of the simplest and most essential forms of care. In moments of heat, fatigue, travel, illness, and public hardship, access to clean drinking water becomes an immediate act of relief and dignity. Jal Seva transforms a basic necessity into a compassionate offering that protects life, supports comfort, and expresses human kindness in its purest form.
        </p>
        <p className="mt-5 rounded-3xl border border-[#E8DECF] bg-white/75 p-5 text-base leading-8 text-[#17324D] shadow-[0_16px_34px_rgba(31,78,121,0.07)]">
          In service traditions rooted in compassion, offering water is considered a deeply meaningful act because it reaches a person at the moment of genuine need.
        </p>
      </div>
      <div className="overflow-hidden rounded-[30px] border border-[#E8DECF] bg-white shadow-[0_20px_44px_rgba(31,78,121,0.12)]">
        <img src={whyImage} alt="Jal Seva water support" className="h-[360px] w-full object-cover md:h-[440px]" />
      </div>
    </section>
  );
}

function KeyAreasGrid() {
  return (
    <section className="mt-20">
      <SectionHeader title="Key Areas of Jal Seva" />
      <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {keyAreas.map((item) => (
          <article key={item.title} className="flex h-full flex-col rounded-[24px] border border-[#E8DECF] bg-white p-6 shadow-[0_16px_34px_rgba(31,78,121,0.08)]">
            <IconBadge icon={item.icon} />
            <h3 className="mt-5 text-xl font-bold leading-tight text-[#17324D]">{item.title}</h3>
            <p className="mt-3 text-base leading-7 text-[#5A6472]">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DonationPlansSection({ onDonate }: { onDonate: () => void }) {
  return (
    <section className="mt-20 rounded-[34px] border border-[#DDE7EA] bg-[#F8FBFB] p-5 shadow-[0_20px_46px_rgba(31,78,121,0.08)] md:p-9">
      <SectionHeader
        title="Support Jal Seva Through Meaningful Contributions"
        intro="Your support can help provide clean drinking water where it is needed most, through direct seva efforts, water support setups, and organized service initiatives."
      />
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {donationChips.map((chip) => (
          <span key={chip} className="rounded-full border border-[#A9CAD1]/70 bg-white px-4 py-2 text-sm font-semibold text-[#1F4E79]">
            {chip}
          </span>
        ))}
      </div>
      <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {donationPlans.map((plan) => (
          <article
            key={plan.amount}
            className={`relative flex h-full flex-col rounded-[26px] border p-6 shadow-[0_18px_38px_rgba(31,78,121,0.09)] ${
              plan.featured ? "border-[#E9932D] bg-[#FFF8ED]" : "border-[#E8DECF] bg-white"
            }`}
          >
            {plan.featured ? <span className="absolute right-5 top-5 rounded-full bg-[#1F4E79] px-3 py-1 text-xs font-bold text-white">Featured</span> : null}
            <IconBadge icon={plan.icon} />
            <p className="mt-6 text-4xl font-bold text-[#1F4E79]">{plan.amount}</p>
            <p className="mt-3 min-h-[56px] text-base leading-7 text-[#5A6472]">{plan.description}</p>
            <button type="button" onClick={onDonate} className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-[#E9932D] px-5 py-3 text-base font-bold text-white transition hover:bg-[#d9822b]">
              {plan.button}
            </button>
          </article>
        ))}
      </div>
      <p className="mt-7 text-center text-base font-medium text-[#5A6472]">Custom contribution amounts are also welcome.</p>
      <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-6 text-[#5A6472]">
        Acknowledgement and relevant updates may be shared with contributors where applicable.
      </p>
    </section>
  );
}

function ReachAndCoverageSection() {
  return (
    <section className="mt-20 rounded-[34px] border border-[#E8DECF] bg-[#FFFDF8] px-5 py-9 shadow-[0_18px_42px_rgba(101,71,35,0.07)] md:px-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.38em] text-[#C46D1A] md:text-base">Reach and Coverage</p>
        <h2 className="mt-3 text-xl font-bold leading-tight text-[#51463C] md:text-2xl">How Jal Seva Is Carried Forward</h2>
        <p className="mt-4 text-base leading-8 text-[#51463C]">
          Jal Seva is carried forward through thoughtful and organized efforts that respond to seasonal need, public use, and service-based outreach.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[26px] border border-[#E8DECF] bg-white p-2 shadow-[0_16px_34px_rgba(101,71,35,0.07)]">
          <img src={serviceImage} alt="Community water seva support" className="h-[290px] w-full rounded-[22px] object-cover md:h-[330px]" />
          <div className="mt-3 rounded-[18px] bg-[#1F4E79] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F4CE5A]">Service Flow</p>
            <p className="mt-3 text-base leading-7 text-white/88">
              From seasonal heat to pilgrim movement and relief-focused outreach, Jal Seva is designed to move water support where comfort is most needed.
            </p>
          </div>
        </div>

        <div className="rounded-[26px] border border-[#E8DECF] bg-white p-5 shadow-[0_16px_34px_rgba(101,71,35,0.07)]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C46D1A]">Coverage Highlights</p>
          <div className="mt-5 grid gap-3">
            {serviceModes.map((mode) => (
              <div key={mode} className="flex min-h-14 items-center gap-4 rounded-2xl border border-[#E8DECF] bg-[#FFFDF8] px-4 py-3 text-base font-semibold text-[#51463C]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9932D]/10 text-[#E9932D]">
                  <ReliefIcon className="h-4 w-4" />
                </span>
                {mode}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[26px] border border-[#DDE7EA] bg-[#F7FBFC] p-5 shadow-[0_12px_28px_rgba(31,78,121,0.05)] md:p-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-[#17324D]">Service Locations</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reachItems.map((item) => (
          <article key={item.title} className="flex min-h-14 items-center gap-4 rounded-2xl border border-[#DDE7EA] bg-white px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9932D]/10 text-[#E9932D]">
              <item.icon className="h-4 w-4" />
            </span>
            <h3 className="text-base font-semibold leading-6 text-[#51463C]">{item.title}</h3>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}

function CampaignReportsSection() {
  return (
    <section className="mt-20">
      <SectionHeader
        title="Recent Jal Seva Initiatives"
        intro="Recent service efforts can be shared here to help visitors see the practical impact of Jal Seva."
      />
      <div className="mt-9 grid gap-5 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <article key={campaign.title} className="overflow-hidden rounded-[26px] border border-[#E8DECF] bg-white shadow-[0_18px_40px_rgba(31,78,121,0.1)]">
            <img src={campaign.image} alt={campaign.title} className="h-48 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#17324D]">{campaign.title}</h3>
              <dl className="mt-5 grid gap-3 text-base text-[#5A6472]">
                <div className="flex justify-between gap-4 border-b border-[#E8DECF] pb-2">
                  <dt className="font-semibold text-[#17324D]">Date</dt>
                  <dd>{campaign.date}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#E8DECF] pb-2">
                  <dt className="font-semibold text-[#17324D]">Location</dt>
                  <dd>{campaign.location}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-[#17324D]">Support</dt>
                  <dd>{campaign.support}</dd>
                </div>
              </dl>
              <button type="button" className="mt-6 inline-flex w-full min-h-12 items-center justify-center rounded-full border border-[#D8C3A2] bg-[#FAF7F1] px-5 py-3 text-base font-bold text-[#1F4E79] transition hover:bg-white">
                View Details
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button type="button" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D8C3A2] bg-white px-6 py-3 text-base font-bold text-[#1F4E79] shadow-[0_14px_28px_rgba(31,78,121,0.08)] transition hover:bg-[#FAF7F1]">
          See All Jal Seva Reports
        </button>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="mt-20">
      <h2 className="text-center text-2xl font-bold leading-tight text-[#51463C] md:text-3xl">Voices from the Seva Journey</h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <article
            key={item.by}
            className={`rounded-[26px] border bg-white/92 p-7 shadow-[0_18px_40px_rgba(101,71,35,0.08)] md:p-8 ${
              index === 0 ? "border-[#E4B45E]" : "border-[#E8DECF]"
            }`}
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2F1EC] text-[#E9932D]">
              <QuoteIcon className="h-6 w-6" />
            </span>
            <blockquote className="mt-6 text-lg font-medium leading-8 text-[#51463C] md:text-xl md:leading-9">"{item.quote}"</blockquote>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-[#B96816]">{item.by}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalCTABanner({ onDonate, onSponsor }: { onDonate: () => void; onSponsor: () => void }) {
  return (
    <section className="mt-20 overflow-hidden rounded-[34px] border border-[#D8A84D] bg-gradient-to-r from-[#D78A24] via-[#E9BD62] to-[#F2D789] px-6 py-9 shadow-[0_22px_46px_rgba(161,105,31,0.16)] md:px-10 md:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.38em] text-[#B96816] md:text-base">Final Call to Serve</p>
          <h2 className="mt-6 text-2xl font-bold leading-tight text-[#51463C] md:text-3xl">Help Quench a Thirst Today</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#51463C] md:text-lg">
            Your support can help provide clean drinking water with dignity, care, and compassion where it is needed most.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:pl-6">
          <button
            type="button"
            onClick={onDonate}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-white px-6 py-3 text-base font-bold text-[#8A4D13] shadow-[0_12px_24px_rgba(138,77,19,0.08)] transition hover:bg-[#FFF9F1]"
          >
            Donate Now
          </button>
          <button
            type="button"
            onClick={onSponsor}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/75 bg-transparent px-6 py-3 text-base font-bold text-[#51463C] transition hover:bg-white/30"
          >
            Sponsor Jal Seva
          </button>
        </div>
      </div>
    </section>
  );
}

function StickyMobileCTA({ onDonate, onSponsor }: { onDonate: () => void; onSponsor: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8DECF] bg-white/95 px-4 py-3 shadow-[0_-12px_28px_rgba(31,78,121,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <button type="button" onClick={onDonate} className="min-h-11 rounded-full bg-[#E9932D] px-4 text-sm font-bold text-white">
          Donate
        </button>
        <button type="button" onClick={onSponsor} className="min-h-11 rounded-full bg-[#1F4E79] px-4 text-sm font-bold text-white">
          Sponsor
        </button>
      </div>
    </div>
  );
}

export default memo(function JalSevaPage() {
  const navigate = useNavigate();
  const goDonate = () => navigate(ROUTES.donate);
  const goContact = () => navigate(ROUTES.contact);
  const goStartSeva = () => navigate(ROUTES.involved.index);

  usePageMeta(
    "Jal Seva",
    "Support Jal Seva through organized water camps, public water points, sponsorship, and compassionate service outreach.",
  );

  return (
    <div className="bg-[#FAF7F1] pb-20 text-[#5A6472] md:pb-10">
      <JalSevaHero onDonate={goDonate} onStartSeva={goStartSeva} />
      <JalSevaIntroPanel />
      <WhyJalSevaSection />
      <KeyAreasGrid />
      <DonationPlansSection onDonate={goDonate} />
      <ReachAndCoverageSection />
      <CampaignReportsSection />
      <TestimonialsSection />
      <FinalCTABanner onDonate={goDonate} onSponsor={goDonate} />
      <StickyMobileCTA onDonate={goDonate} onSponsor={goDonate} />
    </div>
  );
});
