import { memo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type IconName =
  | "aarti"
  | "bhajan"
  | "book"
  | "clock"
  | "diya"
  | "donate"
  | "family"
  | "gallery"
  | "hands"
  | "help"
  | "location"
  | "map"
  | "parking"
  | "phone"
  | "prasad"
  | "seva"
  | "shield"
  | "strength"
  | "temple"
  | "volunteer"
  | "washroom"
  | "water";

type InfoItem = {
  icon: IconName;
  title: string;
  text: string;
};

const HERO_IMAGE = "/images/hanuman-banner-02.jpg";
const CONCEPT_IMAGE = "/assets/images/gallery/kashtabhanjan-hanuman.jpg";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Bhagwat%20Dham%20Shree%20Swaminarayan%20Mandir%20Koshturbad%20Rd%20Hospital%20Ward%20Chandrapur%20Maharashtra%20442402";
const MAP_EMBED =
  "https://www.google.com/maps?q=Shree%20Swaminarayan%20Mandir%20Hospital%20Ward%20Chandrapur%20Maharashtra%20442402&output=embed";
const CONTACT_PHONE = "+918668897445";
const CONTACT_DISPLAY = "+91-866-889-7445";
const CONTACT_EMAIL = "join@bhagwatheritage.org";

const quickInfo: InfoItem[] = [
  { icon: "clock", title: "Darshan Hours", text: "09:00 AM - 12:00 PM | 04:00 PM - 09:00 PM" },
  { icon: "location", title: "Location", text: "Dham Chandrapur, Maharashtra" },
  { icon: "diya", title: "Special Days", text: "Tuesday & Saturday" },
  { icon: "hands", title: "Main Seva", text: "Hanuman Paath, Aarti, Bhajan, Darshan" },
];

const significance: InfoItem[] = [
  { icon: "strength", title: "Strength and Courage", text: "Inspires fearlessness, discipline, and inner stability." },
  { icon: "shield", title: "Protection from Negativity", text: "Guides devotees toward faith, clarity, and spiritual protection." },
  { icon: "temple", title: "Devotion to Shri Ram", text: "Reminds every visitor of Hanuman Ji's complete surrender to Shri Ram." },
  { icon: "seva", title: "Service and Humility", text: "Encourages seva bhav, humility, and righteous living." },
];

const paathItems = ["॥ श्री हनुमान चालीसा ॥", "॥ श्री हनुमान अष्टक ॥", "॥ बजरंग बाण ॥", "॥ सुन्दरकाण्ड पाठ ॥"];

const blessingCards: InfoItem[] = [
  { icon: "shield", title: "Fearlessness", text: "Removes fear and negativity through devotion." },
  { icon: "strength", title: "Divine Focus", text: "Builds discipline, confidence and divine focus." },
  { icon: "family", title: "Family Harmony", text: "Strengthens family harmony and spiritual values." },
  { icon: "seva", title: "Seva Bhav", text: "Encourages seva, humility and righteous living." },
];

const programs = [
  {
    icon: "temple" as IconName,
    title: "Hanuman Jayanti Mahotsav",
    frequency: "Annual Grand Celebration",
    text: "Special aarti, bhajan, prasad seva and large-scale devotee participation.",
  },
  {
    icon: "book" as IconName,
    title: "Sundarkand Paath Sabha",
    frequency: "Every Saturday Evening",
    text: "Collective Sundarkand recitation for peace, courage and spiritual upliftment.",
  },
  {
    icon: "aarti" as IconName,
    title: "Mangal Aarti Mahaseva",
    frequency: "Every Tuesday Morning",
    text: "Special Tuesday Hanuman aarti and seva participation.",
  },
  {
    icon: "bhajan" as IconName,
    title: "Shri Ram Bhajan Sandhya",
    frequency: "Monthly Devotional Event",
    text: "Bhajan, kirtan and satsang dedicated to Shri Ram and Hanuman Ji.",
  },
];

const sadhana = [
  ["Morning", "Naam Smaran & Hanuman Chalisa"],
  ["Tuesday", "Mangal Aarti & Seva Sankalp"],
  ["Saturday", "Sundarkand Paath"],
  ["Evening", "Deep Daan & Shanti Prarthana"],
];

const facilities: InfoItem[] = [
  { icon: "parking", title: "Parking Guidance", text: "Basic guidance for devotee vehicles and arrival flow." },
  { icon: "prasad", title: "Prasad Seva", text: "Prasad support during scheduled seva and utsav days." },
  { icon: "help", title: "Senior Citizen Support", text: "Assistance guidance for elders during darshan." },
  { icon: "volunteer", title: "Group Visit Assistance", text: "Coordination support for group visits and satsang groups." },
  { icon: "water", title: "Drinking Water", text: "Water facility support for devotees." },
  { icon: "hands", title: "Volunteer Helpdesk", text: "Sevaks guide devotees for darshan, timing and facilities." },
];

const gallery = [
  ["Hanuman Murti front view", "/images/hanuman.jpg"],
  ["Evening aarti", "/images/hanuman2.JPG"],
  ["Devotees in darshan", "/images/hanuman3.JPG"],
  ["Sundarkand paath", "/images/hanuman4.JPG"],
  ["Festival celebration", "/images/hanuman5.JPG"],
  ["Temple premises", "/images/hanuman-banner-01.jpg"],
];

const faqs = [
  [
    "What are the Hanuman Darshan timings?",
    "Morning darshan is from 09:00 AM to 12:00 PM and evening darshan is from 04:00 PM to 09:00 PM.",
  ],
  [
    "Which days are special for Hanuman Ji worship?",
    "Tuesday and Saturday are specially observed for Hanuman Bhakti, Hanuman Chalisa, Sundarkand Paath and aarti.",
  ],
  [
    "Can devotees join Sundarkand Paath?",
    "Yes, devotees can participate in Sundarkand Paath Sabha and other devotional programs as per mandir schedule.",
  ],
  ["Can groups plan a visit?", "Yes, groups may contact the mandir office for guidance and visit coordination."],
  [
    "Can devotees support Hanuman Mandir Seva?",
    "Yes, devotees may support aarti seva, prasad seva, utsav seva, volunteer seva and mandir development.",
  ],
];

const sectionClass = "mx-auto max-w-[1180px] px-4 py-10 sm:py-14";
const cardClass =
  "rounded-[24px] border border-[#ecd0a4] bg-white/95 p-5 shadow-[0_16px_34px_rgba(106,63,25,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(106,63,25,0.16)]";

function Icon({ name }: { name: IconName }) {
  const p = "stroke-current";
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
  };
  const paths: Record<IconName, ReactNode> = {
    aarti: <><path className={p} d="M12 3c2.5 2.6 4 5 4 7.2A4 4 0 0 1 8 10.2C8 8 9.5 5.6 12 3Z" /><path className={p} d="M5 19h14M8 15h8" /></>,
    bhajan: <><path className={p} d="M9 18V5l10-2v13" /><circle className={p} cx="7" cy="18" r="2" /><circle className={p} cx="17" cy="16" r="2" /></>,
    book: <><path className={p} d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21V5.5Z" /><path className={p} d="M5 5.5V21M9 7h7M9 11h7" /></>,
    clock: <><circle className={p} cx="12" cy="12" r="8" /><path className={p} d="M12 8v4l3 2" /></>,
    diya: <><path className={p} d="M12 3c2.4 2.5 3.8 4.7 3.8 6.8a3.8 3.8 0 0 1-7.6 0C8.2 7.7 9.6 5.5 12 3Z" /><path className={p} d="M5 18h14M8 14h8" /></>,
    donate: <><path className={p} d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" /></>,
    family: <><circle className={p} cx="8" cy="8" r="2.5" /><circle className={p} cx="16" cy="8" r="2.5" /><path className={p} d="M4 19a4 4 0 0 1 8 0M12 19a4 4 0 0 1 8 0" /></>,
    gallery: <><rect className={p} x="4" y="5" width="16" height="14" rx="2" /><path className={p} d="m7 15 3-3 2 2 3-4 3 5" /><circle className={p} cx="9" cy="9" r="1" /></>,
    hands: <><path className={p} d="M8 12l4 3 4-3" /><path className={p} d="M5 12h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4Z" /><path className={p} d="M8 10V6M16 10V6" /></>,
    help: <><circle className={p} cx="12" cy="12" r="8" /><path className={p} d="M9.5 10a2.5 2.5 0 1 1 4.3 1.7c-.9.8-1.8 1.3-1.8 2.8" /><path className={p} d="M12 17h.01" /></>,
    location: <><path className={p} d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle className={p} cx="12" cy="10" r="2.5" /></>,
    map: <><path className={p} d="M9 18 4 20V6l5-2 6 2 5-2v14l-5 2-6-2Z" /><path className={p} d="M9 4v14M15 6v14" /></>,
    parking: <><rect className={p} x="5" y="4" width="14" height="16" rx="3" /><path className={p} d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" /></>,
    phone: <><path className={p} d="M7 4h3l1.5 4-2 1.5a14.6 14.6 0 0 0 5 5l1.5-2L20 14v3a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 5 6.2 2 2 0 0 1 7 4Z" /></>,
    prasad: <><path className={p} d="M5 13h14" /><path className={p} d="M7 13a5 5 0 0 0 10 0" /><path className={p} d="M9 9c0-1.4 1.1-2.5 2.5-2.5" /></>,
    seva: <><path className={p} d="M8 12l4 3 4-3" /><path className={p} d="M6 10V8a2 2 0 0 1 2-2h1.5L12 8l2.5-2H16a2 2 0 0 1 2 2v2" /></>,
    shield: <><path className={p} d="M12 3l7 3v5c0 4.2-2.6 7.7-7 10-4.4-2.3-7-5.8-7-10V6l7-3Z" /><path className={p} d="m9.5 11.5 1.7 1.7 3.3-3.7" /></>,
    strength: <><path className={p} d="M7 15c-1-1-1.5-2.2-1.5-3.8V9h4v2.2c0 .8.7 1.5 1.5 1.5h2c.8 0 1.5-.7 1.5-1.5V9h4v2.2c0 1.6-.5 2.8-1.5 3.8" /><path className={p} d="M8 21h8M12 13v8" /></>,
    temple: <><path className={p} d="M3 20h18" /><path className={p} d="M5 10h14" /><path className={p} d="M7 10v10M12 10v10M17 10v10" /><path className={p} d="M4 10l8-6 8 6" /></>,
    volunteer: <><circle className={p} cx="12" cy="7" r="3" /><path className={p} d="M5 21a7 7 0 0 1 14 0" /><path className={p} d="m9 14 3 3 3-3" /></>,
    washroom: <><path className={p} d="M8 21v-7H6l2-7h3l2 7h-2v7" /><path className={p} d="M16 21V7" /><circle className={p} cx="9.5" cy="4" r="1.5" /><circle className={p} cx="16" cy="4" r="1.5" /></>,
    water: <><path className={p} d="M12 3s6 6.2 6 10a6 6 0 1 1-12 0c0-3.8 6-10 6-10Z" /><path className={p} d="M9.5 14.5A3 3 0 0 0 14 16" /></>,
  };

  return <svg {...common} stroke="currentColor">{paths[name]}</svg>;
}

