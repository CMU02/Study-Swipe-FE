/* 셔플 관련 유틸리티 함수들 */

export const hashString = (s: string) => {
  // 간단/빠른 해시 (deterministic)
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export const seededShuffle = <T>(arr: T[], seedStr: string): T[] => {
  const copy = [...arr];
  let seed = hashString(seedStr);
  // 피셔-예이츠 with LCG
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
