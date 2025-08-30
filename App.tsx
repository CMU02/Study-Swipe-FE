import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #FFF;
  align-items: center;
  justify-content: center;
`
const Title = styled.Text`
  font-size: 40px;
  font-weight: 700;
`

export default function App() {
  return (
    <Container>
      <StatusBar style="auto" />
      <Title>Hello World</Title>
    </Container>
  );
}