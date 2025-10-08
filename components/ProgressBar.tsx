import React from "react";
import styled from "styled-components/native";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

const Container = styled.View`
  padding: 20px 14px;
  background-color: #fff;
`;

const ProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const StepText = styled.Text`
  font-size: 16px;
  font-family: Paperlogy-Medium;
  color: #666;
  margin-right: 8px;
`;

const StepTitle = styled.Text`
  font-size: 16px;
  font-family: Paperlogy-Medium;
  color: #333;
`;

const ProgressBarContainer = styled.View`
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.View<{ progress: number }>`
  height: 100%;
  background-color: #000;
  width: ${(props) => props.progress}%;
  border-radius: 4px;
`;

export default function ProgressBar({
  currentStep,
  totalSteps,
  stepTitle,
}: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <Container>
      <ProgressContainer>
        <StepText>
          {currentStep}/{totalSteps}
        </StepText>
        <StepTitle>{stepTitle}</StepTitle>
      </ProgressContainer>
      <ProgressBarContainer>
        <ProgressFill progress={progress} />
      </ProgressBarContainer>
    </Container>
  );
}
