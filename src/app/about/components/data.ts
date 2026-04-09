export const leadershipStats = [
  { label: "Founded 2025", value: "Taguig City, Philippines" },
  { label: "Clean Energy", value: "Solar, Storage & EV Charging" },
];

export interface CompanyRegistrationField {
  label: string;
  value: string;
}

export const companyInformation: {
  legalName: string;
  tradeName: string;
  incorporationDate: string;
  incorporationPlace: string;
  registeredOffice: string;
  founders: string[];
  registrations: CompanyRegistrationField[];
} = {
  legalName: "VOLTHUB ELECTRONIC POWER GENERATION SERVICES CORP.",
  tradeName: "VoltHub.PH",
  incorporationDate: "January 17, 2025",
  incorporationPlace: "Taguig City, Philippines",
  registeredOffice:
    "Unit 2503, High Street South Corporate Plaza Tower 2, 11th Street corner 26th Avenue, Fort Bonifacio, Bonifacio Global City, Taguig City 1635, Metro Manila, Philippines",
  founders: [
    "David Zhang",
    "Vincent Paul Lim Oo",
    "Atty. Maria Evita R. Igot",
  ],
  registrations: [
    {
      label: "SEC Registration No.",
      value: "2025010184535-18 (January 17, 2025)",
    },
    {
      label: "BIR TIN",
      value: "667-401-960-000 (RDO 044 – Taguig-Pateros East)",
    },
    {
      label: "Taxpayer Type",
      value: "Domestic Corporation",
    },
    {
      label: "PSIC (Primary)",
      value: "35100 – Electric Power Generation, Transmission and Distribution (EV Charging Station)",
    },
    {
      label: "PSIC (Secondary)",
      value:
        "45109 – Sale of Other Motor Vehicles (Trading of Electric Vehicle); 45209 – Maintenance of Motor Vehicles, N.E.C. (Electric Vehicle Services)",
    },
  ],
};

export const marketInsights = [
  {
    title: "$1.8T",
    detail: "Global renewable market size (industry reports, 2024)",
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "30%",
    detail: "Share of global electricity from renewables (IEA)",
    color: "text-green-600 bg-green-50",
  },
  {
    title: "85%",
    detail: "Solar cost reduction 2010-2024 (industry reports)",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    title: "13.7M",
    detail: "Renewable energy jobs worldwide (IRENA)",
    color: "text-purple-600 bg-purple-50",
  },
];

export const operationsHighlights = [
  {
    title: "Philippines Focus",
    description:
      "Headquartered in Taguig City, Philippines, with operations focused on the domestic clean-energy and EV charging market.",
    metric: "Taguig City",
    subtext: "Serving the Philippines",
  },
  {
    title: "Experienced Team",
    description:
      "Our engineers, technicians, and consultants combine expertise in energy systems, finance, and technology.",
    metric: "Expert Team",
    subtext: "Energy, Finance & Technology",
  },
  {
    title: "Standards & Practices",
    description:
      "Committed to clean-energy standards and responsible business practices.",
    metric: "Industry",
    subtext: "Standards & Practices",
  },
  {
    title: "Clean-Energy Focus",
    description:
      "Investing in solar-powered EV hubs, energy storage, and smart grid integration for the Philippines market.",
    metric: "R&D",
    subtext: "Clean-Energy Solutions",
  },
  {
    title: "Customer Support",
    description:
      "Dedicated customer support, professional installation and commissioning, and long-term maintenance for every project.",
    metric: "Dedicated",
    subtext: "Customer Support",
  },
];

export const partnerships: { name: string; detail: string }[] = [];

