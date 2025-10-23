/* 공통 스타일 컴포넌트들 */

import styled from "styled-components/native";

export const Screen = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingWrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.Text`
  font-size: 16px;
  color: #666;
`;
