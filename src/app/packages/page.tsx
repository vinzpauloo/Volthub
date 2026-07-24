"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  RiCloseLine,
  RiCheckLine,
  RiDownloadLine,
} from "react-icons/ri";

interface PackageItem {
  _id?: string;
  name: string;
  price: string;
  description: string;
  packageOverview: string;
  includes: Array<{ label: string; icon: string }>;
  featured: boolean;
  thumbnails?: string[];
}

export default function PackagesPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Quote modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteCompany, setQuoteCompany] = useState("");
  const [quoteAddress, setQuoteAddress] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [quoteRef, setQuoteRef] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("https://volthub-admin-one.vercel.app/api/public/packages");
        const data = await response.json();
        
        // Handle different response structures
        const packagesArray = Array.isArray(data) ? data : data?.data || data?.packages || [];
        setPackages(packagesArray);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  function openQuoteModal(item: PackageItem) {
    setSelectedPackage(item);
    setQuoteName("");
    setQuoteEmail("");
    setQuotePhone("");
    setQuoteCompany("");
    setQuoteAddress("");
    setQuoteNotes("");
    setQuoteSubmitted(false);
    setQuoteError(null);
    setQuoteRef(null);
    setShowQuoteModal(true);
  }

  function downloadPdfQuotation(pkg?: PackageItem) {
    const pkgData = pkg ?? selectedPackage;
    if (!pkgData) return;
    const timestamp = new Date().toLocaleString("en-PH", { dateStyle: "long", timeStyle: "short" });

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>VoltHub Quotation — ${pkgData.name}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;padding:40px;max-width:800px;margin:0 auto}
  .header{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #16a34a;padding-bottom:20px;margin-bottom:24px}
  .header h1{font-size:28px;color:#0f172a}.header .brand{color:#16a34a}
  .header .badge{background:#16a34a;color:#fff;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600}
  .meta{color:#64748b;font-size:12px;margin-bottom:20px}
  .section{margin-bottom:24px}
  .section h2{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:8px}
  .card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px}
  .card p{margin:4px 0;font-size:14px}
  .package-row{border:1px solid #e2e8f0;border-radius:10px;padding:16px;background:#fff}
  .package-row .name{font-size:18px;font-weight:700;color:#0f172a}
  .package-row .desc{font-size:13px;color:#64748b;margin-top:4px}
  .package-row .price{font-size:20px;font-weight:700;color:#16a34a;margin-top:8px}
  table{width:100%;border-collapse:collapse}
  table.summary{border:2px solid #e2e8f0;border-radius:10px;overflow:hidden}
  table.summary td{padding:10px 16px;font-size:14px;border-bottom:1px solid #e2e8f0}
  .includes{margin-top:12px}
  .includes li{font-size:13px;color:#475569;padding:4px 0;list-style:none}
  .includes li::before{content:"✓ ";color:#16a34a;font-weight:700}
  .footer{text-align:center;color:#94a3b8;font-size:11px;margin-top:40px;padding-top:16px;border-top:1px solid #e2e8f0}
  @media print{body{padding:20px}}
</style></head><body>
<div class="header">
  <div><h1>Volt<span class="brand">Hub</span></h1><p style="font-size:12px;color:#64748b">EV Charging & Energy Solutions</p></div>
  <div class="badge">Quotation</div>
</div>
<p class="meta">Date: ${timestamp} &nbsp;|&nbsp; Ref: ${quoteRef || "—"}</p>

<div class="section"><h2>Customer Information</h2>
  <div class="card">
    <p><strong>${quoteName || "—"}</strong>${quoteCompany ? ` &mdash; ${quoteCompany}` : ""}</p>
    <p>✉ ${quoteEmail || "—"}${quotePhone ? ` &nbsp;|&nbsp; 📞 ${quotePhone}` : ""}</p>
    ${quoteAddress ? `<p>📍 ${quoteAddress}</p>` : ""}
    ${quoteNotes ? `<p style="margin-top:8px;font-style:italic;color:#64748b">"${quoteNotes}"</p>` : ""}
  </div>
</div>

<div class="section"><h2>Installation Package</h2>
  <div class="package-row">
    <p class="name">${pkgData.name}</p>
    <p class="desc">${pkgData.description}</p>
    <p class="price">${pkgData.price}</p>
    <div class="includes">
      <p style="font-size:13px;font-weight:600;color:#475569;margin-bottom:4px">What's included:</p>
      <ul>${pkgData.includes.map((inc) => `<li>${inc.icon} ${inc.label}</li>`).join("")}</ul>
    </div>
  </div>
</div>

<div class="section"><h2>Package Overview</h2>
  <div class="card"><p>${pkgData.packageOverview}</p></div>
</div>

<div class="section"><h2>Quote Summary</h2>
  <table class="summary">
    <tr><td style="color:#64748b">Package</td><td align="right" style="font-weight:600">${pkgData.name}</td></tr>
    <tr><td style="color:#64748b">Starting Price</td><td align="right" style="font-weight:600;color:#16a34a">${pkgData.price}</td></tr>
  </table>
</div>

<div class="footer"><p>Generated from volthub.ph — For inquiries contact sales@volthub.ph</p></div>
<script>window.onload=function(){window.print()}</script>
</body></html>`;

    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
    }
  }

  async function submitQuote() {
    if (!quoteName.trim() || !quoteEmail.trim() || !selectedPackage) return;
    setQuoteSubmitting(true);
    setQuoteError(null);
    setQuoteRef(null);

    try {
      // 1. Save to backend quotation system
      const backendRes = await fetch("https://volthub-admin-one.vercel.app/api/public/quotation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteName.trim(),
          email: quoteEmail.trim(),
          phone: quotePhone.trim() || undefined,
          company_name: quoteCompany.trim() || undefined,
          address: quoteAddress.trim() || undefined,
          site_address: quoteAddress.trim() || undefined,
          project_type: "ev_charger",
          notes: quoteNotes.trim() || `Package: ${selectedPackage.name} — ${selectedPackage.price}`,
          items: [
            {
              description: `${selectedPackage.name} — Installation Package`,
              quantity: 1,
              unit_price: 0,
            },
          ],
        }),
      });

      let refNo: string | null = null;
      if (backendRes.ok) {
        const backendJson = await backendRes.json();
        refNo = backendJson?.data?.reference_no ?? null;
      }

      // 2. Send formatted email via our API
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: quoteName.trim(),
          customerEmail: quoteEmail.trim(),
          customerPhone: quotePhone.trim() || undefined,
          customerCompany: quoteCompany.trim() || undefined,
          customerAddress: quoteAddress.trim() || undefined,
          customerNotes: quoteNotes.trim() || undefined,
          productName: selectedPackage.name,
          productImage: selectedPackage.thumbnails?.[0] ?? "",
          productSku: selectedPackage._id,
          quantity: 1,
          includeInstallation: false,
          solarSetup: null,
          subtotal: 0,
          total: 0,
          referenceNo: refNo,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to send" }));
        throw new Error(err.error || "Failed to send quote");
      }

      setQuoteRef(refNo);
      setQuoteSubmitted(true);
    } catch (err: unknown) {
      setQuoteError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setQuoteSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center pt-32 pb-20">
        <p className="text-muted-foreground">Loading packages...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_45%)] dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.06),_transparent_45%)] pt-32 pb-20">
      <section className="w-full mx-auto flex max-w-[80%] flex-col gap-10 px-6 lg:px-12">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-300">
            Installation Packages
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            EV Charger Installation Packages
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
            From basic mounting to fully equipped bundles with charger and enclosure — choose the package that fits your property and charging needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item) => (
            <article
              key={item.name}
              className={`flex flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                item.featured ? "ring-2 ring-emerald-500/30" : ""
              }`}
            >
             
              <div className="flex flex-1 flex-col p-4 ">
              

                <div className="rounded-2xl p-2">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{item.name}</h2>
                  <p className=" text-sm leading-5 text-muted-foreground">{item.description}</p>
                </div>

                {item.thumbnails && item.thumbnails.length > 0 && (
                  <div className="mt-1">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Product purchase
                    </p>
                    <div className="flex gap-2">
                      {item.thumbnails.map((thumb, index) => (
                        <button
                          key={`${item.name}-${index}`}
                          type="button"
                          onClick={() => setSelectedImage(thumb)}
                          className="h-8 w-8 overflow-hidden  border border-border/70 bg-muted/40 p-0 transition hover:scale-[1.02] hover:border-emerald-500/40"
                        >
                          <img
                            src={thumb}
                            alt={`${item.name} thumbnail ${index + 1}`}
                            className="h-full w-full object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 ">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground bg-red">
                    What&apos;s included
                  </p>
                  <div className="mt-2 flex flex-col gap-3">
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {item.includes.map((include) => (
                        <li key={include.label} className="flex items-start gap-2">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm text-emerald-600">
                            {include.icon}
                          </span>
                          <span>{include.label}</span>
                        </li>
                      ))}
                    </ul>


                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-slate-900 dark:text-white">Package overview</p>
                      <p className="mt-2 leading-6">
                        {item.packageOverview}
                      </p>
                      <p className="mt-2 text-[12px] leading-5 text-emerald-700 dark:text-emerald-400">
                        Note: Additional charges may apply for remote locations or site conditions that require extra travel or setup work.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-border/60 pt-3">
                  <div className="flex items-end justify-between gap-3 mb-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Starting at</p>
                      <p className="text-2xl font-semibold text-slate-900 dark:text-white">{item.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => openQuoteModal(item)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-700"
                    >
                      Request a Quotation
                    </button>
                   
                  </div>
                </div>

             
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                Need a tailored solution for your property or project?
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Tell us about your site requirements and we’ll help you choose the best package for installation, charging capacity, and enclosure needs.
              </p>
            </div>
            <Link
              href="/contact?subject=package-quote"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-700"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black/90 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Selected package preview"
              className="h-full w-full object-stretch"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Quote Request Modal ── */}
      {showQuoteModal && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowQuoteModal(false)}>
          <div className="bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/80">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {quoteSubmitted ? "Quote Sent!" : "Request a Quotation"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {quoteSubmitted ? "Our team will contact you shortly." : `Package: ${selectedPackage.name}`}
                </p>
              </div>
              <button onClick={() => setShowQuoteModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground">
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {!quoteSubmitted ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" value={quoteName} onChange={(e) => setQuoteName(e.target.value)}
                      placeholder="Juan Dela Cruz" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email <span className="text-red-500">*</span></label>
                    <input type="email" value={quoteEmail} onChange={(e) => setQuoteEmail(e.target.value)}
                      placeholder="juan@example.com" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                    <input type="tel" value={quotePhone} onChange={(e) => setQuotePhone(e.target.value)}
                      placeholder="+63 9XX XXX XXXX" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                    <input type="text" value={quoteCompany} onChange={(e) => setQuoteCompany(e.target.value)}
                      placeholder="ABC Corp (optional)" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Site Address</label>
                    <input type="text" value={quoteAddress} onChange={(e) => setQuoteAddress(e.target.value)}
                      placeholder="BGC, Taguig (optional)" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Notes</label>
                    <textarea value={quoteNotes} onChange={(e) => setQuoteNotes(e.target.value)}
                      placeholder="Any special requirements or questions..." rows={2}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none" />
                  </div>

                  {/* Mini summary */}
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 border border-border space-y-1.5 text-xs">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Selected Package:</p>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package</span>
                      <span className="font-medium text-slate-900 dark:text-white truncate ml-2 max-w-[60%]">{selectedPackage.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Starting Price</span>
                      <span className="font-medium text-emerald-700 dark:text-emerald-400">{selectedPackage.price}</span>
                    </div>
                  </div>

                  {quoteError && <p className="text-sm text-red-500 text-center">{quoteError}</p>}

                  <button
                    type="button"
                    onClick={submitQuote}
                    disabled={quoteSubmitting || !quoteName.trim() || !quoteEmail.trim()}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-4 py-3 rounded-xl shadow-lg transition-all text-base"
                  >
                    {quoteSubmitting ? "Sending…" : "Send Quote Request"}
                  </button>
                </>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    <RiCheckLine className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your quote request has been sent to our sales team at <strong>sales@volthub.ph</strong>.
                    {quoteRef && <span className="block mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 text-slate-700 dark:text-slate-300">Ref: <strong>{quoteRef}</strong></span>}
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button type="button" onClick={() => downloadPdfQuotation()}
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all text-sm">
                    <RiDownloadLine className="h-4 w-4" /> Download PDF Copy
                  </button>
                  <button onClick={() => setShowQuoteModal(false)} className="block text-sm text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">Close</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
