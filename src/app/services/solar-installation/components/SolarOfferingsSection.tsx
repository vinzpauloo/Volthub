"use client";

import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import {
  RiCheckLine,
  RiSunLine,
  RiToolsLine,
  RiCustomerService2Line,
  RiShieldCheckLine,
  RiBarChartLine,
  RiPlugLine,
} from "react-icons/ri";
import type { IconType } from "react-icons";

interface Service {
  icon: IconType;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: RiBarChartLine,
    title: "Energy Audit & Design",
    subtitle: "Custom system sizing and site-specific analysis",
    desc: "Our team conducts comprehensive energy assessments to design the optimal solar system for your property. We analyze your energy consumption patterns, roof orientation, shading factors, and future growth plans to deliver a system sized perfectly for your needs.",
    features: [
      "Comprehensive energy assessment",
      "Optimal system sizing",
      "Site-specific load analysis",
      "Shading and orientation analysis",
    ],
  },
  {
    icon: RiShieldCheckLine,
    title: "Financing Assistance",
    subtitle: "Solar loans, leases, and incentive guidance",
    desc: "We help you navigate the financial landscape of solar energy. From low-interest solar loans and flexible lease options to tax credits and government rebates, our team ensures you maximize every available incentive to make your solar investment as affordable as possible.",
    features: [
      "Solar loan programs",
      "Lease and PPA options",
      "Tax credit guidance",
      "Rebate applications",
    ],
  },
  {
    icon: RiToolsLine,
    title: "Professional Installation",
    subtitle: "NABCEP certified installers ensure quality and safety",
    desc: "Our certified installation teams bring years of experience to every project. We follow rigorous safety protocols, adhere to OSHA standards, and perform multi-point quality checks throughout the installation process to ensure your system is built to last.",
    features: [
      "NABCEP certified team",
      "OSHA safety compliance",
      "Quality assurance checks",
      "Clean installation process",
    ],
  },
  {
    icon: RiPlugLine,
    title: "Grid Interconnection",
    subtitle: "Utility coordination and net metering setup",
    desc: "We handle the entire grid interconnection process from start to finish. Our team manages utility applications, coordinates inspections, and sets up net metering so you can start feeding excess energy back to the grid and earning credits immediately.",
    features: [
      "Utility application handling",
      "Net metering setup",
      "Inspection coordination",
      "System activation",
    ],
  },
  {
    icon: RiSunLine,
    title: "Performance Monitoring",
    subtitle: "Real-time monitoring and optimization",
    desc: "Stay connected to your solar system 24/7 with our advanced monitoring platform. Track energy production in real time, receive instant performance alerts, and access detailed reports that help you optimize your system for maximum output and savings.",
    features: [
      "Real-time monitoring app",
      "Performance alerts",
      "Energy production reports",
      "System optimization",
    ],
  },
  {
    icon: RiCustomerService2Line,
    title: "Maintenance Support",
    subtitle: "Ongoing support for system longevity",
    desc: "Protect your investment with our comprehensive maintenance programs. From scheduled inspections and system health checks to preventive maintenance and rapid repair services, we keep your solar system performing at peak efficiency year after year.",
    features: [
      "Scheduled maintenance plans",
      "System health monitoring",
      "Preventive maintenance",
      "Rapid repair service",
    ],
  },
];

export default function SolarOfferingsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-white">
      <LayoutContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Complete Solar Installation Services
          </h2>
          <p className="text-gray-500">
            From energy audit to grid connection, we handle every step of your solar journey
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-[280px_1fr] gap-0 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Left — Tab List */}
          <div className="bg-gray-50 border-r border-gray-200">
            {services.map((service, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`w-full text-left px-6 py-4 transition-colors duration-150 border-b border-gray-200 last:border-b-0 flex items-center gap-3 ${
                  active === idx
                    ? "bg-white text-gray-900 font-semibold"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <service.icon className="text-lg shrink-0" />
                <span className="text-sm">{service.title}</span>
              </button>
            ))}
          </div>

          {/* Right — Tab Content */}
          <div className="bg-white p-8 md:p-10">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              {services[active].subtitle}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {services[active].title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              {services[active].desc}
            </p>
            <ul className="space-y-3">
              {services[active].features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3 text-sm">
                  <RiCheckLine className="text-gray-400 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
