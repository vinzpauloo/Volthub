type OpenAIPixelEventData = {
  type: "customer_action";
};

type OpenAIPixelQueue = (
  command: "measure",
  eventName: "lead_created",
  eventData: OpenAIPixelEventData,
) => void;

declare global {
  interface Window {
    oaiq?: OpenAIPixelQueue;
  }
}

export function trackOpenAILeadCreated(): void {
  if (typeof window === "undefined" || typeof window.oaiq !== "function") {
    return;
  }

  window.oaiq("measure", "lead_created", {
    type: "customer_action",
  });
}

