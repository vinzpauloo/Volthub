import type { Metadata } from "next";
import { faqJsonLd, jsonLd } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.volthub.ph";
const pageUrl = `${siteUrl}/app`;
const description =
  "Find Philippine EV charging stations recorded by the DOE. At VoltHub-connected stations, use the app or no-download H5 web flow to start, pay, and monitor charging.";

const appFaqs = [
  {
    question: "What is the VoltHub EV charging app?",
    answer:
      "The VoltHub app is a free iOS and Android app for finding Philippine EV charging stations recorded by the DOE. At stations connected to the VoltHub platform, drivers can also check live availability, start by QR code or RFID, monitor the session, pay, and review charging history.",
  },
  {
    question: "Which charging stations are shown in the VoltHub app?",
    answer:
      "The VoltHub app displays EV charging stations recorded in the DOE EV Industry Portal, including stations operated by other providers. Those third-party stations are shown for discovery; live control, session start, payment, and real-time status are available only when a station is connected to the VoltHub platform.",
  },
  {
    question: "How do I start and pay for charging?",
    answer:
      "At a VoltHub-connected station, plug in the compatible connector, scan the QR code in the app or use a registered RFID card, confirm the connector and displayed price, then pay with the available wallet, GCash, or card option. DOE-listed stations that are not connected to VoltHub cannot be controlled through the app.",
  },
  {
    question: "Do I have to download the VoltHub app to charge?",
    answer:
      "No. At supported VoltHub-connected stations, drivers can use VoltHub's H5 browser-based charging flow without downloading the mobile app. App and H5 functions depend on the station's VoltHub integration and enabled payment options.",
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
