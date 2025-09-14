import React, { useState } from "react";
import styled from "styled-components/native";
import BrandHeader from "../components/BrandHeader";
import PrimaryButton from "../components/PrimaryButton";
import BrandTextField from "../components/BrandTextField"; // ✅ 공용 인풋
import { primaryColor, textOpacityColor } from "../styles/Color";

const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Wrap = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 32 },
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

const InputSpacer = styled.View`
  height: 12px;
`;

const ButtonRow = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 12px;
`;

function SignUpScreen() {
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  // 간단한 유효성: 아이디/비번 채움 + 비번 일치
  const isValid = userId.trim().length > 0 && pw.length > 0 && pw === pw2;

  return (
    <Screen>
      <BrandHeader />

      <Wrap>
        <Container>
          <Title>회원가입</Title>

          {/* 아이디 */}
          <BrandTextField
            placeholder="아이디"
            value={userId}
            onChangeText={setUserId}
            autoCapitalize="none"
            returnKeyType="next"
          />
          <InputSpacer />

          {/* 비밀번호 */}
          <BrandTextField
            placeholder="비밀번호"
            value={pw}
            onChangeText={setPw}
            secureToggle
            returnKeyType="next"
          />
          <InputSpacer />

          {/* 비밀번호 확인 */}
          <BrandTextField
            placeholder="비밀번호 확인"
            value={pw2}
            onChangeText={setPw2}
            secureToggle
            returnKeyType="done"
          />

          <ButtonRow>
            <PrimaryButton
              title="학생 인증하러 가기"
              bgColor={primaryColor}
              onPress={() => {
                if (!isValid) return;
                // TODO: 학생 인증 플로우로 이동
                // navigation?.navigate?.("StudentVerify");
              }}
              // PrimaryButton이 지원하면 활성/비활성 걸어두기
              // disabled={!isValid}
            />
          </ButtonRow>
        </Container>
      </Wrap>
    </Screen>
  );
}

export default SignUpScreen;
