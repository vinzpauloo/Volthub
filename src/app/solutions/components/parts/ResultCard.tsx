import { cn } from "@/lib/utils";

export type ResultCardVariant = "technical" | "financial" | "hero";

export function ResultCard({
  label,
  value,
  highlight,
  variant,
  icon,
  subtitle,
}: {
  label: string;
  value: string;
  /** @deprecated Use variant="financial" instead */
  highlight?: boolean;
  variant?: ResultCardVariant;
  icon?: React.ReactNode;
  subtitle?: string;
}) {
  const resolved: ResultCardVariant =
    variant ?? (highlight ? "financial" : "technical");

  return (
    <div
      className={cn(
        "rounded-xl p-4 text-center transition-colors",
        resolved === "hero" &&
          "bg-emerald-50 border border-emerald-200 p-5",
        resolved === "financial" &&
          "bg-emerald-50/70 border border-emerald-200/70",
        resolved === "technical" &&
          "bg-white border border-gray-100"
      )}
    >
      {icon && (
        <div className="flex justify-center mb-1.5 text-gray-400">{icon}</div>
      )}
      <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p
        className={cn(
          "font-extrabold",
          resolved === "hero" && "text-2xl text-emerald-700",
          resolved === "financial" && "text-xl text-emerald-700",
          resolved === "technical" && "text-lg text-gray-900"
        )}
      >
        {value}
      </p>
      {subtitle && (
        <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
          {subtitle}
        </p>
      )}
    </div>
  );
}
