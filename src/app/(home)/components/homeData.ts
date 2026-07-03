import type { Route } from "next";
import {
  RiBatteryChargeLine,
  RiLeafLine,
  RiSunLine,
  RiFlashlightLine,
  RiHomeGearLine,
  RiGlobalLine,
  RiShieldCheckLine,
  RiSpeedUpLine,
  RiPlantLine,
  RiUserLine,
  RiBuildingLine,
  RiVideoLine,
  // RiFileTextLine,
  // RiDownloadLine,
  // RiBookOpenLine,
} from "react-icons/ri";

// Carousel Slides
export const carouselSlides = [
  {
    id: 1,
    title: "Powering Tomorrow, Today",
    subtitle: "Smart Power. Clean Future.",
    description:
      "Take control of your energy with VoltHub's next-generation energy storage and EV charging solutions. Power your home or business with clean, reliable energy built for the Philippines.",
    image: "/HomeBanner/89.png",
    backgroundImage: "/HomeBanner/banner1.png",
    mobileBackgroundImage: "/HomeBanner/banner1m.png",
    mobileBackgroundPosition: "right center",
    showimg: false,
    descriptionClassName: "w-full md:w-1/2 md:ml-auto md:max-w-2xl",
    buttonText: "Request a Quote",
    buttonLink: "/contact",
    gradient: "bg-gradient-to-br from-primary/90 via-primary/70 to-transparent",
    layout: "side-by-side" as const,
  },
  {
    id: 2,
    title: "Residential Energy Storage",
    subtitle: "Energy Independence Starts at Home",
    description:
      "Smart home battery systems help you store solar energy for round-the-clock power, protect against outages, and take a meaningful step toward energy independence.",
    image: "/HomeBanner/LVXC.png",
    backgroundImage: "/HomeBanner/banner2.png",
    mobileBackgroundImage: "/HomeBanner/banner2m.png",
    showimg: false,
    imageClassName: "absolute bottom-0 right-0 h-full w-1/2 mb-[-170px]",
    descriptionClassName: "space-y-6 text-white z-[100]",
    buttonText: "Get Free Consultation",
    buttonLink: "/contact",
    gradient: "bg-gradient-to-br from-emerald-700/90 via-primary/70 to-transparent",
    layout: "side-by-side" as const,
  },
  {
    id: 3,
    title: "Manage Peak Demand with Confidence",
    subtitle: "Commercial Energy Storage for Resilient Operations",
    description:
      "VoltHub's commercial energy storage systems help you manage peak demand, protect critical operations from outages, and build a more resilient energy footprint. Talk to our team about a solution sized for your site.",
    image: "/HomeBanner/banner3product.png",
    backgroundImage: "/HomeBanner/banner3.png",
    mobileBackgroundImage: "/HomeBanner/banner3m.png",
    showimg: false,
    imageClassName: "absolute bottom-0 right-0 h-full w-1/2 mb-[-170px]",
    descriptionClassName: "space-y-6 text-white z-[100]",
    buttonText: "See Commercial Solutions",
    buttonLink: "/sectors/commercial",
    gradient: "bg-gradient-to-br from-accent/90 via-primary/70 to-transparent",
    layout: "side-by-side" as const,
  },
  {
    id: 4,
    title: "EV Charging Infrastructure",
    subtitle: "Future-Ready Mobility Solutions",
    description:
      "Build comprehensive EV charging networks with ultra-fast 50-150kW DC chargers. Future-proof your business with smart grid integration and reliable, enterprise-grade infrastructure.",
    image:
      "https://readdy.ai/api/search-image?query=electric%20vehicle%20charging%20station%20network%2C%20modern%20EV%20charging%20infrastructure%2C%20smart%20grid%20technology%2C%20sustainable%20transportation%2C%20clean%20mobility%20future&width=1920&height=1080&seq=hero004&orientation=landscape",
    backgroundImage: "/HomeBanner/banner4.png",
    mobileBackgroundImage: "/HomeBanner/banner4m.png",
    showimg: false,
    imageClassName: "absolute bottom-0 right-0 h-full w-1/2 mb-[-170px]",
    descriptionClassName: "space-y-6 text-white z-[100]",
    buttonText: "Explore EV Solutions",
    buttonLink: "/services/ev-charging",
    gradient: "bg-gradient-to-br from-secondary/80 via-primary/70 to-transparent",
    layout: "side-by-side" as const,
  },
  // {
  //   id: 5,
  //   title: "Container Energy Solutions",
  //   subtitle: "Modular Power Systems",
  //   description:
  //     "Portable and scalable containerized energy storage systems. Perfect for remote locations, emergency backup, and temporary power needs with rapid deployment capabilities.",
  //   image: "/HomeBanner/container.png",
  //   backgroundImage: "/HomeBanner/container.png",
  //   showimg: false,
  //   imageClassName: "absolute bottom-0 right-0 h-full w-1/2",
  //   descriptionClassName: "space-y-6 text-white z-[100]",
  //   buttonText: "Learn More",
  //   buttonLink: "/products?category=container",
  //   gradient: "bg-gradient-to-br from-blue-800/90 via-primary/70 to-transparent",
  //   layout: "side-by-side" as const,
  // },
];

