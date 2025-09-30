// components/TagBox.tsx
import React from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";

type TagBoxProps = {
  /** 박스 안에 표시할 텍스트 */
  label: string;
  /** 박스 배경색 (hex, rgb 등) */
  bgColor: string;
};

/** hex 또는 rgb 색상 → rgba 변환 */
const withOpacity = (color: string, alpha: number) => {
  if (color.startsWith("#")) {
    // HEX (#RRGGBB) → RGBA
    const hex = color.replace("#", "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (color.startsWith("rgb")) {
    return color.replace(")", `, ${alpha})`).replace("rgb", "rgba");
  }
  return color; // 이미 rgba면 그대로 반환
};

const Box = styled.View<{ bg: string }>`
  padding: 5px 8px;
  border-radius: 8px;
  background-color: ${({ bg }) => bg};
  justify-content: center;
  align-items: center;
  margin: 4px;

  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 1px 1px;
      shadow-opacity: 0.25;
      shadow-radius: 1px;
    `,
    android: `
      elevation: 1;
    `,
  })}
`;

const LabelText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
`;

export default function TagBox({ label, bgColor }: TagBoxProps) {
  return (
    <Box bg={withOpacity(bgColor, 0.7)}>
      <LabelText>{label}</LabelText>
    </Box>
  );
}
