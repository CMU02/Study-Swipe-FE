# 프로젝트 구조

## 📁 폴더 구조

```
Study-Swipe-FE/
├── api/                          # API 관련 파일들
│   ├── common/                   # 공통 API 유틸리티
│   │   └── headers.ts           # 헤더 생성 유틸리티
│   ├── types/                   # API 타입 정의
│   ├── area.tsx                 # 지역 관련 API
│   ├── auth.tsx                 # 인증 관련 API
│   ├── config.tsx               # API 설정
│   ├── index.tsx                # API 통합 export
│   ├── matching.tsx             # 매칭 관련 API
│   ├── profile.tsx              # 프로필 관련 API
│   ├── tag.tsx                  # 태그 관련 API
│   └── userSetting.tsx          # 사용자 설정 API
├── assets/                      # 정적 자원
│   ├── fonts/                   # 폰트 파일들
│   └── images/                  # 이미지 파일들
├── components/                  # 재사용 가능한 컴포넌트들
│   ├── button/                  # 버튼 컴포넌트들
│   ├── input/                   # 입력 컴포넌트들
│   ├── logo/                    # 로고 컴포넌트들
│   ├── useSetting/              # 사용자 설정 관련 컴포넌트들
│   │   └── types/               # 사용자 설정 타입들
│   ├── BottomTabBar.tsx         # 하단 탭바
│   ├── DevButton.tsx            # 개발용 버튼
│   ├── NotificationBox.tsx      # 알림 박스
│   ├── ProgressBar.tsx          # 진행률 바
│   ├── StudyCard.tsx            # 스터디 카드
│   ├── TagBox.tsx               # 태그 박스
│   └── TopTabs.tsx              # 상단 탭
├── navigation/                  # 네비게이션 관련
│   ├── AppNavigator.tsx         # 메인 네비게이터
│   ├── TalkNavi.tsx             # 채팅 네비게이터
│   └── UserSettingNavi.tsx      # 사용자 설정 네비게이터
├── screens/                     # 화면 컴포넌트들
│   ├── auth/                    # 인증 관련 화면들
│   ├── feed/                    # 피드 관련 화면들
│   │   ├── types/               # 피드 타입 정의
│   │   ├── utils/               # 피드 유틸리티 함수들
│   │   │   ├── dataTransform.ts # 데이터 변환 유틸리티
│   │   │   ├── dateUtils.ts     # 날짜 유틸리티
│   │   │   └── shuffleUtils.ts  # 셔플 유틸리티
│   │   └── HomeScreen.tsx       # 홈 화면
│   ├── info/                    # 정보 관련 화면들
│   │   ├── constants.ts         # 상수 정의
│   │   ├── ProfileScreen.tsx    # 프로필 화면
│   │   ├── styles.ts            # 스타일 정의
│   │   ├── types.ts             # 타입 정의
│   │   └── utils.ts             # 유틸리티 함수들
│   ├── notification/            # 알림 관련 화면들
│   │   └── NotificationScreen.tsx # 알림 화면
│   └── useSetting/              # 사용자 설정 화면들
│       └── UserSettingContainer.tsx
├── styles/                      # 스타일 관련 파일들
│   ├── Color.tsx                # 색상 정의
│   └── common.ts                # 공통 스타일 컴포넌트들
├── utils/                       # 공통 유틸리티 함수들
│   ├── auth.ts                  # 인증 유틸리티
│   ├── common.ts                # 공통 유틸리티
│   └── devTools.ts              # 개발 도구
├── App.tsx                      # 메인 앱 컴포넌트
├── FontLoader.tsx               # 폰트 로더
└── index.ts                     # 앱 진입점
```

## 🔧 주요 변경사항

### 1. 유틸리티 함수 분리

- HomeScreen의 유틸리티 함수들을 별도 파일로 분리
- 공통 유틸리티 함수들을 `utils/common.ts`로 통합
- API 공통 헤더 유틸리티 분리

### 2. 스타일 컴포넌트 정리

- 공통 스타일 컴포넌트들을 `styles/common.ts`로 분리
- 중복된 스타일 정의 제거

### 3. 타입 정의 정리

- 각 화면별 타입 정의를 별도 파일로 분리
- API 타입들을 체계적으로 정리

### 4. 코드 재사용성 향상

- 공통 함수들을 별도 모듈로 분리
- import 경로 최적화
- 타입 안정성 향상

## 📋 개발 가이드라인

### 새로운 화면 추가 시

1. `screens/[category]/` 폴더에 화면 컴포넌트 생성
2. 필요한 경우 `types/`, `utils/`, `styles/` 서브폴더 생성
3. 공통으로 사용될 수 있는 유틸리티는 `utils/common.ts`에 추가

### 새로운 API 추가 시

1. `api/types/`에 타입 정의 추가
2. `api/[category].tsx`에 API 함수 구현
3. 공통 헤더가 필요한 경우 `api/common/headers.ts` 활용

### 스타일 컴포넌트 추가 시

1. 화면별 스타일은 해당 화면 폴더의 `styles.ts`에 정의
2. 공통 스타일은 `styles/common.ts`에 추가
3. 색상은 `styles/Color.tsx`에서 관리
