import type { ReactNode } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import BackToTopButton from "@/components/common/BackToTopButton";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
}

export default function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageLayoutProps) {
  return (
    <main className="pt-24 md:pt-32 bg-linear-to-b from-gray-50 via-white to-gray-50 min-h-screen">
      <LayoutContainer className="flex flex-1 flex-col gap-8 md:gap-10 pb-16 md:pb-20 px-4 sm:px-6 md:px-4">
        <div className="space-y-4 text-center mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-700 font-semibold">
            {eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text leading-tight">
            {title}
          </h1>
        </div>

        <p className="text-center text-sm text-gray-500">
          Last updated: <time>{lastUpdated}</time>
        </p>

        <div className="max-w-3xl mx-auto w-full text-base md:text-lg text-gray-700 leading-relaxed space-y-4 break-words">
          {intro}
        </div>

        <nav
          aria-label="Table of contents"
          className="max-w-3xl mx-auto w-full rounded-xl border border-gray-200 bg-white/70 backdrop-blur px-4 py-4 sm:px-6 sm:py-5"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 mb-3">
            On this page
          </h2>
          <ol className="list-decimal list-inside space-y-0.5 text-sm md:text-base text-gray-700">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-block py-2 min-h-[44px] hover:text-emerald-700 hover:underline underline-offset-4"
                >
                  {s.title.replace(/^\d+\.\s*/, "")}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto w-full space-y-8 md:space-y-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 break-words">
                {s.title}
              </h2>
              <div className="text-base text-gray-700 leading-relaxed space-y-3 break-words [&_a]:text-emerald-700 [&_a]:underline [&_a]:underline-offset-4 [&_a]:break-words [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_strong]:text-slate-900 [&_table]:block [&_table]:overflow-x-auto [&_table]:w-full">
                {s.body}
              </div>
            </section>
          ))}
        </article>
      </LayoutContainer>
      <BackToTopButton />
    </main>
  );
}