// Features
export const features = [
  {
    icon: RiShieldCheckLine,
    title: "Enterprise-Grade Reliability",
    description: "Built with industrial standards for maximum uptime and durability",
  },
  {
    icon: RiGlobalLine,
    title: "National Deployment",
    description: "Proven solutions deployed across the Philippines",
  },
  {
    icon: RiPlantLine,
    title: "Sustainable Impact",
    description: "Measurable reduction in carbon footprint from day one",
  },
];

// Stats
export const stats = [
  { label: "MW Installed", value: "500+", icon: RiSunLine },
  { label: "CO₂ Tons Reduced", value: "15K", icon: RiLeafLine },
  { label: "Lives Impacted", value: "100K+", icon: RiGlobalLine },
];

// Product Showcases
export const productShowcases = [
  {
    badge: "High-Turnover Commercial Hubs",
    badgeColor: "text-amber-300",
    title: "60kW - 120kW Dual-Gun Revenue Generation",
    titleParts: [
      { text: "60kW - 120kW", color: "text-green-600" },
      { text: "Dual-Gun Revenue Generation", color: "text-lime-600" },
    ],
    description:
      "Premium dual-gun DC fast charger for fleets and public sites. Charge two vehicles simultaneously or deliver full power to one. Increase revenue and customer satisfaction with flexible power sharing modes.",
    image: "/home/card1.png",
    imageAlt: "DC EV Charger Dual Gun 60kW/120kW at commercial charging site",
    imageHasCopy: false,
    features: [
      { icon: RiBatteryChargeLine, text: "Dual-Gun Design", color: "text-emerald-700" },
      { icon: RiHomeGearLine, text: "Flexible Power Sharing", color: "text-primary" },
      { icon: RiFlashlightLine, text: "Smart Grid Integration", color: "text-accent" },
    ],
    ctas: [
      { text: "View Dual-Gun EV Charger Products", href: "/products/ev-dc-dd" as Route, variant: "primary" as const },
      { text: "Get Free Quote", href: "/contact" as Route, variant: "secondary" as const },
    ],
    trustIndicators: [
      { icon: RiBatteryChargeLine, text: "Dual Charging", color: "text-emerald-700" },
      { icon: RiShieldCheckLine, text: "Certified Quality", color: "text-primary" },
      { icon: RiSpeedUpLine, text: "Fast Setup", color: "text-accent" },
    ],
    imagePosition: "left" as const,
    gradientColors: { from: "from-emerald-600/20", to: "to-primary/20" },
    bgGradient: "bg-gradient-to-br from-white via-gray-50 to-white",
  },
  {
    badge: "Expressway & Fleet Infrastructure",
    badgeColor: "text-amber-300",
    title: "Ultra-Fast Flagship Network Solutions",
    titleParts: [
      { text: "Ultra-Fast Flagship", color: "text-green-600" },
      { text: "Network Solutions", color: "text-lime-600" },
    ],
    description:
      "Ultra-high power DC fast charging solution for commercial sites and fleet depots. Charge heavy-duty vehicles in minutes, not hours. Future-proof your infrastructure with industry-leading power output.",
    image: "/home/card2.png",
    imageAlt: "DC EV Charger 480kW at solar canopy charging hub",
    imageHasCopy: false,
    features: [
      { icon: RiFlashlightLine, text: "480kW Ultra-High Power", color: "text-accent" },
      { icon: RiSpeedUpLine, text: "Rapid Charging", color: "text-primary" },
      { icon: RiHomeGearLine, text: "Smart Management", color: "text-green-600" },
    ],
    ctas: [
      { text: "Explore DC EV Charger Products", href: "/products/ev-dc-fd" as Route, variant: "primary" as const },
      { text: "Request Demo", href: "/contact" as Route, variant: "secondary" as const },
    ],
    trustIndicators: [
      { icon: RiFlashlightLine, text: "High Power Output", color: "text-accent" },
      { icon: RiBatteryChargeLine, text: "Fast Charging", color: "text-primary" },
      { icon: RiPlantLine, text: "Carbon Neutral", color: "text-green-600" },
    ],
    imagePosition: "left" as const,
    gradientColors: { from: "from-accent/20", to: "to-primary/20" },
    bgGradient: "bg-gradient-to-br from-gray-50 via-white to-gray-50",
  },
  {
    badge: "Scalable Workplace & Amenity Sites",
    badgeColor: "text-amber-300",
    title: "Smart OCPP Integrated Micro-Grids",
    titleParts: [
      { text: "Smart OCPP Integrated", color: "text-green-600" },
      { text: "Micro-Grids", color: "text-lime-600" },
    ],
    description:
      "High-performance AC EV charging system perfect for home use. Charge your EV overnight while you sleep. Smart scheduling optimizes charging during off-peak hours to maximize savings.",
    image: "/home/card3.png",
    imageAlt: "AC EV Charger 7kW wall-mounted units in parking garage",
    imageHasCopy: false,
    features: [
      { icon: RiBatteryChargeLine, text: "7kW Charging Power", color: "text-primary" },
      { icon: RiSunLine, text: "Smart Monitoring", color: "text-accent" },
      { icon: RiShieldCheckLine, text: "Safe & Certified", color: "text-green-600" },
    ],
    ctas: [
      { text: "View AC Home Charger", href: "/products/ev-ac-ws-cdz-21kw" as Route, variant: "primary" as const },
      { text: "Get Free Quote", href: "/contact" as Route, variant: "secondary" as const },
    ],
    trustIndicators: [
      { icon: RiShieldCheckLine, text: "Certified & Safe", color: "text-green-600" },
      { icon: RiGlobalLine, text: "Global Support", color: "text-primary" },
      { icon: RiLeafLine, text: "Eco-Friendly", color: "text-accent" },
    ],
    imagePosition: "left" as const,
    gradientColors: { from: "from-primary/20", to: "to-accent/20" },
    bgGradient: "bg-gradient-to-br from-white via-gray-50 to-white",
  },
  {
    badge: "Retail & Destination Ecosystems",
    badgeColor: "text-amber-300",
    title: "160kW Smart Grid Retail Deployment",
    titleParts: [
      { text: "160kW Smart Grid", color: "text-green-600" },
      { text: "Retail Deployment", color: "text-lime-600" },
    ],
    description:
      "High-power dual-gun DC fast charger for premium charging hubs and expressway service areas. Maximize revenue with dual charging capability. Future-proof design supports next-generation EVs.",
    image: "/home/card4.png",
    imageAlt: "DC EV Charger 160kW commercial grade dual gun",
    coverPosition: "center 40%",
    imageHasCopy: false,
    features: [
      { icon: RiFlashlightLine, text: "160kW/240kW Power", color: "text-secondary" },
      { icon: RiGlobalLine, text: "Commercial Grade", color: "text-primary" },
      { icon: RiSpeedUpLine, text: "Future-Proof Design", color: "text-accent" },
    ],
    ctas: [
      { text: "View Commercial EV Charger Products", href: "/products/ev-ac-ws-cdz-21kw" as Route, variant: "primary" as const },
      { text: "Get Free Consultation", href: "/contact" as Route, variant: "secondary" as const },
    ],
    trustIndicators: [
      { icon: RiFlashlightLine, text: "High Capacity", color: "text-secondary" },
      { icon: RiShieldCheckLine, text: "Reliable & Safe", color: "text-primary" },
      { icon: RiGlobalLine, text: "24/7 Support", color: "text-accent" },
    ],
    imagePosition: "left" as const,
    gradientColors: { from: "from-secondary/20", to: "to-primary/20" },
    bgGradient: "bg-transparent",
  },
];

