import { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

const MONTHS = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const CATEGORY_OPTIONS = ["All", "Jayanti", "Utsav", "Vrat", "Mahotsav", "Seva", "Parv", "National"] as const;

type Month = (typeof MONTHS)[number];
type Category = (typeof CATEGORY_OPTIONS)[number];

type FestivalEvent = {
  month: Exclude<Month, "All">;
  date: string; // e.g. 14 Jan 2026
  day: string;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
};

const IMAGE = {
  hero: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032985/ChatGPT_Image_Apr_24_2026_05_41_40_PM_tcwoaz.png",
  cta: "/images/festivals-cta-banner.jpg",
  vision: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032984/ChatGPT_Image_Apr_24_2026_05_42_03_PM_qnuuqc.png",
  supportTracksOne: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032984/ChatGPT_Image_Apr_24_2026_05_41_51_PM_etyoyq.png",
  supportTracksTwo: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032984/ChatGPT_Image_Apr_24_2026_05_41_57_PM_moholp.png",
  volunteer: "/images/festival-volunteer-seva.jpg",
  family: "/images/family-festival-participation.jpg",
  mahaprasad: "/images/mahaprasad-festival-seva.jpg",
} as const;

const ICON = {
  one: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032982/ChatGPT_Image_Apr_24_2026_05_42_22_PM_eyonw5.png",
  two: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032975/ChatGPT_Image_Apr_24_2026_05_42_29_PM_yfto9m.png",
  three: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032975/ChatGPT_Image_Apr_24_2026_05_42_35_PM_hwotsz.png",
  four: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032974/ChatGPT_Image_Apr_24_2026_05_42_39_PM_hoklrs.png",
  five: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_43_24_PM_tyq4ni.png",
  six: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_42_51_PM_rxxuvx.png",
  seven: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_43_12_PM_ark4ok.png",
  eight: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032971/ChatGPT_Image_Apr_24_2026_05_43_04_PM_xi8530.png",
  nine: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032971/ChatGPT_Image_Apr_24_2026_05_42_46_PM_yyr8hj.png",
} as const;

const FALLBACK = {
  hero: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/festival_axzy0v.jpg",
  cta: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/festival_axzy0v.jpg",
  vision: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913532/gurupurnima_gthuvv.jpg",
  supportTracksOne: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/festival_axzy0v.jpg",
  supportTracksTwo: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/festival_axzy0v.jpg",
  volunteer: "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg",
  family: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/youth_xj81l3.jpg",
  mahaprasad: "/images/annseva.png",
} as const;

function CircleIconImage({
  src,
  alt = "",
  sizeClassName = "h-[74px] w-[74px]",
  imgClassName = "",
}: {
  src: string;
  alt?: string;
  sizeClassName?: string;
  imgClassName?: string;
}) {
  return (
    <span
      className={`inline-flex ${sizeClassName} items-center justify-center overflow-hidden rounded-full border border-[#E8CFA8] bg-white shadow-[0_18px_40px_rgba(43,33,24,0.12)]`}
    >
      <img src={src} alt={alt} className={`h-full w-full rounded-full object-cover ${imgClassName}`} loading="lazy" />
    </span>
  );
}

const HIGHLIGHTS = [
  {
    title: "Annual Utsavs",
    text: "Major Hindu festivals and temple celebrations throughout the year.",
    icon: ICON.one,
  },
  {
    title: "Festival Volunteers",
    text: "Dedicated seva teams for decoration, prasadam, crowd support and coordination.",
    icon: ICON.two,
  },
  {
    title: "Family Participation",
    text: "Encourage families and children to participate in devotional celebrations.",
    icon: ICON.three,
  },
  {
    title: "Temple Calendar",
    text: "A structured annual calendar for spiritual, cultural and community events.",
    icon: ICON.four,
  },
] as const;

const VISION_CARDS = [
  {
    title: "Annual Festival Calendar",
    text: "A well-planned calendar of utsavs, jayantis, vrat-parva and temple celebrations.",
    icon: ICON.five,
  },
  {
    title: "Celebration Operations",
    text: "Organized decoration, puja arrangements, volunteer coordination and mahaprasad seva.",
    icon: ICON.six,
  },
  {
    title: "Family and Cultural Participation",
    text: "Festivals designed to connect children, youth and families with Sanatan values.",
    icon: ICON.seven,
  },
] as const;

const FESTIVALS_2026: FestivalEvent[] = [
  {
    month: "January",
    date: "14 Jan 2026",
    day: "Wednesday",
    title: "Makar Sankranti / Uttarayan",
    category: "Parv",
    description: "A sacred celebration of Surya upasana, daan, devotion and new spiritual movement.",
  },
  {
    month: "January",
    date: "26 Jan 2026",
    day: "Monday",
    title: "Vasant Panchami",
    category: "Utsav",
    description: "Worship of Maa Saraswati with learning, culture and spiritual inspiration.",
  },
  {
    month: "January",
    date: "26 Jan 2026",
    day: "Monday",
    title: "Republic Day",
    category: "National",
    description: "National celebration with cultural awareness and seva-oriented inspiration.",
  },
  {
    month: "February",
    date: "15 Feb 2026",
    day: "Sunday",
    title: "Maha Shivratri",
    category: "Vrat",
    description: "Devotional worship of Lord Shiva with bhajan, vrat, abhishek and satsang.",
  },
  {
    month: "March",
    date: "3 Mar 2026",
    day: "Tuesday",
    title: "Holika Dahan",
    category: "Utsav",
    description: "The victory of devotion and dharma over ego, negativity and adharma.",
  },
  {
    month: "March",
    date: "4 Mar 2026",
    day: "Wednesday",
    title: "Dhuleti / Holi",
    category: "Utsav",
    description: "Joyful celebration of divine colours, unity and devotional harmony.",
  },
  {
    month: "March",
    date: "27 Mar 2026",
    day: "Friday",
    title: "Shri Swaminarayan Bhagwat Dham Janmotsav",
    category: "Jayanti",
    description: "Sacred celebration of Bhagwan Swaminarayan’s divine appearance and teachings.",
  },
  {
    month: "April",
    date: "4 Apr 2026",
    day: "Saturday",
    title: "Hanuman Janmotsav",
    category: "Jayanti",
    description: "Celebration of bhakti, strength, surrender and Shri Hanumanji’s divine service.",
  },
  {
    month: "April",
    date: "6 Apr 2026",
    day: "Monday",
    title: "Ram Navami",
    category: "Jayanti",
    description: "Celebration of Maryada Purushottam Shri Ram with katha, bhajan and puja.",
  },
  {
    month: "July",
    date: "27 Jul 2026",
    day: "Monday",
    title: "Guru Purnima Mahotsav",
    category: "Mahotsav",
    description: "A sacred occasion of Guru vandana, samarpan, satsang and mahaprasad seva.",
  },
  {
    month: "August",
    date: "8 Aug 2026",
    day: "Saturday",
    title: "Janmashtami Utsav",
    category: "Jayanti",
    description: "Divine celebration of Shri Krishna Janma with bhajan, kirtan and Krishna leela.",
  },
  {
    month: "October",
    date: "20 Oct 2026",
    day: "Tuesday",
    title: "Vijaya Dashami / Dussehra",
    category: "Utsav",
    description: "Celebrating victory of dharma, courage, truth and righteousness.",
  },
  {
    month: "November",
    date: "8 Nov 2026",
    day: "Sunday",
    title: "Diwali Deep Mahotsav",
    category: "Mahotsav",
    description: "Festival of light, devotion, cleanliness, family joy and divine blessings.",
  },
  {
    month: "November",
    date: "10 Nov 2026",
    day: "Tuesday",
    title: "Annakut Mahotsav / New Year",
    category: "Mahotsav",
    description: "Offering of bhog, gratitude, satsang and community mahaprasad.",
  },
  {
    month: "November",
    date: "21 Nov 2026",
    day: "Saturday",
    title: "Prabodhini Ekadashi / Tulsi Vivah",
    category: "Vrat",
    description: "A sacred observance of bhakti, vrat, Tulsi pujan and spiritual awakening.",
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseDate(date: string) {
  const [dayStr, monStr, yearStr] = date.trim().split(/\s+/);
  const day = Number(dayStr);
  const year = Number(yearStr);
  const mon = monStr.toLowerCase();
  const months: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };
  const monthIndex = months[mon];
  if (!Number.isFinite(day) || !Number.isFinite(year) || monthIndex === undefined) {
    return null;
  }
  return new Date(year, monthIndex, day, 0, 0, 0, 0);
}

function getCategoryStyle(category: FestivalEvent["category"]) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em]";
  switch (category) {
    case "Jayanti":
      return `${base} bg-[#FFF2DE] text-[#C96F18]`;
    case "Utsav":
      return `${base} bg-[#FDF1D6] text-[#B76714]`;
    case "Vrat":
      return `${base} bg-[#E8F6F7] text-[#1F6F70]`;
    case "Mahotsav":
      return `${base} bg-[#FBF0DC] text-[#7A4A18]`;
    case "Seva":
      return `${base} bg-[#ECF8F1] text-[#166B45]`;
    case "Parv":
      return `${base} bg-[#FFF3D0] text-[#7A3F00]`;
    case "National":
      return `${base} bg-[#EEF4FF] text-[#193B7A]`;
    default:
      return `${base} bg-[#FFF2DE] text-[#C96F18]`;
  }
}

