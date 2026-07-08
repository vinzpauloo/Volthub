import BackToTopButton from "@/components/common/BackToTopButton";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SolarHeroSection from "./components/SolarHeroSection";
import SolarOfferingsSection from "./components/SolarOfferingsSection";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SolarStreetLightsSection from "./components/SolarStreetLightsSection";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SolarStorageSection from "./components/SolarStorageSection";
import SolarWhyChooseUsSection from "./components/SolarWhyChooseUsSection";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
