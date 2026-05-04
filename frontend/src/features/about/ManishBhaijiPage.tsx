import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";

type IconCard = {
  title: string;
  description: string;
  icon: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const CONTAINER_CLASS = "mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8";
const SECTION_CLASS = "py-8 md:py-12 lg:py-[72px]";
const EYEBROW_CLASS = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#7A4F16]";
const HEADING_CLASS = "mt-2 text-[14px] font-black leading-tight text-[#3F3123] md:text-[20px]";
const BODY_CLASS = "text-base font-medium leading-[1.75] text-[#6B5A48] md:text-lg";
const CARD_CLASS =
  "h-full rounded-[8px] border border-[#EBD7B7] bg-white/90 p-6 shadow-[0_18px_42px_rgba(116,73,20,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#D9A84F] hover:shadow-[0_22px_48px_rgba(116,73,20,0.12)]";

const primaryCtaClass =
  "inline-flex items-center justify-center rounded-[0.8rem] border border-[#DC8A2D] bg-[linear-gradient(180deg,#F0AE57_0%,#DF8E2F_100%)] px-4 py-[0.72rem] text-[0.95rem] font-extrabold text-[#FFFDF8] shadow-[0_12px_24px_rgba(181,111,26,0.22)] transition hover:-translate-y-0.5";

const secondaryCtaClass =
  "inline-flex items-center justify-center rounded-[0.8rem] border border-[#E4C79F] bg-[#FFFDF8] px-4 py-[0.72rem] text-[0.95rem] font-extrabold text-[#1F4D5A] shadow-[0_10px_22px_rgba(82,61,34,0.1)] transition hover:-translate-y-0.5 hover:bg-[#FFF3DE]";

const lightCtaClass =
  "inline-flex items-center justify-center rounded-[0.8rem] border border-white/70 bg-white/20 px-4 py-[0.72rem] text-[0.95rem] font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/30";

const identityCards: IconCard[] = [
  {
    title: "Bhagwat Katha Vakta",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741431/ChatGPT_Image_May_2_2026_10_28_43_PM_hy3fjv.png",
    description: "Sharing Shrimad Bhagwat wisdom with clarity, devotion, and practical direction for family life.",
  },
  {
    title: "Spiritual Guide",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741433/ChatGPT_Image_May_2_2026_10_28_48_PM_eqazqx.png",
    description: "Guiding devotees through bhakti, discipline, seva, and value-based living rooted in dharma.",
  },
  {
    title: "Cultural Inspirer",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741429/ChatGPT_Image_May_2_2026_10_28_54_PM_k12h85.png",
    description: "Awakening pride in Sanatan culture through satsang, sanskar, youth outreach, and public service.",
  },
];

const coreValues: IconCard[] = [
  {
    title: "Bhakti",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741432/ChatGPT_Image_May_2_2026_10_29_04_PM_twxbxt.png",
    description: "Devotion that softens the heart and steadies the mind.",
  },
  {
    title: "Seva",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741431/ChatGPT_Image_May_2_2026_10_29_09_PM_evneeu.png",
    description: "Service offered with humility, responsibility, and compassion.",
  },
  {
    title: "Sanskar",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741428/ChatGPT_Image_May_2_2026_10_29_16_PM_caqyha.png",
    description: "Values that shape speech, conduct, family, and society.",
  },
  {
    title: "Dharma",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741427/ChatGPT_Image_May_2_2026_10_29_25_PM_o9uxit.png",
    description: "Righteous living guided by truth, duty, and self-discipline.",
  },
  {
    title: "Harmony",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741425/ChatGPT_Image_May_2_2026_10_29_31_PM_fpfoo0.png",
    description: "Bringing people together through respect, faith, and shared purpose.",
  },
  {
    title: "Culture",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741422/ChatGPT_Image_May_2_2026_10_29_37_PM_covwam.png",
    description: "Preserving devotional heritage for children, youth, and families.",
  },
];

const trustRoles: IconCard[] = [
  {
    title: "Spiritual Direction",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741423/ChatGPT_Image_May_2_2026_10_29_45_PM_cug4db.png",
    description: "Providing the trust's dharmic vision, spiritual discipline, and devotional direction.",
  },
  {
    title: "Seva Inspiration",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741422/ChatGPT_Image_May_2_2026_10_29_51_PM_us94dj.png",
    description: "Inspiring volunteers, donors, and devotees to serve with sincerity and care.",
  },
  {
    title: "Cultural Mission",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741422/ChatGPT_Image_May_2_2026_10_30_15_PM_vf7a41.png",
    description: "Strengthening Sanatan heritage through programs, festivals, Katha, and sanskar work.",
  },
  {
    title: "Public Guidance",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741421/ChatGPT_Image_May_2_2026_10_30_23_PM_h1y7jd.png",
    description: "Offering guidance to families, youth, seekers, and society through public discourses.",
  },
];

const guidanceAreas: IconCard[] = [
  {
    title: "Family Guidance",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741421/ChatGPT_Image_May_2_2026_10_30_23_PM_h1y7jd.png",
    description: "Support for harmony, responsibility, and dharmic family living.",
  },
  {
    title: "Youth Sanskar",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741428/ChatGPT_Image_May_2_2026_10_29_16_PM_caqyha.png",
    description: "Helping young minds connect with discipline, culture, and purpose.",
  },
  {
    title: "Spiritual Light",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741423/ChatGPT_Image_May_2_2026_10_29_45_PM_cug4db.png",
    description: "Guidance for seekers walking toward devotion and inner clarity.",
  },
  {
    title: "Addiction-Free Life",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776862945/alchohal_sr2sm9.png",
    description: "Encouraging self-control, healing, and positive social renewal.",
  },
  {
    title: "Social Harmony",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777741425/ChatGPT_Image_May_2_2026_10_29_31_PM_fpfoo0.png",
    description: "Building unity through satsang, service, and shared values.",
  },
  {
    title: "Education Values",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777215185/ChatGPT_Image_Apr_26_2026_08_21_16_PM_y3jdht.png",
    description: "Connecting learning with character, humility, and responsibility.",
  },
];

type OutreachTab = {
  id: string;
  title: string;
  description: string;
  items: string[];
  buttons: { label: string; to: string }[];
  icon: string;
  image: string;
};

const kathaPoints = ["Shrimad Bhagwat Katha", "Bhakti & Dharma", "Family & Youth Guidance", "Social Harmony"];

const lifeJourneyItems = [
  {
    title: "Early Life",
    text: "Rooted in devotion, discipline and cultural values from the beginning.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893139/WhatsApp_Image_2026-05-04_at_4.39.07_PM_un5kmt.jpg",
  },
  {
    title: "Spiritual Awakening",
    text: "A deeper inner call toward Bhagwat, bhakti, seva and dharma.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893138/WhatsApp_Image_2026-05-04_at_4.39.08_PM_1_ox5w5g.jpg",
  },
  {
    title: "Guru Influence",
    text: "Inspired by the grace, wisdom and guidance of the Guru tradition.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893138/WhatsApp_Image_2026-05-04_at_4.39.09_PM_fkea39.jpg",
  },
  {
    title: "Turning Points",
    text: "Public pravachan, Bhagwat Katha and social guidance became a mission.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893987/WhatsApp_Image_2026-05-04_at_4.55.21_PM_x0u3g9.jpg",
  },
  {
    title: "Establishment of Trust",
    text: "Bhagwat Heritage Service Foundation Trust emerged as a seva, sanskar and cultural mission.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893137/WhatsApp_Image_2026-05-04_at_4.39.10_PM_oj7kxp.jpg",
  },
];

const teachingsCards: IconCard[] = [
  {
    title: "Bhagwat-Based Living",
    description: "Living with scripture, devotion and daily discipline as the center of life.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777895048/WhatsApp_Image_2026-05-04_at_5.11.57_PM_ezegnp.jpg",
  },
  {
    title: "Seva as Devotion",
    description: "Service becomes sacred when offered with humility, care, and pure intention.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893137/WhatsApp_Image_2026-05-04_at_4.39.13_PM_1_s484xk.jpg",
  },
  {
    title: "Sanskar-Based Society",
    description: "A culture rooted in values, manners and spiritual discipline transforms families.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893137/WhatsApp_Image_2026-05-04_at_4.39.13_PM_2_p5g2ku.jpg",
  },
  {
    title: "Youth Transformation",
    description: "Young hearts guided by dharma become the future bearers of social change.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893136/WhatsApp_Image_2026-05-04_at_4.39.14_PM_gsnvqu.jpg",
  },
];

const teachingQuotes = [
  "Bhagwat is not only to be heard; it is to be lived.",
  "Seva becomes worship when it is performed with humility.",
  "Sanskar is the foundation of a strong family and society.",
  "Youth power becomes divine power when guided by dharma.",
  "True devotion expresses itself through compassion.",
  "Spirituality is the art of transforming life from within.",
  "A society rooted in values becomes a society rooted in peace.",
];

const outreachTabs: OutreachTab[] = [
  {
    id: "katha",
    title: "Bhagwat / Ram Katha",
    description: "Major devotional kathas for communities, temples and educational gatherings.",
    items: ["Bhagwat Katha Mahotsav", "Ram Katha Pravachan", "Bhajan Sandhya"],
    buttons: [
      { label: "View Upcoming Kathas", to: ROUTES.eventsKatha.index },
      { label: "Organize Katha in Your City", to: ROUTES.involved.contactUs },
    ],
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777895048/WhatsApp_Image_2026-05-04_at_5.11.57_PM_ezegnp.jpg",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893136/WhatsApp_Image_2026-05-04_at_4.39.14_PM_1_bxvgu3.jpg",
  },
  {
    id: "guidance",
    title: "Spiritual & Life Guidance Sessions",
    description: "Personal guidance, family support and youth counseling rooted in Bhakti wisdom.",
    items: ["Spiritual Pravachan", "जीवन मार्गदर्शन", "Family & Youth Counseling"],
    buttons: [{ label: "Book Guidance Session", to: ROUTES.digital.guidance }],
    icon: "/icons/icon-life-guidance.svg",
    image: "/images/invite-maharajji-booking.jpg",
  },
  {
    id: "workshops",
    title: "Workshops & Seminars",
    description: "School, college, university and corporate sessions for values, leadership and awakening.",
    items: ["Stress Management", "Value-Based Living", "Spiritual Leadership", "Youth Awakening"],
    buttons: [
      { label: "Invite Maharaj Ji for Seminar", to: "/get-involved/invite-maharaj-ji" },
      { label: "Request Workshop", to: "/get-involved/invite-maharaj-ji" },
    ],
    icon: "/icons/icon-school-seminar.svg",
    image: "/images/discourses-workshops-outreach.jpg",
  },
  {
    id: "booking",
    title: "Booking / Invitation System",
    description: "Invite the Maharaj Ji team for Katha, satsang, workshops and guided sessions.",
    items: ["Katha", "Seminar", "Workshop", "Satsang"],
    buttons: [{ label: "Open Invitation Form", to: "/get-involved/invite-maharaj-ji" }],
    icon: "/icons/icon-booking-form.svg",
    image: "/images/invite-maharajji-booking.jpg",
  },
];

const impactCounters = [
  { value: "120+", title: "Katha Events", description: "Devotional programs that inspire communities." },
  { value: "65+", title: "Guidance Sessions", description: "Family, youth and spiritual support meetings." },
  { value: "45+", title: "School & Campus Workshops", description: "Values-based sessions for future generations." },
  { value: "18+", title: "Awards & Recognition", description: "Spiritual authority acknowledged by the wider community." },
];

const mediaPresenceCards = [
  {
    title: "Press Coverage",
    description: "Articles and mentions highlighting Maharaj Ji's Katha, outreach and community mission.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893136/WhatsApp_Image_2026-05-04_at_4.39.14_PM_3_fbzlia.jpg",
  },
  {
    title: "Awards & Recognition",
    description: "Honors and citations that reinforce trust credibility and cultural leadership.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893136/WhatsApp_Image_2026-05-04_at_4.39.15_PM_gq4rrb.jpg",
  },
  {
    title: "Public Events",
    description: "Large satsang, Katha and trust programs attended by families, youth and devotees.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893136/WhatsApp_Image_2026-05-04_at_4.39.15_PM_1_kq33fx.jpg",
  },
  {
    title: "Spiritual Presence",
    description: "A growing presence across devotional platforms, occasions and cultural forums.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777893136/WhatsApp_Image_2026-05-04_at_4.39.15_PM_2_nnyqom.jpg",
  },
];

const galleryImages = [
  {
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1777746925/ChatGPT_Image_May_3_2026_12_04_43_AM_mkklk0.png",
    alt: "Devotional Katha gathering with scripture and lamps",
  },
  {
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1777746926/ChatGPT_Image_May_3_2026_12_04_33_AM_s7cuub.png",
    alt: "Sacred Bhagwat and Krishna teaching artwork",
  },
  {
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1777746927/ChatGPT_Image_May_3_2026_12_04_24_AM_h6jjnx.png",
    alt: "Seva meal distribution inspired by Maharaj Ji",
  },
  {
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1777746925/ChatGPT_Image_May_3_2026_12_04_53_AM_fv8cnu.png",
    alt: "Cultural devotional moment from Bhagwat Heritage mission",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Who is Sant Shri Manish Bhaiji Maharaj?",
    answer:
      "Sant Shri Manish Bhaiji Maharaj is a spiritual guide, Bhagwat scholar, Katha speaker, and the guiding inspiration behind Bhagwat Heritage Service Foundation Trust.",
  },
  {
    question: "Can Maharaj Ji be invited for Bhagwat Katha?",
    answer:
      "Yes. Devotees, families, temples, and community groups can contact the trust to request Bhagwat Katha, satsang, or pravachan coordination.",
  },
  {
    question: "What themes are covered in his pravachan?",
    answer:
      "His guidance commonly centers on Shrimad Bhagwat, bhakti, dharma, family values, youth sanskar, social harmony, and seva-based living.",
  },
  {
    question: "How is Maharaj Ji connected with the trust?",
    answer:
      "He provides spiritual direction, devotional inspiration, cultural vision, and public guidance for the trust's seva and sanskar mission.",
  },
  {
    question: "How can I join the seva mission?",
    answer:
      "You can connect with the trust through volunteer, donation, sponsor, or contact routes and participate according to your time, capacity, and sankalp.",
  },
];

function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={EYEBROW_CLASS}>{eyebrow}</p>
      <h2 className={HEADING_CLASS}>{title}</h2>
      {intro ? <p className={`mt-4 ${BODY_CLASS}`}>{intro}</p> : null}
    </div>
  );
}

