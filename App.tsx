import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import UserSettingNavi from "./navigation/UserSettingNavi";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <AppNavigator />
    </NavigationContainer>

    // UserSetting 부분 테스트 진행
    // <NavigationContainer>
    //   <StatusBar hidden={true} />
    //   <UserSettingNavi />
    // </NavigationContainer>
  );
}
