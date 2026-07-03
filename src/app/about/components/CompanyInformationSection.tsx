import { RiVerifiedBadgeLine } from "react-icons/ri";
import { companyInformation } from "./data";

/** Circular official seal — gold foil stamp style */
function OfficialSeal({ text, subtext }: { text: string; subtext: string }) {
  const gradientId = `gold-${text}`;
  return (
    <div className="absolute bottom-5 right-5 w-[72px] h-[72px] md:w-[80px] md:h-[80px] flex items-center justify-center pointer-events-none select-none">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b8860b" />
            <stop offset="30%" stopColor="#daa520" />
            <stop offset="60%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2.5" />
        <circle cx="50" cy="50" r="43" fill="none" stroke={`url(#${gradientId})`} strokeWidth="0.8" opacity="0.6" />
        <circle cx="50" cy="50" r="38" fill="none" stroke={`url(#${gradientId})`} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
        <text x="50" y="43" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill={`url(#${gradientId})`} fontWeight="bold" fontFamily="serif">{text}</text>
        <text x="50" y="56" textAnchor="middle" fontSize="4.5" fill={`url(#${gradientId})`} fontWeight="bold" fontFamily="serif">{subtext}</text>
      </svg>
    </div>
  );
}

/** Guilloche border pattern — thin engraved repeating geometric frame */
function GuillocheBorder({ colorClass }: { colorClass: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none border-2 ${colorClass} opacity-30`} aria-hidden="true">
      {/* Inner engraved line */}
      <div className={`absolute inset-[3px] border ${colorClass} opacity-20`} />
      {/* Corner ornaments */}
      <div className={`absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 ${colorClass} opacity-40`} />
      <div className={`absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 ${colorClass} opacity-40`} />
      <div className={`absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 ${colorClass} opacity-40`} />
      <div className={`absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 ${colorClass} opacity-40`} />
    </div>
  );
}

/** Background watermark — faint anti-counterfeiting pattern */
function Watermark() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden" aria-hidden="true">
      {/* Concentric circles — subtle security pattern */}
      <svg viewBox="0 0 200 200" className="absolute w-[60%] max-w-[300px] opacity-[0.025]">
        {[20, 35, 50, 65, 80, 95].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeWidth="0.3" />
        ))}
        {/* Crosshair lines */}
        <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.2" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.2" />
      </svg>
    </div>
  );
}

/** Signature line with label */
function SignatureArea({ title }: { title: string }) {
  return (
    <div className="mt-6 pt-4 border-t border-gray-100">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          {/* Signature image placeholder — cursive digital script */}
          <svg viewBox="0 0 180 40" className="w-36 h-8 opacity-40" aria-hidden="true">
            <path
              d="M5 30 Q20 15 35 25 T65 20 T95 28 T125 18 T155 25 T175 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <div className="h-px bg-gray-300 mt-0.5 w-44" />
          <p className="text-[9px] text-gray-400 mt-0.5 tracking-wide font-serif italic">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CompanyInformationSection() {
  const { legalName, tradeName, incorporationDate, incorporationPlace, registeredOffice, registrations } = companyInformation;

  const secReg = registrations.find((r) => r.label.includes("SEC"))?.value ?? "";
  const birTin = registrations.find((r) => r.label.includes("TIN"))?.value ?? "";
  const taxpayerType = registrations.find((r) => r.label.includes("Taxpayer"))?.value ?? "";
  const psicPrimary = registrations.find((r) => r.label.includes("Primary"))?.value ?? "";
  const psicSecondary = registrations.find((r) => r.label.includes("Secondary"))?.value ?? "";

  return (
    <section aria-labelledby="credentials-heading" className="py-8 md:py-12">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-4">
            <RiVerifiedBadgeLine className="h-4 w-4" />
            100% Transparent Legal Compliance
          </span>
          <h2 id="credentials-heading" className="text-3xl font-bold text-gray-900">
            Corporate Credential Verification
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base max-w-lg mx-auto">
            All credentials below come directly from official legal certificates issued by the Philippine government.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ═══════════ Certificate 1: SEC ═══════════ */}
          <div className="relative overflow-hidden">
            <GuillocheBorder colorClass="border-blue-300" />
            <Watermark />

            <div className="relative p-6 md:p-8">
              {/* SEC Header */}
              <div className="text-center mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-800 mb-1 font-serif">
                  Republic of the Philippines
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600 mb-2">
                  Securities and Exchange Commission
                </p>
                <div className="mx-auto w-12 h-px bg-blue-300 mb-3" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-wide">
                  CERTIFICATE OF INCORPORATION
                </h3>
              </div>

              {/* Certificate body */}
              <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed text-center">
                <p className="font-serif italic text-gray-500">
                  This certifies that
                </p>
                <p className="text-base md:text-lg font-bold text-gray-900 leading-snug">
                  {legalName}
                </p>
                <p className="text-gray-500 text-sm">
                  Doing Business As: <span className="font-semibold text-gray-700">{tradeName}</span>
                </p>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-sm">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">Date of Registration</p>
                    <p className="font-semibold text-gray-900 text-xs md:text-sm">{incorporationDate}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">Place of Incorporation</p>
                    <p className="font-semibold text-gray-900 text-xs md:text-sm">{incorporationPlace}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">SEC Registration No.</p>
                    <p className="font-semibold text-gray-900 text-xs md:text-sm break-all">{secReg}</p>
                  </div>
                </div>
              </div>

              <SignatureArea title="Corporate Secretary Verification" />
              <OfficialSeal text="SEC" subtext="Republic of the Philippines" />
            </div>
          </div>

          {/* ═══════════ Certificate 2: BIR / PSIC ═══════════ */}
          <div className="relative overflow-hidden">
            <GuillocheBorder colorClass="border-amber-300" />
            <Watermark />

            <div className="relative p-6 md:p-8">
              {/* BIR Header */}
              <div className="text-center mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-800 mb-1 font-serif">
                  Republic of the Philippines
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">
                  Bureau of Internal Revenue
                </p>
                <div className="mx-auto w-12 h-px bg-amber-300 mb-3" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-wide">
                  TAX COMPLIANCE & ACTIVITY RECORD
                </h3>
                <p className="text-[10px] text-gray-400 mt-1 font-serif italic">Form 2303</p>
              </div>

              {/* Certificate body */}
              <div className="space-y-4 text-sm md:text-base">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">Taxpayer Entity</p>
                    <p className="font-semibold text-gray-900 text-sm">{taxpayerType}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">TIN</p>
                    <p className="font-semibold text-gray-900 text-sm">{birTin}</p>
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-100">
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">Registered Office Address</p>
                  <p className="font-semibold text-gray-900 text-sm leading-relaxed">{registeredOffice}</p>
                </div>

                {/* PSIC — sharp-cornered tabular layout */}
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-2">
                    Authorized Industrial Classifications (PSIC)
                  </p>
                  <div className="border border-gray-300 rounded-none overflow-hidden">
                    <div className="grid grid-cols-[auto_1fr] text-sm">
                      <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 text-[9px] uppercase tracking-wider text-gray-500 font-semibold">
                        Primary
                      </div>
                      <div className="px-3 py-2 border-b border-gray-200 text-sm font-semibold text-gray-900">
                        {psicPrimary}
                      </div>
                      <div className="bg-gray-100 px-3 py-2 text-[9px] uppercase tracking-wider text-gray-500 font-semibold">
                        Secondary
                      </div>
                      <div className="px-3 py-2 text-sm font-semibold text-gray-900">
                        {psicSecondary}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <SignatureArea title="Authorized BIR Compliance Officer" />
              <OfficialSeal text="BIR" subtext="Republic of the Philippines" />
            </div>
          </div>

        </div>

        {/* ── Footer note ── */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Source documents: SEC Certificate of Incorporation &amp; BIR Certificate of Registration (Form 2303).
          Both are available for verification upon legitimate business request.
        </p>
      </div>
    </section>
  );
}
