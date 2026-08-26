import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const optionGroups = [
  { title: "実家", items: ["住む", "貸す", "売る", "管理する"] },
  { title: "土地", items: ["売る", "活用する", "駐車場にする", "保有する"] },
  {
    title: "軍用地",
    items: ["保有する", "借地料を受け取る", "相続する", "売却する"],
  },
];

export function AssetOptions() {
  return (
    <Section id="assets" bg="white">
      <Container>
        <SectionHeading>
          相続した資産には、
          <br />
          さまざまな選択肢があります。
        </SectionHeading>
        <div className="flex flex-col gap-8 lp-md:flex-row lp-md:gap-6">
          {optionGroups.map((group) => (
            <div
              key={group.title}
              className="flex-1 rounded-card border border-border px-[26px] py-[30px]"
            >
              <p className="mb-[18px] text-center text-[19px] font-bold text-primary-dark">
                {group.title}
              </p>
              {group.items.map((item) => (
                <div
                  key={item}
                  className="border-t border-border py-[13px] text-center text-[15px] text-text-dark"
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="mx-auto mt-11 max-w-[620px] text-center text-base leading-loose text-text-dark">
          大切なのは、「売るか残すか」を急いで決めることではありません。
          <br />
          ご家族や状況に合わせた選択肢を知ることが、後悔しない相続への第一歩です。
        </p>
        <div className="mt-7 text-center">
          <CTAButton href="#cta-main">無料相談して選択肢を知る</CTAButton>
        </div>
      </Container>
    </Section>
  );
}
