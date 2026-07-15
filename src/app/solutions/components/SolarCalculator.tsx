"use client";

import { useState, useMemo } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import { RiSunLine, RiMoneyDollarCircleLine, RiCalculatorLine } from "react-icons/ri";

export function SolarCalculator(): React.ReactElement {
  const [monthlyBill, setMonthlyBill] = useState(8000);
  const [rooftopArea, setRooftopArea] = useState(50);
  const [sunHours, setSunHours] = useState(5);

  const results = useMemo(() => {
    const systemSize = (rooftopArea * 0.2).toFixed(1); // ~200W per sqm
    const dailyProduction = (parseFloat(systemSize) * sunHours).toFixed(1);
    const monthlyProduction = (parseFloat(dailyProduction) * 30).toFixed(0);
    const annualSavings = (monthlyBill * 12 * 0.85).toFixed(0); // 85% offset
    const estimatedCost = (parseFloat(systemSize) * 55000).toFixed(0); // ~₱55k per kW
    const paybackYears = (parseFloat(estimatedCost) / parseFloat(annualSavings)).toFixed(1);

    return {
      systemSize,
      dailyProduction,
      monthlyProduction,
      annualSavings: Number(annualSavings).toLocaleString(),
      estimatedCost: Number(estimatedCost).toLocaleString(),
      paybackYears,
    };
  }, [monthlyBill, rooftopArea, sunHours]);

  return (
    <section className="section-spacing bg-white">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Solar Calculator"
          title="Estimate Your Solar Savings"
          description="See how much you can save by switching to solar energy. Adjust the sliders to match your situation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto w-full">
          {/* Sliders */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-gray-700 font-medium">Monthly Electric Bill</label>
                <span className="text-primary font-bold">₱{monthlyBill.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={50000}
                step={500}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>₱2,000</span>
                <span>₱50,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-gray-700 font-medium">Available Rooftop Area</label>
                <span className="text-primary font-bold">{rooftopArea} m²</span>
              </div>
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={rooftopArea}
                onChange={(e) => setRooftopArea(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>10 m²</span>
                <span>200 m²</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-gray-700 font-medium">Peak Sun Hours (Daily)</label>
                <span className="text-primary font-bold">{sunHours} hrs</span>
              </div>
              <input
                type="range"
                min={3}
                max={8}
                step={0.5}
                value={sunHours}
                onChange={(e) => setSunHours(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>3 hrs</span>
                <span>8 hrs</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <RiCalculatorLine className="text-primary" />
              Your Estimated Savings
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <ResultCard label="System Size" value={`${results.systemSize} kW`} />
              <ResultCard label="Daily Production" value={`${results.dailyProduction} kWh`} />
              <ResultCard label="Monthly Production" value={`${results.monthlyProduction} kWh`} />
              <ResultCard label="Annual Savings" value={`₱${results.annualSavings}`} highlight />
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated System Cost</span>
                <span className="font-bold text-gray-900">₱{results.estimatedCost}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payback Period</span>
                <span className="font-bold text-secondary">{results.paybackYears} years</span>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              * Estimates based on Philippine solar irradiance averages. Actual results may vary. Contact us for a detailed assessment.
            </p>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${
        highlight
          ? "bg-secondary/10 border border-secondary/30"
          : "bg-white border border-gray-100"
      }`}
    >
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-lg font-bold ${highlight ? "text-secondary" : "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}
