import { memo, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "./sevaTypography";

type IconProps = { className?: string };

type HighlightCard = {
  title: string;
  text: string;
  icon: ComponentType<IconProps>;
  image?: string;
};

type ServiceCard = HighlightCard & {
  cta: string;
  to: string;
  image: string;
};

type ActionCard = {
  title: string;
  text: string;
  button: string;
  to: string;
  icon: ComponentType<IconProps>;
  image?: string;
};

type ProcessStep = {
  step: string;
  title: string;
  text: string;
};

type Testimonial = {
  quote: string;
  name: string;
};

const heroImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1776782891/ChatGPT_Image_Apr_21_2026_08_16_15_PM_vnx9ol.png";
const aboutImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1776788092/ChatGPT_Image_Apr_21_2026_09_44_15_PM_dkaegm.png";
const ctaImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1776794338/ChatGPT_Image_Apr_21_2026_11_28_38_PM_lqk5sb.png";

const quickHighlights: HighlightCard[] = [
  {
    title: "Learning Continuity",
    text: "Helping students continue education with practical support.",
    icon: BookOpenIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/4_x9oa5q.png",
  },
  {
    title: "Study Material Support",
    text: "Books, kits, and essential learning resources for children.",
    icon: SchoolKitIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788578/2_cjskwf.png",
  },
  {
    title: "Mentor Guidance",
    text: "Volunteers and guides supporting student progress.",
    icon: MentorIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/8_dm6iop.png",
  },
  {
    title: "Rural Outreach",
    text: "Extending support to underserved communities and villages.",
    icon: CommunityIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/6_akwkqm.png",
  },
];

const supportServices: ServiceCard[] = [
  {
    title: "Scholarship Support",
    text: "Financial assistance for school, college, or need-based student education support.",
    cta: "Support This Cause",
    to: ROUTES.donate,
    icon: ScholarshipIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788578/1_pqp7q9.png",
  },
  {
    title: "School Kit Distribution",
    text: "Providing notebooks, school bags, stationery, and essential academic materials.",
    cta: "Sponsor Kits",
    to: ROUTES.donate,
    icon: SchoolKitIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788578/2_cjskwf.png",
  },
  {
    title: "Digital Learning Support",
    text: "Access to online learning tools, devices, or digital learning assistance where needed.",
    cta: "Fund Access",
    to: ROUTES.donate,
    icon: LaptopIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/3_fz3xr2.png",
  },
  {
    title: "Free Coaching Support",
    text: "Academic guidance and foundational support for students preparing to progress in studies.",
    cta: "Support Learning",
    to: ROUTES.donate,
    icon: BookOpenIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/4_x9oa5q.png",
  },
  {
    title: "Skill Development",
    text: "Encouraging practical learning, spoken skills, confidence, and growth-oriented education.",
    cta: "Encourage Skills",
    to: ROUTES.donate,
    icon: GrowthIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/7_leuo8e.png",
  },
  {
    title: "Girl Child Education",
    text: "Supporting the learning journey of girls through access, awareness, and encouragement.",
    cta: "Sponsor Education",
    to: ROUTES.donate,
    icon: TrustIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/5_ulkrty.png",
  },
  {
    title: "Library & Learning Centers",
    text: "Building shared learning spaces with books and educational resources for communities.",
    cta: "Support Library",
    to: ROUTES.donate,
    icon: LibraryIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/6_akwkqm.png",
  },
  {
    title: "Career Guidance & Mentorship",
    text: "Connecting students with guidance, direction, and mentorship for future growth.",
    cta: "Join as Mentor",
    to: ROUTES.involved.volunteer,
    icon: GraduationIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776788577/8_dm6iop.png",
  },
];

const participationCards: ActionCard[] = [
  {
    title: "Sponsor a Student",
    text: "Help a learner continue education with direct and meaningful support.",
    button: "Sponsor Now",
    to: ROUTES.donate,
    icon: GraduationIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776791703/13_y4oozs.png",
  },
  {
    title: "Donate Learning Materials",
    text: "Contribute books, stationery, school kits, or educational essentials.",
    button: "Contribute Materials",
    to: ROUTES.donate,
    icon: SchoolKitIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776791703/11_yfr06u.png",
  },
  {
    title: "Become a Mentor",
    text: "Offer guidance, encouragement, and learning support through volunteer mentorship.",
    button: "Join as Mentor",
    to: ROUTES.involved.volunteer,
    icon: MentorIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776791703/12_lwchms.png",
  },
];

const processSteps: ProcessStep[] = [
  {
    step: "STEP 1",
    title: "Identify Learners",
    text: "Support needs are identified through outreach, schools, families, and trusted local networks.",
  },
  {
    step: "STEP 2",
    title: "Understand the Need",
    text: "The team assesses academic, material, and guidance-based educational requirements.",
  },
  {
    step: "STEP 3",
    title: "Deliver Support",
    text: "Study materials, sponsorship, learning access, or mentorship support is arranged as needed.",
  },
  {
    step: "STEP 4",
    title: "Follow Up Progress",
    text: "Student continuity and learning progress are tracked with care and responsibility.",
  },
  {
    step: "STEP 5",
    title: "Encourage Growth",
    text: "Ongoing educational motivation and support help sustain meaningful development.",
  },
];

const sponsorshipOptions: ActionCard[] = [
  {
    title: "Study Kit Support",
    text: "Help provide basic learning materials for one student.",
    button: "Donate for Kits",
    to: ROUTES.donate,
    icon: SchoolKitIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776791703/11_yfr06u.png",
  },
  {
    title: "Monthly Learning Support",
    text: "Support recurring educational needs with steady monthly contribution.",
    button: "Support Monthly",
    to: ROUTES.donate,
    icon: BookOpenIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776793603/montholy_kit_qrgvpj.png",
  },
  {
    title: "Digital Access Support",
    text: "Help improve learning access through digital education assistance.",
    button: "Fund Digital Learning",
    to: ROUTES.donate,
    icon: LaptopIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776793603/digital_access_ycfxrf.png",
  },
  {
    title: "Full Student Sponsorship",
    text: "Support a student's broader learning journey through dedicated sponsorship.",
    button: "Sponsor a Student",
    to: ROUTES.donate,
    icon: ScholarshipIcon,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776793603/sponsor_tudent_cpsqpi.png",
  },
];

const testimonials: Testimonial[] = [
  {
    quote: "This educational support brought real continuity to my studies when resources were limited.",
    name: "Student Beneficiary",
  },
  {
    quote: "We felt relieved to receive help with books and learning materials at the right time.",
    name: "Parent Beneficiary",
  },
  {
    quote: "Even a little educational guidance can renew confidence and direction in a child's future.",
    name: "Volunteer Mentor",
  },
];

const trustIndicators = ["Need-Based Support", "Guided Distribution", "Follow-Up Approach"];

const primaryButtonClass =
  "inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D89B2B] px-7 text-base font-black text-white shadow-[0_14px_30px_rgba(177,112,24,0.22)] transition hover:-translate-y-0.5 hover:bg-[#B97916]";

const secondaryButtonClass =
  "inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#D89B2B] bg-white/85 px-7 text-base font-black text-[#8A5B16] shadow-[0_10px_24px_rgba(111,78,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#FFF4D6]";

function BookOpenIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 4.5h5.2c1.1 0 1.8.7 1.8 1.8V20c0-1.2-.8-2-2-2H5V4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M19 4.5h-5.2c-1.1 0-1.8.7-1.8 1.8V20c0-1.2.8-2 2-2h5V4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function GraduationIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 8.5 12 4l9 4.5-9 4.5L3 8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 11v4.5c1.6 1.4 3.3 2.1 5 2.1s3.4-.7 5-2.1V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 9v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SchoolKitIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 8V6.5C7 5.1 8.1 4 9.5 4h5C15.9 4 17 5.1 17 6.5V8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 8h14v11H5V8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LaptopIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 5h14v10H5V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3.5 19h17l-1.8-4H5.3l-1.8 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function MentorIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19c.6-3 2.8-5 5.7-5h.7c2.9 0 5.1 2 5.7 5M15.5 14.2c2.2.3 3.9 1.8 4.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LibraryIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 4h4v16H5V4ZM10 6h4v14h-4V6ZM15 5h4v15h-4V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ScholarshipIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3.5 14.4 8l5 .8-3.6 3.5.9 5-4.7-2.4-4.7 2.4.9-5L4.6 8.8l5-.8L12 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function CommunityIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5.5 4 11v8h16v-8l-8-5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 19v-5h6v5M7 8V5h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TrustIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 19 6v5.7c0 4.2-2.9 7.7-7 9.3-4.1-1.6-7-5.1-7-9.3V6l7-3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.8 12.1 2 2 4.4-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GrowthIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 18h16M6 15l4-4 3 3 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMark({ icon: Icon }: { icon: ComponentType<IconProps> }) {
  return (
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#FFF0DA] text-[#C46D1A]">
      <Icon />
    </span>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#b96a22]`}>{eyebrow}</p> : null}
      <h2 className={`${SEVA_SECTION_HEADING_CLASS} text-[#1d4f63]`}>{title}</h2>
      {subtitle ? <p className={`mx-auto mt-4 max-w-2xl ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{subtitle}</p> : null}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative -mx-6 -mt-12 overflow-hidden bg-[#fff8ef] pb-8 md:-mx-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,180,94,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(196,109,26,0.09),transparent_32%)]" />
      <div className="inner-hero relative min-h-[640px] overflow-hidden rounded-b-[40px] bg-cover bg-center shadow-[0_18px_40px_rgba(23,12,5,0.14)]">
        <img
          src={heroImage}
          alt="Education support banner with books and learning environment"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-end justify-center px-6 py-16 text-center md:px-8 md:py-20">
          <div className="w-full max-w-4xl px-2 py-4 text-white md:px-6 md:py-6">
            <h1 className="text-4xl font-bold leading-tight text-[#f9e6a8] md:text-5xl">Education Seva</h1>
            <p className={`mt-5 ${SEVA_HERO_SUBTITLE_CLASS} text-[#f7e0a0]`}>
              Educate a child, empower a future
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to={ROUTES.donate}
                className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full bg-[#e4b45e] px-8 text-base font-bold text-[#fff7df] shadow-[0_18px_34px_rgba(196,109,26,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d08a32]"
              >
                Sponsor a Student
              </Link>
              <Link
                to={ROUTES.involved.volunteer}
                className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center rounded-full border border-[#f7e0a0]/60 bg-black/10 px-8 text-base font-bold text-[#f9e6a8] transition-all duration-300 hover:bg-[#f9e6a8] hover:text-[#33210f]"
              >
                Became a volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickImpactSection() {
  return (
    <section className="relative z-10 mx-auto mt-[5px] max-w-7xl px-4 md:px-8">
      <div className="rounded-[30px] border border-[#E8D9BD] bg-[#FFFDF8]/96 p-4 shadow-[0_20px_48px_rgba(111,78,25,0.12)] backdrop-blur md:p-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {quickHighlights.map((item) => (
            <article key={item.title} className="flex min-h-[170px] flex-col items-center justify-center rounded-[22px] border border-[#E8D9BD] bg-white px-5 py-6 text-center transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(111,78,25,0.1)]">
              {item.image ? (
                <img src={item.image} alt="" className="h-24 w-24 rounded-full object-contain" loading="lazy" aria-hidden="true" />
              ) : (
                <IconMark icon={item.icon} />
              )}
              <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{item.title}</h3>
              <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
      <div className="overflow-hidden rounded-[36px] border border-[#E8D9BD] bg-[#FFFDF8] shadow-[0_22px_54px_rgba(111,78,25,0.09)]">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 md:p-10">
            <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#b96a22]`}>About Education Seva</p>
            <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-4 text-[#1d4f63]`}>Education Seva</h2>
            <div className={`mt-6 space-y-5 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
              <p>
                Education Seva is a heartfelt initiative to support children and learners with the resources, guidance, and encouragement they need to continue their educational journey with dignity and confidence.
              </p>
              <p>
                Through this seva, the trust aims to assist students who need study materials, academic support, mentorship, and access to meaningful learning opportunities, especially where families or communities face limitations.
              </p>
              <p>
                We believe education should not only build knowledge, but also nurture values, discipline, confidence, and inner growth along with academic progress.
              </p>
            </div>
          </div>
          <div className="relative min-h-[360px] bg-[#F3E7C9]">
            <img src={aboutImage} alt="Student learning support initiative" className="h-full min-h-[360px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A3422]/55 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="bg-[#FFFDF8] px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Ways We Support Learning" subtitle="Focused educational seva for meaningful student development." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {supportServices.map((item) => (
            <article key={item.title} className="flex h-full flex-col rounded-[26px] border border-[#E8D9BD] bg-[#FFF9F0] p-6 text-center shadow-[0_16px_36px_rgba(111,78,25,0.07)] transition hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(111,78,25,0.12)]">
              <span className="mx-auto flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full">
                <img src={item.image} alt={`${item.title} icon`} className="h-[68px] w-[68px] rounded-full object-cover" loading="lazy" />
              </span>
              <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} leading-tight text-[#1d4f63]`}>{item.title}</h3>
              <p className={`mt-3 flex-1 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{item.text}</p>
              <Link to={item.to} className={`${secondaryButtonClass} mt-6 w-full px-4 text-sm`}>
                {item.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParticipateSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
      <div className="rounded-[36px] border border-[#D8A84D] bg-[linear-gradient(135deg,#FFF0D1_0%,#FFFDF8_52%,#F7E6C8_100%)] p-6 shadow-[0_24px_58px_rgba(111,78,25,0.12)] md:p-10">
        <SectionHeader title="How You Can Participate" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {participationCards.map((item) => (
            <article key={item.title} className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[#E1C58E] bg-white/95 text-center shadow-[0_18px_42px_rgba(111,78,25,0.09)]">
              <div className="aspect-[16/8.5] w-full overflow-hidden bg-[#FFF2DD]">
                <img src={item.image} alt={`${item.title} education support`} className="h-full w-full object-contain object-center md:object-cover" loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className={`${SEVA_CARD_TITLE_CLASS} text-[#1d4f63]`}>{item.title}</h3>
                <p className={`mt-3 flex-1 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{item.text}</p>
                <Link to={item.to} className={`${primaryButtonClass} mt-7 w-full`}>
                  {item.button}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-[#F8F3E8] px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Our Support Process" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {processSteps.map((item) => (
            <article key={item.step} className="rounded-[26px] border border-[#E8D9BD] bg-[#FFFDF8] p-6 shadow-[0_14px_34px_rgba(111,78,25,0.07)]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#B97916]">{item.step}</p>
              <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS} leading-tight text-[#1d4f63]`}>{item.title}</h3>
              <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorshipSection() {
  return (
    <section className="bg-[#FFFDF8] px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Support Education Through Seva" subtitle="Choose a meaningful way to sustain learning without interrupting a child's dignity or confidence." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sponsorshipOptions.map((item) => (
            <article key={item.title} className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[#E8D9BD] bg-white shadow-[0_18px_42px_rgba(111,78,25,0.08)] transition hover:-translate-y-1">
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#FFF2DD]">
                <img src={item.image} alt={`${item.title} education seva`} className="h-full w-full object-contain object-center md:object-cover" loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className={`${SEVA_CARD_TITLE_CLASS} leading-tight text-[#1d4f63]`}>{item.title}</h3>
                <p className={`mt-3 flex-1 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>{item.text}</p>
                <Link to={item.to} className={`${primaryButtonClass} mt-7 w-full px-4 text-sm`}>
                  {item.button}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
      <SectionHeader title="Voices of Impact" />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-[28px] border border-[#E8D9BD] bg-[#FFF9F0] p-6 shadow-[0_16px_36px_rgba(111,78,25,0.08)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF0DA] text-3xl font-black text-[#C46D1A]">"</div>
            <p className={`mt-5 italic ${SEVA_BODY_TEXT_CLASS} text-[#4A3422]`}>"{item.quote}"</p>
            <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#B97916]">{item.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="bg-[#FFFDF8] px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl rounded-[34px] border border-[#E8D9BD] bg-[#F8F3E8] p-6 shadow-[0_18px_42px_rgba(111,78,25,0.08)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#b96a22]`}>Trust and Transparency</p>
            <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-4 text-[#1d4f63]`}>Responsible and Meaningful Support</h2>
            <p className={`mt-5 ${SEVA_BODY_TEXT_CLASS} text-[#5e5247]`}>
              Education support is carried forward through need-based assessment, disciplined seva channels, and thoughtful follow-up. The objective is not only to provide materials, but to support continuity, dignity, confidence, and real learning progress wherever possible.
            </p>
          </div>
          <div className="grid gap-4">
            {trustIndicators.map((item) => (
              <div key={item} className="flex items-center gap-4 rounded-[22px] border border-[#E8D9BD] bg-white px-5 py-4 shadow-[0_12px_28px_rgba(111,78,25,0.06)]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D89B2B] text-sm font-black text-white">✓</span>
                <p className="text-lg font-black text-[#4A3422]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#D8A84D] bg-[linear-gradient(135deg,#E0A126_0%,#F4CF72_100%)] p-6 shadow-[0_24px_58px_rgba(111,78,25,0.14)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#B96A22]`}>Education Seva</p>
            <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-4 text-[#4A3422]`}>Help a Child Continue Learning with Dignity</h2>
            <p className={`mt-5 max-w-2xl ${SEVA_BODY_TEXT_CLASS} text-[#4A3422]`}>
              Your contribution, mentorship, or support can become a meaningful step in someone's educational journey.
            </p>
          </div>
          <div className="grid gap-3">
            <Link to={ROUTES.donate} className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-white px-7 text-base font-black text-[#7A4A12] shadow-[0_12px_28px_rgba(111,78,25,0.1)] transition hover:-translate-y-0.5 hover:bg-[#FFF9EC]">
              Donate Now
            </Link>
            <Link to={ROUTES.involved.volunteer} className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/75 bg-white/18 px-7 text-base font-black text-[#4A3422] transition hover:-translate-y-0.5 hover:bg-white">
              Become a Mentor
            </Link>
            <Link to={ROUTES.contact} className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/75 bg-white/18 px-7 text-base font-black text-[#4A3422] transition hover:-translate-y-0.5 hover:bg-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(function EducationPage() {
  usePageMeta(
    "Education Support Seva",
    "Bhagwat Heritage Service Foundation Trust education support page for study materials, mentorship, sponsorship, digital learning, and student continuity.",
  );

  return (
    <div className="bg-[#F8F3E8] pb-8 text-[#4A3422]">
      <HeroSection />
      <QuickImpactSection />
      <AboutSection />
      <ServicesSection />
      <ParticipateSection />
      <ProcessSection />
      <SponsorshipSection />
      <VoicesSection />
      <TrustSection />
      <FinalCTASection />
    </div>
  );
});
