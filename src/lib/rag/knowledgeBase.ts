/**
 * Knowledge Base for RAG (Retrieval Augmented Generation)
 * Extracts and indexes project context for the LLM
 */

import type { Product } from "@/app/products/components/productData";
import { createServerClient } from "@/lib/supabase";

/**
 * Get product by ID from Supabase (server-side)
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const supabase = createServerClient();
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      subtitle: product.subtitle || "",
      category: product.category as Product["category"],
      tag: product.tag || undefined,
      image: product.image,
      images: Array.isArray(product.images) ? product.images : [],
      price: product.price || undefined,
      description: product.description || undefined,
      variations: Array.isArray(product.variations) ? product.variations : [],
      specifications: Array.isArray(product.specifications)
        ? product.specifications
        : [],
      features: Array.isArray(product.features) ? product.features : [],
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Company information
const companyInfo = {
  name: "VoltHub Electric Power Generation Services Corporation",
  established: "January 17, 2025",
  address: "High Street South Corporate Plaza Tower 2, 11th Ave, Bonifacio Global City, Taguig, Philippines",
  phone: "+63 9659700823",
  email: "admin-help@volthub-ev.com",
  website: "https://volthubsupabase.app.netlify",
  description: "A forward-looking energy technology company specializing in EV charging infrastructure, solar power systems, and smart energy solutions.",
  mission: "Building the blueprint for a cleaner energy economy. We provide end-to-end services—from design, engineering, and installation to maintenance and system optimization—tailored for commercial, residential, and industrial clients.",
  services: [
    "EV charging infrastructure",
    "Solar power systems",
    "Smart energy solutions",
    "Battery storage systems",
    "Energy management systems"
  ],
  categories: [
    "EV Charging Stations",
    "Solar Street Lights",
    "Smart Home IPS (Indoor Power Systems)",
    "Power Supplies (Cabinet and Container systems)"
  ]
};

export interface KnowledgeChunk {
  id: string;
  type: 'company' | 'product' | 'service' | 'category';
  content: string;
  metadata: {
    productId?: string;
    productName?: string;
    category?: string;
    tags?: string[];
  };
}

/**
 * Build knowledge base from project data
 */
