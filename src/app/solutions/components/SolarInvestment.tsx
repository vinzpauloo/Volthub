"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiMoneyDollarCircleLine,
  RiBankCardLine,
  RiGovernmentLine,
} from "react-icons/ri";
import Link from "next/link";

const FINANCING_OPTIONS = [
  {
    icon: RiMoneyDollarCircleLine,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Cash Payment",
    description:
      "Full payment upfront. Fastest installation, zero interest, walang monthly commitments.",
    tag: "NO INTEREST",
  },
  {
    icon: RiBankCardLine,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    title: "Credit Card",
    description:
      "Split across 36 monthly installments. Interest rate varies per card issuer. We'll confirm the exact rate in your quote PDF.",
    tag: "UP TO 36 MONTHS",
  },
  {
    icon: RiGovernmentLine,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "GSIS Loan",
    description:
      "Government employees can finance through GSIS at preferential rates. 5-year term.",
    tag: "5 YEARS • 5% INT.",
  },
];

export function SolarInvestment(): React.ReactElement {
  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Financing"
          title="Flexible Payment Options"
          description="Solar pays itself back. May plan kami na fit sa inyong budget."
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          {FINANCING_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Icon Circle */}
                <div
                  className={`w-11 h-11 rounded-full ${option.iconBg} flex items-center justify-center flex-shrink-0 mb-4`}
                >
                  <Icon className={`text-xl ${option.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {option.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {option.description}
                </p>

                {/* Tag */}
                <span className="text-xs font-bold uppercase tracking-wide text-secondary mb-4 block">
                  {option.tag}
                </span>

                {/* Button */}
                <Link
                  href="/contact"
                  className="block w-full text-center py-2.5 px-4 rounded-full border border-gray-200 text-gray-700 text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
                >
                  Check Eligibility
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="max-w-5xl mx-auto w-full bg-white rounded-xl border border-gray-200 px-6 py-4 text-center shadow-sm">
          <p className="text-gray-500 text-sm leading-relaxed">
            <span className="font-semibold text-gray-700">Pro Tip: </span>
            Ang aming Solar Estimate Calculator ay makakatulong sa inyo makita
            ang estimated monthly payment across lahat ng financing paths.
          </p>
        </div>
      </LayoutContainer>
    </section>
  );
}
