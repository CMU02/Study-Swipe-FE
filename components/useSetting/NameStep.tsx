import React from "react";
import styled from "styled-components/native";
import BrandTextField from "../input/BrandTextField";
import GenderSelect from "../input/Select";

export interface UserSettingData {
  userName: string;
  userGender: "남" | "여" | "기타" | "";
  college: string;
  userArea_1: "서울특별시" | "경기도" | "";
  userArea_2: string;
  distance: number;
  goal: string;
  studyTags: string[];
  surveyAnswers: { [key: number]: number };
  peopleNumber: string;
  studyStyle: string;
  smoking: string;
  privateGathering: string;
}

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
  flex-direction: row;
  align-items: center;
  align-self: stretch;
`;

const NameFieldBox = styled.View`
  flex: 1;
  margin-right: 8px;
`;

interface NameStepProps {
  data: UserSettingData;
  onDataChange: (data: Partial<UserSettingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function NameStep({
  data,
  onDataChange,
  onValidationChange,
}: NameStepProps) {
  const handleNameChange = (name: string) => {
    onDataChange({ userName: name });
    validateInput(name, data.userGender);
  };

  const handleGenderChange = (gender: string) => {
    onDataChange({ userGender: gender as "남" | "여" | "기타" });
    validateInput(data.userName, gender);
  };

  const validateInput = (name: string, gender: string) => {
    const validName = /^[가-힣]{2,}$/.test(name.trim());
    const validGender = ["남", "여", "기타"].includes(gender);
    onValidationChange(validName && validGender);
  };

  return (
    <Container>
      <Question>학생의 이름과 성별을{"\n"}알려주세요.</Question>
      <Answer>
        <NameFieldBox>
          <BrandTextField
            value={data.userName}
            onChangeText={handleNameChange}
            placeholder="예) 홍길동"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </NameFieldBox>
        <GenderSelect
          value={data.userGender}
          onChange={handleGenderChange}
          placeholder="성별 선택"
          options={["남", "여", "기타"]}
          width={120}
        />
      </Answer>
    </Container>
  );
}
