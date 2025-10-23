/* ProfileScreen 관련 유틸리티 함수 */

import type { MyProfile } from "../../api/types/profile";
import type { DisplayProfile, StudyTag } from "./types";
import { DEFAULT_PROFILE } from "./constants";
import { getCircledNumber, sortByPriority } from "../../utils/common";

// 공통 유틸리티 재export
export { getCircledNumber };

/* 프로필 데이터를 화면 표시용으로 변환 */
export const transformProfileData = (
  profileData: MyProfile | null,
  displayTags: string[]
): DisplayProfile => {
  if (!profileData) return DEFAULT_PROFILE;

  const genderText = profileData.gender === "남성" ? "남" : "여";
  const smokingText =
    profileData.smoking_status.name === "비흡연" ? "비흡연자" : "흡연자";
  const memberCountText = `${profileData.preferred_member_count.min_member_count}~${profileData.preferred_member_count.max_member_count}인`;

  const firstTag = displayTags.length > 0 ? displayTags[0] : "태그 없음";

  return {
    image: profileData.image
      ? { uri: profileData.image }
      : require("../../assets/images/cardBgImg.png"),
    title: `#${firstTag}`,
    smallLabel: profileData.collab_style.name,
    subtitle: `${profileData.user.universities.university_name} ${profileData.major.name}`,
    description: `소개 : ${profileData.bio_note}`,
    showAlert: true,
    bookmarked: true,
    details: {
      purpose: profileData.goals_note,
      school: `${profileData.user.universities.university_name} ${profileData.major.name}`,
      location: `${profileData.region.city_first} ${
        profileData.region.city_second || ""
      }`.trim(),
      time: `${profileData.participation_info.start_time} ~ ${profileData.participation_info.end_time}`,
      freq: `주 ${profileData.participation_info.period}회, ${profileData.participation_info.period_length}`,
      age: `만 ${profileData.age}세/${genderText}`,
    },
    badges: [
      memberCountText,
      smokingText,
      profileData.collab_style.name,
      profileData.social_pref.name === "네"
        ? "회식 등 팀 모임 선호"
        : "칼퇴 선호",
    ],
    tags: displayTags,
  };
};

/* 태그 데이터 정렬 및 변환 */
export const sortTagsByPriority = (tags: StudyTag[]): string[] => {
  return sortByPriority(tags).map((t) => t.tag_name);
};

/* API 태그 데이터를 로컬 태그 데이터로 변환 */
export const transformApiTagsToLocal = (apiTags: any[]): StudyTag[] => {
  return apiTags.map((tag) => ({
    tag_name: tag.tag_name,
    priority: tag.priority,
  }));
};
