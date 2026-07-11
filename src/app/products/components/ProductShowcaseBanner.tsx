"use client";

import Image from "next/image";
import Link from "next/link";
import { RiCheckLine, RiArrowRightLine } from "react-icons/ri";
import { type GroupedProduct, getGroupedProductInfo } from "./productData";

interface ProductShowcaseBannerProps {
  product: GroupedProduct;
}

export default function ProductShowcaseBanner({
  product,
}: ProductShowcaseBannerProps) {
  const {
    modelPrefix,
    lowestPower,
    installationType,
    categoryLabel,
  } = getGroupedProductInfo(product);

  // Pick the best gun-type label (prefer the "Dual Gun" variant)
  const gunType =
    product.type.find((t) => t.toLowerCase().includes("dual")) ??
    product.type[0] ??
    "";

  // Build connector compatibility string
  const connectorLabel =
    product.connector.length > 0
      ? product.connector.join(" / ") + " Compatible"
      : "Universal EVs";

  // Supply power values (sorted numerically)
  const sortedSupply = [...product.supply].sort(
    (a, b) => parseInt(a, 10) - parseInt(b, 10),
  );

  return (
    <section className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white border border-slate-200 shadow-lg">
      {/* Subtle top highlight bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-6 md:p-8 lg:p-10">
        {/* ── LEFT COLUMN — Series identity + specs ── */}
        <div className="md:col-span-4 flex flex-col justify-center space-y-4 md:space-y-5">
          {/* Series name */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h2>
            <p className="text-base md:text-lg text-primary font-medium mt-1.5">
              {categoryLabel}
            </p>
          </div>

          {/* Model badge + technical subtext */}
        
          <p className="text-slate-500 text-sm md:text-base -mt-2">
            {lowestPower} (380V 3P+N+PE)
          </p>

          {/* Feature checklist */}
          <ul className="space-y-2.5 md:space-y-3 pt-2">
            {[
              gunType,
              installationType,
              connectorLabel,
              "Public & Fleet Charging",
              "Network Ready",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <RiCheckLine className="w-3.5 h-3.5 text-primary" />
                </span>
                <span className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── CENTER COLUMN — Hero product image ── */}
        <div className="md:col-span-5 flex items-center justify-center relative min-h-[300px] md:min-h-[450px]">
          {/* Glow podium effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent rounded-t-full blur-2xl" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-2 bg-primary/15 rounded-full blur-md" />

          {/* Product image */}
          <div className="relative z-10 w-full max-w-[520px] aspect-square flex items-center justify-center">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-contain drop-shadow-xl"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-2xl bg-slate-100 border border-slate-200">
                <span className="text-slate-400 text-sm">Image not available</span>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN — Available models sidebar ── */}
        <div className="md:col-span-3 flex flex-col space-y-3">
          <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold tracking-wide uppercase">
            <span>Available Models</span>
            <RiArrowRightLine className="w-4 h-4 text-primary" />
          </div>

          <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {sortedSupply.map((power, index) => {
              const isHighlighted = index === 0;
              return (
                <div
                  key={power}
                  className={`flex-shrink-0 md:flex-shrink rounded-xl p-3 md:p-3.5 border transition-all duration-300 min-w-[130px] md:min-w-0 cursor-pointer hover:scale-105 hover:shadow-md ${
                    isHighlighted
                      ? "bg-primary/5 border-primary/30 ring-1 ring-primary/15"
                      : "bg-slate-50 border-slate-200 hover:border-primary/30 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      {modelPrefix}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${
                        isHighlighted
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      [{power.replace(/kW/i, "").trim()}]
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{power}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Learn More button — bottom right */}
      <div className="flex justify-end px-6 md:px-8 lg:px-10 pb-6 md:pb-8 lg:pb-10 -mt-2">
        <Link
          href={`/products/${product.groupBy}`}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-300 hover:gap-3"
        >
          Learn More
          <RiArrowRightLine className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
