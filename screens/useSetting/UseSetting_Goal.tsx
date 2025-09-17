import { useState } from "react";
import BrandTextField from "../../components/input/BrandTextField";
import styled from "styled-components/native";
import PrimaryButton from "../../components/button/PrimaryButton";
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
  flex-direction: row;
  align-items: center;
  align-self: stretch;
`;

export default function UseSetting_Goal() {
  // 목표에 대한 값 저장
  const [goal, setGoal] = useState<string>("");
  // 빈 값인지 체크하는 함수
  const isGoalEmpty = () => {
    return goal.trim().length === 0;
  };

  return (
    <Container>
      <Top>
        <Question>스터디의 목적이{"\n"}무엇인가요?</Question>
        <Answer>
          <BrandTextField
            value={goal}
            onChangeText={setGoal}
            placeholder="예) 자격증 공부, 전공 공부 등"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </Answer>
      </Top>
      <Bottom>
        <PrimaryButton
          title="다음"
          bgColor={clickColor}
          disabled={isGoalEmpty()}
        />
      </Bottom>
    </Container>
  );
}
