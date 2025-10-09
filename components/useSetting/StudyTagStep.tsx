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
    const currentTags = data.study_tags || [];
    const updatedTags = [...currentTags];

    // 해당 인덱스의 태그 업데이트 또는 추가
    updatedTags[tagIndex] = {
      tag_name: value,
      priority: tagIndex + 1,
    };

    // 빈 태그 제거하고 우선순위 재정렬
    const filteredTags = updatedTags
      .filter((tag) => tag.tag_name.trim().length > 0)
      .map((tag, index) => ({
        tag_name: tag.tag_name,
        priority: index + 1,
      }));

    onDataChange({ study_tags: filteredTags });

    // 모든 태그가 입력되었는지 확인 (최소 1개 이상)
    const areTagsValid = filteredTags.length > 0;
    onValidationChange(areTagsValid);
  };

  // 표시용 태그 배열 생성
  const displayTags = ["", "", "", "", ""];
  data.study_tags?.forEach((tag, index) => {
    if (index < 5) {
      displayTags[index] = tag.tag_name;
    }
  });

  return (
    <Container>
      <Question>스터디하고 싶은 과목의{"\n"}태그를 설정해주세요.</Question>
      <SubQuestion>
        총 5개까지 설정 가능하며 우선 순위대로 입력하여주세요!
      </SubQuestion>
      <Answer>
        <BrandTextField
          value={displayTags[0]}
          onChangeText={(value) => handleTagChange(0, value)}
          placeholder="① 예) 정보처리기능사"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <BrandTextField
          value={displayTags[1]}
          onChangeText={(value) => handleTagChange(1, value)}
          placeholder="② 예) 리눅스"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <BrandTextField
          value={displayTags[2]}
          onChangeText={(value) => handleTagChange(2, value)}
          placeholder="③ 예) 서버 구축"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <BrandTextField
          value={displayTags[3]}
          onChangeText={(value) => handleTagChange(3, value)}
          placeholder="④ 예) 자바"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <BrandTextField
          value={displayTags[4]}
          onChangeText={(value) => handleTagChange(4, value)}
          placeholder="⑤ 예) 백엔드"
          autoCapitalize="none"
          returnKeyType="done"
        />
      </Answer>
    </Container>
  );
}
