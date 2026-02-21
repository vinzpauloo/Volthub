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
