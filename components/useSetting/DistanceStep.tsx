import React from "react";
import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { UserSettingData } from "./NameStep";
import { unClickColor, secondaryColor, textColor } from "../../styles/Color";

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

const SliderWrap = styled.View`
  align-self: stretch;
`;

const ValueRow = styled.View`
  align-items: flex-end;
  margin-bottom: 5px;
`;

const ValueText = styled.Text`
  font-size: 16px;
  font-family: Paperlogy-SemiBold;
  color: ${secondaryColor};
`;

interface DistanceStepProps {
  data: UserSettingData;
  onDataChange: (data: Partial<UserSettingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function DistanceStep({
  data,
  onDataChange,
  onValidationChange,
}: DistanceStepProps) {
  const minKm = 1;
  const maxKm = 50;

  // 컴포넌트 마운트 시 기본값이 있으면 유효성 검사 통과
  React.useEffect(() => {
    const hasValidDistance =
      data.activity_radius_km >= minKm && data.activity_radius_km <= maxKm;
    onValidationChange(hasValidDistance);
  }, [data.activity_radius_km, onValidationChange]);

  const handleDistanceChange = (distance: number) => {
    onDataChange({ activity_radius_km: distance });
    onValidationChange(true); // 거리는 항상 유효
  };

  return (
    <Container>
      <Question>스터디하러 다니기 좋은{"\n"}거리를 설정해주세요.</Question>
      <Answer>
        <SliderWrap>
          <ValueRow>
            <ValueText>
              {data.activity_radius_km}/{maxKm}km
            </ValueText>
          </ValueRow>
          <Slider
            value={data.activity_radius_km}
            minimumValue={minKm}
            maximumValue={maxKm}
            step={1}
            minimumTrackTintColor={textColor}
            maximumTrackTintColor={unClickColor}
            thumbTintColor={textColor}
            onValueChange={handleDistanceChange}
          />
        </SliderWrap>
      </Answer>
    </Container>
  );
}
