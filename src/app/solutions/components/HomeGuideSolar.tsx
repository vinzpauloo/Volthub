"use client";

import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import { cn } from "@/lib/utils";
import { RiCheckLine } from "react-icons/ri";

const STEPS = [
  {
    number: 1,
    title: "Get Your Estimate",
    description:
      "Use our online calculator to input your monthly bill and instantly see your estimated solar setup size and potential savings.",
    image: "/solor/stepbystep/step1.png",
    checklist: [
      "Instant online estimation",
      "Clear breakdown of potential savings",
      "No commitment required",
    ],
  },
  {
    number: 2,
    title: "Consultation & Review",
    description:
      "Our solar experts will reach out to review your digital estimate, answer your questions, and prepare your initial custom quote.",
    image: "/solor/stepbystep/step2.png",
    checklist: [
      "Personalized 1-on-1 call",
      "Custom system size review",
      "Transparent upfront pricing",
    ],
  },
  {
    number: 3,
    title: "Site Assessment & Final Quote",
    description:
      "We visit your home to check your roof's condition, structural integrity, and shading to finalize your custom solar engineering plan.",
    image: "/solor/stepbystep/step3.png",
    checklist: [
      "Structural & shading analysis",
      "Exact panel layout mapping",
      "Fixed, guaranteed final quotation",
    ],
  },
  {
    number: 4,
    title: "Seamless Installation",
    description:
      "Our certified engineering team handles everything — from permits to mounting the panels and connecting the system safely.",
    image: "/solor/stepbystep/step4.png",
    checklist: [
      "Complete permit & utility management",
      "Most installations done in 1–2 days",
      "Waterproofing & structural guarantee",
    ],
  },
  {
    number: 5,
    title: "Handover & Live Monitoring",
    description:
      "We walk you through how your system works, hand over your user guidelines, and set up your live app tracking so you can monitor your savings.",
    image: "/solor/stepbystep/step5.png",
    checklist: [
      "Live real-time generation tracking",
      "Step-by-step homeowner guidelines",
      "24/7 system health alerts",
    ],
  },
];

// ── Curved connector between steps ──────────────────────────────────────────
function CurvedConnector({
  direction,
}: {
  direction: "left-to-right" | "right-to-left";
}) {
  const d =
    direction === "left-to-right"
      ? "M 32 0 C 32 28, 78 12, 78 40"
      : "M 68 0 C 68 28, 22 12, 22 40";

  return (
    <div className="h-10 md:h-14 w-full overflow-hidden -my-3 md:-my-4">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={d}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/25"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />
        {/* Arrow dot at end */}
        <circle
          cx={direction === "left-to-right" ? 78 : 22}
          cy={39}
          r={3}
          className="fill-primary/60"
        />
      </svg>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export function HomeGuideSolar(): React.ReactElement {
  return (
    <section className="section-spacing bg-white">
      <LayoutContainer className="flex-col space-y-16">
        <SectionHeading
          eyebrow="Home Solar Journey"
          title="Complete Home Solar Journey"
          description="From your first click to lifetime savings — here is how we get your home powered by the sun."
        />

        <div className="max-w-5xl mx-auto w-full space-y-1">
          {STEPS.map((step, index) => {
            const isOdd = index % 2 === 0;
            const isLast = index === STEPS.length - 1;

            return (
              <div key={step.number}>
                {/* ── Step row ──────────────────────────────────────────── */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
                  {/* Image side */}
                  <div
                    className={cn(
                      "w-full md:w-[45%] relative",
                      isOdd ? "md:order-1" : "md:order-2"
                    )}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden md:rounded-lg">
                      <Image
                        src={step.image}
                        alt={`Step ${step.number}: ${step.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    </div>

                    {/* Step number pinned on image */}
                    <span
                      className={cn(
                        "absolute top-3 left-3 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full text-white text-sm md:text-base font-bold z-10",
                        index === 0
                          ? "bg-primary"
                          : index === STEPS.length - 1
                            ? "bg-secondary"
                            : "bg-primary/90"
                      )}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content side */}
                  <div
                    className={cn(
                      "w-full md:w-[55%] md:px-10",
                      isOdd ? "md:order-2" : "md:order-1"
                    )}
                  >
                    <span className="text-xs font-semibold text-primary tracking-wider uppercase">
                      Step {step.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1.5 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    <ul className="space-y-2.5">
                      {step.checklist.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-gray-600"
                        >
                          <span className="flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                            <RiCheckLine className="text-xs" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ── Curved connector between steps ──────────────────── */}
                {!isLast && (
                  <CurvedConnector
                    direction={isOdd ? "left-to-right" : "right-to-left"}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            Ready to start your solar journey?
          </p>
          <a
            href="/solutions/solar-calculator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold text-base hover:bg-primary/90 transition-colors"
          >
            Get Your Free Estimate Now
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </LayoutContainer>
    </section>
  );
}
