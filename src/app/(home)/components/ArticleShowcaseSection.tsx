"use client";

import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import LayoutContainer from "@/components/layout/LayoutContainer";
import type { ArticleShowcase } from "./homeData";

interface ArticleShowcaseSectionProps {
  articles: ArticleShowcase[];
}

function ArticleCard({ article, index }: { article: ArticleShowcase; index: number }) {
  const floatDir = index % 2 === 0 ? "md:float-left md:mr-10" : "md:float-right md:ml-10";

  return (
    <article className="clear-both">
      {/* ── Badge ── */}
      <p className="text-base font-semibold tracking-[0.15em] uppercase text-amber-600 mb-4">
        {article.badge}
      </p>

      {/* ── Title ── */}
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
        {article.title}
        <span className={article.titleHighlight.color}>{article.titleHighlight.text}</span>
      </h3>

      {/* ── Floated image — text wraps around it on desktop ── */}
      <div className={`relative w-full ${article.imageClassName || "md:w-150"} aspect-[4/3] overflow-hidden mb-5 ${floatDir}`}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className={article.imageFit === "contain" ? "object-contain" : "object-cover"}
          sizes="(max-width: 768px) 100vw, 1000px"
        />
      </div>

      {/* ── Description ── */}
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-5 text-justify">
        {article.description}
      </p>

      {/* ── Implementation steps ── */}
      <div className="space-y-5 mb-6">
        {article.implementationSteps.map((step, i) => (
          <p key={i} className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
            <strong className="text-gray-900 font-semibold">{step.step}</strong>
            {step.detail && <>. {step.detail}</>}
          </p>
        ))}
      </div>

      {/* ── CTA ── */}
      <Link
        href={article.ctaLink}
        className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:text-primary/80 transition-colors group"
      >
        {article.ctaText}
        <RiArrowRightLine className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

export default function ArticleShowcaseSection({ articles }: ArticleShowcaseSectionProps) {
  return (
    <section className="section-spacing bg-white overflow-x-hidden">
      <LayoutContainer className="max-w-full md:max-w-[75%]">
     

        {/* ── Article cards ── */}
        <div className="space-y-24 md:space-y-32">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} index={index} />
          ))}
        </div>

        {/* ── Bottom CTA — clean gradient bar ── */}
        {/* <div className="mt-24 md:mt-32">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-accent px-8 py-12 md:px-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight max-w-lg">
                Ready to power your site with reliable EV charging?
              </h3>
              <p className="text-white/70 text-lg md:text-xl mt-3 max-w-md">
                Tell us about your project and we&apos;ll put together a tailored proposal —
                including site photos, load estimates, and ROI projections.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-primary shadow-lg transition-all duration-200 hover:bg-gray-50 hover:scale-105 group shrink-0"
            >
              Get Your Free Quote
              <RiArrowRightLine className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div> */}
      </LayoutContainer>
    </section>
  );
}
