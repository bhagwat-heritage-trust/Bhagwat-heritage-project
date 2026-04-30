import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type ObjectiveCard = {
  icon: string;
  title: string;
  description: string;
  checklist: string[];
};

type PathwayStep = {
  icon: string;
  title: string;
};

const objectiveCards: ObjectiveCard[] = [
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536354/ChatGPT_Image_Apr_30_2026_01_32_28_PM_akdenf.png",
    title: "Spiritual Objectives",
    description: "Deepening devotion through Bhagwat-centered spiritual learning.",
    checklist: [
      "Spread teachings of Shrimad Bhagwat in a simple and practical way for all.",
      "Organize Bhagwat Katha and satsang for spiritual education.",
      "Guide individuals spiritually through hope, clarity, and purposeful living.",
      "Promote bhakti and connection with divine consciousness.",
      "Create spiritual learning platforms for continuous growth.",
    ],
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536352/ChatGPT_Image_Apr_30_2026_01_33_24_PM_oothr1.png",
    title: "Service Objectives",
    description: "Turning compassion into seva for those in need.",
    checklist: [
      "Annadaan and food donation for people in need.",
      "Gau Seva initiatives to protect and serve cows as a sacred responsibility.",
      "Emergency and disaster relief support during critical situations.",
      "Social welfare programs for deprived sections of society.",
      "Community service activities that encourage participation in seva.",
    ],
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777228826/ChatGPT_Image_Apr_27_2026_12_08_01_AM_w3dmqh.png",
    title: "Youth & Education Objectives",
    description: "Guiding the next generation with values, knowledge, discipline, and vision.",
    checklist: [
      "Value-based youth guidance and character building.",
      "Educational programs, workshops, and learning support.",
      "Moral and leadership development through responsibility, empathy, and courage.",
      "Cultural education in a modern and relatable way.",
      "Heritage awareness among children and youth.",
    ],
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_43_12_PM_ark4ok.png",
    title: "Cultural Objectives",
    description: "Preserving dharmic identity through culture, traditions, and festivals.",
    checklist: [
      "Preserve Indian culture, values, customs, and sacred expressions.",
      "Celebrate festivals spiritually with devotion and understanding.",
      "Organize cultural events for devotional and community participation.",
      "Pass traditions to the next generation in family and community life.",
      "Strengthen cultural identity through awareness and practice.",
    ],
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032975/ChatGPT_Image_Apr_24_2026_05_42_35_PM_hwotsz.png",
    title: "Community Objectives",
    description: "Building value-driven communities with unity and responsibility.",
    checklist: [
      "Promote unity among individuals, families, and communities.",
      "Encourage seva participation across age groups.",
      "Build responsible individuals and collective growth.",
      "Support community development through spiritual and social programs.",
      "Strengthen harmony through shared cultural and devotional platforms.",
    ],
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536354/ChatGPT_Image_Apr_30_2026_01_32_43_PM_sowddo.png",
    title: "Long-Term Goals",
    description: "Building a sustainable future of seva, spirituality, and cultural preservation.",
    checklist: [
      "Expand activities through wider seva programs.",
      "Build spiritual centers for worship, learning, and guidance.",
      "Create a global devotee network connected by a shared spiritual mission.",
      "Develop structured long-term programs for social impact.",
      "Establish scalable platforms for education, seva, culture, and digital outreach.",
    ],
  },
];

