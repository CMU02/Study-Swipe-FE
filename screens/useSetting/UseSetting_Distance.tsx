import React, { useState } from "react";
import styled from "styled-components/native";
import PrimaryButton from "../../components/PrimaryButton";
import { clickColor, secondaryColor, unClickColor } from "../../styles/Color";
import Slider from "@react-native-community/slider"; // ← 슬라이더

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
  align-self: stretch;
`;

const SliderWrap = styled.View`
  align-self: stretch;
`;

const ValueRow = styled.View`
  align-items: flex-end;
  margin-bottom: 5px;
`;

const ValueText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${secondaryColor};
`;

export default function UseSetting_Distance() {
  const [distance, setDistance] = useState<number>(25);
  const minKm = 1;
  const maxKm = 50;

  return (
    <Container>
      <Top>
        <Question>스터디하러 다니기 좋은{"\n"}거리를 설정해주세요.</Question>

        <Answer>
          <SliderWrap>
            <ValueRow>
              <ValueText>
                {distance}/{maxKm}km
              </ValueText>
            </ValueRow>

            <Slider
              value={distance}
              minimumValue={minKm}
              maximumValue={maxKm}
              step={1}
              minimumTrackTintColor="#000000" // 좌측(선택된) 트랙
              maximumTrackTintColor={unClickColor} // 우측(미선택) 트랙
              thumbTintColor="#000000" // 동그라미 색
              onValueChange={(v: number) => setDistance(v)}
            />
          </SliderWrap>
        </Answer>
      </Top>

      <Bottom>
        <PrimaryButton title="다음" bgColor={clickColor} />
      </Bottom>
    </Container>
  );
}
