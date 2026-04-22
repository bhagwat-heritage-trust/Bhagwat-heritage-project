import { memo, type ReactNode } from "react";
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

type IconName =
  | "dignity"
  | "verified"
  | "volunteer"
  | "transparent"
  | "kit"
  | "rupee"
  | "community"
  | "diya"
  | "home"
  | "report"
  | "heart";

const heroImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1776857856/herobanner_k_jckja5.png";
const aboutImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1776857856/about_kanyaddan_tvrmig.png";

const trustHighlights = [
  {
    title: "Dignity First",
    text: "Every support model is guided by respect, sensitivity, and family care.",
    icon: "dignity" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860524/ChatGPT_Image_Apr_22_2026_05_49_21_PM_rewr7v.png",
  },
  {
    title: "Verified Support",
    text: "Assistance is aligned with genuine needs through a disciplined seva process.",
    icon: "verified" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857897/k2_z04doe.png",
  },
  {
    title: "Volunteer Network",
    text: "Committed volunteers help coordinate support with responsibility and compassion.",
    icon: "volunteer" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857855/k4_oggwmf.png",
  },
  {
    title: "Transparent Help",
    text: "Contributions are directed through a clear and accountable support flow.",
    icon: "transparent" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860594/ChatGPT_Image_Apr_22_2026_05_52_59_PM_xzrx8l.png",
  },
];

const impactItems = [
  {
    title: "Dignity-Centered Support",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857897/k1_pwmuju.png",
  },
  {
    title: "Verified Family Assistance",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857897/k2_z04doe.png",
  },
  {
    title: "Material + Financial Models",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857855/k3_ni4t1w.png",
  },
  {
    title: "Volunteer-Led Coordination",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857855/k4_oggwmf.png",
  },
];

const serviceCards = [
  {
    title: "Complete Kanyadaan Support",
    text: "Full wedding support including clothing, rituals, and essential arrangements for underprivileged brides.",
    icon: "heart" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860524/ChatGPT_Image_Apr_22_2026_05_49_21_PM_rewr7v.png",
    featured: true,
  },
  {
    title: "Marriage Kit Distribution",
    text: "Providing sarees, utensils, bedding, and basic household items for a new beginning.",
    icon: "kit" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860578/ChatGPT_Image_Apr_22_2026_05_48_59_PM_rjcbbu.png",
  },
  {
    title: "Financial Assistance",
    text: "Direct need-based support to help families manage marriage expenses with dignity.",
    icon: "rupee" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860579/ChatGPT_Image_Apr_22_2026_05_48_42_PM_b3cvis.png",
    featured: true,
  },
  {
    title: "Group Marriage Sponsorship",
    text: "Support for community marriage initiatives to help multiple couples together.",
    icon: "community" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860577/ChatGPT_Image_Apr_22_2026_05_49_07_PM_thhet1.png",
  },
  {
    title: "Ritual & Ceremony Support",
    text: "Assistance for pandit, mandap, and basic ceremonial essentials where needed.",
    icon: "diya" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860594/ChatGPT_Image_Apr_22_2026_05_52_59_PM_xzrx8l.png",
  },
  {
    title: "Post-Marriage Setup Support",
    text: "Basic starter support for beginning a stable and dignified household after marriage.",
    icon: "home" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857855/k1_cge7yg.png",
  },
];

const processSteps = [
  [
    "01",
    "Family Need Identification",
    "Families are connected through trusted references, volunteers, and community channels.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1776857855/k4_oggwmf.png",
  ],
  [
    "02",
    "Verification & Discussion",
    "The seva team reviews the need with privacy, sensitivity, and respectful conversation.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1776857897/k2_z04doe.png",
  ],
  [
    "03",
    "Support Planning",
    "Material, ceremonial, household, or financial support is planned according to the situation.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1776860579/ChatGPT_Image_Apr_22_2026_05_48_42_PM_b3cvis.png",
  ],
  [
    "04",
    "Sponsor or Volunteer Coordination",
    "Sponsors and volunteers are connected through a disciplined support flow.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1776860577/ChatGPT_Image_Apr_22_2026_05_49_07_PM_thhet1.png",
  ],
  [
    "05",
    "Marriage Assistance Delivery",
    "Support is delivered with care before or during the marriage need, without public pressure.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1776860524/ChatGPT_Image_Apr_22_2026_05_49_21_PM_rewr7v.png",
  ],
  [
    "06",
    "Dignified Completion & Reporting",
    "The seva is completed with accountability while protecting family dignity and privacy.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1776860594/ChatGPT_Image_Apr_22_2026_05_52_59_PM_xzrx8l.png",
  ],
] as const;

