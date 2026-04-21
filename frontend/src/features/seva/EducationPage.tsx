import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { EducationServicesSection } from "./EducationServicesSection";
import { SevaHeroBanner } from "./SevaHeroBanner";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "./sevaTypography";

const QUICK_HIGHLIGHTS = [
  {
    title: "Academic Continuity",
    note: "Stay in school",
  },
  {
    title: "Learning Material Support",
    note: "Books and kits",
  },
  {
    title: "Mentorship Network",
    note: "Guided learning",
  },
  {
    title: "Community Reach",
    note: "Rural support",
  },
];

const MODEL_STEPS = [
  { step: "01", title: "Identify Learners", desc: "Students needing support are identified through outreach and trust networks." },
  { step: "02", title: "Assess Needs", desc: "Academic stage, family situation, and learning gaps are reviewed with care." },
  { step: "03", title: "Deliver Support", desc: "Kits, mentorship, continuity support, or guidance is arranged responsibly." },
  { step: "04", title: "Track Progress", desc: "Student continuity and progress are followed so support stays meaningful." },
];

const IMPACT_STATS = [
  { value: "1200+", label: "Students Supported" },
  { value: "3500+", label: "Kits Distributed" },
  { value: "150+", label: "Mentors" },
  { value: "25+", label: "Locations Reached" },
];

const STORIES = [
  { quote: "Support helped me continue school with confidence.", role: "Student" },
  { quote: "My child stayed in school during a difficult time.", role: "Parent" },
  { quote: "Mentorship creates real change.", role: "Volunteer" },
];

const DONATION_PLANS = [
  { amount: "Rs 500", title: "Basic Learning Kit", impact: "Supports books, stationery, and essentials for one learner." },
  { amount: "Rs 1500", title: "Student Support", impact: "Helps a student with practical academic continuity needs." },
  { amount: "Rs 2100", title: "Monthly Education Support", impact: "Supports recurring learning care and mentor coordination.", recommended: true },
  { amount: "Rs 5100", title: "Sponsor a Student", impact: "Strengthens deeper student support through the seva program." },
];

const SUPPORT_AREAS = ["Study materials", "Mentorship programs", "Skill development", "Rural outreach"];

const VOLUNTEER_OPTIONS = [
  { title: "Teaching Support", desc: "Help students with subjects, revision, and steady learning routines." },
  { title: "Mentorship", desc: "Guide students with confidence, discipline, and personal encouragement." },
  { title: "Career Guidance", desc: "Share practical direction for future studies, skills, and opportunities." },
  { title: "Community Outreach", desc: "Support local coordination, learner identification, and seva follow-up." },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55 },
};

const sectionLabel = `${SEVA_SECTION_LABEL_CLASS} text-[#B97916]`;
const sectionHeading = `${SEVA_SECTION_HEADING_CLASS} text-[#4A3422]`;
const bodyText = `${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`;
const warmCard = "rounded-[20px] border border-[#E8D9BD] bg-[#FFF9F0] shadow-[0_14px_30px_rgba(111,78,25,0.08)]";
const primaryButton =
  "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D89B2B] to-[#F4B84A] px-6 py-3 text-sm font-black text-white shadow-[0_12px_24px_rgba(216,155,43,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(216,155,43,0.36)]";
const outlineButton =
  "inline-flex items-center justify-center rounded-full border border-[#D89B2B] px-6 py-3 text-sm font-black text-[#8A5B16] transition-all hover:-translate-y-0.5 hover:bg-[#FFF4D6]";

