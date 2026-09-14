import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://souzoku.marui-ginowan.co.jp/lp/souzoku",
      lastModified: new Date(),
    },
  ];
}
