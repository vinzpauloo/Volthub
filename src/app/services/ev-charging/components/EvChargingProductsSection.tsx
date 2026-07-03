import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import Link from "next/link";
import Image from "next/image";
import { RiCheckLine, RiChargingPile2Line } from "react-icons/ri";

const chargers = [
  {
    model: "DPEV-7k",
    type: "7 kW Single-gun AC Charging Pile",
    description: "AC 'slow' charger for residential, office, hotel parking. Low installation cost, suitable as basic amenity charger.",
    image: "/Product/EV/59.png",
    features: [
      "Perfect for residential & workplace",
      "4-8 hour full charge time",
      "Low installation cost",
      "Basic amenity charger",
    ],
    color: "blue",
  },
  {
    model: "DPEV-60k",
    type: "60 kW Dual-gun DC Charging Pile",
    description: "Entry-level DC fast charger. Good for malls, supermarkets, city public charging. Can support 1-2 vehicles at a time.",
    image: "/Product/EV/89.png",
    features: [
      "Ideal for commercial & public use",
      "20-40 minute fast charge",
      "Dual-gun design",
      "Entry-level fast charging",
    ],
    color: "green",
  },
  {
    model: "DPEV-120k",
    type: "120kW Dual-gun DC Charging Pile",
    description: "Standard fast charger. Perfect for highway rest stops, big commercial centers, fleet depots with higher turnover.",
    image: "/Product/EV/89.png",
    features: [
      "Highway rest stops",
      "Big commercial centers",
      "Fleet depots",
      "Higher turnover sites",
    ],
    color: "green",
  },
  {
    model: "DPEV-160k",
    type: "160 kW Single-gun DC Charging Pile",
    description: "High-power fast charger. Perfect for premium charging hubs, expressway service areas, sites serving EVs that support higher charging power.",
    image: "/Product/EV/53.png",
    features: [
      "Premium charging hubs",
      "Expressway service areas",
      "High-power charging",
      "Future-proof technology",
    ],
    color: "purple",
  },
  {
    model: "DPEV-400k",
    type: "400 kW Single-gun DC Charging Pile",
    description: "Ultra-fast DC charger. For flagship highway stations, bus/truck depots needing very high power. Allows very short charging stops.",
    image: "/Product/EV/64.png",
    features: [
      "Flagship highway stations",
      "Bus/truck depots",
      "Ultra-fast charging",
      "Very short charging stops",
    ],
    color: "purple",
  },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-600 hover:bg-blue-700",
  green: "bg-green-600 hover:bg-green-700",
  purple: "bg-purple-600 hover:bg-purple-700",
};

const headerClasses: Record<string, string> = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  purple: "bg-purple-600",
};

export default function EvChargingProductsSection() {
  return (
    <section className="py-20">
      <LayoutContainer>
        <div className="text-center mb-16">
          <SectionHeading
            title="EV Charging Solutions"
            description="Choose the right charging solution for your needs"
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chargers.map((charger, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
            >
              {charger.image && (
                <div className="w-full h-48 relative bg-slate-50">
                  <Image
                    src={charger.image}
                    alt={charger.type}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              )}
              <div
                className={`${headerClasses[charger.color]} text-white p-6 text-center`}
              >
                <RiChargingPile2Line className="text-4xl mx-auto mb-2" />
                <h3 className="text-xl font-bold mb-1">{charger.type}</h3>
                <p className="text-sm text-white/90">Model: {charger.model}</p>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  {charger.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {charger.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start space-x-2 text-sm"
                    >
                      <RiCheckLine className="text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?subject=installation&product=ev-charging&model=${encodeURIComponent(charger.model)}&productName=${encodeURIComponent(charger.type)}`}
                  className={`block w-full ${colorClasses[charger.color]} text-white py-3 rounded-xl font-semibold text-center transition-colors`}
                >
                  Contact for Pricing
                </Link>
              </div>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}
