interface EmailTemplateParams {
  subject: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  region?: string;
  province?: string;
  city?: string;
  interestLabel: string;
  details?: string;
}

export function buildEmailHtml(params: EmailTemplateParams): string {
  const {
    subject,
    firstName,
    lastName,
    email,
    phone,
    region,
    province,
    city,
    interestLabel,
    details,
  } = params;

  const timestamp = new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "long",
    timeStyle: "short",
  });

  const locationParts = [city, province, region].filter(Boolean);
  const location = locationParts.length > 0 ? locationParts.join(", ") : null;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:#16a34a;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">${escapeHtml(subject)}</h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">${escapeHtml(timestamp)}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Contact Details</td>
                </tr>
                <tr>
                  <td style="padding:16px;background:#f9fafb;border-radius:8px;">
                    <p style="margin:0 0 8px;font-size:15px;"><strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}</strong></p>
                    <p style="margin:0 0 4px;font-size:14px;color:#374151;">Email: <a href="mailto:${escapeHtml(email)}" style="color:#16a34a;">${escapeHtml(email)}</a></p>
                    ${phone ? `<p style="margin:0 0 4px;font-size:14px;color:#374151;">Phone: ${escapeHtml(phone)}</p>` : ""}
                    ${location ? `<p style="margin:0;font-size:14px;color:#374151;">Location: ${escapeHtml(location)}</p>` : ""}
                  </td>
                </tr>
              </table>

              <!-- Interest -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Interest</td>
                </tr>
                <tr>
                  <td style="font-size:15px;color:#111827;">
                    <span style="display:inline-block;background:#dcfce7;color:#166534;padding:4px 12px;border-radius:6px;font-size:13px;font-weight:500;">${escapeHtml(interestLabel)}</span>
                  </td>
                </tr>
              </table>

              ${
                details
                  ? `<!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Message</td>
                </tr>
                <tr>
                  <td style="padding:16px;background:#f9fafb;border-radius:8px;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap;">${escapeHtml(details)}</td>
                </tr>
              </table>`
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">Sent from VoltHub website contact form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── Quote Email Types & Builder ──

export interface QuoteEmailData {
  // Customer
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  // Product
  productName: string;
  productImage: string;
  productSku?: string;
  // Variant
  variantName?: string;
  variantSku?: string;
  variantPrice?: number;
  quantity: number;
  // Accessories
  accessories?: { name: string; sku: string; price?: number; image?: string }[];
  // Services
  includeInstallation: boolean;
  solarSetup?: string | null;
  // Price summary
  subtotal: number;
  total: number;
}

const SOLAR_SETUP_LABELS: Record<string, string> = {
  hybrid: "Hybrid Setup (Grid + Battery)",
  "off-grid": "Off-Grid Setup (Battery only)",
  "on-grid": "On-Grid Setup (Grid-tied only)",
};

export function buildQuoteEmailHtml(data: QuoteEmailData): string {
  const timestamp = new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila", dateStyle: "long", timeStyle: "short",
  });

  const logoUrl = "https://volthub.ph/volthub-logo-black-text.png";

  const formatPrice = (p: number) => `₱${p.toLocaleString("en-PH")}`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
<tr><td align="center">

