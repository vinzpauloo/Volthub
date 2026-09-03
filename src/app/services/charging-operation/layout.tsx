import type { Metadata } from "next";
import { breadcrumbJsonLd, faqJsonLd, jsonLd, serviceJsonLd } from "@/lib/seo";
import { operationFaqs, operationPlans } from "./components/operationData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.volthub.ph";
const pageUrl = `${siteUrl}/services/charging-operation`;
const title = "EV Charging Operation Service Philippines";
const description =
  "Own the charger, let VoltHub run the business. Driver app, GCash and card payments, OCPP monitoring, revenue dashboard and settlement from ₱1,500 per station per month.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "EV charging operation",
    "charge point operator Philippines",
    "EV charging station management",
    "EV charging app Philippines",
    "EV charging revenue share",
    "OCPP CSMS Philippines",
    "VoltHub app",
  ],
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: pageUrl,
    siteName: "VoltHub",
    title: `${title} | VoltHub`,
    description,
    images: [
      {
        url: "/Sector/evcharging.jpeg",
        width: 1200,
        height: 630,
        alt: "VoltHub operates EV charging stations for site owners in the Philippines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | VoltHub`,
    description,
    images: ["/Sector/evcharging.jpeg"],
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default function ChargingOperationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = serviceJsonLd({
    name: "EV Charging Operation Service",
    serviceType: "EV charging station operation and management",
    description,
    url: pageUrl,
    image: `${siteUrl}/Sector/evcharging.jpeg`,
    offers: operationPlans
      .filter((plan) => plan.priceValue)
      .map((plan) => ({
        name: plan.name,
        price: plan.priceValue as string,
        unitText: "per station per month",
      })),
  });

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "Services", url: `${siteUrl}/services` },
    { name: "Charging Operation", url: pageUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(operationFaqs)) }}
      />
      {children}
    </>
  );
}
