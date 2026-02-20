"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";

interface PartnerHeroProps {
  onApplyClick: () => void;
}

export function PartnerHero({ onApplyClick }: PartnerHeroProps): React.ReactElement {
  return (
    <section
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 text-white bg-cover bg-center"
      style={{
        backgroundImage: "url('/HomeBanner/banner3.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-transparent" />
      <div className="relative">
        <LayoutContainer className="flex-col items-center text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-200 font-semibold">
            Partner Program
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">
            Become a Location Partner
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Host an EV charging station at your location. Earn passive income
            while supporting sustainable transportation.
          </p>
          <button
            type="button"
            onClick={onApplyClick}
            className="bg-linear-to-r from-secondary to-yellow-300 text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 glow-effect mt-4"
          >
            Apply Now
          </button>
        </LayoutContainer>
      </div>
    </section>
  );
}
