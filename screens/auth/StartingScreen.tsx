import { useEffect } from "react";
import styled from "styled-components/native";
import SplashLogo from "../../components/logo/SplashLogo";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const StartingScreen = () => {
  const navi = useNavigation<NativeStackNavigationProp<StackList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navi.navigate("StartLogin");
    }, 2000); // 2초 후 자동 이동

    return () => clearTimeout(timer);
  }, [navi]);

  return (
    <Container>
      <SplashLogo />
    </Container>
  );
};

export default StartingScreen;
