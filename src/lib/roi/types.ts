export type CustomerType = "residential" | "commercial" | "industrial";

export type SpacePreset = "small" | "medium" | "large";

export type OutageFrequency = "rare" | "occasional" | "frequent";

export type SelectionMode = "auto" | "manual";

export type CommercialSystem = {
  name: string;
  battKwh: number;
  pvKw: number;
  pvPanels: string;
  ratedKw: number;
  price: number;
};

export type ResidentialSystem = {
  name: string;
  battKwh: number;
  pvKw: number;
  pvPanels: string;
  charger: string;
  price: number;
};

export type SolarSystem = CommercialSystem | ResidentialSystem;

export type DcConnectorStandard = "GB" | "EU" | "GBEU";

export type DcPowerKey =
  | "7"
  | "20"
  | "30"
  | "40wd"
  | "40wdd"
  | "60wdd"
  | "80wdd"
  | "40dd"
  | "60dd"
  | "80dd"
  | "60fd"
  | "80fd"
  | "120fd"
  | "120fq"
  | "160fq"
  | "180fq"
  | "240fx"
  | "300fx"
  | "360fx"
  | "400fx";

export type DcChargerOption = {
  key: DcPowerKey;
  label: string;
  ratedKw: number;
};

export type AcChargerModelKey =
  | "home_screenless_5m"
  | "home_screen_5m"
  | "comm_screenless_5m"
  | "comm_screen_5m"
  | "comm_screenless_10m"
  | "comm_screen_10m";

export type AcChargerModel = {
  key: AcChargerModelKey;
  label: string;
  price: number;
};

export type SolarCalculatorInputs = {
  customerType: CustomerType;
  monthlyBill: number;
  rate: number;
  daytimePct: number; // 0-1
  spacePreset: SpacePreset;
  outageFreq: OutageFrequency;
  backupHours: number;
  selectionMode: SelectionMode;
  selectedProduct: SolarSystem | null;
};

export type SolarCalculatorOutputs = {
  product: SolarSystem;
  isManual: boolean;
  monthlyKwh: number;
  equipPrice: number;
  installCost: number;
  totalInvestment: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPct: number;
  paybackYears: number | null;
  savings25: number;
  net25: number;
  irr: number;
  co2PerYear: number;
  cumSavings: (years: number) => number;
};

export type ChargerType = "ac" | "dc";

export type SolarPresetKey = "light" | "standard" | "heavy";

export type EvCalculatorInputs = {
  chargerType: ChargerType;
  numBays: number;
  acModelKey: AcChargerModelKey;
  acPedestal: number;
  acBox: number;
  dcPower: DcPowerKey;
  dcStandard: DcConnectorStandard;
  hasSolar: boolean;
  solarSize: SolarPresetKey;
  solarPanelPrice: number;
  hasStorage: boolean;
  storageSystemKwh: number;
  chargingFee: number;
  gridRate: number;
  sessionsPerBay: number;
  kwhPerSession: number;
  opDays: number;
  installPct: number; // 0-1
};

export type EvBreakdownRow = {
  label: string;
  qty: string;
  unitPrice: string;
  subtotal: number;
};

export type EvCalculatorOutputs = {
  chargerUnitPrice: number;
  chargerLabel: string;
  chargerTotal: number;
  solarCost: number;
  solarKwp: number;
  storageCost: number;
  storageBattKwh: number;
  storagePvKw: number;
  equipSubtotal: number;
  installCost: number;
  totalInvest: number;
  totalMonthlyKwh: number;
  finalGridKwh: number;
  finalSolarKwh: number;
  monthlyRevenue: number;
  monthlyGridCost: number;
  monthlyProfit: number;
  marginPct: number;
  annualProfit: number;
  annualMaintenance: number;
  batteryReplaceCost: number;
  paybackYears: number | null;
  net10: number;
  irr: number;
  dailyProfitPerBay: number;
  solarOffsetPct: number;
  breakdown: EvBreakdownRow[];
};
