interface MarketSnapshot {
  label: string;
  value: string;
  projected: string;
  cagr: string;
  colorClass: string;
}

interface StatHighlight {
  value: string;
  label: string;
  context: string;
}

interface MarketGrowthPoint {
  year: string;
  value: number;
}

interface MarketSectionData {
  id: string;
  badge: string;
  title: string;
  description: string;
  keyStats: StatHighlight[];
  growthData: MarketGrowthPoint[];
  chartType: "bar" | "line" | "area";
  chartColor: string;
  chartTitle: string;
  highlights: string[];
}

interface PolicyItem {
  title: string;
  icon: string;
  description: string;
  impact: string;
}

interface MacroDriver {
  title: string;
  stat: string;
  description: string;
}

export const marketSnapshots: MarketSnapshot[] = [
  {
    label: "EV Charging Infrastructure",
    value: "USD 168M",
    projected: "USD 3.4B by 2033",
    cagr: "29.3%",
    colorClass: "bg-emerald-50 border-emerald-200",
  },
  {
    label: "Solar Energy",
    value: "USD 2.1B",
    projected: "USD 4.5B by 2033",
    cagr: "9.2%",
    colorClass: "bg-amber-50 border-amber-200",
  },
  {
    label: "Energy Storage (BESS)",
    value: "USD 3.1B",
    projected: "USD 9.8B by 2031",
    cagr: "21.5%",
    colorClass: "bg-blue-50 border-blue-200",
  },
  {
    label: "Total Addressable Market",
    value: "~USD 5.4B",
    projected: "USD 17.7B+",
    cagr: "20%+",
    colorClass: "bg-purple-50 border-purple-200",
  },
];

export const evChargingData: MarketSectionData = {
  id: "ev-charging",
  badge: "EV Charging",
  title: "EV Adoption is Accelerating",
  description:
    "The Philippines EV market is experiencing explosive growth, with four-wheel EV sales surging 277% year-over-year. The government's EVIDA law mandates charging infrastructure at all gas stations, creating massive equipment demand.",
  keyStats: [
    {
      value: "277%",
      label: "YoY Growth",
      context: "Four-wheel EV sales in 2024",
    },
    {
      value: "962",
      label: "Stations",
      context: "For 110M+ people — 7,300 needed by 2028",
    },
    {
      value: "81.4%",
      label: "BYD Market Share",
      context: "Dominant player in 2025 EV sales",
    },
  ],
  growthData: [
    { year: "2019", value: 214 },
    { year: "2020", value: 350 },
    { year: "2021", value: 520 },
    { year: "2022", value: 750 },
    { year: "2023", value: 1028 },
    { year: "2024", value: 3880 },
    { year: "2025 (proj.)", value: 20000 },
  ],
  chartType: "bar",
  chartColor: "#1a7c11",
  chartTitle: "Four-Wheel EV Sales (Units)",
  highlights: [
    "EVIDA law mandates charging at all gas stations",
    "7,300 charging stations targeted by 2028 (7.6x current)",
    "100% excise tax exemption on electric vehicles",
    "Fleet electrification: e-jeepneys, e-tricycles, e-logistics",
  ],
};

export const solarEnergyData: MarketSectionData = {
  id: "solar-energy",
  badge: "Solar Energy",
  title: "Solar is the Cheapest Power Source",
  description:
    "Solar energy in the Philippines has reached a tipping point. With an LCOE roughly one-quarter of grid electricity costs, solar delivers 4-5 year residential payback periods — and under 3 years in island provinces running on diesel.",
  keyStats: [
    {
      value: "1/4",
      label: "Grid Price",
      context: "Solar LCOE vs. Meralco rates",
    },
    {
      value: "4-5 yr",
      label: "Payback",
      context: "Residential grid-tied solar",
    },
    {
      value: "<1%",
      label: "Rooftop Penetration",
      context: "Massive untapped potential in cities",
    },
  ],
  growthData: [
    { year: "2022", value: 1.53 },
    { year: "2023", value: 1.58 },
    { year: "2024", value: 2.9 },
    { year: "2025", value: 4.25 },
    { year: "2027", value: 8.5 },
    { year: "2029", value: 13.5 },
    { year: "2031", value: 18.49 },
  ],
  chartType: "line",
  chartColor: "#f59e0b",
  chartTitle: "Installed Capacity (GW)",
  highlights: [
    "Net metering cap raised to 1 MW — unlocking C&I rooftop solar",
    "25 GW Green Energy Auction pipeline through 2035",
    "Residential rooftop solar: fastest segment at 31.6% CAGR",
    "36+ GW solar development pipeline across the archipelago",
  ],
};