export async function buildKnowledgeBase(): Promise<KnowledgeChunk[]> {
  const chunks: KnowledgeChunk[] = [];

  // Add company information
  chunks.push({
    id: 'company-info',
    type: 'company',
    content: `Company: ${companyInfo.name}
Established: ${companyInfo.established}
Address: ${companyInfo.address}
Phone: ${companyInfo.phone}
Email: ${companyInfo.email}
Website: ${companyInfo.website}
Description: ${companyInfo.description}
Mission: ${companyInfo.mission}
Services: ${companyInfo.services.join(', ')}
Product Categories: ${companyInfo.categories.join(', ')}`,
    metadata: {}
  });

  // Add contact information chunk (for easy retrieval)
  chunks.push({
    id: 'contact-info',
    type: 'company',
    content: `Contact Information for ${companyInfo.name}:
Phone: ${companyInfo.phone}
Email: ${companyInfo.email}
Address: ${companyInfo.address}
Website: ${companyInfo.website}

For inquiries, support, returns, warranties, or any questions, please contact us using the information above. You can also visit our website at ${companyInfo.website} for more information.`,
    metadata: {}
  });

  // Fetch products from Supabase
  let products: Product[] = [];
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      products = data.map((product: {
        id: string;
        name: string;
        subtitle: string | null;
        category: string;
        tag: string | null;
        image: string;
        images: string[] | null;
        price: string | null;
        description: string | null;
        variations: Product["variations"] | null;
        specifications: Product["specifications"] | null;
        features: Product["features"] | null;
      }) => ({
        id: product.id,
        name: product.name,
        subtitle: product.subtitle || "",
        category: product.category as Product["category"],
        tag: product.tag || undefined,
        image: product.image,
        images: Array.isArray(product.images) ? product.images : [],
        price: product.price || undefined,
        description: product.description || undefined,
        variations: Array.isArray(product.variations) ? product.variations : [],
        specifications: Array.isArray(product.specifications)
          ? product.specifications
          : [],
        features: Array.isArray(product.features) ? product.features : [],
      }));
    }
  } catch (error) {
    console.error("Error fetching products for knowledge base:", error);
  }

  // Add product information
  products.forEach((product: Product) => {
    // Product details are now part of the product object
    const details = {
      description: product.description,
      specifications: product.specifications || [],
      features: product.features || [],
      variations: product.variations || [],
    };
    
    // Product overview chunk
    let productContent = `Product: ${product.name}`;
    if (product.subtitle) productContent += `\nSubtitle: ${product.subtitle}`;
    if (product.description) productContent += `\nDescription: ${product.description}`;
    if (product.price) productContent += `\nPrice: ${product.price}`;
    if (product.tag) productContent += `\nTag: ${product.tag}`;
    productContent += `\nCategory: ${product.category}`;

    if (details?.description) {
      productContent += `\nDetailed Description: ${details.description}`;
    }

    // Specifications
    if (details?.specifications && details.specifications.length > 0) {
      productContent += `\nSpecifications:`;
      details.specifications.forEach((spec: { label: string; value: string }) => {
        productContent += `\n- ${spec.label}: ${spec.value}`;
      });
    }

    // Features
    if (details?.features && details.features.length > 0) {
      productContent += `\nFeatures: ${details.features.join(', ')}`;
    }

    // Variations
    if (details?.variations && details.variations.length > 0) {
      productContent += `\nAvailable Variations:`;
      details.variations.forEach((variation: { name: string; value: string; description?: string }) => {
        productContent += `\n- ${variation.name}: ${variation.value}`;
        if (variation.description) {
          productContent += ` (${variation.description})`;
        }
      });
    }

    chunks.push({
      id: `product-${product.id}`,
      type: 'product',
      content: productContent,
      metadata: {
        productId: product.id,
        productName: product.name,
        category: product.category,
        tags: product.tag ? [product.tag] : []
      }
    });

    // Add applicable spaces/use cases
    const applicableSpaces = getApplicableSpacesForProduct(product);
    if (applicableSpaces) {
      chunks.push({
        id: `product-${product.id}-spaces`,
        type: 'product',
        content: `Product: ${product.name}\nApplicable Spaces and Use Cases:\n${applicableSpaces}`,
        metadata: {
          productId: product.id,
          productName: product.name,
          category: product.category
        }
      });
    }
  });

  // Add category information
  const categoryInfo: Record<string, string> = {
    'ev-charging': 'EV Charging Stations are designed for electric vehicle charging infrastructure. Suitable for premium charging hubs, expressway service areas, commercial parking lots, shopping malls, hotels, fleet depots, and workplace charging facilities.',
    'solar-street': 'Solar Street Lights provide sustainable lighting solutions for streets, roadways, campus pathways, industrial parks, residential areas, parking lots, and public parks.',
    'smart-home': 'Smart Home IPS (Indoor Power Systems) are designed for residential homes, small businesses, home offices, vacation homes, off-grid residences, and emergency backup systems.',
    'cabinet': 'Power Supply Cabinet systems are scalable solutions for whole small islands, LGU projects, large commercial farms, cold-storage hubs, ice plants, resort complexes, and industrial complexes.'
  };

  Object.entries(categoryInfo).forEach(([category, description]) => {
    chunks.push({
      id: `category-${category}`,
      type: 'category',
      content: `Category: ${category}\nDescription: ${description}`,
      metadata: {
        category
      }
    });
  });

  // Add service information
  chunks.push({
    id: 'services',
    type: 'service',
    content: `VoltHub Services:
- End-to-end installation services for all products
- Site assessment and design
- Engineering and planning
- Professional installation
- System testing and commissioning
- Training and documentation
- Maintenance and system optimization
- 3-year warranty on most products
- Technical support and consultation`,
    metadata: {}
  });

  // Add pricing and quotation information
  chunks.push({
    id: 'pricing-street-lights',
    type: 'product',
    content: `Street Lights - Pricing and Specifications:

INTEGRATED LIGHT MODELS:
- F2-050 (8m pole): LED 50W, Size: 1319*460*60mm, Lithium battery: 12.8V 45Ah, Solar Panel: 100W - ₱45,164.50
- F2-080 (9m pole): LED 80W, Size: 1490*640*60mm, Lithium battery: 25.6V 45Ah, Solar Panel: 160W - ₱62,717.00
- F2-100 (10m pole): LED 100W, Size: 1490*730*60mm, Lithium battery: 25.6V 52Ah, Solar Panel: 200W - ₱71,803.00
- F2-120 (12m pole): LED 120W, Size: 1650*830*60mm, Lithium battery: 25.6V 60Ah, Solar Panel: 240W - ₱81,228.25

SPLIT STREET LIGHT MODELS:
- LVQ2-050 (8m pole): LED 50W, Size: 935*415*210mm, Lithium battery: 14.8V 45Ah, Solar Panel: 100W - ₱37,981.25
- LVQ2-080 (9m pole): LED 80W, Size: 935*415*210mm, Lithium battery: 12.8V 90Ah, Solar Panel: 200W - ₱54,088.25
- LVQ2-100 (10m pole): LED 100W, Size: 935*415*210mm, Lithium battery: 25.6V 48Ah, Solar Panel: 250W - ₱60,224.25
- LVQ2-120 (12m pole): LED 120W, Size: 935*415*210mm, Lithium battery: 25.6V 60Ah, Solar Panel: 300W - ₱70,003.50

ALL IN TWO LIGHT MODELS:
- LVXC-120 (5m pole): LED 20W, Size: 495*205*80mm, Lithium battery: 3.2V 65Ah, Solar Panel: 70W - ₱17,346.00
- LVXC-130 (6m pole): LED 30W, Size: 550*240*100mm, Lithium battery: 3.2V 80Ah, Solar Panel: 70W - ₱19,661.75
- LVXC-320 (5m pole): LED 20W, Size: 650*300*130mm, Lithium battery: 3.2V 65Ah, Solar Panel: 70W - ₱17,036.25
- LVXC-330 (6m pole): LED 30W, Size: 650*300*130mm, Lithium battery: 3.2V 80Ah, Solar Panel: 70W - ₱18,939.00

Payment Terms: 30% bank transfer in advance, balance before shipping
Price Validity: 15 days from quotation date
Production Time: 20-25 working days after receiving payment
Package: Standard Export package
Warranty: 3 years`,
    metadata: {}
  });

  chunks.push({
    id: 'pricing-mobile-energy-storage',
    type: 'product',
    content: `Mobile Energy Storage Power Systems - Pricing and Specifications:

SMALL HOME / BACKUP KITS:
- 5kWh / 3kW: Rated Power 3KW/AC 220V, Lithium Battery 5.3kWh, Solar Panel 36V 670W x 4 - ₱255,502.45
  Use: Small home/backup kit. Can run 1 HP aircon (~750W) plus lights, fans, TV, laptop. About 4-5 hours usable at 1kW average.
  Market: Backup for small houses during brownouts, sari-sari stores, off-grid tiny homes, farm huts.

- 10kWh / 5kW: Rated Power 5KW/AC 220V, Lithium Battery 10.6kWh, Solar Panel 36V 670W x 6 - ₱388,122.65
  Use: Standard home/small business. Can run 1-2 HP aircon, refrigerator, lights, fans, TV, computers. About 5-6 hours at 1.5-2kW average.
  Market: Urban homes for long brownouts, small clinics, small offices, BPO satellite office, internet café, small resort cottage.

- 15kWh / 5kW: Rated Power 5KW/AC 220V, Lithium Battery 15.9kWh, Solar Panel 36V 670W x 8 - ₱526,117.75
  Use: Longer backup, same power. Same 5kW max as 10kWh but larger battery.
  Market: Rural homes with frequent long outages, stores with freezers, small cell sites.

- 20kWh / 10kW: Rated Power 10KW/AC 220V, Lithium Battery 21.2kWh, Solar Panel 36V 670W x 12 - ₱838,344.15
  Use: Larger home/small commercial. Can run multiple aircons (3-4 HP total), refrigerator/freezer, lights, computers, pumps.
  Market: Large homes with multiple AC units, small resorts, restaurants, bakeries, small manufacturing, community facilities.

- 25kWh / 10kW: Rated Power 10KW/AC 220V, Lithium Battery 26.5kWh, Solar Panel 36V 670W x 14 - ₱963,918.40
  Use: More hours, same power. Full day-night cycle backup for moderate loads.
  Market: Off-grid homes, cold storage for small agri businesses, small hospitals/clinics.

- 30kWh / 10kW: Rated Power 10KW/AC 220V, Lithium Battery 31.8kWh, Solar Panel 36V 670W x 16 - ₱1,112,638.22
  Use: Mini-microgrid. At 2-3kW average, can run through the night.
  Market: Off-grid communities, remote resorts, island communities, telecom towers, farms with pumps and cold storage.

Rule of thumb for Philippines:
- Basic rural home (no AC) – 5 kWh or 10 kWh
- Middle-class home with 1-2 AC units – 10-20 kWh
- Large house / small business – 20-30 kWh
- Resort, small factory, island microgrid – 20-30 kWh (maybe multiple units)`,
    metadata: {}
  });

  chunks.push({
    id: 'pricing-off-grid-systems-small',
    type: 'product',
    content: `Off-Grid Power Generation Systems - Small to Medium Scale (40-261 kWh):

SMALL COMMERCIAL / REMOTE FACILITY:
- 40kWh / 20kW: Rated Power 20KW/AC 380V/220V, Lithium Battery 40.96kWh, Solar Panel 670W x 30 - ₱1,823,684.10
  Can power: 5-10 small houses, water refilling station, rice mill, small cold room plus office & lighting, cell tower + equipment shelter.
  Market: Off-grid tourist sites, poultry/piggery/fish farms, telecom sites reducing diesel use.

- 60kWh / 30kW: Rated Power 30KW/AC 380V/220V, Lithium Battery 61.4kWh, Solar Panel 670W x 40 - ₱2,694,050.62
  Can power: Small resort (10+ rooms, kitchen, bar, pool pump), medium agricultural facility, cluster of 10-20 households.
  Market: Island barangays, remote mountain communities, bigger manufacturing workshops.

- 80kWh / 40kW: Rated Power 40KW/AC 380V/220V, Lithium Battery 83.2kWh, Solar Panel 670W x 60 - ₱3,918,051.35
  Use: Microgrid for barangay center or campus.
  Market: School campus, barangay center + streetlights + market area, medium resort or eco-park.

- 100kWh / 50kW: Rated Power 50KW/AC 380V/220V, Lithium Battery 100.3kWh, Solar Panel 670W x 72 - ₱4,593,349.12
  Use: Microgrid for barangay center or campus.
  Market: School campus, barangay center + streetlights + market area, medium resort or eco-park.

VILLAGE / INDUSTRIAL-SCALE:
- 215kWh / 100kW: Rated Power 100KW/AC 400V/220V, Lithium Battery 215.04kWh, Solar Panel 670W x 144 - ₱7,754,538.15
- 233kWh / 110kW: Rated Power 110KW/AC 400V/220V, Lithium Battery 232.9kWh, Solar Panel 670W x 144 - ₱8,148,259.90
- 261kWh / 110kW: Rated Power 110KW/AC 400V/220V, Lithium Battery 261.2kWh, Solar Panel 670W x 144 - ₱8,714,233.62
  These are serious microgrids: Can supply tens of houses plus businesses, or one small industrial plant.
  Market: Whole small islands/sitios (dozens of households), LGU projects (solarizing barangays, ports, fish landing centers), large commercial farms, cold-storage hubs, ice plants.

Simple explanation:
- kWh (battery) = how long it can run when sun is gone
- kW (rated power) = how many appliances/machines can run at the same time
- Panels (number of 670W) = how fast you can recharge batteries each day`,
    metadata: {}
  });

  chunks.push({
    id: 'pricing-off-grid-systems-large',
    type: 'product',
    content: `Off-Grid Power Generation Systems - Large Scale (466-2700 kWh):

MINI POWER PLANT FOR SMALL TOWN CENTER:
- 466kWh / 220kW: Rated Power 220KW/AC 400V/220V, Lithium Battery 465.8kWh, Solar Panel 670W x 288 - ₱16,173,481.20
- 522kWh / 220kW: Rated Power 220KW/AC 400V/220V, Lithium Battery 522.4kWh, Solar Panel 670W x 288 - ₱17,256,213.80
  Possible uses: Town center (municipal hall, market, street lighting, shops), large commercial building, single big industrial customer.
  Market: LGU-led solar microgrid for island with few hundred residents, private industrial estates, big poultry integrators, packing plants.

VILLAGE OR ISLAND GRID:
- 783kWh / 300kW: Rated Power 300KW/AC 400V/220V, Lithium Battery 783.6kWh, Solar Panel 670W x 444 - ₱26,311,107.50
  Can act as main power plant for: Whole small island barangay with few hundred households, large resort complex, cluster of factories.
  At 150kW average → around 5 hours of storage; with solar, can cover day + part of night.

SMALL UTILITY LEVEL / INDUSTRIAL PARK:
- 1075kWh / 500kW: Rated Power 500KW/AC 400V/220V, Lithium Battery 1075.2kWh, Solar Panel 670W x 728 - ₱42,239,802.20
- 1205kWh / 500kW: Rated Power 500KW/AC 400V/220V, Lithium Battery 1205.76kWh, Solar Panel 670W x 728 - ₱46,423,089.50
  These are serious systems: Main power for small island town, industrial park or export zone tenant, large university or hospital campus.
  If average demand is 250-300kW → roughly 3-4 hours of battery at full output.

TOWN OR ISLAND-LEVEL POWER PLANT:
- 1800kWh / 1000kW: Rated Power 1000KW/AC 400V/220V, Lithium Battery 1806.3kWh, Solar Panel 670W x 1484 - ₱71,207,141.30
- 2000kWh / 1000kW: Rated Power 1000KW/AC 400V/220V, Lithium Battery 2025.67kWh, Solar Panel 670W x 1484 - ₱76,276,300.40
- 2300kWh / 1000kW: Rated Power 1000KW/AC 400V/220V, Lithium Battery 2362.28kWh, Solar Panel 670W x 1484 - ₱81,766,894.90
- 2700kWh / 1000kW: Rated Power 1000KW/AC 400V/220V, Lithium Battery 2700.9kWh, Solar Panel 670W x 1484 - ₱85,828,342.80
  Main power plant for whole town or large island, or dedicated plant for big industrial complex.
  All are 1 MW (peak output) - can supply power equivalent to hundreds of typical homes plus businesses.
  Market: Electric cooperatives, private utilities, LGUs with grants/PPP, large industrial/commercial sites, large high-end tourism projects.

How to position in Philippine market:
- Government & LGUs: DOE, NEA, LGUs for off-grid islands, diesel-dependent municipalities, public markets, transport terminals, fish ports
- Electric cooperatives / private utilities: Solar + storage plants to shave peak demand, serve remote feeders
- Industrial & commercial estates: Export zones, industrial parks, big cold-storage sites
- High-end tourism/mining/remote camps: Large mining camps, big island resorts, mixed-use developments

Simple messaging: "Solar power plant in a box" - provides power to entire island or industrial complex. Can replace or greatly reduce diesel generators, cutting fuel costs and noise.`,
    metadata: {}
  });

  chunks.push({
    id: 'pricing-ev-charging',
    type: 'product',
    content: `EV Charging Stations - Pricing and Specifications:

AC CHARGING (SLOW CHARGER):
- DPEV-7k (7 kW Single-gun AC): ₱18,062.50
  Type: AC "slow" charger
  Use: Residential, office, hotel parking - locations where cars stay parked for many hours
  Selling point: Low installation cost, suitable as "basic amenity" charger

DC FAST CHARGING:
- DPEV-60k (60 kW Dual-gun DC): ₱361,250.00
  Type: Entry-level DC fast charger
  Use: Malls, supermarkets, city public charging, medium-sized fleets (delivery vans, taxis)
  Selling point: Good balance of cost and speed; can support 1-2 vehicles at a time

- DPEV-120k (120 kW Dual-gun DC): ₱446,250.00
  Type: Standard fast charger
  Use: Highway rest stops, big commercial centers, fleet depots with higher turnover
  Selling point: "Fast top-up within a coffee break"; attractive for inter-city travel

- DPEV-160k (160 kW Single-gun DC): ₱573,750.00
  Type: High-power fast charger
  Use: Premium charging hubs, expressway service areas, sites serving EVs that support higher charging power
  Selling point: Faster sessions, future-proof for newer EVs

- DPEV-400k (400 kW Single-gun DC): ₱1,030,625.00
  Type: Ultra-fast DC charger
  Use: Flagship highway stations, bus/truck depots needing very high power
  Selling point: For vehicles that can accept >200 kW, allows very short charging stops; strong marketing value ("ultra-fast charging up to 400 kW")`,
    metadata: {}
  });

  chunks.push({
    id: 'pricing-general-info',
    type: 'service',
    content: `General Pricing and Quotation Information:

PAYMENT TERMS:
- 30% bank transfer in advance
- Balance before shipping

PRICE VALIDITY:
- Prices are valid for 15 days from quotation date
- Quotation date: 24th November 2025

PRODUCTION TIME:
- 20-25 working days after receiving payment

PACKAGING:
- Standard Export package

WARRANTY:
- 3 years warranty on products

PRODUCT SELECTION GUIDE:
When helping customers choose products, ask:
1. What do you want to power? (List appliances and their wattage)
2. How many hours per day and during brownouts? (More hours needed → higher kWh)
3. What's the maximum they might run at the same time? (Higher simultaneous load → higher kW)
4. Is this for backup only or daily off-grid use? (Backup only: can choose smaller kWh if outages are short. Off-grid: usually 15-30 kWh models)

PRODUCT LADDER OVERVIEW:
- 5-30 kWh mobile units – households / small businesses
- 40-261 kWh (20-110 kW) – barangay, resort, farm, medium industry
- 466-1205 kWh (220-500 kW) – small town centers, large resorts, industrial parks
- 1800-2700 kWh (1 MW) – town- or island-level power plant, big industry

This covers almost every level of the Philippine market, from a single sari-sari store up to an island municipality.`,
    metadata: {}
  });

  return chunks;
}