export default memo(function EducationPage() {
  usePageMeta(
    "Education Seva",
    "Bhagwat Heritage Service Foundation Trust education seva page focused on student learning continuity, mentorship, school resources, and educational support.",
  );

  return (
    <div className="min-h-screen bg-[#F8F3E8] text-[#4A3422]">
      <SevaHeroBanner
        title="Education Support"
        subtitle="Shiksha se seva, seva se sanskaar"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772699843/pathshala_eza0sp.png"
      />

      <section className="relative z-20 -mt-16 px-4 pb-10 md:-mt-20">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[#E8D9BD] bg-[#FFFDF8] p-4 shadow-[0_18px_42px_rgba(111,78,25,0.12)] md:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_HIGHLIGHTS.map((item) => (
            <motion.article
              key={item.title}
              {...fadeUp}
              className="flex min-h-[140px] flex-col items-center justify-center rounded-[18px] border border-[#E8D9BD] bg-white px-4 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(111,78,25,0.12)]"
            >
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F3E7C9] text-[#D89B2B]">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12.5C8.5 5.5 15.5 4.5 20 4C19.5 8.8 18 15.5 11 18.5C8 19.8 5.8 17.7 7.2 14.8C8.4 12.4 11.4 10.7 14 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="text-balance text-[21px] font-black leading-tight text-[#B97916] md:text-[24px]">{item.title}</h3>
              <p className="mt-2 text-[12px] font-black leading-6 text-[#5A5249] md:text-[16px]">{item.note}</p>
            </motion.article>
          ))}
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="rounded-[28px] border border-[#E8D9BD] bg-[#FFFDF8] p-6 shadow-[0_18px_40px_rgba(111,78,25,0.08)] md:p-10">
          <p className={sectionLabel}>About Education Seva</p>
          <h2 className={sectionHeading}>Learning Support with Guidance and Continuity</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-4">
              <p className={bodyText}>
                Education Seva supports students from underserved backgrounds by ensuring access to essential learning resources, mentorship, and structured academic support.
              </p>
              <p className={bodyText}>
                The initiative is rooted in values, discipline, and long-term growth, helping students move forward with confidence and dignity.
              </p>
            </div>
            <div className="rounded-[22px] border border-[#E8D9BD] bg-[#F3E7C9] p-6">
              <p className={sectionLabel}>Seva Focus</p>
              <p className={`mt-3 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>
                Practical education help, guided by compassion and continuity.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <EducationServicesSection />

      <motion.section {...fadeUp} className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="rounded-[28px] border border-[#E8D9BD] bg-[#FFFDF8] p-6 shadow-[0_18px_40px_rgba(111,78,25,0.08)] md:p-8">
          <p className={sectionLabel}>How Education Seva Works</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {MODEL_STEPS.map((step) => (
              <article key={step.title} className={`${warmCard} h-full p-6 transition-all duration-300 hover:-translate-y-1`}>
                <p className="text-2xl font-black text-[#D89B2B]">{step.step}</p>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{step.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-[#FFFDF8] px-4 py-14 md:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className={sectionLabel}>Our Impact</p>
          <h2 className={sectionHeading}>Education Seva in Action</h2>
          <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {IMPACT_STATS.map((item) => (
              <div key={item.label} className="rounded-[20px] border border-[#E8D9BD] bg-[#FFF9F0] p-6 shadow-[0_14px_30px_rgba(111,78,25,0.08)]">
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="text-[21px] font-black uppercase tracking-wide text-[#B97916] md:text-[24px]"
                >
                  {item.value}
                </motion.p>
                <p className="mt-2 text-[12px] font-black text-[#4A3422] md:text-[16px]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="rounded-[28px] border border-[#E8D9BD] bg-[#FFFDF8] p-6 shadow-[0_18px_40px_rgba(111,78,25,0.08)] md:p-8">
          <p className={sectionLabel}>Education Stories</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STORIES.map((item) => (
              <article key={item.role} className={`${warmCard} p-6`}>
                <p className="text-4xl font-black leading-none text-[#D89B2B]">"</p>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS} text-[#4A3422]`}>"{item.quote}"</p>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#B97916]">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-[#FFFDF8] px-4 py-14 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className={sectionLabel}>Donation Support</p>
            <h2 className={sectionHeading}>Support Education Seva</h2>
            <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>
              Choose a meaningful way to support learning, student confidence, and educational continuity.
            </p>
          </div>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {DONATION_PLANS.map((plan) => (
              <article
                key={plan.title}
                className={`${warmCard} relative flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 ${
                  plan.recommended ? "border-[#D89B2B] bg-[#FFF4D6]" : ""
                }`}
              >
                {plan.recommended ? (
                  <span className="absolute right-5 top-5 rounded-full bg-[#D89B2B] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
                    Recommended
                  </span>
                ) : null}
                <p className="mt-4 text-2xl font-black text-[#B97916]">{plan.amount}</p>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{plan.title}</h3>
                <p className={`mt-3 flex-1 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{plan.impact}</p>
                <Link to={ROUTES.donate} className={`${primaryButton} mt-6 w-full`}>
                  Contribute
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-5 text-center text-sm font-semibold text-[#6B5A4A]">
            Contributions are used where the need is most urgent.
          </p>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-[#E8D9BD] bg-[#F3E7C9] p-6 md:p-8">
            <p className={sectionLabel}>Where Support Helps</p>
            <p className={`mt-4 ${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>
              Support is directed toward practical education needs and guided student development.
            </p>
            <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>
              All support is provided based on real needs and available resources.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SUPPORT_AREAS.map((item) => (
              <div key={item} className={`${warmCard} flex items-center gap-3 p-5`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D89B2B] text-sm font-black text-white">✓</span>
                <p className="text-base font-black text-[#4A3422]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-[#FFFDF8] px-4 py-14 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className={sectionLabel}>Volunteer Seva</p>
            <h2 className={sectionHeading}>Become a Mentor</h2>
          </div>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {VOLUNTEER_OPTIONS.map((item) => (
              <article key={item.title} className={`${warmCard} h-full p-6 transition-all duration-300 hover:-translate-y-1`}>
                <h3 className={`${SEVA_CARD_TITLE_CLASS} text-[#4A3422]`}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#6B5A4A]`}>{item.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to={ROUTES.involved.volunteer} className={primaryButton}>
              Become a Mentor
            </Link>
          </div>
        </div>
      </motion.section>

      <section className="px-4 pb-16 pt-6">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[28px] border border-[#D9A43A] bg-gradient-to-r from-[#D89B2B] to-[#F4CE5A] p-8 shadow-[0_22px_46px_rgba(111,78,25,0.18)] md:grid-cols-[1fr_0.8fr] md:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#9A5A08]">Final Education Seva</p>
            <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-5 text-[#4A3422]`}>
              Support Learning. Shape Futures.
            </h2>
            <p className={`mt-5 max-w-2xl ${SEVA_BODY_TEXT_CLASS} text-[#4A3422]`}>
              Join Education Seva through contribution or mentorship.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <Link to={ROUTES.donate} className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#8A4B05] shadow-sm transition-all hover:-translate-y-0.5">
              Donate Now
            </Link>
            <Link to={ROUTES.involved.volunteer} className={outlineButton}>
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});
