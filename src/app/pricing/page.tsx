import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";

export default function PricingPage() {
  return (
    <main className="pt-32 pb-20">
      <LayoutContainer>
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-slate-900">
            Custom Pricing for Your Needs
          </h1>
          <p className="text-lg text-slate-600">
            Every project is unique. Contact our team for a personalized quote
            tailored to your specific requirements.
          </p>
          <Link
            href="/contact?subject=quote"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-lg"
          >
            Request a Quote
          </Link>
        </div>
      </LayoutContainer>
    </main>
  );
}