// How It Works Steps
export const howItWorksSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Free assessment of your energy needs and site evaluation",
    icon: RiUserLine,
    color: "from-primary to-accent",
  },
  {
    step: "02",
    title: "Design & Planning",
    description: "Custom solution design tailored to your specific requirements",
    icon: RiHomeGearLine,
    color: "from-accent to-primary",
  },
  {
    step: "03",
    title: "Installation",
    description: "Professional installation by certified technicians",
    icon: RiFlashlightLine,
    color: "from-primary to-emerald-600",
  },
  {
    step: "04",
    title: "Support & Monitoring",
    description: "Ongoing support and smart monitoring for optimal performance",
    icon: RiShieldCheckLine,
    color: "from-emerald-600 to-primary",
  },
];

// User Segments
export const userSegments = [
  {
    title: "For Homeowners",
    description:
      "Take charge of your home's energy. Store solar power for round-the-clock use, protect your household from outages, and move toward energy independence.",
    icon: RiUserLine,
    features: ["Energy Independence", "Outage Protection", "Solar Self-Consumption", "24/7 Support"],
    cta: "Schedule a Consultation",
    link: "/contact" as Route,
    color: "from-primary to-accent",
  },
  {
    title: "For Businesses",
    description: "Strengthen your operations with commercial energy storage and EV charging. Protect critical operations from outages while advancing your sustainability goals.",
    icon: RiBuildingLine,
    features: ["Peak Demand Management", "Operational Resilience", "24/7 Support", "Scalable Solutions"],
    cta: "Request a Quote",
    link: "/contact" as Route,
    color: "from-accent to-primary",
  },
  {
    title: "For Developers",
    description: "Large-scale energy infrastructure for residential and commercial developments. Bulk pricing available with custom solutions and fast deployment.",
    icon: RiGlobalLine,
    features: ["Bulk Pricing", "Custom Solutions", "Project Management", "Fast Deployment"],
    cta: "Contact Sales Team",
    link: "/contact" as Route,
    color: "from-primary to-emerald-600",
  },
];

