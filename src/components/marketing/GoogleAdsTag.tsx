import Script from "next/script";

const googleAdsId =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18143858726";

export default function GoogleAdsTag() {
  if (!googleAdsId) return null;

  return (
    <>
      <Script
        id="google-ads-tag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-ads-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${googleAdsId}');
`,
        }}
      />
    </>
  );
}
