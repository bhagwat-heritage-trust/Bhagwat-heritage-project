import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

export default memo(function FestivalsCelebrationsDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  usePageMeta(
    "Festival Details | Bhagwat Heritage Service Foundation",
    "Festival details page placeholder for Bhagwat Heritage annual temple festivals and celebrations.",
  );

  return (
    <main className="min-h-screen bg-[#FFF8EC] text-[#2B2118]">
      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="rounded-[40px] border border-[#E8CFA8] bg-white p-7 shadow-[0_26px_70px_rgba(43,33,24,0.1)] md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#F2A23A]">Festival Details</p>
          <h1 className="mt-3 text-3xl font-black text-[#2B2118] md:text-4xl">Festival details coming soon</h1>
          <p className="mt-4 text-[15px] leading-7 text-[#6F6255] md:text-[16px]">
            This route is reserved for festival-specific pages. Details for <span className="font-semibold">{slug ?? "this event"}</span> will be added here.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={ROUTES.volunteer}
              className="inline-flex items-center justify-center rounded-full bg-[#F2A23A] px-6 py-3 text-sm font-black text-white shadow-[0_18px_36px_rgba(242,162,58,0.28)] transition hover:bg-[#d98f2b]"
            >
              Participate / Volunteer
            </Link>
            <Link
              to={ROUTES.donate}
              className="inline-flex items-center justify-center rounded-full border border-[#E8CFA8] bg-white px-6 py-3 text-sm font-black text-[#1F6F70] shadow-[0_14px_26px_rgba(43,33,24,0.08)] transition hover:border-[#F2A23A]/70"
            >
              Support Festival Seva
            </Link>
            <Link
              to={ROUTES.eventsKatha.festivals}
              className="inline-flex items-center justify-center rounded-full border border-[#E8CFA8] bg-[#FAF1DE] px-6 py-3 text-sm font-black text-[#2B2118] transition hover:border-[#F2A23A]/70"
            >
              Back to Calendar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
});