const contributionCards = [
  {
    title: "Essential Support",
    amount: "Rs 11,000",
    text: "Help with basic marriage-related essentials.",
  },
  {
    title: "Marriage Kit Support",
    amount: "Rs 21,000",
    text: "Support clothing, utensils, bedding, and household starter items.",
  },
  {
    title: "Full Marriage Assistance",
    amount: "Rs 51,000",
    text: "Provide major support for a dignified marriage journey.",
  },
  {
    title: "Community Marriage Sponsor",
    amount: "Rs 1,11,000",
    text: "Help support multiple families through a group marriage initiative.",
  },
];

const dignityPoints = [
  {
    text: "Support is offered with privacy and sensitivity",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860524/ChatGPT_Image_Apr_22_2026_05_49_21_PM_rewr7v.png",
  },
  {
    text: "Families are not publicly displayed for sympathy",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857855/k1_cge7yg.png",
  },
  {
    text: "Assistance is based on real need and responsible review",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857897/k2_z04doe.png",
  },
  {
    text: "Material and financial support are managed carefully",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860579/ChatGPT_Image_Apr_22_2026_05_48_42_PM_b3cvis.png",
  },
  {
    text: "Sponsors and volunteers remain connected through a clear seva process",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860577/ChatGPT_Image_Apr_22_2026_05_49_07_PM_thhet1.png",
  },
];

const participationCards = [
  {
    title: "Sponsor a Daughter",
    text: "Support a verified marriage assistance need with compassion and responsibility.",
    icon: "heart" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860524/ChatGPT_Image_Apr_22_2026_05_49_21_PM_rewr7v.png",
    to: ROUTES.donate,
  },
  {
    title: "Refer a Family",
    text: "Help connect genuinely deserving families to the seva team for careful review.",
    icon: "community" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857855/k4_oggwmf.png",
    to: ROUTES.contact,
  },
  {
    title: "Join the Seva Team",
    text: "Contribute time, coordination, field support, or event assistance as a volunteer.",
    icon: "volunteer" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860577/ChatGPT_Image_Apr_22_2026_05_49_07_PM_thhet1.png",
    to: ROUTES.involved.volunteer,
  },
  {
    title: "Partner for Group Marriage",
    text: "Collaborate in larger community marriage support initiatives.",
    icon: "verified" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857897/k2_z04doe.png",
    to: ROUTES.contact,
  },
];

const faqs = [
  {
    q: "Who can receive Kanyadaan Seva support?",
    a: "The seva is intended for underprivileged daughters and financially challenged families based on genuine need and internal review.",
  },
  {
    q: "What kind of assistance is provided?",
    a: "Support may include material items, ceremonial essentials, household starter support, and need-based financial assistance depending on the case.",
  },
  {
    q: "Can I support only a part of the marriage need?",
    a: "Yes. Devotees may contribute partially through a selected support model or general Kanyadaan Seva donation.",
  },
  {
    q: "Can I volunteer in this seva?",
    a: "Yes. Volunteers may assist in coordination, logistics, family support, ceremonies, and disciplined seva management.",
  },
  {
    q: "How is transparency maintained?",
    a: "Contributions are aligned with a verified support flow and handled through a clear and accountable seva process.",
  },
  {
    q: "Is family dignity and privacy protected?",
    a: "Yes. Respect, sensitivity, and privacy are treated as central values in this seva initiative.",
  },
];

function Icon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const common = { className, "aria-hidden": true };

  if (name === "dignity" || name === "heart") {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path d="M7 12.4 4.8 10.2a2.3 2.3 0 0 1 3.2-3.3L12 10.8l4-3.9a2.3 2.3 0 0 1 3.2 3.3L12 17.4l-2.1-2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 15.5h3.4l2.1 2.1c1.4 1.4 3.6 1.4 5 0l2.1-2.1H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "verified") {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path d="M12 3 19 6v5.8c0 4.2-2.9 7.7-7 9.2-4.1-1.5-7-5-7-9.2V6l7-3Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "volunteer" || name === "community") {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 19c.6-3 2.8-5 5.7-5h1.1c2.9 0 5.1 2 5.7 5M15.5 14.2c2.2.3 3.9 1.9 4.3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "transparent" || name === "report") {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path d="M7 3.8h7l3 3V20H7V3.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 4v4h4M9.5 12.2h5M9.5 15.5h4M9.5 9h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "kit") {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path d="m4 8 8-4 8 4v9l-8 4-8-4V8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m4.5 8.4 7.5 4 7.5-4M12 12.4V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "rupee") {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path d="M6 5h12M6 9h12M8 5h5.2a4 4 0 0 1 0 8H8l7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "diya") {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path d="M4 14.5c1.6 3.2 4.3 5 8 5s6.4-1.8 8-5H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 4.5s2.8 2.5 2.8 5a2.8 2.8 0 1 1-5.6 0c0-2.5 2.8-5 2.8-5Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" {...common}>
      <path d="m4 11 8-7 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 10.5V20h11v-9.5M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBadge({ icon }: { icon: IconName }) {
  return (
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#ead4b4] bg-[#fff0da] text-[#c46d1a]">
      <Icon name={icon} />
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#b96a22]`}>{eyebrow}</p> : null}
      <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-3 text-[#1d4f63]`}>{title}</h2>
      {subtitle ? <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{subtitle}</p> : null}
    </div>
  );
}

function PrimaryButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#e4b45e] px-7 text-base font-bold text-white shadow-[0_16px_30px_rgba(196,109,26,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d08a32]"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      to={to}
      className={
        light
          ? "inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/60 px-7 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#8a4b12]"
          : "inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#d9b777] bg-white/80 px-7 text-base font-bold text-[#8a5b16] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff4df]"
      }
    >
      {children}
    </Link>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <article className={`h-full rounded-[28px] border border-[#e6d4bb] bg-[#fffdfa] p-6 shadow-[0_16px_34px_rgba(101,71,35,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(101,71,35,0.12)] ${className}`}>
      {children}
    </article>
  );
}

