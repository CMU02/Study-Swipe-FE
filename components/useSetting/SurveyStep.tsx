import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { UserSettingData } from "./NameStep";
import { clickColor, textColor } from "../../styles/Color";

const Container = styled.View`
  flex: 1;
  padding: 0 14px;
`;

const Question = styled.Text`
  font-size: 35px;
  font-family: Paperlogy-SemiBold;
  margin-bottom: 5px;
  align-self: stretch;
`;

const SubQuestion = styled.Text`
  font-size: 16px;
  font-family: Paperlogy-SemiBold;
  color: ${clickColor};
  margin-bottom: 20px;
  align-self: stretch;
`;

const SurveyContainer = styled.View`
  flex: 1;
`;

const QuestionItem = styled.View`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
`;

const QuestionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const QuestionNumber = styled.Text`
  font-size: 16px;
  font-family: Paperlogy-SemiBold;
  color: #007aff;
  margin-right: 8px;
`;

const QuestionTag = styled.Text`
  font-size: 12px;
  font-family: Paperlogy-Medium;
  color: #666;
  background-color: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
`;

const QuestionLevel = styled.Text`
  font-size: 12px;
  font-family: Paperlogy-Medium;
  color: #28a745;
  background-color: #d4edda;
  padding: 4px 8px;
  border-radius: 4px;
`;

const QuestionText = styled.Text`
  font-size: 16px;
  font-family: Paperlogy-Medium;
  color: #333;
  margin-bottom: 15px;
  line-height: 24px;
`;

const ScaleContainer = styled.View`
  align-items: center;
`;

const RadioRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const RadioItem = styled.View`
  align-items: center;
  flex: 1;
`;

const LabelContainer = styled.View`
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const ScaleLabel = styled.Text`
  font-size: 12px;
  font-family: Paperlogy-Regular;
  color: ${textColor};
  text-align: center;
  line-height: 16px;
`;

const RadioButton = styled.TouchableOpacity<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 2px solid ${(props) => (props.selected ? "#007AFF" : "#ddd")};
  background-color: ${(props) => (props.selected ? "#007AFF" : "transparent")};
  justify-content: center;
  align-items: center;
`;

const RadioInner = styled.View<{ selected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.selected ? "#fff" : "transparent")};
`;

// 더미 데이터
const DUMMY_QUESTIONS = [
  {
    no: 1,
    tag: "백엔드",
    level: "기초",
    question: "RESTful API의 기본 개념을 설명할 수 있나요?",
  },
  {
    no: 2,
    tag: "백엔드",
    level: "경험",
    question: "데이터베이스 인덱스를 활용한 쿼리 최적화 경험이 있나요?",
  },
  {
    no: 3,
    tag: "백엔드",
    level: "응용",
    question: "마이크로서비스 아키텍처를 설계하고 구현해본 적이 있나요?",
  },
];

interface SurveyStepProps {
  data: UserSettingData;
  onDataChange: (data: Partial<UserSettingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function SurveyStep({
  data,
  onDataChange,
  onValidationChange,
}: SurveyStepProps) {
  const surveyAnswers = data.surveyAnswers || {};

  const handleAnswerChange = (questionNo: number, value: number) => {
    const updatedAnswers = {
      ...surveyAnswers,
      [questionNo]: value,
    };
    onDataChange({ surveyAnswers: updatedAnswers });

    // 모든 질문에 답했는지 확인
    const allAnswered = DUMMY_QUESTIONS.every(
      (q) => updatedAnswers[q.no] !== undefined
    );
    onValidationChange(allAnswered);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "기초":
        return { bg: "#d4edda", text: "#28a745" };
      case "경험":
        return { bg: "#fff3cd", text: "#856404" };
      case "응용":
        return { bg: "#f8d7da", text: "#721c24" };
      default:
        return { bg: "#e9ecef", text: "#666" };
    }
  };

  return (
    <Container>
      <Question>스터디 수준 평가를{"\n"}진행해주세요.</Question>
      <SubQuestion>
        각 질문에 대해 본인의 수준을 5점 척도로 평가해주세요.
      </SubQuestion>

      <SurveyContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          {DUMMY_QUESTIONS.map((item) => {
            const levelStyle = getLevelColor(item.level);
            return (
              <QuestionItem key={item.no}>
                <QuestionHeader>
                  <QuestionNumber>Q{item.no}.</QuestionNumber>
                  <QuestionTag>{item.tag}</QuestionTag>
                  <QuestionLevel
                    style={{
                      backgroundColor: levelStyle.bg,
                      color: levelStyle.text,
                    }}
                  >
                    {item.level}
                  </QuestionLevel>
                </QuestionHeader>

                <QuestionText>{item.question}</QuestionText>

                <ScaleContainer>
                  <RadioRow>
                    {[
                      { value: 1, label: "매우\n그렇지않다" },
                      { value: 2, label: "그렇지않다" },
                      { value: 3, label: "보통이다" },
                      { value: 4, label: "그렇다" },
                      { value: 5, label: "매우\n그렇다" },
                    ].map((option) => (
                      <RadioItem key={option.value}>
                        <LabelContainer>
                          <ScaleLabel>{option.label}</ScaleLabel>
                        </LabelContainer>
                        <RadioButton
                          selected={surveyAnswers[item.no] === option.value}
                          onPress={() =>
                            handleAnswerChange(item.no, option.value)
                          }
                        >
                          <RadioInner
                            selected={surveyAnswers[item.no] === option.value}
                          />
                        </RadioButton>
                      </RadioItem>
                    ))}
                  </RadioRow>
                </ScaleContainer>
              </QuestionItem>
            );
          })}
        </ScrollView>
      </SurveyContainer>
    </Container>
  );
}
