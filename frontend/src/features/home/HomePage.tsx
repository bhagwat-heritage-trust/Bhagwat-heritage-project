import { memo, useEffect, useState, type AnchorHTMLAttributes, type ComponentType, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, type LinkProps } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type IconProps = { className?: string };
type InternalTrackedLinkProps = LinkProps & { trackingId: string };
type ExternalTrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { trackingId: string };

const CLD = "https://res.cloudinary.com/der8zinu8/image/upload";

const image = (path: string, width = 1200) => `${CLD}/f_auto,q_auto,w_${width}/${path}`;

const assets = {
  hero: image("v1774802023/swami_r7ypl0.jpg", 1920),
  heroSlides: [
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777884113/WhatsApp_Image_2026-05-04_at_2.09.33_PM_sei4eh.jpg",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777884112/WhatsApp_Image_2026-05-04_at_2.09.33_PM_1_mgthzg.jpg",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777884112/WhatsApp_Image_2026-05-04_at_2.09.33_PM_2_dxdmig.jpg",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777884112/WhatsApp_Image_2026-05-04_at_2.09.34_PM_1_ecqcwu.jpg",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777884112/WhatsApp_Image_2026-05-04_at_2.10.27_PM_qneker.jpg",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777884112/WhatsApp_Image_2026-05-04_at_2.09.34_PM_ycmjxf.jpg",
  ],
  founder: "https://res.cloudinary.com/der8zinu8/image/upload/v1777873571/WhatsApp_Image_2026-05-04_at_10.47.29_AM_dzcqvm.jpg",
  templeCurrent: "https://res.cloudinary.com/der8zinu8/image/upload/v1777873570/WhatsApp_Image_2026-05-04_at_10.47.33_AM_mtgyjq.jpg",
  templeVision: "https://res.cloudinary.com/der8zinu8/image/upload/v1777873569/WhatsApp_Image_2026-05-04_at_10.47.35_AM_ugdoty.jpg",
  gau: "https://res.cloudinary.com/der8zinu8/image/upload/v1777873570/WhatsApp_Image_2026-05-04_at_10.47.31_AM_1_nqaf4t.jpg",
  ann: "https://res.cloudinary.com/der8zinu8/image/upload/v1777873570/WhatsApp_Image_2026-05-04_at_10.47.32_AM_ov5omq.jpg",
  jal: "https://res.cloudinary.com/der8zinu8/image/upload/v1777873570/WhatsApp_Image_2026-05-04_at_10.47.32_AM_1_gkk8i8.jpg",
  education: "https://res.cloudinary.com/der8zinu8/image/upload/v1776791703/12_lwchms.png",
  health: "https://res.cloudinary.com/der8zinu8/image/upload/v1776778493/ChatGPT_Image_Apr_21_2026_07_03_13_PM_osc3pk.png",
  kanyadaan: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857856/herobanner_k_jckja5.png",
  katha: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193612/ChatGPT_Image_Apr_26_2026_12_00_27_PM_ridmh0.png",
  festival: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032985/ChatGPT_Image_Apr_24_2026_05_41_40_PM_tcwoaz.png",
  satsang: "https://res.cloudinary.com/der8zinu8/image/upload/v1777206437/ChatGPT_Image_Apr_26_2026_05_55_49_PM_irlgtb.png",
  galleryFeature: "https://res.cloudinary.com/der8zinu8/image/upload/v1777206437/ChatGPT_Image_Apr_26_2026_05_55_42_PM_vgj8v7.png",
  galleryThumbs: [
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777193611/ChatGPT_Image_Apr_26_2026_01_41_59_PM_dsktes.png",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777459099/ChatGPT_Image_Apr_29_2026_04_07_51_PM_vegbl7.png",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777604293/lord_icuvdm.jpg",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777567691/ChatGPT_Image_Apr_30_2026_10_15_35_PM_he0lrd.png",
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function trackCta(trackingId: string) {
  if (typeof window === "undefined") return;

  const payload = {
    event: "cta_click",
    cta_id: trackingId,
    page: "homepage",
  };

  window.dispatchEvent(new CustomEvent("bhagwat:cta-click", { detail: payload }));

  const maybeWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  };

  maybeWindow.dataLayer?.push(payload);
  maybeWindow.gtag?.("event", "cta_click", { cta_id: trackingId, page_location: window.location.href });
}

function TrackedLink({ trackingId, onClick, ...props }: InternalTrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackCta(trackingId);
        onClick?.(event);
      }}
    />
  );
}

