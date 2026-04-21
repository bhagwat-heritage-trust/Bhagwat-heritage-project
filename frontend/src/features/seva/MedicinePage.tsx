import { memo, type ComponentType } from "react";
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

type Highlight = {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
};

type SupportCard = Highlight;

type DonationPlan = {
  title: string;
  amount: string;
  description: string;
  recommended?: boolean;
};

type Story = {
  title: string;
  quote: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const heroImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1776775144/ChatGPT_Image_Apr_21_2026_06_07_51_PM_hwljkm.png";

const heroStats = ["Patients Supported", "Medicine Assistance", "Health Camps Conducted"];

const quickHighlights: Highlight[] = [
  {
    title: "Medicine Access",
    description: "Daily basic medicine support for needy individuals and families.",
    icon: MedicineIcon,
  },
  {
    title: "Health Review",
    description: "Basic care review and guidance through organized support efforts.",
    icon: StethoscopeIcon,
  },
  {
    title: "Care Support",
    description: "Compassionate assistance for vulnerable, elderly, and dependent people.",
    icon: HandHeartIcon,
  },
  {
    title: "Volunteer Network",
    description: "Trusted service support through doctors, volunteers, and coordinators.",
    icon: UsersIcon,
  },
];

const coreSupportAreas: SupportCard[] = [
  {
    title: "Free Medicine Distribution",
    description: "Need-based support for essential medicines and basic treatment assistance.",
    icon: MedicineIcon,
  },
  {
    title: "Health Camps and Screening",
    description: "Periodic support camps for check-ups, awareness, and early guidance.",
    icon: CampIcon,
  },
  {
    title: "Chronic Care Assistance",
    description: "Support for recurring care needs where ongoing help becomes necessary.",
    icon: HeartPulseIcon,
  },
  {
    title: "Elderly Care Support",
    description: "Compassionate help for senior citizens needing basic medical attention.",
    icon: ElderIcon,
  },
  {
    title: "Emergency Help Coordination",
    description: "Limited urgent support based on severity, availability, and service capacity.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Volunteer Service Assistance",
    description: "Medical and non-medical volunteers helping with coordination and care.",
    icon: UsersIcon,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Need Identified",
    description: "Medical need is received through local outreach, service contact, or field awareness.",
  },
  {
    step: "02",
    title: "Case Reviewed",
    description: "Need is reviewed based on urgency, type of support required, and available resources.",
  },
  {
    step: "03",
    title: "Support Arranged",
    description: "Medicines, camp support, or practical assistance is coordinated responsibly.",
  },
  {
    step: "04",
    title: "Follow-up and Care",
    description: "Where possible, follow-up guidance and continued support is extended.",
  },
];

const whyPoints = [
  "Restores dignity in times of difficulty",
  "Supports practical care with compassion",
  "Encourages service rooted in humanity and dharma",
];

// Placeholder stories for future admin replacement with verified beneficiary accounts.
const stories: Story[] = [
  {
    title: "Village Health Beneficiary",
    quote: "Timely medicine support brought relief during a difficult period for our family.",
  },
  {
    title: "Medical Camp Volunteer",
    quote: "This seva is organized with sincerity and helps connect care with people who truly need it.",
  },
  {
    title: "Senior Citizen Support",
    quote: "Basic medical help and guidance provided comfort and reassurance at the right time.",
  },
];

const donationPlans: DonationPlan[] = [
  {
    title: "Basic Medicine Kit",
    amount: "₹500",
    description: "Supports basic medicine assistance for one need-based case.",
  },
  {
    title: "Camp Support Contribution",
    amount: "₹1,500",
    description: "Helps strengthen a local health support or screening activity.",
  },
  {
    title: "Monthly Care Support",
    amount: "₹2,100",
    description: "Supports recurring care assistance and practical medical seva needs.",
    recommended: true,
  },
  {
    title: "Expanded Seva Support",
    amount: "₹5,100",
    description: "Helps strengthen broader medicine support and service coordination.",
  },
];

const volunteerRoles: Highlight[] = [
  {
    title: "Doctor Support",
    description: "Consultation guidance, case review, and health camp participation.",
    icon: StethoscopeIcon,
  },
  {
    title: "Nursing Support",
    description: "Patient care, camp support, screening help, and follow-up coordination.",
    icon: HeartPulseIcon,
  },
  {
    title: "Pharmacy Support",
    description: "Medicine verification, stock support, and safe distribution planning.",
    icon: MedicineIcon,
  },
  {
    title: "Camp Coordination",
    description: "Registration, patient flow, local outreach, and seva organization.",
    icon: CampIcon,
  },
];

function MedicineIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 4h8a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function StethoscopeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 4v5a4 4 0 0 0 8 0V4M6 4H4m10 0h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 13v2.5A4.5 4.5 0 0 0 14.5 20h.5a4 4 0 0 0 4-4v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="19" cy="13" r="2" stroke="currentColor" strokeWidth="1.8" />
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

function UsersIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19c.6-3 2.8-5 5.7-5h1.1c2.9 0 5.1 2 5.7 5M15.5 14.2c2.2.3 3.9 1.9 4.3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CampIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m4 19 8-14 8 14H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 5v14M9.5 19 12 14l2.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

function ElderIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 9v5l-2 6M11 14l3 6M13.5 11.5l2.5 2.5M8.5 11.5 6 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 10v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 19 6v5.8c0 4.2-2.9 7.7-7 9.2-4.1-1.5-7-5-7-9.2V6l7-3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeader({ eyebrow, title, intro, align = "center" }: { eyebrow?: string; title: string; intro?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#B97916]`}>{eyebrow}</p> : null}
      <h2 className={`${SEVA_SECTION_HEADING_CLASS} text-[#4A3422]`}>{title}</h2>
      {intro ? <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{intro}</p> : null}
    </div>
  );
}

function IconBubble({ icon: Icon }: { icon: ComponentType<IconProps> }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#FFF0DA] text-[#C46D1A]">
      <Icon />
    </span>
  );
}