// Testimonials
export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    location: "Metro Manila, Philippines",
    rating: 5,
    text: "VoltHub's residential battery system has made a meaningful difference in our energy use. The installation was seamless and the support team is excellent.",
    image: "👩",
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    location: "Taguig City, Philippines",
    rating: 5,
    text: "Our commercial solar installation exceeded expectations. The VoltHub team delivered on time and the system has been running smoothly.",
    image: "👨",
  },
  {
    name: "Emma Rodriguez",
    role: "Property Developer",
    location: "Pasig, Philippines",
    rating: 5,
    text: "VoltHub provided a complete energy solution for our new development. Professional service from start to finish. Highly recommended!",
    image: "👩",
  },
];

// Trust Badges
export const trustBadges = [
  { name: "Quality-Assured Workmanship", icon: RiShieldCheckLine },
  { name: "Philippine-Based Support", icon: RiLeafLine },
  { name: "Certified Equipment", icon: RiShieldCheckLine },
  { name: "Philippines Nationwide", icon: RiGlobalLine },
];

// Video Items
export const videoItems = [
  { title: "Customer Success Stories", icon: RiUserLine },
  { title: "Product Demonstrations", icon: RiVideoLine },
  { title: "Installation Process", icon: RiHomeGearLine },
];

// Resources
export const resources = [
  {
    slug: "the-billion-peso-ev-charging-opportunity-in-the-philippines",
    title: "The Next Billion-Peso Industry in the Philippines Is Not Coming — It Has Already Started",
    description:
      "And early investors are positioning themselves now. Discover why the EV charging industry in the Philippines is the next major infrastructure opportunity — and how VoltHub helps you build recurring-income assets ahead of mass-market adoption.",
    type: "Industry Insights",
    image: "/Blog/blogtitle.png",
    imageAlt: "VoltHub investment opportunity — EV charging and renewable energy infrastructure in the Philippines",
  },
  {
    slug: "complete-guide-to-solar-energy-storage",
    title: "The 2025 EV Charging Landscape: Why Smart Infrastructure is the Next Big Business Opportunity",
    description:
      "Discover the top EV charging trends defining 2025 and why smart infrastructure is essential for forward-thinking businesses.",
    type: "Industry Insights",
    image: "/Blog/blog1.png",
    imageAlt: "The 2025 EV Charging Landscape - Smart Infrastructure Business Opportunity",
  },
  {
    slug: "ev-charging-infrastructure-future-of-transportation",
    title: "EV Charging Infrastructure: Future of Transportation",
    description: "Explore how EV charging networks are shaping the future of sustainable mobility.",
    type: "Article",
    image: "/Blog/blogT1.png",
    imageAlt: "EV Charging Infrastructure: Future of Transportation",
  },
  {
    slug: "smart-grid-integration-powering-the-future",
    title: "Upgrade Your Energy: How Smart Grid Technology Powers the Future",
    description: "Discover how smart grid technology transforms your home into an intelligent energy ecosystem. Learn about two-way energy flow, automated savings, and future-proof solutions.",
    type: "Article",
    image: "/Blog/blog4T.png",
    imageAlt: "Smart Grid Technology - Energy Storage and Solar Integration",
  },
  {
    slug: "commercial-energy-solutions-business-guide",
    title: "Managing Peak Demand: How VoltHub Energy Storage Strengthens Your Business",
    description: "Learn how commercial energy storage systems help businesses manage peak demand, improve operational resilience, and protect critical operations from costly outages.",
    type: "Guide",
    image: "/Blog/blog5T.png",
    imageAlt: "Commercial energy solutions - Peak demand management and cost savings",
  },
];

