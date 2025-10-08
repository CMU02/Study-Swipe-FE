import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import PrimaryButton from "../../components/button/PrimaryButton";
import { clickColor, secondaryColor } from "../../styles/Color";
import { makeQuestions, MakeQuestionsRequest } from "../../api/tag";
import { getAuthToken } from "../../utils/auth";

import NameStep, {
  UserSettingData,
} from "../../components/useSetting/NameStep";
import CollegeStep from "../../components/useSetting/CollegeStep";
import AreaStep from "../../components/useSetting/AreaStep";
import DistanceStep from "../../components/useSetting/DistanceStep";
import GoalStep from "../../components/useSetting/GoalStep";
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

const TOTAL_STEPS = 9;

export default function UserSettingContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [userSettingData, setUserSettingData] = useState<UserSettingData>({
    userName: "",
    userGender: "",
    college: "",
    userArea_1: "",
    userArea_2: "",
    distance: 25,
    goal: "",
    studyTags: ["", "", "", "", ""],
    questions: [],
    surveyAnswers: {},
    peopleNumber: "1~2인",
    studyStyle: "멘토",
    smoking: "흡연자",
    privateGathering: "회식 등 팀 모임 선호",
  });

  const handleDataChange = (newData: Partial<UserSettingData>) => {
    setUserSettingData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = async () => {
    // StudyTagStep에서 SurveyStep으로 넘어갈 때 질문 생성
    if (currentStep === 6) {
      await generateQuestionsForSurvey();
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      setIsCurrentStepValid(false);
    } else {
      // 완료 처리
      console.log("User Setting Complete:", userSettingData);
    }
  };

  const generateQuestionsForSurvey = async () => {
    const filledTags = userSettingData.studyTags.filter(
      (tag) => tag.trim().length > 0
    );

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
        return <CollegeStep {...stepProps} />;
      case 3:
        return <AreaStep {...stepProps} />;
      case 4:
        return <DistanceStep {...stepProps} />;
      case 5:
        return <GoalStep {...stepProps} />;
      case 6:
        return <StudyTagStep {...stepProps} />;
      case 7:
        return <SurveyStep {...stepProps} />;
      case 8:
        return <StudyStyleStep {...stepProps} />;
      case 9:
        return <AdditionalStep {...stepProps} />;
      default:
        return <NameStep {...stepProps} />;
    }
  };

  const getButtonTitle = () => {
    return currentStep === TOTAL_STEPS ? "완료" : "다음";
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
        return "대학교/전공 설정";
      case 3:
        return "선호지역 설정";
      case 4:
        return "거리 설정";
      case 5:
        return "스터디 목적 설정";
      case 6:
        return "스터디 태그 설정";
      case 7:
        return "설문 조사";
      case 8:
        return "스터디 스타일 설정";
      case 9:
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
                title={
                  isLoadingQuestions ? "질문 생성 중..." : getButtonTitle()
                }
                bgColor={getButtonColor()}
                disabled={!isCurrentStepValid || isLoadingQuestions}
                onPress={handleNext}
              />
            </NextButtonContainer>
          </ButtonContainer>
        ) : (
          <PrimaryButton
            title={isLoadingQuestions ? "질문 생성 중..." : getButtonTitle()}
            bgColor={getButtonColor()}
            disabled={!isCurrentStepValid || isLoadingQuestions}
            onPress={handleNext}
          />
        )}
      </Bottom>
    </Container>
  );
}
