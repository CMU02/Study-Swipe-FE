import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutChangeEvent,
  Image,
} from "react-native";
import styled from "styled-components/native";
import { textOpacityColor } from "../../styles/Color";

/** 옵션 항목: 문자열 또는 {label, value} 객체 */
export type OptionItem = string | { label: string; value: string };

/** Select 컴포넌트 Props */
export interface SelectProps {
  // 현재 값
  value: string;
  onChange: (v: string) => void;
  // List 값 (배열)
  options: OptionItem[];
  // 박스에 표시할 값
  placeholder?: string;
  // 가로 길이 (기본 값 : 120)
  width?: number;
}

/** 내부 스타일 컴포넌트 Prop 타입 */
interface DropdownStyleProps {
  top: number;
  width: number;
}

const Wrapper = styled.View`
  position: relative;
`;

const Trigger = styled.TouchableOpacity`
  height: 48px;
  min-width: 120px;
  border-width: 2px;
  border-color: ${textOpacityColor};
  border-radius: 8px;
  background-color: #fff;

  padding: 0 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TriggerText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${textOpacityColor};
`;

const CaretIcon = styled.Image`
  width: 10px;
  height: 10px;
  margin-left: 8px;
`;

const Dropdown = styled.View<DropdownStyleProps>`
  position: absolute;
  left: 0px;
  top: ${({ top }) => `${top}px`};
  width: ${({ width }) => `${width}px`};

  border-width: 2px;
  border-color: ${textOpacityColor};
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;

  z-index: 10;
  elevation: 6;
`;

const Option = styled.TouchableOpacity`
  padding: 12px;
`;

const OptionText = styled.Text`
  font-size: 15px;
  color: ${textOpacityColor};
`;

/** 유틸: 라벨/값 추출 */
function getLabel(item: OptionItem) {
  return typeof item === "string" ? item : item.label;
}
function getValue(item: OptionItem) {
  return typeof item === "string" ? item : item.value;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "선택",
  width,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [triggerSize, setTriggerSize] = useState({ width: 120, height: 48 });

  const handleTriggerLayout = (e: LayoutChangeEvent) => {
    const { width: w, height } = e.nativeEvent.layout;
    setTriggerSize({ width: w, height });
  };

  const handleToggle = () => setOpen((v) => !v);

  const selectedLabel = useMemo(() => {
    const found = options.find((opt) => getValue(opt) === value);
    return found ? getLabel(found) : "";
  }, [options, value]);

  const visibleText = selectedLabel || placeholder;
  const handleSelect = (opt: OptionItem) => {
    onChange(getValue(opt));
    setOpen(false);
  };

  const finalWidth = width ?? triggerSize.width ?? 120;

  return (
    <Wrapper style={{ width: finalWidth }}>
      <Trigger onPress={handleToggle} onLayout={handleTriggerLayout}>
        <TriggerText>{visibleText}</TriggerText>
        <CaretIcon
          source={
            open
              ? require("../../assets/images/listUp.png")
              : require("../../assets/images/listDown.png")
          }
          resizeMode="contain"
        />
      </Trigger>

      {open && (
        <Dropdown top={triggerSize.height + 4} width={finalWidth}>
          {options.map((opt, idx) => {
            const label = getLabel(opt);
            const val = getValue(opt);
            return (
              <Option key={`${val}-${idx}`} onPress={() => handleSelect(opt)}>
                <OptionText>{label}</OptionText>
              </Option>
            );
          })}
        </Dropdown>
      )}
    </Wrapper>
  );
}
