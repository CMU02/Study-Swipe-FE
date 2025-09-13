import React, { useState } from "react";
import styled from "styled-components/native";
import BrandHeader from "../components/BrandHeader";
import PrimaryButton from "../components/PrimaryButton";
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

const Input = styled.TextInput`
  font-size: 15px;
  font-weight: 600;

  width: 100%;
  height: 48px;
  padding: 0 14px;
  border-radius: 8px;

  border-width: 2px;
  border-color: ${textOpacityColor};

  background-color: #fff;
  color: #000;
`;

const InputSpacer = styled.View`
  height: 12px;
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

export default function LoginScreen() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  return (
    <Screen>
      <BrandHeader />

      <Wrap>
        <Container>
          <Title>로그인</Title>

          {/* 아이디 */}
          <Input
            placeholder="아이디"
            value={id}
            onChangeText={setId}
            placeholderTextColor={textOpacityColor}
            autoCapitalize="none"
            returnKeyType="next"
          />
          <InputSpacer />

          {/* 비밀번호 */}
          <Input
            placeholder="비밀번호"
            value={pw}
            onChangeText={setPw}
            placeholderTextColor={textOpacityColor}
            secureTextEntry
            returnKeyType="done"
          />

          {/* 링크 모음 */}
          <LinksRow>
            <LinkText>아이디 찾기</LinkText>
            <Divider>|</Divider>
            <LinkText>비밀번호 찾기</LinkText>
            <Divider>|</Divider>
            <LinkText>회원가입</LinkText>
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
}
