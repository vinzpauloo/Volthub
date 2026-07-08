import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import ProductDetail from "../components/ProductDetail";
import {
  type Product,
  type BackendProduct,
  mapBackendProduct,
} from "../components/productData";
import BackToTopButton from "@/components/common/BackToTopButton";

const BACKEND_URL = "https://volthub-admin-one.vercel.app/api/public/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const res = await fetch(BACKEND_URL, { cache: "no-store" });
    if (!res.ok) return undefined;
    const json = await res.json();
    const raw: BackendProduct[] = json.data ?? [];
    const match = raw.find((bp) => bp.id === id);
    return match ? mapBackendProduct(match) : undefined;
  } catch {
    return undefined;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volthub.ph";
  const productUrl = `${siteUrl}/products/${id}`;

  if (!product) {
    return {
      title: "Product Not Found - VoltHub",
      description: "The requested product could not be found.",
    };
  }

  const productImage = product.image?.startsWith("http")
    ? product.image
    : product.image?.startsWith("/")
    ? `${siteUrl}${product.image}`
    : `${siteUrl}/HomeBanner/banner1.png`;

  // [BACKEND-TODO] — Restore product.images gallery fallback logic
  // : product.images?.[0]?.startsWith("http")
  // ? product.images[0]
  // : product.images?.[0]?.startsWith("/")
  // ? `${siteUrl}${product.images[0]}`

  const description = product.description ||
    `Learn more about ${product.name} from VoltHub. ${product.category} energy solution with specifications and pricing.`;

  return {
    title: `${product.name} - VoltHub`,
    description,
    keywords: [
      product.name.toLowerCase(),
      product.category,
      "energy solutions",
      "VoltHub products",
      // [BACKEND-TODO] — Restore product.tag keyword when tag field is re-added
      // ...(product.tag ? [product.tag.toLowerCase()] : []),
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: productUrl,
      siteName: "VoltHub Energy",
      title: `${product.name} - VoltHub`,
      description,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - VoltHub`,
      description,
      images: [productImage],
      creator: "@VoltHubEnergy",
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-slate-50 min-h-screen pt-20 md:pt-28 pb-12 md:pb-20 flex  items-center justify-center">
      <LayoutContainer>
        <ProductDetail product={product} />
        <BackToTopButton />
      </LayoutContainer>
    </main>
  );
}


