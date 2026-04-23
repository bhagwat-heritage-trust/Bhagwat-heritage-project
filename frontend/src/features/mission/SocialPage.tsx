import { memo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  MISSION_BODY_TEXT_CLASS,
  MISSION_CARD_TITLE_CLASS,
  MISSION_HERO_SUBTITLE_CLASS,
  MISSION_SECTION_HEADING_CLASS,
  MISSION_SECTION_LABEL_CLASS,
} from "./missionTypography";

type IconProps = { className?: string };

const HERO_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1776964891/ChatGPT_Image_Apr_23_2026_10_50_44_PM_xvrafc.png";

const sectionClass = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";

const ICON = {
  compassion: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_06_53_AM_imueuc.png",
  dignity: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_07_00_AM_eggbt0.png",
  community: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_13_43_AM_clhwzy.png",
  intention: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_10_35_AM_jz5cra.png",
  seva: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_13_31_AM_ubh0oa.png",
  medical: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_06_48_AM_bawe5q.png",
  education: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_06_36_AM_j1fxyl.png",
  care: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973582/ChatGPT_Image_Apr_24_2026_01_06_42_AM_g0usha.png",
  partner: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973582/ChatGPT_Image_Apr_24_2026_01_06_28_AM_imnh91.png",
} as const;

const TRUST_STRIP = [
  { label: "Compassion-led service", image: ICON.compassion },
  { label: "Dignified support", image: ICON.dignity },
  { label: "Community upliftment", image: ICON.community },
] as const;

const SNAPSHOT_CARDS = [
  {
    title: "Compassion in Action",
    description: "Serving with sensitivity, care, and responsibility.",
    image: ICON.compassion,
  },
  {
    title: "Human Welfare",
    description: "Helping lives with timely and thoughtful support.",
    image: ICON.community,
  },
  {
    title: "Sacred Inspiration",
    description: "Service inspired by devotion, humility, and dharma.",
    image: ICON.intention,
  },
  {
    title: "Sustainable Service",
    description: "Long-term upliftment rooted in disciplined efforts.",
    image: ICON.seva,
  },
] as const;

const WRITEUP_BLOCKS = [
  {
    title: "Why We Serve",
    description: "To ensure compassion becomes organized support that protects dignity and restores hope.",
  },
  {
    title: "Who We Support",
    description: "Individuals, families, and communities facing hardship—especially where timely help matters most.",
  },
  {
    title: "Spirit of the Mission",
    description: "Service as devotion in action—disciplined, humble, and grounded in dharmic responsibility.",
  },
] as const;

const INTENTION_CARDS = [
  {
    title: "Social Intention",
    description:
      "This mission protects dignity while extending practical support where it is needed most. It is not only charity, but a disciplined culture of compassionate response.",
    image: ICON.intention,
  },
  {
    title: "Seva Direction",
    description:
      "Our service efforts aim to combine sensitivity, structure, and spiritual responsibility so that every initiative reaches people respectfully and meaningfully.",
    image: ICON.partner,
  },
] as const;

const SERVICE_AREAS = [
  {
    title: "Food Distribution (Anna Seva)",
    description: "Nutritious meal support for individuals, families, and gatherings in need.",
    impact: "Reduces hunger and promotes humane care.",
    href: ROUTES.seva.ann,
    image: ICON.seva,
  },
  {
    title: "Medical Support",
    description: "Health assistance, relief support, and care for individuals needing timely treatment.",
    impact: "Supports wellbeing and dignified recovery.",
    href: ROUTES.seva.medicine,
    image: ICON.medical,
  },
  {
    title: "Educational Assistance",
    description: "Learning support, study materials, and guidance for students from modest backgrounds.",
    impact: "Encourages growth and long-term empowerment.",
    href: ROUTES.seva.education,
    image: ICON.education,
  },
  {
    title: "Gau Seva (Cow Protection)",
    description: "Care, nourishment, and protection for sacred cows with disciplined daily support.",
    impact: "Promotes compassion and dharmic responsibility.",
    href: ROUTES.seva.gau,
    image: ICON.care,
  },
  {
    title: "Disaster Relief",
    description: "Timely aid and emergency response during difficult situations and local crises.",
    impact: "Provides stability during urgent need.",
    href: ROUTES.seva.disasterRelief,
    image: ICON.dignity,
  },
  {
    title: "Support for Vulnerable Communities",
    description: "Respectful assistance for laboring and vulnerable communities through need-based outreach.",
    impact: "Strengthens human dignity and support access.",
    href: ROUTES.involved.index,
    image: ICON.community,
  },
] as const;

