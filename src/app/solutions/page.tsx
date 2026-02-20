import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import BackToTopButton from "@/components/common/BackToTopButton";

export const metadata: Metadata = {
  title: "Energy Solutions - VoltHub",
  description: "Comprehensive energy solutions from solar generation to smart storage. Discover how VoltHub's integrated systems power homes, businesses, and communities with clean, reliable energy.",
};
import {
  RiSunLine,
  RiCpuLine,
  RiBatteryChargeLine,
  RiHomeLine,
  RiSpeedUpLine,
  RiShieldCheckLine,
  RiSmartphoneLine,
} from "react-icons/ri";

const flowSteps = [
  {
    icon: RiSunLine,
    title: "Solar Generation",
    subtitle: "Clean energy capture",
    color: "bg-secondary/20 text-secondary",
  },
  {
    icon: RiCpuLine,
    title: "Smart Controller",
    subtitle: "Intelligent management",
    color: "bg-primary/20 text-primary",
  },
  {
    icon: RiBatteryChargeLine,
    title: "Energy Storage",
    subtitle: "Reliable backup",
    color: "bg-green-500/20 text-green-600",
  },
  {
    icon: RiHomeLine,
    title: "Load Distribution",
    subtitle: "Optimized consumption",
    color: "bg-secondary/20 text-secondary",
  },
];

const highlights = [
  {
    icon: RiSpeedUpLine,
    title: "99.5% Efficiency",
    description: "Maximum energy conversion with minimal losses.",
  },
  {
    icon: RiShieldCheckLine,
    title: "24/7 Reliability",
    description: "Continuous monitoring and automatic failover protection.",
  },
  {
    icon: RiSmartphoneLine,
    title: "Smart Monitoring",
    description: "Real-time insights and remote control capabilities.",
  },
];

const technicalSpecs = [
  {
    product: "Solar Light Pro",
    voltage: "12V - 24V DC",
    capacity: "50W - 200W",
    efficiency: "≥95%",
  },
  {
    product: "Solar System Residential",
    voltage: "400V - 800V DC",
    capacity: "5kW - 20kW",
    efficiency: "≥98%",
  },
  {
    product: "EV Charger Level 2",
    voltage: "240V AC",
    capacity: "7.2kW - 22kW",
    efficiency: "≥94%",
  },
  {
    product: "Battery Storage",
    voltage: "48V - 800V DC",
    capacity: "10kWh - 500kWh",
    efficiency: "≥95%",
  },
];

export default function Solutions() {
  return (
    <main className="pt-32 space-y-20 bg-white">
      <section id="flow" className="bg-gray-50 pt-12 pb-20">
        <LayoutContainer className="space-y-14">
          <SectionHeading
            title="Smart Energy Flow"
            description="Integrated system architecture for optimal energy management."
          />
          <div className="bg-white rounded-3xl p-10 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              {flowSteps.map((step, index) => (
                <div key={step.title} className="flex flex-col items-center gap-4">
                  <span
                    className={`w-20 h-20 rounded-full flex items-center justify-center ${step.color}`}
                  >
                    <step.icon className="text-3xl" />
                  </span>
                  <div className="text-center">
                    <p className="text-xl font-semibold">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.subtitle}</p>
                  </div>
                  {index < flowSteps.length - 1 ? (
                    <span className="energy-flow w-16 h-1 bg-linear-to-r from-secondary to-primary rounded-full hidden lg:block" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </LayoutContainer>
      </section>

      <section className="py-20">
        <LayoutContainer>
          <div className="flex flex-wrap justify-center gap-8">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="text-2xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>

      <section id="specs" className="bg-gray-50 py-20">
        <LayoutContainer className="space-y-10">
          <SectionHeading
            title="Technical Specifications"
            description="Detailed performance data and system capabilities."
          />
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr className="text-left">
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Voltage Range</th>
                    <th className="px-6 py-4 font-semibold">Capacity</th>
                    <th className="px-6 py-4 font-semibold">Efficiency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {technicalSpecs.map((spec) => (
                    <tr key={spec.product} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{spec.product}</td>
                      <td className="px-6 py-4 text-gray-600">{spec.voltage}</td>
                      <td className="px-6 py-4 text-gray-600">{spec.capacity}</td>
                      <td className="px-6 py-4 text-gray-600">{spec.efficiency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </LayoutContainer>
      </section>
      <BackToTopButton />
    </main>
  );
}

