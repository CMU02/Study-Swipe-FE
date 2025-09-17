import { useState } from "react";
import BrandTextField from "../../components/BrandTextField";
import styled from "styled-components/native";
import PrimaryButton from "../../components/PrimaryButton";
import { clickColor } from "../../styles/Color";

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
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [startPeriod, setStartPeriod] = useState<string>("");
  const [endPeriod, setEndPeriod] = useState<string>("");

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
            value={startTime}
            onChangeText={setStartTime}
            placeholder="스터디를 마무리하기를 선호하는 시간을 입력해주세요."
            autoCapitalize="none"
            returnKeyType="next"
          />
          <BrandTextField
            value={startTime}
            onChangeText={setStartTime}
            placeholder="주에 몇 회 진행하는 것을 선호하시나요?"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <BrandTextField
            value={startTime}
            onChangeText={setStartTime}
            placeholder="입력하신 횟수를 몇 개월 진행하시는 것을 선호하시나요?"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </Answer>
      </Top>
      <Bottom>
        <PrimaryButton title="다음" bgColor={clickColor} />
      </Bottom>
    </Container>
  );
}
