"use client";

import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import BackToTopButton from "@/components/common/BackToTopButton";
import Link from "next/link";
import SectorQuickNav from "@/components/common/SectorQuickNav";
import {
  RiBatteryChargeLine,
  RiChargingPile2Line,
  RiCheckLine,
  RiBuilding2Line,
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
];

const storageSystems = [
  {
    name: "Mobile Energy Storage Power",
    kWh: "10kWh",
    ratedPower: "5KW/AC 220V",
    battery: "10.6kWh",
    solarPanel: "36V670W*6",
    description: "Standard home / small business. Can run 1-2 HP aircon, refrigerator, lights, fans, TV, computers.",
    image: "/Product/SmartHome/SMP3.png",
  },
  {
    name: "Mobile Energy Storage Power",
    kWh: "15kWh",
    ratedPower: "5KW/AC 220V",
    battery: "15.9kWh",
    solarPanel: "36V670W*8",
    description: "Longer backup, same power. Good for stores with freezers that must stay cold overnight.",
    image: "/Product/SmartHome/SMP4.png",
  },
  {
    name: "Mobile Energy Storage Power",
    kWh: "20kWh",
    ratedPower: "10KW/AC 220V",
    battery: "21.2kWh",
    solarPanel: "36V670W*12",
    description: "Larger home / small commercial. Can run multiple aircons (3-4 HP total), refrigerator/freezer, lights, computers.",
    image: "/Product/SmartHome/SMP5.png",
  },
  {
    name: "Off-Grid Power Generation System",
    kWh: "40kWh",
    ratedPower: "20KW/AC 380V/220V",
    battery: "40.96kWh",
    solarPanel: "670W*30PCS",
    description: "Small commercial / remote facility. Can power 5-10 small houses or a water refilling station, rice mill, small cold room.",
    image: "/Product/cabinet/20k.png",
  },
  {
    name: "Off-Grid Power Generation System",
    kWh: "60kWh",
    ratedPower: "30KW/AC 380V/220V",
    battery: "61.4kWh",
    solarPanel: "670W*40PCS",
    description: "Small community or larger business. Can power a small resort (10+ rooms, kitchen, bar, pool pump).",
    image: "/Product/cabinet/30k.png",
  },
  {
    name: "Off-Grid Power Generation System",
    kWh: "100kWh",
    ratedPower: "50KW/AC 380V/220V",
    battery: "100.3kWh",
    solarPanel: "670W*72PCS",
    description: "Microgrid for a barangay center or campus. Suitable for school campus, barangay center + streetlights + market area.",
    image: "/Product/cabinet/50k.png",
  },
  {
    name: "Off-Grid Power Generation System",
    kWh: "215kWh",
    ratedPower: "100KW/AC 400V/220V",
    battery: "215.04kWh",
    solarPanel: "670W*144PCS",
    description: "Village / industrial-scale. Can supply tens of houses plus businesses, or one small industrial plant.",
    image: "/Product/cabinet/200kwh.png",
  },
];

const evChargers = [
  {
    model: "DPEV-7k",
    type: "7 kW Single-gun AC Charging Pile",
    description: "AC 'slow' charger for residential, office, hotel parking. Low installation cost, suitable as basic amenity charger.",
    image: "/Product/EV/59.png",
  },
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
];

export default function CommercialSector() {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-100 min-h-[300px] md:min-h-[550px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/HomeBanner/banner3.jpg"
            alt="Commercial Energy Solutions"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-slate-900/40 z-10" />
        <div className=" z-20 px-2 md:px-16 lg:px-24">
          <LayoutContainer className="h-full flex flex-col justify-center gap-4 text-white pt-20">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-center md:text-left">
                Commercial Energy Solutions
              </h1>
              <p className="text-lg md:text-xl text-white/90 text-center md:text-left">
                Power your business with reliable solar energy storage and EV charging infrastructure. 
                From small offices to large commercial establishments.
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
              title="Perfect for Businesses"
              description="Whether you run a small office, restaurant, retail store, or large commercial facility, 
              our commercial solutions help reduce operating costs and ensure reliable power."
            />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: RiBuilding2Line,
                  title: "Cost Reduction",
                  desc: "Lower electricity bills and reduce operational costs",
                },
                {
                  icon: RiBatteryChargeLine,
                  title: "Backup Power",
                  desc: "Keep your business running during brownouts",
                },
                {
                  icon: RiChargingPile2Line,
                  title: "EV Charging",
                  desc: "Attract customers with EV charging facilities",
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

      {/* Storage Systems Section */}
      <section className="py-16 bg-slate-50">
        <LayoutContainer>
          <SectionHeading
            title="Energy Storage Systems"
            description="Scalable solutions from small businesses to large commercial facilities"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {storageSystems.map((system, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100"
              >
                {system.image && (
                  <div className="w-full h-48 relative bg-slate-50">
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
                    href="/products?category=smart-home"
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

      {/* Street Lights Section */}
      <section className="py-16 bg-white">
        <LayoutContainer>
          <SectionHeading
            title="Solar Street Lights"
            description="Professional lighting solutions for commercial properties and parking areas"
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
        </LayoutContainer>
      </section>

      {/* EV Charging Section */}
      <section className="py-16 bg-slate-50">
        <LayoutContainer>
          <SectionHeading
            title="EV Charging Solutions"
            description="Attract customers and support the growing EV market"
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

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <LayoutContainer>
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              title="Why Choose Our Commercial Solutions"
              description="Designed for business reliability and ROI"
            />
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {[
                "Dedicated customer support",
                "Professional installation and maintenance",
                "Payment terms: 30% advance, balance before shipping",
                "Production time: 20-25 working days",
                "Scalable solutions for growing businesses",
                "ROI-focused energy savings",
                "24/7 monitoring and support available",
                "Compliance with local regulations",
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
              Ready to Power Your Business?
            </h2>
            <p className="text-lg text-white/90">
              Get a free consultation and discover how our commercial solutions can reduce your operating costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?interest=commercial-solutions&subject=quote"
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


