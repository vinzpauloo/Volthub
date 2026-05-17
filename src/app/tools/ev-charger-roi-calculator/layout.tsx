import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EV Charging Franchise ROI Calculator",
  description:
    "Plan your EV charging station franchise: charger CAPEX, monthly profit, payback, and 10-year IRR with optional solar + storage. Based on official VoltHub quotation prices.",
  alternates: {
    canonical: "/tools/ev-charger-roi-calculator",
  },
  openGraph: {
    type: "website",
    url: "/tools/ev-charger-roi-calculator",
    title: "EV Charging Franchise ROI Calculator | VoltHub",
    description:
      "Plan your EV charging station franchise: charger CAPEX, monthly profit, payback, and 10-year IRR with optional solar + storage.",
    images: [
      {
        url: "/Product/evpb.jpg",
        width: 1200,
        height: 630,
        alt: "VoltHub EV Charging Franchise ROI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EV Charging Franchise ROI Calculator | VoltHub",
    description:
      "Plan your EV charging station franchise CAPEX, payback, and IRR with VoltHub's interactive calculator.",
    images: ["/Product/evpb.jpg"],
  },
};

export default function EvChargerRoiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
