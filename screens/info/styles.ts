/* ProfileScreen 스타일 컴포넌트 */

import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import {
  clickColor,
  primaryColor,
  secondaryColor,
  textColor,
  thirdColor,
} from "../../styles/Color";
import { Screen, Container, Row, Center } from "../../styles/common";

// 공통 스타일 재export
export { Screen, Container, Center };

/* ───────────── Main Layout ───────────── */
export const Wrap = styled.View`
  flex: 1;
`;

export const ProfileRow = styled(Row)`
  gap: 32px;
  justify-content: flex-start;
`;

/* ───────────── Toggle Components ───────────── */
export const TogglePress = styled.TouchableOpacity``;

export const Pill = styled.View<{ active: boolean }>`
  width: 27px;
  height: 17px;
  border-radius: 24px;
  border-width: 2px;
  border-color: ${textColor};
  background-color: ${({ active }) => (active ? primaryColor : secondaryColor)};
  padding: 3px;
  justify-content: center;
`;

export const Knob = styled.View<{ active: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 3.5px;
  background-color: ${textColor};
  align-self: ${({ active }) => (active ? "flex-end" : "flex-start")};
`;

/* ───────────── Card Layout ───────────── */
export const ProfileCenter = styled(Center)`
  padding: 16px;
`;

export const CardWrap = styled.View<{ w: number }>`
  width: ${({ w }) => w}px;
`;

/* ───────────── Setting UI ───────────── */
export const Section = styled.View`
  width: 100%;
  padding: 8px 0px;
`;

export const SectionTitle = styled.Text`
  font-size: 25px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
  margin-bottom: 5px;
`;

export const Card = styled.View`
  background: ${thirdColor};
  border-radius: 8px;
  padding: 20px 15px;
  gap: 10px;
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;
`;

export const Line = styled.Text`
  font-family: Paperlogy-SemiBold;
  font-size: 15px;
  color: ${textColor};
`;

export const SmallLine = styled(Line)`
  font-size: 15px;
  margin-top: -5px;
`;

export const BtnRow = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const SmallBtn = styled.TouchableOpacity<{
  tone?: "click" | "secondary";
}>`
  padding: 8px 12px;
  border-radius: 5px;
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;
  background-color: ${({ tone }) =>
    tone === "secondary" ? secondaryColor : clickColor};
`;

export const SmallBtnText = styled.Text`
  font-family: Paperlogy-SemiBold;
  font-size: 15px;
  color: #fff;
`;

/* ───────────── Tag Components ───────────── */
export const TagCard = styled(Card)`
  gap: 8px;
`;

export const TagRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-width: 2px;
  border-color: ${textColor};
  border-radius: 10px;
  padding: 10px 12px;
`;

export const TagLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

export const TagNo = styled.Text`
  font-family: Paperlogy-SemiBold;
  font-size: 16px;
  color: ${textColor};
  width: 22px;
`;

export const TagText = styled.Text`
  font-family: Paperlogy-SemiBold;
  font-size: 15px;
  color: ${textColor};
`;

export const TagInput = styled.TextInput`
  flex: 1;
  font-family: Paperlogy-SemiBold;
  font-size: 15px;
  color: ${textColor};
  padding-vertical: 4px;
`;

export const IconBtn = styled(TouchableOpacity)`
  padding: 6px;
  border-radius: 8px;
  margin-left: 8px;
`;
