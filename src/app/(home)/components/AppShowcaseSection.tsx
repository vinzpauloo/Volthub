import Image from "next/image";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";

const APP_STORE_URL = "https://apps.apple.com/ph/app/volthub-ph/id6795752536";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=ph.volthub.app&hl=en";

const featureGroups = [
  {
    title: "Home",
    description: "Your personalized dashboard and account overview.",
  },
  {
    title: "Find Stations",
    description: "Browse, search, and filter charging stations near you.",
  },
  {
    title: "Charging",
    description: "Start, monitor, and manage your charging sessions.",
  },
  {
    title: "Account",
    description: "Manage your profile, vehicles, payments, and settings.",
  },
];

export default function AppShowcaseSection() {
  return (
    <section className="section-spacing bg-[var(--cr-bg)]">
      <LayoutContainer className="grid gap-10 md:gap-16 md:grid-cols-[0.85fr_1.15fr] items-center">
        <div className="flex justify-center">
          <div className="relative w-[240px] h-[500px] md:w-[260px] md:h-[540px] rounded-[2.4rem] border border-[var(--cr-line-strong)] bg-black p-3 shadow-2xl">
            <div className="relative w-full h-full rounded-[1.9rem] overflow-hidden bg-[var(--cr-bg-elev-2)]">
              <Image
                src="/HomeBanner/volthub-app-home-screen.jpg"
                alt="VoltHub app home screen showing vehicle, wallet balance and nearby charging stations"
                fill
                className="object-cover"
                sizes="260px"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--cr-brand-light)] font-semibold mb-4">
            Mobile App
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
            The VoltHub EV Charging App
          </h2>
          <p className="text-lg text-[var(--cr-fg-dim)] leading-relaxed mb-8 max-w-xl">
            Take control of your EV charging experience with the VoltHub
            mobile app. Available on iOS and Android.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--cr-line)] border border-[var(--cr-line)] rounded-2xl overflow-hidden mb-8">
            {featureGroups.map((feature) => (
              <div key={feature.title} className="bg-[var(--cr-bg-elev)] p-5">
                <h3 className="text-base font-semibold text-white mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--cr-fg-dim)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-[var(--cr-line-strong)] bg-black px-4 py-2.5 text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 12.34c-.03-2.7 2.2-3.99 2.3-4.06-1.25-1.83-3.2-2.08-3.9-2.11-1.66-.17-3.24.98-4.08.98-.84 0-2.13-.96-3.5-.93-1.8.03-3.47 1.05-4.4 2.66-1.87 3.24-.48 8.04 1.35 10.67.9 1.28 1.96 2.72 3.36 2.67 1.35-.05 1.86-.87 3.5-.87 1.63 0 2.1.87 3.53.84 1.46-.02 2.38-1.31 3.27-2.6 1.03-1.49 1.45-2.94 1.47-3.01-.03-.01-2.83-1.09-2.86-4.24z" />
                <path d="M14.53 4.36c.75-.9 1.25-2.16 1.11-3.41-1.08.04-2.38.72-3.15 1.61-.69.79-1.3 2.07-1.14 3.29 1.19.09 2.42-.6 3.18-1.49z" />
              </svg>
              <span className="leading-tight">
                <span className="block text-[9.5px] text-white/70">
                  Download on the
                </span>
                <span className="block text-sm font-bold">App Store</span>
              </span>
            </Link>
            <Link
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-[var(--cr-line-strong)] bg-black px-4 py-2.5 text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1L13 12.5v-.2L3.7 2.2l-.1.1z" />
                <path d="M16.2 15.7l-3.2-3.2v-.2l3.2-3.2 3.6 2.1c1 .6 1 1.6 0 2.2l-3.6 2.3z" opacity={0.7} />
                <path d="M16.2 15.7L13 12.5 3.7 21.8c.4.4 1 .4 1.7 0l10.8-6.1z" />
                <path d="M16.2 9.3L5.4 3.2c-.7-.4-1.3-.4-1.7 0L13 12.5l3.2-3.2z" opacity={0.7} />
              </svg>
              <span className="leading-tight">
                <span className="block text-[9.5px] text-white/70">Get it on</span>
                <span className="block text-sm font-bold">Google Play</span>
              </span>
            </Link>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
