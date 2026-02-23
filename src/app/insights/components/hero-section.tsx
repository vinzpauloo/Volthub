import SectionHeading from "@/components/marketing/SectionHeading";

const HeroSection = (): React.ReactElement => {
  return (
    <section className="pb-12 border-b border-gray-200">
      <SectionHeading
        eyebrow="Market Insights"
        title="The Philippines Clean Energy Opportunity"
        description="Data-driven analysis of the EV charging, solar energy, and energy storage markets — one of the fastest-growing clean energy landscapes in Asia."
        align="center"
      />
    </section>
  );
};

export default HeroSection;