function PrimaryButton({ children, to }: { children: string; to: string }) {
  return (
    <Link to={to} className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full bg-[#D89B2B] px-8 text-base font-bold text-white shadow-[0_18px_34px_rgba(196,109,26,0.22)] transition hover:-translate-y-0.5 hover:bg-[#B97916]">
      {children}
    </Link>
  );
}

function SecondaryButton({ children, to, light = false }: { children: string; to: string; light?: boolean }) {
  return (
    <Link to={to} className={`inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full border px-8 text-base font-bold transition hover:-translate-y-0.5 ${light ? "border-white/70 bg-white/10 text-white hover:bg-white hover:text-[#4A3422]" : "border-[#D89B2B] bg-white text-[#B97916] hover:bg-[#FFF4DF]"}`}>
      {children}
    </Link>
  );
}

function ChikitsaHero() {
  return (
    <section className="relative -mx-6 -mt-12 pb-8 md:-mx-8">
      <style>{`
        @keyframes sevaHeroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="overflow-hidden rounded-b-[40px] bg-[#4A3422] shadow-[0_26px_70px_rgba(74,52,34,0.22)]">
        <div className="relative flex min-h-[640px] items-center justify-center bg-cover bg-center px-5 py-20 text-center md:min-h-[700px] md:px-10" style={{ backgroundImage: `url('${heroImage}')` }}>
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/45" />
          <div className="relative z-10 mx-auto max-w-4xl" style={{ animation: "sevaHeroFadeUp 0.85s ease-out both" }}>
            <h1 className="text-4xl font-bold leading-tight !text-white md:text-5xl">Chikitsa Seva</h1>
            <p className={`mx-auto mt-5 max-w-4xl whitespace-normal ${SEVA_HERO_SUBTITLE_CLASS}`}>
              Empowering Health Through Service
            </p>
            <div className="hero-actions mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton to={ROUTES.donate}>Contribute Now</PrimaryButton>
              <SecondaryButton to={ROUTES.involved.volunteer} light>
                Join Medical Seva
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto mt-[5px] w-[calc(100%-2rem)] max-w-5xl rounded-[28px] border border-[#E8D9BD] bg-[#FFFDF8]/96 p-4 shadow-[0_22px_54px_rgba(111,78,25,0.14)] backdrop-blur md:p-5">
        <div className="grid gap-3 md:grid-cols-3">
          {heroStats.map((stat) => (
            <article key={stat} className="flex min-h-[96px] items-center justify-center rounded-[18px] border border-[#E8D9BD] bg-white px-4 py-5 text-center">
              <p className="text-balance text-[21px] font-black leading-tight text-[#B97916] md:text-[24px]">{stat}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickHighlightsStrip() {
  return (
    <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {quickHighlights.map((item) => (
        <article key={item.title} className="flex h-full flex-col rounded-[24px] border border-[#E8D9BD] bg-[#FFFDF8] p-6 shadow-[0_14px_34px_rgba(111,78,25,0.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(111,78,25,0.1)]">
          <IconBubble icon={item.icon} />
          <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{item.title}</h3>
          <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{item.description}</p>
        </article>
      ))}
    </section>
  );
}

function AboutSection() {
  return (
    <section className="mt-20 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="rounded-[30px] border border-[#E8D9BD] bg-[#FFFDF8] p-6 shadow-[0_18px_42px_rgba(111,78,25,0.08)] md:p-9">
        <SectionHeader eyebrow="About Chikitsa Seva" title="Medical Support with Compassion and Responsibility" align="left" />
        <div className={`mt-6 space-y-5 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>
          <p>
            Chikitsa Seva is a compassionate initiative dedicated to supporting basic medical needs of economically vulnerable individuals, elderly citizens, and families facing health-related difficulty. Through disciplined seva efforts, the initiative helps with medicine assistance, health support coordination, camp-based services, and humane care guidance wherever possible.
          </p>
          <p>
            This seva is rooted in the spirit of service, dignity, and responsibility. It is not only about treatment support, but about standing beside people in times of need with sensitivity, practical help, and human concern.
          </p>
        </div>
      </div>
      <div className="grid gap-5">
        <article className="rounded-[24px] border border-[#E8D9BD] bg-[#FFF9F0] p-6 shadow-[0_14px_34px_rgba(111,78,25,0.07)]">
          <IconBubble icon={ShieldCheckIcon} />
          <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>Mission</h3>
          <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>Support essential medical care with compassion, discipline, and responsible service.</p>
        </article>
        <article className="rounded-[24px] border border-[#E8D9BD] bg-[#FFF9F0] p-6 shadow-[0_14px_34px_rgba(111,78,25,0.07)]">
          <IconBubble icon={HeartPulseIcon} />
          <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>Focus Areas</h3>
          <ul className="mt-4 grid gap-3">
            {["Basic medicine assistance", "Health camp coordination", "Elderly and vulnerable care support", "Need-based emergency help"].map((item) => (
              <li key={item} className="flex gap-3 text-base font-semibold leading-7 text-[#4A3422]">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D89B2B]" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function CoreSupportAreas() {
  return (
    <section className="mt-20">
      <SectionHeader title="Core Medical Support Areas" />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {coreSupportAreas.map((item) => (
          <article key={item.title} className="flex h-full flex-col rounded-[24px] border border-[#E8D9BD] bg-[#FFFDF8] p-6 shadow-[0_14px_34px_rgba(111,78,25,0.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(111,78,25,0.11)]">
            <IconBubble icon={item.icon} />
            <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{item.title}</h3>
            <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="mt-20 rounded-[34px] border border-[#E8D9BD] bg-[#F3E7C9] px-5 py-10 shadow-[0_18px_42px_rgba(111,78,25,0.08)] md:px-8 md:py-12">
      <SectionHeader title="How Chikitsa Seva Works" />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((item) => (
          <article key={item.step} className="rounded-[24px] border border-[#E0CBA7] bg-[#FFFDF8] p-6 shadow-[0_14px_30px_rgba(111,78,25,0.07)]">
            <span className="inline-flex rounded-full bg-[#FFF0DA] px-4 py-2 text-sm font-black tracking-[0.18em] text-[#B97916]">{item.step}</span>
            <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{item.title}</h3>
            <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyMattersSection() {
  return (
    <section className="mt-20 rounded-[34px] border border-[#E8D9BD] bg-[#FFFDF8] p-6 shadow-[0_18px_42px_rgba(111,78,25,0.08)] md:p-10">
      <SectionHeader title="Why This Seva Matters" />
      <div className={`mx-auto mt-6 max-w-4xl space-y-5 text-center ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>
        <p>
          For many families, even basic medicine and timely care can become difficult during periods of financial strain, age-related weakness, or sudden health need. Chikitsa Seva exists to reduce that burden through compassionate support and responsible coordination.
        </p>
        <p>
          This seva reflects the principle that healing support is also a form of human service. When offered with humility and care, even small medical assistance can restore dignity, relief, and hope.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {whyPoints.map((item) => (
          <div key={item} className="rounded-[20px] border border-[#E8D9BD] bg-[#FFF9F0] px-5 py-4 text-center text-base font-semibold text-[#4A3422]">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function StoriesSection() {
  return (
    <section className="mt-20">
      <SectionHeader title="Impact of Service" />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {stories.map((story) => (
          <article key={story.title} className="rounded-[28px] border border-[#E8D9BD] bg-[#FFFDF8] p-6 shadow-[0_16px_38px_rgba(111,78,25,0.08)]">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#FFF0DA] text-[#C46D1A]">
              <span className="text-3xl font-black leading-none">“</span>
            </div>
            <p className={`mt-5 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>"{story.quote}"</p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#B97916]">{story.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DonationSection() {
  return (
    <section className="mt-20 rounded-[38px] border border-[#E4C89F] bg-[linear-gradient(135deg,#FFF1D8_0%,#FFF8EF_42%,#FFFDF9_100%)] p-6 shadow-[0_24px_56px_rgba(196,109,26,0.12)] md:p-10">
      <SectionHeader title="Support a Healing Cause" intro="Your contribution helps strengthen medicine support, camp coordination, and compassionate care services for those in need." />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {donationPlans.map((plan) => (
          <article key={plan.title} className={`relative flex h-full flex-col rounded-[26px] border p-6 shadow-[0_16px_38px_rgba(111,78,25,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(111,78,25,0.13)] ${plan.recommended ? "border-[#D89B2B] bg-[#FFFDF8]" : "border-[#E8D9BD] bg-white/90"}`}>
            {plan.recommended ? <span className="absolute right-5 top-5 rounded-full bg-[#6E8B3D] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">Recommended</span> : null}
            <h3 className={`pr-16 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{plan.title}</h3>
            <p className="mt-4 text-2xl font-black text-[#B97916]">{plan.amount}</p>
            <p className={`mt-4 flex-1 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{plan.description}</p>
            <PrimaryButton to={ROUTES.donate}>Contribute</PrimaryButton>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-7 max-w-3xl text-center text-sm font-medium leading-6 text-[#7A6A5D]">
        Contributions may be used where the medical need is most urgent and service support is most required.
      </p>
    </section>
  );
}

function VolunteerSection() {
  return (
    <section className="mt-20 rounded-[34px] border border-[#E8D9BD] bg-[#FFFDF8] p-6 shadow-[0_18px_42px_rgba(111,78,25,0.08)] md:p-10">
      <SectionHeader title="Offer Your Time, Skill, or Support" intro="Doctors, nurses, pharmacists, medical students, organizers, and compassionate volunteers can participate in this seva according to their capacity." />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {volunteerRoles.map((role) => (
          <article key={role.title} className="rounded-[24px] border border-[#E8D9BD] bg-[#FFF9F0] p-6 shadow-[0_14px_34px_rgba(111,78,25,0.07)] transition hover:-translate-y-1">
            <IconBubble icon={role.icon} />
            <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{role.title}</h3>
            <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{role.description}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 text-center">
        <PrimaryButton to={ROUTES.involved.volunteer}>Join as Volunteer</PrimaryButton>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mt-20 overflow-hidden rounded-[38px] border border-[#D8A84D] bg-[linear-gradient(135deg,#D78A24_0%,#E9BD62_45%,#F2D789_100%)] px-6 py-10 shadow-[0_22px_46px_rgba(161,105,31,0.16)] md:px-10 md:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#B96816]`}>Sacred Healing Seva</p>
          <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-5 text-[#4A3422]`}>Support Compassionate Medical Care</h2>
          <p className={`mt-5 max-w-2xl ${SEVA_BODY_TEXT_CLASS} text-[#4A3422]`}>
            Help strengthen medicine assistance, health camp support, and care coordination for people facing medical difficulty with dignity and compassion.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            ["Donate Now", ROUTES.donate],
            ["Support Medicine Seva", ROUTES.donate],
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8D9BD] bg-[#FFFDF8]/95 px-4 py-3 shadow-[0_-10px_24px_rgba(101,71,35,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <Link to={ROUTES.donate} className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-full bg-[#D89B2B] px-4 text-sm font-semibold text-white">
          Donate
        </Link>
        <Link to={ROUTES.involved.volunteer} className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-full border border-[#D89B2B] bg-white px-4 text-sm font-semibold text-[#B97916]">
          Volunteer
        </Link>
      </div>
    </div>
  );
}

export default memo(function MedicinePage() {
  usePageMeta(
    "Chikitsa Seva",
    "Chikitsa Seva page with medicine assistance, health camp support, donation options, transparency, and medical volunteer participation.",
  );

  return (
    <div className="bg-[#F8F3E8] pb-24 text-[#6B5A4A] md:pb-10">
      <ChikitsaHero />
      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <QuickHighlightsStrip />
        <AboutSection />
        <CoreSupportAreas />
        <ProcessSection />
        <WhyMattersSection />
        <StoriesSection />
        <DonationSection />
        <VolunteerSection />
        <FinalCTA />
      </main>
      <StickyMobileCTA />
    </div>
  );
});
