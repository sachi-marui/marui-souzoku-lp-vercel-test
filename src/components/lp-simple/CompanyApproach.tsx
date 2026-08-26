import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * 簡易LP専用「丸伊不動産の考え方」セクション（Ver.2 ③）。
 * Worries直後に配置し、悩みへの共感の直後に「売却ありきではない」姿勢を伝えて
 * 安心・信頼を作り、次のAssetChoices（選択肢）へつなぐ。
 */

export function CompanyApproach() {
  return (
    <Section bg="pale">
      <Container>
        <SectionHeading>
          丸伊不動産なら
          <br />
          一緒に整理できます
        </SectionHeading>
        <p className="mx-auto max-w-[560px] text-center text-[15px] leading-[1.9] text-text-mid">
          相続した不動産の状況は、一人ひとり異なります。
          <br />
          最初から売却を決めるのではなく、今の状況を整理したうえで、選択肢を一緒に考えます。
        </p>
      </Container>
    </Section>
  );
}
