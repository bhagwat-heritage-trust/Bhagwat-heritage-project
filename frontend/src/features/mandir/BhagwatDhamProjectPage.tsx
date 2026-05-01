import { memo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

const images = {
  hero: "https://res.cloudinary.com/der8zinu8/image/upload/v1777617367/ChatGPT_Image_May_1_2026_12_05_26_PM_csdeni.png",
  modelDay: "https://res.cloudinary.com/der8zinu8/image/upload/v1777623874/hero_w6ayzh.jpg",
  modelNight: "https://res.cloudinary.com/der8zinu8/image/upload/v1777627767/ChatGPT_Image_May_1_2026_02_58_01_PM_e1ou4a.png",
  site: "https://res.cloudinary.com/der8zinu8/image/upload/v1777623872/nightview_rwrhwb.jpg",
  currentSite: "https://res.cloudinary.com/der8zinu8/image/upload/v1777627768/ChatGPT_Image_May_1_2026_02_57_54_PM_xvvd20.png",
  carving: "https://res.cloudinary.com/der8zinu8/image/upload/v1777623872/24-mahaavtar_ser80b.jpg",
  garbhagriha: "https://res.cloudinary.com/der8zinu8/image/upload/v1777623873/garbhgriha_rwg8jk.jpg",
};

const icons = {
  temple: "/assets/icons/icon-temple.svg",
  bhagwat: "/assets/icons/icon-bhagwat.svg",
  vedas: "/assets/icons/icon-vedas.svg",
  avatar: "/assets/icons/icon-avatar.svg",
  donation: "/assets/icons/icon-donation.svg",
  sponsor: "/assets/icons/icon-sponsor.svg",
  global: "/assets/icons/icon-global.svg",
};

const sectionClass = "px-4 py-14 sm:py-18";
const shellClass = "mx-auto max-w-[1220px]";
const cardClass = "rounded-[28px] border border-[#efd4a6] bg-white/88 p-6 shadow-[0_18px_44px_rgba(95,62,24,0.10)] backdrop-blur";
const headingClass = "font-serif text-3xl font-black leading-tight text-[#2f2417] sm:text-4xl lg:text-5xl";
const eyebrowClass = "mb-3 inline-flex rounded-full border border-[#efc377] bg-[#fff4dc] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#a55a11]";

const uniqueness = [
  ["First dedicated Bhagwat Temple in the world", "https://res.cloudinary.com/der8zinu8/image/upload/v1777623874/hero_w6ayzh.jpg"],
  ["Installation of Shrimad Bhagwat Mahapuran & Vedas", "https://res.cloudinary.com/der8zinu8/image/upload/v1777623872/vedas_eqd0lj.jpg"],
  ["24 Avatars of Lord Narayan", "https://res.cloudinary.com/der8zinu8/image/upload/v1777623872/24-mahaavtar_ser80b.jpg"],
  ["Guru Parampara Presence", "https://res.cloudinary.com/der8zinu8/image/upload/v1777631994/ChatGPT_Image_May_1_2026_04_09_23_PM_duelhi.png"],
  ["Global Spiritual Unity Center", "https://res.cloudinary.com/der8zinu8/image/upload/v1777627767/ChatGPT_Image_May_1_2026_02_58_13_PM_klz7lu.png"],
  ["Temple + Culture + Knowledge Integration", "https://res.cloudinary.com/der8zinu8/image/upload/v1777627767/ChatGPT_Image_May_1_2026_02_58_06_PM_iarqid.png"],
];

const constructionPoints = [
  "Foundation and Bhoomi Pujan completed",
  "Structural development and base levels established",
  "Daily worship, seva, and spiritual activities actively ongoing",
];

const phases = [
  ["Phase 1", "Structural Expansion", "RCC Completion"],
  ["Phase 2", "Devotee Facilities", "Interior Spaces"],
  ["Phase 3", "Garbhagriha", "Divine Throne Installation"],
  ["Phase 4", "Stone Carving", "Temple Architecture"],
  ["Phase 5", "Shikhar, Kalash", "Pran Pratishtha"],
];

const experiences = [
  ["Main Garbhagriha", "Central Bhagwan", images.garbhagriha],
  ["Shrimad Bhagwat Mahapuran & Vedas", "Sacred shastra presence", images.modelDay],
  ["Guru Parampara", "Living lineage of devotion", images.modelNight],
  ["Ganesh, Hanuman, Ram, Krishna, Shiva", "Divine darshan spaces", images.hero],
  ["24 Avatars Wall", "Lord Narayan's avatar mahima", images.carving],
];

const craft = [
  ["RCC structural system", "https://res.cloudinary.com/der8zinu8/image/upload/v1777627768/ChatGPT_Image_May_1_2026_02_57_54_PM_xvvd20.png"],
  ["Bansi Paharpur pink stone", "https://res.cloudinary.com/der8zinu8/image/upload/v1777627768/ChatGPT_Image_May_1_2026_02_57_48_PM_tx5xcc.png"],
  ["Makrana marble", "https://res.cloudinary.com/der8zinu8/image/upload/v1777627768/ChatGPT_Image_May_1_2026_02_57_41_PM_fv6tsh.png"],
  ["Traditional Sompura temple design", "https://res.cloudinary.com/der8zinu8/image/upload/v1777627769/ChatGPT_Image_May_1_2026_02_57_35_PM_b3pkgp.png"],
];

const donationTierCards = [
  [501, "Basic Seva"],
  [1100, "Devotee Offering"],
  [11000, "Shraddha Seva"],
  [51000, "Construction Seva"],
  [111000, "Divine Contribution"],
  [0, "Custom Amount"],
] as const;

const trustElements = [
  "12A & 80G Certified",
  "FCRA Approved (International Donations Accepted)",
  "Transparent Accounting & Audited Trust",
  "Digital Receipt Available",
];

const sponsorParts = [
  ["Pillars", "https://res.cloudinary.com/der8zinu8/image/upload/v1777630777/ChatGPT_Image_May_1_2026_03_48_12_PM_xobguq.png"],
  ["Steps", "https://res.cloudinary.com/der8zinu8/image/upload/v1777630777/ChatGPT_Image_May_1_2026_03_48_19_PM_je21rv.png"],
  ["Jharokhas", "https://res.cloudinary.com/der8zinu8/image/upload/v1777630776/ChatGPT_Image_May_1_2026_03_48_28_PM_duopxo.png"],
  ["Thrones", "https://res.cloudinary.com/der8zinu8/image/upload/v1777630776/ChatGPT_Image_May_1_2026_03_48_34_PM_qcnuy6.png"],
  ["Deity Installations", "https://res.cloudinary.com/der8zinu8/image/upload/v1777630776/ChatGPT_Image_May_1_2026_03_48_43_PM_mziofx.png"],
  ["Rooms", "https://res.cloudinary.com/der8zinu8/image/upload/v1777630776/ChatGPT_Image_May_1_2026_03_48_50_PM_awpqqn.png"],
  ["Shikhar & Kalash", "https://res.cloudinary.com/der8zinu8/image/upload/v1777630776/ChatGPT_Image_May_1_2026_03_48_57_PM_pcidai.png"],
];
const recognition = ["Name on temple donor wall", "Digital recognition", "Announcement in Bhagwat Katha", "Seva certificate", "Special invitations to ceremonies"];
const donorWall = [
  ["Bhagwat Parivar", "Construction Seva"],
  ["Shri Hari Sevak Mandal", "Devotion Seva"],
  ["Global Satsang Family", "Sacred Participation"],
  ["Anonymous Devotee", "General Seva"],
];

function PrimaryButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff9933,#d28a19)] px-6 py-3 text-sm font-black text-white shadow-[0_16px_32px_rgba(210,113,22,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(210,113,22,0.32)]">
      {children}
    </Link>
  );
}

function SecondaryButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d6a44b] bg-white/88 px-6 py-3 text-sm font-black text-[#7a4b15] transition hover:-translate-y-0.5 hover:bg-[#fff5df]">
      {children}
    </Link>
  );
}

function ExternalButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0f7f84] px-6 py-3 text-sm font-black text-white shadow-[0_16px_32px_rgba(15,127,132,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0b6e73]">
      {children}
    </a>
  );
}

function SectionHeader({ eyebrow, title, text, center = false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} mb-9 max-w-3xl`}>
      {eyebrow ? <span className={eyebrowClass}>{eyebrow}</span> : null}
      <h2 className={headingClass}>{title}</h2>
      {text ? <p className="mt-4 text-lg leading-8 text-[#67513b]">{text}</p> : null}
    </div>
  );
}

function ImageBlock({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[30px] border border-[#efd4a6] bg-[#fff4df] shadow-[0_22px_48px_rgba(95,62,24,0.12)] ${className}`}>
      <img src={src} alt={alt} className="block h-full min-h-[280px] w-full object-cover" loading="lazy" />
    </div>
  );
}

function formatInr(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export default memo(function BhagwatDhamProjectPage() {
  const [language, setLanguage] = useState<"EN" | "HI">("EN");
  const [selectedAmount, setSelectedAmount] = useState(1100);
  const target = 3500000;
  const raised = 1250000;
  const progress = Math.round((raised / target) * 100);
  const donateLink = `${ROUTES.donate}?fund=bhagwat-dham${selectedAmount > 0 ? `&amount=${selectedAmount}` : ""}`;

  usePageMeta(
    "Bhagwat Dham - The World's First Sanatan Bhagwat Temple",
    "Participate in the divine construction of Bhagwat Dham, a premium Sanatan Bhagwat temple vision uniting Bhagwan, Shastra, Sant, and Seva.",
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff8ea_0%,#fffdf8_44%,#f7eee1_100%)] text-[#332313]">
      <div className="pointer-events-none fixed inset-x-0 top-28 z-0 mx-auto hidden h-[520px] max-w-5xl opacity-[0.12] lg:block">
        <div className="h-full rounded-t-[220px] border-[26px] border-[#c98222]" />
      </div>

      <div className="fixed right-4 top-24 z-40 flex items-center gap-2 rounded-full border border-[#f0c071] bg-white/92 p-1 shadow-[0_14px_34px_rgba(92,59,18,0.18)] backdrop-blur">
        <button type="button" onClick={() => setLanguage("EN")} className={`rounded-full px-3 py-2 text-xs font-black ${language === "EN" ? "bg-[#ff9933] text-white" : "text-[#7a4b15]"}`}>EN</button>
        <button type="button" onClick={() => setLanguage("HI")} className={`rounded-full px-3 py-2 text-xs font-black ${language === "HI" ? "bg-[#ff9933] text-white" : "text-[#7a4b15]"}`}>Hindi</button>
        <Link to={donateLink} className="rounded-full bg-[#0f7f84] px-4 py-2 text-xs font-black text-white">Donate</Link>
      </div>

      <section className="relative z-10 px-4 pt-6">
        <div className="relative mx-auto min-h-[720px] max-w-[1400px] overflow-hidden rounded-[38px] border border-[#edcf93] shadow-[0_28px_80px_rgba(98,61,20,0.20)]">
          <img src={images.hero} alt="Bhagwat Dham temple render" className="absolute inset-0 h-full w-full object-cover brightness-110 saturate-110" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,220,0.08)_0%,rgba(255,238,174,0.10)_55%,rgba(42,25,8,0.34)_100%)]" />
          <div className="relative flex min-h-[720px] items-end">
            <div className="mx-auto max-w-5xl px-6 pb-16 pt-28 text-center sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
              <h1 className="font-serif text-[30px] font-black leading-tight text-[#fff0a8] drop-shadow-[0_8px_24px_rgba(48,25,5,0.62)] sm:text-[50px] lg:text-[62px]">
                Bhagwat Dham - The World's First Sanatan Bhagwat Temple
              </h1>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to={donateLink} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#ffe9a3] bg-[#fff0a8]/92 px-6 py-3 text-sm font-black text-[#6b3c06] shadow-[0_16px_32px_rgba(73,38,4,0.26)] transition hover:-translate-y-0.5 hover:bg-[#fff5c7]">
                  Participate in Divine Construction
                </Link>
                <Link to="#vision" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#fff0a8] bg-[#3e2608]/42 px-6 py-3 text-sm font-black text-[#fff0a8] shadow-[0_16px_32px_rgba(73,38,4,0.20)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#3e2608]/58">
                  Explore Temple Vision
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className={sectionClass}>
        <div className={`${shellClass} grid items-center gap-9 lg:grid-cols-[1fr_0.9fr]`}>
          <div>
            <SectionHeader eyebrow="Sacred Opportunity to Participate" title="A Divine Vision for Generations" />
            <p className="text-lg leading-9 text-[#5f4934]">
              Bhagwat Dham is not just a temple, but a living spiritual center where devotion, knowledge, service, and culture come together.
              It is being created as a timeless beacon of Sanatan Bhagwat culture, inspiring humanity towards peace, purpose, and divine connection.
            </p>
          </div>
          <ImageBlock src={images.modelDay} alt="Lotus light and temple aura for Bhagwat Dham vision" />
        </div>
      </section>

      <section className={sectionClass}>
        <div className={shellClass}>
          <SectionHeader center title="Why Bhagwat Dham is Unique" text="A sacred center where shastra, bhakti, architecture, culture, and seva are woven into one divine experience." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {uniqueness.map(([title, image]) => (
              <article key={title} className="flex h-full min-h-[390px] flex-col overflow-hidden rounded-[28px] border border-[#efd4a6] bg-white/92 shadow-[0_18px_44px_rgba(95,62,24,0.10)] backdrop-blur">
                <img src={image} alt={title} className="block h-72 w-full bg-[#fff8ea] object-cover object-center sm:h-80" loading="lazy" />
                <div className="flex flex-1 items-center p-6">
                  <h3 className="text-xl font-black text-[#123f47]">{title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={`${shellClass} grid gap-8 lg:grid-cols-[0.9fr_1.1fr]`}>
          <div>
            <SectionHeader title="The Sacred Construction Journey" text="The divine construction of Bhagwat Dham is steadily progressing through the devotion of countless devotees." />
            <div className="space-y-4">
              {constructionPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-[#edcf93] bg-white/86 p-4 font-bold text-[#4f3a26] shadow-sm">{point}</div>
              ))}
            </div>
            <div className="mt-6 rounded-[24px] bg-[linear-gradient(135deg,#fff1c8,#ffd989)] p-6 text-xl font-black text-[#5b3510] shadow-[0_16px_36px_rgba(165,90,17,0.16)]">
              Each step of Bhagwat Dham is being realized through collective devotion
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <ImageBlock src={images.site} alt="Bhagwat Dham real site image" />
            <ImageBlock src={images.modelNight} alt="Future vision of Bhagwat Dham temple" />
            <div className="sm:col-span-2 rounded-[28px] border border-[#efd4a6] bg-white/86 p-5 shadow-[0_18px_44px_rgba(95,62,24,0.10)]">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#a55a11]">Before & Future Vision</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <ImageBlock src={images.currentSite} alt="Bhagwat Dham construction site current view" className="shadow-none" />
                <ImageBlock src={images.modelDay} alt="Bhagwat Dham future temple vision" className="shadow-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={shellClass}>
          <SectionHeader center eyebrow="Divine Construction in Progress" title="Step-by-Step Divine Construction Plan" />
          <div className="grid gap-5 lg:grid-cols-5">
            {phases.map(([phase, title, text], index) => (
              <article key={phase} className="relative rounded-[26px] border border-[#efd4a6] bg-white/90 p-5 text-center shadow-[0_16px_34px_rgba(95,62,24,0.09)]">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff9933,#f5cf75)] text-xl font-black text-white">{index + 1}</div>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.12em] text-[#a55a11]">{phase}</p>
                <h3 className="mt-2 text-xl font-black text-[#123f47]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#66513b]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={shellClass}>
          <SectionHeader center title="Divine Experience Inside Bhagwat Dham" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map(([title, text, image]) => (
              <article key={title} className="overflow-hidden rounded-[28px] border border-[#efd4a6] bg-white shadow-[0_18px_44px_rgba(95,62,24,0.10)]">
                <img src={image} alt={title} className="h-56 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="text-xl font-black text-[#123f47]">{title}</h3>
                  <p className="mt-2 text-[#66513b]">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={shellClass}>
          <SectionHeader title="Sacred Craftsmanship & Architecture" text="Bhagwat Dham is being built using a combination of modern structural strength and ancient temple craftsmanship." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {craft.map(([title, image]) => (
              <article key={title} className="overflow-hidden rounded-[26px] border border-[#efd4a6] bg-white shadow-[0_18px_44px_rgba(95,62,24,0.10)]">
                <img src={image} alt={title} className="h-48 w-full object-cover" loading="lazy" />
                <h3 className="p-5 text-lg font-black text-[#123f47]">{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="bhagwat-dham-donation" className="relative z-20 px-4 py-10">
        <div className="relative mx-auto max-w-[1220px] overflow-hidden rounded-[34px] border border-[#efc377] bg-[linear-gradient(135deg,#fff4d5_0%,#ffd989_48%,#fffdf8_100%)] p-6 shadow-[0_24px_64px_rgba(137,78,18,0.20)] sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-16 h-80 w-80 rounded-t-[150px] border-[22px] border-[#c98222] opacity-[0.10]" />
          <div className="relative grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <span className={eyebrowClass}>Sacred Opportunity to Participate</span>
              <h2 className="font-serif text-3xl font-black text-[#2f2417] sm:text-4xl">Your Devotion Builds Bhagwat Dham</h2>
              <p className="mt-4 text-lg leading-8 text-[#634b34]">
                This sacred temple is being realized through the collective devotion of devotees. Be a part of this divine construction.
              </p>

              <div className="mt-7 rounded-[26px] border border-white/80 bg-white/72 p-5 shadow-[0_14px_34px_rgba(95,62,24,0.10)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#a55a11]">Current Construction Milestone</p>
                    <h3 className="mt-2 text-2xl font-black text-[#123f47]">Goal: Rs. 35,00,000 (1 Slab)</h3>
                  </div>
                  <p className="rounded-full bg-[#0f7f84] px-4 py-2 text-sm font-black text-white">{progress}% Completed</p>
                </div>
                <div className="mt-5 h-5 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#0f7f84,#ff9933)]" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm font-black text-[#5b3510]">
                  <span>Rs. 12,50,000 Raised</span>
                  <span>Each contribution brings the structure closer to completion</span>
                </div>
              </div>

              <div className="mt-5 rounded-[26px] border-2 border-[#c98222] bg-white/82 p-5 shadow-[0_18px_40px_rgba(137,78,18,0.16)]">
                <p className="text-3xl font-black text-[#c26816]">Rs. 25,00,000</p>
                <h3 className="mt-1 text-2xl font-black text-[#123f47]">Sponsor One Structural Slab</h3>
                <p className="mt-3 leading-7 text-[#66513b]">Support a complete construction milestone of Bhagwat Dham</p>
                <PrimaryButton to={`${ROUTES.donate}?fund=bhagwat-dham&amount=2500000`}>Become a Major Contributor</PrimaryButton>
              </div>
            </div>

            <div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {donationTierCards.map(([amount, label]) => {
                  const isSelected = selectedAmount === amount;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setSelectedAmount(amount)}
                      className={`rounded-[24px] border p-5 text-left shadow-[0_12px_28px_rgba(95,62,24,0.08)] transition hover:-translate-y-1 ${
                        isSelected
                          ? "border-[#c98222] bg-white text-[#123f47] ring-4 ring-[#ffd989]/45"
                          : "border-white/80 bg-white/72 text-[#5f4934] hover:border-[#efc377]"
                      }`}
                    >
                      <span className="block text-2xl font-black text-[#c26816]">{amount > 0 ? formatInr(amount) : "Custom"}</span>
                      <span className="mt-2 block text-base font-black">{label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-white/80 bg-white/72 p-5">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-[#a55a11]">Purpose</p>
                  <p className="mt-1 text-xl font-black text-[#123f47]">Bhagwat Dham Project</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <PrimaryButton to={donateLink}>Donate for Bhagwat Dham</PrimaryButton>
                  <ExternalButton href={EXTERNAL_RAZORPAY_DONATE_URL}>Razorpay</ExternalButton>
                  <SecondaryButton to={`${ROUTES.donate}?fund=bhagwat-dham&method=upi${selectedAmount > 0 ? `&amount=${selectedAmount}` : ""}`}>UPI / Netbanking</SecondaryButton>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {trustElements.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/80 bg-white/70 p-4 font-black text-[#123f47]">
                    <span className="mr-2 text-[#c26816]">+</span>{item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[26px] border border-white/80 bg-white/72 p-5">
                <h3 className="text-xl font-black text-[#123f47]">Your Contribution Will Be Honored Through:</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Temple Donor Wall", "Digital Display", "Bhagwat Katha Announcements", "Seva Certificate"].map((item) => (
                    <p key={item} className="rounded-2xl bg-[#fff6e8] p-3 text-sm font-bold text-[#5b3510]">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={shellClass}>
          <SectionHeader center title="Sponsor a Sacred Part of the Temple" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorParts.map(([part, image]) => (
              <article key={part} className="overflow-hidden rounded-[28px] border border-[#efd4a6] bg-white/92 text-center shadow-[0_18px_44px_rgba(95,62,24,0.10)] backdrop-blur">
                <img src={image} alt={part} className="block h-48 w-full bg-[#fff8ea] object-cover object-center sm:h-56" loading="lazy" />
                <div className="flex min-h-24 items-center justify-center p-5">
                  <h3 className="text-xl font-black text-[#123f47]">{part}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={`${shellClass} grid gap-8 lg:grid-cols-[0.85fr_1.15fr]`}>
          <div>
            <SectionHeader title="Your Contribution, Forever Honored" />
            <div className="space-y-3">
              {recognition.map((item) => <p key={item} className="rounded-2xl border border-[#efd4a6] bg-white/88 p-4 font-bold text-[#4f3a26]">{item}</p>)}
            </div>
          </div>
          <div className={cardClass}>
            <h3 className="font-serif text-3xl font-black text-[#2f2417]">Dynamic Donor Wall</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {donorWall.map(([name, seva]) => (
                <div key={name} className="rounded-2xl bg-[#fff6e8] p-4">
                  <p className="font-black text-[#123f47]">{name}</p>
                  <p className="mt-1 text-sm font-bold text-[#a55a11]">{seva}</p>
                </div>
              ))}
            </div>
            <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777632879/donation_psnmtu.jpg" alt="Bhagwat Dham donation and donor wall visual" className="mt-6 block h-72 w-full rounded-[24px] object-cover object-center" loading="lazy" />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={`${shellClass} rounded-[34px] border border-[#efd4a6] bg-[linear-gradient(135deg,#fff8d8_0%,#ffe8a8_48%,#fff3c7_100%)] p-8 text-[#4f3210] shadow-[0_24px_60px_rgba(137,78,18,0.14)] sm:p-10`}>
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="mb-3 inline-flex rounded-full border border-[#d6a44b] bg-white/55 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#a55a11]">Sacred Opportunity to Participate</span>
            <h2 className="font-serif text-3xl font-black leading-tight text-[#123f47] sm:text-4xl lg:text-5xl">A Global Spiritual Movement</h2>
            <p className="mt-4 text-lg leading-8 text-[#5f4934]">Bhagwat Dham is a worldwide spiritual mission connecting devotees across India and the globe to participate in this divine creation.</p>
          </div>
          <div className="flex justify-center">
            <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_41_57_AM_wsv00f.png" alt="Global spiritual movement icon" className="h-20 w-20 rounded-full bg-white/55 object-cover p-1 shadow-[0_14px_30px_rgba(137,78,18,0.12)]" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-[1120px] rounded-[36px] border border-[#efc377] bg-[linear-gradient(135deg,#fff4d5,#ffd989_48%,#ff9933)] p-8 text-center shadow-[0_24px_60px_rgba(137,78,18,0.18)] sm:p-12">
          <h2 className="font-serif text-4xl font-black text-[#2f2417] sm:text-5xl">Be a Part of Bhagwat Dham</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#5b3510]">Your devotion today will shape a sacred legacy for generations.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PrimaryButton to={donateLink}>Donate Now</PrimaryButton>
            <SecondaryButton to={ROUTES.involved.volunteer}>Join as Sevak</SecondaryButton>
            <SecondaryButton to={ROUTES.mandirTeerth.pilgrimage}>Visit Bhagwat Dham</SecondaryButton>
          </div>
        </div>
      </section>

      <a href="#bhagwat-dham-donation" className="fixed bottom-5 right-5 z-50 inline-flex min-h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff9933,#c98222)] px-5 py-3 text-sm font-black text-white shadow-[0_18px_42px_rgba(137,78,18,0.28)] transition hover:-translate-y-1">
        Donate for Bhagwat Dham
      </a>
    </div>
  );
});
