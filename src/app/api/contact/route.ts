import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildEmailHtml } from "@/lib/email";

function getResendClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeName(name: string): string {
  return name.replace(/[^\p{L}\p{N}\s'-]/gu, "").trim();
}

const interestLabels: Record<string, string> = {
  // Products
  "ev-charging-station": "EV Charging Station",
  "solar-street-lights": "Solar Street Lights",
  "smart-home-ips": "Smart Home IPS",
  "cabinet-type-power-supply": "Power Supplies",
  "container-type-power-supply": "Container Type Power Supply",
  // Services - EV Charging
  "ev-charging-installation": "EV Charging Installation",
  "ev-charging-quote": "EV Charging Quote",
  "ac-charger-installation": "AC Charger Installation (7kW)",
  "dc-fast-charger-installation": "DC Fast Charger Installation (60-400kW)",
  // Services - Solar Installation
  "solar-energy-installation": "Solar Energy Installation",
  "solar-installation-quote": "Solar Installation Quote",
  "street-light-installation": "Street Light Installation",
  "solar-street-light-quote": "Solar Street Light Quote",
  "off-grid-power-generation": "Off-Grid Power Generation System",
  "energy-storage-installation": "Energy Storage Installation",
  // Sector-Specific
  "residential-solutions": "Residential Solutions",
  "commercial-solutions": "Commercial Solutions",
  "industrial-solutions": "Industrial Solutions",
  "rural-projects": "Rural Projects",
  // Partners
  "location-partner": "Location Partner",
  // Lead capture
  "newsletter-signup": "Newsletter Signup",
  "free-guide-download": "Free Guide Download",
  // General
  "general-inquiry": "General Inquiry",
  "technical-support": "Technical Support",
  "maintenance-service": "Maintenance Service",
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid request body" },
        { status: 400 },
      );
    }

    const {
      firstName: rawFirstName,
      lastName: rawLastName,
      email,
      phone,
      region,
      province,
      city,
      interest,
      details,
    } = body as Record<string, unknown>;

    // Validate required fields
    if (
      typeof rawFirstName !== "string" || rawFirstName.trim() === "" ||
      typeof rawLastName !== "string" || rawLastName.trim() === "" ||
      typeof email !== "string" || email.trim() === ""
    ) {
      return NextResponse.json(
        { ok: false, error: "First name, last name, and email are required" },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address" },
        { status: 400 },
      );
    }

    const firstName = sanitizeName(rawFirstName);
    const lastName = sanitizeName(rawLastName);

    if (firstName === "" || lastName === "") {
      return NextResponse.json(
        { ok: false, error: "Name contains invalid characters" },
        { status: 400 },
      );
    }

    const interestKey = typeof interest === "string" ? interest : "general-inquiry";
    const interestLabel = interestLabels[interestKey] ?? "Inquiry";
    const subject = `${interestLabel} - ${firstName} ${lastName}`;

    const html = buildEmailHtml({
      subject,
      firstName,
      lastName,
      email,
      phone: typeof phone === "string" ? phone : undefined,
      region: typeof region === "string" ? region : undefined,
      province: typeof province === "string" ? province : undefined,
      city: typeof city === "string" ? city : undefined,
      interestLabel,
      details: typeof details === "string" ? details : undefined,
    });

    // Route price/quote inquiries to judy@volthub.ph, everything else to admin
    const isPriceInquiry =
      interestKey === "ev-charging-quote" ||
      interestKey === "solar-installation-quote" ||
      interestKey === "solar-street-light-quote" ||
      (typeof details === "string" && details.toLowerCase().includes("quote"));

    const recipientEmail = isPriceInquiry
      ? (process.env.PRICE_INQUIRY_EMAIL || "judy@volthub.ph")
      : (process.env.CONTACT_EMAIL || "admin@volthub.ph");

    const { error: sendError } = await getResendClient().emails.send({
      from: "VoltHub <noreply@volthub.ph>",
      to: recipientEmail,
      subject,
      html,
      replyTo: email,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 },
    );
  }
}
