"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import { cn } from "@/lib/utils";
import {
  RiSunLine,
  RiMoneyDollarCircleLine,
  RiCalculatorLine,
  RiHomeOfficeLine,
  RiBuildingLine,
  RiEqualizerLine,
  RiAddLine,
  RiFlashlightLine,
  RiDeleteBinLine,
  RiBatteryChargeLine,
  RiMapPinLine,
  RiMoonLine,
  RiSunCloudyLine,
  RiWindyLine,
  RiTvLine,
  RiLightbulbLine,
  RiComputerLine,
  RiFridgeLine,
  RiDropLine,
  RiRestaurantLine,
  RiCloseLine,
  RiSubtractLine,
  RiSettings3Line,
  RiShowersLine,
  RiFireLine,
  RiTempColdLine,
  RiPlugLine,
  RiToolsLine,
  RiWifiLine,
  RiArrowDownLine,
  RiSunFill,
  RiBattery2Line,
  RiBatteryLowLine,
  RiFlashlightFill,
  RiFundsLine,
} from "react-icons/ri";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Lifestyle = "work-from-home" | "work-from-office" | "balanced";
type TimePeriod = "morning" | "afternoon" | "evening";
type ApplianceType = "standard" | "inverter";
type SystemType = "hybrid" | "off-grid" | "grid-tied";

interface ApplianceEntry {
  id: string;
  applianceKey: string;
  type: ApplianceType;
  quantity: number;
  hours: number;
  timePeriod: TimePeriod;
}

interface ApplianceCatalogItem {
  key: string;
  name: string;
  icon: React.ElementType;
  defaultWatts: { standard: number; inverter: number };
  color: string;
}

interface BomItem {
  icon: React.ElementType;
  name: string;
  specs: string;
  quantity: number | string;
  unit: string;
  cost: number;
  essential: boolean;
  note: string;
}

