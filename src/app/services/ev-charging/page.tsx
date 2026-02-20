"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import BackToTopButton from "@/components/common/BackToTopButton";
import Link from "next/link";
import Image from "next/image";
import {
  RiCheckLine,
  RiChargingPile2Line,
  RiPlugLine,
  RiFlashlightLine,
  RiToolsLine,
  RiCustomerService2Line,
  RiShieldCheckLine,
  RiMapPinLine,
} from "react-icons/ri";

export default function EVChargingSolutions() {
  return (
    <main className="pt-10">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/Sector/evcharging.jpeg')",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-green-900/90 via-green-800/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <LayoutContainer className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-orbitron">
              <span className="gradient-text">EV Charging Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto">
              Complete charging infrastructure from design to deployment. We
              provide end-to-end EV charging solutions tailored to your needs.
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
              title="Comprehensive EV Charging Services"
              description="From initial consultation to ongoing maintenance, we handle every aspect of your EV charging infrastructure"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: RiMapPinLine,
                title: "Site Assessment & Design",
                desc: "Electrical load analysis, optimal placement strategies, and custom system design",
                features: [
                  "Electrical capacity evaluation",
                  "Traffic flow analysis",
                  "Accessibility compliance",
                  "Future expansion planning",
                ],
              },
              {
                icon: RiShieldCheckLine,
                title: "Permit & Code Compliance",
                desc: "All regulatory approvals and code compliance handled by our expert team",
                features: [
                  "Building permit applications",
                  "Electrical code compliance",
                  "ADA accessibility standards",
                  "Utility coordination",
                ],
              },
              {
                icon: RiToolsLine,
                title: "Professional Installation",
                desc: "Certified technicians ensure quality installation with industry best practices",
                features: [
                  "NABCEP certified installers",
                  "EVITP trained technicians",
                  "Quality assurance checks",
                  "Safety-first approach",
                ],
              },
              {
                icon: RiPlugLine,
                title: "Network Integration",
                desc: "OCPP 2.0 compatible smart charging with cloud-based management",
                features: [
                  "OCPP 2.0 protocol support",
                  "Cloud-based monitoring",
                  "Remote diagnostics",
                  "Fleet management integration",
                ],
              },
              {
                icon: RiCustomerService2Line,
                title: "Maintenance & Support",
                desc: "24/7 monitoring and rapid response maintenance services",
                features: [
                  "24/7 technical support",
                  "Preventive maintenance",
                  "Rapid response service",
                  "Performance optimization",
                ],
              },
              {
                icon: RiFlashlightLine,
                title: "Payment Solutions",
                desc: "Multiple payment options including RFID, mobile app, and credit cards",
                features: [
                  "RFID card readers",
                  "Mobile app integration",
                  "Credit card terminals",
                  "Subscription management",
                ],
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-4 bg-blue-100 rounded-full">
                  <service.icon className="text-3xl text-blue-600" />
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

      {/* Charging Solutions & Pricing */}
      <section className="py-20">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="EV Charging Solutions"
              description="Choose the right charging solution for your needs"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
            ].map((charger, idx) => {
              const colorClasses = {
                blue: "bg-blue-600 hover:bg-blue-700",
                green: "bg-green-600 hover:bg-green-700",
                purple: "bg-purple-600 hover:bg-purple-700",
              };
              const headerClasses = {
                blue: "bg-blue-600",
                green: "bg-green-600",
                purple: "bg-purple-600",
              };
              return (
                <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
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
                  <div className={`${headerClasses[charger.color as keyof typeof headerClasses]} text-white p-6 text-center`}>
                    <RiChargingPile2Line className="text-4xl mx-auto mb-2" />
                    <h3 className="text-xl font-bold mb-1">{charger.type}</h3>
                    <p className="text-sm text-white/90">Model: {charger.model}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">{charger.description}</p>
                    <ul className="space-y-2 mb-6">
                      {charger.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2 text-sm">
                          <RiCheckLine className="text-green-500 mt-0.5 shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/contact?subject=installation&product=ev-charging&model=${encodeURIComponent(charger.model)}&productName=${encodeURIComponent(charger.type)}`}
                      className={`block w-full ${colorClasses[charger.color as keyof typeof colorClasses]} text-white py-3 rounded-xl font-semibold text-center transition-colors`}
                    >
                      Contact for Pricing
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </LayoutContainer>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <LayoutContainer>
          <div className="text-center mb-16">
            <SectionHeading
              title="Why Choose VoltHub for EV Charging"
              description="Industry-leading expertise and unmatched service quality"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              // {
              //   stat: "500+",
              //   label: "Installations Completed",
              //   desc: "Successfully deployed across commercial and residential properties",
              // },
              // {
              //   stat: "98.5%",
              //   label: "Customer Satisfaction",
              //   desc: "Rated excellent by our clients for quality and service",
              // },
              {
                stat: "24/7",
                label: "Support Available",
                desc: "Round-the-clock technical support and monitoring",
              },
              {
                stat: "15+",
                label: "Combined Years of Experience",
                desc: "Proven track record in EV infrastructure development",
              },
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
      <section className="py-20 bg-linear-to-br from-blue-600 to-blue-800 text-white">
        <LayoutContainer>
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold">Ready to Install EV Charging?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get a free consultation and quote for your EV charging
              infrastructure project
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact?interest=ev-charging-quote&subject=quote"
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

