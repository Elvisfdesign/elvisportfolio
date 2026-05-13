import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_STUDIES, getCaseStudy } from "@/content/case-studies";
import { CaseStudyRenderer } from "@/components/case-study/case-study-renderer";
import { SharedElementScope } from "@/components/motion/shared-element";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.thesis,
    openGraph: {
      title: `${study.title} · Elvis Fernandes`,
      description: study.thesis,
      url: `/work/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return (
    <SharedElementScope>
      <CaseStudyRenderer study={study} />
    </SharedElementScope>
  );
}