function IconCard({
  item,
  compact = false,
  circularIcon = false,
}: {
  item: IconCard;
  compact?: boolean;
  circularIcon?: boolean;
}) {
  return (
    <article className={`${CARD_CLASS} ${compact ? "p-5" : ""} ${circularIcon ? "text-center" : ""}`}>
      {circularIcon ? (
        <img
          src={item.icon}
          alt=""
          loading="lazy"
          className="mx-auto h-[78px] w-[78px] rounded-full object-cover"
        />
      ) : (
        <img src={item.icon} alt="" loading="lazy" className="h-16 w-16 object-contain" />
      )}
      <h3 className="mt-5 text-xl font-bold leading-tight text-[#1F4D5A]">{item.title}</h3>
      <p className="mt-3 text-base font-medium leading-[1.75] text-[#6B5A48] md:text-lg">{item.description}</p>
    </article>
  );
}

function LifeJourneyTimeline() {
  return (
    <section className={`${SECTION_CLASS} bg-[#FFFDF8]`}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Life Journey Timeline" title="Life Journey & Spiritual Path" align="left" />
        <div className="mt-10 space-y-8">
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute left-1/2 top-6 h-[calc(100%-3rem)] w-1 -translate-x-1/2 rounded-full bg-[#D8A43F]/15" />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                {lifeJourneyItems.map((item, index) => (
                  <div key={item.title} className="relative rounded-[20px] border border-[#E8D9BD] bg-white p-8 text-center shadow-[0_14px_34px_rgba(111,78,25,0.08)]">
                    <span className="mx-auto inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#FFF3DA] shadow-[0_8px_16px_rgba(216,164,63,0.12)]">
                      <img src={item.icon} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-[#1F4D5A]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#6B5A48]">{item.text}</p>
                    {index < lifeJourneyItems.length - 1 ? (
                      <span className="pointer-events-none absolute right-[-1.5rem] top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-[#D8A43F] lg:inline-flex" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4 lg:hidden">
            {lifeJourneyItems.map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-[20px] border border-[#E8D9BD] bg-white p-5 shadow-[0_14px_34px_rgba(111,78,25,0.08)]">
                <span className="mt-1 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#FFF3DA] shadow-[0_8px_16px_rgba(216,164,63,0.12)]">
                  <img src={item.icon} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#1F4D5A]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6B5A48]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-[16px] border border-[#E8D9BD] bg-white shadow-[0_18px_42px_rgba(116,73,20,0.08)]">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1777893137/WhatsApp_Image_2026-05-04_at_4.39.10_PM_1_buqgb0.jpg"
              alt="Founder life journey timeline"
              className="h-[320px] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TeachingsCorePhilosophy() {
  return (
    <section className={SECTION_CLASS}>
      <div className={CONTAINER_CLASS}>
        <SectionHeader eyebrow="Teachings & Core Philosophy" title="Teachings & Core Philosophy" align="left" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {teachingsCards.map((item) => (
              <IconCard key={item.title} item={item} compact circularIcon />
            ))}
          </div>
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[20px] border border-[#E8D9BD] bg-white shadow-[0_18px_42px_rgba(116,73,20,0.08)]">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777893137/WhatsApp_Image_2026-05-04_at_4.39.14_PM_2_dyboov.jpg"
                alt="Teachings and core philosophy imagery"
                className="h-[320px] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-[20px] border border-[#E8D9BD] bg-[#FFF8E5] p-6 shadow-[0_18px_42px_rgba(116,73,20,0.08)]">
              <h3 className="text-xl font-bold text-[#1F4D5A]">Shareable Quotes</h3>
              <div className="mt-5 space-y-3 text-sm leading-6 text-[#6B5A48]">
                {teachingQuotes.map((quote) => (
                  <p key={quote} className="rounded-[14px] border border-[#F0D8AF] bg-white/80 p-4">“{quote}”</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscoursesOutreachSection({ activeTab, onTabChange }: { activeTab: string; onTabChange: (id: string) => void }) {
  const currentTab = outreachTabs.find((tab) => tab.id === activeTab) ?? outreachTabs[0];
  return (
    <section className={`${SECTION_CLASS} bg-[#FFFDF8]`}>
      <div className={CONTAINER_CLASS}>
        <SectionHeader eyebrow="Discourses, Workshops & Outreach" title="Discourses, Workshops & Outreach" align="left" />
        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap gap-3">
            {outreachTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  activeTab === tab.id
                    ? "border-[#DC8A2D] bg-[#FBE4AF] text-[#7A4F16]"
                    : "border-[#E9D4A5] bg-white text-[#4D4D4D] hover:border-[#DC8A2D]"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[24px] border border-[#E8D9BD] bg-white p-6 shadow-[0_18px_42px_rgba(116,73,20,0.08)]">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF3DA] shadow-[0_8px_16px_rgba(216,164,63,0.12)]">
                  <img src={currentTab.icon} alt="" className="h-6 w-6" loading="lazy" />
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-[#1F4D5A]">{currentTab.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6B5A48]">{currentTab.description}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#6B5A48]">
                {currentTab.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-[14px] border border-[#F1E1C4] bg-[#FFFAF1] p-4">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#D8A43F]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                {currentTab.buttons.map((button) => (
                  <Link key={button.label} to={button.to} className={secondaryCtaClass}>
                    {button.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <div className="overflow-hidden rounded-[24px] border border-[#E8D9BD] bg-white shadow-[0_18px_42px_rgba(116,73,20,0.08)]">
                <img
                  src={currentTab.image}
                  alt="Discourses and outreach"
                  className="h-[320px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-[24px] border border-[#E8D9BD] bg-[#FFF8E5] p-6 shadow-[0_18px_42px_rgba(116,73,20,0.08)]">
                <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#FFF3DA] shadow-[0_8px_16px_rgba(216,164,63,0.12)]">
                  <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777804759/WhatsApp_Image_2026-05-03_at_4.08.24_PM_rpoyeu.jpg" alt="Invite Maharaj Ji" className="h-full w-full object-cover" loading="lazy" />
                  </span>
                  <h3 className="text-2xl font-bold text-[#1F4D5A]">Invite Maharaj Ji</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#6B5A48]">
                  Request the invitation form for Katha, seminar, workshop or satsang. The trust team will respond with availability and guidance.
                </p>
                <Link to="/get-involved/invite-maharaj-ji" className={`${primaryCtaClass} mt-6 inline-flex`}>
                  Open Invitation Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactCounters() {
  return (
    <section className={SECTION_CLASS}>
      <div className={CONTAINER_CLASS}>
        <SectionHeader eyebrow="Impact Counters" title="Key Trust Impact Metrics" align="left" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {impactCounters.map((stat) => (
            <article key={stat.title} className="rounded-[20px] border border-[#E8D9BD] bg-white p-6 text-center shadow-[0_18px_42px_rgba(116,73,20,0.08)]">
              <p className="text-4xl font-black text-[#1F4D5A]">{stat.value}</p>
              <h3 className="mt-4 text-lg font-bold text-[#1F4D5A]">{stat.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B5A48]">{stat.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaPresenceSection() {
  return (
    <section className={`${SECTION_CLASS} bg-[#FFFDF8]`}>
      <div className={CONTAINER_CLASS}>
        <SectionHeader eyebrow="Media & Presence" title="Media & Presence" align="left" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {mediaPresenceCards.map((item) => (
              <IconCard key={item.title} item={item} compact circularIcon />
            ))}
          </div>
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[20px] border border-[#E8D9BD] bg-white shadow-[0_18px_42px_rgba(116,73,20,0.08)]">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777895983/WhatsApp_Image_2026-05-04_at_5.28.49_PM_pwsknl.jpg"
                alt="Media and awards presence of Maharaj Ji"
                className="h-[260px] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-[20px] border border-[#E8D9BD] bg-white shadow-[0_18px_42px_rgba(116,73,20,0.08)]">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777895982/WhatsApp_Image_2026-05-04_at_5.28.51_PM_x6nbqf.jpg"
                alt="Additional Maharaj Ji media presence image"
                className="h-[180px] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-[20px] border border-[#E8D9BD] bg-white shadow-[0_18px_42px_rgba(116,73,20,0.08)]">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777895982/WhatsApp_Image_2026-05-04_at_5.28.50_PM_lrwxdl.jpg"
                alt="Additional Maharaj Ji media presence image 2"
                className="h-[180px] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(function ManishBhaijiPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeOutreachTab, setActiveOutreachTab] = useState("katha");

  useEffect(() => {
    document.title = "Sant Shri Manish Bhaiji Maharaj | Bhagwat Heritage";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Spiritual guide and Bhagwat Katha speaker inspiring seva, sanskar and dharma."
    );
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#FFF8EC] font-['Poppins'] text-[#1F4D5A]">
      <section
        className="relative overflow-hidden bg-[#F8D39A] bg-cover bg-[position:34%_center] md:bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(248,211,154,0.08) 0%, rgba(248,211,154,0.08) 42%, rgba(255,247,232,0.72) 60%, rgba(255,252,246,0.94) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1777741439/ChatGPT_Image_May_2_2026_10_28_15_PM_tjfxf2.png')",
        }}
      >
        <div className={`${CONTAINER_CLASS} relative py-10 md:py-14 lg:py-[92px]`}>
          <div className="grid min-h-[560px] grid-cols-1 items-center lg:grid-cols-[0.9fr_1.1fr]">
            <div className="hidden lg:block" aria-hidden="true" />
            <div className="rounded-[8px] bg-[#FFF7E8]/80 p-5 shadow-[0_22px_55px_rgba(94,50,16,0.12)] backdrop-blur-sm md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-0">
              <p className="inline-flex rounded-full border border-white/60 bg-white/30 px-4 py-2 text-[24px] font-semibold uppercase tracking-[0.18em] text-[#7A4F16] backdrop-blur">
                Founder and Spiritual Inspiration
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-[#1F4D5A] md:text-5xl">
                Sant Shri Manish Bhaiji Maharaj
              </h1>
              <p className="mt-5 text-[18px] font-semibold leading-tight text-[#7A4F16] sm:text-[24px] md:text-[34px]">
                Spiritual Guide | Bhagwat Scholar | Katha Speaker | Social Reformer
              </p>
              <p className={`mt-5 max-w-2xl ${BODY_CLASS}`}>
                Sant Shri Manish Bhaiji Maharaj is the spiritual inspiration behind Bhagwat Heritage Service Foundation
                Trust, guiding society through Bhagwat Katha, seva, sanskar and cultural awakening.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to={`${ROUTES.involved.contactUs}#invite-maharaj`} className={primaryCtaClass}>
                  Invite for Bhagwat Katha
                </Link>
                <Link to={ROUTES.digital.satsang} className={secondaryCtaClass}>
                  Watch Pravachan
                </Link>
                <Link to={ROUTES.seva.index} className={secondaryCtaClass}>
                  Join Seva Mission
                </Link>
                <Link to={ROUTES.involved.donor} className={secondaryCtaClass}>
                  Donate Now
                </Link>
                <Link to={ROUTES.digital.guidance} className={secondaryCtaClass}>
                  Seek Guidance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            eyebrow="Spiritual Identity"
            title="A life dedicated to Katha, guidance, and cultural awakening"
          />
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {identityCards.map((item) => (
              <IconCard key={item.title} item={item} circularIcon />
            ))}
          </div>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-[#FFFDF8]`}>
        <div className={CONTAINER_CLASS}>
          <div>
            <SectionHeader eyebrow="About Maharaj Ji" title="A devotional voice for faith, family, and society" align="left" />
            <div className={`mt-5 space-y-4 ${BODY_CLASS}`}>
              <p>
                Sant Shri Manish Bhaiji Maharaj has devoted his spiritual journey to bringing the message of Shrimad
                Bhagwat into the lives of families, youth, devotees, and seekers. His pravachan style is rooted in
                scripture yet deeply connected with everyday life, helping listeners understand bhakti, dharma,
                responsibility, and inner transformation.
              </p>
              <p>
                Through Bhagwat Katha, satsang, social guidance, and seva inspiration, he encourages society to live
                with compassion, discipline, cultural pride, and service. His direction continues to shape the trust's
                mission of spiritual upliftment, sanskar education, and humanitarian support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LifeJourneyTimeline />

      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="lg:order-2">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777741438/ChatGPT_Image_May_2_2026_10_28_33_PM_okkazf.png"
                alt="Bhagwat Katha discourse with devotees"
                className="h-[300px] w-full rounded-[8px] object-cover shadow-[0_22px_56px_rgba(93,55,18,0.14)] md:h-[420px]"
                loading="lazy"
              />
            </div>
            <div className="lg:order-1">
              <SectionHeader eyebrow="Bhagwat Katha" title="Scripture made living through devotion and clarity" align="left" />
              <p className={`mt-5 ${BODY_CLASS}`}>
                Maharaj Ji's Katha connects sacred narration with personal reflection, family values, and social
                responsibility. Every discourse is designed to awaken devotion while giving practical direction for a
                balanced and dharmic life.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {kathaPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3 rounded-[8px] border border-[#EBD7B7] bg-white px-4 py-3 text-base font-bold leading-[1.75] text-[#1F4D5A]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D8A43F]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <TeachingsCorePhilosophy />

      <section className={`${SECTION_CLASS} bg-[linear-gradient(180deg,#FFFDF8_0%,#FFF1DA_100%)]`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader eyebrow="Core Values" title="The values that guide the mission" />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((item) => (
              <IconCard key={item.title} item={item} compact circularIcon />
            ))}
          </div>
        </div>
      </section>

      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            eyebrow="Role in Trust"
            title="Spiritual leadership behind Bhagwat Heritage Service Foundation Trust"
          />
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {trustRoles.map((item) => (
              <IconCard key={item.title} item={item} compact circularIcon />
            ))}
          </div>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-[#FFFDF8]`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader eyebrow="Guidance Areas" title="Guidance for families, youth, seekers, and society" />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guidanceAreas.map((item) => (
              <IconCard key={item.title} item={item} compact circularIcon />
            ))}
          </div>
        </div>
      </section>

      <DiscoursesOutreachSection activeTab={activeOutreachTab} onTabChange={setActiveOutreachTab} />
      <ImpactCounters />

      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader eyebrow="Gallery" title="Moments of Katha, satsang, seva, and culture" />
          <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
            <div className="flex min-w-full gap-4">
              {galleryImages.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-[220px] w-[78vw] shrink-0 rounded-[8px] object-cover shadow-[0_18px_44px_rgba(93,55,18,0.13)] sm:w-[360px] md:h-[280px]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <MediaPresenceSection />

      <section className="px-4 py-8 md:px-6 md:py-12 lg:py-[72px]">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[8px] bg-[linear-gradient(135deg,#FFF8D8_0%,#FFD86B_42%,#F2A91F_100%)] shadow-[0_26px_70px_rgba(186,116,16,0.2)]">
          <div className="max-w-3xl px-6 py-10 md:px-10 md:py-14">
            <p className={EYEBROW_CLASS}>Invite Maharaj Ji</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[#1F3550] md:text-4xl">
              Invite Sant Shri Manish Bhaiji Maharaj
            </h2>
            <p className={`mt-4 ${BODY_CLASS}`}>
              Request Bhagwat Katha, pravachan, satsang, or spiritual guidance through the official trust channel.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to={`${ROUTES.involved.contactUs}#invite-maharaj`} className={primaryCtaClass}>
                Request Katha
              </Link>
              <Link to={`${ROUTES.involved.contactUs}#invite-maharaj`} className={secondaryCtaClass}>
                Contact Trust
              </Link>
              <Link to={ROUTES.media.videos} className={secondaryCtaClass}>
                Watch Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-[#FFFDF8]`}>
        <div className={`${CONTAINER_CLASS} max-w-[940px]`}>
          <SectionHeader eyebrow="FAQ" title="Common questions about Maharaj Ji and the trust mission" />
          <div className="mt-8 space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <article key={item.question} className="overflow-hidden rounded-[8px] border border-[#EBD7B7] bg-white shadow-[0_12px_28px_rgba(116,73,20,0.06)]">
                  <h3>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      aria-controls={`founder-faq-${index}`}
                    >
                      <span className="text-base font-bold leading-[1.75] text-[#1F4D5A] md:text-lg">{item.question}</span>
                      <span className="text-2xl font-bold text-[#C8771E]" aria-hidden="true">
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div id={`founder-faq-${index}`} className={isOpen ? "px-5 pb-5" : "hidden"}>
                    <p className={BODY_CLASS}>{item.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#FFF7E8_0%,#FFE5B2_100%)] px-4 py-10 text-center md:px-6 md:py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#D8A43F]/25 blur-3xl" />
        <blockquote className="relative mx-auto max-w-3xl">
          <p className="text-3xl font-black leading-tight text-[#1F3550] md:text-4xl">
            &ldquo;Bhagwat Katha is not only a narration,<br className="hidden sm:block" />
            it is transformation of life.&rdquo;
          </p>
        </blockquote>
      </section>
    </div>
  );
});
