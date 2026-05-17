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
  commercialSystems,
  residentialSystems,
} from "@/lib/roi/catalogs";
import { computeSolar, fmtPHP, fmtPHPFull } from "@/lib/roi/formulas";
import type {
  CustomerType,
  OutageFrequency,
  SelectionMode,
  SolarSystem,
  SpacePreset,
} from "@/lib/roi/types";
import {
  BarRow,
  CalcChip,
  FieldGroup,
  RangeLabels,
  ResultCard,
  SegmentedControl,
  SliderHeader,
} from "@/app/tools/_shared/calculator-ui";
import { cn } from "@/lib/utils";

type CustomerRange = {
  billMin: number;
  billMax: number;
  billDefault: number;
  rateMin: number;
  rateMax: number;
  rateDefault: number;
};

const CUSTOMER_RANGES: Record<CustomerType, CustomerRange> = {
  residential: {
    billMin: 3000,
    billMax: 50000,
    billDefault: 8000,
    rateMin: 8,
    rateMax: 15,
    rateDefault: 11.5,
  },
  commercial: {
    billMin: 5000,
    billMax: 2_000_000,
    billDefault: 150_000,
    rateMin: 6,
    rateMax: 16,
    rateDefault: 11.5,
  },
  industrial: {
    billMin: 50_000,
    billMax: 2_000_000,
    billDefault: 300_000,
    rateMin: 5,
    rateMax: 14,
    rateDefault: 8.5,
  },
};

