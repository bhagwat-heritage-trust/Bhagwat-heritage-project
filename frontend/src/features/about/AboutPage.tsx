import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type DirectionCard = { icon: string; title: string; text: string };
type ServiceCard = { icon: string; title: string; text: string; href: string };
type TimelineItem = { title: string; text: string; icon: string };
type FutureCard = { icon: string; title: string; text: string };

const directionCards: DirectionCard[] = [
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536354/ChatGPT_Image_Apr_30_2026_01_32_28_PM_akdenf.png",
    title: "Spiritual Society",
    text: "To inspire a society rooted in devotion, purity, discipline, compassion, and spiritual awareness.",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536354/ChatGPT_Image_Apr_30_2026_01_32_37_PM_aex7y7.png",
    title: "Inner Clarity & Peace",
    text: "To guide individuals toward inner strength, peace, values, and purposeful living through Bhagwat wisdom.",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536354/ChatGPT_Image_Apr_30_2026_01_32_43_PM_sowddo.png",
    title: "Long-Term Growth",
    text: "To build sustainable spiritual, cultural, educational, and seva-based initiatives for future generations.",
  },
];

const valueItems = [
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967402/g5_ilegzw.png", title: "Devotion", text: "Keeping Bhagwat bhakti at the center of life and service." },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777483222/ChatGPT_Image_Apr_29_2026_10_49_49_PM_f6hqjr.png", title: "Seva", text: "Serving society selflessly with humility, discipline, and consistency." },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193612/ChatGPT_Image_Apr_26_2026_01_44_18_PM_ek3p4y.png", title: "Sanskar", text: "Nurturing value-based living in families, youth, and communities." },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777193608/ChatGPT_Image_Apr_26_2026_01_45_08_PM_v3dyke.png", title: "Compassion", text: "Responding to every need with sensitivity and heartfelt support." },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029119/ChatGPT_Image_Apr_24_2026_04_39_27_PM_e5yys0.png", title: "Transparency", text: "Maintaining clear communication and responsible trust practices." },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_43_12_PM_ark4ok.png", title: "Cultural Pride", text: "Preserving and celebrating Sanatan heritage with dignity." },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032971/ChatGPT_Image_Apr_24_2026_05_43_04_PM_xi8530.png", title: "Spiritual Discipline", text: "Encouraging regular sadhana, learning, and right conduct." },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029120/ChatGPT_Image_Apr_24_2026_04_38_45_PM_xsljmo.png", title: "Universal Welfare", text: "Working for the wellbeing of all with inclusive seva spirit." },
];

const services: ServiceCard[] = [
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777215185/ChatGPT_Image_Apr_26_2026_08_21_35_PM_vpi1qj.png", title: "Bhagwat Katha", text: "Spreading divine wisdom through Bhagwat Katha and spiritual discourses.", href: ROUTES.eventsKatha.bhagwatKatha },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776880621/ChatGPT_Image_Apr_22_2026_11_25_30_PM_i6q6qj.png", title: "Gau Seva", text: "Serving and protecting cows through compassionate care and awareness.", href: ROUTES.seva.gau },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_42_51_PM_rxxuvx.png", title: "Ann Seva", text: "Offering food support to devotees, needy families, and community gatherings.", href: ROUTES.seva.ann },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776888501/ChatGPT_Image_Apr_23_2026_01_37_00_AM_yvrlwv.png", title: "Jal Seva", text: "Supporting water service initiatives for public welfare.", href: ROUTES.seva.jal },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777215185/ChatGPT_Image_Apr_26_2026_08_21_45_PM_t3c0vd.png", title: "Education Support", text: "Encouraging learning, sanskar, scholarships, and value-based education.", href: ROUTES.seva.education },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776973581/ChatGPT_Image_Apr_24_2026_01_06_36_AM_j1fxyl.png", title: "Medical Seva", text: "Supporting health camps, medicine distribution, and wellness initiatives.", href: ROUTES.seva.medicine },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032972/ChatGPT_Image_Apr_24_2026_05_43_12_PM_ark4ok.png", title: "Cultural Events", text: "Organising festivals, family-value programs, and cultural gatherings.", href: ROUTES.eventsKatha.festivals },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777032975/ChatGPT_Image_Apr_24_2026_05_42_35_PM_hwotsz.png", title: "Youth & Family Sanskar", text: "Guiding youth and families through values, discipline, and spiritual learning.", href: ROUTES.knowledge.children },
  { icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777029119/ChatGPT_Image_Apr_24_2026_04_39_27_PM_e5yys0.png", title: "Digital Knowledge", text: "Creating digital platforms for e-library, e-pathshala, satsang, and study resources.", href: ROUTES.knowledge.studyResources },
];

