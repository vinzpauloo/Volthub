"use client";

import BackToTopButton from "@/components/common/BackToTopButton";
import { DownloadApp } from "./DownloadApp";
import { HowToCharge } from "./HowToCharge";
import { FindFastCharger } from "./FindFastCharger";
import { EVChargingLearning } from "./EVChargingLearning";

export function PartnerPageContent(): React.ReactElement {
  return (
    <main>
      <DownloadApp />
      <HowToCharge />
      <FindFastCharger />
      <EVChargingLearning />
      <BackToTopButton />
    </main>
  );
}
