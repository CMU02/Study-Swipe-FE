import { useState } from "react";
import BrandTextField from "../../components/input/BrandTextField";
import styled from "styled-components/native";
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

export default function UseSetting_Brith() {
  const navi = useNavigation<NativeStackNavigationProp<UserSettingStackList>>();
  // 사용자로부터 받아오는 YYYY/MM/DD 형태의 입력값
  const [birthDate, setBirthDate] = useState<string>("");
  // 받아온 입력 값으로부터 계산한 나이 값
  const [age, setAge] = useState<number | null>(null);
  // 입력된 나이값이 올바른지 계산 (T/F)
  const isValidAge = !Number.isFinite(age);

  // 현재 년도에서 사용자가 입력한 년도를 빼서 계산하는 나이
  const calculateAge = (birthDateString: string) => {
    if (birthDateString.length === 8) {
      const birthYear = parseInt(birthDateString.substring(0, 4));
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - birthYear;
      setAge(calculatedAge);
    } else {
      setAge(null);
    }
  };

  const handleBirthDateChange = (value: string) => {
    setBirthDate(value);
    calculateAge(value);
  };

  console.log(age);

  const goNextUserSetting = () => {
    navi.navigate("CollegeSetting");
  };

  return (
    <Container>
      <Top>
        <Question>학생의 생년월일을{"\n"}알려주세요.</Question>
        <Answer>
          <BrandTextField
            value={birthDate}
            onChangeText={handleBirthDateChange}
            placeholder="예) 20020101"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </Answer>
      </Top>
      <Bottom>
        <PrimaryButton
          title={"다음"}
          disabled={isValidAge}
          bgColor={clickColor}
          onPress={goNextUserSetting}
        />
      </Bottom>
    </Container>
  );
}
