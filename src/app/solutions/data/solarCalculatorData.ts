import {
  RiSunCloudyFill,
  RiMoonLine,
  RiEqualizerLine,
  RiTempColdLine,
  RiFridgeLine,
  RiWindyLine,
  RiTvLine,
  RiLightbulbLine,
  RiSettings3Line,
  RiComputerLine,
  RiRestaurantLine,
  RiDropLine,
  RiShowersLine,
  RiFireLine,
  RiBatteryChargeLine,
  RiBatteryLowLine,
  RiPlugLine,
  RiWifiLine,
} from "react-icons/ri";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type Lifestyle = "work-from-home" | "work-from-office" | "balanced";
export type TimePeriod = "morning" | "afternoon" | "evening";
export type ApplianceType = "standard" | "inverter";
export type SystemType = "hybrid" | "off-grid" | "grid-tied";

export interface ApplianceEntry {
  id: string;
  applianceKey: string;
  type: ApplianceType;
  quantity: number;
  hours: number;
  timePeriod: TimePeriod;
}

export interface ApplianceCatalogItem {
  key: string;
  name: string;
  icon: React.ElementType;
  image?: string;
  defaultWatts: { standard: number; inverter: number };
  color: string;
}

export interface BomItem {
  icon: React.ElementType;
  image?: string;
  name: string;
  specs: string;
  quantity: number | string;
  unit: string;
  cost: number;
  essential: boolean;
  note: string;
}

export interface ProvinceInfo {
  name: string;
  peakSunHours: number;
  avgRate: number;
}

