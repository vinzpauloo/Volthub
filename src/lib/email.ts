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
  customerCompany?: string;
  customerAddress?: string;
  customerNotes?: string;
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
  // Backend reference
  referenceNo?: string | null;
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
          <td align="right" style="font-size:12px;color:#64748b;">${data.referenceNo ? `RFQ: <strong style="color:#16a34a;">${escapeHtml(data.referenceNo)}</strong>` : `Ref: <strong>${escapeHtml(data.productSku || data.productName)}</strong>`}</td>
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
            ${data.customerCompany ? `<p style="margin:4px 0 0;font-size:13px;color:#475569;">🏢 ${escapeHtml(data.customerCompany)}</p>` : ""}
            <p style="margin:4px 0 0;font-size:13px;color:#475569;">✉ ${escapeHtml(data.customerEmail)}${data.customerPhone ? ` &nbsp;|&nbsp; 📞 ${escapeHtml(data.customerPhone)}` : ""}</p>
            ${data.customerAddress ? `<p style="margin:4px 0 0;font-size:13px;color:#475569;">📍 ${escapeHtml(data.customerAddress)}</p>` : ""}
            ${data.customerNotes ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;font-style:italic;">"${escapeHtml(data.customerNotes)}"</p>` : ""}
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
          <td style="padding:12px 16px;background:${i % 2 === 0 ? '#ffffff' : '#f8fafc'};border-bottom:1px solid #e2e8f0;vertical-align:middle;" colspan="2">
            <span style="font-size:13px;font-weight:600;color:#0f172a;">${escapeHtml(acc.name)}</span>
            <span style="font-size:11px;color:#94a3b8;font-family:monospace;display:block;">${escapeHtml(acc.sku)}</span>
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
          <td style="padding:12px 20px;background:#f0fdf4;" colspan="2">
            <span style="font-size:13px;font-weight:600;color:#166534;">✓ Installation &amp; Commissioning Service</span>
            <span style="font-size:12px;color:#64748b;display:block;">Professional on-site installation by certified technicians</span>
          </td>
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
          <td style="padding:12px 20px;font-size:14px;color:#475569;border-bottom:1px solid #e2e8f0;">Product</td>
          <td align="right" style="padding:12px 20px;font-size:14px;color:#0f172a;font-weight:600;border-bottom:1px solid #e2e8f0;">${escapeHtml(data.variantName || data.productName)}</td>
        </tr>
        <tr>
          <td style="padding:12px 20px;font-size:14px;color:#475569;">Quantity</td>
          <td align="right" style="padding:12px 20px;font-size:14px;color:#0f172a;font-weight:600;">× ${data.quantity}</td>
        </tr>
        ${data.accessories && data.accessories.length > 0 ? `
        <tr>
          <td style="padding:12px 20px;font-size:14px;color:#475569;border-top:1px solid #e2e8f0;">Accessories</td>
          <td align="right" style="padding:12px 20px;font-size:14px;color:#0f172a;font-weight:600;border-top:1px solid #e2e8f0;">${data.accessories.length} item${data.accessories.length > 1 ? 's' : ''}</td>
        </tr>` : ""}
        ${data.includeInstallation ? `
        <tr>
          <td style="padding:12px 20px;font-size:14px;color:#475569;border-top:1px solid #e2e8f0;">Installation</td>
          <td align="right" style="padding:12px 20px;font-size:14px;color:#166534;font-weight:600;border-top:1px solid #e2e8f0;">Included</td>
        </tr>` : ""}
        ${data.solarSetup ? `
        <tr>
          <td style="padding:12px 20px;font-size:14px;color:#475569;border-top:1px solid #e2e8f0;">Solar Consultation</td>
          <td align="right" style="padding:12px 20px;font-size:14px;color:#1e40af;font-weight:600;border-top:1px solid #e2e8f0;">${escapeHtml(SOLAR_SETUP_LABELS[data.solarSetup] || data.solarSetup)}</td>
        </tr>` : ""}
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

// ── Solar Quote Types & Builder ──

export interface SolarQuoteBomItem {
  name: string;
  specs: string;
  quantity: number | string;
  unit: string;
  cost: number;
  essential: boolean;
  note: string;
}

export interface SolarQuoteAppliance {
  name: string;
  type: string;
  quantity: number;
  hours: number;
  watts: number;
  dailyKwh: number;
  timePeriod: string;
}

export interface SolarQuoteEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  systemType: string;
  systemTypeLabel: string;
  province: string;
  lifestyle: string;
  monthlyBill: number;
  monthlyKwh: number;
  systemSizeKw: string;
  installedBatteryKwh: number;
  dailyProduction: string;
  rooftopNeeded: number;
  bomItems: SolarQuoteBomItem[];
  bomTotalCost: number;
  monthlySavings: string;
  paybackYears: string;
  appliances: SolarQuoteAppliance[];
  whatThisPowers: string[];
  backupRuntime: string | null;
  referenceNo?: string;
}

