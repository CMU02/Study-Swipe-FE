import api from "./config";

/* 타입 정의 */
export interface RegisterRequest {
  user_id: string;
  user_pwd: string;
}

export interface RegisterResponse {
  status_code: number;
  message: string;
  option: {
    data: {
      user_uuid: string;
      user_id: string;
      email: string;
    };
  };
}

export interface SendVerificationCodeRequest {
  user_id: string;
  user_email: string;
}

export interface SendVerificationCodeResponse {
  status_code: number;
  message: string;
}

export interface ConfirmVerificationCodeRequest {
  user_id: string;
  user_email: string;
  verify_code: string;
}

export interface ConfirmVerificationCodeResponse {
  status_code: number;
  message: string;
  option: {
    data: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface TermsAgreementRequest {
  user_id: string;
  is_over_18: boolean;
  terms_of_service: boolean;
  collection_usage_personal_information: boolean;
  third_party_sharing: boolean;
  user_alarm_advertisement: boolean;
}

export interface TermsAgreementResponse {
  status_code: number;
  message: string;
}

export interface LoginRequest {
  user_id: string;
  user_pwd: string;
}

export interface LoginResponse {
  status_code: number;
  message: string;
  option: {
    data: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

/* 인증 API */
// 회원가입
export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// 로그인
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post("/auth/signin", data);
  return res.data;
};

// 이메일 인증 코드 발송
export const sendVerificationCode = async (
  data: SendVerificationCodeRequest
): Promise<SendVerificationCodeResponse> => {
  const res = await api.post("/auth/send-verification-code", data);
  return res.data;
};

// 이메일 인증 코드 확인
export const confirmVerificationCode = async (
  data: ConfirmVerificationCodeRequest
): Promise<ConfirmVerificationCodeResponse> => {
  const res = await api.post("/auth/confirm-verification-code", data);
  return res.data;
};

// 약관 동의
export const agreeToTerms = async (
  data: TermsAgreementRequest
): Promise<TermsAgreementResponse> => {
  const res = await api.post("/terms-of-use/agree", data);
  return res.data;
};
