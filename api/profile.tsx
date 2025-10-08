import api from "./config";

/* 타입 정의 */
export interface CreateProfileRequest {
  display_name: string;
  gender: string;
  birth_date: string;
  bio_note: string;
  age: number;
  image: string;
}

export interface CreateProfileResponse {
  status_code: number;
  message: string;
  option?: {
    data?: any;
  };
}

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
