// 서버 스펙에 맞춘 타입
export type MatchingStudyTag = {
  tag_name: string;
  priority: number;
  proficiency_level: string | null;
};

export type MatchingProfile = {
  profile_id: number;
  user_uuid: string;
  display_name: string | null;
  image: string | null;
  goals_note: string | null;
  university_name: string | null;
  major_name: string | null;
  region: string | null;
  start_time: string | null;   // "09:00"
  end_time: string | null;     // "18:00"
  period: number | null;       // e.g. 6
  period_length: string | null;// "장기"
  age: number | null;
  gender: string | null;       // "남성" | "여성" | null (서버 정의에 따름)
  collab_style_name: string | null;
  collab_style_description: string | null;
  meeting_type_name: string | null;
  smoking_status: string | null;
  preferred_member_count: number | null;
  study_tags: MatchingStudyTag[];
  match_score: number;         // 0~1
};

export type MatchingPagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

export type MatchingResponse = {
  status_code: number;
  message: string;
  option: {
    data: MatchingProfile[];
    pagination: MatchingPagination;
  };
};

// 요청 파라미터
export type GetMatchingByTagParams = {
  tag_name?: string; // 없으면 전체
  page?: number;     // 기본 1
  limit?: number;    // 기본 20, 최대 50
};