interface ProvinceInfo {
  name: string;
  peakSunHours: number;
  avgRate: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const LIFESTYLE_OPTIONS: {
  key: Lifestyle;
  icon: typeof RiHomeOfficeLine;
  title: string;
  description: string;
  batteryNote: string;
}[] = [
  {
    key: "work-from-home",
    icon: RiHomeOfficeLine,
    title: "Work from Home",
    description:
      "High daytime consumption. Solar directly covers your loads during peak production hours.",
    batteryNote:
      "Sizing favors grid-tied or smaller batteries — solar directly covers daytime loads with minimal storage needed.",
  },
  {
    key: "work-from-office",
    icon: RiBuildingLine,
    title: "Work from Office",
    description:
      "Heavy nighttime consumption. Most energy use happens after sunset when solar panels aren't producing.",
    batteryNote:
      "Requires a larger battery bank (off-grid/hybrid) to store daytime generation for evening and nighttime use.",
  },
  {
    key: "balanced",
    icon: RiEqualizerLine,
    title: "Balanced",
    description:
      "Standard even spread of consumption throughout the day with moderate daytime and nighttime usage.",
    batteryNote:
      "A moderate battery size works well — enough to cover evening loads while solar handles daytime demand.",
  },
];

const APPLIANCE_CATALOG: ApplianceCatalogItem[] = [
  {
    key: "air-conditioner",
    name: "Air Conditioner",
    icon: RiTempColdLine,
    defaultWatts: { standard: 1500, inverter: 800 },
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    key: "refrigerator",
    name: "Refrigerator",
    icon: RiFridgeLine,
    defaultWatts: { standard: 200, inverter: 120 },
    color: "bg-blue-100 text-blue-600",
  },
  {
    key: "electric-fan",
    name: "Electric Fan",
    icon: RiWindyLine,
    defaultWatts: { standard: 65, inverter: 35 },
    color: "bg-teal-100 text-teal-600",
  },
  {
    key: "television",
    name: "Television",
    icon: RiTvLine,
    defaultWatts: { standard: 120, inverter: 70 },
    color: "bg-purple-100 text-purple-600",
  },
  {
    key: "led-lights",
    name: "LED Lights",
    icon: RiLightbulbLine,
    defaultWatts: { standard: 10, inverter: 10 },
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    key: "washing-machine",
    name: "Washing Machine",
    icon: RiSettings3Line,
    defaultWatts: { standard: 500, inverter: 300 },
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    key: "computer",
    name: "Computer / Laptop",
    icon: RiComputerLine,
    defaultWatts: { standard: 100, inverter: 60 },
    color: "bg-gray-100 text-gray-600",
  },
  {
    key: "rice-cooker",
    name: "Rice Cooker",
    icon: RiRestaurantLine,
    defaultWatts: { standard: 700, inverter: 450 },
    color: "bg-orange-100 text-orange-600",
  },
  {
    key: "water-pump",
    name: "Water Pump",
    icon: RiDropLine,
    defaultWatts: { standard: 750, inverter: 500 },
    color: "bg-sky-100 text-sky-600",
  },
  {
    key: "water-heater",
    name: "Water Heater",
    icon: RiShowersLine,
    defaultWatts: { standard: 3500, inverter: 2500 },
    color: "bg-red-100 text-red-600",
  },
  {
    key: "microwave",
    name: "Microwave",
    icon: RiFireLine,
    defaultWatts: { standard: 1000, inverter: 700 },
    color: "bg-amber-100 text-amber-600",
  },
  {
    key: "iron",
    name: "Electric Iron",
    icon: RiFireLine,
    defaultWatts: { standard: 1000, inverter: 750 },
    color: "bg-rose-100 text-rose-600",
  },
];

const TIME_PERIODS: {
  key: TimePeriod;
  label: string;
  icon: React.ElementType;
  range: string;
  maxHours: number;
  accentBorder: string;
  accentBg: string;
  accentText: string;
}[] = [
  {
    key: "morning",
    label: "Morning",
    icon: RiSunCloudyLine,
    range: "6 AM – 12 PM",
    maxHours: 6,
    accentBorder: "border-l-amber-400",
    accentBg: "bg-amber-50",
    accentText: "text-amber-700",
  },
  {
    key: "afternoon",
    label: "Afternoon",
    icon: RiSunLine,
    range: "12 PM – 6 PM",
    maxHours: 6,
    accentBorder: "border-l-orange-400",
    accentBg: "bg-orange-50",
    accentText: "text-orange-700",
  },
  {
    key: "evening",
    label: "Evening",
    icon: RiMoonLine,
    range: "6 PM – 6 AM",
    maxHours: 12,
    accentBorder: "border-l-indigo-400",
    accentBg: "bg-indigo-50",
    accentText: "text-indigo-700",
  },
];

function getHoursPresets(maxHours: number): number[] {
  const all = [1, 2, 3, 4, 6, 8, 12];
  return all.filter((h) => h <= maxHours);
}

const SYSTEM_TYPES: {
  key: SystemType;
  label: string;
  description: string;
  icon: React.ElementType;
  batteryIncluded: boolean;
}[] = [
  {
    key: "hybrid",
    label: "Hybrid",
    description:
      "Solar + battery + grid. Best of both worlds — backup power during outages and grid export when battery is full.",
    icon: RiBatteryChargeLine,
    batteryIncluded: true,
  },
  {
    key: "off-grid",
    label: "Off-Grid",
    description:
      "100% independent from the grid. Requires larger battery bank and is ideal for remote areas with no grid access.",
    icon: RiBatteryLowLine,
    batteryIncluded: true,
  },
  {
    key: "grid-tied",
    label: "Grid-Tied",
    description:
      "Solar panels + grid-tie inverter only. Excess energy is exported to the grid via net metering. No backup during outages.",
    icon: RiPlugLine,
    batteryIncluded: false,
  },
];

// Standard panel wattage & pricing assumptions (Philippine market, 2026)
const PANEL_WATTS = 550; // W per panel (mono PERC half-cut)
const PANEL_COST = 12_500; // ₱ per 550W panel
const INVERTER_COST_PER_KW = 22_000; // ₱ per kW
const BATTERY_UNIT_KWH = 4.8; // kWh per 48V 100Ah LiFePO4 rack unit
const BATTERY_UNIT_COST = 55_000; // ₱ per 4.8kWh unit
const MPPT_COST_PER_KW = 8_000; // ₱ per kW of MPPT
const MOUNTING_COST_PER_PANEL = 2_500; // ₱ per panel (rails, clamps, feet)
const BOS_COST_PER_KW = 15_000; // ₱ per kW (breakers, wires, conduits, combiner box)
const MONITORING_COST = 12_000; // ₱ flat (WiFi/Bluetooth dongle + CT clamps)

const PROVINCES: ProvinceInfo[] = [
  { name: "Metro Manila (Meralco)", peakSunHours: 5.0, avgRate: 11.50 },
  { name: "Bulacan", peakSunHours: 5.1, avgRate: 11.00 },
  { name: "Pampanga", peakSunHours: 5.1, avgRate: 10.80 },
  { name: "Batangas", peakSunHours: 5.3, avgRate: 10.50 },
  { name: "Laguna", peakSunHours: 5.2, avgRate: 10.80 },
  { name: "Cavite", peakSunHours: 5.2, avgRate: 11.00 },
  { name: "Rizal", peakSunHours: 5.1, avgRate: 11.20 },
  { name: "Cebu", peakSunHours: 5.0, avgRate: 12.00 },
  { name: "Iloilo", peakSunHours: 5.0, avgRate: 11.50 },
  { name: "Davao", peakSunHours: 4.8, avgRate: 10.00 },
  { name: "Cagayan de Oro", peakSunHours: 4.9, avgRate: 10.50 },
  { name: "Baguio / Benguet", peakSunHours: 4.5, avgRate: 9.50 },
  { name: "Pangasinan", peakSunHours: 5.2, avgRate: 10.50 },
  { name: "Nueva Ecija", peakSunHours: 5.2, avgRate: 10.80 },
  { name: "Zambales", peakSunHours: 5.3, avgRate: 10.50 },
];

const COST_PER_KW = 55_000; // ₱ per kW installed
const PANEL_EFFICIENCY = 0.20; // kW per m²
const SYSTEM_LIFETIME_YEARS = 25;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function SolarCalculator(): React.ReactElement {
  // Section 1 — Lifestyle
  const [lifestyle, setLifestyle] = useState<Lifestyle>("balanced");

  // Section 2 — Appliances
  const [applianceEntries, setApplianceEntries] = useState<ApplianceEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod | null>(null);
  const [editingEntry, setEditingEntry] = useState<ApplianceEntry | null>(null);

  // System type for BOM breakdown
  const [systemType, setSystemType] = useState<SystemType>("hybrid");
  const [bomExpanded, setBomExpanded] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const scrollToResults = useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Section 3 — Load Input
  const [province, setProvince] = useState<ProvinceInfo>(PROVINCES[0]);
  const [monthlyBill, setMonthlyBill] = useState(5_000);
  const [monthlyKwhOverride, setMonthlyKwhOverride] = useState<number | null>(null);

  // ── Derived values ──────────────────────────────────────────────────────

  const selectedProvince = province;

  const totalDailyKwh = useMemo(() => {
    return applianceEntries.reduce((sum, entry) => {
      const catalogItem = APPLIANCE_CATALOG.find((c) => c.key === entry.applianceKey);
      if (!catalogItem) return sum;
      const watts = catalogItem.defaultWatts[entry.type];
      return sum + (entry.quantity * watts * entry.hours) / 1000;
    }, 0);
  }, [applianceEntries]);

  const monthlyKwh = useMemo(() => {
    if (monthlyKwhOverride !== null) return monthlyKwhOverride;
    return totalDailyKwh * 30;
  }, [totalDailyKwh, monthlyKwhOverride]);

  const results = useMemo(() => {
    const sunHours = selectedProvince.peakSunHours;
    // Daily kWh needed → system size to generate it in sunHours
    const dailyKwh = monthlyKwh / 30;
    const requiredKw = dailyKwh / sunHours;
    // Add ~20% buffer for losses
    const systemSizeKw = Math.max(1, Math.ceil(requiredKw * 1.2 * 10) / 10);

    const dailyProduction = systemSizeKw * sunHours;
    const monthlyProduction = dailyProduction * 30;

    // Battery sizing based on lifestyle
    const batteryKwh =
      lifestyle === "work-from-office"
        ? Math.ceil(dailyKwh * 0.8) // 80% of daily for nighttime
        : lifestyle === "work-from-home"
          ? Math.ceil(dailyKwh * 0.2) // 20% for evening buffer
          : Math.ceil(dailyKwh * 0.45); // 45% balanced

    const rooftopNeeded = Math.ceil(systemSizeKw / PANEL_EFFICIENCY);

    const estimatedCost = systemSizeKw * COST_PER_KW;
    const batteryCost = batteryKwh * 25_000; // ~₱25k per kWh of battery
    const totalCost = estimatedCost + batteryCost;

    // Derive effective rate from monthly bill ÷ monthly consumption
    const effectiveRate = monthlyKwh > 0 ? monthlyBill / monthlyKwh : 0;
    const monthlySavings = monthlyKwh * effectiveRate;
    const annualSavings = monthlySavings * 12;
    const paybackYears = annualSavings > 0 ? totalCost / annualSavings : Infinity;
    const lifetimeSavings = annualSavings * SYSTEM_LIFETIME_YEARS - totalCost;

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
        paybackYears < 100 && paybackYears > 0 ? paybackYears.toFixed(1) : "—",
      lifetimeSavings:
        lifetimeSavings > 0
          ? lifetimeSavings.toLocaleString()
          : "—",
    };
  }, [monthlyKwh, selectedProvince, lifestyle, monthlyBill]);

