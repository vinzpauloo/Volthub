"use client";

import {
  RiMoneyDollarCircleLine,
  RiUserFollowLine,
  RiHandCoinLine,
  RiLeafLine,
} from "react-icons/ri";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: RiMoneyDollarCircleLine,
    title: "Generate Revenue",
    description:
      "Earn passive income from every charging session at your location.",
  },
  {
    icon: RiUserFollowLine,
    title: "Attract Customers",
    description:
      "EV drivers actively seek charging locations, driving foot traffic to your business.",
  },
  {
    icon: RiHandCoinLine,
    title: "Zero Upfront Cost",
    description:
      "VoltHub handles equipment, installation, and maintenance at no cost to you.",
  },
  {
    icon: RiLeafLine,
    title: "Support Sustainability",
    description:
      "Position your brand as environmentally responsible and forward-thinking.",
  },
];

export function PartnerBenefits(): React.ReactElement {
  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Why Partner With Us"
          title="Benefits of Hosting an EV Charger"
          description="Join the growing network of VoltHub location partners and unlock new opportunities for your business."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 shadow-md hover-lift border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="text-3xl text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}
