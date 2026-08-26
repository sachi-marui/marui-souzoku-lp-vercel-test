import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const consultPoints = [
  "売却と保有、どちらが合っているか",
  "実家や土地の現在の状況",
  "軍用地の特徴や価値",
  "相続後に必要な手続き",
  "家族で話し合うべきこと",
  "今すぐ動くべきか、まだ待つべきか",
];

export function FreeConsultation() {
  return (
    <Section
      id="cta-main"
      bg="white"
      dividerBottom={{ variant: "c", color: "var(--color-bg-pale)" }}
    >
      <Container>
        <div className="flex flex-col items-center gap-7 lp-md:flex-row lp-md:gap-16">
          <div className="w-full min-w-0 flex-1">
            <SectionHeading align="left" eyebrow="FREE CONSULTATION">
              無料相談で、
              <br />
              今やるべきことが分かります。
            </SectionHeading>
            <ul
              className="list-none"
              style={{ margin: "0 0 30px", padding: 0 }}
            >
              {consultPoints.map((point) => (
                <li
                  key={point}
                  className="relative border-t border-border py-[14px] pl-[22px] text-base leading-loose text-text-dark"
                >
                  {point}
                </li>
              ))}
            </ul>
            <CTAButton href="#final-cta">まずは無料で相談する</CTAButton>
            <p className="mt-[14px] text-sm text-text-mid">
              相談したからといって、売却を決める必要はありません。
            </p>
          </div>
          <div className="w-full min-w-0 flex-1">
            <ImagePlaceholder
              label="相談後に頭の中が整理されるイメージ図・写真"
              aspectRatio="4/3"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
