"use client";

import { useState, useCallback } from "react";

import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiBus2Line,
  RiBuilding2Line,
  RiShoppingCart2Line,
} from "react-icons/ri";
import type { IconType } from "react-icons";

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

interface TabData {
  id: string;
  label: string;
  icon: IconType;
  iconColor: string; // colour used for the inactive icon
  heading: string;
  description: string;
  image: string;
  bannerImage: string; // background image for the tab button
}

const tabs: TabData[] = [
  {
    id: "home",
    label: "Home",
    icon: RiBus2Line,
    iconColor: "#2563eb",
    heading: "Introduction",
    description:
      "Charge your EV conveniently at home with VoltHub's smart residential charging solutions. Our compact, weatherproof chargers are designed for effortless daily use — simply plug in overnight and wake up to a full battery every morning. With intelligent scheduling that automatically charges during off-peak hours, real-time energy consumption tracking via the VoltHub app, and seamless solar integration, you'll enjoy the lowest possible running costs. Installation is quick and hassle-free, with certified electricians handling everything from site assessment to final commissioning.",
    image: "/EVpage/EvLocation/home.webp",
    bannerImage: "/EVpage/EvLocation/banner/homeb.webp",
  },

  {
    id: "workplaces",
    label: "Workplaces",
    icon: RiBuilding2Line,
    iconColor: "#ea580c",
    heading: "Introduction",
    description:
      "Empower your workforce with convenient, reliable EV charging right at the office. VoltHub's workplace charging solutions make it easy for employees to top up during the workday — boosting EV adoption, supporting your ESG commitments, and enhancing your employer brand. Our managed platform handles access control, smart load balancing across multiple bays, and automated billing so employees only pay for what they use. Detailed usage analytics and sustainability reports help you track carbon savings and meet corporate reporting requirements, while our scalable hardware grows with your team.",
    image: "/EVpage/EvLocation/workplace.webp",
    bannerImage: "/EVpage/EvLocation/banner/workplaceB.jpg",
  },
  {
    id: "commercial",
    label: "Commercial",
    icon: RiShoppingCart2Line,
    iconColor: "#7c3aed",
    heading: "Introduction",
    description:
      "Turn EV charging into a revenue stream and a powerful draw for customers. VoltHub's commercial charging solutions are built for retail centres, hotels, restaurants, and entertainment venues — anywhere drivers park, shop, or stay. Our chargers support multiple payment options including contactless tap-to-pay, QR code scanning, RFID cards, and subscription plans, giving your customers total flexibility. Customisable branding on charger displays and companion screens lets you showcase your brand or sell advertising space. With real-time utilisation dashboards, dynamic pricing controls, and seamless loyalty programme integration, your charging bays become a high-value amenity that increases dwell time, repeat visits, and revenue per square metre.",
    image: "/EVpage/EvLocation/commercial.webp",
    bannerImage: "/EVpage/EvLocation/banner/commercialB.jpg",
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function EvChargingTabbedFeaturesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleTabChange = useCallback(
    (idx: number) => {
      if (idx === activeTab) return;
      setAnimating(true);
      setTimeout(() => {
        setActiveTab(idx);
        setAnimating(false);
      }, 180);
    },
    [activeTab],
  );

  const current = tabs[activeTab];

  return (
    <section className="relative flex items-center overflow-hidden w-full">
      {/* ── Main faded card ── */}
      <div className="w-full relative overflow-hidden px-4">
          {/* Soft gradient background */}
          <div className="absolute inset-0 bg-linear-to-br from-sky-100/70 via-green-50/40 to-white pointer-events-none" />
          {/* Subtle radial glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-green-200/30 blur-3xl pointer-events-none" />

          {/* ── Tab bar — image cards ── */}
          <div className="relative ">
            <div className="flex flex-wrap md:flex-nowrap gap-0 min-h-[30vh]">
              {tabs.map((tab, idx) => {
                const isActive = activeTab === idx;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(idx)}
                    className={`
                      relative flex-1 flex flex-col items-center justify-end gap-2  pb-4 pt-24
                      text-sm font-semibold transition-all duration-300 ease-out
                      cursor-pointer select-none  overflow-hidden
                      bg-cover bg-center
                     
                    `}
                    style={{
                      backgroundImage: `url(${tab.bannerImage})`,
                    }}
                  >
                    {/* Overlay gradient for text readability */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isActive
                          ? "bg-gradient-to-t from-blue-900/80 via-blue-900/30 to-transparent"
                          : "bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent"
                      }`}
                    />

                   
                    <span className="relative">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Content area ── */}
          <div className="relative p-8 md:p-10 lg:p-12">
            <div
              className={`grid md:grid-cols-2 gap-10 md:gap-14 items-center transition-all duration-300 ${
                animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              {/* ── Left — Text ── */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {current.heading}
                </h3>

                {/* Accent bar */}
                <div className="w-16 h-1 rounded-full bg-[#1b62cc] mb-6" />

                <p className="text-base text-gray-600 leading-relaxed">
                  {current.description}
                </p>

                {/* Tab indicator dots */}
                <div className="flex gap-2 mt-8">
                  {tabs.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTabChange(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeTab === idx
                          ? "bg-[#1b62cc] scale-110"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to ${tabs[idx].label} tab`}
                    />
                  ))}
                </div>
              </div>

              {/* ── Right — Image ── */}
              <div className="flex items-center justify-center overflow-visible">
                <div
                  key={current.id}
                  className="animate-fade-in overflow-visible"
                >
                  <img
                    src={current.image}
                    alt={`${current.label} EV charging diagram`}
                    className="w-[100%] max-w-none h-auto mx-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
