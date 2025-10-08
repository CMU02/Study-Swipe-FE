import { useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BrandHeader from "../../components/logo/BrandHeader";
import PrimaryButton from "../../components/button/PrimaryButton";
import { primaryColor } from "../../styles/Color";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";
import BrandTextField from "../../components/input/BrandTextField";
import { login } from "../../api/auth";

const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Wrap = styled.ScrollView.attrs({
  contentContainerStyle: { paddingTop: 24, paddingBottom: 32 },
  keyboardShouldPersistTaps: "handled",
})`
  flex: 1;
`;

const Container = styled.View`
  padding: 0 20px;
`;

const Title = styled.Text`
  font-size: 40px;
  font-family: "Paperlogy-SemiBold";
  margin: 16px 0 20px;
  color: #000;
`;

// 입력 필드들을 묶어서 gap으로 간격 관리
const FormStack = styled.View`
  width: 100%;
  gap: 12px;
`;

const LinksRow = styled.View`
  width: 100%;
  margin: 12px 0 24px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 18px;
`;

const LinkText = styled.Text`
  font-size: 12px;
  font-family: "Paperlogy-SemiBold";
  color: #000;
`;

const Divider = styled.Text`
  font-size: 12px;
  font-family: "Paperlogy-SemiBold";
  color: #000;
  opacity: 0.5;
`;

const ButtonRow = styled.View`
  width: 100%;
  align-items: center;
`;

const LoginScreen = () => {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navi = useNavigation<NativeStackNavigationProp<StackList>>();

  const goToSignUpScreen = () => {
    navi.navigate("SignUp");
  };

  // 토큰 저장 함수
  const saveTokens = async (accessToken: string, refreshToken: string) => {
    try {
      await AsyncStorage.multiSet([
        ["accessToken", accessToken],
        ["refreshToken", refreshToken],
      ]);
      console.log("토큰이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("토큰 저장 실패:", error);
      throw error;
    }
  };

  const handleLogin = async () => {
    if (!user_id.trim() || !password.trim()) {
      Alert.alert("오류", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const response = await login({
        user_id: user_id.trim(),
        user_pwd: password,
      });

      if (response.status_code === 200) {
        const { accessToken, refreshToken } = response.option.data;

        // AsyncStorage에 토큰 저장
        await saveTokens(accessToken, refreshToken);

        // 테스트용 Log 값 삭제예정
        console.log("Access Token 저장 완료:", accessToken);
        console.log("Refresh Token 저장 완료:", refreshToken);

        Alert.alert("성공", response.message, [
          {
            text: "확인",
            onPress: () => {
              navi.navigate("Home");
            },
          },
        ]);
      }
    } catch (error: any) {
      console.error("로그인 오류:", error);
      Alert.alert(
        "로그인 실패",
        error.response?.data?.message || "로그인에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <BrandHeader />

      <Wrap>
        <Container>
          <Title>로그인</Title>

          <FormStack>
            {/* 아이디 */}
            <BrandTextField
              placeholder="아이디"
              value={user_id}
              onChangeText={setUser_id}
              autoCapitalize="none"
              returnKeyType="next"
            />

            {/* 비밀번호 */}
            <BrandTextField
              placeholder="비밀번호"
              value={password}
              onChangeText={setPassword}
              secureToggle
              returnKeyType="done"
            />
          </FormStack>

          {/* 링크 모음 */}
          <LinksRow>
            <LinkText>아이디 찾기</LinkText>
            <Divider>|</Divider>
            <LinkText>비밀번호 찾기</LinkText>
            <Divider>|</Divider>
            <LinkText onPress={goToSignUpScreen}>회원가입</LinkText>
          </LinksRow>

          {/* 로그인 버튼 */}
          <ButtonRow>
            <PrimaryButton
              title={loading ? "로그인 중..." : "로그인"}
              bgColor={primaryColor}
              onPress={handleLogin}
              disabled={loading}
            />
          </ButtonRow>
        </Container>
      </Wrap>
    </Screen>
  );
};

export default LoginScreen;
