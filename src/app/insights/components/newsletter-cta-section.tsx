"use client";

import { useState } from "react";
import Link from "next/link";

const NewsletterCtaSection = (): React.ReactElement => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Insights Subscriber",
          email: email.trim(),
          interest: "newsletter-signup",
          message: "Newsletter signup from /insights page",
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  };

  return (
    <section className="py-16 border-t border-gray-100">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Stay Updated
        </h3>
        <p className="text-gray-600 mb-8">
          Get the latest Philippines clean energy market insights delivered to
          your inbox.
        </p>

        {status === "success" ? (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6">
            <p className="text-emerald-800 font-semibold">
              Thanks for subscribing!
            </p>
            <p className="text-emerald-600 text-sm mt-1">
              We&apos;ll keep you updated with the latest market insights.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-600 text-sm mt-3">{errorMessage}</p>
        )}

        <p className="text-sm text-gray-500 mt-6">
          Or{" "}
          <Link
            href="/contact"
            className="text-emerald-700 font-medium hover:underline"
          >
            get a free consultation
          </Link>{" "}
          from our team.
        </p>
      </div>
    </section>
  );
};

export default NewsletterCtaSection;
