"use client";

import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import { ascendProject } from "@/content/ascend/project";

type FrontPreview = "product" | "marketing";
type HeroScreen = (typeof ascendProject.heroScreens)[keyof typeof ascendProject.heroScreens];

/**
 * Layered hero preview — Marketing behind, Product in front by default.
 *
 * Desktop/tablet: click either card to bring it forward while preserving
 * the existing overlap composition. Mobile keeps a static vertical stack.
 */
export function AscendHeroStack() {
  const { product, marketing } = ascendProject.heroScreens;
  const [front, setFront] = useState<FrontPreview>("product");
  const statusId = useId();
  const productIsFront = front === "product";

  return (
    <div
      className="ascend-hero-stack mx-auto w-full max-w-[34rem] lg:max-w-none"
      aria-label="ASCEND product and marketing previews"
    >
      <p id={statusId} className="sr-only" aria-live="polite">
        {productIsFront
          ? "Product dashboard preview is in front"
          : "Marketing home preview is in front"}
      </p>

      {/* Mobile — readable stacked previews (no layered swap) */}
      <ul className="flex flex-col gap-4 md:hidden" role="list">
        <li>
          <HeroPreviewCard screen={product} isFront priority />
        </li>
        <li>
          <HeroPreviewCard screen={marketing} isFront={false} />
        </li>
      </ul>

      {/*
        Tablet + desktop — document-flow stack.
        Cards keep their geometric slots; front/back is z-index, emphasis,
        and a restrained transform swap.
      */}
      <div className="relative hidden md:block" aria-describedby={statusId}>
        <div
          className={[
            "ascend-hero-stack-card relative ml-auto w-[86%]",
            productIsFront
              ? "ascend-hero-stack-card--back"
              : "ascend-hero-stack-card--front",
          ].join(" ")}
        >
          <HeroPreviewButton
            label="Click to bring Marketing preview forward"
            pressed={!productIsFront}
            onActivate={() => setFront("marketing")}
          >
            <HeroPreviewCard screen={marketing} isFront={!productIsFront} />
          </HeroPreviewButton>
        </div>

        <div
          className={[
            "ascend-hero-stack-card relative -mt-[38%] w-[90%] lg:-mt-[36%]",
            productIsFront
              ? "ascend-hero-stack-card--front"
              : "ascend-hero-stack-card--back",
          ].join(" ")}
        >
          <HeroPreviewButton
            label="Click to bring Product preview forward"
            pressed={productIsFront}
            onActivate={() => setFront("product")}
          >
            <HeroPreviewCard screen={product} isFront={productIsFront} priority />
          </HeroPreviewButton>
        </div>
      </div>
    </div>
  );
}

function HeroPreviewButton({
  label,
  pressed,
  onActivate,
  children,
}: {
  label: string;
  pressed: boolean;
  onActivate: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="ascend-hero-stack-trigger group block w-full cursor-pointer rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ascend-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onActivate}
    >
      {children}
    </button>
  );
}

function HeroPreviewCard({
  screen,
  isFront,
  priority = false,
}: {
  screen: HeroScreen;
  isFront: boolean;
  priority?: boolean;
}) {
  return (
    <figure
      className={[
        "ascend-hero-stack-figure overflow-hidden rounded-sm border",
        isFront
          ? "ascend-hero-stack-figure--front"
          : "ascend-hero-stack-figure--back",
      ].join(" ")}
    >
      <figcaption className="px-4 py-3 md:px-5 md:py-3.5">
        <span className="t-mono text-[0.6875rem] text-[var(--ascend-gold)] tabular">
          {screen.label}
        </span>
      </figcaption>

      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${screen.width} / ${screen.height}` }}
      >
        <Image
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          priority={priority}
          sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 92vw"
          className="h-full w-full object-contain object-top"
        />
      </div>
    </figure>
  );
}
