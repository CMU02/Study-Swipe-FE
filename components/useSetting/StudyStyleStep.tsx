import React from "react";
import styled from "styled-components/native";
import StylePickButton from "../button/StylePickButton";
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
  gap: 20px;
`;

interface StudyStyleStepProps {
  data: UserSettingData;
  onDataChange: (data: Partial<UserSettingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function StudyStyleStep({
  data,
  onDataChange,
  onValidationChange,
}: StudyStyleStepProps) {
  const handlePeopleNumberChange = (peopleNumber: string) => {
    onDataChange({ peopleNumber });
    onValidationChange(true); // 항상 유효 (기본값이 있음)
  };

  const handleStudyStyleChange = (studyStyle: string) => {
    onDataChange({ studyStyle });
    onValidationChange(true); // 항상 유효 (기본값이 있음)
  };

  return (
    <Container>
      <Question>스터디 스타일이{"\n"}어떻게 되나요?</Question>
      <Answer>
        <StylePickButton
          value={data.peopleNumber}
          onChange={handlePeopleNumberChange}
          options={["1~2인", "2~3인", "3~4인", "4인 이상"]}
          gap={10}
          horizontalPadding={12}
          selectedColorVariant="primary"
        />
        <StylePickButton
          value={data.studyStyle}
          onChange={handleStudyStyleChange}
          options={["멘토", "피어", "러너"]}
          gap={10}
          horizontalPadding={30}
          selectedColorVariant="secondary"
        />
      </Answer>
    </Container>
  );
}
