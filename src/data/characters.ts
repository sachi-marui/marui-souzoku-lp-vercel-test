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
    thumbnailImage: "/images/characters/thumbs/maru.png",
    profileImage: "/images/characters/maru-profile.jpg",
  },
  {
    id: "rui-chan",
    name: "るいちゃん",
    thumbnailImage: "/images/characters/thumbs/rui.png",
    profileImage: "/images/characters/rui-profile.jpg",
  },
  {
    id: "gen-chan",
    name: "げんちゃん",
    thumbnailImage: "/images/characters/thumbs/gen.png",
    profileImage: "/images/characters/gen-profile.jpg",
    // 元画像が横長キャンバス(1536x1024)で本体まわりの余白が大きく、
    // object-containで表示すると他キャラクターより小さく見えるため拡大調整。
    thumbnailScale: 1.35,
  },
  {
    id: "kouchi-kun",
    name: "こうちくん",
    thumbnailImage: "/images/characters/thumbs/kochi.png",
    profileImage: "/images/characters/kochi-profile.jpg",
  },
  {
    id: "momo",
    name: "もも",
    thumbnailImage: "/images/characters/thumbs/momo.png",
    profileImage: "/images/characters/momo-profile.jpg",
  },
  {
    id: "pain",
    name: "パイン",
    thumbnailImage: "/images/characters/thumbs/pine.png",
    profileImage: "/images/characters/pine-profile.jpg",
  },
  {
    id: "mikan",
    name: "みかん",
    thumbnailImage: "/images/characters/thumbs/mikan.png",
    profileImage: "/images/characters/mikan-profile.jpg",
  },
  {
    id: "aoringo",
    name: "あおりんご",
    thumbnailImage: "/images/characters/thumbs/aoringo.png",
    profileImage: "/images/characters/aoringo-profile.jpg",
  },
];