<!-- ═══ MAIN CONTAINER ═══ -->
<table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

  <!-- ── HEADER: Logo + Company ── -->
  <tr>
    <td style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:28px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:middle;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.02em;">VoltHub</h1>
            <p style="margin:2px 0 0;color:#94a3b8;font-size:12px;">EV Charging &amp; Energy Solutions</p>
          </td>
          <td align="right" style="vertical-align:middle;">
            <div style="display:inline-block;background:#16a34a;color:#fff;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600;">Quotation Request</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── SUB-HEADER: Date + Reference ── -->
  <tr>
    <td style="padding:16px 32px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-size:12px;color:#64748b;">Date: <strong>${escapeHtml(timestamp)}</strong></td>
          <td align="right" style="font-size:12px;color:#64748b;">Ref: <strong>${escapeHtml(data.productSku || data.productName)}</strong></td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── CUSTOMER DETAILS ── -->
  <tr>
    <td style="padding:24px 32px 0;">
      <p style="margin:0 0 12px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Customer Information</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;border-radius:10px;">
        <tr>
          <td style="padding:16px 20px;">
            <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">${escapeHtml(data.customerName)}</p>
            <p style="margin:4px 0 0;font-size:13px;color:#475569;">✉ ${escapeHtml(data.customerEmail)}${data.customerPhone ? ` &nbsp;|&nbsp; 📞 ${escapeHtml(data.customerPhone)}` : ""}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── PRODUCT DETAILS ── -->
  <tr>
    <td style="padding:24px 32px 0;">
      <p style="margin:0 0 12px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Product</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        <tr>
          <td width="120" style="background:#f8fafc;vertical-align:top;">
            ${data.productImage ? `<img src="${escapeHtml(data.productImage)}" alt="${escapeHtml(data.productName)}" style="width:120px;height:auto;display:block;object-fit:contain;padding:8px;" />` : ""}
          </td>
          <td style="padding:16px;vertical-align:top;">
            <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">${escapeHtml(data.variantName || data.productName)}</p>
            ${(data.variantSku || data.productSku) ? `<p style="margin:4px 0 0;font-size:11px;color:#64748b;font-family:monospace;">SKU: ${escapeHtml(data.variantSku || data.productSku || "")}</p>` : ""}
            ${data.variantPrice != null ? `<p style="margin:8px 0 0;font-size:18px;font-weight:700;color:#16a34a;">${formatPrice(data.variantPrice)}</p>` : ""}
            <p style="margin:4px 0 0;font-size:12px;color:#64748b;">Quantity: <strong>× ${data.quantity}</strong></p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  ${data.accessories && data.accessories.length > 0 ? `
  <!-- ── ACCESSORIES ── -->
  <tr>
    <td style="padding:24px 32px 0;">
      <p style="margin:0 0 12px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Accessories</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        ${data.accessories.map((acc, i) => `
        <tr>
          <td width="60" style="padding:12px 0 12px 16px;background:${i % 2 === 0 ? '#ffffff' : '#f8fafc'};border-bottom:1px solid #e2e8f0;">
            ${acc.image ? `<img src="${escapeHtml(acc.image)}" alt="${escapeHtml(acc.name)}" style="width:48px;height:48px;object-fit:contain;border-radius:6px;border:1px solid #e2e8f0;" />` : ""}
          </td>
          <td style="padding:12px 16px;background:${i % 2 === 0 ? '#ffffff' : '#f8fafc'};border-bottom:1px solid #e2e8f0;vertical-align:middle;">
            <span style="font-size:13px;font-weight:600;color:#0f172a;">${escapeHtml(acc.name)}</span>
            <span style="font-size:11px;color:#94a3b8;font-family:monospace;display:block;">${escapeHtml(acc.sku)}</span>
          </td>
          <td align="right" style="padding:12px 20px 12px 0;background:${i % 2 === 0 ? '#ffffff' : '#f8fafc'};border-bottom:1px solid #e2e8f0;vertical-align:middle;">
            <span style="font-size:14px;font-weight:700;color:#16a34a;">${acc.price != null ? formatPrice(acc.price) : "—"}</span>
          </td>
        </tr>`).join("")}
      </table>
    </td>
  </tr>` : ""}

  ${data.includeInstallation || data.solarSetup ? `
  <!-- ── SERVICES ── -->
  <tr>
    <td style="padding:24px 32px 0;">
      <p style="margin:0 0 12px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Services</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        ${data.includeInstallation ? `
        <tr>
          <td style="padding:12px 20px;background:#f0fdf4;">
            <span style="font-size:13px;font-weight:600;color:#166534;">✓ Installation &amp; Commissioning Service</span>
            <span style="font-size:12px;color:#64748b;display:block;">Professional on-site installation by certified technicians</span>
          </td>
          <td align="right" style="padding:12px 20px;background:#f0fdf4;"><span style="font-size:14px;font-weight:700;color:#16a34a;">₱15,000</span></td>
        </tr>` : ""}
        ${data.solarSetup ? `
        <tr>
          <td style="padding:12px 20px;background:#eff6ff;border-top:1px solid #e2e8f0;" colspan="2">
            <span style="font-size:13px;font-weight:600;color:#1e40af;">☀ Solar Consultation: ${escapeHtml(SOLAR_SETUP_LABELS[data.solarSetup] || data.solarSetup)}</span>
            <span style="font-size:12px;color:#64748b;display:block;">Requires product purchase — assessment &amp; equipment quote to follow</span>
          </td>
        </tr>` : ""}
      </table>
    </td>
  </tr>` : ""}

  <!-- ── QUOTE SUMMARY ── -->
  <tr>
    <td style="padding:24px 32px;">
      <p style="margin:0 0 12px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Quote Summary</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        <tr>
          <td style="padding:12px 20px;font-size:14px;color:#475569;border-bottom:1px solid #e2e8f0;">Unit Price</td>
          <td align="right" style="padding:12px 20px;font-size:14px;color:#0f172a;font-weight:600;border-bottom:1px solid #e2e8f0;">${data.variantPrice != null ? formatPrice(data.variantPrice) : "—"}</td>
        </tr>
        <tr>
          <td style="padding:12px 20px;font-size:14px;color:#475569;border-bottom:2px solid #e2e8f0;">Quantity</td>
          <td align="right" style="padding:12px 20px;font-size:14px;color:#0f172a;font-weight:600;border-bottom:2px solid #e2e8f0;">× ${data.quantity}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:12px 20px;font-size:14px;font-weight:700;color:#0f172a;">Subtotal</td>
          <td align="right" style="padding:12px 20px;font-size:16px;font-weight:700;color:#0f172a;">${formatPrice(data.subtotal)}</td>
        </tr>
        <tr style="background:#f0fdf4;">
          <td style="padding:14px 20px;font-size:16px;font-weight:700;color:#166534;">Estimated Total</td>
          <td align="right" style="padding:14px 20px;font-size:22px;font-weight:800;color:#16a34a;">${formatPrice(data.total)}</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── FOOTER ── -->
  <tr>
    <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
      <p style="margin:0;font-size:11px;color:#94a3b8;">This quotation was generated from volthub.ph</p>
      <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Reply to: <a href="mailto:${escapeHtml(data.customerEmail)}" style="color:#16a34a;">${escapeHtml(data.customerEmail)}</a></p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`.trim();
}
