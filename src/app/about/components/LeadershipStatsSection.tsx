import { leadershipStats } from "./data";

export default function LeadershipStatsSection() {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-white to-accent/5 rounded-none md:rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
      <h3 className="text-3xl font-semibold mb-10 text-center text-primary gradient-text">
        Company Overview
      </h3>
      <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {leadershipStats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <p className="text-4xl md:text-5xl font-bold text-primary mb-3 gradient-text">
              {stat.label}
            </p>
            <p className="text-gray-600 text-lg">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

