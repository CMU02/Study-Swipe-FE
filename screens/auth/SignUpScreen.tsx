import { useState } from "react";
import styled from "styled-components/native";
import BrandHeader from "../../components/logo/BrandHeader";
import PrimaryButton from "../../components/button/PrimaryButton";
import BrandTextField from "../../components/input/BrandTextField";
import { primaryColor } from "../../styles/Color";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";

const Screen = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Wrap = styled.ScrollView.attrs({
  contentContainerStyle: { paddingTop: 24, paddingBottom: 32 }, // ⬅️ 상단 여백
  keyboardShouldPersistTaps: "handled",
})`
  flex: 1;
`;

const Container = styled.View`
  padding: 0 20px;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  margin: 16px 0 20px;
  color: #000;
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
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const isValid = userId.trim().length > 0 && pw.length > 0 && pw === pw2;

  const navi = useNavigation<NativeStackNavigationProp<StackList>>();

  const goToStudentVerify = () => {
    navi.navigate("StudentVerify");
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
              value={userId}
              onChangeText={setUserId}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <BrandTextField
              placeholder="비밀번호"
              value={pw}
              onChangeText={setPw}
              secureToggle
              returnKeyType="next"
            />
            <BrandTextField
              placeholder="비밀번호 확인"
              value={pw2}
              onChangeText={setPw2}
              secureToggle
              returnKeyType="done"
            />
          </FormStack>

          <ButtonRow>
            <PrimaryButton
              title="학생 인증하러 가기"
              bgColor={primaryColor}
              onPress={() => {
                if (!isValid) return;
                goToStudentVerify();
              }}
              // disabled={!isValid}
            />
          </ButtonRow>
        </Container>
      </Wrap>
    </Screen>
  );
}

export default SignUpScreen;
