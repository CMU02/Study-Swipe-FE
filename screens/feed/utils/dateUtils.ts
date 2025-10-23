/* 날짜 관련 유틸리티 함수들 */

export const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const ymdSeed = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}${m}${day}`;
};
