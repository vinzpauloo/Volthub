"use client";

import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import { RiAppleLine, RiGooglePlayLine, RiQrCodeLine } from "react-icons/ri";

const FEATURES = [
  "Find nearby charging stations in real time",
  "Start and stop charging sessions from your phone",
  "Track charging history and energy consumption",
  "Pay securely with multiple payment methods",
  "Get notified when your vehicle is fully charged",
];

export function DownloadApp(): React.ReactElement {
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
                  <div className="h-7 bg-gray-900 rounded-b-xl mx-auto w-1/3" />
                  {/* Screen */}
                  <div className="flex-1 bg-gradient-to-br from-primary to-primary/80 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 9V3h7v6h-7zm-9 0V3h7v6H4zm9 12v-6h7v6h-7zm-9 0v-6h7v6H4z" />
                      </svg>
                    </div>
                    <p className="text-white font-bold text-xl">VoltHub</p>
                    <p className="text-white/70 text-sm">EV Charging Network</p>
                  </div>
                  {/* Home indicator */}
                  <div className="h-1 bg-gray-600 rounded-full mx-auto w-1/3 my-2" />
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary/30 to-primary/30 rounded-[3.5rem] blur-2xl -z-10" />
            </div>
          </div>

          {/* App Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              {FEATURES.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* QR Code + Store Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                <RiQrCodeLine className="text-7xl text-gray-800" />
              </div>
              <div className="flex flex-col gap-3">
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
        </div>
      </LayoutContainer>
    </section>
  );
}
