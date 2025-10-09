import { createNativeStackNavigator } from "@react-navigation/native-stack";
import To from "../screens/notification/To";
import From from "../screens/notification/from";

export type TalkStackList = {
  To: undefined;
  From: undefined;
};

const Stack = createNativeStackNavigator<TalkStackList>();

const TalkNavi = () => {
  return (
    <Stack.Navigator
      initialRouteName="To"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="To" component={To} />
      <Stack.Screen name="From" component={From} />
    </Stack.Navigator>
  );
};

export default TalkNavi;
