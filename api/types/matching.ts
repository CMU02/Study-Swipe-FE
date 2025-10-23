/* Matching API 관련 타입 정의 */

export interface MatchingByTagRequest {
  tag_name: string;
  page?: number;
  limit?: number;
}

export interface MatchingProfile {
  profile_id: number;
  user_uuid: string;
  display_name: string;
  image: string | null;
  goals_note: string;
  university_name: string;
  major_name: string | null;
  region: string | null;
  start_time: string;
  end_time: string;
  period: number;
  period_length: string;
  age: number;
  gender: string;
  collab_style_name: string | null;
  collab_style_description: string | null;
  meeting_type_name: string | null;
  smoking_status: string | null;
  social_pref: string | null;
  preferred_member_count: string | null;
  study_tags: MatchingStudyTag[];
  match_score: number;
}

export interface MatchingStudyTag {
  tag_name: string;
  priority: number;
  proficiency_level: string;
}

export interface MatchingPagination {
  page: string;
  limit: string;
  total: number;
  total_pages: number;
}

export interface MatchingByTagResponse {
  status_code: number;
  message: string;
  option: {
    data: MatchingProfile[];
    pagination: MatchingPagination;
  };
}
