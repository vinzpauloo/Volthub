import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";
import BackToTopButton from "@/components/common/BackToTopButton";
import HeroSection from "./components/hero-section";
import MarketSnapshotSection from "./components/market-snapshot-section";
import EvChargingSection from "./components/ev-charging-section";
import SolarEnergySection from "./components/solar-energy-section";
import EnergyStorageSection from "./components/energy-storage-section";
import PolicyHighlightsSection from "./components/policy-highlights-section";
import WhyPhilippinesSection from "./components/why-philippines-section";
import NewsletterCtaSection from "./components/newsletter-cta-section";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://volthubs.netlify.app";

export const metadata: Metadata = {
  title: "Market Insights | Philippines Clean Energy & EV Charging - VoltHub",
  description:
    "Explore Philippines clean energy market data: EV charging (29.3% CAGR), solar energy, and energy storage insights. Data-driven analysis for investors and businesses.",
  keywords: [
    "Philippines EV charging market",
    "solar energy Philippines",
    "energy storage Philippines",
    "BESS Philippines",
    "clean energy investment",
    "Philippines renewable energy",
    "EV infrastructure",
    "market insights",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/insights`,
    siteName: "VoltHub Energy",
    title:
      "Market Insights | Philippines Clean Energy & EV Charging - VoltHub",
    description:
      "Explore Philippines clean energy market data: EV charging (29.3% CAGR), solar energy, and energy storage insights.",
    images: [
      {
        url: "/HomeBanner/banner1.png",
        width: 1200,
        height: 630,
        alt: "VoltHub Market Insights - Philippines Clean Energy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Market Insights | Philippines Clean Energy & EV Charging - VoltHub",
    description:
      "Explore Philippines clean energy market data: EV charging (29.3% CAGR), solar energy, and energy storage insights.",
    images: ["/HomeBanner/banner1.png"],
    creator: "@VoltHubEnergy",
  },
  alternates: {
    canonical: `${siteUrl}/insights`,
  },
};

export default function InsightsPage(): React.ReactElement {
  return (
    <main className="pt-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen">
      <LayoutContainer className="flex flex-1 flex-col pb-16 px-4">
        <HeroSection />
        <MarketSnapshotSection />
        <EvChargingSection />
        <SolarEnergySection />
        <EnergyStorageSection />
        <PolicyHighlightsSection />
        <WhyPhilippinesSection />
        <NewsletterCtaSection />
      </LayoutContainer>
      <BackToTopButton />
    </main>
  );
}
