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
    // 대학교와 전공을 분리
    const trimmedCollege = college.trim();

    // "대학교"를 기준으로 분리
    const universityIndex = trimmedCollege.indexOf("대학교");

    let universityName = "";
    let major_name = "";

    if (universityIndex !== -1) {
      // "대학교"가 포함된 경우
      universityName = trimmedCollege.substring(0, universityIndex + 3).trim(); // "대학교"까지 포함
      major_name = trimmedCollege.substring(universityIndex + 3).trim(); // "대학교" 이후 부분
    } else {
      // "대학교"가 없는 경우 전체를 대학교명으로 처리
      universityName = trimmedCollege;
      major_name = "";
    }

    onDataChange({
      universityName,
      major_name,
    });

    const hasUniversity =
      universityName.includes("대학교") || universityName.length > 0;
    onValidationChange(hasUniversity);
  };

  return (
    <Container>
      <Question>학생의 대학교/전공을{"\n"}알려주세요.</Question>
      <Answer>
        <BrandTextField
          value={`${data.universityName} ${data.major_name}`.trim()}
          onChangeText={handleCollegeChange}
          placeholder="예) 서울대학교 컴퓨터공학과"
          autoCapitalize="none"
          returnKeyType="done"
        />
      </Answer>
    </Container>
  );
}
