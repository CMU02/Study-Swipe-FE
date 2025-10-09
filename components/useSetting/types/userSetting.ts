/* 사용자 설정 관련 타입 정의 */

/** 사용자 설정 데이터 */
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

/** 기본 Step 컴포넌트 Props */
export interface BaseStepProps {
  data: UserSettingData;
  onDataChange: (data: Partial<UserSettingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

/** 이름 단계 Props */
export interface NameStepProps extends BaseStepProps {}

/** 생년월일 단계 Props */
export interface BirthStepProps extends BaseStepProps {}

/** 대학교 단계 Props */
export interface CollegeStepProps extends BaseStepProps {}

/** 지역 단계 Props */
export interface AreaStepProps extends BaseStepProps {}

/** 거리 단계 Props */
export interface DistanceStepProps extends BaseStepProps {}

/** 목표 단계 Props */
export interface GoalStepProps extends BaseStepProps {}

/** 스터디 태그 단계 Props */
export interface StudyTagStepProps extends BaseStepProps {}

/** 스터디 스타일 단계 Props */
export interface StudyStyleStepProps extends BaseStepProps {}

/** 추가 설정 단계 Props */
export interface AdditionalStepProps extends BaseStepProps {}

/** 기간 단계 Props */
export interface PeriodStepProps extends BaseStepProps {}

/** 설문조사 단계 Props */
export interface SurveyStepProps extends BaseStepProps {}