const timelineItems: TimelineItem[] = [
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967404/g2_mi705n.png",
    title: "Foundation of Vision",
    text: "The spiritual vision of service, devotion, and cultural preservation began with the inspiration to connect society with Bhagwat wisdom.",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777097560/ChatGPT_Image_Apr_25_2026_11_41_57_AM_wsv00f.png",
    title: "Bhagwat Katha & Satsang",
    text: "Spiritual discourses and satsang initiatives created a living connection with devotion and dharma.",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777483222/ChatGPT_Image_Apr_29_2026_10_49_49_PM_f6hqjr.png",
    title: "Seva Expansion",
    text: "Service areas such as ann seva, gau seva, education support, medical support, and cultural programs expanded.",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g7_kplr1h.png",
    title: "Digital Outreach",
    text: "Digital platforms were planned to reach devotees, youth, families, and global seekers.",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g6_sxiq7h.png",
    title: "Global Mission",
    text: "The Trust now moves toward a wider national and international spiritual-cultural service mission.",
  },
];

const futureCards: FutureCard[] = [
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1777536352/ChatGPT_Image_Apr_30_2026_01_33_04_PM_auxasy.png",
    title: "Spiritual Centres",
    text: "To develop spaces for satsang, Bhagwat study, seva, cultural programs, and spiritual guidance.",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967404/g1_pigiqf.png",
    title: "Digital & Global Outreach",
    text: "To build online platforms, e-learning systems, digital libraries, and global spiritual communities.",
  },
  {
    icon: "https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g10_db02lr.png",
    title: "Divine Society",
    text: "To inspire a society rooted in devotion, compassion, family values, service, and dharma.",
  },
];

