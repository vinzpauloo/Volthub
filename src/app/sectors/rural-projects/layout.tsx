import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.volthub.ph";

export const metadata: Metadata = {
  title: "Rural Projects Energy Solutions",
  description: "Solar street lighting, off-grid power systems and EV charging for remote and island communities in the Philippines.",
  keywords: [
    "rural energy solutions",
    "off-grid power systems",
    "rural solar",
    "remote area power",
    "rural electrification",
    "off-grid energy storage",
    "rural community power",
    "remote location energy",
    "VoltHub rural",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/sectors/rural-projects`,
    siteName: "VoltHub Energy",
    title: "Rural Projects Energy Solutions",
    description: "Solar street lighting, off-grid power systems and EV charging for remote and island communities in the Philippines.",
    images: [
      {
        url: "/HomeBanner/banner1.png",
        width: 1200,
        height: 630,
        alt: "VoltHub Rural Projects Energy Solutions - Off-Grid Power for Remote Areas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rural Projects Energy Solutions",
    description: "Bringing reliable power to rural communities. Solar street lighting, off-grid power systems, and EV charging for remote areas.",
    images: ["/HomeBanner/banner1.png"],
    creator: "@VoltHubEnergy",
  },
  alternates: {
    canonical: `${siteUrl}/sectors/rural-projects`,
  },
};

export default function RuralProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

