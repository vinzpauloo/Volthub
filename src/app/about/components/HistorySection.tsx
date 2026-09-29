import Image from "next/image";
import { ourFocus } from "./data";

export default function HistorySection() {
  return (
    <section className="py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">

        {/* ── Left: Image ── */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src="/About/about_1.jpg"
            alt="VoltHub — building the future of clean energy"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* ── Right: History + Our Focus ── */}
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Our History
          </h3>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
            VoltHub was incorporated on January 17, 2025, in Taguig City,
            Philippines, with a focus on energy infrastructure for the
            country&apos;s transition to electric mobility.
          </p>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
            Today, our focus is on helping property owners and businesses
            establish and operate EV charging stations. We bring together
            charger installation, app-based station management, and ongoing
            operational support. Solar carports are available as a
            complementary solution, adding shade and on-site solar generation
            to charging locations.
          </p>

          <h4 className="text-lg font-bold text-gray-900 mb-3">
            Our Focus
          </h4>
          <ul className="space-y-2.5">
            {ourFocus.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm md:text-base leading-relaxed">
                <span className="text-primary mt-1 shrink-0">▸</span>
                <span>
                  <strong className="text-gray-900">{item.title}:</strong>
                  {" "}{item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
