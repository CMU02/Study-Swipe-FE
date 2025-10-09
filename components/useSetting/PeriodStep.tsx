import React from "react";
import styled from "styled-components/native";
import BrandTextField from "../input/BrandTextField";
import type { UserSettingData, PeriodStepProps } from "./types";

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
  flex: 1;
  align-items: center;
  align-self: stretch;
  gap: 10px;
`;

export default function PeriodStep({
  data,
  onDataChange,
  onValidationChange,
}: PeriodStepProps) {
  // 시간을 "HH:MM" 형식으로 변환하는 함수
  const formatTime = (timeValue: string) => {
    const hour = Number(timeValue);
    if (isNaN(hour) || hour < 0 || hour > 24) return "";
    return `${hour.toString().padStart(2, "0")}:00`;
  };

  const handleStartTimeChange = (value: string) => {
    const formattedTime = formatTime(value);
    onDataChange({ start_time: formattedTime });
    validateInput({ ...data, start_time: formattedTime });
  };

  const handleEndTimeChange = (value: string) => {
    const formattedTime = formatTime(value);
    onDataChange({ end_time: formattedTime });
    validateInput({ ...data, end_time: formattedTime });
  };

  const handleWeekChange = (value: string) => {
    onDataChange({ weekly_frequency: value });
    validateInput({ ...data, weekly_frequency: value });
  };

  const handleMonthChange = (value: string) => {
    onDataChange({ duration_months: value });
    validateInput({ ...data, duration_months: value });
  };

  const validateInput = (updatedData: UserSettingData) => {
    // 시간 검증 - "HH:MM" 형식에서 시간 추출
    const startHour = updatedData.start_time
      ? Number(updatedData.start_time.split(":")[0])
      : NaN;
    const endHour = updatedData.end_time
      ? Number(updatedData.end_time.split(":")[0])
      : NaN;
    const sPeriod = Number(updatedData.weekly_frequency);
    const ePeriod = Number(updatedData.duration_months);

    const validTime =
      !isNaN(startHour) &&
      !isNaN(endHour) &&
      startHour >= 0 &&
      startHour <= 24 &&
      endHour >= 0 &&
      endHour <= 24 &&
      startHour < endHour;

    const validPeriod =
      !isNaN(sPeriod) &&
      !isNaN(ePeriod) &&
      sPeriod >= 1 &&
      sPeriod <= 7 &&
      ePeriod >= 1 &&
      ePeriod <= 12;

    onValidationChange(validTime && validPeriod);
  };

  // 표시용 시간 값 (사용자가 입력한 시간만 표시)
  const getDisplayTime = (timeString: string) => {
    if (!timeString) return "";
    return timeString.split(":")[0];
  };

  return (
    <Container>
      <Question>스터디를 선호하는{"\n"}시간, 기간을 설정해주세요.</Question>
      <Answer>
        <BrandTextField
          value={getDisplayTime(data.start_time || "")}
          onChangeText={handleStartTimeChange}
          placeholder="시작 시간 (예: 9)"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="numeric"
        />
        <BrandTextField
          value={getDisplayTime(data.end_time || "")}
          onChangeText={handleEndTimeChange}
          placeholder="종료 시간 (예: 18)"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="numeric"
        />
        <BrandTextField
          value={data.weekly_frequency || ""}
          onChangeText={handleWeekChange}
          placeholder="주 몇 회 (예: 3)"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="numeric"
        />
        <BrandTextField
          value={data.duration_months || ""}
          onChangeText={handleMonthChange}
          placeholder="몇 개월 (예: 8)"
          autoCapitalize="none"
          returnKeyType="done"
          keyboardType="numeric"
        />
      </Answer>
    </Container>
  );
}
