import styled from "styled-components/native";
import GenderSelect from "../../components/input/Select";
import Select from "../../components/input/Select";
import { useState } from "react";
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

const SubQuestion = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const Answer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  gap: 10px;
`;

export default function UseSetting_Area() {
  const navi = useNavigation<NativeStackNavigationProp<UserSettingStackList>>();
  const [userArea_1, setUserArea_1] = useState<"서울특별시" | "경기도" | "">(
    ""
  );
  const [userArea_2, setUserArea_2] = useState<string>("");

  const goNextUserSetting = () => {
    navi.navigate("DistanceSetting");
  };

  return (
    <Container>
      <Top>
        <Question>
          스터디의 선호지역을 {"\n"}알려주세요.{" "}
          <SubQuestion>(도/시/구)</SubQuestion>
        </Question>

        <Answer>
          <Select
            value={userArea_1}
            onChange={setUserArea_1 as (v: string) => void}
            placeholder="시/도"
            options={["서울특별시", "경기도"]}
            width={160}
          />
          <Select
            value={userArea_2}
            onChange={setUserArea_2}
            placeholder="시/구"
            options={["안양시", "군포시"]}
            width={160}
          />
        </Answer>
      </Top>
      <Bottom>
        <PrimaryButton
          title="다음"
          bgColor={clickColor}
          onPress={goNextUserSetting}
        />
      </Bottom>
    </Container>
  );
}
