/**
 * 会社情報・仮リンク集約データ。
 * 会社名・所在地・電話番号・FAX・営業時間・定休日・免許番号・代表者・加盟団体・
 * LINE公式アカウントURL・公式サイトURL(companyUrl)は
 * 公式サイト（https://www.marui-ginowan.co.jp/ / https://www.marui-ginowan.co.jp/company/ のフッター）
 * で確認済みの正式情報。
 * contactUrl・privacyPolicyUrlは公式サイト上で個別ページの正式URLを未確認のため、
 * 引き続き未確定のプレースホルダー値のまま。
 * 本番差し替え時はこのファイルの値のみ更新すればよい。
 */
export const company = {
  name: "丸伊不動産",
  /** 商号（登記上の正式名称） */
  legalName: "合同会社 丸伊不動産",
  nameEn: "MARUI REAL ESTATE",
  postalCode: "901-2224",
  address: "沖縄県宜野湾市真志喜3丁目17-10 102",
  phoneDisplay: "098-800-2556",
  phoneHref: "tel:0988002556",
  faxDisplay: "098-943-9344",
  businessHours: "9:00～18:00",
  closedDay: "日・祝日",
  /** 宅地建物取引業免許番号 */
  licenseNumber: "沖縄県知事(2)第5161号",
  representative: "伊佐 元宏",
  /** 公式サイトフッターに掲載されているLINE公式アカウントの友だち追加URL */
  lineUrl: "https://page.line.me/317zevcc?oat_content=url&openQrModal=true",
  contactUrl: "#",
  /** 丸伊不動産 公式サイト */
  companyUrl: "https://www.marui-ginowan.co.jp/",
  privacyPolicyUrl: "#",
  mapEmbedUrl: "",
  membershipBadge: "LIXIL不動産ショップ加盟店",
} as const;
