import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { MISSION_BODY_TEXT_CLASS, MISSION_SECTION_HEADING_CLASS, MISSION_SECTION_LABEL_CLASS } from "../mission/missionTypography";

type SmartImageProps = Omit<React.ComponentPropsWithoutRef<"img">, "src"> & {
  src: string;
  fallbackSrc: string;
};

function SmartImage({ src, fallbackSrc, onError, ...rest }: SmartImageProps) {
  const [activeSrc, setActiveSrc] = useState(src);

  useEffect(() => {
    setActiveSrc(src);
  }, [src]);

  return (
    <img
      {...rest}
      src={activeSrc}
      onError={(event) => {
        if (activeSrc !== fallbackSrc) setActiveSrc(fallbackSrc);
        onError?.(event);
      }}
    />
  );
}

type IconImageProps = {
  src: string;
  className?: string;
  alt?: string;
};

function IconImage({ src, className, alt = "" }: IconImageProps) {
  const mergedClassName = ["block rounded-full", className].filter(Boolean).join(" ");
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={mergedClassName}
      aria-hidden={alt === "" ? true : undefined}
    />
  );
}

const ICON_IMAGES = {
  liveKatha: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029123/ChatGPT_Image_Apr_24_2026_04_38_23_PM_byafpi.png",
  volunteerSeva: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029121/ChatGPT_Image_Apr_24_2026_04_38_32_PM_df6qd9.png",
  devoteeSeating: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029120/ChatGPT_Image_Apr_24_2026_04_39_20_PM_qpaa5w.png",
  broadcastReach: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029120/ChatGPT_Image_Apr_24_2026_04_38_45_PM_xsljmo.png",
  scriptureDiscourse: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029120/ChatGPT_Image_Apr_24_2026_04_38_51_PM_nywxnm.png",
  sevaManagement: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029120/ChatGPT_Image_Apr_24_2026_04_38_38_PM_osc8vl.png",
  digitalReach: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029120/ChatGPT_Image_Apr_24_2026_04_39_35_PM_lyi1ew.png",
  bhajan: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029119/ChatGPT_Image_Apr_24_2026_04_39_27_PM_e5yys0.png",
  aarti: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029119/ChatGPT_Image_Apr_24_2026_04_39_43_PM_aunq5b.png",
  prasadam: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029119/ChatGPT_Image_Apr_24_2026_04_39_51_PM_qpyajs.png",
  sponsor: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029119/ChatGPT_Image_Apr_24_2026_04_39_58_PM_h8p3fr.png",
  schedule: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029118/ChatGPT_Image_Apr_24_2026_04_40_10_PM_bsvglr.png",
  livestream: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029118/ChatGPT_Image_Apr_24_2026_04_40_04_PM_tyhxg7.png",
  faq: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029118/ChatGPT_Image_Apr_24_2026_04_40_20_PM_toolfd.png",
} as const;

