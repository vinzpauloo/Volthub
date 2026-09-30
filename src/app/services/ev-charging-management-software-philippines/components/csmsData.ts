export const csmsFeatures = [
  {
    title: "Third-party OCPP integration",
    description:
      "Connect an existing charger from another supplier after VoltHub tests its OCPP version, endpoint, security profile, meter values, connector behavior, remote commands, and firmware implementation.",
  },
  {
    title: "Driver app and H5 charging",
    description:
      "Serve regular drivers through the VoltHub iOS or Android app and offer a no-download H5 browser charging flow at supported VoltHub-connected stations.",
  },
  {
    title: "Payments and settlement",
    description:
      "Enable the payment options configured for the station, record charging transactions, and receive itemized monthly revenue settlement under the selected operation plan.",
  },
  {
    title: "Live station operations",
    description:
      "Monitor charger status, sessions, energy, faults, uptime, and revenue, with remote start, stop, reset, pricing, and alert functions where supported by the charger.",
  },
  {
    title: "Pricing and reporting",
    description:
      "Manage charging prices and review station-level session, energy, uptime, and financial reports from the operator dashboard.",
  },
  {
    title: "Driver and site support",
    description:
      "Give drivers a clear charging channel while site teams receive an escalation path for failed sessions, offline equipment, and common station issues.",
  },
] as const;

export const integrationSteps = [
  {
    title: "Share the charger details",
    description:
      "Send the brand, model, firmware, OCPP version, number of connectors, site location, network method, and current backend status.",
  },
  {
    title: "Review the OCPP setup",
    description:
      "VoltHub checks the endpoint method, charger identity, authorization, security settings, supported messages, and available documentation.",
  },
  {
    title: "Run compatibility tests",
    description:
      "The team validates boot and status notifications, authorization, transactions, meter values, remote commands, faults, and connector behavior.",
  },
  {
    title: "Configure the station",
    description:
      "After a successful test, VoltHub configures the site, connectors, power, pricing, access method, payments, support path, and operator account.",
  },
  {
    title: "Launch and monitor",
    description:
      "The connected station can go live for app or supported H5 charging, with monitoring, reporting, support, and settlement under the agreed plan.",
  },
] as const;

export const csmsFaqs = [
  {
    question: "What is EV charging management software or a CSMS?",
    answer:
      "A Charging Station Management System, or CSMS, is the backend used to connect, monitor, and operate EV chargers. It can manage charger status, sessions, pricing, payments, users, faults, reports, and supported remote commands. VoltHub combines a CSMS and operator dashboard with driver access through its mobile app, RFID or QR flows, and supported H5 browser charging.",
  },
  {
    question: "Can VoltHub connect an EV charger from another supplier?",
    answer:
      "Yes. If the existing charger supports OCPP, VoltHub can assess it for connection to the platform. Onboarding is completed only after compatibility testing of the protocol version, endpoint, security settings, meter values, transaction flow, remote commands, connector behavior, and firmware implementation.",
  },
  {
    question: "Does every OCPP charger automatically work with VoltHub?",
    answer:
      "No. OCPP support is the starting requirement, but implementations differ by manufacturer, model, firmware, security profile, and enabled message set. VoltHub tests each charger before confirming which monitoring, transaction, payment, and remote-control functions can be supported.",
  },
  {
    question: "Do drivers have to download the VoltHub app?",
    answer:
      "No. At supported VoltHub-connected stations, drivers can use VoltHub's H5 browser-based charging flow without installing the mobile app. The iOS and Android app remains available for drivers who want an account, wallet, vehicle management, and charging history.",
  },
  {
    question: "Can VoltHub control every charging station shown on its map?",
    answer:
      "No. The VoltHub app displays Philippine charging stations recorded by the DOE, including stations operated by other providers. Those third-party locations can be shown for discovery, but live status, session start, payment, and remote control are available only when the charger is connected to the VoltHub platform.",
  },
  {
    question: "What information is needed for an OCPP compatibility check?",
    answer:
      "Provide the charger brand and model, firmware version, OCPP version, current CSMS or backend status, supported security profile, SIM or network arrangement, number of connectors, site address, and any OCPP implementation or configuration document supplied by the manufacturer.",
  },
  {
    question: "How much does VoltHub charging station software cost?",
    answer:
      "VoltHub's published App-only operation plan for an existing compatible OCPP charger is ₱2,500 per station per month, plus a 7% charging-revenue commission and a ₱25,000 one-time onboarding fee, excluding VAT. A Charger + App operation plan is ₱2,000 per station per month with separate transaction and revenue fees. Request a proposal to confirm the current scope and commercial terms.",
  },
  {
    question: "Is VoltHub accredited to supply, service, and operate EV charging stations?",
    answer:
      "Yes. The DOE EV Industry Portal lists VoltHub Electronic Power Generation Services Corporation under accreditation number DOE-EUMB-ANA-20260210003 with National Accreditation Level status as an EVCS Provider - Service, Supplier and Operator, valid through June 7, 2029.",
  },
] as const;
