import { memo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

const imageBase = "/assets/images/bhagwat-dham";
const iconBase = "/assets/icons/bhagwat-dham";

const image = (fileName: string) => `${imageBase}/${fileName}`;
const icon = (fileName: string) => `${iconBase}/${fileName}`;

const images = {
  hero: "https://res.cloudinary.com/der8zinu8/image/upload/v1777623874/hero_w6ayzh.jpg",
  modelDay: "https://res.cloudinary.com/der8zinu8/image/upload/v1777617367/ChatGPT_Image_May_1_2026_12_05_26_PM_csdeni.png",
  modelNight: "https://res.cloudinary.com/der8zinu8/image/upload/v1777623872/nightview_rwrhwb.jpg",
  currentSite: "https://res.cloudinary.com/der8zinu8/image/upload/v1777704255/ChatGPT_Image_May_2_2026_12_10_18_PM_yy5m64.png",
  comparison: "https://res.cloudinary.com/der8zinu8/image/upload/v1777704255/ChatGPT_Image_May_2_2026_12_13_37_PM_v0qodc.png",
  vision: "https://res.cloudinary.com/der8zinu8/image/upload/v1777698919/ChatGPT_Image_May_2_2026_10_40_08_AM_mbwqzq.png",
  garbhagriha: "https://res.cloudinary.com/der8zinu8/image/upload/v1777623873/garbhgriha_rwg8jk.jpg",
  bhagwatVedas: "https://res.cloudinary.com/der8zinu8/image/upload/v1777623872/vedas_eqd0lj.jpg",
  thrones: "https://res.cloudinary.com/der8zinu8/image/upload/v1777623872/main_-_hall_entry_ulwpwi.jpg",
  deityInstallation: "https://res.cloudinary.com/der8zinu8/image/upload/v1777623872/24-mahaavtar_ser80b.jpg",
  guru: "https://res.cloudinary.com/der8zinu8/image/upload/v1777631994/ChatGPT_Image_May_1_2026_04_09_23_PM_duelhi.png",
  stoneCarving: "https://res.cloudinary.com/der8zinu8/image/upload/v1777627768/ChatGPT_Image_May_1_2026_02_57_48_PM_tx5xcc.png",
  pillarDesign: "https://res.cloudinary.com/der8zinu8/image/upload/v1777630777/ChatGPT_Image_May_1_2026_03_48_12_PM_xobguq.png",
  jharokhaDesign: "https://res.cloudinary.com/der8zinu8/image/upload/v1777630776/ChatGPT_Image_May_1_2026_03_48_28_PM_duopxo.png",
  domeDesign: "https://res.cloudinary.com/der8zinu8/image/upload/v1777627769/ChatGPT_Image_May_1_2026_02_57_35_PM_b3pkgp.png",
  bansiStone: "https://res.cloudinary.com/der8zinu8/image/upload/v1777627768/ChatGPT_Image_May_1_2026_02_57_48_PM_tx5xcc.png",
  makranaMarble: "https://res.cloudinary.com/der8zinu8/image/upload/v1777627768/ChatGPT_Image_May_1_2026_02_57_41_PM_fv6tsh.png",
  darshan: image("darshan.jpg"),
  aarti: image("aarti.jpg"),
  prasad: image("prasad.jpg"),
  meditation: image("meditation.jpg"),
  devoteeSeva: "https://res.cloudinary.com/der8zinu8/image/upload/v1777191430/ChatGPT_Image_Apr_26_2026_01_43_38_PM_cpi5u0.png",
  annSeva: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193608/ChatGPT_Image_Apr_26_2026_01_44_55_PM_jzfpur.png",
  community: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050436/icon-family-pathshala.svg",
  globalDevotees: "https://res.cloudinary.com/der8zinu8/image/upload/v1777700065/ChatGPT_Image_May_2_2026_11_00_50_AM_p1hzpd.png",
  culturalHeritage: "https://res.cloudinary.com/der8zinu8/image/upload/v1777701234/ChatGPT_Image_May_2_2026_11_17_25_AM_d9ohed.png",
  youthFuture: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967403/g3_ugmfqm.png",
  knowledge: image("knowledge-scriptures.jpg"),
  pathshala: image("education-pathshala.jpg"),
  events: image("events-katha-satsang.jpg"),
  legacy: image("legacy-eternal-impact.jpg"),
  prayerHands: "https://res.cloudinary.com/der8zinu8/image/upload/v1777715940/ChatGPT_Image_May_2_2026_03_27_46_PM_nc6wau.png",
  donationMilestone: "https://res.cloudinary.com/der8zinu8/image/upload/v1777718471/ChatGPT_Image_May_2_2026_04_09_07_PM_gzoxqc.png",
  recognition: "https://res.cloudinary.com/der8zinu8/image/upload/v1777718471/ChatGPT_Image_May_2_2026_04_10_40_PM_z5ubs9.png",
};

const icons = {
  temple: icon("icon-temple.svg"),
  bhagwat: icon("icon-bhagwat.svg"),
  vedas: icon("icon-vedas.svg"),
  avatar: icon("icon-avatar.svg"),
  guru: "https://res.cloudinary.com/der8zinu8/image/upload/v1777700065/ChatGPT_Image_May_2_2026_11_00_18_AM_a8ybee.png",
  construction: icon("icon-construction.svg"),
  rcc: icon("icon-rcc-structure.svg"),
  stone: icon("icon-stone-carving.svg"),
  marble: icon("icon-marble.svg"),
  architecture: icon("icon-temple-architecture.svg"),
  pillars: icon("icon-pillars.svg"),
  steps: icon("icon-steps.svg"),
  jharokha: icon("icon-jharokha.svg"),
  throne: icon("icon-throne.svg"),
  rooms: icon("icon-rooms.svg"),
  kalash: icon("icon-kalash.svg"),
  pranPratishtha: icon("icon-pran-pratishtha.svg"),
  donation: icon("icon-donation.svg"),
  sponsor: icon("icon-sponsor.svg"),
  payment: icon("icon-digital-payment.svg"),
  global: icon("icon-global-seva.svg"),
  seva: icon("icon-seva.svg"),
  certificate: icon("icon-certificate.svg"),
  darshan: "https://res.cloudinary.com/der8zinu8/image/upload/v1777700061/ChatGPT_Image_May_2_2026_11_03_43_AM_fwmiy5.png",
  aarti: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193608/ChatGPT_Image_Apr_26_2026_01_45_14_PM_kjfb6b.png",
  prasad: "https://res.cloudinary.com/der8zinu8/image/upload/v1777705375/ChatGPT_Image_May_2_2026_12_32_07_PM_utkyh6.png",
  meditation: "https://res.cloudinary.com/der8zinu8/image/upload/v1777705375/ChatGPT_Image_May_2_2026_12_31_58_PM_a2spkn.png",
  completed: icon("icon-completed.svg"),
  progress: icon("icon-work-progress.svg"),
  upcoming: icon("icon-upcoming-phase.svg"),
  transparency: icon("icon-transparency.svg"),
  safety: icon("icon-safety-quality.svg"),
  community: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050436/icon-family-pathshala.svg",
  culture: "https://res.cloudinary.com/der8zinu8/image/upload/v1777701234/ChatGPT_Image_May_2_2026_11_17_25_AM_d9ohed.png",
  knowledge: icon("icon-knowledge-scriptures.svg"),
  pathshala: icon("icon-education-pathshala.svg"),
  events: icon("icon-events-katha.svg"),
  youth: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967403/g3_ugmfqm.png",
  legacy: icon("icon-legacy.svg"),
  volunteer: "https://res.cloudinary.com/der8zinu8/image/upload/v1777191430/ChatGPT_Image_Apr_26_2026_01_43_38_PM_cpi5u0.png",
  annSeva: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193608/ChatGPT_Image_Apr_26_2026_01_44_55_PM_jzfpur.png",
};

const sectionClass = "relative px-4 py-14 sm:py-18 lg:py-20";
const shellClass = "mx-auto max-w-[1220px]";
const eyebrowClass =
  "mb-4 inline-flex rounded-full border border-[#f3c978] bg-[#fff6df]/92 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#a45a12]";
const headingClass = "font-serif text-3xl font-black leading-tight text-[#2e2419] sm:text-4xl lg:text-5xl";
const bodyClass = "text-base leading-8 text-[#68513a] sm:text-lg";
const cardClass =
  "rounded-[28px] border border-[#efd7aa] bg-white/90 p-6 shadow-[0_18px_44px_rgba(98,61,20,0.10)] backdrop-blur";

const heroStats = [
  ["Sanatan Bhagwat Temple", "https://res.cloudinary.com/der8zinu8/image/upload/v1777700062/ChatGPT_Image_May_2_2026_11_02_30_AM_lupzk7.png"],
  ["Bhagwat Culture", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705388/ChatGPT_Image_May_2_2026_12_30_45_PM_t9snac.png"],
  ["Sacred Participation", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705386/ChatGPT_Image_May_2_2026_12_30_54_PM_qa9sr9.png"],
  ["Global Seva", "https://res.cloudinary.com/der8zinu8/image/upload/v1777700060/ChatGPT_Image_May_2_2026_11_03_28_AM_iy6q6k.png"],
];

const uniqueCards = [
  [
    "World's First Sanatan Bhagwat Temple",
    "A unique sacred vision dedicated to Shrimad Bhagwat Mahapuran and Sanatan Bhagwat Sanskriti.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700060/ChatGPT_Image_May_2_2026_11_03_03_AM_ek9zpk.png",
  ],
  [
    "Shrimad Bhagwat Mahapuran & Four Vedas",
    "A divine symbolic installation of Bhagwat Mahapuran and the four Vedas as the living knowledge tradition of Bharat.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700065/ChatGPT_Image_May_2_2026_11_00_42_AM_qv9vsr.png",
  ],
  [
    "24 Avatars of Lord Narayan",
    "The temple will present the divine flow of Lord Narayan's avatars, inspiring unity across Sanatan traditions.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777701234/ChatGPT_Image_May_2_2026_11_14_11_AM_ajgftv.png",
  ],
  [
    "Guru Parampara Presence",
    "The project honors the sacred Guru Parampara and the spiritual blessings guiding this divine mission.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700065/ChatGPT_Image_May_2_2026_11_00_18_AM_a8ybee.png",
  ],
  [
    "Global Spiritual Unity Center",
    "Bhagwat Dham will connect devotees across India and the world through seva, satsang, culture, and knowledge.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700065/ChatGPT_Image_May_2_2026_11_00_50_AM_p1hzpd.png",
  ],
  [
    "Temple + Culture + Knowledge Integration",
    "A center where worship, scriptures, festivals, learning, and social service work together as one living mission.",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777701234/ChatGPT_Image_May_2_2026_11_17_25_AM_d9ohed.png",
  ],
];

const timeline = [
  [
    "Bhoomi Pujan & Foundation",
    "Completed",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777702564/ChatGPT_Image_May_2_2026_11_41_53_AM_e9i1t4.png",
  ],
  [
    "Basement Hall & Spiritual Activity Center",
    "Active",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777702563/ChatGPT_Image_May_2_2026_11_44_58_AM_edysnm.png",
  ],
  [
    "RCC Structure & Slab Development",
    "In Progress",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700063/ChatGPT_Image_May_2_2026_11_01_57_AM_m3fz5g.png",
  ],
  [
    "Shikhar, Kalash & Pran Pratishtha",
    "Upcoming Sacred Milestone",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777702952/ChatGPT_Image_May_2_2026_11_51_39_AM_pb04rq.png",
  ],
];

const architectureImages = [
  ["Stone carving detail", images.stoneCarving],
  ["Pillar design", images.pillarDesign],
  ["Jharokha design", images.jharokhaDesign],
  ["Dome ceiling design", images.domeDesign],
  ["Bansi Paharpur stone", images.bansiStone],
  ["Makrana marble", images.makranaMarble],
];

const architectureFeatures = [
  [
    "RCC Structural System",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700063/ChatGPT_Image_May_2_2026_11_01_57_AM_m3fz5g.png",
  ],
  [
    "Bansi Paharpur Pink Stone",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700066/ChatGPT_Image_May_2_2026_11_00_10_AM_wjqo88.png",
  ],
  [
    "Makrana Marble",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700062/ChatGPT_Image_May_2_2026_11_02_30_AM_lupzk7.png",
  ],
  [
    "Traditional Sompura Temple Design",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777705375/ChatGPT_Image_May_2_2026_12_31_29_PM_u7fcgf.png",
  ],
  [
    "Pillars / Stambh",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700063/ChatGPT_Image_May_2_2026_11_02_03_AM_xbywzg.png",
  ],
  [
    "Steps / Pravesh",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700062/ChatGPT_Image_May_2_2026_11_02_12_AM_rrjdpk.png",
  ],
  [
    "Jharokhas",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777700062/ChatGPT_Image_May_2_2026_11_02_20_AM_th06om.png",
  ],
  [
    "Shikhar & Kalash",
    "https://res.cloudinary.com/der8zinu8/image/upload/v1777702952/ChatGPT_Image_May_2_2026_11_51_39_AM_pb04rq.png",
  ],
];

const garbhagrihaCards = [
  ["Main Temple Hall", "A sacred hall space for devotees to gather in devotion, darshan, satsang, and divine connection.", images.thrones],
  ["Shrimad Bhagwat & Four Vedas", "The living knowledge tradition of Sanatan Dharma honored in divine form.", images.bhagwatVedas],
  ["24 Avtar Darshan", "A divine darshan experience honoring the 24 Avatars of Lord Narayan and their eternal message for humanity.", images.deityInstallation],
];

const templeExperience = [
  ["Darshan", "A peaceful space for devotees to experience divine presence and inner connection.", images.darshan, icons.darshan],
  ["Aarti", "Daily worship and aarti will fill Bhagwat Dham with sacred energy.", images.aarti, icons.aarti],
  ["Prasad", "Prasad will symbolize divine grace, gratitude, and shared devotion.", images.prasad, icons.prasad],
  ["Meditation & Spiritual Growth", "A calm environment for prayer, reflection, and spiritual upliftment.", images.meditation, icons.meditation],
];

const sevaCards = [
  ["Volunteer Seva", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705396/ChatGPT_Image_May_2_2026_12_30_23_PM_tjxuta.png"],
  ["Ann Seva", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705397/ChatGPT_Image_May_2_2026_12_29_59_PM_mynr5b.png"],
  ["Community Participation", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705386/ChatGPT_Image_May_2_2026_12_30_54_PM_qa9sr9.png"],
  ["Global Devotees", "https://res.cloudinary.com/der8zinu8/image/upload/v1777700065/ChatGPT_Image_May_2_2026_11_00_50_AM_p1hzpd.png"],
  ["Cultural Service", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705388/ChatGPT_Image_May_2_2026_12_30_45_PM_t9snac.png"],
  ["Youth & Future Generation", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705398/ChatGPT_Image_May_2_2026_12_29_52_PM_typnff.png"],
];

const donationTiers = [
  [501, "Basic Seva", icons.donation],
  [1100, "Devotee Offering", icons.bhagwat],
  [11000, "Shraddha Seva", icons.seva],
  [51000, "Construction Seva", icons.rcc],
  [111000, "Divine Contribution", icons.sponsor],
  [0, "Custom Amount", icons.payment],
];

const sponsorElements = [
  ["Pillars", "https://res.cloudinary.com/der8zinu8/image/upload/v1777700063/ChatGPT_Image_May_2_2026_11_02_03_AM_xbywzg.png"],
  ["Steps", "https://res.cloudinary.com/der8zinu8/image/upload/v1777700062/ChatGPT_Image_May_2_2026_11_02_12_AM_rrjdpk.png"],
  ["Jharokhas", "https://res.cloudinary.com/der8zinu8/image/upload/v1777700062/ChatGPT_Image_May_2_2026_11_02_20_AM_th06om.png"],
  ["Thrones", "https://res.cloudinary.com/der8zinu8/image/upload/v1777623872/main_-_hall_entry_ulwpwi.jpg"],
  ["Deity Installation", "https://res.cloudinary.com/der8zinu8/image/upload/v1777623872/24-mahaavtar_ser80b.jpg"],
  ["Rooms", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705375/ChatGPT_Image_May_2_2026_12_31_29_PM_u7fcgf.png"],
  ["Shikhar & Kalash", "https://res.cloudinary.com/der8zinu8/image/upload/v1777702952/ChatGPT_Image_May_2_2026_11_51_39_AM_pb04rq.png"],
];

const recognition = ["Temple Donor Wall", "Digital Display", "Bhagwat Katha Announcements", "Seva Certificate", "Special invitation to sacred ceremonies"];
const trustItems = [
  ["12A & 80G Certified", icons.certificate],
  ["FCRA Approved", icons.global],
  ["Audited Trust", icons.transparency],
  ["Digital Receipt Available", icons.payment],
];

const futureCards = [
  [
    "Knowledge & Scriptures",
    "Bhagwat Dham will preserve and spread the wisdom of Shrimad Bhagwat, Vedas, and Sanatan scriptures.",
    images.knowledge,
    icons.knowledge,
  ],
  [
    "Education & E-Pathshala",
    "A platform for children, youth, and families to learn values, scriptures, sanskar, and spiritual culture.",
    images.pathshala,
    icons.pathshala,
  ],
  [
    "Events, Katha & Satsang",
    "A sacred space for Bhagwat Katha, satsang, festivals, bhajan, kirtan, and spiritual gatherings.",
    images.events,
    icons.events,
  ],
  [
    "Cultural Heritage",
    "A center to preserve and celebrate Indian culture, art, festivals, and family values.",
    images.culturalHeritage,
    icons.culture,
  ],
  [
    "Youth & Future Generation",
    "Inspiring youth through dharma, values, seva, discipline, and leadership.",
    images.youthFuture,
    icons.youth,
  ],
  [
    "Legacy & Eternal Impact",
    "A sacred contribution today becomes a blessing for generations to come.",
    images.legacy,
    icons.legacy,
  ],
];

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`${sectionClass} ${className}`}>
      <div className={shellClass}>{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} mb-9 max-w-3xl`}>
      {eyebrow ? <span className={eyebrowClass}>{eyebrow}</span> : null}
      <h2 className={headingClass}>{title}</h2>
      {text ? <p className={`mt-4 ${bodyClass}`}>{text}</p> : null}
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`${cardClass} ${className}`}>{children}</article>;
}

function fileLabel(src: string) {
  return src.split("/").pop() ?? "asset";
}

function ImageCard({
  src,
  alt,
  aspect = "4 / 3",
  className = "",
  imgClassName = "",
  priority = false,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  objectPosition?: string;
}) {
  const [missing, setMissing] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border border-[#efd7aa] bg-[#fff3dc] shadow-[0_22px_54px_rgba(98,61,20,0.14)] ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {missing ? (
        <div className="flex h-full min-h-[220px] w-full items-center justify-center bg-[linear-gradient(135deg,#fff8ea,#ffe7ad)] p-6 text-center text-sm font-black uppercase tracking-[0.14em] text-[#a45a12]">
          Image placeholder: {fileLabel(src)}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`block h-full min-h-[220px] w-full object-cover ${imgClassName}`}
          style={{ objectPosition }}
          loading={priority ? "eager" : "lazy"}
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}

function IconBadge({ src, label, compact = false }: { src: string; label: string; compact?: boolean }) {
  const [source, setSource] = useState(src);
  const [missing, setMissing] = useState(false);

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border border-[#efc978] bg-[#fff7e4] text-center text-[10px] font-black uppercase leading-tight text-[#a45a12] shadow-[0_12px_28px_rgba(162,91,18,0.14)] transition hover:scale-[1.05] ${
        compact ? "h-14 w-14" : "h-16 w-16 sm:h-[76px] sm:w-[76px] lg:h-[90px] lg:w-[90px]"
      }`}
      aria-label={label}
    >
      {missing ? (
        <span className="px-1">{label.slice(0, 2)}</span>
      ) : (
        <img
          src={source}
          alt=""
          className={compact ? "h-8 w-8 object-contain" : "h-9 w-9 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-12"}
          loading="lazy"
          onError={() => {
            if (source.endsWith(".svg")) {
              setSource(source.replace(/\.svg$/, ".png"));
            } else {
              setMissing(true);
            }
          }}
        />
      )}
    </span>
  );
}

function CircularImageIcon({ src, label }: { src: string; label: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <span className="block h-24 w-24 overflow-hidden rounded-full bg-[#fff7e4] shadow-[0_14px_30px_rgba(162,91,18,0.14)]">
      {missing ? (
        <span className="flex h-full w-full items-center justify-center text-xs font-black uppercase tracking-[0.12em] text-[#a45a12]">
          {label.slice(0, 2)}
        </span>
      ) : (
        <img
          src={src}
          alt=""
          className="h-full w-full rounded-full object-cover"
          loading="lazy"
          onError={() => setMissing(true)}
        />
      )}
    </span>
  );
}

function CenteredCircularImageIcon({ src, label }: { src: string; label: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <span className="mx-auto block h-24 w-24 overflow-hidden rounded-full bg-[#fff7e4] shadow-[0_14px_30px_rgba(162,91,18,0.14)]">
      {missing ? (
        <span className="flex h-full w-full items-center justify-center text-xs font-black uppercase tracking-[0.12em] text-[#a45a12]">
          {label.slice(0, 2)}
        </span>
      ) : (
        <img
          src={src}
          alt=""
          className="h-full w-full rounded-full object-cover"
          loading="lazy"
          onError={() => setMissing(true)}
        />
      )}
    </span>
  );
}

function SmallCircularImageIcon({ src, label }: { src: string; label: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <span className="block h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#fff7e4] shadow-[0_14px_30px_rgba(162,91,18,0.14)]">
      {missing ? (
        <span className="flex h-full w-full items-center justify-center text-[10px] font-black uppercase tracking-[0.1em] text-[#a45a12]">
          {label.slice(0, 2)}
        </span>
      ) : (
        <img
          src={src}
          alt=""
          className="h-full w-full rounded-full object-cover"
          loading="lazy"
          onError={() => setMissing(true)}
        />
      )}
    </span>
  );
}

function MediumCircularImageIcon({ src, label }: { src: string; label: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <span className="mx-auto block h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#fff7e4] shadow-[0_14px_30px_rgba(162,91,18,0.14)]">
      {missing ? (
        <span className="flex h-full w-full items-center justify-center text-xs font-black uppercase tracking-[0.1em] text-[#a45a12]">
          {label.slice(0, 2)}
        </span>
      ) : (
        <img
          src={src}
          alt=""
          className="h-full w-full rounded-full object-cover"
          loading="lazy"
          onError={() => setMissing(true)}
        />
      )}
    </span>
  );
}

function StripCircularImageIcon({ src, label }: { src: string; label: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <span className="mx-auto block h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#fff7e4] shadow-[0_14px_30px_rgba(162,91,18,0.14)]">
      {missing ? (
        <span className="flex h-full w-full items-center justify-center text-xs font-black uppercase tracking-[0.1em] text-[#a45a12]">
          {label.slice(0, 2)}
        </span>
      ) : (
        <img
          src={src}
          alt=""
          className="h-full w-full rounded-full object-cover"
          loading="lazy"
          onError={() => setMissing(true)}
        />
      )}
    </span>
  );
}

function SponsorCircularImageIcon({ src, label }: { src: string; label: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <span className="block h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#fff7e4] shadow-[0_14px_30px_rgba(162,91,18,0.14)]">
      {missing ? (
        <span className="flex h-full w-full items-center justify-center text-xs font-black uppercase tracking-[0.1em] text-[#a45a12]">
          {label.slice(0, 2)}
        </span>
      ) : (
        <img
          src={src}
          alt=""
          className="h-full w-full rounded-full object-cover"
          loading="lazy"
          onError={() => setMissing(true)}
        />
      )}
    </span>
  );
}

function PrimaryButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FF9933,#d88b16)] px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(216,139,22,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(216,139,22,0.34)]"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e1b35b] bg-white/88 px-6 py-3 text-sm font-black text-[#70460f] shadow-[0_12px_28px_rgba(98,61,20,0.10)] transition hover:-translate-y-0.5 hover:bg-[#fff6df]"
    >
      {children}
    </Link>
  );
}

function ExternalButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0f7f84] px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(15,127,132,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0b7075]"
    >
      {children}
    </a>
  );
}

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default memo(function BhagwatDhamProjectPage() {
  const [selectedAmount, setSelectedAmount] = useState(1100);
  const slabTarget = 3500000;
  const slabRaised = 1250000;
  const progress = Math.round((slabRaised / slabTarget) * 100);
  const donateLink = `${ROUTES.donate}?fund=bhagwat-dham&fund_type=bhagwat-dham${selectedAmount > 0 ? `&amount=${selectedAmount}` : ""}`;

  usePageMeta(
    "Bhagwat Dham Project | World's First Sanatan Bhagwat Temple",
    "Bhagwat Dham is envisioned as the world's first Sanatan Bhagwat Temple, a divine center of Bhagwat culture, seva, sanskar, and spiritual heritage.",
  );

  return (
    <main className="relative min-h-screen overflow-hidden scroll-smooth bg-[linear-gradient(180deg,#fff7e9_0%,#fffdf8_42%,#f8efe2_100%)] text-[#342515]">
      <div className="pointer-events-none absolute left-[-12%] top-[18%] h-[420px] w-[420px] rounded-full bg-[#FF9933]/16 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] top-[40%] h-[380px] w-[380px] rounded-full bg-[#0f7f84]/12 blur-3xl" />

      <Link
        to={donateLink}
        className="fixed bottom-4 left-4 right-4 z-50 inline-flex min-h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FF9933,#c98222)] px-5 py-3 text-sm font-black text-white shadow-[0_18px_42px_rgba(137,78,18,0.28)] transition hover:-translate-y-1 sm:left-auto sm:right-5 sm:top-24 sm:bottom-auto sm:min-h-12 sm:w-auto"
      >
        Donate for Bhagwat Dham
      </Link>

      <section className="relative z-10 px-4 pt-6">
        <div className="relative mx-auto min-h-[calc(65vh-100px)] max-w-[1440px] overflow-hidden rounded-[38px] border border-[#edcf93] bg-[#4a2a08] shadow-[0_28px_80px_rgba(98,61,20,0.22)] lg:min-h-[calc(80vh-100px)]">
          <ImageCard
            src={images.hero}
            alt="Bhagwat Dham temple vision"
            aspect="16 / 9"
            priority
            className="absolute inset-0 rounded-none border-0 shadow-none"
            imgClassName="object-contain bg-[#2d1705] brightness-105 saturate-110"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,240,168,0.26),transparent_32%),linear-gradient(180deg,rgba(255,248,220,0.04)_0%,rgba(117,68,10,0.28)_42%,rgba(31,19,8,0.78)_100%)]" />
        </div>
      </section>

      <section className="relative z-10 px-4 pt-8">
        <div className="mx-auto max-w-[1120px] text-center">
          <p className="mx-auto mb-5 inline-flex rounded-full border border-[#c98222] bg-[#fff6df] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#a45a12]">
            Divine Construction is Progressing
          </p>
          <h1 className="font-serif text-[34px] font-black leading-tight text-[#123f47] sm:text-[52px] lg:text-[68px]">
            Bhagwat Dham
          </h1>
          <h2 className="mt-3 font-serif text-2xl font-black leading-tight text-[#c26816] sm:text-4xl">
            The World's First Sanatan Bhagwat Temple
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#5f4934] sm:text-xl">
            A divine spiritual center where Bhagwan, Shastra, Sant, Seva, Sanskar, and Sanatan Sanskriti unite for generations.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#68513a]">
            This sacred construction is progressing through devotion, faith, and collective participation. Every devotee is invited to become part of
            this eternal Bhagwat Dham legacy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PrimaryButton to="#donation">Participate in Divine Construction</PrimaryButton>
            <SecondaryButton to="#vision">Explore Temple Vision</SecondaryButton>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pt-4">
        <div className="mx-auto max-w-[1440px] rounded-[26px] border border-[#6d4c1c] bg-[#2d1705] p-2 shadow-[0_18px_44px_rgba(58,31,7,0.18)]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {heroStats.map(([label, statIcon]) => (
              <div
                key={label}
                className="flex min-h-24 items-center gap-4 rounded-2xl border border-[#8f6825] bg-[#3a1e07] px-4 py-3 text-left text-[#fff6d3]"
              >
                <StripCircularImageIcon src={statIcon} label={label} />
                <span className="text-base font-black leading-snug text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section id="vision">
        <div className="grid items-center gap-9 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <SectionHeader eyebrow="Sacred Opportunity to Participate" title="A Divine Vision for Generations" />
            <p className={bodyClass}>
              Bhagwat Dham is envisioned not merely as a temple, but as a living spiritual center of devotion, knowledge, service, and culture.
              Inspired by the divine guidance of Sant Shri Manish Bhaiji Maharaj, this sacred place is being developed as a timeless center for
              Sanatan Bhagwat Sanskriti, where future generations will receive inspiration, peace, values, and spiritual direction.
            </p>
            <Card className="mt-7 flex items-start gap-5 bg-[linear-gradient(135deg,#fff8ea,#fff1c8)]">
              <StripCircularImageIcon
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777700061/ChatGPT_Image_May_2_2026_11_03_43_AM_fwmiy5.png"
                label="Devotion becomes service"
              />
              <div>
                <h3 className="text-xl font-black text-[#123f47]">A sacred dham where devotion becomes service</h3>
                <p className="mt-2 leading-7 text-[#68513a]">Knowledge becomes culture, and faith becomes a legacy.</p>
              </div>
            </Card>
          </div>
          <ImageCard src={images.vision} alt="Lotus light symbolizing the divine vision of Bhagwat Dham" aspect="9 / 7" />
        </div>
      </Section>

      <Section id="unique" className="bg-white/34">
        <SectionHeader center title="Why Bhagwat Dham is Unique" text="A sacred center where Bhagwat wisdom, temple darshan, culture, and seva come together as one living mission." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {uniqueCards.map(([title, text, cardIcon]) => (
            <Card key={title} className="flex h-full flex-col">
              <CircularImageIcon src={cardIcon} label={title} />
              <h3 className="mt-5 text-xl font-black text-[#123f47]">{title}</h3>
              <p className="mt-3 leading-7 text-[#68513a]">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="construction-progress">
        <SectionHeader
          eyebrow="Sacred Construction Journey"
          title="The Sacred Construction Journey"
          text="The divine construction journey of Bhagwat Dham began with Bhoomi Pujan and the foundation of a sacred vision. The basement hall and upper ground structure have already become active centers for worship, satsang, seva, and cultural activities."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {timeline.map(([title, status, timelineIcon], index) => (
            <Card key={title} className="relative text-center">
              <span className="mx-auto mb-4 inline-flex rounded-full bg-[#fff1c8] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#a45a12]">
                Step {index + 1}
              </span>
              <CenteredCircularImageIcon src={timelineIcon} label={title} />
              <h3 className="mt-5 text-xl font-black text-[#123f47]">{title}</h3>
              <p className="mt-2 font-black text-[#c26816]">{status}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <h3 className="text-2xl font-black text-[#123f47]">Current priority: RCC structural expansion and next slab milestone.</h3>
            <p className="mt-4 leading-8 text-[#68513a]">
              The next construction milestone is to strengthen and expand the structural work so the full temple vision can move forward with speed
              and dignity.
            </p>
            <div className="mt-6 rounded-[26px] bg-[linear-gradient(135deg,#fff1c8,#ffd989)] p-6 text-xl font-black text-[#5b3510] shadow-[0_16px_36px_rgba(165,90,17,0.16)]">
              Next construction milestone: RCC structural expansion
            </div>
          </Card>
          <div className="grid gap-5 sm:grid-cols-2">
            <ImageCard src={images.currentSite} alt="Bhagwat Dham current construction site" aspect="9 / 6.5" />
            <ImageCard src={images.modelDay} alt="Bhagwat Dham future day model" aspect="9 / 6.5" />
            <ImageCard src={images.modelNight} alt="Bhagwat Dham future night model" aspect="9 / 6.5" />
            <ImageCard src={images.comparison} alt="Bhagwat Dham current progress and future vision comparison" aspect="9 / 6.5" />
          </div>
        </div>
      </Section>

      <Section id="architecture" className="bg-[#fff8eb]">
        <Card className="bg-[linear-gradient(135deg,#fffdf8,#fff1c8)]">
          <SectionHeader
            eyebrow="Sacred Craftsmanship"
            title="Sacred Craftsmanship & Architecture"
            text="Bhagwat Dham is planned with a strong RCC structural system, supported by traditional temple architecture and sacred shilp."
          />
          <p className={bodyClass}>
            The temple vision includes Bansi Paharpur pink stone, Dholpur stone, Makrana marble, Italian marble, Jaisalmer and selected granite
            materials, along with detailed carving, pillars, jharokhas, torans, mandovar, domes, and shikhar elements.
          </p>
        </Card>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {architectureImages.map(([label, src]) => (
            <ImageCard
              key={label}
              src={src}
              alt={label}
              aspect="1.82 / 1"
              className="bg-[#fff3dc]"
              imgClassName="bg-[#fff3dc] object-contain"
            />
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {architectureFeatures.map(([title, cardIcon]) => (
            <Card key={title} className="flex items-center gap-4">
              <SmallCircularImageIcon src={cardIcon} label={title} />
              <h3 className="text-base font-black text-[#123f47]">{title}</h3>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="garbhagriha">
        <SectionHeader
          center
          eyebrow="Sacred Opportunity to Participate"
          title="The Divine Garbhagriha of Bhagwat Dham"
          text="The upper ground floor will hold the sacred Garbhagriha, where the central divine presence of Bhagwan Shri Hare Krishna Swaminarayan will be established."
        />
        <ImageCard src={images.garbhagriha} alt="The divine Garbhagriha of Bhagwat Dham" aspect="12 / 8" />
        <p className={`mx-auto mt-7 max-w-4xl text-center ${bodyClass}`}>
          Alongside this, Shrimad Bhagwat Mahapuran with the four Vedas and the revered Guru Parampara presence will form the spiritual heart of
          Bhagwat Dham.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {garbhagrihaCards.map(([title, text, src]) => (
            <Card key={title} className="overflow-hidden p-0">
              <ImageCard
                src={src}
                alt={title}
                aspect="4 / 3"
                className="rounded-b-none border-0 bg-[#fff6e8] shadow-none"
                imgClassName="object-contain bg-[#fff6e8]"
              />
              <div className="p-6">
                <h3 className="text-xl font-black text-[#123f47]">{title}</h3>
                <p className="mt-3 leading-7 text-[#68513a]">{text}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="guru-parampara" className="bg-[linear-gradient(135deg,#fff4d5,#ffd989_52%,#fff8ea)]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ImageCard src={images.guru} alt="Guru Parampara presence guiding Bhagwat Dham" aspect="16 / 9" objectPosition="center top" />
          <div>
            <IconBadge src={icons.guru} label="Guru Parampara" />
            <SectionHeader title="Guru Parampara Presence" />
            <p className={bodyClass}>
              Bhagwat Dham is guided by the blessings of the sacred Guru Parampara and inspired by Sant Shri Manish Bhaiji Maharaj. This divine
              lineage gives spiritual direction, purity of purpose, and the strength to transform a temple project into a living mission of seva,
              sanskar, and Bhagwat culture.
            </p>
          </div>
        </div>
      </Section>

      <Section id="temple-experience">
        <SectionHeader center title="Divine Experience Inside Bhagwat Dham" text="A refined devotional experience shaped through darshan, daily worship, prasad, and spiritual upliftment." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {templeExperience.map(([title, text, , cardIcon]) => (
            <Card key={title} className="flex h-full flex-col items-center p-6 text-center">
              <MediumCircularImageIcon src={cardIcon} label={title} />
              <div>
                <h3 className="mt-5 text-xl font-black text-[#123f47]">{title}</h3>
                <p className="mt-3 leading-7 text-[#68513a]">{text}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="seva-participation" className="bg-white/36">
        <SectionHeader
          center
          eyebrow="Sacred Opportunity to Participate"
          title="Participate in the Living Seva of Bhagwat Dham"
          text="Bhagwat Dham is not only a construction project. It is a living center of seva, satsang, culture, and community upliftment. Devotees can participate through time, talent, devotion, service, and contribution."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sevaCards.map(([title, cardIcon]) => (
            <Card key={title} className="flex min-h-32 items-center gap-4 p-6">
              <SmallCircularImageIcon src={cardIcon} label={title} />
              <h3 className="text-xl font-black text-[#123f47]">{title}</h3>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="donation" className="z-20">
        <div className="relative overflow-hidden rounded-[36px] border border-[#efc377] bg-[linear-gradient(135deg,#fff4d5_0%,#ffd989_48%,#fffdf8_100%)] p-6 shadow-[0_24px_64px_rgba(137,78,18,0.20)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-12 -top-16 h-80 w-80 rounded-t-[150px] border-[22px] border-[#c98222] opacity-[0.10]" />
          <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeader
                eyebrow="Sacred Opportunity to Participate"
                title="Your Devotion Builds Bhagwat Dham"
                text="Bhagwat Dham is being created through collective devotion. Every offering, whether small or large, becomes part of this sacred construction and eternal spiritual legacy."
              />
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#a55a11]">Current Construction Milestone</p>
                    <h3 className="mt-2 text-2xl font-black text-[#123f47]">Goal: ₹35,00,000 for next RCC slab milestone</h3>
                  </div>
                  <p className="rounded-full bg-[#0f7f84] px-4 py-2 text-sm font-black text-white">{progress}% completed</p>
                </div>
                <div className="mt-5 h-5 overflow-hidden rounded-full bg-[#fff3dc]">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#0f7f84,#FF9933,#f5cf75)]" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm font-black text-[#5b3510]">
                  <span>₹12,50,000 raised</span>
                  <span>36% completed</span>
                </div>
              </Card>
              <Card className="mt-5 border-2 border-[#c98222] bg-white/82">
                <p className="text-3xl font-black text-[#c26816]">₹25,00,000</p>
                <h3 className="mt-1 text-2xl font-black text-[#123f47]">Sponsor One Structural Slab</h3>
                <p className="mt-3 leading-7 text-[#68513a]">Support one major construction milestone of Bhagwat Dham and become part of a sacred legacy.</p>
              </Card>
            </div>
            <div className="grid gap-5">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {donationTiers.map(([amount, label]) => {
                  const isSelected = selectedAmount === amount;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setSelectedAmount(amount as number)}
                      className={`rounded-[24px] border p-5 text-left shadow-[0_12px_28px_rgba(95,62,24,0.08)] transition hover:-translate-y-1 ${
                        isSelected
                          ? "border-[#c98222] bg-white text-[#123f47] ring-4 ring-[#ffd989]/45"
                          : "border-white/80 bg-white/72 text-[#5f4934] hover:border-[#efc377]"
                      }`}
                    >
                      <span className="block text-2xl font-black text-[#c26816]">{amount ? formatInr(amount as number) : "Custom"}</span>
                      <span className="mt-2 block text-base font-black">{label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton to={donateLink}>Donate for Bhagwat Dham</PrimaryButton>
                <SecondaryButton to={`${ROUTES.donate}?fund=bhagwat-dham&fund_type=bhagwat-dham&sponsor=section`}>Sponsor a Sacred Section</SecondaryButton>
                <ExternalButton href={EXTERNAL_RAZORPAY_DONATE_URL}>Razorpay / UPI</ExternalButton>
              </div>
              <ImageCard
                src={images.donationMilestone}
                alt="Bhagwat Dham donation milestone visual"
                aspect="1.55 / 1"
                className="min-h-[430px] border-white/80 bg-white/72 shadow-[0_18px_44px_rgba(137,78,18,0.14)]"
                imgClassName="object-contain bg-[#fff4d5]"
              />
            </div>
          </div>

          <div className="relative mt-8 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
            <Card>
              <h3 className="text-xl font-black text-[#123f47]">Your contribution may be honored through:</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {recognition.map((item) => (
                  <p key={item} className="rounded-2xl bg-[#fff6e8] p-3 text-sm font-bold text-[#5b3510]">{item}</p>
                ))}
              </div>
              <ImageCard
                src={images.recognition}
                alt="Temple contribution recognition visual"
                aspect="4 / 3"
                className="mt-5 min-h-[340px] lg:min-h-[420px] border-[#efd7aa] bg-[#fff6e8] shadow-[0_14px_30px_rgba(98,61,20,0.10)]"
                imgClassName="object-contain bg-[#fff6e8]"
              />
            </Card>
            <Card>
              <h3 className="text-xl font-black text-[#123f47]">Sponsor a Sacred Part of the Temple</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {sponsorElements.map(([title, sponsorIcon]) => (
                  <div key={title} className="flex min-h-24 items-center gap-4 rounded-[26px] border border-[#efd7aa] bg-white/92 p-4 shadow-[0_12px_28px_rgba(98,61,20,0.08)]">
                    <SponsorCircularImageIcon src={sponsorIcon} label={title} />
                    <p className="text-lg font-black leading-snug text-[#123f47]">{title}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section id="trust-final-cta" className="pb-24 sm:pb-20">
        <Card className="mb-8">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeader title="Built with Faith, Guided by Trust" />
              <p className={bodyClass}>
                The Trust is legally registered and maintains transparent accounting, yearly audit practices, and donation systems. Bhagwat Dham
                contributions are to be handled with responsibility, devotion, and clear purpose.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Transparency", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705386/ChatGPT_Image_May_2_2026_12_31_03_PM_zjbhvv.png"],
                ["Safety & Quality", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705386/ChatGPT_Image_May_2_2026_12_31_11_PM_ncj58p.png"],
                ["Events Katha", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705397/ChatGPT_Image_May_2_2026_12_30_14_PM_eu5mba.png"],
                ["Cultural Heritage", "https://res.cloudinary.com/der8zinu8/image/upload/v1777705388/ChatGPT_Image_May_2_2026_12_30_45_PM_t9snac.png"],
              ].map(([title, trustIcon]) => (
                <div key={title} className="flex min-h-24 items-center gap-4 rounded-2xl bg-[#fff6e8] p-4">
                  <SponsorCircularImageIcon src={trustIcon} label={title} />
                  <p className="font-black text-[#123f47]">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="relative overflow-hidden rounded-[36px] border border-[#efc377] bg-[#5f310b] shadow-[0_24px_60px_rgba(137,78,18,0.22)]">
          <ImageCard
            src={images.prayerHands}
            alt="Prayer hands for Bhagwat Dham final invitation"
            aspect="1920 / 700"
            className="absolute inset-0 rounded-none border-0 opacity-100 shadow-none"
            imgClassName="brightness-110 saturate-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,246,205,0.72),rgba(255,214,111,0.58),rgba(255,153,51,0.38))]" />
          <div className="relative px-6 py-14 text-center drop-shadow-[0_3px_12px_rgba(255,247,214,0.28)] sm:px-10 lg:px-16">
            <h2 className="font-serif text-4xl font-black text-[#12485a] sm:text-5xl">Be a Part of Bhagwat Dham</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-[#5a3511]">
              Your devotion today can help shape a sacred center of Bhagwat culture, seva, sanskar, and spiritual awakening for generations.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PrimaryButton to={donateLink}>Donate Now</PrimaryButton>
              <SecondaryButton to={ROUTES.involved.volunteer}>Join as Sevak</SecondaryButton>
              <SecondaryButton to={ROUTES.mandirTeerth.pilgrimage}>Visit Bhagwat Dham</SecondaryButton>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
});
