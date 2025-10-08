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

interface AdditionalStepProps {
  data: UserSettingData;
  onDataChange: (data: Partial<UserSettingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function AdditionalStep({
  data,
  onDataChange,
  onValidationChange,
}: AdditionalStepProps) {
  const handleSmokingChange = (smoking: string) => {
    onDataChange({ smoking });
    onValidationChange(true); // 항상 유효 (기본값이 있음)
  };

  const handlePrivateGatheringChange = (privateGathering: string) => {
    onDataChange({ privateGathering });
    onValidationChange(true); // 항상 유효 (기본값이 있음)
  };

  return (
    <Container>
      <Question>서로에게 배려가{"\n"}필요한 항목이에요.</Question>
      <Answer>
        <StylePickButton
          value={data.smoking}
          onChange={handleSmokingChange}
          options={["흡연자", "비흡연자"]}
          gap={12}
          horizontalPadding={15}
          selectedColorVariant="primary"
        />
        <StylePickButton
          value={data.privateGathering}
          onChange={handlePrivateGatheringChange}
          options={["회식 등 팀 모임 선호", "칼퇴 선호"]}
          gap={12}
          horizontalPadding={15}
          selectedColorVariant="secondary"
        />
      </Answer>
    </Container>
  );
}
