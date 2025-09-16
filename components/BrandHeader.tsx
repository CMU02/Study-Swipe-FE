import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

interface BrandHeaderProps {
  onPressLogo?: () => void;
}

const Safe = styled.SafeAreaView`
  background-color: #fff;
`;

const Bar = styled.View`
  height: 56px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Logo = styled.Image`
  width: 50px;
  height: 27px;
`;

export default function BrandHeader({ onPressLogo }: BrandHeaderProps) {
  const logo = (
    <Logo source={require("../assets/images/logo.png")} resizeMode="contain" />
  );

  return (
    <Safe>
      <Bar>
        {onPressLogo ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressLogo}>
            {logo}
          </TouchableOpacity>
        ) : (
          logo
        )}
      </Bar>
    </Safe>
  );
}
