import { useState } from "react";
import BrandTextField from "../../components/input/BrandTextField";
import styled from "styled-components/native";
import PrimaryButton from "../../components/button/PrimaryButton";
import { clickColor } from "../../styles/Color";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserSettingStackList } from "../../navigation/UserSettingNavi";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Top = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  padding: 0 14px;
`;

const Bottom = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 50px;
  padding: 0 14px;
`;

const Question = styled.Text`
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 40px;
  align-self: stretch;
`;

const Answer = styled.View`
  flex: 1;
  align-items: center;
  align-self: stretch;
  gap: 10px;
`;

export default function UseSetting_Period() {
  const navi = useNavigation<NativeStackNavigationProp<UserSettingStackList>>();
  // 선호시간, 시작 시간
  const [startTime, setStartTime] = useState<string>("");
  // 선호시간, 마침 시간
  const [endTime, setEndTime] = useState<string>("");
  // 주에 몇 회 진행하는지 선호기간
  const [week, setWeek] = useState<string>("");
  // 주에 N회를 몇 개월 동안 진행하는지 선호개월
  const [month, setMonth] = useState<string>("");

  // 각 값들에 대한 옳은 값인지 판단
  const isValidInput = () => {
    const sTime = Number(startTime);
    const eTime = Number(endTime);
    const sPeriod = Number(week);
    const ePeriod = Number(month);

    const validTime =
      !isNaN(sTime) &&
      !isNaN(eTime) &&
      // 선호 시간은 24시간제 사용 endTime이 startTime 보다 작지 않은지 확인
      sTime >= 0 &&
      sTime <= 24 &&
      eTime >= 0 &&
      eTime <= 24 &&
      sTime < eTime;

    const validPeriod =
      !isNaN(sPeriod) &&
      !isNaN(ePeriod) &&
      // 주 몇회 몇 개월 진행 여부 7일, 12개월 이상 값 확인
      sPeriod >= 1 &&
      sPeriod <= 7 &&
      ePeriod >= 1 &&
      ePeriod <= 12;

    return validTime && validPeriod;
  };

  const goNextUserSetting = () => {
    navi.navigate("GoalSetting");
  };

  return (
    <Container>
      <Top>
        <Question>스터디를 선호하는{"\n"}시간, 기간을 설정해주세요.</Question>
        <Answer>
          <BrandTextField
            value={startTime}
            onChangeText={setStartTime}
            placeholder="스터디를 시작하기를 선호하는 시간을 입력해주세요."
            autoCapitalize="none"
            returnKeyType="next"
          />
          <BrandTextField
            value={endTime}
            onChangeText={setEndTime}
            placeholder="스터디를 마무리하기를 선호하는 시간을 입력해주세요."
            autoCapitalize="none"
            returnKeyType="next"
          />
          <BrandTextField
            value={week}
            onChangeText={setWeek}
            placeholder="주에 몇 회 진행하는 것을 선호하시나요?"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <BrandTextField
            value={month}
            onChangeText={setMonth}
            placeholder="입력하신 횟수를 몇 개월 진행하시는 것을 선호하시나요?"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </Answer>
      </Top>
      <Bottom>
        <PrimaryButton
          title="다음"
          bgColor={clickColor}
          disabled={!isValidInput()}
          onPress={goNextUserSetting}
        />
      </Bottom>
    </Container>
  );
}
