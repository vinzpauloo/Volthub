import LayoutContainer from "@/components/layout/LayoutContainer";
import Link from "next/link";
import EvChargingTabbedFeaturesSection from "./EvChargingTabbedFeaturesSection";

export default function EvChargingHeroSection() {
  return (
    <>
    <section className="relative min-h-[50vh] pt-9 pb-0 flex items-center overflow-hidden">
       <EvChargingTabbedFeaturesSection />

    </section>
   
  
    </>
  );
}
