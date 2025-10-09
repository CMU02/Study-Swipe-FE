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
  React.useEffect(() => {
    const hasValidValues = data.smoking_status_name && data.social_pref_name;
    onValidationChange(!!hasValidValues);
  }, [data.smoking_status_name, data.social_pref_name, onValidationChange]);

  const handleSmokingChange = (smoking: string) => {
    onDataChange({ smoking_status_name: smoking });
    onValidationChange(true);
  };

  // API 값을 UI 표시용 값으로 변환
  const getDisplaySocialPref = () => {
    switch (data.social_pref_name) {
      case "네":
        return "회식 등 팀 모임 선호";
      case "아니오":
        return "칼퇴 선호";
      default:
        return "회식 등 팀 모임 선호"; // 기본값
    }
  };

  const handlePrivateGatheringChange = (privateGathering: string) => {
    // UI 표시용 값을 API 전송용 값으로 변환
    let apiValue = "네";

    switch (privateGathering) {
      case "회식 등 팀 모임 선호":
        apiValue = "네";
        break;
      case "칼퇴 선호":
        apiValue = "아니오";
        break;
      default:
        apiValue = "네";
    }

    onDataChange({ social_pref_name: apiValue });
    onValidationChange(true);
  };

  return (
    <Container>
      <Question>서로에게 배려가{"\n"}필요한 항목이에요.</Question>
      <Answer>
        <StylePickButton
          value={data.smoking_status_name}
          onChange={handleSmokingChange}
          options={["흡연", "비흡연"]}
          gap={12}
          horizontalPadding={15}
          selectedColorVariant="primary"
        />
        <StylePickButton
          value={getDisplaySocialPref()}
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
