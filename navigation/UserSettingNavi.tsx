import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserSettingContainer from "../screens/useSetting/UserSettingContainer";

export type UserSettingStackList = {
  UserSetting: undefined;
};

const Stack = createNativeStackNavigator<UserSettingStackList>();

const UserSettingNavi = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserSetting"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserSetting" component={UserSettingContainer} />
    </Stack.Navigator>
  );
};

export default UserSettingNavi;
