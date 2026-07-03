import LayoutContainer from "@/components/layout/LayoutContainer";

const stats = [
  {
    stat: "Save",
    label: "Lower Energy Bills",
    desc: "Reduce or eliminate your monthly electricity costs with free energy from the sun.",
  },
  {
    stat: "Green",
    label: "Environmental Protection",
    desc: "Cut your carbon footprint with clean, renewable energy that produces zero emissions.",
  },
  {
    stat: "Free",
    label: "Energy Independence",
    desc: "Generate your own power and protect against rising utility rates and grid outages.",
  },
  {
    stat: "Easy",
    label: "Low Maintenance",
    desc: "Solar panels require minimal upkeep with no moving parts and 25+ year lifespans.",
  },
  {
    stat: "22.5%",
    label: "Panel Efficiency",
    desc: "Premium monocrystalline PERC technology for maximum energy output.",
  },
  {
    stat: "3 Years",
    label: "Standard Support Coverage",
    desc: "Comprehensive coverage on installations with extended plans available.",
  },
];

export default function SolarWhyChooseUsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <LayoutContainer>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Why Choose VoltHub for Solar
          </h2>
          <p className="text-gray-500">
            Industry-leading expertise and proven track record
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-primary font-orbitron mb-2">
                {item.stat}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {item.label}
              </div>
              <div className="text-sm text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}