const pathwaySteps: PathwayStep[] = [
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536354/ChatGPT_Image_Apr_30_2026_01_32_28_PM_akdenf.png",
    title: "Spiritual Inspiration",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536353/ChatGPT_Image_Apr_30_2026_01_33_30_PM_bcivpo.png",
    title: "Structured Seva Planning",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536353/ChatGPT_Image_Apr_30_2026_01_33_16_PM_f7vnhz.png",
    title: "Community Participation",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536352/ChatGPT_Image_Apr_30_2026_01_33_04_PM_auxasy.png",
    title: "Measurable Social Impact",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default memo(function ObjectivesPage() {
  usePageMeta(
    "Objectives | Bhagwat Heritage Service Foundation Trust",
    "Explore the spiritual, social, educational, cultural, and community objectives of Bhagwat Heritage Service Foundation Trust.",
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff8ef_0%,#fffdf8_50%,#f7ede0_100%)] pb-16 text-[#1f4d5a]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_top,rgba(237,162,67,0.18),transparent_48%)]" />

      <motion.section variants={fadeUp} initial="hidden" animate="visible" className="mx-auto max-w-[1180px] px-4 pt-8">
        <div
          className="relative overflow-hidden rounded-[28px] border border-[#e3cda9]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,250,238,0.04) 0%, rgba(255,245,224,0.08) 46%, rgba(24,48,56,0.62) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1777545098/ChatGPT_Image_Apr_30_2026_04_01_28_PM_q5rq4m.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative mx-auto flex h-[380px] max-w-[1180px] items-end justify-center px-5 pb-8 text-center sm:h-[480px] sm:pb-10 lg:h-[620px] lg:pb-14">
            <div className="flex max-w-3xl flex-col items-center">
              <h1 className="text-3xl font-black leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl">
                Our Objectives
              </h1>
              <p className="mt-3 text-base font-semibold leading-7 text-[#fff4df] drop-shadow-[0_2px_8px_rgba(0,0,0,0.42)] sm:text-xl">
                Guided by faith, driven by service
              </p>
              <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Link
                  to={ROUTES.involved.volunteer}
                  className="w-full rounded-full bg-[#f28c20] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(167,82,12,0.30)] transition duration-300 hover:-translate-y-1 hover:bg-[#dd7411] sm:w-auto"
                >
                  Participate in Seva
                </Link>
                <Link
                  to={ROUTES.donate}
                  className="w-full rounded-full bg-[#c83f2d] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(156,44,30,0.32)] transition duration-300 hover:-translate-y-1 hover:bg-[#aa3022] sm:w-auto"
                >
                  Support Our Initiatives
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <main className="mx-auto max-w-[1180px] px-4 py-10 sm:py-14">
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-12 sm:mb-16">
          <div className="rounded-[24px] border border-[#e7d3b4] bg-[linear-gradient(120deg,#fff4df_0%,#fffdf8_66%,#f4ead8_100%)] p-6 shadow-[0_16px_32px_rgba(100,73,38,0.08)] sm:p-8">
            <div className="border-l-4 border-[#d9892f] pl-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c8771e]">Our Purpose</p>
              <h2 className="mt-3 text-2xl font-black text-[#1f4d5a] sm:text-3xl">Transforming values into spiritual and social action</h2>
              <p className="mt-4 text-[0.98rem] leading-8 text-[#544a3f]">
                The Trust exists to bridge spirituality with real-life action by transforming values into service. It aims to create a balanced society where inner peace, moral strength, cultural awareness, and social responsibility go hand in hand.
              </p>
              <p className="mt-4 text-[0.98rem] leading-8 text-[#544a3f]">
                Our purpose is not only to inspire devotion, but also to bring positive change through structured initiatives that uplift individuals, families, and communities.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {objectiveCards.map((card) => (
              <article
                key={card.title}
                className="group rounded-[26px] border border-[#ead7b9] bg-[linear-gradient(180deg,#fffdf9_0%,#fff8ef_100%)] p-6 shadow-[0_12px_26px_rgba(89,64,34,0.08)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex h-[86px] w-[86px] items-center justify-center overflow-hidden rounded-full shadow-[0_8px_18px_rgba(209,128,37,0.18)]">
                  <img src={card.icon} alt="" aria-hidden="true" className="h-full w-full rounded-full object-cover" />
                </div>
                <h2 className="mt-4 text-2xl font-black text-[#1f4d5a]">{card.title}</h2>
                <p className="mt-3 text-[0.97rem] leading-7 text-[#564c42]">{card.description}</p>
                <ul className="mt-5 space-y-3">
                  {card.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f7e6ca] text-[#c8771e]">
                        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                          <path d="M4 10.5L8 14.5L16 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-[0.93rem] leading-7 text-[#51463b]">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-12 sm:mb-16">
          <div className="rounded-[26px] border border-[#cfe2df] bg-[linear-gradient(180deg,#eaf5f4_0%,#fffdf8_100%)] p-6 shadow-[0_12px_28px_rgba(37,86,94,0.10)] sm:p-8">
            <h2 className="text-center text-2xl font-black text-[#1f4d5a] sm:text-3xl">How Our Objectives Become Action</h2>
            <div className="relative mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="pointer-events-none absolute left-0 right-0 top-[35px] hidden border-t-2 border-dotted border-[#b7d3cf] md:block" />
              {pathwaySteps.map((step) => (
                <article key={step.title} className="relative rounded-2xl border border-[#d5e6e4] bg-white p-5 text-center shadow-[0_8px_20px_rgba(30,75,82,0.08)]">
                  <span className="mx-auto inline-flex h-[78px] w-[78px] items-center justify-center overflow-hidden rounded-full shadow-[0_8px_18px_rgba(30,75,82,0.12)]">
                    <img src={step.icon} alt="" aria-hidden="true" className="h-full w-full rounded-full object-cover" />
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#1f4d5a]">{step.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <article className="rounded-[24px] border border-[#ead7b9] bg-white p-6 shadow-[0_10px_22px_rgba(89,64,34,0.08)]">
              <h2 className="text-2xl font-black text-[#1f4d5a]">Community Objectives</h2>
              <p className="mt-3 text-[0.97rem] leading-8 text-[#544a3f]">
                The Trust aims to build strong, value-driven communities by encouraging unity, cooperation, service, and collective growth.
              </p>
            </article>
            <article className="rounded-[24px] border border-[#d3e4e3] bg-[linear-gradient(180deg,#edf7f6_0%,#fffdf9_100%)] p-6 shadow-[0_10px_22px_rgba(34,84,92,0.09)]">
              <h2 className="text-2xl font-black text-[#1f4d5a]">Community Focus</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Promote unity", "Encourage seva participation", "Build responsible individuals", "Support community growth"].map((pill) => (
                  <span key={pill} className="rounded-full border border-[#c8dfdc] bg-white px-3 py-1.5 text-sm font-semibold text-[#245f71]">
                    {pill}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </motion.section>

        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div
            className="overflow-hidden rounded-[28px] border border-[#e8ceaa] bg-cover bg-center p-6 shadow-[0_14px_30px_rgba(118,82,39,0.11)] sm:p-8"
            style={{
              backgroundImage:
                "linear-gradient(115deg, rgba(255,244,211,0.96) 0%, rgba(255,236,169,0.9) 46%, rgba(245,184,73,0.78) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1777536354/ChatGPT_Image_Apr_30_2026_01_32_43_PM_sowddo.png')",
            }}
          >
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <h2 className="text-3xl font-black text-[#1f4d5a]">Join Our Mission</h2>
                <p className="mt-3 text-[0.98rem] leading-8 text-[#544a3f]">
                  Be a part of our mission to transform lives through devotion, service, education, and culture.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link to={ROUTES.involved.volunteer} aria-label="Participate in Seva" className="objective-btn-primary w-full text-center md:w-auto">
                  Participate in Seva
                </Link>
                <Link to={ROUTES.donate} aria-label="Support Our Initiatives" className="objective-btn-outline w-full text-center md:w-auto">
                  Support Our Initiatives
                </Link>
                <Link to={ROUTES.involved.contactUs} aria-label="Contact Us" className="objective-btn-outline w-full text-center md:w-auto">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <style>{`
        .objective-btn-primary {
          background: linear-gradient(180deg, #f0ae57 0%, #de8d31 100%);
          border: 1px solid #da872f;
          border-radius: 0.8rem;
          color: #fffdf8;
          font-size: 0.94rem;
          font-weight: 700;
          padding: 0.72rem 1.1rem;
          box-shadow: 0 12px 24px rgba(181, 111, 26, 0.2);
          transition: transform 220ms ease, filter 220ms ease;
        }
        .objective-btn-outline {
          background: #fffdf8;
          border: 1px solid #dfc39a;
          border-radius: 0.8rem;
          color: #1f4d5a;
          font-size: 0.94rem;
          font-weight: 700;
          padding: 0.72rem 1.1rem;
          transition: transform 220ms ease, background-color 220ms ease;
        }
        .objective-btn-primary:hover,
        .objective-btn-outline:hover {
          transform: translateY(-2px);
        }
        .objective-btn-outline:hover {
          background: #fff2dc;
        }
        .objective-btn-primary:focus-visible,
        .objective-btn-outline:focus-visible {
          outline: 3px solid #1f4d5a;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
});
