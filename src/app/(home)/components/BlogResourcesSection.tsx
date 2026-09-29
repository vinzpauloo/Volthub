"use client";

import Link from "next/link";
import type { Route } from "next";
// import { IconType } from "react-icons";
import { RiArrowRightLine } from "react-icons/ri";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Image from "next/image";
import { useRef } from "react";

interface Resource {
  slug?: string;
  title: string;
  description: string;
  type: string;
  image: string;
  imageAlt?: string;
}

interface BlogResourcesSectionProps {
  badge?: string;
  title: string;
  description: string;
  resources: Resource[];
  viewAllLink?: Route;
}

export default function BlogResourcesSection({
  badge = "Learn & Grow",
  title,
  description,
  resources,
  viewAllLink = "/blog",
}: BlogResourcesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="section-spacing bg-[var(--cr-bg)]">
      <LayoutContainer>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Title Section */}
          <div className="flex flex-col gap-4 lg:gap-6 lg:w-1/3 lg:sticky lg:top-8">
            <div className="space-y-4 reveal-on-scroll">
              <p className="text-sm font-semibold tracking-[0.3em] text-[var(--cr-brand-light)] uppercase">{badge}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text leading-tight">
                {title}
              </h2>
              <p className="text-[var(--cr-fg-dim)] text-base lg:text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Blog Cards Section */}
          <div className="flex-1 w-full lg:w-2/3 relative">
            <div className="hidden md:flex items-center gap-3 absolute right-0 -top-16 z-10">
              <button
                type="button"
                onClick={() => scrollBy(-320)}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--cr-bg-elev)] border border-[var(--cr-line-strong)] shadow-md hover:shadow-lg hover:bg-[var(--cr-bg-elev-2)] transition-all duration-300 text-[var(--cr-fg)] hover:text-[var(--cr-brand-light)]"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollBy(320)}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--cr-bg-elev)] border border-[var(--cr-line-strong)] shadow-md hover:shadow-lg hover:bg-[var(--cr-bg-elev-2)] transition-all duration-300 text-[var(--cr-fg)] hover:text-[var(--cr-brand-light)]"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-4 md:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {resources.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.slug ? `/blog/${resource.slug}` : "#"}
                  className="stagger-card snap-start w-[310px] md:w-[460px] min-w-[260px] md:min-w-[300px] lg:min-w-[320px] shrink-0 reveal-on-scroll p-4 md:p-5 bg-[var(--cr-bg-elev)] rounded-2xl shadow-lg border border-[var(--cr-line)] hover:shadow-xl transition-all duration-300 group cursor-pointer block"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="relative w-full h-40 md:h-44 lg:h-48 rounded-xl overflow-hidden mb-3 md:mb-4">
                    <Image
                      src={resource.image}
                      alt={resource.imageAlt || resource.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 320px, (min-width: 768px) 300px, 260px"
                      priority={index === 0}
                    />
                  </div>
                  <div className="mb-3 ">
                    <span className="inline-block px-3 py-1 rounded-full bg-[var(--cr-bg-elev-2)] text-[var(--cr-brand-light)] text-xs font-semibold uppercase tracking-wide">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-white group-hover:text-[var(--cr-brand-light)] transition-colors duration-300 line-clamp-2 leading-snug">
                    {resource.title}
                  </h3>
                  <p className="text-[var(--cr-fg-dim)] mb-4 leading-relaxed text-sm md:text-base line-clamp-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2 text-[var(--cr-brand-light)] font-medium group-hover:gap-3 transition-all duration-300 text-sm md:text-base">
                    <span>Read More</span>
                    <RiArrowRightLine className="text-lg" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Link
            href={viewAllLink}
            className="inline-flex items-center justify-center gap-2 border-2 border-[var(--cr-brand)] text-[var(--cr-brand-light)] px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-[var(--cr-brand)] hover:text-white transition-all duration-300 hover:scale-105 group"
          >
            View All Blogs
            <RiArrowRightLine className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </LayoutContainer>
    </section>
  );
}

