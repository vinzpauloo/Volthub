import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Location Partner | VoltHub",
  description:
    "Host an EV charging station at your location. Earn passive income, attract more customers, and support sustainable transportation with VoltHub.",
  keywords: [
    "EV charging partner",
    "location partner",
    "host EV charger",
    "VoltHub partner program",
  ],
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
