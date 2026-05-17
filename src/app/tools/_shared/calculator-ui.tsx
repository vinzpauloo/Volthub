"use client";

import { Label } from "@/components/ui/label";
import { fmtPHP } from "@/lib/roi/formulas";
import { cn } from "@/lib/utils";

export type ResultTone = "default" | "green" | "amber" | "blue";
export type ResultBg = "default" | "warning" | "info";
export type BarTone = "green" | "slate" | "amber" | "blue";
export type BadgeTone = "match" | "muted" | "blue";

export function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function SliderHeader({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-baseline">
      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </Label>
      <span className="text-xs text-slate-500 dark:text-slate-400 select-text">
        {value}
      </span>
    </div>
  );
}

export function RangeLabels({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex justify-between text-[11px] text-slate-400">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

export function SegmentedControl({
  value,
  options,
  onChange,
  className,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden",
        className
      )}
      role="radiogroup"
    >
      {options.map((opt, i) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 px-4 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800",
              i !== options.length - 1 &&
                "border-r border-slate-200 dark:border-slate-700"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function ResultCard({
  label,
  value,
  sub,
  valueTone = "default",
  tone = "default",
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  sub?: React.ReactNode;
  valueTone?: ResultTone;
  tone?: ResultBg;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5",
        tone === "warning" &&
          "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900",
        tone === "info" &&
          "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900",
        tone === "default" &&
          "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900"
      )}
    >
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
        {label}
      </div>
      <div
        className={cn(
          "text-2xl md:text-[26px] font-extrabold select-text",
          valueTone === "green" && "text-primary dark:text-accent",
          valueTone === "amber" && "text-amber-600 dark:text-amber-400",
          valueTone === "blue" && "text-blue-700 dark:text-blue-400",
          valueTone === "default" && "text-slate-900 dark:text-slate-100"
        )}
      >
        {value}
      </div>
      {sub ? (
        <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 select-text">
          {sub}
        </div>
      ) : null}
    </div>
  );
}

export function CalcChip({
  tone,
  children,
}: {
  tone: BadgeTone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 rounded text-[11px] font-bold",
        tone === "match" &&
          "bg-green-100 text-primary dark:bg-green-900/40 dark:text-accent",
        tone === "blue" &&
          "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
        tone === "muted" &&
          "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
      )}
    >
      {children}
    </span>
  );
}

export function BarRow({
  label,
  value,
  maxBar,
  tone,
  caption,
}: {
  label: string;
  value: number;
  maxBar: number;
  tone: BarTone;
  caption: string;
}) {
  const pct = Math.min(100, (Math.abs(value) / maxBar) * 100);
  const colorClass =
    tone === "green"
      ? "bg-primary"
      : tone === "amber"
      ? "bg-amber-500"
      : tone === "blue"
      ? "bg-blue-600"
      : "bg-slate-400";
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 md:w-32 text-xs font-semibold text-slate-600 dark:text-slate-300 text-right shrink-0">
        {label}
      </div>
      <div className="flex-1 h-7 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden">
        <div
          className={cn(
            "h-full rounded-md transition-[width] duration-300 ease-out flex items-center pl-2.5 text-xs font-bold text-white whitespace-nowrap select-text",
            colorClass
          )}
          style={{ width: `${pct}%` }}
        >
          {caption}: {fmtPHP(Math.round(Math.abs(value)))}
        </div>
      </div>
    </div>
  );
}

export function AddOnCard({
  enabled,
  onToggle,
  title,
  costLabel,
  children,
}: {
  enabled: boolean;
  onToggle: () => void;
  title: string;
  costLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-xl p-5 mb-4 transition-colors",
        enabled
          ? "border-primary bg-green-50 dark:bg-green-950/30"
          : "border-slate-200 dark:border-slate-700"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={enabled}
        className="flex items-center gap-3 w-full text-left cursor-pointer"
      >
        <span
          className={cn(
            "w-5 h-5 border-2 rounded flex items-center justify-center shrink-0 transition-colors",
            enabled
              ? "bg-primary border-primary text-white"
              : "border-slate-300 dark:border-slate-600"
          )}
          aria-hidden
        >
          {enabled ? <span className="text-[13px] font-bold">✓</span> : null}
        </span>
        <span className="text-base font-bold text-slate-800 dark:text-slate-100">
          {title}
        </span>
        <span className="ml-auto text-sm text-slate-500 dark:text-slate-400 select-text">
          {costLabel}
        </span>
      </button>
      {enabled ? (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          {children}
        </div>
      ) : null}
    </div>
  );
}
