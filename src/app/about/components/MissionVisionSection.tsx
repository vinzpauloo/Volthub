export default function MissionVisionSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-none md:rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-1 bg-linear-to-r from-primary via-accent to-secondary rounded-full"></div>
        </div>
        <h3 className="text-3xl font-bold text-primary mb-6 text-center gradient-text">
          MISSION
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          <span className="font-bold text-gray-900">
            Volthub Electric Power Generation Services Corporation
          </span>{" "}
          is committed to revolutionizing the energy sector by delivering
          cutting-edge electronic solutions for power generation. We specialize
          in sustainable, efficient, and smart energy technologies that empower
          industries, homes, and communities with reliable, cost-effective
          electricity. Our mission is to foster a cleaner energy future through
          the integration of renewable sources, smart grid technology, and
          energy storage solutions.
        </p>
      </div>

      <div className="bg-white rounded-none md:rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-1 bg-linear-to-r from-secondary via-accent to-primary rounded-full"></div>
        </div>
        <h3 className="text-3xl font-bold text-primary mb-6 text-center gradient-text">
          VISION
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          To be a global leader in electric power generation, pioneering advanced
          technologies that redefine energy production. We aim to lead the
          transition to renewable energy, delivering smart, scalable solutions that
          foster sustainability, enhance grid stability, and contribute to a
          brighter, cleaner future for all.
        </p>
      </div>
    </div>
  );
}

