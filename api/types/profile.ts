/* 프로필 관련 타입 정의 */

/** 프로필 생성 요청 */
export interface CreateProfileRequest {
  display_name: string;
  gender: string;
  birth_date: string;
  bio_note: string;
  age: number;
  image: string;
}

/** 프로필 생성 응답 */
export interface CreateProfileResponse {
  status_code: number;
  message: string;
  option?: {
    data?: any;
  };
}

/** 스터디 태그 정보 */
export interface StudyTag {
  id: string;
  tag_name: string;
  priority: number;
  proficiency_score: number;
  proficiency_avg_score: number;
  proficiency_weight_avg_score: number;
  is_survey_completed: boolean;
  proficiency_levels: string;
}

/** 사용자 정보 */
export interface User {
  uuid: string;
  user_id: string;
  email: string;
  weight_avg_score: number;
  universities: {
    id: string;
    university_name: string;
  };
}

/** 내 프로필 조회 응답 - 프로필 데이터 */
export interface MyProfile {
  id: number;
  display_name: string;
  image: string;
  birth_date: string;
  age: number;
  gender: string;
  bio_note: string;
  goals_note: string;
  activity_radius_km: number;
  preferred_member_count: {
    id: number;
    min_member_count: number;
    max_member_count: number;
    profileId: number;
    createdAt: string;
    updatedAt: string;
  };
  contact_info: string | null;
  user: User;
  smoking_status: {
    id: string;
    name: string;
  };
  social_pref: {
    id: number;
    name: string;
  };
  participation_info: {
    id: number;
    period: number;
    period_length: string;
    start_time: string;
    end_time: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  region: {
    id: string;
    city_first: string;
    city_second: string;
    lat: string;
    lng: string;
  };
  meeting_type: {
    id: number;
    name: string;
  } | null;
  major: {
    id: number;
    name: string;
  };
  collab_style: {
    id: number;
    name: string;
    description: string;
  };
  study_tags: StudyTag[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

/** 내 프로필 조회 응답 */
export interface GetMyProfileResponse {
  status_code: number;
  message: string;
  option: {
    meta_data: {
      profile: MyProfile;
    };
  };
}
