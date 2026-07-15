"use client";

import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiArrowDownSLine,
  RiLightbulbLine,
  RiAlertLine,
  RiSettingsLine,
  RiBarChartLine,
} from "react-icons/ri";

interface Topic {
  icon: React.ElementType;
  title: string;
  summary: string;
  points: string[];
}

const TOPICS: Topic[] = [
  {
    icon: RiLightbulbLine,
    title: "Optimizing Panel Performance",
    summary:
      "Get the most energy from your solar panels through proper placement, cleaning, and monitoring.",
    points: [
      "Position panels facing south (Philippines) at a 10-15° tilt angle for maximum year-round production",
      "Clean panels every 3-6 months — dust and bird droppings can reduce output by 5-15%",
      "Trim overhanging branches to prevent shading, which disproportionately reduces string inverter output",
      "Monitor per-panel production data to detect underperforming panels early",
      "Consider microinverters or power optimizers if partial shading is unavoidable",
      "Check inverter display or app weekly — sudden drops indicate a fault needing attention",
    ],
  },
  {
    icon: RiAlertLine,
    title: "Common Mistakes to Avoid",
    summary:
      "Steer clear of these frequent pitfalls that reduce solar system performance and savings.",
    points: [
      "Undersizing: installing too few panels now costs more to expand later — size for future needs (EV, AC, etc.)",
      "Ignoring roof condition: install on a roof with <10 years life left and you'll pay twice for panel removal/reinstall",
      "Skipping the energy audit: without understanding your consumption patterns, you risk a mismatched system",
      "Choosing based on price alone: cheapest panels may degrade faster — look at ₱/kWh over 25 years, not upfront ₱/kW",
      "Forgetting about net metering paperwork: delays in utility approval mean months of lost export credits",
      "DIY installation without expertise: improper wiring or mounting creates fire, leakage, and structural risks",
    ],
  },
  {
    icon: RiSettingsLine,
    title: "Maintenance & Care",
    summary:
      "Keep your solar system running at peak efficiency with simple routine maintenance.",
    points: [
      "Visual inspection every 3 months: check for cracked panels, loose wiring, corrosion, or pest nesting under arrays",
      "Inverter check: ensure the display shows normal operation (green light / no error codes) — photograph it monthly",
      "Battery maintenance (hybrid/off-grid): keep batteries in a ventilated, temperature-controlled space (20-30°C ideal)",
      "Professional annual service: includes thermal imaging to detect hot spots, torque checks on connections, and full performance test",
      "Monitor degradation rate: panels typically lose 0.5% efficiency per year — if yours drops faster, claim the warranty",
      "Keep a log: record monthly production, weather events, and any anomalies — invaluable for warranty claims and troubleshooting",
    ],
  },
  {
    icon: RiBarChartLine,
    title: "Maximizing Your Savings",
    summary:
      "Strategic habits and smart energy use that amplify your solar return on investment.",
    points: [
      "Shift heavy loads to solar hours (10 AM – 3 PM): run washing machines, dishwashers, water pumps, and EV charging during peak production",
      "Use timer plugs for water heaters and pool pumps to align consumption with generation, avoiding battery drain or grid import",
      "If on time-of-use rates, export during high-rate periods and self-consume during low-rate periods for maximum bill reduction",
      "Track your net meter credits — unused credits may expire annually depending on your utility's net metering rules",
      "Replace old appliances with inverter-type units: an inverter AC uses 30-50% less power and pairs perfectly with solar",
      "Consider adding batteries later: start with a battery-ready inverter so you can add storage when prices drop or outages increase",
    ],
  },
];

export function SolarSetupLearnings(): React.ReactElement {
  const [openTopic, setOpenTopic] = useState<number | null>(null);

  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Learnings"
          title="Solar Setup Learnings & Best Practices"
          description="Expert tips, common pitfalls, and proven strategies to get the most out of your solar investment."
        />

        <div className="max-w-4xl mx-auto w-full space-y-4">
          {TOPICS.map((topic, index) => {
            const Icon = topic.icon;
            const isOpen = openTopic === index;

            return (
              <div
                key={topic.title}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenTopic(isOpen ? null : index)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-xl text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{topic.title}</h3>
                    <p className="text-sm text-gray-500 truncate">
                      {topic.summary}
                    </p>
                  </div>
                  <RiArrowDownSLine
                    className={`text-xl text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <ul className="space-y-3">
                      {topic.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}
