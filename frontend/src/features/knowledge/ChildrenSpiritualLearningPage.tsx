import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { MISSION_BODY_TEXT_CLASS, MISSION_SECTION_HEADING_CLASS, MISSION_SECTION_LABEL_CLASS } from "../mission/missionTypography";

type TrackCategory = "All" | "Bal Sanskar" | "Primary" | "Teens" | "Family";

const IMAGE_BASE = "/images/children-spiritual-learning/";
const HERO_IMAGE_URL =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777092273/ChatGPT_Image_Apr_25_2026_10_13_25_AM_szutyv.png";

const summaryCards = [
  {
    title: "Age Tracks",
    text: "Bal Sanskar, Primary, Teens, Family",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1772915579/children_hrarip.jpg",
  },
  {
    title: "Learning Style",
    text: "Story, prayer, action, repetition",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/4_x9oa5q.png",
  },
  {
    title: "Family Role",
    text: "Parents as daily sanskar anchors",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776884758/people_vrssxt.png",
  },
  {
    title: "Weekly Rhythm",
    text: "Simple habits for steady growth",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776884758/diya_otz5hd.png",
  },
];

const aboutCards = [
  {
    title: "Story-Led Value Learning",
    text: "Children learn values naturally through dharmic stories, examples, songs, and guided discussion.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029120/ChatGPT_Image_Apr_24_2026_04_38_51_PM_nywxnm.png",
  },
  {
    title: "Family Participation Model",
    text: "Parents become part of the learning journey so sanskar continues at home and not only during class.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776884758/people_vrssxt.png",
  },
  {
    title: "Age-Appropriate Growth",
    text: "Separate tracks are planned for early years, school-age learners, and teens so guidance stays practical and relevant.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/7_leuo8e.png",
  },
];

const learningTracks = [
  {
    title: "Early Bal Sanskar Foundation",
    category: "Bal Sanskar" as const,
    text: "Simple prayers, moral habits, greeting culture, and joyful devotional exposure for young children.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097561/ChatGPT_Image_Apr_25_2026_11_41_50_AM_j26e04.png",
  },
  {
    title: "Primary Spiritual Learning Track",
    category: "Primary" as const,
    text: "Age-friendly katha stories, memory verses, value-building games, and temple culture understanding.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_41_57_AM_wsv00f.png",
  },
  {
    title: "Youth Transition and Character Track",
    category: "Teens" as const,
    text: "Dharmic decision-making, discipline, seva responsibility, confidence, and guided spiritual discussion.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097561/ChatGPT_Image_Apr_25_2026_11_42_05_AM_bij6a0.png",
  },
  {
    title: "Family Satsang Participation Track",
    category: "Family" as const,
    text: "Home-based parent-child learning activities that strengthen shared spiritual habits and respectful conduct.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_42_11_AM_epskzo.png",
  },
];

const corePrograms = [
  {
    icon: "icon-bal-sanskar-class.svg",
    title: "Bal Sanskar Classes",
    text: "Regular learning sessions for prayer, values, stories, and daily conduct.",
  },
  {
    icon: "icon-story-shloka.svg",
    title: "Story & Shloka Learning",
    text: "Simple Sanskrit shlokas, devotional songs, and inspiring dharmic stories.",
  },
  {
    icon: "icon-family-satsang.svg",
    title: "Parent-Guided Home Satsang",
    text: "Weekly home routine for parents and children to learn together.",
  },
  {
    icon: "icon-festival-learning.svg",
    title: "Festival Learning",
    text: "Understanding festivals through meaning, worship, family activity, and seva.",
  },
  {
    icon: "icon-value-activity.svg",
    title: "Value Activity Cards",
    text: "Small weekly actions for gratitude, respect, truthfulness, discipline, and compassion.",
  },
  {
    icon: "icon-child-mentor.svg",
    title: "Mentor Support",
    text: "Guidance for parents and children through trained mentors and Pathshala support.",
  },
];

const weeklyRoutine = [
  {
    icon: "icon-prayer-start.svg",
    title: "Prayer Start",
    text: "Begin with a short prayer, folded hands, and a calm one-minute devotional focus.",
  },
  {
    icon: "icon-story-time.svg",
    title: "Story Time",
    text: "Read or narrate one dharmic story that teaches truth, compassion, respect, or seva.",
  },
  {
    icon: "icon-practice-action.svg",
    title: "Practice Action",
    text: "Choose one small value-based action for the child to practice during the day or week.",
  },
  {
    icon: "icon-family-reflection.svg",
    title: "Family Reflection",
    text: "End with one gratitude thought and a simple parent-child discussion about what was learned.",
  },
];

const parentRoles = [
  "Be the Example",
  "Keep the Routine Simple",
  "Encourage Questions",
  "Celebrate Small Progress",
];

