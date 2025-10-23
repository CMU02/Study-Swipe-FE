/* 데이터 변환 관련 유틸리티 함수들 */

import type { MatchingProfile } from "../../../api/types/matching";

export type Card = {
  id: string;
  popularity?: number;
  image: { uri: string } | any;
  title: string;
  smallLabel: string;
  subtitle: string;
  description: string;
  showAlert: boolean;
  bookmarked: boolean;
  details: {
    purpose?: string;
    school?: string;
    location?: string;
    time?: string;
    days?: string;
    freq?: string;
    age?: string;
  };
  badges?: string[];
  tags?: string[];
  matchScore?: number;
};

export const transformMatchingProfileToCard = (
  profile: MatchingProfile
): Card => {
  const genderText = profile.gender === "남성" ? "남" : "여";
  const smokingText =
    profile.smoking_status === "비흡연"
      ? "비흡연자"
      : profile.smoking_status || "정보없음";

  // social_pref 처리 (ProfileScreen과 동일한 로직)
  const socialPrefText =
    profile.social_pref === "네"
      ? "회식 등 팀 모임 선호"
      : profile.social_pref === "아니오"
      ? "칼퇴 선호"
      : profile.social_pref || "정보없음";

  // 첫 번째 태그를 title로 사용
  const firstTag =
    profile.study_tags.length > 0 ? profile.study_tags[0].tag_name : "태그없음";

  return {
    id: profile.profile_id.toString(),
    popularity: Math.round(profile.match_score * 100), // 매치 스코어를 퍼센트로 변환
    image: profile.image
      ? { uri: profile.image }
      : require("../../../assets/images/cardBgImg.png"),
    title: `#${firstTag}`,
    smallLabel: profile.collab_style_name || "스터디",
    subtitle: `${profile.university_name} ${profile.major_name || ""}`.trim(),
    description: `소개 : ${profile.goals_note}`,
    showAlert: true,
    bookmarked: false, // API에서 북마크 정보가 없으므로 기본값
    details: {
      purpose: profile.goals_note,
      school: `${profile.university_name} ${profile.major_name || ""}`.trim(),
      location: profile.region || "정보없음",
      time: `${profile.start_time} ~ ${profile.end_time}`,
      days: "주중", // API에 요일 정보가 없어서 기본값
      freq: `주 ${profile.period}회, ${profile.period_length}`,
      age: `만 ${profile.age}세/${genderText}`,
    },
    badges: [
      profile.preferred_member_count || "인원미정",
      smokingText,
      profile.collab_style_name || "스터디",
      socialPrefText,
    ].filter(Boolean),
    tags: profile.study_tags.map(
      (tag, index) => `#${index + 1} ${tag.tag_name}`
    ),
    matchScore: profile.match_score,
  };
};