/**
 * Get applicable spaces for a product
 */
function getApplicableSpacesForProduct(product: { id: string; category: string }): string | null {
  const isEVProduct = product.category === "ev-charging";
  const isSmartHomeProduct = product.category === "smart-home";
  const isCabinetProduct = product.category === "cabinet";
  const isContainerProduct = product.id === "container-con1";

  if (isEVProduct) {
    return `- Premium charging hubs
- Expressway service areas
- Commercial parking lots
- Shopping malls and retail centers
- Hotels and resorts
- Fleet depots and commercial vehicle facilities
- Public charging stations
- Workplace charging facilities`;
  }

  if (isSmartHomeProduct) {
    return `- Residential homes
- Small businesses
- Home offices
- Vacation homes
- Off-grid residences
- Emergency backup for essential loads`;
  }

  if (isCabinetProduct) {
    if (product.id === "cabinet-14" || product.id === "cabinet-15") {
      return `- Whole small islands / sitios (dozens of households)
- LGU projects (solarizing barangays, ports, fish landing centers)
- Large commercial farms
- Cold-storage hubs
- Ice plants`;
    } else if (product.id === "cabinet-16") {
      return `- Whole small island barangays with a few hundred households
- Large resort complexes
- Clusters of factories (e.g., agro-processing complex)`;
    } else if (product.id === "cabinet-item4") {
      return `- Single businesses
- Small compounds
- Schools
- Resorts
- Barangay centers
- Off-grid tourist sites
- Poultry/piggery/fish farms
- Telecom sites`;
    } else {
      return `- Large industrial complexes
- Utility-scale projects
- Major infrastructure projects
- Manufacturing facilities`;
    }
  }

  if (isContainerProduct) {
    return `- Small island towns (currently using diesel generators)
- Industrial parks or export zone tenants
- Cold-storage hubs
- Fish ports
- Mining camps
- Large university or hospital campuses
- Combined municipal loads`;
  }

  // Solar street lights
  if (product.category === "solar-street") {
    return `- Streets and roadways
- Campus pathways
- Industrial parks
- Residential areas
- Parking lots
- Public parks and plazas`;
  }

  return null;
}

