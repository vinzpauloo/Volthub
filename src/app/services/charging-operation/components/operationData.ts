export const operationPlans = [
  {
    name: "Charger + App",
    badge: "Most popular",
    price: "₱1,500",
    priceValue: "1500",
    unit: "per station / month",
    fees: "5% commission on charging revenue · 2.5% app transaction fee",
    includes: [
      "VoltHub OCPP charger supplied and installed",
      "Listed in the VoltHub driver app (iOS and Android)",
      "Driver payments: GCash, cards, VoltHub wallet",
      "Operator dashboard: revenue, sessions, uptime",
      "Remote monitoring and fault alerts",
      "Monthly settlement to your bank account",
      "Driver and site support",
    ],
    cta: "Get a quote",
    href: "/contact?subject=quote&interest=charging-operation",
    popular: true,
  },
  {
    name: "App only",
    badge: "Bring your own charger",
    price: "₱2,000",
    priceValue: "2000",
    unit: "per station / month",
    fees: "7% commission on charging revenue · ₱25,000 one-time onboarding",
    includes: [
      "Connect any OCPP 1.6J charger you already own",
      "Listed in the VoltHub driver app",
      "Driver payments and wallet",
      "Operator dashboard and monitoring",
      "Monthly settlement",
      "Support for drivers and site staff",
    ],
    cta: "Check compatibility",
    href: "/contact?subject=quote&interest=charging-operation",
    popular: false,
  },
  {
    name: "Hardware only",
    badge: "One-time purchase",
    price: "Quoted",
    priceValue: null,
    unit: "per project",
    fees: "No monthly fee, no commission",
    includes: [
      "AC 7 kW / 21 kW or DC 30 kW to 400 kW chargers",
      "Installation by licensed electricians",
      "Use your own CSMS or run it offline",
      "Warranty and maintenance packages available",
    ],
    cta: "See chargers",
    href: "/services/ev-charging",
    popular: false,
  },
] as const;

export const operationFeatures = [
  {
    title: "Driver app",
    description:
      "Drivers find your station, start a session by QR or RFID, and pay in the VoltHub app. Live on Google Play and the App Store.",
  },
  {
    title: "Payments and wallet",
    description:
      "GCash, credit and debit cards, and VoltHub wallet. Unused balance is refunded automatically. Receipts are issued in-app.",
  },
  {
    title: "Operator dashboard",
    description:
      "Revenue by station and by day, session history, kWh delivered, uptime. Export reports for your accountant.",
  },
  {
    title: "OCPP 1.6J backend",
    description:
      "Any OCPP-compliant charger connects to our backend. Remote start, stop, reset, firmware updates and load management.",
  },
  {
    title: "Pricing control",
    description:
      "Set per-kWh or per-minute rates, idle fees, member rates and time-of-day pricing per station.",
  },
  {
    title: "Monitoring and alerts",
    description:
      "An offline charger, faulted connector or stuck session alerts our operations team and you.",
  },
  {
    title: "Settlement",
    description:
      "Charging revenue less the agreed commission is settled to your account monthly with a line-by-line statement.",
  },
  {
    title: "Support",
    description:
      "Drivers call us, not you. Site staff get a hotline and a simple guide for common issues.",
  },
] as const;

export const operationSteps = [
  {
    title: "Site check",
    description:
      "We review your parking, electrical capacity and expected traffic and recommend AC or DC chargers.",
  },
  {
    title: "Install and connect",
    description:
      "Licensed electricians install the chargers. We connect them to the VoltHub backend and test end to end.",
  },
  {
    title: "Go live in the app",
    description:
      "Your station appears in the VoltHub app with your pricing. We hand you dashboard access.",
  },
  {
    title: "We operate, you collect",
    description:
      "We handle payments, monitoring and support. You receive monthly settlement and reports.",
  },
] as const;

export const operationSites = [
  "Malls and retail parks",
  "Hotels and resorts",
  "Office buildings and BPO campuses",
  "Condominiums and HOAs",
  "Fuel stations and rest stops",
  "Fleet depots and logistics hubs",
] as const;

export const operationFaqs = [
  {
    question: "What is an EV charging operation service?",
    answer:
      "VoltHub runs the day-to-day business of your charging station: listing it in the driver app, collecting payments, monitoring the chargers, handling driver support and paying you the revenue. You own the site and the charger; we operate it as a charge point operator (CPO).",
  },
  {
    question: "Do I have to buy VoltHub chargers?",
    answer:
      "No. The App-only plan connects any OCPP 1.6J charger you already own. The Charger + App plan is cheaper per month because the charger is supplied by us and pre-configured.",
  },
  {
    question: "How and when do I get paid?",
    answer:
      "Charging revenue is collected in the VoltHub app. Each month we deduct the agreed commission and app transaction fee and transfer the balance to your bank account with a statement.",
  },
  {
    question: "Can I set my own charging price?",
    answer:
      "Yes. You set the per-kWh rate and optional idle fee in the dashboard, or ask us to recommend a rate based on nearby stations and your electricity cost.",
  },
  {
    question: "What locations work best?",
    answer:
      "Malls, hotels, offices, condominiums, hospitals, fuel stations and fleet depots. AC 7 kW to 21 kW chargers suit places where cars park for two hours or more. DC fast chargers suit highway and high-traffic sites. Use our ROI calculator to compare.",
  },
  {
    question: "Is there a minimum contract?",
    answer:
      "Operation plans run on a 12-month term, renewable. Hardware-only purchases have no term.",
  },
  {
    question: "Is VoltHub a registered charging provider?",
    answer:
      "VoltHub Electronic Power Generation Services Corporation is a Philippine domestic corporation registered with SEC and BIR, headquartered in BGC, Taguig. Ask us for our DOE EVCS documentation.",
  },
];
