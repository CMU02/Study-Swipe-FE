import React from "react";
import styled from "styled-components/native";
import BrandTextField from "../input/BrandTextField";
import { UserSettingData } from "./NameStep";

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

interface CollegeStepProps {
  data: UserSettingData;
  onDataChange: (data: Partial<UserSettingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function CollegeStep({
  data,
  onDataChange,
  onValidationChange,
}: CollegeStepProps) {
  const handleCollegeChange = (college: string) => {
    onDataChange({ college });
    const hasUniversity = college.includes("대학교");
    onValidationChange(hasUniversity);
  };

  return (
    <Container>
      <Question>학생의 대학교/전공을{"\n"}알려주세요.</Question>
      <Answer>
        <BrandTextField
          value={data.college}
          onChangeText={handleCollegeChange}
          placeholder="예) 서울대학교 컴퓨터공학과"
          autoCapitalize="none"
          returnKeyType="done"
        />
      </Answer>
    </Container>
  );
}
