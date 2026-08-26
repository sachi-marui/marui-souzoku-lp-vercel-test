import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const worries = [
  "相続した実家をどうすればいいか分からない",
  "土地を売るべきか残すべきか迷っている",
  "軍用地の価値や活用方法が分からない",
  "相続税や固定資産税が心配",
  "兄弟や家族で意見がまとまらない",
  "何から始めればいいか分からない",
];

export function Worries() {
  return (
    <Section
      id="worry"
      bg="white"
      dividerBottom={{ variant: "a", color: "var(--color-bg-gray)" }}
    >
      <Container>
        <SectionHeading>
          このようなお悩みは
          <br />
          ありませんか？
        </SectionHeading>
        <div className="flex flex-col-reverse items-center gap-8 lp-md:flex-row lp-md:gap-14">
          <div className="flex w-full flex-col gap-1 [flex:1.3_1_0]">
            {worries.map((worry) => (
              <div
                key={worry}
                className="flex items-start gap-3.5 border-b border-border py-[18px]"
              >
                <span className="mt-px text-[18px] font-bold text-primary">
                  ✓
                </span>
                <span className="text-base leading-[1.7] text-text-dark">
                  {worry}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full max-w-[320px] flex-1 lp-md:max-w-none">
            <ImagePlaceholder
              label="実家・家族の写真、または水彩イラスト風の風景"
              aspectRatio="1/1"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
