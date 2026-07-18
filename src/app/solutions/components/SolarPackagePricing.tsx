"use client";

import { useState } from "react";
import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import { SYSTEM_TABS } from "../data/solarPackagePricingData";
import { WHATS_INCLUDED } from "../data/solarPackagePricingData";
import Link from "next/link";


// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface PackageSpec {
  label: string;
  value: string;
}

interface PackageTier {
  kw: number;
  label: string;
  price: string;
  tagline: string;
  specs: PackageSpec[];
  popular?: boolean;
}

interface SystemTab {
  id: "hybrid" | "offgrid" | "gridtied";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  packages: PackageTier[];
}



// ---------------------------------------------------------------------------
// What's Included (shared across all packages)
// ---------------------------------------------------------------------------



// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SolarPackagePricing(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<SystemTab["id"]>("hybrid");

  const currentTab = SYSTEM_TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Package Pricing"
          title="Custom-Made Solar Packages"
          description="Transparent pricing for our most popular solar setups. Every package is tailored to your roof, energy needs, and budget — these are guide prices for typical installations."
        />

        {/* ---- Tab Bar ---- */}
        <div className="flex justify-center w-full">
          <div className="inline-flex bg-white rounded-2xl border border-gray-200 p-1.5 gap-1 shadow-sm">
            {SYSTEM_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-lg font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="text-xl" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- Tab Description ---- */}
        {/* <p className="text-center text-gray-500 max-w-2xl mx-auto -mt-6">
          {currentTab.description}
        </p> */}

        {/* ---- Package Cards ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {currentTab.packages.map((pkg) => (
            <div
              key={pkg.label}
              className={`relative bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow ${
                pkg.popular
                  ? "border-primary/40 ring-2 ring-primary/20"
                  : "border-gray-200"
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              {/* Header */}
              <div className="text-center mb-5 mt-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {pkg.label}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{pkg.tagline}</p>
                <p className="text-2xl font-extrabold text-primary mt-3">
                  {pkg.price}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  estimated installed cost
                </p>
              </div>

              {/* Specs */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
                {pkg.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-xs text-gray-500">{spec.label}</span>
                    <span className="text-xs font-semibold text-gray-800 text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
               {/* CTA */}
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex w-full justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ---- What's Included ---- */}
        <div className="max-w-5xl mx-auto w-full">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
            What&apos;s Included in Every Package
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHATS_INCLUDED.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- CTA ---- */}
        <p className="text-center text-sm text-gray-400">
          Prices are estimates for typical residential installations.{" "}
          <span className="font-semibold text-gray-600">
            Contact us for a free custom quote
          </span>{" "}
          tailored to your home, energy usage, and roof layout.
        </p>
      </LayoutContainer>
    </section>
  );
}
