import styled from "styled-components/native";
import { clickColor, unClickColor } from "../../styles/Color";

interface PrimaryButtonProps {
  // 버튼 글자
  title: string;
  // 버튼 색상
  bgColor?: string;
  // 버튼 글자 색상
  textColor?: string;
  onPress?: () => void;
  // 비활성화 여부
  disabled?: boolean;
}

interface ButtonProps {
  bgColor?: string;
  disabled?: boolean;
}

interface LabelProps {
  textColor?: string;
}

const Button = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 50px;
  border-radius: 8px;

  /** Shadow, IOS/Android **/
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;

  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.disabled ? unClickColor : props.bgColor};
`;

const Label = styled.Text<LabelProps>`
  font-size: 20px;
  font-family: Paperlogy-SemiBold;
  color: ${(props) => props.textColor || "#FFFFFF"};
`;

export default function PrimaryButton({
  title,
  bgColor,
  textColor,
  onPress,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Button
      bgColor={bgColor}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
    >
      <Label textColor={textColor}>{title}</Label>
    </Button>
  );
}
