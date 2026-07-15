"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiMoneyDollarCircleLine,
  RiBankLine,
  RiCalendarCheckLine,
  RiIncreaseDecreaseLine,
} from "react-icons/ri";

const INVESTMENT_OPTIONS = [
  {
    icon: RiMoneyDollarCircleLine,
    title: "Outright Purchase",
    price: "₱150,000 – ₱500,000",
    description:
      "Pay upfront for maximum long-term savings. Own your system from day one with full warranty coverage and no monthly payments.",
    benefits: [
      "Highest lifetime savings (₱600K+ over 25 years)",
      "Immediate property value increase",
      "Full ownership and warranty",
      "No interest or financing costs",
    ],
    bestFor: "Homeowners with available capital seeking maximum ROI",
  },
  {
    icon: RiCalendarCheckLine,
    title: "Installment Plan",
    price: "₱4,500 – ₱12,000 / month",
    description:
      "Spread the cost over 12-60 months with competitive interest rates. Start saving on your electric bill from month one.",
    benefits: [
      "Low monthly payments",
      "Immediate electricity savings",
      "Fixed payment schedule",
      "Option to pay off early",
    ],
    bestFor: "Homeowners who want to go solar with minimal upfront cost",
  },
  {
    icon: RiBankLine,
    title: "Solar Loan",
    price: "As low as 6% p.a.",
    description:
      "Finance your solar system through our bank partners with flexible terms up to 7 years. Your monthly loan payment is often less than your current electric bill.",
    benefits: [
      "Competitive interest rates",
      "Loan terms up to 7 years",
      "Multiple bank partners",
      "Quick approval process",
    ],
    bestFor: "Long-term financing with manageable monthly payments",
  },
  {
    icon: RiIncreaseDecreaseLine,
    title: "ROI & Payback",
    price: "3–7 years typical payback",
    description:
      "Most residential solar systems in the Philippines pay for themselves in 3-7 years. After that, enjoy 18+ years of essentially free electricity.",
    benefits: [
      "18-25+ year panel lifespan",
      "25-year performance warranty",
      "15-20% annual ROI",
      "Protection against rising electricity rates",
    ],
    bestFor: "Understanding your return before committing",
  },
];

export function SolarInvestment(): React.ReactElement {
  return (
    <section className="section-spacing bg-white">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Investment"
          title="Solar Investment Options"
          description="Flexible financing to make solar accessible. Choose the plan that works best for your budget and goals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
          {INVESTMENT_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-2xl text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {option.title}
                    </h3>
                    <p className="text-secondary font-bold text-lg">
                      {option.price}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {option.description}
                </p>

                <ul className="space-y-1.5 mb-4">
                  {option.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <svg
                        className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">Best for: </span>
                    {option.bestFor}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}
