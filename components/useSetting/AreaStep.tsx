import React from "react";
import styled from "styled-components/native";
import Select from "../input/Select";
import { UserSettingData } from "./NameStep";
import { textColor } from "../../styles/Color";

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

const SubQuestion = styled.Text`
  font-size: 20px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
`;

const Answer = styled.View`
  flex-direction: row;
  align-self: stretch;
  gap: 12px;
`;

interface AreaStepProps {
  data: UserSettingData;
  onDataChange: (data: Partial<UserSettingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function AreaStep({
  data,
  onDataChange,
  onValidationChange,
}: AreaStepProps) {
  const handleArea1Change = (area1: string) => {
    onDataChange({ userArea_1: area1 as "서울특별시" | "경기도" });
    onValidationChange(!!area1 && !!data.userArea_2);
  };

  const handleArea2Change = (area2: string) => {
    onDataChange({ userArea_2: area2 });
    onValidationChange(!!data.userArea_1 && !!area2);
  };

  return (
    <Container>
      <Question>
        스터디의 선호지역을 {"\n"}알려주세요.{" "}
        <SubQuestion>(도/시/구)</SubQuestion>
      </Question>
      <Answer>
        <Select
          value={data.userArea_1}
          onChange={handleArea1Change}
          placeholder="시/도"
          options={["서울특별시", "경기도"]}
          width={160}
        />
        <Select
          value={data.userArea_2}
          onChange={handleArea2Change}
          placeholder="시/구"
          options={["안양시", "군포시"]}
          width={160}
        />
      </Answer>
    </Container>
  );
}
