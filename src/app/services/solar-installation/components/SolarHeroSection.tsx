import LayoutContainer from "@/components/layout/LayoutContainer";
import Link from "next/link";

export default function SolarHeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Sector/solarbg1.jpg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-green-900/90 via-green-800/70 to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <LayoutContainer className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-orbitron">
            <span className="gradient-text">Solar Panel Installation in the Philippines</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed max-w-4xl mx-auto">
            Turn-key solar systems for homes and businesses, including site
            surveys, system sizing, battery storage, off-grid design, and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="bg-linear-to-r from-secondary to-yellow-400 text-black px-10 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap transform hover:scale-105 glow-effect"
            >
              Get Free Quote
            </Link>
            <Link
              href="/services"
              className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap transform hover:scale-105 hover:bg-white/30"
            >
              View All Services
            </Link>
          </div>
        </LayoutContainer>
      </div>
    </section>
  );
}