  const bomItems: BomItem[] = useMemo(() => {
    const systemKw = Number.parseFloat(results.systemSizeKw);
    if (systemKw <= 0) return [];

    const panelCount = Math.ceil((systemKw * 1000) / PANEL_WATTS);
    const invSize = Math.ceil(systemKw);
    const battUnits =
      systemType === "grid-tied"
        ? 0
        : Math.max(1, Math.ceil(results.batteryKwh / BATTERY_UNIT_KWH));
    const invLabel =
      systemType === "hybrid"
        ? `${invSize}kW Hybrid`
        : systemType === "off-grid"
          ? `${invSize}kW Off-Grid`
          : `${invSize}kW Grid-Tie`;

    const items: BomItem[] = [
      {
        icon: RiSunFill,
        name: "Solar Panels",
        specs: `${PANEL_WATTS}W Mono PERC Half-Cut`,
        quantity: panelCount,
        unit: "panels",
        cost: panelCount * PANEL_COST,
        essential: true,
        note: `Total array: ${(panelCount * PANEL_WATTS / 1000).toFixed(1)} kWp`,
      },
    ];

    if (systemType !== "grid-tied") {
      items.push({
        icon: RiBattery2Line,
        name: "Battery Bank",
        specs: `48V 100Ah LiFePO₄ (${BATTERY_UNIT_KWH}kWh each)`,
        quantity: battUnits,
        unit: "units",
        cost: battUnits * BATTERY_UNIT_COST,
        essential: true,
        note: `${results.batteryKwh}kWh total — ${systemType === "off-grid" ? "2–3 days autonomy" : "evening + outage backup"}`,
      });
    }

    items.push(
      {
        icon: RiFlashlightFill,
        name: "Inverter",
        specs: `${invLabel} Pure Sine Wave`,
        quantity: 1,
        unit: "unit",
        cost: invSize * INVERTER_COST_PER_KW,
        essential: true,
        note:
          systemType === "grid-tied"
            ? "No backup during grid outages"
            : systemType === "hybrid"
              ? "Built-in MPPT + grid interaction"
              : "Standalone — requires separate MPPT",
      },
      {
        icon: RiSettings3Line,
        name: "MPPT Charge Controller",
        specs:
          systemType === "hybrid"
            ? "Built into hybrid inverter"
            : `${invSize}kW / 48V MPPT`,
        quantity: systemType === "hybrid" ? "—" : 1,
        unit: systemType === "hybrid" ? "" : "unit",
        cost: systemType === "hybrid" ? 0 : invSize * MPPT_COST_PER_KW,
        essential: systemType === "off-grid",
        note:
          systemType === "hybrid"
            ? "Integrated — no separate unit needed"
            : "Sizes to array capacity with 20% headroom",
      },
      {
        icon: RiToolsLine,
        name: "Mounting Structure",
        specs: "Aluminum rails, L-feet, clamps, splice kits",
        quantity: panelCount,
        unit: "sets",
        cost: panelCount * MOUNTING_COST_PER_PANEL,
        essential: true,
        note: panelCount <= 4 ? "Pitched roof rail kit" : "Pitched roof + additional rail kit(s)",
      },
      {
        icon: RiPlugLine,
        name: "Balance of System",
        specs: "DC/AC breakers, SPD, wires, conduit, combiner box, labels",
        quantity: 1,
        unit: "lot",
        cost: Math.ceil(systemKw) * BOS_COST_PER_KW,
        essential: true,
        note: "Philippine Electrical Code (PEC) compliant",
      },
      {
        icon: RiWifiLine,
        name: "Monitoring System",
        specs: "WiFi/Bluetooth dongle + CT clamps + cloud app access",
        quantity: 1,
        unit: "set",
        cost: MONITORING_COST,
        essential: false,
        note: "Real-time production, consumption, and export tracking",
      }
    );

    if (systemType === "grid-tied") {
      items.push({
        icon: RiFundsLine,
        name: "Net Metering Setup",
        specs: "Bi-directional meter + utility application",
        quantity: 1,
        unit: "lot",
        cost: 25_000,
        essential: true,
        note: "Requires utility approval; export excess at ~₱5–7/kWh",
      });
    }

    if (systemType === "off-grid") {
      items.push({
        icon: RiFlashlightLine,
        name: "Backup Generator Input",
        specs: "ATS + generator inlet box",
        quantity: 1,
        unit: "set",
        cost: 18_000,
        essential: false,
        note: "For extended rainy/cloudy days; manual or auto-start",
      });
    }

    return items;
  }, [results, systemType]);

