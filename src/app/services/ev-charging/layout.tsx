import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLd, serviceJsonLd } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volthub.ph";
const pageUrl = `${siteUrl}/services/ev-charging`;
const description =
  "AC and ultra-fast DC EV charging stations in the Philippines. Professional installation, network integration and 24/7 support. Request pricing today.";

export const metadata: Metadata = {
  title: "EV Charger Installation Philippines",
  description,
  keywords: [
    "EV charging",
    "electric vehicle charging",
    "EV charging stations",
    "DC fast charging",
    "AC EV chargers",
    "EV charging installation",
    "commercial EV charging",
    "residential EV charging",
    "VoltHub EV charging",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: pageUrl,
    siteName: "VoltHub Energy",
    title: "EV Charger Installation Philippines | VoltHub",
    description,
    images: [
      {
        url: "/Sector/evcharging.jpeg",
        width: 1200,
        height: 630,
        alt: "VoltHub EV charger installation and DC fast charging stations in the Philippines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EV Charger Installation Philippines | VoltHub",
    description,
    images: ["/Sector/evcharging.jpeg"],
    creator: "@VoltHubEnergy",
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default function EVChargingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = serviceJsonLd({
    name: "EV Charger Installation Philippines",
    description,
    url: pageUrl,
    image: `${siteUrl}/Sector/evcharging.jpeg`,
  });

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "Services", url: `${siteUrl}/services` },
    { name: "EV Charging", url: pageUrl },
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
      {children}
    </>
  );
}
