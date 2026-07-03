import Image from "next/image";
import { futureGoals } from "./data";

export default function HistorySection() {
  return (
    <section className="py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">

        {/* ── Left: Image ── */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src="/About/about_1.jpg"
            alt="VoltHub founding team — building the future of clean energy"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* ── Right: History + Future Goals ── */}
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Our History
          </h3>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
            Volthub was incorporated on January 17, 2025 in Taguig City,
            Philippines, by founders David Zhang, Vincent Paul Lim Oo, and
            Atty. Maria Evita R. Igot — combining expertise in energy systems,
            finance, and technology. The idea was born from a shared conviction
            that the Philippines needed serious, homegrown infrastructure for the
            EV transition: solar-backed charging networks, smart energy storage,
            and grid-resilient power systems built for local conditions.
          </p>

          <h4 className="text-lg font-bold text-gray-900 mb-3">
            Future Goals (2026 and beyond)
          </h4>
          <ul className="space-y-2.5">
            {futureGoals.map((goal, i) => (
              <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm md:text-base leading-relaxed">
                <span className="text-primary mt-1 shrink-0">▸</span>
                <span>
                  <strong className="text-gray-900">{goal.title}</strong>
                  {" — "}{goal.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── Founders ── */}
      <div className="mt-14 md:mt-18 pt-10 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Our Founders
        </h3>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { name: "Vincent Paul Lim Oo", role: "President / CEO" },
            { name: "Atty. Maria Evita R. Igot", role: "Vice President / COO" },
            { name: "David Zhang", role: "Director" },
          ].map((founder) => (
            <div key={founder.name} className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400">
                {founder.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <p className="font-bold text-gray-900 text-sm">{founder.name}</p>
              <p className="text-xs text-gray-500">{founder.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
