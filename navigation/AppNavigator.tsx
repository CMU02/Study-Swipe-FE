import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartingScreen from "../screens/StartingScreen";
import StartLoginScreen from "../screens/StartLoginScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UseSetting_Brith from "../screens/useSetting/UseSetting_Brith";

export type StackList = {
  Starting: undefined;
  StartLogin: undefined;
  Login: undefined;
  SignUp: undefined;
  BrithSetting: undefined;
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
      <Stack.Screen name="BrithSetting" component={UseSetting_Brith} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
