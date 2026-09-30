import Link from "next/link";
import type { Route } from "next";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  description: string;
  faqs: FAQ[];
}

export default function FAQSection({ title, description, faqs }: FAQSectionProps) {
  return (
    <section className="cr-section tight">
      <div className="cr-wrap">
        <div className="cr-section-head center">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="cr-faq-list">
          {faqs.map((faq) => (
            <div key={faq.question} className="cr-faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <Link className="cr-seg-link" href={"/contact" as Route}>
            Still have questions? Contact us &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
