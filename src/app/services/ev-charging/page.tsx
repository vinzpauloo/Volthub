import BackToTopButton from "@/components/common/BackToTopButton";
import EvChargingHeroSection from "./components/EvChargingHeroSection";
import EvChargingOfferingsSection from "./components/EvChargingOfferingsSection";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import EvChargingProductsSection from "./components/EvChargingProductsSection";
import EvChargingWhyChooseUsSection from "./components/EvChargingWhyChooseUsSection";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import EvChargingCtaSection from "./components/EvChargingCtaSection";
import EvChargingPackagesSection from "./components/EvChargingPackagesSection";
import EvChargingTypesSection from "./components/EvChargingTypesSection";

export default function EVChargingSolutions() {
  return (
    <main className="pt-10">
      <EvChargingHeroSection />
      <EvChargingOfferingsSection />
      {/* <EvChargingProductsSection /> */}
   
      <EvChargingTypesSection />
      <EvChargingPackagesSection />
      {/* <EvChargingCtaSection /> */}
         <EvChargingWhyChooseUsSection />
      <BackToTopButton />
    </main>
  );
}
