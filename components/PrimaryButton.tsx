import styled from "styled-components/native";
import { primaryColor } from "../styles/Color";

interface ButtonProps {
  bgColor?: string;
}

interface LabelProps {
  textColor?: string;
}

const Button = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor || primaryColor};
`;

const Label = styled.Text<LabelProps>`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.textColor || "#FFFFFF"};
`;

interface PrimaryButtonProps {
  title: string;
  bgColor?: string;
  textColor?: string;
  onPress?: () => void;
}

export default function PrimaryButton({
  title,
  bgColor,
  textColor,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Button bgColor={bgColor} activeOpacity={0.8} onPress={onPress}>
      <Label textColor={textColor}>{title}</Label>
    </Button>
  );
}
