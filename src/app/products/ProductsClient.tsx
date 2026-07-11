"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import ProductBanner from "./components/ProductBanner";
import ProductSidebar from "./components/ProductSidebar";
import ProductGrid from "./components/ProductGrid";
import {
  ProductCategory,
  Product,
  GroupedProduct,
  type BackendProduct,
  isGroupedProduct,
  mapBackendProduct,
} from "./components/productData";
import BackToTopButton from "@/components/common/BackToTopButton";

const BACKEND_URL = "https://volthub-admin-one.vercel.app/";

async function getProducts(): Promise<{
  grouped: GroupedProduct[];
  flat: Product[];
}> {
  try {
    const res = await fetch(`${BACKEND_URL}api/public/products`, {
      cache: "no-store",
    });
    if (!res.ok) return { grouped: [], flat: [] };
    const json = await res.json();
    const raw = json.data ?? [];

    const grouped: GroupedProduct[] = [];
    const flat: Product[] = [];

    for (const entry of raw) {
      if (isGroupedProduct(entry)) {
        grouped.push(entry);
      } else {
        // Flat BackendProduct (non-EV categories)
        const bp = entry as BackendProduct;
        if (bp.is_active && !bp.deleted_at) {
          flat.push(mapBackendProduct(bp));
        }
      }
    }

    return { grouped, flat };
  } catch {
    return { grouped: [], flat: [] };
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
      ].includes(categoryParam)
      ? categoryParam
      : "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [groupedProducts, setGroupedProducts] = useState<GroupedProduct[]>([]);
  const [flatProducts, setFlatProducts] = useState<Product[]>([]);

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
      ].includes(categoryParam)
    ) {
      setActiveCategory(categoryParam);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [categoryParam]);

  useEffect(() => {
    getProducts().then(({ grouped, flat }) => {
      setGroupedProducts(grouped);
      setFlatProducts(flat);
    });
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredGrouped = useMemo(
    () =>
      groupedProducts.filter((gp) => {
        const frontendCat = mapGroupedCategory(gp.category);
        if (activeCategory !== "all" && frontendCat !== activeCategory)
          return false;
        if (!normalizedQuery) return true;
        const haystack = [
          gp.name,
          gp.description,
          gp.groupBy,
          ...gp.supply,
          ...gp.type,
          ...gp.connector,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(normalizedQuery);
      }),
    [groupedProducts, activeCategory, normalizedQuery],
  );

  const filteredFlat = useMemo(
    () =>
      flatProducts
        .filter((p) => p.is_active !== false)
        .filter((p) =>
          activeCategory === "all" ? true : p.category === activeCategory,
        )
        .filter((p) => {
          if (!normalizedQuery) return true;
          const haystack = [p.name, p.sku_code, p.description]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        }),
    [flatProducts, activeCategory, normalizedQuery],
  );

  const showBackToTop = activeCategory === "all";

  return (
    <main className="bg-slate-50 min-h-screen overflow-x-hidden">
      <ProductBanner activeCategory={activeCategory} />

      <section className="py-6 md:py-10 lg:py-14">
        <LayoutContainer>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start w-full">
            <ProductSidebar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <ProductGrid
              groupedProducts={filteredGrouped}
              flatProducts={filteredFlat}
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

function mapGroupedCategory(cat: string): ProductCategory {
  switch (cat) {
    case "dc_charger":
    case "ac_charger":
      return "ev-charging";
    case "solar_street":
    case "solar_street_light":
      return "solar-street";
    case "home_battery":
    case "smart_home":
      return "smart-home";
    case "cabinet_bess":
    case "cabinet":
      return "cabinet";
    default:
      return "all";
  }
}
