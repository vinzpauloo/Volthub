"use client";

import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import BackToTopButton from "@/components/common/BackToTopButton";
import {
  RiCheckLine,
  RiCalendarLine,
  RiMapPinLine,
  RiToolsLine,
  RiCustomerService2Line,
} from "react-icons/ri";

export default function Services() {
  const [activeService, setActiveService] = useState("ev-charging");

  const scrollToService = (serviceId: string) => {
    setActiveService(serviceId);
    const element = document.getElementById(serviceId + "-service");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <main className="pt-10">
      {/* Services Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://readdy.ai/api/search-image?query=professional%20service%20technician%20installing%20solar%20panels%20on%20modern%20building%20rooftop%20with%20EV%20charging%20station%20visible%20in%20background%2C%20clean%20energy%20infrastructure%2C%20technical%20expertise%2C%20bright%20daylight%20with%20blue%20sky%2C%20professional%20installation%20team%20at%20work&width=1920&height=1080&seq=services001&orientation=landscape')",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/90 via-primary/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <LayoutContainer className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-orbitron">
              <span className="neon-glow">Professional</span>
              <br />
              <span className="gradient-text">Energy Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto">
              Expert installation and maintenance of EV charging infrastructure
              and solar energy systems. From consultation to commissioning, we
              deliver comprehensive energy solutions tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact?interest=general-inquiry&subject=consultation"
                className="group bg-linear-to-r from-secondary to-yellow-400 text-black px-10 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap transform hover:scale-105 glow-effect"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Schedule Consultation</span>
                  <RiCalendarLine className="group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById("service-coverage");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="group bg-linear-to-r from-primary to-accent text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap transform hover:scale-105"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>View Service Areas</span>
                  <RiMapPinLine className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
            <div className="grid md:grid-cols-4 gap-8 pt-12 pb-24 md:pb-12">
              <div className="text-center">
                {/* <div className="text-3xl font-bold text-secondary font-orbitron mb-2">
                  500+
                </div>
                <div className="text-sm text-green-200">
                  Installations Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent font-orbitron mb-2">
                  98.5%
                </div>
                <div className="text-sm text-green-200">
                  Customer Satisfaction
                </div> */}
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-orbitron mb-2">
                  24/7
                </div>
                <div className="text-sm text-green-200">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary font-orbitron mb-2">
                  15+
                </div>
                <div className="text-sm text-green-200">Combined Years of Experience</div>
              </div>
            </div>
          </LayoutContainer>
        </div>
        {/* Service Navigation Pills */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden">
          <div className="flex space-x-4 bg-white/10 backdrop-blur-lg rounded-full p-2">
            <button
              onClick={() => scrollToService("ev-charging")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                activeService === "ev-charging"
                  ? "bg-secondary text-black"
                  : "text-white hover:bg-white/20"
              }`}
            >
              EV Charging
            </button>
            <button
              onClick={() => scrollToService("solar-installation")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                activeService === "solar-installation"
                  ? "bg-secondary text-black"
                  : "text-white hover:bg-white/20"
              }`}
            >
              Solar Installation
            </button>
          </div>
        </div>
      </section>

      {/* Service Overview Section */}
      <section className="py-20 bg-gray-50">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="Our Core Services"
              description="Comprehensive energy solutions backed by certified professionals, cutting-edge technology, and unmatched customer service excellence."
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* EV Charging Solutions */}
            <div className="service-section bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative">
                <Image
                  src="https://readdy.ai/api/search-image?query=modern%20electric%20vehicle%20charging%20installation%20site%20with%20professional%20technicians%20installing%20multiple%20EV%20charging%20stations%2C%20clean%20commercial%20setting%2C%20advanced%20charging%20infrastructure%2C%20blue%20and%20white%20color%20scheme%2C%20professional%20service%20quality&width=800&height=400&seq=evservice001&orientation=landscape"
                  alt="EV Charging Installation"
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-white mb-2" id="ev-charging-service">
                    EV Charging Solutions
                  </h3>
                  <p className="text-blue-200">
                    Complete charging infrastructure from design to deployment
                  </p>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4">
                    Service Offerings
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Site Assessment & Design",
                        desc: "Electrical load analysis and optimal placement",
                      },
                      {
                        title: "Permit & Code Compliance",
                        desc: "All regulatory approvals handled",
                      },
                      {
                        title: "Professional Installation",
                        desc: "Certified technicians, quality guaranteed",
                      },
                      {
                        title: "Network Integration",
                        desc: "OCPP 2.0 compatible smart charging",
                      },
                      {
                        title: "Maintenance & Support",
                        desc: "24/7 monitoring and rapid response",
                      },
                      {
                        title: "Payment Solutions",
                        desc: "RFID, mobile app, and credit card integration",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <RiCheckLine className="text-green-500 text-xl mt-1 shrink-0" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-600">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      AC Charging
                    </div>
                    <div className="text-sm text-gray-600">
                      7 kW Single-gun
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      DC Fast
                    </div>
                    <div className="text-sm text-gray-600">
                      60-160kW Charging
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      Ultra-Fast
                    </div>
                    <div className="text-sm text-gray-600">
                      400kW Premium Speed
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/services/ev-charging"
                    className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap text-center"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/contact?interest=ev-charging-quote&subject=quote"
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 whitespace-nowrap text-center"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Solar Energy Installation */}
            <div className="service-section bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative">
                <Image
                  src="https://readdy.ai/api/search-image?query=professional%20solar%20panel%20installation%20team%20working%20on%20residential%20rooftop%2C%20modern%20house%20with%20blue%20solar%20panels%20being%20installed%2C%20safety%20equipment%2C%20professional%20installation%20process%2C%20clear%20blue%20sky%2C%20high-quality%20workmanship&width=800&height=400&seq=solarservice001&orientation=landscape"
                  alt="Solar Installation"
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-green-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-white mb-2" id="solar-installation-service">
                    Solar Energy Installation
                  </h3>
                  <p className="text-green-200">
                    Turn-key solar solutions from consultation to connection
                  </p>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4">
                    Service Offerings
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Energy Audit & Design",
                        desc: "Custom system sizing and ROI analysis",
                      },
                      {
                        title: "Financing Assistance",
                        desc: "Solar loans, leases, and incentive guidance",
                      },
                      {
                        title: "Professional Installation",
                        desc: "NABCEP certified installers",
                      },
                      {
                        title: "Grid Interconnection",
                        desc: "Utility coordination and net metering setup",
                      },
                      {
                        title: "Performance Monitoring",
                        desc: "Real-time system monitoring and optimization",
                      },
                      {
                        title: "Maintenance Support",
                        desc: "Ongoing system maintenance and support",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <RiCheckLine className="text-green-500 text-xl mt-1 shrink-0" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-600">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      Street Lights
                    </div>
                    <div className="text-sm text-gray-600">
                      Solar-Powered Lighting
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      Energy Storage
                    </div>
                    <div className="text-sm text-gray-600">
                      5-30kWh Mobile Systems
                    </div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      Power Generation
                    </div>
                    <div className="text-sm text-gray-600">
                      40kWh+ Off-Grid Systems
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/services/solar-installation"
                    className="flex-1 bg-linear-to-r from-primary to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap text-center"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/contact?interest=solar-installation-quote&subject=quote"
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 whitespace-nowrap text-center"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </LayoutContainer>
      </section>

      {/* Service Process Section */}
      <section className="py-20">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="Our Service Process"
              description="From initial consultation to ongoing support, we ensure a seamless experience"
            />
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                desc: "Site assessment, energy analysis, and custom solution design",
                color: "from-primary to-accent",
                textColor: "text-primary",
              },
              {
                step: "2",
                title: "Planning & Permits",
                desc: "Engineering drawings, permit applications, and utility coordination",
                color: "from-secondary to-yellow-400",
                textColor: "text-secondary",
              },
              {
                step: "3",
                title: "Installation",
                desc: "Professional installation by certified technicians with quality assurance",
                color: "from-green-500 to-green-600",
                textColor: "text-green-600",
              },
              {
                step: "4",
                title: "Commissioning",
                desc: "System testing, monitoring setup, and comprehensive training",
                color: "from-blue-500 to-blue-600",
                textColor: "text-blue-600",
              },
            ].map((process, idx) => (
              <div key={idx} className="text-center">
                <div
                  className={`w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-linear-to-br ${process.color} rounded-full`}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
                    <span
                      className={`text-lg font-bold ${process.textColor}`}
                    >
                      {process.step}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.desc}</p>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>

      {/* Service Areas & Coverage */}
      <section id="service-coverage" className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="Service Coverage"
              description="Serving the Philippines with plans for Southeast Asia expansion"
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6">Service Areas</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      region: "Luzon",
                      areas: [
                        "Metro Manila (Full Coverage)",
                        "Calabarzon",
                        "Central Luzon",
                        "Bicol Region",
                      ],
                    },
                    {
                      region: "Visayas",
                      areas: [
                        "Central Visayas",
                        "Western Visayas",
                        "Eastern Visayas",
                      ],
                    },
                    {
                      region: "Mindanao",
                      areas: [
                        "Davao Region",
                        "Northern Mindanao",
                        "SOCCSKSARGEN",
                        "CARAGA",
                      ],
                    },
                    {
                      region: "Planned Expansion",
                      areas: [
                        "Singapore",
                        "Malaysia",
                        "Thailand",
                        "Indonesia",
                        "Vietnam",
                      ],
                    },
                  ].map((region, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-primary mb-3">
                        {region.region}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        {region.areas.map((area, areaIdx) => (
                          <li key={areaIdx}>• {area}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-center bg-cover rounded-2xl shadow-lg relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/Manila-Map.png')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 rounded-2xl flex items-center justify-center p-4 md:p-0">
                    <div className="text-center text-white bg-black/50 backdrop-blur-sm rounded-2xl px-4 py-6 md:px-8 w-full max-w-[90%] md:max-w-md">
                      <h4 className="text-xl md:text-2xl font-bold mb-4">
                        Philippines Coverage
                      </h4>
                      <p className="text-base md:text-lg">
                        Professional installation services across major regions
                      </p>
                      <div className="mt-6 grid grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm">
                        <div>
                          <div className="text-2xl font-bold">50+</div>
                          <div>Service Centers</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">200+</div>
                          <div>Certified Technicians</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">24hr</div>
                          <div>Response Time</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutContainer>
      </section>

      {/* Technical Expertise Section */}
      <section className="py-20">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="Technical Expertise"
              description="Industry-leading and technical capabilities"
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              // {
              //   icon: RiAwardLine,
              //   title: "Certifications",
              //   items: [
              //     "NABCEP Solar Installation Professional",
              //     "EVITP EV Infrastructure Training Program",
              //     "OSHA 30-Hour Construction Safety",
              //     "Master Electrician License (All States)",
              //     "Tesla Powerwall Certified Installer",
              //     "ChargePoint Authorized Service Provider",
              //   ],
              //   bgColor: "bg-primary/10",
              //   iconColor: "text-primary",
              // },
              {
                icon: RiToolsLine,
                title: "Equipment & Tools",
                items: [
                  "Drone Site Surveying & Thermal Imaging",
                  "3D CAD Design & Modeling Software",
                  "Advanced Electrical Testing Equipment",
                  "Specialized Solar & EV Installation Tools",
                  "Safety Equipment & Fall Protection",
                  "Real-Time Project Management Systems",
                ],
                bgColor: "bg-secondary/10",
                iconColor: "text-secondary",
              },
              {
                icon: RiCustomerService2Line,
                title: "Quality Assurance",
                items: [
                  "Multi-Point Quality Inspection Process",
                  "Performance Testing & Commissioning",
                  "Customer Training & Documentation",
                  "Post-Installation Monitoring & Support",
                  "Preventive Maintenance Programs",
                  "Rapid Response Emergency Service",
                ],
                bgColor: "bg-green-500/10",
                iconColor: "text-green-500",
              },
            ].map((expertise, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-8">
                <div
                  className={`w-16 h-16 flex items-center justify-center mb-6 ${expertise.bgColor} rounded-full mx-auto`}
                >
                  <expertise.icon
                    className={`text-3xl ${expertise.iconColor}`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  {expertise.title}
                </h3>
                <ul className="text-sm text-gray-600 space-y-3">
                  {expertise.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center space-x-3">
                      <RiCheckLine className="text-green-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>
      <BackToTopButton />
    </main>
  );
}

