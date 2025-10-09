import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BrandHeaderProps {
  onPressLogo?: () => void;
}

const Bar = styled.View`
  height: 56px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
`;

const Logo = styled.Image`
  width: 50px;
  height: 27px;
`;

export default function BrandHeader({ onPressLogo }: BrandHeaderProps) {
  const insets = useSafeAreaInsets(); // ✅ 안전영역 가져오기

  const logo = (
    <Logo
      source={require("../../assets/images/logo.png")}
      resizeMode="contain"
    />
  );

  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingTop: insets.top, // ✅ 상단 여백 추가
      }}
    >
      <Bar>
        {onPressLogo ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressLogo}>
            {logo}
          </TouchableOpacity>
        ) : (
          logo
        )}
      </Bar>
    </View>
  );
}
