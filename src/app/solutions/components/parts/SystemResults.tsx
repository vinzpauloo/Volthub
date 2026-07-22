"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  SYSTEM_TYPES,
  APPLIANCE_CATALOG,
  PANEL_WATTS,
  PANEL_COST,
  INVERTER_COST_PER_KW,
  BATTERY_UNIT_KWH,
  BATTERY_UNIT_COST,
  MPPT_COST_PER_KW,
  MOUNTING_COST_PER_PANEL,
  BOS_COST_PER_KW,
  MONITORING_COST,
} from "@/app/solutions/data/solarCalculatorData";
import type {
  SystemType,
  BomItem,
  ApplianceEntry,
  ProvinceInfo,
  Lifestyle,
  SolarResults,
} from "@/app/solutions/data/solarCalculatorData";
import { ResultCard } from "./ResultCard";
import {
  RiCalculatorLine,
  RiSunLine,
  RiBatteryChargeLine,
  RiPlugLine,
  RiToolsLine,
  RiArrowDownLine,
  RiSunFill,
  RiBattery2Line,
  RiFlashlightFill,
  RiSettings3Line,
  RiWifiLine,
  RiFundsLine,
  RiFlashlightLine,
  RiShieldCheckLine,
  RiCustomerService2Line,
  RiLightbulbLine,
  RiFridgeLine,
  RiWindyLine,
  RiTempColdLine,
  RiTvLine,
  RiDownloadLine,
  RiCloseLine,
  RiMailSendLine,
  RiUserLine,
  RiPhoneLine,
  RiCheckLine,
} from "react-icons/ri";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers — relatable appliance equivalents from daily kWh
// ─────────────────────────────────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const APPLIANCE_EQUIVALENTS: {
  minKwh: number;
  icon: React.ElementType;
  label: string;
}[] = [
  { minKwh: 0.3, icon: RiWifiLine, label: "WiFi router running 24/7" },
  {
    minKwh: 1.2,
    icon: RiLightbulbLine,
    label: "10 LED lights for 10 hours",
  },
  {
    minKwh: 2.2,
    icon: RiFridgeLine,
    label: "Refrigerator running all day",
  },
  {
    minKwh: 3.5,
    icon: RiWindyLine,
    label: "3 electric fans for 12 hours",
  },
  {
    minKwh: 5.5,
    icon: RiTempColdLine,
    label: "1 inverter aircon for 5 hours",
  },
  { minKwh: 8, icon: RiTvLine, label: "TV + laptop for 8 hours" },
];

function getWhatThisPowers(
  dailyKwh: number
): { icon: React.ElementType; label: string }[] {
  return APPLIANCE_EQUIVALENTS.filter((e) => dailyKwh >= e.minKwh);
}

