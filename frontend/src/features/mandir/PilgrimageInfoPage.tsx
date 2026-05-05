import { memo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type IconName =
  | "aarti"
  | "annadan"
  | "booking"
  | "contact"
  | "darshan"
  | "donation"
  | "email"
  | "festival"
  | "guidelines"
  | "location"
  | "lotus"
  | "map"
  | "parking"
  | "phone"
  | "prasad"
  | "railway"
  | "seating"
  | "seva"
  | "support"
  | "temple"
  | "washroom"
  | "water";

type CardItem = {
  icon: IconName;
  imageIcon?: string;
  title: string;
  text: string;
};

const BOOK_DARSHAN_PATH = "/mandir-teerth/book-darshan";
const LIVE_DARSHAN_PATH = "/digital-services/live-darshan";
const GOOGLE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Bhagwat%20Dham%20Shree%20Swaminarayan%20Mandir%20Kasturba%20Rd%20Hospital%20Ward%20Chandrapur%20Maharashtra%20442402";
const GOOGLE_MAP_EMBED =
  "https://www.google.com/maps?q=Shree%20Swaminarayan%20Mandir%20Kasturba%20Rd%20Hospital%20Ward%20Chandrapur%20Maharashtra%20442402&output=embed";
const HERO_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567841/...a_bqnehe.png";
const TEMPLE_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777461510/ChatGPT_Image_Apr_29_2026_04_47_38_PM_y7pdnh.png";
const LIVE_DARSHAN_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567691/ChatGPT_Image_Apr_30_2026_10_15_35_PM_he0lrd.png";
const ANNADAN_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777490318/ChatGPT_Image_Apr_30_2026_12_48_10_AM_yknax0.png";
const ABOUT_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567679/ChatGPT_Image_Apr_30_2026_10_16_00_PM_jgplqt.png";
const LOCATION_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567675/ChatGPT_Image_Apr_30_2026_10_16_31_PM_gbzhqw.png";
const RAILWAY_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567675/ChatGPT_Image_Apr_30_2026_10_16_26_PM_ut049p.png";
const LANDMARK_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567675/ChatGPT_Image_Apr_30_2026_10_16_19_PM_eypq8h.png";
const DARSHAN_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567681/ChatGPT_Image_Apr_30_2026_10_16_04_PM_qssfl8.png";
const AARTI_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567680/ChatGPT_Image_Apr_30_2026_10_16_08_PM_uzxkwk.png";
const ANNADAN_SEVA_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777193608/ChatGPT_Image_Apr_26_2026_01_44_55_PM_jzfpur.png";
const TEMPLE_SEVA_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777191421/ChatGPT_Image_Apr_26_2026_01_44_24_PM_itcgun.png";
const DONATION_SUPPORT_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1776967400/g8_cw3tcs.png";
const ONLINE_BOOKING_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777475469/ChatGPT_Image_Apr_29_2026_08_39_10_PM_jwofut.png";
const CONTACT_SUPPORT_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777461510/ChatGPT_Image_Apr_29_2026_04_47_13_PM_n9toxl.png";
const DRESS_CODE_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567690/ChatGPT_Image_Apr_30_2026_10_15_42_PM_zp8ntr.png";
const PHOTOGRAPHY_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567686/ChatGPT_Image_Apr_30_2026_10_15_47_PM_ok72vu.png";
const CLEANLINESS_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567682/ChatGPT_Image_Apr_30_2026_10_15_53_PM_sy3eun.png";
const RESPECT_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567681/ChatGPT_Image_Apr_30_2026_10_16_14_PM_c6byju.png";
const GROUP_VISIT_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567676/ChatGPT_Image_Apr_30_2026_10_16_35_PM_lgadux.png";
const PARKING_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777567675/ChatGPT_Image_Apr_30_2026_10_16_41_PM_dpwcg0.png";
const WATER_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777471883/ChatGPT_Image_Apr_29_2026_07_38_43_PM_nooxl2.png";
const WASHROOM_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777471882/ChatGPT_Image_Apr_29_2026_07_38_35_PM_nqwsdl.png";
const BASIC_SUPPORT_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777471881/ChatGPT_Image_Apr_29_2026_07_39_06_PM_hx0jez.png";
const SEATING_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777471879/ChatGPT_Image_Apr_29_2026_07_39_57_PM_wimqzr.png";
const HELP_DESK_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777461510/ChatGPT_Image_Apr_29_2026_04_47_13_PM_n9toxl.png";
const PHONE_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777524779/ChatGPT_Image_Apr_30_2026_10_22_15_AM_stfwld.png";
const EMAIL_ICON_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1777524779/ChatGPT_Image_Apr_30_2026_10_22_20_AM_unse1i.png";

const rhythm = [
  ["Morning Darshan", "09:00 AM - 12:00 PM"],
  ["Evening Darshan", "04:00 PM - 09:00 PM"],
  ["Thursday Prasad", "11:00 AM"],
  ["Evening Aarti", "07:00 PM"],
];

const timings: CardItem[] = [
  { icon: "darshan", imageIcon: DARSHAN_ICON_IMAGE, title: "Morning Darshan", text: "09:00 AM - 12:00 PM" },
  { icon: "aarti", imageIcon: AARTI_ICON_IMAGE, title: "Morning Aarti", text: "09:00 AM" },
  { icon: "darshan", imageIcon: DARSHAN_ICON_IMAGE, title: "Evening Darshan", text: "04:00 PM - 09:00 PM" },
  { icon: "aarti", imageIcon: AARTI_ICON_IMAGE, title: "Evening Aarti", text: "07:00 PM" },
];

const sevaCards: CardItem[] = [
  {
    icon: "annadan",
    imageIcon: ANNADAN_SEVA_ICON_IMAGE,
    title: "Annadan Seva",
    text: "Support sacred food service for devotees through Annadan and prasad distribution.",
  },
  {
    icon: "seva",
    imageIcon: TEMPLE_SEVA_ICON_IMAGE,
    title: "Temple Seva",
    text: "Contribute toward darshan readiness, mandir care, and devotional hospitality.",
  },
  {
    icon: "donation",
    imageIcon: DONATION_SUPPORT_ICON_IMAGE,
    title: "Donation Support",
    text: "Help sustain activities, seva arrangements, and spiritual visitor support.",
  },
];

const festivals: CardItem[] = [
  { icon: "festival", title: "Janmashtami", text: "Celebrate Bhagwan Krishna with bhajan, darshan, and devotional utsav." },
  { icon: "festival", title: "Sanatan Dharma Utsav", text: "A cultural and spiritual celebration rooted in dharma and family values." },
  { icon: "lotus", title: "Guru Purnima", text: "Offer gratitude to the guru parampara through satsang and seva." },
  { icon: "prasad", title: "Annakut Mahotsav", text: "A festive offering of devotion, prasad, and community participation." },
  { icon: "temple", title: "Hanuman Janmotsav", text: "A powerful day of devotion, strength, prayer, and seva." },
  { icon: "darshan", title: "Bhagwat Katha Mahotsav", text: "Spiritual discourses and satsang for families and devotees." },
];

const guidelines: CardItem[] = [
  {
    icon: "guidelines",
    imageIcon: DRESS_CODE_ICON_IMAGE,
    title: "Dress Code",
    text: "Only Indian traditional attire in keeping with Sanatan culture is encouraged.",
  },
  {
    icon: "guidelines",
    imageIcon: PHOTOGRAPHY_ICON_IMAGE,
    title: "Photography",
    text: "Photography is allowed with respectful conduct inside the mandir environment.",
  },
  {
    icon: "guidelines",
    imageIcon: CLEANLINESS_ICON_IMAGE,
    title: "Cleanliness and Discipline",
    text: "Maintain cleanliness, silence where needed, and disciplined spiritual behavior.",
  },
  {
    icon: "guidelines",
    imageIcon: RESPECT_ICON_IMAGE,
    title: "Respectful Conduct",
    text: "Devotees are requested to follow temple sevaks and mandir guidelines.",
  },
  {
    icon: "guidelines",
    imageIcon: GROUP_VISIT_ICON_IMAGE,
    title: "Group Visit Guidance",
    text: "Large groups should contact the temple team before arrival.",
  },
];

const facilities: CardItem[] = [
  { icon: "parking", imageIcon: PARKING_ICON_IMAGE, title: "Parking", text: "Basic parking support for visiting devotees and families." },
  { icon: "water", imageIcon: WATER_ICON_IMAGE, title: "Drinking Water", text: "Drinking water facilities are available for devotees." },
  { icon: "washroom", imageIcon: WASHROOM_ICON_IMAGE, title: "Washrooms", text: "Washroom access is available for essential convenience." },
  { icon: "support", imageIcon: BASIC_SUPPORT_ICON_IMAGE, title: "Basic Support Services", text: "On-site support for visit guidance and simple needs." },
  { icon: "seating", imageIcon: SEATING_ICON_IMAGE, title: "Seating Area", text: "Seating support for peaceful waiting and participation." },
  { icon: "contact", imageIcon: HELP_DESK_ICON_IMAGE, title: "Devotee Help Desk", text: "Guidance for timings, facilities, and group visits." },
];

const sectionClass = "mx-auto max-w-[1180px] px-4 py-10 sm:py-12 lg:py-16";
const cardClass =
  "rounded-[24px] border border-[#ecd2a5] bg-white/95 p-5 shadow-[0_16px_36px_rgba(101,71,35,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(101,71,35,0.15)]";

function Icon({ name }: { name: IconName }) {
  const pathClass = "stroke-current";
  const common = {
    className: "h-6 w-6",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const simple: Record<IconName, ReactNode> = {
    aarti: <><path className={pathClass} d="M12 3c2.5 2.6 4 5 4 7.2A4 4 0 0 1 8 10.2C8 8 9.5 5.6 12 3Z" /><path className={pathClass} d="M5 19h14" /><path className={pathClass} d="M8 15h8" /></>,
    annadan: <><path className={pathClass} d="M4 14h16" /><path className={pathClass} d="M6 14a6 6 0 0 0 12 0" /><path className={pathClass} d="M8 10c0-1.7 1.3-3 3-3" /></>,
    booking: <><rect className={pathClass} x="5" y="4" width="14" height="16" rx="2" /><path className={pathClass} d="M8 8h8M8 12h8M8 16h5" /></>,
    contact: <><path className={pathClass} d="M5 6h14v12H5z" /><path className={pathClass} d="m5 7 7 6 7-6" /></>,
    darshan: <><path className={pathClass} d="M4 20h16" /><path className={pathClass} d="M6 20V10l6-5 6 5v10" /><path className={pathClass} d="M10 20v-5h4v5" /></>,
    donation: <><path className={pathClass} d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" /></>,
    email: <><rect className={pathClass} x="4" y="6" width="16" height="12" rx="2" /><path className={pathClass} d="m4 8 8 6 8-6" /></>,
    festival: <><path className={pathClass} d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" /><path className={pathClass} d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" /></>,
    guidelines: <><path className={pathClass} d="M12 3l7 3v5c0 4.2-2.6 7.7-7 10-4.4-2.3-7-5.8-7-10V6l7-3Z" /><path className={pathClass} d="m9.5 11.5 1.7 1.7 3.3-3.7" /></>,
    location: <><path className={pathClass} d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle className={pathClass} cx="12" cy="10" r="2.5" /></>,
    lotus: <><path className={pathClass} d="M12 5c3 3 4 5.2 4 7a4 4 0 0 1-8 0c0-1.8 1-4 4-7Z" /><path className={pathClass} d="M4 13c3.2.2 5.8 1.7 8 5 2.2-3.3 4.8-4.8 8-5" /></>,
    map: <><path className={pathClass} d="M9 18 4 20V6l5-2 6 2 5-2v14l-5 2-6-2Z" /><path className={pathClass} d="M9 4v14M15 6v14" /></>,
    parking: <><rect className={pathClass} x="5" y="4" width="14" height="16" rx="3" /><path className={pathClass} d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" /></>,
    phone: <><path className={pathClass} d="M7 4h3l1.5 4-2 1.5a14.6 14.6 0 0 0 5 5l1.5-2L20 14v3a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 5 6.2 2 2 0 0 1 7 4Z" /></>,
    prasad: <><path className={pathClass} d="M5 13h14" /><path className={pathClass} d="M7 13a5 5 0 0 0 10 0" /><path className={pathClass} d="M9 9c0-1.4 1.1-2.5 2.5-2.5" /><path className={pathClass} d="M12 9c0-1.4 1.1-2.5 2.5-2.5" /></>,
    railway: <><rect className={pathClass} x="6" y="4" width="12" height="13" rx="3" /><path className={pathClass} d="M9 20l2-3M15 20l-2-3M9 8h6M9 12h.01M15 12h.01" /></>,
    seating: <><path className={pathClass} d="M6 18v-5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5" /><path className={pathClass} d="M4 18h16M8 18v3M16 18v3" /></>,
    seva: <><path className={pathClass} d="M8 12l4 3 4-3" /><path className={pathClass} d="M6 10V8a2 2 0 0 1 2-2h1.5L12 8l2.5-2H16a2 2 0 0 1 2 2v2" /><path className={pathClass} d="M5 12h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4Z" /></>,
    support: <><circle className={pathClass} cx="12" cy="12" r="8" /><path className={pathClass} d="M9.5 10a2.5 2.5 0 1 1 4.3 1.7c-.9.8-1.8 1.3-1.8 2.8" /><path className={pathClass} d="M12 17h.01" /></>,
    temple: <><path className={pathClass} d="M3 20h18" /><path className={pathClass} d="M5 10h14" /><path className={pathClass} d="M7 10v10M12 10v10M17 10v10" /><path className={pathClass} d="M4 10l8-6 8 6" /></>,
    washroom: <><path className={pathClass} d="M8 21v-7H6l2-7h3l2 7h-2v7" /><path className={pathClass} d="M16 21V7" /><circle className={pathClass} cx="9.5" cy="4" r="1.5" /><circle className={pathClass} cx="16" cy="4" r="1.5" /></>,
    water: <><path className={pathClass} d="M12 3s6 6.2 6 10a6 6 0 1 1-12 0c0-3.8 6-10 6-10Z" /><path className={pathClass} d="M9.5 14.5A3 3 0 0 0 14 16" /></>,
  };

  return (
    <svg {...common} stroke="currentColor">
      {simple[name]}
    </svg>
  );
}

function IconBadge({ name }: { name: IconName }) {
  return (
    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#f1d4a3] bg-[#fff3dc] text-[#c96f18] shadow-[0_10px_22px_rgba(151,91,28,0.10)]">
      <Icon name={name} />
    </span>
  );
}

function SectionHeader({ eyebrow, title, subtitle, align = "left" }: { eyebrow?: string; title: string; subtitle?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto mb-8 max-w-3xl text-center" : "mb-8 max-w-3xl"}>
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c96f18]">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl font-black leading-tight text-[#173d4c] sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base leading-7 text-[#6b5b4a] sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

function InfoCard({ item }: { item: CardItem }) {
  return (
    <article className={`${cardClass} text-center`}>
      {item.imageIcon ? (
        <img src={item.imageIcon} alt={`${item.title} icon`} className="mx-auto h-20 w-20 rounded-full object-cover shadow-[0_10px_22px_rgba(151,91,28,0.12)]" loading="lazy" />
      ) : (
        <span className="mx-auto inline-flex">
          <IconBadge name={item.icon} />
        </span>
      )}
      <h3 className="mt-4 text-xl font-black text-[#173d4c]">{item.title}</h3>
      <p className="mt-3 text-base leading-7 text-[#625342]">{item.text}</p>
    </article>
  );
}

function ButtonLink({ children, to, tone = "primary" }: { children: ReactNode; to: string; tone?: "primary" | "secondary" | "teal" }) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles = {
    primary: "bg-[#f39b18] text-white shadow-[0_14px_28px_rgba(191,105,18,0.24)] hover:bg-[#df8610] focus-visible:outline-[#f39b18]",
    secondary: "border border-[#d89c43] bg-white/85 text-[#7a4513] hover:bg-[#fff3dc] focus-visible:outline-[#d89c43]",
    teal: "bg-[#0f7f84] text-white shadow-[0_14px_28px_rgba(15,127,132,0.20)] hover:bg-[#0b6c71] focus-visible:outline-[#0f7f84]",
  };

  if (to.startsWith("http") || to.startsWith("tel:") || to.startsWith("mailto:")) {
    return (
      <a href={to} target={to.startsWith("http") ? "_blank" : undefined} rel={to.startsWith("http") ? "noreferrer" : undefined} className={`${base} ${styles[tone]}`}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={`${base} ${styles[tone]}`}>
      {children}
    </Link>
  );
}

export default memo(function PilgrimageInfoPage() {
  usePageMeta(
    "Bhagwat Dham Chandrapur Pilgrimage Information | Bhagwat Heritage",
    "Plan your visit to Bhagwat Dham Chandrapur with darshan timings, aarti schedule, prasad seva, location, facilities, rules, and contact information.",
    "Bhagwat Dham, Chandrapur Mandir, Shree Swaminarayan Mandir, Darshan Timing, Bhagwat Heritage, Pilgrimage Information",
  );

  return (
    <div className="min-h-screen scroll-smooth bg-[linear-gradient(180deg,#fff8eb_0%,#fffdf8_42%,#f8ecd7_100%)] text-[#332417]">
      <section className="px-4 pt-6 sm:pt-8">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[32px] border border-[#edcf98] bg-[#2a160b] shadow-[0_24px_70px_rgba(120,70,22,0.18)]">
          <div className="relative flex min-h-[660px] items-end justify-center px-5 pb-12 pt-10 sm:px-8 sm:pb-16 lg:px-12">
            <img src={HERO_IMAGE} alt="Bhagwat Dham pilgrimage atmosphere with temple and devotional light" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,232,0.02)_0%,rgba(255,242,206,0.05)_45%,rgba(48,24,8,0.42)_100%)]" />
            <div className="relative mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">Bhagwat Dham Chandrapur</h1>
              <p className="mt-4 text-2xl font-bold leading-tight text-[#ffe8bd] sm:text-4xl">A Divine Place of Darshan, Seva, and Spiritual Living</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <ButtonLink to="/get-involved/contactUs">Contact Us</ButtonLink>
                <ButtonLink to={"/digital-services/donation-system"} tone="secondary">Donate Now</ButtonLink>
                <ButtonLink to={"https://www.google.com/maps/place/Bhagwat+Heritage+Service+Foundation+Trust/@19.953639,79.2948411,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd2d42c3dd21143:0x15bb2d6a255e7182!8m2!3d19.953639!4d79.297416!16s%2Fg%2F11gdfj8w6q?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"} tone="teal">Open Route Map</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="overflow-hidden rounded-[28px] border border-[#edcf98] bg-white shadow-[0_16px_36px_rgba(101,71,35,0.10)] lg:h-full">
            <img src={TEMPLE_IMAGE} alt="Bhagwat Dham devotional temple visual" className="h-full min-h-[360px] w-full object-cover lg:min-h-full" />
          </div>
          <div className="rounded-[28px] border border-[#edcf98] bg-white/95 p-6 shadow-[0_16px_36px_rgba(101,71,35,0.10)] sm:p-8">
            <img src={ABOUT_ICON_IMAGE} alt="Bhagwat Dham temple icon" className="h-20 w-20 rounded-full object-cover shadow-[0_10px_22px_rgba(151,91,28,0.12)]" loading="lazy" />
            <SectionHeader title="About Bhagwat Dham" subtitle="A Sacred Destination for Devotion and Peace" />
            <p className="text-base leading-8 text-[#625342] sm:text-lg">
              Bhagwat Dham Chandrapur is a sacred spiritual destination dedicated to the teachings of Shree Swaminarayan Bhagwan. It serves as a center for devotion, satsang, seva, and value-based spiritual living rooted in Sanatan Dharma.
            </p>
          </div>
        </div>
      </section>

      <section id="plan-visit" className={sectionClass}>
        <SectionHeader align="center" title="Location and Travel" subtitle="Reach Bhagwat Dham with Clarity" />
        <div className="grid gap-5 md:grid-cols-3">
          <InfoCard item={{ icon: "location", imageIcon: LOCATION_ICON_IMAGE, title: "Location", text: "Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital Ward, Chandrapur, Maharashtra 442402" }} />
          <InfoCard item={{ icon: "railway", imageIcon: RAILWAY_ICON_IMAGE, title: "Nearest Railway Station", text: "Chandrapur Railway Station" }} />
          <InfoCard item={{ icon: "map", imageIcon: LANDMARK_ICON_IMAGE, title: "Landmark", text: "Shree Swaminarayan Mandir, Kasturba Rd" }} />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink to={GOOGLE_MAP_URL}>Open in Google Maps</ButtonLink>
          <ButtonLink to={GOOGLE_MAP_URL} tone="secondary">Get Directions</ButtonLink>
          <ButtonLink to="tel:+918688897445" tone="teal">Call for Assistance</ButtonLink>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="overflow-hidden rounded-[28px] border border-[#edcf98] bg-white shadow-[0_16px_36px_rgba(101,71,35,0.10)]">
            <iframe
              title="Temple Location Preview"
              src={GOOGLE_MAP_EMBED}
              className="h-[380px] w-full border-0 lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="rounded-[28px] border border-[#edcf98] bg-white/95 p-6 shadow-[0_16px_36px_rgba(101,71,35,0.10)] sm:p-8">
            <img src={ABOUT_ICON_IMAGE} alt="Temple location icon" className="h-20 w-20 rounded-full object-cover shadow-[0_10px_22px_rgba(151,91,28,0.12)]" loading="lazy" />
            <SectionHeader title="Temple Location Preview" subtitle="Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital Ward, Chandrapur, Maharashtra 442402" />
            <ButtonLink to={GOOGLE_MAP_URL}>Open Location and Directions</ButtonLink>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader align="center" title="Darshan and Aarti" subtitle="Timings for a Peaceful Visit" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {timings.map((item) => <InfoCard key={item.title} item={item} />)}
        </div>
        <p className="mx-auto mt-6 max-w-4xl rounded-2xl border border-[#edcf98] bg-[#fff4df] p-4 text-center text-sm leading-7 text-[#674b2f]">
          Timings may be updated during festivals and special events. Devotees are requested to confirm before planning large group visits.
        </p>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-[28px] border border-[#edcf98] bg-white shadow-[0_16px_36px_rgba(101,71,35,0.10)]">
            <img src={ANNADAN_IMAGE} alt="Annadan and prasad seva for devotees" className="h-full min-h-[320px] w-full object-cover" />
          </div>
          <div className="rounded-[28px] border border-[#edcf98] bg-[linear-gradient(135deg,#fff0d2_0%,#fffdf8_62%,#e9f5f3_100%)] p-6 shadow-[0_16px_36px_rgba(101,71,35,0.10)] sm:p-8">
            <SectionHeader title="Annadan and Prasad" subtitle="Thursday Prasad Seva" />
            <p className="text-base leading-8 text-[#625342] sm:text-lg">
              Every Thursday at 11:00 AM, Prasad distribution is organized for all devotees as part of Annadan Seva.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={ROUTES.seva.ann}>Support Annadan Seva</ButtonLink>
              <ButtonLink to={ROUTES.donate} tone="secondary">Sponsor Prasad Seva</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader align="center" title="Seva and Donations" subtitle="Support Bhagwat Dham with Devotion" />
        <div className="grid gap-5 md:grid-cols-3">
          {sevaCards.map((item) => <InfoCard key={item.title} item={item} />)}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink to={ROUTES.donate}>Donate Now</ButtonLink>
          <ButtonLink to={ROUTES.involved.volunteer} tone="teal">Become a Seva Supporter</ButtonLink>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader align="center" title="Online Features" subtitle="Digital Convenience for Devotees" />
        <div className="grid gap-5 lg:grid-cols-3">
          <article className={`${cardClass} overflow-hidden p-0`}>
            <img src={ONLINE_BOOKING_ICON_IMAGE} alt="Online booking support visual" className="h-52 w-full bg-[#fff8eb] object-cover" loading="lazy" />
            <div className="p-5 text-center">
              <h3 className="text-xl font-black text-[#173d4c]">Online Booking Available</h3>
              <p className="mt-3 text-base leading-7 text-[#625342]">Devotees can connect digitally for visit planning, darshan coordination, and temple support communication.</p>
            </div>
          </article>
          <article className={`${cardClass} overflow-hidden p-0`}>
            <img src={LIVE_DARSHAN_IMAGE} alt="Live darshan visual for Bhagwat Dham devotees" className="h-52 w-full bg-[#fff8eb] object-cover" loading="lazy" />
            <div className="p-5 text-center">
              <h3 className="text-xl font-black text-[#173d4c]">Live Darshan Available</h3>
              <p className="mt-3 text-base leading-7 text-[#625342]">Stay connected to darshan and temple devotion through digital access.</p>
              <div className="mt-5">
                <ButtonLink to={LIVE_DARSHAN_PATH} tone="teal">Open Live Darshan</ButtonLink>
              </div>
            </div>
          </article>
          <article className={`${cardClass} overflow-hidden p-0`}>
            <img src={CONTACT_SUPPORT_ICON_IMAGE} alt="Contact support visual for devotees" className="h-52 w-full bg-[#fff8eb] object-cover" loading="lazy" />
            <div className="p-5 text-center">
              <h3 className="text-xl font-black text-[#173d4c]">Contact Support</h3>
              <p className="mt-3 text-base leading-7 text-[#625342]">Receive guidance for timing, location, event days, and group visits.</p>
            </div>
          </article>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeader title="Rules and Guidelines" subtitle="Temple Discipline and Conduct" />
            <div className="grid gap-4">
              {guidelines.map((item, index) => (
                <article key={item.title} className="rounded-[22px] border border-[#ecd2a5] bg-white/95 p-5 shadow-[0_14px_30px_rgba(101,71,35,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(101,71,35,0.14)]">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff3dc] text-sm font-black text-[#c96f18] ring-1 ring-[#f1d4a3]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-[#173d4c]">{item.title}</h3>
                      <p className="mt-2 text-base leading-7 text-[#625342]">{item.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Facilities" subtitle="Essential Support for Devotees" />
            <div className="grid gap-4 sm:grid-cols-2">
              {facilities.map((item) => (
                <article key={item.title} className="rounded-[22px] border border-[#ecd2a5] bg-white/95 p-5 shadow-[0_14px_30px_rgba(101,71,35,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(101,71,35,0.14)]">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c96f18]">Available</p>
                  <h3 className="mt-3 text-lg font-black text-[#173d4c]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#625342]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader align="center" title="Contact" subtitle="Connect with Bhagwat Dham" />
        <div className="grid gap-5 lg:grid-cols-3">
          <InfoCard item={{ icon: "phone", imageIcon: PHONE_ICON_IMAGE, title: "Phone", text: "+91-868-889-7445" }} />
          <InfoCard item={{ icon: "email", imageIcon: EMAIL_ICON_IMAGE, title: "Email", text: "join@bhagwatheritage.org" }} />
          <InfoCard item={{ icon: "location", imageIcon: LOCATION_ICON_IMAGE, title: "Address", text: "Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital Ward, Chandrapur, Maharashtra 442402" }} />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink to="tel:+918688897445">Call Now</ButtonLink>
          <ButtonLink to="mailto:join@bhagwatheritage.org" tone="secondary">Email Us</ButtonLink>
          <ButtonLink to={GOOGLE_MAP_URL} tone="teal">Open Route</ButtonLink>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="overflow-hidden rounded-[32px] border border-[#edcf98] bg-[linear-gradient(120deg,#ffe3a3_0%,#fff1bd_45%,#ffd36d_100%)] p-6 shadow-[0_22px_54px_rgba(118,74,27,0.15)] sm:p-9">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-black text-[#173d4c] sm:text-4xl">Plan Your Sacred Visit to Bhagwat Dham</h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-[#625342] sm:text-lg">
                Receive darshan, participate in seva, and experience a peaceful path of devotion, discipline, and divine connection.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink to="#plan-visit">Plan Your Visit</ButtonLink>
              <ButtonLink to={BOOK_DARSHAN_PATH} tone="secondary">Book Darshan</ButtonLink>
              <ButtonLink to={ROUTES.donate} tone="teal">Donate Now</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
