import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiComputerLine,
  RiSmartphoneLine,
  RiBarChart2Line,
  RiChargingPile2Line,
  RiUserSettingsLine,
  RiMoneyDollarCircleLine,
  RiNotification3Line,
  RiMapPinUserLine,
  RiHistoryLine,
  RiQrCodeLine,
} from "react-icons/ri";

const adminFeatures = [
  {
    icon: RiBarChart2Line,
    title: "Real-Time Dashboard",
    desc: "Monitor all charging stations, energy usage, and revenue from a single dashboard.",
  },
  {
    icon: RiChargingPile2Line,
    title: "Station Management",
    desc: "Configure pricing, manage access, push firmware updates, and control stations remotely.",
  },
  {
    icon: RiUserSettingsLine,
    title: "User & Fleet Management",
    desc: "Manage user accounts, RFID cards, fleet charging schedules, and access permissions.",
  },
  {
    icon: RiMoneyDollarCircleLine,
    title: "Revenue & Billing",
    desc: "Automated billing, transaction reports, revenue analytics, and payment reconciliation.",
  },
];

const appFeatures = [
  {
    icon: RiMapPinUserLine,
    title: "Find & Navigate",
    desc: "Locate available charging stations nearby with real-time availability and turn-by-turn directions.",
  },
  {
    icon: RiQrCodeLine,
    title: "Start & Pay",
    desc: "Scan QR code or tap RFID to start charging. Pay via card, mobile wallet, or subscription.",
  },
  {
    icon: RiNotification3Line,
    title: "Smart Notifications",
    desc: "Get alerts when charging is complete, station becomes available, or for maintenance updates.",
  },
  {
    icon: RiHistoryLine,
    title: "History & Insights",
    desc: "Track charging history, energy consumption, cost savings, and environmental impact over time.",
  },
];

export default function EvChargingPlatformSection() {
  return (
    <section className="py-20">
      <LayoutContainer>
        <div className="text-center mb-16">
          <SectionHeading
            title="Powered by Smart Software"
            description="Every installation comes with our integrated management platform and mobile app to maximize your charging investment"
          />
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Admin Panel */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-linear-to-br from-gray-900 to-gray-800 p-6 text-center">
              <RiComputerLine className="text-4xl text-white/80 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white">Admin Panel</h3>
              <p className="text-sm text-white/60 mt-1">
                Full control and visibility over your charging network
              </p>
            </div>
            <div className="p-6 space-y-4">
              {adminFeatures.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-50 rounded-lg shrink-0">
                    <feature.icon className="text-xl text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile App */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-linear-to-br from-green-800 to-green-700 p-6 text-center">
              <RiSmartphoneLine className="text-4xl text-white/80 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white">Mobile App</h3>
              <p className="text-sm text-white/60 mt-1">
                Seamless charging experience for your end users
              </p>
            </div>
            <div className="p-6 space-y-4">
              {appFeatures.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg shrink-0">
                    <feature.icon className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
