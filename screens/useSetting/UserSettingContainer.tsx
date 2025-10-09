import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";
import ProgressBar from "../../components/ProgressBar";
import PrimaryButton from "../../components/button/PrimaryButton";
import { clickColor, secondaryColor } from "../../styles/Color";
import {
  makeQuestions,
  createStudyTags,
  completeSurvey,
  createProfile,
  addUniversity,
  updateMajor,
  updateActivityRadius,
  updateGoalsNote,
  updateSmokingStatus,
  updateSocialPref,
  updatePreferredMemberCount,
  updateCollabStyle,
  updateParticipationInfo,
  updateRegion,
} from "../../api";
import type {
  MakeQuestionsRequest,
  CompleteSurveyRequest,
} from "../../api/types";
import { getAuthToken } from "../../utils/auth";

import NameStep from "../../components/useSetting/NameStep";
import type { UserSettingData } from "../../components/useSetting/types";
import BirthStep from "../../components/useSetting/BirthStep";
import CollegeStep from "../../components/useSetting/CollegeStep";
import AreaStep from "../../components/useSetting/AreaStep";
import DistanceStep from "../../components/useSetting/DistanceStep";
import GoalStep from "../../components/useSetting/GoalStep";
import PeriodStep from "../../components/useSetting/PeriodStep";
import StudyTagStep from "../../components/useSetting/StudyTagStep";
import SurveyStep from "../../components/useSetting/SurveyStep";
import StudyStyleStep from "../../components/useSetting/StudyStyleStep";
import AdditionalStep from "../../components/useSetting/AdditionalStep";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const Bottom = styled.View`
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 50px;
  padding: 0 14px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  width: 100%;
`;

const BackButtonContainer = styled.View`
  flex: 1;
`;

const NextButtonContainer = styled.View`
  flex: 2;
`;

const TOTAL_STEPS = 11;