/**
 * Simple text similarity search (can be replaced with proper vector embeddings)
 */
export function searchKnowledgeBase(
  query: string,
  knowledgeBase: KnowledgeChunk[],
  limit: number = 5
): KnowledgeChunk[] {
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 2);

  if (queryWords.length === 0) {
    return knowledgeBase.slice(0, limit);
  }

  // Check if query is about contact information
  const isContactQuery = normalizedQuery.match(/\b(contact|phone|email|address|reach|support|return|warranty|policy|help|get in touch)\b/);

  // Score each chunk based on keyword matches
  const scoredChunks = knowledgeBase.map(chunk => {
    const content = chunk.content.toLowerCase();
    let score = 0;

    // Boost contact-info chunk for contact queries
    if (isContactQuery && chunk.id === 'contact-info') {
      score += 20;
    }

    // Exact phrase match
    if (content.includes(normalizedQuery)) {
      score += 10;
    }

    // Word matches
    queryWords.forEach(word => {
      if (content.includes(word)) {
        score += 2;
      }
    });

    // Product name match
    if (chunk.metadata.productName) {
      const productName = chunk.metadata.productName.toLowerCase();
      queryWords.forEach(word => {
        if (productName.includes(word)) {
          score += 5;
        }
      });
    }

    // Category match
    if (chunk.metadata.category) {
      const category = chunk.metadata.category.toLowerCase();
      if (normalizedQuery.includes(category) || category.includes(normalizedQuery.split(' ')[0])) {
        score += 3;
      }
    }

    return { chunk, score };
  });

  // Sort by score and return top results
  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.chunk);
}

