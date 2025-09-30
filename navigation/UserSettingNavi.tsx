import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Name from "../screens/useSetting/UseSetting_Name";
import Brith from "../screens/useSetting/UseSetting_Brith";
import College from "../screens/useSetting/UseSetting_College";
import Area from "../screens/useSetting/UseSetting_Area";
import Distance from "../screens/useSetting/UseSetting_Distance";
import Period from "../screens/useSetting/UseSetting_Period";
import Goal from "../screens/useSetting/UseSetting_Goal";
import StudyTag from "../screens/useSetting/UseSetting_StudyTag";
import StudyStyle from "../screens/useSetting/UseSetting_StudyStyle";
import Additional from "../screens/useSetting/UseSetting_Additional";

export type UserSettingStackList = {
  NameSetting: undefined;
  BrithSetting: undefined;
  CollegeSetting: undefined;
  AreaSetting: undefined;
  DistanceSetting: undefined;
  PeriodSetting: undefined;
  GoalSetting: undefined;
  StudyTagSetting: undefined;
  StudyStyleSetting: undefined;
  AdditionalSetting: undefined;
};

const Stack = createNativeStackNavigator<UserSettingStackList>();

const UserSettingNavi = () => {
  return (
    <Stack.Navigator
      initialRouteName="NameSetting"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="NameSetting" component={Name} />
      <Stack.Screen name="BrithSetting" component={Brith} />
      <Stack.Screen name="CollegeSetting" component={College} />
      <Stack.Screen name="AreaSetting" component={Area} />
      <Stack.Screen name="DistanceSetting" component={Distance} />
      <Stack.Screen name="PeriodSetting" component={Period} />
      <Stack.Screen name="GoalSetting" component={Goal} />
      <Stack.Screen name="StudyTagSetting" component={StudyTag} />
      <Stack.Screen name="StudyStyleSetting" component={StudyStyle} />
      <Stack.Screen name="AdditionalSetting" component={Additional} />
    </Stack.Navigator>
  );
};

export default UserSettingNavi;
