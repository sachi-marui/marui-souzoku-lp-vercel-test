export type MainStaffMember = {
  id: string;
  name: string;
  role: string;
  certification: string;
  bio: string;
  photo: string;
};

export type OtherStaffMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

/**
 * 相続サロン認定を持つメインスタッフ2名。
 * 実名・役職・認定名称・プロフィール・写真は未確定のため仮表示。
 * 差し替え時は各フィールドの値を変更するだけでよい。
 */
export const mainStaff: MainStaffMember[] = [
  {
    id: "main-staff-1",
    name: "相続相談スタッフ 01",
    role: "役職名（仮）",
    certification: "相続サロン認定",
    bio: "紹介文（仮）が入ります。",
    photo: "相続相談スタッフ01の自然なプロフィール写真（仮）",
  },
  {
    id: "main-staff-2",
    name: "相続相談スタッフ 02",
    role: "役職名（仮）",
    certification: "相続サロン認定",
    bio: "紹介文（仮）が入ります。",
    photo: "相続相談スタッフ02の自然なプロフィール写真（仮）",
  },
];

/**
 * その他の丸伊不動産スタッフ4名。
 * 実名・役職・写真は未確定のため仮表示。
 */
export const otherStaff: OtherStaffMember[] = [
  {
    id: "other-staff-1",
    name: "スタッフ 01",
    role: "役職名（仮）",
    photo: "丸伊不動産スタッフ01のプロフィール写真（仮）",
  },
  {
    id: "other-staff-2",
    name: "スタッフ 02",
    role: "役職名（仮）",
    photo: "丸伊不動産スタッフ02のプロフィール写真（仮）",
  },
  {
    id: "other-staff-3",
    name: "スタッフ 03",
    role: "役職名（仮）",
    photo: "丸伊不動産スタッフ03のプロフィール写真（仮）",
  },
  {
    id: "other-staff-4",
    name: "スタッフ 04",
    role: "役職名（仮）",
    photo: "丸伊不動産スタッフ04のプロフィール写真（仮）",
  },
];
