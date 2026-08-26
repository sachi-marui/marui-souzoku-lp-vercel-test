import { AnshinMessage } from "@/components/lp/AnshinMessage";
import { AssetOptions } from "@/components/lp/AssetOptions";
import { Characters } from "@/components/lp/Characters";
import { CompanyOverview } from "@/components/lp/CompanyOverview";
import { ConsultationFlow } from "@/components/lp/ConsultationFlow";
import { Faq } from "@/components/lp/Faq";
import { FinalCTA } from "@/components/lp/FinalCTA";
import { Footer } from "@/components/lp/Footer";
import { FreeConsultation } from "@/components/lp/FreeConsultation";
import { Header } from "@/components/lp/Header";
import { Hero } from "@/components/lp/Hero";
import { InheritanceColumns } from "@/components/lp/InheritanceColumns";
import { MobileFixedCTA } from "@/components/lp/MobileFixedCTA";
import { NeglectRisks } from "@/components/lp/NeglectRisks";
import { Reasons } from "@/components/lp/Reasons";
import { Staff } from "@/components/lp/Staff";
import { Worries } from "@/components/lp/Worries";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AnshinMessage />
        <Worries />
        <NeglectRisks />
        <FreeConsultation />
        <ConsultationFlow />
        <Reasons />
        <AssetOptions />
        <InheritanceColumns />
        <Faq />
        <Staff />
        <Characters />
        <FinalCTA />
        <CompanyOverview />
      </main>
      <Footer />
      <MobileFixedCTA />
    </>
  );
}
