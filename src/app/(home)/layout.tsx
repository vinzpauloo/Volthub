import type { Metadata } from "next";
import { faqs } from "./components/homeData";
import { jsonLd, seo } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volthub.ph";

export const metadata: Metadata = {
  title: "Solar, Battery & EV Charging Philippines",
  description: "Cut power bills with solar, battery storage and EV charging across the Philippines. Custom systems for homes, businesses and off-grid sites.",
  keywords: [
    "energy storage",
    "EV charging",
    "EV charger installation Philippines",
    "solar energy",
    "solar panel installation Philippines",
    "battery storage",
    "renewable energy",
    "commercial energy solutions",
    "residential solar",
    "smart grid",
    "Philippines energy",
    "VoltHub",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "VoltHub Energy",
    title: "Solar, Battery & EV Charging Philippines | VoltHub",
    description: "Cut power bills with solar, battery storage and EV charging across the Philippines. Custom systems for homes, businesses and off-grid sites.",
    images: [
      {
        url: "/HomeBanner/banner1.png",
        width: 1200,
        height: 630,
        alt: "VoltHub solar, battery storage and EV charging solutions in the Philippines",
      },
      {
        url: "/volthub-logo-black-text.png",
        width: 1200,
        height: 630,
        alt: "VoltHub Energy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar, Battery & EV Charging Philippines | VoltHub",
    description: "Cut power bills with solar, battery storage and EV charging across the Philippines.",
    images: ["/HomeBanner/banner1.png"],
    creator: "@VoltHubEnergy",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${seo.siteUrl}/#website`,
    url: seo.siteUrl,
    name: "VoltHub",
    publisher: {
      "@id": `${seo.siteUrl}/#organization`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }}
      />
      {children}
    </>
  );
}
