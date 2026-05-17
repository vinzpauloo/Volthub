import type {
  AcChargerModel,
  CommercialSystem,
  DcChargerOption,
  DcConnectorStandard,
  DcPowerKey,
  ResidentialSystem,
} from "./types";

export const commercialSystems: CommercialSystem[] = [
  { name: "40 kWh", battKwh: 40.96, pvKw: 20.1, pvPanels: "670W×30", ratedKw: 20, price: 1823684.1 },
  { name: "60 kWh", battKwh: 61.4, pvKw: 26.8, pvPanels: "670W×40", ratedKw: 30, price: 2694050.62 },
  { name: "80 kWh", battKwh: 83.2, pvKw: 40.2, pvPanels: "670W×60", ratedKw: 40, price: 3918051.35 },
  { name: "100 kWh", battKwh: 100.3, pvKw: 48.24, pvPanels: "670W×72", ratedKw: 50, price: 4593349.12 },
  { name: "215 kWh", battKwh: 215.04, pvKw: 96.48, pvPanels: "670W×144", ratedKw: 100, price: 7754538.15 },
  { name: "233 kWh", battKwh: 232.9, pvKw: 96.48, pvPanels: "670W×144", ratedKw: 110, price: 8148259.9 },
  { name: "261 kWh", battKwh: 261.2, pvKw: 96.48, pvPanels: "670W×144", ratedKw: 110, price: 8714233.62 },
  { name: "466 kWh", battKwh: 465.8, pvKw: 192.96, pvPanels: "670W×288", ratedKw: 110, price: 16173481.2 },
  { name: "522 kWh", battKwh: 522.4, pvKw: 192.96, pvPanels: "670W×288", ratedKw: 220, price: 17256213.8 },
];

export const residentialSystems: ResidentialSystem[] = [
  {
    name: "50㎡ (12kWp)",
    battKwh: 15,
    pvKw: 12,
    pvPanels: "580W N-type×21",
    charger: "7kW AC",
    price: 557820.0,
  },
  {
    name: "100㎡ (24kWp)",
    battKwh: 30,
    pvKw: 24,
    pvPanels: "600W N-type×40",
    charger: "11kW / Dual 7kW",
    price: 986040.0,
  },
];

export const acChargerModels: AcChargerModel[] = [
  { key: "home_screenless_5m", label: "Home Ver, Screenless, 5m", price: 21375 },
  { key: "home_screen_5m", label: "Home Ver, With Screen, 5m", price: 23625 },
  { key: "comm_screenless_5m", label: "Comm Ver, Screenless, 5m", price: 23625 },
  { key: "comm_screen_5m", label: "Comm Ver, With Screen, 5m", price: 24750 },
  { key: "comm_screenless_10m", label: "Comm Ver, Screenless, 10m", price: 28575 },
  { key: "comm_screen_10m", label: "Comm Ver, With Screen, 10m", price: 30375 },
];

