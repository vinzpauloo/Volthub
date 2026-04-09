import type { Metadata } from "next";
import LegalPageLayout, {
  type LegalSection,
} from "@/components/common/LegalPageLayout";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://volthub.ph";
const LAST_UPDATED = "April 8, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy - VoltHub",
  description:
    "How VoltHub collects, uses, and protects personal information. Compliant with the Philippines Data Privacy Act (RA 10173) and GDPR principles.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/privacy` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/privacy`,
    siteName: "VoltHub Energy",
    title: "Privacy Policy - VoltHub",
    description:
      "How VoltHub collects, uses, and protects personal information.",
  },
};

export default function PrivacyPage() {
  const sections: LegalSection[] = [
    {
      id: "introduction",
      title: "1. Introduction",
      body: (
        <>
          <p>
            VoltHub.PH (&ldquo;VoltHub,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting
            the privacy of visitors, customers, and business inquirers who use
            our website at volthub.ph and our related services (collectively,
            the &ldquo;Services&rdquo;). This Privacy Policy explains what
            personal information we collect, how we use it, who we share it
            with, and the rights you have regarding your information.
          </p>
          <p>
            We comply with the{" "}
            <strong>
              Philippines Data Privacy Act of 2012 (Republic Act No. 10173)
            </strong>{" "}
            and its Implementing Rules and Regulations, as well as the{" "}
            <strong>EU General Data Protection Regulation (GDPR)</strong> where
            applicable to visitors in the European Economic Area and the United
            Kingdom.
          </p>
          <p>
            By using our website or submitting information through our contact
            forms, you acknowledge that you have read and understood this
            Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: "data-controller",
      title: "2. Who We Are (Data Controller)",
      body: (
        <>
          <p>
            <strong>VOLTHUB ELECTRONIC POWER GENERATION SERVICES CORP.</strong>
            <br />
            (doing business as &ldquo;VoltHub.PH&rdquo;)
            <br />
            Registered Office: Unit 2503, High Street South Corporate Plaza
            Tower 2, 11th Street corner 26th Avenue, Fort Bonifacio, Bonifacio
            Global City, Taguig City 1635, Metro Manila, Philippines
            <br />
            SEC Registration No.: 2025010184535-18 (registered January 17,
            2025)
            <br />
            BIR TIN: 667-401-960-000 (RDO 044 – Taguig-Pateros East)
            <br />
            Website: <a href="https://volthub.ph">https://volthub.ph</a>
            <br />
            General Inquiries:{" "}
            <a href="mailto:admin@volthub.ph">admin@volthub.ph</a>
            <br />
            Sales Inquiries:{" "}
            <a href="mailto:judy@volthub.ph">judy@volthub.ph</a>
            <br />
            Phone: <a href="tel:+639682323704">+63 968 232 3704</a>
          </p>
          <p>
            <strong>Data Protection Officer (RA 10173)</strong>
            <br />
            In accordance with the Philippine Data Privacy Act of 2012 (RA
            10173) and its Implementing Rules and Regulations, VoltHub has
            designated a Data Protection Officer to oversee compliance with
            this Privacy Policy and respond to data-subject requests.
            <br />
            DPO Contact:{" "}
            <a href="mailto:admin@volthub.ph?subject=Data%20Privacy%20Request">
              admin@volthub.ph
            </a>{" "}
            (please use the subject line &ldquo;Data Privacy Request&rdquo; so
            your message is routed to the DPO)
          </p>
          <p>
            For all privacy-related inquiries, please contact us using the
            details in <a href="#contact">Section 13 (How to Contact Us)</a>{" "}
            below.
          </p>
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: "3. Information We Collect",
      body: (
        <>
          <h3 className="text-lg font-semibold text-slate-900 mt-2">
            3.1 Information You Provide to Us
          </h3>
          <p>
            When you interact with our Services, we may collect the following
            personal information that you voluntarily provide:
          </p>
          <ul>
            <li>
              <strong>Contact details</strong>: full name, email address, phone
              number
            </li>
            <li>
              <strong>Company information</strong>: company name, job title,
              industry or sector
            </li>
            <li>
              <strong>Inquiry content</strong>: the contents of messages you
              send through our contact forms, product inquiry forms, and any
              follow-up correspondence
            </li>
            <li>
              <strong>Marketing preferences</strong>: subscription status for
              newsletters or updates, if applicable
            </li>
          </ul>
          <p>We collect this information when you:</p>
          <ul>
            <li>Submit a contact form or product inquiry</li>
            <li>Request a quotation or consultation</li>
            <li>
              Email us directly at{" "}
              <a href="mailto:admin@volthub.ph">admin@volthub.ph</a> or{" "}
              <a href="mailto:judy@volthub.ph">judy@volthub.ph</a>
            </li>
            <li>Call us on +63 968 232 3704</li>
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            3.2 Information Collected Automatically
          </h3>
          <p>
            When you visit volthub.ph, we and our third-party service providers
            automatically collect certain technical information, including:
          </p>
          <ul>
            <li>
              <strong>Device and browser data</strong>: IP address, browser
              type and version, operating system, device type, screen
              resolution, language preference
            </li>
            <li>
              <strong>Usage data</strong>: pages visited, time spent on pages,
              referring website, exit pages, links clicked, search terms used
              on our site
            </li>
            <li>
              <strong>Location data</strong>: approximate geographic location
              derived from your IP address (country and city level only)
            </li>
            <li>
              <strong>Cookies and similar technologies</strong>: small data
              files stored on your device to enable site functionality and
              analytics (see{" "}
              <a href="#cookies-tracking">
                Section 7 (Cookies and Tracking Technologies)
              </a>
              below)
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            3.3 Information From Third Parties
          </h3>
          <p>
            We may receive limited information about you from the following
            sources:
          </p>
          <ul>
            <li>
              <strong>Advertising platforms</strong> (Google Ads, Microsoft
              Advertising): aggregated data about how you arrived at our site
              and your interaction with our ads
            </li>
            <li>
              <strong>Analytics providers</strong> (Google Analytics via GTM):
              aggregated and pseudonymized usage reports
            </li>
            <li>
              <strong>Business directories and referrals</strong>: if you were
              referred to us by an existing customer or partner
            </li>
          </ul>
          <p>
            We do <strong>not</strong> purchase personal data from third-party
            data brokers.
          </p>
        </>
      ),
    },
    {
      id: "how-we-use",
      title: "4. How We Use Your Information",
      body: (
        <>
          <p>
            We process your personal information for the following purposes,
            under the legal bases stated:
          </p>
          <ul>
            <li>
              <strong>
                Responding to your inquiries and providing quotations
              </strong>{" "}
              &mdash; legitimate interest or performance of a contract (GDPR);
              consent or legitimate interest of VoltHub (RA 10173).
            </li>
            <li>
              <strong>
                Providing customer support and after-sales service
              </strong>{" "}
              &mdash; performance of a contract (GDPR); consent or legitimate
              interest (RA 10173).
            </li>
            <li>
              <strong>
                Sending service updates, order confirmations, and transactional
                emails
              </strong>{" "}
              &mdash; performance of a contract (GDPR); consent (RA 10173).
            </li>
            <li>
              <strong>Sending marketing emails and newsletters</strong> &mdash;
              consent (opt-in) under both GDPR and RA 10173.
            </li>
            <li>
              <strong>
                Analyzing website usage and improving our Services
              </strong>{" "}
              &mdash; legitimate interest.
            </li>
            <li>
              <strong>
                Measuring the effectiveness of our advertising campaigns
              </strong>{" "}
              &mdash; legitimate interest or consent.
            </li>
            <li>
              <strong>
                Complying with legal obligations and resolving disputes
              </strong>{" "}
              &mdash; legal obligation.
            </li>
            <li>
              <strong>Preventing fraud and ensuring site security</strong>{" "}
              &mdash; legitimate interest.
            </li>
          </ul>
          <p>
            We will <strong>not</strong> use your personal information for
            automated decision-making or profiling that produces legal or
            similarly significant effects on you.
          </p>
        </>
      ),
    },
    {
      id: "sharing",
      title: "5. How We Share Your Information",
      body: (
        <>
          <p>
            We do <strong>not</strong> sell, rent, or trade your personal
            information. We share information only in the following limited
            circumstances:
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-2">
            5.1 Service Providers
          </h3>
          <p>
            We share information with third-party service providers that help
            us operate our business, under contractual obligations of
            confidentiality and data protection. These include:
          </p>
          <ul>
            <li>
              <strong>Google LLC</strong> (Google Analytics, Google Ads, Google
              Tag Manager) &mdash; website analytics and advertising measurement
            </li>
            <li>
              <strong>Microsoft Corporation</strong> (Microsoft Advertising /
              Bing UET) &mdash; advertising measurement and conversion tracking
            </li>
            <li>
              <strong>Vercel Inc.</strong> &mdash; website hosting and content
              delivery
            </li>
            <li>
              <strong>Resend</strong> &mdash; transactional email delivery for
              contact form submissions. Contact form messages are transmitted
              via Resend and delivered to VoltHub staff email inboxes. We do
              not store contact form submissions in a database; data is
              retained in our email systems per standard email retention.
            </li>
            <li>
              <strong>Large language model (LLM) inference providers</strong>{" "}
              &mdash; our website chat assistant processes your messages using
              an LLM. Depending on deployment configuration, messages may be
              sent to a third-party AI inference provider for processing. We
              do not store chat conversations on our servers; conversation
              history is maintained only within your browser session.
            </li>
          </ul>
          <p>
            Each of these providers processes data on our behalf in accordance
            with their own privacy policies. Where data is transferred outside
            the Philippines, we rely on appropriate safeguards such as
            Standard Contractual Clauses or equivalent mechanisms.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            5.2 Legal and Regulatory Disclosure
          </h3>
          <p>
            We may disclose your information if required to do so by law,
            court order, subpoena, or other legal process, or if we believe in
            good faith that disclosure is necessary to:
          </p>
          <ul>
            <li>Comply with a legal obligation or regulatory request</li>
            <li>
              Protect the rights, property, or safety of VoltHub, our
              customers, or others
            </li>
            <li>
              Investigate and prevent fraud, security issues, or violations of
              our Terms of Service
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            5.3 Business Transfers
          </h3>
          <p>
            If VoltHub is involved in a merger, acquisition, reorganization,
            or sale of assets, your personal information may be transferred as
            part of that transaction. We will notify you and any applicable
            regulatory bodies before such a transfer takes place and ensure
            that the receiving party agrees to protect your information in a
            manner consistent with this Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: "international-transfers",
      title: "6. International Data Transfers",
      body: (
        <>
          <p>
            Some of our service providers are located outside the Philippines.
            When your personal information is transferred to countries that do
            not have an &ldquo;adequate level of protection&rdquo; as
            determined by the National Privacy Commission (NPC) or the
            European Commission, we implement appropriate safeguards,
            including:
          </p>
          <ul>
            <li>
              Standard Contractual Clauses approved by the European Commission
            </li>
            <li>
              Contractual commitments to comply with RA 10173 and the GDPR
            </li>
            <li>
              Data processing agreements with all third-party processors
            </li>
          </ul>
          <p>
            You may request a copy of the safeguards in place by contacting us
            (see <a href="#contact">Section 13</a>).
          </p>
        </>
      ),
    },
    {
      id: "cookies-tracking",
      title: "7. Cookies and Tracking Technologies",
      body: (
        <>
          <p>
            Our website uses cookies and similar tracking technologies to
            enhance your experience, analyze site usage, and measure
            advertising performance.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-2">
            7.1 Types of Cookies We Use
          </h3>
          <ul>
            <li>
              <strong>Strictly necessary cookies</strong>{" "}
              <em>(no consent required)</em>: required for the website to
              function (e.g., security, load balancing). These cannot be
              disabled.
            </li>
            <li>
              <strong>Functionality cookies</strong>{" "}
              <em>(no consent required)</em>: remember your preferences such
              as language, theme (dark/light mode), and accessibility
              settings.
            </li>
            <li>
              <strong>Analytics cookies</strong> <em>(consent required)</em>:
              help us understand how visitors use the site. We use{" "}
              <strong>Google Analytics</strong> through{" "}
              <strong>Google Tag Manager</strong> (container ID: GTM-MHLCDHH4).
            </li>
            <li>
              <strong>Advertising cookies</strong>{" "}
              <em>(consent required)</em>: help us measure the effectiveness
              of our advertising campaigns. We use:
              <ul>
                <li>
                  <strong>Google Ads</strong> conversion tracking (via Google
                  Tag Manager), operating with Google Consent Mode v2
                </li>
                <li>
                  <strong>Microsoft Advertising (Bing UET)</strong>, tag ID{" "}
                  <strong>187244204</strong>, operating with{" "}
                  <strong>Microsoft UET Consent Mode</strong>. For visitors in
                  the European Economic Area, United Kingdom, and Switzerland,
                  Bing UET will not set advertising cookies or track
                  conversions until you provide explicit consent. For visitors
                  in the Philippines and other jurisdictions, Bing UET operates
                  in accordance with local law and our cookie consent
                  preferences.
                </li>
              </ul>
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            7.2 Managing Cookies
          </h3>
          <p>
            You can control or delete cookies through your browser settings.
            Most browsers allow you to refuse all cookies or to accept only
            certain types. Please note that disabling cookies may affect the
            functionality of our website.
          </p>
          <p>
            You can also opt out of interest-based advertising through
            industry tools:
          </p>
          <ul>
            <li>
              <a
                href="https://www.youronlinechoices.eu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Your Online Choices (EU)
              </a>
            </li>
            <li>
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
            </li>
            <li>
              <a
                href="https://choice.microsoft.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Advertising Opt-Out
              </a>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "data-retention",
      title: "8. Data Retention",
      body: (
        <>
          <p>
            We retain your personal information only for as long as necessary
            to fulfill the purposes for which it was collected, including to
            comply with legal, accounting, tax, or reporting obligations.
          </p>
          <ul>
            <li>
              <strong>Contact form inquiries (unconverted)</strong>: 2 years
              from last contact
            </li>
            <li>
              <strong>
                Customer records (converted inquiries / completed sales)
              </strong>
              : 10 years from last transaction, per BIR and commercial
              record-keeping requirements
            </li>
            <li>
              <strong>Marketing subscription data</strong>: until you
              unsubscribe, plus 30 days for processing
            </li>
            <li>
              <strong>Website analytics data (aggregated)</strong>: 26 months
              (Google Analytics default)
            </li>
            <li>
              <strong>Server logs and security data</strong>: 12 months
            </li>
          </ul>
          <p>
            After the applicable retention period expires, we securely delete,
            anonymize, or destroy the information.
          </p>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "9. Your Rights",
      body: (
        <>
          <h3 className="text-lg font-semibold text-slate-900 mt-2">
            9.1 Rights Under the Philippines Data Privacy Act (RA 10173)
          </h3>
          <p>
            As a data subject under Philippine law, you have the following
            rights:
          </p>
          <ul>
            <li>
              <strong>Right to be informed</strong> about how your personal
              information is collected and processed
            </li>
            <li>
              <strong>Right to access</strong> your personal information held
              by VoltHub
            </li>
            <li>
              <strong>Right to object</strong> to the processing of your
              personal information
            </li>
            <li>
              <strong>Right to rectification</strong> of inaccurate or
              outdated information
            </li>
            <li>
              <strong>Right to erasure or blocking</strong> of your personal
              information under certain circumstances
            </li>
            <li>
              <strong>Right to data portability</strong> &mdash; to receive
              your information in a structured, commonly-used, and
              machine-readable format
            </li>
            <li>
              <strong>Right to file a complaint</strong> with the National
              Privacy Commission
            </li>
            <li>
              <strong>Right to damages</strong> for violations of the Data
              Privacy Act
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            9.2 Additional Rights Under the GDPR
          </h3>
          <p>
            If you are located in the European Economic Area or the United
            Kingdom, you additionally have:
          </p>
          <ul>
            <li>
              <strong>Right to restrict processing</strong> under certain
              conditions
            </li>
            <li>
              <strong>Right to withdraw consent</strong> at any time where
              processing is based on consent
            </li>
            <li>
              <strong>Right to lodge a complaint</strong> with your local
              supervisory authority
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            9.3 How to Exercise Your Rights
          </h3>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:admin@volthub.ph">admin@volthub.ph</a> with the
            subject line{" "}
            <strong>&ldquo;Data Privacy Request&rdquo;</strong>. We will
            respond within <strong>thirty (30) calendar days</strong> of
            receiving a verifiable request, or notify you if we require
            additional time or information. There is no fee for most requests.
          </p>
        </>
      ),
    },
    {
      id: "data-security",
      title: "10. Data Security",
      body: (
        <>
          <p>
            We implement appropriate organizational, physical, and technical
            safeguards to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. These
            measures include:
          </p>
          <ul>
            <li>Encryption of data in transit using TLS/HTTPS</li>
            <li>
              Access controls and authentication for staff who handle personal
              information
            </li>
            <li>Regular software and security updates</li>
            <li>
              Secure hosting infrastructure (Vercel) with network-level
              protections
            </li>
            <li>Staff training on data privacy and security practices</li>
          </ul>
          <p>
            Despite our efforts, no method of transmission over the internet
            or electronic storage is completely secure. We cannot guarantee
            absolute security but will notify affected individuals and the
            National Privacy Commission within{" "}
            <strong>seventy-two (72) hours</strong> of becoming aware of a
            personal data breach that poses a risk to your rights and
            freedoms, as required by RA 10173 and the GDPR.
          </p>
        </>
      ),
    },
    {
      id: "childrens-privacy",
      title: "11. Children's Privacy",
      body: (
        <p>
          Our Services are not directed to children under the age of 18. We
          do not knowingly collect personal information from children. If you
          are a parent or guardian and believe your child has provided us with
          personal information, please contact us at{" "}
          <a href="mailto:admin@volthub.ph">admin@volthub.ph</a> and we will
          take steps to delete the information.
        </p>
      ),
    },
    {
      id: "changes",
      title: "12. Changes to This Privacy Policy",
      body: (
        <>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technology, legal requirements, or other
            factors. When we make material changes, we will:
          </p>
          <ul>
            <li>
              Update the &ldquo;Last Updated&rdquo; date at the top of this
              policy
            </li>
            <li>
              Post a prominent notice on our website for at least 30 days
            </li>
            <li>
              Where required by law, obtain your consent to the changes
            </li>
          </ul>
          <p>We encourage you to review this Privacy Policy periodically.</p>
        </>
      ),
    },
    {
      id: "contact",
      title: "13. How to Contact Us",
      body: (
        <>
          <p>
            For questions, concerns, or requests related to this Privacy
            Policy or the processing of your personal information, please
            contact us:
          </p>
          <p>
            <strong>
              VOLTHUB ELECTRONIC POWER GENERATION SERVICES CORP.
            </strong>{" "}
            (VoltHub.PH) &mdash; Privacy Inquiries
            <br />
            Email: <a href="mailto:admin@volthub.ph">admin@volthub.ph</a>
            <br />
            Phone: <a href="tel:+639682323704">+63 968 232 3704</a>
            <br />
            Address: Unit 2503, High Street South Corporate Plaza Tower 2,
            11th Street corner 26th Avenue, Fort Bonifacio, Bonifacio Global
            City, Taguig City 1635, Metro Manila, Philippines
          </p>
          <p>
            <strong>Data Protection Officer</strong>
            <br />
            DPO Contact:{" "}
            <a href="mailto:admin@volthub.ph?subject=Data%20Privacy%20Request">
              admin@volthub.ph
            </a>{" "}
            (subject line: &ldquo;Data Privacy Request&rdquo;)
            <br />
            Our Data Protection Officer is designated in accordance with the
            Philippine Data Privacy Act of 2012 (RA 10173) and its
            Implementing Rules and Regulations.
          </p>
          <p>
            If you are not satisfied with our response, you may file a
            complaint with:
          </p>
          <p>
            <strong>National Privacy Commission (Philippines)</strong>
            <br />
            Website:{" "}
            <a
              href="https://privacy.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://privacy.gov.ph
            </a>
            <br />
            Email:{" "}
            <a href="mailto:complaints@privacy.gov.ph">
              complaints@privacy.gov.ph
            </a>
            <br />
            Address: 5th Floor, Philippine International Convention Center
            (PICC), Delegation Building, Vicente Sotto Ave., Pasay City 1307
          </p>
          <p>
            <strong>European Union data subjects</strong> may additionally
            contact the Data Protection Authority of their country of
            residence.
          </p>
          <p className="text-sm italic text-gray-500 mt-6">
            This Privacy Policy is provided in English. In the event of any
            translation, the English version shall prevail.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <p>
            VoltHub (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
            respects your privacy and is committed to protecting your personal
            data. This policy explains what we collect, why, and how you can
            exercise your rights.
          </p>
          <p>
            This policy is designed to comply with the Philippines{" "}
            <strong>Data Privacy Act of 2012 (RA 10173)</strong> and draws on
            the principles of the EU General Data Protection Regulation
            (GDPR).
          </p>
        </>
      }
      sections={sections}
    />
  );
}
