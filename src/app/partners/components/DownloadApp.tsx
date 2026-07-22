"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import { RiAppleLine, RiGooglePlayLine, RiQrCodeLine } from "react-icons/ri";
import {
  IoHome,
  IoMapSharp,
  IoFlashSharp,
  IoTimeSharp,
  IoPersonSharp,
  IoCarSportOutline,
  IoWalletOutline,
  IoLocationOutline,
  IoCarOutline,
  IoCardOutline,
  IoNavigateOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoHelpCircleOutline,
  IoClose,
} from "react-icons/io5";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SubScreen {
  id: string;
  label: string;
  description: string;
  images: string[];
}

interface AppGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  screens: SubScreen[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const APP_GROUPS: AppGroup[] = [
  // ── HOME ──────────────────────────────────────────────────────────────
  {
    id: "home",
    label: "Home",
    icon: IoHome,
    description: "Your personalized dashboard and account overview.",
    screens: [
      {
        id: "home-dashboard",
        label: "Home",
        description:
          "Your personalized dashboard with quick access to charging status, nearby stations, and account overview.",
        images: ["/EVpage/AppScreen/Home.png"],
      },
      {
        id: "home-vehicle",
        label: "Vehicle",
        description:
          "View and manage your registered electric vehicles, including battery levels and charging preferences.",
        images: ["/EVpage/AppScreen/Vehicle.png"],
      },
      {
        id: "home-wallet",
        label: "Wallet",
        description:
          "Track your wallet balance, view transaction history, and access quick top-up options right from the home screen.",
        images: ["/EVpage/AppScreen/Wallet_history.png", "/EVpage/AppScreen/Wallet.png"],
      },
      {
        id: "home-nearby",
        label: "Nearby",
        description:
          "Discover nearby charging stations and available connectors with real-time availability status.",
        images: ["/EVpage/AppScreen/Home-Nearby.png", "/EVpage/AppScreen/Home-connetorM.png"],
      },
    ],
  },

  // ── FIND STATIONS ─────────────────────────────────────────────────────
  {
    id: "find-stations",
    label: "Find Stations",
    icon: IoMapSharp,
    description: "Browse, search, and filter charging stations near you.",
    screens: [
      {
        id: "find-map",
        label: "Map",
        description:
          "Interactive map view to locate charging stations in your area with real-time availability indicators.",
        images: ["/EVpage/AppScreen/Map.png"],
      },
      {
        id: "find-filter",
        label: "Filter",
        description:
          "Filter stations by connector type, charging speed, availability, power output, and more to find the perfect match.",
        images: ["/EVpage/AppScreen/Map-Filter2.png"],
      },
      {
        id: "find-search",
        label: "Search",
        description:
          "Search for charging stations by name, address, or location with smart autocomplete suggestions.",
        images: ["/EVpage/AppScreen/Find-Station.png"],
      },
      {
        id: "find-station-detail",
        label: "Station",
        description:
          "View detailed station information including available connectors, pricing, amenities, and user reviews.",
        images: ["/EVpage/AppScreen/StationA.png", "/EVpage/AppScreen/Station-DetailB.png"],
      },
      {
        id: "find-connector",
        label: "Connector",
        description:
          "Browse and select the right connector type for your EV — filter by plug type, charging speed, and availability.",
        images: ["/EVpage/AppScreen/Choose-Connector.png"],
      },
    ],
  },

  // ── CHARGING ──────────────────────────────────────────────────────────
  {
    id: "charging",
    label: "Charging",
    icon: IoFlashSharp,
    description: "Start, monitor, and manage your charging sessions.",
    screens: [
      {
        id: "charging-scan",
        label: "Scan",
        description:
          "Scan the QR code on any VoltHub charging station to instantly start a charging session.",
        images: ["/EVpage/AppScreen/scan.png"],
      },
      {
        id: "charging-start",
        label: "Start",
        description:
          "Begin your charging session with customizable settings including charge limit and scheduling preferences.",
        images: ["/EVpage/AppScreen/Start-session.png", "/EVpage/AppScreen/Session-start.png"],
      },
      {
        id: "charging-live-meter",
        label: "Live Meter",
        description:
          "Real-time monitoring of your active charging session with live power draw, energy delivered, and cost tracking.",
        images: ["/EVpage/AppScreen/live-meterB.png", "/EVpage/AppScreen/liver-meterA.png"],
      },
      {
        id: "charging-stop",
        label: "Stop",
        description:
          "Stop an active charging session at any time with a single tap — view a quick summary and confirm before ending.",
        images: ["/EVpage/AppScreen/Stop-session.png"],
      },
      {
        id: "charging-unplug",
        label: "Unplug",
        description:
          "Safely end your charging session with clear unplug instructions and a final status summary before disconnecting.",
        images: ["/EVpage/AppScreen/Session-Unplug.png"],
      },
      
      {
        id: "charging-receipt",
        label: "Receipt",
        description:
          "View your detailed session receipt with energy consumption breakdown, cost summary, and environmental impact saved.",
        images: [
          "/EVpage/AppScreen/Session-receiptA.png",
          "/EVpage/AppScreen/Session-recieptB.png",
          "/EVpage/AppScreen/Session-summaryB.png",
        ],
      },
    ],
  },

  // ── ACTIVITY ──────────────────────────────────────────────────────────
  {
    id: "activity",
    label: "Activity",
    icon: IoTimeSharp,
    description: "Review your charging history and session details.",
    screens: [
      {
        id: "activity-list",
        label: "Activity",
        description:
          "Browse your complete charging history with session logs, energy consumed, and total spend for each session.",
        images: ["/EVpage/AppScreen/Activity.png"],
      },
      {
        id: "activity-details",
        label: "Details",
        description:
          "View in-depth details of any completed charging session including charge curve, cost breakdown, and location info.",
        images: ["/EVpage/AppScreen/Session-complete.png"],
      },
    ],
  },

  // ── ACCOUNT ───────────────────────────────────────────────────────────
  {
    id: "account",
    label: "Account",
    icon: IoPersonSharp,
    description: "Manage your profile, vehicles, payments, and settings.",
    screens: [
      {
        id: "account-profile",
        label: "Account",
        description:
          "Manage your profile information, preferences, linked accounts, and personal details.",
        images: ["/EVpage/AppScreen/Account.png", "/EVpage/AppScreen/AccountA.png"],
      },
     
      {
        id: "account-vehicle",
        label: "Vehicle",
        description:
          "Add, edit, or remove vehicles from your account. Store your EV model, battery specs, and charging preferences.",
        images: [
          "/EVpage/AppScreen/Find-Vehicle.png",
          "/EVpage/AppScreen/Find-vehicleB.png",
          "/EVpage/AppScreen/Add-Vehicle.png",
        ],
      },
      {
        id: "account-wallet",
        label: "Wallet",
        description:
          "Manage your VoltHub wallet — view your QR payment code, top up your balance, and set spending limits.",
        images: [
          "/EVpage/AppScreen/Wallet-qr.png",
          "/EVpage/AppScreen/wallet-qrA.png",
          "/EVpage/AppScreen/Wallet-Topup.png",
          "/EVpage/AppScreen/Wallet-chargeLimit.png",
        ],
      },
      {
        id: "account-plan-trip",
        label: "Plan Trip",
        description:
          "Plan your route with smart charging stop recommendations based on your vehicle's range and station availability.",
        images: ["/EVpage/AppScreen/Plan-Trip.png"],
      },
      {
        id: "account-payment",
        label: "Payment",
        description:
          "Manage your payment methods, billing information, and view your payment history.",
        images: ["/EVpage/AppScreen/Payment.png"],
      },
      {
        id: "account-notification",
        label: "Notification",
        description:
          "Configure your notification preferences — charging alerts, promotions, session reminders, and more.",
        images: ["/EVpage/AppScreen/Notification.png", "/EVpage/AppScreen/Notif-Top.png"],
      },
      {
        id: "account-settings",
        label: "App Setting",
        description:
          "Customize your app experience including theme, units, language, and privacy preferences.",
        images: ["/EVpage/AppScreen/App-SettingA.png", "/EVpage/AppScreen/Account-Setting.png"],
      },
      {
        id: "account-support",
        label: "Support",
        description:
          "Get help, browse FAQs, or contact our support team for assistance with any issue.",
        images: ["/EVpage/AppScreen/Support.png"],
      },
       {
        id: "account-login",
        label: "Login",
        description:
          "Sign in to your VoltHub account securely — supports email, phone, and social login options for quick access.",
        images: ["/EVpage/AppScreen/Login.png"],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Admin panel screenshots
// ---------------------------------------------------------------------------

const ADMIN_PANEL_IMAGES = [
  { src: "/EVpage/AdminPanel/chrome_8BXL5csBm9.png", alt: "Admin Dashboard" },
  { src: "/EVpage/AdminPanel/chrome_FQXMLe1TaN.png", alt: "Admin Stations" },
  { src: "/EVpage/AdminPanel/chrome_fUNj036wvk.png", alt: "Admin Sessions" },
  { src: "/EVpage/AdminPanel/chrome_JTNAEsmbfu.png", alt: "Admin Users" },
  { src: "/EVpage/AdminPanel/chrome_m358SdqqaK.png", alt: "Admin Analytics" },
  { src: "/EVpage/AdminPanel/chrome_waP3cTMLtq.png", alt: "Admin Settings" },
];

// ---------------------------------------------------------------------------
// Auto-slideshow hook
// ---------------------------------------------------------------------------

const SLIDESHOW_INTERVAL_MS = 4000;

function useImageSlideshow(images: string[]) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images]);

  // Guard against stale index when the image array shrinks or changes
  if (index >= images.length) {
    return images[0] ?? images[0];
  }
  return images[index] ?? images[0];
}

// ---------------------------------------------------------------------------
// Sub-screen pill icons (simple mapping so each pill gets its own icon)
// ---------------------------------------------------------------------------

const SUB_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "home-dashboard": IoHome,
  "home-vehicle": IoCarSportOutline,
  "home-wallet": IoWalletOutline,
  "home-nearby": IoLocationOutline,
  "find-map": IoMapSharp,
  "find-filter": IoMapSharp,
  "find-search": IoMapSharp,
  "find-station-detail": IoMapSharp,
  "find-connector": IoMapSharp,
  "charging-scan": IoFlashSharp,
  "charging-start": IoFlashSharp,
  "charging-live-meter": IoFlashSharp,
  "charging-unplug": IoFlashSharp,
  "charging-stop": IoFlashSharp,
  "charging-receipt": IoFlashSharp,
  "activity-list": IoTimeSharp,
  "activity-details": IoTimeSharp,
  "account-profile": IoPersonSharp,
  "account-login": IoPersonSharp,
  "account-vehicle": IoCarOutline,
  "account-wallet": IoCardOutline,
  "account-plan-trip": IoNavigateOutline,
  "account-payment": IoCardOutline,
  "account-notification": IoNotificationsOutline,
  "account-settings": IoSettingsOutline,
  "account-support": IoHelpCircleOutline,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DownloadApp(): React.ReactElement {
  const [activeGroup, setActiveGroup] = useState(APP_GROUPS[0].id);
  const [activeSub, setActiveSub] = useState(APP_GROUPS[0].screens[0].id);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedAdminImg, setSelectedAdminImg] = useState(0);

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

  // Auto-rotating image for the current sub-screen
  const displayImage = useImageSlideshow(currentScreen.images);

  const handleGroupClick = (group: AppGroup) => {
    setActiveGroup(group.id);
    setActiveSub(group.screens[0].id);
  };

  const handleSubClick = (subId: string) => {
    setActiveSub(subId);
  };

  return (
    <section className="section-spacing bg-white">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Mobile App"
          title="Download the VoltHub App"
          description="Take control of your EV charging experience with the VoltHub mobile app. Available on iOS and Android."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── Phone Mockup ─────────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-72 h-[560px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-gray-800 rounded-[2.5rem] overflow-hidden flex flex-col">
                  {/* Notch */}
                  <div className="h-5 bg-gray-900 rounded-b-xl mx-auto w-1/3" />
                  {/* Screen */}
                  <div className="flex-1 bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src={displayImage}
                      alt={currentScreen.label}
                      width={288}
                      height={500}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                  </div>
                  {/* Home indicator */}
                  <div className="h-1 bg-gray-600 rounded-full mx-auto w-1/3 my-2" />
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary/30 to-primary/30 rounded-[3.5rem] blur-2xl -z-10" />
            </div>

            {/* Active sub-screen description below phone */}
            <div className="text-center max-w-xs">
              <p className="text-sm font-semibold text-gray-800">
                {currentScreen.label}
              </p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {currentScreen.description}
              </p>
            </div>
          </div>

          {/* ── App Info — Grouped Accordion List ────────────────────── */}
          <div className="space-y-3">
            {APP_GROUPS.map((group) => {
              const isActive = activeGroup === group.id;

              return (
                <div
                  key={group.id}
                  className={`rounded-xl border transition-all duration-200 ${
                    isActive
                      ? "border-primary/50 bg-primary/5 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {/* Group header button */}
                  <button
                    type="button"
                    onClick={() => handleGroupClick(group)}
                    className="w-full text-left p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
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
                      </div>
                    </div>
                  </button>

                  {/* Sub-tabs — visible when group is active */}
                  {isActive && (
                    <div className="px-4 pb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {group.screens.map((sub) => {
                          const isSubActive = activeSub === sub.id;
                          const SubIcon = SUB_ICON_MAP[sub.id];

                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleSubClick(sub.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                                isSubActive
                                  ? "bg-green-900 text-white shadow-sm"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {SubIcon && <SubIcon className="w-3.5 h-3.5" />}
                              <span>{sub.label}</span>
                              {sub.images.length > 1 && (
                                <span className="ml-0.5 opacity-60" title="Auto-rotating screenshots">
                                  ↻
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active sub-screen description */}
                      <div className="mt-3 pt-3 border-t border-primary/20">
                        <p className="text-sm font-medium text-gray-800">
                          {currentScreen.label}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                          {currentScreen.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── QR Code + Store Buttons ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
            <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm w-60 h-60 flex items-center justify-center">
              <RiQrCodeLine className="text-7xl text-gray-800" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 lg:gap-12">
            <h2 className="text-2xl font-bold text-gray-800">
              Download the App
            </h2>
            <p className="text-gray-600 text-center max-w-sm">
              Scan the QR code to download the VoltHub app on your mobile
              device and start charging smarter today.
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

        {/* ── View Admin Panel Button ─────────────────────────────────── */}
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setAdminModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-200"
          >
            <IoSettingsOutline className="w-5 h-5" />
            View Sample Admin Panel
          </button>
        </div>

        {/* ── Admin Panel Modal (Full Screen) ──────────────────────────── */}
        {adminModalOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-gray-950">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-white">
                  VoltHub Admin Panel
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  {ADMIN_PANEL_IMAGES[selectedAdminImg].alt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAdminModalOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Main image — fills remaining space */}
            <div className="flex-1 flex items-center justify-center p-4 min-h-0">
              <Image
                src={ADMIN_PANEL_IMAGES[selectedAdminImg].src}
                alt={ADMIN_PANEL_IMAGES[selectedAdminImg].alt}
                width={1440}
                height={900}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Thumbnail strip at bottom */}
            <div className="shrink-0 px-6 py-4 border-t border-gray-800 bg-gray-900">
              <div className="flex items-center justify-center gap-3 overflow-x-auto">
                {ADMIN_PANEL_IMAGES.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setSelectedAdminImg(idx)}
                    className={`shrink-0 relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      idx === selectedAdminImg
                        ? "border-primary shadow-lg shadow-primary/30 scale-105"
                        : "border-gray-700 hover:border-gray-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={160}
                      height={100}
                      className="w-28 h-16 object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 text-[10px] text-center text-white bg-black/60 py-0.5 leading-tight">
                      {img.alt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </LayoutContainer>
    </section>
  );
}
