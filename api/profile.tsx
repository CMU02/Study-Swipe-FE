import api from "./config";
import type {
  CreateProfileRequest,
  CreateProfileResponse,
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
