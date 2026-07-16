import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLd, serviceJsonLd } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volthub.ph";
const pageUrl = `${siteUrl}/services/solar-installation`;
const description =
  "Turn-key solar panel installation in the Philippines for homes and businesses. Site-specific sizing, storage and off-grid systems. Book a free site survey.";

export const metadata: Metadata = {
  title: "Solar Panel Installation Philippines",
  description,
  keywords: [
    "solar installation",
    "solar panel installation",
    "solar street lights",
    "solar energy systems",
    "off-grid solar",
    "solar power installation",
    "solar system sizing",
    "VoltHub solar",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: pageUrl,
    siteName: "VoltHub Energy",
    title: "Solar Panel Installation Philippines | VoltHub",
    description,
    images: [
      {
        url: "/Sector/solarbg1.jpg",
        width: 1200,
        height: 630,
        alt: "VoltHub solar panel installation services in the Philippines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Panel Installation Philippines | VoltHub",
    description,
    images: ["/Sector/solarbg1.jpg"],
    creator: "@VoltHubEnergy",
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default function SolarInstallationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = serviceJsonLd({
    name: "Solar Panel Installation Philippines",
    description,
    url: pageUrl,
    image: `${siteUrl}/Sector/solarbg1.jpg`,
  });

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "Services", url: `${siteUrl}/services` },
    { name: "Solar Installation", url: pageUrl },
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