// Helper function to get resource by slug
export function getResourceBySlug(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}

// FAQs
export const faqs = [
  {
    question: "How long does installation take?",
    answer:
      "Residential installations typically take 1-3 days, while commercial projects can take 1-2 weeks depending on the scale. Our team will provide a detailed timeline during the consultation phase.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes, we offer flexible financing options including low-interest loans and lease-to-own programs. We can also help you take advantage of available tax credits and incentives.",
  },
  {
    question: "What maintenance is required?",
    answer:
      "Our systems require minimal maintenance. We offer monitoring services and annual maintenance packages to ensure optimal performance. Most systems are self-monitoring and require little to no regular maintenance.",
  },
  {
    question: "Can I expand my system later?",
    answer:
      "Absolutely! Our systems are designed to be scalable. You can add more solar panels or battery capacity as your needs grow. We'll help you plan for future expansion during the initial design phase.",
  },
];

// Project Cases
export const projectCases = [
  {
    id: "1",
    title: "Solar Street Light Installation",
    location: "Philippines",
    image: "/aboutimages/solarstreetlight.jpg",
    imageAlt: "Solar street light installation project in Philippines",
    size: "medium" as const,
  },
  {
    id: "2",
    title: "Solar Panel Workshop",
    location: "Philippines",
    image: "/aboutimages/solarpanelsworkshop.jpg",
    imageAlt: "Solar panels workshop installation",
    size: "small" as const,
  },
  {
    id: "3",
    title: "Solar Street Light with CCTV",
    location: "Philippines",
    image: "/aboutimages/solarstreetlightwithcctv.jpg",
    imageAlt: "Solar street light with CCTV integration",
    size: "small" as const,
  },
  {
    id: "4",
    title: "Commercial Solar Installation",
    location: "Philippines",
    image: "/aboutimages/solarpanels.jpg",
    imageAlt: "Commercial solar panel installation",
    size: "large" as const,
  },
  {
    id: "5",
    title: "EV Charging Station",
    location: "Philippines",
    image: "/aboutimages/ev-charging.jpg",
    imageAlt: "EV charging station installation",
    size: "small" as const,
  },
  {
    id: "6",
    title: "Solar Traffic Light System",
    location: "Philippines",
    image: "/aboutimages/solartrafficlight.jpg",
    imageAlt: "Solar-powered traffic light system",
    size: "small" as const,
  },
  {
    id: "7",
    title: "Energy Storage System",
    location: "Philippines",
    image: "/aboutimages/storagesystem.jpg",
    imageAlt: "Energy storage system installation",
    size: "medium" as const,
  },
  {
    id: "8",
    title: "Industrial Solar Installation",
    location: "Philippines",
    image: "/aboutimages/factory.jpg",
    imageAlt: "Industrial solar installation at factory",
    size: "small" as const,
  },
  {
    id: "9",
    title: "Residential Solar Panels",
    location: "Philippines",
    image: "/aboutimages/solarpanels2.jpg",
    imageAlt: "Residential solar panel installation",
    size: "small" as const,
  },
  {
    id: "10",
    title: "Street Lighting Project",
    location: "Philippines",
    image: "/aboutimages/streetlight.jpg",
    imageAlt: "Street lighting project installation",
    size: "small" as const,
  },
  {
    id: "11",
    title: "Large Scale Storage Systems",
    location: "Philippines",
    image: "/aboutimages/storagesystems.jpg",
    imageAlt: "Large scale energy storage systems",
    size: "medium" as const,
  },
  {
    id: "12",
    title: "Street View Installation",
    location: "Philippines",
    image: "/aboutimages/streetview.jpg",
    imageAlt: "Street view solar installation",
    size: "small" as const,
  },
  {
    id: "13",
    title: "Workshop Solar Setup",
    location: "Philippines",
    image: "/aboutimages/workshop.jpg",
    imageAlt: "Workshop solar panel setup",
    size: "small" as const,
  },
  {
    id: "14",
    title: "Unbuilt Solar Panels",
    location: "Philippines",
    image: "/aboutimages/unbuildedsolarpanels.jpg",
    imageAlt: "Solar panels ready for installation",
    size: "small" as const,
  },
  {
    id: "15",
    title: "EV Charging Infrastructure",
    location: "Philippines",
    image: "/Sector/evcharging.jpeg",
    imageAlt: "EV charging infrastructure project",
    size: "medium" as const,
  },
  {
    id: "16",
    title: "Solar Background Project",
    location: "Philippines",
    image: "/Sector/solarbg1.jpg",
    imageAlt: "Large scale solar project",
    size: "large" as const,
  },
];

