import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import FontLoader from "./FontLoader";
import UserSettingContainer from "./screens/useSetting/UserSettingContainer";

import AppNavigator from "./navigation/AppNavigator";
import UserSettingNavi from "./navigation/UserSettingNavi";
import To from "./screens/notification/To";
import TalkNavi from "./navigation/TalkNavi";

export default function App() {
  return (
    // <NavigationContainer>
    //   <StatusBar hidden={true} />
    //   <AppNavigator />
    // </NavigationContainer>

    // 새로운 UserSetting 테스트
    // <FontLoader>
    //   <NavigationContainer>
    //     <StatusBar hidden={true} />
    //     <UserSettingContainer />
    //   </NavigationContainer>
    // </FontLoader>

    // 개별 페이지 테스트
    <To />
  );
}
