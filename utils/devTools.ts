import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 개발자용 토큰 초기화 함수
 * 콘솔에서 호출하거나 개발 중에 사용
 */
export const clearAllTokens = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    console.log("✅ 모든 토큰이 삭제되었습니다.");
    return true;
  } catch (error) {
    console.error("❌ 토큰 삭제 중 오류:", error);
    return false;
  }
};

/**
 * 모든 AsyncStorage 데이터 초기화
 */
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("✅ 모든 저장된 데이터가 삭제되었습니다.");
    return true;
  } catch (error) {
    console.error("❌ 저장소 초기화 중 오류:", error);
    return false;
  }
};

/**
 * 현재 저장된 토큰 확인
 */
export const checkStoredTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    console.log("📱 저장된 토큰 정보:");
    console.log("Access Token:", accessToken ? "존재함" : "없음");
    console.log("Refresh Token:", refreshToken ? "존재함" : "없음");

    if (accessToken) {
      console.log("Access Token 길이:", accessToken.length);
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ 토큰 확인 중 오류:", error);
    return null;
  }
};

// 전역에서 사용할 수 있도록 window 객체에 추가 (개발 환경에서만)
if (__DEV__) {
  (global as any).clearTokens = clearAllTokens;
  (global as any).clearStorage = clearAllStorage;
  (global as any).checkTokens = checkStoredTokens;
}
