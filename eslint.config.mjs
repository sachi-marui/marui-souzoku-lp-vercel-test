import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Claude Designの書き出しアセット（参照用・アプリのソースコードではない）。
    // フォルダ名の日本語部分はmacOS上でNFD正規化されており、glob側とバイト一致
    // しないことがあるため、ASCIIの "Hero" 部分文字列でディレクトリを特定する。
    "**/*Hero*/**",
  ]),
]);

export default eslintConfig;
