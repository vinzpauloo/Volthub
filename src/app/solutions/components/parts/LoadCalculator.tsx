"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  APPLIANCE_CATALOG,
  TIME_PERIODS,
} from "@/app/solutions/data/solarCalculatorData";
import type {
  ApplianceEntry,
  TimePeriod,
} from "@/app/solutions/data/solarCalculatorData";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiCloseLine,
  RiNumber2,
} from "react-icons/ri";

export default function LoadCalculator({
  applianceEntries,
  totalDailyKwh,
  onAddAppliance,
  onEditEntry,
  onRemoveEntry,
  onClearAll,
}: {
  applianceEntries: ApplianceEntry[];
  totalDailyKwh: number;
  onAddAppliance: (period: TimePeriod) => void;
  onEditEntry: (entry: ApplianceEntry) => void;
  onRemoveEntry: (id: string) => void;
  onClearAll: () => void;
}) {
  return (
    <section className=" w-full space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
          <RiNumber2 className="text-primary text-xl" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">
            Total Daily Load Calculation
          </h3>
          <p className="text-sm text-gray-500">
            Select appliances for each time period to calculate your daily
            energy demand.
          </p>
        </div>
        {applianceEntries.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border border-red-200"
          >
            <RiDeleteBinLine className="text-base" />
            Clear All
          </button>
        )}
      </div>

      {/* Three time-period boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TIME_PERIODS.map((period) => {
          const PeriodIcon = period.icon;
          const periodEntries = applianceEntries.filter(
            (e) => e.timePeriod === period.key
          );
          const periodSubtotal = periodEntries.reduce((sum, entry) => {
            const cat = APPLIANCE_CATALOG.find(
              (c) => c.key === entry.applianceKey
            );
            if (!cat) return sum;
            const watts = cat.defaultWatts?.[entry.type] ?? 0;
            return sum + (entry.quantity * watts * entry.hours) / 1000;
          }, 0);

          return (
            <div
              key={period.key}
              className={cn(
                "rounded-2xl border border-gray-200 bg-white flex flex-col",
                "border-l-4",
                period.accentBorder
              )}
            >
              {/* Period header */}
              <div
                className={cn(
                  "px-5 py-4 rounded-tr-2xl flex items-center gap-3",
                  period.accentBg
                )}
              >
                <PeriodIcon
                  className={cn("text-2xl", period.accentText)}
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-base">
                    {period.label}
                  </h4>
                  <p className="text-xs text-gray-500">{period.range}</p>
                </div>
              </div>

              {/* Appliance cards */}
              <div className="flex-1 px-3 py-3 space-y-2 min-h-[120px]">
                {periodEntries.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-6 italic">
                    No appliances yet — tap + to add
                  </p>
                ) : (
                  periodEntries.map((entry) => {
                    const cat = APPLIANCE_CATALOG.find(
                      (c) => c.key === entry.applianceKey
                    );
                    if (!cat) return null;
                    const CatIcon = cat.icon;
                    const watts = cat.defaultWatts?.[entry.type] ?? 0;
                    const dailyKwh = (
                      (entry.quantity * watts * entry.hours) /
                      1000
                    ).toFixed(2);
                    return (
                      <div
                        key={entry.id}
                        className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5 group hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => onEditEntry(entry)}
                      >
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                            cat.color
                          )}
                        >
                          {cat.image ? (
                            <Image
                              src={cat.image}
                              alt={cat.name}
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          ) : (
                            <CatIcon className="text-lg" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 truncate">
                              {cat.name}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                                entry.type === "inverter"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-600"
                              )}
                            >
                              {entry.type === "inverter"
                                ? "Inverter"
                                : "Standard"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                            <span>×{entry.quantity}</span>
                            <span>·</span>
                            <span>{entry.hours}h</span>
                            <span>·</span>
                            <span className="font-medium text-gray-700">
                              {dailyKwh} kWh
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveEntry(entry.id);
                          }}
                          className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label={`Remove ${cat.name}`}
                        >
                          <RiCloseLine className="text-sm" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Period subtotal & add button */}
              <div className="px-4 pb-4 space-y-2">
                {periodEntries.length > 0 && (
                  <div className="flex items-center justify-between text-xs font-medium px-3 py-2 rounded-lg bg-gray-50">
                    <span className="text-gray-500">
                      {period.label} subtotal
                    </span>
                    <span className={cn("font-bold", period.accentText)}>
                      {periodSubtotal.toFixed(2)} kWh
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => onAddAppliance(period.key as TimePeriod)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-sm font-medium text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                >
                  <RiAddLine className="text-base" />
                  Add Appliance
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily total */}
      <div className="flex items-center justify-between rounded-xl px-6 py-4 border border-gray-200 bg-gray-50">
        <span className="text-gray-700 font-semibold">
          Total Daily Load
        </span>
        <span className="text-2xl font-bold text-black">
          {totalDailyKwh.toFixed(2)} kWh
        </span>
      </div>
      <p className="text-xs text-gray-400 -mt-4">
        Monthly estimate: {(totalDailyKwh * 30).toFixed(0)} kWh
      </p>
    </section>
  );
}
