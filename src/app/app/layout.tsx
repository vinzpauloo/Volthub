import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.volthub.ph";
const pageUrl = `${siteUrl}/app`;
const description =
  "Find VoltHub charging stations, start a session by QR or RFID and pay with GCash, card or wallet. Free on iOS and Android.";

export const metadata: Metadata = {
  title: "VoltHub EV Charging App",
  description,
  keywords: [
    "VoltHub app",
    "EV charging app Philippines",
    "find EV charger",
    "fast charger near me",
    "EV charging guide",
  ],
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: pageUrl,
    siteName: "VoltHub",
    title: "VoltHub EV Charging App",
    description,
    images: [
      {
        url: "/EVpage/AppScreen/Home.png",
        width: 1200,
        height: 630,
        alt: "VoltHub EV charging app home screen",
      },
    ],
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
