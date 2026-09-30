import Link from "next/link";
import type { Route } from "next";

const opCards = [
  { n: "01", title: "Driver app", text: "Live on iOS and Android. QR, RFID, wallet, receipts." },
  { n: "02", title: "Operator dashboard", text: "Revenue, sessions, uptime, exports. You see what we see." },
  { n: "03", title: "Monthly settlement", text: "Revenue less the agreed commission, with a line-by-line statement." },
];

export default function OperationServiceSection() {
  return (
    <section className="cr-section cr-op-band">
      <div className="cr-wrap">
        <div className="cr-section-head flush">
          <div className="cr-kicker">
            <span className="cr-rule" />
            EV Charging Operation
          </div>
          <h2>Own the charger. We run the business.</h2>
          <p>
            Malls, hotels, offices, condos and fleet depots earn charging revenue without
            hiring a charging team. VoltHub lists your station in the driver app, collects
            GCash and card payments, monitors every charger over OCPP and pays you monthly.
            From ₱1,500 per station per month, or connect a charger you already own.
          </p>
        </div>
        <div className="cr-op-grid">
          {opCards.map((card) => (
            <div key={card.n} className="cr-op-card">
              <div className="cr-op-icon">{card.n}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
        <div className="cr-hero-ctas">
          <Link className="cr-btn cr-btn-brand" href={"/services/charging-operation" as Route}>
            See operation plans
          </Link>
          <Link className="cr-btn cr-btn-line" href={"/tools/ev-charger-roi-calculator" as Route}>
            Run the ROI calculator
          </Link>
        </div>
      </div>
    </section>
  );
}
