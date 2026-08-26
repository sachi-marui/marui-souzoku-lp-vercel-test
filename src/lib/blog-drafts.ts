import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * content/blog-drafts/ 配下の下書き記事を読み込む処理。
 * 将来の自動記事生成システムが、公開前の記事を一時的に保存する場所として使う想定。
 *
 * このモジュールは src/lib/blog.ts（公開記事用）とは完全に独立しており、
 * /blog・/blog/[slug]・ArticleTeaserはこのモジュールを一切参照しない。
 * 下書きを公開記事へ移動する処理・GREEN/YELLOW/RED判定は、このモジュールにはまだ含めない。
 */

export type BlogDraft = {
  title: string;
  slug: string;
  publishedDate: string;
  category: string;
  excerpt: string;
  image: string;
  status: string;
  safetyLevel: string;
  /** Markdown本文（未レンダリングの生テキスト）。 */
  content: string;
};

const BLOG_DRAFTS_DIR = path.join(process.cwd(), "content/blog-drafts");

function readDraftFile(fileName: string): BlogDraft {
  const filePath = path.join(BLOG_DRAFTS_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    title: data.title ?? "",
    slug: data.slug ?? fileName.replace(/\.md$/, ""),
    publishedDate: data.publishedDate ?? "",
    category: data.category ?? "",
    excerpt: data.excerpt ?? "",
    image: data.image ?? "",
    status: data.status ?? "draft",
    safetyLevel: data.safetyLevel ?? "PENDING",
    content,
  };
}

/** 下書き記事を全件返す。 */
export function getAllDrafts(): BlogDraft[] {
  if (!fs.existsSync(BLOG_DRAFTS_DIR)) return [];

  const fileNames = fs
    .readdirSync(BLOG_DRAFTS_DIR)
    .filter((name) => name.endsWith(".md"));

  return fileNames.map(readDraftFile);
}

/** slugを指定して下書き記事を1件取得する。見つからない場合はundefined。 */
export function getDraftBySlug(slug: string): BlogDraft | undefined {
  return getAllDrafts().find((draft) => draft.slug === slug);
}
