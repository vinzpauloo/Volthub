import { NextResponse } from "next/server";
import {
  type BackendProduct,
  mapBackendProduct,
} from "@/app/products/components/productData";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  "https://volthub-admin-one.vercel.app/api/public/products";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch all products from backend and find the matching one
    // (Backend doesn't have a single-product endpoint, so we filter client-side)
    const res = await fetch(BACKEND_API_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch product from backend" },
        { status: 502 }
      );
    }

    const json = await res.json();
    const rawProducts: BackendProduct[] = json.data ?? [];
    const backendProduct = rawProducts.find((bp) => bp.id === id);

    if (!backendProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const product = mapBackendProduct(backendProduct);

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
