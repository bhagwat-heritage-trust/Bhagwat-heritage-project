import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type Snapshot = { title: string; text: string; icon: string };
type Activity = { title: string; image: string; description: string; href: string; icon: string };
type ProcessStep = { title: string; text: string; icon: string };
type Testimonial = { quote: string; name: string; role: string };

const HERO_IMAGE = "https://res.cloudinary.com/der8zinu8/image/upload/v1777553575/ChatGPT_Image_Apr_30_2026_06_20_58_PM_jhgdcj.png";
const GALLERY_FEATURE = "https://res.cloudinary.com/der8zinu8/image/upload/v1777555945/ChatGPT_Image_Apr_30_2026_07_01_18_PM_uadwho.png";

const SNAPSHOTS: Snapshot[] = [
  {
    title: "Service Areas",
    text: "Spiritual, cultural, educational, welfare, festivals, and charity initiatives.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777483222/ChatGPT_Image_Apr_29_2026_10_49_49_PM_f6hqjr.png",
  },
  {
    title: "Volunteer Spirit",
    text: "Activities supported by disciplined trust workers, sevaks, donors, and community participants.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777191420/ChatGPT_Image_Apr_26_2026_01_44_18_PM_cu3nce.png",
  },
  {
    title: "Community Reach",
    text: "Programs for families, students, devotees, villages, institutions, and public gatherings.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097561/ChatGPT_Image_Apr_25_2026_11_42_05_AM_bij6a0.png",
  },
  {
    title: "Balanced Approach",
    text: "A balanced model of devotion, heritage, education, service, and social contribution.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_43_24_PM_tyq4ni.png",
  },
];

const ACTIVITIES: Activity[] = [
  {
    title: "Spiritual Programs & Bhagwat Kathas",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777486100/ChatGPT_Image_Apr_29_2026_11_38_01_PM_bl96ar.png",
    description:
      "Discourses, satsang gatherings, mantra remembrance, and Bhagwat Katha programs designed to deepen devotion and spiritual understanding.",
    href: ROUTES.eventsKatha.bhagwatKatha,
    icon: "/icons/icon-spiritual-program.svg",
  },
  {
    title: "Education & Knowledge Distribution",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777461510/ChatGPT_Image_Apr_29_2026_04_47_13_PM_n9toxl.png",
    description:
      "Pathshala support, scriptural study resources, youth learning initiatives, and access to value-based educational content.",
    href: ROUTES.knowledge.pathshala,
    icon: "/icons/icon-education.svg",
  },
  {
    title: "Cultural Preservation Activities",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193615/ChatGPT_Image_Apr_26_2026_01_42_42_PM_q0ewsk.png",
    description:
      "Programs that protect devotional arts, Sanatan values, heritage teachings, and intergenerational participation in living cultural traditions.",
    href: ROUTES.mission.cultural,
    icon: "/icons/icon-culture.svg",
  },
  {
    title: "Social Welfare & Community Service",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193609/ChatGPT_Image_Apr_26_2026_01_42_25_PM_olmo6v.png",
    description:
      "Ann seva, health support, relief-oriented outreach, and organised volunteer action that converts faith into visible community care.",
    href: ROUTES.seva.index,
    icon: "/icons/icon-seva.svg",
  },
  {
    title: "Religious Events & Festivals",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032985/ChatGPT_Image_Apr_24_2026_05_41_40_PM_tcwoaz.png",
    description:
      "Seasonal celebrations, devotional festivals, and trust-led community observances that bring people together in prayer, gratitude, and service.",
    href: ROUTES.eventsKatha.festivals,
    icon: "/icons/icon-festival.svg",
  },
  {
    title: "Charity & Donation Programs",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1777206439/ChatGPT_Image_Apr_26_2026_05_55_34_PM_ulqlwo.png",
    description:
      "Transparent donation-backed initiatives that support seva delivery, welfare projects, spiritual outreach, and long-term mission development.",
    href: ROUTES.donate,
    icon: "/icons/icon-donation.svg",
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Planning & Sankalp",
    text: "Activities are planned according to spiritual purpose, community need, and trust priorities.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536353/ChatGPT_Image_Apr_30_2026_01_33_16_PM_f7vnhz.png",
  },
  {
    title: "Volunteer Coordination",
    text: "Sevaks and team members are assigned clear responsibilities for smooth execution.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193612/ChatGPT_Image_Apr_26_2026_01_44_18_PM_ek3p4y.png",
  },
  {
    title: "Transparent Execution",
    text: "Programs are conducted with discipline, accountability, and public trust.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536354/ChatGPT_Image_Apr_30_2026_01_32_43_PM_sowddo.png",
  },
  {
    title: "Follow-up & Impact Review",
    text: "Each activity is reviewed for participation, benefit, learning, and future improvement.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536352/ChatGPT_Image_Apr_30_2026_01_33_24_PM_oothr1.png",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The trust's programs are disciplined, devotional, and genuinely focused on service and values.",
    name: "Ramesh Patel",
    role: "Bhagwat Katha Participant",
  },
  {
    quote: "Our family experienced both spiritual guidance and practical service support through the Trust's initiatives.",
    name: "Sunita Sharma",
    role: "Community Beneficiary",
  },
  {
    quote: "Volunteering here means working with devotion, sincerity, and a real sense of purpose.",
    name: "Amit Joshi",
    role: "Seva Volunteer",
  },
];

