import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatSupport from "@/components/common/ChatSupport";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volthubs.netlify.app";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MHLCDHH4";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VoltHub - Smart Energy Storage & EV Charging Solutions",
    template: "%s | VoltHub",
  },
  description: "Cut energy costs by up to 40% with VoltHub's next-generation energy storage and EV charging solutions. Commercial and residential solar, battery storage, and smart grid integration across the Philippines.",
  keywords: [
    "energy storage",
    "EV charging",
    "solar energy",
    "battery storage",
    "renewable energy",
    "commercial energy solutions",
    "residential solar",
    "smart grid",
    "Philippines energy",
    "VoltHub",
  ],
  authors: [{ name: "VoltHub Energy" }],
  creator: "VoltHub Energy",
  publisher: "VoltHub Energy",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "VoltHub Energy",
    title: "VoltHub - Smart Energy Storage & EV Charging Solutions",
    description: "Cut energy costs by up to 40% with VoltHub's next-generation energy storage and EV charging solutions. Commercial and residential solar, battery storage, and smart grid integration.",
    images: [
      {
        url: "/HomeBanner/banner1.png",
        width: 1200,
        height: 630,
        alt: "VoltHub Energy - Smart Energy Storage & EV Charging Solutions",
      },
      {
        url: "/green-volthub-logo-transparent.png",
        width: 1200,
        height: 630,
        alt: "VoltHub Energy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoltHub - Smart Energy Storage & EV Charging Solutions",
    description: "Cut energy costs by up to 40% with VoltHub's next-generation energy storage and EV charging solutions.",
    images: ["/HomeBanner/banner1.png"],
    creator: "@VoltHubEnergy",
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning={true}>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          orbitron.variable,
          "antialiased"
        )}
      >
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
          <ChatSupport />
        </ThemeProvider>
      </body>
    </html>
  );
}
