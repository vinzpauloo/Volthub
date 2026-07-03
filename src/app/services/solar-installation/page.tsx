import BackToTopButton from "@/components/common/BackToTopButton";
import SolarHeroSection from "./components/SolarHeroSection";
import SolarOfferingsSection from "./components/SolarOfferingsSection";
import SolarStreetLightsSection from "./components/SolarStreetLightsSection";
import SolarStorageSection from "./components/SolarStorageSection";
import SolarWhyChooseUsSection from "./components/SolarWhyChooseUsSection";
import SolarCtaSection from "./components/SolarCtaSection";
import SolarPackagesSection from "./components/SolarPackagesSection";
import SolarSystemTypesSection from "./components/SolarSystemTypesSection";

export default function SolarInstallation() {
  return (
    <main className="pt-10">
      {/* <SolarHeroSection /> */}
      <SolarOfferingsSection />
      <SolarSystemTypesSection />
      <SolarPackagesSection />
      {/* <SolarStreetLightsSection /> */}
      {/* <SolarStorageSection /> */}
      <SolarWhyChooseUsSection />
      {/* <SolarCtaSection /> */}
      <BackToTopButton />
    </main>
  );
}
