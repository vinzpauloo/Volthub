import BackToTopButton from "@/components/common/BackToTopButton";
import ServiceOverviewSection from "./components/ServiceOverviewSection";
import ServiceProcessSection from "./components/ServiceProcessSection";
import ServiceCoverageSection from "./components/ServiceCoverageSection";
import TechnicalExpertiseSection from "./components/TechnicalExpertiseSection";

export default function Services() {
  return (
    <main className="pt-10">
      <ServiceOverviewSection />
      
  
      <ServiceProcessSection />
          <TechnicalExpertiseSection />
      <ServiceCoverageSection />
      <BackToTopButton />
    </main>
  );
}
