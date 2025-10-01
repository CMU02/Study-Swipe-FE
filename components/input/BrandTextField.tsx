import { useMemo, useState } from "react";
import styled from "styled-components/native";
import {
  textOpacityColor,
  textColor,
  secondaryColor,
} from "../../styles/Color";
import { Feather } from "@expo/vector-icons";

type ReturnKey = "done" | "go" | "next" | "search" | "send";

interface AppTextFieldProps {
  // 저장되는 값
  value: string;
  onChangeText: (t: string) => void;
  // 입력창 위에 표시되는 값
  placeholder?: string;
  // 모바일 키패드에 엔터 클릭 시 동작되는 방식 (완료, 다음, 검색 등)
  returnKeyType?: ReturnKey;
  // 자동 대문자 설정 (첫글자 대문자 소문자 등등)
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  // 키보드 타입 설정 (숫자패드 영문패드 등등)
  keyboardType?: React.ComponentProps<typeof StyledInput>["keyboardType"];

  /** 🔒 비밀번호 토글 */
  secureToggle?: boolean;
  secureDefaultHidden?: boolean;

  /** 👉 오른쪽 아이콘 (secureToggle 없을 때만 사용 권장) */
  rightIconName?: React.ComponentProps<typeof Feather>["name"];
  onPressRightIcon?: () => void;

  /** 🟦 오른쪽 버튼(예: '인증', '확인') */
  rightButtonLabel?: string; // 라벨이 있으면 버튼 렌더
  onPressRightButton?: () => void;
  rightButtonColor?: string; // 버튼 배경색
  rightButtonDisabled?: boolean; // 버튼 비활성

  /** ⏱️ 인라인 텍스트(예: 타이머 '05:00') — 버튼 왼쪽에 떠서 표시 */
  rightInlineText?: string;
  rightInlineTextColor?: string;

  testID?: string;
}

/* ---------- styled ---------- */

const FieldWrapper = styled.View`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.TextInput<{
  $padRight: number; // 오른쪽에 아이콘/버튼 있을 때 padding-right 가변
}>`
  font-size: 15px;
  font-family: "Paperlogy-SemiBold";
  width: 100%;
  height: 48px;
  padding: 0 ${({ $padRight }) => $padRight}px 0 14px;
  border-radius: 8px;
  border-width: 2px;
  border-color: ${textOpacityColor};
  background-color: #fff;
  color: ${textColor};
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

const RightBtn = styled.TouchableOpacity<{ $bg: string; disabled?: boolean }>`
  position: absolute;
  right: 8px;
  top: 6px;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  background-color: ${({ $bg }) => $bg};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  justify-content: center;
  align-items: center;
`;

const RightBtnText = styled.Text`
  color: #fff;
  font-family: "Paperlogy-SemiBold";
  font-size: 14px;
`;

/** 버튼 왼쪽에 겹쳐지는 인라인 텍스트(예: 05:00) */
const InlineRightText = styled.Text<{ $color: string }>`
  position: absolute;
  right: 84px; /* 버튼 padding(14*2) + 모서리 여백 고려 */
  top: 0;
  bottom: 0;
  text-align-vertical: center;
  font-size: 12px;
  font-family: "Paperlogy-SemiBold";
  color: ${({ $color }) => $color};
`;

/* ---------- component ---------- */

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

  rightButtonLabel,
  onPressRightButton,
  rightButtonColor = "#000",
  rightButtonDisabled,

  rightInlineText,
  rightInlineTextColor = secondaryColor,

  testID,
}: AppTextFieldProps) {
  const [hidden, setHidden] = useState(secureDefaultHidden);

  const hasRightButton = !!rightButtonLabel;
  const showEye = secureToggle && !hasRightButton; // 버튼과 동시 사용 방지(우선순위: 버튼)
  const showCustomRightIcon = !!rightIconName && !hasRightButton && !showEye;

  const secureEntry = useMemo(() => {
    if (!secureToggle) return false;
    return hidden;
  }, [secureToggle, hidden]);

  const rightIcon = useMemo(() => {
    if (showEye) return hidden ? "eye" : "eye-off";
    return rightIconName;
  }, [showEye, hidden, rightIconName]);

  const handleRightIconPress = () => {
    if (showEye) setHidden((v) => !v);
    else onPressRightIcon?.();
  };

  // 오른쪽 패딩 계산
  // - 버튼: width가 가변이므로 대략 아이콘보다 더 넓게 확보(= 100px)
  // - 아이콘: 44px (기존)
  // - 아무것도 없으면 14px
  const padRight = useMemo(() => {
    if (hasRightButton) return 100;
    if (showEye || showCustomRightIcon) return 44;
    return 14;
  }, [hasRightButton, showEye, showCustomRightIcon]);

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
        $padRight={padRight}
        testID={testID}
      />

      {/* ⏱️ 버튼 왼쪽 인라인 텍스트(예: '05:00') */}
      {hasRightButton && !!rightInlineText && (
        <InlineRightText $color={rightInlineTextColor}>
          {rightInlineText}
        </InlineRightText>
      )}

      {/* 🟦 오른쪽 버튼 OR 👉 오른쪽 아이콘 */}
      {hasRightButton ? (
        <RightBtn
          onPress={onPressRightButton}
          disabled={rightButtonDisabled}
          $bg={rightButtonColor}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <RightBtnText>{rightButtonLabel}</RightBtnText>
        </RightBtn>
      ) : showEye || showCustomRightIcon ? (
        <IconBtn
          onPress={handleRightIconPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name={rightIcon as any} size={18} color={textColor} />
        </IconBtn>
      ) : null}
    </FieldWrapper>
  );
}
