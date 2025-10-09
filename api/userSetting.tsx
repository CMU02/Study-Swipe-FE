import api from "./config";
import type {
  AddUniversityRequest,
  AddUniversityResponse,
  UpdateSmokingStatusRequest,
  UpdateSmokingStatusResponse,
  UpdateSocialPrefRequest,
  UpdateSocialPrefResponse,
  UpdatePreferredMemberCountRequest,
  UpdatePreferredMemberCountResponse,
  UpdateGoalsNoteRequest,
  UpdateGoalsNoteResponse,
  UpdateActivityRadiusRequest,
  UpdateActivityRadiusResponse,
  UpdateCollabStyleRequest,
  UpdateCollabStyleResponse,
  UpdateMajorRequest,
  UpdateMajorResponse,
  UpdateParticipationInfoRequest,
  UpdateParticipationInfoResponse,
  UpdateRegionRequest,
  UpdateRegionResponse,
} from "./types/userSetting";

/* 사용자 설정 API */
// 대학교 정보 업데이트
export const addUniversity = async (
  data: AddUniversityRequest,
  token: string
): Promise<AddUniversityResponse> => {
  const res = await api.put("/universities/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 전공 업데이트
export const updateMajor = async (
  data: UpdateMajorRequest,
  token: string
): Promise<UpdateMajorResponse> => {
  const res = await api.post("/profiles/major", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 지역 정보 업데이트
export const updateRegion = async (
  data: UpdateRegionRequest,
  token: string
): Promise<UpdateRegionResponse> => {
  const res = await api.post("/profiles/region", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 활동 반경 업데이트
export const updateActivityRadius = async (
  data: UpdateActivityRadiusRequest,
  token: string
): Promise<UpdateActivityRadiusResponse> => {
  const res = await api.post("/profiles/activity-radius", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 학습 목표 업데이트
export const updateGoalsNote = async (
  data: UpdateGoalsNoteRequest,
  token: string
): Promise<UpdateGoalsNoteResponse> => {
  const res = await api.post("/profiles/goals-note", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 참여 정보 업데이트
export const updateParticipationInfo = async (
  data: UpdateParticipationInfoRequest,
  token: string
): Promise<UpdateParticipationInfoResponse> => {
  const res = await api.post("/profiles/participation-info", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 흡연 상태 업데이트
export const updateSmokingStatus = async (
  data: UpdateSmokingStatusRequest,
  token: string
): Promise<UpdateSmokingStatusResponse> => {
  const res = await api.post("/profiles/smoking-status", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 사교모임 선호도 업데이트
export const updateSocialPref = async (
  data: UpdateSocialPrefRequest,
  token: string
): Promise<UpdateSocialPrefResponse> => {
  const res = await api.post("/profiles/social-pref", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 선호 인원 수 업데이트
export const updatePreferredMemberCount = async (
  data: UpdatePreferredMemberCountRequest,
  token: string
): Promise<UpdatePreferredMemberCountResponse> => {
  const res = await api.post("/profiles/preferred-member-count", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 협업 성향 업데이트
export const updateCollabStyle = async (
  data: UpdateCollabStyleRequest,
  token: string
): Promise<UpdateCollabStyleResponse> => {
  const res = await api.post("/profiles/collab-style", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
