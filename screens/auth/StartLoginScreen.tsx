import styled from "styled-components/native";
import SplashLogo from "../../components/logo/SplashLogo";
import PrimaryButton from "../../components/button/PrimaryButton";
import { primaryColor, secondaryColor } from "../../styles/Color";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";

const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

/* 상단(로고/문구) 영역: 화면 중앙 */
const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

/* 하단 버튼 영역: 아래 고정 느낌으로 여백 + 간격 */
const Footer = styled.View`
  width: 100%;
  align-items: center;
  padding: 0 16px 24px; /* 좌우 패딩 + 하단 여백 */
  gap: 12px; /* 버튼 사이 간격 */
`;

const StartLoginScreen = () => {
  const navi = useNavigation<NativeStackNavigationProp<StackList>>();

  const goToLoginScreen = () => {
    navi.navigate("Today");
  };

  const goToSignUpScreen = () => {
    navi.navigate("SignUp");
  };

  return (
    <Screen>
      <Content>
        <SplashLogo />
      </Content>

      <Footer>
        <PrimaryButton
          title="로그인"
          onPress={goToLoginScreen}
          bgColor={primaryColor}
        />
        <PrimaryButton
          title="회원가입"
          bgColor={secondaryColor}
          onPress={goToSignUpScreen}
        />
      </Footer>
    </Screen>
  );
};

export default StartLoginScreen;