  const bomTotalCost = useMemo(
    () => bomItems.reduce((sum, item) => sum + item.cost, 0),
    [bomItems]
  );

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
      // Recalculate monthly bill based on current consumption × new province rate
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

        {/* ══════════════════════════════════════════════════════════════════
            Section 1 — Lifestyle Modifier
           ══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto w-full space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <RiEqualizerLine className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Lifestyle Modifier
              </h3>
              <p className="text-sm text-gray-500">
                Your daily routine determines how solar energy should be sized and stored.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LIFESTYLE_OPTIONS.map((option) => {
              const isSelected = lifestyle === option.key;
              const Icon = option.icon;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setLifestyle(option.key)}
                  className={cn(
                    "relative rounded-2xl border-2 p-6 text-left transition-all duration-200",
                    "hover:shadow-lg hover:-translate-y-0.5",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/30"
                      : "border-gray-200 bg-white"
                  )}
                >
                  {isSelected && (
                    <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                      ✓
                    </span>
                  )}
                  <Icon
                    className={cn(
                      "text-3xl mb-3",
                      isSelected ? "text-primary" : "text-gray-400"
                    )}
                  />
                  <h4 className="text-base font-bold text-gray-900 mb-1.5">
                    {option.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {option.description}
                  </p>
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs leading-relaxed border",
                      isSelected
                        ? "bg-primary/10 border-primary/20 text-primary-foreground text-gray-700"
                        : "bg-gray-50 border-gray-100 text-gray-500"
                    )}
                  >
                    <span className="font-semibold block mb-0.5">
                      Battery sizing:
                    </span>
                    {option.batteryNote}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            Section 2 — Total Daily Load Calculation
           ══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto w-full space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
              <RiFlashlightLine className="text-secondary text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">
                Total Daily Load Calculation
              </h3>
              <p className="text-sm text-gray-500">
                Select appliances for each time period to calculate your daily energy demand.
              </p>
            </div>
            {applianceEntries.length > 0 && (
              <button
                type="button"
                onClick={() => setApplianceEntries([])}
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
                return (
                  sum +
                  (entry.quantity *
                    cat.defaultWatts[entry.type] *
                    entry.hours) /
                    1000
                );
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
                        const watts = cat.defaultWatts[entry.type];
                        const dailyKwh = (
                          (entry.quantity * watts * entry.hours) /
                          1000
                        ).toFixed(2);
                        return (
                          <div
                            key={entry.id}
                            className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5 group hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => openEditModal(entry)}
                          >
                            <div
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                                cat.color
                              )}
                            >
                              <CatIcon className="text-lg" />
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
                                removeEntry(entry.id);
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
                      onClick={() => openAddModal(period.key)}
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
          <div className="flex items-center justify-between bg-secondary/5 rounded-xl px-6 py-4 border border-secondary/20">
            <span className="text-gray-700 font-semibold">
              Total Daily Load
            </span>
            <span className="text-2xl font-bold text-secondary">
              {totalDailyKwh.toFixed(2)} kWh
            </span>
          </div>
          <p className="text-xs text-gray-400 -mt-4">
            Monthly estimate: {(totalDailyKwh * 30).toFixed(0)} kWh
          </p>
        </section>

        {/* Add/Edit Appliance Modal */}
        {modalOpen && selectedPeriod && (
          <AddApplianceModal
            period={selectedPeriod}
            editingEntry={editingEntry}
            onSave={saveEntry}
            onClose={closeModal}
          />
        )}

