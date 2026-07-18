"use client";

import { cn } from "@/lib/utils";
import { LIFESTYLE_OPTIONS } from "@/app/solutions/data/solarCalculatorData";
import type { Lifestyle } from "@/app/solutions/data/solarCalculatorData";
import { RiNumber1 } from "react-icons/ri";

export default function LifestyleModifier({
  lifestyle,
  setLifestyle,
}: {
  lifestyle: Lifestyle;
  setLifestyle: (v: Lifestyle) => void;
}) {
  return (
    <section className=" w-full space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
          <RiNumber1 className="text-primary text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Lifestyle Modifier
          </h3>
          <p className="text-sm text-gray-500">
            Your daily routine determines how solar energy should be sized and
            stored.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LIFESTYLE_OPTIONS.map((option) => {
          const isSelected = lifestyle === option.key;
          const Icon = option.icon;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => setLifestyle(option.key as Lifestyle)}
              className={cn(
                "relative rounded-2xl border-2 p-6 text-left transition-all duration-200",
                "hover:shadow-lg hover:-translate-y-0.5",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/30"
                  : "border-gray-200 bg-white"
              )}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  ✓
                </span>
              )}
              <div className="flex items-center gap-2">
                <Icon
                  className={cn(
                    "text-3xl mb-3",
                    isSelected ? "text-primary" : "text-gray-400"
                  )}
                />
                <h4 className="text-base font-bold text-gray-900 mb-1.5">
                  {option.title}
                </h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
