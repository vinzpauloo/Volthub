"use client";

import { useState } from "react";
import Link from "next/link";
import { RiArrowRightLine, RiDownloadLine, RiMailLine } from "react-icons/ri";
import LayoutContainer from "@/components/layout/LayoutContainer";

interface LeadCaptureSectionProps {
  badge?: string;
  title: string;
  description: string;
  newsletterTitle?: string;
  newsletterDescription?: string;
  resourceTitle?: string;
  resourceDescription?: string;
  consultationCta?: string;
  quoteCta?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function LeadCaptureSection({
  badge = "Get Started Today",
  title,
  description,
  newsletterTitle = "Newsletter",
  newsletterDescription = "Stay updated with the latest energy solutions, tips, and exclusive offers.",
  resourceTitle = "Free Guide",
  resourceDescription = 'Download our comprehensive guide: "Complete Guide to Energy Savings" - absolutely free!',
  consultationCta = "Schedule Free Consultation",
  quoteCta = "Get Instant Quote",
}: LeadCaptureSectionProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<FormStatus>("idle");

  const [guideName, setGuideName] = useState("");
  const [guideEmail, setGuideEmail] = useState("");
  const [guideStatus, setGuideStatus] = useState<FormStatus>("idle");

  async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Newsletter",
          lastName: "Subscriber",
          email: newsletterEmail.trim(),
          interest: "newsletter-signup",
        }),
      });
      const data: { ok: boolean } = await res.json();
      setNewsletterStatus(data.ok ? "success" : "error");
      if (data.ok) setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
    }
  }

  async function handleGuideSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!guideName.trim() || !guideEmail.trim()) return;

    setGuideStatus("loading");
    try {
      const nameParts = guideName.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "-";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: guideEmail.trim(),
          interest: "free-guide-download",
        }),
      });
      const data: { ok: boolean } = await res.json();
      setGuideStatus(data.ok ? "success" : "error");
      if (data.ok) {
        setGuideName("");
        setGuideEmail("");
      }
    } catch {
      setGuideStatus("error");
    }
  }

  return (
    <section className="section-spacing bg-gradient-to-br from-primary via-primary/95 to-accent text-white">
      <LayoutContainer>
        <div className="max-w-4xl mx-auto text-center space-y-8 reveal-on-scroll">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-white/80 uppercase mb-4">{badge}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">{description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <RiMailLine className="text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold">{newsletterTitle}</h3>
              </div>
              <p className="text-white/90 mb-6">{newsletterDescription}</p>
              {newsletterStatus === "success" ? (
                <p className="text-green-200 font-medium py-3">Thanks for subscribing!</p>
              ) : (
                <form className="space-y-4" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  {newsletterStatus === "error" && (
                    <p className="text-red-200 text-sm">Something went wrong. Please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="w-full bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              )}
            </div>

            {/* Free Resource Download */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <RiDownloadLine className="text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold">{resourceTitle}</h3>
              </div>
              <p className="text-white/90 mb-6">{resourceDescription}</p>
              {guideStatus === "success" ? (
                <p className="text-green-200 font-medium py-3">Check your email for the guide!</p>
              ) : (
                <form className="space-y-4" onSubmit={handleGuideSubmit}>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={guideName}
                    onChange={(e) => setGuideName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={guideEmail}
                    onChange={(e) => setGuideEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  {guideStatus === "error" && (
                    <p className="text-red-200 text-sm">Something went wrong. Please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={guideStatus === "loading"}
                    className="w-full bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {guideStatus === "loading" ? "Submitting..." : "Download Free Guide"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Contact CTA */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-white/90 mb-6">Or get in touch directly for a personalized consultation</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                {consultationCta}
                <RiArrowRightLine className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 group"
              >
                {quoteCta}
                <RiArrowRightLine className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
