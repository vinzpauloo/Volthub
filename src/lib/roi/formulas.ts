import {
  BATTERY_REPLACE_PCT_EV,
  BATTERY_REPLACE_PCT_SOLAR,
  BATTERY_REPLACE_YR_EV,
  BATTERY_REPLACE_YR_SOLAR,
  CO2_KG_PER_KWH,
  ELEC_ESCALATOR,
  EV_BATTERY_RTE,
  EV_MAINTENANCE_PCT,
  EV_SOLAR_CANOPY_UPLIFT,
  EV_SOLAR_PERFORMANCE_RATIO,
  EV_SOLAR_PRESETS,
  INSTALL_PCT_SOLAR,
  OUTAGE_BONUS,
  PANEL_DEGRADATION,
  PEAK_SUN_HOURS,
  SOLAR_SPACE_LIMITS,
} from "./constants";
import {
  acChargerModels,
  commercialSystems,
  dcChargerOptions,
  dcChargerPrices,
  evStorageOptions,
  residentialSystems,
} from "./catalogs";
import type {
  AcChargerModel,
  CommercialSystem,
  DcChargerOption,
  EvBreakdownRow,
  EvCalculatorInputs,
  EvCalculatorOutputs,
  ResidentialSystem,
  SolarCalculatorInputs,
  SolarCalculatorOutputs,
  SolarSystem,
  SpacePreset,
} from "./types";

export function fmtPHP(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n >= 1_000_000) return "₱" + (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return "₱" + (n / 1_000).toFixed(0) + "K";
  return "₱" + n.toLocaleString();
}

export function fmtPHPFull(n: number): string {
  return "₱" + n.toLocaleString("en-PH");
}

function findBestSolarSystem<T extends SolarSystem>(
  neededStorageKwh: number,
  neededPvKw: number,
  spacePreset: SpacePreset,
  catalog: T[]
): T {
  const [, maxPv] = SOLAR_SPACE_LIMITS[spacePreset];
  const scored = catalog
    .map((p) => {
      if (p.pvKw > maxPv) return { p, score: -1 };
      const battScore =
        Math.abs(p.battKwh - neededStorageKwh) / Math.max(neededStorageKwh, 1);
      const pvScore = Math.abs(p.pvKw - neededPvKw) / Math.max(neededPvKw, 1);
      return { p, score: battScore * 0.7 + pvScore * 0.3 };
    })
    .filter((x) => x.score >= 0);

  scored.sort((a, b) => a.score - b.score);
  return scored[0]?.p ?? catalog[catalog.length - 1];
}