/**
 * Get page information for context
 */
function getPageInfoFromPath(path: string | null): { name: string; description: string } | null {
  if (!path) return null;
  
  // Handle sub-paths (e.g., /sectors/commercial, /sectors/residential)
  if (path.startsWith('/sectors/')) {
    const sector = path.split('/sectors/')[1];
    const sectorNames: Record<string, string> = {
      'commercial': 'Commercial Energy Solutions',
      'residential': 'Residential Energy Solutions',
      'industrial': 'Industrial Energy Solutions',
      'government': 'Government & Public Sector Solutions',
      'smart-cities': 'Smart Cities Solutions',
    };
    
    const sectorName = sectorNames[sector] || `Sector: ${sector}`;
    return {
      name: sectorName,
      description: `the ${sectorName.toLowerCase()} page showing energy solutions and products specifically designed for ${sector} sector applications`
    };
  }
  
  // Handle product sub-paths (e.g., /products/ev-charging)
  if (path.startsWith('/products/') && !path.match(/^\/products\/[^/]+$/)) {
    // This is a category page, not a specific product
    const category = path.split('/products/')[1];
    return {
      name: `Products - ${category}`,
      description: `the products page filtered by category: ${category}`
    };
  }
  
  const pageMap: Record<string, { name: string; description: string }> = {
    '/': { 
      name: 'Home', 
      description: 'the homepage with company overview, featured products, and main navigation' 
    },
    '/products': { 
      name: 'Products', 
      description: 'the products listing page showing all available products organized by categories (EV Charging Stations, Solar Street Lights, Smart Home IPS, Power Supplies)' 
    },
    '/sectors': { 
      name: 'Sectors', 
      description: 'the sectors page showing energy solutions organized by industry sectors such as residential homes, commercial businesses, industrial facilities, and government projects' 
    },
    '/services': { 
      name: 'Services', 
      description: 'the services page with information about installation services, site assessment, engineering, maintenance, system optimization, training, and 3-year warranty' 
    },
    '/about': { 
      name: 'About', 
      description: 'the about page with company information, mission statement, and team details' 
    },
    '/contact': { 
      name: 'Contact', 
      description: 'the contact page where users can reach out for inquiries, support, quotes, returns, warranties, or any questions' 
    },
  };

  // Check exact match first
  if (pageMap[path]) {
    return pageMap[path];
  }

  return null;
}

