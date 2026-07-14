import { OpeningLine } from "@/components/landing/opening-line";
import { FeaturedFilms } from "@/components/landing/featured-films";
import { PracticeStrip } from "@/components/landing/practice-strip";
import { IdentityReel } from "@/components/landing/identity-reel";
import { CapabilityMap } from "@/components/landing/capability-map";
import { CreditsStrip } from "@/components/landing/credits-strip";
import { ClosingInvitation } from "@/components/landing/closing-invitation";
import { SharedElementScope } from "@/components/motion/shared-element";

/**
 * Homepage narrative:
 * Hero (+ Atlas flagship card) → Selected work → Practice → Identity →
 * Capabilities → Context → Invitation.
 */
export default function HomePage() {
  return (
    <SharedElementScope>
      <OpeningLine />
      <FeaturedFilms />
      <PracticeStrip />
      <IdentityReel />
      <CapabilityMap />
      <CreditsStrip />
      <ClosingInvitation />
    </SharedElementScope>
  );
}