export function computeSolar(
  inputs: SolarCalculatorInputs
): SolarCalculatorOutputs {
  const {
    customerType,
    monthlyBill: bill,
    rate,
    daytimePct,
    spacePreset,
    outageFreq,
    backupHours: backupHrs,
    selectionMode,
    selectedProduct,
  } = inputs;

  let product: SolarSystem;
  let isManual = false;

  if (selectionMode === "manual" && selectedProduct) {
    product = selectedProduct;
    isManual = true;
  } else {
    const monthlyKwhEst = bill / rate;
    const dailyKwhEst = monthlyKwhEst / 30;
    const dailyDaytime = dailyKwhEst * daytimePct;
    const dailyNight = dailyKwhEst * (1 - daytimePct);
    const neededPv = (dailyDaytime + dailyNight * 0.8) / PEAK_SUN_HOURS;
    const neededStorage = dailyNight + (dailyKwhEst / 24) * backupHrs * 1.2;
    const catalog: SolarSystem[] =
      customerType === "residential" ? residentialSystems : commercialSystems;
    product = findBestSolarSystem(neededStorage, neededPv, spacePreset, catalog);
  }

  const installPct = INSTALL_PCT_SOLAR[spacePreset];
  const installCost = Math.round(product.price * installPct);
  const totalInvestment = Math.round(product.price + installCost);

  const monthlyKwh = bill / rate;
  const dailyKwh = monthlyKwh / 30;
  const dailyPvGen = product.pvKw * PEAK_SUN_HOURS;
  const pvCoverage = Math.min(0.95, dailyPvGen / Math.max(dailyKwh, 1));

  const monthlySavings =
    bill * pvCoverage * daytimePct +
    bill * pvCoverage * (1 - daytimePct) * 0.85;

  const outageBonus = OUTAGE_BONUS[outageFreq];
  const adjMonthlySavings = monthlySavings * outageBonus;
  const annualSavings = adjMonthlySavings * 12;

  const cumSavings = (years: number): number => {
    let total = 0;
    for (let y = 0; y < years; y++) {
      total +=
        annualSavings *
        Math.pow(ELEC_ESCALATOR, y) *
        Math.pow(PANEL_DEGRADATION, y);
    }
    return total;
  };

  const batteryReplaceCost = Math.round(
    product.price * BATTERY_REPLACE_PCT_SOLAR
  );

  let paybackYears: number | null = null;
  let cum = 0;
  for (let y = 1; y <= 25; y++) {
    cum +=
      annualSavings *
      Math.pow(ELEC_ESCALATOR, y - 1) *
      Math.pow(PANEL_DEGRADATION, y - 1);
    if (paybackYears === null && cum >= totalInvestment) {
      const prevCum =
        y > 1
          ? cum -
            annualSavings *
              Math.pow(ELEC_ESCALATOR, y - 2) *
              Math.pow(PANEL_DEGRADATION, y - 2)
          : 0;
      const need = totalInvestment - prevCum;
      const got = cum - prevCum;
      paybackYears = y - 1 + (got > 0 ? need / got : 0);
    }
    if (y === BATTERY_REPLACE_YR_SOLAR) cum -= batteryReplaceCost;
  }

  const savings25 = cumSavings(25) - batteryReplaceCost;
  const net25 = savings25 - totalInvestment;

  const irr = solveIrr({
    initialOutflow: totalInvestment,
    annualCashflow: (y) =>
      annualSavings *
      Math.pow(ELEC_ESCALATOR, y - 1) *
      Math.pow(PANEL_DEGRADATION, y - 1) -
      (y === BATTERY_REPLACE_YR_SOLAR ? batteryReplaceCost : 0),
    years: 25,
    seed: 0.08,
    clampMin: 0.001,
    clampMax: 0.5,
    dnpvBreak: 0.01,
  });

  const co2PerYear = Math.round(
    (monthlyKwh * 12 * pvCoverage * CO2_KG_PER_KWH) / 1000
  );

  const savingsPct = Math.round((annualSavings / Math.max(bill * 12, 1)) * 100);

  return {
    product,
    isManual,
    monthlyKwh,
    equipPrice: product.price,
    installCost,
    totalInvestment,
    monthlySavings: adjMonthlySavings,
    annualSavings,
    savingsPct,
    paybackYears,
    savings25,
    net25,
    irr,
    co2PerYear,
    cumSavings,
  };
}

export const DEFAULT_AC_MODEL_KEY = "comm_screenless_5m" as const;
export const DEFAULT_DC_POWER_KEY = "40wdd" as const;
export const DEFAULT_EV_STORAGE_KWH = 100 as const;

export function getAcModel(key: string): AcChargerModel {
  return (
    acChargerModels.find((m) => m.key === key) ??
    acChargerModels.find((m) => m.key === DEFAULT_AC_MODEL_KEY) ??
    acChargerModels[0]
  );
}

export function getDcOption(key: string): DcChargerOption {
  return (
    dcChargerOptions.find((o) => o.key === key) ??
    dcChargerOptions.find((o) => o.key === DEFAULT_DC_POWER_KEY) ??
    dcChargerOptions[0]
  );
}

export function getDcPrice(
  power: EvCalculatorInputs["dcPower"],
  standard: EvCalculatorInputs["dcStandard"]
): number {
  const entry = dcChargerPrices[power];
  if (!entry) return 0;
  return entry[standard] ?? entry.GBEU ?? entry.GB ?? 0;
}

