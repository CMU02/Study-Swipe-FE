import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import styled from "styled-components/native";
import { clearAllTokens } from "../utils/devTools";

const DevButtonContainer = styled.View`
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 999;
`;

const Button = styled.TouchableOpacity`
  background-color: #ff4444;
  padding: 8px 12px;
  border-radius: 4px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const DevButton = () => {
  const handleClearTokens = async () => {
    Alert.alert("토큰 초기화", "저장된 토큰을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          const success = await clearAllTokens();
          if (success) {
            Alert.alert("완료", "토큰이 삭제되었습니다. 앱을 재시작해주세요.");
          }
        },
      },
    ]);
  };

  // 개발 환경에서만 표시
  if (!__DEV__) {
    return null;
  }

  return (
    <DevButtonContainer>
      <Button onPress={handleClearTokens}>
        <ButtonText>토큰 초기화</ButtonText>
      </Button>
    </DevButtonContainer>
  );
};

export default DevButton;
