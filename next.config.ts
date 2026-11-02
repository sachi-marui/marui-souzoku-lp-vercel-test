import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  // 静的ファイル(out/)として出力する。Firebase Hosting等の静的配信で公開するため。
  output: "export",
  // 静的出力では画像の自動変換が使えない。画像は事前に軽量化したものを置く(public/images/*.webp)。
  images: { unoptimized: true },
  // 転送(「/」→「/lp/souzoku」、旧Vercelアドレス→本番ドメイン)は、静的出力では使えないため、
  // firebase.json(Firebase Hosting)と vercel.json(Vercel公開が残っている間だけ)に移した。
};

export default nextConfig;
