import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages | VoltHub",
  description:
    "Explore featured installation and charging package options from VoltHub.",
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
