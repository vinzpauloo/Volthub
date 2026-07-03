"use client";

import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import {
  RiCheckLine,
  RiMapPinLine,
  RiShieldCheckLine,
  RiToolsLine,
  RiPlugLine,
  RiCustomerService2Line,
  RiFlashlightLine,
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
    icon: RiMapPinLine,
    title: "Site Assessment & Design",
    subtitle: "Comprehensive evaluation for optimal charger placement",
    desc: "Our expert team conducts thorough electrical load analysis and site surveys to design the most efficient charging infrastructure tailored to your property. We evaluate power capacity, traffic patterns, and future growth to create a scalable solution that meets your needs today and tomorrow.",
    features: [
      "Electrical capacity evaluation and load calculations",
      "Traffic flow and parking pattern analysis",
      "ADA and accessibility compliance checks",
      "Future expansion and scalability planning",
      "3D site modeling and equipment layout design",
    ],
  },
  {
    icon: RiShieldCheckLine,
    title: "Permit & Code Compliance",
    subtitle: "Hassle-free regulatory approvals",
    desc: "Navigating the complex landscape of permits and regulations is our specialty. We handle all paperwork, applications, and coordination with local authorities to ensure your installation meets every requirement. From building codes to utility agreements, we've got you covered.",
    features: [
      "Building and electrical permit applications",
      "National and local electrical code compliance",
      "ADA accessibility standards verification",
      "Utility interconnection agreements",
      "Environmental and zoning clearance",
    ],
  },
  {
    icon: RiToolsLine,
    title: "Professional Installation",
    subtitle: "Certified technicians, quality guaranteed",
    desc: "Our installation teams are certified, insured, and trained to the highest industry standards. We follow rigorous safety protocols and quality assurance processes to deliver flawless installations on time and within budget. Every project is managed by a dedicated supervisor from start to finish.",
    features: [
      "NABCEP certified solar and EV installers",
      "EVITP trained charging infrastructure technicians",
      "Multi-point quality assurance inspections",
      "Safety-first approach with full PPE compliance",
      "Project management with real-time progress updates",
    ],
  },
  {
    icon: RiPlugLine,
    title: "Network Integration",
    subtitle: "Smart charging with OCPP 2.0 protocol",
    desc: "Connect your charging stations to our cloud-based management platform for complete control and visibility. Our OCPP 2.0 compatible system enables remote monitoring, diagnostics, and firmware updates. Integrate with fleet management systems and energy management platforms seamlessly.",
    features: [
      "OCPP 2.0 protocol for universal compatibility",
      "Cloud-based real-time monitoring dashboard",
      "Remote diagnostics and over-the-air updates",
      "Fleet management system integration",
      "Energy management and load balancing",
    ],
  },
  {
    icon: RiCustomerService2Line,
    title: "Maintenance & Support",
    subtitle: "24/7 monitoring and rapid response",
    desc: "Keep your charging infrastructure running at peak performance with our comprehensive maintenance programs. We offer preventive maintenance schedules, real-time monitoring alerts, and rapid response service to minimize downtime. Our support team is available around the clock to address any issues.",
    features: [
      "24/7 technical support hotline",
      "Preventive maintenance with scheduled inspections",
      "Rapid on-site response within 4 hours",
      "Performance monitoring and optimization",
      "Extended warranty and service plans available",
    ],
  },
  {
    icon: RiFlashlightLine,
    title: "Payment Solutions",
    subtitle: "Flexible payment options for every user",
    desc: "Maximize revenue and user convenience with our integrated payment solutions. Support RFID cards, mobile app payments, credit card terminals, and subscription models. Our platform handles billing, settlements, and reporting so you can focus on your business while we manage the transactions.",
    features: [
      "RFID card reader integration",
      "Mobile app payment with QR code scanning",
      "EMV credit card terminal support",
      "Subscription and membership management",
      "Automated billing and revenue reporting",
    ],
  },
];

export default function EvChargingOfferingsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-white">
      <LayoutContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Comprehensive EV Charging Services
          </h2>
          <p className="text-gray-500">
            From initial consultation to ongoing maintenance, we handle every aspect of your EV charging infrastructure
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
