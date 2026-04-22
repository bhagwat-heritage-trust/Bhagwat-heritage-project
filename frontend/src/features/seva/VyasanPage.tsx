import { memo, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { contactApi } from "../../services/api/misc";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "./sevaTypography";

type IconName =
  | "shield"
  | "family"
  | "plan"
  | "community"
  | "heart"
  | "medical"
  | "counsel"
  | "prayer"
  | "home"
  | "awareness"
  | "phone"
  | "message"
  | "callback"
  | "warning"
  | "leaf"
  | "support"
  | "document"
  | "digital";

type HelpFormKind = "callback" | "sponsor";

const phoneHref = "tel:+918668897445";
const whatsappHref = "https://wa.me/918668897445?text=Namaste%2C%20I%20need%20confidential%20Vyasanmukti%20guidance.";
const heroImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1776862953/heropage_og_vysanmukti_uaursx.png";
const missionImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1776864454/ChatGPT_Image_Apr_22_2026_06_53_44_PM_wllgkr.png";
const ctaImage = "/images/vyasanmukti.png";

const trustItems = [
  { title: "Confidential Guidance", icon: "shield" as IconName },
  { title: "Family Support", icon: "family" as IconName },
  { title: "Recovery Planning", icon: "plan" as IconName },
  { title: "Community Reintegration", icon: "community" as IconName },
];

const addictionTypes = [
  {
    title: "Alcohol Addiction",
    desc: "Support for dependence on alcohol and its impact on life and family.",
    icon: "warning" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776862945/alchohal_sr2sm9.png",
  },
  {
    title: "Drug Addiction",
    desc: "Guidance and referral support for substance dependency recovery.",
    icon: "medical" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776862945/drugs_k2oodw.png",
  },
  {
    title: "Tobacco & Smoking",
    desc: "Help for breaking daily nicotine habits and rebuilding health.",
    icon: "leaf" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776862945/smoking_kolfr5.png",
  },
  {
    title: "Gambling",
    desc: "Support for harmful dependency affecting stability and relationships.",
    icon: "plan" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776862946/gambing_lrufgu.png",
  },
  {
    title: "Digital Addiction",
    desc: "Guidance for unhealthy screen and device dependency patterns.",
    icon: "digital" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776862948/phone_addiction_y5f56w.png",
  },
  {
    title: "Prescription Misuse",
    desc: "Support for harmful misuse of medicines and dependence-related risks.",
    icon: "document" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776862946/antiaddiction_abp3br.png",
  },
];

const recoveryPillars = [
  {
    title: "Medical Guidance",
    desc: "Practical direction and referral support for cases needing medical attention.",
    icon: "medical" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776864448/ChatGPT_Image_Apr_22_2026_06_54_05_PM_b9i3lb.png",
  },
  {
    title: "Counseling Support",
    desc: "Compassionate listening, emotional support, and structured guidance.",
    icon: "counsel" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776864448/ChatGPT_Image_Apr_22_2026_06_54_11_PM_jjc6l8.png",
  },
  {
    title: "Family Reintegration",
    desc: "Helping restore trust, communication, and support at home.",
    icon: "family" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776864447/ChatGPT_Image_Apr_22_2026_06_54_15_PM_pkrza3.png",
  },
  {
    title: "Spiritual Anchoring",
    desc: "Inner strength through values, discipline, prayer, and moral clarity.",
    icon: "prayer" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776864448/ChatGPT_Image_Apr_22_2026_06_54_46_PM_e3jpix.png",
  },
  {
    title: "Community Rebuilding",
    desc: "Encouraging social confidence, responsibility, and healthy participation.",
    icon: "community" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776860578/ChatGPT_Image_Apr_22_2026_05_48_59_PM_rjcbbu.png",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Listening & Case Understanding",
    desc: "We begin by understanding the person's situation with dignity and care.",
    icon: "heart" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866707/listen_mls5br.png",
  },
  {
    step: "02",
    title: "Counseling & Risk Assessment",
    desc: "Emotional, behavioral, and practical concerns are carefully reviewed.",
    icon: "counsel" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/assessment_cdbpcf.png",
  },
  {
    step: "03",
    title: "Recovery Plan Design",
    desc: "A suitable path is planned based on need, support level, and urgency.",
    icon: "plan" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/planning_lvxbdo.png",
  },
  {
    step: "04",
    title: "Referral or Support Coordination",
    desc: "Guidance, rehabilitation support, or awareness intervention is arranged.",
    icon: "support" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/coordination_pex250.png",
  },
  {
    step: "05",
    title: "Family Follow-up",
    desc: "Families are guided on how to respond constructively and consistently.",
    icon: "family" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/famillyfollowup_azd4ol.png",
  },
  {
    step: "06",
    title: "Reintegration & Monitoring",
    desc: "Progress is supported through ongoing encouragement and responsible follow-up.",
    icon: "community" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/reintagration_auqczv.png",
  },
];

const supportPrograms = [
  {
    title: "Detox Support",
    amount: "Need-based",
    desc: "Help support initial care and basic intervention for someone in need.",
    icon: "medical" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776864448/ChatGPT_Image_Apr_22_2026_06_54_05_PM_b9i3lb.png",
  },
  {
    title: "Counseling Support",
    amount: "Session support",
    desc: "Sponsor guided emotional and recovery counseling sessions.",
    icon: "counsel" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776864448/ChatGPT_Image_Apr_22_2026_06_54_11_PM_jjc6l8.png",
  },
  {
    title: "Full Rehabilitation Support",
    amount: "Structured help",
    desc: "Contribute toward structured long-term recovery assistance.",
    icon: "home" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776866706/reintagration_auqczv.png",
  },
  {
    title: "Awareness Campaign Support",
    amount: "Community outreach",
    desc: "Help conduct outreach, education, and prevention programs.",
    icon: "awareness" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776862946/antiaddiction_abp3br.png",
  },
  {
    title: "Family Guidance Sessions",
    amount: "Family care",
    desc: "Support families in learning how to respond with clarity and compassion.",
    icon: "family" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776864447/ChatGPT_Image_Apr_22_2026_06_54_15_PM_pkrza3.png",
  },
];

const stories = [
  {
    title: "Rediscovering Stability",
    quote: "The first conversation helped me feel that recovery was possible. Step by step, discipline returned.",
    label: "Anonymous participant",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776867431/Rediscovering_Stability_hiro3m.png",
  },
  {
    title: "Family Support Restored",
    quote: "Guidance helped our family stop reacting with anger and begin supporting recovery with clarity.",
    label: "Family member",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776867431/Family_Support_Restored_j7kr3q.png",
  },
  {
    title: "From Silence to Hope",
    quote: "Awareness work encouraged our community to speak early, seek help, and reduce shame around recovery.",
    label: "Seva volunteer",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776867431/From_Silence_to_Hope_jsgsem.png",
  },
];

const familyBlocks = [
  {
    title: "Early Warning Signs",
    icon: "warning" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776862946/antiaddiction_abp3br.png",
    points: [
      "Sudden withdrawal or emotional instability",
      "Financial irregularity or secrecy",
      "Loss of routine, health, or discipline",
      "Social isolation and dependency behaviors",
    ],
  },
  {
    title: "What Families Should Avoid",
    icon: "shield" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776857897/k2_z04doe.png",
    points: [
      "Constant shaming",
      "Angry confrontation without support",
      "Ignoring the issue repeatedly",
      "Public humiliation",
    ],
  },
  {
    title: "How to Offer Constructive Support",
    icon: "support" as IconName,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776864447/ChatGPT_Image_Apr_22_2026_06_54_15_PM_pkrza3.png",
    points: [
      "Listen calmly",
      "Seek guidance early",
      "Encourage counseling",
      "Maintain boundaries with compassion",
      "Stay involved in recovery follow-up",
    ],
  },
];

const faqs = [
  {
    q: "Is counseling confidential?",
    a: "Yes. We aim to handle every case with respect, sensitivity, and privacy.",
  },
  {
    q: "Can family members also seek guidance?",
    a: "Yes. Families are encouraged to reach out for support and direction.",
  },
  {
    q: "Is spiritual guidance compulsory?",
    a: "No. Support is compassionate and need-based. Spiritual anchoring is offered as strength, not imposed.",
  },
  {
    q: "Do you provide rehabilitation referral support?",
    a: "Yes. Where needed, we help guide cases toward appropriate structured support or referral pathways.",
  },
  {
    q: "How can I help someone struggling with addiction?",
    a: "Begin with patience, avoid humiliation, seek guidance early, and encourage structured support.",
  },
  {
    q: "How can I support this mission?",
    a: "You can sponsor intervention support, awareness efforts, counseling, or volunteer in outreach programs.",
  },
];

function Icon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "shield":
      return <svg {...common}><path d="M12 3 5 6v5c0 4.5 2.9 8.3 7 10 4.1-1.7 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></svg>;
    case "family":
      return <svg {...common}><circle cx="8" cy="8" r="2.5" /><circle cx="16" cy="8" r="2.5" /><path d="M3.5 19c.7-3.1 2.4-4.5 4.5-4.5s3.8 1.4 4.5 4.5" /><path d="M11.5 19c.7-3.1 2.4-4.5 4.5-4.5s3.8 1.4 4.5 4.5" /></svg>;
    case "plan":
      return <svg {...common}><path d="M7 4h10v16H7z" /><path d="M9.5 8h5" /><path d="M9.5 12h5" /><path d="M9.5 16h3" /></svg>;
    case "community":
      return <svg {...common}><path d="M4 20v-6l8-6 8 6v6" /><path d="M9 20v-6h6v6" /><path d="M12 8V4" /></svg>;
    case "heart":
      return <svg {...common}><path d="M20.5 8.5c0 5-8.5 10.5-8.5 10.5S3.5 13.5 3.5 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5Z" /></svg>;
    case "medical":
      return <svg {...common}><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z" /></svg>;
    case "counsel":
      return <svg {...common}><path d="M4 6h16v10H8l-4 4V6Z" /><path d="M8 10h8" /><path d="M8 13h5" /></svg>;
    case "prayer":
      return <svg {...common}><path d="M8 21c2-3 2-6 1-9L7 5c-.4-1.2 1-2.2 2-1.3l4 5.3" /><path d="M16 21c-2-3-2-6-1-9l2-7c.4-1.2-1-2.2-2-1.3L11 9" /></svg>;
    case "home":
      return <svg {...common}><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>;
    case "awareness":
      return <svg {...common}><path d="M4 11v2a3 3 0 0 0 3 3h1l5 3V5L8 8H7a3 3 0 0 0-3 3Z" /><path d="M16 9a4 4 0 0 1 0 6" /><path d="M19 7a7 7 0 0 1 0 10" /></svg>;
    case "phone":
      return <svg {...common}><path d="M22 16.8v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.2 4.2 2 2 0 0 1 4.2 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.8Z" /></svg>;
    case "message":
      return <svg {...common}><path d="M5 5h14v10H8l-3 3V5Z" /><path d="M8 9h8" /><path d="M8 12h5" /></svg>;
    case "callback":
      return <svg {...common}><path d="M8 7H4V3" /><path d="M4 7a8 8 0 0 1 13.7-3.7" /><path d="M16 17h4v4" /><path d="M20 17A8 8 0 0 1 6.3 20.7" /></svg>;
    case "warning":
      return <svg {...common}><path d="m12 3 10 18H2L12 3Z" /><path d="M12 9v5" /><path d="M12 17h.01" /></svg>;
    case "leaf":
      return <svg {...common}><path d="M20 4C11 4 5 9 5 17c0 2 1 3 3 3 8 0 12-7 12-16Z" /><path d="M5 19c3-5 6-8 11-10" /></svg>;
    case "support":
      return <svg {...common}><path d="M7 12h10" /><path d="M12 7v10" /><circle cx="12" cy="12" r="9" /></svg>;
    case "document":
      return <svg {...common}><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v5h5" /><path d="M9.5 13h5" /><path d="M9.5 17h4" /></svg>;
    case "digital":
      return <svg {...common}><rect x="4" y="5" width="16" height="11" rx="2" /><path d="M8 20h8" /><path d="M12 16v4" /></svg>;
    default:
      return null;
  }
}

