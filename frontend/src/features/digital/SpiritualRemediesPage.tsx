import { memo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "../seva/sevaTypography";
 
type GuidanceType = "Spiritual Guidance" | "Astrology Guidance" | "Vastu Guidance" | "Spiritual Remedies" | "Puja Anushthan";
type PreferredMode = "Phone Call" | "WhatsApp" | "Online Meeting" | "In-Person";

type ConsultationForm = {
  fullName: string;
  mobileNumber: string;
  city: string;
  guidanceType: GuidanceType;
  concernCategory: string;
  preferredMode: PreferredMode;
  message: string;
};

const guidanceCategories = [
  {
    title: "Spiritual Guidance",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129183/ChatGPT_Image_Apr_25_2026_07_57_04_PM_hxb1sj.png",
    items: ["Mantra Guidance", "Sadhana Guidance", "Daily Prayer Discipline", "Personal Spiritual Practices", "Family Peace Guidance"],
  },
  {
    title: "Astrology Guidance",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129182/ChatGPT_Image_Apr_25_2026_07_57_43_PM_aop61d.png",
    items: ["Horoscope Consultation", "Life Situation Guidance", "Gemstone Recommendations", "Muhurat Guidance", "Nakshatra / Name Insights"],
  },
  {
    title: "Vastu Guidance",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129183/ChatGPT_Image_Apr_25_2026_07_57_56_PM_d5hwxt.png",
    items: ["Home Vastu", "Temple Vastu", "Office / Land Guidance", "Energy Alignment", "Construction Direction"],
  },
  {
    title: "Spiritual Remedies",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777129182/ChatGPT_Image_Apr_25_2026_07_58_48_PM_y0pa28.png",
    items: ["Rudraksha Guidance", "Yantra Guidance", "Vedic Puja Anushthan", "Ratna Guidance", "Puja Samagri Guidance"],
  },
];

const processSteps = [
  "Share Your Concern",
  "Receive Spiritual Guidance",
  "Get Suitable Dharmic Remedies",
  "Perform Recommended Practices / Rituals",
  "Continue Sadhana & Inner Growth",
];

const trustSupports = [
  { label: "Rudraksha", icon: "/assets/icons/icon-rudraksha-support.svg" },
  { label: "Gemstones", icon: "/assets/icons/icon-gemstone-support.svg" },
  { label: "Yantra", icon: "/assets/icons/icon-yantra-support.svg" },
  { label: "Puja Samagri", icon: "/assets/icons/icon-puja-support.svg" },
  { label: "Vedic Anushthan Support", icon: "/assets/icons/icon-anushthan-support.svg" },
  { label: "Temple / Home Ritual Guidance", icon: "/assets/icons/icon-ritual-support.svg" },
];

const initialForm: ConsultationForm = {
  fullName: "",
  mobileNumber: "",
  city: "",
  guidanceType: "Spiritual Guidance",
  concernCategory: "",
  preferredMode: "Phone Call",
  message: "",
};

const pagePatternStyle = {
  backgroundColor: "#FFF8F0",
  backgroundImage:
    "radial-gradient(circle at 8% 8%, rgba(234,160,55,0.16), transparent 28rem), radial-gradient(circle at 92% 18%, rgba(7,72,86,0.11), transparent 24rem), radial-gradient(circle at 22% 88%, rgba(224,236,213,0.9), transparent 26rem)",
};

const sectionShell = "rounded-[30px] border border-[#E8D8C3] bg-[#FFFCF6] p-6 shadow-[0_16px_36px_rgba(95,66,28,0.10)] md:p-8";
const labelClass = `${SEVA_SECTION_LABEL_CLASS} text-[#B96A22]`;
const headingClass = `${SEVA_SECTION_HEADING_CLASS} mt-2 text-[#1D4F63]`;
const bodyClass = `${SEVA_BODY_TEXT_CLASS} text-[#5E5247]`;

export default memo(function SpiritualRemediesPage() {
  const [formState, setFormState] = useState<ConsultationForm>(initialForm);
  const [submitMessage, setSubmitMessage] = useState("");

  usePageMeta(
    "Divine Guidance & Spiritual Remedies | Bhagwat Heritage",
    "Seek authentic spiritual guidance, astrology consultation, vastu guidance, and Vedic remedies under the divine direction of Sant Shri Manish Bhaiji Maharaj through Bhagwat Heritage Service Foundation Trust.",
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("Your guidance request has been received. Our team will connect with you shortly.");
    setFormState(initialForm);
  };

  return (
    <main className="min-h-screen pb-12" style={pagePatternStyle}>
      <div className="mx-auto max-w-[1180px] px-4 pb-8 pt-0 md:px-6 md:pb-10 md:pt-0">
        <section className="relative -mt-12 overflow-hidden rounded-b-[34px] border border-[#E5D2B0] shadow-[0_24px_60px_rgba(66,44,17,0.24)]">
          <img src="/assets/images/guidance-hero.jpg" alt="Sant Shri Manish Bhaiji Maharaj in calm spiritual guidance setting" className="h-[430px] w-full object-cover md:h-[560px]" fetchPriority="high" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(40,25,10,0.72),rgba(9,87,99,0.46),rgba(24,35,58,0.58))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,213,140,0.26),transparent_40%)]" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="text-4xl font-bold leading-tight text-[#f9e6a8] md:text-5xl">Divine Guidance &amp; Spiritual Remedies</h1>
            <p className={`mt-4 max-w-3xl ${SEVA_HERO_SUBTITLE_CLASS}`}>
              Receive authentic spiritual, astrological, and Vedic guidance under the divine blessings and direction of Sant Shri Manish Bhaiji Maharaj.
            </p>
            <p className="mt-4 max-w-3xl text-xs font-semibold uppercase tracking-[0.1em] text-[#F7D8A0] md:text-sm">
              All guidance is offered through Bhagwat Heritage Service Foundation Trust following dharmic principles, spiritual discipline, and scriptural authenticity.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#consultation-form" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D89B2B] px-7 text-base font-black text-white shadow-[0_14px_30px_rgba(177,112,24,0.22)] transition hover:-translate-y-0.5 hover:bg-[#B97916]">
                Seek Guidance
              </a>
              <a href="#consultation-form" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#D89B2B] bg-white/85 px-7 text-base font-black text-[#8A5B16] shadow-[0_10px_24px_rgba(111,78,25,0.08)] transition hover:-translate-y-0.5 hover:bg-[#FFF4D6]">
                Book Consultation
              </a>
            </div>
          </div>
        </section>

        <section className={`${sectionShell} mt-10`}>
          <div className="mt-1 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className={labelClass}>Divine Guidance Authority</p>
              <h2 className={headingClass}>Guidance Under Divine Direction</h2>
              <div className="mt-4 space-y-4">
                <p className={bodyClass}>
                  All guidance and spiritual recommendations provided on this platform are offered under the divine guidance, blessings, and spiritual direction of Sant Shri Manish Bhaiji Maharaj.
                </p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {["Spiritually authentic", "Scripturally aligned", "Ethically grounded", "Focused on inner growth, peace, and dharmic living"].map((item) => (
                    <li key={item} className="rounded-xl border border-[#E8D8C3] bg-[#FFF4E3] px-4 py-2 text-base font-semibold text-[#634E38]">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={bodyClass}>
                  This is not a commercial consultation service, but a sacred guidance system rooted in Bhagwat tradition and seva.
                </p>
              </div>
            </div>
            <div className="grid gap-5">
                <figure className="overflow-hidden rounded-2xl border border-[#E8D8C3] bg-[#FFF8EC] p-2.5">
                  <img
                    src="https://res.cloudinary.com/der8zinu8/image/upload/v1777139324/Guidance_About_txbdtm.png"
                    alt="Sant Shri Manish Bhaiji Maharaj giving divine spiritual guidance"
                    className="h-auto w-full rounded-xl object-contain object-center"
                    loading="lazy"
                  />
                </figure>
                <figure className="overflow-hidden rounded-2xl border border-[#E8D8C3] bg-[#FFF8EC] p-2.5">
                  <img
                    src="https://res.cloudinary.com/der8zinu8/image/upload/v1777141444/guidance_about_2_bp6hpg.png"
                    alt="Sant Shri Manish Bhaiji Maharaj offering scriptural and dharmic guidance"
                    className="h-auto w-full rounded-xl object-contain object-center"
                    loading="lazy"
                  />
                </figure>
            </div>
          </div>
        </section>

        <section className={`${sectionShell} mt-10`}>
          <p className={labelClass}>Introduction</p>
          <h2 className={headingClass}>From Life Challenges to Inner Clarity</h2>
          <p className={`${bodyClass} mt-4`}>
            Bhagwat Heritage Service Foundation Trust provides structured spiritual guidance to help individuals navigate life challenges through dharmic wisdom, disciplined sadhana, and positive transformation.
          </p>
          <p className={`${bodyClass} mt-3`}>
            The purpose is not to create dependency, fear, or blind belief, but to guide individuals towards clarity of mind, strength of faith, balance in life, and spiritual growth.
          </p>
        </section>

        <section className={`${sectionShell} mt-10`}>
          <p className={labelClass}>Guidance Categories</p>
          <h2 className={headingClass}>Structured Guidance Paths</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {guidanceCategories.map((category) => (
              <article key={category.title} className="rounded-2xl border border-[#E9DCC8] bg-[#FFF9EF] p-5">
                <img
                  src={category.icon}
                  alt={`${category.title} guidance`}
                  className="h-36 w-full rounded-2xl border border-[#E3CAA0] object-cover"
                  loading="lazy"
                />
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS} text-[#1D4F63]`}>{category.title}</h3>
                <ul className="mt-4 space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[#665646]">
                      <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#C8751D]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={`${sectionShell} mt-10`}>
          <p className={labelClass}>Problem to Solution</p>
          <h2 className={headingClass}>From Concern to Clarity</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
            <div className="space-y-3">
              {processSteps.map((step, index) => (
                <article key={step} className="flex items-start gap-3 rounded-2xl border border-[#E9DCC8] bg-[#FFF9EF] p-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F7B82] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-[#2E241A]">{step}</h3>
                </article>
              ))}
              <a href="#consultation-form" className="mt-3 inline-flex rounded-full bg-[#0F7B82] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0B696F]">
                Seek Guidance Now
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#E8D8C3]">
              <img src="/assets/images/spiritual-remedies.jpg" alt="Spiritual remedies and guidance setting with devotional ambience" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        <section className={`${sectionShell} mt-10`}>
          <p className={labelClass}>Available Through Trust</p>
          <h2 className={headingClass}>Support Available Through the Trust</h2>
          <p className={`${bodyClass} mt-3`}>
            These supports are offered to assist sincere spiritual practices and disciplined dharmic living.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trustSupports.map((item) => (
              <article key={item.label} className="rounded-2xl border border-[#E9DCC8] bg-[#FFF9EF] p-4">
                <div className="flex items-center gap-3">
                  <img src={item.icon} alt={`${item.label} icon`} className="h-[84px] w-[84px] rounded-full object-cover" loading="lazy" />
                  <h3 className={`${SEVA_CARD_TITLE_CLASS} text-[#1D4F63]`}>{item.label}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="consultation-form" className={`${sectionShell} mt-10`}>
          <p className={labelClass}>Consultation Form</p>
          <h2 className={headingClass}>Request Guidance</h2>
          <form className="mt-5 space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-[#5E4E3E]">
                Full Name
                <input required value={formState.fullName} onChange={(event) => setFormState((prev) => ({ ...prev, fullName: event.target.value }))} className="mt-1 w-full rounded-xl border border-[#E7D9C4] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0F7B82]" />
              </label>
              <label className="text-sm font-semibold text-[#5E4E3E]">
                Mobile Number
                <input required value={formState.mobileNumber} onChange={(event) => setFormState((prev) => ({ ...prev, mobileNumber: event.target.value }))} className="mt-1 w-full rounded-xl border border-[#E7D9C4] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0F7B82]" />
              </label>
              <label className="text-sm font-semibold text-[#5E4E3E]">
                City
                <input required value={formState.city} onChange={(event) => setFormState((prev) => ({ ...prev, city: event.target.value }))} className="mt-1 w-full rounded-xl border border-[#E7D9C4] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0F7B82]" />
              </label>
              <label className="text-sm font-semibold text-[#5E4E3E]">
                Guidance Type
                <select value={formState.guidanceType} onChange={(event) => setFormState((prev) => ({ ...prev, guidanceType: event.target.value as GuidanceType }))} className="mt-1 w-full rounded-xl border border-[#E7D9C4] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0F7B82]">
                  {["Spiritual Guidance", "Astrology Guidance", "Vastu Guidance", "Spiritual Remedies", "Puja Anushthan"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-[#5E4E3E]">
                Concern / Problem Category
                <input value={formState.concernCategory} onChange={(event) => setFormState((prev) => ({ ...prev, concernCategory: event.target.value }))} className="mt-1 w-full rounded-xl border border-[#E7D9C4] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0F7B82]" />
              </label>
              <label className="text-sm font-semibold text-[#5E4E3E]">
                Preferred Mode
                <select value={formState.preferredMode} onChange={(event) => setFormState((prev) => ({ ...prev, preferredMode: event.target.value as PreferredMode }))} className="mt-1 w-full rounded-xl border border-[#E7D9C4] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0F7B82]">
                  {["Phone Call", "WhatsApp", "Online Meeting", "In-Person"].map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block text-sm font-semibold text-[#5E4E3E]">
              Message
              <textarea value={formState.message} onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))} rows={4} className="mt-1 w-full rounded-xl border border-[#E7D9C4] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0F7B82]" />
            </label>
            <button type="submit" className="rounded-full bg-[#0F7B82] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0B696F]">
              Request Guidance
            </button>
            {submitMessage ? <p className="rounded-xl border border-[#CBE4D9] bg-[#E8F7F0] px-4 py-2 text-sm font-semibold text-[#1F6A4E]">{submitMessage}</p> : null}
          </form>
        </section>

        <section className={`${sectionShell} mt-10`}>
          <p className={labelClass}>Ethical Disclaimer</p>
          <h2 className={headingClass}>Dharmic &amp; Ethical Guidance</h2>
          <p className={`${bodyClass} mt-4`}>
            This platform provides spiritual and dharmic guidance based on scriptural knowledge and disciplined practices.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E9DCC8] bg-[#FFF9EF] p-4">
              <h3 className="text-sm font-black uppercase tracking-[0.1em] text-[#BF6A18]">It Does Not Promote</h3>
              <ul className="mt-2 space-y-1 text-sm text-[#665646]">
                {["Fear-based remedies", "Blind belief", "Superstition", "Guaranteed outcomes"].map((line) => (
                  <li key={line}>• {line}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-[#E9DCC8] bg-[#FFF9EF] p-4">
              <h3 className="text-sm font-black uppercase tracking-[0.1em] text-[#BF6A18]">It Is Not a Substitute For</h3>
              <ul className="mt-2 space-y-1 text-sm text-[#665646]">
                {["Medical advice", "Legal consultation", "Financial decision-making"].map((line) => (
                  <li key={line}>• {line}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-semibold text-[#4E5E56]">All guidance is meant to support inner growth, faith, and positive life direction.</p>
            </article>
          </div>
        </section>

        <section className="relative mt-10 overflow-hidden rounded-[30px] border border-[#D8A84D] bg-[linear-gradient(135deg,#E0A126_0%,#F4CF72_100%)] shadow-[0_24px_58px_rgba(151,95,20,0.24)]">
          <div className="flex min-h-[280px] flex-col items-center justify-center px-5 text-center text-[#3E2C17] md:min-h-[320px]">
            <h2 className={`${SEVA_SECTION_HEADING_CLASS} text-[#4A3422]`}>Need Divine Guidance?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4E3A21] md:text-lg">
              Take the first step towards clarity, peace, and spiritual strength through authentic guidance.
            </p>
            <Link to={ROUTES.digital.guidance} className="mt-6 rounded-full bg-[#E39B35] px-6 py-3 text-sm font-bold text-[#1E3550] transition hover:bg-[#CC8422]">
              Seek Guidance
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
});
