import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.volthub.ph";

export const metadata: Metadata = {
  title: { default: "Energy Solutions by Sector", template: "%s | VoltHub" },
  description:
    "Solar, storage and EV charging for residential, commercial, industrial, rural and smart-city projects in the Philippines.",
  keywords: [
    "residential energy solutions",
    "commercial energy solutions",
    "industrial energy solutions",
    "energy storage by sector",
    "EV charging by sector",
    "solar solutions by sector",
    "smart cities energy",
    "rural energy projects",
    "VoltHub sectors",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/sectors`,
    siteName: "VoltHub Energy",
    title: "Energy Solutions by Sector",
    description:
      "Solar, storage and EV charging for residential, commercial, industrial, rural and smart-city projects in the Philippines.",
    images: [
      {
        url: "/HomeBanner/banner1.png",
        width: 1200,
        height: 630,
        alt: "VoltHub Energy Solutions by Sector - Residential, Commercial, Industrial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Energy Solutions by Sector",
    description:
      "Solar, storage and EV charging for residential, commercial, industrial, rural and smart-city projects in the Philippines.",
    images: ["/HomeBanner/banner1.png"],
    creator: "@VoltHubEnergy",
  },
  alternates: {
    canonical: `${siteUrl}/sectors`,
  },
};

export default function SectorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

