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

const QUICK_CONTACT = [
  {
    title: "Call Us",
    value: "+91-866-889-7445",
    href: "tel:+918668897445",
    action: "Call Now",
    icon: "/assets/icons/contact/icon-call.svg",
  },
  {
    title: "WhatsApp",
    value: "+91-866-889-7445",
    href: "https://wa.me/918668897445",
    action: "Message on WhatsApp",
    icon: "/assets/icons/contact/icon-whatsapp.svg",
  },
  {
    title: "Email",
    value: "join@bhagwatheritage.org",
    href: "mailto:join@bhagwatheritage.org",
    action: "Send Email",
    icon: "/assets/icons/contact/icon-email.svg",
  },
  {
    title: "Visit Us",
    value: "Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital ward, Chandrapur, Maharashtra 442402",
    href: "https://maps.google.com/?q=Bhagwat+Dham+Shree+Swaminarayan+Mandir+Kasturba+Rd+Hospital+ward+Chandrapur+Maharashtra+442402",
    action: "Get Directions",
    icon: "/assets/icons/contact/icon-location.svg",
  },
] as const;

const HELP_CARDS = [
  {
    title: "Seva & Volunteer Enquiry",
    text: "Join ongoing seva projects, volunteer teams, and community support programs.",
    icon: "/assets/icons/contact/icon-seva-enquiry.svg",
  },
  {
    title: "Donation & Receipt Support",
    text: "Get help with donation process, receipt requests, and sponsorship guidance.",
    icon: "/assets/icons/contact/icon-donation-support.svg",
  },
  {
    title: "Bhagwat Katha / Event Collaboration",
    text: "Coordinate for katha, satsang, and social-cultural collaboration opportunities.",
    icon: "/assets/icons/contact/icon-event-collaboration.svg",
  },
  {
    title: "Temple Visit & Darshan Information",
    text: "Receive darshan timings, puja support, and temple visit related details.",
    icon: "/assets/icons/contact/icon-temple-visit.svg",
  },
  {
    title: "Guidance & Spiritual Consultation",
    text: "Reach out for spiritual direction and value-based life guidance support.",
    icon: "/assets/icons/contact/icon-guidance-request.svg",
  },
  {
    title: "Media / Publication / Partnership",
    text: "Connect for press, publication, media coordination, and institutional partnerships.",
    icon: "/assets/icons/contact/icon-media-partnership.svg",
  },
] as const;