function ExternalTrackedLink({ trackingId, onClick, ...props }: ExternalTrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackCta(trackingId);
        onClick?.(event);
      }}
    />
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="home-label">{eyebrow}</p>
      <h2 className="home-h2">{title}</h2>
      {text ? <p className="home-body mt-4">{text}</p> : null}
    </motion.div>
  );
}

function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10 xl:px-14 ${className}`}>{children}</section>;
}

function PrimaryCta({ children, trackingId, className = "", ...props }: Omit<InternalTrackedLinkProps, "className"> & { className?: string }) {
  return (
    <TrackedLink
      {...props}
      trackingId={trackingId}
      className={`home-btn-primary ${className}`}
    >
      {children}
    </TrackedLink>
  );
}

function OutlineCta({ children, trackingId, className = "", ...props }: Omit<InternalTrackedLinkProps, "className"> & { className?: string }) {
  return (
    <TrackedLink
      {...props}
      trackingId={trackingId}
      className={`home-btn-secondary ${className}`}
    >
      {children}
    </TrackedLink>
  );
}

function DonateExternal({ children, trackingId, className = "" }: { children: ReactNode; trackingId: string; className?: string }) {
  return (
    <ExternalTrackedLink
      href={EXTERNAL_RAZORPAY_DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      trackingId={trackingId}
      className={`home-btn-primary ${className}`}
    >
      {children}
    </ExternalTrackedLink>
  );
}

function SpiritualIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M12 3.5c3.5 3.2 5.2 6.1 5.2 8.8a5.2 5.2 0 0 1-10.4 0C6.8 9.6 8.5 6.7 12 3.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 9v11M8.6 15.5h6.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SevaIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M7.2 12.4 12 17l4.8-4.6a3.2 3.2 0 0 0-4.5-4.5L12 8.2l-.3-.3a3.2 3.2 0 0 0-4.5 4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M4 19.5h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CultureIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M4 20h16M6 17V9l6-4 6 4v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 17v-6h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DonateIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M12 20c4.7-3 7-5.4 7-8.2a3.5 3.5 0 0 0-6.4-2L12 10.7l-.6-.9a3.5 3.5 0 0 0-6.4 2C5 14.6 7.3 17 12 20Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function PartnerIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M7 13.5 10.2 17a2.4 2.4 0 0 0 3.6 0L17 13.5M8.5 10.5l-2-2a2.5 2.5 0 0 1 3.5-3.5L12 7l2-2a2.5 2.5 0 0 1 3.5 3.5l-2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pillars: Array<{ title: string; text: string; to: string; cta: string; image: string }> = [
  {
    title: "Spiritual Mission",
    text: "Bhagwat Katha, satsang, scriptural learning, and daily spiritual guidance for families and youth.",
    to: ROUTES.mission.spiritual,
    cta: "Explore Mission",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777873571/WhatsApp_Image_2026-05-04_at_10.47.29_AM_1_goy70w.jpg",
  },
  {
    title: "Social Service (Seva)",
    text: "Compassionate support through food, water, health, education, Gau Seva, and community welfare.",
    to: ROUTES.mission.social,
    cta: "Join Seva",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777873570/WhatsApp_Image_2026-05-04_at_10.47.29_AM_2_iqyyob.jpg",
  },
  {
    title: "Cultural Renaissance",
    text: "Preserving Sanatan values, festivals, temple culture, and sanskar for the next generation.",
    to: ROUTES.mission.cultural,
    cta: "View Culture",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777873570/WhatsApp_Image_2026-05-04_at_10.47.31_AM_v0he99.jpg",
  },
];

const sevaItems = [
  { title: "Gau Seva", image: assets.gau, to: ROUTES.seva.gau, icon: "Go" },
  { title: "Ann Seva", image: assets.ann, to: ROUTES.seva.ann, icon: "An" },
  { title: "Jal Seva", image: assets.jal, to: ROUTES.seva.jal, icon: "Ja" },
  { title: "Education", image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777882209/WhatsApp_Image_2026-05-04_at_1.39.27_PM_gdimbp.jpg", to: ROUTES.seva.education, icon: "Ed" },
  { title: "Health", image: assets.health, to: ROUTES.seva.medicine, icon: "He" },
  { title: "Kanyadaan", image: assets.kanyadaan, to: ROUTES.seva.kanyadaan, icon: "Ka" },
];

const events = [
  { title: "Upcoming Katha", text: "Bhagwat Katha programs that unite devotion, wisdom, and community participation.", image: assets.katha, to: ROUTES.eventsKatha.bhagwatKatha },
  { title: "Festivals", text: "Sacred celebrations, utsav, and cultural gatherings for all devotees.", image: assets.festival, to: ROUTES.eventsKatha.festivals },
  { title: "Live Satsang", text: "Join digital satsang, pravachan, and live darshan from wherever you are.", image: assets.satsang, to: ROUTES.digital.satsang },
];

const involved = [
  {
    title: "Join Seva",
    text: "Contribute your time in food, temple, health, education, and event seva.",
    to: ROUTES.involved.volunteer,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967402/g5_ilegzw.png",
  },
  {
    title: "Donate Now",
    text: "Support active seva programs and Bhagwat Dham construction with devotion.",
    to: ROUTES.donate,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967400/g8_cw3tcs.png",
  },
  {
    title: "Partner With Us",
    text: "Collaborate through CSR, community networks, events, and digital outreach.",
    to: ROUTES.involved.partner,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g6_sxiq7h.png",
  },
];

export default memo(function HomePage() {
  const { t } = useTranslation();
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % assets.heroSlides.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  usePageMeta(
    t("home.meta.title", { defaultValue: "Bhagwat Heritage Service Foundation Trust" }),
    t("home.meta.description", {
      defaultValue: "Preserving Bhagwat Dharma through seva, sanskar, spiritual awakening, and Bhagwat Dham.",
    }),
  );

  return (
    <div className="homepage-about-typography min-h-screen bg-[linear-gradient(180deg,#fffaf2_0%,#fffdf9_50%,#f8efe2_100%)] font-['Poppins'] text-[#1f4d5a]">
      <section className="relative min-h-screen w-screen overflow-hidden">
        {assets.heroSlides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            alt={index === 0 ? "Temple, Bhagwat and diya atmosphere" : ""}
            aria-hidden={index === 0 ? undefined : true}
            className={`absolute inset-0 h-screen w-full object-cover object-center transition-opacity duration-1000 ${
              index === activeHeroSlide ? "opacity-100" : "opacity-0"
            }`}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,18,3,0.50),rgba(102,49,7,0.24)_48%,rgba(255,242,205,0.08)),radial-gradient(circle_at_72%_28%,rgba(255,226,146,0.34),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,226,0.12),rgba(255,255,255,0.03)_40%,rgba(48,20,2,0.18))]" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-[1920px] items-end justify-center px-4 py-8 sm:px-8 lg:px-14">
          <div className="flex gap-2" aria-label="Homepage hero slides">
            {assets.heroSlides.map((slide, index) => (
              <button
                key={`${slide}-dot`}
                type="button"
                onClick={() => setActiveHeroSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeHeroSlide ? "w-9 bg-[#f8d36a]" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Show hero slide ${index + 1}`}
                aria-current={index === activeHeroSlide ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fff8ea,#fffdf7)] px-4 py-12 text-center sm:px-8 lg:px-14 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mx-auto max-w-4xl"
        >
          <p className="home-label">Bhagwat Heritage Service Foundation Trust</p>
          <h1 className="home-h2">
            Preserving Bhagwat Dharma, Serving Humanity
          </h1>
          <p className="home-body mx-auto mt-4 max-w-3xl">
            Join the divine mission of Seva, Sanskar, and Spiritual Awakening under the guidance of Sant Shri Manish Bhaiji Maharaj.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <DonateExternal trackingId="hero_content_donate">Donate Now</DonateExternal>
            <PrimaryCta to={ROUTES.involved.volunteer} trackingId="hero_content_join_seva" className="bg-none bg-white text-[#653307] ring-1 ring-[#e9bc5a] hover:bg-[#fff7df]">
              Join Seva
            </PrimaryCta>
          </div>
        </motion.div>
      </section>

      <Shell className="bg-[linear-gradient(180deg,#fff8ea,#fffdf7)]">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="rounded-[8px] border border-[#efd8a7] bg-white/78 p-7 shadow-[0_24px_70px_rgba(126,64,8,0.08)] sm:p-10"
          >
            <p className="home-label">About Trust</p>
            <h2 className="home-h2">A living mission of bhakti, seva, and sanskar.</h2>
            <p className="home-body mt-4">
              Bhagwat Heritage Service Foundation Trust works to preserve sacred wisdom, nurture cultural values, and serve society through spiritual programs, food and water seva, education support, healthcare assistance, and temple-centered community work.
            </p>
            <PrimaryCta to={ROUTES.about.index} trackingId="trust_explore_about" className="mt-7">
              Explore About
            </PrimaryCta>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="grid gap-5 rounded-[8px] border border-[#f2d998] bg-[linear-gradient(145deg,#fff6df,#ffffff)] p-5 shadow-[0_24px_70px_rgba(184,100,18,0.12)] sm:grid-cols-[210px_1fr] sm:p-7"
          >
            <img src={assets.founder} alt="Sant Shri Manish Bhaiji Maharaj" loading="lazy" className="h-[280px] w-full rounded-[8px] object-cover object-top shadow-[0_18px_40px_rgba(71,31,5,0.16)]" />
            <div className="self-center">
              <p className="home-label">Founder Message</p>
              <h3 className="home-card-title mt-3">Sant Shri Manish Bhaiji Maharaj</h3>
              <p className="home-body mt-4">
                True devotion becomes complete when it awakens compassion. Through seva, every devotee can become an instrument of divine grace.
              </p>
              <PrimaryCta to={ROUTES.about.founder} trackingId="founder_read_message" className="mt-6">
                Read Message
              </PrimaryCta>
            </div>
          </motion.div>
        </div>
      </Shell>

      <Shell className="bg-[#fffaf0]">
        <SectionIntro eyebrow="Core Pillars" title="One Foundation, Three Sacred Directions" text="Every initiative is rooted in devotion and expressed through visible service." />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-3">
          {pillars.map((item, index) => {
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group rounded-[8px] border border-[#efd8a7] bg-white p-7 text-center shadow-[0_20px_52px_rgba(126,64,8,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_68px_rgba(126,64,8,0.14)]"
              >
                <div className="mx-auto flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={`${item.title} icon`}
                    loading="lazy"
                    className="h-[6.6rem] w-[6.6rem] rounded-full object-cover shadow-[0_16px_32px_rgba(224,172,67,0.16)]"
                  />
                </div>
                <h3 className="home-card-title mt-4">{item.title}</h3>
                <p className="home-body mt-3 min-h-[112px]">{item.text}</p>
                <PrimaryCta to={item.to} trackingId={`pillar_${index + 1}`} className="mt-6 w-full">
                  {item.cta}
                </PrimaryCta>
              </motion.div>
            );
          })}
        </div>
      </Shell>

      <Shell className="bg-[radial-gradient(circle_at_top_right,rgba(255,211,111,0.24),transparent_30%),linear-gradient(180deg,#fffdf7,#fff4d8)]">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65 }}>
            <p className="home-label">Bhagwat Dham Project</p>
            <h2 className="home-h2">A sacred dham for worship, learning, seva, and cultural continuity.</h2>
            <p className="home-body mt-4">
              The Bhagwat Dham vision brings together temple devotion, satsang spaces, seva infrastructure, pilgrim facilities, and spiritual education for generations to come.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Temple darshan and daily aarti spaces",
                "Bhagwat Katha and satsang halls",
                "Ann Seva and pilgrim support facilities",
                "Sanskar, study, and youth learning areas",
              ].map((item) => (
                <div key={item} className="rounded-[8px] border border-[#ead2a6] bg-white/70 px-4 py-3 shadow-[0_10px_22px_rgba(126,64,8,0.06)]">
                  <p className="text-sm font-bold leading-6 text-[#1f4d5a]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[8px] border border-[#e8c98f] bg-[linear-gradient(180deg,#fff8eb_0%,#fffdf7_100%)] p-5 shadow-[0_14px_30px_rgba(126,64,8,0.08)]">
              <p className="text-base font-bold leading-7 text-[#3f3123]">
                Every contribution supports a sacred place where devotees can pray, families can learn dharma, volunteers can serve, and future generations can remain connected with Bhagwat sanskar.
              </p>
            </div>
            <div className="mt-7">
              <div className="flex items-center justify-between text-sm font-black text-[#7a4b12]">
                <span>Construction Progress</span>
                <span>Seva in progress</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#f0ddb2]">
                <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-[#c96f12] via-[#f1b632] to-[#ffe18a]" />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryCta to={ROUTES.mandirTeerth.bhagwatDham} trackingId="project_view">
                View Project
              </PrimaryCta>
              <DonateExternal trackingId="project_support_construction">Support Construction</DonateExternal>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.65, delay: 0.12 }} className="grid w-full max-w-[640px] gap-5 justify-self-center">
            <div className="overflow-hidden rounded-[8px] border border-[#efd8a7] bg-white shadow-[0_24px_60px_rgba(126,64,8,0.12)]">
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#fff8ea]">
                <img src={assets.templeCurrent} alt="Bhagwat Dham current temple view" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#7a4b12]">Current</p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-[#efd8a7] bg-white shadow-[0_24px_60px_rgba(126,64,8,0.12)]">
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#fff8ea]">
                <img src={assets.templeVision} alt="Bhagwat Dham vision temple view" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#7a4b12]">Vision</p>
            </div>
          </motion.div>
        </div>
      </Shell>

      <Shell className="bg-[#fffdf7]">
        <SectionIntro eyebrow="Seva Initiatives" title="Serve Where Compassion Becomes Action" />
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sevaItems.map((item, index) => (
            <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: index * 0.06 }}>
              <TrackedLink to={item.to} trackingId={`seva_${item.title.toLowerCase().replace(/\s+/g, "_")}`} className="group block overflow-hidden rounded-[8px] border border-[#efd8a7] bg-white shadow-[0_18px_44px_rgba(126,64,8,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_62px_rgba(126,64,8,0.14)]">
                <div className="relative h-[230px] overflow-hidden">
                  <img src={item.image} alt={`${item.title} initiative`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="home-card-title">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#c8771e]">Participate in this seva</p>
                </div>
              </TrackedLink>
            </motion.div>
          ))}
        </div>
      </Shell>

      <Shell className="bg-[#fffaf0]">
        <SectionIntro eyebrow="Events & Satsang" title="Stay Connected With Katha, Festivals, and Live Satsang" />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
          {events.map((item, index) => (
            <motion.article key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.08 }} className="overflow-hidden rounded-[8px] border border-[#efd8a7] bg-white shadow-[0_20px_54px_rgba(126,64,8,0.08)]">
              <img src={item.image} alt={item.title} loading="lazy" className="h-[235px] w-full object-cover" />
              <div className="p-6">
                <h3 className="home-card-title">{item.title}</h3>
                <p className="home-body mt-3">{item.text}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <PrimaryCta to={item.to} trackingId={`event_${index + 1}`}>
                    {index === 2 ? "Watch Live" : "View Events"}
                  </PrimaryCta>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Shell>

      <Shell className="bg-[#fffdf7]">
        <SectionIntro eyebrow="Media Gallery" title="Moments of Devotion, Service, and Community" />
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }} className="overflow-hidden rounded-[8px] border border-[#efd8a7] bg-white shadow-[0_24px_64px_rgba(126,64,8,0.1)]">
            <img src={assets.galleryFeature} alt="Featured devotional gallery moment" loading="lazy" className="h-[360px] w-full object-cover sm:h-[520px]" />
          </motion.div>
          <div className="grid grid-cols-2 gap-5">
            {assets.galleryThumbs.map((thumb, index) => (
              <motion.img key={thumb} src={thumb} alt={`Bhagwat Heritage gallery thumbnail ${index + 1}`} loading="lazy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: index * 0.06 }} className="h-[170px] w-full rounded-[8px] border border-[#efd8a7] object-cover shadow-[0_18px_42px_rgba(126,64,8,0.08)] sm:h-[250px]" />
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <PrimaryCta to={ROUTES.media.photos} trackingId="media_gallery_view_all">
            View Gallery
          </PrimaryCta>
        </div>
      </Shell>

      <Shell className="bg-[#fff8ea]">
        <SectionIntro eyebrow="Get Involved" title="Choose Your Way to Serve the Mission" />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-3">
          {involved.map((item, index) => {
            return (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.08 }}>
                <TrackedLink to={item.to} trackingId={`involved_${index + 1}`} className="group block h-full rounded-[8px] border border-[#efd8a7] bg-white shadow-[0_20px_54px_rgba(126,64,8,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_66px_rgba(126,64,8,0.14)]">
                  <div className="pt-8 text-center">
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#fff7e2] shadow-[0_14px_30px_rgba(126,64,8,0.14)]">
                      <img src={item.image} alt={`${item.title} icon`} loading="lazy" className="h-20 w-20 rounded-full object-cover" />
                    </div>
                  </div>
                  <div className="p-7 text-center">
                    <h3 className="home-card-title">{item.title}</h3>
                    <p className="home-body mt-3">{item.text}</p>
                  </div>
                </TrackedLink>
              </motion.div>
            );
          })}
        </div>
      </Shell>

      <Shell className="bg-[#fffdf7]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto overflow-hidden rounded-[24px] border border-[#e3b85e] bg-[url('https://res.cloudinary.com/der8zinu8/image/upload/v1777884403/WhatsApp_Image_2026-05-04_at_2.15.14_PM_sfbido.jpg')] bg-cover bg-center bg-no-repeat p-8 text-center shadow-[0_30px_80px_rgba(173,91,12,0.22)] sm:p-14"
          style={{ minHeight: "420px" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.40),rgba(255,255,255,0.20))]" />
          <div className="absolute inset-0 bg-white/20 mix-blend-screen" />
          <div className="relative flex h-full flex-col items-center justify-center gap-6 text-[#3f3123]">
            <div className="max-w-3xl">
              <p className="home-label text-[#3f3123]">Be Part of Bhagwat Mission</p>
              <h2 className="home-h2 text-[#3f3123]">Your seva can carry dharma, dignity, and hope forward.</h2>
            </div>
            <div className="max-w-2xl">
              <p className="home-body mx-auto text-[#3f3123]/90">
                When you donate or volunteer, you become part of a sacred effort that brings spiritual awakening, community support, and cultural preservation to families and pilgrims.
              </p>
            </div>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <DonateExternal trackingId="final_donate" className="bg-none bg-[#321b06] text-[#ffe39a] hover:bg-[#46290a] shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
                Donate Now
              </DonateExternal>
              <PrimaryCta to={ROUTES.involved.volunteer} trackingId="final_join_seva" className="bg-none bg-white text-[#653307] hover:bg-[#fff7df] shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                Join Seva
              </PrimaryCta>
            </div>
          </div>
        </motion.div>
      </Shell>

      <style>{`
        .home-label {
          color: #7a4f16;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .home-h2 {
          color: #3f3123;
          font-size: 14px;
          font-weight: 900;
          line-height: 1.2;
          margin-top: 0.5rem;
        }
        @media (min-width: 768px) {
          .home-h2 {
            font-size: 20px;
          }
        }
        .home-body {
          color: #6b5a48;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.75;
        }
        @media (min-width: 768px) {
          .home-body {
            font-size: 18px;
          }
        }
        .home-card-title {
          color: #1f4d5a;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.25;
        }
        .home-btn-primary {
          align-items: center;
          background: linear-gradient(180deg, #f0ae57 0%, #df8e2f 100%);
          border: 1px solid #dc8a2d;
          border-radius: 0.8rem;
          box-shadow: 0 12px 24px rgba(181, 111, 26, 0.22);
          color: #fffdf8;
          display: inline-flex;
          font-size: 0.95rem;
          font-weight: 800;
          justify-content: center;
          min-height: 48px;
          padding: 0.72rem 1.1rem;
          text-align: center;
          transition: transform 240ms ease, box-shadow 240ms ease, filter 240ms ease;
        }
        .home-btn-secondary {
          align-items: center;
          background: #fffdf8;
          border: 1px solid #e4c79f;
          border-radius: 0.8rem;
          box-shadow: 0 10px 22px rgba(82, 61, 34, 0.1);
          color: #1f4d5a;
          display: inline-flex;
          font-size: 0.95rem;
          font-weight: 800;
          justify-content: center;
          min-height: 48px;
          padding: 0.72rem 1.1rem;
          text-align: center;
          transition: transform 240ms ease, box-shadow 240ms ease, background-color 240ms ease;
        }
        .home-btn-primary:focus-visible,
        .home-btn-secondary:focus-visible {
          outline: 3px solid #1f4d5a;
          outline-offset: 2px;
        }
        .home-btn-primary:hover,
        .home-btn-secondary:hover {
          transform: translateY(-2px);
        }
        .home-btn-secondary:hover {
          background: #fff3de;
        }
      `}</style>
    </div>
  );
});
