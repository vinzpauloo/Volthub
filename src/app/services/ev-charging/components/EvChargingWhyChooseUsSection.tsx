import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";

const benefits = [
  {
    stat: "Easy",
    label: "Convenience and Accessibility",
    desc: "Charge at home, work, or on the go with our expanding network of charging stations.",
  },
  {
    stat: "Save",
    label: "Cost Savings",
    desc: "Lower fuel and maintenance costs compared to traditional vehicles with smart charging schedules.",
  },
  {
    stat: "Smart",
    label: "Control and Monitoring",
    desc: "Real-time energy usage tracking and remote management through our smart charging platform.",
  },
  {
    stat: "24/7",
    label: "24/7",
    desc: "Round-the-clock technical support and monitoring for complete peace of mind.",
  },
];

export default function EvChargingWhyChooseUsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <LayoutContainer>
        <div className="text-center mb-16">
          <SectionHeading
            title="Why Choose VoltHub for EV Charging"
            description="Industry-leading expertise and unmatched service quality"
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-primary font-orbitron mb-2">
                {item.stat}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {item.label}
              </div>
              <div className="text-sm text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}
