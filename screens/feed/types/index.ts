/* HomeScreen 관련 타입 정의 */

export type TopKey = "TODAY" | "DISCOVER";

export const TOP_TABS: { key: TopKey; label: string }[] = [
  { key: "TODAY", label: "TODAY" },
  { key: "DISCOVER", label: "DISCOVER" },
];
