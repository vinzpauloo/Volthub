import type { Metadata } from "next";
import { SolarCalculator } from "../components/SolarCalculator";

export const metadata: Metadata = {
  title: "Solar Calculator — Design Your Solar Setup | VoltHub",
  description:
    "Calculate your ideal solar system based on your lifestyle, actual appliance usage, and location. Get instant estimates for system size, battery needs, cost, and savings.",
};

export default function SolarCalculatorPage(): React.ReactElement {
  return (
    <main>
      <SolarCalculator />
    </main>
  );
}
