import LayoutContainer from "@/components/layout/LayoutContainer";
import Link from "next/link";
import Image from "next/image";

const lights = [
  { model: "F2-050", type: "Integrated Light", poleHeight: "8m", ledPower: "50W", size: "1319*460*60mm", battery: "12.8V 45Ah", solarPanel: "100W", image: "/Product/StreetLamp/F1L.png" },
  { model: "F2-080", type: "Integrated Light", poleHeight: "9m", ledPower: "80W", size: "1490*640*60mm", battery: "25.6V 45Ah", solarPanel: "160W", image: "/Product/StreetLamp/F1L.png" },
  { model: "F2-100", type: "Integrated Light", poleHeight: "10m", ledPower: "100W", size: "1490*730*60mm", battery: "25.6V 52Ah", solarPanel: "200W", image: "/Product/StreetLamp/F1L.png" },
  { model: "F2-120", type: "Integrated Light", poleHeight: "12m", ledPower: "120W", size: "1650*830*60mm", battery: "25.6V 60Ah", solarPanel: "240W", image: "/Product/StreetLamp/F1L.png" },
  { model: "LVQ2-050", type: "Split Street Light", poleHeight: "8m", ledPower: "50W", size: "935*415*210mm", battery: "14.8V 45Ah", solarPanel: "100W", image: "/Product/StreetLamp/RKlv02.png" },
  { model: "LVQ2-080", type: "Split Street Light", poleHeight: "9m", ledPower: "80W", size: "935*415*210mm", battery: "12.8V 90Ah", solarPanel: "200W", image: "/Product/StreetLamp/RKlv02.png" },
  { model: "LVQ2-100", type: "Split Street Light", poleHeight: "10m", ledPower: "100W", size: "935*415*210mm", battery: "25.6V 48Ah", solarPanel: "250W", image: "/Product/StreetLamp/RKS.png" },
  { model: "LVQ2-120", type: "Split Street Light", poleHeight: "12m", ledPower: "120W", size: "935*415*210mm", battery: "25.6V 60Ah", solarPanel: "300W", image: "/Product/StreetLamp/RKS.png" },
  { model: "LVXC-120", type: "All in Two Light", poleHeight: "5m", ledPower: "20W", size: "495*205*80mm", battery: "3.2V 65Ah", solarPanel: "70W", image: "/Product/StreetLamp/F2L.png" },
  { model: "LVXC-130", type: "All in Two Light", poleHeight: "6m", ledPower: "30W", size: "550*240*100mm", battery: "3.2V 80Ah", solarPanel: "70W", image: "/Product/StreetLamp/F2L.png" },
  { model: "LVXC-320", type: "All in Two Light", poleHeight: "5m", ledPower: "20W", size: "650*300*130mm", battery: "3.2V 65Ah", solarPanel: "70W", image: "/Product/StreetLamp/LVXC.png" },
  { model: "LVXC-330", type: "All in Two Light", poleHeight: "6m", ledPower: "30W", size: "650*300*130mm", battery: "3.2V 80Ah", solarPanel: "70W", image: "/Product/StreetLamp/LVXC.png" },
];

export default function SolarStreetLightsSection() {
  return (
    <section className="py-20 bg-white">
      <LayoutContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Solar Street Lights
          </h2>
          <p className="text-gray-500">
            Integrated solar-powered street lighting solutions for reliable, off-grid illumination
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lights.map((light, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 flex flex-col">
              <div className="w-full h-48 relative bg-gray-50">
                <Image
                  src={light.image}
                  alt={light.model}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{light.model}</h3>
                <p className="text-sm text-gray-500 mb-3">{light.type}</p>
                <div className="space-y-1.5 text-sm mb-4 flex-1">
                  {[
                    { label: "Pole Height", value: light.poleHeight },
                    { label: "LED Power", value: light.ledPower },
                    { label: "Battery", value: light.battery },
                    { label: "Solar Panel", value: light.solarPanel },
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-500">{spec.label}:</span>
                      <span className="font-medium text-gray-700">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/contact?subject=installation&product=solar-installation&model=${encodeURIComponent(light.model)}&productName=${encodeURIComponent(light.type)}`}
                  className="block w-full bg-gray-900 text-white py-3 rounded-xl font-semibold text-center text-sm hover:bg-gray-800 transition-colors"
                >
                  Contact for Pricing
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Terms */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Terms & Production</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Payment Terms:</h4>
              <ul className="space-y-1 text-gray-500">
                <li>• 30% bank transfer in advance</li>
                <li>• Balance before shipping</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Production & Delivery:</h4>
              <ul className="space-y-1 text-gray-500">
                <li>• Production time: 20-25 working days after payment</li>
                <li>• Package: Standard Export package</li>
              </ul>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
