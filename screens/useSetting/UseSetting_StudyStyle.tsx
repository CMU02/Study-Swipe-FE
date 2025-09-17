import styled from "styled-components/native";
import PrimaryButton from "../../components/PrimaryButton";
import { clickColor } from "../../styles/Color";
import StylePickButton from "../../components/StylePickButton";
import { use, useState } from "react";

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
  flex: 1;
  align-items: flex-start;
  align-self: stretch;
  gap: 15px;
`;

export default function UseSetting_StudyStyle() {
  const [peopleNumber, setPeopleNumber] = useState<string>("1~2인");
  const [studyStyle, setStudyStyle] = useState<string>("멘토");

  return (
    <Container>
      <Top>
        <Question>스터디 스타일이{"\n"}어떻게 되나요?</Question>
        <Answer>
          <StylePickButton
            value={peopleNumber}
            onChange={setPeopleNumber}
            options={["1~2인", "2~3인", "3~4인", "4인 이상"]}
            gap={10}
            horizontalPadding={12}
            selectedColorVariant="primary"
          />
          <StylePickButton
            value={studyStyle}
            onChange={setStudyStyle}
            options={["멘토", "피어", "러너"]}
            gap={10}
            horizontalPadding={30}
            selectedColorVariant="secondary"
          />
        </Answer>
      </Top>
      <Bottom>
        <PrimaryButton title="다음" bgColor={clickColor} />
      </Bottom>
    </Container>
  );
}
