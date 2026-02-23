import { marketSnapshots } from "./insights-data";
import { cn } from "@/lib/utils";

const MarketSnapshotSection = (): React.ReactElement => {
  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Market Snapshot
        </h3>
        <p className="text-gray-600">
          Philippines clean energy market at a glance (2024-2025 → projected)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketSnapshots.map((snapshot) => (
          <div
            key={snapshot.label}
            className={cn(
              "rounded-xl border p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300",
              snapshot.colorClass
            )}
          >
            <p className="text-sm font-medium text-gray-600 mb-3">
              {snapshot.label}
            </p>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {snapshot.value}
            </p>
            <p className="text-sm text-gray-500 mb-4">{snapshot.projected}</p>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              {snapshot.cagr} CAGR
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketSnapshotSection;
