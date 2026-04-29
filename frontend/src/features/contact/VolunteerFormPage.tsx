import { memo, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { volunteersApi } from "../../services/api/volunteers";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type AgeGroup = "16-20" | "21-30" | "31-45" | "46-60" | "60+";
type Availability = "Weekdays" | "Weekends" | "Flexible";
type HoursPerWeek = "2" | "4" | "6" | "8" | "10+";
type PreferredMode = "On-site" | "Remote" | "Hybrid";

const QUICK_TRUST_ITEMS = [
  { title: "Temple Seva", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032974/ChatGPT_Image_Apr_24_2026_05_42_39_PM_hoklrs.png" },
  { title: "Gau Seva", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776880621/ChatGPT_Image_Apr_22_2026_11_25_30_PM_i6q6qj.png" },
  { title: "Ann Seva", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193608/ChatGPT_Image_Apr_26_2026_01_44_55_PM_jzfpur.png" },
  { title: "Youth & Cultural Seva", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_43_12_PM_ark4ok.png" },
] as const;

const JOURNEY_STEPS = [
  {
    title: "Register",
    text: "Submit your basic details, skills, interest, and availability.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050390/icon-digital-notes.svg",
  },
  {
    title: "Screening",
    text: "Our coordinator reviews your application and maps you to the right seva area.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050696/icon-parent-dashboard.svg",
  },
  {
    title: "Orientation",
    text: "Attend a short orientation session to understand values, roles, and process.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050237/icon-character-building.svg",
  },
  {
    title: "Start Seva",
    text: "Begin seva activities with guidance from the trust team.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050845/icon-service-orientation.svg",
  },
] as const;

const WHY_VOLUNTEER = [
  {
    title: "Serve Society",
    text: "Participate in meaningful seva initiatives for communities, families, youth, and society.",
  },
  {
    title: "Preserve Culture",
    text: "Support spiritual, cultural, and educational programs rooted in Sanatan values.",
  },
  {
    title: "Grow Spiritually",
    text: "Experience seva as devotion, discipline, humility, and inner growth.",
  },
  {
    title: "Work With a Purpose",
    text: "Contribute your skills to structured projects with real social and spiritual impact.",
  },
] as const;

const SEVA_AREAS = [
  { title: "Event Seva", desc: "Festival management, hospitality, stage and logistics support.", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193609/ChatGPT_Image_Apr_26_2026_01_44_39_PM_tm24fo.png" },
  { title: "Ann Seva", desc: "Meal preparation, packaging, distribution and service discipline.", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193608/ChatGPT_Image_Apr_26_2026_01_44_55_PM_jzfpur.png" },
  { title: "Gau Seva", desc: "Support feeding, care, shelter hygiene and gaushala coordination.", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776880621/ChatGPT_Image_Apr_22_2026_11_25_30_PM_i6q6qj.png" },
  { title: "Digital Seva", desc: "Content, design, livestream, social, and digital outreach seva.", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g7_kplr1h.png" },
  { title: "Youth Programs", desc: "Mentorship, youth activities, engagement and values initiatives.", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967403/g3_ugmfqm.png" },
  { title: "Education Support", desc: "Teaching support, study guidance and spiritual learning activities.", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777228826/ChatGPT_Image_Apr_27_2026_12_08_01_AM_w3dmqh.png" },
  { title: "Medical Seva", desc: "Health camp support, patient assistance and medical logistics seva.", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_06_36_AM_j1fxyl.png" },
  { title: "Cultural Programs", desc: "Cultural events, bhajan gatherings and devotional program support.", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_43_12_PM_ark4ok.png" },
  { title: "Admin & Coordination", desc: "Volunteer desk, planning, records and coordination workflows.", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097561/ChatGPT_Image_Apr_25_2026_11_42_05_AM_bij6a0.png" },
  { title: "Media & Photography", desc: "Seva stories, photography, archiving and media communication.", icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029119/ChatGPT_Image_Apr_24_2026_04_39_27_PM_e5yys0.png" },
] as const;

const FAQS = [
  {
    q: "Can I volunteer part-time?",
    a: "Yes, volunteers may contribute according to their time, availability, and seva area.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. Orientation and guidance will be provided by the coordination team.",
  },
  {
    q: "When will I get a response?",
    a: "The team usually reviews applications and contacts suitable volunteers as per active seva requirements.",
  },
  {
    q: "Can I volunteer remotely?",
    a: "Yes. Digital seva, content support, coordination, design, communication, and research can be done remotely.",
  },
  {
    q: "Is there any fee to volunteer?",
    a: "No. Volunteer registration is free.",
  },
] as const;

const getCloudinaryIconUrl = (localIconPath: string) => {
  if (localIconPath.startsWith("http://") || localIconPath.startsWith("https://")) {
    return localIconPath;
  }
  const iconFile = localIconPath.split("/").pop() ?? "";
  return `https://res.cloudinary.com/der8zinu8/image/upload/volunteer-icons/${iconFile}`;
};

const GI_LABEL_CLASS = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#c07017]";
const GI_HEADING_CLASS = "mt-2 text-3xl font-black text-[#1f3550] md:text-4xl";
const GI_CARD_TITLE_CLASS = "text-2xl font-black text-[#1f3550]";
const GI_BODY_CLASS = "text-base leading-7 text-[#5e5247] md:text-lg";

export default memo(function VolunteerFormPage() {
  usePageMeta(
    "Volunteer Registration",
    "Register as a volunteer with Bhagwat Heritage Service Foundation Trust and participate in temple seva, social service, cultural programs, youth initiatives, and digital seva."
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    whatsapp: "",
    city: "",
    state: "",
    ageGroup: "" as "" | AgeGroup,
    sevaArea: "" as "" | string,
    skills: "",
    availability: "" as "" | Availability,
    hoursPerWeek: "" as "" | HoursPerWeek,
    preferredMode: "" as "" | PreferredMode,
    motivation: "",
    experience: "",
    consent: false,
    whatsappConsent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const motivationRemaining = 500 - form.motivation.length;

  const requiredCompletion = useMemo(() => {
    const required = [form.fullName, form.email, form.mobile, form.city, form.state, form.ageGroup, form.sevaArea, form.motivation, form.consent ? "yes" : ""];
    const done = required.filter((item) => String(item).trim().length > 0).length;
    return Math.round((done / required.length) * 100);
  }, [form]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(form.mobile)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (form.whatsapp && !mobileRegex.test(form.whatsapp)) {
      setError("Please enter a valid WhatsApp number.");
      return;
    }
    if (!form.consent) {
      setError("Consent is required to continue.");
      return;
    }

    setSubmitting(true);
    try {
      await volunteersApi.registerApplication({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        whatsapp: form.whatsapp.trim() || undefined,
        city: form.city.trim(),
        state: form.state.trim(),
        ageGroup: form.ageGroup as AgeGroup,
        sevaArea: form.sevaArea,
        skills: form.skills.trim() || undefined,
        availability: form.availability || undefined,
        hoursPerWeek: form.hoursPerWeek || undefined,
        preferredMode: form.preferredMode || undefined,
        motivation: form.motivation.trim(),
        experience: form.experience.trim() || undefined,
        consent: form.consent,
        whatsappConsent: form.whatsappConsent,
        timestamp: new Date().toISOString(),
        sourcePage: ROUTES.involved.volunteer,
      });

      setSuccess(true);
      setForm({
        fullName: "",
        email: "",
        mobile: "",
        whatsapp: "",
        city: "",
        state: "",
        ageGroup: "",
        sevaArea: "",
        skills: "",
        availability: "",
        hoursPerWeek: "",
        preferredMode: "",
        motivation: "",
        experience: "",
        consent: false,
        whatsappConsent: false,
      });
    } catch {
      setError("Unable to submit right now. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fcf8ef] font-['Poppins'] text-[#1f2937]">
      <style>{`
        .volunteer-temple-bg { background-image: radial-gradient(circle at 15% 20%, rgba(212,141,20,0.08), transparent 36%), radial-gradient(circle at 90% 6%, rgba(15,82,102,0.10), transparent 32%), linear-gradient(120deg, #fffdf7 0%, #fcf8ef 45%, #fff6e7 100%); }
        .volunteer-pattern { background-image: radial-gradient(circle at 1px 1px, rgba(176,125,34,0.15) 1px, transparent 0); background-size: 16px 16px; }
      `}</style>

      <section className="volunteer-temple-bg">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:items-center md:py-14">
          <div>
            <p className={GI_LABEL_CLASS}>Bhagwat Heritage Seva</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#1d3550] md:text-5xl">Volunteer Registration</h1>
            <p className={`mt-4 ${GI_BODY_CLASS} text-[#374151]`}>Offer your time, skills, and devotion in the service of society, culture, and Sanatan values.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#volunteer-form" className="rounded-full bg-[#ce7a1a] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#b26614]">Register as Volunteer</a>
              <a href="#seva-areas" className="rounded-full border border-[#1f6078] bg-white px-6 py-3 text-sm font-bold text-[#1f6078] transition hover:bg-[#e6f5fa]">Explore Seva Areas</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#f2d8ad] bg-white shadow-xl">
            <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777459099/ChatGPT_Image_Apr_29_2026_04_07_51_PM_vegbl7.png" alt="Volunteers serving with devotion in a temple community seva setting" className="h-full min-h-[280px] w-full object-cover brightness-110" loading="eager" />
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-2 w-full max-w-6xl px-4 pb-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_TRUST_ITEMS.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#f2ddb5] bg-white p-4 text-center shadow-sm">
              <img src={getCloudinaryIconUrl(item.icon)} onError={(e) => (e.currentTarget.src = item.icon)} alt={`${item.title} icon`} className="mx-auto h-[92px] w-[92px] rounded-full object-cover" loading="lazy" />
              <h2 className={`mt-3 ${GI_CARD_TITLE_CLASS}`}>{item.title}</h2>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="rounded-3xl border border-[#e8d5ac] bg-white p-6 shadow-md md:p-8">
          <h2 className={GI_HEADING_CLASS}>Volunteer Onboarding Journey</h2>
          <p className={`mt-2 ${GI_BODY_CLASS}`}>Register, Screen, Orient, and Start Seva</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STEPS.map((step, idx) => (
              <article key={step.title} className="rounded-2xl border border-[#f4e8cd] bg-[#fffaf0] p-4 text-center">
                <img src={getCloudinaryIconUrl(step.icon)} onError={(e) => (e.currentTarget.src = step.icon)} alt={`${step.title} icon`} className="mx-auto h-[86px] w-[86px] rounded-full object-cover" loading="lazy" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#b26d1d]">Step {idx + 1}</p>
                <h3 className={`mt-1 ${GI_CARD_TITLE_CLASS}`}>{step.title}</h3>
                <p className={`mt-1 ${GI_BODY_CLASS}`}>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className={GI_HEADING_CLASS}>Why Volunteer With Bhagwat Heritage?</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {WHY_VOLUNTEER.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#efdfbf] bg-white p-4 shadow-sm">
                <h3 className={`${GI_CARD_TITLE_CLASS} text-[#8c4f17]`}>{item.title}</h3>
                <p className={`mt-1 ${GI_BODY_CLASS}`}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-[#f2d8ad] bg-white shadow-md">
          <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777458890/ChatGPT_Image_Apr_29_2026_04_03_55_PM_gpqt0a.png" alt="Volunteers participating in spiritual and community seva" className="h-full min-h-[320px] w-full object-cover brightness-110" loading="lazy" />
        </div>
      </section>

      <section id="seva-areas" className="volunteer-pattern mx-auto w-full max-w-6xl rounded-3xl px-4 py-10">
        <h2 className={`text-center ${GI_HEADING_CLASS}`}>Choose Your Seva Area</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEVA_AREAS.map((area) => (
            <article key={area.title} className="group rounded-2xl border border-[#eddcb7] bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <img src={getCloudinaryIconUrl(area.icon)} onError={(e) => (e.currentTarget.src = area.icon)} alt={`${area.title} icon`} className="mx-auto h-[92px] w-[92px] rounded-full object-cover" loading="lazy" />
              <h3 className={`mt-3 ${GI_CARD_TITLE_CLASS}`}>{area.title}</h3>
              <p className={`mt-1 ${GI_BODY_CLASS}`}>{area.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl border border-[#f2d8ad] bg-white shadow-md">
          <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777458891/ChatGPT_Image_Apr_29_2026_04_04_04_PM_ui0s1p.png" alt="Different volunteer seva activities including social and cultural support" className="h-auto w-full object-contain object-center brightness-110" loading="lazy" />
        </div>
      </section>

      <section id="volunteer-form" className="mx-auto w-full max-w-6xl px-4 py-10">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-[#e9d6ad] bg-white p-6 shadow-md md:p-8" noValidate>
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className={GI_HEADING_CLASS}>Advanced Volunteer Application</h2>
              <p className={`mt-1 ${GI_BODY_CLASS}`}>Fill details for better role matching.</p>
            </div>
            <div className="w-full max-w-[240px]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#a05d18]">Completion</p>
              <div className="mt-1 h-2 rounded-full bg-[#f7e9cc]"><div className="h-2 rounded-full bg-[#ca7716]" style={{ width: `${requiredCompletion}%` }} /></div>
              <p className="mt-1 text-xs text-[#6b7280]">{requiredCompletion}% complete</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-[#243b53]">Full Name *<input required value={form.fullName} onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]" /></label>
            <label className="text-sm font-medium text-[#243b53]">Email *<input required type="email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]" /></label>
            <label className="text-sm font-medium text-[#243b53]">Indian Mobile Number *<input required type="tel" pattern="[6-9][0-9]{9}" value={form.mobile} onChange={(e) => setForm((s) => ({ ...s, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]" /></label>
            <label className="text-sm font-medium text-[#243b53]">WhatsApp Number<input type="tel" value={form.whatsapp} onChange={(e) => setForm((s) => ({ ...s, whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10) }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]" /></label>
            <label className="text-sm font-medium text-[#243b53]">City *<input required value={form.city} onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]" /></label>
            <label className="text-sm font-medium text-[#243b53]">State *<input required value={form.state} onChange={(e) => setForm((s) => ({ ...s, state: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]" /></label>
            <label className="text-sm font-medium text-[#243b53]">Age Group *
              <select required value={form.ageGroup} onChange={(e) => setForm((s) => ({ ...s, ageGroup: e.target.value as AgeGroup }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]">
                <option value="">Select age group</option><option value="16-20">16-20</option><option value="21-30">21-30</option><option value="31-45">31-45</option><option value="46-60">46-60</option><option value="60+">60+</option>
              </select>
            </label>
            <label className="text-sm font-medium text-[#243b53]">Preferred Seva Area *
              <select required value={form.sevaArea} onChange={(e) => setForm((s) => ({ ...s, sevaArea: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]">
                <option value="">Select seva area</option>{SEVA_AREAS.map((item) => <option key={item.title} value={item.title}>{item.title}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-[#243b53]">Skills<input value={form.skills} onChange={(e) => setForm((s) => ({ ...s, skills: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]" /></label>
            <label className="text-sm font-medium text-[#243b53]">Availability
              <select value={form.availability} onChange={(e) => setForm((s) => ({ ...s, availability: e.target.value as Availability }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]"><option value="">Select availability</option><option>Weekdays</option><option>Weekends</option><option>Flexible</option></select>
            </label>
            <label className="text-sm font-medium text-[#243b53]">Hours Per Week
              <select value={form.hoursPerWeek} onChange={(e) => setForm((s) => ({ ...s, hoursPerWeek: e.target.value as HoursPerWeek }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]"><option value="">Select hours</option><option value="2">2</option><option value="4">4</option><option value="6">6</option><option value="8">8</option><option value="10+">10+</option></select>
            </label>
            <label className="text-sm font-medium text-[#243b53]">Preferred Mode
              <select value={form.preferredMode} onChange={(e) => setForm((s) => ({ ...s, preferredMode: e.target.value as PreferredMode }))} className="mt-1 w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]"><option value="">Select mode</option><option>On-site</option><option>Remote</option><option>Hybrid</option></select>
            </label>
          </div>

          <label className="mt-4 block text-sm font-medium text-[#243b53]">Why do you want to volunteer? *
            <textarea required maxLength={500} value={form.motivation} onChange={(e) => setForm((s) => ({ ...s, motivation: e.target.value }))} className="mt-1 min-h-[120px] w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]" />
            <span className="mt-1 block text-right text-xs text-[#6b7280]">{motivationRemaining} characters remaining</span>
          </label>

          <label className="mt-4 block text-sm font-medium text-[#243b53]">Any previous seva/volunteer experience?
            <textarea value={form.experience} onChange={(e) => setForm((s) => ({ ...s, experience: e.target.value }))} className="mt-1 min-h-[100px] w-full rounded-xl border border-[#e6d6b5] px-3 py-2.5 outline-none focus:border-[#b96f18]" />
          </label>

          <label className="mt-4 flex items-start gap-2 text-sm text-[#374151]"><input required type="checkbox" checked={form.consent} onChange={(e) => setForm((s) => ({ ...s, consent: e.target.checked }))} className="mt-1" /><span>I confirm that the information provided is correct and I agree to be contacted by Bhagwat Heritage Service Foundation Trust for volunteer coordination.</span></label>
          <label className="mt-2 flex items-start gap-2 text-sm text-[#374151]"><input type="checkbox" checked={form.whatsappConsent} onChange={(e) => setForm((s) => ({ ...s, whatsappConsent: e.target.checked }))} className="mt-1" /><span>I agree to receive seva updates on WhatsApp.</span></label>

          {error ? <p role="alert" className="mt-3 text-sm font-semibold text-[#b42318]">{error}</p> : null}
          {success ? <div className="mt-4 rounded-2xl border border-[#b2e4c8] bg-[#ecfdf3] p-4"><h3 className="text-base font-bold text-[#126b3f]">Application Submitted Successfully</h3><p className="mt-1 text-sm text-[#1f5134]">Thank you for your seva sankalp. Our team will review your application and contact you soon.</p></div> : null}

          <button type="submit" disabled={submitting} className="mt-5 w-full rounded-full bg-[#cb7413] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#ad630e] disabled:cursor-not-allowed disabled:opacity-70">{submitting ? "Submitting..." : "Submit Volunteer Application"}</button>
        </form>

        <article className="mt-6 rounded-2xl border border-[#e2d1ae] bg-[#fffbf2] p-5">
          <h2 className={GI_CARD_TITLE_CLASS}>Privacy & Seva Coordination Note</h2>
          <p className={`mt-2 ${GI_BODY_CLASS}`}>Your details will only be used for volunteer coordination, seva communication, and trust-related participation. We do not misuse or publicly share volunteer information.</p>
        </article>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10">
        <h2 className={GI_HEADING_CLASS}>Volunteer Registration FAQs</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((item) => (
            <details key={item.q} className="rounded-2xl border border-[#e7d7b6] bg-white p-4">
              <summary className={`cursor-pointer ${GI_CARD_TITLE_CLASS}`}>{item.q}</summary>
              <p className={`mt-2 ${GI_BODY_CLASS}`}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12">
        <div className="relative overflow-hidden rounded-3xl border border-[#efd9b1]">
          <div className="relative bg-gradient-to-r from-[#ffe7a1] via-[#ffd26c] to-[#ffbb42] p-8 text-[#4a2a10] md:p-10">
            <h2 className="text-4xl font-black">Begin Your Seva Journey</h2>
            <p className={`mt-2 max-w-2xl ${GI_BODY_CLASS} text-[#5d3413]`}>Your time, skill, and devotion can become a meaningful contribution to society and dharma.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#volunteer-form" className="rounded-full bg-[#d5851f] px-6 py-3 text-sm font-bold text-white">Register Now</a>
              <Link to={ROUTES.involved.contactUs} className="rounded-full border border-[#7a4a18]/35 bg-white/55 px-6 py-3 text-sm font-bold text-[#5b3212]">Contact Seva Coordinator</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
