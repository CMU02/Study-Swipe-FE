import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../screens/notification/NotificationScreen";

export type TalkStackList = {
  Notification: undefined;
};

const Stack = createNativeStackNavigator<TalkStackList>();

const TalkNavi = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // 제스처 뒤로가기 막기
      }}
    >
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default TalkNavi;
