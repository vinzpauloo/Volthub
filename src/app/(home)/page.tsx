"use client";

import { useEffect, useState } from "react";
import { Manrope } from "next/font/google";
import { ArrowUp } from "lucide-react";
import HeroSection from "./components/HeroSection";
import TrustStripSection from "./components/TrustStripSection";
import SolarCarportPromoSection from "./components/SolarCarportPromoSection";
import StatsSection from "./components/StatsSection";
import ArticleShowcaseSection from "./components/ArticleShowcaseSection";
import OperationServiceSection from "./components/OperationServiceSection";
import AppShowcaseSection from "./components/AppShowcaseSection";
import RecommendedProducts from "./components/RecommendedProducts";
import ProjectCasesSection from "./components/ProjectCasesSection";
import FAQSection from "./components/FAQSection";
import BlogResourcesSection from "./components/BlogResourcesSection";
import FinalCtaSection from "./components/FinalCtaSection";
import { stats, trustBadges, resources, faqs } from "./components/homeData";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const featuredBlogSlugs = [
  "the-billion-peso-ev-charging-opportunity-in-the-philippines",
  "ev-charger-cost-installation-philippines",
  "commercial-energy-solutions-business-guide",
];

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      className={`flex flex-col w-full overflow-x-hidden theme-control-room ${manrope.variable}`}
    >
      <h1 className="sr-only">
        Solar, Battery Storage and EV Charging Solutions in the Philippines
      </h1>
      <div className="cr-grain" aria-hidden="true" />

      <HeroSection />
      <TrustStripSection trustBadges={trustBadges} />
      <SolarCarportPromoSection />
      <StatsSection stats={stats} />
      <ArticleShowcaseSection />
      <OperationServiceSection />
      <AppShowcaseSection />
      <RecommendedProducts />
      <ProjectCasesSection />
      <FAQSection
        title="Frequently Asked Questions"
        description="Find answers to the most common questions about our energy solutions."
        faqs={faqs}
      />
      <BlogResourcesSection
        title="Latest Blogs & Insights"
        description="Stay updated with news, how-to guides, and deep dives on EV charging, solar, and smart energy."
        resources={resources}
        featuredSlugs={featuredBlogSlugs}
      />
      <FinalCtaSection />

      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </main>
  );
}