function IconBadge({ name }: { name: IconName }) {
  return (
    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#efcf9c] bg-[#fff2dc] text-[#c86b17] shadow-[0_10px_22px_rgba(106,63,25,0.10)]">
      <Icon name={name} />
    </span>
  );
}

function SectionHeader({ title, subtitle, center = false }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto mb-8 max-w-3xl text-center" : "mb-8 max-w-3xl"}>
      <h2 className="text-3xl font-black leading-tight text-[#113f50] sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base leading-7 text-[#6a5948] sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

function InfoCard({ item }: { item: InfoItem }) {
  return (
    <article className={cardClass}>
      <IconBadge name={item.icon} />
      <h3 className="mt-4 text-xl font-black text-[#113f50]">{item.title}</h3>
      <p className="mt-3 text-base leading-7 text-[#5f5042]">{item.text}</p>
    </article>
  );
}

function CtaLink({ to, children, tone = "primary" }: { to: string; children: ReactNode; tone?: "primary" | "secondary" | "teal" }) {
  const base = "inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5";
  const tones = {
    primary: "bg-[#f39718] text-white shadow-[0_14px_28px_rgba(196,104,19,0.24)] hover:bg-[#df8410]",
    secondary: "border border-[#d8943a] bg-white/90 text-[#7a4212] hover:bg-[#fff1da]",
    teal: "bg-[#0f7f84] text-white shadow-[0_14px_28px_rgba(15,127,132,0.20)] hover:bg-[#0b6970]",
  };

  if (to.startsWith("http") || to.startsWith("tel:") || to.startsWith("mailto:")) {
    return <a href={to} target={to.startsWith("http") ? "_blank" : undefined} rel={to.startsWith("http") ? "noreferrer" : undefined} className={`${base} ${tones[tone]}`}>{children}</a>;
  }

  return <Link to={to} className={`${base} ${tones[tone]}`}>{children}</Link>;
}

export default memo(function HanumanMurtiPage() {
  const [activeImage, setActiveImage] = useState<(typeof gallery)[number] | null>(null);
  const [openFaq, setOpenFaq] = useState(0);

  usePageMeta(
    "Jay Shree Maharudra Kashtbhanjan Hanuman Darshan | Bhagwat Heritage",
    "Visit the sacred 63-foot Maharudra Kashtbhanjan Hanuman Murti at Bhagwat Dham, Chandrapur. Explore darshan timings, Hanuman Paath, Sundarkand, aarti, utsav programs and seva opportunities.",
  );

  return (
    <div className="min-h-screen scroll-smooth bg-[linear-gradient(180deg,#fff6ea_0%,#fffdf8_45%,#fce6ee_100%)] pb-24 text-[#312214] md:pb-0">
      <section className="px-4 pt-6 sm:pt-8">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[34px] border border-[#eccb95] bg-[#fff0dc] shadow-[0_26px_70px_rgba(111,60,23,0.16)]">
          <div className="relative grid min-h-[620px] gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,213,157,0.75),transparent_34%),radial-gradient(circle_at_85%_22%,rgba(255,192,215,0.5),transparent_38%)]" />
            <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-[linear-gradient(90deg,rgba(255,247,235,0.96),rgba(255,236,218,0.72),rgba(255,255,255,0))] lg:block" />
            <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
              <span className="inline-flex w-fit rounded-full border border-[#d89a3a] bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a75a13]">
                Bhagwat Heritage Service Foundation Trust
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-[#772b18] sm:text-6xl">
                Jay Shree Maharudra Kashtbhanjan Hanuman Darshan
              </h1>
              <p className="mt-4 text-xl font-bold text-[#bb651c] sm:text-2xl">Dham Chandrapur (Chichpalli), Maharashtra</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f5042] sm:text-lg">
                Experience devotion, strength, protection, courage and spiritual peace through the divine darshan of Hanuman Ji.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <CtaLink to="#plan-visit">Plan Your Visit</CtaLink>
                <CtaLink to="#gallery" tone="secondary">View Gallery</CtaLink>
                <CtaLink to={ROUTES.donate} tone="teal">Donate for Mandir Seva</CtaLink>
              </div>
            </div>
            <div className="relative min-h-[360px] lg:min-h-[620px]">
              <img src={HERO_IMAGE} alt="Maharudra Kashtbhanjan Hanuman Ji murti darshan" className="absolute inset-0 h-full w-full object-cover object-center" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,246,234,0.65)_0%,rgba(255,231,217,0.18)_34%,rgba(67,20,14,0.12)_100%)]" />
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickInfo.map((item) => <InfoCard key={item.title} item={item} />)}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="grid gap-7 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div className="rounded-[28px] border border-[#ecd0a4] bg-white/95 p-6 shadow-[0_16px_34px_rgba(106,63,25,0.10)] sm:p-8">
            <SectionHeader title="63-Foot Hanuman Murti: A Symbol of Strength, Bhakti and Protection" />
            <p className="text-base leading-8 text-[#5f5042] sm:text-lg">
              The Maharudra Kashtbhanjan Hanuman Murti is envisioned as a powerful spiritual landmark where devotees experience courage, devotion, discipline and divine protection. This sacred form of Hanuman Ji inspires every visitor to overcome fear, negativity and weakness through faith, seva and naam-smaran.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {significance.map((item) => <InfoCard key={item.title} item={item} />)}
            </div>
          </div>
          <div className="overflow-hidden rounded-[30px] border border-[#ecd0a4] bg-white shadow-[0_16px_34px_rgba(106,63,25,0.10)]">
            <img src={CONCEPT_IMAGE} alt="63-foot Maharudra Kashtbhanjan Hanuman Murti concept visual" className="h-full min-h-[420px] w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader center title="Hanuman Paath & Daily Devotional Recitation" subtitle="Devotees may participate in sacred recitations and naam-smaran for inner peace, protection and spiritual discipline." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paathItems.map((title) => (
            <article key={title} className={`${cardClass} text-center hover:shadow-[0_0_34px_rgba(243,151,24,0.20)]`}>
              <div className="mx-auto flex justify-center"><IconBadge name="book" /></div>
              <h3 className="mt-4 text-lg font-black text-[#772b18]">{title}</h3>
              <button className="mt-4 rounded-full border border-[#d8943a] px-4 py-2 text-sm font-bold text-[#7a4212] transition hover:bg-[#fff1da]">
                Read / Join Paath
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader center title="Darshan Timings" subtitle="Our 63-foot Hanuman idol is a sacred center for thousands of devotees. Plan your visit according to darshan and aarti timings." />
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Morning Darshan", "09:00 AM - 12:00 PM", ["Morning Aarti"]],
            ["Afternoon Vishram", "01:00 PM - 03:00 PM", ["Mandir Silence", "Maintenance", "Deep Seva", "Prasad Prep"]],
            ["Evening Darshan", "04:00 PM - 09:00 PM", ["Evening Aarti"]],
          ].map(([title, time, badges]) => (
            <article key={title as string} className={cardClass}>
              <IconBadge name="clock" />
              <h3 className="mt-4 text-2xl font-black text-[#113f50]">{title}</h3>
              <p className="mt-3 text-xl font-black text-[#c86b17]">{time}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(badges as string[]).map((badge) => <span key={badge} className="rounded-full bg-[#fff0d6] px-3 py-1 text-xs font-bold text-[#9b5618]">{badge}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="rounded-[32px] bg-[linear-gradient(120deg,#093b49_0%,#7a2e1c_55%,#c86b17_100%)] p-6 shadow-[0_22px_54px_rgba(40,35,28,0.18)] sm:p-8">
          <SectionHeader center title="Blessings of Hanuman Bhakti" subtitle="Faith in Hanuman Ji brings strength, focus, humility and protection." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {blessingCards.map((item) => (
              <article key={item.title} className="rounded-[22px] border border-white/20 bg-white/12 p-5 text-white shadow-[0_14px_30px_rgba(0,0,0,0.16)] backdrop-blur">
                <Icon name={item.icon} />
                <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/90">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader center title="Hanuman Utsav & Programs" />
        <div className="grid gap-5 md:grid-cols-2">
          {programs.map((item) => (
            <article key={item.title} className={cardClass}>
              <IconBadge name={item.icon} />
              <h3 className="mt-4 text-2xl font-black text-[#113f50]">{item.title}</h3>
              <span className="mt-3 inline-flex rounded-full bg-[#ffe7bd] px-3 py-1 text-xs font-bold text-[#a75a13]">{item.frequency}</span>
              <p className="mt-4 text-base leading-7 text-[#5f5042]">{item.text}</p>
              <button className="mt-5 rounded-full bg-[#f39718] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#df8410]">Participate</button>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="rounded-[30px] border border-[#ecd0a4] bg-[linear-gradient(135deg,#fff0d2_0%,#fffdf8_58%,#fbe4ee_100%)] p-6 shadow-[0_16px_34px_rgba(106,63,25,0.10)] sm:p-8">
          <SectionHeader title="Daily Hanuman Sadhana" subtitle="Begin your day with 'Om Hanumate Namah', recite Hanuman Chalisa with devotion, and conclude with deep daan, seva sankalp and inner courage." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sadhana.map(([title, text]) => <InfoCard key={title} item={{ icon: "diya", title, text }} />)}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink to={ROUTES.involved.volunteer}>Join Hanuman Sadhana</CtaLink>
            <CtaLink to={ROUTES.involved.contactUs} tone="secondary">Request Paath Seva</CtaLink>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader center title="Facilities for Devotees" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((item) => <InfoCard key={item.title} item={item} />)}
        </div>
        <p className="mt-6 rounded-2xl border border-[#ecd0a4] bg-[#fff3df] p-4 text-center text-sm leading-7 text-[#6f553b]">
          Facilities may vary during large utsav days. Devotees are requested to follow mandir discipline and seva guidelines.
        </p>
      </section>

      <section id="gallery" className={sectionClass}>
        <SectionHeader center title="Hanuman Darshan Gallery" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <button key={item[0]} type="button" onClick={() => setActiveImage(item)} className="group overflow-hidden rounded-[24px] border border-[#ecd0a4] bg-white text-left shadow-[0_16px_34px_rgba(106,63,25,0.10)]">
              <img src={item[1]} alt={item[0]} loading="lazy" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
              <p className="p-4 text-lg font-black text-[#113f50]">{item[0]}</p>
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <CtaLink to={ROUTES.media.photos} tone="teal">View Full Gallery</CtaLink>
        </div>
      </section>

      <section id="plan-visit" className={sectionClass}>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-[#ecd0a4] bg-white/95 p-6 shadow-[0_16px_34px_rgba(106,63,25,0.10)] sm:p-8">
            <SectionHeader title="Plan Your Visit" />
            <div className="space-y-4 text-base leading-7 text-[#5f5042]">
              <p><strong className="text-[#113f50]">Location:</strong> Bhagwat Dham - Shree Swaminarayan Mandir, Koshturbad Rd, Hospital Ward, Chandrapur, Maharashtra 442402</p>
              <p><strong className="text-[#113f50]">Contact:</strong> +91-866-889-7445</p>
              <p><strong className="text-[#113f50]">Email:</strong> join@bhagwatheritage.org</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaLink to={MAP_URL}>Open Google Maps</CtaLink>
              <CtaLink to={`tel:${CONTACT_PHONE}`} tone="teal">Contact Mandir Office</CtaLink>
              <CtaLink to={ROUTES.involved.contactUs} tone="secondary">Plan Group Visit</CtaLink>
            </div>
          </div>
          <div className="overflow-hidden rounded-[28px] border border-[#ecd0a4] bg-white shadow-[0_16px_34px_rgba(106,63,25,0.10)]">
            <iframe title="Bhagwat Dham Hanuman Darshan map" src={MAP_EMBED} className="h-[420px] w-full border-0 lg:h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="relative overflow-hidden rounded-[34px] border border-[#e5b65d] bg-[linear-gradient(120deg,#ffcf73_0%,#f39718_48%,#a9471d_100%)] p-6 text-white shadow-[0_22px_54px_rgba(133,77,20,0.22)] sm:p-9">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/20" />
          <h2 className="text-3xl font-black sm:text-4xl">Participate in Hanuman Mandir Seva</h2>
          <p className="mt-3 max-w-4xl text-base leading-8 text-white/92 sm:text-lg">
            Support darshan arrangements, aarti seva, prasad seva, utsav seva, volunteer support and mandir development through your श्रद्धा and सेवा.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink to={ROUTES.donate} tone="teal">Donate for Hanuman Seva</CtaLink>
            <CtaLink to={ROUTES.involved.volunteer} tone="secondary">Become a Volunteer</CtaLink>
            <CtaLink to={ROUTES.involved.sponsor} tone="secondary">Sponsor Utsav Seva</CtaLink>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader center title="Frequently Asked Questions" />
        <div className="mx-auto max-w-4xl space-y-3">
          {faqs.map(([question, answer], index) => {
            const isOpen = openFaq === index;
            return (
              <article key={question} className="overflow-hidden rounded-[22px] border border-[#ecd0a4] bg-white shadow-[0_12px_26px_rgba(106,63,25,0.08)]">
                <button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                  <span className="text-lg font-black text-[#113f50]">{question}</span>
                  <span className="text-2xl font-black text-[#c86b17]">{isOpen ? "-" : "+"}</span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden px-5 pb-5 leading-7 text-[#5f5042]">{answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={sectionClass}>
        <div className="rounded-[30px] border border-[#ecd0a4] bg-white/95 p-6 text-center shadow-[0_16px_34px_rgba(106,63,25,0.10)]">
          <h2 className="text-3xl font-black text-[#113f50]">Come for Darshan. Return with Courage, Peace and Devotion.</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CtaLink to="#plan-visit">Plan Your Visit</CtaLink>
            <CtaLink to={ROUTES.donate} tone="teal">Donate</CtaLink>
            <CtaLink to="#gallery" tone="secondary">View Gallery</CtaLink>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ecd0a4] bg-white/95 px-3 py-2 shadow-[0_-8px_24px_rgba(68,41,18,0.12)] backdrop-blur md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a href={`tel:${CONTACT_PHONE}`} className="rounded-full bg-[#f39718] px-3 py-2 text-center text-xs font-bold text-white">Call</a>
          <a href={MAP_URL} target="_blank" rel="noreferrer" className="rounded-full border border-[#d8943a] px-3 py-2 text-center text-xs font-bold text-[#7a4212]">Directions</a>
          <Link to={ROUTES.donate} className="rounded-full bg-[#0f7f84] px-3 py-2 text-center text-xs font-bold text-white">Donate</Link>
        </div>
      </div>

      {activeImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true">
          <button type="button" className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#113f50]" onClick={() => setActiveImage(null)}>
            Close
          </button>
          <figure className="max-h-[88vh] max-w-5xl overflow-hidden rounded-[24px] bg-white">
            <img src={activeImage[1]} alt={activeImage[0]} className="max-h-[76vh] w-full object-contain" />
            <figcaption className="p-4 text-center text-lg font-black text-[#113f50]">{activeImage[0]}</figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
});
