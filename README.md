# Study Swipe 프로젝트

이 프로젝트는 React Native와 Expo를 사용하여 개발된 모바일 애플리케이션입니다.

## 설치된 주요 라이브러리

### 1. React Navigation
- **@react-navigation/native**: React Native 앱의 네비게이션을 위한 핵심 라이브러리
- **@react-navigation/native-stack**: 스택 네비게이션 구현
- **@react-navigation/bottom-tabs**: 하단 탭 네비게이션 구현

### 2. Styled Components
- **styled-components**: CSS-in-JS 라이브러리로 컴포넌트 스타일링을 위해 사용

### 3. Expo Font
- **expo-font**: 런타임에서 폰트를 로드하고 React Native 컴포넌트에서 사용할 수 있게 해주는 라이브러리

## Expo Font 사용법

### 설정 방법 1: Config Plugin 사용 (권장)

`app.json` 파일에서 expo-font 플러그인을 설정하여 빌드 시점에 폰트를 임베드할 수 있습니다:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": ["./assets/fonts/Inter-Black.otf"]
        }
      ]
    ]
  }
}
```

### 설정 방법 2: 런타임 로딩

`useFonts` 훅을 사용하여 런타임에 폰트를 로드할 수 있습니다:

```tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Inter-Black', fontSize: 30 }}>Inter Black</Text>
      <Text style={{ fontSize: 30 }}>Platform Default</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### 주요 API

#### useFonts 훅
```tsx
const [loaded, error] = useFonts({
  'FontName': require('./path/to/font.otf'),
});
```

#### Font.loadAsync 메서드
```tsx
import * as Font from 'expo-font';

await Font.loadAsync({
  'FontName': require('./path/to/font.otf'),
});
```

### 폰트 사용 시 주의사항

1. **Android**: 파일명이 폰트 패밀리명이 됩니다
2. **iOS**: 폰트 패밀리명은 폰트 파일에서 직접 가져오며 파일명과 다를 수 있습니다
3. Config Plugin 방식이 런타임 로딩보다 효율적입니다
4. 폰트 로딩이 완료되기 전까지 스플래시 스크린을 유지하는 것이 좋습니다

## 프로젝트 실행

```bash
# 개발 서버 시작
npm start

# Android에서 실행
npm run android

# iOS에서 실행
npm run ios

# 웹에서 실행
npm run web
```

## 참고 자료

- [Expo Font 공식 문서](https://docs.expo.dev/versions/latest/sdk/font/)
- [React Navigation 공식 문서](https://reactnavigation.org/)
- [Styled Components 공식 문서](https://styled-components.com/)