import Image from "next/image";

const appFeatures = [
  { title: "Home", text: "Your personalized dashboard and account overview." },
  { title: "Find Stations", text: "Browse, search, and filter charging stations near you." },
  { title: "Charging", text: "Start, monitor, and manage your charging sessions." },
  { title: "Account", text: "Manage your profile, vehicles, payments, and settings." },
];

export default function AppShowcaseSection() {
  return (
    <section className="cr-section">
      <div className="cr-wrap cr-app-showcase">
        <div className="cr-phone-wrap">
          <div className="cr-phone-frame">
            <div className="cr-phone-screen">
              <Image
                src="/HomeBanner/volthub-app-home-screen.png"
                alt="VoltHub app home screen showing vehicle, wallet balance and nearby charging stations"
                width={390}
                height={844}
                sizes="260px"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="cr-section-head flush">
            <div className="cr-kicker">
              <span className="cr-rule" />
              Mobile App
            </div>
            <h2>The VoltHub EV Charging App</h2>
            <p>
              Take control of your EV charging experience with the VoltHub mobile app.
              Available on iOS and Android.
            </p>
          </div>
          <div className="cr-app-feats">
            {appFeatures.map((f) => (
              <div key={f.title} className="cr-app-feat">
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="cr-store-btns">
            <a
              className="cr-store-btn"
              href="https://apps.apple.com/ph/app/volthub-ph/id6795752536"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.05 12.34c-.03-2.7 2.2-3.99 2.3-4.06-1.25-1.83-3.2-2.08-3.9-2.11-1.66-.17-3.24.98-4.08.98-.84 0-2.13-.96-3.5-.93-1.8.03-3.47 1.05-4.4 2.66-1.87 3.24-.48 8.04 1.35 10.67.9 1.28 1.96 2.72 3.36 2.67 1.35-.05 1.86-.87 3.5-.87 1.63 0 2.1.87 3.53.84 1.46-.02 2.38-1.31 3.27-2.6 1.03-1.49 1.45-2.94 1.47-3.01-.03-.01-2.83-1.09-2.86-4.24z" />
                <path d="M14.53 4.36c.75-.9 1.25-2.16 1.11-3.41-1.08.04-2.38.72-3.15 1.61-.69.79-1.3 2.07-1.14 3.29 1.19.09 2.42-.6 3.18-1.49z" />
              </svg>
              <span>
                <span className="st-line1">Download on the</span>
                <br />
                <span className="st-line2">App Store</span>
              </span>
            </a>
            <a
              className="cr-store-btn"
              href="https://play.google.com/store/apps/details?id=ph.volthub.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1L13 12.5v-.2L3.7 2.2l-.1.1z" />
                <path d="M16.2 15.7l-3.2-3.2v-.2l3.2-3.2 3.6 2.1c1 .6 1 1.6 0 2.2l-3.6 2.3z" opacity=".7" />
                <path d="M16.2 15.7L13 12.5 3.7 21.8c.4.4 1 .4 1.7 0l10.8-6.1z" />
                <path d="M16.2 9.3L5.4 3.2c-.7-.4-1.3-.4-1.7 0L13 12.5l3.2-3.2z" opacity=".7" />
              </svg>
              <span>
                <span className="st-line1">Get it on</span>
                <br />
                <span className="st-line2">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
