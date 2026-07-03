import Image from "next/image";

export default function MissionVisionSection() {
  return (
    <section className="py-8 md:py-12">
    

      {/* ── Mission (left) + Vision (right) with images ── */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">

        {/* Mission */}
        <div className="relative w-full aspect-[4/3]  overflow-hidden group">
          <Image
            src="/About/Mission.png"
            alt="VoltHub mission — delivering clean energy today"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-200 mb-2">
              Our Mission — What We Do Today
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed">
              We deliver turnkey EV charging and solar energy systems to
              businesses, property developers, and homeowners across the
              Philippines — handling everything from engineering and
              installation to ongoing maintenance. Every project we ship
              today makes one more site energy-independent.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="relative w-full aspect-[4/3]  overflow-hidden group">
          <Image
            src="/About/Vission.png"
            alt="VoltHub vision — building the future of clean energy in the Philippines"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-200 mb-2">
              Our Vision — The Future We&apos;re Building
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed">
              A Philippines where every major parking lot is a charging hub,
              every commercial rooftop is a power plant, and no business loses
              revenue to a blackout. By 2030, we aim to be the country&apos;s most
              trusted clean-energy infrastructure partner — powering the fleet
              electrification wave with solar-backed, grid-resilient charging
              networks from Luzon to Mindanao.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
