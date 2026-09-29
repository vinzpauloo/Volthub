"use client";

import Link from "next/link";
import Image from "next/image";
import { RiArrowRightLine, RiQuestionLine } from "react-icons/ri";
// import LayoutContainer from "@/components/layout/LayoutContainer";
import { Route } from "next";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  badge?: string;
  title: string;
  description: string;
  faqs: FAQ[];
  contactLink?: Route;
  bannerImage?: string;
}

export default function FAQSection({
  badge = "Common Questions",
  title,
  description,
  faqs,
  contactLink = "/contact",
  bannerImage = "/HomeBanner/faq.jpg",
}: FAQSectionProps) {
  return (
    <section className="section-spacing bg-[var(--cr-bg)] w-screen ">
      <div className=" w-screen mx-auto flex md:flex-row flex-col items-center justify-center gap-5">
        {/* Row 1: Banner/Image */}
        <div className=" md:w-1/2 w-full md:h-auto ">
          <div className="relative w-full h-50 lg:h-140">
            <Image
              src={bannerImage}
              alt="FAQ Banner"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-900/60 to-transparent flex  pt-10 items-start justify-center">
              <div className="text-center space-y-3 md:space-y-4 px-4 ">
                <p className="text-sm md:text-base font-semibold tracking-[0.3em] text-white/90 uppercase">
                  {badge}
                </p>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {title}
                </h2>
                <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: FAQ Items - 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="reveal-on-scroll bg-[var(--cr-bg-elev)] border border-[var(--cr-line)] p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 group h-full"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-start gap-4 md:gap-5">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--cr-bg-elev-2)] flex items-center justify-center transition-all duration-300">
                  <RiQuestionLine className="text-[var(--cr-brand-light)] text-lg md:text-xl" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3 group-hover:text-[var(--cr-brand-light)] transition-colors duration-300 leading-snug">
                    {faq.question}
                  </h3>
                  <p className="text-[var(--cr-fg-dim)] text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mt-10 md:mt-14">
          <Link
            href={contactLink}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[var(--cr-brand-light)] font-semibold text-base hover:gap-3 hover:bg-white/5 transition-all duration-300 group"
          >
            <span>Still have questions? Contact us</span>
            <RiArrowRightLine className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        </div>

        
      </div>
    </section>
  );
}

