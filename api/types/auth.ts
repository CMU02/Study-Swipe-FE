/* 인증 관련 타입 정의 */

/** 회원가입 요청 */
export interface RegisterRequest {
  user_id: string;
  user_pwd: string;
}

/** 회원가입 응답 */
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

/** 이메일 인증 코드 발송 요청 */
export interface SendVerificationCodeRequest {
  user_id: string;
  user_email: string;
}

/** 이메일 인증 코드 발송 응답 */
export interface SendVerificationCodeResponse {
  status_code: number;
  message: string;
}

/** 이메일 인증 코드 확인 요청 */
export interface ConfirmVerificationCodeRequest {
  user_id: string;
  user_email: string;
  verify_code: string;
}

/** 이메일 인증 코드 확인 응답 */
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

/** 약관 동의 요청 */
export interface TermsAgreementRequest {
  user_id: string;
  is_over_18: boolean;
  terms_of_service: boolean;
  collection_usage_personal_information: boolean;
  third_party_sharing: boolean;
  user_alarm_advertisement: boolean;
}

/** 약관 동의 응답 */
export interface TermsAgreementResponse {
  status_code: number;
  message: string;
}

/** 로그인 요청 */
export interface LoginRequest {
  user_id: string;
  user_pwd: string;
}

/** 로그인 응답 */
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
