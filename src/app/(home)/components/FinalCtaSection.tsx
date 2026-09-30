import Link from "next/link";
import type { Route } from "next";

export default function FinalCtaSection() {
  return (
    <div className="cr-final-cta">
      <h2>Ready to power your next project?</h2>
      <p>Talk to our team about solar, EV charging, or charging-station operation.</p>
      <div className="cr-final-ctas">
        <Link className="cr-btn cr-btn-lg cr-btn-brand" href={"/contact" as Route}>
          Get Free Consultation
        </Link>
        <Link className="cr-btn cr-btn-lg cr-btn-line" href={"/contact" as Route}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}
