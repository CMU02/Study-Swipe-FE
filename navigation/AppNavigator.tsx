import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartingScreen from "../screens/auth/StartingScreen";
import StartLoginScreen from "../screens/auth/StartLoginScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import StudentAuthScreen from "../screens/auth/StudentAuthScreen";
import HomeScreen from "../screens/feed/HomeScreen";
import UserSettingContainer from "../screens/useSetting/UserSettingContainer";
import To from "../screens/notification/To";

export type StackList = {
  Starting: undefined;
  StartLogin: undefined;
  Login: undefined;
  SignUp: undefined;
  StudentVerify: { user_id: string };
  UserSetting: undefined;
  Home: undefined;
  Talk: undefined;
};

const Stack = createNativeStackNavigator<StackList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Starting"
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="Starting" component={StartingScreen} />
      <Stack.Screen name="StartLogin" component={StartLoginScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="StudentVerify" component={StudentAuthScreen} />
      <Stack.Screen name="UserSetting" component={UserSettingContainer} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Talk" component={To} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