export default function SolarStorageCalculator() {
  const [customerType, setCustomerType] = useState<CustomerType>("commercial");
  const [monthlyBill, setMonthlyBill] = useState<number>(
    CUSTOMER_RANGES.commercial.billDefault
  );
  const [rate, setRate] = useState<number>(CUSTOMER_RANGES.commercial.rateDefault);
  const [daytimePct, setDaytimePct] = useState<number>(0.6);
  const [spacePreset, setSpacePreset] = useState<SpacePreset>("medium");
  const [outageFreq, setOutageFreq] = useState<OutageFrequency>("occasional");
  const [backupHours, setBackupHours] = useState<number>(4);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>("auto");
  const [selectedProduct, setSelectedProduct] = useState<SolarSystem | null>(
    null
  );
  const [catalogTab, setCatalogTab] = useState<"commercial" | "residential">(
    "commercial"
  );

  const range = CUSTOMER_RANGES[customerType];

  const onCustomerChange = (next: CustomerType) => {
    const r = CUSTOMER_RANGES[next];
    setCustomerType(next);
    setMonthlyBill(r.billDefault);
    setRate(r.rateDefault);
    setSelectedProduct(null);
    setSelectionMode("auto");
    setCatalogTab(next === "residential" ? "residential" : "commercial");
  };

  const outputs = useMemo(
    () =>
      computeSolar({
        customerType,
        monthlyBill,
        rate,
        daytimePct,
        spacePreset,
        outageFreq,
        backupHours,
        selectionMode,
        selectedProduct,
      }),
    [
      customerType,
      monthlyBill,
      rate,
      daytimePct,
      spacePreset,
      outageFreq,
      backupHours,
      selectionMode,
      selectedProduct,
    ]
  );

  const cs3 = outputs.cumSavings(3);
  const cs7 = outputs.cumSavings(7);
  const cs25 = outputs.savings25;
  const maxBar = Math.max(outputs.totalInvestment, cs3, cs7, cs25) * 1.05;

  return (
    <main className="pt-24 pb-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <LayoutContainer>
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-accent font-orbitron">
            Solar + Storage ROI Calculator
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-500 dark:text-slate-400">
            Investment analysis based on official VoltHub quoted prices
          </p>
        </header>

        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-5">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-5">
            ⚙ Your Energy Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <FieldGroup>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Customer Type
                </Label>
                <SegmentedControl
                  value={customerType}
                  options={[
                    { value: "residential", label: "Residential" },
                    { value: "commercial", label: "Commercial" },
                    { value: "industrial", label: "Industrial" },
                  ]}
                  onChange={(v) => onCustomerChange(v as CustomerType)}
                />
              </FieldGroup>

              <FieldGroup>
                <SliderHeader
                  label="Average Monthly Bill"
                  value={fmtPHPFull(monthlyBill)}
                />
                <Slider
                  min={range.billMin}
                  max={range.billMax}
                  step={1000}
                  value={[monthlyBill]}
                  onValueChange={(v) => setMonthlyBill(v[0] ?? range.billMin)}
                  aria-label="Average monthly electricity bill"
                />
                <RangeLabels
                  left={fmtPHP(range.billMin)}
                  right={fmtPHP(range.billMax)}
                />
              </FieldGroup>

              <FieldGroup>
                <SliderHeader
                  label="Electricity Rate"
                  value={`₱${rate.toFixed(2)}/kWh`}
                />
                <Slider
                  min={range.rateMin}
                  max={range.rateMax}
                  step={0.25}
                  value={[rate]}
                  onValueChange={(v) => setRate(v[0] ?? range.rateMin)}
                  aria-label="Electricity rate per kWh"
                />
                <RangeLabels
                  left={`₱${range.rateMin}`}
                  right={`₱${range.rateMax}/kWh`}
                />
              </FieldGroup>

              <FieldGroup>
                <SliderHeader
                  label="Daytime Energy Usage"
                  value={`${Math.round(daytimePct * 100)}%`}
                />
                <Slider
                  min={20}
                  max={100}
                  step={5}
                  value={[daytimePct * 100]}
                  onValueChange={(v) => setDaytimePct((v[0] ?? 60) / 100)}
                  aria-label="Percentage of energy used during daytime"
                />
                <RangeLabels
                  left="20% (mostly night)"
                  right="100% (24hr ops)"
                />
              </FieldGroup>
            </div>

            <div className="space-y-5">
              <FieldGroup>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Available Roof / Land Area
                </Label>
                <Select
                  value={spacePreset}
                  onValueChange={(v) => setSpacePreset(v as SpacePreset)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (50–150 m²)</SelectItem>
                    <SelectItem value="medium">Medium (150–500 m²)</SelectItem>
                    <SelectItem value="large">
                      Large (500+ m² or ground-mount)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Grid Outage Frequency
                </Label>
                <Select
                  value={outageFreq}
                  onValueChange={(v) => setOutageFreq(v as OutageFrequency)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rare">Rare (&lt;1 per month)</SelectItem>
                    <SelectItem value="occasional">
                      Occasional (2–4 per month)
                    </SelectItem>
                    <SelectItem value="frequent">
                      Frequent (weekly+)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup>
                <SliderHeader
                  label="Backup Power Need"
                  value={`${backupHours} ${
                    backupHours === 1 ? "hour" : "hours"
                  }`}
                />
                <Slider
                  min={0}
                  max={24}
                  step={1}
                  value={[backupHours]}
                  onValueChange={(v) => setBackupHours(v[0] ?? 0)}
                  aria-label="Backup power need in hours"
                />
                <RangeLabels left="0 hrs" right="24 hrs" />
              </FieldGroup>

              <FieldGroup>
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  System Selection Mode
                </Label>
                <Select
                  value={selectionMode}
                  onValueChange={(v) => {
                    setSelectionMode(v as SelectionMode);
                    if (v === "auto") setSelectedProduct(null);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">
                      Auto-Recommend (based on your bill)
                    </SelectItem>
                    <SelectItem value="manual">
                      Manual Select (pick from catalog)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
            </div>
          </div>
        </section>

        {selectionMode === "manual" && (
          <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-5">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-5">
              📚 VoltHub Product Catalog — Select a System
            </h2>
            <SegmentedControl
              className="mb-4 max-w-md"
              value={catalogTab}
              options={[
                { value: "commercial", label: "Commercial Off-Grid" },
                { value: "residential", label: "Residential Solar PV" },
              ]}
              onChange={(v) =>
                setCatalogTab(v as "commercial" | "residential")
              }
            />
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800 text-xs uppercase text-slate-600 dark:text-slate-300 sticky top-0">
                  <tr>
                    <th className="text-left p-2.5 w-8"></th>
                    <th className="text-left p-2.5">System</th>
                    <th className="text-left p-2.5">Battery</th>
                    <th className="text-left p-2.5">PV Array</th>
                    <th className="text-left p-2.5">
                      {catalogTab === "commercial" ? "Rated Power" : "Charger"}
                    </th>
                    <th className="text-left p-2.5">Price (PHP)</th>
                  </tr>
                </thead>
                <tbody>
                  {(catalogTab === "commercial"
                    ? commercialSystems
                    : residentialSystems
                  ).map((p) => {
                    const selected = selectedProduct?.name === p.name;
                    return (
                      <tr
                        key={p.name}
                        className={cn(
                          "cursor-pointer border-t border-slate-100 dark:border-slate-800 hover:bg-accent/10 transition-colors",
                          selected &&
                            "bg-accent/20 font-bold text-primary dark:text-accent"
                        )}
                        onClick={() => setSelectedProduct(p)}
                      >
                        <td className="p-2.5">
                          <input
                            type="radio"
                            checked={selected}
                            readOnly
                            aria-label={`Select ${p.name}`}
                          />
                        </td>
                        <td className="p-2.5">{p.name}</td>
                        <td className="p-2.5">{p.battKwh} kWh</td>
                        <td className="p-2.5">
                          {p.pvPanels} ({p.pvKw} kWp)
                        </td>
                        <td className="p-2.5">
                          {"ratedKw" in p
                            ? `${p.ratedKw} kW`
                            : (p as { charger: string }).charger}
                        </td>
                        <td className="p-2.5">{fmtPHPFull(p.price)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Click a row to select. Price shown is equipment only.
              Installation: +15–20% (included in ROI calculation).
            </p>
          </section>
        )}

        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-5">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-5">
            📈 Investment Analysis
          </h2>

          <div className="grid md:grid-cols-2 gap-3.5">
            <ResultCard
              label="Est. Monthly Consumption"
              value={`${Math.round(outputs.monthlyKwh).toLocaleString()} kWh`}
              sub="based on your bill ÷ rate"
            />
            <ResultCard
              label={
                <>
                  <CalcChip tone={outputs.isManual ? "muted" : "match"}>
                    {outputs.isManual ? "MANUAL SELECT" : "RECOMMENDED"}
                  </CalcChip>{" "}
                  System
                </>
              }
              value={outputs.product.name + " Off-Grid System"}
              sub={[
                `${outputs.product.battKwh} kWh LiFePO4 battery`,
                `${outputs.product.pvPanels} (${outputs.product.pvKw} kWp PV)`,
                "ratedKw" in outputs.product
                  ? `${outputs.product.ratedKw} kW inverter`
                  : (outputs.product as { charger: string }).charger + " charger",
              ].join(" · ")}
              valueTone="green"
            />
            <ResultCard
              label="System Price (VoltHub Quote)"
              value={fmtPHPFull(outputs.equipPrice)}
              sub="Official VoltHub quotation price (equipment)"
            />
            <ResultCard
              label="Total Investment (equip + install)"
              value={fmtPHPFull(outputs.totalInvestment)}
              sub="including estimated installation"
            />
            <ResultCard
              label="Estimated Annual Savings"
              value={fmtPHP(Math.round(outputs.annualSavings))}
              sub={`~${outputs.savingsPct}% of your annual electricity bill`}
              valueTone="green"
            />
            <ResultCard
              label="Payback Period"
              value={
                outputs.paybackYears
                  ? `${outputs.paybackYears.toFixed(1)} years`
                  : "25+ years"
              }
              sub="years to recover total investment"
              valueTone="amber"
              tone="warning"
            />
          </div>

          <div className="mt-6 space-y-2">
            <BarRow
              label="System Cost"
              value={outputs.totalInvestment}
              maxBar={maxBar}
              tone="slate"
              caption="Invest"
            />
            <BarRow
              label="Year 3 Savings"
              value={cs3}
              maxBar={maxBar}
              tone={cs3 > outputs.totalInvestment ? "green" : "amber"}
              caption="Yr 3"
            />
            <BarRow
              label="Year 7 Savings"
              value={cs7}
              maxBar={maxBar}
              tone="green"
              caption="Yr 7"
            />
            <BarRow
              label="Year 25 Savings"
              value={cs25}
              maxBar={maxBar}
              tone="green"
              caption="Yr 25"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3.5 mt-6">
            <ResultCard
              label="25-Year Net Savings"
              value={outputs.net25 > 0 ? fmtPHP(Math.round(outputs.net25)) : "—"}
              sub="cumulative savings minus all costs"
              valueTone="green"
            />
            <ResultCard
              label="IRR (25 Years)"
              value={`${(outputs.irr * 100).toFixed(1)}%`}
              sub="internal rate of return"
              valueTone="green"
            />
            <ResultCard
              label="Annual CO₂ Reduction"
              value={`${outputs.co2PerYear.toLocaleString()} tCO₂/yr`}
              sub="metric tons / year"
              valueTone="green"
            />
            <ResultCard
              label="Bill Reduction"
              value={`${outputs.savingsPct}%`}
              sub="% of annual electricity spend"
              valueTone="green"
            />
          </div>
        </section>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 px-2">
          <strong className="text-slate-600 dark:text-slate-300">
            Key Assumptions:
          </strong>{" "}
          Philippine solar irradiation ~5.0 peak sun hours/day. Electricity
          price escalator: 3%/year (Meralco historical avg). Solar panel
          degradation: 0.5%/year. LiFePO4 battery replacement at Year 12 (cost:
          ~18% of initial equipment). Installation cost: 15–20% of equipment
          (varies by site). Maintenance: 0.5% of system cost/year. No net
          metering / feed-in tariff credited (conservative estimate). All system
          prices are from official VoltHub quotation sheets.
        </p>

        <div className="text-center mb-6">
          <Link
            href={
              {
                pathname: "/contact",
                query: {
                  interest: "solar-installation-quote",
                  subject: "quote",
                },
              } as const
            }
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-9 py-3.5 rounded-xl transition-colors"
          >
            Get a Free Site Survey &amp; Custom Quote →
          </Link>
        </div>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          This calculator uses actual VoltHub quoted prices and
          Philippine-specific assumptions. Actual savings vary by location, roof
          orientation, shading, and consumption patterns. A site survey is
          required for a binding quotation.
          <br />
          VoltHub Electronic Power Generation Services Corp. • admin@volthub.ph
          • 09682323704
        </p>
      </LayoutContainer>
    </main>
  );
}

