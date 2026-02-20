"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  RiArrowLeftLine, 
  RiCalendarLine, 
  RiFileTextLine, 
  RiBookOpenLine, 
  RiDownloadLine,
  RiTimeLine,
  RiFlashlightLine,
  RiPlugLine,
  RiShieldCheckLine,
  RiSpeedUpLine,
  RiGlobalLine,
  RiArrowRightLine
} from "react-icons/ri";
// import LayoutContainer from "@/components/layout/LayoutContainer";

interface Resource {
  slug?: string;
  title: string;
  description: string;
  type: string;
  image: string;
  imageAlt?: string;
}

interface BlogDetailProps {
  resource: Resource;
}

const blogContent: Record<string, { content: string; author?: string; date?: string; readingTime?: string }> = {
  "complete-guide-to-solar-energy-storage": {
    content: `
      <div class="intro-section">
        <p class="lead-text">The electric vehicle (EV) revolution has shifted gears. We are no longer just talking about "early adoption"—we are entering the era of mass infrastructure.</p>
        <p>For business owners and station operators, 2025 brings a pivotal opportunity. It's not just about providing a plug anymore; it's about offering speed, intelligence, and reliability. If you are considering upgrading your facility or starting a charging station business, here is what you need to know about the current landscape and why our new line of EV chargers is designed to meet these exact demands.</p>
      </div>

      <div class="blog-image-section">
        <div class="image-wrapper">
          <img src="/Blog/blog1.png" alt="EV Charging Infrastructure 2025 - Smart Charging Solutions" class="blog-content-image" loading="lazy" />
          <div class="image-overlay-gradient"></div>
        </div>
        <p class="image-caption">The future of EV charging: Smart infrastructure that combines speed, reliability, and intelligence for modern businesses.</p>
      </div>

      <h2>The Rise of "Ultra-Fast" Charging</h2>
      <p>Time is the new currency. In 2024, the global stock of fast chargers grew significantly, but 2025 is seeing a surge in demand for DC Fast Charging (DCFC). Drivers are no longer willing to wait 4 hours for a charge. They want to top up in 20-30 minutes while they grab a coffee or shop.</p>
      <div class="highlight-box">
        <p><strong>The Trend:</strong> A shift from standard Level 2 chargers to high-power DC units (50kW to 150kW+) in public spaces.</p>
        <p><strong>The Opportunity:</strong> Stations offering fast charging see higher turnover and increased retail footfall.</p>
      </div>

      <h2>V2G and Bidirectional Charging</h2>
      <p>One of the most exciting updates in 2025 is the commercialization of Vehicle-to-Grid (V2G) technology. This turns EV chargers into two-way streets.</p>
      <p><strong>How it works:</strong> Smart chargers can communicate with the grid to charge cars when electricity is cheap and potentially feed energy back when demand is high.</p>
      <p><strong>Why it matters:</strong> This technology transforms an EV charger from a simple amenity into a dynamic energy asset that can actually help balance local energy loads.</p>

      <h2>Reliability is the New "Premium"</h2>
      <p>For years, the industry was plagued by broken chargers. In 2025, reliability is the primary differentiator. Drivers are using apps to filter stations not just by price, but by "Success Score." If your station works the first time, every time, you win the loyal customer base.</p>
      <div class="highlight-box success">
        <p><strong>Our Solution:</strong> This is why we focus on robust EC (Electric Car) charging hardware with integrated smart diagnostics. Our chargers are built to detect issues remotely, ensuring maximum uptime for your station.</p>
      </div>

      <h2>"Plug & Charge" Simplicity</h2>
      <p>Fumbling with RFID cards and multiple apps is fading away. The new standard (ISO 15118) allows for Plug & Charge. The driver simply plugs in, the car identifies itself to the charger, and billing happens automatically.</p>
      <p><strong>Business Impact:</strong> This seamless experience mimics the ease of gas stations, lowering the barrier to entry for new EV drivers and speeding up throughput at your station.</p>

      <h2>The "Smart" Revolution</h2>
      <p>2025 is becoming the year of "Smart Charging." New regulations in many regions now require chargers to have data connectivity for remote troubleshooting and grid balancing. This connectivity enables:</p>
      <ul>
        <li>Remote monitoring and diagnostics</li>
        <li>Automatic load balancing during peak hours</li>
        <li>Real-time pricing adjustments</li>
        <li>Predictive maintenance alerts</li>
        <li>Integration with renewable energy sources</li>
      </ul>

      <h2>NACS Standardization</h2>
      <p>In North America and beyond, the shift to the NACS (Tesla-style) port is standardizing the industry, making it easier for station owners to serve all car brands. This standardization means:</p>
      <ul>
        <li>Simplified infrastructure planning</li>
        <li>Reduced equipment costs</li>
        <li>Universal compatibility across EV models</li>
        <li>Future-proofing your investment</li>
      </ul>

      <h2>Range Anxiety vs. Charger Anxiety</h2>
      <p>While EV interest remains high, "charger anxiety" (finding a working charger) is the #1 barrier. Businesses that offer reliable high-speed charging are seeing massive increases in foot traffic. This presents a significant opportunity for:</p>
      <ul>
        <li>Retail centers and shopping malls</li>
        <li>Restaurants and cafes</li>
        <li>Hotels and hospitality venues</li>
        <li>Office buildings and corporate campuses</li>
        <li>Dedicated charging stations</li>
      </ul>

      <h2>Why Your Business Needs a Station Now</h2>
      <p>The data is clear: businesses with EV charging stations attract customers with higher disposable income and keep them on-site longer. Whether you run a retail center, a hotel, or a dedicated fueling station, an EV charger is now as essential as Wi-Fi.</p>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">20-30</div>
          <div class="stat-label">Minutes average charging time</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">35%</div>
          <div class="stat-label">Increase in foot traffic</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">50-150kW</div>
          <div class="stat-label">Fast charging power range</div>
        </div>
      </div>
    `,
    author: "VoltHub Energy Team",
    date: "January 28, 2025",
    readingTime: "5 mins",
  },
  "ev-charging-infrastructure-future-of-transportation": {
    content: `
      <div class="intro-section">
        <p class="lead-text">Electric vehicles (EVs) are transforming the way we move, and the infrastructure supporting them is evolving just as fast.</p>
        <p>As charging networks become as essential as gas stations once were, the global shift toward electric mobility is accelerating. Driven by environmental concerns, government incentives, and breakthroughs in battery technology, consumers and businesses are switching to electric in record numbers—creating an unprecedented demand for reliable, accessible charging.</p>
      </div>

      <h2>Understanding the Power: The Three Levels of Charging</h2>
      <p>Not all chargers are created equal. Understanding the difference is key to planning your infrastructure:</p>

      <div class="charging-levels-visual-section">
        <div class="charging-levels-image-wrapper">
          <img src="/Blog/blog2desc3.png" alt="Understanding EV Charging Levels - Level 1, Level 2, and DC Fast Charging Guide" class="charging-levels-guide-image" loading="lazy" />
        </div>
      </div>

      <h2>Why Businesses Should Invest Now</h2>
      <p>For businesses and municipalities, installing EV charging infrastructure positions you at the forefront of sustainable transportation. It does more than just power cars; it powers business growth.</p>

      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">👥</div>
          <h3>Attract New Customers</h3>
          <p>EV owners actively seek out destinations with chargers.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">⏱️</div>
          <h3>Increase Dwell Time</h3>
          <p>Retail businesses often see increased foot traffic and longer visits, as owners typically spend 20–30 minutes charging.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🌱</div>
          <h3>Showcase Commitment</h3>
          <p>It visibly demonstrates your dedication to environmental sustainability.</p>
        </div>
      </div>

      <h2>Smarter Grids for a Greener Future</h2>
      <p>Modern charging isn't just a one-way street. Today's stations integrate with smart grid technology, allowing for load balancing and optimized energy distribution. Smart systems can automatically adjust charging rates based on grid conditions—increasing rates when solar energy is abundant and lowering them during peak demand to avoid grid overload.</p>
      
      <div class="highlight-box">
        <p><strong>Vehicle-to-Grid (V2G) Technology:</strong> We are even seeing the rise of Vehicle-to-Grid (V2G) technology. This allows EV batteries to discharge energy back to the grid during peak times, transforming cars into mobile energy storage units that provide stability to the power grid.</p>
      </div>

      <h2>🔌 How to Use an EV Charger: A Step-by-Step Guide</h2>
      <p>For new EV drivers, the first time at a public charging station can be slightly intimidating. Follow this visual guide:</p>

      <div class="steps-visual-section">
        <div class="steps-image-wrapper">
          <img src="/Blog/blog2desc1.png" alt="How to Use an EV Charger - Complete Step-by-Step Visual Guide" class="steps-guide-image" loading="lazy" />
        </div>
        
        
      </div>

      <h2>💡 Essential Tips & "Need-to-Knows" for Users</h2>
      <p>These essential tips help demystify EV charging technology and ensure you get the most out of your charging experience.</p>

      <div class="tips-visual-section">
        <div class="tips-image-wrapper">
          <img src="/Blog/blog2desc2.png" alt="Essential EV Charging Tips - Connector Types and Charging Best Practices" class="tips-guide-image" loading="lazy" />
        </div>
      </div>

      <div class="partner-section">
        <h2>Partner with VoltHub</h2>
        <p>As EV adoption accelerates, the infrastructure we build today will shape how people and goods move for decades to come. VoltHub provides end-to-end solutions, including site assessment, infrastructure planning, equipment selection, installation, and ongoing maintenance. We work with you to design a solution that meets your current needs while remaining flexible enough for the future.</p>
      </div>
    `,
    author: "VoltHub Mobility Team",
    date: "January 28, 2025",
    readingTime: "8 mins",
  },
  "energy-savings-calculator-roi-analysis": {
    content: `
      <div class="intro-section">
        <p class="lead-text">Want to know exactly how much you could save with renewable energy? Try our interactive calculator below and get instant estimates of your potential savings, payback period, and ROI!</p>
        <p>Calculating the return on investment (ROI) for renewable energy systems helps you make informed decisions about your energy infrastructure investments. ROI analysis goes beyond simple payback calculations to provide a comprehensive view of the financial benefits over the entire system lifespan.</p>
      </div>

      <h2>Understanding Your Investment</h2>
      <p>The initial investment includes not just the solar panels and batteries, but also inverters, mounting hardware, electrical work, permits, and installation labor. However, this upfront cost is often significantly offset by federal tax credits, state rebates, and utility incentives that can reduce the net cost by <strong>30-50%</strong>.</p>

      <h2>How Energy Savings Work</h2>
      <p>Energy savings are calculated based on your current electricity consumption and rates, projected system production, and how much of that production you'll use versus export to the grid. Areas offering net metering allow excess energy production to be credited back to your account, further enhancing your savings.</p>

      <div class="highlight-box">
        <p><strong>Typical Payback Periods:</strong></p>
        <ul>
          <li><strong>Residential systems:</strong> 5-8 years</li>
          <li><strong>Commercial systems:</strong> 3-6 years</li>
          <li><strong>Industrial systems:</strong> 2-5 years</li>
        </ul>
        <p>Remember, the payback period is just the beginning—your system continues generating free electricity for decades afterward!</p>
      </div>

      <h2>Long-Term Value</h2>
      <p>Beyond the payback period, energy systems continue generating savings for decades. With high-quality components and professional installation, your investment provides long-term value. Over a 25-year period, a typical residential solar and storage system can generate <strong>₱2.5M - ₱5M</strong> in energy savings, far exceeding the initial investment.</p>

      <h2>Additional Benefits</h2>
      <p>Renewable energy systems can also increase property values. Studies show that homes with solar panels sell for <strong>3-4% more</strong> than comparable homes without them. For businesses, energy independence and sustainability credentials can enhance brand value and attract environmentally conscious customers and employees.</p>
    `,
    author: "VoltHub Finance Team",
    date: "January 28, 2025",
    readingTime: "5 mins",
  },
  "smart-grid-integration-powering-the-future": {
    content: `
      <div class="intro-section">
        <p class="lead-text">In a world where energy costs are rising and sustainability is non-negotiable, the traditional power grid is struggling to keep up.</p>
        <p>We are moving from a passive system to an active one. Smart grid technology is the bridge to this future, using digital communication and automation to create an energy network that is efficient, resilient, and intelligent.</p>
        <p><strong>But what does that mean for you?</strong></p>
      </div>

      <h2>1. The Two-Way Energy Highway</h2>
      <p>The biggest difference between the old grid and the new smart grid is the direction of flow.</p>

      <div class="comparison-grid">
        <div class="comparison-card">
          <h3 class="comparison-title">Traditional Grids</h3>
          <p>Operate with a <strong>one-way flow</strong>, pushing electricity from massive power plants to your home. You use it; you pay for it.</p>
        </div>
        <div class="comparison-card comparison-card-highlight">
          <h3 class="comparison-title">Smart Grids</h3>
          <p>Create a dynamic, <strong>two-way interactive network</strong>. Energy flows to you, but if you have solar panels or batteries, you can contribute energy back to the grid.</p>
        </div>
      </div>

      <p>This two-way communication allows utilities to better manage supply and demand in real-time, while giving you the power to become an <strong>active participant in the energy market</strong> rather than just a passive consumer.</p>

      <h2>2. Visibility Equals Savings</h2>
      <p>You cannot manage what you cannot measure. Smart grid technology relies on advanced sensors and monitoring systems to give you unprecedented visibility into your energy usage.</p>

      <div class="benefits-list">
        <div class="benefit-item">
          <h3>Pinpoint Waste</h3>
          <p>Smart meters and energy management systems track consumption down to <strong>individual appliances</strong>. You will know exactly where your energy dollars are going.</p>
        </div>
        <div class="benefit-item">
          <h3>Automated Intelligence</h3>
          <p>The system doesn't just watch; it acts. Automated load management can intelligently control devices—like charging your EV during off-peak hours when electricity is cheapest, or pre-cooling your home before peak rates kick in. This happens <strong>seamlessly in the background</strong>, optimizing your costs without you lifting a finger.</p>
        </div>
      </div>

      <h2>3. Creating a Cohesive Ecosystem</h2>
      <p>Smart grids truly shine when they integrate your home's assets: <strong>Solar Panels + Battery Storage + EV Charging</strong>. Instead of these systems working in isolation, smart grid technology turns them into a single, cohesive ecosystem:</p>

      <div class="ecosystem-features">
        <div class="ecosystem-item">
          <h3>Maximize Renewables</h3>
          <p>The system automatically stores excess solar energy in your battery or uses it to charge your EV.</p>
        </div>
        <div class="ecosystem-item">
          <h3>Intelligent Sourcing</h3>
          <p>During times when solar production is low but your needs are high, the system intelligently draws from the most cost-effective source—whether that is your battery or the grid.</p>
        </div>
        <div class="ecosystem-item">
          <h3>Community Balance</h3>
          <p>When multiple homes and businesses connect, the smart grid can balance energy across the entire network, using excess production from one location to meet demand at another.</p>
        </div>
      </div>

      <h2>4. Why Choose VoltHub? Future-Proof Your Investment</h2>
      <p>Technology in the energy sector evolves rapidly. New standards and protocols emerge every year. The fear for many buyers is investing in a system that becomes obsolete in five years.</p>

      <div class="highlight-box success">
        <p><strong>VoltHub solves this problem.</strong></p>
      </div>

      <div class="volthub-advantages">
        <div class="advantage-item">
          <h3>Built on Open Standards</h3>
          <p>Unlike closed "black box" systems, VoltHub's systems are built with <strong>open standards and modular architectures</strong>. This allows for easy integration with new technologies as they become available.</p>
        </div>
        <div class="advantage-item">
          <h3>Scalable & Flexible</h3>
          <p>By choosing VoltHub, you ensure your infrastructure remains relevant. You won't face expensive upgrades or replacements just to stay current.</p>
        </div>
        <div class="advantage-item">
          <h3>Tailored Strategy</h3>
          <p>We don't just sell hardware; we provide solutions. Our consultants assess your property, energy consumption patterns, and objectives to design a smart grid integration strategy that maximizes your specific benefits.</p>
        </div>
      </div>

      <div class="cta-section">
        <h2>Ready to Optimize Your Energy?</h2>
        <p>Whether you are looking to upgrade to a smart meter, install comprehensive energy management software, or add smart controls to your existing renewables, VoltHub is your partner in building a resilient, future-ready energy system.</p>
      </div>
    `,
    author: "VoltHub Technology Team",
    date: "January 28, 2025",
    readingTime: "6 mins",
  },
  "commercial-energy-solutions-business-guide": {
    content: `
      <div class="intro-section">
        <p class="lead-text">⚡️ Conquer Peak Demand: How VoltHub Energy Storage Cuts Utility Bills and Fortifies Your Business</p>
        <p>Commercial energy costs are rapidly becoming a significant portion of operational expenses. One of the most punishing aspects is peak shaving, where utility companies charge significantly higher rates during peak demand periods (typically in the afternoon and early evening).</p>
        <div class="highlight-box">
          <p><strong>Did you know?</strong> Using stored energy during these peak hours instead of drawing from the grid can dramatically reduce your demand charges, often accounting for <strong>30-50% of your commercial electricity bills</strong>.</p>
        </div>
        <p>This isn't just about saving money; it's about reliability. Business-critical operations like data centers, manufacturing, healthcare, and cold storage facilities simply cannot afford downtime. Even brief power outages can lead to significant losses, from spoiled inventory to production downtime and data loss.</p>
      </div>

      <h2>The Rising Cost of Doing Business (And How to Fight It)</h2>
      <p>Commercial energy costs are rapidly becoming a significant portion of operational expenses. One of the most punishing aspects is peak shaving, where utility companies charge significantly higher rates during peak demand periods (typically in the afternoon and early evening).</p>
      
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">🏪</div>
          <h3>Small Commercial Installations</h3>
          <p><strong>40-200kWh:</strong> Ideal for retail, small offices, and restaurants.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🏢</div>
          <h3>Large Commercial Installations</h3>
          <p><strong>400-800kWh+:</strong> Designed for major manufacturing, shopping centers, and hotels.</p>
        </div>
      </div>

      <p>VoltHub offers solutions tailored to your specific business needs that can power essential operations for several hours during an outage and provide significant peak shaving benefits during normal operation.</p>

      <h2>The VoltHub Advantage: Financial Gains and Operational Security</h2>
      <p>Commercial energy storage typically provides payback within <strong>3–6 years</strong>, with many businesses seeing <strong>20-40% reduction in energy costs immediately</strong>. The financial benefits come from multiple sources, including:</p>

      <div class="benefits-list">
        <div class="benefit-item">
          <h3>Demand Charge Reduction</h3>
          <p>The largest contributor, allowing you to use stored energy when rates are high.</p>
        </div>
        <div class="benefit-item">
          <h3>Time-of-Use Optimization</h3>
          <p>Charging when rates are low and discharging when rates are high.</p>
        </div>
        <div class="benefit-item">
          <h3>Significant Incentives</h3>
          <p>Leveraging tax credits, rebates, and accelerated depreciation that can reduce the net cost of a system by <strong>30-50%</strong>.</p>
        </div>
      </div>

      <p>When combined with energy savings, many commercial systems achieve payback in just a few years. After that, they continue generating pure savings for the remainder of their <strong>15-20 year lifespan</strong>.</p>

      <div class="highlight-box success">
        <p><strong>🌱 Beyond the Bottom Line: Sustainability and Leadership</strong></p>
        <p>Choosing VoltHub positions your business as a leader in sustainability, enhancing your brand reputation, attracting environmentally conscious customers and employees, and helping you meet increasingly stringent environmental regulations and corporate sustainability goals.</p>
      </div>

      <h2>Seamless Implementation: Our Comprehensive 4-Step Process</h2>
      <p>Our team handles everything from initial assessment to system deployment. We ensure minimal disruption and optimal performance with a comprehensive strategy:</p>

      <div class="ecosystem-features">
        <div class="ecosystem-item">
          <h3>1. Initial Assessment and System Design</h3>
          <p>We begin with a comprehensive energy audit to understand your consumption patterns, peak demand periods, and backup power requirements. This informs the system design to ensure we recommend the optimal size and configuration for your specific needs.</p>
        </div>
        <div class="ecosystem-item">
          <h3>2. Professional Installation</h3>
          <p>Installation is carefully planned to minimize disruption to your business operations, with our experienced technicians working efficiently and often completing installations during off-hours or in phases.</p>
        </div>
        <div class="ecosystem-item">
          <h3>3. Training and Scheduling</h3>
          <p>Once installed, we provide comprehensive training for your staff and establish a maintenance schedule to ensure optimal long-term performance.</p>
        </div>
        <div class="ecosystem-item">
          <h3>4. Ongoing Support</h3>
          <p>VoltHub solutions have successfully implemented energy solutions, achieving significant cost savings and sustainability improvements.</p>
        </div>
      </div>

      <div class="highlight-box">
        <p><strong>Success Story:</strong> A manufacturing facility in Metro Manila that utilized VoltHub reduced its monthly electricity costs by <strong>35%</strong> through peak shaving and load shifting while achieving payback in just <strong>4 years</strong>.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">3-6</div>
          <div class="stat-label">Years to Payback</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">20-40%</div>
          <div class="stat-label">Immediate Cost Reduction</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">15-20</div>
          <div class="stat-label">Year System Lifespan</div>
        </div>
      </div>

      <div class="cta-section">
        <h2>🚀 Ready to Take Control of Your Energy Costs?</h2>
        <p>Stop losing money to peak demand charges and secure your operations against unexpected outages.</p>
        <p><strong>VoltHub is more than storage—it's an investment in your financial and operational future.</strong></p>
      </div>
    `,
    author: "VoltHub Commercial Team",
    date: "January 28, 2025",
    readingTime: "7 mins",
  },
};

