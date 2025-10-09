import { useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import BrandHeader from "../../components/logo/BrandHeader";
import PrimaryButton from "../../components/button/PrimaryButton";
import BrandTextField from "../../components/input/BrandTextField";
import { primaryColor } from "../../styles/Color";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";
import { register } from "../../api/auth";

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
`;

// 입력 필드들을 묶어서 gap으로 간격 관리
const FormStack = styled.View`
  width: 100%;
  gap: 12px;
`;

const ButtonRow = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 16px;
`;

function SignUpScreen() {
  const [user_id, setUser_id] = useState("");
  const [user_pwd, setUser_pwd] = useState("");
  const [user_pwd_confirm, setUser_pwd_confirm] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid =
    user_id.trim().length > 0 &&
    user_pwd.length > 0 &&
    user_pwd_confirm.length > 0 &&
    user_pwd === user_pwd_confirm;

  const navi = useNavigation<NativeStackNavigationProp<StackList>>();

  const handleRegister = async () => {
    if (!user_id.trim()) {
      Alert.alert("오류", "아이디를 입력해주세요.");
      return;
    }

    if (!user_pwd) {
      Alert.alert("오류", "비밀번호를 입력해주세요.");
      return;
    }

    if (!user_pwd_confirm) {
      Alert.alert("오류", "비밀번호 확인을 입력해주세요.");
      return;
    }

    if (user_pwd !== user_pwd_confirm) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    try {
      const response = await register({
        user_id: user_id.trim(),
        user_pwd,
      });

      if (response.status_code === 201) {
        Alert.alert("성공", response.message, [
          {
            text: "확인",
            onPress: () =>
              navi.navigate("StudentVerify", { user_id: user_id.trim() }),
          },
        ]);
      }
    } catch (error: any) {
      Alert.alert(
        "회원가입 실패",
        error.response?.data?.message || "회원가입에 실패했습니다."
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
          <Title>회원가입</Title>

          <FormStack>
            <BrandTextField
              placeholder="아이디"
              value={user_id}
              onChangeText={setUser_id}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <BrandTextField
              placeholder="비밀번호"
              value={user_pwd}
              onChangeText={setUser_pwd}
              secureToggle
              returnKeyType="next"
            />
            <BrandTextField
              placeholder="비밀번호 확인"
              value={user_pwd_confirm}
              onChangeText={setUser_pwd_confirm}
              secureToggle
              returnKeyType="done"
            />
          </FormStack>

          <ButtonRow>
            <PrimaryButton
              title={loading ? "회원가입 중..." : "학생 인증하러 가기"}
              bgColor={primaryColor}
              onPress={handleRegister}
              disabled={loading || !isValid}
            />
          </ButtonRow>
        </Container>
      </Wrap>
    </Screen>
  );
}

export default SignUpScreen;
