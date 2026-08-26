/**
 * 下書き記事と、content/blog/ の公開記事との重複を機械的にチェックする一次判定。
 *
 * AIによる意味的な類似判定・Embeddings・Web調査は含まない（docs/rules/03-article-workflow.md 9章の
 * 「過去記事との重複防止」を、AIを使わずローカルだけで機械的に一次判定する基盤）。
 *
 * 日本語は単語間にスペースがなく、英語前提の単語分割は使えないため、
 * 文字2-gram（隣接2文字の組）の重なり具合（Dice係数）で類似度を計算する。
 * 形態素解析・分かち書き等の新規パッケージは追加していない。
 *
 * このモジュールは src/lib/blog-safety.ts（安全チェック）とは独立している。
 * 将来的には、安全チェック＋この重複チェック＋情報源確認＋AI意味判定を
 * 組み合わせて最終判定する想定だが、その統合は今回行わない。
 */

export type DuplicateStatus = "UNIQUE" | "REVIEW" | "DUPLICATE";

export type DuplicateCandidate = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
};

export type DuplicateMatch = {
  slug: string;
  title: string;
  /** 0〜1の類似度スコア（タイトル・本文の文字2-gram重なり＋category一致） */
  score: number;
  reasons: string[];
};

export type DuplicateCheckResult = {
  status: DuplicateStatus;
  reasons: string[];
  matches: DuplicateMatch[];
};

/** このスコア以上は「REVIEW」（人間・将来のAI意味判定が必要）とする。調整可能な閾値。 */
const REVIEW_SCORE_THRESHOLD = 0.35;

const TITLE_WEIGHT = 0.4;
const BODY_WEIGHT = 0.5;
const CATEGORY_MATCH_BONUS = 0.1;

function normalizeText(text: string): string {
  return text
    .replace(/\s+/g, "")
    .replace(/[。、！？「」『』（）(),.]/g, "")
    .trim();
}

function toBigrams(text: string): Set<string> {
  const normalized = normalizeText(text);
  const bigrams = new Set<string>();
  for (let i = 0; i < normalized.length - 1; i++) {
    bigrams.add(normalized.slice(i, i + 2));
  }
  return bigrams;
}

/** 文字2-gram集合同士のDice係数（0〜1）。両方空なら0を返す。 */
function diceSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersectionSize = 0;
  for (const gram of a) {
    if (b.has(gram)) intersectionSize++;
  }
  return (2 * intersectionSize) / (a.size + b.size);
}

/**
 * 候補記事（下書き等）を既存の公開記事一覧と比較する。
 * content/blog/・content/blog-drafts/ 側のMarkdownファイルは一切書き換えない。
 */
export function checkDuplicate(
  candidate: DuplicateCandidate,
  existingArticles: DuplicateCandidate[],
): DuplicateCheckResult {
  const candidateTitleNormalized = normalizeText(candidate.title);
  const candidateTitleBigrams = toBigrams(candidate.title);
  const candidateBodyBigrams = toBigrams(
    `${candidate.excerpt}\n${candidate.content}`,
  );

  const matches: DuplicateMatch[] = [];
  let status: DuplicateStatus = "UNIQUE";
  const reasons: string[] = [];

  for (const article of existingArticles) {
    const matchReasons: string[] = [];

    if (article.slug === candidate.slug) {
      matchReasons.push("slugが完全一致しています");
      matches.push({
        slug: article.slug,
        title: article.title,
        score: 1,
        reasons: matchReasons,
      });
      status = "DUPLICATE";
      continue;
    }

    if (
      candidateTitleNormalized.length > 0 &&
      normalizeText(article.title) === candidateTitleNormalized
    ) {
      matchReasons.push("タイトルが（空白等を除いて）完全一致しています");
      matches.push({
        slug: article.slug,
        title: article.title,
        score: 1,
        reasons: matchReasons,
      });
      status = "DUPLICATE";
      continue;
    }

    const titleScore = diceSimilarity(
      candidateTitleBigrams,
      toBigrams(article.title),
    );
    const bodyScore = diceSimilarity(
      candidateBodyBigrams,
      toBigrams(`${article.excerpt}\n${article.content}`),
    );
    const categoryMatch = article.category === candidate.category;

    const score = Math.min(
      1,
      titleScore * TITLE_WEIGHT +
        bodyScore * BODY_WEIGHT +
        (categoryMatch ? CATEGORY_MATCH_BONUS : 0),
    );

    if (titleScore > 0) {
      matchReasons.push(`タイトルの文字類似度: ${titleScore.toFixed(2)}`);
    }
    if (bodyScore > 0) {
      matchReasons.push(`本文・概要の文字類似度: ${bodyScore.toFixed(2)}`);
    }
    if (categoryMatch) {
      matchReasons.push("categoryが一致しています");
    }

    if (score >= REVIEW_SCORE_THRESHOLD) {
      if (status !== "DUPLICATE") status = "REVIEW";
      matches.push({ slug: article.slug, title: article.title, score, reasons: matchReasons });
    }
  }

  if (status === "DUPLICATE") {
    reasons.push(
      "既存の公開記事とslugまたはtitleが完全一致しているため、明確な重複と判定しました。",
    );
  } else if (status === "REVIEW") {
    reasons.push(
      `既存の公開記事とテーマが近い可能性があります（類似度${REVIEW_SCORE_THRESHOLD}以上）。AIによる意味判定または人間の確認が必要です。`,
    );
  } else {
    reasons.push(
      "機械的な重複・高類似は検出されませんでした。ただしこれはAIによる意味判定前の一次結果です。",
    );
  }

  return { status, reasons, matches };
}
