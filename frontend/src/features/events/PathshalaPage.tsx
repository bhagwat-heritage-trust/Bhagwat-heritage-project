import { memo, useMemo, type CSSProperties, type ReactNode } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { MISSION_BODY_TEXT_CLASS, MISSION_SECTION_HEADING_CLASS, MISSION_SECTION_LABEL_CLASS } from "../mission/missionTypography";

const IMAGE_BASE = "/images/e-pathshala/";
const ICON_BASE = "https://res.cloudinary.com/der8zinu8/image/upload/";
const HERO_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777052601/ChatGPT_Image_Apr_24_2026_11_11_58_PM_ju9usv.png";
const DIGITAL_GURUKUL_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1776971376/ChatGPT_Image_Apr_24_2026_12_37_49_AM_e2xugl.png";

const HIGHLIGHTS = ["Value-Based Learning", "Guided Mentorship", "Family Participation"];

const LEARNING_MODELS = [
  {
    title: "Residential Gurukul",
    text: "Immersive campus-based learning with discipline, seva routine, spiritual practice, and mentor guidance.",
    icon: "icon-residential-gurukul.svg",
    label: "Campus",
  },
  {
    title: "Weekend Family Pathshala",
    text: "Parent-child batch combining values, chanting, stories, culture, and family learning.",
    icon: "icon-family-pathshala.svg",
    label: "Family",
  },
  {
    title: "Live Online Pathshala",
    text: "Interactive online classes with revision resources, evaluation, and mentor support.",
    icon: "icon-online-pathshala.svg",
    label: "Online",
  },
  {
    title: "Youth Leadership Fellowship",
    text: "Advanced track for youth communication, scripture expression, team seva, and leadership practice.",
    icon: "icon-youth-leadership.svg",
    label: "Youth",
  },
];

const PROGRAM_TRACKS = [
  {
    title: "Bal Sanskar Track",
    age: "Age 7–12",
    text: "Stories, shlokas, discipline habits, prayer practice, and basic cultural learning.",
    icon: "icon-bal-sanskar.svg",
  },
  {
    title: "Yuva Shakti Track",
    age: "Age 13–21",
    text: "Leadership, communication, scripture understanding, seva execution, and personality development.",
    icon: "icon-yuva-shakti.svg",
  },
  {
    title: "Sanskrit Scholar Track",
    age: "Age 21+",
    text: "Bhagwat study, philosophy, chanting practice, teaching preparation, and scriptural depth.",
    icon: "icon-sanskrit-scholar.svg",
  },
];

const CORE_FEATURES = [
  { title: "Structured multi-level curriculum", icon: "icon-curriculum.svg" },
  { title: "Sanskrit chanting and shloka training", icon: "icon-sanskrit-chanting.svg" },
  { title: "Weekly mentor-led progress review", icon: "icon-mentor-review.svg" },
  { title: "Character and value-building modules", icon: "icon-character-building.svg" },
  { title: "Seva projects and social impact labs", icon: "icon-seva-project.svg" },
  { title: "Performance tracking and certification", icon: "icon-certification.svg" },
];

const ADVANCED_TOOLS = [
  {
    title: "Live Doubt Room",
    text: "Weekly interactive sessions with Acharyas and mentors.",
    icon: "icon-live-doubt-room.svg",
  },
  {
    title: "Digital Notes Vault",
    text: "Topic-wise notes, chants, stories, and revision sheets.",
    icon: "icon-digital-notes.svg",
  },
  {
    title: "Parent Dashboard",
    text: "Attendance, progress snapshots, feedback, and mentor remarks.",
    icon: "icon-parent-dashboard.svg",
  },
  {
    title: "Seva Practicum",
    text: "Action-based assignments connected with real community service.",
    icon: "icon-seva-practicum.svg",
  },
];

const WEEKLY_RHYTHM = [
  { day: "Monday", focus: "Scripture Reading + Chanting" },
  { day: "Wednesday", focus: "Sanskrit, Language, and Recitation" },
  { day: "Friday", focus: "Yoga, Meditation, and Reflection" },
  { day: "Sunday", focus: "Seva Lab + Mentor Review" },
];

const LEARNING_PATHWAY = [
  {
    phase: "Phase 01",
    title: "Foundation",
    text: "Bhakti basics, dharmic values, pronunciation, prayer discipline, and spiritual routine.",
  },
  {
    phase: "Phase 02",
    title: "Scriptural Depth",
    text: "Bhagwat themes, katha understanding, guided interpretation, and cultural knowledge.",
  },
  {
    phase: "Phase 03",
    title: "Expression",
    text: "Public speaking, devotional recitation, storytelling, music, and presentation.",
  },
  {
    phase: "Phase 04",
    title: "Leadership",
    text: "Community seva planning, team coordination, communication, and dharmic leadership.",
  },
];

