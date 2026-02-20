"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";

interface Step {
  number: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: "Apply",
    description:
      "Submit your location details through our simple application form.",
  },
  {
    number: 2,
    title: "Site Assessment",
    description:
      "Our team evaluates your location for optimal charger placement.",
  },
  {
    number: 3,
    title: "Launch",
    description:
      "We install, connect, and manage the charging station — you start earning.",
  },
];

export function PartnerHowItWorks(): React.ReactElement {
  return (
    <section className="section-spacing">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="How It Works"
          title="Three Simple Steps to Get Started"
          description="From application to launch, we make the process seamless."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
              {step.number < STEPS.length && (
                <div className="hidden md:block absolute" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Connector line between steps (desktop only) */}
        <div className="hidden md:flex justify-center -mt-8">
          <div className="w-2/3 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full" />
        </div>
      </LayoutContainer>
    </section>
  );
}
