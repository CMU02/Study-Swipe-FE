import { useState } from "react";
import BrandTextField from "../../components/BrandTextField";
import styled from "styled-components/native";
import PrimaryButton from "../../components/PrimaryButton";
import { clickColor } from "../../styles/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  margin-bottom: 5px;
  align-self: stretch;
`;

const SubQuestion = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${clickColor};
  margin-bottom: 20px;
  align-self: stretch;
`;

const Answer = styled.View`
  flex: 1;
  align-items: center;
  align-self: stretch;
  gap: 10px;
`;

export default function UseSetting_StudyTag() {
  const [tag1, setTag1] = useState<string>("");
  const [tag2, setTag2] = useState<string>("");
  const [tag3, setTag3] = useState<string>("");
  const [tag4, setTag4] = useState<string>("");
  const [tag5, setTag5] = useState<string>("");

  return (
    <Container>
      <Top>
        <Question>스터디하고 싶은 과목의{"\n"}태그를 설정해주세요.</Question>
        <SubQuestion>
          총 5개까지 설정 가능하며 우선 순위대로 입력하여주세요!
        </SubQuestion>
        <Answer>
          <BrandTextField
            value={tag1}
            onChangeText={setTag1}
            placeholder="① 예) 정보처리기능사"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <BrandTextField
            value={tag2}
            onChangeText={setTag2}
            placeholder="② 예) 리눅스"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <BrandTextField
            value={tag3}
            onChangeText={setTag3}
            placeholder="③ 예) 서버 구축"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <BrandTextField
            value={tag4}
            onChangeText={setTag4}
            placeholder="④ 예) 자바"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <BrandTextField
            value={tag5}
            onChangeText={setTag5}
            placeholder="⑤ 예) 백엔드"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </Answer>
      </Top>
      <Bottom>
        <PrimaryButton title="다음" bgColor={clickColor} />
      </Bottom>
    </Container>
  );
}
