/* 사용자 설정 관련 타입 정의 */

/** 대학교 추가 요청 */
export interface AddUniversityRequest {
  universityName: string;
}

/** 대학교 추가 응답 */
export interface AddUniversityResponse {
  status_code: number;
  message: string;
  option: {
    meta_data: {
      user_uuid: string;
      university: {
        id: string;
        name: string;
      };
    };
  };
}

/** 흡연 상태 업데이트 요청 */
export interface UpdateSmokingStatusRequest {
  smoking_status_name: string;
}

/** 흡연 상태 업데이트 응답 */
export interface UpdateSmokingStatusResponse {
  status_code: number;
  message: string;
}

/** 사교모임 선호도 업데이트 요청 */
export interface UpdateSocialPrefRequest {
  social_pref_name: string;
}

/** 사교모임 선호도 업데이트 응답 */
export interface UpdateSocialPrefResponse {
  status_code: number;
  message: string;
}

/** 선호 인원 수 업데이트 요청 */
export interface UpdatePreferredMemberCountRequest {
  min_member_count: number;
  max_member_count: number;
}

/** 선호 인원 수 업데이트 응답 */
export interface UpdatePreferredMemberCountResponse {
  status_code: number;
  message: string;
}

/** 스터디 정보 업데이트 응답 */
export interface UpdateStudyInfoResponse {
  status_code: number;
  message: string;
}

/** 학습 목표 업데이트 요청 */
export interface UpdateGoalsNoteRequest {
  goals_note: string;
}

/** 학습 목표 업데이트 응답 */
export interface UpdateGoalsNoteResponse {
  status_code: number;
  message: string;
}

/** 활동 반경 업데이트 요청 */
export interface UpdateActivityRadiusRequest {
  activity_radius_km: number;
}

/** 활동 반경 업데이트 응답 */
export interface UpdateActivityRadiusResponse {
  status_code: number;
  message: string;
}

/** 협업 성향 업데이트 요청 */
export interface UpdateCollabStyleRequest {
  collab_style_id: number;
}

/** 협업 성향 업데이트 응답 */
export interface UpdateCollabStyleResponse {
  status_code: number;
  message: string;
}

/** 전공 업데이트 요청 */
export interface UpdateMajorRequest {
  major_name: string;
}

/** 전공 업데이트 응답 */
export interface UpdateMajorResponse {
  status_code: number;
  message: string;
}

/** 참여 정보 업데이트 요청 */
export interface UpdateParticipationInfoRequest {
  period: number;
  period_length: string;
  start_time: string;
  end_time: string;
}

/** 참여 정보 업데이트 응답 */
export interface UpdateParticipationInfoResponse {
  status_code: number;
  message: string;
}

/** 지역 업데이트 요청 */
export interface UpdateRegionRequest {
  region_id: string;
}

/** 지역 업데이트 응답 */
export interface UpdateRegionResponse {
  status_code: number;
  message: string;
}
