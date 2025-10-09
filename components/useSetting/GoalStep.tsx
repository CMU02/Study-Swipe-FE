import React from "react";
import styled from "styled-components/native";
import BrandTextField from "../input/BrandTextField";
import type { UserSettingData, GoalStepProps } from "./types";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 0 14px;
`;

const Question = styled.Text`
  font-size: 35px;
  font-family: Paperlogy-SemiBold;
  margin-bottom: 40px;
  align-self: stretch;
`;

const Answer = styled.View`
  align-self: stretch;
`;

export default function GoalStep({
  data,
  onDataChange,
  onValidationChange,
}: GoalStepProps) {
  const handleGoalChange = (goal: string) => {
    onDataChange({
      goals_note: goal,
      bio_note: goal, // 프로필 생성용으로도 사용
    });
    const isGoalEmpty = goal.trim().length === 0;
    onValidationChange(!isGoalEmpty);
  };

  return (
    <Container>
      <Question>스터디의 목적이{"\n"}무엇인가요?</Question>
      <Answer>
        <BrandTextField
          value={data.goals_note}
          onChangeText={handleGoalChange}
          placeholder="예) 자격증 공부, 전공 공부 등"
          autoCapitalize="none"
          returnKeyType="done"
        />
      </Answer>
    </Container>
  );
}
