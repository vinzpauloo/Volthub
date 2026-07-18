"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  APPLIANCE_CATALOG,
  PROVINCES,
  COST_PER_KW,
  PANEL_EFFICIENCY,
  SYSTEM_LIFETIME_YEARS,
} from "@/app/solutions/data/solarCalculatorData";
import type {
  Lifestyle,
  TimePeriod,
  SystemType,
  ApplianceEntry,
  ProvinceInfo,
  SolarResults,
} from "@/app/solutions/data/solarCalculatorData";
import LifestyleModifier from "./parts/LifestyleModifier";
import LoadCalculator from "./parts/LoadCalculator";
import AddApplianceModal from "./parts/AddApplianceModal";
import LoadInput from "./parts/LoadInput";
import SystemResults from "./parts/SystemResults";
import { RiCalculatorLine, RiArrowDownLine } from "react-icons/ri";

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function SolarCalculator(): React.ReactElement {
  // Section 1 — Lifestyle
  const [lifestyle, setLifestyle] = useState<Lifestyle>("balanced");

  // Section 2 — Appliances
  const [applianceEntries, setApplianceEntries] = useState<ApplianceEntry[]>(
    []
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod | null>(null);
  const [editingEntry, setEditingEntry] = useState<ApplianceEntry | null>(null);

  // System type for BOM breakdown
  const [systemType, setSystemType] = useState<SystemType>("hybrid");
  const resultsRef = useRef<HTMLElement>(null);

  const scrollToResults = useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Section 3 — Load Input
  const [province, setProvince] = useState<ProvinceInfo>(PROVINCES[0]);
  const [monthlyBill, setMonthlyBill] = useState(5_000);
  const [monthlyKwhOverride, setMonthlyKwhOverride] = useState<number | null>(
    null
  );

  // ── Derived values ──────────────────────────────────────────────────────

  const selectedProvince = province;

  const totalDailyKwh = useMemo(() => {
    return applianceEntries.reduce((sum, entry) => {
      const catalogItem = APPLIANCE_CATALOG.find(
        (c) => c.key === entry.applianceKey
      );
      if (!catalogItem) return sum;
      const watts = catalogItem.defaultWatts?.[entry.type] ?? 0;
      return sum + (entry.quantity * watts * entry.hours) / 1000;
    }, 0);
  }, [applianceEntries]);

  const monthlyKwh = useMemo(() => {
    if (monthlyKwhOverride !== null) return monthlyKwhOverride;
    return totalDailyKwh * 30;
  }, [totalDailyKwh, monthlyKwhOverride]);

  const results: SolarResults = useMemo(() => {
    const sunHours = selectedProvince.peakSunHours;
    const dailyKwh = monthlyKwh / 30;
    const requiredKw = dailyKwh / sunHours;
    const systemSizeKw = Math.max(1, Math.ceil(requiredKw * 1.2 * 10) / 10);

    const dailyProduction = systemSizeKw * sunHours;
    const monthlyProduction = dailyProduction * 30;

    const batteryKwh =
      lifestyle === "work-from-office"
        ? Math.ceil(dailyKwh * 0.8)
        : lifestyle === "work-from-home"
          ? Math.ceil(dailyKwh * 0.2)
          : Math.ceil(dailyKwh * 0.45);

    const rooftopNeeded = Math.ceil(systemSizeKw / PANEL_EFFICIENCY);

    const estimatedCost = systemSizeKw * COST_PER_KW;
    const batteryCost = batteryKwh * 25_000;
    const totalCost = estimatedCost + batteryCost;

    const effectiveRate = monthlyKwh > 0 ? monthlyBill / monthlyKwh : 0;
    const monthlySavings = monthlyKwh * effectiveRate;
    const annualSavings = monthlySavings * 12;
    const paybackYears =
      annualSavings > 0 ? totalCost / annualSavings : Infinity;
    const lifetimeSavings =
      annualSavings * SYSTEM_LIFETIME_YEARS - totalCost;

    return {
      systemSizeKw: systemSizeKw.toFixed(1),
      dailyProduction: dailyProduction.toFixed(1),
      monthlyProduction: monthlyProduction.toFixed(0),
      batteryKwh,
      rooftopNeeded,
      estimatedCost: estimatedCost.toLocaleString(),
      batteryCost: batteryCost.toLocaleString(),
      totalCost: totalCost.toLocaleString(),
      monthlySavings: monthlySavings.toFixed(0),
      annualSavings: annualSavings.toFixed(0),
      paybackYears:
        paybackYears < 100 && paybackYears > 0
          ? paybackYears.toFixed(1)
          : "—",
      lifetimeSavings:
        lifetimeSavings > 0 ? lifetimeSavings.toLocaleString() : "—",
    };
  }, [monthlyKwh, selectedProvince, lifestyle, monthlyBill]);

  // ── Appliance handlers ──────────────────────────────────────────────────

  function openAddModal(period: TimePeriod): void {
    setSelectedPeriod(period);
    setEditingEntry(null);
    setModalOpen(true);
  }

  function openEditModal(entry: ApplianceEntry): void {
    setSelectedPeriod(entry.timePeriod);
    setEditingEntry(entry);
    setModalOpen(true);
  }

  function closeModal(): void {
    setModalOpen(false);
    setSelectedPeriod(null);
    setEditingEntry(null);
  }

  function saveEntry(entry: ApplianceEntry): void {
    if (editingEntry) {
      setApplianceEntries((prev) =>
        prev.map((e) => (e.id === editingEntry.id ? entry : e))
      );
    } else {
      setApplianceEntries((prev) => [...prev, entry]);
    }
    closeModal();
  }

  function removeEntry(id: string): void {
    setApplianceEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function handleProvinceChange(name: string): void {
    const found = PROVINCES.find((p) => p.name === name);
    if (found) {
      setProvince(found);
      setMonthlyBill(Math.round(monthlyKwh * found.avgRate));
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <section className="section-spacing bg-white">
      <LayoutContainer className="flex-col space-y-14">
        <SectionHeading
          eyebrow="Solar Calculator"
          title="Estimate Your Solar Savings"
          description="Calculate your ideal solar system based on your lifestyle, actual appliance usage, and location."
        />

        {/* Section 1 — Lifestyle Modifier */}
        <LifestyleModifier
          lifestyle={lifestyle}
          setLifestyle={setLifestyle}
        />

        {/* Section 2 — Total Daily Load Calculation */}
        <LoadCalculator
          applianceEntries={applianceEntries}
          totalDailyKwh={totalDailyKwh}
          onAddAppliance={openAddModal}
          onEditEntry={openEditModal}
          onRemoveEntry={removeEntry}
          onClearAll={() => setApplianceEntries([])}
        />

        {/* Add/Edit Appliance Modal */}
        {modalOpen && selectedPeriod && (
          <AddApplianceModal
            period={selectedPeriod}
            editingEntry={editingEntry}
            onSave={saveEntry}
            onClose={closeModal}
          />
        )}

        {/* Section 3 — Load Input & Location */}
        <LoadInput
          province={province}
          monthlyBill={monthlyBill}
          monthlyKwh={monthlyKwh}
          monthlyKwhOverride={monthlyKwhOverride}
          totalDailyKwh={totalDailyKwh}
          onProvinceChange={handleProvinceChange}
          onMonthlyBillChange={(v) => setMonthlyBill(v)}
          onMonthlyKwhOverrideChange={(v) => setMonthlyKwhOverride(v)}
        />

        {/* Calculate CTA + Results — only shown when there's load data */}
        {totalDailyKwh > 0 && (
          <>
            {/* Calculate CTA */}
            <div className="max-w-5xl mx-auto w-full flex justify-center">
              <button
                type="button"
                onClick={scrollToResults}
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all hover:-translate-y-0.5"
              >
                <RiCalculatorLine className="text-2xl" />
                Calculate Your Solar System
                <RiArrowDownLine className="text-xl group-hover:animate-bounce ml-1" />
              </button>
            </div>

            {/* Results */}
            <SystemResults
              results={results}
              systemType={systemType}
              onSystemTypeChange={setSystemType}
              lifestyle={lifestyle}
              selectedProvince={selectedProvince}
              sectionRef={resultsRef}
              applianceEntries={applianceEntries}
              monthlyBill={monthlyBill}
              monthlyKwh={monthlyKwh}
            />
          </>
        )}
      </LayoutContainer>
    </section>
  );
}
