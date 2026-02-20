"use client";

import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import BackToTopButton from "@/components/common/BackToTopButton";
import Link from "next/link";
import SectorQuickNav from "@/components/common/SectorQuickNav";
import {
  RiBatteryChargeLine,
  RiLightbulbLine,
  RiCheckLine,
  RiPlantLine,
} from "react-icons/ri";

const streetLights = [
  {
    itemNo: "LVXC-120",
    poleHeight: "5m",
    ledLight: "20W",
    size: "495*205*80mm",
    battery: "3.2V 65Ah",
    solarPanel: "70W",
    type: "All in Two Light",
    image: "/Product/StreetLamp/F2L.png",
  },
  {
    itemNo: "LVXC-130",
    poleHeight: "6m",
    ledLight: "30W",
    size: "550*240*100mm",
    battery: "3.2V 80Ah",
    solarPanel: "70W",
    type: "All in Two Light",
    image: "/Product/StreetLamp/F2L.png",
  },
  {
    itemNo: "LVXC-320",
    poleHeight: "5m",
    ledLight: "20W",
    size: "650*300*130mm",
    battery: "3.2V 65Ah",
    solarPanel: "70W",
    type: "All in Two Light",
    image: "/Product/StreetLamp/LVXC.png",
  },
  {
    itemNo: "LVXC-330",
    poleHeight: "6m",
    ledLight: "30W",
    size: "650*300*130mm",
    battery: "3.2V 80Ah",
    solarPanel: "70W",
    type: "All in Two Light",
    image: "/Product/StreetLamp/LVXC.png",
  },
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
    itemNo: "LVQ2-050",
    poleHeight: "8m",
    ledLight: "50W",
    size: "935*415*210mm",
    battery: "14.8V 45Ah",
    solarPanel: "100W",
    type: "Split Street Light",
    image: "/Product/StreetLamp/RKlv02.png",
  },
];

const storageSystems = [
  {
    name: "Mobile Energy Storage Power",
    kWh: "5kWh",
    ratedPower: "3KW/AC 220V",
    battery: "5.3kWh",
    solarPanel: "36V670W*4",
    description: "Small home / backup kit. Can run 1 HP aircon plus lights, fans, TV, laptop. About 4-5 hours usable. Perfect for basic rural homes.",
    image: "/Product/SmartHome/SMP2.png",
  },
  {
    name: "Mobile Energy Storage Power",
    kWh: "10kWh",
    ratedPower: "5KW/AC 220V",
    battery: "10.6kWh",
    solarPanel: "36V670W*6",
    description: "Standard home / small business. Can run 1-2 HP aircon, refrigerator, lights, fans, TV, computers. Around 5-6 hours usable.",
    image: "/Product/SmartHome/SMP3.png",
  },
  {
    name: "Mobile Energy Storage Power",
    kWh: "15kWh",
    ratedPower: "5KW/AC 220V",
    battery: "15.9kWh",
    solarPanel: "36V670W*8",
    description: "Longer backup, same power. Good for rural homes with frequent long outages or stores with freezers that must stay cold overnight.",
    image: "/Product/SmartHome/SMP4.png",
  },
  {
    name: "Mobile Energy Storage Power",
    kWh: "20kWh",
    ratedPower: "10KW/AC 220V",
    battery: "21.2kWh",
    solarPanel: "36V670W*12",
    description: "Larger home / small business. Can run multiple aircons (3-4 HP total), refrigerator/freezer, lights, computers.",
    image: "/Product/SmartHome/SMP5.png",
  },
  {
    name: "Off-Grid Power Generation System",
    kWh: "40kWh",
    ratedPower: "20KW/AC 380V/220V",
    battery: "40.96kWh",
    solarPanel: "670W*30PCS",
    description: "Small commercial / remote facility. Can power 5-10 small houses, or a water refilling station, rice mill, small cold room.",
    image: "/Product/cabinet/20k.png",
  },
  {
    name: "Off-Grid Power Generation System",
    kWh: "60kWh",
    ratedPower: "30KW/AC 380V/220V",
    battery: "61.4kWh",
    solarPanel: "670W*40PCS",
    description: "Small community or larger business. Can power a small resort (10+ rooms, kitchen, bar, pool pump) or small agricultural facility.",
    image: "/Product/cabinet/30k.png",
  },
];

