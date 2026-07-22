declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      target: string | Date,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function trackGoogleAdsConversion({
  sendTo,
  value,
  currency = "PHP",
}: {
  sendTo?: string;
  value?: number;
  currency?: string;
}) {
  if (!sendTo || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "conversion", {
    send_to: sendTo,
    ...(typeof value === "number" ? { value } : {}),
    currency,
  });
}

export {};
