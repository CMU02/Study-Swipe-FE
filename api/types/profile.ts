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