function IconBadge({ icon, className = "" }: { icon: IconName; className?: string }) {
  return (
    <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#ead6b8] bg-[#fff2df] text-[#c46d1a] ${className}`}>
      <Icon name={icon} />
    </span>
  );
}

function SectionHeader({ eyebrow, title, subtitle, align = "center" }: { eyebrow: string; title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#c46d1a]`}>{eyebrow}</p>
      <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-3 text-[#6d4c2f]`}>{title}</h2>
      {subtitle ? <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS} text-[#5b544b]`}>{subtitle}</p> : null}
    </div>
  );
}

function PrimaryLink({ href, to, children }: { href?: string; to?: string; children: string }) {
  const className = "inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#d89a2b] px-7 text-sm font-black text-white shadow-[0_16px_32px_rgba(216,154,43,0.22)] transition hover:-translate-y-0.5 hover:bg-[#b97916] focus:outline-none focus:ring-4 focus:ring-[#e9c98f]";
  return href ? <a href={href} className={className}>{children}</a> : <Link to={to || ROUTES.contact} className={className}>{children}</Link>;
}

function SecondaryLink({ href, to, children }: { href?: string; to?: string; children: string }) {
  const className = "inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#ead6b8] bg-white/12 px-7 text-sm font-black text-white transition hover:bg-white hover:text-[#6d4c2f] focus:outline-none focus:ring-4 focus:ring-[#e9c98f]";
  return href ? <a href={href} className={className}>{children}</a> : <Link to={to || ROUTES.contact} className={className}>{children}</Link>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <article className={`rounded-[24px] border border-[#e7dccb] bg-[#fffdf9] p-6 shadow-[0_18px_42px_rgba(122,82,48,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(122,82,48,0.12)] ${className}`}>
      {children}
    </article>
  );
}

function HelpForm({ kind }: { kind: HelpFormKind }) {
  const [form, setForm] = useState({ name: "", phone: "", city: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    try {
      const subject = kind === "callback" ? "Vyasanmukti Callback Request" : "Vyasanmukti Support Sponsorship Inquiry";
      const message = [
        form.message || (kind === "callback" ? "Please call back for confidential recovery guidance." : "I want to support a recovery program."),
        form.city ? `City: ${form.city}` : "",
        `Phone: ${form.phone}`,
      ].filter(Boolean).join(" | ");

      await contactApi.send({
        name: form.name,
        email: "join@bhagwatheritage.org",
        subject,
        message,
      });
      setForm({ name: "", phone: "", city: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3 rounded-[24px] border border-[#e7dccb] bg-white/82 p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required value={form.name} onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))} placeholder="Name" className="min-h-[48px] rounded-2xl border border-[#e7dccb] bg-white px-4 text-sm text-[#4a3422] outline-none focus:border-[#d89a2b]" />
        <input required value={form.phone} onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))} placeholder="Mobile number" inputMode="tel" className="min-h-[48px] rounded-2xl border border-[#e7dccb] bg-white px-4 text-sm text-[#4a3422] outline-none focus:border-[#d89a2b]" />
      </div>
      <input value={form.city} onChange={(e) => setForm((current) => ({ ...current, city: e.target.value }))} placeholder="City or area" className="min-h-[48px] rounded-2xl border border-[#e7dccb] bg-white px-4 text-sm text-[#4a3422] outline-none focus:border-[#d89a2b]" />
      <textarea value={form.message} onChange={(e) => setForm((current) => ({ ...current, message: e.target.value }))} placeholder={kind === "callback" ? "Share a brief note, if comfortable" : "Program or support interest"} rows={3} className="rounded-2xl border border-[#e7dccb] bg-white px-4 py-3 text-sm text-[#4a3422] outline-none focus:border-[#d89a2b]" />
      <button disabled={status === "loading"} className="min-h-[48px] rounded-full bg-[#5e7fa3] px-5 text-sm font-black text-white transition hover:bg-[#4d6e91] disabled:opacity-70">
        {status === "loading" ? "Sending..." : kind === "callback" ? "Request Callback" : "Send Support Inquiry"}
      </button>
      {status === "success" ? <p className="text-sm font-semibold text-[#3f6d47]">Request received. The seva team will connect with care.</p> : null}
      {status === "error" ? <p className="text-sm font-semibold text-[#9b3f2f]">Could not send right now. Please call or WhatsApp the team.</p> : null}
    </form>
  );
}

export default memo(function VyasanPage() {
  usePageMeta(
    "Vyasanmukti Abhiyan",
    "Compassionate Vyasanmukti Abhiyan page for confidential guidance, addiction recovery support, family direction, rehabilitation referral, awareness outreach, and dignified sponsorship.",
  );

  return (
    <div className="min-h-screen bg-[#f8f4ec] pb-0 text-[#5b544b] md:pb-0">
      <section className="relative -mx-6 -mt-12 overflow-hidden bg-[#f8f4ec] pb-8 md:-mx-8">
        <div className="relative min-h-[660px] overflow-hidden rounded-b-[42px] bg-[#4a3422] shadow-[0_26px_70px_rgba(74,52,34,0.2)]">
          <img src={heroImage} alt="Compassionate recovery guidance and community support" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 mx-auto flex min-h-[660px] max-w-6xl items-end justify-center px-6 py-16 text-center md:px-8 md:py-20">
            <div className="w-full max-w-4xl px-2 py-4 text-white md:px-6 md:py-6" style={{ animation: "vyasanFadeUp 0.85s ease-out both" }}>
              <h1 className="text-4xl font-bold leading-tight text-[#f9e6a8] md:text-5xl">Vyasanmukti Abhiyan</h1>
              <p className={`mt-5 ${SEVA_HERO_SUBTITLE_CLASS} text-[#f7e0a0]`}>
                Breaking addiction, rebuilding lives
              </p>
              <div className="hero-actions mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
                <PrimaryLink to={ROUTES.contact}>Get Confidential Help</PrimaryLink>
                <SecondaryLink to={ROUTES.donate}>Support Recovery</SecondaryLink>
                <SecondaryLink to={ROUTES.involved.volunteer}>Join Awareness Drive</SecondaryLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="relative z-20 mx-auto -mt-4 max-w-7xl px-4 md:px-8">
          <div className="grid gap-5 rounded-[30px] border border-[#e7dccb] bg-[#fffdf9] p-5 shadow-[0_22px_54px_rgba(122,82,48,0.12)] lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#c46d1a]`}>Need Immediate Help?</p>
              <h2 className="mt-3 text-2xl font-black text-[#6d4c2f] md:text-3xl">Speak with our support team for confidential guidance and recovery direction.</h2>
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold text-[#5e7fa3]">
                <span>Confidential conversation assured</span>
                <span className="hidden text-[#d89a2b] sm:inline">|</span>
                <span>Family members may also connect</span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <a href={phoneHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#d89a2b] px-5 text-sm font-black text-white transition hover:bg-[#b97916]"><Icon name="phone" className="h-5 w-5" />Call Now</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#97a97c] px-5 text-sm font-black text-white transition hover:bg-[#7f9367]"><Icon name="message" className="h-5 w-5" />WhatsApp</a>
              <a href="#callback" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#5e7fa3] px-5 text-sm font-black text-white transition hover:bg-[#4d6e91]"><Icon name="callback" className="h-5 w-5" />Callback</a>
            </div>
          </div>
        </section>

        <section className="px-4 pb-0 pt-16 md:px-8 md:pb-0 md:pt-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Understanding Addiction" title="Forms of dependency we address" />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {addictionTypes.map((item) => (
                <Card key={item.title} className="text-center">
                  <img src={item.image} alt="" className="mx-auto h-24 w-24 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                  <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#6d4c2f]`}>{item.title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5b544b]`}>{item.desc}</p>
                  <Link to={ROUTES.contact} className="mt-5 inline-flex text-sm font-black text-[#c46d1a] hover:text-[#8a5b16]">Understand More</Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffdf9] px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[32px] border border-[#e7dccb] shadow-[0_22px_48px_rgba(122,82,48,0.12)]">
              <img src={missionImage} alt="Family counseling and compassionate guidance support" className="h-full min-h-[420px] w-full object-cover" loading="lazy" />
            </div>
            <div className="rounded-[32px] border border-[#e7dccb] bg-[#f8f4ec] p-7 md:p-10">
              <SectionHeader eyebrow="Why This Mission Matters" title="Timely guidance can rebuild a life" align="left" />
              <ul className="mt-7 space-y-4">
                {[
                  "Addiction affects health, relationships, livelihood, and inner dignity.",
                  "Early identification and compassionate intervention can change outcomes.",
                  "Families need support, understanding, and practical direction too.",
                  "Recovery becomes stronger with counseling, structure, follow-up, and spiritual grounding.",
                ].map((line) => (
                  <li key={line} className={`flex gap-3 ${SEVA_BODY_TEXT_CLASS} text-[#5b544b]`}>
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d89a2b]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Recovery Pillars" title="Foundations of healing and reintegration" />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {recoveryPillars.map((item) => (
                <Card key={item.title} className="text-center">
                  <img src={item.image} alt="" className="mx-auto h-24 w-24 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                  <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#6d4c2f]`}>{item.title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS} text-[#5b544b]`}>{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffdf9] px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="Recovery Journey" title="A step-by-step path toward support and renewal" />
            <div className="relative mt-12 space-y-6">
              {processSteps.map((item) => (
                <div key={item.step} className="relative">
                  <Card className="grid gap-4 text-center md:grid-cols-[96px_1fr] md:items-center md:text-left">
                    <img src={item.image} alt="" className="mx-auto h-24 w-24 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                    <div>
                      <h3 className={`${SEVA_CARD_TITLE_CLASS} text-[#6d4c2f]`}>{item.title}</h3>
                      <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS} text-[#5b544b]`}>{item.desc}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Recovery Support Programs" title="Ways to support intervention, awareness, and healing" />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {supportPrograms.map((item) => (
                <Card key={item.title} className="flex h-full flex-col">
                  <img src={item.image} alt="" className="h-24 w-24 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                  <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-[#5e7fa3]">{item.amount}</p>
                  <h3 className={`mt-2 ${SEVA_CARD_TITLE_CLASS} text-[#6d4c2f]`}>{item.title}</h3>
                  <p className={`mt-3 flex-1 ${SEVA_BODY_TEXT_CLASS} text-[#5b544b]`}>{item.desc}</p>
                  <a href="#sponsor-support" className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#fff2df] px-5 text-sm font-black text-[#8a5b16] transition hover:bg-[#d89a2b] hover:text-white">
                    Support This Program
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffdf9] px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Recovery Stories" title="Voices of courage, trust, and healing" />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {stories.map((item) => (
                <Card key={item.title} className="min-h-[300px] overflow-hidden p-0">
                  <img src={item.image} alt="" className="aspect-square w-full object-cover" loading="lazy" aria-hidden="true" />
                  <div className="p-6">
                    <h3 className={`mt-3 ${SEVA_CARD_TITLE_CLASS} text-[#6d4c2f]`}>{item.title}</h3>
                    <p className="mt-5 text-xl font-semibold leading-9 text-[#5b544b]">{item.quote}</p>
                    <p className="mt-6 text-sm font-black uppercase tracking-[0.16em] text-[#5e7fa3]">{item.label}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <SectionHeader eyebrow="For Families" title="Families also need understanding and guidance" align="left" />
                <p className={`mt-5 ${SEVA_BODY_TEXT_CLASS} text-[#5b544b]`}>
                  Addiction recovery often begins when a family chooses guidance over shame. A calm, informed response can protect dignity and open the door to structured support.
                </p>
                <div className="mt-7">
                  <PrimaryLink to={ROUTES.contact}>Request Family Guidance</PrimaryLink>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {familyBlocks.map((block) => (
                  <Card key={block.title}>
                    <img src={block.image} alt="" className="h-24 w-24 rounded-full object-contain" loading="lazy" aria-hidden="true" />
                    <h3 className={`mt-5 ${SEVA_CARD_TITLE_CLASS} text-[#6d4c2f]`}>{block.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {block.points.map((point) => (
                        <li key={point} className="flex gap-2 text-sm font-semibold leading-6 text-[#5b544b]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d89a2b]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#D8A84D] bg-[linear-gradient(135deg,#E0A126_0%,#F4CF72_100%)] p-6 shadow-[0_24px_58px_rgba(111,78,25,0.14)] md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className={`${SEVA_SECTION_LABEL_CLASS} text-[#B96A22]`}>Vyasanmukti Seva</p>
                <h2 className={`${SEVA_SECTION_HEADING_CLASS} mt-4 text-[#4A3422]`}>Recovery begins with one compassionate step</h2>
                <p className={`mt-5 max-w-2xl ${SEVA_BODY_TEXT_CLASS} text-[#4A3422]`}>
                  A life can be rebuilt through timely care, courage, and structured support.
                </p>
              </div>
              <div className="grid gap-3">
                <Link to={ROUTES.contact} className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-white px-7 text-base font-black text-[#7A4A12] shadow-[0_12px_28px_rgba(111,78,25,0.1)] transition hover:-translate-y-0.5 hover:bg-[#FFF9EC]">
                  Talk to Our Team
                </Link>
                <Link to={ROUTES.donate} className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/75 bg-white/18 px-7 text-base font-black text-[#4A3422] transition hover:-translate-y-0.5 hover:bg-white">
                  Support a Recovery Case
                </Link>
                <Link to={ROUTES.involved.volunteer} className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/75 bg-white/18 px-7 text-base font-black text-[#4A3422] transition hover:-translate-y-0.5 hover:bg-white">
                  Join Awareness Seva
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-[#e7dccb] bg-[#fffdf9]/96 p-2 shadow-[0_-12px_30px_rgba(74,52,34,0.15)] backdrop-blur md:hidden">
        <a href={phoneHref} className="mx-1 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#d89a2b] text-sm font-black text-white">Call</a>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="mx-1 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#97a97c] text-sm font-black text-white">WhatsApp</a>
        <a href="#callback" className="mx-1 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#5e7fa3] text-sm font-black text-white">Help Form</a>
      </div>

      <style>{`
        @keyframes vyasanFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
});
