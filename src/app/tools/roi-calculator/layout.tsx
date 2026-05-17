import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar + Storage ROI Calculator",
  description:
    "Estimate your solar and battery storage payback, IRR, and 25-year savings using VoltHub's official Philippine quotation prices. Free interactive ROI calculator.",
  alternates: {
    canonical: "/tools/roi-calculator",
  },
  openGraph: {
    type: "website",
    url: "/tools/roi-calculator",
    title: "Solar + Storage ROI Calculator | VoltHub",
    description:
      "Estimate your solar + battery payback, IRR, and 25-year savings with VoltHub's interactive ROI calculator. Based on official Philippine quotation prices.",
    images: [
      {
        url: "/HomeBanner/homebatt.png",
        width: 1200,
        height: 630,
        alt: "VoltHub Solar + Storage ROI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar + Storage ROI Calculator | VoltHub",
    description:
      "Estimate your solar + battery payback, IRR, and 25-year savings with VoltHub's interactive ROI calculator.",
    images: ["/HomeBanner/homebatt.png"],
  },
};

export default function RoiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