export const energyStorageData: MarketSectionData = {
  id: "energy-storage",
  badge: "Energy Storage",
  title: "Storage is Becoming Mandatory",
  description:
    "The Philippines is expected to dominate ASEAN BESS deployments in the near term. Green Energy Auction 4 mandates 4-hour battery pairing for solar projects, and the country's vulnerability to typhoons makes energy resilience a critical need.",
  keyStats: [
    {
      value: "21.5%",
      label: "CAGR",
      context: "BESS market growth through 2031",
    },
    {
      value: "22-25 GW",
      label: "By 2050",
      context: "Government BESS target (from 0.6 GW today)",
    },
    {
      value: "#1",
      label: "Electricity Prices",
      context: "Highest in Asia — strong economic case for storage",
    },
  ],
  growthData: [
    { year: "2024", value: 1.0 },
    { year: "2025", value: 3.1 },
    { year: "2027", value: 5.2 },
    { year: "2029", value: 7.5 },
    { year: "2031", value: 9.8 },
  ],
  chartType: "area",
  chartColor: "#3b82f6",
  chartTitle: "BESS Market Size (USD Billions)",
  highlights: [
    "GEA-4 mandates 4-hour BESS pairing for solar projects",
    "Energy Storage Systems Act: 7-year tax holiday + duty exemptions",
    "Typhoon resilience: 6 typhoons in 30 days in 2024",
    "USD 0.214/kWh residential rates drive storage adoption",
  ],
};

export const policyItems: PolicyItem[] = [
  {
    title: "EVIDA Law (RA 11697)",
    icon: "Zap",
    description:
      "Mandates EV charging at gas stations, 5% fleet electrification, and 100% excise tax exemption on EVs through 2028.",
    impact:
      "Forces equipment demand: 7,300+ stations needed to meet 2028 targets",
  },
  {
    title: "Net Metering (1 MW Cap)",
    icon: "Sun",
    description:
      "Raised from 100 kW to 1 MW, unlocking commercial and industrial rooftop solar with credit banking and multi-site sharing.",
    impact:
      "Opens the C&I solar market to medium-sized businesses and properties",
  },
  {
    title: "Green Energy Auctions",
    icon: "TrendingUp",
    description:
      "GEA-4 awarded 10,195 MW of RE capacity with a 25 GW pipeline through 2035. Requires 4-hour BESS pairing for solar.",
    impact: "Creates the largest RE procurement program in Southeast Asia",
  },
  {
    title: "CREATE MORE Act",
    icon: "BadgeDollarSign",
    description:
      "Reduced corporate tax to 20%, offers 4-7 year income tax holidays for pioneer projects, and duty-free equipment imports.",
    impact:
      "Dramatically improves project economics for clean energy investments",
  },
  {
    title: "Energy Storage Act",
    icon: "Battery",
    description:
      "House Bill 6676 passed with 192-3 vote: 7-year tax holiday, VAT zero-rating, customs duty exemptions for BESS projects.",
    impact: "Positions the Philippines as ASEAN's leading BESS market",
  },
  {
    title: "100% Foreign Ownership in RE",
    icon: "Globe",
    description:
      "Since November 2022, foreign investors can fully own solar, wind, biomass, and ocean energy projects in the Philippines.",
    impact:
      "Triggered USD 13.7B in Chinese investment commitments and record FDI",
  },
];

export const macroDrivers: MacroDriver[] = [
  {
    title: "Electricity Cost",
    stat: "USD 0.214/kWh",
    description: "Highest in Asia — strong ROI for clean energy",
  },
  {
    title: "Population",
    stat: "116.4M",
    description: "14th largest globally, median age 26.1",
  },
  {
    title: "GDP Growth",
    stat: "5.1-5.6%",
    description: "2nd highest in Southeast Asia (2025)",
  },
  {
    title: "BNEF RE Ranking",
    stat: "#2",
    description: "Most attractive emerging market for RE",
  },
  {
    title: "RE Target",
    stat: "35%",
    description: "Renewable energy share by 2030",
  },
];

export type {
  MarketSnapshot,
  StatHighlight,
  MarketGrowthPoint,
  MarketSectionData,
  PolicyItem,
  MacroDriver,
};
