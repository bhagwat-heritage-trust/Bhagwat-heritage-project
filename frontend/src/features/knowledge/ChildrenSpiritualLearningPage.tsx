import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type TrackCategory = "All" | "Bal Sanskar" | "Primary" | "Teens" | "Family";

const IMAGE_BASE = "/images/children-spiritual-learning/";

const summaryCards = [
  { title: "Age Tracks", text: "Bal Sanskar, Primary, Teens, Family" },
  { title: "Learning Style", text: "Story, prayer, action, repetition" },
  { title: "Family Role", text: "Parents as daily sanskar anchors" },
  { title: "Weekly Rhythm", text: "Simple habits for steady growth" },
];

const aboutCards = [
  {
    title: "Story-Led Value Learning",
    text: "Children learn values naturally through dharmic stories, examples, songs, and guided discussion.",
  },
  {
    title: "Family Participation Model",
    text: "Parents become part of the learning journey so sanskar continues at home and not only during class.",
  },
  {
    title: "Age-Appropriate Growth",
    text: "Separate tracks are planned for early years, school-age learners, and teens so guidance stays practical and relevant.",
  },
];

const learningTracks = [
  {
    title: "Early Bal Sanskar Foundation",
    category: "Bal Sanskar" as const,
    text: "Simple prayers, moral habits, greeting culture, and joyful devotional exposure for young children.",
  },
  {
    title: "Primary Spiritual Learning Track",
    category: "Primary" as const,
    text: "Age-friendly katha stories, memory verses, value-building games, and temple culture understanding.",
  },
  {
    title: "Youth Transition and Character Track",
    category: "Teens" as const,
    text: "Dharmic decision-making, discipline, seva responsibility, confidence, and guided spiritual discussion.",
  },
  {
    title: "Family Satsang Participation Track",
    category: "Family" as const,
    text: "Home-based parent-child learning activities that strengthen shared spiritual habits and respectful conduct.",
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
    image: "children-prayer-session.jpg",
    title: "Prayer Session",
    caption: "Children begin with folded hands, calm focus, and simple daily prayer.",
  },
  {
    image: "family-satsang-learning.jpg",
    title: "Family Satsang",
    caption: "Parents and children learn together through shared home devotion.",
  },
  {
    image: "kids-story-learning.jpg",
    title: "Story Learning",
    caption: "Dharmic stories help children understand values with joy and clarity.",
  },
  {
    image: "children-activity-cards.jpg",
    title: "Activity Cards",
    caption: "Small weekly practices make sanskar visible in everyday conduct.",
  },
];

const faqs = [
  {
    question: "What age group can join?",
    answer: "Children from early learning age to teens can participate through suitable age-wise tracks.",
  },
  {
    question: "Do parents need to attend?",
    answer: "Parents are encouraged to participate because home atmosphere is central to sanskar development.",
  },
  {
    question: "Is this only for regular Pathshala students?",
    answer: "No. Families can start with home practice, online guidance, or Pathshala participation.",
  },
  {
    question: "Are materials available for home use?",
    answer: "Yes. Weekly routines, activity cards, and guidance resources can be provided.",
  },
];

const tabs: TrackCategory[] = ["All", "Bal Sanskar", "Primary", "Teens", "Family"];

const sectionClass = "mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 md:py-[72px]";
const labelClass = "text-xs font-black uppercase tracking-[0.24em] text-[#C46D1A] md:text-sm";
const headingClass = "mt-3 text-3xl font-black leading-tight text-[#073763] md:text-5xl";
const bodyClass = "text-base leading-8 text-[#6F6255] md:text-lg";
const cardClass =
  "rounded-[24px] border border-[#E8D9C4] bg-[#FFFDF8]/92 p-6 shadow-[0_18px_42px_rgba(101,71,35,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(101,71,35,0.14)]";
const buttonPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#F4A43C] px-6 py-3 text-sm font-black text-[#073763] shadow-[0_16px_34px_rgba(244,164,60,0.24)] transition hover:-translate-y-0.5 hover:bg-[#FFD084]";
const buttonSecondary =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-[#D99A2B]/70 bg-white/70 px-6 py-3 text-sm font-black text-[#073763] transition hover:-translate-y-0.5 hover:bg-white";

export default memo(function ChildrenSpiritualLearningPage() {
  const [activeTrack, setActiveTrack] = useState<TrackCategory>("All");
  const [openFaq, setOpenFaq] = useState(0);

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

      <section className="relative mx-auto w-full max-w-[1180px] px-4 pb-8 pt-6 sm:px-6 md:pb-12 md:pt-8">
        <div className="grid overflow-hidden rounded-[32px] border border-[#E8D9C4] bg-[#FFFDF8] shadow-[0_26px_70px_rgba(101,71,35,0.13)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center px-6 py-10 md:px-10 lg:py-12">
            <p className={labelClass}>बाल संस्कार एवं आध्यात्मिक शिक्षा</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#073763] md:text-6xl">Children Spiritual Learning</h1>
            <p className="mt-4 text-xl font-black text-[#C46D1A] md:text-2xl">Bal Sanskar today, strong character tomorrow.</p>
            <p className="mt-3 text-lg font-semibold leading-8 text-[#6F6255]">
              परिवार, प्रार्थना, कथा और अभ्यास से बच्चों में संस्कार निर्माण।
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to={ROUTES.knowledge.pathshala} className={buttonPrimary}>
                Join Bal Sanskar Path
              </Link>
              <Link to={ROUTES.contact} className={buttonSecondary}>
                Connect With Mentor
              </Link>
              <Link to={ROUTES.knowledge.library} className={buttonSecondary}>
                Download Weekly Routine
              </Link>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <img
              src={`${IMAGE_BASE}children-spiritual-learning-hero.jpg`}
              alt="Children learning prayer, stories, and values in a warm spiritual setting"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,248,0.18),rgba(255,248,236,0.02))]" />
          </div>
        </div>

        <div className="relative z-10 mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <article key={card.title} className="rounded-[20px] border border-[#E8D9C4] bg-white/88 p-5 shadow-[0_14px_34px_rgba(101,71,35,0.08)]">
              <h2 className="text-[15px] font-bold text-[#073763]">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#6F6255]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={labelClass}>About Children Spiritual Learning</p>
          <h2 className={headingClass}>बाल संस्कार शिक्षा का उद्देश्य</h2>
          <p className={`mt-6 ${bodyClass}`}>
            This page guides children and families through joyful sanskar learning based on prayer, stories, values, discipline, seva, devotion, and family participation. The aim is not only classroom learning but daily character building at home.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {aboutCards.map((card) => (
            <article key={card.title} className={cardClass}>
              <h3 className="text-[15px] font-bold text-[#2B2118]">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6F6255]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="rounded-[30px] border border-[#E8D9C4] bg-[#FFF4E0]/82 p-5 shadow-[0_20px_52px_rgba(101,71,35,0.10)] md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={labelClass}>Age-wise Learning Tracks</p>
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
                      ? "bg-[#073763] text-white shadow-[0_12px_26px_rgba(7,55,99,0.22)]"
                      : "border border-[#E8D9C4] bg-white/82 text-[#6F6255] hover:border-[#F4A43C] hover:text-[#073763]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {visibleTracks.map((track) => (
              <article key={track.title} className="rounded-[22px] border border-[#E8D9C4] bg-white/88 p-6 shadow-[0_14px_34px_rgba(101,71,35,0.08)]">
                <span className="rounded-full bg-[#DDEEDB] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#073763]">
                  {track.category}
                </span>
                <h3 className="mt-4 text-[15px] font-bold text-[#2B2118]">{track.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6F6255]">{track.text}</p>
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
              <h3 className="mx-auto mt-5 max-w-xs text-[15px] font-bold text-[#2B2118]">{program.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#6F6255]">{program.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[30px] bg-[#073763] p-6 shadow-[0_28px_70px_rgba(7,55,99,0.20)] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F4A43C] md:text-sm">Weekly Sanskar Routine</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-[#FFF8EC] md:text-5xl">A practical family rhythm for prayer, story, action, and reflection.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {weeklyRoutine.map((item) => (
                <article key={item.title} className="rounded-[22px] border border-[#2A5F86] bg-white/8 p-5">
                  <img src={`${IMAGE_BASE}${item.icon}`} alt={`${item.title} icon`} className="h-14 w-14 rounded-full" loading="lazy" />
                  <h3 className="mt-4 text-[15px] font-bold text-[#FFF8EC]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#F8EAD2]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[30px] border border-[#E8D9C4] bg-[#DDEEDB]/78 p-6 shadow-[0_18px_42px_rgba(101,71,35,0.09)] md:p-8">
            <p className={labelClass}>Today’s Focus</p>
            <h3 className="mt-4 text-3xl font-black text-[#073763]">Creative Devotion Day</h3>
            <p className="mt-2 text-[15px] font-black uppercase tracking-[0.18em] text-[#C46D1A]">Friday</p>
            <div className="mt-8 space-y-3">
              {[
                "Short daily practice for home use",
                "Family-friendly and child-safe learning rhythm",
                "Designed for both beginners and regular satsang families",
              ].map((point) => (
                <div key={point} className="rounded-[18px] border border-white/70 bg-white/72 px-4 py-3 text-sm font-bold leading-6 text-[#2B2118]">
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
                <p className="text-sm font-black uppercase tracking-[0.14em] text-[#C96F18]">0{index + 1}</p>
                <h3 className="mt-3 text-[15px] font-bold text-[#2B2118]">{role}</h3>
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
              <span className="rounded-full bg-[#FFF4E0] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#C46D1A]">
                {resource.type}
              </span>
              <h3 className="mt-4 text-[15px] font-bold text-[#2B2118]">{resource.title}</h3>
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
              <img src={`${IMAGE_BASE}${item.image}`} alt={item.caption} className="h-52 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="text-[15px] font-bold text-[#2B2118]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6F6255]">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={labelClass}>FAQ</p>
          <h2 className={headingClass}>Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto mt-10 max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <article key={faq.question} className="rounded-[22px] border border-[#E8D9C4] bg-white/88 shadow-[0_14px_34px_rgba(101,71,35,0.08)]">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-bold text-[#2B2118]"
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FFF4E0] text-[#C46D1A]">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen ? <p className="px-5 pb-5 text-sm leading-6 text-[#6F6255]">{faq.answer}</p> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="relative overflow-hidden rounded-[34px] border border-[#F0C77E] bg-[linear-gradient(105deg,#EA8A24_0%,#F5C948_48%,#FFE6BF_100%)] p-6 shadow-[0_24px_60px_rgba(193,116,31,0.18)] md:p-10">
          <img src={`${IMAGE_BASE}children-learning-cta-banner.jpg`} alt="Children and families beginning a simple spiritual routine" className="absolute inset-0 h-full w-full object-cover opacity-[0.18]" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(234,138,36,0.88),rgba(245,201,72,0.78),rgba(255,230,191,0.9))]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9F5618] md:text-sm">Final CTA</p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-[#4F4A45] md:text-5xl">Start Children Learning Support</h2>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-[#5F564C] md:text-lg">
                आज से घर, परिवार और बाल संस्कार को जोड़ने वाली सरल आध्यात्मिक दिनचर्या आरंभ करें।
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
