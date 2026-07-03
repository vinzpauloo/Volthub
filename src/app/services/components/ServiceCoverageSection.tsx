import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import { RiMapPinLine, RiGlobalLine } from "react-icons/ri";

const phRegions = [
  {
    region: "Luzon",
    areas: [
      "Metro Manila (Full Coverage)",
      "Calabarzon",
      "Central Luzon",
      "Bicol Region",
    ],
  },
  {
    region: "Visayas",
    areas: ["Central Visayas", "Western Visayas", "Eastern Visayas"],
  },
  {
    region: "Mindanao",
    areas: ["Davao Region", "Northern Mindanao", "SOCCSKSARGEN", "CARAGA"],
  },
];

const expansionAreas = [
  "Singapore",
  "Malaysia",
  "Thailand",
  "Indonesia",
  "Vietnam",
];

export default function ServiceCoverageSection() {
  return (
    <section
      id="service-coverage"
      className="py-20 bg-linear-to-br from-gray-50 to-blue-50"
    >
      <LayoutContainer>
        <div className="text-center mb-16">
          <SectionHeading
            title="Service Coverage"
            description="Serving the Philippines with plans for Southeast Asia expansion"
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Philippines Coverage */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-8">
              <RiMapPinLine className="text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Current Coverage
              </h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {phRegions.map((region, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                  <h4 className="font-semibold text-gray-900 mb-4">
                    {region.region}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {region.areas.map((area, areaIdx) => (
                      <li key={areaIdx} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full shrink-0" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Coming Soon
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Planned Expansion */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-8">
              <RiGlobalLine className="text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Planned Expansion
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {expansionAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 bg-white rounded-full border border-gray-200 text-sm text-gray-700 font-medium shadow-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