export default memo(function AboutPage() {
  usePageMeta(
    "About Bhagwat Heritage Service Foundation Trust | Spiritual & Seva Mission",
    "Learn about Bhagwat Heritage Service Foundation Trust, its spiritual mission, seva programs, cultural vision, and divine inspiration under Sant Shri Manish Bhaiji Maharaj.",
  );

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="spiritual-mission-page bg-[linear-gradient(180deg,#fffaf2_0%,#fffdf9_50%,#f8efe2_100%)] font-['Poppins'] text-[#1f4d5a]">
      <section
        className="relative mx-auto mt-6 h-[360px] w-full max-w-[1180px] overflow-hidden rounded-b-[2rem] rounded-t-[2rem] sm:h-[420px] lg:h-[520px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,28,37,0.22) 0%, rgba(10,28,37,0.75) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1777536482/ChatGPT_Image_Apr_30_2026_01_32_01_PM_swrmko.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,170,61,0.32),transparent_45%)]" />
        <div className="relative mx-auto flex h-full max-w-[1180px] flex-col items-center justify-end px-5 pb-8 text-center text-white sm:pb-10 lg:pb-12">
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link to={ROUTES.seva.index} className="about-btn-primary w-full sm:w-auto">
              Explore Our Seva
            </Link>
            <Link to={ROUTES.involved.index} className="about-btn-secondary w-full sm:w-auto">
              Join the Mission
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1180px] px-4 py-12 sm:py-16">
        <section data-reveal className="reveal-block mb-14 sm:mb-20">
          <div className="mb-6 text-center">
            <p className="about-label">Introduction</p>
            <h2 className="about-h2">A Vision Rooted in Devotion and Service</h2>
          </div>
          <div className="grid items-stretch gap-7 rounded-3xl border border-[#edd8ba] bg-[#fffdf9] p-4 shadow-[0_20px_42px_rgba(98,74,42,0.08)] md:grid-cols-2 md:p-8">
            <div data-reveal className="reveal-block zoom-in overflow-hidden rounded-2xl">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777536352/ChatGPT_Image_Apr_30_2026_01_32_22_PM_g67cdg.png"
                alt="Lord Krishna and Arjuna in a spiritual battlefield scene"
                className="h-full min-h-[280px] w-full object-cover"
              />
            </div>
            <div className="rounded-2xl bg-[linear-gradient(180deg,#fff8eb_0%,#fffdf7_100%)] p-5 sm:p-7 md:h-full">
              <div className="flex h-full flex-col">
                <p className="about-body">
                  Bhagwat Heritage Service Foundation Trust is a spiritual, cultural, and service-oriented initiative created to preserve the sacred wisdom of Shrimad Bhagwat Mahapuran, strengthen Indian cultural values, and serve society through compassionate action.
                </p>
                <p className="about-body mt-4">
                  The Trust works to connect people with devotion, dharma, seva, sanskar, and spiritual learning while creating meaningful opportunities for individuals, families, youth, and communities to participate in noble service.
                </p>
                <Link to={ROUTES.seva.index} className="about-btn-primary mt-6 inline-flex md:mt-auto">
                  View Our Programs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section data-reveal className="reveal-block mb-14 sm:mb-20">
          <div className="rounded-3xl border border-[#e8d6bb] bg-[#fff8ef] p-8 text-center shadow-[0_16px_36px_rgba(106,74,36,0.08)]">
            <p className="about-label">Who We Are</p>
            <h2 className="about-h2 mt-2">Preserving Heritage, Connecting Devotion, Serving Humanity</h2>
            <p className="about-body mx-auto mt-5 max-w-4xl">
              We are a spiritual and humanitarian trust committed to nurturing devotion, spreading Bhagwat wisdom, supporting social welfare, and reviving cultural values for the present and future generations.
            </p>
            <p className="about-body mx-auto mt-3 max-w-4xl">
              Our work brings together devotees, volunteers, scholars, families, youth, donors, and community leaders to build a spiritually awakened and socially responsible society.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <span className="about-chip">Spiritual Wisdom</span>
              <span className="about-chip">Cultural Heritage</span>
              <span className="about-chip">Humanitarian Seva</span>
            </div>
          </div>
        </section>

        <section data-reveal className="reveal-block mb-14 sm:mb-20">
          <div className="mb-6 text-center">
            <p className="about-label">Our Direction</p>
            <h2 className="about-h2">The vision of the foundation</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {directionCards.map((card) => (
              <article key={card.title} className="about-card-lift rounded-2xl border border-[#ebd4b1] bg-white p-6 text-center shadow-[0_12px_28px_rgba(78,57,30,0.08)]">
                <img src={card.icon} alt="" aria-hidden="true" className="mx-auto h-[78px] w-[78px] rounded-full object-cover" />
                <h3 className="mt-4 text-xl font-bold text-[#1f4d5a]">{card.title}</h3>
                <p className="about-body mt-3">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section data-reveal className="reveal-block mb-14 sm:mb-20">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-[#eacfa6] bg-[linear-gradient(180deg,#fff7e7_0%,#fffdf6_100%)] p-7 shadow-[0_12px_28px_rgba(88,65,35,0.08)]">
              <p className="about-label">Our Vision</p>
              <h2 className="mt-3 text-2xl font-black text-[#205062]">To establish a spiritually awakened, culturally rooted, and service-driven society.</h2>
              <p className="about-body mt-4">
                Our vision is to revive the timeless values of Sanatan Dharma and Bhagwat wisdom in a way that inspires devotion, strengthens families, guides youth, and serves humanity.
              </p>
            </article>
            <article className="rounded-3xl border border-[#cfe4e3] bg-[linear-gradient(180deg,#ecf7f6_0%,#fffdf8_100%)] p-7 shadow-[0_12px_28px_rgba(33,84,92,0.10)]">
              <p className="about-label">Our Mission</p>
              <h2 className="mt-3 text-2xl font-black text-[#205062]">The inspiration behind the mission</h2>
              <p className="about-body mt-4">
                To spread the divine message of Shrimad Bhagwat, promote devotion, support social service, preserve Indian culture, and create accessible platforms for spiritual learning and humanitarian seva.
              </p>
            </article>
          </div>
          <div className="mt-7 text-center">
            <Link to={ROUTES.mission.index} className="about-btn-primary inline-flex">
              Understand Our Philosophy
            </Link>
          </div>
        </section>

        <section data-reveal className="reveal-block mb-14 sm:mb-20">
          <div className="mb-6 text-center">
            <p className="about-label">Our Core Values</p>
            <h2 className="about-h2">Our Core Values</h2>
          </div>
          <div className="grid gap-7 md:grid-cols-2">
            <div data-reveal className="reveal-block zoom-in overflow-hidden rounded-2xl border border-[#e3d2b6] bg-white p-3 shadow-[0_12px_28px_rgba(77,58,34,0.08)]">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1777536353/ChatGPT_Image_Apr_30_2026_01_33_11_PM_cakuy1.png"
                alt="Devotees performing seva and community support activities"
                className="h-full min-h-[300px] w-full rounded-xl object-cover"
              />
            </div>
            <div className="rounded-2xl border border-[#e3d2b6] bg-white p-5 shadow-[0_12px_28px_rgba(77,58,34,0.08)] sm:p-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {valueItems.map((item) => (
                  <li key={item.title} className="rounded-xl bg-[#fff8ed] p-3 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <img src={item.icon} alt="" aria-hidden="true" className="h-[62px] w-[62px] rounded-full object-cover" />
                      <h3 className="text-base font-bold text-[#1f4d5a]">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#4e463d]">{item.text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to={ROUTES.involved.volunteer} className="about-btn-primary text-center">
                  Join as Volunteer
                </Link>
                <Link to={ROUTES.donate} className="about-btn-secondary text-center">
                  Support Seva
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section data-reveal className="reveal-block mb-14 sm:mb-20">
          <div className="mb-7 text-center">
            <p className="about-label">What We Do</p>
            <h2 className="about-h2">Major areas of service and spiritual work</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="about-card-lift rounded-2xl border border-[#e8d4b6] bg-white p-5 text-center shadow-[0_10px_24px_rgba(92,64,31,0.08)]">
                <img src={service.icon} alt="" aria-hidden="true" className="mx-auto h-[74px] w-[74px] rounded-full object-cover" />
                <h3 className="mt-4 text-xl font-bold text-[#1f4d5a]">{service.title}</h3>
                <p className="about-body mt-3">{service.text}</p>
                <Link to={service.href} className="mt-4 inline-flex text-sm font-semibold text-[#c8771e] underline-offset-4 hover:underline">
                  Learn More
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section data-reveal className="reveal-block mb-14 sm:mb-20">
          <div className="grid gap-7 rounded-3xl border border-[#efcf9f] bg-[linear-gradient(180deg,#fff1d9_0%,#fffaf0_100%)] p-5 shadow-[0_14px_34px_rgba(191,120,38,0.14)] md:grid-cols-2 md:p-8">
            <div data-reveal className="reveal-block zoom-in overflow-hidden rounded-2xl">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583725/manish2_mzstc3.png"
                alt="Sant Shri Manish Bhaiji Maharaj portrait"
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>
            <div>
              <p className="about-label">Guided by Divine Inspiration</p>
              <h2 className="about-h2 mt-2">Sant Shri Manish Bhaiji Maharaj</h2>
              <p className="about-body mt-4">
                Under the spiritual inspiration and guidance of Sant Shri Manish Bhaiji Maharaj, Bhagwat Heritage Service Foundation Trust seeks to connect people with Bhagwat bhakti, Sanatan values, selfless service, and a life of spiritual purpose.
              </p>
              <p className="about-body mt-3">
                His guidance inspires the Trust to work for devotion, cultural revival, youth awakening, family harmony, and compassionate service for all.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to={ROUTES.about.founderAlias} className="about-btn-primary text-center">
                  Know More
                </Link>
                <Link to={ROUTES.contact} className="about-btn-secondary text-center">
                  Invite for Guidance
                </Link>
                <Link to={ROUTES.digital.satsang} className="about-btn-secondary text-center">
                  Watch Satsang
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          data-reveal
          className="reveal-block mb-14 rounded-3xl border border-[#e8d4b1] bg-white p-5 shadow-[0_12px_30px_rgba(92,64,31,0.08)] sm:mb-20 sm:p-8"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,252,246,0.96) 100%), url('/images/about-journey-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mb-8 text-center">
            <p className="about-label">Our Journey</p>
            <h2 className="about-h2">Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-[2px] bg-[#efc789] md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-5">
              {timelineItems.map((item, index) => (
                <article
                  key={item.title}
                  className={`relative ml-10 rounded-2xl border border-[#ecd5b5] bg-[#fffdf9] p-5 shadow-[0_8px_22px_rgba(79,54,27,0.08)] md:ml-0 md:w-[calc(50%-20px)] ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <span className="absolute -left-8 top-5 flex h-[66px] w-[66px] items-center justify-center md:left-auto md:right-[-36px]">
                    <img src={item.icon} alt="" aria-hidden="true" className="h-[66px] w-[66px] rounded-full object-cover" />
                  </span>
                  <h3 className="text-lg font-bold text-[#1f4d5a]">{item.title}</h3>
                  <p className="about-body mt-2">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-reveal className="reveal-block mb-14 sm:mb-20">
          <div className="mb-7 text-center">
            <p className="about-label">Looking Ahead</p>
            <h2 className="about-h2">Vision for the Future</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {futureCards.map((card) => (
              <article key={card.title} className="about-card-lift rounded-2xl border border-[#d5e7e6] bg-[linear-gradient(180deg,#ecf7f6_0%,#fffdf8_100%)] p-6 text-center shadow-[0_10px_24px_rgba(35,86,96,0.09)]">
                <img src={card.icon} alt="" aria-hidden="true" className="mx-auto h-[74px] w-[74px] rounded-full object-cover" />
                <h3 className="mt-4 text-xl font-bold text-[#1f4d5a]">{card.title}</h3>
                <p className="about-body mt-3">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section data-reveal className="reveal-block mb-14 sm:mb-20">
          <div className="rounded-3xl border border-[#e6d2b4] bg-[#fff9f0] p-6 shadow-[0_10px_26px_rgba(95,68,34,0.09)] sm:p-8">
            <div className="text-center">
              <p className="about-label">Trust, Transparency & Responsibility</p>
              <h2 className="about-h2">Trust, Transparency & Responsibility</h2>
            </div>
            <p className="about-body mx-auto mt-5 max-w-4xl text-center">
              Bhagwat Heritage Service Foundation Trust believes in responsible service, transparent communication, and accountable development of every seva initiative. Every contribution, volunteer effort, and community program is treated as sacred trust.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-white p-4 text-center shadow-[0_8px_20px_rgba(95,68,34,0.08)]">
                <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1776967402/g5_ilegzw.png" alt="" aria-hidden="true" className="mx-auto h-[62px] w-[62px] rounded-full object-cover" />
                <h3 className="mt-2 text-base font-bold text-[#1f4d5a]">Clear Seva Purpose</h3>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-[0_8px_20px_rgba(95,68,34,0.08)]">
                <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g11_rjbuul.png" alt="" aria-hidden="true" className="mx-auto h-[62px] w-[62px] rounded-full object-cover" />
                <h3 className="mt-2 text-base font-bold text-[#1f4d5a]">Responsible Management</h3>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-[0_8px_20px_rgba(95,68,34,0.08)]">
                <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g10_db02lr.png" alt="" aria-hidden="true" className="mx-auto h-[62px] w-[62px] rounded-full object-cover" />
                <h3 className="mt-2 text-base font-bold text-[#1f4d5a]">Community Participation</h3>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-[0_8px_20px_rgba(95,68,34,0.08)]">
                <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1776967401/g7_kplr1h.png" alt="" aria-hidden="true" className="mx-auto h-[62px] w-[62px] rounded-full object-cover" />
                <h3 className="mt-2 text-base font-bold text-[#1f4d5a]">Transparent Communication</h3>
              </div>
            </div>
            <div className="mt-7 text-center">
              <Link to={ROUTES.about.activities} className="about-btn-secondary inline-flex">
                View Trust Activities
              </Link>
            </div>
          </div>
        </section>

        <section data-reveal className="reveal-block mb-14 sm:mb-20">
          <div className="rounded-3xl border border-[#d8e5e5] bg-[linear-gradient(180deg,#ecf7f6_0%,#fffdf8_100%)] p-6 text-center shadow-[0_10px_24px_rgba(30,75,82,0.09)] sm:p-8">
            <p className="about-label">Open to All</p>
            <h2 className="about-h2">Open to All</h2>
            <p className="about-body mx-auto mt-5 max-w-4xl">
              The Trust welcomes devotees, volunteers, families, youth, scholars, donors, cultural institutions, social organizations, and global well-wishers to participate in this mission of devotion, service, and heritage preservation.
            </p>
            <p className="mt-4 text-base font-bold text-[#c8771e] md:text-lg">Together, we can preserve Sanatan values and serve humanity with devotion.</p>
          </div>
        </section>

        <section
          data-reveal
          className="reveal-block rounded-3xl border border-[#efcd9a] p-6 text-center shadow-[0_12px_28px_rgba(168,101,24,0.15)] sm:p-10"
          style={{
            backgroundImage: "linear-gradient(135deg, #fff3bf 0%, #ffe08a 52%, #ffd05a 100%)",
          }}
        >
          <h2 className="text-3xl font-black text-[#1f3550] md:text-4xl">Join the Mission of Devotion, Service & Spiritual Awakening</h2>
          <p className="about-body mx-auto mt-4 max-w-3xl">
            Become part of a sacred movement dedicated to Bhagwat wisdom, cultural heritage, seva, and global spiritual upliftment.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link to={ROUTES.involved.volunteer} className="about-btn-primary text-center">
              Become a Volunteer
            </Link>
            <Link to={ROUTES.donate} className="about-btn-secondary text-center">
              Support the Mission
            </Link>
            <Link to={ROUTES.seva.index} className="about-btn-secondary text-center">
              Explore Seva Programs
            </Link>
          </div>
        </section>
      </main>

      <style>{`
        .about-label {
          color: #7a4f16;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .about-h2 {
          color: #3f3123;
          font-size: 14px;
          font-weight: 900;
          line-height: 1.2;
          margin-top: 0.5rem;
        }
        @media (min-width: 768px) {
          .about-h2 {
            font-size: 20px;
          }
        }
        .about-body {
          color: #6b5a48;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.75;
        }
        @media (min-width: 768px) {
          .about-body {
            font-size: 18px;
          }
        }
        .about-chip {
          border: 1px solid #e9d2ad;
          background: #fffdf9;
          border-radius: 999px;
          color: #6b5a48;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.75;
          padding: 0.5rem 1rem;
        }
        .about-btn-primary {
          background: linear-gradient(180deg, #f0ae57 0%, #df8e2f 100%);
          border: 1px solid #dc8a2d;
          border-radius: 0.8rem;
          color: #fffdf8;
          font-size: 0.95rem;
          font-weight: 800;
          padding: 0.72rem 1.1rem;
          transition: transform 240ms ease, box-shadow 240ms ease, filter 240ms ease;
          box-shadow: 0 12px 24px rgba(181, 111, 26, 0.22);
        }
        .about-btn-secondary {
          background: #fffdf8;
          border: 1px solid #e4c79f;
          border-radius: 0.8rem;
          color: #1f4d5a;
          font-size: 0.95rem;
          font-weight: 800;
          padding: 0.72rem 1.1rem;
          transition: transform 240ms ease, box-shadow 240ms ease, background-color 240ms ease;
          box-shadow: 0 10px 22px rgba(82, 61, 34, 0.1);
        }
        .about-btn-primary:focus-visible,
        .about-btn-secondary:focus-visible {
          outline: 3px solid #1f4d5a;
          outline-offset: 2px;
        }
        .about-btn-primary:hover,
        .about-btn-secondary:hover {
          transform: translateY(-2px);
        }
        .about-btn-secondary:hover {
          background: #fff3de;
        }
        .about-card-lift {
          transition: transform 260ms ease, box-shadow 260ms ease;
        }
        .about-card-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 34px rgba(92, 64, 31, 0.16);
        }
        .reveal-block[data-reveal] {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 600ms ease, transform 700ms ease;
        }
        .reveal-block[data-reveal].zoom-in {
          transform: scale(0.96);
        }
        .reveal-block[data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>
    </div>
  );
});
