"use client";

import { useRef } from "react";
import BackToTopButton from "@/components/common/BackToTopButton";
import { PartnerHero } from "./PartnerHero";
import { PartnerBenefits } from "./PartnerBenefits";
import { PartnerHowItWorks } from "./PartnerHowItWorks";
import { PartnerInquiryForm } from "./PartnerInquiryForm";

export function PartnerPageContent(): React.ReactElement {
  const formRef = useRef<HTMLElement>(null);

  const scrollToForm = (): void => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <PartnerHero onApplyClick={scrollToForm} />
      <PartnerBenefits />
      <PartnerHowItWorks />
      <PartnerInquiryForm ref={formRef} />
      <BackToTopButton />
    </main>
  );
}
