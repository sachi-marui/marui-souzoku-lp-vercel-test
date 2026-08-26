import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const risks = [
  "空き家の管理負担が増える",
  "固定資産税を払い続ける",
  "相続手続きが複雑になる",
  "家族間の意見が合わなくなる",
  "売却や活用のタイミングを逃す",
];

export function NeglectRisks() {
  return (
    <Section
      bg="gray"
      dividerBottom={{ variant: "b", color: "var(--color-bg-white)" }}
    >
      <Container narrow>
        <SectionHeading>
          そのままにしていると、
          <br />
          問題が大きくなることがあります。
        </SectionHeading>
        <div className="mt-9 flex flex-col">
          {risks.map((risk) => (
            <div
              key={risk}
              className="flex items-center gap-4 py-[17px]"
              style={{ borderBottom: "1px solid oklch(0.85 0.015 235)" }}
            >
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-blue-deep" />
              <span className="text-base leading-[1.7] text-text-dark">
                {risk}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
