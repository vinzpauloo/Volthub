import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, {
  type LegalSection,
} from "@/components/common/LegalPageLayout";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://volthub.ph";
const LAST_UPDATED = "April 8, 2026";

export const metadata: Metadata = {
  title: "Terms of Service - VoltHub",
  description:
    "Terms and conditions for using the VoltHub website and inquiring about our EV charging and clean energy solutions.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteUrl}/terms` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/terms`,
    siteName: "VoltHub Energy",
    title: "Terms of Service - VoltHub",
    description:
      "Terms and conditions for the VoltHub website and inquiry services.",
  },
};

export default function TermsPage() {
  const sections: LegalSection[] = [
    {
      id: "introduction",
      title: "1. Introduction and Acceptance",
      body: (
        <>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
            and use of the website located at volthub.ph (the
            &ldquo;Website&rdquo;) and any related services, product catalogs,
            inquiry forms, and communications provided by VoltHub.PH
            (&ldquo;VoltHub,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) (collectively, the &ldquo;Services&rdquo;).
          </p>
          <p>
            By accessing or using the Services, you agree to be bound by these
            Terms and by our{" "}
            <Link href="/privacy">
              <strong>Privacy Policy</strong>
            </Link>
            . If you do not agree to these Terms, please do not use the
            Services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and
            VoltHub.PH. If you are using the Services on behalf of an
            organization, you represent and warrant that you have the
            authority to bind that organization to these Terms.
          </p>
        </>
      ),
    },
    {
      id: "company-information",
      title: "2. Company Information",
      body: (
        <p>
          <strong>VOLTHUB ELECTRONIC POWER GENERATION SERVICES CORP.</strong>
          <br />
          (doing business as &ldquo;VoltHub.PH&rdquo;)
          <br />
          Registered Office: Unit 2503, High Street South Corporate Plaza
          Tower 2, 11th Street corner 26th Avenue, Fort Bonifacio, Bonifacio
          Global City, Taguig City 1635, Metro Manila, Philippines
          <br />
          SEC Registration No.: 2025010184535-18 (registered January 17, 2025)
          <br />
          BIR TIN: 667-401-960-000 (RDO 044 – Taguig-Pateros East)
          <br />
          Taxpayer Type: Domestic Corporation
          <br />
          PSIC: 35100 – Electric Power Generation, Transmission and
          Distribution
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
      ),
    },
    {
      id: "services-description",
      title: "3. Description of Services",
      body: (
        <>
          <p>
            VoltHub.PH is a Philippine company specializing in electric
            vehicle (EV) charging infrastructure, energy storage systems,
            solar installation, and related clean-energy solutions for
            commercial, industrial, residential, and public-sector clients.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-2">
            3.1 Nature of Our Services
          </h3>
          <p>The Services include:</p>
          <ul>
            <li>
              An informational website with details about our products,
              sectors served, and case studies
            </li>
            <li>
              A product catalog of EV chargers, energy storage systems, and
              solar equipment
            </li>
            <li>Inquiry and quotation request forms</li>
            <li>
              Pre-sales consultation and site-specific feasibility discussions
            </li>
            <li>
              Information resources, blog posts, and market insights
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            3.2 Inquiry-Only Model
          </h3>
          <p>
            <strong>
              Prices are not publicly listed on the Website.
            </strong>{" "}
            All product pricing, quotations, and service proposals are
            provided directly by our sales team based on project-specific
            requirements. Submission of an inquiry does not create a binding
            contract. Any sale of products or services will be subject to a
            separate written agreement, purchase order, or quotation signed by
            both parties.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            3.3 No Professional Advice
          </h3>
          <p>
            Information on the Website &mdash; including blog posts, product
            descriptions, case studies, and market insights &mdash; is
            provided for <strong>general informational purposes only</strong>.
            It does not constitute professional engineering, legal, financial,
            tax, or investment advice. You should consult qualified
            professionals for advice specific to your circumstances before
            making any decisions based on information from our Website.
          </p>
        </>
      ),
    },
    {
      id: "use-of-services",
      title: "4. Use of the Services",
      body: (
        <>
          <h3 className="text-lg font-semibold text-slate-900 mt-2">
            4.1 Permitted Use
          </h3>
          <p>
            You may use the Services for lawful purposes only and in a manner
            consistent with these Terms. You agree to use the Services to:
          </p>
          <ul>
            <li>Learn about VoltHub&rsquo;s products and services</li>
            <li>Submit genuine business or consumer inquiries</li>
            <li>Access publicly available information we make available</li>
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            4.2 Prohibited Use
          </h3>
          <p>
            You agree <strong>not</strong> to:
          </p>
          <ul>
            <li>
              Use the Services in any way that violates applicable Philippine,
              international, or local laws or regulations
            </li>
            <li>Submit false, misleading, or fraudulent information</li>
            <li>
              Attempt to gain unauthorized access to any part of the Services,
              our servers, or any connected systems
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of the
              Services
            </li>
            <li>
              Use automated means (bots, scrapers, crawlers) to collect
              information from the Website without our prior written consent,
              except for search engine indexing
            </li>
            <li>
              Reverse-engineer, decompile, or disassemble any portion of the
              Services
            </li>
            <li>
              Use the Services to transmit any viruses, malware, or other
              harmful code
            </li>
            <li>
              Impersonate any person or entity or misrepresent your
              affiliation with any person or entity
            </li>
            <li>
              Use the Services for any commercial purpose other than the
              legitimate procurement of VoltHub products and services
            </li>
            <li>Collect or harvest personal information of other users</li>
            <li>
              Use the Services in any manner that could damage, disable,
              overburden, or impair our infrastructure or interfere with other
              users&rsquo; enjoyment of the Services
            </li>
          </ul>
          <p>
            We reserve the right to terminate or restrict your access to the
            Services at our sole discretion if we believe you have violated
            these Terms.
          </p>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property Rights",
      body: (
        <>
          <h3 className="text-lg font-semibold text-slate-900 mt-2">
            5.1 Our Content
          </h3>
          <p>
            All content on the Website &mdash; including text, graphics,
            logos, icons, images, photographs, videos, audio clips, product
            descriptions, software, and the overall design and arrangement
            &mdash; is the property of VoltHub.PH or its licensors and is
            protected by Philippine and international copyright, trademark,
            and other intellectual property laws.
          </p>
          <p>
            &ldquo;VoltHub,&rdquo; the VoltHub logo, and related marks are
            trademarks of VoltHub.PH. Other product names, company names, and
            logos mentioned on the Website are the property of their
            respective owners.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            5.2 Limited License
          </h3>
          <p>
            Subject to your compliance with these Terms, we grant you a
            limited, non-exclusive, non-transferable, revocable license to
            access and use the Website for personal, non-commercial,
            informational purposes. This license does not allow you to:
          </p>
          <ul>
            <li>
              Reproduce, distribute, publicly display, or create derivative
              works from our content
            </li>
            <li>
              Use our content for commercial purposes without our prior
              written permission
            </li>
            <li>
              Remove any copyright, trademark, or other proprietary notices
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            5.3 User Submissions
          </h3>
          <p>
            If you submit any content to VoltHub through the Website
            (including contact-form messages, feedback, suggestions, or
            inquiry details), you grant us a worldwide, royalty-free,
            perpetual, irrevocable, non-exclusive license to use, reproduce,
            modify, adapt, publish, and distribute that content for the
            purposes of responding to your inquiry, operating our business,
            and improving our Services. You represent that you have all
            necessary rights to submit such content.
          </p>
        </>
      ),
    },
    {
      id: "third-party",
      title: "6. Third-Party Content and Links",
      body: (
        <>
          <p>
            The Website may contain links to third-party websites, resources,
            or services that are not owned or controlled by VoltHub. We
            provide these links for convenience only and do not endorse,
            guarantee, or assume responsibility for any third-party content,
            products, or services. Your interactions with third parties are
            solely between you and the third party, and are governed by the
            third party&rsquo;s terms and privacy policies.
          </p>
          <p>
            References to international organizations, government agencies,
            industry standards, or third-party products on our Website are for{" "}
            <strong>informational and illustrative purposes only</strong> and
            do not imply endorsement, affiliation, partnership, or sponsorship
            by or with those organizations unless expressly stated.
          </p>
        </>
      ),
    },
    {
      id: "product-information",
      title: "7. Product Information, Specifications, and Availability",
      body: (
        <>
          <h3 className="text-lg font-semibold text-slate-900 mt-2">
            7.1 Accuracy
          </h3>
          <p>
            We make reasonable efforts to ensure that product information,
            specifications, images, and descriptions on the Website are
            accurate and up to date. However, we do not warrant that all
            information is complete, accurate, current, or error-free. Product
            specifications are based on information provided by our suppliers
            and are subject to change without notice.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            7.2 Availability
          </h3>
          <p>
            Product availability is subject to stock, supplier lead times, and
            market conditions. Listing a product on the Website does not
            constitute an offer to sell or a guarantee of availability.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            7.3 Images
          </h3>
          <p>
            Product images are for illustrative purposes only. Actual products
            may vary in appearance, color, and detail from the images
            displayed on the Website.
          </p>
        </>
      ),
    },
    {
      id: "disclaimers",
      title: "8. Disclaimers and No Guaranteed Outcomes",
      body: (
        <>
          <h3 className="text-lg font-semibold text-slate-900 mt-2">
            8.1 Services Provided &ldquo;As Is&rdquo;
          </h3>
          <p>
            <strong>
              THE SERVICES AND ALL CONTENT ON THE WEBSITE ARE PROVIDED ON AN
              &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </strong>{" "}
            To the fullest extent permitted by applicable law, VoltHub
            disclaims all warranties, including but not limited to implied
            warranties of merchantability, fitness for a particular purpose,
            non-infringement, and any warranties arising from course of
            dealing or usage of trade.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            8.2 No Guaranteed Performance, Savings, or Outcomes
          </h3>
          <p>
            <strong>
              VoltHub makes no representations, warranties, or guarantees
              regarding specific energy savings, cost reductions, return on
              investment, payback periods, operational performance, or
              financial outcomes from the use of our products or services.
            </strong>{" "}
            Any figures, estimates, projections, case studies, or examples
            provided on the Website, in blog posts, in marketing materials, or
            during consultations are illustrative only and depend heavily on
            site-specific factors such as energy consumption patterns, local
            electricity tariffs, climate, equipment configuration,
            installation quality, usage behavior, and ongoing maintenance.
          </p>
          <p>
            <strong>Actual results will vary.</strong> You should not rely on
            any general claim on the Website as a prediction of outcomes for
            your specific project. For project-specific projections, please
            request a consultation and site assessment.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            8.3 Third-Party Products
          </h3>
          <p>
            Products offered by VoltHub are manufactured by third parties.
            Any warranties on products are provided by the original
            manufacturer and are subject to the manufacturer&rsquo;s warranty
            terms. VoltHub&rsquo;s obligations with respect to product defects
            are limited to facilitating the manufacturer&rsquo;s warranty
            process and do not extend beyond what is provided by the
            manufacturer&rsquo;s warranty.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            8.4 Availability of Services
          </h3>
          <p>
            We do not warrant that the Website will be uninterrupted, timely,
            secure, or error-free, or that defects will be corrected. We
            reserve the right to modify, suspend, or discontinue the Website
            or any part of the Services at any time without notice.
          </p>
        </>
      ),
    },
    {
      id: "limitation-liability",
      title: "9. Limitation of Liability",
      body: (
        <>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
            SHALL VOLTHUB.PH, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS,
            SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
            SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING
            BUT NOT LIMITED TO:
          </p>
          <ul>
            <li>
              Loss of profits, revenue, savings, business opportunities, or
              anticipated benefits
            </li>
            <li>Loss of data or goodwill</li>
            <li>Business interruption or downtime</li>
            <li>Cost of substitute products or services</li>
            <li>Damages arising from reliance on information on the Website</li>
          </ul>
          <p>
            ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF, OR INABILITY TO
            USE, THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY
            OF SUCH DAMAGES.
          </p>
          <p>
            <strong>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE
              LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO
              THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE GREATER OF (A)
              THE AMOUNT YOU HAVE PAID TO VOLTHUB IN THE TWELVE (12) MONTHS
              PRECEDING THE CLAIM, OR (B) ONE THOUSAND PHILIPPINE PESOS (PHP
              1,000).
            </strong>
          </p>
          <p>
            Some jurisdictions do not allow the exclusion or limitation of
            certain damages, so some of the above limitations may not apply to
            you. In such jurisdictions, our liability is limited to the
            maximum extent permitted by law.
          </p>
        </>
      ),
    },
    {
      id: "indemnification",
      title: "10. Indemnification",
      body: (
        <>
          <p>
            You agree to indemnify, defend, and hold harmless VoltHub.PH, its
            affiliates, directors, officers, employees, and agents from and
            against any and all claims, liabilities, damages, losses, costs,
            and expenses (including reasonable attorneys&rsquo; fees) arising
            out of or in connection with:
          </p>
          <ul>
            <li>Your breach of these Terms</li>
            <li>Your violation of any law or the rights of a third party</li>
            <li>Your use or misuse of the Services</li>
            <li>Any content you submit through the Services</li>
          </ul>
        </>
      ),
    },
    {
      id: "privacy",
      title: "11. Privacy",
      body: (
        <p>
          Your use of the Services is also governed by our{" "}
          <Link href="/privacy">
            <strong>Privacy Policy</strong>
          </Link>
          , which explains how we collect, use, and protect your personal
          information. By using the Services, you consent to the data
          practices described in our Privacy Policy.
        </p>
      ),
    },
    {
      id: "governing-law",
      title: "12. Governing Law and Dispute Resolution",
      body: (
        <>
          <h3 className="text-lg font-semibold text-slate-900 mt-2">
            12.1 Governing Law
          </h3>
          <p>
            These Terms and any disputes arising out of or in connection with
            them shall be governed by and construed in accordance with the
            laws of the <strong>Republic of the Philippines</strong>, without
            regard to its conflict of laws principles.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            12.2 Jurisdiction
          </h3>
          <p>
            Any legal action or proceeding arising out of or relating to these
            Terms or the Services shall be brought exclusively in the
            competent courts of the City of Taguig, Metro Manila, Philippines,
            and you consent to the personal jurisdiction of such courts.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            12.3 Informal Dispute Resolution
          </h3>
          <p>
            Before initiating any legal action, you agree to first contact us
            at <a href="mailto:admin@volthub.ph">admin@volthub.ph</a> and make
            a good-faith effort to resolve the dispute informally for at least{" "}
            <strong>thirty (30) days</strong>.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "13. Changes to These Terms",
      body: (
        <>
          <p>
            We may modify these Terms from time to time to reflect changes in
            our business, legal requirements, or the Services. When we make
            material changes, we will:
          </p>
          <ul>
            <li>
              Update the &ldquo;Last Updated&rdquo; date at the top of these
              Terms
            </li>
            <li>
              Post a prominent notice on the Website for at least 14 days
              before the changes take effect
            </li>
            <li>Where required by law, notify you directly</li>
          </ul>
          <p>
            Your continued use of the Services after the effective date of
            the revised Terms constitutes your acceptance of the changes. If
            you do not agree to the revised Terms, you must stop using the
            Services.
          </p>
        </>
      ),
    },
    {
      id: "severability",
      title: "14. Severability",
      body: (
        <p>
          If any provision of these Terms is found to be invalid, illegal, or
          unenforceable by a court of competent jurisdiction, that provision
          shall be limited or eliminated to the minimum extent necessary, and
          the remaining provisions shall continue in full force and effect.
        </p>
      ),
    },
    {
      id: "entire-agreement",
      title: "15. Entire Agreement",
      body: (
        <p>
          These Terms, together with our{" "}
          <Link href="/privacy">
            <strong>Privacy Policy</strong>
          </Link>{" "}
          and any written agreements or quotations for specific products or
          services, constitute the entire agreement between you and VoltHub
          regarding your use of the Services and supersede all prior or
          contemporaneous communications, understandings, and agreements,
          whether written or oral.
        </p>
      ),
    },
    {
      id: "waiver",
      title: "16. Waiver",
      body: (
        <p>
          No waiver by VoltHub of any term or condition set out in these
          Terms shall be deemed a further or continuing waiver of such term or
          condition or a waiver of any other term or condition. Any failure
          by VoltHub to assert a right or provision under these Terms shall
          not constitute a waiver of such right or provision.
        </p>
      ),
    },
    {
      id: "assignment",
      title: "17. Assignment",
      body: (
        <p>
          You may not assign or transfer these Terms or any of your rights or
          obligations under them without our prior written consent. We may
          assign these Terms at any time without notice.
        </p>
      ),
    },
    {
      id: "contact",
      title: "18. Contact Us",
      body: (
        <>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <p>
            <strong>
              VOLTHUB ELECTRONIC POWER GENERATION SERVICES CORP.
            </strong>{" "}
            (VoltHub.PH)
            <br />
            Email: <a href="mailto:admin@volthub.ph">admin@volthub.ph</a>
            <br />
            Sales: <a href="mailto:judy@volthub.ph">judy@volthub.ph</a>
            <br />
            Phone: <a href="tel:+639682323704">+63 968 232 3704</a>
            <br />
            Address: Unit 2503, High Street South Corporate Plaza Tower 2,
            11th Street corner 26th Avenue, Fort Bonifacio, Bonifacio Global
            City, Taguig City 1635, Metro Manila, Philippines
          </p>
          <p className="text-sm italic text-gray-500 mt-6">
            By using the Services, you acknowledge that you have read,
            understood, and agree to these Terms of Service.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of
            the VoltHub website and any inquiry you submit through it. By
            using this site, you agree to these Terms.
          </p>
          <p>
            VoltHub provides information and inquiry facilitation for
            electric-vehicle charging and clean-energy solutions. We do not
            process online payments, and nothing on this website constitutes
            a guarantee of energy savings, return on investment, or payback
            period.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