export default memo(function KanyaPage() {
  usePageMeta(
    "Kanyadaan Seva",
    "Dignified Kanyadaan Seva support for underprivileged daughters through compassionate, transparent, and community-rooted marriage assistance.",
  );

  return (
    <div className="min-h-screen bg-[#fff8ef] pb-20 text-[#4a3422] md:pb-10">
      <section className="relative -mx-6 -mt-12 overflow-hidden bg-[#fff8ef] pb-8 md:-mx-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,180,94,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(196,109,26,0.09),transparent_32%)]" />
        <div
          className="relative min-h-[640px] overflow-hidden rounded-b-[40px] bg-cover bg-center shadow-[0_18px_40px_rgba(23,12,5,0.14)]"
          style={{ backgroundImage: `url('${heroImage}')` }}
          role="img"
          aria-label="Dignified Indian marriage blessing support scene"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-end justify-center px-6 py-16 text-center md:px-8 md:py-20">
            <div className="w-full max-w-4xl px-2 py-4 text-white md:px-6 md:py-6" style={{ animation: "kanyaFadeUp 0.85s ease-out both" }}>
              <h1 className="text-4xl font-bold leading-tight text-[#f9e6a8] md:text-5xl">Kanyadaan Seva</h1>
              <p className={`mt-5 whitespace-normal ${SEVA_HERO_SUBTITLE_CLASS} text-[#f7e0a0]`}>
                Support a marriage, uplift a family
              </p>
              <div className="hero-actions mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to={ROUTES.donate}
                  className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full bg-[#e4b45e] px-8 text-base font-bold text-[#fff7df] shadow-[0_18px_34px_rgba(196,109,26,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d08a32]"
                >
                  Support a Daughter
                </Link>
                <Link
                  to={ROUTES.involved.volunteer}
                  className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full border border-[#f7e0a0]/60 bg-black/10 px-8 text-base font-bold text-[#f9e6a8] transition-all duration-300 hover:bg-[#f9e6a8] hover:text-[#33210f]"
                >
                  Become a Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes kanyaFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main>
        <section className="relative z-10 mx-auto mt-2 max-w-7xl px-4 md:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustHighlights.map((item) => (
              <Card key={item.title} className="text-center">
                <div className="flex justify-center">
                  <img src={item.image} alt="" className="h-24 w-24 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                </div>
                <h2 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{item.title}</h2>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{item.text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <div className="overflow-hidden rounded-[36px] border border-[#e6d4bb] bg-[#fffdfa] shadow-[0_22px_52px_rgba(101,71,35,0.1)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 md:p-10">
                <SectionHeader eyebrow="About Kanyadaan Seva" title="Support rooted in dignity and family care" align="left" />
                <div className={`mt-6 space-y-5 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
                  <p>
                    Kanyadaan Seva is dedicated to helping underprivileged daughters and financially challenged families receive dignified marriage support with compassion, cultural sensitivity, and responsible community care. The initiative is not merely financial assistance; it is a respectful service effort that seeks to reduce hardship, protect family dignity, and support essential marriage needs in a disciplined and transparent manner.
                  </p>
                  <p>
                    This seva may include material assistance, ceremonial essentials, household starter support, selective financial help, and community-led coordination depending on the verified needs of each family. The purpose is to ensure that support reaches where it is genuinely required, without display, pressure, or loss of dignity.
                  </p>
                </div>
              </div>
              <div className="relative min-h-[360px] bg-[#fff0da]">
                <img src={aboutImage} alt="Kanyadaan Seva marriage support coordination" className="h-full min-h-[360px] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3422]/35 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fffdfa] px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Impact Snapshot" title="Disciplined support without public display" />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {impactItems.map((item) => (
                <Card key={item.title} className="text-center">
                  <div className="flex justify-center">
                    <img src={item.image} alt="" className="h-20 w-20 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                  </div>
                  <p className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{item.title}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Kanyadaan Services" title="Dignified support for daughters and families" />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {serviceCards.map((item) => (
                <Card key={item.title} className={item.featured ? "bg-[linear-gradient(180deg,#fff8ed_0%,#fffdfa_100%)] ring-1 ring-[#e4b45e]/45" : ""}>
                  <div className="flex justify-center">
                    <img src={item.image} alt="" className="h-24 w-24 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                  </div>
                  <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{item.title}</h3>
                  <p className={`mt-3 min-h-[84px] ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{item.text}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={ROUTES.donate} className="rounded-full bg-[#e4b45e] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#d08a32]">Donate Now</Link>
                    <Link to={ROUTES.contact} className="rounded-full border border-[#d9b777] px-5 py-2.5 text-sm font-bold text-[#8a5b16] transition hover:bg-[#fff4df]">Learn More</Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8f3e8] px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Seva Process"
              title="How the Seva Works"
              subtitle="Each case is handled with sensitivity, verification, and respect so that support reaches genuinely deserving families in a disciplined manner."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
              {processSteps.map(([step, title, text, image]) => (
                <Card key={step} className="relative text-center">
                  <div className="flex justify-center">
                    <img src={image} alt="" className="h-24 w-24 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#b96a22]">{step}</p>
                  <h3 className={`mt-3 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-[#e4c89f] bg-[linear-gradient(135deg,#fff1d8_0%,#fff8ef_42%,#fffdf9_100%)] p-6 shadow-[0_24px_56px_rgba(196,109,26,0.12)] md:p-10">
            <SectionHeader eyebrow="Ways to Support" title="Choose a contribution model to support a dignified marriage journey" />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {contributionCards.map((item) => (
                <Card key={item.title} className="bg-white/92">
                  <p className="text-2xl font-black text-[#c46d1a]">{item.amount}</p>
                  <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{item.title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{item.text}</p>
                </Card>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-base font-semibold leading-7 text-[#6a5848]">
              Every contribution is directed toward verified and dignity-centered support processes.
            </p>
            <div className="mt-7 text-center">
              <PrimaryButton to={ROUTES.donate}>Donate Now</PrimaryButton>
            </div>
          </div>
        </section>

        <section className="bg-[#fffdfa] px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl rounded-[36px] border border-[#e6d4bb] bg-[#f8f3e8] p-6 shadow-[0_20px_46px_rgba(101,71,35,0.09)] md:p-10">
            <SectionHeader eyebrow="Dignity Commitment" title="Our Commitment to Dignity and Transparency" />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {dignityPoints.map((point) => (
                <div key={point.text} className="rounded-[24px] border border-[#e6d4bb] bg-white/92 p-5 text-center shadow-[0_12px_26px_rgba(101,71,35,0.06)]">
                  <div className="flex justify-center">
                    <img src={point.image} alt="" className="h-20 w-20 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                  </div>
                  <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} font-semibold text-[#4a3422]`}>{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Participation Pathways" title="How You Can Participate" />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {participationCards.map((item) => (
                <Card key={item.title} className="text-center">
                  <div className="flex justify-center">
                    <img src={item.image} alt="" className="h-24 w-24 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                  </div>
                  <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{item.title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{item.text}</p>
                  <Link to={item.to} className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#d9b777] px-5 text-sm font-bold text-[#8a5b16] transition hover:bg-[#fff4df]">
                    Continue
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 pt-10 md:px-8 md:pb-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[38px] border border-[#dcb884] bg-[linear-gradient(135deg,#c46d1a_0%,#e4b45e_45%,#f3d8a0_100%)] px-6 py-10 text-white shadow-[0_22px_46px_rgba(196,109,26,0.2)] md:px-10 md:py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className={`${SEVA_SECTION_LABEL_CLASS} text-white/80`}>Final Call to Serve</p>
                <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-4 text-white`}>Support a Dignified Marriage Journey</h2>
                <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-white/92`}>
                  Help a daughter and her family with respectful, compassionate, and transparent Kanyadaan Seva.
                </p>
              </div>
              <div className="flex w-full max-w-md flex-col gap-3">
                <Link to={ROUTES.donate} className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-white px-6 text-base font-semibold text-[#9b4b11] transition-colors hover:bg-[#fff4df]">
                  Sponsor a Daughter
                </Link>
                <Link to={ROUTES.involved.volunteer} className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/60 px-6 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#9b4b11]">
                  Become a Volunteer
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});
