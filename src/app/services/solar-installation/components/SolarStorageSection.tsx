import LayoutContainer from "@/components/layout/LayoutContainer";
import Link from "next/link";
import Image from "next/image";

const mobileStorage = [
  { kWh: "5kWh", ratedPower: "3KW/AC 220V", battery: "5.3kWh", solarPanel: "36V670W*4", description: "Small home / backup kit. Can run 1 HP aircon plus lights, fans, TV, laptop. About 4-5 hours usable at 1kW average.", image: "/Product/SmartHome/SMP2.png" },
  { kWh: "10kWh", ratedPower: "5KW/AC 220V", battery: "10.6kWh", solarPanel: "36V670W*6", description: "Standard home / small business. Can run 1-2 HP aircon, refrigerator, lights, fans, TV, computers. Around 5-6 hours usable.", image: "/Product/SmartHome/SMP3.png" },
  { kWh: "15kWh", ratedPower: "5KW/AC 220V", battery: "15.9kWh", solarPanel: "36V670W*8", description: "Longer backup, same power. Good for rural homes with frequent long outages or stores with freezers.", image: "/Product/SmartHome/SMP4.png" },
  { kWh: "20kWh", ratedPower: "10KW/AC 220V", battery: "21.2kWh", solarPanel: "36V670W*12", description: "Larger home / small commercial. Can run multiple aircons (3-4 HP total), refrigerator, lights, computers, pumps.", image: "/Product/SmartHome/SMP5.png" },
  { kWh: "25kWh", ratedPower: "10KW/AC 220V", battery: "26.5kWh", solarPanel: "36V670W*14", description: "More hours, same power. Good for full day-night cycle backup for moderate loads.", image: "/Product/SmartHome/SMP5.png" },
  { kWh: "30kWh", ratedPower: "10KW/AC 220V", battery: "31.8kWh", solarPanel: "36V670W*16", description: "Mini-microgrid. Can run through the night at 2-3kW average. Good for off-grid communities, remote resorts.", image: "/Product/SmartHome/SMP6.png" },
];

const offGridSystems = [
  { kWh: "40kWh", ratedPower: "20KW/AC 380V/220V", battery: "40.96kWh", solarPanel: "670W*30PCS", description: "Small commercial / remote facility. Can power 5-10 small houses, water refilling station, rice mill, or cell tower.", image: "/Product/cabinet/20k.png" },
  { kWh: "60kWh", ratedPower: "30KW/AC 380V/220V", battery: "61.4kWh", solarPanel: "670W*40PCS", description: "Small community or larger business. Can power small resort (10+ rooms), medium agricultural facility, or cluster of 10-20 households.", image: "/Product/cabinet/30k.png" },
  { kWh: "80kWh", ratedPower: "40KW/AC 380V/220V", battery: "83.2kWh", solarPanel: "670W*60PCS", description: "Microgrid for barangay center or campus. Suitable for school campus, barangay center + streetlights + market area.", image: "/Product/cabinet/40k.png" },
  { kWh: "100kWh", ratedPower: "50KW/AC 380V/220V", battery: "100.3kWh", solarPanel: "670W*72PCS", description: "Microgrid for barangay center or campus. Suitable for medium resort or eco-park with many cottages plus common facilities.", image: "/Product/cabinet/50k.png" },
  { kWh: "215kWh", ratedPower: "100KW/AC 400V/220V", battery: "215.04kWh", solarPanel: "670W*144PCS", description: "Village / industrial-scale. Can supply tens of houses plus businesses, or one small industrial plant.", image: "/Product/cabinet/200kwh.png" },
  { kWh: "466kWh", ratedPower: "220KW/AC 400V/220V", battery: "465.8kWh", solarPanel: "670W*288PCS", description: "Mini power plant for small town center or big factory. Can power town center, large commercial building, or single big industrial customer.", image: "/Product/cabinet/500kwh.png" },
  { kWh: "783kWh", ratedPower: "300KW/AC 400V/220V", battery: "783.6kWh", solarPanel: "670W*444PCS", description: "Village or island grid. Can act as main power plant for whole small island barangay with few hundred households.", image: "/Product/cabinet/700kwh.png" },
  { kWh: "1075kWh", ratedPower: "500KW/AC 400V/220V", battery: "1075.2kWh", solarPanel: "670W*728PCS", description: "Small utility level / industrial park. Main power for small island town, industrial park, or large university/hospital campus.", image: "/Product/containertype/con1.png" },
  { kWh: "1800kWh", ratedPower: "1000KW/AC 400V/220V", battery: "1806.3kWh", solarPanel: "670W*1484PCS", description: "Main power plant for whole town or large island. For places where diesel or grid can take over at night.", image: "/Product/containertype/con1.png" },
];

function ProductCard({ system, name }: { system: typeof mobileStorage[0]; name: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 flex flex-col">
      <div className="w-full h-48 relative bg-gray-50">
        <Image
          src={system.image}
          alt={name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-3">{system.kWh}</h4>
        <div className="space-y-1.5 text-sm mb-4">
          {[
            { label: "Rated Power", value: system.ratedPower },
            { label: "Battery", value: system.battery },
            { label: "Solar Panel", value: system.solarPanel },
          ].map((spec, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-gray-500">{spec.label}:</span>
              <span className="font-medium text-gray-700">{spec.value}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-4 flex-1">{system.description}</p>
        <Link
          href={`/contact?subject=quote&product=energy-storage&productName=${encodeURIComponent(`${name} ${system.kWh}`)}&model=${encodeURIComponent(system.kWh)}`}
          className="block w-full bg-gray-900 text-white py-3 rounded-xl font-semibold text-center text-sm hover:bg-gray-800 transition-colors"
        >
          Contact for Pricing
        </Link>
      </div>
    </div>
  );
}

export default function SolarStorageSection() {
  return (
    <section className="py-20 bg-white">
      <LayoutContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Energy Storage & Power Generation Systems
          </h2>
          <p className="text-gray-500">
            Complete off-grid and backup power solutions from small homes to industrial facilities
          </p>
        </div>

        {/* Mobile Energy Storage */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Mobile Energy Storage Power (5-30 kWh)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobileStorage.map((system, idx) => (
              <ProductCard key={idx} system={system} name="Mobile Energy Storage Power" />
            ))}
          </div>
        </div>

        {/* Off-Grid Power Generation */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Off-Grid Power Generation Systems (40kWh+)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offGridSystems.map((system, idx) => (
              <ProductCard key={idx} system={system} name="Off-Grid Power Generation System" />
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
