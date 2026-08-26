import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLatestArticles, resolveArticleImage } from "@/lib/blog";

/**
 * 簡易LP専用「相続について詳しく知りたい方へ」セクション。
 *
 * content/blog/ のMarkdown記事（src/lib/blog.ts）から最新3件を表示する。
 * 「続きを読む」のみ /blog/{slug} へのLink（カード全体はリンクにしない）。
 * アイキャッチ画像は public/blog/images/ に実ファイルがある場合のみ表示する
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

/**
 * 記事数に応じてグリッドを切り替える。
 * 1件：中央寄せの単一カード（幅は現在のカードデザインを維持したまま抑える）
 * 2件：中央寄せの2列グリッド
 * 3件：これまでと同じ3列グリッド
 */
function getGridClassName(articleCount: number): string {
  if (articleCount === 1) {
    return "mx-auto grid max-w-[440px] grid-cols-1 gap-5";
  }
  if (articleCount === 2) {
    return "mx-auto grid max-w-[720px] grid-cols-1 gap-5 lp-md:grid-cols-2 lp-md:gap-6";
  }
  return "grid grid-cols-1 gap-5 lp-md:grid-cols-3 lp-md:gap-6";
}

export function ArticleTeaser() {
  const articles = getLatestArticles(3);

  return (
    <Section
      bg="white"
      dividerBottom={{ variant: "b", color: "var(--color-bg-pale)" }}
    >
      <div className="relative overflow-hidden">
        {/* 背景装飾: セクション内に収まる小さな輪郭円＋隅の淡いblob（PCのみ） */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-6 left-1/2 hidden h-[100px] w-[100px] -translate-x-1/2 rounded-full border border-primary/10 lp-md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 right-8 hidden h-[130px] w-[130px] lp-md:block"
          style={{
            background: "oklch(0.58 0.16 240 / 0.05)",
            borderRadius: "55% 45% 40% 60% / 50% 55% 45% 50%",
          }}
        />

        <Container>
          <SectionHeading>
            相続について
            <br />
            詳しく知りたい方へ
          </SectionHeading>
          <p className="mx-auto mb-10 max-w-[520px] text-center text-[14.5px] leading-[1.9] text-text-mid">
            相続した実家や土地について、知っておきたい情報をまとめています。
            <br />
            まずは情報を知りたい方も、お気軽にご覧ください。
          </p>

          <div className={getGridClassName(articles.length)}>
            {articles.map((article) => {
              const imageSrc = resolveArticleImage(article);

              return (
                <div
                  key={article.slug}
                  className="flex flex-col overflow-hidden rounded-card border border-border bg-bg-white transition-shadow duration-200 hover:shadow-md"
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
                    <p className="mb-2 line-clamp-2 text-[16px] font-bold leading-[1.6] text-text-dark">
                      {article.title}
                    </p>
                    <p className="line-clamp-3 flex-1 text-[13.5px] leading-[1.75] text-text-mid">
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

          <div className="mt-10 flex flex-col items-center gap-2">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border-[1.5px] border-primary/40 bg-white px-8 py-4 text-base font-bold text-primary/60 transition-colors duration-200 hover:border-primary/60 hover:bg-bg-pale"
            >
              相続の記事をもっと見る
            </Link>
          </div>
        </Container>
      </div>
    </Section>
  );
}
