import type { Metadata } from "next";
import { AtlasPage } from "@/components/atlas/atlas-page";

export const metadata: Metadata = {
  title: "Atlas UI System",
  description:
    "Atlas is an enterprise UI system exploring a modern workflow from product design in Figma to reusable components implemented with Claude Code.",
  openGraph: {
    title: "Atlas UI System — Elvis Fernandes",
    description:
      "Atlas is an enterprise UI system exploring a modern workflow from product design in Figma to reusable components implemented with Claude Code.",
    url: "/atlas",
  },
  twitter: {
    title: "Atlas UI System — Elvis Fernandes",
    description:
      "Atlas is an enterprise UI system exploring a modern workflow from product design in Figma to reusable components implemented with Claude Code.",
  },
};

export default function AtlasRoutePage() {
  return <AtlasPage />;
}
