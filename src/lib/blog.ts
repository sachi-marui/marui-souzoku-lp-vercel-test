import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * content/blog/ 配下のMarkdown記事を読み込む共通処理。
 * /blog, /blog/[slug], /lp/souzoku の3箇所が同じデータ源を参照する想定。
 *
 * 将来の自動投稿でAIが同じ形式のMarkdownファイルを追加できるよう、
 * frontmatterの項目は固定・最小限にしている。
 */

export type BlogArticle = {
  title: string;
  slug: string;
  publishedDate: string;
  category: string;
  excerpt: string;
  image: string;
  /** Markdown本文（未レンダリングの生テキスト）。 */
  content: string;
};

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content/blog");

function readArticleFile(fileName: string): BlogArticle {
  const filePath = path.join(BLOG_CONTENT_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    title: data.title ?? "",
    slug: data.slug ?? fileName.replace(/\.md$/, ""),
    publishedDate: data.publishedDate ?? "",
    category: data.category ?? "",
    excerpt: data.excerpt ?? "",
    image: data.image ?? "",
    content,
  };
}

/** 全記事を公開日の新しい順に返す。 */
export function getAllArticles(): BlogArticle[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) return [];

  const fileNames = fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((name) => name.endsWith(".md"));

  return fileNames
    .map(readArticleFile)
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
}

/** slugを指定して1記事を取得する。見つからない場合はundefined。 */
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

/** 公開済み最新n件を返す（/lp/souzoku用、デフォルト3件）。 */
export function getLatestArticles(limit = 3): BlogArticle[] {
  return getAllArticles().slice(0, limit);
}

/**
 * frontmatterのimageが実際に public/ 配下に存在する場合だけそのパスを返す。
 * ファイルが存在しない場合はnull（壊れた画像表示・404を避けるため）。
 */
export function resolveArticleImage(article: BlogArticle): string | null {
  if (!article.image) return null;

  const filePath = path.join(process.cwd(), "public", article.image);
  return fs.existsSync(filePath) ? article.image : null;
}
