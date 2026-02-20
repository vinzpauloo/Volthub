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
  RiLightbulbLine,
  RiCheckLine,
} from "react-icons/ri";

const streetLights = [
  {
    itemNo: "LVXC-120",
    poleHeight: "5m",
    ledLight: "20W",
    size: "495*205*80mm",
    battery: "3.2V 65Ah",
    solarPanel: "70W",
    image: "/Product/StreetLamp/F2L.png",
  },
  {
    itemNo: "LVXC-130",
    poleHeight: "6m",
    ledLight: "30W",
    size: "550*240*100mm",
    battery: "3.2V 80Ah",
    solarPanel: "70W",
    image: "/Product/StreetLamp/F2L.png",
  },
  {
    itemNo: "LVXC-320",
    poleHeight: "5m",
    ledLight: "20W",
    size: "650*300*130mm",
    battery: "3.2V 65Ah",
    solarPanel: "70W",
    image: "/Product/StreetLamp/LVXC.png",
  },
  {
    itemNo: "LVXC-330",
    poleHeight: "6m",
    ledLight: "30W",
    size: "650*300*130mm",
    battery: "3.2V 80Ah",
    solarPanel: "70W",
    image: "/Product/StreetLamp/LVXC.png",
  },
];

const storageSystems = [
  {
    name: "Mobile Energy Storage Power",
    kWh: "5kWh",
    ratedPower: "3KW/AC 220V",
    battery: "5.3kWh",
    solarPanel: "36V670W*4",
    description:
      "Small home / backup kit. Can run 1 HP aircon plus lights, fans, TV, laptop. About 4-5 hours usable.",
    image: "/Product/SmartHome/SMP2.png",
  },
  {
    name: "Mobile Energy Storage Power",
    kWh: "10kWh",
    ratedPower: "5KW/AC 220V",
    battery: "10.6kWh",
    solarPanel: "36V670W*6",
    description:
      "Standard home / small business. Can run 1-2 HP aircon, refrigerator, lights, fans, TV, computers. Around 5-6 hours usable.",
    image: "/Product/SmartHome/SMP3.png",
  },
  {
    name: "Mobile Energy Storage Power",
    kWh: "15kWh",
    ratedPower: "5KW/AC 220V",
    battery: "15.9kWh",
    solarPanel: "36V670W*8",
    description:
      "Longer backup, same power. Good for rural homes with frequent long outages or stores with freezers.",
    image: "/Product/SmartHome/SMP4.png",
  },
];

const evChargers = [
  {
    model: "DPEV-7k",
    type: "7 kW Single-gun AC Charging Pile",
    description:
      "AC 'slow' charger for residential, office, hotel parking. Low installation cost, suitable as basic amenity charger.",
    image: "/Product/EV/59.png",
  },
];

export default function ResidentialSector() {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-100 min-h-[300px] md:min-h-[550px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/HomeBanner/banner3.jpg"
            alt="Residential Energy Solutions"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-slate-900/40 z-10" />
        <div className=" z-20 px-2 md:px-16 lg:px-24">
          <LayoutContainer className="h-full flex flex-col justify-center gap-4 text-white pt-20">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-center md:text-left">
                Residential Energy Solutions
              </h1>
              <p className="text-lg md:text-xl text-white/90 text-center md:text-left">
                Power your home with reliable solar energy storage and backup
                systems. From small backup kits to complete home energy
                independence.
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
              title="Perfect for Homeowners"
              description="Whether you need backup power during brownouts or want to reduce your electricity bills, 
              our residential solutions are designed for Filipino homes."
            />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: RiBatteryChargeLine,
                  title: "Backup Power",
                  desc: "Keep your lights on and appliances running during brownouts",
                },
                {
                  icon: RiLightbulbLine,
                  title: "Cost Savings",
                  desc: "Reduce electricity bills with solar energy storage",
                },
                {
                  icon: RiChargingPile2Line,
                  title: "EV Ready",
                  desc: "Charge your electric vehicle at home with our AC chargers",
                },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl">
                  <feature.icon className="h-8 w-8 text-primary mb-4 mx-auto" />
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
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
            description="Choose the right capacity for your home's energy needs"
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
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
            description="All-in-Two lights perfect for residential driveways and pathways"
          />
          <div className="overflow-x-auto mt-12">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Image</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Item No.
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Pole Height
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    LED Light
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Battery</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Solar Panel
                  </th>
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
                    <td className="px-6 py-4 font-medium">{light.itemNo}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {light.poleHeight}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {light.ledLight}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {light.battery}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {light.solarPanel}
                    </td>
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
            description="Charge your electric vehicle at home"
          />
          <div className="grid md:grid-cols-1 gap-6 mt-12 max-w-2xl mx-auto">
            {evChargers.map((charger, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100"
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
                  href={`/contact?subject=installation&product=ev-charging&model=${encodeURIComponent(
                    charger.model
                  )}&productName=${encodeURIComponent(charger.type)}`}
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
              title="Why Choose Our Residential Solutions"
              description="Designed specifically for Filipino homes"
            />
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {[
                "Dedicated customer support",
                "Professional installation service",
                "Payment terms: 30% advance, balance before shipping",
                "Production time: 20-25 working days",
                "Standard export packaging",
                "Local support and maintenance",
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
              Ready to Power Your Home?
            </h2>
            <p className="text-lg text-white/90">
              Get a free consultation and discover the perfect energy solution
              for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?interest=residential-solutions&subject=quote"
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
