import { memo, useState, type FormEvent, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { involvedApi } from "../../services/api/misc";

type ContributionMode = "Volunteer" | "Donor" | "Organizer" | "Digital Support" | "Both Volunteer & Donor";
type JoinTimeline = "Immediately" | "Within 1 Week" | "Within 1 Month" | "Later";
type Availability = "Weekdays" | "Weekends" | "Flexible" | "Event-based only";

const WAYS_TO_INVOLVE = [
  {
    title: "Volunteer",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050143/icon-bal-sanskar.svg",
    text: "Offer your time and energy in events, seva drives, temple activities, community outreach, and cultural programs.",
  },
  {
    title: "Donate",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050237/icon-character-building.svg",
    text: "Support ann seva, education, healthcare, temple seva, disaster relief, and spiritual-cultural initiatives.",
  },
  {
    title: "Organize",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050599/icon-mentor-review.svg",
    text: "Coordinate seva activities, satsang programs, cultural events, and community service initiatives in your city.",
  },
  {
    title: "Digital Support",
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777050696/icon-parent-dashboard.svg",
    text: "Help with content, design, video editing, social media, documentation, website support, and digital outreach.",
  },
] as const;

const OPPORTUNITIES = [
  ["Temple Seva", "https://res.cloudinary.com/der8zinu8/image/upload/v1777049957/icon-residential-gurukul.svg", "Darshan support, festival arrangements, prasad distribution, visitor assistance, documentation, and event coordination."],
  ["Ann Seva & Community Support", "https://res.cloudinary.com/der8zinu8/image/upload/v1777050436/icon-family-pathshala.svg", "Food distribution, ration kit support, relief assistance, and community welfare drives."],
  ["Education Seva", "https://res.cloudinary.com/der8zinu8/image/upload/v1777050390/icon-digital-notes.svg", "Student mentoring, scholarship support, school kit distribution, value education, and youth guidance."],
  ["Healthcare & Camps", "https://res.cloudinary.com/der8zinu8/image/upload/v1777050599/icon-mentor-review.svg", "Medical camps, health awareness, patient support, medicine distribution, and local outreach coordination."],
  ["Cultural & Spiritual Events", "https://res.cloudinary.com/der8zinu8/image/upload/v1777050479/icon-leadership-readiness.svg", "Bhagwat Katha, satsang, festivals, youth seminars, family value events, and cultural programs."],
  ["Digital & Media Seva", "https://res.cloudinary.com/der8zinu8/image/upload/v1777050696/icon-parent-dashboard.svg", "Photography, videography, social media posts, reels, website updates, content writing, and digital documentation."],
] as const;

const STEP_CARDS = [
  ["Apply", "Submit your basic details, city, skills, and seva interest.", "https://res.cloudinary.com/der8zinu8/image/upload/v1777050336/icon-curriculum.svg"],
  ["Verify", "Our team reviews your information and contacts you for coordination.", "https://res.cloudinary.com/der8zinu8/image/upload/v1777050237/icon-character-building.svg"],
  ["Assign", "You receive a suitable seva role based on your location, availability, and ability.", "https://res.cloudinary.com/der8zinu8/image/upload/v1777050390/icon-digital-notes.svg"],
  ["Serve", "You join seva activities, events, campaigns, or digital support as per coordination.", "https://res.cloudinary.com/der8zinu8/image/upload/v1777050742/icon-sanskrit-chanting.svg"],
  ["Report & Grow", "Your seva contribution is documented, reviewed, and expanded into deeper participation.", "https://res.cloudinary.com/der8zinu8/image/upload/v1777050790/icon-sanskrit-scholar.svg"],
] as const;

const FAQS = [
  ["Can I join without prior volunteering experience?", "Yes. Volunteers are guided according to their ability, time, and comfort level."],
  ["Is donation mandatory for volunteer registration?", "No. Donation is not mandatory. You may contribute through time, skills, coordination, or resources."],
  ["Can students and working professionals join part-time?", "Yes. Flexible and event-based seva opportunities are available."],
  ["Can I organize seva in my own city?", "Yes. You can apply as a city organizer and the team will guide you with coordination structure."],
  ["How soon will I receive a response after applying?", "The coordination team will review your details and contact you as per seva requirement and location."],
] as const;

const EDU_LABEL_CLASS = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#c07017]";
const EDU_HEADING_CLASS = "mt-2 text-3xl font-black text-[#1f3550] md:text-4xl";
const EDU_CARD_TITLE_CLASS = "text-2xl font-black text-[#1f3550]";
const EDU_BODY_CLASS = "text-base leading-7 text-[#5e5247] md:text-lg";

const getCloudinaryIconUrl = (localIconPath: string) => {
  if (localIconPath.startsWith("http://") || localIconPath.startsWith("https://")) {
    return localIconPath;
  }
  const iconFile = localIconPath.split("/").pop() ?? "";
  return `https://res.cloudinary.com/der8zinu8/image/upload/get-involved-icons/${iconFile}`;
};

const applyIconFallback = (event: SyntheticEvent<HTMLImageElement>) => {
  const target = event.currentTarget;
  const fallbackSrc = target.getAttribute("data-fallback-src");
  if (fallbackSrc && target.src !== fallbackSrc) target.src = fallbackSrc;
};

export default memo(function GetInvolvedPage() {
  usePageMeta("Get Involved", "Join Bhagwat Heritage Service Foundation Trust as volunteer, donor, organizer, digital supporter, and seva contributor.");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    age: "",
    preferredSevaArea: "",
    availability: "" as "" | Availability,
    skills: "",
    contributionMode: "Volunteer" as ContributionMode,
    timeline: "Immediately" as JoinTimeline,
    message: "",
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus(null);

    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setStatus({ type: "error", text: "Please enter a valid Indian mobile number." });
      return;
    }

    if (loading) return;
    setLoading(true);
    try {
      await involvedApi.join({
        name: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.mobile,
        city: form.city.trim(),
        age: form.age ? Number(form.age) : undefined,
        interest: form.preferredSevaArea,
        preferredSevaArea: form.preferredSevaArea,
        availability: form.availability || undefined,
        skills: form.skills.trim() || undefined,
        contributionMode: form.contributionMode,
        joinTimeline: form.timeline,
        helpType: form.contributionMode,
        message: form.message.trim() || undefined,
      });

      setStatus({ type: "success", text: "Thank you for your seva interest. Our coordination team will contact you shortly." });
      setForm({
        fullName: "",
        email: "",
        mobile: "",
        city: "",
        age: "",
        preferredSevaArea: "",
        availability: "",
        skills: "",
        contributionMode: "Volunteer",
        timeline: "Immediately",
        message: "",
      });
    } catch {
      setStatus({ type: "error", text: "Submission failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcf8ef] pb-12 font-['Poppins'] text-[#2e4356]">
      <section className="mx-auto w-full max-w-[1120px] px-4 pt-0">
        <div className="relative overflow-hidden rounded-3xl border border-[#ecd8b2] shadow-[0_20px_50px_rgba(39,25,8,0.16)]">
          <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777443464/ChatGPT_Image_Apr_29_2026_11_46_33_AM_tss5do.png" alt="Bhagwat Heritage seva volunteers supporting community with devotional atmosphere" className="h-[430px] w-full object-cover md:h-[560px]" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff2dc]/18 via-[#ffd89d]/14 to-[#d8f1ff]/18" />
          <div className="absolute inset-0 flex h-full flex-col items-center justify-end gap-5 p-6 pb-8 text-center text-white md:gap-6 md:p-10 md:pb-10">
            <div className="w-full">
              <h1 className="text-4xl font-black leading-tight md:text-5xl">Get Involved</h1>
              <p className="mx-auto mt-3 max-w-3xl text-base font-semibold text-[#fff3de] md:text-lg">Join Seva. Serve with Purpose.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to={ROUTES.involved.volunteer} className="rounded-full bg-[#d68424] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#b76a16]">Become a Volunteer</Link>
              <a href="#registration" className="rounded-full border border-white/70 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20">Organize Seva in Your City</a>
              <Link to={ROUTES.donate} className="rounded-full border border-[#f7d9ab] bg-[#f7d9ab] px-5 py-2.5 text-xs font-bold text-[#4c2e12]">Support as Donor</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 text-center md:pt-[72px]">
        <p className={EDU_LABEL_CLASS}>Participation Purpose</p>
        <h2 className={EDU_HEADING_CLASS}>A Platform for Seva, Sanskar and Social Good</h2>
        <p className={`mx-auto mt-3 max-w-4xl ${EDU_BODY_CLASS}`}>Bhagwat Heritage Service Foundation Trust invites individuals, families, youth groups, professionals, institutions, and community leaders to participate in meaningful seva. Whether you can give time, skills, resources, coordination support, or local leadership, your contribution can become a channel of service, culture, compassion, and spiritual upliftment.</p>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <p className={EDU_LABEL_CLASS}>Ways To Join</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {WAYS_TO_INVOLVE.map((card) => (
            <article key={card.title} className="rounded-[20px] border border-[#ead8b5] bg-white p-5 text-center shadow-[0_10px_24px_rgba(23,40,66,0.08)]">
              <img
                src={getCloudinaryIconUrl(card.icon)}
                data-fallback-src={card.icon}
                onError={applyIconFallback}
                alt={`${card.title} icon`}
                className="mx-auto h-[92px] w-[92px] rounded-full object-cover"
                loading="lazy"
              />
              <h3 className={`mt-3 ${EDU_CARD_TITLE_CLASS}`}>{card.title}</h3>
              <p className={`mt-2 ${EDU_BODY_CLASS}`}>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <p className={EDU_LABEL_CLASS}>Seva Opportunities</p>
        <h2 className={EDU_HEADING_CLASS}>Choose Your Area of Seva</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {OPPORTUNITIES.map(([title, icon, text]) => (
            <article key={title} className="rounded-[20px] border border-[#ead8b5] bg-white p-5 text-center shadow-[0_10px_24px_rgba(23,40,66,0.08)]">
              <img
                src={getCloudinaryIconUrl(icon)}
                data-fallback-src={icon}
                onError={applyIconFallback}
                alt={`${title} icon`}
                className="mx-auto h-[92px] w-[92px] rounded-full object-cover"
                loading="lazy"
              />
              <h3 className={`mt-3 ${EDU_CARD_TITLE_CLASS}`}>{title}</h3>
              <p className={`mt-2 ${EDU_BODY_CLASS}`}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-6 px-4 pt-11 md:grid-cols-2 md:items-center md:pt-[72px]">
        <div className="overflow-hidden rounded-3xl border border-[#ebd8b4]">
          <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777443465/ChatGPT_Image_Apr_29_2026_11_46_45_AM_yamx0i.png" alt="Bhagwat Heritage volunteer seva team coordinating support" className="h-[360px] w-full object-cover object-center" loading="lazy" />
        </div>
        <div>
          <p className={EDU_LABEL_CLASS}>Why Join</p>
          <h2 className={EDU_HEADING_CLASS}>Why Join Bhagwat Heritage?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Meaningful Seva with Spiritual Purpose",
              "Structured Role Assignment",
              "Mentorship by Senior Coordinators",
              "Participation in Major Events",
              "Opportunity to Serve Locally and Globally",
              "Transparent Communication and Reporting",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[#ead8b5] bg-white p-3 text-sm font-semibold text-[#314b63]">{item}</div>
            ))}
          </div>
          <p className={`mt-4 rounded-2xl border border-[#e3d0ab] bg-[#fff8eb] p-4 ${EDU_BODY_CLASS}`}>Your seva is coordinated with dignity, discipline, transparency, and respect for your time, ability, and availability.</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <p className={EDU_LABEL_CLASS}>Onboarding</p>
        <h2 className={EDU_HEADING_CLASS}>Simple Seva Onboarding</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-5">
          {STEP_CARDS.map(([title, text, icon], i) => (
            <article key={`${title}-${i}`} className="rounded-[20px] border border-[#ead8b5] bg-white p-4 text-center shadow-[0_10px_24px_rgba(23,40,66,0.08)]">
              <img
                src={getCloudinaryIconUrl(icon)}
                data-fallback-src={icon}
                onError={applyIconFallback}
                alt={`${title} icon`}
                className="mx-auto h-[84px] w-[84px] rounded-full object-cover"
                loading="lazy"
              />
              <h3 className={`mt-2 ${EDU_CARD_TITLE_CLASS}`}>{title}</h3>
              <p className={`mt-1 ${EDU_BODY_CLASS}`}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-6 px-4 pt-11 md:grid-cols-2 md:items-center md:pt-[72px]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c07017]">City Leadership</p>
          <h2 className="mt-2 text-3xl font-black text-[#1f3550]">Become a City Seva Organizer</h2>
          <p className="mt-3 text-sm leading-7 text-[#5b6874]">If you wish to begin ann seva, educational support, health camps, satsang coordination, youth programs, or cultural service activities in your city, the foundation team can guide you with structure, coordination, communication format, and seva planning.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              "Local Seva Planning",
              "Volunteer Team Building",
              "Event & Campaign Coordination",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[#ead8b5] bg-white p-3 text-center text-sm font-semibold text-[#314b63]">{item}</div>
            ))}
          </div>
          <a href="#registration" className="mt-5 inline-flex rounded-full bg-[#cb7413] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#a95f0f]">Apply as City Organizer</a>
        </div>
        <div className="overflow-hidden rounded-3xl border border-[#ebd8b4]">
          <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1777443465/ChatGPT_Image_Apr_29_2026_11_46_53_AM_lhav2n.png" alt="City seva organizer coordinating volunteers and community outreach" className="h-[360px] w-full object-cover object-center" loading="lazy" />
        </div>
      </section>

      <section id="registration" className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <form onSubmit={submit} className="rounded-3xl border border-[#ead8b5] bg-white p-6 shadow-[0_16px_34px_rgba(23,40,66,0.10)] md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c07017]">Registration</p>
          <h2 className="mt-2 text-3xl font-black text-[#1f3550]">Volunteer & Organizer Registration</h2>
          <p className="mt-2 text-sm text-[#5b6874]">Share your details so the trust team can connect you with the right seva opportunity.</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-[#2e4356]">Full Name<input required value={form.fullName} onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e7d7b7] px-3 py-2.5" /></label>
            <label className="text-sm font-semibold text-[#2e4356]">Email Address<input required type="email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e7d7b7] px-3 py-2.5" /></label>
            <label className="text-sm font-semibold text-[#2e4356]">Mobile Number<input required value={form.mobile} onChange={(e) => setForm((s) => ({ ...s, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))} className="mt-1 w-full rounded-xl border border-[#e7d7b7] px-3 py-2.5" /></label>
            <label className="text-sm font-semibold text-[#2e4356]">City / Location<input required value={form.city} onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e7d7b7] px-3 py-2.5" /></label>
            <label className="text-sm font-semibold text-[#2e4356]">Age<input value={form.age} onChange={(e) => setForm((s) => ({ ...s, age: e.target.value.replace(/\D/g, "").slice(0, 3) }))} className="mt-1 w-full rounded-xl border border-[#e7d7b7] px-3 py-2.5" /></label>
            <label className="text-sm font-semibold text-[#2e4356]">Preferred Seva Area
              <select required value={form.preferredSevaArea} onChange={(e) => setForm((s) => ({ ...s, preferredSevaArea: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e7d7b7] px-3 py-2.5">
                <option value="">Select seva area</option>
                <option>Temple Seva</option><option>Ann Seva</option><option>Education Seva</option><option>Healthcare Seva</option><option>Event Seva</option><option>Digital Seva</option><option>City Organizer</option><option>Donor Support</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-[#2e4356]">Availability
              <select required value={form.availability} onChange={(e) => setForm((s) => ({ ...s, availability: e.target.value as Availability }))} className="mt-1 w-full rounded-xl border border-[#e7d7b7] px-3 py-2.5">
                <option value="">Select availability</option><option>Weekdays</option><option>Weekends</option><option>Flexible</option><option>Event-based only</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-[#2e4356] md:col-span-2">Skills / Experience<input value={form.skills} onChange={(e) => setForm((s) => ({ ...s, skills: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e7d7b7] px-3 py-2.5" /></label>
          </div>

          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-[#2e4356]">Contribution Mode</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["Volunteer", "Donor", "Organizer", "Digital Support", "Both Volunteer & Donor"] as ContributionMode[]).map((mode) => (
                <label key={mode} className="rounded-full border border-[#e6d5b4] bg-[#fffaf1] px-3 py-1.5 text-xs font-semibold text-[#43586d]"><input className="mr-2" type="radio" name="contributionMode" checked={form.contributionMode === mode} onChange={() => setForm((s) => ({ ...s, contributionMode: mode }))} />{mode}</label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-[#2e4356]">Join Timeline</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["Immediately", "Within 1 Week", "Within 1 Month", "Later"] as JoinTimeline[]).map((when) => (
                <label key={when} className="rounded-full border border-[#e6d5b4] bg-[#fffaf1] px-3 py-1.5 text-xs font-semibold text-[#43586d]"><input className="mr-2" type="radio" name="joinTimeline" checked={form.timeline === when} onChange={() => setForm((s) => ({ ...s, timeline: when }))} />{when}</label>
              ))}
            </div>
          </fieldset>

          <label className="mt-4 block text-sm font-semibold text-[#2e4356]">Message / Notes<textarea rows={4} value={form.message} onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))} className="mt-1 w-full rounded-xl border border-[#e7d7b7] px-3 py-2.5" /></label>
          <p className="mt-3 text-xs text-[#617184]">Your details will be used only for seva coordination and communication by Bhagwat Heritage Service Foundation Trust.</p>
          {status ? <p className={`mt-3 text-sm font-semibold ${status.type === "success" ? "text-[#1b6f44]" : "text-[#b42318]"}`}>{status.text}</p> : null}
          <button disabled={loading} type="submit" className="mt-4 w-full rounded-full bg-[#cb7413] px-5 py-3 text-sm font-bold text-white hover:bg-[#a95f0f] disabled:opacity-70">{loading ? "Submitting..." : "Submit Seva Interest"}</button>
        </form>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <article className="rounded-3xl border border-[#a6d8dc] bg-gradient-to-r from-[#e8f8fa] to-[#d8f0f2] p-6 text-[#1f4b58]">
          <h2 className="text-2xl font-black">Seva with Discipline, Transparency and Responsibility</h2>
          <p className="mt-2 text-sm leading-7">All seva participation is coordinated through proper communication, role clarity, local responsibility, and respectful teamwork. Volunteers are guided according to their skills, availability, location, and the requirements of each seva activity.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["No forced commitment", "No mandatory donation for volunteering", "Role-based coordination", "Transparent seva communication"].map((point) => (
              <div key={point} className="rounded-2xl border border-[#9ecfd5] bg-white/80 p-3 text-sm font-semibold">{point}</div>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <h2 className="text-3xl font-black text-[#1f3550]">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map(([q, a]) => (
            <details key={q} className="rounded-2xl border border-[#ead8b5] bg-white p-4">
              <summary className="cursor-pointer text-base font-black text-[#1f3550]">{q}</summary>
              <p className="mt-2 text-sm leading-6 text-[#5b6874]">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 pt-11 md:pt-[72px]">
        <div className="relative overflow-hidden rounded-3xl border border-[#ead8b5]">
          <div className="relative bg-gradient-to-r from-[#ffe8a8] via-[#ffd46f] to-[#ffbf47] p-8 text-[#4a2a10] md:p-10">
            <h2 className="text-3xl font-black">Your Time, Skills and Compassion Can Become Seva</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7">Join Bhagwat Heritage Service Foundation Trust and become part of a disciplined movement for devotion, culture, service, and humanity.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={ROUTES.involved.volunteer} className="rounded-full bg-[#d78728] px-5 py-2.5 text-sm font-bold text-white">Join as Volunteer</Link>
              <Link to={ROUTES.donate} className="rounded-full border border-[#7a4a18]/35 bg-white/55 px-5 py-2.5 text-sm font-bold text-[#5b3212]">Support as Donor</Link>
              <a href="#registration" className="rounded-full border border-[#f8dcae] bg-[#f8dcae] px-5 py-2.5 text-sm font-bold text-[#4e3113]">Become City Organizer</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
