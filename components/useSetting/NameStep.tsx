import React from "react";
import styled from "styled-components/native";
import BrandTextField from "../input/BrandTextField";
import GenderSelect from "../input/Select";

export interface UserSettingData {
  // 프로필 생성용 데이터
  display_name: string; // userName -> display_name
  gender: "남" | "여" | ""; // userGender -> gender
  birth_date: string; // 생년월일 (빈값이면 null)
  bio_note: string; // goal -> bio_note
  age: number; // 나이 (빈값이면 null)
  image: string; // 프로필 이미지 (빈값이면 null)

  // 대학교/전공 데이터
  universityName: string; // college -> universityName
  major_name: string; // 전공명 (college에서 파싱)

  // 활동 반경
  activity_radius_km: number; // distance -> activity_radius_km

  // 학습 목표
  goals_note: string; // goal -> goals_note

  // 스터디 태그
  study_tags: Array<{
    tag_name: string;
    priority: number;
  }>; // studyTags -> study_tags with priority

  // 설문 관련
  questions?: Array<{
    tag: string;
    questions: Array<{
      no: number;
      level: string;
      text: string;
    }>;
  }>;
  surveyAnswers: { [key: number]: number };

  // 스터디 스타일
  min_member_count: number; // peopleNumber에서 파싱
  max_member_count: number; // peopleNumber에서 파싱
  collab_style_id: number; // studyStyle -> collab_style_id (1: 멘토, 2: 피어, 3: 러너)

  // 추가 설정
  smoking_status_name: string; // smoking -> smoking_status_name
  social_pref_name: string; // privateGathering -> social_pref_name

  // 시간/기간 설정
  start_time?: string; // 선호 시작 시간
  end_time?: string; // 선호 종료 시간
  weekly_frequency?: string; // 주 몇 회
  duration_months?: string; // 몇 개월 진행

  // 지역 정보 (임시로 유지)
  userArea_1: "서울특별시" | "경기도" | "";
  userArea_2: string;
  regionId?: string; // 선택된 지역의 ID
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
    onDataChange({ display_name: name });
    validateInput(name, data.gender);
  };

  const handleGenderChange = (gender: string) => {
    onDataChange({ gender: gender as "남" | "여" });
    validateInput(data.display_name, gender);
  };

  const validateInput = (name: string, gender: string) => {
    const validName = /^[가-힣]{2,}$/.test(name.trim());
    const validGender = ["남", "여"].includes(gender);
    onValidationChange(validName && validGender);
  };

  return (
    <Container>
      <Question>학생의 이름과 성별을{"\n"}알려주세요.</Question>
      <Answer>
        <NameFieldBox>
          <BrandTextField
            value={data.display_name}
            onChangeText={handleNameChange}
            placeholder="예) 홍길동"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </NameFieldBox>
        <GenderSelect
          value={data.gender}
          onChange={handleGenderChange}
          placeholder="성별 선택"
          options={["남", "여"]}
          width={120}
        />
      </Answer>
    </Container>
  );
}