const OUTCOMES = [
  {
    title: "Spiritual Confidence",
    text: "Regular chanting and scripture study build inner stability.",
    icon: "icon-spiritual-confidence.svg",
  },
  {
    title: "Cultural Intelligence",
    text: "Students understand traditions with context and practical relevance.",
    icon: "icon-cultural-intelligence.svg",
  },
  {
    title: "Leadership Readiness",
    text: "Learners gain communication, discipline, and team responsibility.",
    icon: "icon-leadership-readiness.svg",
  },
  {
    title: "Service Orientation",
    text: "Seva modules train compassion with execution discipline.",
    icon: "icon-service-orientation.svg",
  },
];

const TESTIMONIALS = [
  {
    quote: "Excellent platform for children’s values, discipline, and spiritual growth.",
    label: "Parent, Ahmedabad",
  },
  {
    quote: "The blend of scripture and practical seva made learning meaningful.",
    label: "Student, Indore",
  },
  {
    quote: "Mentor support and class structure are the strongest points of this Pathshala.",
    label: "Guardian, Mumbai",
  },
];

const containerClass = "mx-auto w-full max-w-[1180px] px-4 sm:px-6";
const sectionClass = "py-12 md:py-[72px]";
const eyebrowClass = `${MISSION_SECTION_LABEL_CLASS} !text-[#C96F18]`;
const titleClass = `${MISSION_SECTION_HEADING_CLASS} mt-4 !text-[#2B2118]`;
const lightTitleClass = `${MISSION_SECTION_HEADING_CLASS} mt-4 !text-[#FFF8EC]`;
const bodyClass = `${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`;
const cardTitleClass = "text-[15px] font-bold !text-[#2B2118]";
const navyCardTitleClass = "text-[15px] font-bold !text-[#FFF8EC]";
const cardTextClass = "text-sm leading-6 text-[#6F6255]";
const lightCardTextClass = "text-sm leading-6 text-[#F8EAD2]";
const smallLabelClass = "text-sm font-black uppercase tracking-[0.14em] text-[#C96F18] md:text-[15px]";
const creamCardClass =
  "rounded-[20px] border border-[#E8D9C4] bg-[#FFFDF8]/95 p-6 shadow-[0_18px_42px_rgba(101,71,35,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(101,71,35,0.15)]";
const navyCardClass =
  "rounded-[20px] border border-[#2A5F86] bg-[#073763] p-6 shadow-[0_22px_52px_rgba(7,55,99,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_62px_rgba(7,55,99,0.28)]";

function SectionHeader({
  label,
  title,
  children,
  centered = true,
  light = false,
}: {
  label?: string;
  title: string;
  children?: ReactNode;
  centered?: boolean;
  light?: boolean;
}) {
  const headingClass = light ? lightTitleClass : titleClass;

  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {label ? <p className={light ? `${MISSION_SECTION_LABEL_CLASS} !text-[#F4A43C]` : eyebrowClass}>{label}</p> : null}
      <h2 className={headingClass}>{title}</h2>
      {children ? <div className={`mt-6 ${light ? "text-[#F8EAD2]" : "text-[#6F6255]"}`}>{children}</div> : null}
    </div>
  );
}

function IconBadge({ icon, alt }: { icon: string; alt: string }) {
  return (
    <img
      src={`${ICON_BASE}${icon}`}
      alt={alt}
      loading="lazy"
      className="mx-auto h-24 w-24 shrink-0 rounded-full object-cover"
    />
  );
}

