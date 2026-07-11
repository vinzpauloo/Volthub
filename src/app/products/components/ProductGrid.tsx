import {
  Product,
  ProductCategory,
  GroupedProduct,
  categories,
} from "./productData";
import ProductCard from "./ProductCard";
import ProductShowcaseBanner from "./ProductShowcaseBanner";

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
  const totalCount = groupedProducts.length + flatProducts.length;
  const showBanners = groupedProducts.length > 0;
  const showCards = flatProducts.length > 0;

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

      {/* Grouped product banners (EV chargers) */}
      {showBanners && (
        <div className="space-y-6 md:space-y-8">
          {groupedProducts.map((gp) => (
            <ProductShowcaseBanner key={gp.groupBy} product={gp} />
          ))}
        </div>
      )}

      {/* Flat product cards (non-EV categories) */}
      {showCards && (
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
