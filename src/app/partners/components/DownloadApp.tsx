"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import { RiAppleLine, RiGooglePlayLine, RiQrCodeLine } from "react-icons/ri";
import { IoHome, IoHomeOutline, IoMapSharp, IoPerson, IoQrCode, IoTimer } from "react-icons/io5";

interface SubScreen {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  image: string;
}

interface AppGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  screens: SubScreen[];
}

const APP_GROUPS: AppGroup[] = [
  {
    id: "home",
    icon: IoHome,
    label: "Home",
    description: "Your personalized dashboard and account management.",
    screens: [
      { id: "home",icon: IoHomeOutline, label: "Dashboard", image: "/EVpage/home.png" },
      { id: "account", icon: IoPerson, label: "Account", image: "/EVpage/account.png" },
    ],
  },
  {
    id: "map",
    icon: IoMapSharp  ,
    label: "Find Stations",
    description: "Browse, filter, and view details of nearby charging stations.",
    screens: [
      { id: "station", icon: IoMapSharp, label: "Station List", image: "/EVpage/station.png" },
      { id: "stationconnector", icon: IoQrCode, label: "Connectors", image: "/EVpage/stationconnector.png" },
      { id: "filter", icon: IoTimer,   label: "Filters", image: "/EVpage/filter.png" },
    ],
  },
  {
    id: "charging",
    label: "Charging",
    icon: IoQrCode,
    description: "Start and monitor your charging sessions in real time.",
    screens: [
      { id: "starcharging", icon: IoQrCode, label: "Start Charging", image: "/EVpage/starcharging.png" },
      { id: "summary", icon: IoTimer, label: "Summary", image: "/EVpage/summary.png" },
    ],
  },
  {
    id: "activity",
    label: "Activity Sessions",
    icon: IoTimer   ,
    description: "Manage your wallet balance and payment methods.",
    screens: [
      { id: "walle1t", icon: IoHome, label: "Wallet", image: "/EVpage/wallet.png" },
      { id: "topup", icon: IoPerson, label: "Top Up", image: "/EVpage/topup.png" },
    ],
  },

{
    id: "account",
    label: "Account Management",
    icon: IoPerson   ,
    description: "Manage your wallet balance and payment methods.",
    screens: [
      { id: "walle1t", icon: IoHome, label: "Wallet", image: "/EVpage/wallet.png" },
      { id: "topup", icon: IoPerson, label: "Top Up", image: "/EVpage/topup.png" },
    ],
  },

];

export function DownloadApp(): React.ReactElement {
  const [activeGroup, setActiveGroup] = useState(APP_GROUPS[0].id);
  const [activeSub, setActiveSub] = useState(APP_GROUPS[0].screens[0].id);

  const currentGroup = useMemo(
    () => APP_GROUPS.find((g) => g.id === activeGroup) ?? APP_GROUPS[0],
    [activeGroup],
  );

  const currentScreen = useMemo(
    () =>
      currentGroup.screens.find((s) => s.id === activeSub) ??
      currentGroup.screens[0],
    [currentGroup, activeSub],
  );

  const handleGroupClick = (group: AppGroup) => {
    setActiveGroup(group.id);
    setActiveSub(group.screens[0].id);
  };

  return (
    <section className="section-spacing bg-white">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Mobile App"
          title="Download the VoltHub App"
          description="Take control of your EV charging experience with the VoltHub mobile app. Available on iOS and Android."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-[560px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-gray-800 rounded-[2.5rem] overflow-hidden flex flex-col">
                  {/* Notch */}
                  <div className="h-5 bg-gray-900 rounded-b-xl mx-auto w-1/3" />
                  {/* Screen */}
                  <div className="flex-1 bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src={currentScreen.image}
                      alt={currentScreen.label}
                      width={288}
                      height={500}
                      className="w-full h-full object-fit "
                    />
                  </div>
                  {/* Home indicator */}
                  <div className="h-1 bg-gray-600 rounded-full mx-auto w-1/3 my-2" />
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary/30 to-primary/30 rounded-[3.5rem] blur-2xl -z-10" />
            </div>
          </div>

          {/* App Info — Grouped Column List */}
          <div className="space-y-3">
            {APP_GROUPS.map((group) => {
              const isActive = activeGroup === group.id;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => handleGroupClick(group)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? "border-primary/50 bg-primary/5 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                        isActive ? "transparent" : "transparent"
                      }`}
                    >
                      <group.icon
                        className={`w-12 h-12 ${
                          isActive ? "text-green-800" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium ${
                          isActive ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {group.label}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {group.description}
                      </p>

                      {/* Inner Tabs — only visible when group is active */}
                      {isActive && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {group.screens.map((sub) => (
                            <span
                              key={sub.id}
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveSub(sub.id);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveSub(sub.id);
                                }
                              }}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                                activeSub === sub.id
                                  ? "bg-green-900 text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              <group.icon className="w-3.5 h-3.5" />
                              <span>{sub.label}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* QR Code + Store Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 ">
            <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm w-60 h-60 flex items-center justify-center">
              <RiQrCodeLine className="text-7xl text-gray-800" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 lg:gap-12">
            <h1 className="text-2xl font-bold text-gray-800">
              Download the App
            </h1>
            <p className="text-gray-600">
              Scan the QR code to download the VoltHub app on your mobile
              device.
            </p>
            <div className="flex flex-row gap-3">
              <button
                type="button"
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <RiAppleLine className="text-2xl" />
                <div className="text-left">
                  <p className="text-xs text-white/70">Download on the</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </button>
              <button
                type="button"
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <RiGooglePlayLine className="text-2xl" />
                <div className="text-left">
                  <p className="text-xs text-white/70">Get it on</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
