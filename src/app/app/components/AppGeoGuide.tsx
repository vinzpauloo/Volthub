import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";

const operatorFeatures = [
  {
    title: "Connect OCPP chargers",
    description:
      "Already own another brand of charger? If it supports OCPP, VoltHub can assess and connect it to the platform after endpoint, security, meter-value, and remote-command compatibility testing.",
  },
  {
    title: "List stations in the app",
    description:
      "Publish the site location, connectors, power, price, operating hours, and live status for drivers using the VoltHub app.",
  },
  {
    title: "Accept driver payments",
    description:
      "Support wallet, GCash, and card payments, then receive itemized monthly charging-revenue settlement under the selected operation plan.",
  },
  {
    title: "Monitor and control",
    description:
      "View sessions, energy delivered, revenue, uptime, and faults, with remote start, stop, reset, pricing, and alert tools where the charger exposes the required OCPP functions.",
  },
];

const appFaqs = [
  {
    question: "What is the VoltHub EV charging app?",
    answer:
      "The VoltHub app is a free iOS and Android app for finding VoltHub-connected charging stations, checking connector availability, starting a charging session by QR code or RFID, monitoring the session, paying, and reviewing charging history.",
  },
  {
    question: "Does the VoltHub app show every EV charging station in the Philippines?",
    answer:
      "No. The map shows stations connected to the VoltHub platform as they become available. For the current network, locations, connector types, power, and availability, check the live map in the app or on this page before travelling.",
  },
  {
    question: "How do I start and pay for charging?",
    answer:
      "At a connected station, plug in the compatible connector, scan the QR code in the app or use a registered RFID card, confirm the connector and displayed price, then pay with the available wallet, GCash, or card option.",
  },
  {
    question: "Can VoltHub connect a charger supplied by another company?",
    answer:
      "Yes. If the charger supports OCPP, VoltHub can assess it for connection to the app and operator platform. Final onboarding requires compatibility testing of the charger's OCPP version, endpoint and security settings, meter values, remote commands, and firmware behavior.",
  },
  {
    question: "What does VoltHub provide to charging-station operators?",
    answer:
      "VoltHub can provide app listing, driver payments, QR or RFID session access, monitoring, pricing controls, alerts, reporting, driver support, and monthly revenue settlement. Site owners can use VoltHub-supplied equipment or request integration of an existing OCPP charger.",
  },
];

export function AppGeoGuide() {
  return (
    <section className="py-20 bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            For drivers and station operators
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            One EV charging app, including chargers you already own
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Drivers use VoltHub to find connected stations, start charging, pay,
            and monitor sessions. Charging-station owners can also connect an
            existing third-party charger: if it supports OCPP, VoltHub can assess
            it for onboarding to the app, payments, monitoring, and operator
            dashboard without requiring the purchase of a new VoltHub charger.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {operatorFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-7 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Have an OCPP charger from another supplier?
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-5">
            Send the brand, model, OCPP version, current backend status, number of
            connectors, and site location. VoltHub will confirm the integration
            path and required compatibility test.
          </p>
          <Link
            href="/services/charging-operation"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
          >
            See charger integration and operation plans
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            Choosing an app as a driver or station owner? Read our{" "}
            <Link
              href="/blog/best-ev-charging-apps-philippines"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Philippine EV charging app comparison
            </Link>
            .
          </p>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-7 text-center">
            VoltHub app frequently asked questions
          </h2>
          <div className="space-y-5">
            {appFaqs.map((faq) => (
              <div key={faq.question} className="border-b border-gray-200 pb-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
