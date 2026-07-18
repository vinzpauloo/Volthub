"use client";

import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiLightbulbLine,
  RiAlertLine,
  RiSettingsLine,
  RiBarChartLine,
  RiArrowRightLine,
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
    image: "/aboutimages/safety.jpg",
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
    image: "/aboutimages/inverter.png",
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
    image: "/aboutimages/solarpanels2.jpg",
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
  const [selectedTopic, setSelectedTopic] = useState<number>(0);

  const active = TOPICS[selectedTopic];
  const ActiveIcon = active.icon;

  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Learnings"
          title="Solar Setup Learnings & Best Practices"
          description="Expert tips, common pitfalls, and proven strategies to get the most out of your solar investment."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left side — horizontally scrollable cards */}
          <div className="lg:col-span-2">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-thin">
              {TOPICS.map((topic, index) => {
                const Icon = topic.icon;
                const isActive = selectedTopic === index;

                return (
                  <button
                    key={topic.title}
                    type="button"
                    onClick={() => setSelectedTopic(index)}
                    className={`flex-shrink-0 w-[280px] lg:w-full snap-start text-left rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-md ${
                      isActive
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isActive
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Icon className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {topic.summary}
                        </p>
                      </div>
                      <RiArrowRightLine
                        className={`flex-shrink-0 text-lg transition-all duration-300 ${
                          isActive
                            ? "text-primary translate-x-1"
                            : "text-gray-300"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side — detail panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm h-full">
              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0">
                    <ActiveIcon className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {active.title}
                    </h3>
                    <p className="text-sm text-gray-500">{active.summary}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {active.points.map((point) => (
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
        </div>
      </LayoutContainer>
    </section>
  );
}
