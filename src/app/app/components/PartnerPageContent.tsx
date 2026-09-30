"use client";

import BackToTopButton from "@/components/common/BackToTopButton";
import { DownloadApp } from "./DownloadApp";
import { HowToCharge } from "./HowToCharge";
import { FindFastCharger } from "./FindFastCharger";
import { EVChargingLearning } from "./EVChargingLearning";
import { SiteOwnerCta } from "./SiteOwnerCta";
import { AppGeoGuide } from "./AppGeoGuide";

export function PartnerPageContent(): React.ReactElement {
  return (
    <main>
      <DownloadApp />
      <HowToCharge />
      <AppGeoGuide />
      <FindFastCharger />
      <SiteOwnerCta />
      <EVChargingLearning />
      <BackToTopButton />
    </main>
  );
}
