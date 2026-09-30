import Link from "next/link";
import type { Route } from "next";

/**
 * Homepage hero — static asymmetric split (copy left, framed photo right),
 * ported 1:1 from the approved control-room design mockup.
 */
export default function HeroSection() {
  return (
    <header className="cr-hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="cr-hero-watermark"
        src="/HomeBanner/volthub-logo-icon.png"
        alt=""
        aria-hidden="true"
      />
      <div className="cr-hero-grid">
        <div className="cr-hero-copy">
          <div className="cr-eyebrow">
            <span className="cr-rule" />
            EV Charging &amp; Station Management, Philippines
          </div>
          <h2 className="cr-hero-title">
            Build Your Charging Station. <em>Manage It with VoltHub.</em>
          </h2>
          <p className="cr-hero-desc">
            From charger installation to everyday operations, VoltHub brings your
            station together in one app: payments, monitoring, support and monthly
            settlement.
          </p>
          <div className="cr-hero-ctas">
            <Link className="cr-btn cr-btn-lg cr-btn-brand" href={"/contact" as Route}>
              Start Your Charging Project
            </Link>
            <Link className="cr-btn cr-btn-lg cr-btn-line" href={"/app" as Route}>
              Explore the VoltHub App
            </Link>
          </div>
        </div>
        <div className="cr-hero-photo">
          <div
            className="cr-ph"
            role="img"
            aria-label="Solar carport with EV chargers installed by VoltHub"
            style={{
              backgroundImage: "url('/HomeBanner/volthub-solar-carport-hero.jpg')",
              backgroundPosition: "center 68%",
            }}
          />
          <span className="cr-bracket tl" />
          <span className="cr-bracket tr" />
          <span className="cr-bracket bl" />
          <span className="cr-bracket br" />
          <div className="cr-hero-photo-tag">Solar Carport &middot; EV Charging</div>
        </div>
      </div>
    </header>
  );
}
