import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildQuoteEmailHtml, type QuoteEmailData } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY environment variable is not set");
  return new Resend(apiKey);
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Validate required fields
    const customerName = typeof body.customerName === "string" ? body.customerName.trim() : "";
    const customerEmail = typeof body.customerEmail === "string" ? body.customerEmail.trim() : "";
    const customerPhone = typeof body.customerPhone === "string" ? body.customerPhone.trim() : undefined;
    const productName = typeof body.productName === "string" ? body.productName : "";

    if (!customerName || !customerEmail || !productName) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and product are required" },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(customerEmail)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address" },
        { status: 400 },
      );
    }

    const quoteData: QuoteEmailData = {
      customerName,
      customerEmail,
      customerPhone,
      productName,
      productImage: typeof body.productImage === "string" ? body.productImage : "",
      productSku: typeof body.productSku === "string" ? body.productSku : undefined,
      variantName: typeof body.variantName === "string" ? body.variantName : undefined,
      variantSku: typeof body.variantSku === "string" ? body.variantSku : undefined,
      variantPrice: typeof body.variantPrice === "number" ? body.variantPrice : undefined,
      quantity: typeof body.quantity === "number" && body.quantity > 0 ? body.quantity : 1,
      accessories: Array.isArray(body.accessories) ? body.accessories : undefined,
      includeInstallation: body.includeInstallation === true,
      solarSetup: typeof body.solarSetup === "string" ? body.solarSetup : null,
      subtotal: typeof body.subtotal === "number" ? body.subtotal : 0,
      total: typeof body.total === "number" ? body.total : 0,
    };

    const productRef = quoteData.variantSku || quoteData.productSku || "quote";
    const subject = `Quotation Request — ${customerName} (${productRef})`;

    const html = buildQuoteEmailHtml(quoteData);

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
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in quote route:", error);
    const message = error instanceof Error ? error.message : "Failed to send quote";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
