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

interface BirthStepProps {
  data: UserSettingData;
  onDataChange: (data: Partial<UserSettingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function BirthStep({
  data,
  onDataChange,
  onValidationChange,
}: BirthStepProps) {
  // 현재 년도에서 사용자가 입력한 년도를 빼서 계산하는 나이
  const calculateAge = (birthDateString: string) => {
    if (birthDateString.length === 8) {
      const birthYear = parseInt(birthDateString.substring(0, 4));
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - birthYear;
      return calculatedAge;
    }
    return 0;
  };

  const handleBirthDateChange = (value: string) => {
    const calculatedAge = calculateAge(value);

    onDataChange({
      birth_date: value,
      age: calculatedAge,
    });

    // 8자리 숫자이고 유효한 나이인지 확인
    const isValid =
      value.length === 8 &&
      !isNaN(Number(value)) &&
      calculatedAge > 0 &&
      calculatedAge < 100;

    onValidationChange(isValid);
  };

  return (
    <Container>
      <Question>학생의 생년월일을{"\n"}알려주세요.</Question>
      <Answer>
        <BrandTextField
          value={data.birth_date}
          onChangeText={handleBirthDateChange}
          placeholder="예) 20020101"
          autoCapitalize="none"
          returnKeyType="done"
          keyboardType="numeric"
        />
      </Answer>
    </Container>
  );
}
