import LayoutContainer from "@/components/layout/LayoutContainer";
import Link from "next/link";

export default function SolarCtaSection() {
  return (
    <section className="py-20 bg-linear-to-br from-green-600 to-green-800 text-white">
      <LayoutContainer>
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Go Solar?</h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Get a free consultation and quote for your solar energy installation
            project
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact?interest=solar-installation-quote&subject=quote"
              className="bg-secondary text-black px-10 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition-colors whitespace-nowrap"
            >
              Get Free Quote
            </Link>
            <Link
              href="/services"
              className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors whitespace-nowrap"
            >
              View All Services
            </Link>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
