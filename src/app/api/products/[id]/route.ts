import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_API_URL ||
  "https://volthub-admin-one.vercel.app";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Proxy to the admin backend detail endpoint which returns group + variants
    // Response: { ok, data: { groupBy, supply, type, connector, variants: [...] } }
    const backendRes = await fetch(
      `${BACKEND_URL}/api/public/products/${id}`,
      {
        cache: "no-store",
        headers: { Accept: "application/json" },
      },
    );

    if (!backendRes.ok) {
      return NextResponse.json(
        { ok: false, error: `Backend returned ${backendRes.status}` },
        { status: backendRes.status },
      );
    }

    const json = await backendRes.json();

    // Pass through the backend response — already has the right shape
    return NextResponse.json(json);
  } catch (error) {
    console.error("Error proxying product variants:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch product variants" },
      { status: 500 },
    );
  }
}
