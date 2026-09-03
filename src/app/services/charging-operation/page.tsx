import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import BackToTopButton from "@/components/common/BackToTopButton";
import { RiCheckLine } from "react-icons/ri";
import {
  operationFaqs,
  operationFeatures,
  operationPlans,
  operationSites,
  operationSteps,
} from "./components/operationData";

const quoteHref = "/contact?subject=quote&interest=charging-operation";

export default function ChargingOperationPage() {
  return (
    <main className="pt-32 pb-20">
      <section className="pb-16">
        <LayoutContainer className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-700 font-semibold">
            EV charging operation
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold gradient-text leading-tight">
            Own the charger. We run the business.
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            VoltHub operates EV charging stations for malls, hotels, offices,
            condominiums and fleets in the Philippines. Your station goes live in
            the VoltHub app, drivers pay by GCash or card, we monitor every
            charger and settle your revenue monthly. Plans start at{" "}
            <strong>₱1,500 per station per month</strong>, or connect a charger
            you already own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={quoteHref}
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
            >
              Get a station proposal
            </Link>
            <Link
              href="/tools/ev-charger-roi-calculator"
              className="inline-flex items-center rounded-xl border-2 border-gray-900 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Run the ROI calculator
            </Link>
          </div>
        </LayoutContainer>
      </section>

      <section id="plans" className="py-20 bg-gray-50">
        <LayoutContainer>
          <SectionHeading
            title="Operation plans"
            description="Every plan includes the driver app, payments, monitoring and monthly settlement. Prices exclude VAT."
          />
          <div className="mt-12 max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
            {operationPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col bg-white ${
                  plan.popular
                    ? "border-2 border-primary shadow-lg"
                    : "border border-gray-200 shadow-sm"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  {plan.badge}
                </p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="ml-2 text-sm text-gray-500">{plan.unit}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{plan.fees}</p>
                <ul className="mt-5 space-y-2 text-sm flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700">
                      <RiCheckLine className="text-green-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className="mt-6 block rounded-xl bg-gray-900 px-5 py-3 text-center font-semibold text-white hover:bg-gray-800 transition-colors"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>

      <section className="py-20">
        <LayoutContainer>
          <SectionHeading
            title="What the VoltHub platform does for you"
            description="Our own driver app and OCPP backend, run by our operations team."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {operationFeatures.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </LayoutContainer>
      </section>

      <section className="py-20 bg-gray-50">
        <LayoutContainer>
          <SectionHeading title="How it works" />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {operationSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white border border-gray-200 p-5">
                <span className="text-sm font-semibold text-emerald-700">Step {index + 1}</span>
                <h3 className="mt-1 font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </LayoutContainer>
      </section>

      <section className="py-20">
        <LayoutContainer>
          <div className="rounded-3xl bg-gray-900 p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold">
              Built for site owners who want charging revenue without running a charging company
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm text-gray-200">
              {operationSites.map((site) => (
                <li key={site} className="flex items-center gap-2">
                  <RiCheckLine className="text-secondary shrink-0" />
                  {site}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-300">
              Pair it with rooftop solar and storage and the same station sells solar
              power to drivers. See the{" "}
              <Link href="/tools/ev-charger-roi-calculator" className="underline">
                solar + charging ROI calculator
              </Link>
              .
            </p>
          </div>
        </LayoutContainer>
      </section>

      <section className="py-20 bg-gray-50">
        <LayoutContainer className="max-w-4xl">
          <SectionHeading title="Frequently asked questions" />
          <dl className="mt-10 divide-y divide-gray-200">
            {operationFaqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <dt className="font-semibold text-gray-900">{faq.question}</dt>
                <dd className="mt-2 text-gray-600 leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </LayoutContainer>
      </section>

      <section className="py-20">
        <LayoutContainer className="max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Tell us about your site</h2>
          <p className="mt-3 text-gray-600">
            Send the address, number of parking slots and your electricity provider.
            We reply with a charger recommendation and a revenue estimate within two
            working days.
          </p>
          <Link
            href={quoteHref}
            className="mt-6 inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            Get a station proposal
          </Link>
        </LayoutContainer>
      </section>
      <BackToTopButton />
    </main>
  );
}