export default function UserSettingContainer() {
  const navigation = useNavigation<NativeStackNavigationProp<StackList>>();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userSettingData, setUserSettingData] = useState<UserSettingData>({
    // 프로필 생성용 데이터
    display_name: "",
    gender: "",
    birth_date: "",
    bio_note: "",
    age: 0,
    image: "",

    // 대학교/전공 데이터
    universityName: "",
    major_name: "",

    // 활동 반경
    activity_radius_km: 25,

    // 학습 목표
    goals_note: "",

    // 스터디 태그
    study_tags: [],

    // 설문 관련
    questions: [],
    surveyAnswers: {},

    // 스터디 스타일
    min_member_count: 1,
    max_member_count: 2,
    collab_style_id: 1,

    // 추가 설정
    smoking_status_name: "흡연",
    social_pref_name: "네", // API 형식으로 저장

    // 시간/기간 설정
    start_time: "",
    end_time: "",
    weekly_frequency: "",
    duration_months: "",

    // 지역 정보 (임시로 유지)
    userArea_1: "",
    userArea_2: "",
    regionId: "",
  });

  const handleDataChange = (newData: Partial<UserSettingData>) => {
    setUserSettingData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = async () => {
    // StudyTagStep에서 SurveyStep으로 넘어갈 때 질문 생성
    if (currentStep === 8) {
      await generateQuestionsForSurvey();
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      setIsCurrentStepValid(false);
    } else {
      // 완료 처리 - 모든 API 호출
      await submitAllData();
    }
  };

  const generateQuestionsForSurvey = async () => {
    const filledTags = userSettingData.study_tags
      .filter((tag) => tag.tag_name.trim().length > 0)
      .map((tag) => tag.tag_name);

    if (filledTags.length === 0) {
      Alert.alert("알림", "최소 하나의 태그를 입력해주세요.");
      return;
    }

    setIsLoadingQuestions(true);

    try {
      const token = await getAuthToken();

      if (!token) {
        Alert.alert("오류", "인증 토큰이 없습니다. 다시 로그인해주세요.");
        return;
      }

      const requestData: MakeQuestionsRequest = {
        tags: filledTags,
      };

      const response = await makeQuestions(requestData, token);

      if (response.items && response.items.length > 0) {
        setUserSettingData((prev) => ({
          ...prev,
          questions: response.items,
          surveyAnswers: {}, // 새로운 질문이 생성되면 기존 답변 초기화
        }));
      }
    } catch (error) {
      console.error("질문 생성 실패:", error);
      Alert.alert("오류", "질문 생성에 실패했습니다. 다시 시도해주세요.");
      return;
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const submitAllData = async () => {
    setIsSubmitting(true);

    try {
      const token = await getAuthToken();

      if (!token) {
        Alert.alert("오류", "인증 토큰이 없습니다. 다시 로그인해주세요.");
        return;
      }

      // 프로필 생성
      await createProfile(
        {
          display_name: userSettingData.display_name || "",
          gender: userSettingData.gender || "",
          birth_date: userSettingData.birth_date || "",
          bio_note: userSettingData.bio_note || "",
          age: userSettingData.age || 0,
          image: userSettingData.image || "",
        },
        token
      );

      // 대학교 추가
      if (userSettingData.universityName) {
        await addUniversity(
          {
            universityName: userSettingData.universityName,
          },
          token
        );
      }

      // 전공 업데이트
      if (userSettingData.major_name) {
        await updateMajor(
          {
            major_name: userSettingData.major_name,
          },
          token
        );
      }

      // 활동 반경 업데이트
      await updateActivityRadius(
        {
          activity_radius_km: userSettingData.activity_radius_km,
        },
        token
      );

      // 지역 정보 업데이트
      if (userSettingData.regionId) {
        await updateRegion(
          {
            region_id: userSettingData.regionId,
          },
          token
        );
      }

      // 학습 목표 업데이트
      if (userSettingData.goals_note) {
        await updateGoalsNote(
          {
            goals_note: userSettingData.goals_note,
          },
          token
        );
      }

      // 스터디 태그 생성
      if (userSettingData.study_tags.length > 0) {
        await createStudyTags(
          {
            study_tags: userSettingData.study_tags,
          },
          token
        );
      }

      // 설문 완료 (답변이 있는 경우)
      if (Object.keys(userSettingData.surveyAnswers).length > 0) {
        await completeSurveyData();
      }

      // 참여 정보 업데이트 (시간/기간)
      if (
        userSettingData.start_time &&
        userSettingData.end_time &&
        userSettingData.weekly_frequency &&
        userSettingData.duration_months
      ) {
        // 기간을 단기/중기/장기로 변환
        const months = Number(userSettingData.duration_months);
        let period_length = "단기";
        if (months >= 6) {
          period_length = "장기";
        } else if (months >= 3) {
          period_length = "중기";
        }

        await updateParticipationInfo(
          {
            period: Number(userSettingData.weekly_frequency),
            period_length: period_length,
            start_time: userSettingData.start_time,
            end_time: userSettingData.end_time,
          },
          token
        );
      }

      // 흡연 상태 업데이트
      await updateSmokingStatus(
        {
          smoking_status_name: userSettingData.smoking_status_name,
        },
        token
      );

      // 사교모임 선호도 업데이트
      await updateSocialPref(
        {
          social_pref_name: userSettingData.social_pref_name,
        },
        token
      );

      // 선호 인원 수 업데이트
      await updatePreferredMemberCount(
        {
          min_member_count: userSettingData.min_member_count,
          max_member_count: userSettingData.max_member_count,
        },
        token
      );

      // 협업 성향 업데이트
      await updateCollabStyle(
        {
          collab_style_id: userSettingData.collab_style_id,
        },
        token
      );

      Alert.alert("완료", "환영합니다!", [
        {
          text: "확인",
          onPress: () => {
            // HomeScreen으로 이동
            navigation.navigate("Home");
          },
        },
      ]);
    } catch (error) {
      console.error("데이터 저장 실패:", error);
      Alert.alert("오류", "데이터 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeSurveyData = async () => {
    const { questions = [], surveyAnswers } = userSettingData;
    const token = await getAuthToken();

    if (!token) return;

    // 태그별로 답변을 그룹화
    const tagGroups: {
      [tag: string]: Array<{ no: number; level: string; value: number }>;
    } = {};

    questions.forEach((tagItem) => {
      tagItem.questions.forEach((question) => {
        const answer = surveyAnswers[question.no];
        if (answer !== undefined) {
          if (!tagGroups[tagItem.tag]) {
            tagGroups[tagItem.tag] = [];
          }
          tagGroups[tagItem.tag].push({
            no: question.no,
            level: question.level,
            value: answer,
          });
        }
      });
    });

    const answers = Object.keys(tagGroups).map((tag) => ({
      tag,
      questions: tagGroups[tag],
    }));

    const requestData: CompleteSurveyRequest = { answers };
    await completeSurvey(requestData, token);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setIsCurrentStepValid(true); // 이전 단계는 이미 완료된 상태
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      data: userSettingData,
      onDataChange: handleDataChange,
      onValidationChange: setIsCurrentStepValid,
    };

    switch (currentStep) {
      case 1:
        return <NameStep {...stepProps} />;
      case 2:
        return <BirthStep {...stepProps} />;
      case 3:
        return <CollegeStep {...stepProps} />;
      case 4:
        return <AreaStep {...stepProps} />;
      case 5:
        return <DistanceStep {...stepProps} />;
      case 6:
        return <GoalStep {...stepProps} />;
      case 7:
        return <PeriodStep {...stepProps} />;
      case 8:
        return <StudyTagStep {...stepProps} />;
      case 9:
        return <SurveyStep {...stepProps} />;
      case 10:
        return <StudyStyleStep {...stepProps} />;
      case 11:
        return <AdditionalStep {...stepProps} />;
      default:
        return <NameStep {...stepProps} />;
    }
  };

  const getButtonTitle = () => {
    if (currentStep === TOTAL_STEPS) {
      return isSubmitting ? "완료하는 중..." : "완료";
    }
    return isLoadingQuestions ? "질문 생성 중..." : "다음";
  };

  const getButtonColor = () => {
    return currentStep === TOTAL_STEPS ? secondaryColor : clickColor;
  };

  // ProgressBar에 표시될 진행상항
  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "이름 및 성별 설정";
      case 2:
        return "생년월일 설정";
      case 3:
        return "대학교/전공 설정";
      case 4:
        return "선호지역 설정";
      case 5:
        return "거리 설정";
      case 6:
        return "스터디 목적 설정";
      case 7:
        return "시간/기간 설정";
      case 8:
        return "스터디 태그 설정";
      case 9:
        return "설문 조사";
      case 10:
        return "스터디 스타일 설정";
      case 11:
        return "추가 설정";
      default:
        return "이름 및 성별 설정";
    }
  };

  return (
    <Container>
      <ProgressBar
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        stepTitle={getStepTitle()}
      />

      <ContentContainer>{renderCurrentStep()}</ContentContainer>

      <Bottom>
        {currentStep > 1 ? (
          <ButtonContainer>
            <BackButtonContainer>
              <PrimaryButton
                title="이전"
                bgColor="#f0f0f0"
                textColor="#666"
                onPress={handlePrevious}
              />
            </BackButtonContainer>
            <NextButtonContainer>
              <PrimaryButton
                title={getButtonTitle()}
                bgColor={getButtonColor()}
                disabled={
                  !isCurrentStepValid || isLoadingQuestions || isSubmitting
                }
                onPress={handleNext}
              />
            </NextButtonContainer>
          </ButtonContainer>
        ) : (
          <PrimaryButton
            title={getButtonTitle()}
            bgColor={getButtonColor()}
            disabled={!isCurrentStepValid || isLoadingQuestions || isSubmitting}
            onPress={handleNext}
          />
        )}
      </Bottom>
    </Container>
  );
}
