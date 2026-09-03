import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Solar & EV Charging Blog Philippines", template: "%s | VoltHub" },
  description: "Guides on EV charging, solar and energy storage in the Philippines from the VoltHub team.",
  keywords: [
    "energy storage blog",
    "EV charging news",
    "solar energy insights",
    "commercial energy solutions",
    "smart grid technology",
    "renewable energy articles",
    "energy efficiency guides",
    "VoltHub blog",
  ],
  openGraph: {
    title: "Solar & EV Charging Blog Philippines",
    description: "Guides on EV charging, solar and energy storage in the Philippines from the VoltHub team.",
    type: "website",
    url: "/blog",
    siteName: "VoltHub Energy",
    images: [
      {
        url: "/Blog/blogtitle.png",
        width: 1200,
        height: 630,
        alt: "VoltHub Blog - Energy Storage & EV Charging Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar & EV Charging Blog Philippines",
    description: "Guides on EV charging, solar and energy storage in the Philippines from the VoltHub team.",
    images: ["/Blog/blogtitle.png"],
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

