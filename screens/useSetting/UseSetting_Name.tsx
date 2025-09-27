import React, { useState } from "react";
import styled from "styled-components/native";
import BrandTextField from "../../components/input/BrandTextField";
import GenderSelect from "../../components/input/Select";
import PrimaryButton from "../../components/button/PrimaryButton";
import { clickColor } from "../../styles/Color";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserSettingStackList } from "../../navigation/UserSettingNavi";

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

const NameFieldBox = styled.View`
  flex: 1;
  margin-right: 8px;
`;

export default function UseSetting_Name() {
  const navi = useNavigation<NativeStackNavigationProp<UserSettingStackList>>();
  // 이름 값 저장
  const [userName, setUserName] = useState("");
  // 성별 값 저장
  const [userGender, setUserGender] = useState<"남" | "여" | "기타" | "">("");

  // 저장된 값의 유효성 검사 (Null이나 정상적이지 않은 형태)
  const isValidInput = () => {
    // 일단은 특수문자, 숫자 그리고 한글만 가능하게 설정 (영어는 원하면 추가)
    const validName = /^[가-힣]{2,}$/.test(userName.trim());
    const validGender = ["남", "여", "기타"].includes(userGender);
    return validName && validGender;
  };

  // Navigation 설정 테스트 진행한 부분 주석처리
  const goNextUserSetting = () => {
    navi.navigate("BrithSetting");
  };

  return (
    <Container>
      <Top>
        <Question>학생의 이름과 성별을{"\n"}알려주세요.</Question>

        <Answer>
          <NameFieldBox>
            <BrandTextField
              value={userName}
              onChangeText={setUserName}
              placeholder="예) 홍길동"
              autoCapitalize="none"
              returnKeyType="done"
            />
          </NameFieldBox>

          <GenderSelect
            value={userGender}
            onChange={setUserGender as (v: string) => void}
            placeholder="성별 선택"
            options={["남", "여", "기타"]}
            width={120}
          />
        </Answer>
      </Top>

      <Bottom>
        <PrimaryButton
          title="다음"
          bgColor={clickColor}
          disabled={!isValidInput()}
          onPress={goNextUserSetting}
        />
      </Bottom>
    </Container>
  );
}
