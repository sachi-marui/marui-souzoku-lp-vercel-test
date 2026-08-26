import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    num: "01",
    title: "沖縄に根ざした不動産会社",
    desc: "地域の土地事情や慣習を理解し、沖縄ならではの相続に対応します。",
    photo: "丸伊不動産オフィス外観",
  },
  {
    num: "02",
    title: "軍用地について相談できる",
    desc: "軍用地特有の評価や取引の仕組みも、分かりやすくご説明します。",
    photo: "軍用地の写真",
  },
  {
    num: "03",
    title: "相続した実家や土地をまとめて相談できる",
    desc: "複数の資産があっても、全体を見ながら整理できます。",
    photo: "実家と土地の写真",
  },
  {
    num: "04",
    title: "地域の専門家との連携",
    desc: "税理士や司法書士など、必要に応じて専門家と連携します。",
    photo: "スタッフ打ち合わせ写真",
  },
  {
    num: "05",
    title: "LIXIL不動産ショップ加盟店",
    desc: "全国ネットワークの安心感と、地域密着の対応を両立します。",
    photo: "店舗外観・ロゴボード写真",
  },
];

export function Reasons() {
  return (
    <Section
      bg="pale"
      dividerBottom={{ variant: "a", color: "var(--color-bg-white)" }}
    >
      <Container>
        <SectionHeading>丸伊不動産が選ばれる理由</SectionHeading>
        <div className="flex flex-col gap-12 lp-md:gap-[72px]">
          {reasons.map((reason, i) => (
            <div
              key={reason.num}
              className={`flex flex-col items-center gap-6 lp-md:gap-14 ${
                i % 2 ? "lp-md:flex-row-reverse" : "lp-md:flex-row"
              }`}
            >
              <div className="w-full min-w-0 flex-1">
                <ImagePlaceholder label={reason.photo} aspectRatio="4/3" />
              </div>
              <div className="w-full min-w-0 flex-1">
                <span className="text-[13px] font-bold tracking-[0.08em] text-primary">
                  {reason.num}
                </span>
                <p className="mt-2.5 mb-3 text-[21px] font-bold text-text-dark">
                  {reason.title}
                </p>
                <p className="mb-4 text-base leading-loose text-text-mid">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
