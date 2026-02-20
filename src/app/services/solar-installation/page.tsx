"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import BackToTopButton from "@/components/common/BackToTopButton";
import Link from "next/link";
import Image from "next/image";
import {
  RiCheckLine,
  RiSunLine,
  RiHomeLine,
  RiBuildingLine,
  RiPlantLine,
  RiToolsLine,
  RiCustomerService2Line,
  RiShieldCheckLine,
  RiBarChartLine,
  RiPlugLine,
} from "react-icons/ri";

export default function SolarInstallation() {
  return (
    <main className="pt-10">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/Sector/solarbg1.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-green-900/90 via-green-800/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <LayoutContainer className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-orbitron">
              <span className="gradient-text">Solar Energy Installation</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed max-w-4xl mx-auto">
              Turn-key solar solutions from consultation to connection. We
              deliver professional solar installations with industry-leading
              warranties and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="bg-linear-to-r from-secondary to-yellow-400 text-black px-10 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap transform hover:scale-105 glow-effect"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services"
                className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap transform hover:scale-105 hover:bg-white/30"
              >
                View All Services
              </Link>
            </div>
          </LayoutContainer>
        </div>
      </section>

      {/* Service Offerings */}
      <section className="py-20 bg-gray-50">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="Complete Solar Installation Services"
              description="From energy audit to grid connection, we handle every step of your solar journey"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: RiBarChartLine,
                title: "Energy Audit & Design",
                desc: "Custom system sizing and ROI analysis tailored to your energy needs",
                features: [
                  "Comprehensive energy assessment",
                  "Optimal system sizing",
                  "ROI and payback analysis",
                  "Shading and orientation analysis",
                ],
              },
              {
                icon: RiShieldCheckLine,
                title: "Financing Assistance",
                desc: "Solar loans, leases, and incentive guidance to make solar affordable",
                features: [
                  "Solar loan programs",
                  "Lease and PPA options",
                  "Tax credit guidance",
                  "Rebate applications",
                ],
              },
              {
                icon: RiToolsLine,
                title: "Professional Installation",
                desc: "NABCEP certified installers ensure quality and safety",
                features: [
                  "NABCEP certified team",
                  "OSHA safety compliance",
                  "Quality assurance checks",
                  "Clean installation process",
                ],
              },
              {
                icon: RiPlugLine,
                title: "Grid Interconnection",
                desc: "Utility coordination and net metering setup for seamless integration",
                features: [
                  "Utility application handling",
                  "Net metering setup",
                  "Inspection coordination",
                  "System activation",
                ],
              },
              {
                icon: RiSunLine,
                title: "Performance Monitoring",
                desc: "Real-time system monitoring and optimization for maximum output",
                features: [
                  "Real-time monitoring app",
                  "Performance alerts",
                  "Energy production reports",
                  "System optimization",
                ],
              },
              {
                icon: RiCustomerService2Line,
                title: "Maintenance Support",
                desc: "Ongoing maintenance support for system longevity",
                features: [
                  "Scheduled maintenance plans",
                  "System health monitoring",
                  "Preventive maintenance",
                  "Rapid repair service",
                ],
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-4 bg-green-100 rounded-full">
                  <service.icon className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2 text-sm">
                      <RiCheckLine className="text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>

      {/* System Types */}
      <section className="py-20">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="Solar Solutions for Every Need"
              description="From residential street lights to utility-scale power generation"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-yellow-500 text-white p-6 text-center">
                <RiHomeLine className="text-4xl mx-auto mb-2" />
                <h3 className="text-2xl font-bold mb-2">Residential</h3>
                <p className="text-yellow-100">Street Lights & Energy Storage</p>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">Street Lights</p>
                  <p className="text-sm text-gray-600 mt-3">5-30kWh Storage Systems</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    "Solar street lights (5-12m poles)",
                    "5-30kWh mobile energy storage",
                    "Perfect for homes & small businesses",
                    "3-5kW to 10kW rated power",
                    "Professional installation included",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <RiCheckLine className="text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-yellow-600 transition-colors"
                >
                  Get Residential Quote
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-500">
              <div className="bg-orange-600 text-white p-6 text-center">
                <RiBuildingLine className="text-4xl mx-auto mb-2" />
                <h3 className="text-2xl font-bold mb-2">Commercial</h3>
                <p className="text-orange-100">40-261kWh Power Systems</p>
                <span className="inline-block mt-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Best Value
                </span>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">40-261kWh Systems</p>
                  <div className="text-lg font-bold text-orange-600 mb-1 mt-3">
                    Up to 110kW Rated Power
                  </div>
                  <p className="text-sm text-gray-600">Three-phase 400V/220V</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    "Small commercial & remote facilities",
                    "Resorts, farms, barangay centers",
                    "20kW to 110kW rated power",
                    "40-261kWh battery capacity",
                    "Perfect for businesses & communities",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <RiCheckLine className="text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full bg-orange-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-orange-700 transition-colors"
                >
                  Get Commercial Quote
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-red-600 text-white p-6 text-center">
                <RiPlantLine className="text-4xl mx-auto mb-2" />
                <h3 className="text-2xl font-bold mb-2">Utility-Scale</h3>
                <p className="text-red-100">466kWh+ Power Plants</p>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">466kWh+ Systems</p>
                  <div className="text-lg font-bold text-red-600 mb-1 mt-3">
                    Up to 1MW Rated Power
                  </div>
                  <p className="text-sm text-gray-600">Island & industrial grids</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    "Town centers & island grids",
                    "466kWh to 2700kWh capacity",
                    "220kW to 1MW rated power",
                    "Industrial parks & utilities",
                    "Enterprise support package",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <RiCheckLine className="text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full bg-red-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-red-700 transition-colors"
                >
                  Get Utility Quote
                </Link>
              </div>
            </div>
          </div>
        </LayoutContainer>
      </section>

      {/* Street Lights Section */}
      <section className="py-20 bg-gray-50">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="Solar Street Lights"
              description="Integrated solar-powered street lighting solutions for reliable, off-grid illumination"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                model: "F2-050",
                type: "Integrated Light",
                poleHeight: "8m",
                ledPower: "50W",
                size: "1319*460*60mm",
                battery: "12.8V 45Ah",
                solarPanel: "100W",
                image: "/Product/StreetLamp/F1L.png",
              },
              {
                model: "F2-080",
                type: "Integrated Light",
                poleHeight: "9m",
                ledPower: "80W",
                size: "1490*640*60mm",
                battery: "25.6V 45Ah",
                solarPanel: "160W",
                image: "/Product/StreetLamp/F1L.png",
              },
              {
                model: "F2-100",
                type: "Integrated Light",
                poleHeight: "10m",
                ledPower: "100W",
                size: "1490*730*60mm",
                battery: "25.6V 52Ah",
                solarPanel: "200W",
                image: "/Product/StreetLamp/F1L.png",
              },
              {
                model: "F2-120",
                type: "Integrated Light",
                poleHeight: "12m",
                ledPower: "120W",
                size: "1650*830*60mm",
                battery: "25.6V 60Ah",
                solarPanel: "240W",
                image: "/Product/StreetLamp/F1L.png",
              },
              {
                model: "LVQ2-050",
                type: "Split Street Light",
                poleHeight: "8m",
                ledPower: "50W",
                size: "935*415*210mm",
                battery: "14.8V 45Ah",
                solarPanel: "100W",
                image: "/Product/StreetLamp/RKlv02.png",
              },
              {
                model: "LVQ2-080",
                type: "Split Street Light",
                poleHeight: "9m",
                ledPower: "80W",
                size: "935*415*210mm",
                battery: "12.8V 90Ah",
                solarPanel: "200W",
                image: "/Product/StreetLamp/RKlv02.png",
              },
              {
                model: "LVQ2-100",
                type: "Split Street Light",
                poleHeight: "10m",
                ledPower: "100W",
                size: "935*415*210mm",
                battery: "25.6V 48Ah",
                solarPanel: "250W",
                image: "/Product/StreetLamp/RKS.png",
              },
              {
                model: "LVQ2-120",
                type: "Split Street Light",
                poleHeight: "12m",
                ledPower: "120W",
                size: "935*415*210mm",
                battery: "25.6V 60Ah",
                solarPanel: "300W",
                image: "/Product/StreetLamp/RKS.png",
              },
              {
                model: "LVXC-120",
                type: "All in Two Light",
                poleHeight: "5m",
                ledPower: "20W",
                size: "495*205*80mm",
                battery: "3.2V 65Ah",
                solarPanel: "70W",
                image: "/Product/StreetLamp/F2L.png",
              },
              {
                model: "LVXC-130",
                type: "All in Two Light",
                poleHeight: "6m",
                ledPower: "30W",
                size: "550*240*100mm",
                battery: "3.2V 80Ah",
                solarPanel: "70W",
                image: "/Product/StreetLamp/F2L.png",
              },
              {
                model: "LVXC-320",
                type: "All in Two Light",
                poleHeight: "5m",
                ledPower: "20W",
                size: "650*300*130mm",
                battery: "3.2V 65Ah",
                solarPanel: "70W",
                image: "/Product/StreetLamp/LVXC.png",
              },
              {
                model: "LVXC-330",
                type: "All in Two Light",
                poleHeight: "6m",
                ledPower: "30W",
                size: "650*300*130mm",
                battery: "3.2V 80Ah",
                solarPanel: "70W",
                image: "/Product/StreetLamp/LVXC.png",
              },
            ].map((light, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
                {light.image && (
                  <div className="w-full h-48 relative bg-slate-50">
                    <Image
                      src={light.image}
                      alt={light.model}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-primary mb-1">{light.model}</h3>
                    <p className="text-sm text-gray-600">{light.type}</p>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pole Height:</span>
                      <span className="font-medium">{light.poleHeight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">LED Power:</span>
                      <span className="font-medium">{light.ledPower}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Battery:</span>
                      <span className="font-medium">{light.battery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Solar Panel:</span>
                      <span className="font-medium">{light.solarPanel}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <Link
                      href={`/contact?subject=installation&product=solar-installation&model=${encodeURIComponent(light.model || light.type)}&productName=${encodeURIComponent(light.type)}`}
                      className="block w-full bg-green-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition-colors text-sm"
                    >
                      Contact for Pricing
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Payment Terms & Production</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Payment Terms:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• 30% bank transfer in advance</li>
                  <li>• Balance before shipping</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Production & Delivery:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Production time: 20-25 working days after payment</li>
                  <li>• Package: Standard Export package</li>
                </ul>
              </div>
            </div>
          </div>
        </LayoutContainer>
      </section>

      {/* Storage Systems Section */}
      <section className="py-20">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="Energy Storage & Power Generation Systems"
              description="Complete off-grid and backup power solutions from small homes to industrial facilities"
            />
          </div>
          
          {/* Mobile Energy Storage (5-30 kWh) */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Mobile Energy Storage Power (5-30 kWh)</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Mobile Energy Storage Power",
                  kWh: "5kWh",
                  ratedPower: "3KW/AC 220V",
                  battery: "5.3kWh",
                  solarPanel: "36V670W*4",
                  description: "Small home / backup kit. Can run 1 HP aircon plus lights, fans, TV, laptop. About 4-5 hours usable at 1kW average.",
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
                  description: "Longer backup, same power. Good for rural homes with frequent long outages or stores with freezers.",
                  image: "/Product/SmartHome/SMP4.png",
                },
                {
                  name: "Mobile Energy Storage Power",
                  kWh: "20kWh",
                  ratedPower: "10KW/AC 220V",
                  battery: "21.2kWh",
                  solarPanel: "36V670W*12",
                  description: "Larger home / small commercial. Can run multiple aircons (3-4 HP total), refrigerator, lights, computers, pumps.",
                  image: "/Product/SmartHome/SMP5.png",
                },
                {
                  name: "Mobile Energy Storage Power",
                  kWh: "25kWh",
                  ratedPower: "10KW/AC 220V",
                  battery: "26.5kWh",
                  solarPanel: "36V670W*14",
                  description: "More hours, same power. Good for full day-night cycle backup for moderate loads.",
                  image: "/Product/SmartHome/SMP5.png",
                },
                {
                  name: "Mobile Energy Storage Power",
                  kWh: "30kWh",
                  ratedPower: "10KW/AC 220V",
                  battery: "31.8kWh",
                  solarPanel: "36V670W*16",
                  description: "Mini-microgrid. Can run through the night at 2-3kW average. Good for off-grid communities, remote resorts.",
                  image: "/Product/SmartHome/SMP6.png",
                },
              ].map((system, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
                  {system.image && (
                    <div className="w-full h-48 relative bg-slate-50">
                      <Image
                        src={system.image}
                        alt={system.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-primary mb-2">{system.kWh}</h4>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rated Power:</span>
                        <span className="font-medium">{system.ratedPower}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Battery:</span>
                        <span className="font-medium">{system.battery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Solar Panel:</span>
                        <span className="font-medium">{system.solarPanel}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{system.description}</p>
                    <div className="border-t pt-4">
                      <Link
                        href={`/contact?subject=quote&product=energy-storage&productName=${encodeURIComponent(`${system.name} ${system.kWh}`)}&model=${encodeURIComponent(system.kWh)}`}
                        className="block w-full bg-green-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition-colors text-sm"
                      >
                        Contact for Pricing
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Off-Grid Power Generation Systems (40kWh+) */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Off-Grid Power Generation Systems (40kWh+)</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Off-Grid Power Generation System",
                  kWh: "40kWh",
                  ratedPower: "20KW/AC 380V/220V",
                  battery: "40.96kWh",
                  solarPanel: "670W*30PCS",
                  description: "Small commercial / remote facility. Can power 5-10 small houses, water refilling station, rice mill, or cell tower.",
                  image: "/Product/cabinet/20k.png",
                },
                {
                  name: "Off-Grid Power Generation System",
                  kWh: "60kWh",
                  ratedPower: "30KW/AC 380V/220V",
                  battery: "61.4kWh",
                  solarPanel: "670W*40PCS",
                  description: "Small community or larger business. Can power small resort (10+ rooms), medium agricultural facility, or cluster of 10-20 households.",
                  image: "/Product/cabinet/30k.png",
                },
                {
                  name: "Off-Grid Power Generation System",
                  kWh: "80kWh",
                  ratedPower: "40KW/AC 380V/220V",
                  battery: "83.2kWh",
                  solarPanel: "670W*60PCS",
                  description: "Microgrid for barangay center or campus. Suitable for school campus, barangay center + streetlights + market area.",
                  image: "/Product/cabinet/40k.png",
                },
                {
                  name: "Off-Grid Power Generation System",
                  kWh: "100kWh",
                  ratedPower: "50KW/AC 380V/220V",
                  battery: "100.3kWh",
                  solarPanel: "670W*72PCS",
                  description: "Microgrid for barangay center or campus. Suitable for medium resort or eco-park with many cottages plus common facilities.",
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
                {
                  name: "Off-Grid Power Generation System",
                  kWh: "466kWh",
                  ratedPower: "220KW/AC 400V/220V",
                  battery: "465.8kWh",
                  solarPanel: "670W*288PCS",
                  description: "Mini power plant for small town center or big factory. Can power town center, large commercial building, or single big industrial customer.",
                  image: "/Product/cabinet/500kwh.png",
                },
                {
                  name: "Off-Grid Power Generation System",
                  kWh: "783kWh",
                  ratedPower: "300KW/AC 400V/220V",
                  battery: "783.6kWh",
                  solarPanel: "670W*444PCS",
                  description: "Village or island grid. Can act as main power plant for whole small island barangay with few hundred households.",
                  image: "/Product/cabinet/700kwh.png",
                },
                {
                  name: "Off-Grid Power Generation System",
                  kWh: "1075kWh",
                  ratedPower: "500KW/AC 400V/220V",
                  battery: "1075.2kWh",
                  solarPanel: "670W*728PCS",
                  description: "Small utility level / industrial park. Main power for small island town, industrial park, or large university/hospital campus.",
                  image: "/Product/containertype/con1.png",
                },
                {
                  name: "Off-Grid Power Generation System",
                  kWh: "1800kWh",
                  ratedPower: "1000KW/AC 400V/220V",
                  battery: "1806.3kWh",
                  solarPanel: "670W*1484PCS",
                  description: "Main power plant for whole town or large island. For places where diesel or grid can take over at night.",
                  image: "/Product/containertype/con1.png",
                },
              ].map((system, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
                  {system.image && (
                    <div className="w-full h-48 relative bg-slate-50">
                      <Image
                        src={system.image}
                        alt={system.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-primary mb-2">{system.kWh}</h4>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rated Power:</span>
                        <span className="font-medium">{system.ratedPower}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Battery:</span>
                        <span className="font-medium">{system.battery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Solar Panel:</span>
                        <span className="font-medium">{system.solarPanel}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{system.description}</p>
                    <div className="border-t pt-4">
                      <Link
                        href={`/contact?subject=quote&product=energy-storage&productName=${encodeURIComponent(`${system.name} ${system.kWh}`)}&model=${encodeURIComponent(system.kWh)}`}
                        className="block w-full bg-green-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition-colors text-sm"
                      >
                        Contact for Pricing
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LayoutContainer>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="Why Choose VoltHub for Solar"
              description="Industry-leading expertise and proven track record"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              // {
              //   stat: "2,500+",
              //   label: "Systems Installed",
              //   desc: "Successfully deployed across residential and commercial properties",
              // },
              {
                stat: "22.5%",
                label: "Panel Efficiency",
                desc: "Premium monocrystalline PERC technology for maximum output",
              },
              {
                stat: "3 Years",
                label: "Performance Guarantee",
                desc: "Industry-leading support coverage for peace of mind",
              },
              // {
              //   stat: "98.5%",
              //   label: "Customer Satisfaction",
              //   desc: "Rated excellent by our clients for quality and service",
              // },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-primary font-orbitron mb-2">
                  {item.stat}
                </div>
                <div className="text-lg font-semibold mb-2">{item.label}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-green-600 to-green-800 text-white">
        <LayoutContainer>
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Go Solar?
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Get a free consultation and quote for your solar energy
              installation project
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact?interest=solar-installation-quote&subject=quote"
                className="bg-secondary text-black px-10 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition-colors whitespace-nowrap"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services"
                className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors whitespace-nowrap"
              >
                View All Services
              </Link>
            </div>
          </div>
        </LayoutContainer>
      </section>
      <BackToTopButton />
    </main>
  );
}

