import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiCheckLine,
  RiMapPinLine,
  RiShieldCheckLine,
  RiToolsLine,
  RiPlugLine,
  RiCustomerService2Line,
  RiFlashlightLine,
} from "react-icons/ri";

const services = [
  {
    icon: RiMapPinLine,
    title: "Site Assessment & Design",
    subtitle: "Comprehensive evaluation for optimal charger placement",
    desc: "Our expert team conducts thorough electrical load analysis and site surveys to design the most efficient charging infrastructure tailored to your property. We evaluate power capacity, traffic patterns, and future growth to create a scalable solution that meets your needs today and tomorrow.",
    features: [
      "Electrical capacity evaluation and load calculations",
      "Traffic flow and parking pattern analysis",
      "ADA and accessibility compliance checks",
      "Future expansion and scalability planning",
      "3D site modeling and equipment layout design",
    ],
  },
  {
    icon: RiShieldCheckLine,
    title: "Permit & Code Compliance",
    subtitle: "Hassle-free regulatory approvals",
    desc: "Navigating the complex landscape of permits and regulations is our specialty. We handle all paperwork, applications, and coordination with local authorities to ensure your installation meets every requirement. From building codes to utility agreements, we've got you covered.",
    features: [
      "Building and electrical permit applications",
      "National and local electrical code compliance",
      "ADA accessibility standards verification",
      "Utility interconnection agreements",
      "Environmental and zoning clearance",
    ],
  },
  {
    icon: RiToolsLine,
    title: "Professional Installation",
    subtitle: "Certified technicians, quality guaranteed",
    desc: "Our installation teams are certified, insured, and trained to the highest industry standards. We follow rigorous safety protocols and quality assurance processes to deliver flawless installations on time and within budget. Every project is managed by a dedicated supervisor from start to finish.",
    features: [
      "NABCEP certified solar and EV installers",
      "EVITP trained charging infrastructure technicians",
      "Multi-point quality assurance inspections",
      "Safety-first approach with full PPE compliance",
      "Project management with real-time progress updates",
    ],
  },
  {
    icon: RiPlugLine,
    title: "Network Integration",
    subtitle: "Smart charging with OCPP 2.0 protocol",
    desc: "Connect your charging stations to our cloud-based management platform for complete control and visibility. Our OCPP 2.0 compatible system enables remote monitoring, diagnostics, and firmware updates. Integrate with fleet management systems and energy management platforms seamlessly.",
    features: [
      "OCPP 2.0 protocol for universal compatibility",
      "Cloud-based real-time monitoring dashboard",
      "Remote diagnostics and over-the-air updates",
      "Fleet management system integration",
      "Energy management and load balancing",
    ],
  },
  {
    icon: RiCustomerService2Line,
    title: "Maintenance & Support",
    subtitle: "24/7 monitoring and rapid response",
    desc: "Keep your charging infrastructure running at peak performance with our comprehensive maintenance programs. We offer preventive maintenance schedules, real-time monitoring alerts, and rapid response service to minimize downtime. Our support team is available around the clock to address any issues.",
    features: [
      "24/7 technical support hotline",
      "Preventive maintenance with scheduled inspections",
      "Rapid on-site response within 4 hours",
      "Performance monitoring and optimization",
      "Extended warranty and service plans available",
    ],
  },
  {
    icon: RiFlashlightLine,
    title: "Payment Solutions",
    subtitle: "Flexible payment options for every user",
    desc: "Maximize revenue and user convenience with our integrated payment solutions. Support RFID cards, mobile app payments, credit card terminals, and subscription models. Our platform handles billing, settlements, and reporting so you can focus on your business while we manage the transactions.",
    features: [
      "RFID card reader integration",
      "Mobile app payment with QR code scanning",
      "EMV credit card terminal support",
      "Subscription and membership management",
      "Automated billing and revenue reporting",
    ],
  },
];

export default function EvChargingOfferingsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <LayoutContainer>
        <div className="text-center mb-16">
          <SectionHeading
            title="Comprehensive EV Charging Services"
            description="From initial consultation to ongoing maintenance, we handle every aspect of your EV charging infrastructure"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col"
            >
              {/* Icon + Title row */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full shrink-0">
                  <service.icon className="text-xl text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-blue-600">
                    {service.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {service.desc}
              </p>
              <ul className="space-y-2 flex-1">
                {service.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-2 text-sm"
                  >
                    <RiCheckLine className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}
