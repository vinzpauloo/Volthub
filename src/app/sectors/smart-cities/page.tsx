"use client";

import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import BackToTopButton from "@/components/common/BackToTopButton";
import Link from "next/link";
import SectorQuickNav from "@/components/common/SectorQuickNav";
import {
  RiChargingPile2Line,
  RiLightbulbLine,
  RiCheckLine,
  RiCommunityLine,
} from "react-icons/ri";

const streetLights = [
  {
    itemNo: "F2-050",
    poleHeight: "8m",
    ledLight: "50W",
    size: "1319*460*60mm",
    battery: "12.8V 45Ah",
    solarPanel: "100W",
    type: "Integrated Light",
    image: "/Product/StreetLamp/F1L.png",
  },
  {
    itemNo: "F2-080",
    poleHeight: "9m",
    ledLight: "80W",
    size: "1490*640*60mm",
    battery: "25.6V 45Ah",
    solarPanel: "160W",
    type: "Integrated Light",
    image: "/Product/StreetLamp/F1L.png",
  },
  {
    itemNo: "F2-100",
    poleHeight: "10m",
    ledLight: "100W",
    size: "1490*730*60mm",
    battery: "25.6V 52Ah",
    solarPanel: "200W",
    type: "Integrated Light",
    image: "/Product/StreetLamp/F1L.png",
  },
  {
    itemNo: "F2-120",
    poleHeight: "12m",
    ledLight: "120W",
    size: "1650*830*60mm",
    battery: "25.6V 60Ah",
    solarPanel: "240W",
    type: "Integrated Light",
    image: "/Product/StreetLamp/F1L.png",
  },
  {
    itemNo: "LVQ2-050",
    poleHeight: "8m",
    ledLight: "50W",
    size: "935*415*210mm",
    battery: "14.8V 45Ah",
    solarPanel: "100W",
    type: "Split Street Light",
    image: "/Product/StreetLamp/RKlv02.png",
  },
  {
    itemNo: "LVQ2-080",
    poleHeight: "9m",
    ledLight: "80W",
    size: "935*415*210mm",
    battery: "12.8V 90Ah",
    solarPanel: "200W",
    type: "Split Street Light",
    image: "/Product/StreetLamp/RKlv02.png",
  },
  {
    itemNo: "LVQ2-100",
    poleHeight: "10m",
    ledLight: "100W",
    size: "935*415*210mm",
    battery: "25.6V 48Ah",
    solarPanel: "250W",
    type: "Split Street Light",
    image: "/Product/StreetLamp/RKS.png",
  },
  {
    itemNo: "LVQ2-120",
    poleHeight: "12m",
    ledLight: "120W",
    size: "935*415*210mm",
    battery: "25.6V 60Ah",
    solarPanel: "300W",
    type: "Split Street Light",
    image: "/Product/StreetLamp/RKS.png",
  },
];

const storageSystems = [
  {
    name: "Off-Grid Power Generation System",
    kWh: "100kWh",
    ratedPower: "50KW/AC 380V/220V",
    battery: "100.3kWh",
    solarPanel: "670W*72PCS",
    description:
      "Microgrid for a barangay center or campus. Suitable for school campus, barangay center + streetlights + market area.",
    image: "/Sector/sampleproducts/13.png",
  },
  {
    name: "Off-Grid Power Generation System",
    kWh: "215kWh",
    ratedPower: "100KW/AC 400V/220V",
    battery: "215.04kWh",
    solarPanel: "670W*144PCS",
    description:
      "Village / industrial-scale. Can supply tens of houses plus businesses, or one small industrial plant.",
    image: "/Sector/sampleproducts/14.png",
  },
  {
    name: "Off-Grid Power Generation System",
    kWh: "466kWh",
    ratedPower: "220KW/AC 400V/220V",
    battery: "465.8kWh",
    solarPanel: "670W*288PCS",
    description:
      "Mini power plant for a small town center or big factory. A town center: municipal hall, market, street lighting, plus many nearby shops.",
    image: "/Sector/sampleproducts/15.png",
  },
  {
    name: "Off-Grid Power Generation System",
    kWh: "783kWh",
    ratedPower: "300KW/AC 400V/220V",
    battery: "783.6kWh",
    solarPanel: "670W*444PCS",
    description:
      "Village or island grid. Can act as the main power plant for a whole small island barangay with a few hundred households.",
    image: "/Sector/sampleproducts/16.png",
  },
];

