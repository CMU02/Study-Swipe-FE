import { useState } from "react";
import BrandTextField from "../../components/input/BrandTextField";
import styled from "styled-components/native";
import PrimaryButton from "../../components/button/PrimaryButton";
import { clickColor } from "../../styles/Color";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Top = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  padding: 0 14px;
`;

const Bottom = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 50px;
  padding: 0 14px;
`;

const Question = styled.Text`
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 40px;
  align-self: stretch;
`;

const Answer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: stretch;
`;

export default function UseSetting_College() {
  const [college, setCollege] = useState<string>("");
  // 정상적인 값이 들어갔는지 확인하는 함수 ("대학교" 단어가 들어있는지 판별)
  const hasUniversity = () => {
    return college.includes("대학교");
  };
  return (
    <Container>
      <Top>
        <Question>학생의 대학교/전공을{"\n"}알려주세요.</Question>
        <Answer>
          <BrandTextField
            value={college}
            onChangeText={setCollege}
            placeholder="예) 서울대학교 컴퓨터공학과"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </Answer>
      </Top>
      <Bottom>
        <PrimaryButton
          title="다음"
          bgColor={clickColor}
          disabled={!hasUniversity()}
        />
      </Bottom>
    </Container>
  );
}
