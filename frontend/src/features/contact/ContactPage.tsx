import { memo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { contactApi } from "../../services/api/misc";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type InquiryType =
  | "General Inquiry"
  | "Seva / Volunteer"
  | "Donation Support"
  | "Event Collaboration"
  | "Temple Visit"
  | "Guidance Request"
  | "Media / Partnership";

type PreferredContactMethod = "Phone Call" | "WhatsApp" | "Email";
type Urgency = "Normal" | "Important" | "Emergency Seva Support";

type EventType =
  | "Bhagwat Katha"
  | "Satsang"
  | "Shibir"
  | "Cultural Program"
  | "Spiritual Workshop"
  | "Other";

type InviteMaharajForm = {
  fullName: string;
  phone: string;
  email: string;
  eventType: EventType;
  eventDate: string;
  venue: string;
  attendees: string;
  message: string;
  consent: boolean;
};

const QUICK_CONTACT = [
  {
    title: "Call Us",
    value: "+91-866-889-7445",
    href: "tel:+918668897445",
    action: "Call Now",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777524779/ChatGPT_Image_Apr_30_2026_10_22_15_AM_stfwld.png",
  },
  {
    title: "WhatsApp",
    value: "+91-866-889-7445",
    href: "https://wa.me/918668897445",
    action: "Message on WhatsApp",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777475728/ChatGPT_Image_Apr_29_2026_08_40_26_PM_dehfbt.png",
  },
  {
    title: "Email",
    value: "join@bhagwatheritage.org",
    href: "mailto:join@bhagwatheritage.org",
    action: "Send Email",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777524779/ChatGPT_Image_Apr_30_2026_10_22_20_AM_unse1i.png",
  },
  {
    title: "Visit Us",
    value: "Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital ward, Chandrapur, Maharashtra 442402",
    href: "https://maps.google.com/?q=Bhagwat+Dham+Shree+Swaminarayan+Mandir+Kasturba+Rd+Hospital+ward+Chandrapur+Maharashtra+442402",
    action: "Get Directions",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777524779/ChatGPT_Image_Apr_30_2026_10_22_25_AM_wyiqcg.png",
  },
] as const;

const HELP_CARDS = [
  {
    title: "Seva & Volunteer Enquiry",
    text: "Join ongoing seva projects, volunteer teams, and community support programs.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_41_57_AM_wsv00f.png",
  },
  {
    title: "Donation & Receipt Support",
    text: "Get help with donation process, receipt requests, and sponsorship guidance.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967400/g8_cw3tcs.png",
  },
  {
    title: "Bhagwat Katha / Event Collaboration",
    text: "Coordinate for katha, satsang, and social-cultural collaboration opportunities.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g10_db02lr.png",
  },
  {
    title: "Temple Visit & Darshan Information",
    text: "Receive darshan timings, puja support, and temple visit related details.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967403/g12_jtim6v.png",
  },
  {
    title: "Guidance & Spiritual Consultation",
    text: "Reach out for spiritual direction and value-based life guidance support.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_06_53_AM_imueuc.png",
  },
  {
    title: "Media / Publication / Partnership",
    text: "Connect for press, publication, media coordination, and institutional partnerships.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g7_kplr1h.png",
  },
] as const;

const DEPARTMENT_CARDS = [
  {
    title: "Donation Support",
    text: "For donation, receipt, sponsorship, and seva contribution queries.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967400/g8_cw3tcs.png",
  },
  {
    title: "Volunteer Coordination",
    text: "For joining seva activities and volunteer programs.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_07_00_AM_eggbt0.png",
  },
  {
    title: "Event Collaboration",
    text: "For Bhagwat Katha, satsang, cultural events, and institutional collaboration.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029119/ChatGPT_Image_Apr_24_2026_04_39_58_PM_h8p3fr.png",
  },
  {
    title: "Temple Activities",
    text: "For darshan, puja, prasad, and temple-related information.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032971/ChatGPT_Image_Apr_24_2026_05_42_57_PM_f81lk3.png",
  },
  {
    title: "Guidance Desk",
    text: "For spiritual guidance and value-based life consultation requests.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097561/ChatGPT_Image_Apr_25_2026_11_42_05_AM_bij6a0.png",
  },
  {
    title: "Media & Publications",
    text: "For press, publications, content, and social media coordination.",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029119/ChatGPT_Image_Apr_24_2026_04_39_27_PM_e5yys0.png",
  },
] as const;

const FAQS = [
  {
    q: "How fast can I expect a response?",
    a: "Our seva team generally responds as early as possible during office hours. Urgent seva matters should be shared by phone or WhatsApp.",
  },
  {
    q: "Can I request a callback for seva guidance?",
    a: "Yes. Please submit the contact form and select Phone Call as the preferred contact method.",
  },
  {
    q: "Can organizations collaborate with the trust?",
    a: "Yes. Institutions, mandirs, schools, colleges, social groups, and cultural organizations may contact us for events and seva collaborations.",
  },
  {
    q: "Can I contact the trust for donation support?",
    a: "Yes. You may contact us for donation guidance, receipt support, sponsorship, and seva contribution details.",
  },
  {
    q: "Can I visit the temple or trust office?",
    a: "Yes. Please check the office hours and use the map or direction button before visiting.",
  },
  {
    q: "Is emergency seva assistance available?",
    a: "For urgent seva coordination, please call or WhatsApp the official helpline.",
  },
] as const;

const GI_LABEL_CLASS = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#c07017]";
const GI_HEADING_CLASS = "mt-2 text-3xl font-black text-[#1f3550] md:text-4xl";
const GI_CARD_TITLE_CLASS = "text-2xl font-black text-[#1f3550]";
const GI_BODY_CLASS = "text-base leading-7 text-[#5e5247] md:text-lg";

const INVITE_EVENT_TYPES: EventType[] = [
  "Bhagwat Katha",
  "Satsang",
  "Shibir",
  "Cultural Program",
  "Spiritual Workshop",
  "Other",
];

const getCloudinaryIconUrl = (localIconPath: string) => {
  if (localIconPath.startsWith("http://") || localIconPath.startsWith("https://")) {
    return localIconPath;
  }
  const iconFile = localIconPath.split("/").pop() ?? "";
  return `https://res.cloudinary.com/der8zinu8/image/upload/contact-icons/${iconFile}`;
};

export default memo(function ContactPage() {
  usePageMeta(
    "Contact Us",
    "Contact Bhagwat Heritage Service Foundation Trust for seva, donation support, events, temple activities, volunteering, spiritual guidance, and community service enquiries."
  );

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    inquiryType: "General Inquiry" as InquiryType,
    preferredContactMethod: "Phone Call" as PreferredContactMethod,
    urgency: "Normal" as Urgency,
    subject: "",
    message: "",
    consent: false,
  });

  const [inviteForm, setInviteForm] = useState<InviteMaharajForm>({
    fullName: "",
    phone: "",
    email: "",
    eventType: "Bhagwat Katha",
    eventDate: "",
    venue: "",
    attendees: "",
    message: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setStatus({ type: "error", text: "Please enter a valid 10-digit Indian mobile number." });
      return;
    }

    if (!form.consent) {
      setStatus({ type: "error", text: "Please provide consent to continue." });
      return;
    }

    setLoading(true);
    try {
      await contactApi.send({
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
        inquiryType: form.inquiryType,
        preferredContactMethod: form.preferredContactMethod,
        urgency: form.urgency,
        subject: form.subject.trim(),
        message: form.message.trim(),
        consent: form.consent,
        createdAt: new Date().toISOString(),
      });

      setStatus({
        type: "success",
        text: "Thank you. Your enquiry has been received. Our seva team will contact you soon.",
      });

      setForm({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        inquiryType: "General Inquiry",
        preferredContactMethod: "Phone Call",
        urgency: "Normal",
        subject: "",
        message: "",
        consent: false,
      });
    } catch {
      setStatus({ type: "error", text: "We could not submit your enquiry right now. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitInvite = async (e: FormEvent) => {
    e.preventDefault();
    setInviteStatus(null);

    if (!/^[6-9]\d{9}$/.test(inviteForm.phone)) {
      setInviteStatus({ type: "error", text: "Please enter a valid 10-digit Indian mobile number." });
      return;
    }

    if (!inviteForm.consent) {
      setInviteStatus({ type: "error", text: "Please agree to be contacted for invite coordination." });
      return;
    }

    setInviteLoading(true);
    try {
      await contactApi.send({
        name: inviteForm.fullName.trim(),
        email: inviteForm.email.trim(),
        subject: `Invite Maharaj Ji - ${inviteForm.eventType}`,
        message: `Event Type: ${inviteForm.eventType}\nPreferred Date: ${inviteForm.eventDate}\nVenue: ${inviteForm.venue}\nExpected Attendees: ${inviteForm.attendees}\nMessage: ${inviteForm.message}`,
      });

      setInviteStatus({
        type: "success",
        text: "Your invitation request has been submitted. Our team will connect with you for next steps.",
      });

      setInviteForm({
        fullName: "",
        phone: "",
        email: "",
        eventType: "Bhagwat Katha",
        eventDate: "",
        venue: "",
        attendees: "",
        message: "",
        consent: false,
      });
    } catch {
      setInviteStatus({ type: "error", text: "Unable to send the invitation request right now. Please try again." });
    } finally {
      setInviteLoading(false);
    }
  };

  return (
    <div className="bg-[#fcf8ef] pb-12 font-['Poppins'] text-[#243b53]">
      <section className="mx-auto w-full max-w-[1180px] px-4 pt-0">
        <div className="overflow-hidden rounded-3xl border border-[#ebd7b5] shadow-[0_20px_45px_rgba(64,42,13,0.14)]">
          <div className="relative">
          <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777455260/ChatGPT_Image_Apr_29_2026_03_03_45_PM_tzsb6s.png" alt="Bhagwat Heritage seva contact helpdesk in warm spiritual temple atmosphere" className="h-[430px] w-full object-cover md:h-[560px]" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff3dc]/26 via-[#ffd797]/20 to-[#d9f0ff]/22" />
            <div className="absolute inset-0 flex items-end justify-center p-6 pb-8 text-white md:p-10 md:pb-10">
              <div className="text-center">
                <h1 className="text-4xl font-black leading-tight md:text-5xl">Contact Us</h1>
                <p className="mx-auto mt-3 max-w-3xl text-base font-semibold text-[#f9f5ea] md:text-lg">Join Us Divine Bhagwat Heritage 🙏</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="tel:+918668897445" className="rounded-full bg-[#d9821f] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#b86d17]">Call Now</a>
                <a href="https://wa.me/918668897445" target="_blank" rel="noreferrer" className="rounded-full border border-white/70 bg-white/15 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/25">WhatsApp</a>
                <a href="#send-enquiry" className="rounded-full border border-[#f8dcae] bg-[#f8dcae] px-5 py-2.5 text-sm font-bold text-[#4e3113] transition hover:bg-[#f5cf92]">Send Enquiry</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_CONTACT.map((item) => (
            <article key={item.title} className="rounded-3xl border border-[#ecdcbc] bg-white p-5 shadow-[0_10px_26px_rgba(25,48,75,0.08)]">
              <img src={getCloudinaryIconUrl(item.icon)} onError={(e) => (e.currentTarget.src = item.icon)} alt={`${item.title} icon`} className="mx-auto h-[88px] w-[88px] rounded-full object-cover" loading="lazy" />
              <h2 className={`mt-4 ${GI_CARD_TITLE_CLASS}`}>{item.title}</h2>
              <p className={`mt-1 min-h-[48px] ${GI_BODY_CLASS}`}>{item.value}</p>
              <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="mt-4 inline-flex rounded-full bg-[#cb7413] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#ac620f]">{item.action}</a>
            </article>
          ))}
        </div>
      </section>

      <section id="invite-maharaj" className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[#e2c8a2] bg-white p-6 shadow-[0_14px_32px_rgba(38,40,44,0.08)] md:p-8">
            <p className={GI_LABEL_CLASS}>Invite Maharaj Ji</p>
            <h2 className={GI_HEADING_CLASS}>Request Maharaj Ji for Your Event</h2>
            <p className={`mt-4 ${GI_BODY_CLASS}`}>Submit your invitation request for Bhagwat Katha, satsang, shibir, cultural program, or spiritual workshop. Our team will review the event details and guide you through the booking process.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-[#f2e1c2] bg-[#fff8ed] p-4">
                <h3 className="text-xl font-semibold text-[#1f3550]">Types of Events</h3>
                <ul className="mt-3 space-y-2 text-sm text-[#5e5247]">
                  <li>• Bhagwat Katha and spiritual discourse</li>
                  <li>• Satsang and devotional assembly</li>
                  <li>• Shibir and youth educational program</li>
                  <li>• Cultural gatherings and heritage events</li>
                  <li>• Spiritual workshops and guidance sessions</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-[#f2e1c2] bg-[#fff8ed] p-4">
                <h3 className="text-xl font-semibold text-[#1f3550]">Booking Requirements</h3>
                <ul className="mt-3 space-y-2 text-sm text-[#5e5247]">
                  <li>• Event date and venue details</li>
                  <li>• Estimated guest count and audience profile</li>
                  <li>• Purpose, program agenda, and support needs</li>
                  <li>• Preferred language and event duration</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-[#f2e1c2] bg-[#fff8ed] p-4 md:col-span-2">
                <h3 className="text-xl font-semibold text-[#1f3550]">Process Flow</h3>
                <ol className="mt-3 space-y-2 text-sm text-[#5e5247] list-decimal list-inside">
                  <li>Submit the invitation request from the form.</li>
                  <li>Our team reviews availability and event details.</li>
                  <li>We contact you with confirmation and next steps.</li>
                  <li>Finalize date, venue, and logistical support.</li>
                </ol>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmitInvite} className="rounded-3xl border border-[#e6d5b4] bg-white p-6 shadow-[0_14px_32px_rgba(38,40,44,0.09)] md:p-8">
            <h2 className={GI_HEADING_CLASS}>Invite Maharaj Ji</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-[#2f435a]">Full Name<input required value={inviteForm.fullName} onChange={(e) => setInviteForm((s) => ({ ...s, fullName: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a]">Mobile Number<input required value={inviteForm.phone} onChange={(e) => setInviteForm((s) => ({ ...s, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a]">Email<input required type="email" value={inviteForm.email} onChange={(e) => setInviteForm((s) => ({ ...s, email: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a]">Event Type
                <select value={inviteForm.eventType} onChange={(e) => setInviteForm((s) => ({ ...s, eventType: e.target.value as EventType }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]">
                  {INVITE_EVENT_TYPES.map((type) => (<option key={type}>{type}</option>))}
                </select>
              </label>
              <label className="text-sm font-semibold text-[#2f435a]">Preferred Event Date<input required type="date" value={inviteForm.eventDate} onChange={(e) => setInviteForm((s) => ({ ...s, eventDate: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a]">Venue<input required value={inviteForm.venue} onChange={(e) => setInviteForm((s) => ({ ...s, venue: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a]">Expected Attendees<input required value={inviteForm.attendees} onChange={(e) => setInviteForm((s) => ({ ...s, attendees: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a] md:col-span-2">Event Details<textarea required rows={5} value={inviteForm.message} onChange={(e) => setInviteForm((s) => ({ ...s, message: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
            </div>
            <label className="mt-4 flex items-start gap-2 text-sm text-[#415468]"><input type="checkbox" checked={inviteForm.consent} onChange={(e) => setInviteForm((s) => ({ ...s, consent: e.target.checked }))} className="mt-1" /><span>I agree to be contacted by Bhagwat Heritage Service Foundation Trust regarding my invitation request.</span></label>
            {inviteStatus ? <p role="alert" className={`mt-3 text-sm font-bold ${inviteStatus.type === "success" ? "text-[#13653e]" : "text-[#b42318]"}`}>{inviteStatus.text}</p> : null}
            <button type="submit" disabled={inviteLoading} className="mt-5 w-full rounded-full bg-[#cb7413] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a95f0f] disabled:opacity-70">{inviteLoading ? "Sending..." : "Submit Invitation"}</button>
          </form>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <p className={GI_LABEL_CLASS}>How Can We Help</p>
        <h2 className={GI_HEADING_CLASS}>How Can We Help You?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {HELP_CARDS.map((card) => (
            <article key={card.title} className="rounded-3xl border border-[#e9d8b7] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <img src={getCloudinaryIconUrl(card.icon)} onError={(e) => (e.currentTarget.src = card.icon)} alt={`${card.title} icon`} className="mx-auto h-[88px] w-[88px] rounded-full object-cover" loading="lazy" />
              <h3 className={`mt-3 ${GI_CARD_TITLE_CLASS}`}>{card.title}</h3>
              <p className={`mt-1 ${GI_BODY_CLASS}`}>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="send-enquiry" className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={onSubmit} className="rounded-3xl border border-[#e6d5b4] bg-white p-6 shadow-[0_14px_32px_rgba(38,40,44,0.09)] md:p-8">
            <h2 className={GI_HEADING_CLASS}>Send Your Enquiry</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-[#2f435a]">Full Name<input required value={form.fullName} onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a]">Mobile Number<input required value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a]">Email<input required type="email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a]">City<input required value={form.city} onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a]">Inquiry Type
                <select value={form.inquiryType} onChange={(e) => setForm((s) => ({ ...s, inquiryType: e.target.value as InquiryType }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]">
                  <option>General Inquiry</option><option>Seva / Volunteer</option><option>Donation Support</option><option>Event Collaboration</option><option>Temple Visit</option><option>Guidance Request</option><option>Media / Partnership</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-[#2f435a]">Preferred Contact Method
                <select value={form.preferredContactMethod} onChange={(e) => setForm((s) => ({ ...s, preferredContactMethod: e.target.value as PreferredContactMethod }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]"><option>Phone Call</option><option>WhatsApp</option><option>Email</option></select>
              </label>
              <label className="text-sm font-semibold text-[#2f435a] md:col-span-2">Urgency
                <select value={form.urgency} onChange={(e) => setForm((s) => ({ ...s, urgency: e.target.value as Urgency }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]"><option>Normal</option><option>Important</option><option>Emergency Seva Support</option></select>
              </label>
              <label className="text-sm font-semibold text-[#2f435a] md:col-span-2">Subject<input required value={form.subject} onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
              <label className="text-sm font-semibold text-[#2f435a] md:col-span-2">Message<textarea required rows={5} value={form.message} onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e6d5b4] px-3 py-2.5 outline-none focus:border-[#b86d17]" /></label>
            </div>
            <label className="mt-4 flex items-start gap-2 text-sm text-[#415468]"><input type="checkbox" checked={form.consent} onChange={(e) => setForm((s) => ({ ...s, consent: e.target.checked }))} className="mt-1" /><span>I agree to be contacted by Bhagwat Heritage Service Foundation Trust regarding my enquiry.</span></label>
            {status ? <p role="alert" className={`mt-3 text-sm font-bold ${status.type === "success" ? "text-[#13653e]" : "text-[#b42318]"}`}>{status.text}</p> : null}
            <button type="submit" disabled={loading} className="mt-5 w-full rounded-full bg-[#cb7413] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a95f0f] disabled:opacity-70">{loading ? "Sending..." : "Send Message"}</button>
          </form>

          <article className="rounded-3xl border border-[#e6d5b4] bg-white p-6 shadow-[0_14px_32px_rgba(38,40,44,0.09)] md:p-8">
            <h2 className={GI_HEADING_CLASS}>Seva Contact Desk</h2>
            <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777443464/ChatGPT_Image_Apr_29_2026_11_46_33_AM_tss5do.png" alt="Seva desk volunteers assisting devotees" className="mt-4 h-52 w-full rounded-2xl object-cover" loading="lazy" />
            <div className={`mt-5 space-y-4 ${GI_BODY_CLASS}`}>
              <p><span className="font-black text-[#1d3550]">Address:</span><br />Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital ward, Chandrapur, Maharashtra 442402</p>
              <p><span className="font-black text-[#1d3550]">Email:</span><br /><a href="mailto:join@bhagwatheritage.org" className="text-[#0f6174]">join@bhagwatheritage.org</a></p>
              <p><span className="font-black text-[#1d3550]">Phone:</span><br /><a href="tel:+918668897445" className="text-[#0f6174]">+91-866-889-7445</a></p>
              <p><span className="font-black text-[#1d3550]">Office Hours:</span><br />Mon-Sun: 09:00 AM - 08:00 PM</p>
              <p><span className="font-black text-[#1d3550]">Emergency Seva Assistance:</span><br />For urgent seva coordination, please call or WhatsApp the helpline for immediate response.</p>
            </div>
            <div className={`mt-4 rounded-2xl border border-[#e9d7b7] bg-[#fff8eb] p-4 ${GI_BODY_CLASS} text-[#6a553f]`}>All enquiries are handled with respect, confidentiality, and disciplined seva spirit.</div>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <p className={GI_LABEL_CLASS}>Department Support</p>
        <h2 className={GI_HEADING_CLASS}>Connect with the Right Seva Desk</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENT_CARDS.map((item) => (
            <article key={item.title} className="rounded-3xl border border-[#e9d7b7] bg-white p-5 shadow-sm">
              <img src={getCloudinaryIconUrl(item.icon)} onError={(e) => (e.currentTarget.src = item.icon)} alt={`${item.title} icon`} className="mx-auto h-[88px] w-[88px] rounded-full object-cover" loading="lazy" />
              <h3 className={`mt-3 ${GI_CARD_TITLE_CLASS}`}>{item.title}</h3>
              <p className={`mt-2 ${GI_BODY_CLASS}`}>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <article className="rounded-3xl border border-[#efc68f] bg-gradient-to-r from-[#f4a844] via-[#e58d24] to-[#cb7413] p-6 text-white shadow-lg">
          <p className="text-2xl font-black">Need urgent seva coordination?</p>
          <p className={`mt-1 ${GI_BODY_CLASS} text-white`}>Call or WhatsApp: +91-866-889-7445</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="tel:+918668897445" className="rounded-full bg-white px-5 py-2 text-sm font-bold text-[#a55d0f]">Call Now</a>
            <a href="https://wa.me/918668897445" target="_blank" rel="noreferrer" className="rounded-full border border-white px-5 py-2 text-sm font-bold text-white">WhatsApp</a>
          </div>
        </article>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <p className={GI_LABEL_CLASS}>FAQ</p>
        <h2 className={GI_HEADING_CLASS}>Contact FAQs</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((item) => (
            <details key={item.q} className="rounded-2xl border border-[#e8d8b6] bg-white p-4">
              <summary className="cursor-pointer text-xl font-black text-[#1d3550]">{item.q}</summary>
              <p className={`mt-2 ${GI_BODY_CLASS}`}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <div className="relative overflow-hidden rounded-3xl border border-[#ebd7b5]">
          <div className="relative bg-gradient-to-r from-[#ffe7a1] via-[#ffd26c] to-[#ffbb42] p-8 text-[#4a2a10] md:p-10">
            <h2 className="text-4xl font-black">Join Hands with Bhagwat Heritage</h2>
            <p className={`mt-2 max-w-3xl ${GI_BODY_CLASS} text-[#5d3413]`}>Whether you wish to serve, donate, volunteer, collaborate, or seek guidance, Bhagwat Heritage welcomes your sincere connection with devotion, discipline, and transparency.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={ROUTES.involved.volunteer} className="rounded-full bg-[#d78728] px-5 py-2.5 text-sm font-bold text-white">Join Seva</Link>
              <Link to={ROUTES.donate} className="rounded-full border border-[#7a4a18]/35 bg-white/55 px-5 py-2.5 text-sm font-bold text-[#5b3212]">Donate</Link>
              <a href="https://wa.me/918668897445" target="_blank" rel="noreferrer" className="rounded-full border border-[#f8dcae] bg-[#f8dcae] px-5 py-2.5 text-sm font-bold text-[#4e3113]">Contact on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