const COUNTERS = [
  { label: "Core Service Areas", value: 6, suffix: "+" },
  { label: "Devotees & Participants Reached", value: 1000, suffix: "+" },
  { label: "Seva & Cultural Activities", value: 25, suffix: "+" },
  { label: "Volunteers & Supporters", value: 100, suffix: "+" },
];

const sectionClass = "mx-auto max-w-[1180px] px-4 py-10 sm:py-12 lg:py-20";
const cardClass =
  "rounded-[24px] border border-[#f3d8a0] bg-white/95 shadow-[0_10px_30px_rgba(131,83,11,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(131,83,11,0.18)]";

export default memo(function AboutActivitiesOverviewPage() {
  const [visible, setVisible] = useState(false);
  const [countValues, setCountValues] = useState(COUNTERS.map(() => 0));
  const counterRef = useRef<HTMLElement | null>(null);

  usePageMeta(
    "Trust Activities Overview | Bhagwat Heritage Service Foundation Trust",
    "Explore the spiritual, cultural, educational, social welfare, religious, and charity activities of Bhagwat Heritage Service Foundation Trust.",
  );

  useEffect(() => {
    const node = counterRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    let frameId = 0;
    const started = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountValues(COUNTERS.map((item) => Math.round(item.value * eased)));
      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [visible]);

  const galleryList = useMemo(
    () => [
      "Bhagwat Katha Gatherings",
      "Festival and Sabha Moments",
      "Education and Value-Based Learning",
      "Seva in Action",
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-[#fff9ef] text-[#2c2b26]">
      <section className="mx-auto max-w-[1180px] px-4 pt-6 sm:pt-8 lg:pt-10">
        <div className="relative h-[320px] overflow-hidden rounded-[24px] sm:h-[380px] lg:h-[480px]">
          <img
            src={HERO_IMAGE}
            alt="Temple architecture and devotees in a devotional gathering"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#7c460c]/60 to-black/60" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-8 text-center text-white sm:pb-10 lg:pb-12">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">Trust Activities Overview</h1>
            <div className="mt-6 flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:flex-nowrap sm:justify-center">
              <Link to={ROUTES.donate} className="rounded-xl bg-[#ef9b18] px-5 py-3 font-semibold text-white transition hover:bg-[#d7870f] hover:shadow-[0_0_20px_rgba(239,155,24,0.35)]">Support Our Activities</Link>
              <Link to={ROUTES.media.highlights} className="rounded-xl border border-white/45 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20">View Recent Highlights</Link>
              <Link to={ROUTES.involved.volunteer} className="rounded-xl bg-[#0f7a80] px-5 py-3 font-semibold text-white transition hover:bg-[#0c666b]">Become a Volunteer</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SNAPSHOTS.map((item) => (
            <article key={item.title} className={`${cardClass} p-5`}>
              <div className="mx-auto mb-4 flex h-[84px] w-[84px] items-center justify-center overflow-hidden rounded-full">
                <img src={item.icon} alt="" aria-hidden="true" className="h-full w-full rounded-full object-cover" loading="lazy" />
              </div>
              <h2 className="text-lg font-bold text-[#643310]">{item.title}</h2>
              <p className="mt-2 text-base leading-7 text-[#4f4b44]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <article className={`${cardClass} p-7`}>
            <h2 className="text-2xl font-bold text-[#5d300e] sm:text-3xl">Serving Society, Culture, and Spiritual Heritage</h2>
            <p className="mt-4 text-base leading-8 text-[#49463f]">Bhagwat Heritage Service Foundation Trust exists to preserve and share spiritual wisdom while translating devotion into organised service for society. Its work connects scriptural learning, satsang, cultural celebration, and disciplined outreach into one coherent trust mission.</p>
            <p className="mt-4 text-base leading-8 text-[#49463f]">The Trust serves communities through Bhagwat Katha, educational initiatives, welfare activities, volunteer-driven support programs, and heritage-centred events that strengthen values across generations.</p>
            <p className="mt-4 text-base leading-8 text-[#49463f]">Its long-term vision is to build an enduring ecosystem where dharma, compassion, education, cultural identity, and public participation are actively lived through disciplined programs, trusted partnerships, and sustainable public service.</p>
          </article>

          <div className="grid gap-4">
            {[
              {
                title: "Purpose",
                text: "To create meaningful spiritual and social impact through devotion, discipline, and service-led action.",
              },
              {
                title: "Vision",
                text: "To become a trusted platform for heritage preservation, scriptural learning, and compassionate public service.",
              },
              {
                title: "Commitment",
                text: "To deliver every activity with sincerity, transparency, and visible benefit for communities and devotees.",
              },
            ].map((item) => (
              <article key={item.title} className={`${cardClass} p-5`}>
                <h3 className="text-xl font-bold text-[#5d300e]">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-[#4f4b44]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-center text-3xl font-bold text-[#5d300e]">Main Activity Categories</h2>
        <p className="mt-2 text-center text-base text-[#6f685e]">Core Areas of Trust Activity</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {ACTIVITIES.map((item) => (
            <article key={item.title} className={`${cardClass} overflow-hidden`}>
              <div className="relative h-60 overflow-hidden bg-[#fff2d8]">
                <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#5d300e]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#4f4b44]">{item.description}</p>
                <Link to={item.href} className="mt-5 inline-flex rounded-xl bg-[#ef9b18] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d7870f]">Learn More</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section ref={counterRef} className={sectionClass}>
        <div className="rounded-[24px] border border-[#f3d8a0] bg-gradient-to-r from-[#fff3dd] via-[#fff] to-[#eaf8f5] p-6 shadow-[0_12px_34px_rgba(131,83,11,0.12)]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COUNTERS.map((item, idx) => (
              <div key={item.label} className="rounded-2xl bg-white/85 p-4 text-center shadow-sm">
                <p className="text-3xl font-extrabold text-[#0f7a80]">{countValues[idx]}{item.suffix}</p>
                <p className="mt-1 text-sm font-medium text-[#59544b]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-3xl font-bold text-[#5d300e]">Photo Gallery Preview</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className={`${cardClass} h-full overflow-hidden bg-white`}>
            <div className="h-full min-h-[320px] w-full bg-[#fff7ea]">
              <img src={GALLERY_FEATURE} alt="Trust activities gallery preview" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </article>
          <article className={`${cardClass} p-6`}>
            <h3 className="text-xl font-bold text-[#5d300e]">Featured Activity Moments</h3>
            <ul className="mt-4 space-y-3">
              {galleryList.map((item) => (
                <li key={item} className="rounded-xl bg-[#fff7ea] px-4 py-3 text-base text-[#5b554c]">{item}</li>
              ))}
            </ul>
            <Link to={ROUTES.media.photos} className="mt-6 inline-flex rounded-xl bg-[#0f7a80] px-5 py-3 font-semibold text-white transition hover:bg-[#0c666b]">View Full Gallery</Link>
          </article>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-3xl font-bold text-[#5d300e]">How Trust Activities Are Organised</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <article key={step.title} className={`${cardClass} p-5`}>
              <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full">
                <img src={step.icon} alt="" aria-hidden="true" loading="lazy" className="h-full w-full rounded-full object-cover" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-[#5d300e]">{step.title}</h3>
              <p className="mt-2 text-base leading-7 text-[#4f4b44]">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-3xl font-bold text-[#5d300e]">Voices from Participants and Beneficiaries</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <blockquote key={item.name} className={`${cardClass} p-6`}>
              <p className="text-base leading-8 text-[#4f4b44]">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-5 border-t border-[#ecd8b3] pt-4">
                <p className="font-bold text-[#5d300e]">{item.name}</p>
                <p className="text-sm text-[#7e7465]">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="overflow-hidden rounded-[28px] border border-[#f2d294] bg-gradient-to-r from-[#ffe8bf] via-[#fff8ec] to-[#e5f4f3] p-7 shadow-[0_16px_38px_rgba(131,83,11,0.14)]">
          <h2 className="text-3xl font-bold text-[#5d300e]">Participate in the Trust's Ongoing Work</h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-[#4f4b44]">Support the Trust through volunteer service, partnership, donation, or creative contribution and help expand programs rooted in devotion, public benefit, and cultural continuity.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
            <Link to={ROUTES.involved.volunteer} className="rounded-xl bg-[#ef9b18] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#d7870f]">Become a Volunteer</Link>
            <Link to={ROUTES.donate} className="rounded-xl border border-[#c08c2a] bg-white px-5 py-3 text-center font-semibold text-[#7f4e18] transition hover:bg-[#fff8ed]">Donate to the Trust</Link>
            <Link to={ROUTES.involved.partner} className="rounded-xl bg-[#0f7a80] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#0c666b]">Partner With Us</Link>
          </div>
        </div>
      </section>

    </div>
  );
});
