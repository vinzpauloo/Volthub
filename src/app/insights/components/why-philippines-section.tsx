import { macroDrivers } from "./insights-data";

const WhyPhilippinesSection = (): React.ReactElement => {
  return (
    <section className="py-16 rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 text-white">
      <div className="px-6 md:px-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-2">
            Why the Philippines?
          </h3>
          <p className="text-emerald-200">
            Macro drivers powering the clean energy transition
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {macroDrivers.map((driver) => (
            <div key={driver.title} className="text-center min-w-[140px]">
              <p className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">
                {driver.stat}
              </p>
              <p className="text-sm font-semibold text-white mb-1">
                {driver.title}
              </p>
              <p className="text-xs text-emerald-300">{driver.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPhilippinesSection;