const SEVA_STEPS = [
  {
    title: "Need Identification",
    description: "Understanding the situation with care and awareness.",
    image: ICON.intention,
  },
  {
    title: "Ground Verification",
    description: "Confirming the need through responsible local review.",
    image: ICON.dignity,
  },
  {
    title: "Seva Planning",
    description: "Designing thoughtful and suitable support.",
    image: ICON.seva,
  },
  {
    title: "Resource Coordination",
    description: "Aligning volunteers, materials, and contributions.",
    image: ICON.partner,
  },
  {
    title: "Dignified Delivery",
    description: "Serving respectfully with accountability and compassion.",
    image: ICON.compassion,
  },
] as const;

const SOCIAL_VALUES = [
  { title: "Compassion", description: "Respond to suffering with active kindness." },
  { title: "Empathy", description: "See people with dignity and human understanding." },
  { title: "Responsibility", description: "Serve with discipline, clarity, and care." },
  { title: "Hope & Security", description: "Help communities regain stability and confidence." },
] as const;

const OPERATION_ITEMS = [
  {
    title: "Seva Coordination",
    description: "Structured planning, volunteer allocation, and accountable execution for each initiative.",
    image: ICON.seva,
  },
  {
    title: "Community Support Operations",
    description: "Need-aligned assistance with respectful engagement and clear communication.",
    image: ICON.community,
  },
  {
    title: "Review and Response Window",
    description: "Follow-up, learning, and improved readiness for future service support.",
    image: ICON.intention,
  },
] as const;

const COMMITMENTS = [
  { label: "Dignity-first support", image: ICON.dignity },
  { label: "Spiritually inspired service", image: ICON.intention },
  { label: "Community-centered outreach", image: ICON.community },
  { label: "Volunteer and donor participation", image: ICON.compassion },
] as const;

const PARTICIPATION_ACTIONS = [
  {
    title: "Become a Volunteer",
    description: "Offer time and energy in living seva with guidance.",
    cta: "Join Now",
    href: ROUTES.involved.volunteer,
    image: ICON.compassion,
  },
  {
    title: "Sponsor a Service",
    description: "Support a focused initiative with meaningful contribution.",
    cta: "Support Now",
    href: ROUTES.donate,
    image: ICON.seva,
  },
  {
    title: "Contribute Materials",
    description: "Help with essentials that directly support service delivery.",
    cta: "Contribute",
    href: ROUTES.contact,
    image: ICON.education,
  },
  {
    title: "Partner With the Mission",
    description: "Collaborate for outreach, drives, and long-term upliftment.",
    cta: "Partner With Us",
    href: ROUTES.contact,
    image: ICON.partner,
  },
] as const;

