import { memo, type ComponentType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type IconProps = { className?: string };

// Requested placeholder filenames. We keep fallbacks so the page never renders broken images.
const IMAGE = {
  hero: "/images/cultural-renaissance-hero.jpg",
  mission: "/images/cultural-mission.jpg",
  gallery1: "/images/cultural-gallery-1.jpg",
  gallery2: "/images/cultural-gallery-2.jpg",
  gallery3: "/images/cultural-gallery-3.jpg",
  gallery4: "/images/cultural-gallery-4.jpg",
  cta: "/images/cultural-cta-banner.jpg",
} as const;

const FALLBACK = {
  hero: "https://res.cloudinary.com/der8zinu8/image/upload/v1776933958/ChatGPT_Image_Apr_23_2026_02_14_48_PM_mol7ro.png",
  mission: "/images/bhagwatstudy.jpg",
  gallery1: "/images/upcommigevents.jpg",
  gallery2: "/images/bhagwatstudy.jpg",
  gallery3: "/images/kathaimage.webp",
  gallery4: "/images/pilgrim-information.jpg",
  cta: "/images/hanuman-banner-02.jpg",
} as const;

const sectionClass = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
const sectionPad = "py-10 md:py-14 lg:py-20";

const stats = [
  { label: "Festivals Hosted", value: "120+" },
  { label: "Youth Trained", value: "3,500+" },
  { label: "Cultural Workshops", value: "260+" },
  { label: "Pilgrimage Groups", value: "90+" },
] as const;

const programCards = [
  {
    title: "Festival Preservation",
    description: "Organising spiritually meaningful festivals with devotion, discipline, and community participation.",
    href: ROUTES.eventsKatha.festivals,
    icon: FestivalIcon,
  },
  {
    title: "Youth Sanskar Camps",
    description: "Helping children and youth grow through values, devotion, learning, and cultural exposure.",
    href: ROUTES.eventsKatha.youthPrograms,
    icon: YouthIcon,
  },
  {
    title: "Art & Heritage",
    description: "Preserving bhajan, sacred arts, storytelling, and devotional cultural traditions.",
    href: ROUTES.media.highlights,
    icon: HeritageArtIcon,
  },
  {
    title: "Pilgrimage & Yatra",
    description: "Connecting devotees with sacred places and spiritually meaningful travel experiences.",
    href: ROUTES.mandirTeerth.pilgrimage,
    icon: YatraIcon,
  },
  {
    title: "Devotional Music",
    description: "Encouraging bhajan, kirtan, and sacred musical expression in community life.",
    href: ROUTES.eventsKatha.spiritualEvents,
    icon: MusicIcon,
  },
  {
    title: "Family Value Programs",
    description: "Strengthening family-centered tradition, observances, and value-based participation.",
    href: ROUTES.about.activities,
    icon: FamilyIcon,
  },
] as const;

const missionSteps = [
  {
    title: "Cultural Identification",
    description: "Recognising local traditions, festival practices, and value-based community needs.",
    icon: IdentifyIcon,
  },
  {
    title: "Planning & Coordination",
    description: "Designing structured cultural programs with community, volunteers, and spiritual guidance.",
    icon: PlanIcon,
  },
  {
    title: "Training & Preparation",
    description: "Preparing children, youth, and coordinators through orientation, practice, and devotional context.",
    icon: TrainIcon,
  },
  {
    title: "Celebration & Participation",
    description: "Executing events, gatherings, workshops, and pilgrimages with beauty, discipline, and meaning.",
    icon: ParticipateIcon,
  },
  {
    title: "Continuity & Growth",
    description: "Ensuring follow-up, recurring observance, and long-term cultural engagement.",
    icon: GrowIcon,
  },
] as const;

const impactCards = [
  {
    title: "Festival Continuity",
    description: "Ensuring annual observances remain disciplined, devotional, and community-connected.",
    icon: CalendarSunIcon,
  },
  {
    title: "Youth Identity Formation",
    description: "Helping young minds discover belonging through value-rich cultural participation.",
    icon: IdentityIcon,
  },
  {
    title: "Heritage Visibility",
    description: "Making Sanatan values visible through events, storytelling, art, and public celebration.",
    icon: VisibilityIcon,
  },
  {
    title: "Community Participation",
    description: "Creating shared spaces where families and devotees actively live tradition together.",
    icon: CommunityHandsIcon,
  },
] as const;

const participationCards = [
  {
    title: "Sponsor a Cultural Program",
    description: "Help sustain meaningful cultural initiatives.",
    button: "Sponsor Now",
    href: ROUTES.donate,
    icon: SponsorIcon,
  },
  {
    title: "Join as Volunteer",
    description: "Offer your time and energy in living seva.",
    button: "Become Volunteer",
    href: ROUTES.involved.volunteer,
    icon: VolunteerIcon,
  },
  {
    title: "Support Youth Sanskar Initiatives",
    description: "Support value-based learning for the next generation.",
    button: "Support Youth",
    href: ROUTES.donate,
    icon: YouthIcon,
  },
  {
    title: "Collaborate for Community Events",
    description: "Partner with us for spiritually rooted cultural outreach.",
    button: "Collaborate",
    href: ROUTES.contact,
    icon: PartnerIcon,
  },
] as const;

export default memo(function CulturalPage() {
  usePageMeta(
    "Cultural Renaissance",
    "Cultural renaissance of Bhagwat Heritage: festivals, devotional arts, youth sanskar, pilgrimage, heritage continuity, and public participation.",
  );

  const scrollToPrograms = () => {
    document.getElementById("programs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#F7F1E7] text-[#6B5A48]">
      <Hero onExplorePrograms={scrollToPrograms} />

      <section className={`${sectionClass} -mt-12 pb-8 md:-mt-14`}>
        <div className="rounded-[30px] border border-[#E8D9C4] bg-[#FFFDF9]/92 p-4 shadow-[0_22px_54px_rgba(111,78,25,0.12)] backdrop-blur md:p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <article
                key={item.label}
                className="rounded-[22px] border border-[#E8D9C4] bg-white px-5 py-6 text-center transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(111,78,25,0.12)]"
              >
                <p className="text-[34px] font-black leading-none text-[#1D4F63]">{item.value}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-[#A96F1D]">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Section
        id="mission"
        eyebrow="Core Mission"
        title="Reviving Culture with Living Participation"
        subtitle="Cultural renaissance is not only preservation. It is a living, visible, and meaningful way of life."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-stretch">
          <div className="sacred-card overflow-hidden">
            <SafeImage
              src={IMAGE.mission}
              fallbackSrc={FALLBACK.mission}
              alt="Youth and families participating in cultural learning and devotional heritage"
              className="h-[320px] w-full object-cover sm:h-[380px] lg:h-full"
            />
          </div>

          <article className="sacred-card p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#A96F1D]">Mission Narrative</p>
            <h2 className="mt-3 text-[26px] font-black leading-tight text-[#1D4F63] md:text-[30px]">
              Culture becomes strongest when it is practiced together
            </h2>
            <div className="mt-5 space-y-4 text-base leading-[1.75] text-[#6B5A48]">
              <p>
                Cultural Renaissance is the revival of living tradition through festivals, values, devotional arts, youth
                formation, and shared community participation.
              </p>
              <p>
                It is not only about preserving the memory of culture, but about making culture visible, meaningful, and
                active in daily life.
              </p>
              <p>
                Through cultural programs, sanskar camps, heritage initiatives, devotional gatherings, and pilgrimage
                support, Bhagwat Heritage Service Foundation Trust works to reconnect families, children, and youth with
                the timeless spirit of Sanatan heritage.
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "Living tradition, not symbolic display",
                "Youth rooted in values and identity",
                "Community-connected devotional continuity",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[16px] border border-[#E8D9C4] bg-[#FFF8EC] px-4 py-3 text-[15px] font-semibold leading-[1.6] text-[#6B5A48]"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D89B2B]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section
        id="programs"
        eyebrow="Cultural Programs"
        title="What We Carry Forward"
        subtitle="Programs designed to strengthen heritage, youth identity, devotional arts, and community continuity."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
          {programCards.map((card, index) => (
            <ProgramCard key={card.title} {...card} delay={index} />
          ))}
        </div>
      </Section>

      <Section
        id="process"
        eyebrow="Mission Flow"
        title="How the Mission Works"
        subtitle="A devotional process that moves from local culture to lasting continuity."
      >
        <div className="grid gap-4 lg:grid-cols-5 lg:gap-5">
          {missionSteps.map((step, index) => (
            <ProcessCard key={step.title} stepNumber={index + 1} {...step} />
          ))}
        </div>
      </Section>

      <Section
        id="impact"
        eyebrow="Cultural Impact"
        title="What This Mission Protects and Grows"
        subtitle="The outcomes that keep heritage alive, youthful, and community-connected."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {impactCards.map((item) => (
            <article key={item.title} className="sacred-card p-7 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(111,78,25,0.14)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E8D9C4] bg-[#FFF8EC] text-[#D89B2B]">
                  <item.icon className="h-7 w-7" />
                </div>
                <span className="rounded-full border border-[#E8D9C4] bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#A96F1D]">
                  Impact
                </span>
              </div>
              <h3 className="mt-5 text-[22px] font-black leading-tight text-[#1D4F63]">{item.title}</h3>
              <p className="mt-3 text-base leading-[1.75] text-[#6B5A48]">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="gallery"
        eyebrow="Gallery"
        title="Cultural Moments in Action"
        subtitle="Festivals, youth learning, devotional arts, and sacred journeys in living practice."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <GalleryImage src={IMAGE.gallery1} fallbackSrc={FALLBACK.gallery1} alt="Festival celebration moment" />
          <GalleryImage src={IMAGE.gallery2} fallbackSrc={FALLBACK.gallery2} alt="Youth sanskar and cultural learning" />
          <GalleryImage src={IMAGE.gallery3} fallbackSrc={FALLBACK.gallery3} alt="Devotional music and bhajan gathering" />
          <GalleryImage src={IMAGE.gallery4} fallbackSrc={FALLBACK.gallery4} alt="Pilgrimage group and heritage gathering" />
        </div>
      </Section>

      <Section
        id="participation"
        eyebrow="Participation"
        title="Be a Part of Cultural Renewal"
        subtitle="Multiple ways to serve, support, and carry heritage into daily life."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {participationCards.map((card) => (
            <article key={card.title} className="sacred-card flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(111,78,25,0.14)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E8D9C4] bg-[#FFF8EC] text-[#D89B2B]">
                <card.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-[18px] font-black leading-tight text-[#1D4F63]">{card.title}</h3>
              <p className="mt-3 flex-1 text-base leading-[1.7] text-[#6B5A48]">{card.description}</p>
              <Link
                to={card.href}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#D89B2B] px-5 text-sm font-black text-white shadow-[0_14px_28px_rgba(177,112,24,0.2)] transition hover:-translate-y-0.5 hover:bg-[#B97916] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D89B2B]"
              >
                {card.button}
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <section className={`${sectionClass} pb-16 md:pb-20 lg:pb-24`}>
        <div className="relative overflow-hidden rounded-[34px] border border-[#E8D9C4] bg-[#1D4F63] shadow-[0_30px_80px_rgba(29,79,99,0.24)]">
          <SafeImage
            src={IMAGE.cta}
            fallbackSrc={FALLBACK.cta}
            alt="Cultural heritage devotional atmosphere banner"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,34,48,0.86)_0%,rgba(29,79,99,0.58)_55%,rgba(29,79,99,0.22)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_32%,rgba(233,184,93,0.32),transparent_36%)]" />

          <div className="relative p-8 md:p-12">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FFE7B0]">Final Call</p>
            <h2 className="mt-4 text-[30px] font-black leading-tight text-white md:text-[44px]">Help Keep Tradition Alive</h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.75] text-white/90 md:text-[18px]">
              Support living culture, devotional values, and heritage continuity for the next generation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={ROUTES.donate}
                className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full bg-[#E4B45E] px-8 text-base font-black text-[#fff7df] shadow-[0_18px_34px_rgba(196,109,26,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D08A32]"
              >
                Donate for Culture
              </Link>
              <Link
                to={ROUTES.involved.volunteer}
                className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full border border-white/45 bg-black/10 px-8 text-base font-black text-white transition-all duration-300 hover:bg-white hover:text-[#0f2236]"
              >
                Join the Mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
});

function Hero({ onExplorePrograms }: { onExplorePrograms: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#fff8ef] pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,180,94,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(29,79,99,0.12),transparent_32%)]" />
      <div className="inner-hero relative min-h-[680px] overflow-hidden rounded-b-[44px] bg-cover bg-center shadow-[0_18px_40px_rgba(23,12,5,0.14)]">
        <SafeImage
          src={IMAGE.hero}
          fallbackSrc={FALLBACK.hero}
          alt="Cultural heritage devotional atmosphere"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/46" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(233,184,93,0.24),transparent_40%)]" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-6xl items-end justify-center px-6 py-16 text-center md:px-8 md:py-20">
          <div className="w-full max-w-4xl px-2 py-4 text-white md:px-6 md:py-6">
            <h1 className="mt-5 text-4xl font-black leading-tight text-[#f9e6a8] md:text-6xl">
              Cultural Renaissance
            </h1>
            <p className="mt-5 text-[18px] font-semibold leading-[1.45] text-[#f7e0a0] sm:text-[22px] md:text-[28px]">
              Preserve tradition, celebrate heritage, and carry timeless values into modern life.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={onExplorePrograms}
                className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full bg-[#e4b45e] px-8 text-base font-black text-[#fff7df] shadow-[0_18px_34px_rgba(196,109,26,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d08a32]"
              >
                Explore Programs
              </button>
              <Link
                to={ROUTES.involved.volunteer}
                className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full border border-[#f7e0a0]/60 bg-black/10 px-8 text-base font-black text-[#f9e6a8] transition-all duration-300 hover:bg-[#f9e6a8] hover:text-[#33210f]"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${sectionClass} ${sectionPad}`}>
      <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
        <p className="section-kicker">{eyebrow}</p>
        <h2 className="mt-3 text-[26px] font-black leading-tight text-[#1D4F63] md:text-[32px]">{title}</h2>
        {subtitle ? <p className="mt-4 text-base leading-[1.75] text-[#6B5A48] md:text-[17px]">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function ProgramCard({
  title,
  description,
  href,
  icon: Icon,
  delay,
}: {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<IconProps>;
  delay: number;
}) {
  return (
    <article
      className="sacred-card group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(111,78,25,0.14)]"
      style={{ animationDelay: `${delay * 80}ms` }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E8D9C4] bg-[#FFF8EC] text-[#D89B2B]">
          <Icon className="h-7 w-7" />
        </div>
        <span className="h-1.5 w-12 rounded-full bg-[linear-gradient(90deg,#D89B2B,#E9B85D)]" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-[18px] font-black leading-tight text-[#1D4F63]">{title}</h3>
      <p className="mt-3 flex-1 text-base leading-[1.7] text-[#6B5A48]">{description}</p>
      <Link
        to={href}
        className="mt-5 inline-flex w-fit items-center rounded-full bg-[#D89B2B] px-4 py-2 text-sm font-black text-white transition hover:bg-[#B97916] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D89B2B]"
      >
        Explore
      </Link>
    </article>
  );
}

function ProcessCard({
  stepNumber,
  title,
  description,
  icon: Icon,
}: {
  stepNumber: number;
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
}) {
  return (
    <article className="sacred-card relative flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E8D9C4] bg-[#FFF8EC] text-[#D89B2B]">
          <Icon className="h-6 w-6" />
        </div>
        <span className="rounded-full border border-[#E8D9C4] bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#A96F1D]">
          Step {stepNumber}
        </span>
      </div>
      <h3 className="mt-5 text-[18px] font-black leading-tight text-[#1D4F63]">{title}</h3>
      <p className="mt-3 text-[15px] leading-[1.75] text-[#6B5A48]">{description}</p>
    </article>
  );
}

function GalleryImage({ src, fallbackSrc, alt }: { src: string; fallbackSrc: string; alt: string }) {
  return (
    <div className="group sacred-card overflow-hidden p-0">
      <SafeImage
        src={src}
        fallbackSrc={fallbackSrc}
        alt={alt}
        className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-[1.06] sm:h-[260px] lg:h-[220px]"
        loading="lazy"
      />
    </div>
  );
}

function SafeImage({
  src,
  fallbackSrc,
  alt,
  className,
  loading = "eager",
  fetchPriority,
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={(event) => {
        const img = event.currentTarget;
        if (img.dataset.fallbackApplied === "true") return;
        img.dataset.fallbackApplied = "true";
        img.src = fallbackSrc;
      }}
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

function FestivalIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 3.5c1.8 1.8 2.5 3.3 2.5 4.8 0 1.5-1 2.7-2.5 3.4-1.5-.7-2.5-1.9-2.5-3.4 0-1.5.7-3 2.5-4.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 20h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.5 12.5h9l-1.3 6.2H8.8l-1.3-6.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function YouthIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 20c.7-3.2 3.1-5.3 6.5-5.3S17.8 16.8 18.5 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16.8 6.4 19 4.2M19 6.4 16.8 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function HeritageArtIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M7 19c4.8-7.8 8.8-7.8 10 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 12.5c2.6-1 4.5-2.4 6-4.7 1.5 2.3 3.4 3.7 6 4.7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function YatraIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8.2c2.1 1.2 3.1 2.5 3.1 3.9 0 1.4-1.4 2.6-3.1 2.6s-3.1-1.2-3.1-2.6c0-1.4 1-2.7 3.1-3.9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function MusicIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M15 4v10.2c0 1.7-1.4 3-3.1 3S8.8 16 8.8 14.3c0-1.7 1.4-3 3.1-3 .6 0 1.2.1 1.7.4V6.4l7-1.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 6.4 22 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function FamilyIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M8.2 11a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2ZM15.8 10.6a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.8 19c.6-2.9 2.6-4.6 5.3-4.6h.4c2.7 0 4.7 1.7 5.3 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15.8 14.5c2.1.2 3.7 1.6 4.2 4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function IdentifyIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10.2a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z" stroke="currentColor" strokeWidth="1.8" />
    </SvgIcon>
  );
}

function PlanIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M7 4.8h10c1.1 0 2 .9 2 2V19H7c-1.1 0-2-.9-2-2V6.8c0-1.1.9-2 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.5 9h7M8.5 12h5.2M8.5 15h6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function TrainIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M7 19V6.8c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2V19" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 10h6M9 13h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 19h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function ParticipateIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 12.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.2 20c.8-3.2 3.3-5.2 6.8-5.2s6 2 6.8 5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function GrowIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M5 19c7.2 0 11-4.2 14-14 0 7.2-3 14-14 14Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.2 18c.3-3.9 2.4-6.6 6.7-8.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function CalendarSunIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M7 5v2M17 5v2M6 9h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 7h10c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 12.3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z" stroke="currentColor" strokeWidth="1.8" />
    </SvgIcon>
  );
}

function IdentityIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 20.5c4.6 0 8.3-3.1 8.3-7s-3.7-7-8.3-7-8.3 3.1-8.3 7 3.7 7 8.3 7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.2 13.7c.6-1.6 1.7-2.5 2.8-2.5s2.2.9 2.8 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.2 10.5h.01M14.8 10.5h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </SvgIcon>
  );
}

function VisibilityIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M2.8 12s3.2-6 9.2-6 9.2 6 9.2 6-3.2 6-9.2 6-9.2-6-9.2-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z" stroke="currentColor" strokeWidth="1.8" />
    </SvgIcon>
  );
}

function CommunityHandsIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M7.2 13.4c-1.6 0-2.9-1.3-2.9-2.9S5.6 7.6 7.2 7.6s2.9 1.3 2.9 2.9-1.3 2.9-2.9 2.9ZM16.8 13.4c-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9 2.9 1.3 2.9 2.9-1.3 2.9-2.9 2.9Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 20c.6-2.7 2.6-4.4 5.2-4.4h.9M20.5 20c-.6-2.7-2.6-4.4-5.2-4.4h-.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.8 17.2c.6-1.2 1.3-1.9 2.2-1.9s1.6.7 2.2 1.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function SponsorIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 20s-7-4.4-7-10.2C5 7.1 7.1 5 9.7 5c1.3 0 2.5.5 3.3 1.4C13.8 5.5 15 5 16.3 5 18.9 5 21 7.1 21 9.8 21 15.6 14 20 14 20h-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 8.2v6.3M8.9 11.4h6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function VolunteerIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.2 20c.8-3.2 3.3-5.2 6.8-5.2s6 2 6.8 5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 6.2h4M19 4.2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function PartnerIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M7.8 13.2 12 9l4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 19c0-2.8 2.2-5 5-5h5c2.8 0 5 2.2 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 9V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}