/**
 * Get relevant context for a query
 */
export async function getRelevantContext(
  query: string,
  productId?: string | null,
  currentPagePath?: string | null | undefined,
  maxChunks: number = 5
): Promise<string> {
  const knowledgeBase = await buildKnowledgeBase();
  
  // If we have a product context, prioritize that product
  if (productId) {
    const product = await getProductById(productId);
    const productChunks = knowledgeBase.filter(
      chunk => chunk.metadata.productId === productId
    );
    
    // Add a special context chunk about the current page
    if (product && productChunks.length > 0) {
      const pageContext = `CURRENT PAGE CONTEXT: The user is currently viewing the product page for "${product.name}" (ID: ${productId}). 
When they refer to "this product", "this page", "what page am I on", "where am I", or ask questions without specifying a product name, 
they are asking about "${product.name}". Always assume questions about "this product" refer to "${product.name}".`;
      
      // Get other relevant chunks (excluding current product chunks)
      const otherChunks = searchKnowledgeBase(
        query, 
        knowledgeBase.filter(c => c.metadata.productId !== productId), 
        Math.max(1, maxChunks - productChunks.length - 1)
      );
      
      // Combine: page context first, then product chunks, then other chunks
      const allChunks = [
        pageContext,
        ...productChunks.map(c => c.content),
        ...otherChunks.map(c => c.content)
      ];
      
      return allChunks.join('\n\n---\n\n');
    }
  }

  // Handle non-product pages
  const pageInfo = getPageInfoFromPath(currentPagePath ?? null);
  if (pageInfo) {
    const pageContext = `CURRENT PAGE CONTEXT: The user is currently on the "${pageInfo.name}" page (${currentPagePath}). 
When they ask "what page am I on", "where am I", "what is this page", or questions about the current page, they are referring to the "${pageInfo.name}" page. 
This page shows: ${pageInfo.description}.`;
    
    // Get relevant chunks for the query
    const relevantChunks = searchKnowledgeBase(query, knowledgeBase, maxChunks - 1);
    
    // Combine: page context first, then relevant chunks
    const allChunks = [
      pageContext,
      ...relevantChunks.map(c => c.content)
    ];
    
    return allChunks.join('\n\n---\n\n');
  }

  // Search for relevant chunks (no specific page context)
  const relevantChunks = searchKnowledgeBase(query, knowledgeBase, maxChunks);
  return relevantChunks.map(chunk => chunk.content).join('\n\n---\n\n');
}
