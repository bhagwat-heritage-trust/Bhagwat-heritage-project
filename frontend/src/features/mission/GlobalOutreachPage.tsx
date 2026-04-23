import { memo, type ComponentType, type ReactNode } from "react";
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

const IMAGE = {
  hero: "https://res.cloudinary.com/der8zinu8/image/upload/v1774714133/globleoutreach_bs55yu.png",
  // Placeholders are real and safe; swap when dedicated assets are ready.
  matters: "https://res.cloudinary.com/der8zinu8/image/upload/v1776933958/ChatGPT_Image_Apr_23_2026_02_14_48_PM_mol7ro.png",
  programs1: "https://res.cloudinary.com/der8zinu8/image/upload/v1776971376/ChatGPT_Image_Apr_24_2026_12_38_02_AM_juuuyq.png",
  programs2: "https://res.cloudinary.com/der8zinu8/image/upload/v1776971375/ChatGPT_Image_Apr_24_2026_12_37_40_AM_wl1be1.png",
  programs3: "https://res.cloudinary.com/der8zinu8/image/upload/v1776971376/ChatGPT_Image_Apr_24_2026_12_37_49_AM_e2xugl.png",
  cta: "https://res.cloudinary.com/der8zinu8/image/upload/v1774714133/globleoutreach_bs55yu.png",
  // Global Outreach icon set (provided by user)
  pillar1: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967404/g1_pigiqf.png",
  pillar2: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967403/g12_jtim6v.png",
  pillar3: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967404/g2_mi705n.png",
  pillar4: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967403/g3_ugmfqm.png",
  participate1: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967402/g4_uqieed.png",
  participate2: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967402/g5_ilegzw.png",
  participate3: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g6_sxiq7h.png",
  participate4: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g7_kplr1h.png",
  support1: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967400/g8_cw3tcs.png",
  support2: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g9_vdlu1r.png",
  support3: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g10_db02lr.png",
  support4: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g11_rjbuul.png",
} as const;

const FALLBACK = {
  hero: IMAGE.hero,
  matters: "/images/bhagwatstudy.jpg",
  programs1: "/images/bhagwatstudy.jpg",
  programs2: "/images/kathaimage.webp",
  programs3: "/images/upcommigevents.jpg",
  cta: "/images/hanuman-banner-02.jpg",
} as const;

const sectionClass = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
const sectionPad = "py-10 md:py-14 lg:py-20";

const TRUST_STRIP = [
  { label: "Spiritual", image: IMAGE.support1 },
  { label: "Cultural", image: IMAGE.pillar2 },
  { label: "Educational", image: IMAGE.pillar4 },
  { label: "Global Service", image: IMAGE.pillar1 },
] as const;

const OVERVIEW_STRIP = [
  {
    title: "Mission Pillars",
    description: "Four pillars guiding global satsang, culture, seva, and youth continuity.",
    image: IMAGE.pillar1,
  },
  {
    title: "Expansion Phases",
    description: "A phased roadmap to grow responsibly through chapters and partnerships.",
    image: IMAGE.support3,
  },
  {
    title: "Target Reach",
    description: "Families and seekers across borders through trusted access points.",
    image: IMAGE.participate1,
  },
  {
    title: "Digital Presence",
    description: "Satsang and learning access that stays continuous across time zones.",
    image: IMAGE.participate4,
  },
] as const;

const MATTERS_BULLETS = [
  "Preserve dharmic identity across generations",
  "Build accessible satsang beyond geography",
  "Support families, youth and seekers abroad",
  "Connect devotion with service and education",
] as const;

const PILLARS = [
  {
    title: "Global Satsang Access",
    description: "Satsang circles, katha streams, and guided study that reach devotees across time zones and continents.",
    image: IMAGE.pillar1,
  },
  {
    title: "Cultural Preservation",
    description: "Festival continuity, family values, and devotional traditions that keep heritage living abroad.",
    image: IMAGE.pillar2,
  },
  {
    title: "Cross-Border Seva",
    description: "Service partnerships that combine compassion, discipline, and practical help across regions.",
    image: IMAGE.pillar3,
  },
  {
    title: "Youth Continuity",
    description: "Learning tracks and identity support so children and youth stay rooted, confident, and connected.",
    image: IMAGE.pillar4,
  },
] as const;

