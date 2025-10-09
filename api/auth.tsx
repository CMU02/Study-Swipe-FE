import api from "./config";
import type {
  RegisterRequest,
  RegisterResponse,
  SendVerificationCodeRequest,
  SendVerificationCodeResponse,
  ConfirmVerificationCodeRequest,
  ConfirmVerificationCodeResponse,
  TermsAgreementRequest,
  TermsAgreementResponse,
  LoginRequest,
  LoginResponse,
} from "./types/auth";

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

// 로그아웃 (토큰 삭제)
export const logout = async (): Promise<boolean> => {
  try {
    const AsyncStorage =
      require("@react-native-async-storage/async-storage").default;
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    console.log("로그아웃 완료: 토큰이 삭제되었습니다.");
    return true;
  } catch (error) {
    console.error("로그아웃 중 오류:", error);
    return false;
  }
};
