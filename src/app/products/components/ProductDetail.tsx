"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiDownloadLine,
  RiQuestionLine,
  RiArrowLeftSLine,
  RiCheckLine,
  RiAddLine,
  RiSunLine,
  RiBatteryChargeLine,
} from "react-icons/ri";
import { Product, GroupedProduct, BackendProduct, categories } from "./productData";

// ── Solar / Hybrid Add-On Options ──

type AddOn = {
  id: string;
  name: string;
  description: string;
  price?: string;
  icon: React.ComponentType<{ className?: string }>;
};

const solarAddOns: AddOn[] = [
  {
    id: "solar-5kw",
    name: "5kW Solar Panel Kit",
    description: "12× 415W monocrystalline panels, mounting hardware, inverter — ideal for residential daytime charging",
    price: "₱180,000",
    icon: RiSunLine,
  },
  {
    id: "solar-10kw",
    name: "10kW Solar Panel Kit",
    description: "24× 415W monocrystalline panels, grid-tie inverter, mounting system — covers daily charging + home loads",
    price: "₱340,000",
    icon: RiSunLine,
  },
  {
    id: "solar-20kw",
    name: "20kW Solar Array",
    description: "48× 415W panels, hybrid inverter, optimizers — suitable for fleet or multi-charger commercial sites",
    price: "₱650,000",
    icon: RiSunLine,
  },
  {
    id: "battery-10kwh",
    name: "10kWh Battery Storage",
    description: "LiFePO4 wall-mounted battery — stores excess solar for overnight or backup charging",
    price: "₱145,000",
    icon: RiBatteryChargeLine,
  },
  {
    id: "battery-20kwh",
    name: "20kWh Battery Storage",
    description: "Stackable LiFePO4 system — extends off-grid capability and peak-shaving for commercial chargers",
    price: "₱275,000",
    icon: RiBatteryChargeLine,
  },
];

interface ProductDetailProps {
  product: Product;
  group?: GroupedProduct;
  variants?: BackendProduct[];
}

