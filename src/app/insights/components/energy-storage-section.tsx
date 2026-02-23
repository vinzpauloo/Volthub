"use client";

import { energyStorageData } from "./insights-data";
import InsightChart from "./insight-chart";

const EnergyStorageSection = (): React.ReactElement => {
  const { badge, title, description, keyStats, growthData, highlights, chartType, chartColor, chartTitle } =
    energyStorageData;

  return (
    <section className="py-16 border-t border-gray-100">
      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 mb-4">
        {badge}
      </span>
      <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-3xl">{description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-gray-50 p-4 text-center"
              >
                <p className="text-2xl font-bold text-blue-600">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.context}</p>
              </div>
            ))}
          </div>

          <ul className="space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <InsightChart
            data={growthData.map((d) => d.value)}
            categories={growthData.map((d) => d.year)}
            chartType={chartType}
            color={chartColor}
            title={chartTitle}
          />
        </div>
      </div>
    </section>
  );
};

export default EnergyStorageSection;
