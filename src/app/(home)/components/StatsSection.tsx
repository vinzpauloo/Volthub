interface Stat {
  label: string;
  value: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="cr-section">
      <div className="cr-wrap">
        <div className="cr-section-head">
          <h2>Numbers from projects already running</h2>
        </div>
        <div className="cr-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="cr-stat-card">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
              <div className="cr-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
