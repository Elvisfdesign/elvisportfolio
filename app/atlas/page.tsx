import type { Metadata } from "next";
import { AtlasPage } from "@/components/atlas/atlas-page";

const TITLE =
  "Atlas UI System — Product, Design System & React Components";
const DESCRIPTION =
  "Atlas is a modern enterprise UI system developed from product interface to Figma design system, React component library, Storybook documentation, and interactive dashboard.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Elvis Fernandes`,
    description: DESCRIPTION,
    url: "/atlas",
  },
  twitter: {
    title: `${TITLE} | Elvis Fernandes`,
    description: DESCRIPTION,
  },
};

export default function AtlasRoutePage() {
  return <AtlasPage />;
}
