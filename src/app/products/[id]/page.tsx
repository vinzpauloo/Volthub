import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import ProductDetail from "../components/ProductDetail";
import {
  type Product,
  type GroupedProduct,
  type BackendProduct,
  type Accessory,
  isGroupedProduct,
  mapBackendProduct,
} from "../components/productData";
import BackToTopButton from "@/components/common/BackToTopButton";

const BACKEND_URL = "https://volthub-admin-one.vercel.app/";

type ProductPageProps = {
  params: Promise<{
    id: string; // This is actually the groupBy value (e.g. "TA-DC-FX")
  }>;
};

type ProductPageData = {
  product: Product;
  variants?: BackendProduct[];
  group?: GroupedProduct;
};

async function getProductData(
  groupBy: string,
): Promise<ProductPageData | undefined> {
  // 1. Fetch the detail endpoint which returns both group + variants
  //    Response: { ok, data: { groupBy, supply, type, connector, variants: [...] } }
  try {
    const detailRes = await fetch(
      `${BACKEND_URL}api/public/products/${groupBy}`,
      { cache: "no-store" },
    );
    if (detailRes.ok) {
      const json = await detailRes.json();
      // Response shape: { ok: true, data: { groupBy, variants: [...], ... } }
      const body = json.data ?? json;
      const rawVariants: BackendProduct[] = body?.variants ?? [];
      if (rawVariants.length > 0) {
        // Use the API group data directly (has supply/type/connector)
        const group: GroupedProduct = {
          groupBy: body.groupBy ?? groupBy,
          name: body.name ?? groupBy,
          description: body.description ?? "",
          category: body.category ?? "",
          image_url: body.image_url ?? "",
          supply: body.supply ?? [],
          type: body.type ?? [],
          connector: body.connector ?? [],
          accessories: (body.accessories as Accessory[]) ?? [],
        };
        const product = mapBackendProduct(rawVariants[0]);
        return { product, variants: rawVariants, group };
      }
    }
  } catch {
    // Fall through to listing-based lookup
  }

  // 2. Fallback: search the main product listing for group info
  const group = await findGroup(groupBy);
  if (!group) return undefined;

  const product: Product = {
    id: group.groupBy,
    name: group.name,
    category: mapGroupedCategory(group.category),
    description: group.description,
    image: group.image_url,
    sku_code: group.groupBy,
  };
  return { product, group };
}

async function findGroup(groupBy: string): Promise<GroupedProduct | undefined> {
  try {
    const res = await fetch(`${BACKEND_URL}api/public/products`, {
      cache: "no-store",
    });
    if (!res.ok) return undefined;
    const json = await res.json();
    const raw = json.data ?? [];
    return raw.find(
      (entry: GroupedProduct | BackendProduct) =>
        isGroupedProduct(entry) && entry.groupBy === groupBy,
    ) as GroupedProduct | undefined;
  } catch {
    return undefined;
  }
}

function mapGroupedCategory(cat: string) {
  switch (cat) {
    case "dc_charger":
    case "ac_charger":
      return "ev-charging" as const;
    default:
      return "all" as const;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getProductData(id);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volthub.ph";
  const productUrl = `${siteUrl}/products/${id}`;

  if (!data) {
    return {
      title: "Product Not Found - VoltHub",
      description: "The requested product could not be found.",
    };
  }

  const { product } = data;
  const productImage = product.image?.startsWith("http")
    ? product.image
    : product.image?.startsWith("/")
      ? `${siteUrl}${product.image}`
      : `${siteUrl}/HomeBanner/banner1.png`;

  const description =
    product.description ||
    `Learn more about ${product.name} from VoltHub.`;

  return {
    title: `${product.name} - VoltHub`,
    description,
    keywords: [
      product.name.toLowerCase(),
      product.category,
      "energy solutions",
      "VoltHub products",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: productUrl,
      siteName: "VoltHub Energy",
      title: `${product.name} - VoltHub`,
      description,
      images: [{ url: productImage, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - VoltHub`,
      description,
      images: [productImage],
      creator: "@VoltHubEnergy",
    },
    alternates: { canonical: productUrl },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const data = await getProductData(id);

  if (!data) {
    notFound();
  }

  const { product, variants } = data;

  return (
    <main className="bg-slate-50 min-h-screen pt-20 md:pt-28 pb-12 md:pb-20 flex items-center justify-center">
      <LayoutContainer>
        <ProductDetail product={product} group={data.group} variants={variants} />
        <BackToTopButton />
      </LayoutContainer>
    </main>
  );
}
