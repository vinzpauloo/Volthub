import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import Image from "next/image";

const processes = [
  {
    image: "/Services/Consultation.webp",
    title: "Consultation",
    desc: "Site assessment, energy analysis, and custom solution design",
  },
  {
    image: "/Services/Permits.webp",
    title: "Planning & Permits",
    desc: "Engineering drawings, permit applications, and utility coordination",
  },
  {
    image: "/Services/Installation.jpg",
    title: "Installation",
    desc: "Professional installation by certified technicians with quality assurance",
  },
  {
    image: "/Services/Commissioning.webp",
    title: "Commissioning",
    desc: "System testing, monitoring setup, and comprehensive training",
  },
];

export default function ServiceProcessSection() {
  return (
    <section className="py-20">
      <LayoutContainer>
        <div className="text-center mb-16">
          <SectionHeading
            title="Our Service Process"
            description="From initial consultation to ongoing support, we ensure a seamless experience"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Track line connecting all steps */}
            <div className="absolute top-16 left-0 right-0 hidden md:block">
              <div className="relative mx-16">
                <div className="absolute inset-0 h-0.5 bg-gray-200 top-0" />
                <div className="absolute inset-0 h-0.5 bg-linear-to-r from-primary via-secondary to-green-500 top-0 w-full" />
              </div>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-4 gap-8 md:gap-0">
              {processes.map((process, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Image circle */}
                  <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-primary/20 group-hover:shadow-lg transition-all duration-300 mb-5">
                    <Image
                      src={process.image}
                      alt={process.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="128px"
                    />
                  </div>

                  {/* Mobile connector arrow */}
                  {idx < processes.length - 1 && (
                    <div className="md:hidden absolute top-16 left-[calc(50%+4.5rem)] text-gray-300">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {process.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed max-w-[200px]">
                    {process.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