// Article Showcases — simple article layout with real installation photos & implementation details
export interface ArticleShowcase {
  badge: string;
  title: string;
  titleHighlight: { text: string; color: string };
  description: string;
  /** Real installation / project photo */
  image: string;
  imageAlt: string;
  /** Override object-fit — defaults to "cover" */
  imageFit?: "cover" | "contain";
  /** How we implement / what the service includes */
  implementationSteps: { step: string; detail: string }[];
  ctaText: string;
  ctaLink: Route;
}

export const articleShowcases: ArticleShowcase[] = [
  {
    badge: "Commercial EV Infrastructure",
    title: "How We Build Reliable, Revenue-Grade EV Infrastructure for Your Business",
    titleHighlight: { text: "", color: "text-green-600" },
    description:
      "We design, install, and commission high-throughput dual-gun DC fast chargers for commercial hubs, fleet depots, and public charging networks. Each deployment is backed by real-time monitoring and on-site acceptance testing to ensure revenue-grade uptime from day one. Our dual-gun units let you charge two vehicles simultaneously or deliver full power to a single bay, maximising both throughput and flexibility. From the initial walkthrough to the final handover, every step is executed by certified local engineers who understand Philippine grid conditions and site constraints.",
    image: "/Article/article_1.jpg",
    imageAlt: "VoltHub EV DC fast charger installed at a commercial charging site in the Philippines",
    implementationSteps: [
      {
        step: "Site Survey & Load Study",
        detail: "Our engineers conduct a full electrical load assessment and spatial survey to size the charger and plan cable routing before any equipment ships. We also check your existing transformer capacity and recommend upgrades if needed, so you never face surprises at commissioning.",
      },
      {
        step: "Civil Works & Trenching",
        detail: "We handle concrete pads, cable trenches, and mounting pedestals — all coordinated with your facilities team to minimise disruption to daily operations. Every civil package is pre-approved with engineering drawings before a single shovel hits the ground.",
      },
      {
        step: "Installation & Commissioning",
        detail: "Certified technicians install the unit, terminate power and data cabling, then run a full acceptance test protocol including OCPP backend registration and load-bank verification. We do not leave site until both guns deliver rated power under real-world test conditions.",
      },
      {
        step: "Handover & Training",
        detail: "Your operations team receives a comprehensive half-day training session covering daily health checks, the remote monitoring dashboard, common fault diagnosis, and our escalation paths. A laminated quick-reference card stays on site for your shift staff.",
      },
    ],
    ctaText: "Get a Quote for DC Fast Charging",
    ctaLink: "/contact" as Route,
  },
  {
    badge: "Smart App Integration",
    title: "Smart App Integration: Your Complete EV Franchise ",
    titleHighlight: { text: "Control Center", color: "text-green-600" },
    description:
      "We don't just deliver premium hardware — we hand you the keys to a fully integrated digital ecosystem. Every smart charging unit links seamlessly with our local mobile application and powerful backend cloud architecture. Whether you are running a single private station at home, offering charging as an amenity for your retail business, or launching a massive multi-location commercial franchise, you retain absolute control over how your infrastructure operates and earns.",
    image: "/Article/article_2.png",
    imageAlt: "VoltHub smart app integration — complete EV franchise control center dashboard",
    imageFit: "contain",
    implementationSteps: [
      {
        step: "The Driver Experience: Smooth App Control",
        detail: "",
      },
      {
        step: "The Admin Dashboard: Remote 24/7 Monitoring",
        detail: "",
      },
      {
        step: "Smart Franchise Tools: Dynamic Revenue Creation",
        detail: "",
      },
      {
        step: "Future-Proof Efficiency: Load Management & Compliance",
        detail: "",
      },
    ],
    ctaText: "Explore the Smart App Platform",
    ctaLink: "/contact" as Route,
  },
  {
    badge: "Solar & Energy Storage",
    title: "Eliminate Soaring Power Bills with Hybrid and Off-Grid ",
    titleHighlight: { text: "Solar Infrastructure", color: "text-green-600" },
    description:
      "Relying entirely on the traditional electrical grid leaves your property or business vulnerable to rising power rates and unexpected blackouts. Our custom-engineered Solar PV and Smart Battery Storage setups are built to give you absolute energy autonomy. From residential roofs and commercial office hubs to entirely self-sustaining, off-grid agricultural farms, we design robust power systems tailored to your unique energy demands and spatial layout.",
    image: "/aboutimages/solarpanels.jpg",
    imageAlt: "VoltHub hybrid and off-grid solar infrastructure installation in the Philippines",
    implementationSteps: [
      {
        step: "Residential Homes: Smart Hybrid Savings",
        detail: "Protect your household budget from fluctuating electricity tariffs. Our residential hybrid solar configurations power your daily appliances directly from the sun while seamlessly shifting to high-capacity battery storage during peak evening hours or sudden grid outages. Save up to 80% on your monthly power bills while ensuring continuous peace of mind for your family.",
      },
      {
        step: "Commercial Hubs: Peak-Demand Management",
        detail: "For commercial buildings and retail spaces, energy overhead is a massive operating expense. Our large-scale commercial solar setups are engineered to drastically shave down peak-demand charges. By integrating smart energy management software, your facility automatically coordinates when to draw power from the panels, your stored batteries, or the municipal grid to lock in the lowest possible rates.",
      },
      {
        step: "Off-Grid Farms & Rural Projects: Uninterrupted Productivity",
        detail: "Agriculture and remote rural facilities cannot afford downtime from weak or non-existent grid infrastructure. Our rugged off-grid and hybrid agricultural solar setups reliably pump water, power irrigation systems, run processing equipment, and maintain cold storage without relying on costly diesel generators. Achieve true energy self-sufficiency right where your operations need it most.",
      },
      {
        step: "Advanced Battery Storage: Power When You Need It",
        detail: "Solar panels are only half the equation. Every installation is backed by scalable lithium battery banks and intelligent smart-grid controllers. Instead of letting excess daytime energy go to waste, our systems efficiently capture and store every single kilowatt, allowing you to use your clean, free solar power 24 hours a day, rain or shine.",
      },
    ],
    ctaText: "Calculate Your Solar Energy ROI →",
    ctaLink: "/tools/roi-calculator" as Route,
  },
];