const MODEL_BLOCKS = [
  {
    title: "Global Need",
    image: IMAGE.support2,
    points: [
      "Diaspora families seek consistent spiritual grounding",
      "Youth need identity-building learning and culture",
      "Seekers need accessible satsang beyond geography",
    ],
  },
  {
    title: "Response Framework",
    image: IMAGE.participate1,
    points: [
      "Local chapters for satsang, festivals, and values",
      "Digital satsang and multilingual learning resources",
      "Seva collaborations with aligned institutions",
    ],
  },
  {
    title: "Intended Impact",
    image: IMAGE.support4,
    points: [
      "Stronger family continuity and dharmic identity",
      "A living global network of satsang and seva",
      "Youth leadership rooted in devotion and values",
    ],
  },
] as const;

const PHASES = [
  {
    label: "Phase 1",
    title: "Digital Foundation",
    description: "Satsang streams, learning library, and multilingual access for global audiences.",
    image: IMAGE.participate4,
  },
  {
    label: "Phase 2",
    title: "Community Anchors",
    description: "Local chapters for satsang circles, festivals, family programs, and guidance.",
    image: IMAGE.participate1,
  },
  {
    label: "Phase 3",
    title: "Partnership-Led Seva",
    description: "Aligned collaborations for service drives and compassionate outreach abroad.",
    image: IMAGE.participate3,
  },
  {
    label: "Phase 4",
    title: "Global Learning Ecosystem",
    description: "Structured youth learning tracks and global mentorship networks.",
    image: IMAGE.support1,
  },
] as const;

const PROGRAMS = [
  {
    title: "Online Satsang Circles",
    description: "Regular satsang gatherings across time zones, supported by guided learning and continuity.",
    image: IMAGE.programs1,
    fallback: FALLBACK.programs1,
    href: ROUTES.digital.satsang,
  },
  {
    title: "Family Culture Programs",
    description: "Festival observances, family values sessions, and devotional cultural continuity for households.",
    image: IMAGE.programs2,
    fallback: FALLBACK.programs2,
    href: ROUTES.eventsKatha.spiritualEvents,
  },
  {
    title: "Youth Learning Tracks",
    description: "Values-based learning paths that strengthen identity, devotion, and confident leadership.",
    image: IMAGE.programs3,
    fallback: FALLBACK.programs3,
    href: ROUTES.knowledge.studyResources,
  },
] as const;

const PARTICIPATE = [
  {
    title: "Start a Local Chapter",
    description: "Bring satsang and cultural continuity to your region with guidance and structure.",
    cta: "Start a Chapter",
    href: ROUTES.contact,
    image: IMAGE.participate1,
  },
  {
    title: "Become a Volunteer",
    description: "Offer time and skills to support programs, content, and community outreach.",
    cta: "Join as Volunteer",
    href: ROUTES.involved.volunteer,
    image: IMAGE.participate2,
  },
  {
    title: "Partner as an Institution",
    description: "Collaborate with aligned organizations for satsang, seva, and learning initiatives.",
    cta: "Partner Globally",
    href: ROUTES.involved.partner,
    image: IMAGE.participate3,
  },
  {
    title: "Support Digital Outreach",
    description: "Help strengthen tools, translations, and access for global satsang and learning.",
    cta: "Support Outreach",
    href: ROUTES.donate,
    image: IMAGE.participate4,
  },
] as const;

const SUPPORT_ICONS = [
  {
    title: "Spiritual Learning",
    description: "Guided study and resources that keep seekers anchored in scripture and wisdom.",
    image: IMAGE.support1,
  },
  {
    title: "Community Connection",
    description: "Satsang circles and local anchors that create belonging and continuity.",
    image: IMAGE.support2,
  },
  {
    title: "Growth & Development",
    description: "Programs that help youth and families grow with values-based structure.",
    image: IMAGE.support3,
  },
  {
    title: "Global Harmony",
    description: "A devotional network that brings cultures together through service and satsang.",
    image: IMAGE.support4,
  },
] as const;