export interface SolarResults {
  systemSizeKw: string;
  dailyProduction: string;
  monthlyProduction: string;
  batteryKwh: number;
  rooftopNeeded: number;
  estimatedCost: string;
  batteryCost: string;
  totalCost: string;
  monthlySavings: string;
  annualSavings: string;
  paybackYears: string;
  lifetimeSavings: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getHoursPresets(maxHours: number): number[] {
  const all = [1, 2, 3, 4, 6, 8, 12];
  return all.filter((h) => h <= maxHours);
}

// ─────────────────────────────────────────────────────────────────────────────
// System type definitions
// ─────────────────────────────────────────────────────────────────────────────

export const SYSTEM_TYPES: {
  key: SystemType;
  label: string;
  description: string;
  icon: React.ElementType;
  batteryIncluded: boolean;
}[] = [
  {
    key: "hybrid",
    label: "Hybrid Solar Setup",
    description:
      "Solar + battery + grid. Best of both worlds — backup power during outages and grid export when battery is full.",
    icon: RiBatteryChargeLine,
    batteryIncluded: true,
  },
  {
    key: "off-grid",
    label: "Off-Grid Solar Setup",
    description:
      "100% independent from the grid. Requires larger battery bank and is ideal for remote areas with no grid access.",
    icon: RiBatteryLowLine,
    batteryIncluded: true,
  },
  {
    key: "grid-tied",
    label: "Grid-Tied Solar Setup",
    description:
      "Solar panels + grid-tie inverter only. Excess energy is exported to the grid via net metering. No backup during outages.",
    icon: RiPlugLine,
    batteryIncluded: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Pricing & technical constants (Philippine market, 2026)
// ─────────────────────────────────────────────────────────────────────────────

export const PANEL_WATTS = 550; // W per panel (mono PERC half-cut)
export const PANEL_COST = 12_500; // ₱ per 550W panel
export const INVERTER_COST_PER_KW = 22_000; // ₱ per kW
export const BATTERY_UNIT_KWH = 4.8; // kWh per 48V 100Ah LiFePO4 rack unit
export const BATTERY_UNIT_COST = 55_000; // ₱ per 4.8kWh unit
export const MPPT_COST_PER_KW = 8_000; // ₱ per kW of MPPT
export const MOUNTING_COST_PER_PANEL = 2_500; // ₱ per panel (rails, clamps, feet)
export const BOS_COST_PER_KW = 15_000; // ₱ per kW (breakers, wires, conduits, combiner box)
export const MONITORING_COST = 12_000; // ₱ flat (WiFi/Bluetooth dongle + CT clamps)

export const COST_PER_KW = 55_000; // ₱ per kW installed
export const PANEL_EFFICIENCY = 0.20; // kW per m²
export const SYSTEM_LIFETIME_YEARS = 25;

// ─────────────────────────────────────────────────────────────────────────────
// Lifestyle options
// ─────────────────────────────────────────────────────────────────────────────

export const LIFESTYLE_OPTIONS = [
  {
    key: "work-from-home",
    icon: RiSunCloudyFill,
    title: "Day Time User",
    description:
      "High daytime energy use. Solar power covers your needs during peak production.",
    batteryNote:
      "Sizing favors grid-tied or smaller batteries — solar directly covers daytime loads with minimal storage needed.",
  },
  {
    key: "work-from-office",
    icon: RiMoonLine,
    title: "Night Time User",
    description:
      "Heavy nighttime energy use. Most consumption occurs after sunset when solar panels aren't producing.",
    batteryNote:
      "Requires a larger battery bank (off-grid/hybrid) to store daytime generation for evening and nighttime use.",
  },
  {
    key: "balanced",
    icon: RiEqualizerLine,
    title: "Balanced User",
    description:
      "Standard even spread of consumption throughout the day with moderate daytime and nighttime usage.",
    batteryNote:
      "A moderate battery size works well — enough to cover evening loads while solar handles daytime demand.",
  },
];

export const APPLIANCE_CATALOG = [
  {
    key: "air-conditioner",
    name: "Air Conditioner",
    icon: RiTempColdLine,
    image: "/solor/appliances/air-conditioner.png",
    defaultWatts: { standard: 1500, inverter: 800 },
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    key: "refrigerator",
    name: "Refrigerator",
    icon: RiFridgeLine,
    image: "/solor/appliances/refrigerator.png",
    defaultWatts: { standard: 200, inverter: 120 },
    color: "bg-blue-100 text-blue-600",
  },
  {
    key: "electric-fan",
    name: "Electric Fan",
    icon: RiWindyLine,
    image: "/solor/appliances/electric-fan.png",
    defaultWatts: { standard: 65, inverter: 35 },
    color: "bg-teal-100 text-teal-600",
  },
  {
    key: "television",
    name: "Television",
    icon: RiTvLine,
    image: "/solor/appliances/television.png",
    defaultWatts: { standard: 120, inverter: 70 },
    color: "bg-purple-100 text-purple-600",
  },
  {
    key: "led-lights",
    name: "LED Lights",
    icon: RiLightbulbLine,
    image: "/solor/appliances/led-lights.png",
    defaultWatts: { standard: 10, inverter: 10 },
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    key: "washing-machine",
    name: "Washing Machine",
    icon: RiSettings3Line,
    image: "/solor/appliances/washing-machine.png",
    defaultWatts: { standard: 500, inverter: 300 },
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    key: "computer",
    name: "Computer / Laptop",
    icon: RiComputerLine,
    image: "/solor/appliances/computer.png",
    defaultWatts: { standard: 100, inverter: 60 },
    color: "bg-gray-100 text-gray-600",
  },
  {
    key: "rice-cooker",
    name: "Rice Cooker",
    icon: RiRestaurantLine,
    image: "/solor/appliances/rice-cooker.png",
    defaultWatts: { standard: 700, inverter: 450 },
    color: "bg-orange-100 text-orange-600",
  },
  {
    key: "water-pump",
    name: "Water Pump",
    icon: RiDropLine,
    image: "/solor/appliances/water-pump.png",
    defaultWatts: { standard: 750, inverter: 500 },
    color: "bg-sky-100 text-sky-600",
  },
  {
    key: "water-heater",
    name: "Water Heater",
    icon: RiShowersLine,
    image: "/solor/appliances/water-heater.png",
    defaultWatts: { standard: 3500, inverter: 2500 },
    color: "bg-red-100 text-red-600",
  },
  {
    key: "microwave",
    name: "Microwave",
    icon: RiFireLine,
    image: "/solor/appliances/microwave.png",
    defaultWatts: { standard: 1000, inverter: 700 },
    color: "bg-amber-100 text-amber-600",
  },
  {
    key: "iron",
    name: "Electric Iron",
    icon: RiFireLine,
    image: "/solor/appliances/iron.png",
    defaultWatts: { standard: 1000, inverter: 750 },
    color: "bg-rose-100 text-rose-600",
  },
    {
        key: "wifi-router",
        name: "WiFi Router",
        icon: RiWifiLine,
        image: "/solor/appliances/wifi-router.png",
        defaultWatts: { standard: 10, inverter: 10 },
        color: "bg-green-100 text-green-600",
    },
];

export const TIME_PERIODS = [
  {
    key: "morning",
    label: "Morning",
    icon: RiSunCloudyFill,
    range: "6 AM – 12 PM",
    maxHours: 6,
    accentBorder: "whitespace-nowrap",
    accentBg: "transparent",
    accentText: "text-amber-700",
  },
  {
    key: "afternoon",
    label: "Afternoon",
    icon: RiSunCloudyFill,
    range: "12 PM – 6 PM",
    maxHours: 6,
    accentBorder: "whitespace-nowrap",
    accentBg: "transparent",
    accentText: "text-orange-700",
  },
  {
    key: "evening",
    label: "Evening",
    icon: RiSunCloudyFill,
    range: "6 PM – 6 AM",
    maxHours: 12,
    accentBorder: "whitespace-nowrap",
    accentBg: "transparent",
    accentText: "text-indigo-700",
  },
];

export const PROVINCES = [
  { name: "Metro Manila (Meralco)", peakSunHours: 5.0, avgRate: 11.5 },
  { name: "Bulacan", peakSunHours: 5.1, avgRate: 11.0 },
  { name: "Pampanga", peakSunHours: 5.1, avgRate: 10.8 },
  { name: "Batangas", peakSunHours: 5.3, avgRate: 10.5 },
  { name: "Laguna", peakSunHours: 5.2, avgRate: 10.8 },
  { name: "Cavite", peakSunHours: 5.2, avgRate: 11.0 },
  { name: "Rizal", peakSunHours: 5.1, avgRate: 11.2 },
  { name: "Cebu", peakSunHours: 5.0, avgRate: 12.0 },
  { name: "Iloilo", peakSunHours: 5.0, avgRate: 11.5 },
  { name: "Davao", peakSunHours: 4.8, avgRate: 10.0 },
  { name: "Cagayan de Oro", peakSunHours: 4.9, avgRate: 10.5 },
  { name: "Baguio / Benguet", peakSunHours: 4.5, avgRate: 9.5 },
  { name: "Pangasinan", peakSunHours: 5.2, avgRate: 10.5 },
  { name: "Nueva Ecija", peakSunHours: 5.2, avgRate: 10.8 },
  { name: "Zambales", peakSunHours: 5.3, avgRate: 10.5 },
];
