/* 공통 유틸리티 함수들 */

// 숫자를 원형 번호로 변환 (①②③...)
export const getCircledNumber = (i: number): string => {
  // 1~20 범위 지원 (①=U+2460)
  if (i >= 1 && i <= 20) return String.fromCharCode(0x2460 + (i - 1));
  return `${i}.`;
};

// 배열을 우선순위 순으로 정렬
export const sortByPriority = <T extends { priority: number }>(
  items: T[]
): T[] => {
  return items.slice().sort((a, b) => a.priority - b.priority);
};
