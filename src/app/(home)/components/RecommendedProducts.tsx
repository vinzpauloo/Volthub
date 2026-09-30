import Link from "next/link";
import type { Route } from "next";

const categories = [
  {
    title: "Solar Street Light",
    text: "Efficient solar-powered street lighting that reduces energy costs and environmental impact.",
    href: "/products?category=solar-street",
  },
  {
    title: "EV Chargers",
    text: "Fast, reliable charging stations for homes, businesses, and public spaces.",
    href: "/products?category=ev-charging",
  },
  {
    title: "Smart Home Storage",
    text: "Home battery systems that store solar energy for energy independence and backup power.",
    href: "/products?category=smart-home",
  },
  {
    title: "Power Supplies",
    text: "Industrial-grade power supply and energy storage for commercial and large-scale sites.",
    href: "/products?category=cabinet",
  },
];

export default function RecommendedProducts() {
  return (
    <section className="cr-section tight">
      <div className="cr-wrap">
        <div className="cr-section-head center">
          <h2>Products Categories</h2>
          <p>Choose from our products categories and feel free to choose!</p>
        </div>
        <div className="cr-products-grid">
          {categories.map((c) => (
            <div key={c.title} className="cr-product-card">
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <Link className="cr-seg-link" href={c.href as Route}>
                Browse &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
