"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  RiArrowLeftLine, 
  RiCheckLine,
  RiFlashlightLine,
  RiPlugLine,
  RiSettings3Line,
  RiMapPinLine,
  RiBatteryChargeLine,
  RiFileList3Line,
  RiHeartLine,
  RiHeartFill,
  RiChat3Line,
  RiThumbUpLine,
  RiStarLine,
  RiRulerLine,
  RiSunLine
} from "react-icons/ri";
import { Product, categories, productDetails } from "./productData";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const details = productDetails[product.id];
  const categoryLabel = categories.find((c) => c.id === product.category)?.label;
  const isEVProduct = product.category === "ev-charging";
  const isSmartHomeProduct = product.category === "smart-home";
  const isCabinetProduct = product.category === "cabinet";
  const isContainerProduct = product.category === "container";
  
  // Get all images (main image + additional images)
  const allImages = useMemo(() => 
    product.images && product.images.length > 0 
      ? product.images 
      : [product.image],
    [product.images, product.image]
  );
  const [selectedImage, setSelectedImage] = useState(allImages[0]);
  const [activeTab, setActiveTab] = useState<"stats" | "comments" | "projects">("stats");

  // Variant-based pricing (for products that define prices on variations)
  const pricedVariations =
    details?.variations?.filter(
      (v) => typeof v.price === "string" && 
      (!v.name.toLowerCase().includes("model") || 
       v.name.toLowerCase().includes("f2-") ||
       v.name.toLowerCase().includes("lvq2-") ||
       v.name.toLowerCase().includes("lvxc-"))
    ) ?? [];
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant =
    pricedVariations.length > 0 ? pricedVariations[selectedVariantIndex] : undefined;
  const currentPrice =
    pricedVariations.length > 0
      ? pricedVariations[selectedVariantIndex]?.price ?? product.price
      : product.price;
  const descriptionText =
    selectedVariant?.description ?? details?.description;
  
  // Update image when variant changes
  useEffect(() => {
    if (selectedVariant?.image) {
      setSelectedImage(selectedVariant.image);
    } else {
      // Reset to first image if variant doesn't have a specific image
      setSelectedImage(allImages[0]);
    }
  }, [selectedVariant, allImages]);
  
  // Parse variant info from description (e.g., "LED: 50W | Size: 1319×460×60mm | Battery: 12.8V 45Ah | Solar Panel: 100W | Pole Height: 8m")
  const parseVariantInfo = (desc?: string) => {
    if (!desc) return { led: null, size: null, battery: null, solar: null };
    
    const ledMatch = desc.match(/LED:\s*(\d+W)/i);
    const sizeMatch = desc.match(/Size:\s*([^|]+)/i);
    const batteryMatch = desc.match(/Battery:\s*([\d.]+V)/i); // Extract voltage only (e.g., 12.8V)
    const solarMatch = desc.match(/Solar Panel:\s*(\d+W)/i);
    
    return {
      led: ledMatch ? ledMatch[1] : null,
      size: sizeMatch ? sizeMatch[1].trim() : null,
      battery: batteryMatch ? batteryMatch[1] : null,
      solar: solarMatch ? solarMatch[1] : null,
    };
  };
  
  const variantInfo = parseVariantInfo(selectedVariant?.description);
  
  // Interactive stats state
  const [likes, setLikes] = useState(1234);
  const [isLiked, setIsLiked] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [averageRating, setAverageRating] = useState(4.8);
  const [totalRatings, setTotalRatings] = useState(856);
  const [positiveReviews, setPositiveReviews] = useState(856);

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors"
      >
        <RiArrowLeftLine className="h-4 w-4" />
        <span>Back to Products</span>
      </Link>

      {/* Top Section - Row 1: Image and Image Selector */}
      <div className="space-y-4">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-contain transition-opacity duration-300"
            priority
          />
        </div>

        {/* Image Selection List */}
        {allImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === img
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        )}
        
        {/* Variant Info Section - LED, Size, Battery, Solar Panel */}
        {(variantInfo.led || variantInfo.size || variantInfo.battery || variantInfo.solar) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {variantInfo.led && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <RiFlashlightLine className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">LED</div>
                  <div className="text-sm font-semibold text-slate-900">{variantInfo.led}</div>
                </div>
              </div>
            )}
            {variantInfo.size && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <RiRulerLine className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Size</div>
                  <div className="text-sm font-semibold text-slate-900">{variantInfo.size}</div>
                </div>
              </div>
            )}
            {variantInfo.battery && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <RiBatteryChargeLine className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Battery</div>
                  <div className="text-sm font-semibold text-slate-900">{variantInfo.battery}</div>
                </div>
              </div>
            )}
            {variantInfo.solar && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <RiSunLine className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Solar Panel</div>
                  <div className="text-sm font-semibold text-slate-900">{variantInfo.solar}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Top Section - Row 2: Description and Variations */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Info & Description */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-primary font-semibold">
              {categoryLabel}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              {product.name}
            </h1>
            <p className="text-lg text-slate-600 mt-3">{product.subtitle}</p>

            {/* Variant selector buttons (e.g. 60k / 120k / 400k or F2-050 / F2-080) */}
            {pricedVariations.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {pricedVariations.map((variant, idx) => {
                  // Extract label: F2-050, F2-080, LVQ2-080, LVXC-120, etc. or 40kWh, 60kWh, etc.
                  let label = variant.name;
                  const f2Match = variant.name.match(/(F2-\d+)/i);
                  const lvq2Match = variant.name.match(/(LVQ2-\d+)/i);
                  const lvxcMatch = variant.name.match(/(LVXC-\d+)/i);
                  const kWhMatch = variant.name.match(/(\d+\s*kWh)/i);
                  const kwMatch = variant.name.match(/(\d+\s*kW?)/i);
                  
                  if (f2Match) {
                    label = f2Match[1].toUpperCase();
                  } else if (lvq2Match) {
                    label = lvq2Match[1].toUpperCase();
                  } else if (lvxcMatch) {
                    label = lvxcMatch[1].toUpperCase();
                  } else if (kWhMatch) {
                    // Match kWh first (e.g., "40kWh")
                    label = kWhMatch[1];
                  } else if (kwMatch) {
                    // Fallback to kW or k (e.g., "60kW" or "60k")
                    label = kwMatch[1];
                  } else {
                    // Fallback: use first part of name or clean it up
                    label = variant.name.split("–")[0]?.trim() || variant.name;
                  }
                  
                  const isActive = idx === selectedVariantIndex;
                  return (
                    <button
                      key={variant.name}
                      type="button"
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold border shadow-sm transition-all ${
                        isActive
                          ? "bg-primary text-white border-primary shadow-md scale-[1.03]"
                          : "bg-white text-slate-700 border-slate-200 hover:border-primary/60 hover:bg-primary/5"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
          {product.tag && (
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-semibold">
                {product.tag}
              </span>
            )}
            {currentPrice && (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-bold text-slate-900">
                  {currentPrice}
                </span>
                <span className="text-sm text-slate-500">per unit</span>
            </div>
          )}
          </div>

          {details && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  Description
                </h2>
                <p className="text-slate-600 leading-relaxed">
                {descriptionText}
                </p>
            </div>
          )}
              </div>

              {/* Variations */}
        {details && details.variations && details.variations.length > 0 && (
                <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Product Specifications
                  </h2>
            <div className="overflow-hidden border border-slate-200 rounded-xl bg-white">
              <table className="w-full">
                <tbody className="divide-y divide-slate-200">
                  {details.variations
                    .filter((variation) => {
                      // If a variant is selected, hide general variations that list all models
                      if (pricedVariations.length > 0 && selectedVariant) {
                        // Show non-priced variations that are not general listings (like "Light Type")
                        if (!variation.price) {
                          // Keep "Light Type" and similar, but hide general specs that list all models
                          const lowerName = variation.name.toLowerCase();
                          const isGeneralSpec = 
                            lowerName.includes("led power") ||
                            lowerName.includes("solar panel") ||
                            lowerName.includes("battery capacity") ||
                            lowerName.includes("pole height");
                          return !isGeneralSpec;
                        }
                        
                        // For priced variations, only show the selected one
                        return variation.name === selectedVariant.name;
                      }
                      
                      // If no variant selected, show all (fallback)
                      return true;
                    })
                    .map((variation, index) => {
                    // Get icon based on variation name
                    const getIcon = (name: string) => {
                      const lowerName = name.toLowerCase();
                      if (lowerName.includes("model") || lowerName.includes("code")) {
                        return <RiFileList3Line className="h-5 w-5" />;
                      }
                      if (lowerName.includes("power") || lowerName.includes("output")) {
                        return <RiFlashlightLine className="h-5 w-5" />;
                      }
                      if (lowerName.includes("connector") || lowerName.includes("gun")) {
                        return <RiPlugLine className="h-5 w-5" />;
                      }
                      if (lowerName.includes("type")) {
                        return <RiSettings3Line className="h-5 w-5" />;
                      }
                      if (lowerName.includes("use") || lowerName.includes("case")) {
                        return <RiMapPinLine className="h-5 w-5" />;
                      }
                      return <RiBatteryChargeLine className="h-5 w-5" />;
                    };

                            const isPricedVariant = typeof variation.price === "string";
                            const pricedIndex = isPricedVariant
                              ? pricedVariations.findIndex((v) => v.name === variation.name)
                              : -1;
                            const isSelected =
                              isPricedVariant &&
                              pricedIndex !== -1 &&
                              pricedIndex === selectedVariantIndex;

                            return (
                      <tr
                        key={index}
                                onClick={() => {
                                  if (isPricedVariant && pricedIndex !== -1) {
                                    setSelectedVariantIndex(pricedIndex);
                                  }
                                }}
                                className={`hover:bg-slate-50 transition-colors cursor-${
                                  isPricedVariant ? "pointer" : "default"
                                } ${isSelected ? "bg-primary/5" : ""}`}
                      >
                        <td className="px-4 py-3 w-12">
                          <div className="text-primary">
                            {getIcon(variation.name)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900 min-w-[140px]">
                            {variation.name}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                                <div className="text-slate-700 flex flex-col gap-1">
                                  <span>{variation.value}</span>
                                  {variation.price && (
                                    <span className="text-sm font-semibold text-primary">
                                      {variation.price}
                                    </span>
                                  )}
                                </div>
                          {variation.description && (
                            <div className="text-sm text-slate-500 mt-1">
                              {variation.description}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
                        </div>
                      </div>
        )}
      </div>

      {/* Bottom Section - Full Width with Tabs */}
      <div className="mt-12">
        <div className="border-b border-slate-200 mb-6">
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "stats"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <RiThumbUpLine className="h-4 w-4" />
                Stats & Reacts
              </span>
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "comments"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <RiChat3Line className="h-4 w-4" />
                Comments
              </span>
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "projects"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <RiMapPinLine className="h-4 w-4" />
                {isEVProduct ? "Applicable Spaces" : "Sample Projects"}
              </span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
          {activeTab === "stats" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Product Stats & Reactions</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Likes Card - Clickable */}
                <button
                  onClick={() => {
                    setIsLiked(!isLiked);
                    setLikes(prev => isLiked ? prev - 1 : prev + 1);
                  }}
                  className="group text-center p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-slate-200 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isLiked ? (
                      <RiHeartFill className="h-7 w-7 text-red-500 animate-pulse" />
                    ) : (
                      <RiHeartLine className="h-7 w-7 text-slate-400 group-hover:text-red-400 transition-colors" />
                    )}
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1 transition-all">
                    {likes.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Likes</div>
                  <div className="text-xs text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isLiked ? "Click to unlike" : "Click to like"}
                  </div>
                </button>

                {/* Rating Card - Interactive Stars */}
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-300 transition-all hover:shadow-lg">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-3">
                    <RiStarLine className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-3">{averageRating.toFixed(1)}</div>
                  <div className="text-sm text-slate-600 font-medium mb-4">Average Rating</div>
                  
                  {/* Interactive Star Rating */}
                  <div 
                    className="flex items-center justify-center gap-1 mb-2"
                    onMouseLeave={() => setHoveredStar(0)}
                  >
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = star <= (hoveredStar || (hasRated ? userRating : Math.round(averageRating)));
                      return (
                        <button
                          key={star}
                          onClick={() => {
                            if (!hasRated) {
                              setUserRating(star);
                              setHasRated(true);
                              // Update average rating calculation
                              const newTotal = totalRatings + 1;
                              const newAvg = ((averageRating * totalRatings) + star) / newTotal;
                              setAverageRating(newAvg);
                              setTotalRatings(newTotal);
                              setPositiveReviews(prev => prev + 1);
                            }
                          }}
                          onMouseEnter={() => setHoveredStar(star)}
                          className="transition-transform hover:scale-125 active:scale-95"
                        >
                          <RiStarLine
                            className={`h-5 w-5 transition-all duration-200 ${
                              isActive
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300 hover:text-yellow-300"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-xs text-slate-500">
                    {hasRated 
                      ? `You rated: ${userRating} stars` 
                      : hoveredStar > 0 
                        ? `Rate: ${hoveredStar} stars` 
                        : "Hover to rate"}
                  </div>
                </div>

                {/* Positive Reviews Card - Clickable */}
                <button
                  onClick={() => {
                    setPositiveReviews(prev => prev + 1);
                  }}
                  className="group text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                    <RiThumbUpLine className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1 transition-all">
                    {positiveReviews.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Positive Reviews</div>
                  <div className="text-xs text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to add review
        </div>
                </button>
      </div>
              {details && details.specifications && details.specifications.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Technical Specifications</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                {details.specifications.map((spec, index) => (
                  <div
                    key={index}
                        className="flex justify-between items-center py-3 px-4 bg-slate-50 rounded-lg"
                  >
                    <span className="text-slate-600">{spec.label}</span>
                    <span className="font-semibold text-slate-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
              {details && details.features && details.features.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                {details.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <RiCheckLine className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Product Images Gallery */}
              {product.images && product.images.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Product Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {product.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100 hover:border-primary/50 transition-all hover:shadow-md"
                      >
                        <Image
                          src={img}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "comments" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Customer Comments & Reviews</h3>
              <div className="space-y-4">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-semibold">JD</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">John Doe</div>
                      <div className="text-sm text-slate-500">Verified Customer</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1 text-yellow-500">
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    &quot;Excellent charging station! Fast charging speed and very reliable. 
                    Perfect for our commercial parking lot. Highly recommend!&quot;
                  </p>
                  <div className="mt-3 text-sm text-slate-500">2 days ago</div>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-700 font-semibold">SM</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Sarah Miller</div>
                      <div className="text-sm text-slate-500">Business Owner</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1 text-yellow-500">
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    &quot;Installed 5 units at our expressway service area. Great performance 
                    and customer satisfaction. The dual-gun feature is a game-changer!&quot;
                  </p>
                  <div className="mt-3 text-sm text-slate-500">1 week ago</div>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-700 font-semibold">MC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Mike Chen</div>
                      <div className="text-sm text-slate-500">Fleet Manager</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1 text-yellow-500">
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4 fill-current" />
                      <RiStarLine className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    &quot;Future-proof design with excellent build quality. Our EV fleet 
                    charges efficiently. Weather resistance is impressive.&quot;
                  </p>
                  <div className="mt-3 text-sm text-slate-500">2 weeks ago</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">
                {isEVProduct || isCabinetProduct ? "Applicable Spaces" : (isSmartHomeProduct || isContainerProduct) ? "Applicable Scenarios" : "Sample Projects"}
              </h3>
              {isContainerProduct ? (
                <div className="space-y-4 md:space-y-6">
                  <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6">
                    {product.id === "container-con1"
                      ? "Small utility-level / industrial park containerized BESS system. Ideal for main power for small island towns (currently using diesel generators), industrial park or export zone tenants (cold-storage hubs, fish ports, mining camps), and large university or hospital campuses or combined municipal loads. When paired with big solar and possibly backup diesel, can provide 24/7 coverage."
                      : "Suitable for utility-scale applications, large industrial complexes, and major infrastructure projects requiring reliable, high-capacity energy storage."
                    }
                  </p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {(product.id === "container-con1"
                      ? [
                          { title: "Small Island Towns", description: "Main power for small island towns currently using diesel generators", image: "/Product/containertype/location/loc1.png" },
                          { title: "Industrial Parks", description: "Industrial park or export zone tenants requiring reliable power", image: "/Product/containertype/location/loc2.png" },
                          { title: "Cold-Storage Hubs", description: "Cold-storage hubs in industrial parks and export zones", image: "/Product/containertype/location/loc3.png" },
                          { title: "Fish Ports", description: "Fish ports and landing centers requiring continuous power", image: "/Product/containertype/location/loc4.png" },
                          { title: "Mining Camps", description: "Mining camps and remote industrial operations", image: "/Product/containertype/location/loc5.png" },
                          { title: "University Campuses", description: "Large university campuses with significant energy demands", image: "/Product/containertype/location/loc6.png" },
                          { title: "Hospital Campuses", description: "Large hospital campuses requiring 24/7 reliable power", image: "/Product/containertype/location/loc7.png" },
                          { title: "Municipal Loads", description: "Combined municipal loads and public facilities", image: "/Product/containertype/location/loc8.png" },
                          { title: "Export Zones", description: "Export processing zones and special economic zones", image: "/Product/containertype/location/loc9.png" },
                          { title: "Utility Operations", description: "Small utility-level operations replacing diesel generators", image: "/Product/containertype/location/loc10.png" },
                        ]
                      : [
                          { title: "Large Industrial Complexes", description: "Large industrial complexes requiring massive power" },
                          { title: "Utility-Scale Projects", description: "Utility-scale energy storage applications" },
                          { title: "Major Infrastructure", description: "Major infrastructure projects" },
                          { title: "Manufacturing Facilities", description: "Large manufacturing facilities" },
                        ]
                    ).map((scenario, index) => (
                      <div
                        key={index}
                        className="w-full md:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] group bg-white rounded-xl p-4 md:p-5 border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                      >
                        {('image' in scenario && scenario.image && product.id === "container-con1") ? (
                          <>
                            <div className="relative w-full h-32 md:h-40 mb-3 rounded-lg overflow-hidden bg-slate-100">
                              <Image
                                src={scenario.image}
                                alt={scenario.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <h4 className="font-semibold text-sm md:text-base text-slate-900 mb-2">{scenario.title}</h4>
                          </>
                        ) : (
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <RiMapPinLine className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                            </div>
                            <h4 className="font-semibold text-sm md:text-base text-slate-900">{scenario.title}</h4>
                          </div>
                        )}
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{scenario.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : isCabinetProduct ? (
                <div className="space-y-4 md:space-y-6">
                  <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6">
                    {product.id === "cabinet-14"
                      ? "Suitable for whole small islands / sitios (dozens of households), LGU projects (solarizing barangays, ports, fish landing centers), and large commercial farms, cold-storage hubs, ice plants."
                      : product.id === "cabinet-15"
                      ? "Suitable for whole small islands / sitios (dozens of households), LGU projects (solarizing barangays, ports, fish landing centers), and large commercial farms, cold-storage hubs, ice plants."
                      : product.id === "cabinet-16"
                      ? "Can act as the main power plant for whole small island barangays with a few hundred households, large resort complexes, or clusters of factories."
                      : product.id === "cabinet-item4"
                      ? "Suitable for single businesses, small compounds, schools, resorts, barangay centers, off-grid tourist sites, poultry/piggery/fish farms, and telecom sites."
                      : "Suitable for large-scale commercial and industrial applications, utility-scale projects, and major infrastructure."
                    }
                  </p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {(product.id === "cabinet-14"
                      ? [
                          { title: "Whole Small Islands", description: "Whole small islands / sitios (dozens of households)", image: "/Product/cabinet/location/cab14/loc1.png" },
                          { title: "LGU Projects", description: "LGU projects: solarizing barangays, ports, fish landing centers", image: "/Product/cabinet/location/cab14/loc2.png" },
                          { title: "Barangays", description: "Solarizing barangays with community power", image: "/Product/cabinet/location/cab14/loc3.png" },
                          { title: "Ports", description: "Port facilities requiring reliable power", image: "/Product/cabinet/location/cab14/loc4.png" },
                          { title: "Fish Landing Centers", description: "Fish landing centers needing power for operations", image: "/Product/cabinet/location/cab14/loc5.png" },
                          { title: "Large Commercial Farms", description: "Large commercial farms with extensive power needs", image: "/Product/cabinet/location/cab14/loc6.png" },
                          { title: "Cold-Storage Hubs", description: "Cold-storage hubs requiring continuous power", image: "/Product/cabinet/location/cab14/loc7.png" },
                          { title: "Ice Plants", description: "Ice plants needing reliable industrial power", image: "/Product/cabinet/location/cab14/loc8.png" },
                        ]
                      : product.id === "cabinet-15"
                      ? [
                          { title: "Whole Small Islands", description: "Whole small islands / sitios (dozens of households)", image: "/Product/cabinet/location/cab14/loc1.png" },
                          { title: "LGU Projects", description: "LGU projects: solarizing barangays, ports, fish landing centers", image: "/Product/cabinet/location/cab14/loc2.png" },
                          { title: "Barangays", description: "Solarizing barangays with community power", image: "/Product/cabinet/location/cab14/loc3.png" },
                          { title: "Ports", description: "Port facilities requiring reliable power", image: "/Product/cabinet/location/cab14/loc4.png" },
                          { title: "Fish Landing Centers", description: "Fish landing centers needing power for operations", image: "/Product/cabinet/location/cab14/loc5.png" },
                          { title: "Large Commercial Farms", description: "Large commercial farms with extensive power needs", image: "/Product/cabinet/location/cab14/loc6.png" },
                          { title: "Cold-Storage Hubs", description: "Cold-storage hubs requiring continuous power", image: "/Product/cabinet/location/cab14/loc7.png" },
                          { title: "Ice Plants", description: "Ice plants needing reliable industrial power", image: "/Product/cabinet/location/cab14/loc8.png" },
                        ]
                      : product.id === "cabinet-16"
                      ? [
                          { title: "Small Island Barangays", description: "Whole small island barangay with a few hundred households, a school, a clinic, and small businesses", image: "/Product/cabinet/location/cab14/loc1.png" },
                          { title: "Large Resort Complexes", description: "Large resort complex with multiple buildings, pools, restaurants, and laundry", image: "/Product/cabinet/location/cab14/loc2.png" },
                          { title: "Factory Clusters", description: "Cluster of factories (e.g., agro-processing complex)", image: "/Product/cabinet/location/cab14/loc3.png" },
                          { title: "Island Grids", description: "Main power plant for island communities", image: "/Product/cabinet/location/cab14/loc4.png" },
                          { title: "Village Power Plants", description: "Primary power source for entire villages", image: "/Product/cabinet/location/cab14/loc5.png" },
                          { title: "Resort Power Systems", description: "Complete power solution for large resort operations", image: "/Product/cabinet/location/cab14/loc6.png" },
                        ]
                      : product.id === "cabinet-item4"
                      ? [
                          { title: "Single Businesses", description: "Single business or small compound applications", image: "/Product/cabinet/location/loc1.png" },
                          { title: "Schools", description: "Schools requiring reliable power supply", image: "/Product/cabinet/location/loc2.png" },
                          { title: "Resorts", description: "Resorts needing off-grid power solutions", image: "/Product/cabinet/location/loc3.png" },
                          { title: "Barangay Centers", description: "Barangay centers and community facilities", image: "/Product/cabinet/location/loc4.png" },
                          { title: "Off-Grid Tourist Sites", description: "Off-grid tourist sites with a few cottages", image: "/Product/cabinet/location/loc5.png" },
                          { title: "Poultry/Piggery/Fish Farms", description: "Poultry/piggery/fish farms (lighting, blowers, small machinery)", image: "/Product/cabinet/location/loc6.png" },
                          { title: "Telecom Sites", description: "Telecom sites that want to reduce diesel use", image: "/Product/cabinet/location/loc7.png" },
                          { title: "Small Industrial Plants", description: "Small industrial operations requiring reliable power", image: "/Product/cabinet/location/loc8.png" },
                        ]
                      : [
                          { title: "Large Industrial Complexes", description: "Large industrial complexes requiring massive power" },
                          { title: "Utility-Scale Projects", description: "Utility-scale energy storage applications" },
                          { title: "Major Infrastructure", description: "Major infrastructure projects" },
                          { title: "Manufacturing Facilities", description: "Large manufacturing facilities" },
                        ]
                    ).map((scenario, index) => (
                      <div
                        key={index}
                        className="w-full md:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] group bg-white rounded-xl p-4 md:p-5 border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                      >
                        {('image' in scenario && scenario.image && (product.id === "cabinet-item4" || product.id === "cabinet-14" || product.id === "cabinet-15" || product.id === "cabinet-16")) ? (
                          <>
                            <div className="relative w-full h-32 md:h-40 mb-3 rounded-lg overflow-hidden bg-slate-100">
                              <Image
                                src={scenario.image}
                                alt={scenario.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <h4 className="font-semibold text-sm md:text-base text-slate-900 mb-2">{scenario.title}</h4>
                          </>
                        ) : (
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <RiMapPinLine className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                            </div>
                            <h4 className="font-semibold text-sm md:text-base text-slate-900">{scenario.title}</h4>
                          </div>
                        )}
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{scenario.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : isSmartHomeProduct ? (
                <div className="space-y-4 md:space-y-6">
                  <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6">
                    {product.id === "smart-home-smp2" 
                      ? "Suitable for small houses, sari-sari stores, off-grid tiny homes, farm huts, and construction site offices."
                      : product.id === "smart-home-smp3"
                      ? "Suitable for urban homes, small clinics, small offices, BPO satellite offices, internet cafés, and small resort cottages."
                      : product.id === "smart-home-smp4"
                      ? "Suitable for rural homes with frequent long outages, stores with freezers requiring overnight operation, and small cell sites/telecom repeaters."
                      : product.id === "smart-home-smp5"
                      ? "Suitable for large homes with multiple AC units, small resorts or beach houses, restaurants, bakeries, small manufacturing, and community facilities."
                      : product.id === "smart-home-smp6"
                      ? "Suitable for off-grid homes or lodges that must run all night, cold storage rooms for small agri businesses, and small hospitals/clinics needing longer uptime."
                      : product.id === "smart-home-smp7"
                      ? "Suitable for off-grid communities, remote resorts, island communities, telecom towers, and farms with integrated systems."
                      : "Suitable for various places such as villas, small businesses, construction sites, farmer breeding, remote pastoral areas, islands, communication base stations, etc."
                    }
                  </p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {(product.id === "smart-home-smp2" 
                      ? [
                          { title: "Small Houses", description: "Backup power for small houses during brownouts" },
                          { title: "Small Businesses", description: "Sari-sari store lights + small freezer for a few hours" },
                          { title: "Construction Sites", description: "Construction site office power supply" },
                          { title: "Off-Grid Tiny Homes", description: "Power for off-grid tiny homes and farm huts" },
                          { title: "Farm Huts", description: "Rural farm hut power solutions" },
                          { title: "Power Shortage Areas", description: "Backup power for areas with unreliable grid" },
                        ]
                      : product.id === "smart-home-smp3"
                      ? [
                          { title: "Urban Homes", description: "Backup power for urban homes during long brownouts" },
                          { title: "Small Clinics", description: "Power supply for small medical clinics" },
                          { title: "Small Offices", description: "Backup power for small office spaces" },
                          { title: "BPO Satellite Offices", description: "Power for BPO satellite office locations" },
                          { title: "Internet Cafés", description: "Reliable power for internet café operations" },
                          { title: "Resort Cottages", description: "Small resort cottage / Airbnb unit power supply" },
                        ]
                      : product.id === "smart-home-smp4"
                      ? [
                          { title: "Rural Homes", description: "Rural homes with frequent long outages" },
                          { title: "Stores with Freezers", description: "Stores with freezers (meat, ice cream) that must stay cold overnight" },
                          { title: "Cell Sites", description: "Small cell sites/telecom repeaters wanting longer autonomy" },
                          { title: "Telecom Repeaters", description: "Telecom infrastructure requiring extended backup power" },
                          { title: "Long Outage Areas", description: "Areas with frequent and extended power outages" },
                          { title: "Cold Storage", description: "Commercial applications requiring overnight refrigeration" },
                        ]
                      : product.id === "smart-home-smp5"
                      ? [
                          { title: "Large Homes", description: "Large homes with multiple AC units" },
                          { title: "Resorts & Beach Houses", description: "Small resorts or beach houses (several rooms + common area)" },
                          { title: "Restaurants", description: "Restaurants requiring reliable power for operations" },
                          { title: "Bakeries", description: "Bakeries with light machinery and equipment" },
                          { title: "Small Manufacturing", description: "Small manufacturing with light machinery" },
                          { title: "Community Facilities", description: "Barangay halls, schools, classrooms, and evacuation centers" },
                        ]
                      : product.id === "smart-home-smp6"
                      ? [
                          { title: "Off-Grid Homes", description: "Off-grid homes or lodges that must run all night" },
                          { title: "Cold Storage", description: "Cold storage rooms for small agri businesses" },
                          { title: "Small Hospitals", description: "Small hospitals/clinics needing longer uptime for equipment" },
                          { title: "Clinics", description: "Small-scale medical facilities requiring extended backup" },
                          { title: "All-Night Operations", description: "Applications requiring full day-night cycle backup" },
                          { title: "Extended Backup", description: "Systems needing longer-lasting storage for moderate loads" },
                        ]
                      : product.id === "smart-home-smp7"
                      ? [
                          { title: "Off-Grid Communities", description: "Off-grid communities (several houses sharing one system)" },
                          { title: "Remote Resorts", description: "Remote resorts and island communities" },
                          { title: "Island Communities", description: "Island communities requiring mini-microgrid solutions" },
                          { title: "Telecom Towers", description: "Telecom towers + equipment shelters" },
                          { title: "Integrated Farms", description: "Farms with pumps, cold storage, and house all in one system" },
                          { title: "Mini-Microgrids", description: "Shared energy systems for multiple users" },
                        ]
                      : [
                          { title: "Villas", description: "Residential solar power for luxury homes" },
                          { title: "Small Businesses", description: "Commercial solar solutions for shops and stores" },
                          { title: "Construction Sites", description: "Temporary power for construction projects" },
                          { title: "Farmer Breeding", description: "Agricultural and farming applications" },
                          { title: "Remote Pastoral Areas", description: "Off-grid power for remote locations" },
                          { title: "Islands", description: "Island communities and marine applications" },
                          { title: "Communication Base Stations", description: "Power for telecom infrastructure" },
                          { title: "Remote Mountainous Areas", description: "Mountain and high-altitude installations" },
                          { title: "Power Shortage Areas", description: "Backup power for areas with unreliable grid" },
                          { title: "Fishery Aquaculture", description: "Aquaculture and fishery operations" },
                        ]
                    ).map((scenario, index) => (
                      <div
                        key={index}
                        className="w-full md:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] group bg-white rounded-xl p-4 md:p-5 border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <RiMapPinLine className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                          </div>
                          <h4 className="font-semibold text-sm md:text-base text-slate-900">{scenario.title}</h4>
                        </div>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{scenario.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
              <div className="flex flex-wrap gap-4 md:gap-6">
                {product.id === "solar-street-f2l" ? (
                  <>
                    <div className="group cursor-pointer w-full md:w-[calc(33.333%-1rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/StreetLamp/f2/proj1.png"
                          alt="Sample Project 1"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Sample Project 1</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Real-world installation showcase</p>
                    </div>
                    <div className="group cursor-pointer w-full md:w-[calc(33.333%-1rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/StreetLamp/f2/proj2.png"
                          alt="Sample Project 2"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Sample Project 2</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Professional installation example</p>
                    </div>
                    <div className="group cursor-pointer w-full md:w-[calc(33.333%-1rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/StreetLamp/f2/proj3.png"
                          alt="Sample Project 3"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Sample Project 3</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Completed project demonstration</p>
                    </div>
                  </>
                ) : product.id === "solar-street-rklv02" ? (
                  <>
                    <div className="group cursor-pointer w-full md:w-[calc(33.333%-1rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/StreetLamp/lvq2/proj1.png"
                          alt="Sample Project 1"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Sample Project 1</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Real-world installation showcase</p>
                    </div>
                    <div className="group cursor-pointer w-full md:w-[calc(33.333%-1rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/StreetLamp/lvq2/proj2.png"
                          alt="Sample Project 2"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Sample Project 2</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Professional installation example</p>
                    </div>
                    <div className="group cursor-pointer w-full md:w-[calc(33.333%-1rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/StreetLamp/lvq2/proj3.png"
                          alt="Sample Project 3"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Sample Project 3</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Completed project demonstration</p>
                    </div>
                  </>
                ) : product.id === "ev-charging-89" ? (
                  <>
                    <div className="group cursor-pointer w-full md:w-[calc(25%-1.125rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/EV/green/96.jpg"
                          alt="Office building parking lot"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Office building parking lot</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Ideal for corporate and business facilities</p>
                    </div>
                    <div className="group cursor-pointer w-full md:w-[calc(25%-1.125rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/EV/green/97.jpg"
                          alt="Residential community"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Residential community</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Perfect for apartment complexes and housing developments</p>
                    </div>
                    <div className="group cursor-pointer w-full md:w-[calc(25%-1.125rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/EV/green/98.jpg"
                          alt="Commercial parking lot"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Commercial parking lot</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Suitable for shopping centers and retail facilities</p>
                    </div>
                    <div className="group cursor-pointer w-full md:w-[calc(25%-1.125rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/EV/green/99.jpg"
                          alt="Small enterprise parking lot"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Small enterprise parking lot</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Perfect for small businesses and local enterprises</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="group cursor-pointer w-full md:w-[calc(33.333%-1rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/EV/small/83.jpg"
                          alt="Apartment parking spaces"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Apartment parking spaces</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Ideal for residential complexes and multi-unit buildings</p>
                    </div>
                    <div className="group cursor-pointer w-full md:w-[calc(33.333%-1rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/EV/small/84.jpg"
                          alt="Enterprise parking spaces"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Enterprise parking spaces</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Perfect for commercial and office parking facilities</p>
                    </div>
                    <div className="group cursor-pointer w-full md:w-[calc(33.333%-1rem)]">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                        <Image
                          src="/Product/EV/small/85.jpg"
                          alt="Private parking spaces"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold text-white text-lg">Private parking spaces</h4>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 text-center">Suitable for individual homes and private garages</p>
                    </div>
                  </>
                )}
              </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-3">
          Interested in this product?
        </h3>
        <p className="text-blue-100 mb-6">
          Contact us for pricing, availability, and custom configurations
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
}


