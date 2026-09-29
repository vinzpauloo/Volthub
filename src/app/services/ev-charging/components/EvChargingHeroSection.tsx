import LayoutContainer from "@/components/layout/LayoutContainer";
import EvChargingTabbedFeaturesSection from "./EvChargingTabbedFeaturesSection";

export default function EvChargingHeroSection() {
  return (
    <>
      <section className="pt-24 pb-10">
        <LayoutContainer className="max-w-4xl text-center space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text leading-tight">
            EV Charger Installation in the Philippines
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            VoltHub supplies and installs EV chargers across Metro Manila and the
            Philippines: 7 kW and 21 kW AC chargers for homes, offices and hotels,
            and 30 kW to 400 kW DC fast chargers for public and fleet sites.
            Installation is quoted upfront by licensed electricians. For commercial
            sites, VoltHub can also operate the station for you through the VoltHub
            app.
          </p>
          <p className="mx-auto max-w-3xl rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-sm leading-relaxed text-gray-700">
            <strong>DOE-accredited nationwide:</strong> VoltHub is listed on the
            Philippine Department of Energy&apos;s EV Industry Portal as an EVCS
            Provider — Service, Supplier and Operator. Accreditation No.{" "}
            <a
              href="https://evindustry.ph/accreditation-details/DOE-EUMB-ANA-20260210003"
              className="font-semibold text-primary underline underline-offset-4"
            >
              DOE-EUMB-ANA-20260210003
            </a>{" "}
            is valid through June 7, 2029.
          </p>
        </LayoutContainer>
      </section>
      <section className="relative min-h-[50vh] pb-0 flex items-center overflow-hidden">
        <EvChargingTabbedFeaturesSection />
      </section>
    </>
  );
}
