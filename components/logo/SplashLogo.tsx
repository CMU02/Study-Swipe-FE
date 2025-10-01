import styled from "styled-components/native";
import { textColor } from "../../styles/Color";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TagLine = styled.Text`
  font-size: 30px;
  line-height: 35px;
  color: ${textColor};
  text-align: center;
  margin-bottom: 15px;
  font-family: "Paperlogy-SemiBold";
`;

const Logo = styled.Image`
  width: 170px;
  height: 91px;
`;

export default function SplashLogo() {
  return (
    <Container>
      <TagLine>함께 소통하며{"\n"}배우는 즐거움</TagLine>
      <Logo source={require("../../assets/images/logo.png")} />
    </Container>
  );
}