export default function ProductDetail({ product, group, variants: serverVariants }: ProductDetailProps) {
  const categoryLabel = categories.find((c) => c.id === product.category)?.label;

  // ── Client-side variant fetching ──
  const [clientVariants, setClientVariants] = useState<BackendProduct[] | null>(null);
  const [variantsLoading, setVariantsLoading] = useState(false);
  const [variantsError, setVariantsError] = useState<string | null>(null);

  // Use client-fetched variants if available, otherwise server-passed variants
  const variants = clientVariants ?? serverVariants;

  // ── Selected variant (click a card to pick) ──
  const [selectedVariant, setSelectedVariant] = useState<BackendProduct | null>(null);

  // ── Supply filter (from group.supply) ──
  const [selectedSupply, setSelectedSupply] = useState<string | null>(null);

  // Filter variants by selected supply value
  const filteredVariants = variants
    ? selectedSupply
      ? variants.filter((v) => {
          const needle = selectedSupply.toLowerCase();
          return (
            v.name?.toLowerCase().includes(needle) ||
            v.sku_code?.toLowerCase().includes(needle)
          );
        })
      : variants
    : undefined;

  async function fetchVariants() {
    if (!group) return;
    setVariantsLoading(true);
    setVariantsError(null);
    try {
      const res = await fetch(`/api/products/${group.groupBy}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const body = json.data ?? json;
      const data: BackendProduct[] = body?.variants ?? [];
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No variants returned");
      }
      setClientVariants(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to fetch";
      setVariantsError(msg);
    } finally {
      setVariantsLoading(false);
    }
  }

  // Build image URL array. Variant image first when selected.
  const allImages: string[] = (() => {
    const images: string[] = [];
    if (selectedVariant?.image_url) images.push(selectedVariant.image_url);
    if (product.images?.length) {
      for (const img of product.images) {
        if (!images.includes(img.image_url)) images.push(img.image_url);
      }
    }
    if (images.length === 0) images.push(product.image);
    return images;
  })();

  const [selectedImage, setSelectedImage] = useState(() => allImages[0] || product.image);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Add-ons state
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Accessories state
  const [selectedAccessories, setSelectedAccessories] = useState<Set<string>>(new Set());

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Installation service state
  const [includeInstallation, setIncludeInstallation] = useState(false);

  // Solar setup type
  const [solarSetup, setSolarSetup] = useState<string | null>(null);

  const openImageModal = (index: number) => {
    setModalImageIndex(index);
    setIsImageModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const navigateModalImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setModalImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    } else {
      setModalImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isImageModalOpen) closeImageModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isImageModalOpen]);

  return (
    <div className="space-y-4 md:space-y-8 w-full md:w-3/4 md:mx-auto pb-24 lg:pb-8">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors"
      >
        <RiArrowLeftLine className="h-4 w-4" />
        <span>Back to Products</span>
      </Link>

      {/* Product Hero — Image Gallery + Info */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Image Gallery */}
        <div className="lg:w-1/2 space-y-4">
          <button
            onClick={() => openImageModal(allImages.findIndex((img) => img === selectedImage))}
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
                {allImages.findIndex((img) => img === selectedImage) + 1} / {allImages.length}
              </div>
            )}
          </button>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img, index) => {
                const isSelected = selectedImage === img;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all bg-white shadow-sm ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20 scale-105"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    aria-label={`Select image ${index + 1}`}
                  >
                    <Image src={img} alt={`Thumb ${index + 1}`} fill className="object-contain p-1.5" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm space-y-5">
            {categoryLabel && (
              <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                {categoryLabel}
              </span>
            )}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">
              {selectedVariant?.name || product.name}
            </h1>
            {(selectedVariant?.sku_code || product.sku_code) && (
              <p className="text-xs text-slate-500">
                SKU: {selectedVariant?.sku_code || product.sku_code}
                {selectedVariant && (
                  <span className="ml-1.5 text-primary font-medium">(matched)</span>
                )}
              </p>
            )}
            {product.description && (
              <p className="text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Product Variations (full width, 3 columns) ── */}
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          {/* ── Column 1: Variants + Accessories ── */}
          <div className="space-y-5">
            {/* Load Variants button */}
            {!variants && (
              <button
                onClick={fetchVariants}
                disabled={variantsLoading}
                className="w-full bg-primary/10 hover:bg-primary/20 disabled:opacity-50 text-primary font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {variantsLoading ? "Loading variants…" : "Load Variants"}
              </button>
            )}
            {variantsError && (
              <p className="text-xs text-red-500">Error: {variantsError}{" "}
                <button onClick={fetchVariants} className="underline">Retry</button>
              </p>
            )}

            {/* Supply selector */}
            {group?.supply && group.supply.length > 0 && variants && variants.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Filter by Power
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => { setSelectedSupply(null); setSelectedVariant(null); }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition border ${
                      selectedSupply === null
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    All
                  </button>
                  {group.supply.map((supply) => (
                    <button
                      key={supply}
                      type="button"
                      onClick={() => { setSelectedSupply(supply); setSelectedVariant(null); }}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition border ${
                        selectedSupply === supply
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      {supply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variants grid */}
            {filteredVariants && filteredVariants.length > 0 && (
              <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                {filteredVariants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      type="button" key={v.id}
                      onClick={() => setSelectedVariant(isSelected ? null : v)}
                      className={`flex items-start gap-2 rounded-lg border-2 p-2 transition-all text-left ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-slate-200 bg-white hover:border-primary/40 cursor-pointer"
                      }`}
                    >
                      {v.image_url && (
                        <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-slate-100">
                          <Image src={v.image_url} alt={v.name} fill className="object-contain p-0.5" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight">{v.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{v.sku_code}</p>
                        {v.unit_price_php != null && (
                          <p className="text-xs font-bold text-primary mt-0.5">₱{v.unit_price_php.toLocaleString("en-PH")}</p>
                        )}
                      </div>
                      {isSelected && <RiCheckLine className="w-4 h-4 text-primary flex-shrink-0 mt-1" />}
                    </button>
                  );
                })}
                {!selectedVariant && (
                  <p className="col-span-2 text-sm text-amber-600 font-medium text-center py-2">
                    Select a variant above to see pricing
                  </p>
                )}
              </div>
            )}

            {/* Selected Variant Info */}
            {selectedVariant && (
              <div className="bg-primary/5 rounded-xl p-3 space-y-2 border border-primary/20">
                <p className="text-xs text-primary uppercase tracking-wide font-medium">Selected Variant</p>
                <p className="text-sm font-bold text-slate-900">{selectedVariant.name}</p>
                <code className="text-xs font-bold text-primary bg-white px-2 py-0.5 rounded inline-block">{selectedVariant.sku_code}</code>
                <div className="flex items-center justify-between gap-3 pt-1 border-t border-primary/15">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Qty:</span>
                    <button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-md border border-slate-300 hover:border-primary text-slate-700 font-bold text-xs">−</button>
                    <input type="number" min="1" value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-14 h-7 text-center text-xs font-semibold border border-slate-300 rounded-md focus:border-primary outline-none" />
                    <button type="button" onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-7 h-7 rounded-md border border-slate-300 hover:border-primary text-slate-700 font-bold text-xs">+</button>
                  </div>
                  <span className="text-sm font-bold text-primary whitespace-nowrap">
                    {selectedVariant?.unit_price_php != null
                      ? `₱${(selectedVariant.unit_price_php * quantity).toLocaleString("en-PH")}`
                      : "—"}
                  </span>
                </div>
              </div>
            )}

            {/* No matches */}
            {selectedSupply && filteredVariants && filteredVariants.length === 0 && (
              <p className="text-sm text-slate-500">
                No variants match &quot;{selectedSupply}&quot;.{" "}
                <button onClick={() => { setSelectedSupply(null); setSelectedVariant(null); }} className="text-primary underline font-medium">Show all</button>
              </p>
            )}
  {/* Installation Service */}
            {group?.accessories && group.accessories.length > 0 && (
              <button
                type="button"
                onClick={() => setIncludeInstallation((prev) => !prev)}
                className={`w-full flex items-start gap-3 rounded-xl p-4 text-left border transition-all ${
                  includeInstallation ? "bg-primary/5 border-primary/40 ring-1 ring-primary/20" : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  includeInstallation ? "bg-primary text-white" : "bg-white border border-slate-200 text-slate-400"
                }`}>
                  {includeInstallation ? <RiCheckLine className="w-5 h-5" /> : <RiAddLine className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-semibold block ${includeInstallation ? "text-primary" : "text-slate-800"}`}>
                    Installation &amp; Commissioning
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Professional on-site installation, setup, and commissioning by certified technicians</p>
                  <p className="text-xs font-bold text-primary mt-1.5">Est. ₱15,000</p>
                </div>
              </button>
            )}
          
          </div>

          {/* ── Column 2: Installation + Solar Setup ── */}
          <div className="space-y-5">
          
  {/* Accessories */}
            {group?.accessories && group.accessories.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <RiAddLine className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-slate-900">Accessories</h3>
                  <span className="text-[10px] text-slate-400">— add to quote</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {group.accessories.map((acc) => {
                    const isSelected = selectedAccessories.has(acc.id);
                    return (
                      <button
                        key={acc.id}
                        onClick={() => toggleAccessory(acc.id)}
                        className={`flex items-start gap-3 rounded-lg p-3 text-left border transition-all ${
                          isSelected ? "bg-primary/5 border-primary/40 ring-1 ring-primary/20" : "bg-slate-50 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-white border border-slate-200">
                          {acc.image_url ? (
                            <Image src={acc.image_url} alt={acc.name} fill className="object-contain p-1" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300"><RiAddLine className="w-4 h-4" /></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className={`text-xs font-semibold ${isSelected ? "text-primary" : "text-slate-800"}`}>{acc.name}</span>
                            {isSelected && <RiCheckLine className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                          </div>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{acc.sku_code}</p>
                          {acc.description && <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 whitespace-pre-line">{acc.description}</p>}
                          {acc.unit_price_php != null && (
                            <p className="text-xs font-bold text-primary mt-0.5">Est. ₱{acc.unit_price_php.toLocaleString("en-PH")}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {selectedAccessories.size > 0 && (
                  <p className="text-[11px] text-primary font-medium">{selectedAccessories.size} selected</p>
                )}
              </div>
            )}
            {/* Solar Setup Type */}
            {group?.accessories && group.accessories.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Solar Setup</p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: "hybrid", label: "Hybrid", desc: "Grid + Battery — maximum flexibility and energy independence" },
                    { id: "off-grid", label: "Off-Grid", desc: "Battery only — complete independence from the grid" },
                    { id: "on-grid", label: "On-Grid", desc: "Grid-tied only — reduce bills, no battery backup" },
                  ].map((opt) => {
                    const isSelected = solarSetup === opt.id;
                    return (
                      <button
                        key={opt.id} type="button"
                        onClick={() => setSolarSetup(isSelected ? null : opt.id)}
                        className={`rounded-xl p-3 text-left border transition-all ${
                          isSelected ? "bg-primary/5 border-primary/40 ring-1 ring-primary/20" : "bg-slate-50 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className={`text-sm font-semibold block ${isSelected ? "text-primary" : "text-slate-700"}`}>{opt.label}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ── Price Summary (full width below) ── */}
        <div className="mt-6 md:mt-8 border-t border-slate-200 pt-6 md:pt-8">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Quote Summary</h3>

          {/* Table-style price breakdown */}
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 text-slate-500">Unit Price</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">
                    {selectedVariant?.unit_price_php != null
                      ? `₱${selectedVariant.unit_price_php.toLocaleString("en-PH")}`
                      : product.price || "—"}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-500">Quantity</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">× {quantity}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-900">Subtotal</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">
                    {selectedVariant?.unit_price_php != null
                      ? `₱${(selectedVariant.unit_price_php * quantity).toLocaleString("en-PH")}`
                      : product.price || "—"}
                  </td>
                </tr>
                {(selectedAccessories.size > 0 || includeInstallation) && (
                  <>
                    {group?.accessories?.filter((a) => selectedAccessories.has(a.id)).map((acc) => (
                      <tr key={acc.id}>
                        <td className="px-4 py-2 text-xs text-slate-500 pl-8">{acc.name}</td>
                        <td className="px-4 py-2 text-right text-xs text-slate-600">
                          {acc.unit_price_php != null ? `₱${acc.unit_price_php.toLocaleString("en-PH")}` : "—"}
                        </td>
                      </tr>
                    ))}
                    {includeInstallation && (
                      <tr>
                        <td className="px-4 py-2 text-xs text-slate-500 pl-8">Installation Service</td>
                        <td className="px-4 py-2 text-right text-xs text-slate-600">₱15,000</td>
                      </tr>
                    )}
                  </>
                )}
                <tr className="bg-primary/5 border-t-2 border-primary/20">
                  <td className="px-4 py-3 font-bold text-slate-900">Estimated Total</td>
                  <td className="px-4 py-3 text-right text-xl font-bold text-primary">
                    ₱{(() => {
                      const base = selectedVariant?.unit_price_php != null ? selectedVariant.unit_price_php * quantity : 0;
                      const selectedAccs = group?.accessories?.filter((a) => selectedAccessories.has(a.id)) ?? [];
                      const accSubtotal = selectedAccs.reduce((sum, a) => sum + (a.unit_price_php ?? 0), 0);
                      const installCost = includeInstallation ? 15000 : 0;
                      return (base + accSubtotal + installCost).toLocaleString("en-PH");
                    })()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <Link
            href={`/contact?subject=quote&product=${encodeURIComponent(product.category)}&productName=${encodeURIComponent(selectedVariant?.name || product.name)}&sku=${encodeURIComponent(selectedVariant?.sku_code || "")}&addons=${encodeURIComponent([...selectedAddOns].join(","))}&accessories=${encodeURIComponent([...selectedAccessories].join(","))}&installation=${includeInstallation ? "1" : "0"}&solarSetup=${encodeURIComponent(solarSetup ?? "")}&quantity=${quantity}`}
            className="mt-4 flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white font-bold px-4 py-3 rounded-xl shadow-lg transition-all text-base group"
          >
            <span>Get Quote</span>
            <RiArrowRightSLine className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Solar / Hybrid Add-Ons Section ── */}
      {group && (
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <RiAddLine className="w-5 h-5 text-primary" />
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Hybrid Solar Add-Ons
            </h2>
            <span className="text-xs text-slate-400">— bundle & save</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {solarAddOns.map((addon) => {
              const isSelected = selectedAddOns.has(addon.id);
              const Icon = addon.icon;
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`flex items-start gap-3 rounded-xl p-4 text-left border transition-all ${
                    isSelected
                      ? "bg-primary/5 border-primary/40 ring-1 ring-primary/20 shadow-sm"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white border border-slate-200 text-slate-500"
                    }`}
                  >
                    {isSelected ? (
                      <RiCheckLine className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-sm font-semibold ${
                          isSelected ? "text-primary" : "text-slate-800"
                        }`}
                      >
                        {addon.name}
                      </span>
                      {addon.price && (
                        <span className="text-xs font-bold text-slate-600 flex-shrink-0">
                          {addon.price}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {addon.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          {selectedAddOns.size > 0 && (
            <p className="text-xs text-primary font-medium mt-3">
              {selectedAddOns.size} add-on{selectedAddOns.size > 1 ? "s" : ""} selected — included in your quote
            </p>
          )}
        </div>
      )}

      {/* ── Product Images Gallery ── */}
      {product.images && product.images.length > 1 && (
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3 md:mb-4">Product Images</h2>
          <div className="flex flex-col gap-4">
            {product.images.map((img, index) => (
              <div key={img.id || index} className="relative w-full">
                <Image
                  src={img.image_url}
                  alt={img.alt_text || `${product.name} - Image ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-8 md:mt-12 space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <RiQuestionLine className="h-6 w-6 text-primary" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {[
            { q: "What is the installation time?", a: "Installation typically takes 2-4 hours for standard setups. Our certified technicians handle the entire process." },
            { q: "Is maintenance required?", a: "Our products are designed for minimal maintenance. We recommend annual inspections and cleaning." },
            { q: "What payment options are available?", a: "30% bank transfer in advance, balance before shipping. Production time: 20-25 working days." },
            { q: "Can I get a custom configuration?", a: "Yes! Contact our sales team to discuss your requirements and get a tailored solution." },
          ].map((faq, i) => (
            <details key={i} className="group bg-slate-50 rounded-lg border border-slate-200 p-4">
              <summary className="font-semibold text-slate-900 cursor-pointer text-sm md:text-base flex items-center justify-between">
                <span>{faq.q}</span>
                <span className="text-primary text-xl">+</span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 md:p-8 text-white text-center">
        <h3 className="text-xl md:text-2xl font-bold mb-2">Interested in this product?</h3>
        <p className="text-sm text-blue-100 mb-4">Contact us for pricing, availability, and custom configurations</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/contact?subject=quote&product=${encodeURIComponent(product.category)}&productName=${encodeURIComponent(selectedVariant?.name || product.name)}&sku=${encodeURIComponent(selectedVariant?.sku_code || "")}&addons=${encodeURIComponent([...selectedAddOns].join(","))}&accessories=${encodeURIComponent([...selectedAccessories].join(","))}&installation=${includeInstallation ? "1" : "0"}&solarSetup=${encodeURIComponent(solarSetup ?? "")}&quantity=${quantity}`}
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-100 transition-colors text-sm"
          >
            Get Quote
          </Link>
          <Link
            href={`/contact?subject=brouchure&product=${encodeURIComponent(product.category)}&productName=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center gap-2 bg-white/10 text-white border-2 border-white/30 px-6 py-2.5 rounded-xl font-semibold hover:bg-white/20 transition-colors text-sm"
          >
            <RiDownloadLine className="h-4 w-4" />
            Download Brochure
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          onClick={closeImageModal}
        >
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
            aria-label="Close"
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateModalImage("prev"); }}
                className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"
              >
                <RiArrowLeftSLine className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateModalImage("next"); }}
                className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"
              >
                <RiArrowRightSLine className="h-6 w-6" />
              </button>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/10 px-4 py-2 rounded-full text-white text-sm">
                {modalImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={allImages[modalImageIndex]}
              alt={`${product.name} - Image ${modalImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 90vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
