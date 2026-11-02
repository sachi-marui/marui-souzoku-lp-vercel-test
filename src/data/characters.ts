export type Character = {
  id: string;
  name: string;
  /** 一覧カード用の単体キャラクター画像（透過PNG） */
  thumbnailImage: string;
  /** クリック後に表示する自己紹介プロフィール画像 */
  profileImage: string;
  /**
   * 一覧カード内でのキャラクター本体の表示倍率（未指定時は1）。
   * 元画像のキャンバス比率・余白の差により本体の見た目サイズが揃わない場合に、
   * そのキャラクターだけ表示側で拡大するための調整値。
   */
  thumbnailScale?: number;
};

/**
 * 丸伊不動産オリジナルキャラクター8体。
 */
export const characters: Character[] = [
  {
    id: "maru-chan",
    name: "まるちゃん",
    thumbnailImage: "/images/characters/thumbs/maru.webp",
    profileImage: "/images/characters/maru-profile.webp",
  },
  {
    id: "rui-chan",
    name: "るいちゃん",
    thumbnailImage: "/images/characters/thumbs/rui.webp",
    profileImage: "/images/characters/rui-profile.webp",
  },
  {
    id: "gen-chan",
    name: "げんちゃん",
    thumbnailImage: "/images/characters/thumbs/gen.webp",
    profileImage: "/images/characters/gen-profile.webp",
    // 元画像が横長キャンバス(1536x1024)で本体まわりの余白が大きく、
    // object-containで表示すると他キャラクターより小さく見えるため拡大調整。
    thumbnailScale: 1.35,
  },
  {
    id: "kouchi-kun",
    name: "こうちくん",
    thumbnailImage: "/images/characters/thumbs/kochi.webp",
    profileImage: "/images/characters/kochi-profile.webp",
  },
  {
    id: "momo",
    name: "もも",
    thumbnailImage: "/images/characters/thumbs/momo.webp",
    profileImage: "/images/characters/momo-profile.webp",
  },
  {
    id: "pain",
    name: "パイン",
    thumbnailImage: "/images/characters/thumbs/pine.webp",
    profileImage: "/images/characters/pine-profile.webp",
  },
  {
    id: "mikan",
    name: "みかん",
    thumbnailImage: "/images/characters/thumbs/mikan.webp",
    profileImage: "/images/characters/mikan-profile.webp",
  },
  {
    id: "aoringo",
    name: "あおりんご",
    thumbnailImage: "/images/characters/thumbs/aoringo.webp",
    profileImage: "/images/characters/aoringo-profile.webp",
  },
];
