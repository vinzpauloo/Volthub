import type { Metadata } from "next";
import { faqJsonLd, jsonLd } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.volthub.ph";
const pageUrl = `${siteUrl}/app`;
const description =
  "Find connected VoltHub EV charging stations in the Philippines, check availability, start by QR or RFID, and pay with GCash, card, or wallet on iOS and Android.";

const appFaqs = [
  {
    question: "What is the VoltHub EV charging app?",
    answer:
      "The VoltHub app is a free iOS and Android app for finding VoltHub-connected charging stations, checking connector availability, starting a charging session by QR code or RFID, monitoring the session, paying, and reviewing charging history.",
  },
  {
    question: "Does the VoltHub app show every EV charging station in the Philippines?",
    answer:
      "No. The map shows stations connected to the VoltHub platform as they become available. For the current network, locations, connector types, power, and availability, check the live map in the app or on this page before travelling.",
  },
  {
    question: "How do I start and pay for charging?",
    answer:
      "At a connected station, plug in the compatible connector, scan the QR code in the app or use a registered RFID card, confirm the connector and displayed price, then pay with the available wallet, GCash, or card option.",
  },
  {
    question: "Can VoltHub connect a charger supplied by another company?",
    answer:
      "Yes. If the charger supports OCPP, VoltHub can assess it for connection to the app and operator platform. Final onboarding requires compatibility testing of the charger's OCPP version, endpoint and security settings, meter values, remote commands, and firmware behavior.",
  },
  {
    question: "What does VoltHub provide to charging-station operators?",
    answer:
      "VoltHub can provide app listing, driver payments, QR or RFID session access, monitoring, pricing controls, alerts, reporting, driver support, and monthly revenue settlement. Site owners can use VoltHub-supplied equipment or request integration of an existing OCPP charger.",
  },
];

export const metadata: Metadata = {
  title: "EV Charging App Philippines: Find Stations | VoltHub",
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
    title: "EV Charging App Philippines: Find Stations | VoltHub",
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
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(appFaqs)) }}
      />
      {children}
    </>
  );
}
