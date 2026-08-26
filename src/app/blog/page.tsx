import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllArticles, resolveArticleImage } from "@/lib/blog";

/**
 * /blog 記事一覧ページ。
 *
 * content/blog/ のMarkdown記事を getAllArticles() 経由で表示する。
 * 「続きを読む」は /blog/[slug] へのLink（カード全体はリンクにしない）。
 * サムネイル画像は public/blog/images/ に実ファイルがある場合のみ表示する
 * （resolveArticleImageがnullを返す場合は画像枠ごと非表示）。
 */

function formatPublishedDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <main>
      <Section bg="white">
        <Container>
          <SectionHeading>相続について知りたい方へ</SectionHeading>
          <p className="mx-auto mb-10 max-w-[560px] text-center text-[15px] leading-[1.9] text-text-mid">
            沖縄の実家や土地など、相続した不動産について考えるための情報をお届けします。
          </p>

          <div className="grid grid-cols-1 gap-5 lp-md:grid-cols-3 lp-md:gap-6">
            {articles.map((article) => {
              const imageSrc = resolveArticleImage(article);

              return (
                <div
                  key={article.slug}
                  className="flex flex-col overflow-hidden rounded-card border border-border bg-bg-white"
                >
                  {imageSrc && (
                    <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-bg-pale">
                      <Image
                        src={imageSrc}
                        alt={article.title}
                        fill
                        sizes="(min-width: 900px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-[12px] font-bold tracking-[0.06em] text-primary">
                        {article.category}
                      </p>
                      {article.publishedDate && (
                        <>
                          <span className="text-border" aria-hidden="true">
                            ・
                          </span>
                          <p className="text-[11px] text-text-mid">
                            {formatPublishedDate(article.publishedDate)}
                          </p>
                        </>
                      )}
                    </div>
                    <p className="mb-2 text-[16px] font-bold leading-[1.6] text-text-dark">
                      {article.title}
                    </p>
                    <p className="flex-1 text-[13.5px] leading-[1.75] text-text-mid">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="mt-3 inline-block text-[12.5px] font-semibold text-primary-dark"
                    >
                      続きを読む →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </main>
  );
}
