import Link from "next/link";
import {
  RiCheckLine,
  RiDashboardLine,
  RiGlobalLine,
  RiPlugLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import BackToTopButton from "@/components/common/BackToTopButton";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import { csmsFaqs, csmsFeatures, integrationSteps } from "./components/csmsData";

const quoteHref = "/contact?subject=quote&interest=charging-operation";

const buyerChecklist = [
  "OCPP model and firmware compatibility",
  "Driver access through app, QR, RFID, or H5",
  "Payment methods, fees, refunds, and settlement schedule",
  "Live charger status, fault alerts, and session visibility",
  "Pricing controls and exportable operational reports",
  "Remote commands actually supported by the charger",
  "Driver support and site-team escalation process",
  "Data export, contract term, and exit procedure",
] as const;

export default function ChargingManagementSoftwarePage() {
  return (
    <main className="pt-32 pb-20">
      <section className="pb-16">
        <LayoutContainer className="max-w-5xl">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-700 font-semibold">
            CSMS and OCPP integration · Philippines
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold gradient-text leading-tight">
            EV Charging Management Software for Philippine Station Operators
          </h1>
          <p className="mt-6 max-w-4xl text-lg text-gray-700 leading-relaxed">
            VoltHub connects compatible OCPP chargers to one operating platform
            for station monitoring, driver access, payments, pricing, reports,
            support, and settlement. Use VoltHub-supplied equipment or request
            integration of an existing charger from another supplier.
          </p>
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-gray-800 leading-relaxed">
            <strong>For drivers:</strong> connected stations can support the
            VoltHub mobile app and a no-download H5 browser charging flow.{" "}
            <strong>For operators:</strong> OCPP is the starting requirement;
            final functions depend on charger and firmware compatibility tests.
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={quoteHref}
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
            >
              Check charger compatibility
            </Link>
            <Link
              href="/services/charging-operation#plans"
              className="inline-flex items-center rounded-xl border-2 border-gray-900 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              View operation plans
            </Link>
          </div>
        </LayoutContainer>
      </section>

      <section className="py-20 bg-gray-50">
        <LayoutContainer>
          <SectionHeading
            eyebrow="Platform capabilities"
            title="What VoltHub CSMS provides"
            description="One operating layer for compatible charging hardware, station owners, drivers, and charging revenue."
          />
          <div className="mt-12 mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {csmsFeatures.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h2>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </LayoutContainer>
      </section>

      <section className="py-20">
        <LayoutContainer className="max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-gray-950 p-8 text-white">
              <RiGlobalLine className="text-4xl text-secondary" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-bold">
                Map listing is not the same as charger control
              </h2>
              <p className="mt-4 text-gray-300 leading-relaxed">
                The VoltHub app displays Philippine EV charging stations recorded
                in the DOE EV Industry Portal, including locations operated by
                other providers. These records help drivers discover stations.
              </p>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Live availability, session start, payment, H5 charging, monitoring,
                and remote control are available only when the charger is connected
                to the VoltHub platform. A DOE map record alone does not give
                VoltHub control of another operator&apos;s charger.
              </p>
              <Link
                href="/app"
                className="mt-6 inline-flex font-semibold text-secondary underline underline-offset-4"
              >
                See how the VoltHub driver app works
              </Link>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <RiPlugLine className="text-4xl text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-bold text-gray-900">
                Bring an existing OCPP charger
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Station owners do not automatically need to replace their hardware.
                VoltHub can assess another supplier&apos;s OCPP charger for integration
                with the operator dashboard, driver channels, payments, and reports.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                OCPP compliance does not guarantee identical behavior across every
                brand. VoltHub confirms supported functions only after end-to-end
                testing of the specific model and firmware.
              </p>
              <Link
                href={quoteHref}
                className="mt-6 inline-flex font-semibold text-primary underline underline-offset-4"
              >
                Request an OCPP integration check
              </Link>
            </div>
          </div>
        </LayoutContainer>
      </section>

      <section className="py-20 bg-gray-50">
        <LayoutContainer>
          <SectionHeading
            eyebrow="Integration process"
            title="How an existing charger connects to VoltHub"
            description="A controlled compatibility process prevents a station from being advertised as operational before its transaction and safety-critical workflows have been tested."
          />
          <ol className="mt-12 mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-5">
            {integrationSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <span className="text-sm font-semibold text-emerald-700">
                  Step {index + 1}
                </span>
                <h2 className="mt-2 font-semibold text-gray-900">{step.title}</h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </LayoutContainer>
      </section>

      <section className="py-20">
        <LayoutContainer className="max-w-6xl">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <RiDashboardLine className="text-4xl text-primary" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                What station owners should compare before choosing a CSMS
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A charger appearing online is only one requirement. Compare the
                complete operating workflow, including how drivers charge, how
                money reaches the site owner, and what happens when equipment fails.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {buyerChecklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700"
                >
                  <RiCheckLine className="mt-0.5 shrink-0 text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </LayoutContainer>
      </section>

      <section className="py-20 bg-gray-950 text-white">
        <LayoutContainer className="max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <RiShieldCheckLine className="text-4xl text-secondary" aria-hidden="true" />
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">
                DOE-accredited EVCS Supplier, Service Provider, and Operator
              </h2>
              <p className="mt-4 text-gray-300 leading-relaxed">
                The DOE EV Industry Portal lists VoltHub Electronic Power
                Generation Services Corporation under accreditation number{" "}
                <strong>DOE-EUMB-ANA-20260210003</strong>, with National
                Accreditation Level status in all three categories and validity
                through June 7, 2029.
              </p>
              <a
                href="https://evindustry.ph/accreditation-details/DOE-EUMB-ANA-20260210003"
                className="mt-5 inline-flex font-semibold text-secondary underline underline-offset-4"
              >
                Verify VoltHub on the DOE EV Industry Portal
              </a>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Published operation plans</h3>
              <div className="mt-5 space-y-5 text-sm text-gray-300">
                <div>
                  <p className="font-semibold text-white">Existing OCPP charger</p>
                  <p>₱2,500 per station/month + onboarding and revenue commission</p>
                </div>
                <div>
                  <p className="font-semibold text-white">VoltHub charger + app</p>
                  <p>₱2,000 per station/month + applicable transaction and revenue fees</p>
                </div>
              </div>
              <p className="mt-5 text-xs text-gray-400">
                Prices exclude VAT. Hardware, site work, connectivity, and final
                commercial terms depend on the project scope.
              </p>
              <Link
                href="/services/charging-operation#plans"
                className="mt-5 inline-flex font-semibold text-secondary underline underline-offset-4"
              >
                Review plan details and fees
              </Link>
            </div>
          </div>
        </LayoutContainer>
      </section>

      <section className="py-20 bg-gray-50">
        <LayoutContainer className="max-w-4xl">
          <SectionHeading
            eyebrow="Questions and answers"
            title="EV charging software FAQ"
          />
          <dl className="mt-10 divide-y divide-gray-200">
            {csmsFaqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-gray-600 leading-relaxed">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </LayoutContainer>
      </section>

      <section className="py-20">
        <LayoutContainer className="max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Check whether your charger can connect to VoltHub
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Send the charger brand, model, firmware, OCPP version, number of
            connectors, current backend status, and site location. VoltHub will
            review the available integration path and required compatibility test.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={quoteHref}
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
            >
              Request a compatibility check
            </Link>
            <Link
              href="/blog/best-ev-charging-apps-philippines"
              className="inline-flex items-center rounded-xl border-2 border-gray-900 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Compare EV charging apps
            </Link>
          </div>
        </LayoutContainer>
      </section>
      <BackToTopButton />
    </main>
  );
}
