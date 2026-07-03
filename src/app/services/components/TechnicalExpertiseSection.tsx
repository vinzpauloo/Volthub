import LayoutContainer from "@/components/layout/LayoutContainer";
import {
  RiFlightTakeoffLine,
  RiShape2Line,
  RiFlashlightLine,
  RiInstallLine,
  RiShieldCheckLine,
  RiDashboardLine,
  RiClipboardLine,
  RiSpeedLine,
  RiBookOpenLine,
  RiEyeLine,
  RiSettings3Line,
  RiAlarmWarningLine,
} from "react-icons/ri";

const equipmentItems = [
  { icon: RiFlightTakeoffLine, text: "Drone Site Surveying & Thermal Imaging" },
  { icon: RiShape2Line, text: "3D CAD Design & Modeling Software" },
  { icon: RiFlashlightLine, text: "Advanced Electrical Testing Equipment" },
  { icon: RiInstallLine, text: "Specialized Solar & EV Installation Tools" },
  { icon: RiShieldCheckLine, text: "Safety Equipment & Fall Protection" },
  { icon: RiDashboardLine, text: "Real-Time Project Management Systems" },
];

const qualityItems = [
  { icon: RiClipboardLine, text: "Multi-Point Quality Inspection Process" },
  { icon: RiSpeedLine, text: "Performance Testing & Commissioning" },
  { icon: RiBookOpenLine, text: "Customer Training & Documentation" },
  { icon: RiEyeLine, text: "Post-Installation Monitoring & Support" },
  { icon: RiSettings3Line, text: "Preventive Maintenance Programs" },
  { icon: RiAlarmWarningLine, text: "Rapid Response Emergency Service" },
];

export default function TechnicalExpertiseSection() {
  return (
    <section className="py-10 bg-white">
      <LayoutContainer>
     

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Equipment & Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 text-center">
              Equipment & Tools
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {equipmentItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <item.icon className="text-gray-500 text-lg shrink-0" />
                  <span className="text-gray-700 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Assurance */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 text-center">
              Quality Assurance
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {qualityItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <item.icon className="text-gray-500 text-lg shrink-0" />
                  <span className="text-gray-700 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
