import { OpeningLine } from "@/components/landing/opening-line";
import { IdentityReel } from "@/components/landing/identity-reel";
import { FeaturedFilms } from "@/components/landing/featured-films";
import { PracticeStrip } from "@/components/landing/practice-strip";
import { CapabilityMap } from "@/components/landing/capability-map";
import { CreditsStrip } from "@/components/landing/credits-strip";
import { ClosingInvitation } from "@/components/landing/closing-invitation";
import { SharedElementScope } from "@/components/motion/shared-element";

export default function HomePage() {
  return (
    <SharedElementScope>
      <OpeningLine />
      <IdentityReel />
      <FeaturedFilms />
      <PracticeStrip />
      <CapabilityMap />
      <CreditsStrip />
      <ClosingInvitation />
    </SharedElementScope>
  );
}
