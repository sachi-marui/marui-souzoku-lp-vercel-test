import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    num: 1,
    title: "お問い合わせ",
    desc: "電話・LINE・フォームからお気軽にご連絡ください。",
  },
  {
    num: 2,
    title: "お悩みをヒアリング",
    desc: "今の状況やお悩みをじっくりお伺いします。",
  },
  {
    num: 3,
    title: "不動産や相続状況を整理",
    desc: "実家・土地・軍用地の状況を一緒に整理します。",
  },
  {
    num: 4,
    title: "選択肢をご提案",
    desc: "売却・保有・活用など、複数の選択肢をご提案します。",
  },
  {
    num: 5,
    title: "ご家族でご検討",
    desc: "無理に決める必要はありません。ご家族でゆっくりご検討ください。",
  },
];

export function ConsultationFlow() {
  return (
    <Section bg="pale">
      <Container narrow>
        <SectionHeading>ご相談の流れ</SectionHeading>
        <div className="mt-10 flex flex-col">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-5">
              <div className="flex w-11 shrink-0 flex-col items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white">
                  {step.num}
                </span>
                <span className="my-1 min-h-8 w-0.5 flex-1 bg-border" />
              </div>
              <div className="pb-8">
                <p className="mt-1 mb-1.5 text-[17px] font-bold text-text-dark">
                  {step.title}
                </p>
                <p className="text-sm leading-[1.8] text-text-mid">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-semibold text-primary-dark">
          無理な営業や契約の催促は行いません。
        </p>
      </Container>
    </Section>
  );
}
