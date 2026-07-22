const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volthub.ph";

export const seo = {
  siteUrl,
  companyName: "VoltHub Electric Power Generation Services Corporation",
  brandName: "VoltHub",
  phone: "+63 968 232 3704",
  email: "sales@volthub.ph",
  streetAddress: "High Street South Corporate Plaza Tower 2, 11th Ave",
  addressLocality: "Bonifacio Global City, Taguig",
  addressCountry: "PH",
  logo: `${siteUrl}/volthub-logo-black-text.png`,
};

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${siteUrl}/#organization`,
  name: seo.companyName,
  alternateName: seo.brandName,
  url: siteUrl,
  logo: seo.logo,
  image: `${siteUrl}/HomeBanner/banner1.png`,
  telephone: seo.phone,
  email: seo.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: seo.streetAddress,
    addressLocality: seo.addressLocality,
    addressCountry: seo.addressCountry,
  },
  areaServed: {
    "@type": "Country",
    name: "Philippines",
  },
  sameAs: [
    "https://www.linkedin.com",
    "https://www.facebook.com",
    "https://www.instagram.com",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "EV charger installation",
        areaServed: "Philippines",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Solar panel installation",
        areaServed: "Philippines",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Battery energy storage systems",
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

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/#app`,
  name: "VoltHub",
  applicationCategory: "NavigationApplication",
  operatingSystem: "Android",
  description:
    "Take control of your EV charging experience with the VoltHub mobile app. Find fast chargers near you, start charging sessions, track your wallet, and manage your vehicles — all from one app.",
  url: "https://play.google.com/store/apps/details?id=ph.volthub.app&hl=en",
  downloadUrl: "https://play.google.com/store/apps/details?id=ph.volthub.app&hl=en",
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
}: {
  name: string;
  description: string;
  url: string;
  image: string;
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
    serviceType: name,
  };
}
