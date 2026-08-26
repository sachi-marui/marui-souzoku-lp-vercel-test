export type Article = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  photo: string;
};

export const articles: Article[] = [
  {
    id: "article-1",
    category: "相続の基礎知識",
    title: "遺品整理はいつから始める？",
    excerpt: "適切なタイミングと進め方のポイントを解説します。",
    photo: "遺品整理のイメージ写真",
  },
  {
    id: "article-2",
    category: "実家売却",
    title: "沖縄の実家売却前に確認したいこと",
    excerpt: "売却前に押さえておきたい書類や手続きを紹介します。",
    photo: "実家・住宅の写真",
  },
  {
    id: "article-3",
    category: "相続準備",
    title: "親族が集まる前に準備する3つのこと",
    excerpt: "話し合いをスムーズに進めるための事前準備を解説します。",
    photo: "家族・書類の写真",
  },
];
