const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.volthub.ph";

export const seo = {
  siteUrl,
  companyName: "VoltHub Electronic Power Generation Services Corporation",
  brandName: "VoltHub",
  phone: "+63 968 219 7035",
  email: "sales@volthub.ph",
  streetAddress:
    "Unit 2503, High Street South Corporate Plaza Tower 2, 26th Street corner 11th Avenue, Fort Bonifacio",
  addressLocality: "Taguig City",
  addressRegion: "Metro Manila",
  postalCode: "1635",
  addressCountry: "PH",
  logo: `${siteUrl}/volthub-logo-black-text.png`,
  playStoreUrl: "https://play.google.com/store/apps/details?id=ph.volthub.app",
  appStoreUrl: "https://apps.apple.com/ph/app/volthub-ph/id6795752536",
  instagramUrl: "https://www.instagram.com/volthubph/",
};

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${siteUrl}/#organization`,
  name: seo.companyName,
  alternateName: [seo.brandName, "VoltHub.PH"],
  legalName: seo.companyName,
  url: siteUrl,
  logo: seo.logo,
  image: `${siteUrl}/HomeBanner/banner1.png`,
  description:
    "VoltHub installs EV chargers and rooftop solar in the Philippines and operates EV charging stations for site owners through the VoltHub app and operator platform.",
  foundingDate: "2025-01-17",
  founder: [
    { "@type": "Person", name: "Vincent Paul Lim Oo", jobTitle: "President & CEO" },
    { "@type": "Person", name: "Maria Evita R. Igot", jobTitle: "Vice President & COO" },
    { "@type": "Person", name: "David Zhang" },
  ],
  telephone: seo.phone,
  email: seo.email,
  priceRange: "₱₱",
  currenciesAccepted: "PHP",
  address: {
    "@type": "PostalAddress",
    streetAddress: seo.streetAddress,
    addressLocality: seo.addressLocality,
    addressRegion: seo.addressRegion,
    postalCode: seo.postalCode,
    addressCountry: seo.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.5478,
    longitude: 121.0507,
  },
  areaServed: [
    { "@type": "Country", name: "Philippines" },
    { "@type": "AdministrativeArea", name: "Metro Manila" },
  ],
  sameAs: [seo.instagramUrl, seo.playStoreUrl, seo.appStoreUrl],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Business registration",
      name: "SEC Registration No. 2025010184535-18",
    },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "EV charging station operation and management (CPO service)",
        serviceType: "EV charging operation",
        description:
          "VoltHub operates EV charging stations for site owners: driver app, payments, OCPP monitoring, pricing, revenue dashboard, settlement and support.",
        url: `${siteUrl}/services/charging-operation`,
        areaServed: "Philippines",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "EV charger installation",
        serviceType: "EV charger installation",
        url: `${siteUrl}/services/ev-charging`,
        areaServed: "Philippines",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Solar panel installation",
        serviceType: "Solar installation",
        url: `${siteUrl}/services/solar-installation`,
        areaServed: "Philippines",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Battery energy storage systems",
        serviceType: "Energy storage installation",
        areaServed: "Philippines",
      },
    },
  ],
};

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
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
}

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/#app`,
  name: "VoltHub",
  applicationCategory: "NavigationApplication",
  operatingSystem: ["Android", "iOS"],
  description:
    "Take control of your EV charging experience with the VoltHub mobile app. Find fast chargers near you, start charging sessions, track your wallet, and manage your vehicles — all from one app.",
  url: `${siteUrl}/app`,
  downloadUrl: [seo.playStoreUrl, seo.appStoreUrl],
  installUrl: [seo.playStoreUrl, seo.appStoreUrl],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "PHP",
  },
  author: {
    "@id": `${siteUrl}/#organization`,
  },
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  screenshot: [
    `${siteUrl}/EVpage/AppScreen/Home.png`,
    `${siteUrl}/EVpage/AppScreen/Vehicle.png`,
    `${siteUrl}/EVpage/AppScreen/Wallet.png`,
  ],
};

export function serviceJsonLd({
  name,
  description,
  url,
  image,
  serviceType,
  offers,
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  serviceType?: string;
  offers?: Array<{ name: string; price: string; unitText: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    image,
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Philippines",
    },
    serviceType: serviceType ?? name,
    ...(offers
      ? {
          offers: offers.map((offer) => ({
            "@type": "Offer",
            name: offer.name,
            price: offer.price,
            priceCurrency: "PHP",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: offer.price,
              priceCurrency: "PHP",
              unitText: offer.unitText,
            },
            url,
          })),
        }
      : {}),
  };
}
