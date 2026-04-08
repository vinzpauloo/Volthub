import type { Metadata } from "next";
import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import BackToTopButton from "@/components/common/BackToTopButton";

export const metadata: Metadata = {
  title: "Case Studies - VoltHub",
  description: "Explore real-world success stories of VoltHub's energy solutions. See how our products and services have transformed homes, businesses, and communities with clean, reliable power.",
};

const caseStudies = [
  {
    id: "smart-cities",
    title: "Smart Cities",
    description: "Comprehensive urban energy solutions for metropolitan areas — street lighting, EV charging, and integrated clean-energy infrastructure.",
    image:
      "https://readdy.ai/api/search-image?query=modern%20smart%20city%20with%20solar%20panels%20integrated%20into%20buildings%2C%20electric%20vehicle%20charging%20stations%2C%20LED%20street%20lighting%2C%20futuristic%20urban%20landscape%2C%20sustainable%20infrastructure%2C%20blue%20and%20green%20technology%20elements&width=400&height=250&seq=case001&orientation=landscape",
  },
  {
    id: "industrial",
    title: "Industrial Solutions",
    description:
      "Large-scale energy systems for manufacturing and heavy industry, designed around peak demand profiles and operational resilience.",
    image:
      "https://readdy.ai/api/search-image?query=industrial%20manufacturing%20facility%20with%20large-scale%20solar%20panel%20installation%20on%20rooftop%2C%20modern%20factory%20buildings%2C%20clean%20energy%20infrastructure%2C%20professional%20industrial%20setting%2C%20sustainable%20manufacturing&width=400&height=250&seq=case002&orientation=landscape",
  },
  {
    id: "residential",
    title: "Residential Projects",
    description:
      "Home energy solutions for sustainable living — solar self-consumption, battery backup, and smart home energy management.",
    image:
      "https://readdy.ai/api/search-image?query=residential%20neighborhood%20with%20solar%20panels%20on%20house%20rooftops%2C%20modern%20suburban%20homes%2C%20clean%20energy%20installation%2C%20family-friendly%20environment%2C%20sustainable%20living%20community%2C%20bright%20daylight&width=400&height=250&seq=case003&orientation=landscape",
  },
  {
    id: "rural",
    title: "Rural Electrification",
    description:
      "Clean-energy access for remote and underserved communities, including off-grid solar lighting and standalone power systems.",
    image:
      "https://readdy.ai/api/search-image?query=rural%20village%20with%20solar%20lighting%20systems%2C%20off-grid%20energy%20solutions%2C%20remote%20community%20development%2C%20sustainable%20rural%20electrification%2C%20solar%20street%20lights%20and%20home%20systems%2C%20developing%20region%20infrastructure&width=400&height=250&seq=case004&orientation=landscape",
  },
];

export default function CaseStudies() {
  return (
    <main className="pt-32 space-y-20 bg-white">
      <section className="pt-12">
        <LayoutContainer className="space-y-12">
          <SectionHeading
            title="Case Studies"
            description="Real-world implementations driving sustainable change."
          />
          <div className="flex flex-wrap gap-8 justify-center">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                id={study.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
              >
                <Image
                  src={study.image}
                  alt={study.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">{study.title}</h3>
                  <p className="text-sm text-gray-600">{study.description}</p>
                </div>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>

      <section className="bg-gray-50 py-20">
        <LayoutContainer className="space-y-8">
          <SectionHeading
            title="Sustainability Commitment"
            description="VoltHub designs clean-energy infrastructure to support long-term sustainability and climate goals across the Philippines."
          />
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Every project is sized and measured for its own context. We don&apos;t publish aggregate savings or impact numbers — talk to our team about the outcomes achievable at your specific site.
          </p>
        </LayoutContainer>
      </section>
      <BackToTopButton />
    </main>
  );
}