function getBackupRuntimeText(installedBatteryKwh: number): string | null {
  if (installedBatteryKwh <= 0) return null;
  // Essential load: fridge (150W) + WiFi (10W) + 5 LED lights (50W) ≈ 210W
  // 80% depth-of-discharge for LiFePO₄ longevity
  const usableKwh = installedBatteryKwh * 0.8;
  const hours = Math.round(usableKwh / 0.21);
  if (hours < 1) return "Under 1 hour of backup for essentials";
  return `Keeps your fridge, WiFi & lights running for ~${hours} hours during a blackout`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function SystemResults({
  results,
  systemType,
  onSystemTypeChange,
  lifestyle,
  selectedProvince,
  sectionRef,
  applianceEntries,
  monthlyBill,
  monthlyKwh,
}: {
  results: SolarResults;
  systemType: SystemType;
  onSystemTypeChange: (type: SystemType) => void;
  lifestyle: Lifestyle;
  selectedProvince: ProvinceInfo;
  sectionRef: React.RefObject<HTMLElement | null>;
  applianceEntries: ApplianceEntry[];
  monthlyBill: number;
  monthlyKwh: number;
}) {
  const [bomExpanded, setBomExpanded] = useState(false);

  // Quote modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const dailyKwh = Number.parseFloat(results.dailyProduction) || 0;

  // Installed battery capacity (not just required — we size up to whole units)
  const installedBatteryKwh = useMemo(() => {
    if (systemType === "grid-tied") return 0;
    const battUnits = Math.max(
      1,
      Math.ceil(results.batteryKwh / BATTERY_UNIT_KWH)
    );
    return battUnits * BATTERY_UNIT_KWH;
  }, [results.batteryKwh, systemType]);

  const whatThisPowers = useMemo(
    () => getWhatThisPowers(dailyKwh),
    [dailyKwh]
  );

  const backupRuntimeText = useMemo(
    () => getBackupRuntimeText(installedBatteryKwh),
    [installedBatteryKwh]
  );

  const bomItems: BomItem[] = useMemo(() => {
    const systemKw = Number.parseFloat(results.systemSizeKw);
    if (systemKw <= 0) return [];

    const panelCount = Math.ceil((systemKw * 1000) / PANEL_WATTS);
    const invSize = Math.ceil(systemKw);
    const battUnits =
      systemType === "grid-tied"
        ? 0
        : Math.max(1, Math.ceil(results.batteryKwh / BATTERY_UNIT_KWH));
    const actualBatteryKwh = battUnits * BATTERY_UNIT_KWH;
    const invLabel =
      systemType === "hybrid"
        ? `${invSize}kW Hybrid`
        : systemType === "off-grid"
          ? `${invSize}kW Off-Grid`
          : `${invSize}kW Grid-Tie`;

    const items: BomItem[] = [
      {
        icon: RiSunFill,
        image: "/solor/setup/solar-panel.jpg",
        name: "Solar Panels",
        specs: `${PANEL_WATTS}W Mono PERC Half-Cut`,
        quantity: panelCount,
        unit: "panels",
        cost: panelCount * PANEL_COST,
        essential: true,
        note: `Total array: ${((panelCount * PANEL_WATTS) / 1000).toFixed(1)} kWp`,
      },
    ];

    if (systemType !== "grid-tied") {
      items.push({
        icon: RiBattery2Line,
        image: "/solor/setup/battery.png",
        name: "Battery Bank",
        specs: `48V 100Ah LiFePO₄ (${BATTERY_UNIT_KWH}kWh each)`,
        quantity: battUnits,
        unit: "units",
        cost: battUnits * BATTERY_UNIT_COST,
        essential: true,
        note: `${actualBatteryKwh}kWh installed — ${
          systemType === "off-grid"
            ? "2–3 days autonomy"
            : "evening + outage backup"
        }`,
      });
    }

    items.push(
      {
        icon: RiFlashlightFill,
        image: "/solor/setup/inverter.png",
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
        image: "/solor/setup/mppt.webp",
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
        image: "/solor/setup/mountin.jpg",
        name: "Mounting Structure",
        specs: "Aluminum rails, L-feet, clamps, splice kits",
        quantity: panelCount,
        unit: "sets",
        cost: panelCount * MOUNTING_COST_PER_PANEL,
        essential: true,
        note:
          panelCount <= 4
            ? "Pitched roof rail kit"
            : "Pitched roof + additional rail kit(s)",
      },
      {
        icon: RiPlugLine,
        image: "/solor/setup/safety.jpg",
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

  const hasResults = bomItems.length > 0;

  // ── Computed appliance data for quote (grouped by time period) ──────────
  const quoteAppliances = useMemo(() => {
    const list = applianceEntries.map((entry) => {
      const catalogItem = APPLIANCE_CATALOG.find(
        (c) => c.key === entry.applianceKey
      );
      const watts = catalogItem?.defaultWatts?.[entry.type] ?? 0;
      const dailyKwh = (entry.quantity * watts * entry.hours) / 1000;
      return {
        name: catalogItem?.name ?? entry.applianceKey,
        type: entry.type,
        quantity: entry.quantity,
        hours: entry.hours,
        watts,
        dailyKwh,
        timePeriod: entry.timePeriod,
      };
    });
    // Sort: morning → afternoon → evening
    const order: Record<string, number> = { morning: 0, afternoon: 1, evening: 2 };
    return list.sort((a, b) => (order[a.timePeriod] ?? 3) - (order[b.timePeriod] ?? 3));
  }, [applianceEntries]);

  const quoteAppliancesByPeriod = useMemo(() => {
    const groups: Record<string, typeof quoteAppliances> = {
      morning: [],
      afternoon: [],
      evening: [],
    };
    for (const a of quoteAppliances) {
      groups[a.timePeriod]?.push(a);
    }
    // Only return periods that have items
    return Object.entries(groups).filter(([, items]) => items.length > 0);
  }, [quoteAppliances]);

  const periodLabels: Record<string, string> = {
    morning: "🌅 Morning (6AM–12PM)",
    afternoon: "☀️ Afternoon (12PM–6PM)",
    evening: "🌙 Evening (6PM–12AM)",
  };

  const whatThisPowersLabels = useMemo(
    () => whatThisPowers.map((w) => w.label),
    [whatThisPowers]
  );

  // ── PDF Download ─────────────────────────────────────────────────────────
  function downloadSolarPdf() {
    const systemTypeLabel =
      SYSTEM_TYPES.find((s) => s.key === systemType)?.label ?? systemType;
    const timestamp = new Date().toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
      dateStyle: "long",
      timeStyle: "short",
    });
    const lifestyleLabels: Record<string, string> = {
      "work-from-home": "Work from Home",
      "work-from-office": "Work from Office",
      balanced: "Balanced",
    };

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>VoltHub Solar Quotation</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;padding:40px;max-width:800px;margin:0 auto}
  .header{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #f59e0b;padding-bottom:20px;margin-bottom:24px}
  .header h1{font-size:28px;color:#0f172a}.header .brand{color:#f59e0b}
  .header .badge{background:#f59e0b;color:#fff;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600}
  .meta{color:#64748b;font-size:12px;margin-bottom:20px}
  .section{margin-bottom:24px}
  .section h2{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:8px}
  .card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px}
  .card p{margin:4px 0;font-size:14px}
  .spec-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px}
  .spec-grid .label{color:#64748b;font-size:12px}
  .spec-grid .value{font-weight:600;font-size:13px}
  table{width:100%;border-collapse:collapse}
  table.bom{border:1px solid #e2e8f0;border-radius:10px;overflow:hidden}
  table.bom td{padding:8px 12px;font-size:12px;border-bottom:1px solid #e2e8f0;vertical-align:top}
  table.bom .total{background:#f0fdf4;font-weight:700}
  table.appliances{border:1px solid #e2e8f0;border-radius:10px;overflow:hidden}
  table.appliances th{background:#f8fafc;padding:6px 10px;font-size:9px;text-transform:uppercase;color:#64748b;text-align:left}
  table.appliances td{padding:6px 10px;font-size:11px;border-top:1px solid #e2e8f0}
  .total-row{background:#f0fdf4;font-size:15px;font-weight:700;padding:12px 16px;border-radius:8px;display:flex;justify-content:space-between;align-items:center}
  .footer{text-align:center;color:#94a3b8;font-size:11px;margin-top:40px;padding-top:16px;border-top:1px solid #e2e8f0}
  .pill{display:inline-block;background:#fff7ed;color:#c2410c;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:600}
  @media print{body{padding:20px}}
</style></head><body>
<div class="header">
  <div><h1>Volt<span class="brand">Hub</span></h1><p style="font-size:12px;color:#64748b">EV Charging & Energy Solutions</p></div>
  <div class="badge">☀ Solar Quotation</div>
</div>
<p class="meta">Date: ${escapeHtml(timestamp)}</p>

${quoteName ? `
<div class="section"><h2>Customer Information</h2>
  <div class="card">
    <p><strong>${escapeHtml(quoteName)}</strong></p>
    ${quoteEmail ? `<p>✉ ${escapeHtml(quoteEmail)}${quotePhone ? ` &nbsp;|&nbsp; 📞 ${escapeHtml(quotePhone)}` : ""}</p>` : ""}
    <p>📍 ${escapeHtml(selectedProvince.name)}</p>
  </div>
</div>` : ""}

<div class="section"><h2>System Overview</h2>
  <div class="card">
    <p><span class="pill">☀ ${escapeHtml(systemTypeLabel)}</span></p>
    <div class="spec-grid" style="margin-top:8px;">
      <div><span class="label">System Size:</span> <span class="value">${escapeHtml(results.systemSizeKw)} kW</span></div>
      ${installedBatteryKwh > 0 ? `<div><span class="label">Battery Bank:</span> <span class="value">${installedBatteryKwh} kWh</span></div>` : ""}
      <div><span class="label">Daily Production:</span> <span class="value">${escapeHtml(results.dailyProduction)} kWh</span></div>
      <div><span class="label">Rooftop Needed:</span> <span class="value">${results.rooftopNeeded} m²</span></div>
      <div><span class="label">Lifestyle:</span> <span class="value">${escapeHtml(lifestyleLabels[lifestyle] || lifestyle)}</span></div>
      <div><span class="label">Monthly Bill:</span> <span class="value">₱${monthlyBill.toLocaleString()}</span></div>
      <div><span class="label">Est. Monthly Consumption:</span> <span class="value">${monthlyKwh.toFixed(1)} kWh</span></div>
    </div>
  </div>
</div>

<div class="section"><h2>Bill of Materials (${bomItems.length} components)</h2>
  <table class="bom">
    ${bomItems.map((item, i) => `
    <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f8fafc'}">
      <td style="width:60%"><strong>${escapeHtml(item.name)}</strong>${!item.essential ? ' <em style="color:#94a3b8;font-size:10px;">(OPTIONAL)</em>' : ""}<br><span style="color:#64748b;font-size:10px">${escapeHtml(item.specs)}</span></td>
      <td align="center" style="color:#64748b">${typeof item.quantity === "number" ? `× ${item.quantity}` : item.quantity}</td>
      <td align="right" style="font-weight:600">${item.cost > 0 ? `₱${item.cost.toLocaleString()}` : "Included"}</td>
    </tr>`).join("")}
    <tr class="total">
      <td colspan="2" style="border-top:2px solid #e2e8f0">Estimated Total System Cost</td>
      <td align="right" style="border-top:2px solid #e2e8f0;color:#16a34a;font-size:14px">₱${bomTotalCost.toLocaleString()}</td>
    </tr>
  </table>
</div>

<div class="section"><h2>Cost & Savings</h2>
  <table style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden">
    <tr><td style="padding:8px 16px;font-size:13px;color:#64748b">Estimated System Cost</td><td align="right" style="padding:8px 16px;font-size:13px;font-weight:600">₱${bomTotalCost.toLocaleString()}</td></tr>
    <tr><td style="padding:8px 16px;font-size:13px;color:#64748b">Monthly Savings</td><td align="right" style="padding:8px 16px;font-size:13px;font-weight:600;color:#16a34a">₱${escapeHtml(results.monthlySavings)}</td></tr>
    <tr><td style="padding:8px 16px;font-size:13px;color:#64748b">Payback Period</td><td align="right" style="padding:8px 16px;font-size:13px;font-weight:600">${escapeHtml(results.paybackYears)} ${results.paybackYears === "—" ? "" : "years"}</td></tr>
  </table>
</div>

${quoteAppliances.length > 0 ? `
<div class="section"><h2>Appliance Load Profile</h2>
  ${quoteAppliancesByPeriod.map(([period, items]) => `
  <h3 style="font-size:11px;font-weight:600;color:#64748b;margin:12px 0 6px;text-transform:uppercase;">${periodLabels[period] || period}</h3>
  <table class="appliances" style="margin-bottom:8px;">
    <tr><th>Appliance</th><th>Type</th><th>Qty</th><th>Hrs/Day</th><th>Watts</th><th align="right">kWh/Day</th></tr>
    ${items.map((a) => `
    <tr><td>${escapeHtml(a.name)}</td><td>${a.type === "inverter" ? "Inverter" : "Standard"}</td><td align="center">× ${a.quantity}</td><td align="center">${a.hours}h</td><td align="center">${a.watts}W</td><td align="right">${a.dailyKwh.toFixed(2)}</td></tr>`).join("")}
    <tr style="background:#f8fafc;font-weight:600"><td colspan="5" style="padding:6px 10px;font-size:10px;color:#64748b;text-align:right">Subtotal — ${periodLabels[period] || period}:</td><td align="right" style="padding:6px 10px;font-size:11px;font-weight:700">${items.reduce((s, a) => s + a.dailyKwh, 0).toFixed(2)} kWh</td></tr>
  </table>
  `).join("")}
  <div class="card" style="margin-top:8px;text-align:right;font-weight:700;font-size:13px;">
    Total Daily Consumption: ${quoteAppliances.reduce((s, a) => s + a.dailyKwh, 0).toFixed(2)} kWh &nbsp;|&nbsp; Monthly: ${monthlyKwh.toFixed(1)} kWh &nbsp;|&nbsp; Monthly Bill: ₱${monthlyBill.toLocaleString()}
  </div>
</div>` : ""}

${whatThisPowersLabels.length > 0 ? `
<div class="section"><h2>What This System Can Power Daily</h2>
  <div class="card">
    ${whatThisPowersLabels.map((l) => `<p>⚡ ${escapeHtml(l)}</p>`).join("")}
    ${backupRuntimeText ? `<p style="color:#166534;font-weight:600;margin-top:4px">🔋 ${escapeHtml(backupRuntimeText)}</p>` : ""}
  </div>
</div>` : ""}

<div class="footer">
  <p>Generated from volthub.ph — For inquiries contact sales@volthub.ph</p>
  ${quoteEmail ? `<p>Reply to: ${escapeHtml(quoteEmail)}</p>` : ""}
</div>
<script>window.onload=function(){window.print()}</script>
</body></html>`;

    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
    }
  }

  // ── Handle Get Quote / PDF ───────────────────────────────────────────────
  function handleGetQuote() {
    setQuoteSubmitted(false);
    setQuoteError(null);
    setShowQuoteModal(true);
  }

  async function handleQuoteSubmit() {
    if (!quoteName.trim() || !quoteEmail.trim()) return;
    setQuoteSubmitting(true);
    setQuoteError(null);

    try {
      const systemTypeLabel =
        SYSTEM_TYPES.find((s) => s.key === systemType)?.label ?? systemType;

      const res = await fetch("/api/solar-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: quoteName.trim(),
          customerEmail: quoteEmail.trim(),
          customerPhone: quotePhone.trim() || undefined,
          systemType,
          systemTypeLabel,
          province: selectedProvince.name,
          lifestyle,
          monthlyBill,
          monthlyKwh,
          systemSizeKw: results.systemSizeKw,
          installedBatteryKwh,
          dailyProduction: results.dailyProduction,
          rooftopNeeded: results.rooftopNeeded,
          bomItems: bomItems.map(({ icon, image, ...rest }) => rest),
          bomTotalCost,
          monthlySavings: results.monthlySavings,
          paybackYears: results.paybackYears,
          appliances: quoteAppliances,
          whatThisPowers: whatThisPowersLabels,
          backupRuntime: backupRuntimeText,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to send" }));
        throw new Error(err.error || "Failed to send quote");
      }

      setQuoteSubmitted(true);
      downloadSolarPdf();
    } catch (err: unknown) {
      setQuoteError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setQuoteSubmitting(false);
    }
  }

  return (
    <section ref={sectionRef} className="w-full scroll-mt-24 space-y-6">
      {/* System type tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 p-1.5 flex gap-1">
        {SYSTEM_TYPES.map((st) => {
          const StIcon = st.icon;
          const isActive = systemType === st.key;
          return (
            <button
              key={st.key}
              type="button"
              onClick={() => onSystemTypeChange(st.key)}
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

      <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-8 border border-gray-100">
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

      

        {/* ── Technical Specs ── */}
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Technical Specifications
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <ResultCard
              label="System Size"
              value={`${results.systemSizeKw} kW`}
              icon={<RiSunLine />}
              variant="technical"
            />
            {systemType !== "grid-tied" ? (
              <ResultCard
                label="Battery Bank"
                value={`${installedBatteryKwh} kWh`}
                icon={<RiBatteryChargeLine />}
                variant="technical"
                subtitle={
                  backupRuntimeText ?? undefined
                }
              />
            ) : (
              <ResultCard
                label="No Battery"
                value="Grid-tied"
                icon={<RiPlugLine />}
                variant="technical"
              />
            )}
            <ResultCard
              label="Rooftop Needed"
              value={`${results.rooftopNeeded} m²`}
              variant="technical"
            />
            <ResultCard
              label="Daily Production"
              value={`${results.dailyProduction} kWh`}
              variant="technical"
            />
          </div>
        </div>

        {/* ── What This Powers ── */}
        {hasResults && whatThisPowers.length > 0 && (
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <RiLightbulbLine className="text-amber-500" />
              What Your System Can Power Daily
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {whatThisPowers.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-sm text-gray-700"
                >
                  <item.icon className="text-gray-400 shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            {backupRuntimeText && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-start gap-2.5">
                <RiBatteryChargeLine className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    Battery Backup
                  </span>
                  <p className="text-sm text-gray-600">{backupRuntimeText}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Cost & Savings Cards ── */}
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Cost &amp; Savings
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <ResultCard
              label="Estimated Cost"
              value={`₱${bomTotalCost.toLocaleString()}`}
              variant="financial"
              subtitle="All-inclusive — components, installation &amp; permits"
            />
            <ResultCard
              label="Monthly Savings"
              value={`₱${results.monthlySavings}`}
              variant="financial"
            />
            <ResultCard
              label="Payback Period"
              value={
                results.paybackYears === "—"
                  ? "—"
                  : `${results.paybackYears} years`
              }
              variant="financial"
            />
          </div>
        </div>

        {/* ── Detailed Bill of Materials (Accordion) ── */}
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
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden",
                        item.essential
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={44}
                          height={44}
                          className="h-11 w-11 object-cover"
                        />
                      ) : (
                        <ItemIcon className="text-xl" />
                      )}
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
                      <p className="text-xs text-gray-400 mt-1">{item.note}</p>
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
                      <div className="text-xs text-emerald-600 font-semibold mt-0.5">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 rounded-xl px-5 py-4 border border-emerald-200">
            <div>
              <span className="text-sm font-semibold text-gray-700">
                Estimated Total System Cost
              </span>
              <p className="text-xs text-emerald-700/70">
                All-inclusive — premium components, professional installation
                {systemType === "grid-tied"
                  ? ", &amp; grid-tie permits"
                  : ""}
              </p>
            </div>
            <span className="text-2xl font-bold text-emerald-700">
              ₱{bomTotalCost.toLocaleString()}
            </span>
          </div>
        </div>

     

       

        {/* ── CTA Buttons ── */}
        {hasResults && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleGetQuote}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-5 py-3.5 rounded-xl shadow-lg transition-all text-base group"
              >
                <RiMailSendLine className="text-lg" />
                <span>Get Quote</span>
              </button>
              <button
                type="button"
                onClick={downloadSolarPdf}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-5 py-3.5 rounded-xl border-2 border-gray-300 hover:border-gray-400 shadow-sm transition-all text-sm"
              >
                <RiDownloadLine className="text-lg" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Guarantee Badges ── */}
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 rounded-xl bg-white border border-gray-200 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <RiShieldCheckLine className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  12-Year Panel Warranty
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Mono PERC panels backed by Tier-1 manufacturer warranty.
                  Inverter covered for 5 years.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white border border-gray-200 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <RiCustomerService2Line className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Free Lifetime Support
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Remote monitoring, annual health checks, and priority
                  service—included with every installation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <p className="text-xs text-gray-400">
          * Estimates based on Philippine solar irradiance averages and{" "}
          {selectedProvince.name} location. Battery sizing is influenced by your
          selected lifestyle ({lifestyle.replace(/-/g, " ")}). Actual prices
          vary by installer and site conditions. Contact us for a detailed
          on-site assessment.
        </p>
      </div>

      {/* ── Quote Request Modal ── */}
      {showQuoteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowQuoteModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {quoteSubmitted
                    ? "Quote Ready!"
                    : "Get Your Solar Quote"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {quoteSubmitted
                    ? "Your PDF quotation has been generated."
                    : "Fill in your details to receive your personalized quotation."}
                </p>
              </div>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {!quoteSubmitted ? (
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="quote-name"
                        type="text"
                        value={quoteName}
                        onChange={(e) => setQuoteName(e.target.value)}
                        placeholder="Juan Dela Cruz"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="quote-email"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <RiMailSendLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="quote-email"
                        type="email"
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
                        placeholder="juan@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      />
                    </div>
                  </div>
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <RiPhoneLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="quote-phone"
                        type="tel"
                        value={quotePhone}
                        onChange={(e) => setQuotePhone(e.target.value)}
                        placeholder="+63 912 345 6789"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      />
                    </div>
                  </div>

                  {quoteError && (
                    <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                      {quoteError}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleQuoteSubmit}
                    disabled={
                      quoteSubmitting ||
                      !quoteName.trim() ||
                      !quoteEmail.trim()
                    }
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-xl shadow-lg transition-all text-base"
                  >
                    {quoteSubmitting ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <RiDownloadLine className="text-lg" />
                        Generate My Quote
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Success state */
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600">
                    <RiCheckLine className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">
                      Your quotation is ready!
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      The PDF should open automatically. If not, click the
                      button below.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={downloadSolarPdf}
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all text-sm"
                    >
                      <RiDownloadLine className="h-4 w-4" /> Download PDF Again
                    </button>
                    <button
                      onClick={() => setShowQuoteModal(false)}
                      className="text-sm text-gray-500 font-medium hover:underline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