const DEPARTMENT_CARDS = [
  ["Donation Support", "For donation, receipt, sponsorship, and seva contribution queries."],
  ["Volunteer Coordination", "For joining seva activities and volunteer programs."],
  ["Event Collaboration", "For Bhagwat Katha, satsang, cultural events, and institutional collaboration."],
  ["Temple Activities", "For darshan, puja, prasad, and temple-related information."],
  ["Guidance Desk", "For spiritual guidance and value-based life consultation requests."],
  ["Media & Publications", "For press, publications, content, and social media coordination."],
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

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  return (
    <div className="bg-[#fcf8ef] pb-12 text-[#243b53]">
      <section className="mx-auto w-full max-w-[1180px] px-4 pt-8 md:pt-10">
        <div className="overflow-hidden rounded-3xl border border-[#ebd7b5] shadow-[0_20px_45px_rgba(64,42,13,0.14)]">
          <div className="relative">
            <img src="/assets/images/contact/contact-hero.jpg" alt="Bhagwat Heritage seva contact helpdesk in warm spiritual temple atmosphere" className="h-[340px] w-full object-cover md:h-[430px]" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a140e]/80 via-[#3f2a15]/62 to-[#14364f]/64" />
            <div className="absolute inset-0 p-6 text-white md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f8dfb0]">Home / Get Involved / Contact Us</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-5xl">Contact Bhagwat Heritage</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#f9f5ea] md:text-base">Connect with Bhagwat Heritage Service Foundation Trust for seva, satsang, donation support, event collaboration, temple activities, guidance, and community service enquiries.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="tel:+918668897445" className="rounded-full bg-[#d9821f] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#b86d17]">Call Now</a>
                <a href="https://wa.me/918668897445" target="_blank" rel="noreferrer" className="rounded-full border border-white/70 bg-white/15 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/25">WhatsApp</a>
                <a href="#send-enquiry" className="rounded-full border border-[#f8dcae] bg-[#f8dcae] px-5 py-2.5 text-sm font-bold text-[#4e3113] transition hover:bg-[#f5cf92]">Send Enquiry</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_CONTACT.map((item) => (
            <article key={item.title} className="rounded-3xl border border-[#ecdcbc] bg-white p-5 shadow-[0_10px_26px_rgba(25,48,75,0.08)]">
              <img src={item.icon} alt={`${item.title} icon`} className="h-11 w-11" loading="lazy" />
              <h2 className="mt-4 text-lg font-black text-[#1d3550]">{item.title}</h2>
              <p className="mt-1 min-h-[48px] text-sm leading-6 text-[#4f5d6c]">{item.value}</p>
              <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="mt-4 inline-flex rounded-full bg-[#cb7413] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#ac620f]">{item.action}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <h2 className="text-3xl font-black text-[#1d3550]">How Can We Help You?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {HELP_CARDS.map((card) => (
            <article key={card.title} className="rounded-3xl border border-[#e9d8b7] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <img src={card.icon} alt={`${card.title} icon`} className="h-10 w-10" loading="lazy" />
              <h3 className="mt-3 text-lg font-black text-[#1d3550]">{card.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#596674]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="send-enquiry" className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={onSubmit} className="rounded-3xl border border-[#e6d5b4] bg-white p-6 shadow-[0_14px_32px_rgba(38,40,44,0.09)] md:p-8">
            <h2 className="text-3xl font-black text-[#1d3550]">Send Your Enquiry</h2>
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
            <h2 className="text-3xl font-black text-[#1d3550]">Seva Contact Desk</h2>
            <img src="/assets/images/contact/contact-seva-desk.jpg" alt="Seva desk volunteers assisting devotees" className="mt-4 h-52 w-full rounded-2xl object-cover" loading="lazy" />
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#4f5d6c]">
              <p><span className="font-black text-[#1d3550]">Address:</span><br />Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital ward, Chandrapur, Maharashtra 442402</p>
              <p><span className="font-black text-[#1d3550]">Email:</span><br /><a href="mailto:join@bhagwatheritage.org" className="text-[#0f6174]">join@bhagwatheritage.org</a></p>
              <p><span className="font-black text-[#1d3550]">Phone:</span><br /><a href="tel:+918668897445" className="text-[#0f6174]">+91-866-889-7445</a></p>
              <p><span className="font-black text-[#1d3550]">Office Hours:</span><br />Mon-Sun: 09:00 AM - 08:00 PM</p>
              <p><span className="font-black text-[#1d3550]">Emergency Seva Assistance:</span><br />For urgent seva coordination, please call or WhatsApp the helpline for immediate response.</p>
            </div>
            <div className="mt-4 rounded-2xl border border-[#e9d7b7] bg-[#fff8eb] p-4 text-sm text-[#6a553f]">All enquiries are handled with respect, confidentiality, and disciplined seva spirit.</div>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <h2 className="text-3xl font-black text-[#1d3550]">Visit Bhagwat Heritage</h2>
        <p className="mt-2 text-[#596674]">Find our seva and temple location easily.</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.8fr,1fr]">
          <iframe title="Bhagwat Heritage location map" className="h-[360px] w-full rounded-3xl border border-[#e9d7b7]" loading="lazy" src="https://www.google.com/maps?q=Bhagwat%20Dham%20Shree%20Swaminarayan%20Mandir%20Kasturba%20Rd%20Hospital%20ward%20Chandrapur%20Maharashtra%20442402&output=embed" />
          <article className="rounded-3xl border border-[#e9d7b7] bg-white p-5 shadow-sm">
            <img src="/assets/images/contact/contact-location.jpg" alt="Bhagwat Heritage temple entrance and trust office surroundings" className="h-40 w-full rounded-2xl object-cover" loading="lazy" />
            <p className="mt-4 text-sm leading-6 text-[#4f5d6c]">Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital ward, Chandrapur, Maharashtra 442402</p>
            <p className="mt-2 text-sm text-[#4f5d6c]"><span className="font-bold text-[#1d3550]">Nearby Landmark:</span> Hospital Ward Area, Kasturba Road, Chandrapur.</p>
            <p className="mt-2 text-sm"><a href="tel:+918668897445" className="font-bold text-[#0f6174]">+91-866-889-7445</a></p>
            <a href="https://maps.google.com/?q=Bhagwat+Dham+Shree+Swaminarayan+Mandir+Kasturba+Rd+Hospital+ward+Chandrapur+Maharashtra+442402" target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-[#cb7413] px-4 py-2 text-sm font-bold text-white">Get Directions</a>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <h2 className="text-3xl font-black text-[#1d3550]">Connect with the Right Seva Desk</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENT_CARDS.map(([title, text]) => (
            <article key={title} className="rounded-3xl border border-[#e9d7b7] bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-[#1d3550]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#596674]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <article className="rounded-3xl border border-[#efc68f] bg-gradient-to-r from-[#f4a844] via-[#e58d24] to-[#cb7413] p-6 text-white shadow-lg">
          <p className="text-xl font-black">Need urgent seva coordination?</p>
          <p className="mt-1 text-sm">Call or WhatsApp: +91-866-889-7445</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="tel:+918668897445" className="rounded-full bg-white px-5 py-2 text-sm font-bold text-[#a55d0f]">Call Now</a>
            <a href="https://wa.me/918668897445" target="_blank" rel="noreferrer" className="rounded-full border border-white px-5 py-2 text-sm font-bold text-white">WhatsApp</a>
          </div>
        </article>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <h2 className="text-3xl font-black text-[#1d3550]">Contact FAQs</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((item) => (
            <details key={item.q} className="rounded-2xl border border-[#e8d8b6] bg-white p-4">
              <summary className="cursor-pointer text-base font-black text-[#1d3550]">{item.q}</summary>
              <p className="mt-2 text-sm leading-6 text-[#596674]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pt-11 md:pt-[72px]">
        <div className="relative overflow-hidden rounded-3xl border border-[#ebd7b5]">
          <img src="/assets/images/contact/contact-cta-banner.jpg" alt="Warm spiritual saffron devotional background for trust connection" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="relative bg-[#0f3550]/72 p-8 text-white md:p-10">
            <h2 className="text-3xl font-black">Join Hands with Bhagwat Heritage</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7">Whether you wish to serve, donate, volunteer, collaborate, or seek guidance, Bhagwat Heritage welcomes your sincere connection with devotion, discipline, and transparency.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={ROUTES.involved.volunteer} className="rounded-full bg-[#d78728] px-5 py-2.5 text-sm font-bold text-white">Join Seva</Link>
              <Link to={ROUTES.donate} className="rounded-full border border-white/70 bg-white/15 px-5 py-2.5 text-sm font-bold text-white">Donate</Link>
              <a href="https://wa.me/918668897445" target="_blank" rel="noreferrer" className="rounded-full border border-[#f8dcae] bg-[#f8dcae] px-5 py-2.5 text-sm font-bold text-[#4e3113]">Contact on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
