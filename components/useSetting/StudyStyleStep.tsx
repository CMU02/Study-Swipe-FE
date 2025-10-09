import React from "react";
import styled from "styled-components/native";
import StylePickButton from "../button/StylePickButton";
import type { UserSettingData, StudyStyleStepProps } from "./types";

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

export default function StudyStyleStep({
  data,
  onDataChange,
  onValidationChange,
}: StudyStyleStepProps) {
  // 컴포넌트 마운트 시 기본값이 있으면 유효성 검사 통과
  React.useEffect(() => {
    const hasValidValues =
      data.min_member_count > 0 &&
      data.max_member_count > 0 &&
      data.collab_style_id > 0;
    onValidationChange(hasValidValues);
  }, [
    data.min_member_count,
    data.max_member_count,
    data.collab_style_id,
    onValidationChange,
  ]);

  const handlePeopleNumberChange = (peopleNumber: string) => {
    // 인원수 문자열을 min/max로 변환
    let min_member_count = 1;
    let max_member_count = 2;

    switch (peopleNumber) {
      case "1~2인":
        min_member_count = 1;
        max_member_count = 2;
        break;
      case "2~3인":
        min_member_count = 2;
        max_member_count = 3;
        break;
      case "3~4인":
        min_member_count = 3;
        max_member_count = 4;
        break;
      case "4인 이상":
        min_member_count = 4;
        max_member_count = 10; // 최대값 설정
        break;
    }

    onDataChange({ min_member_count, max_member_count });
    onValidationChange(true);
  };

  const handleStudyStyleChange = (studyStyle: string) => {
    // 스터디 스타일을 ID로 변환
    let collab_style_id = 1;

    switch (studyStyle) {
      case "멘토":
        collab_style_id = 1;
        break;
      case "피어":
        collab_style_id = 2;
        break;
      case "러너":
        collab_style_id = 3;
        break;
    }

    onDataChange({ collab_style_id });
    onValidationChange(true);
  };

  // 현재 값을 표시용으로 변환
  const getCurrentPeopleNumber = () => {
    const { min_member_count, max_member_count } = data;
    if (min_member_count === 1 && max_member_count === 2) return "1~2인";
    if (min_member_count === 2 && max_member_count === 3) return "2~3인";
    if (min_member_count === 3 && max_member_count === 4) return "3~4인";
    if (min_member_count === 4 && max_member_count >= 10) return "4인 이상";
    return "1~2인"; // 기본값
  };

  const getCurrentStudyStyle = () => {
    const { collab_style_id } = data;
    switch (collab_style_id) {
      case 1:
        return "멘토";
      case 2:
        return "피어";
      case 3:
        return "러너";
      default:
        return "멘토"; // 기본값
    }
  };

  return (
    <Container>
      <Question>스터디 스타일이{"\n"}어떻게 되나요?</Question>
      <Answer>
        <StylePickButton
          value={getCurrentPeopleNumber()}
          onChange={handlePeopleNumberChange}
          options={["1~2인", "2~3인", "3~4인", "4인 이상"]}
          gap={10}
          horizontalPadding={12}
          selectedColorVariant="primary"
        />
        <StylePickButton
          value={getCurrentStudyStyle()}
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
