import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, LayoutList } from "lucide-react";
import { RiArrowRightSLine } from "react-icons/ri";
import {
  Product,
  ProductCategory,
  GroupedProduct,
  categories,
} from "./productData";
import ProductCard from "./ProductCard";
import ProductShowcaseBanner from "./ProductShowcaseBanner";

type ViewMode = "full" | "grid";

interface ProductGridProps {
  groupedProducts: GroupedProduct[];
  flatProducts: Product[];
  activeCategory: ProductCategory;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

export default function ProductGrid({
  groupedProducts,
  flatProducts,
  activeCategory,
  searchQuery,
  onSearchQueryChange,
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const totalCount = groupedProducts.length + flatProducts.length;
  const showBanners = groupedProducts.length > 0;
  const showCards = flatProducts.length > 0;
  const isGrid = viewMode === "grid";

  return (
    <div className="space-y-6 md:space-y-8 flex-1 w-full md:w-auto">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
        <div className="space-y-1">
          <p className="text-xs md:text-sm uppercase tracking-[0.16em] text-primary font-semibold">
            Products
          </p>
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-900 mt-1">
            {activeCategory === "all"
              ? "All Products"
              : categories.find((c) => c.id === activeCategory)?.label}
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 w-full md:w-auto">
          {/* View mode toggle */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode("full")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                viewMode === "full"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
              aria-label="Full view"
            >
              <LayoutList className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Full</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
          <div className="relative w-full md:w-72">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 md:text-right">
            {totalCount} product{totalCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Empty state */}
      {totalCount === 0 && (
        <div className="text-center py-12 md:py-16">
          <p className="text-slate-500 text-sm md:text-base">
            No products found in this category.
          </p>
        </div>
      )}

      {/* ── Grid view: all products (grouped + flat) as compact cards ── */}
      {isGrid && totalCount > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 xl:gap-6">
          {/* Grouped products (EV chargers) as compact cards */}
          {groupedProducts.map((gp) => (
            <Link key={gp.groupBy} href={`/products/${gp.groupBy}`}>
              <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border border-slate-100 cursor-pointer h-full">
                <div className="relative overflow-hidden bg-slate-100 aspect-[4/3]">
                  {gp.image_url ? (
                    <Image
                      src={gp.image_url}
                      alt={gp.name}
                      width={480}
                      height={360}
                      className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <span className="text-slate-400 text-sm">Image not available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/10 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 line-clamp-2 leading-tight">
                    {gp.name}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">
                    {gp.description?.slice(0, 100)}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2 transition-all pt-1">
                    <span>Learn More</span>
                    <RiArrowRightSLine className="h-4 w-4" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
          {/* Flat products as compact cards */}
          {flatProducts.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      )}

      {/* ── Full view: grouped product banners ── */}
      {!isGrid && showBanners && (
        <div className="space-y-6 md:space-y-8">
          {groupedProducts.map((gp) => (
            <ProductShowcaseBanner key={gp.groupBy} product={gp} />
          ))}
        </div>
      )}

      {/* ── Full view: flat product cards ── */}
      {!isGrid && showCards && (
        <>
          {showBanners && (
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide pt-2">
              More Products
            </p>
          )}
          <div className="flex flex-wrap gap-4 md:gap-5 xl:gap-6">
            {flatProducts.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-[calc(50%-0.625rem)] xl:w-[calc(33.333%-1rem)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
