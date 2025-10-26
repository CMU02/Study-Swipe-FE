import React, { useEffect } from "react";
import FontLoader from "./FontLoader";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { BackHandler, Alert } from "react-native";

import AppNavigator from "./navigation/AppNavigator";
import UserSettingNavi from "./navigation/UserSettingNavi";
import { ApplicationProvider } from "./contexts/ApplicationContext";

export default function App() {
  // 테스트용 토글: true면 UserSettingNavi, false면 AppNavigator
  const USE_USER_SETTING = false;

  useEffect(() => {
    // 하드웨어 백 버튼 막기
    const backAction = () => {
      // 앱 종료 확인 다이얼로그 표시 (선택사항)
      Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
          style: "cancel",
        },
        { text: "종료", onPress: () => BackHandler.exitApp() },
      ]);
      return true; // 기본 뒤로가기 동작 막기
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ApplicationProvider>
      <FontLoader>
        <NavigationContainer>
          <StatusBar hidden={true} />
          {USE_USER_SETTING ? <UserSettingNavi /> : <AppNavigator />}
        </NavigationContainer>
      </FontLoader>
    </ApplicationProvider>
  );
}