        {/* ══════════════════════════════════════════════════════════════════
            Section 3 — Load Input (Monthly kW, Price, Province)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto w-full space-y-6">
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
                      setMonthlyKwhOverride(null);
                    } else {
                      setMonthlyKwhOverride(Math.max(0, Number(val)));
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

            {/* Monthly Bill (total amount paid) */}
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
                    setMonthlyBill(Math.max(0, Number(e.target.value)))
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
                value={selectedProvince.name}
                onChange={(e) => handleProvinceChange(e.target.value)}
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
                Peak sun: {selectedProvince.peakSunHours} hrs/day
                {" · "}
                Avg rate: ₱{selectedProvince.avgRate}/kWh
              </p>
            </div>
          </div>
        </section>

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

        {/* ══════════════════════════════════════════════════════════════════
            Results
           ══════════════════════════════════════════════════════════════════ */}
        <section ref={resultsRef} className="max-w-5xl mx-auto w-full scroll-mt-24 space-y-6">
          {/* System type tabs */}
          <div className="bg-white rounded-2xl border border-gray-200 p-1.5 flex gap-1">
            {SYSTEM_TYPES.map((st) => {
              const StIcon = st.icon;
              const isActive = systemType === st.key;
              return (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => setSystemType(st.key)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <StIcon className="text-lg" />
                  <span className="hidden sm:inline">{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active system description */}
          <div className="bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
            <p className="text-sm text-gray-600">
              {SYSTEM_TYPES.find((s) => s.key === systemType)?.description}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 space-y-8 border border-gray-100">
            {/* Header */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <RiCalculatorLine className="text-primary" />
                Your Solar System Estimate
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {systemType === "hybrid"
                  ? "Hybrid setup with battery backup and grid support"
                  : systemType === "off-grid"
                    ? "Complete off-grid system for full energy independence"
                    : "Grid-tied system — simplest, lowest-cost entry"}
              </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ResultCard
                label="System Size"
                value={`${results.systemSizeKw} kW`}
                icon={<RiSunLine />}
              />
              {systemType !== "grid-tied" ? (
                <ResultCard
                  label="Battery Bank"
                  value={`${results.batteryKwh} kWh`}
                  icon={<RiBatteryChargeLine />}
                  highlight
                />
              ) : (
                <ResultCard
                  label="No Battery"
                  value="Grid-tied"
                  icon={<RiPlugLine />}
                />
              )}
              <ResultCard
                label="Rooftop Needed"
                value={`${results.rooftopNeeded} m²`}
              />
              <ResultCard
                label="Daily Production"
                value={`${results.dailyProduction} kWh`}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ResultCard
                label="Estimated Cost"
                value={`₱${bomTotalCost.toLocaleString()}`}
                highlight
              />
              <ResultCard
                label="Monthly Savings"
                value={`₱${results.monthlySavings}`}
              />
              <ResultCard
                label="Payback Period"
                value={
                  results.paybackYears === "—"
                    ? "—"
                    : `${results.paybackYears} years`
                }
              />
            </div>

            {/* ═══════════════════════════════════════════
                Detailed Bill of Materials (Accordion)
               ═══════════════════════════════════════════ */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <button
                type="button"
                onClick={() => setBomExpanded((v) => !v)}
                className="w-full flex items-center justify-between group"
              >
                <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <RiToolsLine className="text-gray-500" />
                  What You Need — Detailed Setup List
                  <span className="text-xs font-normal text-gray-400 ml-2">
                    ({bomItems.length} components)
                  </span>
                </h4>
                <span
                  className={cn(
                    "text-gray-400 transition-transform duration-200",
                    bomExpanded && "rotate-180"
                  )}
                >
                  <RiArrowDownLine className="text-lg" />
                </span>
              </button>

              {bomExpanded && (
                <div className="space-y-3">
                  {bomItems.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "flex items-start gap-4 rounded-xl p-4 transition-colors",
                          item.essential
                            ? "bg-white border border-gray-200"
                            : "bg-white/60 border border-dashed border-gray-300"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                            item.essential
                              ? "bg-primary/10 text-primary"
                              : "bg-gray-100 text-gray-500"
                          )}
                        >
                          <ItemIcon className="text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900 text-sm">
                              {item.name}
                            </span>
                            {!item.essential && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-600 font-medium">
                                OPTIONAL
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.specs}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {item.note}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-bold text-gray-900">
                            {typeof item.quantity === "number"
                              ? `${item.quantity} `
                              : ""}
                            {item.unit && (
                              <span className="font-normal text-gray-500 text-xs">
                                {item.unit}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-secondary font-semibold mt-0.5">
                            {item.cost > 0
                              ? `₱${item.cost.toLocaleString()}`
                              : "Included"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Total BOM */}
              <div className="flex items-center justify-between bg-primary/5 rounded-xl px-5 py-4 border border-primary/20">
                <div>
                  <span className="text-sm font-semibold text-gray-700">
                    Estimated Total System Cost
                  </span>
                  <p className="text-xs text-gray-500">
                    Including all components listed above
                  </p>
                </div>
                <span className="text-2xl font-bold text-primary">
                  ₱{bomTotalCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Savings summary */}
            <div className="border-t border-gray-200 pt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Savings</span>
                <span className="font-bold text-secondary">
                  ₱{results.annualSavings}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Bill Offset</span>
                <span className="font-bold text-gray-900">
                  {results.monthlyProduction} kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">25-Year Net Savings</span>
                <span className="font-bold text-secondary">
                  {results.lifetimeSavings === "—"
                    ? "—"
                    : `₱${results.lifetimeSavings}`}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              * Estimates based on Philippine solar irradiance averages and {selectedProvince.name} location.
              Battery sizing is influenced by your selected lifestyle ({lifestyle.replace(/-/g, " ")}).
              Actual prices vary by installer and site conditions. Contact us for a detailed on-site assessment.
            </p>
          </div>
        </section>
          </>
        )}
      </LayoutContainer>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Add / Edit Appliance Modal
// ─────────────────────────────────────────────────────────────────────────────

function AddApplianceModal({
  period,
  editingEntry,
  onSave,
  onClose,
}: {
  period: TimePeriod;
  editingEntry: ApplianceEntry | null;
  onSave: (entry: ApplianceEntry) => void;
  onClose: () => void;
}): React.ReactElement {
  const periodInfo = TIME_PERIODS.find((p) => p.key === period)!;
  const hoursPresets = getHoursPresets(periodInfo.maxHours);
  const defaultHours = periodInfo.maxHours >= 12 ? 6 : 4;

  const [step, setStep] = useState<"select" | "configure">(
    editingEntry ? "configure" : "select"
  );
  const [selectedKey, setSelectedKey] = useState<string>(
    editingEntry?.applianceKey ?? ""
  );
  const [applianceType, setApplianceType] = useState<ApplianceType>(
    editingEntry?.type ?? "standard"
  );
  const [quantity, setQuantity] = useState(editingEntry?.quantity ?? 1);
  const [hours, setHours] = useState(editingEntry?.hours ?? defaultHours);
  const [customHours, setCustomHours] = useState(
    editingEntry && !hoursPresets.includes(editingEntry.hours)
      ? editingEntry.hours
      : 0
  );
  const [useCustomHours, setUseCustomHours] = useState(
    editingEntry ? !hoursPresets.includes(editingEntry.hours) : false
  );

  const selectedCatalog = APPLIANCE_CATALOG.find(
    (c) => c.key === selectedKey
  );

  function handleSelectAppliance(key: string): void {
    setSelectedKey(key);
    setStep("configure");
  }

  function handleSave(): void {
    if (!selectedKey) return;
    const finalHours = useCustomHours ? customHours : hours;
    if (finalHours <= 0) return;
    const entry: ApplianceEntry = {
      id: editingEntry?.id ?? generateId(),
      applianceKey: selectedKey,
      type: applianceType,
      quantity,
      hours: finalHours,
      timePeriod: period,
    };
    onSave(entry);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between px-5 py-4 sticky top-0 bg-white rounded-t-2xl z-10 border-b",
            periodInfo.accentBg
          )}
        >
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = periodInfo.icon;
              return (
                <Icon className={cn("text-xl", periodInfo.accentText)} />
              );
            })()}
            <div>
              <h4 className="font-bold text-gray-900">
                {editingEntry ? "Edit Appliance" : "Add Appliance"}
              </h4>
              <p className="text-xs text-gray-500">
                {periodInfo.label} · {periodInfo.range}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <RiCloseLine className="text-lg" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Step 1: Select appliance icon */}
          {step === "select" && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600">
                Choose an appliance:
              </p>
              <div className="grid grid-cols-4 gap-3">
                {APPLIANCE_CATALOG.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelectAppliance(item.key)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-xl text-xl group-hover:scale-110 transition-transform",
                          item.color
                        )}
                      >
                        <ItemIcon />
                      </div>
                      <span className="text-[11px] text-gray-600 text-center leading-tight font-medium">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Configure */}
          {step === "configure" && selectedCatalog && (
            <div className="space-y-5">
              {/* Change appliance */}
              <div className="flex items-center gap-3">
                {(() => {
                  const CatIcon = selectedCatalog.icon;
                  return (
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl text-xl",
                        selectedCatalog.color
                      )}
                    >
                      <CatIcon />
                    </div>
                  );
                })()}
                <div>
                  <p className="font-bold text-gray-900">
                    {selectedCatalog.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep("select")}
                    className="text-xs text-primary hover:underline"
                  >
                    Change appliance
                  </button>
                </div>
              </div>

              {/* Type toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Appliance Type
                </label>
                <div className="flex gap-2">
                  {(["standard", "inverter"] as ApplianceType[]).map((t) => {
                    const watts = selectedCatalog.defaultWatts[t];
                    const isSelected = applianceType === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setApplianceType(t)}
                        className={cn(
                          "flex-1 rounded-xl border-2 px-4 py-3 text-left transition-all",
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <span
                          className={cn(
                            "text-sm font-semibold capitalize",
                            isSelected ? "text-primary" : "text-gray-700"
                          )}
                        >
                          {t}
                        </span>
                        <span className="block text-xs text-gray-500 mt-0.5">
                          ~{watts}W
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <RiSubtractLine />
                  </button>
                  <span className="text-xl font-bold text-gray-900 w-12 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    disabled={quantity >= 20}
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <RiAddLine />
                  </button>
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Hours of Use
                </label>
                <div className="flex flex-wrap gap-2">
                  {hoursPresets.map((h) => {
                    const isSelected = !useCustomHours && hours === h;
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() => {
                          setUseCustomHours(false);
                          setHours(h);
                        }}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-medium transition-all border-2",
                          isSelected
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        )}
                      >
                        {h} hrs
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      setUseCustomHours(true);
                      setCustomHours(hours);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all border-2",
                      useCustomHours
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    Custom
                  </button>
                </div>
                {useCustomHours && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      min={0.5}
                      max={periodInfo.maxHours}
                      step={0.5}
                      value={customHours}
                      onChange={(e) =>
                        setCustomHours(Math.min(periodInfo.maxHours, Math.max(0.5, Number(e.target.value))))
                      }
                      className="w-24 text-center rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                    <span className="text-sm text-gray-500">hours</span>
                  </div>
                )}
              </div>

              {/* Summary & Save */}
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">Est. daily load</span>
                <span className="text-lg font-bold text-secondary">
                  {(
                    (quantity *
                      selectedCatalog.defaultWatts[applianceType] *
                      (useCustomHours ? customHours : hours)) /
                    1000
                  ).toFixed(2)}{" "}
                  kWh
                </span>
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={
                  !selectedKey ||
                  (useCustomHours ? customHours <= 0 : hours <= 0)
                }
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editingEntry ? "Save Changes" : `Add to ${periodInfo.label}`}
              </button>

              {editingEntry && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Result Card
// ─────────────────────────────────────────────────────────────────────────────

function ResultCard({
  label,
  value,
  highlight,
  icon,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 text-center transition-colors",
        highlight
          ? "bg-secondary/10 border border-secondary/30"
          : "bg-white border border-gray-100"
      )}
    >
      {icon && (
        <div className="flex justify-center mb-1 text-gray-400">{icon}</div>
      )}
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p
        className={cn(
          "text-lg font-bold",
          highlight ? "text-secondary" : "text-gray-900"
        )}
      >
        {value}
      </p>
    </div>
  );
}
