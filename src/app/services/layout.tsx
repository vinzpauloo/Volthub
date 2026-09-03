import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.volthub.ph";

export const metadata: Metadata = {
  title: { default: "EV Charging & Solar Services Philippines", template: "%s | VoltHub" },
  description: "Charger installation, charging station operation, solar installation, energy storage and maintenance. One team from site survey to monthly settlement.",
  keywords: [
    "energy services",
    "EV charging installation",
    "solar installation",
    "energy system maintenance",
    "energy consultation",
    "commercial energy services",
    "residential energy services",
    "VoltHub services",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/services`,
    siteName: "VoltHub Energy",
    title: "EV Charging & Solar Services Philippines",
    description: "Charger installation, charging station operation, solar installation, energy storage and maintenance. One team from site survey to monthly settlement.",
    images: [
      {
        url: "/HomeBanner/banner1.png",
        width: 1200,
        height: 630,
        alt: "VoltHub Professional Energy Services - EV Charging & Solar Installation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EV Charging & Solar Services Philippines",
    description: "Charger installation, charging station operation, solar installation and energy storage in the Philippines.",
    images: ["/HomeBanner/banner1.png"],
    creator: "@VoltHubEnergy",
  },
  alternates: {
    canonical: `${siteUrl}/services`,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

