import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartingScreen from "../screens/auth/StartingScreen";
import StartLoginScreen from "../screens/auth/StartLoginScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import StudentAuthScreen from "../screens/auth/StudentAuthScreen";
import TodayScreen from "../screens/feed/TodayScreen";

export type StackList = {
  Starting: undefined;
  StartLogin: undefined;
  Login: undefined;
  SignUp: undefined;
  StudentVerify: undefined;
  Today: undefined;
};

const Stack = createNativeStackNavigator<StackList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Starting"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Starting" component={StartingScreen} />
      <Stack.Screen name="StartLogin" component={StartLoginScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="StudentVerify" component={StudentAuthScreen} />
      <Stack.Screen name="Today" component={TodayScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
