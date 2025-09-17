import React, { useMemo } from "react";
import styled from "styled-components/native";
import { clickColor, unClickColor, secondaryColor } from "../styles/Color";

/** 문자열 또는 {label,value} 형태 모두 지원 */
export type OptionItem = string | { label: string; value: string };

const getLabel = (item: OptionItem) =>
  typeof item === "string" ? item : item.label;
const getValue = (item: OptionItem) =>
  typeof item === "string" ? item : item.value;

type Props = {
  /** 현재 선택된 값 */
  value: string;
  /** 선택 변경 콜백 */
  onChange: (v: string) => void;
  /** 버튼 옵션 */
  options: OptionItem[];
  /** 버튼 사이 간격(px). 기본 8 */
  gap?: number;
  /** 좌우 패딩(px). 기본 12 */
  horizontalPadding?: number;
  /** 선택 색상: 기본 primary(clickColor), 또는 secondary(secondaryColor) */
  selectedColorVariant?: "primary" | "secondary";
};

const Wrap = styled.View<{ gap: number }>`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ gap }) => `${gap}px`};
`;

const ButtonBox = styled.TouchableOpacity<{
  selected: boolean;
  hPadding: number;
  selectedBg: string;
}>`
  height: 35px;
  padding: 0 ${({ hPadding }) => `${hPadding}px`};
  border-radius: 8px;

  /* 대부분의 DropShadow 기준값 */
  /* iOS shadow */
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  /* Android shadow */
  elevation: 1;

  align-items: center;
  justify-content: center;

  background-color: ${({ selected, selectedBg }) =>
    selected ? selectedBg : unClickColor};
`;

const ButtonLabel = styled.Text<{ selected: boolean }>`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
`;

export default function StylePickButton({
  value,
  onChange,
  options,
  gap = 8,
  horizontalPadding = 12,
  selectedColorVariant = "primary",
}: Props) {
  const items = useMemo(
    () =>
      options.map((o, i) => ({
        key: `${getValue(o)}-${i}`,
        label: getLabel(o),
        value: getValue(o),
      })),
    [options]
  );

  const selectedBg =
    selectedColorVariant === "secondary" ? secondaryColor : clickColor;

  return (
    <Wrap gap={gap}>
      {items.map((it) => {
        const selected = it.value === value;
        return (
          <ButtonBox
            key={it.key}
            selected={selected}
            hPadding={horizontalPadding}
            selectedBg={selectedBg}
            onPress={() => onChange(it.value)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={it.label}
          >
            <ButtonLabel selected={selected}>{it.label}</ButtonLabel>
          </ButtonBox>
        );
      })}
    </Wrap>
  );
}
