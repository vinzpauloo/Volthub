import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildSolarQuoteEmailHtml,
  type SolarQuoteEmailData,
} from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey)
    throw new Error("RESEND_API_KEY environment variable is not set");
  return new Resend(apiKey);
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Validate required customer fields
    const customerName =
      typeof body.customerName === "string" ? body.customerName.trim() : "";
    const customerEmail =
      typeof body.customerEmail === "string" ? body.customerEmail.trim() : "";

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(customerEmail)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const quoteData: SolarQuoteEmailData = {
      customerName,
      customerEmail,
      customerPhone:
        typeof body.customerPhone === "string"
          ? body.customerPhone.trim()
          : undefined,
      systemType:
        typeof body.systemType === "string" ? body.systemType : "hybrid",
      systemTypeLabel:
        typeof body.systemTypeLabel === "string"
          ? body.systemTypeLabel
          : "Hybrid Setup",
      province:
        typeof body.province === "string" ? body.province : "Unknown",
      lifestyle:
        typeof body.lifestyle === "string" ? body.lifestyle : "balanced",
      monthlyBill:
        typeof body.monthlyBill === "number" ? body.monthlyBill : 0,
      monthlyKwh:
        typeof body.monthlyKwh === "number" ? body.monthlyKwh : 0,
      systemSizeKw:
        typeof body.systemSizeKw === "string" ? body.systemSizeKw : "0",
      installedBatteryKwh:
        typeof body.installedBatteryKwh === "number"
          ? body.installedBatteryKwh
          : 0,
      dailyProduction:
        typeof body.dailyProduction === "string"
          ? body.dailyProduction
          : "0",
      rooftopNeeded:
        typeof body.rooftopNeeded === "number" ? body.rooftopNeeded : 0,
      bomItems: Array.isArray(body.bomItems) ? body.bomItems : [],
      bomTotalCost:
        typeof body.bomTotalCost === "number" ? body.bomTotalCost : 0,
      monthlySavings:
        typeof body.monthlySavings === "string"
          ? body.monthlySavings
          : "0",
      paybackYears:
        typeof body.paybackYears === "string"
          ? body.paybackYears
          : "—",
      appliances: Array.isArray(body.appliances) ? body.appliances : [],
      whatThisPowers: Array.isArray(body.whatThisPowers)
        ? body.whatThisPowers
        : [],
      backupRuntime:
        typeof body.backupRuntime === "string"
          ? body.backupRuntime
          : null,
    };

    const subject = `☀ Solar Quotation Request — ${customerName} (${quoteData.systemTypeLabel})`;

    const html = buildSolarQuoteEmailHtml(quoteData);

    const { error: sendError } = await getResendClient().emails.send({
      from: "VoltHub <noreply@volthub.ph>",
      to: "sales@volthub.ph",
      subject,
      html,
      replyTo: customerEmail,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json(
        { ok: false, error: sendError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in solar-quote route:", error);
    const message =
      error instanceof Error ? error.message : "Failed to send solar quote";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
