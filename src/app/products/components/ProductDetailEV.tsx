"use client";

// [BACKEND-TODO] — Restore useState when benefits accordion is re-enabled
// import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiStarLine,
  RiAwardLine,
  RiArrowRightSLine,
  RiCheckLine,
  // [BACKEND-TODO] — Restore when benefits accordion is re-enabled
  // RiArrowDownSLine,
  // RiArrowUpSLine
} from "react-icons/ri";
import { Product } from "./productData";
// [BACKEND-TODO] — Restore productDetails import when available
// import { productDetails } from "./productData";

interface ProductDetailEVProps {
  product: Product;
  // [BACKEND-TODO] — Restore when productDetails is available
  // details: typeof productDetails[string] | undefined;
  categoryLabel: string | undefined;
  displayProductName: string;
  // [BACKEND-TODO] — Restore variations when backend provides product_skus
  // selectedVariantIndex: number;
  // setSelectedVariantIndex: (index: number) => void;
  // selectableVariations: Array<{ name: string; price?: string }>;
  quantity: number;
  setQuantity: (value: number | ((prev: number) => number)) => void;
  selectedImage: string;
  setSelectedImage: (img: string) => void;
  allImages: string[];
  openImageModal: (index: number) => void;
  averageRating: number;
  totalRatings: number;
}

export default function ProductDetailEV({
  product,
  // [BACKEND-TODO] — Restore when productDetails is available
  // details,
  categoryLabel,
  displayProductName,
  // [BACKEND-TODO] — Restore variations when backend provides product_skus
  // selectedVariantIndex,
  // setSelectedVariantIndex,
  // selectableVariations,
  quantity,
  setQuantity,
  selectedImage,
  setSelectedImage,
  allImages,
  openImageModal,
  averageRating,
  totalRatings,
}: ProductDetailEVProps) {
  // [BACKEND-TODO] — Restore benefits accordion when features are available
  // const [isBenefitsExpanded, setIsBenefitsExpanded] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
      {/* ZONE A: Visual Confirmation (Left Column - 50%) */}
      <div className="lg:w-1/2 space-y-4">
        {/* Main Product Image with Hover Zoom */}
        <button
          onClick={() => openImageModal(allImages.findIndex(img => img === selectedImage))}
          className="relative aspect-square bg-white w-full rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 shadow-lg cursor-zoom-in hover:shadow-xl transition-all group"
          aria-label="Click to view larger image"
        >
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 p-4 md:p-6 lg:p-8 group-hover:scale-105"
            priority
          />
          {allImages.length > 1 && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-md">
              {allImages.findIndex(img => img === selectedImage) + 1} / {allImages.length}
            </div>
          )}
          {/* Zoom hint overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
            <span className="text-sm text-slate-600 bg-white/90 px-4 py-2 rounded-full font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Click to enlarge
            </span>
          </div>
        </button>

        {/* Thumbnail Gallery */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {allImages.map((img, index) => {
              const isSelected = selectedImage === img;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all bg-white shadow-sm ${
                    isSelected
                      ? "border-primary ring-2 ring-primary/20 scale-105 shadow-md"
                      : "border-slate-200 hover:border-slate-300 hover:scale-105"
                  }`}
                  aria-label={`Select image ${index + 1} of ${allImages.length}`}
                  aria-pressed={isSelected}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-contain p-1.5"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ZONE B: The "Buy Box" (Right Column - 50%) */}
      <div className="lg:w-1/2">
        <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 border border-slate-200 shadow-sm sticky top-24 space-y-3 md:space-y-4">
          {/* 1. Identity - Product Name (H1) */}
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-wider text-primary font-semibold">
              {categoryLabel}
            </span>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mt-1 mb-1">
              {displayProductName}
            </h1>
            {/* [BACKEND-TODO] — Restore subtitle when backend provides it */}
            {/* <p className="text-sm md:text-base text-slate-600">{product.subtitle}</p> */}
            {product.sku_code && (
              <p className="text-xs text-slate-500 mt-1">SKU: {product.sku_code}</p>
            )}
          </div>

          {/* 2. Social Proof - Ratings */}
          <div className="flex items-center gap-2 pt-1.5 border-t border-slate-200">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <RiStarLine
                  key={star}
                  className={`h-3.5 w-3.5 md:h-4 md:w-4 ${
                    star <= Math.floor(averageRating)
                      ? "text-blue-800 fill-current"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs md:text-sm font-semibold text-slate-900">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-[10px] md:text-xs text-slate-500">
              ({totalRatings.toLocaleString()} ratings)
            </span>
          </div>

          {/* [BACKEND-TODO] — Restore Key Benefits when backend provides features */}
          {/* 3. Value Proposition - Key Benefits */}
          {/*
          <div className="pt-1.5 border-t border-slate-200">
            {details && details.features && details.features.length > 0 && (
              ...
            )}
          </div>
          */}

          {/* [BACKEND-TODO] — Restore Variations when backend provides product_skus */}
          {/* 4. Customization - Variations */}
          {/*
          {selectableVariations.length > 0 && (
            ...
          )}
          */}

          {/* [BACKEND-TODO] — Restore tag badge when tag field is re-added */}
          {/* System Type Tag */}
          {/*
          {product.tag && (
            ...
          )}
          */}
          {product.price && (
            <div className="pt-1.5 border-t border-slate-200">
              <span className="text-xl md:text-2xl font-bold text-primary">{product.price}</span>
            </div>
          )}

          {/* 5. Volume - Quantity */}
          <div className="pt-1.5 border-t border-slate-200">
            <label className="block text-xs md:text-sm font-semibold text-slate-900 mb-1.5">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 border-slate-300 hover:border-primary hover:bg-primary/5 text-slate-700 hover:text-primary transition-all font-bold text-base md:text-lg"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setQuantity(Math.max(1, value));
                }}
                className="w-16 md:w-20 h-8 md:h-10 text-center text-sm md:text-base font-semibold border-2 border-slate-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 border-slate-300 hover:border-primary hover:bg-primary/5 text-slate-700 hover:text-primary transition-all font-bold text-base md:text-lg"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* 6. Action - CTAs */}
          <div className="pt-1.5 border-t border-slate-200">
            {/* Primary CTA - Get Quote (Most Dominant) */}
            <Link
              href={`/contact?subject=quote&product=${encodeURIComponent(product.category)}&productName=${encodeURIComponent(displayProductName)}&quantity=${quantity}`}
              className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2.5 md:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base group"
            >
              <span>Get Quote</span>
              <RiArrowRightSLine className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 7. Reassurance - Logistics & Trust */}
          <div className="pt-1.5 border-t border-slate-200 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <div className="flex items-center gap-1 text-[10px] md:text-xs text-slate-600">
                <RiAwardLine className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary flex-shrink-0" />
                <span>Certified Quality</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] md:text-xs text-slate-600">
                <RiCheckLine className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary flex-shrink-0" />
                <span>500+ Installations</span>
              </div>
            </div>
            <div className="text-[10px] md:text-xs text-slate-500 space-y-0.5">
              <p>✓ Free consultation and site assessment</p>
              <p>✓ 24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