export default memo(function PathshalaPage() {
  usePageMeta(
    "E-Pathshala",
    "Join Bhagwat Heritage E-Pathshala for value-based spiritual, cultural, Sanskritik, and Bhagwat learning through guided online, family, youth, and Gurukul programs.",
    "Bhagwat E Pathshala, Online Sanskrit Pathshala, Bhagwat Heritage, Bal Sanskar, Spiritual Education, Value Based Learning, Bhagwat Katha Learning",
  );

  const patternStyle = useMemo<CSSProperties>(
    () => ({
      backgroundColor: "#FFF8EC",
      backgroundImage:
        "radial-gradient(circle at 8% 8%, rgba(244,164,60,0.16), transparent 28rem), radial-gradient(circle at 92% 18%, rgba(7,55,99,0.10), transparent 24rem), radial-gradient(circle at 22% 88%, rgba(221,238,219,0.92), transparent 26rem)",
      backgroundAttachment: "fixed",
    }),
    [],
  );

  return (
    <div className="relative overflow-hidden" style={patternStyle}>
      <section className="-mx-6 -mt-12 px-4 pt-0 md:px-6">
        <div className="inner-hero relative mx-auto h-[420px] w-full max-w-[1240px] overflow-hidden rounded-2xl shadow-[0_28px_70px_rgba(7,55,99,0.22)] md:h-[620px]">
          <img
            src={HERO_IMAGE}
            alt="Bhagwat Heritage E-Pathshala learning atmosphere with scripture study and children"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,55,99,0.18),rgba(255,248,236,0.04)_42%,rgba(10,47,82,0.42))]" />
          <div className="relative z-10 flex h-full items-end justify-center px-5 pb-10 pt-8 text-center md:pb-16">
            <div className="max-w-4xl">
              <h1 className="hero-title mb-3 text-4xl font-bold leading-tight !text-[#FFF8EC] md:text-5xl">E-Pathshala</h1>
              <p className="hero-subtitle text-lg text-[#FFECCB] md:text-xl">
                Digital Pathshala for spiritual, cultural, Sanskritik, and value-based learning.
              </p>
              <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <a
                  href="#program-tracks"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#FFF8EC]/80 bg-[#FFF8EC]/10 px-7 py-3 text-sm font-black !text-[#FFF8EC] backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#FFF8EC] hover:!text-[#073763]"
                >
                  Explore Study Tracks
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={`${containerClass} grid items-center gap-10 lg:grid-cols-[1fr_0.92fr]`}>
          <div>
            <SectionHeader label="Digital Gurukul" title="A Digital Gurukul for Modern Families" centered={false}>
              <p className={bodyClass}>
                Bhagwat Heritage E-Pathshala brings the spirit of traditional Gurukul learning into a modern digital format.
                Through guided classes, chanting practice, value education, storytelling, Sanskritik learning, and seva-based
                activities, learners receive a balanced foundation of devotion, discipline, culture, and character.
              </p>
            </SectionHeader>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {HIGHLIGHTS.map((highlight) => (
                <div key={highlight} className="rounded-2xl border border-[#E8D9C4] bg-[#FFF4E0] p-4 text-center shadow-[0_12px_28px_rgba(101,71,35,0.08)]">
                  <p className={cardTitleClass}>{highlight}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full bg-[#F4A43C]/20 blur-2xl" />
            <img
              src={DIGITAL_GURUKUL_IMAGE}
              alt="Children and youth studying scripture with teacher guidance"
              loading="lazy"
              className="relative h-[360px] w-full rounded-[28px] border border-[#E8D9C4] object-cover shadow-[0_24px_60px_rgba(101,71,35,0.16)]"
            />
          </div>
        </div>
      </section>

      <section className={sectionClass} id="learning-models">
        <div className={containerClass}>
          <SectionHeader label="Flexible Formats" title="Learning Models">
            <p className={bodyClass}>Choose the model that matches your family rhythm, age group, and spiritual learning goals.</p>
          </SectionHeader>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {LEARNING_MODELS.map((model) => (
              <article key={model.title} className={`${creamCardClass} text-center`}>
                <IconBadge icon={model.icon} alt={`${model.title} icon`} />
                <h3 className={`mt-5 ${cardTitleClass}`}>{model.title}</h3>
                <p className={`mx-auto mt-3 max-w-sm ${cardTextClass}`}>{model.text}</p>
              </article>
            ))}
          </div>
          <figure className="mt-8 overflow-hidden rounded-[28px] border border-[#E8D9C4] bg-[#073763] shadow-[0_24px_58px_rgba(7,55,99,0.18)]">
            <img
              src={`${IMAGE_BASE}family-pathshala-session.jpg`}
              alt="Family Pathshala session with scripture learning and mentor support"
              loading="lazy"
              className="h-[260px] w-full object-cover opacity-90"
            />
          </figure>
        </div>
      </section>

      <section className={sectionClass} id="program-tracks">
        <div className={containerClass}>
          <div className="rounded-[28px] bg-[#0A2F52] p-5 shadow-[0_28px_70px_rgba(7,55,99,0.22)] md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div>
                <SectionHeader label="Age-Wise Pathways" title="Program Tracks" centered={false} light>
                  <p className={`${MISSION_BODY_TEXT_CLASS} text-[#F8EAD2]`}>Deep, age-wise tracks help learners progress from sanskar to scholarship.</p>
                </SectionHeader>
                <div className="mt-8 space-y-5">
                  {PROGRAM_TRACKS.map((track) => (
                    <article key={track.title} className="rounded-[20px] border border-[#2A5F86] bg-[#073763] p-6 text-center md:text-left">
                      <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
                        <IconBadge icon={track.icon} alt={`${track.title} icon`} />
                        <div>
                          <h3 className={navyCardTitleClass}>{track.title}</h3>
                          <p className={`mt-2 ${lightCardTextClass}`}>{track.text}</p>
                        </div>
                        <p className="inline-flex rounded-full bg-[#F4A43C] px-4 py-2 text-sm font-black !text-[#073763]">{track.age}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <img
                src={`${IMAGE_BASE}youth-leadership-learning.jpg`}
                alt="Youth leadership learning visual with energetic students"
                loading="lazy"
                className="h-full min-h-[360px] rounded-[24px] border border-[#2A5F86] object-cover shadow-[0_20px_44px_rgba(0,0,0,0.22)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <SectionHeader label="Learning System" title="Core Features">
            <p className={bodyClass}>A structured platform for devotional learning, practical discipline, and measurable growth.</p>
          </SectionHeader>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_FEATURES.map((feature) => (
              <article key={feature.title} className={`${creamCardClass} text-center`}>
                <IconBadge icon={feature.icon} alt={`${feature.title} icon`} />
                <h3 className={`mx-auto mt-5 max-w-xs ${cardTitleClass}`}>{feature.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className={containerClass}>
          <div className="relative overflow-hidden rounded-[30px] bg-[#073763] shadow-[0_28px_70px_rgba(7,55,99,0.22)]">
            <img
              src={`${IMAGE_BASE}digital-gurukul-class.jpg`}
              alt="Digital Gurukul class visual with students learning in a devotional setting"
              loading="lazy"
              className="h-[320px] w-full object-cover opacity-[0.78]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,55,99,0.86),rgba(7,55,99,0.24))]" />
            <div className="absolute inset-0 flex items-center px-6 md:px-10">
              <div className="max-w-xl">
                <p className={`${MISSION_SECTION_LABEL_CLASS} !text-[#F4A43C]`}>Guided Learning</p>
                <h2 className={lightTitleClass}>
                  Culture, scripture, chanting, and seva in one learning rhythm.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <SectionHeader label="Digital Support" title="Advanced Learning Tools">
            <p className={bodyClass}>Modern learning utilities keep students, parents, and mentors aligned through every level.</p>
          </SectionHeader>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANCED_TOOLS.map((tool) => (
              <article key={tool.title} className={`${creamCardClass} text-center`}>
                <IconBadge icon={tool.icon} alt={`${tool.title} icon`} />
                <h3 className={`mt-5 ${cardTitleClass}`}>{tool.title}</h3>
                <p className={`mx-auto mt-3 max-w-xs ${cardTextClass}`}>{tool.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <SectionHeader label="Weekly Practice" title="Weekly Learning Rhythm">
            <p className={bodyClass}>A simple rhythm helps learning move from knowledge into practice.</p>
          </SectionHeader>
          <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-[#D99A2B]/45 lg:block" />
            {WEEKLY_RHYTHM.map((item, index) => (
              <article key={item.day} className="relative rounded-[20px] border border-[#E8D9C4] bg-[#FFFDF8] p-6 text-center shadow-[0_18px_42px_rgba(101,71,35,0.10)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#FFF8EC] bg-[#F4A43C] text-lg font-black !text-[#073763] shadow-[0_14px_30px_rgba(244,164,60,0.28)]">
                  {index + 1}
                </div>
                <p className={`mt-5 ${smallLabelClass}`}>{item.day}</p>
                <h3 className={`mt-2 ${cardTitleClass}`}>{item.focus}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <SectionHeader label="Progression" title="Learning Pathway">
            <p className={bodyClass}>Each phase builds devotional depth, expression, and responsibility.</p>
          </SectionHeader>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {LEARNING_PATHWAY.map((phase) => (
              <article key={phase.phase} className={creamCardClass}>
                <p className={smallLabelClass}>{phase.phase}</p>
                <h3 className={`mt-3 ${cardTitleClass}`}>{phase.title}</h3>
                <p className={`mt-3 ${cardTextClass}`}>{phase.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <SectionHeader label="Student Growth" title="Learning Outcomes">
            <p className={bodyClass}>The aim is not only information, but confident character rooted in dharmic living.</p>
          </SectionHeader>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((outcome) => (
              <article key={outcome.title} className={`${navyCardClass} text-center`}>
                <IconBadge icon={outcome.icon} alt={`${outcome.title} icon`} />
                <h3 className={`mt-5 ${navyCardTitleClass}`}>{outcome.title}</h3>
                <p className={`mx-auto mt-3 max-w-xs ${lightCardTextClass}`}>{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <SectionHeader label="Testimonials" title="What Families Say" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <article key={testimonial.label} className={creamCardClass}>
                <p className="text-5xl leading-none text-[#D99A2B]">“</p>
                <p className="mt-2 text-[15px] leading-7 text-[#2B2118]">{testimonial.quote}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#C96F18]">{testimonial.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
});
