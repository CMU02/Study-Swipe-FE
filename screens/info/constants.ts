/* ProfileScreen 관련 상수 */

import type { TopTabItem, DisplayProfile } from "./types";

export const TOP_TABS: TopTabItem[] = [
  { key: "MY", label: "My Profile" },
  { key: "SETTING", label: "Profile Setting" },
];

// 기본값 (로딩 중일 때 사용)
export const DEFAULT_PROFILE: DisplayProfile = {
  image: require("../../assets/images/cardBgImg.png"),
  title: "#로딩중",
  smallLabel: "로딩중",
  subtitle: "로딩중",
  description: "로딩중...",
  showAlert: true,
  bookmarked: true,
  details: {
    purpose: "로딩중",
    school: "로딩중",
    location: "로딩중",
    time: "로딩중",
    days: "로딩중",
    freq: "로딩중",
    age: "로딩중",
  },
  badges: ["로딩중"],
  tags: [],
};

// 레이아웃 상수
export const LAYOUT_CONSTANTS = {
  HORIZONTAL_PADDING: 16,
  PEEK_RIGHT: 64,
  TAG_SLOTS: [0, 1, 2, 3, 4],
} as const;
