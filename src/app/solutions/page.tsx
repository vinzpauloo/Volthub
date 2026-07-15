import type { Metadata } from "next";
import { SolarCalculator } from "./components/SolarCalculator";
import { HomeGuideSolar } from "./components/HomeGuideSolar";
import { SolarInvestment } from "./components/SolarInvestment";
import { SolarTypes } from "./components/SolarTypes";
import { SolarInstallation } from "./components/SolarInstallation";
import { SolarSetupLearnings } from "./components/SolarSetupLearnings";

export const metadata: Metadata = {
  title: "Solar Energy Solutions - VoltHub",
  description:
    "Complete solar energy solutions — estimate your savings, explore system types, learn about installation, and discover investment options for your home or business.",
};

export default function Solutions(): React.ReactElement {
  return (
    <main>
      <SolarCalculator />
      <HomeGuideSolar />
      <SolarInvestment />
      <SolarTypes />
      <SolarInstallation />
      <SolarSetupLearnings />
    </main>
  );
}
