import type { ComponentType } from "react";
import { RiBatteryChargeLine, RiSunLine, RiPlugLine } from "react-icons/ri";

export interface PackageSpec {
  label: string;
  value: string;
}

export interface PackageTier {
  kw: number;
  label: string;
  price: string;
  tagline: string;
  specs: PackageSpec[];
  popular?: boolean;
}

export interface SystemTab {
  id: "hybrid" | "offgrid" | "gridtied";
  label: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  packages: PackageTier[];
}

export const SYSTEM_TABS: SystemTab[] = [
    
  // -----------------------------------------------------------------------
  // HYBRID
  // -----------------------------------------------------------------------
  {
    id: "hybrid",
    label: "Hybrid Solar Setup",
    icon: RiBatteryChargeLine,
    description:
      "Grid-connected with battery backup. Use solar directly, store excess, and keep the grid for emergencies. Best for homes with frequent outages.",
    packages: [
      {
        kw: 5,
        label: "5kW Hybrid",
        price: "₱250,000 – ₱320,000",
        tagline: "Starter hybrid — essential backup",
        specs: [
          { label: "Solar Panels", value: "~12 × 415W panels" },
          { label: "Inverter", value: "5kW hybrid inverter" },
          { label: "Battery", value: "5–10 kWh LiFePO₄" },
          { label: "Daily Output", value: "~20–25 kWh" },
          { label: "Backup Power", value: "Lights, fridge, fans, WiFi" },
          { label: "Payback", value: "5–7 years" },
        ],
      },
      {
        kw: 8,
        label: "8kW Hybrid",
        price: "₱380,000 – ₱480,000",
        tagline: "Mid-range — whole-home partial backup",
        specs: [
          { label: "Solar Panels", value: "~20 × 415W panels" },
          { label: "Inverter", value: "8kW hybrid inverter" },
          { label: "Battery", value: "10–15 kWh LiFePO₄" },
          { label: "Daily Output", value: "~32–40 kWh" },
          { label: "Backup Power", value: "+ TV, microwave, small AC" },
          { label: "Payback", value: "5–7 years" },
        ],
        popular: true,
      },
      {
        kw: 10,
        label: "10kW Hybrid",
        price: "₱480,000 – ₱600,000",
        tagline: "Full-home comfort with battery",
        specs: [
          { label: "Solar Panels", value: "~24 × 415W panels" },
          { label: "Inverter", value: "10kW hybrid inverter" },
          { label: "Battery", value: "15–20 kWh LiFePO₄" },
          { label: "Daily Output", value: "~40–50 kWh" },
          { label: "Backup Power", value: "+ 1–2 air conditioners" },
          { label: "Payback", value: "5–7 years" },
        ],
      },
      {
        kw: 12,
        label: "12kW Hybrid",
        price: "₱580,000 – ₱720,000",
        tagline: "Large home — extended backup",
        specs: [
          { label: "Solar Panels", value: "~30 × 415W panels" },
          { label: "Inverter", value: "12kW hybrid inverter" },
          { label: "Battery", value: "20–25 kWh LiFePO₄" },
          { label: "Daily Output", value: "~48–60 kWh" },
          { label: "Backup Power", value: "+ multiple ACs, water pump" },
          { label: "Payback", value: "5–7 years" },
        ],
      },
      {
        kw: 15,
        label: "15kW Hybrid",
        price: "₱720,000 – ₱900,000",
        tagline: "Large property — serious storage",
        specs: [
          { label: "Solar Panels", value: "~36 × 415W panels" },
          { label: "Inverter", value: "15kW hybrid inverter" },
          { label: "Battery", value: "25–30 kWh LiFePO₄" },
          { label: "Daily Output", value: "~60–75 kWh" },
          { label: "Backup Power", value: "Whole home + workshop" },
          { label: "Payback", value: "5–7 years" },
        ],
      },
      {
        kw: 18,
        label: "18kW Hybrid",
        price: "₱860,000 – ₱1,050,000",
        tagline: "Maximum hybrid — near-full independence",
        specs: [
          { label: "Solar Panels", value: "~44 × 415W panels" },
          { label: "Inverter", value: "18kW hybrid inverter" },
          { label: "Battery", value: "30–40 kWh LiFePO₄" },
          { label: "Daily Output", value: "~72–90 kWh" },
          { label: "Backup Power", value: "Full home, all appliances" },
          { label: "Payback", value: "5–7 years" },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // OFF-GRID
  // -----------------------------------------------------------------------
  {
    id: "offgrid",
    label: "Off-Grid Solar Setup",
    icon: RiSunLine,
    description:
      "Completely independent from the grid. Oversized solar array and large battery bank power your home 24/7. Ideal for remote locations.",
    packages: [
      {
        kw: 5,
        label: "5kW Off-Grid",
        price: "₱350,000 – ₱450,000",
        tagline: "Essential off-grid cabin or tiny home",
        specs: [
          { label: "Solar Panels", value: "~12 × 415W panels" },
          { label: "Inverter", value: "5kW off-grid inverter" },
          { label: "Battery", value: "15–20 kWh LiFePO₄" },
          { label: "Daily Output", value: "~20–25 kWh" },
          { label: "Autonomy", value: "1–2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
      },
      {
        kw: 8,
        label: "8kW Off-Grid",
        price: "₱520,000 – ₱650,000",
        tagline: "Small family home independence",
        specs: [
          { label: "Solar Panels", value: "~20 × 415W panels" },
          { label: "Inverter", value: "8kW off-grid inverter" },
          { label: "Battery", value: "20–30 kWh LiFePO₄" },
          { label: "Daily Output", value: "~32–40 kWh" },
          { label: "Autonomy", value: "1–2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
        popular: true,
      },
      {
        kw: 10,
        label: "10kW Off-Grid",
        price: "₱650,000 – ₱800,000",
        tagline: "Comfortable family home, full off-grid",
        specs: [
          { label: "Solar Panels", value: "~24 × 415W panels" },
          { label: "Inverter", value: "10kW off-grid inverter" },
          { label: "Battery", value: "30–40 kWh LiFePO₄" },
          { label: "Daily Output", value: "~40–50 kWh" },
          { label: "Autonomy", value: "1.5–2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
      },
      {
        kw: 12,
        label: "12kW Off-Grid",
        price: "₱780,000 – ₱950,000",
        tagline: "Large home with high energy demand",
        specs: [
          { label: "Solar Panels", value: "~30 × 415W panels" },
          { label: "Inverter", value: "12kW off-grid inverter" },
          { label: "Battery", value: "40–50 kWh LiFePO₄" },
          { label: "Daily Output", value: "~48–60 kWh" },
          { label: "Autonomy", value: "1.5–2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
      },
      {
        kw: 15,
        label: "15kW Off-Grid",
        price: "₱950,000 – ₱1,150,000",
        tagline: "Large property — full independence",
        specs: [
          { label: "Solar Panels", value: "~36 × 415W panels" },
          { label: "Inverter", value: "15kW off-grid inverter" },
          { label: "Battery", value: "50–60 kWh LiFePO₄" },
          { label: "Daily Output", value: "~60–75 kWh" },
          { label: "Autonomy", value: "2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
      },
      {
        kw: 18,
        label: "18kW Off-Grid",
        price: "₱1,100,000 – ₱1,350,000",
        tagline: "Estate-level off-grid power",
        specs: [
          { label: "Solar Panels", value: "~44 × 415W panels" },
          { label: "Inverter", value: "18kW off-grid inverter" },
          { label: "Battery", value: "60–80 kWh LiFePO₄" },
          { label: "Daily Output", value: "~72–90 kWh" },
          { label: "Autonomy", value: "2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // GRID-TIED
  // -----------------------------------------------------------------------
  {
    id: "gridtied",
    label: "Grid-Tied Solar Setup",
    icon: RiPlugLine,
    description:
      "The most cost-effective solar setup. Stay connected to the grid — use solar by day, grid by night, and export excess via net metering for bill credits.",
    packages: [
      {
        kw: 5,
        label: "5kW Grid-Tied",
        price: "₱150,000 – ₱200,000",
        tagline: "Best-value solar starter",
        specs: [
          { label: "Solar Panels", value: "~12 × 415W panels" },
          { label: "Inverter", value: "5kW grid-tie inverter" },
          { label: "Daily Output", value: "~20–25 kWh" },
          { label: "Monthly Savings", value: "~₱4,000 – ₱6,000" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
      },
      {
        kw: 8,
        label: "8kW Grid-Tied",
        price: "₱240,000 – ₱320,000",
        tagline: "Mid-size home — serious savings",
        specs: [
          { label: "Solar Panels", value: "~20 × 415W panels" },
          { label: "Inverter", value: "8kW grid-tie inverter" },
          { label: "Daily Output", value: "~32–40 kWh" },
          { label: "Monthly Savings", value: "~₱6,500 – ₱9,500" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
        popular: true,
      },
      {
        kw: 10,
        label: "10kW Grid-Tied",
        price: "₱300,000 – ₱400,000",
        tagline: "Full-home solar coverage",
        specs: [
          { label: "Solar Panels", value: "~24 × 415W panels" },
          { label: "Inverter", value: "10kW grid-tie inverter" },
          { label: "Daily Output", value: "~40–50 kWh" },
          { label: "Monthly Savings", value: "~₱8,000 – ₱12,000" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
      },
      {
        kw: 12,
        label: "12kW Grid-Tied",
        price: "₱360,000 – ₱480,000",
        tagline: "Large home with high daytime use",
        specs: [
          { label: "Solar Panels", value: "~30 × 415W panels" },
          { label: "Inverter", value: "12kW grid-tie inverter" },
          { label: "Daily Output", value: "~48–60 kWh" },
          { label: "Monthly Savings", value: "~₱10,000 – ₱14,000" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
      },
      {
        kw: 15,
        label: "15kW Grid-Tied",
        price: "₱450,000 – ₱600,000",
        tagline: "Large property — maximum ROI",
        specs: [
          { label: "Solar Panels", value: "~36 × 415W panels" },
          { label: "Inverter", value: "15kW grid-tie inverter" },
          { label: "Daily Output", value: "~60–75 kWh" },
          { label: "Monthly Savings", value: "~₱12,000 – ₱18,000" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
      },
      {
        kw: 18,
        label: "18kW Grid-Tied",
        price: "₱540,000 – ₱720,000",
        tagline: "Near-commercial scale for estates",
        specs: [
          { label: "Solar Panels", value: "~44 × 415W panels" },
          { label: "Inverter", value: "18kW grid-tie inverter" },
          { label: "Daily Output", value: "~72–90 kWh" },
          { label: "Monthly Savings", value: "~₱14,500 – ₱21,000" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
      },
    ],
  },
];




export const WHATS_INCLUDED = [

 {
    image: "/aboutimages/solarpanels2.jpg",
    title: "Solar Panels",
    desc: "Tier-1 monocrystalline panels with 25-year performance warranty",
  },
  {
    image: "/aboutimages/inverter.png",
    title: "Inverter",
    desc: "Pure sine wave inverter with MPPT charge controller and Wi-Fi monitoring",
  },
  {
    image: "/HomeBanner/homebatt.png",
    title: "Battery",
    desc: "LiFePO₄ lithium batteries — 6,000+ cycle life, 10-year warranty (hybrid & off-grid)",
  },
  {
    image: "/aboutimages/mountin.jpg",
    title: "Mounting Hardware",
    desc: "Anodized aluminum rails, stainless steel fasteners, waterproof roof flashing",
  },
  {
    image: "/aboutimages/safety.jpg",
    title: "Safety & Protection",
    desc: "DC/AC surge protection, breakers, disconnects, grounding, and lightning arrestors",
  },
  {
    image: "/aboutimages/warrany.jpg",
    title: "Installation & Warranty",
    desc: "Professional installation, 5-year workmanship warranty, net metering assistance",
  },
];