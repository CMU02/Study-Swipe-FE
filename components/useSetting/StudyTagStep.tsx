import React from "react";
import styled from "styled-components/native";
import BrandTextField from "../input/BrandTextField";
import { UserSettingData } from "./NameStep";
import { clickColor } from "../../styles/Color";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 0 14px;
`;

const Question = styled.Text`
  font-size: 35px;
  font-family: Paperlogy-SemiBold;
  margin-bottom: 5px;
  align-self: stretch;
`;

const SubQuestion = styled.Text`
  font-size: 15px;
  font-family: Paperlogy-SemiBold;
  color: ${clickColor};
  margin-bottom: 20px;
  align-self: stretch;
`;

const Answer = styled.View`
  flex: 1;
  align-items: center;
  align-self: stretch;
  gap: 10px;
`;

interface StudyTagStepProps {
  data: UserSettingData;
  onDataChange: (data: Partial<UserSettingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function StudyTagStep({
  data,
  onDataChange,
  onValidationChange,
}: StudyTagStepProps) {
  const handleTagChange = (tagIndex: number, value: string) => {
    const updatedTags = [...(data.studyTags || ["", "", "", "", ""])];
    updatedTags[tagIndex] = value;
    onDataChange({ studyTags: updatedTags });

    // 모든 태그가 입력되었는지 확인
    const areTagsValid = updatedTags.every((tag) => tag.trim().length > 0);
    onValidationChange(areTagsValid);
  };

  const tags = data.studyTags || ["", "", "", "", ""];

  return (
    <Container>
      <Question>스터디하고 싶은 과목의{"\n"}태그를 설정해주세요.</Question>
      <SubQuestion>
        총 5개까지 설정 가능하며 우선 순위대로 입력하여주세요!
      </SubQuestion>
      <Answer>
        <BrandTextField
          value={tags[0]}
          onChangeText={(value) => handleTagChange(0, value)}
          placeholder="① 예) 정보처리기능사"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <BrandTextField
          value={tags[1]}
          onChangeText={(value) => handleTagChange(1, value)}
          placeholder="② 예) 리눅스"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <BrandTextField
          value={tags[2]}
          onChangeText={(value) => handleTagChange(2, value)}
          placeholder="③ 예) 서버 구축"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <BrandTextField
          value={tags[3]}
          onChangeText={(value) => handleTagChange(3, value)}
          placeholder="④ 예) 자바"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <BrandTextField
          value={tags[4]}
          onChangeText={(value) => handleTagChange(4, value)}
          placeholder="⑤ 예) 백엔드"
          autoCapitalize="none"
          returnKeyType="done"
        />
      </Answer>
    </Container>
  );
}