const evChargers = [
  {
    model: "DPEV-60k",
    type: "60 kW Dual-gun DC Charging Pile",
    description: "Entry-level DC fast charger. Good for malls, supermarkets, city public charging. Can support 1-2 vehicles at a time.",
    image: "/Product/EV/89.png",
  },
  {
    model: "DPEV-120k",
    type: "120 kW Dual-gun DC Charging Pile",
    description: "Standard fast charger. Perfect for highway rest stops, big commercial centers, fleet depots with higher turnover.",
    image: "/Product/EV/89.png",
  },
  {
    model: "DPEV-160k",
    type: "160 kW Single-gun DC Charging Pile",
    description: "High-power fast charger. Perfect for premium charging hubs, expressway service areas, sites serving EVs that support higher charging power.",
    image: "/Product/EV/53.png",
  },
];

export default function SmartCitiesSector() {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-100 min-h-[300px] md:min-h-[550px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/HomeBanner/banner3.jpg"
            alt="Smart Cities Energy Solutions"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-slate-900/40 z-10" />
        <div className=" z-20 px-2 md:px-16 lg:px-24">
          <LayoutContainer className="h-full flex flex-col justify-center gap-4 text-white pt-20">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-center md:text-left">
                Smart Cities Energy Solutions
              </h1>
              <p className="text-lg md:text-xl text-white/90 text-center md:text-left">
                Integrated energy infrastructure for modern cities. Street lighting, 
                EV charging networks, and microgrid systems for sustainable urban development.
              </p>
            </div>
          </LayoutContainer>
        </div>
      </section>

      <SectorQuickNav />

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <LayoutContainer>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <SectionHeading
              title="Building Sustainable Cities"
              description="Our smart city solutions combine solar street lighting, EV charging infrastructure, 
              and microgrid systems to create sustainable, efficient urban environments."
            />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: RiLightbulbLine,
                  title: "Smart Lighting",
                  desc: "Solar-powered street lights for safer, more efficient cities",
                },
                {
                  icon: RiChargingPile2Line,
                  title: "EV Infrastructure",
                  desc: "Public EV charging networks for sustainable transportation",
                },
                {
                  icon: RiCommunityLine,
                  title: "Microgrids",
                  desc: "Community power systems for reliable urban energy",
                },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl">
                  <feature.icon className="h-8 w-8 text-primary mb-4 mx-auto" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </LayoutContainer>
      </section>

      {/* Street Lights Section */}
      <section className="py-16 bg-slate-50">
        <LayoutContainer>
          <SectionHeading
            title="Solar Street Lighting Systems"
            description="Comprehensive range of integrated and split street lights for urban infrastructure"
          />
          <div className="overflow-x-auto mt-12">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Image</th>
                  <th className="px-6 py-4 text-left font-semibold">Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Item No.</th>
                  <th className="px-6 py-4 text-left font-semibold">Pole Height</th>
                  <th className="px-6 py-4 text-left font-semibold">LED Light</th>
                  <th className="px-6 py-4 text-left font-semibold">Battery</th>
                  <th className="px-6 py-4 text-left font-semibold">Solar Panel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {streetLights.map((light, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      {light.image && (
                        <div className="w-20 h-20 relative">
                          <Image
                            src={light.image}
                            alt={light.itemNo}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{light.type}</td>
                    <td className="px-6 py-4 font-medium">{light.itemNo}</td>
                    <td className="px-6 py-4 text-slate-600">{light.poleHeight}</td>
                    <td className="px-6 py-4 text-slate-600">{light.ledLight}</td>
                    <td className="px-6 py-4 text-slate-600">{light.battery}</td>
                    <td className="px-6 py-4 text-slate-600">{light.solarPanel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-3 text-slate-900">Product Notes:</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <RiCheckLine className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Payment term: 30% bank transfer in advance, the balance before shipping</span>
              </li>
              <li className="flex items-start gap-2">
                <RiCheckLine className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Contact us for current pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <RiCheckLine className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Production time: 20-25 working days after receiving payment</span>
              </li>
              <li className="flex items-start gap-2">
                <RiCheckLine className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Package: Standard Export package</span>
              </li>
            </ul>
          </div>
        </LayoutContainer>
      </section>

      {/* Storage Systems Section */}
      <section className="py-16 bg-white">
        <LayoutContainer>
          <SectionHeading
            title="Microgrid & Power Systems"
            description="Community-scale power generation for smart city infrastructure"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {storageSystems.map((system, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl shadow-lg overflow-hidden border border-slate-100"
              >
                {system.image && (
                  <div className="w-full h-40 relative bg-slate-100">
                    <Image
                      src={system.image}
                      alt={system.kWh}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{system.kWh}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Rated Power:</span>
                      <span className="font-medium">{system.ratedPower}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Battery:</span>
                      <span className="font-medium">{system.battery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Solar Panel:</span>
                      <span className="font-medium">{system.solarPanel}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 pt-2 border-t border-slate-100">
                    {system.description}
                  </p>
                  <Link
                    href="/products?category=cabinet"
                    className="block w-full text-center bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>

      {/* EV Charging Section */}
      <section className="py-16 bg-slate-50">
        <LayoutContainer>
          <SectionHeading
            title="Public EV Charging Infrastructure"
            description="Fast charging solutions for smart city transportation networks"
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {evChargers.map((charger, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100"
              >
                {charger.image && (
                  <div className="mb-6 w-full h-64 relative rounded-xl overflow-hidden bg-slate-50">
                    <Image
                      src={charger.image}
                      alt={charger.type}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{charger.type}</h3>
                <p className="text-sm text-slate-600 mb-4">{charger.description}</p>
                <div className="mb-4">
                  <span className="text-sm text-slate-500">Model: {charger.model}</span>
                </div>
                <Link
                  href={`/contact?subject=installation&product=ev-charging&model=${encodeURIComponent(charger.model)}&productName=${encodeURIComponent(charger.type)}`}
                  className="block w-full text-center bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contact for Quote
                </Link>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-white">
        <LayoutContainer>
          <SectionHeading
            title="Smart City Applications"
            description="Comprehensive solutions for modern urban infrastructure"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Street Lighting Networks",
                desc: "Solar-powered street lights for safer, more efficient urban areas with reduced grid dependency.",
              },
              {
                title: "Public EV Charging",
                desc: "Fast charging stations at malls, parks, and public areas to support electric vehicle adoption.",
              },
              {
                title: "Municipal Buildings",
                desc: "Power government offices, barangay halls, and public facilities with microgrid systems.",
              },
              {
                title: "Public Markets",
                desc: "Reliable power for markets, transport terminals, and commercial areas.",
              },
              {
                title: "Parks & Recreation",
                desc: "Lighting and charging infrastructure for public parks and recreational areas.",
              },
              {
                title: "Transportation Hubs",
                desc: "EV charging and power systems for bus terminals, train stations, and transport centers.",
              },
            ].map((useCase, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm text-slate-600">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-50">
        <LayoutContainer>
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              title="Why Choose Our Smart City Solutions"
              description="Designed for sustainable, efficient urban development"
            />
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {[
                "Dedicated customer support",
                "Professional installation and maintenance",
                "Payment terms: 30% advance, balance before shipping",
                "Production time: 20-25 working days",
                "Scalable solutions for growing cities",
                "Reduced grid dependency and energy costs",
                "24/7 monitoring and support available",
                "Compliance with urban planning standards",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <RiCheckLine className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </LayoutContainer>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-primary to-primary/80 text-white">
        <LayoutContainer>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Ready to Build a Smarter City?
            </h2>
            <p className="text-lg text-white/90">
              Get a free consultation and discover how our smart city solutions can transform your urban infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?interest=general-inquiry&subject=quote"
                className="bg-secondary text-black px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
              >
                Get Free Quote
              </Link>
              <Link
                href="/products"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                View All Products
              </Link>
            </div>
          </div>
        </LayoutContainer>
      </section>
      <BackToTopButton />
    </main>
  );
}