export const dcChargerOptions: DcChargerOption[] = [
  { key: "7", label: "7kW Wall-Mounted (WD)", ratedKw: 7 },
  { key: "20", label: "20kW Wall-Mounted (WD)", ratedKw: 20 },
  { key: "30", label: "30kW Wall-Mounted (WD)", ratedKw: 30 },
  { key: "40wd", label: "40kW Wall-Mounted (WD)", ratedKw: 40 },
  { key: "40wdd", label: "40kW Wall-Mounted Dual (WDD)", ratedKw: 40 },
  { key: "40dd", label: "40kW Floor-Mounted Dual (DD)", ratedKw: 40 },
  { key: "60wdd", label: "60kW Wall-Mounted Dual (WDD)", ratedKw: 60 },
  { key: "60dd", label: "60kW Floor-Mounted Dual (DD)", ratedKw: 60 },
  { key: "60fd", label: "60kW Floor-Mounted Dual (FD)", ratedKw: 60 },
  { key: "80wdd", label: "80kW Wall-Mounted Dual (WDD)", ratedKw: 80 },
  { key: "80dd", label: "80kW Floor-Mounted Dual (DD)", ratedKw: 80 },
  { key: "80fd", label: "80kW Floor-Mounted Dual (FD)", ratedKw: 80 },
  { key: "120fd", label: "120kW Floor-Mounted Dual (FD)", ratedKw: 120 },
  { key: "120fq", label: "120kW Floor-Mounted Dual (FQ)", ratedKw: 120 },
  { key: "160fq", label: "160kW Floor-Mounted Dual (FQ)", ratedKw: 160 },
  { key: "180fq", label: "180kW Floor-Mounted Dual (FQ)", ratedKw: 180 },
  { key: "240fx", label: "240kW Floor-Mounted Dual (FX)", ratedKw: 240 },
  { key: "300fx", label: "300kW Floor-Mounted Dual (FX)", ratedKw: 300 },
  { key: "360fx", label: "360kW Floor-Mounted Dual (FX)", ratedKw: 360 },
  { key: "400fx", label: "400kW Floor-Mounted Dual (FX)", ratedKw: 400 },
];

export const dcChargerPrices: Record<
  DcPowerKey,
  Partial<Record<DcConnectorStandard, number>>
> = {
  "7": { GB: 90000, EU: 112500 },
  "20": { GB: 117000, EU: 382500 },
  "30": { GB: 157500, EU: 207000 },
  "40wd": { GB: 175500, EU: 247500 },
  "40wdd": { GB: 281250, EU: 360000, GBEU: 326250 },
  "60wdd": { GB: 371250, EU: 461250, GBEU: 427500 },
  "80wdd": { GB: 427500, EU: 517500, GBEU: 495000 },
  "40dd": { GB: 303750, EU: 382500, GBEU: 360000 },
  "60dd": { GB: 382500, EU: 495000, GBEU: 472500 },
  "80dd": { GB: 450000, EU: 540000, GBEU: 517500 },
  "60fd": { GB: 405000, EU: 517500, GBEU: 495000 },
  "80fd": { GB: 472500, EU: 517500, GBEU: 540000 },
  "120fd": { GB: 607500, EU: 720000, GBEU: 697500 },
  "120fq": { GB: 630000, EU: 742500, GBEU: 720000 },
  "160fq": { GB: 742500, EU: 810000, GBEU: 765000 },
  "180fq": { GB: 832500, EU: 900000, GBEU: 877500 },
  "240fx": { GBEU: 1035000 },
  "300fx": { GBEU: 1237500 },
  "360fx": { GBEU: 1327500 },
  "400fx": { GBEU: 1417500 },
};

export type EvStorageOption = {
  key: number;
  label: string;
  price: number;
  battKwh: number;
  pvKw: number;
};

export const evStorageOptions: EvStorageOption[] = [
  { key: 40, label: "40 kWh System (40.96kWh batt, 20.1kWp PV)", price: 1823684, battKwh: 40.96, pvKw: 20.1 },
  { key: 60, label: "60 kWh System (61.4kWh batt, 26.8kWp PV)", price: 2694051, battKwh: 61.4, pvKw: 26.8 },
  { key: 80, label: "80 kWh System (83.2kWh batt, 40.2kWp PV)", price: 3918051, battKwh: 83.2, pvKw: 40.2 },
  { key: 100, label: "100 kWh System (100.3kWh batt, 48.2kWp PV)", price: 4593349, battKwh: 100.3, pvKw: 48.24 },
  { key: 215, label: "215 kWh System (215kWh batt, 96.5kWp PV)", price: 7754538, battKwh: 215, pvKw: 96.48 },
  { key: 261, label: "261 kWh System (261.2kWh batt, 96.5kWp PV)", price: 8714234, battKwh: 261.2, pvKw: 96.48 },
];
