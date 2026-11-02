/**
 * 記事画像の軽量版(WebP)を、ビルドの直前に自動で作る(`npm run build` の前に自動実行)。
 *
 * 記事CMSが公開した画像(public/blog/images/*.png|jpg|jpeg)は、元のまま残す。
 * 同じ場所に「<元の名前>.opt.webp」を作り、サイトはこちらを優先して表示する(src/lib/blog.ts の resolveArticleImage)。
 *   - 記事CMSの操作・記事本文・記事URL・frontmatterのimageは変えない。今後CMSが追加する画像も、自動で対象になる。
 *   - 軽量版は、ビルドのたびに作る生成物のため、Gitには入れない(.gitignore)。
 *   - 失敗しても、ビルドは止めない(sharpが無い・画像が壊れている場合は、元の画像をそのまま表示する)。
 * 目的は、Firebase Hostingの無料枠(転送量1日360MB)を守ること。
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "blog", "images");
/** 記事ページの表示幅(約680px)の約2倍。これより小さい画像は拡大しない。 */
const MAX_WIDTH = 1600;
const QUALITY = 82;

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[optimize-blog-images] sharp が使えないため、軽量化をスキップします（元の画像をそのまま表示します）。");
  process.exit(0);
}

if (!fs.existsSync(DIR)) process.exit(0);

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

for (const name of fs.readdirSync(DIR)) {
  if (!/\.(png|jpe?g)$/i.test(name)) continue;
  const source = path.join(DIR, name);
  const output = path.join(DIR, name.replace(/\.(png|jpe?g)$/i, ".opt.webp"));
  try {
    const sourceStat = fs.statSync(source);
    if (fs.existsSync(output) && fs.statSync(output).mtimeMs >= sourceStat.mtimeMs) continue;

    const data = await sharp(source)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();

    // 軽くならない場合は、軽量版を作らない(元の画像を使う)。
    if (data.length >= sourceStat.size) {
      console.log(`[optimize-blog-images] ${name}: 軽くならないため、そのまま使います`);
      continue;
    }
    fs.writeFileSync(output, data);
    console.log(`[optimize-blog-images] ${name}: ${kb(sourceStat.size)} → ${kb(data.length)}`);
  } catch (error) {
    console.warn(`[optimize-blog-images] ${name}: 軽量化に失敗したため、そのまま使います（${error instanceof Error ? error.message : "原因不明"}）`);
  }
}