function PrimaryButton({ to, children, className }: { to: string; children: string; className?: string }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-full bg-[#F2A23A] px-6 py-3 text-sm font-black text-white shadow-[0_18px_36px_rgba(242,162,58,0.28)] transition hover:bg-[#d98f2b] ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-full border border-white/22 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/14"
    >
      {children}
    </Link>
  );
}

function SoftButton({
  to,
  children,
  className,
}: {
  to: string;
  children: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-full border border-[#E8CFA8] bg-white px-5 py-3 text-sm font-black text-[#1F6F70] shadow-[0_14px_26px_rgba(43,33,24,0.08)] transition hover:border-[#F2A23A]/70 ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}

export default memo(function FestivalsCelebrationsPremiumPage() {
  usePageMeta(
    "Festivals & Celebrations | Bhagwat Heritage Service Foundation",
    "Explore annual festivals, temple utsavs, family participation, volunteer seva and devotional celebrations at Bhagwat Heritage Service Foundation.",
  );

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState<Month>("All");
  const [category, setCategory] = useState<Category>("All");
  const [upcomingFirst, setUpcomingFirst] = useState(true);

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  }, []);

  const events = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = FESTIVALS_2026.filter((event) => {
      const matchText = normalizedSearch.length === 0 ? true : event.title.toLowerCase().includes(normalizedSearch);
      const matchMonth = month === "All" ? true : event.month === month;
      const matchCategory = category === "All" ? true : event.category === category;
      return matchText && matchMonth && matchCategory;
    });

    const withDates = filtered
      .map((event) => ({ ...event, dateObj: parseDate(event.date) }))
      .filter((event) => event.dateObj);

    const sorted = withDates.sort((a, b) => {
      const ad = a.dateObj as Date;
      const bd = b.dateObj as Date;
      if (!upcomingFirst) return ad.getTime() - bd.getTime();

      const aUpcoming = ad.getTime() >= today.getTime();
      const bUpcoming = bd.getTime() >= today.getTime();
      if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1;
      if (aUpcoming && bUpcoming) return ad.getTime() - bd.getTime();
      return bd.getTime() - ad.getTime();
    });

    return sorted;
  }, [category, month, search, today, upcomingFirst]);

  return (
    <main className="min-h-screen bg-[#FFF8EC] text-[#2B2118]">
      <section className="relative -mx-6 -mt-12 pb-8 md:-mx-8 md:pb-8">
        <div className="inner-hero overflow-hidden rounded-b-[40px] bg-[#4A3422] shadow-[0_26px_70px_rgba(74,52,34,0.2)]">
          <div className="relative h-[420px] w-full overflow-hidden md:h-[620px]">
            <SmartImage
              src={IMAGE.hero}
              fallbackSrc={FALLBACK.hero}
              alt="Festivals and celebrations hero banner with temple decoration and warm devotional light"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(90,52,10,0.55)_40%,rgba(0,0,0,0.65)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,162,58,0.34),transparent_60%)]" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.55) 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="max-w-3xl text-white"
              >
                <h1 className="text-4xl font-bold leading-tight md:text-5xl">Festivals &amp; Celebrations</h1>
                <p className="mt-4 text-lg font-semibold text-white/90 md:text-xl">
                  Tradition, devotion, family, culture and joyful seva celebrated together.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <PrimaryButton to="#festival-calendar">View Festival Calendar</PrimaryButton>
                  <SecondaryButton to={ROUTES.volunteer}>Join as Volunteer</SecondaryButton>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10 md:pt-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-[#E8CFA8] bg-white p-6 text-center shadow-[0_18px_40px_rgba(43,33,24,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_60px_rgba(43,33,24,0.12)]"
            >
              <div className="flex flex-col items-center">
                <CircleIconImage src={item.icon} />
                <p className="mt-4 text-[21px] font-black leading-tight text-[#2B2118] md:text-[22px]">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-[#6F6255]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="relative overflow-hidden rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(31,111,112,0.7) 1px, transparent 0)",
              backgroundSize: "34px 34px",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:items-center">
            <div>
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#F2A23A]`}>Annual Festival Vision</p>
              <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Festivals as Celebration, Culture and Seva</h2>
              <p className={`mt-6 max-w-2xl ${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`}>
                Our festival calendar is planned to preserve devotional tradition while keeping the experience peaceful, disciplined, and family-friendly.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                {VISION_CARDS.map((card) => (
                  <div key={card.title} className="rounded-3xl border border-[#E8CFA8] bg-[#FAF1DE] p-6 text-center">
                    <div className="flex justify-center">
                      <CircleIconImage src={card.icon} />
                    </div>
                    <p className="mt-4 text-[18px] font-black leading-tight text-[#2B2118]">{card.title}</p>
                    <p className="mt-3 text-sm leading-6 text-[#6F6255]">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[36px] border border-[#E8CFA8] bg-[#FAF1DE] shadow-[0_22px_52px_rgba(43,33,24,0.1)]">
              <SmartImage
                src={IMAGE.vision}
                fallbackSrc={FALLBACK.vision}
                alt="Temple festival planning and devotional celebration atmosphere"
                className="h-[280px] w-full object-cover md:h-[360px]"
                loading="lazy"
              />
              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#1F6F70]">Temple Calendar Planning</p>
                <p className="mt-3 text-sm leading-6 text-[#6F6255]">
                  Month-wise planning helps manage decoration, puja support, volunteer roles, seating discipline and mahaprasad seva.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="festival-calendar" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#F2A23A]`}>Festival Calendar 2026</p>
              <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Month-wise devotional celebrations and temple events.</h2>
              <p className={`mt-6 max-w-3xl ${MISSION_BODY_TEXT_CLASS} text-[#6F6255]`}>
                Search festivals by name, filter by month/category, and sort upcoming celebrations first.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setUpcomingFirst((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full border border-[#E8CFA8] bg-[#FAF1DE] px-5 py-3 text-sm font-black text-[#1F6F70] shadow-[0_14px_26px_rgba(43,33,24,0.08)] transition hover:border-[#F2A23A]/70"
            >
              {upcomingFirst ? "Upcoming First" : "Date Ascending"}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1F6F70]">Search festival name</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search festival..."
                className="mt-2 w-full rounded-2xl border border-[#E8CFA8] bg-[#FAF1DE] px-4 py-3 text-[15px] text-[#2B2118] placeholder:text-[#6F6255]/70 focus:outline-none focus:ring-2 focus:ring-[#F2A23A]/30"
              />
            </label>

            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1F6F70]">Month</span>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value as Month)}
                className="mt-2 w-full rounded-2xl border border-[#E8CFA8] bg-[#FAF1DE] px-4 py-3 text-[15px] text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#F2A23A]/30"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1F6F70]">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="mt-2 w-full rounded-2xl border border-[#E8CFA8] bg-[#FAF1DE] px-4 py-3 text-[15px] text-[#2B2118] focus:outline-none focus:ring-2 focus:ring-[#F2A23A]/30"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence initial={false}>
              {events.map((event) => {
                const slug = `${slugify(event.title)}-${event.date.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <motion.article
                    key={`${event.title}-${event.date}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.22 }}
                    className="rounded-[28px] border border-[#E8CFA8] bg-[#FAF1DE] p-6 shadow-[0_18px_40px_rgba(43,33,24,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F2A23A]">{event.month}</p>
                        <p className="mt-2 text-lg font-black text-[#2B2118]">{event.title}</p>
                        <p className="mt-2 text-sm font-semibold text-[#6F6255]">
                          {event.day} • {event.date}
                        </p>
                      </div>
                      <span className={getCategoryStyle(event.category)}>{event.category}</span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-[#6F6255]">{event.description}</p>
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#1F6F70]">
                      Location: Bhagwat Dham / Temple Premises
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <SoftButton to={`/events-katha/festivals-celebrations/${slug}`} className="flex-1">
                        View Details
                      </SoftButton>
                      <PrimaryButton to={ROUTES.volunteer}>Participate</PrimaryButton>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:pb-16">
        <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#F2A23A]`}>Festival Operations</p>
          <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Operations, planning and puja support layers</h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: "Festival Operations Layer",
                text: "Decoration, puja setup, stage support, prasadam, reception, cleanliness and crowd management.",
                icon: ICON.eight,
              },
              {
                title: "Devotee Planning Layer",
                text: "Family participation, registration, seating, volunteer coordination and devotional flow.",
                icon: ICON.nine,
              },
              {
                title: "Donation and Puja Layer",
                text: "Puja support, bhog seva, deep seva, flower decoration, mahaprasad and utsav sponsorship.",
                icon: ICON.one,
              },
            ].map((layer) => (
              <div key={layer.title} className="rounded-3xl border border-[#E8CFA8] bg-[#FAF1DE] p-6 text-center">
                <div className="flex justify-center">
                  <CircleIconImage src={layer.icon} />
                </div>
                <p className="mt-4 text-[18px] font-black leading-tight text-[#2B2118]">{layer.title}</p>
                <p className="mt-3 text-sm leading-6 text-[#6F6255]">{layer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:pb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
            <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#F2A23A]`}>Event Support Tracks</p>
            <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Event Support Tracks</h2>
            <ul className="mt-7 space-y-3 text-[15px] leading-7 text-[#2B2118]">
              {[
                "Flower decoration and mandap arrangements",
                "Puja material and bhog seva",
                "Mahaprasad preparation and serving",
                "Volunteer support for devotees",
                "Cultural programs for children and youth",
                "Cleanliness, discipline and crowd guidance",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FAF1DE] text-[#1F6F70]">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-1 gap-4">
              <div className="overflow-hidden rounded-[24px] border border-[#E8CFA8] bg-[#FAF1DE] shadow-[0_18px_44px_rgba(43,33,24,0.10)]">
                <SmartImage
                  src={IMAGE.supportTracksOne}
                  fallbackSrc={FALLBACK.supportTracksOne}
                  alt="Festival support track preparation and temple seva planning"
                  className="h-[210px] w-full object-cover sm:h-[230px] md:h-[250px]"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[24px] border border-[#E8CFA8] bg-[#FAF1DE] shadow-[0_18px_44px_rgba(43,33,24,0.10)]">
                <SmartImage
                  src={IMAGE.supportTracksTwo}
                  fallbackSrc={FALLBACK.supportTracksTwo}
                  alt="Volunteers supporting festival arrangements and devotee services"
                  className="h-[210px] w-full object-cover sm:h-[230px] md:h-[250px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
            <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#F2A23A]`}>Join or Support This Event</p>
            <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Join or Support This Event</h2>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-1">
              {[
                { title: "Puja Material Seva", amount: "₹2,100", icon: ICON.six },
                { title: "Bhog / Prasad Seva", amount: "₹5,100", icon: ICON.seven },
                { title: "Mahaprasad Support", amount: "₹11,000", icon: ICON.five },
              ].map((tier) => (
                <div
                  key={tier.title}
                  className="rounded-3xl border border-[#E8CFA8] bg-[#FAF1DE] p-6 text-center shadow-[0_18px_40px_rgba(43,33,24,0.08)]"
                >
                  <div className="flex justify-center">
                    <CircleIconImage src={tier.icon} />
                  </div>
                  <p className="mt-4 text-[18px] font-black leading-tight text-[#2B2118]">{tier.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#6F6255]">Suggested Amount</p>
                  <span className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-black text-[#1F6F70]">
                    {tier.amount}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton to={ROUTES.donate}>Donate Now</PrimaryButton>
              <SoftButton to={ROUTES.volunteer}>Become Volunteer</SoftButton>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:pb-16">
        <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#F2A23A]`}>Voices from the Event</p>
          <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Voices from the Event</h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { quote: "The festivals feel peaceful, disciplined and spiritually uplifting.", name: "Devotee Family" },
              { quote: "Children learn culture naturally when they participate in these celebrations.", name: "Parent Volunteer" },
              { quote: "Serving during utsavs gives deep inner joy and connection.", name: "Seva Volunteer" },
            ].map((item) => (
              <div key={item.name} className="rounded-3xl border border-[#E8CFA8] bg-[#FAF1DE] p-6 shadow-[0_18px_40px_rgba(43,33,24,0.08)]">
                <p className="text-[15px] leading-7 text-[#2B2118]">“{item.quote}”</p>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-[#1F6F70]">— {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-[44px] border border-[#E8CFA8] bg-[linear-gradient(90deg,#D9822B_0%,#F4CE5A_55%,#FFE7C7_100%)] shadow-[0_30px_80px_rgba(43,33,24,0.2)]">
          <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.9)_1px,transparent_0)] [background-size:28px_28px]" />

          <div className="relative grid grid-cols-1 gap-8 p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-12">
            <div className="max-w-2xl text-[#2B2118]">
              <p className={`${MISSION_SECTION_LABEL_CLASS} text-[#C96F18]`}>Celebrate Festivals with Seva, Sanskar and Devotion</p>
              <h2 className={`${MISSION_SECTION_HEADING_CLASS} mt-4 text-[#2B2118]`}>Celebrate Festivals with Seva, Sanskar and Devotion</h2>
              <p className={`mt-6 ${MISSION_BODY_TEXT_CLASS} text-[#5B3A1E]`}>
                Join Bhagwat Heritage in preserving sacred festivals through devotion, discipline, family participation and community seva.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <PrimaryButton to={ROUTES.volunteer} className="bg-white text-[#2B2118] hover:bg-white/90">
                Join as Volunteer
              </PrimaryButton>
              <PrimaryButton to={ROUTES.donate} className="bg-white/30 text-[#2B2118] hover:bg-white/40">
                Support Festival Seva
              </PrimaryButton>
              <SoftButton to={ROUTES.contact} className="border-white/55 bg-white/10 text-[#2B2118] hover:bg-white/18">
                Contact Us
              </SoftButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
});
