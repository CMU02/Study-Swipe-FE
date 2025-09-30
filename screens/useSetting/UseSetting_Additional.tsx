import styled from "styled-components/native";
import StylePickButton from "../../components/button/StylePickButton";
import { useState } from "react";
import PrimaryButton from "../../components/button/PrimaryButton";
import { secondaryColor } from "../../styles/Color";
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
  align-items: flex-start;
  align-self: stretch;
  gap: 15px;
`;

export default function UseSetting_Additional() {
  // const navi = useNavigation<NativeStackNavigationProp<UserSettingStackList>>();
  const [smoking, setSmoking] = useState<string>("흡연자");
  const [privateGathering, setPrivateGathering] =
    useState<string>("회식 등 팀 모임 선호");

  // const goNextUserSetting = () => {
  //   navi.navigate("")
  // }

  return (
    <Container>
      <Top>
        <Question>서로에게 배려가{"\n"}필요한 항목이에요.</Question>
        <Answer>
          <StylePickButton
            value={smoking}
            onChange={setSmoking}
            options={["흡연자", "비흡연자"]}
            gap={12}
            horizontalPadding={15}
            selectedColorVariant="primary"
          />
          <StylePickButton
            value={privateGathering}
            onChange={setPrivateGathering}
            options={["회식 등 팀 모임 선호", "칼퇴 선호"]}
            gap={12}
            horizontalPadding={15}
            selectedColorVariant="secondary"
          />
        </Answer>
      </Top>
      <Bottom>
        <PrimaryButton title="완료" bgColor={secondaryColor} />
      </Bottom>
    </Container>
  );
}
