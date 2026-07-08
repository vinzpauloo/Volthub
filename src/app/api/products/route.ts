import { NextResponse } from "next/server";
import {
  type BackendProduct,
  type Product,
  type ProductCategory,
  categories,
  categoryBanner,
  mapBackendProduct,
} from "@/app/products/components/productData";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  "https://volthub-admin-one.vercel.app/api/public/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as ProductCategory | null;
    const search = searchParams.get("search")?.toLowerCase() || "";
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    // Fetch products from the backend
    const res = await fetch(BACKEND_API_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.error("Backend fetch failed:", res.status, res.statusText);
      return NextResponse.json(
        { success: false, error: "Failed to fetch products from backend" },
        { status: 502 }
      );
    }

    const json = await res.json();
    const rawProducts: BackendProduct[] = json.data ?? [];

    // Transform backend products to frontend shape
    let products: Product[] = rawProducts
      .filter((bp) => bp.is_active && !bp.deleted_at)
      .map(mapBackendProduct);

    // Filter by category if provided
    if (category && category !== "all") {
      products = products.filter((p) => p.category === category);
    }

    // Filter by search query
    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.sku_code?.toLowerCase().includes(search) ||
          p.description?.toLowerCase().includes(search)
      );
    }

    // Apply pagination
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const total = products.length;

    if (limitNum) {
      products = products.slice(offsetNum, offsetNum + limitNum);
    }

    // Get category info if category is specified
    const categoryInfo =
      category && category !== "all" ? categoryBanner[category] : null;

    return NextResponse.json({
      success: true,
      data: {
        products,
        total,
        categories,
        categoryInfo,
        pagination: {
          limit: limitNum,
          offset: offsetNum,
          hasMore: limitNum ? offsetNum + limitNum < total : false,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
