import { useState } from "react";
import styled from "styled-components/native";
import BrandHeader from "../../components/BrandHeader";
import PrimaryButton from "../../components/PrimaryButton";
import { primaryColor } from "../../styles/Color";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";
import BrandTextField from "../../components/BrandTextField";

const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Wrap = styled.ScrollView.attrs({
  contentContainerStyle: { paddingTop: 24, paddingBottom: 32 }, // ⬅️ 상단 여백만 지정
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
  font-weight: 600;
  color: #000;
`;

const Divider = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #000;
  opacity: 0.5;
`;

const ButtonRow = styled.View`
  width: 100%;
  align-items: center;
`;

const LoginScreen = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const navi = useNavigation<NativeStackNavigationProp<StackList>>();

  const goToSignUpScreen = () => {
    navi.navigate("SignUp");
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
              value={id}
              onChangeText={setId}
              autoCapitalize="none"
              returnKeyType="next"
            />

            {/* 비밀번호 */}
            <BrandTextField
              placeholder="비밀번호"
              value={pw}
              onChangeText={setPw}
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
              title="로그인"
              bgColor={primaryColor}
              onPress={() => {
                // TODO: 로그인 처리
              }}
            />
          </ButtonRow>
        </Container>
      </Wrap>
    </Screen>
  );
};

export default LoginScreen;