const evChargers = [
  {
    model: "DPEV-7k",
    type: "7 kW Single-gun AC Charging Pile",
    description: "AC 'slow' charger for residential, office, hotel parking. Low installation cost, suitable as basic amenity charger for rural areas.",
    image: "/Product/EV/59.png",
  },
  {
    model: "DPEV-60k",
    type: "60 kW Dual-gun DC Charging Pile",
    description: "Entry-level DC fast charger. Good for rural commercial centers, small towns, and community charging stations.",
    image: "/Product/EV/89.png",
  },
];

export default function RuralProjectsSector() {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-100 min-h-[300px] md:min-h-[550px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/HomeBanner/banner3.jpg"
            alt="Rural Projects Energy Solutions"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-slate-900/40 z-10" />
        <div className=" z-20 px-2 md:px-16 lg:px-24">
          <LayoutContainer className="h-full flex flex-col justify-center gap-4 text-white pt-20">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-center md:text-left">
                Rural Projects Energy Solutions
              </h1>
              <p className="text-lg md:text-xl text-white/90 text-center md:text-left">
                Bringing reliable power to rural communities. Solar street lighting, 
                off-grid power systems, and EV charging for remote areas.
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
              title="Powering Rural Communities"
              description="Our rural solutions are designed for off-grid and remote areas, 
              bringing reliable electricity to communities that need it most."
            />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: RiPlantLine,
                  title: "Off-Grid Power",
                  desc: "Reliable energy systems for areas without grid connection",
                },
                {
                  icon: RiLightbulbLine,
                  title: "Rural Lighting",
                  desc: "Solar street lights for safer rural roads and pathways",
                },
                {
                  icon: RiBatteryChargeLine,
                  title: "Community Power",
                  desc: "Microgrid systems for small villages and communities",
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
            description="From individual homes to small communities - scalable solutions for rural areas"
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
                    href={system.kWh === "40kWh" || system.kWh === "60kWh" ? "/products?category=cabinet" : "/products?category=smart-home"}
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
            description="Affordable lighting solutions for rural roads, pathways, and community areas"
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
            description="Basic charging infrastructure for rural areas and small communities"
          />
          <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
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
            title="Rural Project Applications"
            description="Perfect solutions for various rural and remote area needs"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Rural Homes",
                desc: "Off-grid power systems for homes without grid connection, providing reliable electricity for daily needs.",
              },
              {
                title: "Agricultural Facilities",
                desc: "Power for farms, rice mills, cold storage, and agricultural processing facilities.",
              },
              {
                title: "Rural Roads",
                desc: "Solar street lighting for safer rural roads, pathways, and community areas.",
              },
              {
                title: "Small Communities",
                desc: "Microgrid systems for small villages, sitios, and remote communities.",
              },
              {
                title: "Rural Businesses",
                desc: "Power for sari-sari stores, small clinics, internet cafes, and rural businesses.",
              },
              {
                title: "Island Communities",
                desc: "Off-grid power systems for island barangays and remote coastal communities.",
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
              title="Why Choose Our Rural Solutions"
              description="Designed specifically for off-grid and remote area applications"
            />
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {[
                "Dedicated customer support",
                "Professional installation and maintenance",
                "Payment terms: 30% advance, balance before shipping",
                "Production time: 20-25 working days",
                "Off-grid ready - no grid connection required",
                "Affordable solutions for rural communities",
                "Local support and training available",
                "Scalable from single homes to small communities",
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
              Ready to Power Rural Communities?
            </h2>
            <p className="text-lg text-white/90">
              Get a free consultation and discover how our rural solutions can bring reliable power to your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?interest=rural-projects&subject=quote"
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


