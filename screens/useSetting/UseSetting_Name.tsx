import React, { useState } from "react";
import styled from "styled-components/native";
import BrandTextField from "../../components/BrandTextField";
import GenderSelect from "../../components/Select";
import PrimaryButton from "../../components/PrimaryButton";
import { clickColor } from "../../styles/Color";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";

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
  // const navi = useNavigation<NativeStackNavigationProp<StackList>>();
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState<"남" | "여" | "기타" | "">("");

  // const goNextUseSetting = () => {
  //   navi.navigate("BrithSetting");
  // };

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
          // onPress={goNextUseSetting}
        />
      </Bottom>
    </Container>
  );
}
