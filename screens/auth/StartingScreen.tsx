import { useEffect } from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  // 토큰 확인 및 자동 로그인 처리
  const checkTokenAndNavigate = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      // Log 부분들은 모두 삭제 예정
      if (accessToken) {
        // 토큰이 있으면 홈 화면으로 이동
        console.log("저장된 토큰 발견, 자동 로그인 진행");
        navi.navigate("Home");
      } else {
        // 토큰이 없으면 로그인 화면으로 이동
        console.log("저장된 토큰 없음, 로그인 화면으로 이동");
        navi.navigate("StartLogin");
      }
    } catch (error) {
      console.error("토큰 확인 중 오류:", error);
      // 오류 발생 시 로그인 화면으로 이동
      navi.navigate("StartLogin");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkTokenAndNavigate();
    }, 2000); // 2초 후 토큰 확인 및 이동

    return () => clearTimeout(timer);
  }, [navi]);

  return (
    <Container>
      <SplashLogo />
    </Container>
  );
};

export default StartingScreen;