export const masonryItems = [
  {
    id: "1",
    img: "/aboutimages/ev-charging.jpg",
    url: "",
    height: 400,
  },
  {
    id: "2",
    img: "/aboutimages/solarpanels2.jpg",
    height: 500,
    url: "",
  },
  {
    id: "3",
    img: "/aboutimages/storagesystems.jpg",
    height: 600,
    url: "",
  },
  {
    id: "4",
    img: "/aboutimages/workshop.jpg",
    height: 400,
    url: "",
  },
  {
    id: "5",
    img: "/aboutimages/factory.jpg",
    height: 500,
    url: "",
  },
  {
    id: "6",
    img: "/aboutimages/solarpanelsworkshop.jpg",
    height: 500,
    url: "",
  },
  {
    id: "7",
    img: "/aboutimages/unbuildedsolarpanels.jpg",
    height: 500,
    url: "",
  },
  {
    id: "8",
    img: "/aboutimages/solarstreetlight.jpg",
    height: 500,
    url: "",
  },
  {
    id: "9",
    img: "/aboutimages/solarstreetlightwithcctv.jpg",
    height: 450,
    url: "",
  },
  {
    id: "11",
    img: "/aboutimages/solartrafficlight.jpg",
    height: 400,
    url: "",
  },
];


export const timelineEvents = [
  {
    period: "January 2025 – Incorporation",
    description:
      "Volthub Electric Power Generation Services Corporation was officially incorporated on January 17, 2025 in Taguig City, Philippines. The company was founded by David Zhang, Vincent Paul Lim Oo, and Atty. Maria Evita R. Igot, combining expertise in energy systems, finance, and technology.",
  },
  {
    period: "Early 2025 – Strategic Planning & Partnerships",
    description:
      "The team laid out its roadmap, focusing on the deployment of solar-powered EV hubs, large-scale solar panel installations, advanced energy storage systems, and smart grid integration. Strategic partnerships were established with renewable energy providers, solar technology innovators, and local stakeholders to enhance capability in solar generation and accelerate the shift toward cleaner, more sustainable mobility solutions.",
  },
  {
    period: "Mid 2025 – Pilot Development",
    description:
      "Volthub began development of its first solar-powered EV charging prototypes, integrating fast-charging technology with renewable energy storage solutions.",
  },
];

export const futureGoals = [
  {
    title: "Expansion of Solar-Integrated Charging Networks Nationwide",
    description:
      "Strengthen the rollout of EV charging stations across the Philippines powered by solar-energy systems, reducing dependence on grid electricity and promoting sustainable mobility.",
  },
  {
    title: "Development of Vehicle-to-Grid (V2G) Technology for Smart Cities",
    description:
      "Advance V2G capabilities that allow electric vehicles to store, discharge, and supply energy back to the grid—supporting smart city infrastructure and grid stability.",
  },
  {
    title:
      "Regional Expansion in Southeast Asia to Promote Renewable-Powered Transportation",
    description:
      "Position Volthub as a regional leader by expanding EV-charging infrastructure into neighboring Southeast Asian countries, focusing on renewable-powered and smart-technology solutions.",
  },
  {
    title:
      "Large-Scale Deployment and Innovation of Solar Panel Technologies",
    description:
      "Accelerate the adoption of advanced solar panel technologies to power EV chargers, office facilities, and large commercial installations.",
    details: [
      "Integrating high-efficiency mono-PERC and bifacial panels",
      "Establishing solar farms dedicated for EV charging hubs",
      "Investing in R&D for improved durability and efficiency in tropical climates",
      "Partnering with local and global solar manufacturers for technology transfer",
      "Supporting nationwide solar rooftop programs for cleaner, decentralized energy",
    ],
  },
];


export const services = [
  {
    title: "EV Charging Infrastructure",
    items: [
      "Installation of AC and DC chargers",
      "Solar-powered charging hubs",
      "Smart metering and monitoring systems",
      "Commercial, residential, and fleet solutions",
    ],
  },
  {
    title: "Solar Power Systems",
    items: [
      "Rooftop solar installations",
      "Solar integration for charging stations",
      "Solar farms for large-scale power supply",
      "Engineering, procurement & construction (EPC) services",
    ],
  },
  {
    title: "Smart Energy Technologies",
    items: [
      "Energy management systems (EMS)",
      "Battery storage and hybrid systems",
      "Vehicle-to-Grid (V2G) development",
      "Internet-of-Energy (IoE) innovations",
    ],
  },
  {
    title: "Technical Services",
    items: [
      "Preventive maintenance",
      "System inspection and commissioning",
      "Electrical & mechanical upgrades",
      "Compliance support with building and government agencies",
    ],
  },
];