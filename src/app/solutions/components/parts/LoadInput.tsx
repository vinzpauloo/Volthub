"use client";

import { PROVINCES } from "@/app/solutions/data/solarCalculatorData";
import type { ProvinceInfo } from "@/app/solutions/data/solarCalculatorData";
import {
  RiCalculatorLine,
  RiMoneyDollarCircleLine,
  RiMapPinLine,
} from "react-icons/ri";

export default function LoadInput({
  province,
  monthlyBill,
  monthlyKwh,
  monthlyKwhOverride,
  totalDailyKwh,
  onProvinceChange,
  onMonthlyBillChange,
  onMonthlyKwhOverrideChange,
}: {
  province: ProvinceInfo;
  monthlyBill: number;
  monthlyKwh: number;
  monthlyKwhOverride: number | null;
  totalDailyKwh: number;
  onProvinceChange: (name: string) => void;
  onMonthlyBillChange: (value: number) => void;
  onMonthlyKwhOverrideChange: (value: number | null) => void;
}) {
  return (
    <section className=" w-full space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
          <RiMapPinLine className="text-amber-600 text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Load Input &amp; Location
          </h3>
          <p className="text-sm text-gray-500">
            Fine-tune your monthly consumption, electricity rate, and province.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Monthly kWh */}
        <div className="rounded-2xl border border-gray-200 p-6 space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <RiCalculatorLine className="text-gray-400" />
            Monthly Consumption
          </label>
          <div className="flex items-baseline gap-1">
            <input
              type="number"
              min={0}
              step={10}
              value={
                monthlyKwhOverride !== null
                  ? monthlyKwhOverride
                  : Math.round(totalDailyKwh * 30)
              }
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  onMonthlyKwhOverrideChange(null);
                } else {
                  onMonthlyKwhOverrideChange(Math.max(0, Number(val)));
                }
              }}
              className="w-full text-3xl font-bold text-gray-900 bg-transparent border-0 outline-none focus:ring-0 p-0"
              aria-label="Monthly consumption in kWh"
            />
            <span className="text-lg text-gray-500 font-medium">kWh</span>
          </div>
          <p className="text-xs text-gray-400">
            {monthlyKwhOverride === null
              ? "Auto-calculated from appliances above"
              : "Manual override — edit to match your bill"}
          </p>
        </div>

        {/* Monthly Bill */}
        <div className="rounded-2xl border border-gray-200 p-6 space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <RiMoneyDollarCircleLine className="text-gray-400" />
            Monthly Bill
          </label>
          <div className="flex items-baseline gap-1">
            <span className="text-xl text-gray-400">₱</span>
            <input
              type="number"
              min={0}
              max={100_000}
              step={100}
              value={monthlyBill}
              onChange={(e) =>
                onMonthlyBillChange(Math.max(0, Number(e.target.value)))
              }
              className="w-full text-3xl font-bold text-gray-900 bg-transparent border-0 outline-none focus:ring-0 p-0"
              aria-label="Total monthly bill in PHP"
            />
          </div>
          <p className="text-xs text-gray-400">
            {monthlyKwh > 0
              ? `Effective rate: ₱${(monthlyBill / monthlyKwh).toFixed(2)}/kWh`
              : "Enter consumption above to see effective rate"}
          </p>
        </div>

        {/* Province selector */}
        <div className="rounded-2xl border border-gray-200 p-6 space-y-3">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <RiMapPinLine className="text-gray-400" />
            Province / Location
          </label>
          <select
            value={province.name}
            onChange={(e) => onProvinceChange(e.target.value)}
            className="w-full text-base font-semibold text-gray-900 bg-transparent border-0 outline-none focus:ring-0 cursor-pointer py-2"
            aria-label="Select province"
          >
            {PROVINCES.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400">
            Peak sun: {province.peakSunHours} hrs/day
            {" · "}
            Avg rate: ₱{province.avgRate}/kWh
          </p>
        </div>
      </div>
    </section>
  );
}
