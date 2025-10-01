import React from "react";
import FontLoader from "./FontLoader";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import UserSettingNavi from "./navigation/UserSettingNavi";

export default function App() {
  // 테스트용 토글: true면 UserSettingNavi, false면 AppNavigator
  const USE_USER_SETTING = false;

  return (
    <FontLoader>
      <NavigationContainer>
        <StatusBar hidden={true} />
        {USE_USER_SETTING ? <UserSettingNavi /> : <AppNavigator />}
      </NavigationContainer>
    </FontLoader>
  );
}
