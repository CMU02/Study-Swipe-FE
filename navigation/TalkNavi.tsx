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
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default TalkNavi;
