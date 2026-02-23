import {
  Zap,
  Sun,
  TrendingUp,
  BadgeDollarSign,
  Battery,
  Globe,
} from "lucide-react";
import { policyItems } from "./insights-data";
import type { PolicyItem } from "./insights-data";

const iconMap: Record<string, React.ReactElement> = {
  Zap: <Zap className="h-6 w-6" />,
  Sun: <Sun className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  BadgeDollarSign: <BadgeDollarSign className="h-6 w-6" />,
  Battery: <Battery className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
};

const PolicyCard = ({ item }: { item: PolicyItem }): React.ReactElement => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          {iconMap[item.icon]}
        </span>
        <h4 className="font-semibold text-gray-900">{item.title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
      <p className="text-sm font-medium text-emerald-700 border-t border-gray-100 pt-3">
        {item.impact}
      </p>
    </div>
  );
};

const PolicyHighlightsSection = (): React.ReactElement => {
  return (
    <section className="py-16 border-t border-gray-100">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Policy Tailwinds
        </h3>
        <p className="text-gray-600">
          Government incentives creating unprecedented clean energy demand
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policyItems.map((item) => (
          <PolicyCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
};

export default PolicyHighlightsSection;
