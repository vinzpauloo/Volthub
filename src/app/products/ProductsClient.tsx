"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import ProductBanner from "./components/ProductBanner";
import ProductSidebar from "./components/ProductSidebar";
import ProductGrid from "./components/ProductGrid";
import {
  ProductCategory,
  Product,
  type BackendProduct,
  mapBackendProduct,
} from "./components/productData";
import BackToTopButton from "@/components/common/BackToTopButton";

const BACKEND_URL = "https://volthub-admin-one.vercel.app/api/public/products";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(BACKEND_URL, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    const raw: BackendProduct[] = json.data ?? [];
    return raw
      .filter((bp) => bp.is_active && !bp.deleted_at)
      .map(mapBackendProduct);
  } catch {
    return [];
  }
}

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as ProductCategory | null;

  const [activeCategory, setActiveCategory] = useState<ProductCategory>(
    categoryParam &&
      [
        "all",
        "ev-charging",
        "solar-street",
        "smart-home",
        "cabinet",
        "container",
      ].includes(categoryParam)
      ? categoryParam
      : "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- syncing URL param to internal state */
    if (
      categoryParam &&
      [
        "all",
        "ev-charging",
        "solar-street",
        "smart-home",
        "cabinet",
        "container",
      ].includes(categoryParam)
    ) {
      setActiveCategory(categoryParam);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [categoryParam]);

  // Fetch products from API on mount
  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = allProducts
    .filter((p) => p.is_active !== false) // respect is_active flag
    .filter((p) => (activeCategory === "all" ? true : p.category === activeCategory))
    .filter((p) => {
      if (!normalizedQuery) return true;
      // [BACKEND-TODO] — Re-add subtitle, tag when those fields are restored
      const haystack = [
        p.name,
        p.sku_code,
        p.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });

  const showBackToTop = activeCategory === "all";

  return (
    <main className="bg-slate-50 min-h-screen overflow-x-hidden">
      {/* Hero / banner (changes with category) */}
      <ProductBanner activeCategory={activeCategory} />

      {/* Main layout: sidebar + grid */}
      <section className="py-6 md:py-10 lg:py-14">
        <LayoutContainer>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start w-full">
            {/* Sidebar categories */}
            <ProductSidebar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Products grid */}
            <ProductGrid
              products={filteredProducts}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />
          </div>
        </LayoutContainer>
      </section>

      {showBackToTop && <BackToTopButton />}
    </main>
  );
}


