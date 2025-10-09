import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import type { UserSettingData, SurveyStepProps } from "./types";
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

export default function SurveyStep({
  data,
  onDataChange,
  onValidationChange,
}: SurveyStepProps) {
  const surveyAnswers = data.surveyAnswers || {};
  const questions = data.questions || [];

  // 모든 질문을 평면화하여 하나의 배열로 만들기
  const allQuestions = questions.flatMap((tagItem) =>
    tagItem.questions.map((q) => ({
      ...q,
      tag: tagItem.tag,
    }))
  );

  const handleAnswerChange = (questionNo: number, value: number) => {
    const updatedAnswers = {
      ...surveyAnswers,
      [questionNo]: value,
    };

    onDataChange({ surveyAnswers: updatedAnswers });

    // 모든 질문에 답했는지 확인
    const allAnswered = allQuestions.every(
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
          {allQuestions.length === 0 ? (
            <QuestionItem>
              <QuestionText style={{ textAlign: "center", color: "#666" }}>
                질문을 불러오는 중입니다...
              </QuestionText>
            </QuestionItem>
          ) : (
            allQuestions.map((item) => {
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

                  <QuestionText>{item.text}</QuestionText>

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
            })
          )}
        </ScrollView>
      </SurveyContainer>
    </Container>
  );
}
