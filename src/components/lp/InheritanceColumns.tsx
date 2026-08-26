import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles } from "@/data/articles";

export function InheritanceColumns() {
  return (
    <Section
      bg="white"
      dividerBottom={{ variant: "b", color: "var(--color-bg-pale)" }}
    >
      <Container>
        <SectionHeading>
          沖縄の相続について、
          <br />
          分かりやすく解説しています。
        </SectionHeading>
        <div className="flex flex-col gap-8 lp-md:flex-row lp-md:gap-7">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-1 flex-col gap-2 rounded-[18px] transition-transform duration-200 hover:-translate-y-[3px]"
            >
              <ImagePlaceholder
                label={article.photo}
                aspectRatio="16/9"
                rounded={false}
                className="rounded-[16px]"
              />
              <p className="mt-2.5 text-[12px] font-bold text-accent-dark">
                {article.category}
              </p>
              <p className="mb-0.5 text-base font-bold leading-[1.6] text-text-dark">
                {article.title}
              </p>
              <p className="text-[13.5px] leading-[1.7] text-text-mid">
                {article.excerpt}
              </p>
              <span className="mt-1 text-[13px] font-bold text-primary-dark">
                続きを読む →
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
