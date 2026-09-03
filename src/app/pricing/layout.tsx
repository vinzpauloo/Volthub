import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  alternates: { canonical: "/pricing" },
  description:
    "Contact VoltHub for custom pricing on EV charging, solar installation, and energy storage solutions tailored to your needs.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
