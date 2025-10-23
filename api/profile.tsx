import api from "./config";
import type {
  CreateProfileRequest,
  CreateProfileResponse,
  GetMyProfileResponse,
} from "./types/profile";

/* 프로필 API */
// 프로필 생성
export const createProfile = async (
  data: CreateProfileRequest,
  token: string
): Promise<CreateProfileResponse> => {
  const res = await api.post("/profiles/create-profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 내 프로필 조회
export const getMyProfile = async (
  token: string
): Promise<GetMyProfileResponse> => {
  const res = await api.get("/profiles/my-profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
