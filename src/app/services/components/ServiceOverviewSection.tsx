import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

const services = [
  {
    title: "EV Charging Solutions",
    description:
      "Complete charging infrastructure for homes, businesses, and fleets — from design to deployment.",
    image: "/Sector/evcharging.jpeg",
    href: "/services/ev-charging",
    overlay: "from-blue-950/80 via-blue-950/40 to-transparent",
    accent: "text-blue-400",
  },
  {
    title: "Solar Energy Installation",
    description:
      "Turn-key solar solutions from consultation to connection — power your property with clean, renewable energy.",
    image: "/Sector/sampleproducts/search-image.webp",
    href: "/services/solar-installation",
    overlay: "from-green-950/80 via-green-950/40 to-transparent",
    accent: "text-green-400",
  },
] as const;

export default function ServiceOverviewSection() {
  return (
    <section className="py-20 bg-gray-50">
      <LayoutContainer>
        <div className="text-center mb-16">
          <SectionHeading
            title="Our Core Services"
            description="Comprehensive energy solutions backed by certified professionals and cutting-edge technology."
          />
        </div>

        {/* Diagonal Split Panel */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-lg h-[300px] md:h-[420px]">
          {/* Left Panel — EV Charging */}
          <div className="absolute inset-0 md:[clip-path:polygon(0_0,54%_0,46%_100%,0_100%)]">
            <Image
              src={services[0].image}
              alt={services[0].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 54vw"
            />
            <div
              className={`absolute inset-0 bg-linear-to-t ${services[0].overlay}`}
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-12 md:w-[85%]">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {services[0].title}
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 max-w-md">
                {services[0].description}
              </p>
              <Link
                href={services[0].href}
                className={`inline-flex items-center gap-2 font-semibold ${services[0].accent} hover:gap-3 transition-all duration-200`}
              >
                <span>Learn More</span>
                <RiArrowRightLine />
              </Link>
            </div>
          </div>

          {/* Right Panel — Solar */}
          <div className="absolute inset-0 md:[clip-path:polygon(54%_0,100%_0,100%_100%,46%_100%)]">
            <Image
              src={services[1].image}
              alt={services[1].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 54vw"
            />
            <div
              className={`absolute inset-0 bg-linear-to-t ${services[1].overlay}`}
            />
            <div className="absolute bottom-0 right-0 p-6 md:p-12 text-right md:w-[85%] md:ml-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {services[1].title}
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 max-w-md md:ml-auto">
                {services[1].description}
              </p>
              <Link
                href={services[1].href}
                className={`inline-flex items-center gap-2 font-semibold ${services[1].accent} hover:gap-3 transition-all duration-200`}
              >
                <span>Learn More</span>
                <RiArrowRightLine />
              </Link>
            </div>
          </div>

          {/* Diagonal divider line */}
          <svg
            className="absolute inset-0 pointer-events-none hidden md:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line
              x1="54"
              y1="0"
              x2="46"
              y2="100"
              stroke="white"
              strokeWidth="0.3"
              strokeOpacity="0.5"
            />
          </svg>

          {/* Mobile: stack vertically */}
          <div className="md:hidden absolute inset-0 flex flex-col">
            {services.map((service, i) => (
              <div key={service.href} className="relative flex-1">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div
                  className={`absolute inset-0 bg-linear-to-t ${service.overlay}`}
                />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className={`inline-flex items-center gap-2 font-semibold text-sm ${service.accent}`}
                  >
                    <span>Learn More</span>
                    <RiArrowRightLine />
                  </Link>
                </div>
                {/* Horizontal divider between stacked panels */}
                {i === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
