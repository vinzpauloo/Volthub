import type { Metadata } from "next";
import { breadcrumbJsonLd, faqJsonLd, jsonLd, serviceJsonLd } from "@/lib/seo";
import { csmsFaqs } from "./components/csmsData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.volthub.ph";
const pageUrl = `${siteUrl}/services/ev-charging-management-software-philippines`;
const title = "EV Charging Management Software & CSMS Philippines";
const description =
  "VoltHub CSMS for Philippine charging-station operators: connect tested OCPP chargers, offer app or no-download H5 charging, manage payments, pricing, monitoring, reports, and settlement.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "EV charging management software Philippines",
    "CSMS Philippines",
    "charging station management system Philippines",
    "OCPP backend Philippines",
    "EV charger software Philippines",
    "EV charging operator app",
    "OCPP charger integration",
    "charge point management system",
    "VoltHub CSMS",
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
        alt: "VoltHub EV charging management software and OCPP station operations in the Philippines",
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

export default function ChargingSoftwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = serviceJsonLd({
    name: "EV Charging Management Software and CSMS",
    serviceType: "EV charging station management software and OCPP integration",
    description,
    url: pageUrl,
    image: `${siteUrl}/Sector/evcharging.jpeg`,
    offers: [
      {
        name: "App-only OCPP Charger Operation Plan",
        price: "2000",
        unitText: "per station per month",
      },
      {
        name: "Charger and App Operation Plan",
        price: "1500",
        unitText: "per station per month",
      },
    ],
  });

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "Services", url: `${siteUrl}/services` },
    { name: "EV Charging Management Software", url: pageUrl },
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
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd([...csmsFaqs])) }}
      />
      {children}
    </>
  );
}
