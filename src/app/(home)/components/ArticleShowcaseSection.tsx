import Link from "next/link";
import type { Route } from "next";

interface HomeArticle {
  badge: string;
  title: string;
  description: string;
  steps: { title: string; detail: string }[];
  ctaText: string;
  ctaLink: Route;
  image: string;
  reverse?: boolean;
}

const homeArticles: HomeArticle[] = [
  {
    badge: "Commercial EV Infrastructure",
    title: "How We Build Reliable, Revenue-Grade EV Infrastructure for Your Business",
    description:
      "We design, install, and commission high-throughput dual-gun DC fast chargers for commercial hubs, fleet depots, and public charging networks. Each deployment is backed by real-time monitoring and on-site acceptance testing to ensure revenue-grade uptime from day one.",
    steps: [
      {
        title: "Site Survey & Load Study",
        detail: "Full electrical load assessment and spatial survey before any equipment ships.",
      },
      {
        title: "Civil Works & Trenching",
        detail: "Concrete pads, cable trenches, and mounting pedestals, pre-approved with engineering drawings.",
      },
      {
        title: "Installation & Commissioning",
        detail: "Full acceptance test protocol including OCPP backend registration and load-bank verification.",
      },
    ],
    ctaText: "Get a Quote for DC Fast Charging",
    ctaLink: "/contact" as Route,
    image: "/Article/article_1.jpg",
  },
  {
    badge: "Solar & Energy Storage",
    title: "Eliminate Soaring Power Bills with Hybrid and Off-Grid Solar Infrastructure",
    description:
      "Relying entirely on the traditional grid leaves your property vulnerable to rising power rates and unexpected blackouts. Our custom-engineered Solar PV and Smart Battery Storage setups are built to give you absolute energy autonomy.",
    steps: [
      {
        title: "Residential Homes",
        detail: "Smart hybrid configurations that can save up to 80% on monthly power bills.",
      },
      {
        title: "Commercial Hubs",
        detail: "Smart energy management that automatically shaves down peak-demand charges.",
      },
      {
        title: "Off-Grid Farms & Rural Projects",
        detail: "Rugged off-grid setups that keep irrigation and cold storage running without diesel.",
      },
    ],
    ctaText: "Calculate Your Solar Energy ROI →",
    ctaLink: "/tools/roi-calculator" as Route,
    image: "/aboutimages/solarpanels.jpg",
    reverse: true,
  },
];

export default function ArticleShowcaseSection() {
  return (
    <section className="cr-section tight">
      <div className="cr-wrap">
        <div className="cr-section-head">
          <div className="cr-kicker">
            <span className="cr-rule" />
            How We Build It
          </div>
          <h2>Real installs, real implementation steps</h2>
        </div>

        {homeArticles.map((article) => (
          <article
            key={article.title}
            className={`cr-article${article.reverse ? " rev" : ""}`}
          >
            <div className="cr-article-copy">
              <div className="cr-article-badge">{article.badge}</div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className="cr-article-steps">
                {article.steps.map((step) => (
                  <div key={step.title} className="cr-article-step">
                    <b>{step.title}</b>
                    <span>{step.detail}</span>
                  </div>
                ))}
              </div>
              <Link className="cr-btn cr-btn-brand" href={article.ctaLink}>
                {article.ctaText}
              </Link>
            </div>
            <div
              className="cr-article-img"
              role="img"
              aria-label={article.title}
              style={{ backgroundImage: `url('${article.image}')` }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