const SYSTEM_TYPE_LABELS: Record<string, string> = {
  hybrid: "Hybrid Setup (Grid + Battery Backup)",
  "off-grid": "Off-Grid Setup (Full Independence)",
  "grid-tied": "Grid-Tied Setup (Net Metering)",
};

const LIFESTYLE_LABELS: Record<string, string> = {
  "work-from-home": "Work from Home",
  "work-from-office": "Work from Office",
  balanced: "Balanced",
};

export function buildSolarQuoteEmailHtml(data: SolarQuoteEmailData): string {
  const timestamp = new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "long",
    timeStyle: "short",
  });

  const typeLabel =
    SYSTEM_TYPE_LABELS[data.systemType] || data.systemTypeLabel;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
<tr><td align="center">

<!-- ═══ MAIN CONTAINER ═══ -->
<table width="680" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

  <!-- ── HEADER: Solar Orange ── -->
  <tr>
    <td style="background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%);padding:28px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:middle;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.02em;">VoltHub</h1>
            <p style="margin:2px 0 0;color:rgba(255,255,255,0.8);font-size:12px;">EV Charging &amp; Energy Solutions</p>
          </td>
          <td align="right" style="vertical-align:middle;">
            <div style="display:inline-block;background:#ffffff;color:#ea580c;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:700;">☀ Solar Quotation</div>
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
          <td align="right" style="font-size:12px;color:#64748b;">${data.referenceNo ? `RFQ: <strong style="color:#ea580c;">${escapeHtml(data.referenceNo)}</strong>` : ""}</td>
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
            <p style="margin:4px 0 0;font-size:13px;color:#475569;">📍 ${escapeHtml(data.province)}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── SYSTEM OVERVIEW ── -->
  <tr>
    <td style="padding:24px 32px 0;">
      <p style="margin:0 0 12px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">System Overview</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        <tr>
          <td style="padding:12px 20px;background:#fff7ed;border-bottom:1px solid #e2e8f0;" colspan="2">
            <span style="font-size:14px;font-weight:700;color:#ea580c;">☀ ${escapeHtml(typeLabel)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 20px;font-size:13px;color:#64748b;width:200px;">System Size</td>
          <td style="padding:8px 20px;font-size:13px;font-weight:600;color:#0f172a;">${escapeHtml(data.systemSizeKw)} kW</td>
        </tr>
        ${data.installedBatteryKwh > 0 ? `
        <tr>
          <td style="padding:8px 20px;font-size:13px;color:#64748b;">Battery Bank</td>
          <td style="padding:8px 20px;font-size:13px;font-weight:600;color:#0f172a;">${data.installedBatteryKwh} kWh</td>
        </tr>` : ""}
        <tr>
          <td style="padding:8px 20px;font-size:13px;color:#64748b;">Daily Production</td>
          <td style="padding:8px 20px;font-size:13px;font-weight:600;color:#0f172a;">${escapeHtml(data.dailyProduction)} kWh</td>
        </tr>
        <tr>
          <td style="padding:8px 20px;font-size:13px;color:#64748b;">Rooftop Needed</td>
          <td style="padding:8px 20px;font-size:13px;font-weight:600;color:#0f172a;">${data.rooftopNeeded} m²</td>
        </tr>
        <tr>
          <td style="padding:8px 20px;font-size:13px;color:#64748b;">Lifestyle</td>
          <td style="padding:8px 20px;font-size:13px;font-weight:600;color:#0f172a;">${escapeHtml(LIFESTYLE_LABELS[data.lifestyle] || data.lifestyle)}</td>
        </tr>
        <tr>
          <td style="padding:8px 20px;font-size:13px;color:#64748b;">Monthly Bill</td>
          <td style="padding:8px 20px;font-size:13px;font-weight:600;color:#0f172a;">₱${data.monthlyBill.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding:8px 20px;font-size:13px;color:#64748b;">Est. Monthly Consumption</td>
          <td style="padding:8px 20px;font-size:13px;font-weight:600;color:#0f172a;">${data.monthlyKwh.toFixed(1)} kWh</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── BILL OF MATERIALS ── -->
  <tr>
    <td style="padding:24px 32px 0;">
      <p style="margin:0 0 12px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Bill of Materials (${data.bomItems.length} components)</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        ${data.bomItems
          .map(
            (item, i) => `
        <tr>
          <td style="padding:10px 16px;font-size:13px;font-weight:600;color:#0f172a;background:${i % 2 === 0 ? "#ffffff" : "#f8fafc"};border-bottom:1px solid #e2e8f0;vertical-align:top;">
            ${escapeHtml(item.name)}${!item.essential ? ' <span style="font-size:10px;color:#94a3b8;font-weight:400;">(OPTIONAL)</span>' : ""}
            <div style="font-size:11px;color:#64748b;font-weight:400;">${escapeHtml(item.specs)}</div>
            <div style="font-size:10px;color:#94a3b8;font-weight:400;">${escapeHtml(item.note)}</div>
          </td>
          <td align="center" style="padding:10px 12px;font-size:12px;color:#64748b;background:${i % 2 === 0 ? "#ffffff" : "#f8fafc"};border-bottom:1px solid #e2e8f0;vertical-align:top;white-space:nowrap;">
            ${typeof item.quantity === "number" ? `× ${item.quantity}` : item.quantity}
          </td>
          <td align="right" style="padding:10px 16px;font-size:13px;font-weight:600;color:#0f172a;background:${i % 2 === 0 ? "#ffffff" : "#f8fafc"};border-bottom:1px solid #e2e8f0;vertical-align:top;white-space:nowrap;">
            ${item.cost > 0 ? `₱${item.cost.toLocaleString()}` : "Included"}
          </td>
        </tr>`
          )
          .join("")}
        <tr>
          <td style="padding:12px 20px;font-size:14px;font-weight:700;color:#0f172a;background:#f0fdf4;border-top:2px solid #e2e8f0;" colspan="2">Estimated Total System Cost</td>
          <td align="right" style="padding:12px 20px;font-size:16px;font-weight:700;color:#16a34a;background:#f0fdf4;border-top:2px solid #e2e8f0;">₱${data.bomTotalCost.toLocaleString()}</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── COST & SAVINGS ── -->
  <tr>
    <td style="padding:24px 32px 0;">
      <p style="margin:0 0 12px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Cost &amp; Savings Projection</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        <tr>
          <td style="padding:10px 20px;font-size:13px;color:#64748b;">Estimated System Cost</td>
          <td align="right" style="padding:10px 20px;font-size:13px;font-weight:600;color:#0f172a;">₱${data.bomTotalCost.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding:10px 20px;font-size:13px;color:#64748b;">Monthly Savings</td>
          <td align="right" style="padding:10px 20px;font-size:13px;font-weight:600;color:#16a34a;">₱${escapeHtml(data.monthlySavings)}</td>
        </tr>
        <tr>
          <td style="padding:10px 20px;font-size:13px;color:#64748b;">Payback Period</td>
          <td align="right" style="padding:10px 20px;font-size:13px;font-weight:600;color:#0f172a;">${escapeHtml(data.paybackYears)} ${data.paybackYears === "—" ? "" : "years"}</td>
        </tr>
      </table>
    </td>
  </tr>

  ${data.appliances.length > 0 ? `
  <!-- ── CUSTOMER APPLIANCES ── -->
  <tr>
    <td style="padding:24px 32px 0;">
      <p style="margin:0 0 12px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Customer's Appliance Load Profile</p>
      ${(() => {
        const periodLabels: Record<string, string> = {
          morning: "🌅 Morning (6AM–12PM)",
          afternoon: "☀️ Afternoon (12PM–6PM)",
          evening: "🌙 Evening (6PM–12AM)",
        };
        const order: Record<string, number> = { morning: 0, afternoon: 1, evening: 2 };
        const sorted = [...data.appliances].sort((a, b) => (order[a.timePeriod] ?? 3) - (order[b.timePeriod] ?? 3));
        const groups: Record<string, typeof sorted> = { morning: [], afternoon: [], evening: [] };
        for (const a of sorted) groups[a.timePeriod]?.push(a);
        return Object.entries(groups)
          .filter(([, items]) => items.length > 0)
          .map(([period, items]) => `
        <p style="margin:12px 0 6px;font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;">${periodLabels[period] || period}</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:8px;">
          <tr style="background:#f8fafc;">
            <td style="padding:8px 16px;font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;">Appliance</td>
            <td style="padding:8px 12px;font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;">Type</td>
            <td align="center" style="padding:8px 12px;font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;">Qty</td>
            <td align="center" style="padding:8px 12px;font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;">Hrs/Day</td>
            <td align="center" style="padding:8px 12px;font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;">Watts</td>
            <td align="right" style="padding:8px 16px;font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;">kWh/Day</td>
          </tr>
          ${items.map((a, i) => `
          <tr>
            <td style="padding:8px 16px;font-size:12px;color:#0f172a;background:${i % 2 === 0 ? "#ffffff" : "#f8fafc"};border-top:1px solid #e2e8f0;">${escapeHtml(a.name)}</td>
            <td style="padding:8px 12px;font-size:11px;color:#64748b;background:${i % 2 === 0 ? "#ffffff" : "#f8fafc"};border-top:1px solid #e2e8f0;">${a.type === "inverter" ? "Inverter" : "Standard"}</td>
            <td align="center" style="padding:8px 12px;font-size:12px;color:#0f172a;background:${i % 2 === 0 ? "#ffffff" : "#f8fafc"};border-top:1px solid #e2e8f0;">× ${a.quantity}</td>
            <td align="center" style="padding:8px 12px;font-size:12px;color:#0f172a;background:${i % 2 === 0 ? "#ffffff" : "#f8fafc"};border-top:1px solid #e2e8f0;">${a.hours}h</td>
            <td align="center" style="padding:8px 12px;font-size:12px;color:#0f172a;background:${i % 2 === 0 ? "#ffffff" : "#f8fafc"};border-top:1px solid #e2e8f0;">${a.watts}W</td>
            <td align="right" style="padding:8px 16px;font-size:12px;font-weight:600;color:#0f172a;background:${i % 2 === 0 ? "#ffffff" : "#f8fafc"};border-top:1px solid #e2e8f0;">${a.dailyKwh.toFixed(2)}</td>
          </tr>`).join("")}
          <tr style="background:#f8fafc;">
            <td colspan="5" style="padding:6px 16px;font-size:10px;color:#64748b;text-align:right;font-weight:600;">Subtotal — ${periodLabels[period] || period}:</td>
            <td align="right" style="padding:6px 16px;font-size:11px;font-weight:700;color:#0f172a;">${items.reduce((s, a) => s + a.dailyKwh, 0).toFixed(2)} kWh</td>
          </tr>
        </table>
        `).join("");
      })()}
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
        <tr>
          <td style="padding:10px 16px;background:#f1f5f9;border-radius:8px;font-size:12px;color:#0f172a;text-align:right;font-weight:700;">
            Total Daily: ${data.appliances.reduce((s, a) => s + a.dailyKwh, 0).toFixed(2)} kWh &nbsp;|&nbsp; Monthly: ${data.monthlyKwh.toFixed(1)} kWh &nbsp;|&nbsp; Monthly Bill: ₱${data.monthlyBill.toLocaleString()}
          </td>
        </tr>
      </table>
    </td>
  </tr>` : ""}

  ${data.whatThisPowers.length > 0 ? `
  <!-- ── WHAT THIS POWERS ── -->
  <tr>
    <td style="padding:24px 32px 0;">
      <p style="margin:0 0 12px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">What This System Can Power Daily</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        ${data.whatThisPowers
          .map(
            (label, i) => `
        <tr>
          <td style="padding:8px 16px;font-size:13px;color:#0f172a;background:${i % 2 === 0 ? "#ffffff" : "#f8fafc"};border-bottom:1px solid #e2e8f0;">⚡ ${escapeHtml(label)}</td>
        </tr>`
          )
          .join("")}
        ${data.backupRuntime ? `
        <tr>
          <td style="padding:10px 16px;font-size:13px;color:#166534;background:#f0fdf4;font-weight:600;">🔋 ${escapeHtml(data.backupRuntime)}</td>
        </tr>` : ""}
      </table>
    </td>
  </tr>` : ""}

  <!-- ── FOOTER ── -->
  <tr>
    <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
      <p style="margin:0;font-size:11px;color:#94a3b8;">This solar quotation was generated from volthub.ph</p>
      <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Reply to: <a href="mailto:${escapeHtml(data.customerEmail)}" style="color:#ea580c;">${escapeHtml(data.customerEmail)}</a> &nbsp;|&nbsp; sales@volthub.ph</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`.trim();
}
