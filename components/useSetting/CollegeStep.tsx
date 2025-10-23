import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import BrandTextField from "../input/BrandTextField";
import type { CollegeStepProps } from "./types";

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

export default function CollegeStep({
  data,
  onDataChange,
  onValidationChange,
}: CollegeStepProps) {
  // 로컬 상태로 입력값 관리 (한글 조합 문제 해결)
  const [inputValue, setInputValue] = useState(
    `${data.universityName} ${data.major_name}`.trim()
  );

  // 디바운싱을 위한 useEffect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      processCollegeInput(inputValue);
    }, 300); // 300ms 디바운싱

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  // 초기값 설정
  useEffect(() => {
    const initialValue = `${data.universityName} ${data.major_name}`.trim();
    if (initialValue !== inputValue) {
      setInputValue(initialValue);
    }
  }, [data.universityName, data.major_name]);

  const processCollegeInput = (college: string) => {
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

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <Container>
      <Question>학생의 대학교/전공을{"\n"}알려주세요.</Question>
      <Answer>
        <BrandTextField
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="예) 서울대학교 컴퓨터공학과"
          autoCapitalize="none"
          returnKeyType="done"
        />
      </Answer>
    </Container>
  );
}