export default function BlogDetail({ resource }: BlogDetailProps) {
  const content = blogContent[resource.slug || ""] || {
    content: `<p>${resource.description}</p><p>Full content coming soon...</p>`,
    author: "VoltHub Team",
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    readingTime: "5 mins",
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "guide":
        return <RiBookOpenLine className="h-5 w-5" />;
      case "article":
        return <RiFileTextLine className="h-5 w-5" />;
      case "tool":
        return <RiDownloadLine className="h-5 w-5" />;
      default:
        return <RiFileTextLine className="h-5 w-5" />;
    }
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6 md:mb-8 mt-20 md:mt-24 group"
      >
        <RiArrowLeftLine className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      {/* Header */}
      <header className="mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wide">
            {getTypeIcon(resource.type)}
            {resource.type}
          </span>
          {content.readingTime && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
              <RiTimeLine className="h-4 w-4" />
              {content.readingTime} read
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {resource.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
          {resource.description}
        </p>
        <div className="flex items-center gap-4 text-sm md:text-base text-gray-500 flex-wrap">
          <div className="flex items-center gap-2">
            <RiCalendarLine className="h-4 w-4" />
            <span>{content.date}</span>
          </div>
          {content.author && (
            <>
            <span className="text-gray-400">•</span>
            <span>By {content.author}</span>
            </>
          )}
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-8 md:mb-12 shadow-xl bg-white">
        <Image
          src={resource.image}
          alt={resource.imageAlt || resource.title}
          width={1200}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none text-gray-600
          prose-headings:text-gray-900 prose-headings:font-bold
          prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pt-4 prose-h2:border-t prose-h2:border-gray-200
          prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-gray-800
          prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base prose-p:md:text-lg prose-p:mt-0
          prose-ul:text-gray-600 prose-ul:my-6 prose-ul:mb-6 prose-ul:space-y-2
          prose-li:mb-2 prose-li:text-gray-600 prose-li:leading-relaxed prose-li:pl-2
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
          [&>p]:mb-6 [&>p]:mt-0
          [&_.lead-text]:text-xl [&_.lead-text]:md:text-2xl [&_.lead-text]:font-semibold [&_.lead-text]:text-gray-800 [&_.lead-text]:mb-6 [&_.lead-text]:leading-relaxed
          [&_.intro-section]:mb-10 [&_.intro-section]:pb-8 [&_.intro-section]:border-b [&_.intro-section]:border-gray-200
          [&_.blog-image-section]:my-12 [&_.blog-image-section]:md:my-16
          [&_.image-wrapper]:relative [&_.image-wrapper]:w-full [&_.image-wrapper]:overflow-hidden [&_.image-wrapper]:rounded-2xl [&_.image-wrapper]:shadow-2xl [&_.image-wrapper]:bg-gray-100
          [&_.blog-content-image]:w-full [&_.blog-content-image]:h-auto [&_.blog-content-image]:object-cover [&_.blog-content-image]:transition-transform [&_.blog-content-image]:duration-500 [&_.blog-content-image]:hover:scale-105
          [&_.image-overlay-gradient]:absolute [&_.image-overlay-gradient]:inset-0 [&_.image-overlay-gradient]:bg-gradient-to-t [&_.image-overlay-gradient]:from-black/10 [&_.image-overlay-gradient]:via-transparent [&_.image-overlay-gradient]:to-transparent [&_.image-overlay-gradient]:pointer-events-none
          [&_.image-caption]:text-center [&_.image-caption]:text-sm [&_.image-caption]:md:text-base [&_.image-caption]:text-gray-500 [&_.image-caption]:mt-4 [&_.image-caption]:italic [&_.image-caption]:max-w-3xl [&_.image-caption]:mx-auto [&_.image-caption]:leading-relaxed
          [&_.highlight-box]:bg-gradient-to-br [&_.highlight-box]:from-primary/5 [&_.highlight-box]:to-accent/5 [&_.highlight-box]:border [&_.highlight-box]:border-primary/20 [&_.highlight-box]:rounded-xl [&_.highlight-box]:p-6 [&_.highlight-box]:md:p-8 [&_.highlight-box]:my-8 [&_.highlight-box]:shadow-sm
          [&_.highlight-box.success]:from-green-50 [&_.highlight-box.success]:to-emerald-50 [&_.highlight-box.success]:border-green-200
          [&_.stats-grid]:grid [&_.stats-grid]:grid-cols-1 [&_.stats-grid]:md:grid-cols-3 [&_.stats-grid]:gap-6 [&_.stats-grid]:my-10
          [&_.stat-item]:bg-white [&_.stat-item]:border [&_.stat-item]:border-gray-200 [&_.stat-item]:rounded-xl [&_.stat-item]:p-6 [&_.stat-item]:text-center [&_.stat-item]:shadow-sm [&_.stat-item]:hover:shadow-md [&_.stat-item]:transition-shadow
          [&_.stat-number]:text-3xl [&_.stat-number]:md:text-4xl [&_.stat-number]:font-bold [&_.stat-number]:text-primary [&_.stat-number]:mb-2
          [&_.stat-label]:text-sm [&_.stat-label]:md:text-base [&_.stat-label]:text-gray-600
          [&_.charging-levels-visual-section]:my-12 [&_.charging-levels-visual-section]:md:my-16
          [&_.charging-levels-image-wrapper]:relative [&_.charging-levels-image-wrapper]:w-full [&_.charging-levels-image-wrapper]:overflow-hidden [&_.charging-levels-image-wrapper]:rounded-2xl [&_.charging-levels-image-wrapper]:shadow-2xl [&_.charging-levels-image-wrapper]:bg-white [&_.charging-levels-image-wrapper]:border [&_.charging-levels-image-wrapper]:border-gray-200
          [&_.charging-levels-guide-image]:w-full [&_.charging-levels-guide-image]:h-auto [&_.charging-levels-guide-image]:object-contain
          [&_.benefits-grid]:grid [&_.benefits-grid]:grid-cols-1 [&_.benefits-grid]:md:grid-cols-3 [&_.benefits-grid]:gap-6 [&_.benefits-grid]:my-10
          [&_.benefit-card]:bg-gradient-to-br [&_.benefit-card]:from-primary/5 [&_.benefit-card]:to-accent/5 [&_.benefit-card]:border [&_.benefit-card]:border-primary/20 [&_.benefit-card]:rounded-xl [&_.benefit-card]:p-6 [&_.benefit-card]:md:p-8 [&_.benefit-card]:text-center [&_.benefit-card]:shadow-sm [&_.benefit-card]:hover:shadow-md [&_.benefit-card]:transition-all [&_.benefit-card]:duration-300
          [&_.benefit-icon]:text-4xl [&_.benefit-icon]:md:text-5xl [&_.benefit-icon]:mb-4
          [&_.benefit-card_h3]:text-xl [&_.benefit-card_h3]:font-bold [&_.benefit-card_h3]:text-gray-900 [&_.benefit-card_h3]:mb-2
          [&_.benefit-card_p]:text-gray-600 [&_.benefit-card_p]:leading-relaxed
          [&_.step-content_h3]:text-xl [&_.step-content_h3]:md:text-2xl [&_.step-content_h3]:font-bold [&_.step-content_h3]:text-gray-900 [&_.step-content_h3]:mb-3
          [&_.step-content_p]:text-gray-600 [&_.step-content_p]:leading-relaxed [&_.step-content_p]:mb-2
          [&_.tip-header_h3]:text-xl [&_.tip-header_h3]:md:text-2xl [&_.tip-header_h3]:font-bold [&_.tip-header_h3]:text-gray-900
          [&_.steps-visual-section]:my-12 [&_.steps-visual-section]:md:my-16
          [&_.steps-image-wrapper]:relative [&_.steps-image-wrapper]:w-full [&_.steps-image-wrapper]:overflow-hidden [&_.steps-image-wrapper]:rounded-2xl [&_.steps-image-wrapper]:shadow-2xl [&_.steps-image-wrapper]:bg-white [&_.steps-image-wrapper]:border [&_.steps-image-wrapper]:border-gray-200 [&_.steps-image-wrapper]:mb-8
          [&_.steps-guide-image]:w-full [&_.steps-guide-image]:h-auto [&_.steps-guide-image]:object-contain
          [&_.steps-quick-reference]:bg-gradient-to-br [&_.steps-quick-reference]:from-gray-50 [&_.steps-quick-reference]:to-white [&_.steps-quick-reference]:border [&_.steps-quick-reference]:border-gray-200 [&_.steps-quick-reference]:rounded-xl [&_.steps-quick-reference]:p-6 [&_.steps-quick-reference]:md:p-8 [&_.steps-quick-reference]:shadow-sm
          [&_.quick-ref-title]:text-2xl [&_.quick-ref-title]:md:text-3xl [&_.quick-ref-title]:font-bold [&_.quick-ref-title]:text-gray-900 [&_.quick-ref-title]:mb-6 [&_.quick-ref-title]:text-center
          [&_.quick-steps-grid]:grid [&_.quick-steps-grid]:grid-cols-1 [&_.quick-steps-grid]:md:grid-cols-2 [&_.quick-steps-grid]:lg:grid-cols-3 [&_.quick-steps-grid]:gap-4 [&_.quick-steps-grid]:md:gap-6
          [&_.quick-step]:flex [&_.quick-step]:items-start [&_.quick-step]:gap-4 [&_.quick-step]:bg-white [&_.quick-step]:p-4 [&_.quick-step]:rounded-lg [&_.quick-step]:border [&_.quick-step]:border-gray-200 [&_.quick-step]:hover:border-primary [&_.quick-step]:hover:shadow-md [&_.quick-step]:transition-all [&_.quick-step]:duration-300
          [&_.quick-step-number]:flex-shrink-0 [&_.quick-step-number]:w-10 [&_.quick-step-number]:h-10 [&_.quick-step-number]:bg-primary [&_.quick-step-number]:text-white [&_.quick-step-number]:rounded-full [&_.quick-step-number]:flex [&_.quick-step-number]:items-center [&_.quick-step-number]:justify-center [&_.quick-step-number]:font-bold [&_.quick-step-number]:text-sm
          [&_.quick-step-text]:flex-1 [&_.quick-step-text]:flex [&_.quick-step-text]:flex-col [&_.quick-step-text]:gap-1
          [&_.quick-step-text_strong]:text-gray-900 [&_.quick-step-text_strong]:font-semibold [&_.quick-step-text_strong]:text-base
          [&_.quick-step-text_span]:text-sm [&_.quick-step-text_span]:text-gray-600 [&_.quick-step-text_span]:leading-relaxed
          [&_.tips-visual-section]:my-12 [&_.tips-visual-section]:md:my-16
          [&_.tips-image-wrapper]:relative [&_.tips-image-wrapper]:w-full [&_.tips-image-wrapper]:overflow-hidden [&_.tips-image-wrapper]:rounded-2xl [&_.tips-image-wrapper]:shadow-2xl [&_.tips-image-wrapper]:bg-white [&_.tips-image-wrapper]:border [&_.tips-image-wrapper]:border-gray-200 [&_.tips-image-wrapper]:mb-8
          [&_.tips-guide-image]:w-full [&_.tips-guide-image]:h-auto [&_.tips-guide-image]:object-contain
          [&_.additional-tips-section]:bg-gradient-to-br [&_.additional-tips-section]:from-gray-50 [&_.additional-tips-section]:to-white [&_.additional-tips-section]:border [&_.additional-tips-section]:border-gray-200 [&_.additional-tips-section]:rounded-xl [&_.additional-tips-section]:p-6 [&_.additional-tips-section]:md:p-8 [&_.additional-tips-section]:shadow-sm
          [&_.additional-tips-title]:text-2xl [&_.additional-tips-title]:md:text-3xl [&_.additional-tips-title]:font-bold [&_.additional-tips-title]:text-gray-900 [&_.additional-tips-title]:mb-6 [&_.additional-tips-title]:text-center
          [&_.additional-tips-grid]:grid [&_.additional-tips-grid]:grid-cols-1 [&_.additional-tips-grid]:md:grid-cols-3 [&_.additional-tips-grid]:gap-6
          [&_.additional-tip-card]:bg-white [&_.additional-tip-card]:border [&_.additional-tip-card]:border-gray-200 [&_.additional-tip-card]:rounded-xl [&_.additional-tip-card]:p-6 [&_.additional-tip-card]:shadow-sm [&_.additional-tip-card]:hover:shadow-md [&_.additional-tip-card]:hover:border-primary [&_.additional-tip-card]:transition-all [&_.additional-tip-card]:duration-300
          [&_.additional-tip-number]:w-12 [&_.additional-tip-number]:h-12 [&_.additional-tip-number]:bg-accent [&_.additional-tip-number]:text-white [&_.additional-tip-number]:rounded-full [&_.additional-tip-number]:flex [&_.additional-tip-number]:items-center [&_.additional-tip-number]:justify-center [&_.additional-tip-number]:font-bold [&_.additional-tip-number]:text-lg [&_.additional-tip-number]:mb-4 [&_.additional-tip-number]:mx-auto
          [&_.additional-tip-content]:text-center
          [&_.additional-tip-content_h4]:text-xl [&_.additional-tip-content_h4]:font-bold [&_.additional-tip-content_h4]:text-gray-900 [&_.additional-tip-content_h4]:mb-3
          [&_.additional-tip-content_p]:text-gray-600 [&_.additional-tip-content_p]:leading-relaxed [&_.additional-tip-content_p]:mb-2
          [&_.additional-tip-content_ul]:text-left [&_.additional-tip-content_ul]:text-gray-600 [&_.additional-tip-content_ul]:space-y-2 [&_.additional-tip-content_ul]:mt-3
          [&_.additional-tip-content_li]:leading-relaxed
          [&_.partner-section]:mt-12 [&_.partner-section]:p-8 [&_.partner-section]:md:p-10 [&_.partner-section]:bg-gradient-to-br [&_.partner-section]:from-gray-50 [&_.partner-section]:to-white [&_.partner-section]:rounded-2xl [&_.partner-section]:border [&_.partner-section]:border-gray-200 [&_.partner-section]:shadow-sm
          [&_.comparison-grid]:grid [&_.comparison-grid]:grid-cols-1 [&_.comparison-grid]:md:grid-cols-2 [&_.comparison-grid]:gap-6 [&_.comparison-grid]:my-8
          [&_.comparison-card]:bg-white [&_.comparison-card]:border [&_.comparison-card]:border-gray-200 [&_.comparison-card]:rounded-xl [&_.comparison-card]:p-6 [&_.comparison-card]:shadow-sm
          [&_.comparison-card-highlight]:bg-gradient-to-br [&_.comparison-card-highlight]:from-primary/5 [&_.comparison-card-highlight]:to-accent/5 [&_.comparison-card-highlight]:border-primary/30
          [&_.comparison-title]:text-xl [&_.comparison-title]:font-bold [&_.comparison-title]:text-gray-900 [&_.comparison-title]:mb-3
          [&_.benefits-list]:space-y-6 [&_.benefits-list]:my-8
          [&_.benefit-item]:bg-white [&_.benefit-item]:border-l-4 [&_.benefit-item]:border-primary [&_.benefit-item]:p-6 [&_.benefit-item]:rounded-r-lg [&_.benefit-item]:shadow-sm
          [&_.benefit-item_h3]:text-xl [&_.benefit-item_h3]:font-bold [&_.benefit-item_h3]:text-gray-900 [&_.benefit-item_h3]:mb-2
          [&_.benefit-item_p]:text-gray-600 [&_.benefit-item_p]:leading-relaxed
          [&_.ecosystem-features]:grid [&_.ecosystem-features]:grid-cols-1 [&_.ecosystem-features]:md:grid-cols-3 [&_.ecosystem-features]:gap-6 [&_.ecosystem-features]:my-8
          [&_.ecosystem-item]:bg-gradient-to-br [&_.ecosystem-item]:from-gray-50 [&_.ecosystem-item]:to-white [&_.ecosystem-item]:border [&_.ecosystem-item]:border-gray-200 [&_.ecosystem-item]:rounded-xl [&_.ecosystem-item]:p-6 [&_.ecosystem-item]:shadow-sm [&_.ecosystem-item]:hover:shadow-md [&_.ecosystem-item]:transition-shadow
          [&_.ecosystem-item_h3]:text-lg [&_.ecosystem-item_h3]:font-bold [&_.ecosystem-item_h3]:text-gray-900 [&_.ecosystem-item_h3]:mb-3
          [&_.ecosystem-item_p]:text-gray-600 [&_.ecosystem-item_p]:leading-relaxed
          [&_.volthub-advantages]:space-y-6 [&_.volthub-advantages]:my-8
          [&_.advantage-item]:bg-white [&_.advantage-item]:border [&_.advantage-item]:border-gray-200 [&_.advantage-item]:rounded-xl [&_.advantage-item]:p-6 [&_.advantage-item]:shadow-sm [&_.advantage-item]:hover:shadow-md [&_.advantage-item]:transition-all
          [&_.advantage-item_h3]:text-xl [&_.advantage-item_h3]:font-bold [&_.advantage-item_h3]:text-gray-900 [&_.advantage-item_h3]:mb-3
          [&_.advantage-item_p]:text-gray-600 [&_.advantage-item_p]:leading-relaxed
          [&_.cta-section]:mt-12 [&_.cta-section]:p-8 [&_.cta-section]:bg-gradient-to-br [&_.cta-section]:from-primary/5 [&_.cta-section]:to-accent/5 [&_.cta-section]:rounded-2xl [&_.cta-section]:border [&_.cta-section]:border-primary/20 [&_.cta-section]:shadow-sm
          [&_.cta-section_h2]:text-2xl [&_.cta-section_h2]:md:text-3xl [&_.cta-section_h2]:font-bold [&_.cta-section_h2]:text-gray-900 [&_.cta-section_h2]:mb-4
          [&_.cta-section_p]:text-gray-700 [&_.cta-section_p]:text-lg [&_.cta-section_p]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />

      {/* Key Takeaways Section */}
      {(
        <div className="mt-12 md:mt-16 p-6 md:p-10 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <RiFlashlightLine className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Key Takeaways
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <RiSpeedUpLine className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-gray-700"><strong>Ultra-fast charging</strong> (50-150kW) is now the standard expectation for public stations.</p>
            </div>
            <div className="flex items-start gap-3">
              <RiPlugLine className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-gray-700"><strong>V2G technology</strong> transforms chargers into dynamic energy assets.</p>
            </div>
            <div className="flex items-start gap-3">
              <RiShieldCheckLine className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-gray-700"><strong>Reliability</strong> is the #1 differentiator—drivers filter by &quot;Success Score.&quot;</p>
            </div>
            <div className="flex items-start gap-3">
              <RiGlobalLine className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-gray-700"><strong>NACS standardization</strong> simplifies infrastructure and future-proofs investments.</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-12 md:mt-16 p-8 md:p-10 bg-gradient-to-br from-primary via-primary/95 to-accent rounded-2xl shadow-xl text-white">
        <div className="max-w-2xl">
          {resource.slug === "energy-savings-calculator-roi-analysis" ? (
            <>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Saving?
              </h3>
              <p className="text-white/90 mb-6 text-lg leading-relaxed">
                Now that you&apos;ve seen your potential savings, let&apos;s make it a reality. Our energy consultants use advanced modeling software to create detailed financial projections tailored to your specific circumstances.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  Get a Free Consultation
                  <RiArrowRightLine className="h-5 w-5" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Explore Our Solutions
                  <RiArrowRightLine className="h-5 w-5" />
                </Link>
              </div>
            </>
          ) : resource.slug === "commercial-energy-solutions-business-guide" ? (
            <>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Conquer Peak Demand and Cut Your Energy Costs?
              </h3>
              <p className="text-white/90 mb-6 text-lg leading-relaxed">
                Stop losing money to peak demand charges and secure your operations against unexpected outages. Get a free consultation and discover how VoltHub can reduce your energy costs by 20-40% with payback in just 3-6 years.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Free Commercial Consultation
                  <RiArrowRightLine className="h-5 w-5" />
                </Link>
                <Link
                  href="/sectors/commercial"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Explore Commercial Solutions
                  <RiArrowRightLine className="h-5 w-5" />
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to upgrade your infrastructure?
              </h3>
              <p className="text-white/90 mb-6 text-lg leading-relaxed">
                We offer cutting-edge EV charging solutions tailored for modern stations. From high-speed capabilities to smart grid integration, our chargers are built to future-proof your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  Explore Our EV Charger Catalog
                  <RiArrowRightLine className="h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Contact Us for a Quote
                  <RiArrowRightLine className="h-5 w-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

