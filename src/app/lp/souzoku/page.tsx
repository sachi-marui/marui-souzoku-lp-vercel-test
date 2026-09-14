import type { Metadata } from "next";
import { ArticleTeaser } from "@/components/lp-simple/ArticleTeaser";
import { AssetChoices } from "@/components/lp-simple/AssetChoices";
import { CompanyOverview } from "@/components/lp-simple/CompanyOverview";
import { FinalCTA } from "@/components/lp-simple/FinalCTA";
import { Hero } from "@/components/lp-simple/Hero";
import { SimpleFlow } from "@/components/lp-simple/SimpleFlow";
import { Worries } from "@/components/lp-simple/Worries";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://souzoku.marui-ginowan.co.jp/lp/souzoku",
  },
};

export default function SouzokuSimpleLpPage() {
  return (
    <main>
      <Hero />
      <Worries />
      <AssetChoices />
      <ArticleTeaser />
      <SimpleFlow />
      <FinalCTA />
      <CompanyOverview />
    </main>
  );
}
