import { memo, type ComponentType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type IconProps = { className?: string };

const HERO_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1776923272/ChatGPT_Image_Apr_23_2026_11_14_12_AM_fgqzjl.png";
const MISSION_CORE_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1776925295/ChatGPT_Image_Apr_23_2026_11_49_27_AM_xcmrqh.png";
const VALUES_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1776929975/WhatsApp_Image_2026-04-23_at_13.07.34_utj9bx.jpg";
const GUIDING_OUTCOMES_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1776929975/WhatsApp_Image_2026-04-23_at_13.07.35_z0yyja.jpg";
const DAILY_DIRECTION_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1776929975/WhatsApp_Image_2026-04-23_at_13.07.34_1_qlsaep.jpg";

const PILLARS = [
  {
    title: "Sacred Wisdom",
    description: "Shrimad Bhagwat as the light of conscious and value-based living.",
    icon: BookIcon,
    iconImage: "https://res.cloudinary.com/der8zinu8/image/upload/v1776927285/Sacred_Wisdom_dxxbmg.png",
  },
  {
    title: "Dharma in Action",
    description: "Devotion expressed through seva, discipline, humility, and conduct.",
    icon: DharmaIcon,
    iconImage: "https://res.cloudinary.com/der8zinu8/image/upload/v1776927285/Dharma_in_Action_vix5a6.png",
  },
  {
    title: "Daily Sadhana",
    description: "Reflection, prayer, scriptural study, and inner refinement in everyday life.",
    icon: DiyaIcon,
    iconImage: "https://res.cloudinary.com/der8zinu8/image/upload/v1776927285/Daily_Sadhana_qbvcbm.png",
  },
  {
    title: "Global Reach",
    description: "Carrying timeless spiritual culture into homes, hearts, and society.",
    icon: GlobeIcon,
    iconImage: "https://res.cloudinary.com/der8zinu8/image/upload/v1776927285/Global_Reach_wjuszm.png",
  },
];

const GUIDING_OUTCOMES = [
  "Inner awakening",
  "Devotional discipline",
  "Value-based conduct",
  "Compassionate service",
  "Cultural continuity",
];

const DAILY_DIRECTION = [
  "Begin with remembrance",
  "Reflect through scripture",
  "Practice humility in conduct",
  "Offer seva in daily life",
  "Close the day with gratitude",
];

const PLATFORMS = [
  {
    title: "Bhagwat Katha",
    description: "Sacred narrative that awakens devotion, reflection, and spiritual understanding.",
    href: ROUTES.eventsKatha.bhagwatKatha,
    icon: TempleIcon,
    iconImage: "https://res.cloudinary.com/der8zinu8/image/upload/v1776929974/WhatsApp_Image_2026-04-23_at_13.07.35_4_kfxoaq.jpg",
  },
  {
    title: "Satsang",
    description: "Collective spiritual association that strengthens inner values and shared faith.",
    href: ROUTES.digital.satsang,
    icon: LotusIcon,
    iconImage: "https://res.cloudinary.com/der8zinu8/image/upload/v1776929974/WhatsApp_Image_2026-04-23_at_13.07.35_1_txtucn.jpg",
  },
  {
    title: "Devotional Publications",
    description: "Printed and digital literature that carries sacred guidance into daily life.",
    href: ROUTES.knowledge.studyResources,
    icon: ScrollIcon,
    iconImage: "https://res.cloudinary.com/der8zinu8/image/upload/v1776929974/WhatsApp_Image_2026-04-23_at_13.07.35_5_bw1f0e.jpg",
  },
  {
    title: "Digital Outreach",
    description: "Timeless wisdom made accessible through modern communication and global channels.",
    href: ROUTES.digital.index,
    icon: SignalIcon,
    iconImage: "https://res.cloudinary.com/der8zinu8/image/upload/v1776929974/WhatsApp_Image_2026-04-23_at_13.07.35_2_iw84qr.jpg",
  },
];

const VALUES = [
  {
    title: "Compassion",
    description: "See others with sensitivity, kindness, and responsibility.",
  },
  {
    title: "Humility",
    description: "Remain grounded before God, truth, and the dignity of others.",
  },
  {
    title: "Truth",
    description: "Live with integrity, clarity, and alignment between thought and action.",
  },
  {
    title: "Seva",
    description: "Transform devotion into disciplined contribution and care.",
  },
];

const RHYTHM = [
  {
    title: "Mangala Reflection",
    description: "Begin the day with remembrance and spiritual centering.",
  },
  {
    title: "Bhagwat Study Window",
    description: "Reserve time for reflective reading and scriptural contemplation.",
  },
  {
    title: "Satsang and Bhajan",
    description: "Nourish the heart through collective devotion and sacred sound.",
  },
  {
    title: "Seva in Conduct",
    description: "Express spirituality through helpful action and disciplined behavior.",
  },
  {
    title: "Night Gratitude",
    description: "Close the day with reflection, surrender, and thankfulness.",
  },
];

const sectionClass = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
const sectionPad = "py-10 md:py-14 lg:py-20";

export default memo(function SpiritualPage() {
  usePageMeta(
    "Spiritual Mission",
    "Spiritual mission of Bhagwat Heritage rooted in Shrimad Bhagwat, devotion, dharma, wisdom, seva, daily practice, and value-based living.",
  );

  return (
    <main className="spiritual-mission-page min-h-screen overflow-hidden bg-[#F7F1E7] text-[#6B5A48]">
      <Hero />

      <Section id="sacred-path" eyebrow="Four living anchors" title="Mission Pillars">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PILLARS.map((pillar, index) => (
            <FeatureCard key={pillar.title} {...pillar} delay={index} />
          ))}
        </div>
      </Section>

      <section className={`${sectionClass} ${sectionPad}`}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
          <article className="sacred-card p-6 md:p-9 lg:p-10">
            <p className="section-kicker">Mission Core</p>
            <h2 className="section-title mt-3">Mission Behind the Trust</h2>
            <div className="mt-6 space-y-5 text-base leading-[1.7] md:text-[17px]">
              <p>
                Bhagwat Heritage exists to nurture a spiritually awakened and value-rooted society through the living
                wisdom of Shrimad Bhagwat.
              </p>
              <p>
                Our mission is not limited to discourse alone. It seeks to inspire conscious living, devotional depth,
                disciplined character, compassion in action, and a dharmic worldview for individuals, families, and society.
              </p>
              <p>
                Through katha, satsang, publications, seva, and outreach, the trust strives to bring timeless spiritual
                knowledge into practical life so that devotion becomes lived experience, not only heard philosophy.
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-[22px] border border-[#E8D9C4] bg-[#F3E4C8] shadow-[0_16px_34px_rgba(105,73,36,0.1)]">
              <img
                src={MISSION_CORE_IMAGE}
                alt="Sacred devotional mission visual with warm temple-inspired spiritual atmosphere"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </article>

          <div className="grid gap-6">
            <ListCard title="Guiding Outcomes" items={GUIDING_OUTCOMES} icon={LotusIcon} iconImage={GUIDING_OUTCOMES_IMAGE} />
            <ListCard title="Daily Spiritual Direction" items={DAILY_DIRECTION} icon={DiyaIcon} iconImage={DAILY_DIRECTION_IMAGE} />
          </div>
        </div>
      </section>

      <Section
        eyebrow="Sacred Platforms"
        title="Sacred Platforms of Spiritual Awakening"
        intro="The mission is carried into society through living platforms of spiritual engagement and value transmission."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {PLATFORMS.map((platform, index) => (
            <article
              key={platform.title}
              className="sacred-card group flex h-full flex-col items-center p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(105,73,36,0.16)]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {platform.iconImage ? (
                <CircleImageBadge src={platform.iconImage} alt={`${platform.title} icon`} />
              ) : (
                <CircleIconBadge icon={platform.icon} />
              )}
              <h3 className="mt-5 text-[18px] font-bold leading-tight text-[#3F3123]">{platform.title}</h3>
              <p className="mt-3 flex-1 text-base leading-[1.7] text-[#6B5A48]">{platform.description}</p>
              <Link
                to={platform.href}
                className="mt-5 inline-flex w-fit items-center rounded-full text-sm font-bold text-[#A96F1D] transition hover:text-[#3F3123] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D89B2B]"
              >
                Learn More
                <span aria-hidden="true" className="ml-2 transition group-hover:translate-x-1">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <section className={`${sectionClass} ${sectionPad}`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="sacred-card p-6 md:p-8">
            <p className="section-kicker">Life Transformation</p>
            <h2 className="section-title mt-3">Values in Practice</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {VALUES.map((value) => (
                <div key={value.title} className="rounded-[18px] border border-[#E8D9C4] bg-[#FFF8EC] p-5">
                  <h3 className="text-[18px] font-bold text-[#3F3123]">{value.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-[#6B5A48]">{value.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-[22px] border border-[#E8D9C4] bg-[#F3E4C8] shadow-[0_16px_34px_rgba(105,73,36,0.1)]">
              <img
                src={VALUES_IMAGE}
                alt="Devotional values in practice visual"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </article>

          <article className="sacred-card p-6 md:p-8">
            <p className="section-kicker">Daily Practice</p>
            <h2 className="section-title mt-3">Daily Spiritual Rhythm</h2>
            <div className="mt-7 space-y-5">
              {RHYTHM.map((item, index) => (
                <div key={item.title} className="relative pl-10">
                  {index < RHYTHM.length - 1 ? (
                    <span className="absolute left-[11px] top-9 h-[calc(100%+10px)] w-px bg-[#E8D9C4]" aria-hidden="true" />
                  ) : null}
                  <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#F3E4C8] ring-4 ring-[#FFFDF9]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D89B2B]" />
                  </span>
                  <p className="text-sm font-bold text-[#A96F1D]">0{index + 1}</p>
                  <h3 className="mt-1 text-[18px] font-bold text-[#3F3123]">{item.title}</h3>
                  <p className="mt-2 text-base leading-[1.7] text-[#6B5A48]">{item.description}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={`${sectionClass} py-8 md:py-12`}>
        <div className="relative overflow-hidden rounded-[28px] border border-[#E8D9C4] bg-[#F3E4C8] px-6 py-10 text-center shadow-[0_18px_42px_rgba(105,73,36,0.1)] md:px-12">
          <QuoteIcon className="mx-auto h-10 w-10 text-[#D89B2B]" />
          <p className="mx-auto mt-5 max-w-4xl text-[22px] font-semibold leading-[1.55] text-[#3F3123] md:text-[28px]">
            A spiritual mission is fulfilled when wisdom becomes conduct, devotion becomes character, and service becomes
            a way of life.
          </p>
        </div>
      </section>

      <section className={`${sectionClass} py-10 pb-16 md:py-16 lg:pb-24`}>
        <div className="relative overflow-hidden rounded-[32px] border border-[#E8D9C4] bg-[linear-gradient(135deg,#FFF7E8_0%,#F3D08C_48%,#D89B2B_100%)] px-6 py-12 shadow-[0_28px_70px_rgba(145,91,25,0.22)] md:px-12 md:py-16">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/25 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 right-8 text-[120px] font-black leading-none text-white/15 md:text-[190px]" aria-hidden="true">
            ॐ
          </div>
          <div className="relative max-w-3xl">
            <p className="section-kicker text-[#7A4F16]">Join the mission</p>
            <h2 className="mt-3 text-[30px] font-bold leading-tight text-[#3F3123] md:text-[42px]">
              Walk with a Living Spiritual Mission
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[#5E4630] md:text-[18px]">
              Support a mission rooted in Bhagwat wisdom, value-based living, sacred culture, and compassionate service
              for society.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={ROUTES.contact} className="cta-button bg-[#3F3123] text-white hover:bg-[#261C13]">
                Contact the Trust
              </Link>
              <Link to={ROUTES.donate} className="cta-button bg-white text-[#A96F1D] hover:bg-[#FFF8EC]">
                Support Seva
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
});

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fff8ef] pb-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,180,94,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(196,109,26,0.09),transparent_32%)]" />
      <div className="inner-hero relative min-h-[640px] overflow-hidden rounded-b-[40px] bg-cover bg-center shadow-[0_18px_40px_rgba(23,12,5,0.14)]">
        <img
          src={HERO_IMAGE}
          alt="Devotional Bhagwat Katha gathering with sacred warm light"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_88%,rgba(233,184,93,0.22),transparent_34%)]" />

        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-end justify-center px-6 py-16 text-center md:px-8 md:py-20">
          <div className="spiritual-fade-up w-full max-w-4xl px-2 py-4 text-white md:px-6 md:py-6">
            <p className="inline-flex rounded-full border border-[#f7e0a0]/50 bg-black/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f7e0a0] backdrop-blur">
            Bhagwat Heritage Foundation
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-[#f9e6a8] md:text-5xl">
              Spiritual Mission
            </h1>
            <p className="mt-5 text-[18px] font-semibold leading-[1.45] text-[#f7e0a0] sm:text-[24px] md:text-[34px]">
              A path of faith, values, and spiritual awakening
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#sacred-path"
                className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full bg-[#e4b45e] px-8 text-base font-bold text-[#fff7df] shadow-[0_18px_34px_rgba(196,109,26,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d08a32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f9e6a8]"
              >
                Explore Sacred Path
              </a>
              <Link
                to={ROUTES.involved.volunteer}
                className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full border border-[#f7e0a0]/60 bg-black/10 px-8 text-base font-bold text-[#f9e6a8] transition-all duration-300 hover:bg-[#f9e6a8] hover:text-[#33210f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f9e6a8]"
              >
                Join the Mission
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, intro, children }: { id?: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className={`${sectionClass} ${sectionPad}`}>
      <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
        <p className="section-kicker">{eyebrow}</p>
        <h2 className="section-title mt-3">{title}</h2>
        {intro ? <p className="mt-4 text-base leading-[1.7] text-[#6B5A48] md:text-[17px]">{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  iconImage,
  delay,
}: {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
  iconImage?: string;
  delay: number;
}) {
  return (
    <article
      className="sacred-card spiritual-reveal flex h-full flex-col items-center p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(105,73,36,0.16)]"
      style={{ animationDelay: `${delay * 80}ms` }}
    >
      {iconImage ? <CircleImageBadge src={iconImage} alt={`${title} icon`} /> : <CircleIconBadge icon={icon} />}
      <h3 className="mt-5 text-[18px] font-bold leading-tight text-[#3F3123]">{title}</h3>
      <p className="mt-3 text-base leading-[1.7] text-[#6B5A48]">{description}</p>
    </article>
  );
}

function ListCard({
  title,
  items,
  icon,
  iconImage,
}: {
  title: string;
  items: string[];
  icon: ComponentType<IconProps>;
  iconImage?: string;
}) {
  return (
    <article className="sacred-card p-6 text-center md:p-7">
      {iconImage ? (
        <CircleImageBadge src={iconImage} alt={`${title} icon`} />
      ) : (
        <CircleIconBadge icon={icon} small />
      )}
      <h3 className="mt-5 text-[22px] font-bold text-[#3F3123]">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-[16px] border border-[#E8D9C4] bg-[#FFF8EC] px-4 py-3 text-base font-medium text-[#6B5A48]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D89B2B]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function CircleIconBadge({ icon: Icon, small = false }: { icon: ComponentType<IconProps>; small?: boolean }) {
  const size = small ? "h-[87px] w-[87px]" : "h-[101px] w-[101px]";
  const iconSize = small ? "h-8 w-8" : "h-9 w-9";

  return (
    <div className={`flex ${size} items-center justify-center text-[#D89B2B]`}>
      <Icon className={iconSize} />
    </div>
  );
}

function CircleImageBadge({ src, alt, small = false }: { src: string; alt: string; small?: boolean }) {
  const size = small ? "h-[87px] w-[87px]" : "h-[101px] w-[101px]";
  // Increase the image itself by reducing padding, and remove outer badge circle.
  const padding = small ? "p-0.5" : "p-0.5";

  return (
    <img
      src={src}
      alt={alt}
      className={`${size} rounded-full object-cover shadow-[0_14px_30px_rgba(111,78,25,0.10)] ${padding}`}
      loading="lazy"
    />
  );
}

function SvgIcon({ children, className = "h-7 w-7" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}

function BookIcon(props: IconProps) {
  return <SvgIcon {...props}><path d="M5 5.8C5 4.8 5.8 4 6.8 4H20v14.5H7.2C6 18.5 5 19.5 5 20.7V5.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M5 20.7C5 19.5 6 18.5 7.2 18.5H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M9 8h7M9 11.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function DharmaIcon(props: IconProps) {
  return <SvgIcon {...props}><circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" /><path d="M12 4.5v15M4.5 12h15M6.7 6.7l10.6 10.6M17.3 6.7 6.7 17.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" /></SvgIcon>;
}

function DiyaIcon(props: IconProps) {
  return <SvgIcon {...props}><path d="M5 13.5c1.2 4 4 6 7 6s5.8-2 7-6H5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M12 13.4c-1.5-1.6-1.5-3.4.2-5.4 2 1.7 2.3 3.6.7 5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 16.5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function GlobeIcon(props: IconProps) {
  return <SvgIcon {...props}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" /><path d="M4 12h16M12 4c2.1 2.2 3.1 4.9 3.1 8s-1 5.8-3.1 8c-2.1-2.2-3.1-4.9-3.1-8s1-5.8 3.1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></SvgIcon>;
}

function TempleIcon(props: IconProps) {
  return <SvgIcon {...props}><path d="M4 9.2 12 4l8 5.2H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8M4.5 20h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function LotusIcon(props: IconProps) {
  return <SvgIcon {...props}><path d="M12 18.8c-3.6-1.6-5.4-4-5.4-7.2 2.5.1 4.3 1.3 5.4 3.6 1.1-2.3 2.9-3.5 5.4-3.6 0 3.2-1.8 5.6-5.4 7.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M12 15.2C10.3 13.2 10.3 10.4 12 7c1.7 3.4 1.7 6.2 0 8.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function ScrollIcon(props: IconProps) {
  return <SvgIcon {...props}><path d="M7 5.5h9.5A2.5 2.5 0 0 1 19 8v10H8a3 3 0 0 1-3-3V7.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M8 18a3 3 0 0 0 3-3V7.5a2 2 0 0 0-2-2H7" stroke="currentColor" strokeWidth="1.8" /><path d="M13.5 10H16M13.5 13.5H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function SignalIcon(props: IconProps) {
  return <SvgIcon {...props}><path d="M5 17.5h.01M8.6 14.6a4.8 4.8 0 0 1 6.8 0M5.5 11.5a9.2 9.2 0 0 1 13 0M3 8a12.7 12.7 0 0 1 18 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function QuoteIcon(props: IconProps) {
  return <SvgIcon {...props}><path d="M8.8 7.5C6.9 8.7 6 10.4 6 12.8v3.7h5.2v-5H8.8c.1-1.1.7-2 1.9-2.7L8.8 7.5ZM16.3 7.5c-1.9 1.2-2.8 2.9-2.8 5.3v3.7h5.2v-5h-2.4c.1-1.1.7-2 1.9-2.7l-1.9-1.3Z" fill="currentColor" /></SvgIcon>;
}