export default memo(function SocialPage() {
  usePageMeta(
    "Social Service Mission",
    "Social service mission of Bhagwat Heritage focused on compassion-led, dignified support through Anna Seva, healthcare, education assistance, Gau Seva, disaster relief, and community outreach.",
  );

  return (
    <main className="social-service-mission-page -mt-12 min-h-screen overflow-hidden bg-[#F7F1E7] text-[#6B5A48]">
      <Hero />

      <section className={`${sectionClass} -mt-12 pb-8 md:-mt-14`}>
        <div className="rounded-[30px] border border-[#E8D9C4] bg-[#FFFDF9]/92 p-4 shadow-[0_22px_54px_rgba(111,78,25,0.12)] backdrop-blur md:p-5">
          <div className="grid gap-3 md:grid-cols-3">
            {TRUST_STRIP.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-3 rounded-[22px] border border-[#E8D9C4] bg-white px-5 py-5 text-center transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(111,78,25,0.12)]"
              >
                <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#E8D9C4] bg-[#FFFDF9] shadow-[0_14px_30px_rgba(111,78,25,0.10)]">
                  <img src={item.image} alt={`${item.label} icon`} className="h-full w-full object-contain p-3" loading="lazy" />
                </span>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1D4F63]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section
        id="snapshot"
        eyebrow="Mission Snapshot"
        title="A mission of compassionate, disciplined social support"
        subtitle="A structured service mission rooted in devotion, dignity, and practical help."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {SNAPSHOT_CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.04}>
              <article className="sacred-card h-full p-6 transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(111,78,25,0.14)]">
                <IconImageCircle src={card.image} alt={`${card.title} icon`} />
                <h3 className={`mt-5 ${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{card.title}</h3>
                <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{card.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="overview"
        eyebrow="Mission Overview"
        title="Service as devotion through action"
        subtitle="An expression of spirituality that becomes protection, support, and upliftment for society."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.28fr)_minmax(0,0.92fr)]">
          <Reveal>
            <article className="sacred-card p-6 md:p-8">
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#A96F1D]`}>Mission Write-Up</p>
              <h3 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#1D4F63]`}>
                Social service is an expression of devotion through action
              </h3>
              <p className={`mt-5 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>
                Our social service mission is an expression of devotion through action. We believe spirituality must reflect
                in compassion, responsibility, and upliftment of society. Through thoughtful initiatives, the institution
                seeks to support individuals, families, and communities with dignity and care.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {WRITEUP_BLOCKS.map((item) => (
                  <div key={item.title} className="rounded-[20px] border border-[#E8D9C4] bg-[#FFF8EC] p-5">
                    <h4 className="text-sm font-black uppercase tracking-[0.16em] text-[#A96F1D]">{item.title}</h4>
                    <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <div className="grid gap-4">
            {INTENTION_CARDS.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.06}>
                <article className="sacred-card p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <IconImageBadge src={card.image} alt={`${card.title} icon`} />
                    <div>
                      <h3 className={`text-2xl font-black text-[#1D4F63]`}>{card.title}</h3>
                      <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{card.description}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="services"
        eyebrow="Mission Explorer"
        title="Service initiatives shaping social support"
        subtitle="Service initiatives shaping social support through compassionate action."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
          {SERVICE_AREAS.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.03}>
              <article className="sacred-card group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(111,78,25,0.14)]">
                <IconImageCircle src={card.image} alt={`${card.title} icon`} />
                <h3 className={`mt-5 ${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{card.title}</h3>
                <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{card.description}</p>
                <div className="mt-5 rounded-[20px] border border-[#E8D9C4] bg-[#FFF8EC] p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#A96F1D]">Social Impact</p>
                  <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{card.impact}</p>
                </div>
                <Link
                  to={card.href}
                  className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#D89B2B] px-5 text-sm font-black text-white shadow-[0_14px_28px_rgba(177,112,24,0.18)] transition hover:-translate-y-0.5 hover:bg-[#B97916] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D89B2B]"
                >
                  Explore
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="process"
        eyebrow="How Seva Works"
        title="A calm, disciplined process of compassionate delivery"
        subtitle="A step-by-step flow that protects dignity and strengthens trust."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 lg:gap-6">
          {SEVA_STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.03}>
              <article className="sacred-card relative h-full p-6">
                <span className="absolute right-6 top-6 rounded-full border border-[#E8D9C4] bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#A96F1D]">
                  Step {index + 1}
                </span>
                <IconImageCircle src={step.image} alt={`${step.title} icon`} small />
                <h3 className={`mt-5 ${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{step.title}</h3>
                <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="values"
        eyebrow="Values & Operations"
        title="Service guided by values, carried by discipline"
        subtitle="A values-led mission supported by clear operational principles."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="sacred-card p-6 md:p-8">
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#A96F1D]`}>Social Values</p>
              <h3 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#1D4F63]`}>Values behind long-term transformation</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {SOCIAL_VALUES.map((item) => (
                  <div key={item.title} className="rounded-[20px] border border-[#E8D9C4] bg-[#FFF8EC] p-5">
                    <h4 className={`text-[18px] font-black text-[#1D4F63]`}>{item.title}</h4>
                    <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.04}>
            <article className="sacred-card p-6 md:p-8">
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#A96F1D]`}>Operational Principles</p>
              <h3 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#1D4F63]`}>Organized, transparent service delivery</h3>
              <div className="mt-6 space-y-4">
                {OPERATION_ITEMS.map((item) => (
                  <div key={item.title} className="rounded-[22px] border border-[#E8D9C4] bg-white p-5 shadow-[0_12px_26px_rgba(111,78,25,0.08)]">
                    <div className="flex items-start gap-4">
                      <IconImageBadge src={item.image} alt={`${item.title} icon`} />
                      <div className="min-w-0">
                        <h4 className="text-[18px] font-black leading-tight text-[#1D4F63]">{item.title}</h4>
                        <p className={`mt-2 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      <section className={`${sectionClass} pb-6 md:pb-10`}>
        <div className="relative overflow-hidden rounded-[30px] border border-[#E8D9C4] bg-[linear-gradient(135deg,rgba(255,248,236,0.96)_0%,rgba(233,184,93,0.24)_48%,rgba(29,79,99,0.12)_100%)] p-7 shadow-[0_26px_64px_rgba(111,78,25,0.16)] md:p-10">
          <div className="absolute -left-16 -top-20 h-72 w-72 rounded-full bg-white/35 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-16 -bottom-24 h-72 w-72 rounded-full bg-[#1D4F63]/10 blur-3xl" aria-hidden="true" />

          <Reveal>
            <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#A96F1D]`}>Commitment</p>
            <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-5 text-[#1D4F63]`}>What we commit to protect and grow</h2>
            <p className={`mt-4 max-w-3xl ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>
              We don’t measure service by numbers alone. We measure it by dignity preserved, trust earned, and lives strengthened
              through responsible care.
            </p>
          </Reveal>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMMITMENTS.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.03}>
                <div className="flex items-center gap-3 rounded-[22px] border border-[#E8D9C4] bg-white/80 px-4 py-4 shadow-[0_10px_22px_rgba(111,78,25,0.08)] backdrop-blur">
                  <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#E8D9C4] bg-[#FFFDF9] shadow-[0_14px_30px_rgba(111,78,25,0.10)]">
                    <img src={item.image} alt={`${item.label} icon`} className="h-full w-full object-contain p-3" loading="lazy" />
                  </span>
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[#1D4F63]">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section
        id="participate"
        eyebrow="Participate"
        title="Become part of compassionate and harmonious social service"
        subtitle="Multiple ways to join, support, and carry service into daily life."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {PARTICIPATION_ACTIONS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.03}>
              <article className="sacred-card group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(111,78,25,0.14)]">
                <IconImageCircle src={item.image} alt={`${item.title} icon`} />
                <h3 className={`mt-5 ${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{item.title}</h3>
                <p className={`mt-3 flex-1 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{item.description}</p>
                <Link
                  to={item.href}
                  className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#1D4F63] px-5 text-sm font-black text-white shadow-[0_14px_28px_rgba(29,79,99,0.18)] transition hover:-translate-y-0.5 hover:bg-[#143847] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4F63]"
                >
                  {item.cta}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className={`${sectionClass} pb-16 md:pb-20 lg:pb-24`}>
        <div className="relative overflow-hidden rounded-[34px] border border-[#E8D9C4] bg-[linear-gradient(120deg,#FFF7E7_0%,#F2D08E_42%,#D9A23B_100%)] shadow-[0_30px_80px_rgba(111,78,25,0.16)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_26%,rgba(255,255,255,0.65),transparent_55%),radial-gradient(circle_at_88%_72%,rgba(255,239,200,0.42),transparent_52%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.00)_55%)]" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none text-[160px] font-black leading-none text-white/20 md:text-[240px]"
          >
            {"\u0950"}
          </span>

          <div className="relative p-8 md:p-12">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#A96F1D]">Final Call</p>
              <h2 className="mt-4 text-[30px] font-black leading-tight text-[#1D4F63] md:text-[44px]">
                Serve society with devotion, discipline, and compassion.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-[1.75] text-[#6B5A48] md:text-[18px]">
                Your support can strengthen meaningful service and help reach lives with dignity and care.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={ROUTES.involved.volunteer}
                  className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full bg-[#2C2116] px-8 text-base font-black text-white shadow-[0_18px_34px_rgba(44,33,22,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f160e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2C2116]"
                >
                  Join Seva
                </Link>
                <Link
                  to={ROUTES.donate}
                  className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full border border-[#E8D9C4] bg-white/90 px-8 text-base font-black text-[#A96F1D] shadow-[0_18px_34px_rgba(255,255,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#1D4F63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Support a Cause
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
});

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fff8ef] pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,180,94,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(29,79,99,0.12),transparent_32%)]" />

      <div className="inner-hero relative min-h-[640px] overflow-hidden rounded-b-[40px] bg-cover bg-center shadow-[0_18px_40px_rgba(23,12,5,0.14)]">
        <SafeImage
          src={HERO_IMAGE}
          fallbackSrc={HERO_IMAGE}
          alt="Spiritual compassion and social service atmosphere"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.12] contrast-[1.06] saturate-[1.08]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,7,4,0.38)_0%,rgba(10,7,4,0.34)_48%,rgba(10,7,4,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(233,184,93,0.24),transparent_40%)]" />

        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-end justify-center px-6 py-16 text-center md:px-8 md:py-20">
          <div className="w-full max-w-4xl px-2 py-4 text-white md:px-6 md:py-6">
            <Reveal>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-[#f9e6a8] md:text-5xl">Social Service Mission</h1>
              <p className={`mt-5 ${MISSION_HERO_SUBTITLE_CLASS} leading-[1.45] !text-[#f7e0a0]`}>
                Spirituality lives in compassion, dignity, and service to humanity.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to={ROUTES.donate}
                  className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full bg-[#E4B45E] px-8 text-base font-bold text-[#fff7df] shadow-[0_18px_34px_rgba(196,109,26,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D08A32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f9e6a8]"
                >
                  Support This Mission
                </Link>
                <Link
                  to={ROUTES.involved.volunteer}
                  className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full border border-[#f7e0a0]/60 bg-black/10 px-8 text-base font-bold text-[#f9e6a8] transition-all duration-300 hover:bg-[#f9e6a8] hover:text-[#33210f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f9e6a8]"
                >
                  Join as Volunteer
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${sectionClass} py-10 md:py-14 lg:py-20`}>
      <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
        <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#A96F1D]`}>{eyebrow}</p>
        <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#1D4F63]`}>{title}</h2>
        {subtitle ? <p className={`mt-4 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function IconImageCircle({
  src,
  alt,
  small = false,
}: {
  src: string;
  alt: string;
  small?: boolean;
}) {
  const size = small ? "h-[84px] w-[84px]" : "h-[104px] w-[104px]";

  return (
    <div className="mb-5 flex justify-center">
      <span
        className={`inline-flex ${size} items-center justify-center overflow-hidden rounded-full border border-[#E8D9C4] bg-[#FFFDF9] shadow-[0_16px_34px_rgba(111,78,25,0.12)]`}
      >
        <img src={src} alt={alt} className="h-full w-full object-contain p-3" loading="lazy" />
      </span>
    </div>
  );
}

function IconImageBadge({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#E8D9C4] bg-[#FFFDF9] shadow-[0_16px_34px_rgba(111,78,25,0.12)]">
      <img src={src} alt={alt} className="h-full w-full object-contain p-3" loading="lazy" />
    </span>
  );
}

function SafeImage({
  src,
  fallbackSrc,
  alt,
  className,
  loading = "eager",
  fetchPriority,
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={(event) => {
        const img = event.currentTarget;
        if (img.dataset.fallbackApplied === "true") return;
        img.dataset.fallbackApplied = "true";
        img.src = fallbackSrc;
      }}
    />
  );
}

function SvgIcon({ children, className = "h-6 w-6" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}

function HeartIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path
        d="M12 20s-7-4.3-9-9.3C1.5 6.9 4.1 4 7.3 4c1.9 0 3.6 1 4.7 2.4C13.1 5 14.8 4 16.7 4c3.2 0 5.8 2.9 4.3 6.7-2 5-9 9.3-9 9.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 9v5M9.5 11.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function ShieldHeartIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path
        d="M12 3.5 19 6.4v6.3c0 4.6-3 7.4-7 8.8-4-1.4-7-4.2-7-8.8V6.4L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.8s-3.2-1.9-4.1-4.1c-.7-1.8.6-3.3 2.4-3.3 1.1 0 2 .6 2.5 1.4.5-.8 1.4-1.4 2.5-1.4 1.8 0 3.1 1.5 2.4 3.3-.9 2.2-4.1 4.1-4.1 4.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function CommunityIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M8 11.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16.8 10.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.8 20c.6-3 2.8-5 5.7-5h1c3 0 5.2 2 5.8 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M14.8 15.3c2.2.3 3.8 1.8 4.2 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function HandHeartIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M4 14.5V11a2 2 0 0 1 2-2h2.2c.6 0 1.2.2 1.7.6l.7.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 14.5l3.6 3.2a3 3 0 0 0 2 .8h4.8a2.4 2.4 0 0 0 2.3-1.8l1-3.9a1.7 1.7 0 0 0-2.5-1.9l-2.7 1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12.2 12.3s-2.6-1.5-3.2-3.2c-.5-1.4.6-2.6 2-2.6.8 0 1.6.4 2 .9.4-.5 1.2-.9 2-.9 1.4 0 2.5 1.2 2 2.6-.6 1.7-3.2 3.2-3.2 3.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function PeopleIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16.7 10.3a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.8 20c.6-3.2 3.1-5.3 6.5-5.3S16.2 16.8 16.8 20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M15.3 15c2 .3 3.6 1.7 3.9 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function LotusIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12 19c-4-1.8-6-4.6-6-8.3 2.8.1 4.9 1.5 6 4.1 1.1-2.6 3.2-4 6-4.1 0 3.7-2 6.5-6 8.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 15c-1.9-2.3-1.9-5.4 0-9.1 1.9 3.7 1.9 6.8 0 9.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function InfinityIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M8.5 15c-2.2 0-4-1.6-4-3.5S6.3 8 8.5 8c1.2 0 2.2.5 3.1 1.5L12 10l.4-.5C13.3 8.5 14.3 8 15.5 8c2.2 0 4 1.6 4 3.5S17.7 15 15.5 15c-1.2 0-2.2-.5-3.1-1.5L12 13l-.4.5C10.7 14.5 9.7 15 8.5 15Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function CompassIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M14.5 9.5 13 13l-3.5 1.5L11 11l3.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function PathIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7 20c0-6.5 10-4.5 10-11.5C17 5.5 15.2 4 13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 7.5c2.1.1 3.8 1.2 5 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="7" cy="7.5" r="1" fill="currentColor" />
      <circle cx="7" cy="20" r="1" fill="currentColor" />
    </SvgIcon>
  );
}

function BowlIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 12.5c.7 4.2 3.6 6.5 7 6.5s6.3-2.3 7-6.5H5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.5 12.5V10a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function MedicalIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8 4h8l2 4v12H6V8l2-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 9v6M9 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function BookStarIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 5.5h6.5c1 0 1.5.5 1.5 1.5V20c0-1-.7-1.7-1.7-1.7H5V5.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M19 5.5h-6.5c-1 0-1.5.5-1.5 1.5V20c0-1 .7-1.7 1.7-1.7H19V5.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 8.2l.7 1.4 1.6.2-1.1 1.1.3 1.6-1.5-.8-1.5.8.3-1.6-1.1-1.1 1.6-.2.7-1.4Z" fill="currentColor" />
    </SvgIcon>
  );
}

function CowIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7 9.5c0-2 1.6-3.5 3.6-3.5h2.8c2 0 3.6 1.5 3.6 3.5v6.8c0 1.8-1.4 3.2-3.2 3.2H10.2C8.4 19.5 7 18.1 7 16.3V9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 6 7.5 4.8M15 6l1.5-1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 12.3h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10.2 15.4c.6.6 1.2.9 1.8.9s1.2-.3 1.8-.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function ReliefIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.2 11.8h5.6M12 9v5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function CareHandsIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7 12.8c1.3-1.7 2.9-2.6 5-2.6s3.7.9 5 2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 15.4c2 3.2 4.8 4.8 8 4.8s6-1.6 8-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.2 9.3c-.8-.9-.8-2 .1-3.2 1.2.9 1.3 2 .5 3.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15.8 9.3c.8-.9.8-2-.1-3.2-1.2.9-1.3 2-.5 3.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function SearchIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16.2 16.2 20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function CheckMapIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9 20 4 18V6l5 2 6-2 5 2v12l-5-2-6 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 8v12M15 6v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m8.5 13.2 1.7 1.7 3.6-3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function PlanIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7 4.5h10a2 2 0 0 1 2 2V20H7a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 9h6M9 12.5h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function LinkIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10.2 13.8 8.7 15.3a3 3 0 0 1-4.2 0 3 3 0 0 1 0-4.2l1.5-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.8 10.2 15.3 8.7a3 3 0 0 1 4.2 0 3 3 0 0 1 0 4.2l-1.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.2 14.8 14.8 9.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function DeliveryIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4 7h11v10H4V7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 10h3l2 2.5V17h-5v-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor" />
    </SvgIcon>
  );
}

function ClipboardIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9 4.8h6l1 1.2H8l1-1.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 6h8v14H8V6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 10h4M10 13.5h4M10 17h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function MegaphoneIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 12v-2.2c0-.5.3-.9.8-1l9.2-3.3v13l-9.2-3.3c-.5-.1-.8-.6-.8-1V12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 9h3.2c.4 0 .8.3.8.8v4.4c0 .4-.3.8-.8.8H15" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 15.6 9 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function RefreshIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 5v4h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function VolunteerIcon(props: IconProps) {
  return <PeopleIcon {...props} />;
}

function SponsorIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3.5v17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 7.5h6a3 3 0 0 1 0 6H9.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 17h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function BoxIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 8l8 4.5L20 8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 12.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  );
}

function PartnerIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7 12.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17 11.2a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 20c.6-3.1 3-5.1 6.3-5.1S15.5 16.9 16 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14.7 15.3c2 .3 3.5 1.7 3.8 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10.5 14.2l1.5 1.6 3.2-3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

// Legacy inline SVG icons are kept for reuse elsewhere, but this page now uses Cloudinary icons.
// Reference them here so TypeScript doesn't flag them as unused locals.
const _LEGACY_SVG_ICONS = {
  SvgIcon,
  HeartIcon,
  ShieldHeartIcon,
  CommunityIcon,
  HandHeartIcon,
  PeopleIcon,
  LotusIcon,
  InfinityIcon,
  CompassIcon,
  PathIcon,
  BowlIcon,
  MedicalIcon,
  BookStarIcon,
  CowIcon,
  ReliefIcon,
  CareHandsIcon,
  SearchIcon,
  CheckMapIcon,
  PlanIcon,
  LinkIcon,
  DeliveryIcon,
  ClipboardIcon,
  MegaphoneIcon,
  RefreshIcon,
  VolunteerIcon,
  SponsorIcon,
  BoxIcon,
  PartnerIcon,
} as const;

void _LEGACY_SVG_ICONS;
