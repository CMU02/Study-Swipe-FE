import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ContentWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.View`
  align-items: center;
  margin-bottom: 50px;
`;

const TitleText = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: #4a4a4a;
  text-align: center;
  line-height: 40px;
`;

const LogoContainer = styled.View`
  width: 170px;
  height: 91px;
  align-items: center;
  justify-content: center;
`;

// 로고 이미지 컨테이너
const LogoWrapper = styled.View`
  width: 170px;
  height: 91px;
  align-items: center;
  justify-content: center;
`;

export default function StartingScreen() {
  return (
    <Container>
      <ContentWrapper>
        <TitleContainer>
          <TitleText>함께 소통하며{"\n"}배우는 즐거움</TitleText>
        </TitleContainer>

        <LogoContainer>
          <LogoWrapper>
            <Image
              source={require("../assets/images/logo.png")}
              style={{ width: 170, height: 91 }}
              resizeMode="contain"
            />
          </LogoWrapper>
        </LogoContainer>
      </ContentWrapper>
    </Container>
  );
}
