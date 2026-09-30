const cases = [
  { title: "C&I Solar System Installation", image: "/aboutimages/solarpanels.jpg" },
  { title: "Home Charger Installation", image: "/HomeBanner/install-showcase-ev-charger-20260726.jpg" },
  { title: "EV Charging Station", image: "/HomeBanner/volthub-ev-charger-main.jpg" },
  { title: "Home Resident Solar System Installation", image: "/HomeBanner/solar-installation-rooftop-20260414.jpg" },
];

export default function ProjectCasesSection() {
  return (
    <section className="cr-section tight">
      <div className="cr-wrap">
        <div className="cr-section-head">
          <div className="cr-kicker">
            <span className="cr-rule" />
            Our Work
          </div>
          <h2>Customer Project Cases</h2>
          <p>Public Sector, NGO, and Development Projects.</p>
        </div>
        <div className="cr-cases-grid">
          {cases.map((c) => (
            <div
              key={c.title}
              className="cr-case-card"
              role="img"
              aria-label={c.title}
              style={{ backgroundImage: `url('${c.image}')` }}
            >
              <span>{c.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
