import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EV Charging | VoltHub",
  description:
    "Download the VoltHub app, learn how to charge your EV, find fast chargers near you, and explore our EV charging learning hub.",
  keywords: [
    "EV charging",
    "electric vehicle charging",
    "fast charger",
    "EV charging guide",
    "VoltHub app",
    "find EV charger",
  ],
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
