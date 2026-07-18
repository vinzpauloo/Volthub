"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  APPLIANCE_CATALOG,
  TIME_PERIODS,
  getHoursPresets,
  generateId,
} from "@/app/solutions/data/solarCalculatorData";
import type {
  ApplianceEntry,
  TimePeriod,
  ApplianceType,
} from "@/app/solutions/data/solarCalculatorData";
import {
  RiCloseLine,
  RiSubtractLine,
  RiAddLine,
} from "react-icons/ri";

export default function AddApplianceModal({
  period,
  editingEntry,
  onSave,
  onClose,
}: {
  period: TimePeriod;
  editingEntry: ApplianceEntry | null;
  onSave: (entry: ApplianceEntry) => void;
  onClose: () => void;
}) {
  const periodInfo = TIME_PERIODS.find((p) => p.key === period)!;
  const hoursPresets = getHoursPresets(periodInfo.maxHours);
  const defaultHours = periodInfo.maxHours >= 12 ? 6 : 4;

  const [step, setStep] = useState<"select" | "configure">(
    editingEntry ? "configure" : "select"
  );
  const [selectedKey, setSelectedKey] = useState<string>(
    editingEntry?.applianceKey ?? ""
  );
  const [applianceType, setApplianceType] = useState<ApplianceType>(
    editingEntry?.type ?? "standard"
  );
  const [quantity, setQuantity] = useState(editingEntry?.quantity ?? 1);
  const [hours, setHours] = useState(editingEntry?.hours ?? defaultHours);
  const [customHours, setCustomHours] = useState(
    editingEntry && !hoursPresets.includes(editingEntry.hours)
      ? editingEntry.hours
      : 0
  );
  const [useCustomHours, setUseCustomHours] = useState(
    editingEntry ? !hoursPresets.includes(editingEntry.hours) : false
  );

  const selectedCatalog = APPLIANCE_CATALOG.find(
    (c) => c.key === selectedKey
  );

  function handleSelectAppliance(key: string): void {
    setSelectedKey(key);
    setStep("configure");
  }

  function handleSave(): void {
    if (!selectedKey) return;
    const finalHours = useCustomHours ? customHours : hours;
    if (finalHours <= 0) return;
    const entry: ApplianceEntry = {
      id: editingEntry?.id ?? generateId(),
      applianceKey: selectedKey,
      type: applianceType,
      quantity,
      hours: finalHours,
      timePeriod: period,
    };
    onSave(entry);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between px-5 py-4 sticky top-0 bg-white rounded-t-2xl z-10 border-b",
            periodInfo.accentBg
          )}
        >
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = periodInfo.icon;
              return (
                <Icon className={cn("text-xl", periodInfo.accentText)} />
              );
            })()}
            <div>
              <h4 className="font-bold text-gray-900">
                {editingEntry ? "Edit Appliance" : "Add Appliance"}
              </h4>
              <p className="text-xs text-gray-500">
                {periodInfo.label} · {periodInfo.range}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <RiCloseLine className="text-lg" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Step 1: Select appliance icon */}
          {step === "select" && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600">
                Choose an appliance:
              </p>
              <div className="grid grid-cols-4 gap-3">
                {APPLIANCE_CATALOG.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelectAppliance(item.key)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-xl text-xl",
                          item.color
                        )}
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        ) : (
                          <ItemIcon />
                        )}
                      </div>
                      <span className="text-[11px] text-gray-600 text-center leading-tight font-medium">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Configure */}
          {step === "configure" && selectedCatalog && (
            <div className="space-y-5">
            {/* Change appliance wrapper */}
<div className="flex flex-col md:flex-row md:items-start justify-between gap-6  rounded-xl p-4 border border-red-200">
  
  {/* Left Column: Appliance Details */}
  <div className="flex items-center gap-3">
    {(() => {
      const CatIcon = selectedCatalog.icon;
      return (
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl text-xl shrink-0",
            selectedCatalog.color
          )}
        >
          {selectedCatalog.image ? (
            <Image
              src={selectedCatalog.image}
              alt={selectedCatalog.name}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <CatIcon />
          )}
        </div>
      );
    })()}
    <div>
      <p className="font-bold text-gray-900">
        {selectedCatalog.name}
      </p>
      <button
        type="button"
        onClick={() => setStep("select")}
        className="text-xs text-primary hover:underline"
      >
        Change appliance
      </button>
    </div>
  </div>

  {/* Right Column: Quantity on top, Appliance Type on bottom */}
  <div className="flex-1 max-w-xs space-y-4">
    
    {/* Quantity (Top) */}
    <div className="w-full space-y-2 b">
      
      <div className="flex justify-end items-center gap-3">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <RiSubtractLine />
        </button>
        <span className="text-xl font-bold text-gray-900 w-12 text-center tabular-nums">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(20, q + 1))}
          disabled={quantity >= 20}
          className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <RiAddLine />
        </button>
      </div>
    </div>

  

  </div>
</div>
             

             {/* Appliance Type Toggle (Bottom) */}
    <div className="space-y-2 ">
      <label className="text-sm font-medium text-gray-700 block">
        Appliance Type
      </label>
      <div className="flex gap-2">
        {(["standard", "inverter"] as ApplianceType[]).map((t) => {
          const watts = selectedCatalog?.defaultWatts?.[t] ?? 0;
          const isSelected = applianceType === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setApplianceType(t)}
              className={cn(
                "flex-1 rounded-xl border-2 px-4 py-3 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <span
                className={cn(
                  "text-sm font-semibold capitalize block",
                  isSelected ? "text-primary" : "text-gray-700"
                )}
              >
                {t}
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                ~{watts}W
              </span>
            </button>
          );
        })}
      </div>
    </div> 

              {/* Hours */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Hours of Use
                </label>
                <div className="flex flex-wrap gap-2">
                  {hoursPresets.map((h) => {
                    const isSelected = !useCustomHours && hours === h;
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() => {
                          setUseCustomHours(false);
                          setHours(h);
                        }}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-medium transition-all border-2",
                          isSelected
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        )}
                      >
                        {h} hrs
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      setUseCustomHours(true);
                      setCustomHours(hours);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all border-2",
                      useCustomHours
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    Custom
                  </button>
                </div>
                {useCustomHours && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      min={0.5}
                      max={periodInfo.maxHours}
                      step={0.5}
                      value={customHours}
                      onChange={(e) =>
                        setCustomHours(
                          Math.min(
                            periodInfo.maxHours,
                            Math.max(0.5, Number(e.target.value))
                          )
                        )
                      }
                      className="w-24 text-center rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                    <span className="text-sm text-gray-500">hours</span>
                  </div>
                )}
              </div>

              {/* Summary & Save */}
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">Est. daily load</span>
                <span className="text-lg font-bold text-black">
                  {(
                    (quantity *
                      (selectedCatalog?.defaultWatts?.[applianceType] ?? 0) *
                      (useCustomHours ? customHours : hours)) /
                    1000
                  ).toFixed(2)}{" "}
                  kWh
                </span>
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={
                  !selectedKey ||
                  (useCustomHours ? customHours <= 0 : hours <= 0)
                }
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editingEntry ? "Save Changes" : `Add to ${periodInfo.label}`}
              </button>

              {editingEntry && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
