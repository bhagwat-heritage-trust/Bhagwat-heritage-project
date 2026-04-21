import { memo, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "./sevaTypography";

type IconProps = { className?: string };

type TrustCard = {
  title: string;
  text: string;
  icon: ComponentType<IconProps>;
};

type InfoCard = {
  title: string;
  text: string;
  icon: ComponentType<IconProps>;
};

type DonationPlan = {
  plan: string;
  amount: string;
  bullets: string[];
  featured?: boolean;
};

type CowCard = {
  name: string;
  supportType: string;
  description: string;
  status: string;
  image: string;
};

const heroImage = "/images/maharaj%20ji/gau.jpg";
const cowImages = [
  "https://res.cloudinary.com/der8zinu8/image/upload/v1774593948/19_vjopcc.png",
  "https://res.cloudinary.com/der8zinu8/image/upload/v1774593948/Banner_so0elf.png",
  "https://res.cloudinary.com/der8zinu8/image/upload/v1774593946/1_uww9cw.jpg",
];

const page = {
  phone: "+91-866-889-7445",
  email: "join@bhagwatheritage.org",
  location: "Kamdhenu Ashram, Shree Dham Chichapalli, Mul Road, Chandrapur",
};

const quickTrustCards: TrustCard[] = [
  {
    title: "Daily Bhojan Seva",
    text: "Daily nourishment",
    icon: LeafIcon,
  },
  {
    title: "Medical Care",
    text: "Health support",
    icon: HeartPulseIcon,
  },
  {
    title: "Shelter & Protection",
    text: "Safe long-term care",
    icon: HomeShieldIcon,
  },
  {
    title: "Volunteer-led Service",
    text: "Devoted seva teams",
    icon: HandHeartIcon,
  },
];

const sacredInfoCards: InfoCard[] = [
  {
    title: "Mission",
    text: "To protect, nourish, and serve Gau Mata through compassionate care, disciplined management, and spiritually inspired seva.",
    icon: TargetIcon,
  },
  {
    title: "Vision",
    text: "To build a sacred and sustainable Gau Seva ecosystem where devotion, service, and responsibility come together for long-term protection and wellbeing.",
    icon: SunIcon,
  },
  {
    title: "Seva Impact",
    text: "Every offering supports food, medicine, shelter, cleanliness, and daily care for cows living under the protection of Kamdhenu Ashram.",
    icon: SparklesIcon,
  },
];

const activities: InfoCard[] = [
  {
    title: "Daily Feeding",
    text: "Nutritious green fodder, dry feed, and regular nourishment are arranged daily for the wellbeing of Gau Mata.",
    icon: LeafIcon,
  },
  {
    title: "Medical Care",
    text: "Health monitoring, treatment support, medicines, and special care are provided for weak, injured, or dependent cows.",
    icon: MedicalCrossIcon,
  },
  {
    title: "Shelter Maintenance",
    text: "Clean, secure, and comfortable shelter spaces are maintained to protect cows in all seasons.",
    icon: HomeIcon,
  },
  {
    title: "Rescue & Protection",
    text: "Support is extended toward protection, relocation, and safe care for cows in need of shelter and attention.",
    icon: ShieldIcon,
  },
  {
    title: "Clean Water & Hygiene",
    text: "Daily water supply, cleanliness, and hygienic maintenance are essential parts of respectful Gau Seva.",
    icon: DropletIcon,
  },
  {
    title: "Volunteer Participation",
    text: "Devotees and volunteers actively participate in feeding, care support, maintenance, and seva coordination.",
    icon: UsersIcon,
  },
];

const stats = [
  { value: "108+", label: "Cows Served" },
  { value: "2.5 Tons", label: "Daily Fodder Support" },
  { value: "365 Days", label: "Seva Days Active" },
  { value: "40+", label: "Volunteers Engaged" },
  { value: "Open", label: "Sponsorships Available" },
];

const donationPlans: DonationPlan[] = [
  {
    plan: "Feed a Cow",
    amount: "Rs 501",
    bullets: ["Daily feed contribution", "Supports essential nourishment", "A simple and sacred offering"],
  },
  {
    plan: "Monthly Cow Care",
    amount: "Rs 5,100",
    bullets: ["Monthly nourishment support", "Helps sustain routine care", "Ideal for recurring seva"],
    featured: true,
  },
  {
    plan: "Medical Support",
    amount: "Rs 2,100",
    bullets: ["Medical attention support", "Helps in treatment needs", "Useful for dependent cows"],
  },
  {
    plan: "Gaushala Support",
    amount: "Rs 11,000",
    bullets: ["Shelter upkeep", "Cleanliness and care environment", "Long-term protection support"],
  },
  {
    plan: "Lifelong Seva",
    amount: "Rs 51,000",
    bullets: ["Supports long-term care", "A sacred major contribution", "Helps strengthen ongoing seva"],
  },
];

const sponsorCows: CowCard[] = [
  {
    name: "Gauri",
    supportType: "Full Care Sponsorship",
    description: "A gentle and sacred cow under regular nourishment and daily protective care. Sponsorship helps support her food, shelter, and wellbeing.",
    status: "Needs Sponsor",
    image: cowImages[0],
  },
  {
    name: "Shyama",
    supportType: "Partial Care Sponsorship",
    description: "Shyama is under attentive care and benefits from regular feeding and supervised support. Your seva can help complete her care needs.",
    status: "Partially Sponsored",
    image: cowImages[1],
  },
  {
    name: "Kamdhenu",
    supportType: "Medical Care Sponsorship",
    description: "This sacred cow requires dedicated health support along with nourishment and protective shelter. Sponsorship helps provide continued medical attention.",
    status: "Needs Medical Support",
    image: cowImages[2],
  },
];

const galleryItems = [
  { title: "Daily feeding seva", image: cowImages[0] },
  { title: "Peaceful shelter care", image: cowImages[1] },
  { title: "Volunteer participation", image: cowImages[2] },
];

const infoCards: InfoCard[] = [
  {
    title: "Spiritual Message",
    text: '"Gau Seva is a sacred expression of compassion, gratitude, and dharmic responsibility. In serving Gau Mata, one serves gentleness, nourishment, and the spirit of selfless care."',
    icon: LotusIcon,
  },
  {
    title: "Donation Transparency",
    text: "All contributions are directed toward fodder, care, shelter support, hygiene, and medical assistance for Gau Mata. Donation acknowledgements and support records may be maintained as per trust process, and seva is supervised through responsible coordination and volunteer support.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Contact for Gau Seva",
    text: `Ashram / Trust Name: Bhagwat Heritage Service Foundation Trust\nLocation: ${page.location}\nPhone: ${page.phone}\nEmail: ${page.email}\nVisiting Hours: Contact before visit for suitable timing and seva coordination`,
    icon: PhoneIcon,
  },
];

function LeafIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M20 4C12 4 6 8.5 6 15.5c0 2.5 2 4.5 4.5 4.5C17 20 20 12.8 20 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M4 20c3.5-5.5 8-8.5 13-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HeartPulseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 12h2.3l1-2.2 2.1 5 1.2-2.8H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeShieldIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m4 11 8-7 8 7M6 10v9h5v-5h2v5h5v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 14.5 18 16l2-1.5V18c0 1.7-1 3-2 3.6-1-.6-2-1.9-2-3.6v-3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function HandHeartIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 12.5h4a1.8 1.8 0 0 1 0 3.6H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.5 12H6c1 0 1.8.4 2.5 1.1M12.4 15.2l4.4-2.2c.9-.4 2 0 2.4.9.4.8.1 1.8-.7 2.3L12 20H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.2 8.4s-1.9-1.3-1.9-3a1.7 1.7 0 0 1 2.9-1.2 1.7 1.7 0 0 1 2.9 1.2c0 1.7-1.9 3-1.9 3l-1 .7-1-.7Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function TargetIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" stroke="currentColor" strokeWidth="1.8" />
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

function SparklesIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 9.8 8.8 4 11l5.8 2.2L12 19l2.2-5.8L20 11l-5.8-2.2L12 3ZM5 4v4M3 6h4M19 16v4M17 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MedicalCrossIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m4 11 8-7 8 7M6 10v10h12V10M10 20v-6h4v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 19 6v5.8c0 4.2-2.9 7.7-7 9.2-4.1-1.5-7-5-7-9.2V6l7-3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DropletIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3s-5.5 6.8-5.5 11a5.5 5.5 0 0 0 11 0C17.5 9.8 12 3 12 3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.5 14.5c0-1.5 1.1-2.7 2.5-2.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19c.6-3 2.8-5 5.7-5h1.1c2.9 0 5.1 2 5.7 5M15.5 14.2c2.2.3 3.9 1.9 4.3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LotusIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 20c-4 0-7-2.8-8-7 4 .2 6.8 2.2 8 7Zm0 0c4 0 7-2.8 8-7-4 .2-6.8 2.2-8 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 20c-2.6-3.2-2.6-7.8 0-12 2.6 4.2 2.6 8.8 0 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 8c-1.8-1.8-1.8-3.7 0-5.5 1.8 1.8 1.8 3.7 0 5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function BadgeCheckIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m12 3 2.2 2 3-.2 1 2.8 2.4 1.7-.9 2.9.9 2.9-2.4 1.7-1 2.8-3-.2-2.2 2-2.2-2-3 .2-1-2.8-2.4-1.7.9-2.9-.9-2.9 2.4-1.7 1-2.8 3 .2L12 3Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="m8.8 12.2 2 2 4.4-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6.5 4h3l1.4 4-2 1.2c.9 2 2.5 3.7 4.9 4.9l1.2-2 4 1.4v3c0 1.1-.9 2-2 2C9.8 18.5 4.5 13.2 4.5 6c0-1.1.9-2 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#B97916]`}>{eyebrow}</p> : null}
      <h2 className={`${SEVA_SECTION_HEADING_CLASS} text-[#4A3422]`}>{title}</h2>
      {subtitle ? <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{subtitle}</p> : null}
    </div>
  );
}

