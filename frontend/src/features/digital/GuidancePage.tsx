import { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "../seva/sevaTypography";

type GuidanceItem = {
  title: string;
  href: string;
};

const guidanceCategories = [
  {
    title: "Spiritual Guidance",
    href: ROUTES.mission.spiritual,
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129183/ChatGPT_Image_Apr_25_2026_07_57_04_PM_hxb1sj.png",
    items: [
      {
        title: "Mantra Guidance",
        href: ROUTES.mission.spiritual,
      },
      {
        title: "Sadhana Guidance",
        href: ROUTES.mission.spiritual,
      },
      {
        title: "Daily Prayer Discipline",
        href: ROUTES.knowledge.dailyQuotes,
      },
      {
        title: "Personal Spiritual Practices",
        href: ROUTES.knowledge.studyResources,
      },
      {
        title: "Family Peace Guidance",
        href: ROUTES.involved.contactUs,
      },
    ],
  },
  {
    title: "Astrology Guidance",
    href: ROUTES.digital.kundli,
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129182/ChatGPT_Image_Apr_25_2026_07_57_43_PM_aop61d.png",
    items: [
      {
        title: "Horoscope Consultation",
        href: ROUTES.digital.kundli,
      },
      {
        title: "Life Situation Guidance",
        href: ROUTES.digital.kundli,
      },
      {
        title: "Gemstone Recommendations",
        href: ROUTES.digital.store,
      },
      {
        title: "Muhurat Guidance",
        href: ROUTES.eventsKatha.spiritualEvents,
      },
      {
        title: "Nakshatra / Name Insights",
        href: ROUTES.digital.kundli,
      },
    ],
  },
  {
    title: "Vastu Guidance",
    href: `${ROUTES.about.founder}#guidance-services`,
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129183/ChatGPT_Image_Apr_25_2026_07_57_56_PM_d5hwxt.png",
    items: [
      {
        title: "Home Vastu",
        href: `${ROUTES.about.founder}#guidance-services`,
      },
      {
        title: "Temple Vastu",
        href: ROUTES.mandirTeerth.mahamandir,
      },
      {
        title: "Office / Land Guidance",
        href: `${ROUTES.about.founder}#guidance-services`,
      },
      {
        title: "Energy Alignment",
        href: `${ROUTES.about.founder}#guidance-services`,
      },
      {
        title: "Construction Direction",
        href: ROUTES.mandirTeerth.construction,
      },
    ],
  },
  {
    title: "Spiritual Remedies",
    href: ROUTES.digital.store,
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129182/ChatGPT_Image_Apr_25_2026_07_58_48_PM_y0pa28.png",
    items: [
      {
        title: "Rudraksha Guidance",
        href: ROUTES.digital.store,
      },
      {
        title: "Yantra Guidance",
        href: ROUTES.digital.store,
      },
      {
        title: "Vedic Puja Anushthan",
        href: ROUTES.eventsKatha.spiritualEvents,
      },
      {
        title: "Ratna Guidance",
        href: ROUTES.digital.store,
      },
      {
        title: "Puja Samagri Guidance",
        href: ROUTES.digital.store,
      },
    ],
  },
] satisfies ReadonlyArray<{ title: string; href: string; icon: string; items: GuidanceItem[] }>;

const processSteps = [
  "Share Your Concern",
  "Receive Spiritual Guidance",
  "Get Suitable Dharmic Remedies",
  "Perform Recommended Practices / Rituals",
  "Continue Sadhana & Inner Growth",
] as const;

const trustSupports = [
  { label: "Rudraksha", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129179/ChatGPT_Image_Apr_25_2026_08_00_31_PM_emgalc.png" },
  { label: "Gemstones", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129180/ChatGPT_Image_Apr_25_2026_08_00_54_PM_j6hgtv.png" },
  { label: "Yantra", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129179/ChatGPT_Image_Apr_25_2026_08_00_42_PM_skxd2k.png" },
  { label: "Puja Samagri", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129180/ChatGPT_Image_Apr_25_2026_08_01_16_PM_avpbws.png" },
  { label: "Vedic Anushthan Support", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129180/ChatGPT_Image_Apr_25_2026_08_00_13_PM_ogix0d.png" },
  { label: "Temple / Home Ritual Guidance", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129179/ChatGPT_Image_Apr_25_2026_08_01_28_PM_j7au8y.png" },
] as const;

const heroImageUrl = "https://res.cloudinary.com/der8zinu8/image/upload/v1777129184/ChatGPT_Image_Apr_25_2026_07_56_12_PM_z7t0wf.png";

const authorityImages = [
  {
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1777139324/Guidance_About_txbdtm.png",
    alt: "Sant Shri Manish Bhaiji Maharaj giving divine spiritual guidance",
  },
  {
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1777141444/guidance_about_2_bp6hpg.png",
    alt: "Sant Shri Manish Bhaiji Maharaj offering scriptural and dharmic guidance",
  },
] as const;

const pagePatternStyle = {
  backgroundColor: "#FFF8F0",
  backgroundImage:
    "radial-gradient(circle at 8% 10%, rgba(227,155,53,0.16), transparent 26rem), radial-gradient(circle at 92% 18%, rgba(15,123,130,0.13), transparent 25rem), radial-gradient(circle at 24% 88%, rgba(255,214,135,0.24), transparent 28rem)",
};

const sectionClass = "mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8";
const cardClass =
  "rounded-[26px] border border-[#ead9bd] bg-[#fffdf8]/92 p-6 shadow-[0_18px_48px_rgba(92,62,24,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(92,62,24,0.15)]";
const eyebrowClass = `${SEVA_SECTION_LABEL_CLASS} text-[#B96A22]`;
const headingClass = `${SEVA_SECTION_HEADING_CLASS} mt-2 leading-tight text-[#1D4F63]`;
const bodyClass = `${SEVA_BODY_TEXT_CLASS} text-[#5E5247]`;

const heroPrimaryButtonClass =
  "inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D89B2B] px-8 text-base font-black text-white shadow-[0_14px_30px_rgba(177,112,24,0.22)] transition hover:-translate-y-0.5 hover:bg-[#B97916]";
const heroSecondaryButtonClass =
  "inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/70 bg-white/10 px-8 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20";

export default memo(function GuidancePage() {
  usePageMeta(
    "Divine Guidance & Spiritual Remedies | Bhagwat Heritage",
    "Seek authentic spiritual guidance, astrology consultation, vastu guidance, and Vedic remedies under the divine direction of Sant Shri Manish Bhaiji Maharaj through Bhagwat Heritage Service Foundation Trust."
  );

  return (
    <main className="min-h-screen overflow-hidden text-[#2a2118]" style={pagePatternStyle}>
      <section className="relative -mx-6 -mt-12 overflow-hidden bg-[#fff8ef] pb-8 md:-mx-8">
        <div className="inner-hero relative min-h-[640px] overflow-hidden rounded-b-[40px] bg-cover bg-center shadow-[0_18px_40px_rgba(23,12,5,0.14)]">
          <img
            src={heroImageUrl}
            alt="Guidance hero banner"
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-end justify-center px-6 py-16 text-center md:px-8 md:py-20">
            <div className="w-full max-w-4xl px-2 py-4 text-white md:px-6 md:py-6">
              <h1 className="text-4xl font-bold leading-tight text-[#f9e6a8] md:text-5xl">Spiritual Guidance</h1>
              <p className="mt-5 text-[18px] font-semibold text-[#f7e0a0] sm:text-[24px] md:text-[34px]">Simple guidance, Deep transformation</p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a href="#guidance-categories" className={heroPrimaryButtonClass}>
                  Explore Guidance
                </a>
                <a href="#guidance-process" className={heroSecondaryButtonClass}>
                  View Process
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="divine-guidance-title">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <article className={cardClass}>
            <p className={eyebrowClass}>Divine Guidance Authority</p>
            <h2 id="divine-guidance-title" className={headingClass}>
              Guidance Under Divine Direction
            </h2>
            <p className={`${bodyClass} mt-5`}>
              All guidance and spiritual recommendations provided on this platform are offered under the divine guidance, blessings, and spiritual direction of Sant Shri Manish Bhaiji Maharaj.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Spiritually authentic", "Scripturally aligned", "Ethically grounded", "Focused on inner growth, peace, and dharmic living"].map((item) => (
                <div key={item} className="rounded-2xl border border-[#efdcbc] bg-[#fff8ea] px-4 py-3 text-base font-black text-[#5f4525]">
                  {item}
                </div>
              ))}
            </div>
            <p className={`mt-6 rounded-3xl bg-[#0f7b82]/10 p-5 font-bold text-[#24575b] ${SEVA_BODY_TEXT_CLASS}`}>
              This is not a commercial consultation service, but a sacred guidance system rooted in Bhagwat tradition and seva.
            </p>
          </article>
          <div className="grid gap-5">
            {authorityImages.map((image) => (
              <figure
                key={image.src}
                className="overflow-hidden rounded-[30px] border border-[#ead9bd] bg-white p-3 shadow-[0_18px_48px_rgba(92,62,24,0.12)]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-auto w-full rounded-[22px] object-contain object-center"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="clarity-title">
        <div className="mx-auto max-w-4xl text-center">
          <p className={eyebrowClass}>Introduction</p>
          <h2 id="clarity-title" className={headingClass}>
            From Life Challenges to Inner Clarity
          </h2>
          <p className={`${bodyClass} mt-5`}>
            Bhagwat Heritage Service Foundation Trust provides structured spiritual guidance to help individuals navigate life challenges through dharmic wisdom, disciplined sadhana, and positive transformation.
          </p>
          <p className={`${bodyClass} mt-4`}>
            The purpose is not to create dependency, fear, or blind belief, but to guide individuals towards clarity of mind, strength of faith, balance in life, and spiritual growth.
          </p>
        </div>
      </section>

      <section id="guidance-categories" className={sectionClass} aria-labelledby="categories-title">
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrowClass}>Guidance Categories</p>
          <h2 id="categories-title" className={headingClass}>
            Structured Guidance Paths
          </h2>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {guidanceCategories.map((category) => (
            <article key={category.title} className={cardClass}>
              <img src={category.icon} alt={`${category.title} guidance`} className="h-40 w-full rounded-2xl border border-[#ead9bd] object-cover" loading="lazy" />
              <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS} text-[#1D4F63]`}>
                <Link to={category.href} className="underline-offset-4 transition hover:text-[#c8751d] hover:underline">
                  {category.title}
                </Link>
              </h3>
              <ul className="mt-4 space-y-3">
                {category.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.href}
                      className="group flex gap-3 rounded-2xl border border-transparent p-2 transition hover:border-[#ead9bd] hover:bg-[#fff8ea]"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#e39b35]" />
                      <span className={`block underline-offset-4 transition group-hover:text-[#c8751d] group-hover:underline ${SEVA_BODY_TEXT_CLASS} font-black text-[#4f3d2c]`}>
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="guidance-process" className={sectionClass} aria-labelledby="process-title">
        <div className="grid overflow-hidden rounded-[32px] border border-[#ead9bd] bg-[#fffdf8] shadow-[0_20px_58px_rgba(92,62,24,0.12)] lg:grid-cols-[1fr_0.9fr]">
          <div className="p-6 md:p-9">
            <p className={eyebrowClass}>Process</p>
            <h2 id="process-title" className={headingClass}>
              From Concern to Clarity
            </h2>
            <ol className="mt-8 space-y-4">
              {processSteps.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-3xl border border-[#f0dfc4] bg-[#fff8ea] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f7b82] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <span className={`self-center font-black text-[#4f3d2c] ${SEVA_BODY_TEXT_CLASS}`}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="m-4 rounded-[24px] border border-[#E2CFAE] bg-[#F6EFE2] p-5 shadow-[0_14px_32px_rgba(101,71,35,0.10)] md:m-6 md:p-6">
            <p className="text-[25px] font-black uppercase tracking-[0.16em] text-[#B8741D]">Problem to Solution</p>
            <p className="mt-1 text-[40px] font-bold leading-none text-[#7B4E16]">मार्गदर्शन</p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#E2CFAE] bg-[#FFF8EA] p-2">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777143538/ChatGPT_Image_Apr_26_2026_12_28_42_AM_pmzh42.png"
                alt="Problem to solution guidance portrait"
                className="h-auto w-full rounded-xl object-cover object-center"
                loading="lazy"
              />
            </div>
            <ul className="mt-4 space-y-2 text-[30px] leading-none text-[#1D4F63]">
              <li>
                <Link to={ROUTES.digital.guidance} className={`${SEVA_BODY_TEXT_CLASS} text-[#1D4F63] hover:underline`}>
                  Seek Guidance
                </Link>
              </li>
              <li>
                <Link to={ROUTES.digital.store} className={`${SEVA_BODY_TEXT_CLASS} text-[#1D4F63] hover:underline`}>
                  Get Remedies
                </Link>
              </li>
              <li>
                <Link to={ROUTES.eventsKatha.spiritualEvents} className={`${SEVA_BODY_TEXT_CLASS} text-[#1D4F63] hover:underline`}>
                  Book Rituals
                </Link>
              </li>
            </ul>
            <Link
              to={ROUTES.digital.guidance}
              className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#C18A2B] px-6 text-base font-black text-[#1F3140] transition hover:bg-[#A8741F]"
            >
              Seek Guidance
            </Link>
          </aside>
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="trust-support-title">
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrowClass}>Available Through Trust</p>
          <h2 id="trust-support-title" className={headingClass}>
            Support Available Through the Trust
          </h2>
          <p className={`${bodyClass} mt-4`}>
            These supports are offered to assist sincere spiritual practices, rituals, and disciplined dharmic living.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustSupports.map((support) => (
            <div key={support.label} className="rounded-3xl border border-[#ead9bd] bg-white/82 p-5 text-center shadow-[0_14px_32px_rgba(92,62,24,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(92,62,24,0.12)]">
              <img
                src={support.icon}
                alt=""
                className="mx-auto h-[88px] w-[88px] rounded-full object-cover"
                loading="lazy"
                aria-hidden="true"
              />
              <p className={`mt-4 ${SEVA_CARD_TITLE_CLASS} text-[#1D4F63]`}>{support.label}</p>
              <p className={`mt-2 font-semibold text-[#6e5b46] ${SEVA_BODY_TEXT_CLASS}`}>Guidance support for sincere spiritual practice.</p>
            </div>
          ))}
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="ethics-title">
        <article className="rounded-[30px] border border-[#ead9bd] bg-[#fffdf8] p-6 shadow-[0_18px_48px_rgba(92,62,24,0.10)] md:p-8">
          <p className={eyebrowClass}>Ethical Foundation</p>
          <h2 id="ethics-title" className={headingClass}>
            Dharmic &amp; Ethical Guidance
          </h2>
          <p className={`${bodyClass} mt-5`}>
            This platform provides spiritual and dharmic guidance based on scriptural knowledge and disciplined practices.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-[#fff8ea] p-5">
              <h3 className={`${SEVA_CARD_TITLE_CLASS} text-[#1D4F63]`}>It does NOT promote:</h3>
              <ul className={`mt-3 space-y-2 font-semibold text-[#665646] ${SEVA_BODY_TEXT_CLASS}`}>
                {["Fear-based remedies", "Blind belief", "Superstition", "Guaranteed outcomes"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-[#eaf7f7] p-5">
              <h3 className={`${SEVA_CARD_TITLE_CLASS} text-[#1D4F63]`}>It is NOT a substitute for:</h3>
              <ul className={`mt-3 space-y-2 font-semibold text-[#665646] ${SEVA_BODY_TEXT_CLASS}`}>
                {["Medical advice", "Legal consultation", "Financial decision-making"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={`mt-6 font-bold text-[#4f3d2c] ${SEVA_BODY_TEXT_CLASS}`}>
            All guidance is meant to support inner growth, faith, and positive life direction.
          </p>
        </article>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-[#E2B45C] bg-gradient-to-r from-[#E8B54A] via-[#E2AF46] to-[#DFA93F] text-[#3E2C17] shadow-[0_22px_64px_rgba(151,95,20,0.24)]">
          <div className="relative max-w-3xl px-6 py-14 md:px-10 md:py-20">
            <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#AA5E14]`}>Need Divine Guidance?</p>
            <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-3 text-[#4A3422]`}>Need Divine Guidance?</h2>
            <p className={`mt-5 text-[#4E3A21] ${SEVA_BODY_TEXT_CLASS}`}>
              Take the first step towards clarity, peace, and spiritual strength through authentic guidance.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
});
