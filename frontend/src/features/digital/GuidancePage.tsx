import { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

const mainCols = [
  {
    title: "Spiritual Guidance",
    items: ["Mantra Guidance", "Sadhana Guidance", "Daily Prayer Guidance"],
  },
  {
    title: "Astrology Guidance",
    items: ["Horoscope Consultation", "Gemstone Guidance", "Life Problem Guidance"],
  },
  {
    title: "Vastu Guidance",
    items: ["Home Vastu", "Temple Vastu", "Office / Land Guidance"],
  },
  {
    title: "Mandir & Events",
    items: ["Bhagwat Katha", "Sunday Satsang", "Spiritual Guidance", "Maharudra Guidance"],
  },
  {
    title: "Spiritual / Remedies",
    items: ["Rudraksha Guidance", "Yantra Guidance", "Vedic Puja Anushthan", "Ratna Guidance"],
  },
];

const bottomCols = [
  {
    title: "About",
    items: ["Sanstha Parichay", "Vision & Mission", "Founder", "Objectives"],
  },
  {
    title: "Seva",
    items: ["Gau Seva", "Ann Seva", "Education Support", "Medicine Distribution", "Kanyadaan"],
  },
  {
    title: "Spiritual",
    items: ["Bhagwat Katha", "Sunday Satsang", "Spiritual Guidance", "Vastu Guidance"],
  },
  {
    title: "Mandir & Events",
    items: ["Bhagwat Dham", "Hanuman Page", "Guru Purnima", "Annakut", "Deep Mahotsav"],
  },
  {
    title: "Connect",
    items: ["Contact Form", "Address", "Social Links"],
  },
];

const labelLinks: Record<string, string> = {
  About: ROUTES.about.index,
  Seva: ROUTES.seva.index,
  Spiritual: ROUTES.mission.spiritual,
  "Mandir & Events": ROUTES.eventsKatha.index,
  Connect: ROUTES.involved.contactUs,

  "Spiritual Guidance": ROUTES.digital.guidance,
  "Astrology Guidance": ROUTES.digital.kundli,
  "Vastu Guidance": ROUTES.digital.guidance,
  "Spiritual / Remedies": ROUTES.digital.guidance,
  "Mantra Guidance": ROUTES.digital.guidance,
  "Sadhana Guidance": ROUTES.digital.guidance,
  "Daily Prayer Guidance": ROUTES.digital.guidance,
  "Horoscope Consultation": ROUTES.digital.kundli,
  "Gemstone Guidance": ROUTES.digital.kundli,
  "Life Problem Guidance": ROUTES.digital.guidance,
  "Home Vastu": ROUTES.digital.guidance,
  "Temple Vastu": ROUTES.mandirTeerth.index,
  "Office / Land Guidance": ROUTES.digital.guidance,
  "Bhagwat Katha": ROUTES.eventsKatha.bhagwatKatha,
  "Sunday Satsang": ROUTES.eventsKatha.spiritualEvents,
  "Maharudra Guidance": ROUTES.eventsKatha.dharmikEvents,
  "Rudraksha Guidance": ROUTES.digital.guidance,
  "Yantra Guidance": ROUTES.digital.guidance,
  "Vedic Puja Anushthan": ROUTES.eventsKatha.spiritualEvents,
  "Ratna Guidance": ROUTES.digital.kundli,
  Rudraksha: ROUTES.digital.guidance,
  Gemstones: ROUTES.digital.kundli,
  Yantra: ROUTES.digital.guidance,
  "Puja Samagri": ROUTES.digital.store,

  "Sanstha Parichay": ROUTES.about.sansthaParichay,
  "Vision & Mission": ROUTES.about.visionMission,
  Founder: ROUTES.about.founder,
  Objectives: ROUTES.about.objectives,
  "Gau Seva": ROUTES.seva.gau,
  "Ann Seva": ROUTES.seva.ann,
  "Education Support": ROUTES.seva.education,
  "Medicine Distribution": ROUTES.seva.medicine,
  Kanyadaan: ROUTES.seva.kanyadaan,
  "Bhagwat Dham": ROUTES.mandirTeerth.bhagwatDham,
  "Hanuman Page": ROUTES.mandirTeerth.hanuman,
  "Guru Purnima": ROUTES.eventsKatha.guruPurnima,
  Annakut: ROUTES.eventsKatha.annakut,
  "Deep Mahotsav": ROUTES.eventsKatha.festivals,
  "Contact Form": ROUTES.involved.contactUs,
  Address: ROUTES.involved.contactUs,
  "Social Links": ROUTES.media.socialFeed,

  "Seek Guidance": ROUTES.involved.contactUs,
  "Get Remedies": ROUTES.digital.guidance,
  "Book Rituals": ROUTES.eventsKatha.spiritualEvents,
};

function hrefFor(label: string) {
  return labelLinks[label] ?? ROUTES.digital.guidance;
}

export default memo(function GuidancePage() {
  usePageMeta(
    "Guidance",
    "Guidance navigation for Shri Bhagwat Heritage Service Foundation in a devotional premium layout.",
  );

  return (
    <main className="min-h-screen bg-[#f8f5ef] py-6 text-[#1e3a5f]">
      <section className="mx-auto max-w-[1320px] rounded-[20px] border border-[#e8dcc8] bg-[#fbf8f2] p-4 shadow-[0_18px_34px_rgba(30,58,95,0.08)] md:p-6">
        <header className="rounded-[14px] border border-[#e9decb] bg-[#f7f3ea] px-4 pb-4 pt-3">
          <div className="text-center">
            <p className="font-serif text-4xl font-black tracking-wide text-[#1e3a5f] md:text-5xl">Shri Bhagwat Heritage</p>
            <p className="font-serif text-xl text-[#8a6934] md:text-2xl">Service Foundation</p>
          </div>
        </header>

        <div className="mt-4 rounded-[14px] border border-[#e8dcc8] bg-white/90 p-3">
          <div className="grid gap-3 xl:grid-cols-[1fr_250px]">
            <div className="rounded-xl border border-[#e7dcc8] bg-[#fcfaf5] p-3">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                {mainCols.map((col) => (
                  <article key={col.title} className="border-r border-[#eadfcd] pr-2 last:border-r-0">
                    <h2 className="rounded-lg bg-[#1e3a5f] px-3 py-2 font-serif text-2xl font-bold text-[#f7f2e9]">
                      <Link to={hrefFor(col.title)} className="transition hover:text-[#dcc181]">
                        {col.title}
                      </Link>
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm text-[#2f445b]">
                      {col.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#c89a49]" />
                          <Link to={hrefFor(item)} className="transition hover:text-[#b87925] hover:underline">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {col.title === "Spiritual / Remedies" ? (
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7c5a2a]">Available through Trust:</p>
                        <ul className="mt-2 space-y-1 text-sm text-[#2f445b]">
                          {["Rudraksha", "Gemstones", "Yantra", "Puja Samagri"].map((item) => (
                            <li key={item}>
                              •{" "}
                              <Link to={hrefFor(item)} className="transition hover:text-[#b87925] hover:underline">
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-xl border border-[#e6dac5] bg-[linear-gradient(180deg,#fffdf8_0%,#f5ecdd_100%)] p-4">
              <h3 className="font-serif text-4xl font-black text-[#6f4517]">Problem to Solution</h3>
              <p className="mt-1 text-lg font-semibold text-[#6f4f27]">मार्गदर्शन</p>
              <img
                src="/images/manish2.PNG"
                alt="Spiritual guidance under Sant Shri Manish Bhaiji Maharaj"
                className="mt-3 h-40 w-full rounded-lg border border-[#e9dcc7] object-cover object-top"
                loading="lazy"
              />
              <ul className="mt-3 space-y-2 text-sm text-[#2f445b]">
                {["Seek Guidance", "Get Remedies", "Book Rituals"].map((item) => (
                  <li key={item}>
                    •{" "}
                    <Link to={hrefFor(item)} className="transition hover:text-[#b87925] hover:underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={ROUTES.involved.contactUs}
                className="mt-4 inline-flex w-full justify-center rounded-full bg-gradient-to-r from-[#a8792f] via-[#c8a45d] to-[#dcbc86] px-4 py-2 text-sm font-bold text-white"
              >
                Seek Guidance
              </Link>
            </aside>
          </div>
        </div>

        <div className="mt-4 rounded-[14px] border border-[#e8dcc8] bg-[#fdfaf4] p-3">
          <div className="grid items-start gap-3 lg:grid-cols-[1fr_170px]">
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
              {bottomCols.map((col) => (
                <article key={col.title} className="border-r border-[#eadfcd] px-2 last:border-r-0">
                  <h4 className="font-serif text-4xl font-black text-[#1e3a5f]">
                    <Link to={hrefFor(col.title)} className="transition hover:text-[#b87925]">
                      {col.title}
                    </Link>
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-[#2f445b]">
                    {col.items.map((item) => (
                      <li key={item}>
                        •{" "}
                        <Link to={hrefFor(item)} className="transition hover:text-[#b87925] hover:underline">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="border-l border-[#eadfcd] pl-3">
              <Link
                to={ROUTES.donate}
                className="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-[#a8792f] via-[#c8a45d] to-[#dcbc86] px-4 py-2 text-sm font-bold text-white"
              >
                Donate Now
              </Link>
              <p className="mt-2 text-sm text-[#6f4f27]">
                →{" "}
                <Link to={ROUTES.donate} className="underline-offset-2 hover:underline">
                  Donate Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
});
