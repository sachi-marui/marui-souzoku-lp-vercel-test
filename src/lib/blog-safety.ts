import type { BlogDraft } from "@/lib/blog-drafts";

/**
 * content/blog-drafts/ の下書き記事に対する、ルールベースの一次安全チェック。
 *
 * docs/rules/03-article-workflow.md のGREEN/YELLOW/RED基準（23章）のうち、
 * AIを使わず機械的に判定できる部分だけをここで実装する。
 *
 * 重要：ここで返るGREENは「ルールベースの一次判定としてのGREEN」であり、
 * 情報源確認・AIによる意味判定・重複確認・数字の裏付け・コピー類似チェック等を
 * 経ていない。このGREENだけで本番公開してよい設計にはしない（03-article-workflow.md 23章）。
 *
 * このモジュールは判定結果を返すのみで、下書きMarkdownのsafetyLevel等を書き換えない。
 */

export type SafetyLevel = "GREEN" | "YELLOW" | "RED";

export type SafetyCheckResult = {
  level: SafetyLevel;
  reasons: string[];
  matchedTerms: string[];
  checks: {
    frontmatterComplete: boolean;
    missingFields: string[];
    statusValid: boolean;
    redTermsFound: string[];
    cautiousTermsFound: string[];
    containsGunyouchi: boolean;
  };
};

const REQUIRED_FIELDS: Array<keyof BlogDraft> = [
  "title",
  "slug",
  "publishedDate",
  "category",
  "excerpt",
  "image",
  "status",
  "safetyLevel",
];

/** docs/rules/03-article-workflow.md 13章・23章の断定・煽り表現。 */
const RED_TERMS = [
  "必ず",
  "絶対",
  "保証",
  "確実",
  "100%",
  "今すぐ",
  "放置すると危険",
  "最後のチャンス",
  "知らないと損",
  "取り返しがつかない",
  "今すぐ売るべき",
];

/** docs/rules/03-article-workflow.md 6章の法律・税務・制度・専門家領域に近い語句。 */
const CAUTIOUS_TERMS = [
  "相続税",
  "税金",
  "節税",
  "遺産分割協議書",
  "相続放棄",
  "相続登記",
  "法律",
  "法的",
  "税務",
  "弁護士",
  "税理士",
  "司法書士",
  "制度変更",
];

const GUNYOUCHI_TERM = "軍用地";

function findMatches(text: string, terms: string[]): string[] {
  return terms.filter((term) => text.includes(term));
}

/**
 * 下書き記事をルールベースで判定する。
 * safetyLevel等の書き換えは行わない（判定結果を返すのみ）。
 */
export function checkDraftSafety(draft: BlogDraft): SafetyCheckResult {
  const reasons: string[] = [];
  const matchedTerms: string[] = [];

  const missingFields = REQUIRED_FIELDS.filter((field) => !draft[field]);
  const frontmatterComplete = missingFields.length === 0;

  const statusValid = draft.status === "draft";

  const searchText = [draft.title, draft.excerpt, draft.content].join("\n");
  const redTermsFound = findMatches(searchText, RED_TERMS);
  const cautiousTermsFound = findMatches(searchText, CAUTIOUS_TERMS);
  const containsGunyouchi = searchText.includes(GUNYOUCHI_TERM);

  let level: SafetyLevel = "GREEN";

  if (!frontmatterComplete) {
    level = "RED";
    reasons.push(
      `必須frontmatterが不足しています（不足項目: ${missingFields.join(", ")}）`,
    );
  }

  if (!statusValid) {
    level = "RED";
    reasons.push(
      `statusが"draft"ではありません（現在値: "${draft.status}"）。下書きチェック対象として異常です。`,
    );
  }

  if (redTermsFound.length > 0) {
    level = "RED";
    reasons.push(
      `断定・煽り表現が検出されました: ${redTermsFound.join("、")}`,
    );
    matchedTerms.push(...redTermsFound);
  }

  if (level !== "RED") {
    if (cautiousTermsFound.length > 0) {
      level = "YELLOW";
      reasons.push(
        `法律・税務・制度に近い語句が検出されました: ${cautiousTermsFound.join("、")}`,
      );
      matchedTerms.push(...cautiousTermsFound);
    }

    if (containsGunyouchi) {
      level = "YELLOW";
      reasons.push(
        "軍用地に関する語句が含まれています。過度な強調ではなく慎重な表現か、人間の確認が必要です。",
      );
      matchedTerms.push(GUNYOUCHI_TERM);
    }
  } else {
    // RED確定後も、参考情報としてYELLOW相当の語句は記録する。
    if (cautiousTermsFound.length > 0) matchedTerms.push(...cautiousTermsFound);
    if (containsGunyouchi) matchedTerms.push(GUNYOUCHI_TERM);
  }

  if (level === "GREEN") {
    reasons.push(
      "ルールベースのチェック（frontmatter・断定/煽り表現・法律/税務/制度語句・軍用地）に該当なし。",
    );
  }

  return {
    level,
    reasons,
    matchedTerms: [...new Set(matchedTerms)],
    checks: {
      frontmatterComplete,
      missingFields,
      statusValid,
      redTermsFound,
      cautiousTermsFound,
      containsGunyouchi,
    },
  };
}
