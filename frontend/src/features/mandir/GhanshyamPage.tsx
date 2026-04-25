import { memo, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { mandirSevaApi } from "../../services/api/mandirSeva";

type PujaTab = "daily" | "special";
type DirectoryFilter = "All" | "Darshan" | "Puja" | "Satsang" | "Festival" | "Visitor" | "Volunteer" | "Outreach";

type PujaService = {
  title: string;
  amount: string;
  timing: string;
  category: PujaTab;
};

type DirectoryItem = {
  title: string;
  icon: string;
  filter: Exclude<DirectoryFilter, "All">;
  tags: string[];
};

type BookingFormState = {
  fullName: string;
  mobile: string;
  email: string;
  serviceName: string;
  preferredDate: string;
  message: string;
};

const pagePatternStyle = {
  backgroundColor: "#FFF8EC",
  backgroundImage:
    "radial-gradient(circle at 8% 8%, rgba(244,164,60,0.16), transparent 28rem), radial-gradient(circle at 92% 18%, rgba(10,65,101,0.10), transparent 24rem), radial-gradient(circle at 22% 88%, rgba(221,238,219,0.9), transparent 26rem)",
};

const heroChips = ["Daily Darshan", "Aarti Seva", "Satsang Groups", "Mandir Service"];

const quickHighlights = [
  {
    title: "Daily Darshan",
    text: "Experience the sacred presence through daily mandir darshan.",
    icon: "/icons/icon-daily-darshan.svg",
  },
  {
    title: "Satsang Groups",
    text: "Join devotional learning, kirtan, scripture study and satsang circles.",
    icon: "/icons/icon-satsang-group.svg",
  },
  {
    title: "Annual Utsavs",
    text: "Celebrate traditional festivals with devotion and community participation.",
    icon: "/icons/icon-annual-utsav.svg",
  },
  {
    title: "Volunteer Services",
    text: "Serve through mandir operations, pilgrims support, events and seva.",
    icon: "/icons/icon-volunteer-seva.svg",
  },
];

const dailyRhythm = [
  { title: "Morning Darshan", time: "05:15 AM – 06:00 AM" },
  { title: "Morning Aarti", time: "07:00 AM – 07:30 AM" },
  { title: "Midday Darshan", time: "11:30 AM – 12:15 PM" },
  { title: "Evening Aarti", time: "06:30 PM – 07:15 PM" },
  { title: "Night Darshan", time: "08:30 PM – 09:00 PM" },
];

const pujaServices: PujaService[] = [
  { title: "Morning Aarti Puja Service", amount: "₹1,100", timing: "By Booking", category: "daily" },
  { title: "Evening Aarti Puja Service", amount: "₹1,100", timing: "By Booking", category: "daily" },
  { title: "Bal Bhog Service", amount: "₹751", timing: "By Booking", category: "daily" },
  { title: "Rajbhog Service", amount: "₹1,100", timing: "By Booking", category: "daily" },
  { title: "Falahar Bhog Service", amount: "₹501", timing: "By Booking", category: "daily" },
  { title: "Night Bhog Service", amount: "₹1,251", timing: "By Booking", category: "daily" },
  { title: "Thakorji Shringar Vastra Service", amount: "₹1,100", timing: "By Booking", category: "daily" },
  { title: "Maha Abhishek Service", amount: "₹5,100", timing: "By Booking", category: "daily" },
  { title: "Navgraha Peace Ritual", amount: "₹7,100", timing: "By Booking", category: "special" },
  { title: "Nakshatra Peace Ritual", amount: "₹6,100", timing: "By Booking", category: "special" },
  { title: "Birthday Blessing Ritual", amount: "₹3,100", timing: "By Booking", category: "special" },
  { title: "Great Rudra Ritual", amount: "₹5,000", timing: "By Booking", category: "special" },
  { title: "Navchandi Reading", amount: "₹21,000", timing: "By Booking", category: "special" },
  { title: "Ganpati Atharvashirsha Ritual", amount: "₹8,100", timing: "By Booking", category: "special" },
  { title: "Mahamrityunjaya Ritual", amount: "₹5,100", timing: "By Booking", category: "special" },
  { title: "Mahasudarshan Ritual", amount: "₹5,100", timing: "By Booking", category: "special" },
];

const directoryItems: DirectoryItem[] = [
  {
    title: "Daily Darshan and Aarti",
    icon: "/icons/icon-aarti.svg",
    filter: "Darshan",
    tags: ["Morning Darshan", "Afternoon Darshan", "Midday Darshan", "Evening Darshan", "Night Darshan", "Mangala Aarti", "Sandhya Aarti", "Thal Darshan"],
  },
  {
    title: "Scripture and Study",
    icon: "/icons/icon-scripture-study.svg",
    filter: "Satsang",
    tags: ["Vachanamrut Study", "Shikshapatri Reading", "Satsang Jeevan Study", "Bhagavad Gita Reflection", "Kirtan Learning", "Bal Sabha Study", "Ghar Sabha Tools", "Weekly Pravachan"],
  },
  {
    title: "Swaminarayan Devotion",
    icon: "/icons/icon-puja.svg",
    filter: "Puja",
    tags: ["Swaminarayan Mantra Chanting", "Tilak Offering Service", "Flower Offering Service", "Daily Decoration Service", "Garland Seva", "Mala Jap Session", "Dhoop Deep Seva", "Prarthana Sabha"],
  },
  {
    title: "Youth and Children Activities",
    icon: "/icons/icon-youth-satsang.svg",
    filter: "Satsang",
    tags: ["Children's Weekly Meeting", "Teen Weekly Meeting", "Young Men's Satsang", "Young Women's Satsang", "Sanskar Activities", "Shloka Competitions", "Public Speaking", "Volunteer Training"],
  },
  {
    title: "Festival Celebrations",
    icon: "/icons/icon-festival.svg",
    filter: "Festival",
    tags: ["Ram Navami and Swaminarayan Jayanti", "Janmashtami Utsav", "Diwali Annakut Darshan", "Kartik Purnima Deepotsav", "Patotsav", "Fuldol Utsav", "Hindola Utsav", "Jal Jhilani", "Sharad Purnima", "Vasant Panchami", "Rath Yatra Seva", "Ekadashi Mahotsav", "Guru Purnima", "Satsang Shibir", "Shravan Utsav", "Nitya Utsav"],
  },
  {
    title: "Pilgrim and Visitor Services",
    icon: "/icons/icon-pilgrim-service.svg",
    filter: "Visitor",
    tags: ["Guided Darshan Queue", "Wheelchair Assistance", "Senior Citizen Support", "Shoes and Locker Counter", "Water Points", "Medical Desk", "Help Counter", "Lost and Found", "Parking Guidance", "Token System", "Group Entry Support", "Family Waiting Hall", "Prasad Counter", "Travel Guidance", "Accommodation Help", "Clean Facilities"],
  },
  {
    title: "Temple Service Departments",
    icon: "/icons/icon-volunteer-seva.svg",
    filter: "Volunteer",
    tags: ["Temple Cleaning Service", "Prasad Distribution Service", "Parking Service", "Crowd Management Service", "Decoration Service", "Audio Desk", "Festival Support", "Book Stall Seva"],
  },
  {
    title: "Spiritual Guidance",
    icon: "/icons/icon-guidance.svg",
    filter: "Satsang",
    tags: ["Discipline Guidance Session", "Daily Worship Training", "Family Satsang Counselling", "Children's Values Guidance", "Youth Guidance", "Home Satsang Setup", "Prayer Routine Support", "Seva Mentorship"],
  },
  {
    title: "Community Outreach",
    icon: "/icons/icon-community-outreach.svg",
    filter: "Outreach",
    tags: ["Food Relief Drive", "Clothes Distribution", "Blood Donation Camp", "Medical Camp", "Scholarship Support", "School Kit Seva", "Disaster Relief", "Tree Plantation"],
  },
];

const visitCards = [
  {
    title: "Address",
    icon: "/icons/icon-location.svg",
    text: "Bhagwat Dham – Shree Swaminarayan Mandir, Kasturba Rd, Hospital Ward, Chandrapur, Maharashtra 442402",
  },
  {
    title: "Darshan Discipline",
    icon: "/icons/icon-discipline.svg",
    text: "Maintain silence, cleanliness, respectful dress and devotional conduct.",
  },
  {
    title: "Visitor Support",
    icon: "/icons/icon-pilgrim-service.svg",
    text: "Guidance, seating, senior citizen support and basic assistance available.",
  },
  {
    title: "Contact",
    icon: "/icons/icon-contact.svg",
    text: "For seva, satsang and mandir visit assistance, contact the trust office.",
  },
];

const galleryItems = [
  { src: "/images/mandir-teerth/shree-hari-darshan.jpg", caption: "Shree Hari Darshan" },
  { src: "/images/mandir-teerth/mandir-aarti.jpg", caption: "Aarti Darshan" },
  { src: "/images/mandir-teerth/satsang-sabha.jpg", caption: "Satsang Sabha" },
  { src: "/images/mandir-teerth/puja-seva.jpg", caption: "Puja Seva" },
  { src: "/images/mandir-teerth/festival-utsav.jpg", caption: "Festival Utsav" },
  { src: "/images/mandir-teerth/volunteer-seva.jpg", caption: "Volunteer Seva" },
];

const initialForm: BookingFormState = {
  fullName: "",
  mobile: "",
  email: "",
  serviceName: "",
  preferredDate: "",
  message: "",
};

const sectionShellClass = "rounded-[30px] border border-[#E9D9BF] bg-[#FFFDF8] p-5 shadow-[0_16px_38px_rgba(100,72,31,0.10)] md:p-8";
const sectionLabelClass = "text-sm font-black uppercase tracking-[0.16em] text-[#C8751D]";
const sectionHeadingClass = "mt-2 text-[22px] font-black text-[#2B2118] md:text-[28px]";
const sectionBodyClass = "text-base leading-7 text-[#6B5A49] md:text-lg";

export default memo(function GhanshyamPage() {
  const [activeTab, setActiveTab] = useState<PujaTab>("daily");
  const [activeFilter, setActiveFilter] = useState<DirectoryFilter>("All");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formState, setFormState] = useState<BookingFormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  usePageMeta(
    "Bhagwat Dham Swaminarayan Temple | Shree Hari Mandir | Bhagwat Heritage",
    "Visit Bhagwat Dham Swaminarayan Temple in Chandrapur for daily darshan, aarti, puja seva, satsang, spiritual guidance and mandir seva opportunities.",
  );

  const visiblePuja = useMemo(() => pujaServices.filter((service) => service.category === activeTab), [activeTab]);
  const visibleDirectory = useMemo(
    () => (activeFilter === "All" ? directoryItems : directoryItems.filter((item) => item.filter === activeFilter)),
    [activeFilter],
  );

  const openBooking = (serviceName: string) => {
    setSubmitError("");
    setSubmitSuccess("");
    setFormState((prev) => ({ ...prev, serviceName }));
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSubmitError("");
    setSubmitSuccess("");
    setFormState(initialForm);
  };

  const onBookSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    setIsSubmitting(true);

    try {
      await mandirSevaApi.createBooking({
        fullName: formState.fullName,
        mobile: formState.mobile,
        email: formState.email,
        serviceName: formState.serviceName,
        preferredDate: formState.preferredDate,
        message: formState.message,
      });
      setSubmitSuccess("Your seva request has been received. Our team will contact you shortly.");
      setTimeout(closeBooking, 1500);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit booking request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden pb-28 md:pb-12" style={pagePatternStyle}>
      <div className="mx-auto max-w-[1180px] px-4 py-8 md:px-6 md:py-10">
        <section className="relative overflow-hidden rounded-[34px] border border-[#E4D2B6] shadow-[0_24px_60px_rgba(70,48,18,0.24)]">
          <img
            src="/images/mandir-teerth/shree-hari-mandir-hero.jpg"
            alt="Bhagwat Dham Swaminarayan Temple divine darshan ambience"
            className="h-[410px] w-full object-cover md:h-[560px]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(38,23,8,0.72),rgba(12,80,83,0.45),rgba(24,35,58,0.62))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,214,137,0.25),transparent_40%)]" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-center text-white md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F9D59C]">Bhagwat Heritage Service Foundation Trust, Chandrapur</p>
            <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Bhagwat Dham Swaminarayan Temple</h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#F9EAD2] md:text-lg">
              A divine centre for darshan, satsang, seva, sanskar and spiritual living inspired by Shree Swaminarayan Bhagwan.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a href="#plan-visit" className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-[#E39A34] px-5 py-2.5 text-sm font-bold text-[#1B2D48] transition hover:bg-[#CC8522]">
                Plan Your Visit
              </a>
              <button type="button" onClick={() => openBooking("Morning Aarti Puja Service")} className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-[#0F7D81] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0A6B6E]">
                Book Puja Seva
              </button>
              <Link to={ROUTES.involved.index} className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-[#123F66] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0D3150]">
                Join Satsang
              </Link>
              <Link to={`${ROUTES.donate}?purpose=mandir-seva`} className="inline-flex min-w-[190px] items-center justify-center rounded-full bg-[#F2D7A0] px-5 py-2.5 text-sm font-bold text-[#5A3713] transition hover:bg-[#E9C788]">
                Donate for Mandir Seva
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {heroChips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#F9EED9]">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickHighlights.map((item) => (
            <article key={item.title} className="rounded-3xl border border-[#E8D7BC] bg-[#FFF9EF] p-5 shadow-[0_12px_28px_rgba(87,59,24,0.10)]">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#E3CDA5] bg-[#FFF1D9]">
                <img src={item.icon} alt={`${item.title} icon`} className="h-8 w-8" loading="lazy" />
              </div>
              <h3 className="mt-4 text-lg font-black text-[#2B2118]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#685746]">{item.text}</p>
            </article>
          ))}
        </section>

        <section className={`${sectionShellClass} mt-10`}>
          <p className={sectionLabelClass}>Daily Rhythm</p>
          <h2 className={sectionHeadingClass}>Daily Darshan &amp; Aarti Schedule</h2>
          <p className={`${sectionBodyClass} mt-2`}>Structured daily flow for darshan, aarti and bhakti.</p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {dailyRhythm.map((slot) => (
              <article key={slot.title} className="rounded-2xl border border-[#E6D3B5] bg-[#FFF5E4] p-4">
                <h3 className="text-base font-black text-[#205E73]">{slot.title}</h3>
                <p className="mt-1 text-sm font-semibold text-[#5D4530]">{slot.time}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-[#E9D9BF] bg-[#FFFAF2] p-3 text-sm font-medium text-[#73583B]">
            Timings may change during special festivals and utsavs. Please confirm before planning your visit.
          </p>
        </section>

        <section className={`${sectionShellClass} mt-10`}>
          <p className={sectionLabelClass}>Puja Service</p>
          <h2 className={sectionHeadingClass}>Daily Puja and Special Ritual Services</h2>

          <div className="mt-5 hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => setActiveTab("daily")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeTab === "daily" ? "bg-[#0F7D81] text-white" : "border border-[#E6D3B5] bg-[#FFF9EF] text-[#5F4A36] hover:bg-[#FFF2DE]"}`}
            >
              Daily Worship Services
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("special")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeTab === "special" ? "bg-[#0F7D81] text-white" : "border border-[#E6D3B5] bg-[#FFF9EF] text-[#5F4A36] hover:bg-[#FFF2DE]"}`}
            >
              Special Ritual Services
            </button>
          </div>

          <div className="mt-5 hidden grid-cols-1 gap-4 md:grid md:grid-cols-2">
            {visiblePuja.map((service) => (
              <article key={service.title} className="rounded-2xl border border-[#E8D7BC] bg-[#FFF9EF] p-4">
                <h3 className="text-base font-black text-[#2B2118]">{service.title}</h3>
                <p className="mt-1 text-sm text-[#6B5A49]">Timing: {service.timing}</p>
                <p className="mt-1 text-sm font-bold text-[#0E6770]">Suggested Seva: {service.amount}</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => openBooking(service.title)} className="rounded-full bg-[#0F7D81] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0A6B6E]">
                    Book Service
                  </button>
                  <Link to={`${ROUTES.donate}?purpose=mandir-seva&service=${encodeURIComponent(service.title)}`} className="rounded-full border border-[#E3CDA5] bg-[#FFF1D9] px-4 py-2 text-xs font-bold text-[#6C4319] transition hover:bg-[#F8E3B8]">
                    Donate
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 space-y-3 md:hidden">
            <details open className="rounded-2xl border border-[#E8D7BC] bg-[#FFF9EF] p-4">
              <summary className="cursor-pointer text-sm font-black text-[#2B2118]">Daily Worship Services</summary>
              <div className="mt-4 space-y-3">
                {pujaServices
                  .filter((service) => service.category === "daily")
                  .map((service) => (
                    <article key={service.title} className="rounded-xl border border-[#E8D7BC] bg-white p-3">
                      <h3 className="text-sm font-black text-[#2B2118]">{service.title}</h3>
                      <p className="mt-1 text-xs text-[#6B5A49]">Timing: {service.timing}</p>
                      <p className="mt-1 text-xs font-bold text-[#0E6770]">Suggested Seva: {service.amount}</p>
                      <div className="mt-3 flex gap-2">
                        <button type="button" onClick={() => openBooking(service.title)} className="rounded-full bg-[#0F7D81] px-3 py-1.5 text-[11px] font-bold text-white">
                          Book Service
                        </button>
                        <Link to={`${ROUTES.donate}?purpose=mandir-seva&service=${encodeURIComponent(service.title)}`} className="rounded-full border border-[#E3CDA5] bg-[#FFF1D9] px-3 py-1.5 text-[11px] font-bold text-[#6C4319]">
                          Donate
                        </Link>
                      </div>
                    </article>
                  ))}
              </div>
            </details>

            <details className="rounded-2xl border border-[#E8D7BC] bg-[#FFF9EF] p-4">
              <summary className="cursor-pointer text-sm font-black text-[#2B2118]">Special Ritual Services</summary>
              <div className="mt-4 space-y-3">
                {pujaServices
                  .filter((service) => service.category === "special")
                  .map((service) => (
                    <article key={service.title} className="rounded-xl border border-[#E8D7BC] bg-white p-3">
                      <h3 className="text-sm font-black text-[#2B2118]">{service.title}</h3>
                      <p className="mt-1 text-xs text-[#6B5A49]">Timing: {service.timing}</p>
                      <p className="mt-1 text-xs font-bold text-[#0E6770]">Suggested Seva: {service.amount}</p>
                      <div className="mt-3 flex gap-2">
                        <button type="button" onClick={() => openBooking(service.title)} className="rounded-full bg-[#0F7D81] px-3 py-1.5 text-[11px] font-bold text-white">
                          Book Service
                        </button>
                        <Link to={`${ROUTES.donate}?purpose=mandir-seva&service=${encodeURIComponent(service.title)}`} className="rounded-full border border-[#E3CDA5] bg-[#FFF1D9] px-3 py-1.5 text-[11px] font-bold text-[#6C4319]">
                          Donate
                        </Link>
                      </div>
                    </article>
                  ))}
              </div>
            </details>
          </div>
        </section>

        <section className={`${sectionShellClass} mt-10`}>
          <p className={sectionLabelClass}>Service Directory</p>
          <h2 className={sectionHeadingClass}>Swaminarayan Service and Satsang Grid</h2>
          <p className={`${sectionBodyClass} mt-2`}>Explore daily seva, learning, festival, pilgrim and community service opportunities.</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {(["All", "Darshan", "Puja", "Satsang", "Festival", "Visitor", "Volunteer", "Outreach"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition ${activeFilter === filter ? "bg-[#0F7D81] text-white" : "border border-[#E6D3B5] bg-[#FFF9EF] text-[#5F4A36] hover:bg-[#FFF2DE]"}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleDirectory.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#E8D7BC] bg-[#FFF9EF] p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2C899] bg-[#FFF1D9]">
                    <img src={item.icon} alt={`${item.title} icon`} className="h-5 w-5" loading="lazy" />
                  </span>
                  <h3 className="text-base font-black text-[#2B2118]">{item.title}</h3>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-full border border-[#E6D3B5] bg-white px-2.5 py-1 text-xs text-[#6A5947]">
                      {tag}
                    </span>
                  ))}
                  <span className="rounded-full border border-[#E6D3B5] bg-[#FFF1D9] px-2.5 py-1 text-xs font-semibold text-[#79521F]">+{Math.max(item.tags.length - 4, 0)} more</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="plan-visit" className={`${sectionShellClass} mt-10`}>
          <p className={sectionLabelClass}>Visit Support</p>
          <h2 className={sectionHeadingClass}>Plan Your Visit</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {visitCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-[#E8D7BC] bg-[#FFF9EF] p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2C899] bg-[#FFF1D9]">
                    <img src={card.icon} alt={`${card.title} icon`} className="h-5 w-5" loading="lazy" />
                  </span>
                  <h3 className="text-base font-black text-[#2B2118]">{card.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#6A5947]">{card.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E6D3B5] shadow-[0_12px_28px_rgba(87,59,24,0.10)]">
            <iframe
              title="Bhagwat Dham Swaminarayan Mandir location map"
              src="https://maps.google.com/maps?q=Bhagwat%20Dham%20Shree%20Swaminarayan%20Mandir%20Kasturba%20Rd%20Chandrapur&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className={`${sectionShellClass} mt-10`}>
          <p className={sectionLabelClass}>Temple Experience</p>
          <h2 className={sectionHeadingClass}>Temple Experience</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <article key={item.caption} className="group overflow-hidden rounded-2xl border border-[#E8D7BC] bg-[#FFF9EF]">
                <div className="overflow-hidden">
                  <img src={item.src} alt={item.caption} loading="lazy" className="h-48 w-full object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <p className="px-4 py-3 text-sm font-semibold text-[#5A4732]">{item.caption}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative mt-10 overflow-hidden rounded-[30px] border border-[#E5D1AF]">
          <img src="/images/mandir-teerth/mandir-cta-banner.jpg" alt="Devotional mandir blessings atmosphere" className="h-[280px] w-full object-cover md:h-[320px]" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(38,23,8,0.7),rgba(12,80,83,0.45),rgba(24,35,58,0.56))]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
            <h2 className="text-2xl font-black md:text-4xl">Receive Shree Swaminarayan Bhagwan&apos;s Blessings</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#F8EACE] md:text-lg">
              Join daily darshan, scripture study, satsang sabha and seva initiatives to build spiritual discipline and a value-centred life rooted in Swaminarayan teachings.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => openBooking("Morning Aarti Puja Service")} className="rounded-full bg-[#E39A34] px-5 py-2.5 text-sm font-bold text-[#1B2D48] transition hover:bg-[#CB8521]">
                Register for Service
              </button>
              <Link to={`${ROUTES.donate}?purpose=mandir-seva`} className="rounded-full bg-[#0F7D81] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0A6B6E]">
                Donate for Mandir Seva
              </Link>
              <Link to={ROUTES.involved.index} className="rounded-full bg-[#123F66] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0D3150]">
                Join Satsang
              </Link>
            </div>
          </div>
        </section>
      </div>

      {isBookingOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1A1A]/55 p-4" role="dialog" aria-modal="true" aria-label="Book Puja Service">
          <div className="w-full max-w-xl rounded-3xl border border-[#E8D7BC] bg-[#FFFBF4] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)] md:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={sectionLabelClass}>Book Seva</p>
                <h2 className="mt-1 text-xl font-black text-[#2B2118] md:text-2xl">Puja / Seva Booking Request</h2>
              </div>
              <button type="button" onClick={closeBooking} className="rounded-full border border-[#E6D3B5] bg-white px-3 py-1 text-xs font-bold text-[#634A34]">
                Close
              </button>
            </div>

            <form className="mt-5 space-y-3" onSubmit={onBookSubmit}>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="text-sm font-semibold text-[#5D4A36]">
                  Full Name
                  <input
                    required
                    value={formState.fullName}
                    onChange={(event) => setFormState((prev) => ({ ...prev, fullName: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-[#E6D3B5] bg-white px-3 py-2 text-sm outline-none focus:border-[#0F7D81]"
                  />
                </label>
                <label className="text-sm font-semibold text-[#5D4A36]">
                  Mobile Number
                  <input
                    required
                    value={formState.mobile}
                    onChange={(event) => setFormState((prev) => ({ ...prev, mobile: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-[#E6D3B5] bg-white px-3 py-2 text-sm outline-none focus:border-[#0F7D81]"
                  />
                </label>
                <label className="text-sm font-semibold text-[#5D4A36]">
                  Email
                  <input
                    required
                    type="email"
                    value={formState.email}
                    onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-[#E6D3B5] bg-white px-3 py-2 text-sm outline-none focus:border-[#0F7D81]"
                  />
                </label>
                <label className="text-sm font-semibold text-[#5D4A36]">
                  Preferred Date
                  <input
                    required
                    type="date"
                    value={formState.preferredDate}
                    onChange={(event) => setFormState((prev) => ({ ...prev, preferredDate: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-[#E6D3B5] bg-white px-3 py-2 text-sm outline-none focus:border-[#0F7D81]"
                  />
                </label>
              </div>

              <label className="block text-sm font-semibold text-[#5D4A36]">
                Puja / Seva Name
                <input
                  required
                  value={formState.serviceName}
                  onChange={(event) => setFormState((prev) => ({ ...prev, serviceName: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-[#E6D3B5] bg-white px-3 py-2 text-sm outline-none focus:border-[#0F7D81]"
                />
              </label>

              <label className="block text-sm font-semibold text-[#5D4A36]">
                Message / Sankalp
                <textarea
                  value={formState.message}
                  onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-[#E6D3B5] bg-white px-3 py-2 text-sm outline-none focus:border-[#0F7D81]"
                />
              </label>

              {submitError ? <p className="rounded-xl bg-[#FFE7D9] px-3 py-2 text-sm font-semibold text-[#9A3F07]">{submitError}</p> : null}
              {submitSuccess ? <p className="rounded-xl bg-[#E2F5EC] px-3 py-2 text-sm font-semibold text-[#0E6C4D]">{submitSuccess}</p> : null}

              <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-[#0F7D81] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0A6B6E] disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E2CDA8] bg-[#FFF8ED] p-3 shadow-[0_-8px_20px_rgba(74,50,20,0.12)] md:hidden">
        <div className="mx-auto flex max-w-[1180px] gap-2">
          <button type="button" onClick={() => openBooking("Morning Aarti Puja Service")} className="flex-1 rounded-full bg-[#0F7D81] px-3 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white">
            Book Puja
          </button>
          <Link to={`${ROUTES.donate}?purpose=mandir-seva`} className="flex-1 rounded-full bg-[#E39A34] px-3 py-2.5 text-center text-xs font-bold uppercase tracking-[0.08em] text-[#2B2118]">
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
});

