import type { Metadata } from "next";
import Link from "next/link";
import { HomeGuideSolar } from "./components/HomeGuideSolar";
import { SolarInvestment } from "./components/SolarInvestment";
import { SolarTypes } from "./components/SolarTypes";
import { SolarInstallation } from "./components/SolarInstallation";
import { SolarSetupLearnings } from "./components/SolarSetupLearnings";
import { SolarPackagePricing } from "./components/SolarPackagePricing";
import { RiSunLine, RiArrowRightLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Solar Energy Solutions - VoltHub",
  description:
    "Complete solar energy solutions — estimate your savings, explore system types, learn about installation, and discover investment options for your home or business.",
};

export default function Solutions(): React.ReactElement {
  return (
    <main>
      <SolarPackagePricing />

      {/* Solar Calculator CTA */}
      <section className="section-spacing bg-white">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 py-14 px-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <RiSunLine className="text-primary text-3xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            ⚡ Design Your Solar Setup
          </h2>
          <p className="text-lg text-gray-500 max-w-xl">
            Calculate your ideal solar system based on your lifestyle, actual
            appliance usage, and location — free instant estimate.
          </p>
          <Link
            href="/solutions/solar-calculator"
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-3xl bg-primary text-white font-bold text-lg shadow-2xl hover:shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-1 hover:scale-[1.02] active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <RiSunLine className="text-2xl group-hover:animate-pulse" />
            <span>Calculate Your Solar Setup</span>
            <RiArrowRightLine className="text-2xl group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-gray-400">
            No sign-up required — get results in under 2 minutes
          </p>
        </div>
      </section>

      <HomeGuideSolar />
      <SolarInvestment />
      {/* <SolarTypes />
      <SolarInstallation /> */}
      <SolarSetupLearnings />
    </main>
  );
}