export const BhagwatKathaMahotsavPremiumPage = memo(function BhagwatKathaMahotsavPremiumPage() {
  usePageMeta(
    "Bhagwat Katha Mahotsav",
    "Bhagwat Katha Mahotsav — Shri Bhagwat Katha, satsang, seva, hospitality, and online access for distant devotees.",
  );

  const images = {
    hero: "https://res.cloudinary.com/der8zinu8/image/upload/v1777025581/ChatGPT_Image_Apr_24_2026_03_38_59_PM_joce1w.png",
    about: "https://res.cloudinary.com/der8zinu8/image/upload/v1777025579/ChatGPT_Image_Apr_24_2026_03_38_45_PM_om4yrp.png",
    galleryStage: "https://res.cloudinary.com/der8zinu8/image/upload/v1777025579/ChatGPT_Image_Apr_24_2026_03_38_45_PM_om4yrp.png",
    galleryGathering: "https://res.cloudinary.com/der8zinu8/image/upload/v1777025581/ChatGPT_Image_Apr_24_2026_03_38_51_PM_jpzaqg.png",
    galleryPrasadam: "https://res.cloudinary.com/der8zinu8/image/upload/v1777025581/ChatGPT_Image_Apr_24_2026_03_38_31_PM_wxwt8k.png",
    cta: "/images/katha-cta-banner.jpg",
  } as const;

  const imageFallbacks = {
    hero: "/images/kathapravachan.png",
    about: "/images/kathapravachan.png",
    galleryStage: "/images/kathapravachan.png",
    galleryGathering: "/images/kathapravachan.png",
    galleryPrasadam: "/images/annseva.png",
    cta: "/images/spiritual1.png",
  } as const;

  const impactCards = [
    {
      title: "Live Katha Days",
      desc: "Structured discourse, darshan, bhajan and devotional programming.",
      iconSrc: ICON_IMAGES.liveKatha,
    },
    {
      title: "Seva Volunteers",
      desc: "Hospitality, seating, prasadam, sound, stage and logistics support.",
      iconSrc: ICON_IMAGES.volunteerSeva,
    },
    {
      title: "Devotee Seating",
      desc: "Disciplined sitting arrangement for families, elders and visiting devotees.",
      iconSrc: ICON_IMAGES.devoteeSeating,
    },
    {
      title: "Broadcast Reach",
      desc: "Livestream and digital access for distant devotees and families.",
      iconSrc: ICON_IMAGES.broadcastReach,
    },
  ] as const;

  const aboutFeatures = [
    {
      title: "Scriptural Discourse",
      desc: "Daily Bhagwat Katha sessions with spiritual explanation and devotional reflection.",
      iconSrc: ICON_IMAGES.scriptureDiscourse,
    },
    {
      title: "Integrated Seva Management",
      desc: "Volunteer coordination for reception, prasadam, seating, water, stage and discipline.",
      iconSrc: ICON_IMAGES.sevaManagement,
    },
    {
      title: "Digital and On-Ground Reach",
      desc: "Livestream, announcements, recordings and remote devotee participation.",
      iconSrc: ICON_IMAGES.digitalReach,
    },
  ] as const;

  const experienceCards = [
    {
      title: "Manglacharan & Bhajan",
      desc: "The day begins with sacred sound, prayer and devotional singing.",
      iconSrc: ICON_IMAGES.bhajan,
      imageSrc: "https://res.cloudinary.com/der8zinu8/image/upload/v1777025581/ChatGPT_Image_Apr_24_2026_03_38_51_PM_jpzaqg.png",
      imageAlt: "Manglacharan and bhajan opening of the Mahotsav",
    },
    {
      title: "Bhagwat Katha Session",
      desc: "Spiritual discourse brings scriptural wisdom into practical life.",
      iconSrc: ICON_IMAGES.scriptureDiscourse,
      imageSrc: "https://res.cloudinary.com/der8zinu8/image/upload/v1777025581/ChatGPT_Image_Apr_24_2026_03_38_59_PM_joce1w.png",
      imageAlt: "Bhagwat Katha session with devotees listening",
    },
    {
      title: "Aarti & Sankirtan",
      desc: "Collective devotion creates a peaceful and uplifting atmosphere.",
      iconSrc: ICON_IMAGES.aarti,
      imageSrc: "https://res.cloudinary.com/der8zinu8/image/upload/v1776955120/ChatGPT_Image_Apr_23_2026_02_25_58_PM_frrdid.png",
      imageAlt: "Aarti and sankirtan devotional singing",
    },
    {
      title: "Mahaprasad Seva",
      desc: "Devotees receive prasadam with dignity, order and affection.",
      iconSrc: ICON_IMAGES.prasadam,
      imageSrc: "https://res.cloudinary.com/der8zinu8/image/upload/v1777025579/ChatGPT_Image_Apr_24_2026_03_39_07_PM_brfv45.png",
      imageAlt: "Mahaprasad seva served with discipline and care",
    },
  ] as const;

  const sponsorCards = [
    { title: "One Session Seva", amount: "₹2,100", desc: "Support one discourse session with service logistics.", accent: "#E9932D" },
    { title: "Daily Mahotsav Sponsor", amount: "₹15,000", desc: "Support one full day of seva coordination.", accent: "#C96F18" },
    { title: "Prasadam Seva", amount: "Custom", desc: "Support mahaprasad, drinking water and devotee hospitality.", accent: "#1F6F73" },
    { title: "Grand Event Support", amount: "₹51,000", desc: "Contribute to stage, sound, broadcast, hospitality and full program execution.", accent: "#F4CE5A" },
  ] as const;

  const scheduleDays = [
    {
      label: "Day 1",
      items: [
        { slot: "Morning", title: "Manglacharan and Bhajan", time: "10:00 AM" },
        { slot: "Afternoon", title: "Bhagwat Katha Main Session", time: "3:00 PM" },
        { slot: "Evening", title: "Aarti, Sankirtan and Reflection", time: "7:30 PM" },
      ],
    },
    {
      label: "Day 2",
      items: [
        { slot: "Morning", title: "Manglacharan and Bhajan", time: "10:00 AM" },
        { slot: "Afternoon", title: "Bhagwat Katha Main Session", time: "3:00 PM" },
        { slot: "Evening", title: "Aarti, Sankirtan and Reflection", time: "7:30 PM" },
      ],
    },
    {
      label: "Day 3",
      items: [
        { slot: "Morning", title: "Manglacharan and Bhajan", time: "10:00 AM" },
        { slot: "Afternoon", title: "Bhagwat Katha Main Session", time: "3:00 PM" },
        { slot: "Evening", title: "Aarti, Sankirtan and Reflection", time: "7:30 PM" },
      ],
    },
  ] as const;

  const operationalTracks = [
    "Reception and devotee help desk",
    "Seating and queue discipline",
    "Stage, sound and katha operations",
    "Prasadam, water and hospitality seva",
    "Livestream and digital announcement support",
    "Cleanliness, security and post-event coordination",
  ] as const;

  const participationPoints = [
    "Arrive before the session begins.",
    "Maintain silence and attention during katha.",
    "Follow volunteer guidance for seating and movement.",
    "Participate respectfully in bhajan, aarti and sankirtan.",
    "Families, elders and children should be guided to suitable seating.",
    "Online viewers can join through livestream updates and recordings.",
  ] as const;

  const broadcastCards = [
    { title: "Live Stream Access", desc: "Selected sessions may be shared for distant devotees.", iconSrc: ICON_IMAGES.livestream, href: ROUTES.media.videos },
    { title: "Recorded Pravachan", desc: "Highlights and clips to revisit key teachings.", iconSrc: ICON_IMAGES.scriptureDiscourse, href: ROUTES.media.highlights },
    { title: "WhatsApp Updates", desc: "Timely updates, schedules, and key announcements.", iconSrc: ICON_IMAGES.schedule, href: ROUTES.contact },
    { title: "YouTube Highlights", desc: "Short devotional moments and program recaps.", iconSrc: ICON_IMAGES.broadcastReach, href: ROUTES.media.videos },
  ] as const;

  const testimonials = [
    {
      quote: "The discipline, seating and seva care made the entire Katha Mahotsav peaceful and uplifting.",
      by: "Visiting Devotee Family",
    },
    {
      quote: "When the event system is organized well, devotees can focus fully on katha and spiritual experience.",
      by: "Mahotsav Volunteer Desk",
    },
    {
      quote: "The livestream and timely updates helped our family stay connected even from far away.",
      by: "Digital Satsang Viewer",
    },
  ] as const;

  return (
    <main className="min-h-screen bg-[#FFF8EC] text-[#2B2118]">
      <section className="-mx-6 -mt-12 px-4 md:px-6 pt-0">
        <div className="relative w-full max-w-[1240px] mx-auto rounded-2xl overflow-hidden h-[420px] md:h-[620px]">
          <SmartImage
            src={images.hero}
            fallbackSrc={imageFallbacks.hero}
            alt="Bhagwat Katha Mahotsav stage and devotees in a warm devotional atmosphere"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.45)_35%,rgba(0,0,0,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(233,147,45,0.28),transparent_55%)]" />

          <div className="relative z-10 flex h-full items-end">
            <div className="w-full px-4 pb-10 md:pb-14">
              <div className="mx-auto max-w-3xl text-center text-white">
                <h1 className="hero-title font-bold mb-3 leading-tight text-4xl md:text-5xl">Bhagwat Katha Mahotsav</h1>
                <p className="hero-subtitle text-white/90 text-lg md:text-xl">
                  Live wisdom, sacred seva, and a divine devotional experience
                </p>

                <div className="hero-actions mt-7 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to={ROUTES.donate}
                    className="inline-flex items-center justify-center rounded-full bg-[#E9932D] px-6 py-3 text-sm font-black text-white shadow-[0_18px_36px_rgba(233,147,45,0.28)] transition hover:bg-[#C96F18]"
                  >
                    Sponsor Mahotsav
                  </Link>
                  <Link
                    to={ROUTES.involved.volunteer}
                    className="inline-flex items-center justify-center rounded-full border border-white/22 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/14"
                  >
                    Join Katha Seva
                  </Link>
                  <Link
                    to={ROUTES.media.videos}
                    className="inline-flex items-center justify-center rounded-full border border-white/22 bg-transparent px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    Watch Online
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[10px] relative z-20 pb-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-[40px] border border-[#E8CFA8] bg-[#FFFDF6] p-7 shadow-[0_28px_70px_rgba(43,33,24,0.12)] md:p-10">
            <p className={`text-center ${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Grand Spiritual Gathering</p>
            <p className={`mx-auto mt-4 max-w-4xl text-center ${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`}>
              A sacred gathering where Shri Bhagwat Katha, satsang, bhajan, seva, hospitality, and community devotion come together in one disciplined spiritual celebration.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {impactCards.map((card) => (
                <div
                  key={card.title}
                  className="group flex items-center gap-4 rounded-[999px] border border-[#E8CFA8] bg-white px-5 py-5 shadow-[0_18px_44px_rgba(43,33,24,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_64px_rgba(43,33,24,0.10)]"
                >
                  <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E8CFA8] bg-[#FFF2DE] text-[#1F6F73]">
                    <IconImage src={card.iconSrc} className="h-10 w-10 object-contain" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black uppercase tracking-[0.14em] text-[#2B2118] md:text-[15px]">
                      {card.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#6F6255]">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>About Bhagwat Katha Mahotsav</p>
            <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>
              A devotional gathering rooted in katha, seva and spiritual discipline.
            </h2>
            <p className={`mt-6 ${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`}>
              Bhagwat Katha Mahotsav is a sacred devotional event where scriptural wisdom, bhajan, satsang, seva participation,
              community hospitality, and spiritual guidance come together. The Mahotsav creates an atmosphere where devotees can
              listen, reflect, serve, and experience the living values of Shrimad Bhagwat Mahapuran.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
              {aboutFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-[#E8CFA8] bg-white p-5 text-center shadow-[0_18px_40px_rgba(43,33,24,0.08)]"
                >
                  <span className="mx-auto inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#E8CFA8] bg-[#FFF2DE] text-[#1F6F73]">
                    <IconImage src={feature.iconSrc} className="h-10 w-10 object-contain" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-[#2B2118]">{feature.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#6F6255]">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[36px] border border-[#E8CFA8] bg-white shadow-[0_22px_52px_rgba(43,33,24,0.1)]">
            <SmartImage
              src={images.about}
              fallbackSrc={imageFallbacks.about}
              alt="Devotees sitting peacefully and listening to Bhagwat Katha"
              className="h-[320px] w-full object-cover md:h-[420px]"
              loading="lazy"
            />
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1F6F73]">Devotional Atmosphere</p>
              <p className="mt-3 text-sm leading-6 text-[#6F6255]">
                Calm seating, guided movement, and seva-led hospitality help keep the focus on katha, reflection, and collective devotion.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.involved.volunteer}
                  className="inline-flex items-center justify-center rounded-full border border-[#E8CFA8] bg-white px-5 py-3 text-sm font-black text-[#1F6F73] shadow-[0_14px_26px_rgba(43,33,24,0.08)] transition hover:border-[#E9932D]/70"
                >
                  Join Volunteer Team
                </Link>
                <Link
                  to={ROUTES.donate}
                  className="inline-flex items-center justify-center rounded-full bg-[#E9932D] px-5 py-3 text-sm font-black text-white shadow-[0_16px_30px_rgba(233,147,45,0.24)] transition hover:bg-[#C96F18]"
                >
                  Sponsor Mahotsav
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Mahotsav Experience</p>
          <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>A devotional journey through the day</h2>
          <p className={`mt-6 max-w-2xl ${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`}>
            From morning prayers to discourse and evening aarti, each segment is planned with seva, hospitality, and disciplined event flow.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {experienceCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-3xl border border-[#E8CFA8] bg-[#FFF8EC] p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_54px_rgba(43,33,24,0.12)]"
              >
                <div className="relative overflow-hidden rounded-2xl border border-[#E8CFA8] bg-white shadow-[0_12px_24px_rgba(43,33,24,0.06)]">
                  <SmartImage
                    src={card.imageSrc}
                    fallbackSrc={imageFallbacks.hero}
                    alt={card.imageAlt}
                    loading="lazy"
                    className="h-[130px] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <p className="mt-4 text-[15px] font-bold text-[#2B2118]">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#6F6255]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <div className="flex items-start gap-4">
            <span className="mt-1 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#E8CFA8] bg-[#FFF2DE] text-[#1F6F73]">
              <IconImage src={ICON_IMAGES.sponsor} className="h-10 w-10 object-contain" />
            </span>
            <div>
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Join or Sponsor the Mahotsav</p>
              <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Join or Sponsor the Mahotsav</h2>
              <p className={`mt-6 max-w-3xl ${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`}>
                Support stage arrangements, hospitality, prasadam, seating, water seva, digital broadcast, volunteer operations and devotional event management.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {sponsorCards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-[#E8CFA8] bg-[#FFF8EC] p-6 shadow-[0_18px_40px_rgba(43,33,24,0.08)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_54px_rgba(43,33,24,0.12)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[15px] font-bold text-[#2B2118]">{card.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#6F6255]">{card.desc}</p>
                  </div>
                  <span
                    className="inline-flex shrink-0 items-center justify-center rounded-2xl px-3 py-2 text-sm font-bold"
                    style={{ backgroundColor: `${card.accent}1A`, color: card.accent }}
                  >
                    {card.amount}
                  </span>
                </div>
                <div className="mt-6">
                  <Link
                    to={ROUTES.donate}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#E9932D] px-5 py-3 text-sm font-black text-white shadow-[0_16px_30px_rgba(233,147,45,0.22)] transition hover:bg-[#C96F18]"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={ROUTES.donate}
              className="inline-flex items-center justify-center rounded-full bg-[#E9932D] px-6 py-3 text-sm font-black text-white shadow-[0_18px_36px_rgba(233,147,45,0.26)] transition hover:bg-[#C96F18]"
            >
              Become Sponsor
            </Link>
            <Link
              to={ROUTES.contact}
              className="inline-flex items-center justify-center rounded-full border border-[#E8CFA8] bg-white px-6 py-3 text-sm font-black text-[#1F6F73] shadow-[0_14px_26px_rgba(43,33,24,0.08)] transition hover:border-[#E9932D]/70"
            >
              Contact Seva Team
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <div className="flex items-start gap-4">
            <span className="mt-1 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#E8CFA8] bg-[#FFF2DE] text-[#1F6F73]">
              <IconImage src={ICON_IMAGES.schedule} className="h-10 w-10 object-contain" />
            </span>
            <div>
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Mahotsav Schedule Snapshot</p>
              <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>A devotional rhythm from prayer to discourse and evening aarti.</h2>
              <p className={`mt-6 max-w-3xl ${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`}>
                A devotional rhythm from prayer to discourse and evening aarti.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {scheduleDays.map((day) => (
              <div key={day.label} className="rounded-3xl border border-[#E8CFA8] bg-[#FFF8EC] p-6">
                <p className="text-sm font-bold text-[#2B2118]">{day.label}</p>
                <div className="mt-5 space-y-4">
                  {day.items.map((item) => (
                    <div key={item.slot} className="rounded-2xl border border-[#E8CFA8] bg-white px-4 py-4 shadow-[0_14px_28px_rgba(43,33,24,0.06)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1F6F73]">{item.slot}</p>
                          <p className="mt-2 text-sm font-semibold text-[#2B2118]">{item.title}</p>
                        </div>
                        <p className="text-sm font-bold text-[#C96F18]">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
            <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Operational Support Tracks</p>
            <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Operational Support Tracks</h2>
            <p className={`mt-6 ${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`}>
              How seva teams can contribute during the Mahotsav.
            </p>
            <ul className="mt-7 space-y-3">
              {operationalTracks.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] leading-7 text-[#2B2118]">
                  <span className="mt-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF2DE] text-[#1F6F73]">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
            <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Mahotsav Participation</p>
            <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Mahotsav Participation</h2>
            <p className={`mt-6 ${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`}>
              A welcoming and disciplined experience for all devotees.
            </p>
            <ol className="mt-7 space-y-3">
              {participationPoints.map((line, idx) => (
                <li key={line} className="flex gap-3 text-[15px] leading-7 text-[#2B2118]">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFF2DE] text-xs font-black text-[#C96F18]">
                    {idx + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Mahotsav Moments</p>
              <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Mahotsav Moments</h2>
            </div>
            <Link
              to={ROUTES.media.photos}
              className="inline-flex items-center justify-center rounded-full border border-[#E8CFA8] bg-white px-6 py-3 text-sm font-black text-[#1F6F73] shadow-[0_14px_26px_rgba(43,33,24,0.08)] transition hover:border-[#E9932D]/70"
            >
              View Gallery
            </Link>
          </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                { src: images.galleryStage, fallbackSrc: imageFallbacks.galleryStage, alt: "Katha stage and saint speaker in a devotional atmosphere" },
                { src: images.galleryGathering, fallbackSrc: imageFallbacks.galleryGathering, alt: "Devotees listening peacefully during Bhagwat Katha" },
                { src: images.galleryPrasadam, fallbackSrc: imageFallbacks.galleryPrasadam, alt: "Mahaprasad seva served with dignity and care" },
              ].map((img) => (
                <div key={img.alt} className="group relative overflow-hidden rounded-[34px] border border-[#E8CFA8] bg-[#FFF8EC]">
                  <SmartImage
                    src={img.src}
                  fallbackSrc={img.fallbackSrc}
                  alt={img.alt}
                  loading="lazy"
                  className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-[1.04] md:h-[260px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.55)_100%)] p-5">
                  <p className="text-sm font-semibold text-white">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <div className="flex items-start gap-4">
            <span className="mt-1 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#E8CFA8] bg-[#FFF2DE] text-[#1F6F73]">
              <IconImage src={ICON_IMAGES.livestream} className="h-10 w-10 object-contain" />
            </span>
            <div>
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Watch Bhagwat Katha Online</p>
              <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Watch Bhagwat Katha Online</h2>
              <p className={`mt-6 max-w-3xl ${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`}>
                For devotees who cannot attend physically, selected sessions may be shared through livestream, recorded clips and event updates.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {broadcastCards.map((card) => (
              <Link
                key={card.title}
                to={card.href}
                className="flex flex-col items-center rounded-3xl border border-[#E8CFA8] bg-[#FFF8EC] p-6 text-center shadow-[0_18px_40px_rgba(43,33,24,0.08)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_54px_rgba(43,33,24,0.12)]"
              >
                <span className="inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#E8CFA8] bg-white text-[#1F6F73] shadow-[0_12px_24px_rgba(43,33,24,0.08)]">
                  <IconImage src={card.iconSrc} className="h-10 w-10 object-contain" />
                </span>
                <p className="mt-5 text-[15px] font-bold text-[#2B2118]">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#6F6255]">{card.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={ROUTES.media.videos}
              className="inline-flex items-center justify-center rounded-full bg-[#1F6F73] px-6 py-3 text-sm font-black text-white shadow-[0_18px_36px_rgba(31,111,115,0.22)] transition hover:bg-[#175A5D]"
            >
              Subscribe / Follow Updates
            </Link>
            <Link
              to={ROUTES.media.socialFeed}
              className="inline-flex items-center justify-center rounded-full border border-[#E8CFA8] bg-white px-6 py-3 text-sm font-black text-[#1F6F73] shadow-[0_14px_26px_rgba(43,33,24,0.08)] transition hover:border-[#E9932D]/70"
            >
              View Updates
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Devotee Experience</p>
          <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Devotee Experience / Testimonials</h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.by}
                className="rounded-3xl border border-[#E8CFA8] bg-[#FFF8EC] p-6 shadow-[0_18px_40px_rgba(43,33,24,0.08)]"
              >
                <p className="text-[15px] leading-7 text-[#2B2118]">“{item.quote}”</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1F6F73]">— {item.by}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-[44px] border border-[#E8CFA8] bg-[linear-gradient(90deg,#D9822B_0%,#F4CE5A_55%,#FFE7C7_100%)] shadow-[0_30px_80px_rgba(43,33,24,0.2)]">
          <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.9)_1px,transparent_0)] [background-size:28px_28px]" />

          <div className="relative grid grid-cols-1 gap-8 p-8 md:grid-cols-[minmax(0,1fr)_520px] md:items-center md:gap-10 md:p-12">
            <div className="max-w-2xl">
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Sacred Closing Seva</p>
              <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Be a Part of Bhagwat Katha Mahotsav</h2>
              <p className={`mt-6 ${MISSION_BODY_TEXT_CLASS} text-[#5B3A1E]`}>
                Join hands in katha, seva, satsang and devotional service. Your support helps create a peaceful, disciplined and spiritually uplifting experience for devotees.
              </p>
            </div>

            <div className="grid w-full gap-3 md:justify-self-end">
              <Link
                to={ROUTES.donate}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#2B2118] shadow-[0_18px_36px_rgba(43,33,24,0.14)] transition hover:bg-white/90"
              >
                Sponsor Mahotsav
              </Link>
              <Link
                to={ROUTES.involved.volunteer}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/55 bg-white/20 px-6 py-3 text-sm font-bold text-[#2B2118] backdrop-blur transition hover:bg-white/26"
              >
                Join Volunteer Team
              </Link>
              <Link
                to={ROUTES.contact}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/55 bg-white/10 px-6 py-3 text-sm font-bold text-[#2B2118] transition hover:bg-white/18"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
});
