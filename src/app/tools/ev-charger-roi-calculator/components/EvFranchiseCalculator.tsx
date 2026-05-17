"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  acChargerModels,
  dcChargerOptions,
  evStorageOptions,
} from "@/lib/roi/catalogs";
import {
  BATTERY_REPLACE_YR_EV,
  ELEC_ESCALATOR,
  PANEL_DEGRADATION,
} from "@/lib/roi/constants";
import { computeEv, fmtPHP, fmtPHPFull, getDcPrice } from "@/lib/roi/formulas";
import type {
  AcChargerModelKey,
  ChargerType,
  DcConnectorStandard,
  DcPowerKey,
  SolarPresetKey,
} from "@/lib/roi/types";
import {
  AddOnCard,
  BarRow,
  CalcChip,
  FieldGroup,
  RangeLabels,
  ResultCard,
  SegmentedControl,
  SliderHeader,
} from "@/app/tools/_shared/calculator-ui";

export default function EvFranchiseCalculator() {
  const [chargerType, setChargerType] = useState<ChargerType>("ac");
  const [numBays, setNumBays] = useState<number>(4);
  const [acModelKey, setAcModelKey] =
    useState<AcChargerModelKey>("comm_screenless_5m");
  const [acPedestal, setAcPedestal] = useState<number>(0);
  const [acBox, setAcBox] = useState<number>(0);
  const [dcPower, setDcPower] = useState<DcPowerKey>("40wdd");
  const [dcStandard, setDcStandard] = useState<DcConnectorStandard>("EU");
  const [hasSolar, setHasSolar] = useState<boolean>(false);
  const [solarSize, setSolarSize] = useState<SolarPresetKey>("standard");
  const [solarPanelPrice, setSolarPanelPrice] = useState<number>(23625);
  const [hasStorage, setHasStorage] = useState<boolean>(false);
  const [storageSystemKwh, setStorageSystemKwh] = useState<number>(100);
  const [chargingFee, setChargingFee] = useState<number>(20);
  const [gridRate, setGridRate] = useState<number>(11.5);
  const [sessionsPerBay, setSessionsPerBay] = useState<number>(4);
  const [kwhPerSession, setKwhPerSession] = useState<number>(25);
  const [opDays, setOpDays] = useState<number>(30);
  const [installPctPct, setInstallPctPct] = useState<number>(18);

  const outputs = useMemo(
    () =>
      computeEv({
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
        installPct: installPctPct / 100,
      }),
    [
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
      installPctPct,
    ]
  );

  const y1 = outputs.annualProfit - outputs.annualMaintenance;
  const y3 =
    (outputs.annualProfit *
      Math.pow(ELEC_ESCALATOR, 2) *
      Math.pow(PANEL_DEGRADATION, 2) -
      outputs.annualMaintenance) *
    3;

  let y5net = -outputs.totalInvest;
  for (let y = 1; y <= 5; y++) {
    let c =
      outputs.annualProfit *
        Math.pow(ELEC_ESCALATOR, y - 1) *
        Math.pow(PANEL_DEGRADATION, y - 1) -
      outputs.annualMaintenance;
    if (y === BATTERY_REPLACE_YR_EV) c -= outputs.batteryReplaceCost;
    y5net += c;
  }
  const maxBar =
    Math.max(
      outputs.totalInvest,
      Math.abs(y1 * 3),
      Math.abs(y3),
      Math.abs(y5net + outputs.totalInvest),
      Math.abs(outputs.net10 + outputs.totalInvest)
    ) * 1.1;

  return (
    <main className="pt-24 pb-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <LayoutContainer>
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-accent font-orbitron">
            EV Charging Franchise ROI Calculator
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-500 dark:text-slate-400">
            Investment analysis for charging station operators — based on
            official VoltHub quoted prices
          </p>
        </header>

        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-5">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
            ⚡ Charger Configuration
          </h2>
          <p className="text-xs text-slate-400 mb-5">
            Select charger models and quantity. All prices from official
            VoltHub quotation sheets.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <FieldGroup>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Charger Type
              </Label>
              <SegmentedControl
                value={chargerType}
                options={[
                  { value: "ac", label: "AC Slow (7kW)" },
                  { value: "dc", label: "DC Fast" },
                ]}
                onChange={(v) => setChargerType(v as ChargerType)}
              />
              <p className="text-xs text-slate-400">
                AC: affordable, good for destinations. DC: fast turnover,
                higher revenue per bay.
              </p>
            </FieldGroup>

            <FieldGroup>
              <SliderHeader
                label="Number of Charging Bays"
                value={`${numBays} ${numBays === 1 ? "bay" : "bays"}`}
              />
              <Slider
                min={1}
                max={20}
                step={1}
                value={[numBays]}
                onValueChange={(v) => setNumBays(v[0] ?? 1)}
                aria-label="Number of charging bays"
              />
              <RangeLabels left="1 bay" right="20 bays" />
            </FieldGroup>
          </div>

          {chargerType === "ac" ? (
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <FieldGroup>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  AC Charger Model
                </Label>
                <Select
                  value={acModelKey}
                  onValueChange={(v) => setAcModelKey(v as AcChargerModelKey)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {acChargerModels.map((m) => (
                      <SelectItem key={m.key} value={m.key}>
                        {m.label} — {fmtPHPFull(m.price)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldGroup>
              <FieldGroup>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Add Pedestal (Stand Column)?
                </Label>
                <Select
                  value={String(acPedestal)}
                  onValueChange={(v) => setAcPedestal(Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">None</SelectItem>
                    <SelectItem value="6412.5">
                      Yes — +₱6,412.50 per unit
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
              <FieldGroup>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Add Box Protector?
                </Label>
                <Select
                  value={String(acBox)}
                  onValueChange={(v) => setAcBox(Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">None</SelectItem>
                    <SelectItem value="8775">
                      Yes — +₱8,775 per unit
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FieldGroup>
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    DC Power Level
                  </Label>
                  <Select
                    value={dcPower}
                    onValueChange={(v) => setDcPower(v as DcPowerKey)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dcChargerOptions.map((o) => (
                        <SelectItem key={o.key} value={o.key}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup>
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Connector Standard
                  </Label>
                  <Select
                    value={dcStandard}
                    onValueChange={(v) =>
                      setDcStandard(v as DcConnectorStandard)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GB">
                        GB Standard (Chinese EVs: BYD, etc.)
                      </SelectItem>
                      <SelectItem value="EU">
                        EU Standard (European EVs: CCS2)
                      </SelectItem>
                      <SelectItem value="GBEU">GB + EU Dual Gun</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>
              <p className="text-xs text-slate-400">
                Selected: {outputs.chargerLabel} — Price:{" "}
                {fmtPHPFull(getDcPrice(dcPower, dcStandard))} per unit
              </p>
            </div>
          )}
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-5">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
            ☀ Solar &amp; Storage Add-Ons
          </h2>
          <p className="text-xs text-slate-400 mb-5">
            Reduce operating cost by generating your own electricity. Click to
            toggle.
          </p>

          <AddOnCard
            enabled={hasSolar}
            onToggle={() => setHasSolar((v) => !v)}
            title="Solar Canopy System"
            costLabel={hasSolar ? `+ ${fmtPHP(outputs.solarCost)}` : ""}
          >
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <FieldGroup>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Solar Coverage{" "}
                  <span className="text-xs font-normal text-slate-400">
                    per bay
                  </span>
                </Label>
                <Select
                  value={solarSize}
                  onValueChange={(v) => setSolarSize(v as SolarPresetKey)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      Light: 4 panels/bay (~2.7 kWp) — ~₱94,500/bay
                    </SelectItem>
                    <SelectItem value="standard">
                      Standard: 6 panels/bay (~4.0 kWp) — ~₱141,750/bay
                    </SelectItem>
                    <SelectItem value="heavy">
                      Heavy: 8 panels/bay (~5.4 kWp) — ~₱189,000/bay
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-400">
                  Based on 670W panels. Includes canopy structure + mounting.
                </p>
              </FieldGroup>
              <FieldGroup>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Solar Panel Price (per 670W panel)
                </Label>
                <input
                  type="number"
                  value={solarPanelPrice}
                  step={100}
                  onChange={(e) =>
                    setSolarPanelPrice(Number(e.target.value) || 0)
                  }
                  aria-label="Solar panel price per 670 watt panel"
                  className="w-full px-3 py-2 border border-input bg-transparent rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-slate-800 dark:text-slate-100"
                />
                <p className="text-xs text-slate-400">
                  Default: ₱23,625/panel (based on PV quote sheet ~₱35/watt)
                </p>
              </FieldGroup>
            </div>
          </AddOnCard>

          <AddOnCard
            enabled={hasStorage}
            onToggle={() => setHasStorage((v) => !v)}
            title="Battery Storage System"
            costLabel={
              hasStorage ? `+ ${fmtPHP(outputs.storageCost)}` : ""
            }
          >
            <FieldGroup>
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Storage System (from VoltHub Commercial Catalog)
              </Label>
              <Select
                value={String(storageSystemKwh)}
                onValueChange={(v) => setStorageSystemKwh(Number(v))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {evStorageOptions.map((o) => (
                    <SelectItem key={o.key} value={String(o.key)}>
                      {o.label} — {fmtPHPFull(o.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-400">
                Off-grid capable. The solar PV in this system adds to the
                canopy solar above, further reducing grid dependence.
              </p>
            </FieldGroup>
          </AddOnCard>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-5">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
            💰 Operations &amp; Revenue Assumptions
          </h2>
          <p className="text-xs text-slate-400 mb-5">
            Configure how your station will operate day-to-day.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <FieldGroup>
              <SliderHeader
                label="Charging Fee"
                value={`₱${chargingFee.toFixed(1)}/kWh`}
              />
              <Slider
                min={10}
                max={35}
                step={0.5}
                value={[chargingFee]}
                onValueChange={(v) => setChargingFee(v[0] ?? 10)}
                aria-label="Charging fee per kWh"
              />
              <RangeLabels left="₱10" right="₱35/kWh" />
            </FieldGroup>
            <FieldGroup>
              <SliderHeader
                label="Electricity Cost"
                value={`₱${gridRate.toFixed(2)}/kWh`}
              />
              <Slider
                min={6}
                max={16}
                step={0.25}
                value={[gridRate]}
                onValueChange={(v) => setGridRate(v[0] ?? 6)}
                aria-label="Electricity cost per kWh"
              />
              <RangeLabels left="₱6" right="₱16/kWh" />
            </FieldGroup>
            <FieldGroup>
              <SliderHeader
                label="Daily Sessions per Bay"
                value={`${sessionsPerBay} sessions`}
              />
              <Slider
                min={1}
                max={20}
                step={1}
                value={[sessionsPerBay]}
                onValueChange={(v) => setSessionsPerBay(v[0] ?? 1)}
                aria-label="Daily sessions per bay"
              />
              <RangeLabels left="1" right="20" />
            </FieldGroup>
            <FieldGroup>
              <SliderHeader
                label="Avg kWh per Session"
                value={`${kwhPerSession} kWh`}
              />
              <Slider
                min={5}
                max={100}
                step={5}
                value={[kwhPerSession]}
                onValueChange={(v) => setKwhPerSession(v[0] ?? 5)}
                aria-label="Average kWh per session"
              />
              <RangeLabels left="5 kWh (top-up)" right="100 kWh (full)" />
            </FieldGroup>
            <FieldGroup>
              <SliderHeader
                label="Operating Days / Month"
                value={`${opDays} days`}
              />
              <Slider
                min={20}
                max={31}
                step={1}
                value={[opDays]}
                onValueChange={(v) => setOpDays(v[0] ?? 20)}
                aria-label="Operating days per month"
              />
              <RangeLabels left="20" right="31" />
            </FieldGroup>
            <FieldGroup>
              <SliderHeader
                label="Installation Cost %"
                value={`${installPctPct}%`}
              />
              <Slider
                min={10}
                max={30}
                step={1}
                value={[installPctPct]}
                onValueChange={(v) => setInstallPctPct(v[0] ?? 10)}
                aria-label="Installation cost percentage"
              />
              <RangeLabels left="10%" right="30%" />
            </FieldGroup>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-5">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-5">
            📈 Franchise Investment Analysis
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-xs uppercase text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="text-left p-2.5">Item</th>
                  <th className="text-left p-2.5">Qty</th>
                  <th className="text-left p-2.5">Unit Price</th>
                  <th className="text-left p-2.5">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {outputs.breakdown.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-slate-100 dark:border-slate-800"
                  >
                    <td className="p-2.5 text-slate-700 dark:text-slate-200">
                      {row.label}
                    </td>
                    <td className="p-2.5 text-slate-700 dark:text-slate-200">
                      {row.qty}
                    </td>
                    <td className="p-2.5 text-slate-700 dark:text-slate-200">
                      {row.unitPrice}
                    </td>
                    <td className="p-2.5 text-slate-700 dark:text-slate-200 select-text">
                      {fmtPHPFull(row.subtotal)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-300 dark:border-slate-600">
                  <td colSpan={3} className="p-2.5 font-extrabold text-base">
                    TOTAL INVESTMENT
                  </td>
                  <td className="p-2.5 font-extrabold text-base select-text">
                    {fmtPHPFull(outputs.totalInvest)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-3 gap-3.5 mt-6">
            <ResultCard
              label={
                <>
                  <CalcChip tone="match">INVESTMENT</CalcChip> Total Capital
                </>
              }
              value={fmtPHP(outputs.totalInvest)}
              sub="equipment + installation"
            />
            <ResultCard
              label="Monthly Revenue"
              value={fmtPHP(Math.round(outputs.monthlyRevenue))}
              sub={`${outputs.totalMonthlyKwh.toLocaleString()} kWh × ₱${chargingFee.toFixed(
                1
              )}`}
              valueTone="blue"
              tone="info"
            />
            <ResultCard
              label="Monthly Electricity Cost"
              value={fmtPHP(Math.round(outputs.monthlyGridCost))}
              sub={`${outputs.finalGridKwh.toLocaleString()} kWh from grid × ₱${gridRate.toFixed(
                2
              )}`}
            />
            <ResultCard
              label="Monthly Net Profit"
              value={fmtPHP(Math.round(outputs.monthlyProfit))}
              sub={`${outputs.marginPct}% profit margin`}
              valueTone="green"
            />
            <ResultCard
              label="Payback Period"
              value={
                outputs.paybackYears
                  ? `${outputs.paybackYears.toFixed(1)} years`
                  : "10+ years"
              }
              sub="years to recover investment"
              valueTone="amber"
              tone="warning"
            />
            <ResultCard
              label="10-Year Net Profit"
              value={
                outputs.net10 > 0 ? fmtPHP(Math.round(outputs.net10)) : "—"
              }
              sub="after recovering all costs"
              valueTone="green"
            />
            <ResultCard
              label="Annual IRR"
              value={`${(outputs.irr * 100).toFixed(1)}%`}
              sub="internal rate of return (10yr)"
              valueTone="green"
            />
            <ResultCard
              label="Daily Profit per Bay"
              value={fmtPHP(Math.round(outputs.dailyProfitPerBay))}
              sub="per bay, per day"
              valueTone="blue"
              tone="info"
            />
            <ResultCard
              label="Solar Offset"
              value={`${outputs.solarOffsetPct}%`}
              sub="% of electricity from solar"
              valueTone="green"
            />
          </div>

          <hr className="my-5 border-slate-200 dark:border-slate-700" />

          <div className="space-y-2">
            <BarRow
              label="Total Investment"
              value={outputs.totalInvest}
              maxBar={maxBar}
              tone="slate"
              caption="Invest"
            />
            <BarRow
              label="Year 1 Profit"
              value={y1 * 3}
              maxBar={maxBar}
              tone={y1 > 0 ? "blue" : "slate"}
              caption="Yr 1"
            />
            <BarRow
              label="Year 3 Profit"
              value={y3}
              maxBar={maxBar}
              tone="green"
              caption="Yr 3 Cum"
            />
            <BarRow
              label="Year 5 Profit"
              value={y5net + outputs.totalInvest}
              maxBar={maxBar}
              tone={outputs.net10 > 0 ? "green" : "slate"}
              caption="Yr 5 Cum"
            />
            <BarRow
              label="Year 10 Profit"
              value={outputs.net10 + outputs.totalInvest}
              maxBar={maxBar}
              tone={outputs.net10 > 0 ? "green" : "slate"}
              caption="Yr 10 Cum"
            />
          </div>
        </section>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 px-2">
          <strong className="text-slate-600 dark:text-slate-300">
            Key Assumptions:
          </strong>{" "}
          Electricity cost = Meralco commercial blended rate (default
          ₱11.50/kWh). Solar generation based on Philippine 5.0 peak sun
          hours/day with 0.5%/yr degradation. Battery round-trip efficiency
          90%. Equipment prices from official VoltHub quotation sheets.
          Installation cost configurable (default 18%). Maintenance: 2% of
          equipment/year. No feed-in tariff credited. 10-year analysis period.
          LiFePO4 battery replacement at Year 8 (@ 50% of original storage
          cost). AC chargers model: WS-CDZ-21KW (7kW). DC chargers:
          WD/WDD/DD/FD/FQ/FX series.
        </p>

        <div className="text-center mb-6">
          <Link
            href={
              {
                pathname: "/contact",
                query: {
                  interest: "ev-charging-quote",
                  subject: "quote",
                },
              } as const
            }
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-9 py-3.5 rounded-xl transition-colors"
          >
            Inquire About Franchise Partnership →
          </Link>
        </div>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          This calculator uses actual VoltHub quoted prices. Actual results
          vary by location, utilization, electricity rates, and operational
          efficiency. A site survey and detailed proposal will provide binding
          figures.
          <br />
          VoltHub Electronic Power Generation Services Corp. • admin@volthub.ph
          • 09682323704
        </p>
      </LayoutContainer>
    </main>
  );
}

