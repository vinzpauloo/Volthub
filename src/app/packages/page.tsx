import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages | VoltHub",
  description: "Explore featured installation and charging package options from VoltHub.",
};

const packages = [
  {
    name: "Installation Without Enclosure Box",
    price: "₱18,999",
    description: "A clean, efficient setup for straightforward indoor installations.",
    includes: [
      { label: "Professional mounting labor", icon: "🔧" },
      { label: "Standard circuit & conduit", icon: "⚡" },
      { label: "Basic safety testing", icon: "🛡️" },
    ],
    accent: "from-emerald-500 to-teal-600",
    featured: false,
    image: "/Packages/package1.png",
  },
  {
    name: "Installation Standard Enclosure Box",
    price: "₱27,799",
    description: "A more protected setup with a standard enclosure for added durability and neatness.",
    includes: [
      { label: "Connector set", icon: "🔌" },
      { label: "Wiring", icon: "🧵" },
      { label: "Mounting hardware", icon: "🔩" },
      { label: "Enclosure box", icon: "📦" },
      { label: "Safety protection", icon: "🛡️" },
    ],
    accent: "from-sky-500 to-cyan-600",
    featured: false,
    image: "/Packages/package2.png",
  },
  {
    name: "With AC Charger 7kW / Without Enclosure Box",
    price: "₱38,999",
    description: "Includes a 7kW AC charger and a streamlined installation suited for faster deployment.",
    includes: [
      { label: "7kW AC charger", icon: "⚡" },
      { label: "Connector set", icon: "🔌" },
      { label: "Wiring", icon: "🧵" },
      { label: "Mounting hardware", icon: "🔩" },
      { label: "Safety protection", icon: "🛡️" },
    ],
    accent: "from-violet-500 to-fuchsia-600",
    featured: true,
    image: "/Packages/package3.png",
  },
  {
    name: "With AC Charger 7kW / With Enclosure Box",
    price: "₱47,799",
    description: "A premium package with the 7kW charger and enclosed setup for long-term performance.",
    includes: [
      { label: "7kW AC charger", icon: "⚡" },
      { label: "Connector set", icon: "🔌" },
      { label: "Wiring", icon: "🧵" },
      { label: "Mounting hardware", icon: "🔩" },
      { label: "Enclosure box", icon: "📦" },
      { label: "Safety protection", icon: "🛡️" },
    ],
    accent: "from-amber-500 to-orange-600",
    featured: false,
    image: "/Packages/package4.png",
  },
];

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-background bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_45%)] dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.06),_transparent_45%)] pt-32 pb-20">
      <section className="w-full mx-auto flex max-w-[80%] flex-col gap-10 px-6 lg:px-12">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-300">
            Installation Packages
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            EV Charger Installation Packages
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
            From basic mounting to fully equipped bundles with charger and enclosure — choose the package that fits your property and charging needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item) => (
            <article
              key={item.name}
              className={`flex flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                item.featured ? "ring-2 ring-emerald-500/30" : ""
              }`}
            >
              <div
                className="relative min-h-[180px] overflow-hidden p-4 sm:min-h-[200px]"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.12) 0%, rgba(10,10,10,0.8) 100%), url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                      {item.featured ? 'Popular' : 'Installation'}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white ${item.featured ? 'bg-emerald-500/80' : 'bg-black/30'}`}>
                      {item.featured ? 'Best Value' : 'Includes Hardware'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className={`mb-3 h-0.5 w-full rounded-full bg-linear-to-r ${item.accent}`} />

                <div className="rounded-2xl border border-border bg-muted/50 p-4">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{item.name}</h2>
                  <p className="mt-2 text-sm leading-5 text-muted-foreground">{item.description}</p>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    What&apos;s included
                  </p>
                  <div className="mt-2 flex flex-col gap-3">
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {item.includes.map((include) => (
                        <li key={include.label} className="flex items-start gap-2">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm text-emerald-600">
                            {include.icon}
                          </span>
                          <span>{include.label}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-slate-900 dark:text-white">Package overview</p>
                      <p className="mt-2 leading-6">
                        {item.description}
                      </p>
                      <p className="mt-2 text-[11px] leading-5 text-emerald-700 dark:text-emerald-400">
                        Note: Additional charges may apply for remote locations or site conditions that require extra travel or setup work.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-border/60 pt-3">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Starting at</p>
                      <p className="text-2xl font-semibold text-slate-900 dark:text-white">{item.price}</p>
                    </div>
                    <Link
                      href="/contact?subject=installation-service"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-700"
                    >
                      Request a Quotation
                    </Link>
                  </div>
                </div>

             
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                Need a tailored solution for your property or project?
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Tell us about your site requirements and we’ll help you choose the best package for installation, charging capacity, and enclosure needs.
              </p>
            </div>
            <Link
              href="/contact?subject=package-quote"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-700"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