export default memo(function GlobalOutreachPage() {
  usePageMeta(
    "Global Outreach Vision | Bhagwat Heritage",
    "Explore Bhagwat Heritage’s global outreach vision to connect spiritual learning, satsang, culture and seva across borders through digital and community-led initiatives.",
  );

  return (
    <main className="global-outreach-page -mt-12 min-h-screen overflow-hidden bg-[#F7F1E7] text-[#6B5A48]">
      <Hero />

      <section className={`${sectionClass} -mt-12 pb-8 md:-mt-14`}>
        <div className="rounded-[30px] border border-[#E8D9C4] bg-[#FFFDF9]/92 p-4 shadow-[0_22px_54px_rgba(111,78,25,0.12)] backdrop-blur md:p-5">
          <Reveal>
            <div className="px-2 pb-5 pt-2 text-center md:px-4">
              <p className="inline-flex rounded-full border border-[#E8D9C4] bg-[#FFF8EC] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#A96F1D]">
                Global Vision
              </p>
              <p className={`mx-auto mt-4 max-w-3xl ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>
                Connecting seekers, families, youth, and communities through satsang, seva, culture, and digital learning across
                borders.
              </p>
              <div className="mx-auto mt-5 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {TRUST_STRIP.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-center gap-2 rounded-full border border-[#E8D9C4] bg-white px-4 py-3 text-sm font-black text-[#1D4F63]"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[#E8D9C4] bg-[#FFFDF9] shadow-[0_10px_20px_rgba(111,78,25,0.08)]">
                      <img
                        src={item.image}
                        alt={`${item.label} icon`}
                        className="h-full w-full object-contain p-1.5"
                        loading="lazy"
                      />
                    </span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {OVERVIEW_STRIP.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.03}>
                <div className="rounded-[22px] border border-[#E8D9C4] bg-white px-5 py-6 text-center transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(111,78,25,0.12)]">
                  <IconImageBubble src={item.image} alt={`${item.title} icon`} />
                  <p className={`mt-4 ${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{item.title}</p>
                  <p className={`mt-2 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section
        id="matters"
        eyebrow="Why It Matters"
        title="Why global outreach matters"
        subtitle="A global vision that preserves dharmic identity, strengthens families, and carries satsang and seva beyond borders."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-stretch">
          <Reveal>
            <article className="sacred-card p-6 md:p-8">
              <p className={`${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>
                As families move across nations, spiritual continuity becomes harder to maintain. Our global outreach vision
                ensures seekers and households remain connected to satsang, values, and devotional culture—without losing the
                warmth of community.
              </p>
              <p className={`mt-4 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>
                It supports youth continuity through learning, builds devotional identity across nations, and connects
                devotion with service and education through trusted digital and local networks.
              </p>

              <ul className="mt-6 space-y-3">
                {MATTERS_BULLETS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-[16px] border border-[#E8D9C4] bg-[#FFF8EC] px-4 py-3"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D89B2B]" aria-hidden="true" />
                    <span className={`text-[15px] font-semibold leading-[1.7] text-[#6B5A48]`}>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="sacred-card overflow-hidden p-0">
              <SafeImage
                src={IMAGE.matters}
                fallbackSrc={FALLBACK.matters}
                alt="Global spiritual outreach network illustration showing connected communities"
                className="h-[320px] w-full object-cover sm:h-[380px] lg:h-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="pillars"
        eyebrow="Four Mission Pillars"
        title="Four pillars behind the global vision"
        subtitle="A clean, balanced structure that keeps the mission spiritual, cultural, educational, and service-led."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {PILLARS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.03}>
              <article className={`sacred-card group h-full p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(111,78,25,0.14)]`}>
                <div className={`rounded-[22px] border border-[#E8D9C4] bg-[linear-gradient(145deg,#FFFDF9,rgba(255,248,236,0.85))] p-5`}>
                  <IconImageBubble src={item.image} alt={`${item.title} icon`} />
                  <h3 className={`${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{item.title}</h3>
                  <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="model"
        eyebrow="Mission Explorer"
        title="A global outreach model that stays devotional and practical"
        subtitle="Three clear blocks to understand the need, the response, and the long-term impact."
      >
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {MODEL_BLOCKS.map((block, index) => (
            <Reveal key={block.title} delay={index * 0.03}>
              <article className="sacred-card h-full p-6 md:p-7">
                <div className="flex flex-col items-center gap-3 text-center">
                  <IconImageBadge src={block.image} alt={`${block.title} icon`} />
                  <span className="rounded-full border border-[#E8D9C4] bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#A96F1D]">
                    {index === 0 ? "Need" : index === 1 ? "Framework" : "Impact"}
                  </span>
                </div>
                <h3 className={`mt-5 ${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{block.title}</h3>
                <ul className="mt-5 space-y-3">
                  {block.points.map((point) => (
                    <li key={point} className="flex gap-3 rounded-[16px] border border-[#E8D9C4] bg-[#FFF8EC] px-4 py-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D89B2B]" aria-hidden="true" />
                      <span className={`text-[15px] font-semibold leading-[1.7] text-[#6B5A48]`}>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="roadmap"
        eyebrow="Expansion Path"
        title="A refined roadmap for global continuity"
        subtitle="Four phases that build from digital foundation to a sustainable learning ecosystem."
      >
        <div className="relative">
          <div className="hidden xl:block absolute left-0 right-0 top-[52px] h-px bg-[#E8D9C4]" aria-hidden="true" />
          <div className="grid gap-4 xl:grid-cols-4 lg:gap-6">
            {PHASES.map((phase, index) => (
              <Reveal key={phase.title} delay={index * 0.03}>
                <article className="sacred-card relative h-full p-6 md:p-7">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <IconImageBadge src={phase.image} alt={`${phase.title} icon`} small />
                    <span className="rounded-full border border-[#E8D9C4] bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#A96F1D]">
                      {phase.label}
                    </span>
                  </div>
                  <h3 className={`mt-5 ${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{phase.title}</h3>
                  <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{phase.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="programs"
        eyebrow="Our Program"
        title="Featured programs that carry the vision"
        subtitle="Practical, repeatable programs designed to scale with care and consistency."
      >
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {PROGRAMS.map((program, index) => (
            <Reveal key={program.title} delay={index * 0.03}>
              <article className="sacred-card group flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(111,78,25,0.14)]">
                <div className="relative">
                  <SafeImage
                    src={program.image}
                    fallbackSrc={program.fallback}
                    alt={`${program.title} visual`}
                    className="h-[190px] w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.0)_0%,rgba(0,0,0,0.22)_100%)]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className={`${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{program.title}</h3>
                  <p className={`mt-3 flex-1 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{program.description}</p>
                  <Link
                    to={program.href}
                    className="mt-5 inline-flex w-fit items-center rounded-full text-sm font-black text-[#A96F1D] transition hover:text-[#1D4F63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D89B2B]"
                  >
                    Learn More
                    <span aria-hidden="true" className="ml-2 transition group-hover:translate-x-1">-&gt;</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="participate"
        eyebrow="Ways to Participate"
        title="Ways to participate and build the vision"
        subtitle="Clear actions that make outreach practical, collaborative, and sustained."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {PARTICIPATE.map((action, index) => (
            <Reveal key={action.title} delay={index * 0.03}>
              <article className="sacred-card group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(111,78,25,0.14)]">
                <IconImageBubble src={action.image} alt={`${action.title} icon`} small />
                <h3 className={`mt-5 ${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{action.title}</h3>
                <p className={`mt-3 flex-1 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{action.description}</p>
                <Link
                  to={action.href}
                  className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#1D4F63] px-5 text-sm font-black text-white shadow-[0_14px_28px_rgba(29,79,99,0.18)] transition hover:-translate-y-0.5 hover:bg-[#143847] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4F63]"
                >
                  {action.cta}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="support-icons"
        eyebrow="Additional Support"
        title="Support icons that reflect the vision"
        subtitle="A compact view of the learning, connection, growth, and harmony this mission is designed to carry."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {SUPPORT_ICONS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.03}>
              <article className="sacred-card group flex h-full flex-col p-6 text-center transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(111,78,25,0.14)]">
                <IconImageBubble src={item.image} alt={`${item.title} icon`} />
                <h3 className={`mt-5 ${MISSION_CARD_TITLE_CLASS} text-[#1D4F63]`}>{item.title}</h3>
                <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS} text-[#6B5A48]`}>{item.description}</p>
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
                Build a global devotional and service-led network
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-[1.75] text-[#6B5A48] md:text-[18px]">
                Join this vision to carry satsang, culture, seva and spiritual learning across borders.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#participate"
                  className="inline-flex min-h-[56px] min-w-[220px] items-center justify-center rounded-full bg-[#2C2116] px-8 text-base font-black text-white shadow-[0_18px_34px_rgba(44,33,22,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f160e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2C2116]"
                >
                  Join the Global Mission
                </a>
                <Link
                  to={ROUTES.donate}
                  className="inline-flex min-h-[56px] min-w-[220px] items-center justify-center rounded-full border border-[#E8D9C4] bg-white/90 px-8 text-base font-black text-[#A96F1D] shadow-[0_18px_34px_rgba(255,255,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#1D4F63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Support Global Outreach
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

      <div className="inner-hero relative min-h-[680px] overflow-hidden rounded-b-[44px] bg-cover bg-center shadow-[0_18px_40px_rgba(23,12,5,0.14)]">
        <SafeImage
          src={IMAGE.hero}
          fallbackSrc={FALLBACK.hero}
          alt="Global outreach vision visual showing spiritual radiance and worldwide connection"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.12] contrast-[1.06] saturate-[1.08]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,7,4,0.42)_0%,rgba(10,7,4,0.36)_48%,rgba(10,7,4,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_84%,rgba(233,184,93,0.22),transparent_40%)]" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-6xl items-center justify-center px-6 py-16 text-center md:px-8 md:py-20">
          <div className="w-full max-w-[720px] px-2 py-4 text-white md:px-6 md:py-6">
            <Reveal>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-[#f9e6a8] md:text-5xl">
                Global Outreach Vision
              </h1>
              <p className={`mt-5 ${MISSION_HERO_SUBTITLE_CLASS} leading-[1.45] !text-[#f7e0a0]`}>
                Serving globally, rooted spiritually
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="#pillars"
                  className="inline-flex min-h-[56px] min-w-[220px] items-center justify-center rounded-full bg-[#E4B45E] px-8 text-base font-bold text-[#fff7df] shadow-[0_18px_34px_rgba(196,109,26,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D08A32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f9e6a8]"
                >
                  Explore Global Mission
                </a>
                <Link
                  to={ROUTES.involved.partner}
                  className="inline-flex min-h-[56px] min-w-[220px] items-center justify-center rounded-full bg-[#1D4F63] px-8 text-base font-bold text-white shadow-[0_18px_34px_rgba(29,79,99,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#143847] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4F63]"
                >
                  Partner Globally
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
    <section id={id} className={`${sectionClass} ${sectionPad}`}>
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

function IconBubble({
  icon: Icon,
  small = false,
}: {
  icon: ComponentType<IconProps>;
  small?: boolean;
}) {
  const size = small ? "h-12 w-12" : "h-14 w-14";
  const iconSize = small ? "h-6 w-6" : "h-7 w-7";

  return (
    <span
      className={`inline-flex ${size} items-center justify-center rounded-2xl border border-[#E8D9C4] bg-[#FFF8EC] text-[#D89B2B] shadow-[0_14px_30px_rgba(111,78,25,0.10)]`}
    >
      <Icon className={iconSize} />
    </span>
  );
}

function IconImageBubble({
  src,
  alt,
  small = false,
  align = "center",
}: {
  src: string;
  alt: string;
  small?: boolean;
  align?: "left" | "center";
}) {
  const size = small ? "h-[88px] w-[88px]" : "h-[104px] w-[104px]";
  const wrapperClassName = align === "left" ? "mb-5" : "mb-5 flex justify-center";

  return (
    <div className={wrapperClassName}>
      <span
        className={`inline-flex ${size} items-center justify-center overflow-hidden rounded-full border border-[#E8D9C4] bg-[#FFFDF9] shadow-[0_16px_34px_rgba(111,78,25,0.12)]`}
      >
        <img src={src} alt={alt} className="h-full w-full object-contain p-3" loading="lazy" />
      </span>
    </div>
  );
}

function IconImageBadge({ src, alt, small = false }: { src: string; alt: string; small?: boolean }) {
  const size = small ? "h-16 w-16" : "h-20 w-20";
  return (
    <span
      className={`inline-flex ${size} items-center justify-center overflow-hidden rounded-full border border-[#E8D9C4] bg-[#FFFDF9] shadow-[0_16px_34px_rgba(111,78,25,0.12)]`}
    >
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

function DiyaIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 13.5c1.2 4 4 6 7 6s5.8-2 7-6H5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 13.4c-1.5-1.6-1.5-3.4.2-5.4 2 1.7 2.3 3.6.7 5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 16.5h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </SvgIcon>
  );
}

function TempleIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4 9.2 12 4l8 5.2H4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8M4.5 20h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </SvgIcon>
  );
}

function BookIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 5.8C5 4.8 5.8 4 6.8 4H20v14.5H7.2C6 18.5 5 19.5 5 20.7V5.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M5 20.7C5 19.5 6 18.5 7.2 18.5H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 8h7M9 11.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </SvgIcon>
  );
}

function GlobeLightIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 4c2.1 2.2 3.1 4.9 3.1 8s-1 5.8-3.1 8c-2.1-2.2-3.1-4.9-3.1-8s1-5.8 3.1-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 2.2v1.6M12 20.2v1.6M2.2 12h1.6M20.2 12h1.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
    </SvgIcon>
  );
}

function CompassIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14.5 9.5 13 13l-3.5 1.5L11 11l3.5-1.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function TimelineIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7 6h10M7 12h7M7 18h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5 6h.01M5 12h.01M5 18h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </SvgIcon>
  );
}

function NetworkIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 12h6.8M14.2 8.1 8.4 11M14.2 15.9 8.4 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </SvgIcon>
  );
}

function DeviceLiveIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6 7.2A2.2 2.2 0 0 1 8.2 5h7.6A2.2 2.2 0 0 1 18 7.2v9.6A2.2 2.2 0 0 1 15.8 19H8.2A2.2 2.2 0 0 1 6 16.8V7.2Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10.5 10.2 14 12l-3.5 1.8v-3.6Z" fill="currentColor" opacity="0.85" />
    </SvgIcon>
  );
}

function HeritageIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6 19c5.6-8.6 10.4-8.6 12 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5 10.5c3.4-1.1 5.7-2.8 7-5.3 1.3 2.5 3.6 4.2 7 5.3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 3.8V5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </SvgIcon>
  );
}

function HelpingHandsIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4.5 14.2v-3.4A2 2 0 0 1 6.5 9h2.2c.6 0 1.2.2 1.7.6l.7.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4.5 14.2l3.6 3.1a3.1 3.1 0 0 0 2 .7h4.7a2.5 2.5 0 0 0 2.4-1.8l1-3.8a1.7 1.7 0 0 0-2.5-1.9l-2.7 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12.2 12.3s-2.6-1.5-3.2-3.2c-.5-1.4.6-2.6 2-2.6.8 0 1.6.4 2 .9.4-.5 1.2-.9 2-.9 1.4 0 2.5 1.2 2 2.6-.6 1.7-3.2 3.2-3.2 3.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function YouthIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 20c.7-3.2 3.1-5.3 6.5-5.3S17.8 16.8 18.5 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16.8 6.4 19 4.2M19 6.4 16.8 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </SvgIcon>
  );
}

function MapPulseIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9 20 4 18V6l5 2 6-2 5 2v12l-5-2-6 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 8v12M15 6v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8.2 14.2h2.1l.9-2.2 1.3 4 1-2.3h2.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function FrameworkIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 5h6v6H5V5ZM13 5h6v6h-6V5ZM5 13h6v6H5v-6ZM13 13h6v6h-6v-6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function SparkIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3l1.2 4.2L17.5 8.5l-4.3 1.3L12 14l-1.2-4.2-4.3-1.3 4.3-1.3L12 3Z" fill="currentColor" opacity="0.9" />
      <path d="M5 14l.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2ZM18.5 14.2l.5 1.6 1.6.5-1.6.5-.5 1.6-.5-1.6-1.6-.5 1.6-.5.5-1.6Z" fill="currentColor" opacity="0.55" />
    </SvgIcon>
  );
}

function ChapterIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M7 6.2A2.2 2.2 0 0 1 9.2 4h9.3v14.2H9.2A2.2 2.2 0 0 0 7 20.4V6.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M7 20.4c0-1.2 1-2.2 2.2-2.2h9.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M10 8h5M10 11.5h6M10 15h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </SvgIcon>
  );
}

function HandshakeIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8 13.4 6 11.6a2.4 2.4 0 0 1 0-3.5l1.2-1.2c.8-.8 2-.9 3-.2l1.1.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16 13.4l2-1.8a2.4 2.4 0 0 0 0-3.5l-1.2-1.2c-.8-.8-2-.9-3-.2l-1.1.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.2 12.2 12 9.5l2.8 2.7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9.6 15.8 12 18l2.4-2.2" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10.6 14.9 12 16.2l1.4-1.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function VolunteerIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 20c.7-3.2 3.1-5.3 6.5-5.3S17.8 16.8 18.5 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.2 14.4 12 16.5l2.8-2.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}
