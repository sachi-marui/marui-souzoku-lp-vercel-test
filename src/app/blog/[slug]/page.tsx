import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAllArticles, getArticleBySlug, resolveArticleImage } from "@/lib/blog";

/**
 * /blog/[slug] 個別記事ページ。
 *
 * content/blog/*.md の本文Markdownを marked でHTMLに変換して表示する。
 * 見出し・段落・箇条書きなど基本的なMarkdownのみを想定（過剰な機能は入れない）。
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

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function BlogArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const bodyHtml = marked.parse(article.content, { async: false });
  const imageSrc = resolveArticleImage(article);

  return (
    <main>
      <Section bg="white">
        <Container narrow>
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

          <h1 className="mb-4 text-[clamp(24px,4.6vw,32px)] font-bold leading-[1.5] text-text-dark">
            {article.title}
          </h1>

          <p className="mb-8 text-[15px] leading-[1.9] text-text-mid">
            {article.excerpt}
          </p>

          {imageSrc && (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-card bg-bg-pale">
              <Image
                src={imageSrc}
                alt={article.title}
                fill
                sizes="(min-width: 760px) 760px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div
            className="text-[16px] leading-[2] text-text-dark [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:leading-[1.6] [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[19px] [&_h3]:font-bold [&_h3]:leading-[1.6] [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_a]:text-primary [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          <div className="mt-14">
            <Link
              href="/blog"
              className="text-[14px] font-semibold text-primary-dark"
            >
              ← 記事一覧へ戻る
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