const resourceCards = [
  {
    cmsKey: "weekly-prayer-sheet",
    title: "Weekly Prayer Sheet",
    type: "PDF",
    href: ROUTES.knowledge.library,
    button: "Download",
  },
  {
    cmsKey: "story-activity-card",
    title: "Story Activity Card",
    type: "Activity",
    href: ROUTES.knowledge.library,
    button: "Open",
  },
  {
    cmsKey: "parent-guidance-note",
    title: "Parent Guidance Note",
    type: "Guide",
    href: ROUTES.knowledge.studyResources,
    button: "Read",
  },
  {
    cmsKey: "festival-learning-sheet",
    title: "Festival Learning Sheet",
    type: "Worksheet",
    href: ROUTES.knowledge.library,
    button: "Explore",
  },
];

const galleryItems = [
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777095484/ChatGPT_Image_Apr_25_2026_11_06_56_AM_cp8h2y.png",
    title: "Prayer Session",
    caption: "Children begin with folded hands, calm focus, and simple daily prayer.",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777095484/ChatGPT_Image_Apr_25_2026_11_06_49_AM_bsq4pk.png",
    title: "Family Satsang",
    caption: "Parents and children learn together through shared home devotion.",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777095484/ChatGPT_Image_Apr_25_2026_11_07_30_AM_z1fbir.png",
    title: "Story Learning",
    caption: "Dharmic stories help children understand values with joy and clarity.",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777095484/ChatGPT_Image_Apr_25_2026_11_06_39_AM_roidym.png",
    title: "Activity Cards",
    caption: "Small weekly practices make sanskar visible in everyday conduct.",
  },
];

const tabs: TrackCategory[] = ["All", "Bal Sanskar", "Primary", "Teens", "Family"];

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
  "rounded-[20px] border border-[#E8D9C4] bg-[#FFFDF8]/95 p-6 shadow-[0_18px_42px_rgba(101,71,35,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(101,71,35,0.15)]";
const trackIconClass =
  "mx-auto h-[86px] w-[86px] shrink-0 rounded-full border border-[#E7A845] bg-[#FFF8EC] object-contain p-1.5 shadow-[0_12px_26px_rgba(101,71,35,0.14)]";
const heroButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-black text-[#073763] shadow-[0_14px_30px_rgba(18,29,43,0.22)] transition hover:-translate-y-0.5 hover:bg-[#FFF8EC]";
const heroButtonOutlineClass =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-[#FFF8EC]/80 bg-[#FFF8EC]/10 px-7 py-3 text-sm font-black !text-[#FFF8EC] backdrop-blur shadow-[0_14px_30px_rgba(18,29,43,0.18)] transition hover:-translate-y-0.5 hover:bg-[#FFF8EC] hover:!text-[#073763]";

export default memo(function ChildrenSpiritualLearningPage() {
  const [activeTrack, setActiveTrack] = useState<TrackCategory>("All");

  usePageMeta(
    "Children Spiritual Learning | Bal Sanskar",
    "Children Spiritual Learning by Bhagwat Heritage guides families through Bal Sanskar, prayer, stories, values, family satsang, and age-wise spiritual learning tracks.",
  );

  const visibleTracks = useMemo(
    () => (activeTrack === "All" ? learningTracks : learningTracks.filter((track) => track.category === activeTrack)),
    [activeTrack],
  );

  return (
    <div className="relative isolate -mx-6 -my-12 overflow-hidden bg-[#FFF8EC] text-[#2B2118]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55] [background-image:radial-gradient(circle_at_12%_10%,rgba(244,164,60,0.17),transparent_28rem),radial-gradient(circle_at_86%_22%,rgba(157,215,199,0.34),transparent_24rem),radial-gradient(circle_at_18%_84%,rgba(217,154,43,0.12),transparent_22rem)]"
      />

      <section className="relative mx-auto w-full max-w-[1180px] px-4 pb-8 pt-0 sm:px-6 md:pb-12">
        <div className="relative min-h-[430px] overflow-hidden rounded-b-[32px] border border-t-0 border-[#E8D9C4] bg-[#FFFDF8] shadow-[0_26px_70px_rgba(101,71,35,0.13)] sm:min-h-[520px] lg:min-h-[620px]">
          <img
            src={HERO_IMAGE_URL}
            alt="Children learning together in a spiritual education setting"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,55,99,0.12),rgba(255,248,236,0.03)_42%,rgba(7,55,99,0.76))]" />
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-5 pb-3 text-center sm:pb-4 md:pb-5">
            <div className="mx-auto max-w-4xl">
              <h1 className="hero-title mb-3 text-4xl font-bold leading-tight !text-[#FFF8EC] drop-shadow-[0_3px_14px_rgba(0,0,0,0.28)] md:text-5xl">
                Bal Sanskar
              </h1>
              <p className="hero-subtitle mx-auto max-w-2xl text-lg text-[#FFECCB] drop-shadow-[0_2px_10px_rgba(0,0,0,0.24)] md:text-xl">
                Building character through culture and care
              </p>
              <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link to={ROUTES.knowledge.pathshala} className={heroButtonClass}>
                  Join Bal Sanskar Path
                </Link>
                <Link to={ROUTES.contact} className={heroButtonOutlineClass}>
                  Connect With Mentor
                </Link>
                <Link to={ROUTES.knowledge.library} className={heroButtonOutlineClass}>
                  Download Weekly Routine
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <article
              key={card.title}
              className="flex min-h-[220px] flex-col items-center justify-center rounded-[20px] border border-[#E8D9C4] bg-white/88 px-5 py-7 text-center shadow-[0_14px_34px_rgba(101,71,35,0.08)]"
            >
              <img
                src={card.icon}
                alt=""
                aria-hidden="true"
                className="h-20 w-20 shrink-0 rounded-full border border-[#E7A845] bg-[#FFF8EC] object-cover p-1 shadow-[0_12px_26px_rgba(101,71,35,0.14)]"
                loading="lazy"
              />
              <h2 className={`mt-5 ${cardTitleClass}`}>
                {card.title}
              </h2>
              <p className={`mx-auto mt-3 max-w-xs ${cardTextClass}`}>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={labelClass}>About Children Spiritual Learning</p>
          <h2 className={headingClass}>Purpose of Bal Sanskar Education</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {aboutCards.map((card) => (
            <article key={card.title} className={`${cardClass} flex min-h-[250px] flex-col items-center justify-center text-center`}>
              <img
                src={card.icon}
                alt=""
                aria-hidden="true"
                className="h-20 w-20 shrink-0 rounded-full border border-[#E7A845] bg-[#FFF8EC] object-cover p-1 shadow-[0_12px_26px_rgba(101,71,35,0.14)]"
                loading="lazy"
              />
              <h3 className={`mt-5 ${cardTitleClass}`}>
                {card.title}
              </h3>
              <p className={`mx-auto mt-3 max-w-sm ${cardTextClass}`}>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="rounded-[30px] border border-[#E8D9C4] bg-[#FFF4E0]/90 p-5 shadow-[0_20px_52px_rgba(101,71,35,0.10)] md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={labelClass}>AGE-WISE LEARNING TRACKS</p>
              <h2 className={headingClass}>Children Learning Journey Explorer</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTrack(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    activeTrack === tab
                      ? "bg-[#073763] !text-[#FFF8EC] shadow-[0_12px_26px_rgba(7,55,99,0.22)]"
                      : "border border-[#E8D9C4] bg-[#FFFDF8] text-[#6F6255] hover:border-[#F4A43C] hover:text-[#073763]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {visibleTracks.map((track) => (
              <article key={track.title} className="flex min-h-[256px] flex-col items-center justify-center rounded-[22px] border border-[#E8D9C4] bg-[#FFFDF8] px-6 py-7 text-center shadow-[0_14px_34px_rgba(101,71,35,0.08)]">
                <img
                  src={track.icon}
                  alt={`${track.category} learning icon`}
                  className={trackIconClass}
                  loading="lazy"
                />
                <span className="mt-4 inline-flex rounded-full bg-[#DDEEDB] px-3 py-1 text-sm font-black uppercase tracking-[0.14em] text-[#073763] md:text-[15px]">
                  {track.category}
                </span>
                <h3 className={`mt-4 ${cardTitleClass}`}>{track.title}</h3>
                <p className={`mt-3 ${cardTextClass}`}>{track.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={labelClass}>Core Learning Programs</p>
          <h2 className={headingClass}>Core Children Sanskar Programs</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {corePrograms.map((program) => (
            <article key={program.title} className={`${cardClass} text-center`}>
              <img src={`${IMAGE_BASE}${program.icon}`} alt={`${program.title} icon`} className="mx-auto h-20 w-20" loading="lazy" />
              <h3 className={`mx-auto mt-5 max-w-xs ${cardTitleClass}`}>{program.title}</h3>
              <p className={`mx-auto mt-3 max-w-xs ${cardTextClass}`}>{program.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[30px] bg-[#073763] p-6 shadow-[0_28px_70px_rgba(7,55,99,0.20)] md:p-8">
            <p className={`${MISSION_SECTION_LABEL_CLASS} !text-[#F4A43C]`}>Weekly Sanskar Routine</p>
            <h2 className={lightHeadingClass}>A practical family rhythm for prayer, story, action, and reflection.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {weeklyRoutine.map((item) => (
                <article key={item.title} className="rounded-[22px] border border-[#2A5F86] bg-white/8 p-5">
                  <img src={`${IMAGE_BASE}${item.icon}`} alt={`${item.title} icon`} className="h-14 w-14 rounded-full" loading="lazy" />
                  <h3 className={`mt-4 ${lightCardTitleClass}`}>{item.title}</h3>
                  <p className={`mt-3 ${lightCardTextClass}`}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[30px] border border-[#E8D9C4] bg-[#DDEEDB]/78 p-6 shadow-[0_18px_42px_rgba(101,71,35,0.09)] md:p-8">
            <p className={labelClass}>Today's Focus</p>
            <h3 className={`mt-4 ${cardTitleClass}`}>Creative Devotion Day</h3>
            <p className={`mt-2 ${smallLabelClass}`}>Friday</p>
            <div className="mt-8 space-y-3">
              {[
                "Short daily practice for home use",
                "Family-friendly and child-safe learning rhythm",
                "Designed for both beginners and regular satsang families",
              ].map((point) => (
                <div key={point} className={`rounded-[18px] border border-white/70 bg-white/72 px-4 py-3 ${cardTextClass}`}>
                  {point}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className={labelClass}>Parent Participation Model</p>
            <h2 className={headingClass}>Role of Parents in Children Spiritual Learning</h2>
            <p className={`mt-6 ${bodyClass}`}>
              Children learn most deeply when parents participate with patience, consistency, and love. This page should guide parents to create a spiritual atmosphere at home through short daily routines, respectful communication, and family devotion.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {parentRoles.map((role, index) => (
              <article key={role} className={cardClass}>
                <p className={smallLabelClass}>0{index + 1}</p>
                <h3 className={`mt-3 ${cardTitleClass}`}>{role}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={labelClass}>Activity & Resource Section</p>
          <h2 className={headingClass}>Learning Resources for Children and Families</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {resourceCards.map((resource) => (
            <article key={resource.cmsKey} className={cardClass}>
              <span className="rounded-full bg-[#FFF4E0] px-3 py-1 text-sm font-black uppercase tracking-[0.14em] text-[#C46D1A] md:text-[15px]">
                {resource.type}
              </span>
              <h3 className={`mt-4 ${cardTitleClass}`}>{resource.title}</h3>
              <Link to={resource.href} className="mt-5 inline-flex rounded-full bg-[#F4A43C] px-5 py-2 text-sm font-black text-[#073763] transition hover:bg-[#FFD084]">
                {resource.button}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={labelClass}>Gallery Preview</p>
          <h2 className={headingClass}>Children Learning Moments</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[24px] border border-[#E8D9C4] bg-white shadow-[0_18px_42px_rgba(101,71,35,0.09)] transition duration-300 hover:-translate-y-1">
              <img src={item.image} alt={item.caption} className="h-52 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className={cardTitleClass}>{item.title}</h3>
                <p className={`mt-2 ${cardTextClass}`}>{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className={sectionClass}>
        <div className="relative overflow-hidden rounded-[34px] border border-[#F0C77E] bg-[linear-gradient(105deg,#EA8A24_0%,#F5C948_48%,#FFE6BF_100%)] p-6 shadow-[0_24px_60px_rgba(193,116,31,0.18)] md:p-10">
          <img src={`${IMAGE_BASE}children-learning-cta-banner.jpg`} alt="Children and families beginning a simple spiritual routine" className="absolute inset-0 h-full w-full object-cover opacity-[0.18]" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(234,138,36,0.88),rgba(245,201,72,0.78),rgba(255,230,191,0.9))]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
            <div>
              <p className={`${MISSION_SECTION_LABEL_CLASS} !text-[#9F5618]`}>Final CTA</p>
              <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 !text-[#4F4A45]`}>Start Children Learning Support</h2>
              <p className={`mt-5 max-w-3xl ${MISSION_BODY_TEXT_CLASS} text-[#5F564C]`}>
                Begin a simple spiritual routine that connects home, family, and Bal Sanskar with steady daily practice.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to={ROUTES.knowledge.pathshala} className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-[#2B2118] transition hover:-translate-y-0.5 hover:bg-[#FFF8EC]">
                Join Pathshala
              </Link>
              <Link to={ROUTES.contact} className="rounded-full border border-white/80 bg-white/20 px-6 py-3 text-center text-sm font-black text-[#2B2118] transition hover:-translate-y-0.5 hover:bg-white">
                Connect With Mentor
              </Link>
              <Link to={ROUTES.knowledge.library} className="rounded-full border border-white/80 bg-white/20 px-6 py-3 text-center text-sm font-black text-[#2B2118] transition hover:-translate-y-0.5 hover:bg-white">
                Open Library
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
