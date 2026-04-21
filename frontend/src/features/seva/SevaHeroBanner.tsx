import { memo, type ReactNode } from "react";
import { SEVA_HERO_SUBTITLE_CLASS } from "./sevaTypography";

interface SevaHeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  children?: ReactNode;
}

export const SevaHeroBanner = memo(function SevaHeroBanner({
  title,
  subtitle,
  backgroundImage,
  children,
}: SevaHeroBannerProps) {
  return (
    <section className="relative -mx-6 -mt-12 overflow-hidden bg-[#fff8ef] pb-8 md:-mx-8">
      <style>
        {`
          @keyframes sevaHeroFadeUp {
            from {
              opacity: 0;
              transform: translateY(24px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(231,182,81,0.20),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(31,78,121,0.12),transparent_36%)]" />
      <div
        className="relative min-h-[640px] w-full overflow-hidden rounded-b-[40px] bg-cover bg-center shadow-[0_18px_40px_rgba(23,12,5,0.14)]"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-end justify-center px-6 py-16 text-center md:px-8 md:py-20">
          <div
            className="w-full max-w-4xl px-2 py-4 text-white md:px-6 md:py-6"
            style={{ animation: "sevaHeroFadeUp 0.85s ease-out both" }}
          >
            <h1 className="text-4xl font-bold leading-tight !text-[#f9e6a8] md:text-5xl">{title}</h1>
            <p className={`mt-5 ${SEVA_HERO_SUBTITLE_CLASS} !text-[#f7e0a0]`}>{subtitle}</p>
            {children ? (
              <div className="hero-actions mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                {children}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
});
