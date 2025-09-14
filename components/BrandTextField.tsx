import React, { useMemo, useState } from "react";
import styled from "styled-components/native";
import { textOpacityColor, textColor } from "../styles/Color";
import { Feather } from "@expo/vector-icons";

type ReturnKey = "done" | "go" | "next" | "search" | "send";

interface AppTextFieldProps {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  returnKeyType?: ReturnKey;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: React.ComponentProps<typeof StyledInput>["keyboardType"];
  /** true면 오른쪽에 '눈' 아이콘이 나타나고, 클릭으로 보이기/가리기 토글 */
  secureToggle?: boolean;
  /** secureToggle을 쓸 때 초기값을 가리고 시작할지 여부(default: true) */
  secureDefaultHidden?: boolean;
  /** 외부에서 right 아이콘을 넣고 싶을 때 */
  rightIconName?: React.ComponentProps<typeof Feather>["name"];
  onPressRightIcon?: () => void;
  /** 테스트ID 등 전달용 */
  testID?: string;
}

const FieldWrapper = styled.View`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.TextInput<{ $withRight?: boolean }>`
  font-size: 15px;
  font-weight: 600;

  width: 100%;
  height: 48px;
  padding: 0 ${({ $withRight }) => ($withRight ? 44 : 14)}px 0 14px;

  border-radius: 8px;
  border-width: 2px;
  border-color: ${textOpacityColor};

  background-color: #fff;
  color: ${textOpacityColor};
`;

const IconBtn = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  width: 32px;
  justify-content: center;
  align-items: center;
`;

export default function AppTextField({
  value,
  onChangeText,
  placeholder,
  returnKeyType = "done",
  autoCapitalize = "none",
  keyboardType,
  secureToggle = false,
  secureDefaultHidden = true,
  rightIconName,
  onPressRightIcon,
  testID,
}: AppTextFieldProps) {
  const [hidden, setHidden] = useState(secureDefaultHidden);

  const showEye = secureToggle;
  const showCustomRight = !!rightIconName;

  const secureEntry = useMemo(() => {
    if (!secureToggle) return false;
    return hidden;
  }, [secureToggle, hidden]);

  const rightIcon = useMemo(() => {
    if (showEye) return hidden ? "eye" : "eye-off";
    return rightIconName;
  }, [showEye, hidden, rightIconName]);

  const handleRightPress = () => {
    if (showEye) setHidden((v) => !v);
    else onPressRightIcon?.();
  };

  const needRightArea = showEye || showCustomRight;

  return (
    <FieldWrapper>
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={textOpacityColor}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        secureTextEntry={secureEntry}
        $withRight={needRightArea}
        testID={testID}
      />
      {needRightArea && (
        <IconBtn
          onPress={handleRightPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name={rightIcon as any} size={18} color={textColor} />
        </IconBtn>
      )}
    </FieldWrapper>
  );
}