export function getStorageOption(kwh: number) {
  return (
    evStorageOptions.find((o) => o.key === kwh) ??
    evStorageOptions.find((o) => o.key === DEFAULT_EV_STORAGE_KWH) ??
    evStorageOptions[0]
  );
}

export function computeEv(inputs: EvCalculatorInputs): EvCalculatorOutputs {
  const {
    chargerType,
    numBays,
    acModelKey,
    acPedestal,
    acBox,
    dcPower,
    dcStandard,
    hasSolar,
    solarSize,
    solarPanelPrice,
    hasStorage,
    storageSystemKwh,
    chargingFee,
    gridRate,
    sessionsPerBay,
    kwhPerSession,
    opDays,
    installPct,
  } = inputs;

  let chargerUnitPrice: number;
  let chargerLabel: string;
  if (chargerType === "ac") {
    const acModel = getAcModel(acModelKey);
    chargerUnitPrice = acModel.price + acPedestal + acBox;
    chargerLabel = "AC 7kW Charger";
  } else {
    chargerUnitPrice = getDcPrice(dcPower, dcStandard);
    chargerLabel = getDcOption(dcPower).label;
  }

  const chargerTotal = chargerUnitPrice * numBays;

  let solarCost = 0;
  let solarKwp = 0;
  if (hasSolar) {
    const preset = EV_SOLAR_PRESETS[solarSize];
    solarCost = preset.panels * numBays * solarPanelPrice;
    solarCost = Math.round(solarCost * EV_SOLAR_CANOPY_UPLIFT);
    solarKwp = preset.kwp * numBays;
  }

  let storageCost = 0;
  let storageBattKwh = 0;
  let storagePvKw = 0;
  if (hasStorage) {
    const opt = getStorageOption(storageSystemKwh);
    storageCost = opt.price;
    storageBattKwh = opt.battKwh;
    storagePvKw = opt.pvKw;
  }

  const equipSubtotal = chargerTotal + solarCost + storageCost;
  const installCost = Math.round(equipSubtotal * installPct);
  const totalInvest = equipSubtotal + installCost;

  const totalDailyKwh = numBays * sessionsPerBay * kwhPerSession;
  const totalMonthlyKwh = totalDailyKwh * opDays;

  const totalPvKw = solarKwp + storagePvKw;
  const monthlySolarGen =
    totalPvKw * PEAK_SUN_HOURS * opDays * EV_SOLAR_PERFORMANCE_RATIO;
  const effectiveSolarKwh = Math.min(monthlySolarGen, totalMonthlyKwh);

  const gridKwh = Math.max(0, totalMonthlyKwh - effectiveSolarKwh);

  const storageDailyShift = hasStorage
    ? Math.min(
        storageBattKwh * EV_BATTERY_RTE,
        Math.max(
          0,
          totalDailyKwh - totalPvKw * PEAK_SUN_HOURS * EV_SOLAR_PERFORMANCE_RATIO
        )
      )
    : 0;
  const extraMonthlySolar = storageDailyShift * opDays;
  const finalGridKwh = Math.max(0, gridKwh - extraMonthlySolar);
  const finalSolarKwh = totalMonthlyKwh - finalGridKwh;

  const monthlyRevenue = totalMonthlyKwh * chargingFee;
  const monthlyGridCost = finalGridKwh * gridRate;
  const monthlyProfit = monthlyRevenue - monthlyGridCost;

  const annualProfit = monthlyProfit * 12;
  const solarOffsetPct =
    totalMonthlyKwh > 0
      ? Math.round((finalSolarKwh / totalMonthlyKwh) * 100)
      : 0;

  const annualMaintenance = Math.round(equipSubtotal * EV_MAINTENANCE_PCT);
  const batteryReplaceCost = hasStorage
    ? Math.round(storageCost * BATTERY_REPLACE_PCT_EV)
    : 0;

  const yearlyNetProfit = (y: number): number => {
    let c =
      annualProfit *
      Math.pow(ELEC_ESCALATOR, y - 1) *
      Math.pow(PANEL_DEGRADATION, y - 1) -
      annualMaintenance;
    if (y === BATTERY_REPLACE_YR_EV) c -= batteryReplaceCost;
    return c;
  };

  let cumNetSum = -totalInvest;
  for (let y = 1; y <= 10; y++) cumNetSum += yearlyNetProfit(y);
  const net10 = cumNetSum;

  let paybackYears: number | null = null;
  let cum = -totalInvest;
  for (let y = 1; y <= 10; y++) {
    const yrProfit = yearlyNetProfit(y);
    cum += yrProfit;
    if (paybackYears === null && cum >= 0) {
      const prevCum = cum - yrProfit;
      paybackYears = y - 1 + -prevCum / (yrProfit || 1);
    }
  }

  const irr = solveIrr({
    initialOutflow: totalInvest,
    annualCashflow: yearlyNetProfit,
    years: 10,
    seed: 0.1,
    clampMin: 0.001,
    clampMax: 0.99,
    dnpvBreak: 1,
  });

  const dailyProfitPerBay = monthlyProfit / opDays / Math.max(numBays, 1);

  const marginPct =
    monthlyRevenue > 0 ? Math.round((monthlyProfit / monthlyRevenue) * 100) : 0;

  const breakdown: EvBreakdownRow[] = [
    {
      label: chargerLabel,
      qty: "×" + numBays,
      unitPrice: fmtPHPFull(chargerUnitPrice),
      subtotal: chargerTotal,
    },
  ];
  if (hasSolar) {
    breakdown.push({
      label: `Solar Canopy (${solarKwp.toFixed(1)} kWp total)`,
      qty: `${numBays} bays`,
      unitPrice: fmtPHPFull(Math.round(solarCost / numBays)) + "/bay",
      subtotal: solarCost,
    });
  }
  if (hasStorage) {
    breakdown.push({
      label: `Storage System (${storageBattKwh} kWh batt, ${storagePvKw} kWp PV)`,
      qty: "1 set",
      unitPrice: fmtPHPFull(storageCost),
      subtotal: storageCost,
    });
  }
  breakdown.push({
    label: "Installation (civil works, wiring, commissioning)",
    qty: "—",
    unitPrice: Math.round(installPct * 100) + "%",
    subtotal: installCost,
  });

  return {
    chargerUnitPrice,
    chargerLabel,
    chargerTotal,
    solarCost,
    solarKwp,
    storageCost,
    storageBattKwh,
    storagePvKw,
    equipSubtotal,
    installCost,
    totalInvest,
    totalMonthlyKwh,
    finalGridKwh,
    finalSolarKwh,
    monthlyRevenue,
    monthlyGridCost,
    monthlyProfit,
    marginPct,
    annualProfit,
    annualMaintenance,
    batteryReplaceCost,
    paybackYears,
    net10,
    irr,
    dailyProfitPerBay,
    solarOffsetPct,
    breakdown,
  };
}

type IrrOpts = {
  initialOutflow: number;
  annualCashflow: (year: number) => number;
  years: number;
  seed: number;
  clampMin: number;
  clampMax: number;
  dnpvBreak: number;
};

function solveIrr(opts: IrrOpts): number {
  const cf: number[] = [-opts.initialOutflow];
  for (let y = 1; y <= opts.years; y++) cf.push(opts.annualCashflow(y));
  let r = opts.seed;
  for (let i = 0; i < 100; i++) {
    let npv = 0;
    let dnpv = 0;
    for (let t = 0; t < cf.length; t++) {
      npv += cf[t] / Math.pow(1 + r, t);
      dnpv += (-t * cf[t]) / Math.pow(1 + r, t + 1);
    }
    if (Math.abs(dnpv) < opts.dnpvBreak) break;
    const nr = r - npv / dnpv;
    if (Math.abs(nr - r) < 1e-6) break;
    r = Math.max(opts.clampMin, Math.min(opts.clampMax, nr));
  }
  return r;
}

export type { CommercialSystem, ResidentialSystem, SolarSystem };