function IconBubble({ icon: Icon }: { icon: ComponentType<IconProps> }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3E7C9] text-[#D89B2B]">
      <Icon />
    </span>
  );
}

function GauSevaHero() {
  return (
    <section className="relative -mx-6 -mt-12 pb-8 md:-mx-8 md:pb-24">
      <style>{`
        @keyframes sevaHeroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="inner-hero overflow-hidden rounded-b-[40px] bg-[#4A3422] shadow-[0_26px_70px_rgba(74,52,34,0.2)]">
        <div className="relative flex min-h-[610px] items-center justify-center bg-cover bg-center px-5 py-20 text-center md:min-h-[700px] md:px-10 md:pb-32 md:pt-20" style={{ backgroundImage: `url('${heroImage}')` }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 mx-auto max-w-4xl" style={{ animation: "sevaHeroFadeUp 0.85s ease-out both" }}>
            <h1 className="text-4xl font-bold leading-tight !text-white md:text-5xl">Gau Seva</h1>
            <p className={`mt-5 ${SEVA_HERO_SUBTITLE_CLASS}`}>Kamdhenu Ashram</p>
            <div className="hero-actions mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to={ROUTES.donate} className="inline-flex min-h-[56px] w-full min-w-[210px] items-center justify-center rounded-full bg-[#D89B2B] px-8 text-base font-bold text-white transition hover:bg-[#B97916] sm:w-auto">
                Donate for Gau Seva
              </Link>
              <Link to={ROUTES.donate} className="inline-flex min-h-[56px] w-full min-w-[210px] items-center justify-center rounded-full border border-white/75 bg-white/10 px-8 text-base font-bold text-white transition hover:bg-white hover:text-[#4A3422] sm:w-auto">
                Sponsor a Cow
              </Link>
              <Link to={ROUTES.contact} className="inline-flex min-h-[56px] w-full min-w-[210px] items-center justify-center rounded-full border border-[#F3E7C9]/75 bg-transparent px-8 text-base font-bold text-white transition hover:bg-[#F3E7C9] hover:text-[#4A3422] sm:w-auto">
                Visit the Ashram
              </Link>
            </div>
          </div>
        </div>
      </div>
      <QuickTrustCards />
    </section>
  );
}

function QuickTrustCards() {
  return (
    <div className="relative z-10 mx-auto mt-5 w-[calc(100%-2rem)] max-w-7xl rounded-[28px] border border-[#E7D8B4] bg-[#FFFDF8]/96 p-4 shadow-[0_22px_54px_rgba(111,78,25,0.12)] backdrop-blur md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:p-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {quickTrustCards.map((card) => (
          <article key={card.title} className="flex min-h-[116px] flex-col items-center justify-center rounded-[18px] border border-[#E7D8B4] bg-white px-4 py-5 text-center transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(111,78,25,0.1)]">
            <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F3E7C9] text-[#D89B2B]">
              <card.icon className="h-5 w-5" />
            </span>
            <h3 className="text-balance text-[21px] font-black leading-tight text-[#B97916] md:text-[24px]">{card.title}</h3>
            <p className="mt-2 text-[12px] font-black leading-6 text-[#5A5249] md:text-[16px]">{card.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function WhyGauSevaSection() {
  return (
    <section className="mt-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="rounded-[28px] border border-[#E7D8B4] bg-[#FFFDF8] p-6 shadow-[0_18px_42px_rgba(111,78,25,0.08)] md:p-9">
        <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#B97916]`}>Why Gau Seva Matters</p>
        <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-4 text-[#4A3422]`}>A Sacred Service of Gratitude and Protection</h2>
        <div className={`mt-6 space-y-5 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>
          <p>Gau Seva is one of the most revered forms of seva in Sanatan Dharma. Gau Mata is honored as a symbol of nourishment, gentleness, abundance, and sacred living. Serving and protecting cows is not merely an act of care, but an offering of gratitude toward a divine source of sustenance and compassion.</p>
          <p>At Kamdhenu Ashram, Gau Seva is carried out with devotion, discipline, and responsibility. The ashram is dedicated to providing cows with food, shelter, protection, medical support, and a peaceful environment where they may live with dignity and care.</p>
          <p>This seva invites every devotee and well-wisher to become a part of a living tradition of compassion. Through your support, Gau Mata receives nourishment, healing, and protection, and your contribution becomes a sacred participation in dharmic service.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {sacredInfoCards.map((card) => (
          <article key={card.title} className="rounded-[24px] border border-[#E7D8B4] bg-[#FFFDF8] p-6 shadow-[0_14px_34px_rgba(111,78,25,0.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(111,78,25,0.1)]">
            <IconBubble icon={card.icon} />
            <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{card.title}</h3>
            <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActivitiesGrid() {
  return (
    <section className="mt-20">
      <SectionHeader title="Our Gau Seva Activities" subtitle="Service Through Daily Care, Protection, and Devotion" />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {activities.map((activity) => (
          <article key={activity.title} className="flex h-full flex-col rounded-[24px] border border-[#E7D8B4] bg-[#FFFDF8] p-6 shadow-[0_14px_34px_rgba(111,78,25,0.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(111,78,25,0.1)]">
            <IconBubble icon={activity.icon} />
            <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{activity.title}</h3>
            <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{activity.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="mt-20 rounded-[30px] border border-[#E7D8B4] bg-[#F3E7C9] px-5 py-10 shadow-[0_18px_42px_rgba(111,78,25,0.08)] md:px-8">
      <SectionHeader eyebrow="Seva in Action" title="Seva in Action" />
      <div className="mt-9 grid gap-4 md:grid-cols-5">
        {stats.map((stat) => (
          <article key={stat.label} className="border-[#D9C79E] text-center md:border-r md:last:border-r-0">
            <p className="text-[21px] font-black uppercase tracking-wide text-[#B97916] md:text-[24px]">{stat.value}</p>
            <p className="mt-2 text-[12px] font-black text-[#4A3422] md:text-[16px]">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DonationPlanCards() {
  return (
    <section className="mt-20">
      <SectionHeader title="Gau Seva Donation Options" subtitle="Choose a meaningful way to support nourishment, care, and protection." />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {donationPlans.map((plan) => (
          <article key={plan.plan} className={`relative flex h-full flex-col rounded-[24px] border p-6 shadow-[0_16px_38px_rgba(111,78,25,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(111,78,25,0.12)] ${plan.featured ? "border-[#D89B2B] bg-[#FFF8EA]" : "border-[#E7D8B4] bg-[#FFFDF8]"}`}>
            {plan.featured ? <span className="absolute right-5 top-5 rounded-full bg-[#6E8B3D] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">Recommended</span> : null}
            <h3 className={`pr-12 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{plan.plan}</h3>
            <p className="mt-4 text-2xl font-black text-[#B97916]">{plan.amount}</p>
            <ul className="mt-5 grid gap-3">
              {plan.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm font-semibold leading-6 text-[#4A3422]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#D89B2B]" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Link to={ROUTES.donate} className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#D89B2B] px-5 text-base font-semibold text-white transition hover:bg-[#B97916]">
              Donate Now
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function SponsorCowCards() {
  return (
    <section className="mt-20">
      <SectionHeader title="Sponsor a Cow Program" subtitle="Adopt care with devotion and help support a sacred life with dignity." />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {sponsorCows.map((cow) => (
          <article key={cow.name} className="overflow-hidden rounded-[26px] border border-[#E7D8B4] bg-[#FFFDF8] shadow-[0_18px_42px_rgba(111,78,25,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(111,78,25,0.13)]">
            <img src={cow.image} alt={cow.name} className="h-64 w-full object-cover" />
            <div className="p-6">
              <span className="rounded-full bg-[#F3E7C9] px-3 py-1 text-xs font-bold uppercase tracking-[0.13em] text-[#B97916]">{cow.status}</span>
              <h3 className="mt-5 text-2xl font-black text-[#4A3422]">{cow.name}</h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-[#6E8B3D]">{cow.supportType}</p>
              <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{cow.description}</p>
              <Link to={ROUTES.donate} className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#D89B2B] px-5 text-base font-semibold text-white transition hover:bg-[#B97916]">
                Sponsor This Cow
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function GalleryPreview() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="mt-20">
      <SectionHeader title="Moments of Gau Seva" subtitle="A glimpse into daily care, protection, and devotional service at Kamdhenu Ashram." />
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <button key={item.title} type="button" onClick={() => setActiveImage(item.image)} className="group overflow-hidden rounded-[22px] border border-[#E7D8B4] bg-[#FFFDF8] text-left shadow-[0_12px_30px_rgba(111,78,25,0.06)]">
            <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
            <p className="px-4 py-3 text-sm font-semibold text-[#4A3422] md:text-base">{item.title}</p>
          </button>
        ))}
      </div>
      {activeImage ? (
        <button type="button" onClick={() => setActiveImage(null)} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4" aria-label="Close gallery preview">
          <img src={activeImage} alt="Gau Seva gallery preview" className="max-h-[86vh] max-w-5xl rounded-[24px] object-contain shadow-2xl" />
        </button>
      ) : null}
    </section>
  );
}

function VolunteerVisitSection() {
  return (
    <section className="mt-20 grid gap-5 lg:grid-cols-2">
      <ActionCard title="Volunteer for Gau Seva" text="Join hands in a meaningful act of service. Whether through feeding support, care participation, shelter assistance, or seva coordination, your presence can become a direct offering of compassion and devotion." buttons={[["Join as Volunteer", ROUTES.involved.volunteer], ["Offer Seva", ROUTES.donate]]} />
      <ActionCard title="Visit Kamdhenu Ashram" text="Devotees and well-wishers are welcome to visit the ashram, experience the atmosphere of Gau Seva, and connect personally with this sacred service of care and protection." buttons={[["Plan a Visit", ROUTES.contact], ["Contact for Visit", ROUTES.contact]]} />
    </section>
  );
}

function ActionCard({ title, text, buttons }: { title: string; text: string; buttons: Array<[string, string]> }) {
  return (
    <article className="rounded-[28px] border border-[#E7D8B4] bg-[#FFFDF8] p-6 shadow-[0_18px_42px_rgba(111,78,25,0.08)] md:p-8">
      <h2 className={`${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{title}</h2>
      <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{text}</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        {buttons.map(([label, to], index) => (
          <Link key={label} to={to} className={`inline-flex min-h-[52px] items-center justify-center rounded-full px-5 text-base font-semibold transition ${index === 0 ? "bg-[#D89B2B] text-white hover:bg-[#B97916]" : "border border-[#D89B2B] bg-white text-[#B97916] hover:bg-[#F3E7C9]"}`}>
            {label}
          </Link>
        ))}
      </div>
    </article>
  );
}

function InfoCards() {
  return (
    <section className="mt-20 grid gap-5 lg:grid-cols-3">
      {infoCards.map((card) => (
        <article key={card.title} className="rounded-[24px] border border-[#E7D8B4] bg-[#FFFDF8] p-6 shadow-[0_16px_38px_rgba(111,78,25,0.08)]">
          <IconBubble icon={card.icon} />
          <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{card.title}</h3>
          <p className={`mt-4 whitespace-pre-line ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{card.text}</p>
          {card.title === "Contact for Gau Seva" ? (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${page.phone}`} className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#D89B2B] px-6 text-sm font-semibold text-white">
                Call Now
              </a>
              <Link to={ROUTES.contact} className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#D89B2B] px-6 text-sm font-semibold text-[#B97916]">
                Get Directions
              </Link>
            </div>
          ) : null}
        </article>
      ))}
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="mt-20 overflow-hidden rounded-[34px] border border-[#D8A84D] bg-gradient-to-r from-[#D78A24] via-[#E9BD62] to-[#F2D789] px-6 py-10 shadow-[0_22px_46px_rgba(161,105,31,0.16)] md:px-10 md:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#B96816]`}>Sacred Closing Seva</p>
          <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-5 text-[#4A3422]`}>Join the Sacred Service of Gau Mata</h2>
          <p className={`mt-5 max-w-2xl ${SEVA_BODY_TEXT_CLASS} text-[#4A3422]`}>
            Support nourishment, protection, shelter, and care through your seva. Every offering becomes a part of a living tradition of compassion and devotion.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            ["Donate Now", ROUTES.donate],
            ["Sponsor a Cow", ROUTES.donate],
            ["Become a Volunteer", ROUTES.involved.volunteer],
            ["Contact Us", ROUTES.contact],
          ].map(([label, to], index) => (
            <Link key={label} to={to} className={`inline-flex min-h-[54px] items-center justify-center rounded-full px-6 text-base font-semibold transition ${index === 0 ? "bg-white text-[#8A4D13] shadow-[0_12px_24px_rgba(138,77,19,0.08)] hover:bg-[#FFF9F1]" : "border border-white/75 bg-transparent text-[#4A3422] hover:bg-white/30"}`}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E7D8B4] bg-[#FFFDF8]/95 px-3 py-3 shadow-[0_-12px_28px_rgba(111,78,25,0.12)] backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <Link to={ROUTES.donate} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#D89B2B] px-3 text-sm font-bold text-white">Donate</Link>
        <Link to={ROUTES.donate} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#6E8B3D] px-3 text-sm font-bold text-white">Sponsor</Link>
        <Link to={ROUTES.involved.volunteer} className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D89B2B] bg-white px-3 text-sm font-bold text-[#B97916]">Volunteer</Link>
      </div>
    </div>
  );
}

export default memo(function GauSevaPage() {
  usePageMeta(
    "Gau Seva - Kamdhenu Ashram",
    "Support Gau Seva through cow feeding, medical care, shelter support, sponsorship, volunteering, and devotional service at Kamdhenu Ashram.",
  );

  return (
    <div className="bg-[#F8F3E7] pb-24 text-[#6B5A4A] md:pb-10">
      <GauSevaHero />
      <WhyGauSevaSection />
      <ActivitiesGrid />
      <StatsStrip />
      <DonationPlanCards />
      <SponsorCowCards />
      <GalleryPreview />
      <VolunteerVisitSection />
      <InfoCards />
      <FinalCTASection />
      <StickyMobileCTA />
    </div>
  );
});
