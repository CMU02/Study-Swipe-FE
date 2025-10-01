import { useMemo, useRef, useState, useCallback } from "react";
import {
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
} from "react-native";
import styled from "styled-components/native";
import BrandHeader from "../../components/logo/BrandHeader";
import StudyCard from "../../components/StudyCard";
import BottomTabBar from "../../components/BottomTabBar";
import TopTabs from "../../components/TopTabs";

/* ───────────── Styled ───────────── */
const Screen = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Wrap = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const CarouselWrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const HScroll = styled(Animated.ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  scrollEventThrottle: 16,
})`
  width: 100%;
  height: 100%;
`;

/* ───────────── Constants ───────────── */
type TopKey = "TODAY" | "HOT" | "DISCOVER";

const TOP_TABS: { key: TopKey; label: string }[] = [
  { key: "TODAY", label: "TODAY" },
  { key: "HOT", label: "HOT" },
  { key: "DISCOVER", label: "DISCOVER" },
];

const CARDS = [
  {
    image: {
      uri: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200",
    },
    title: "#프론트 엔드",
    smallLabel: "피어",
    subtitle: "서울대학교 컴퓨터공학과",
    description: "소개 : 간단한 프로젝트 함께 진행해보고 싶습니다.",
    showAlert: true,
    bookmarked: true,
    details: {
      purpose: "전공 공부 및 포트폴리오 작성",
      school: "서울대학교 컴퓨터공학과",
      location: "경기도 안양시",
      time: "오후 7시 ~ 9시",
      days: "주중",
      freq: "주 2회, 3개월",
      age: "만 23세/남",
    },
    badges: ["2~3인", "흡연자X", "피어", "같이 선호"],
    tags: [
      "#1 프론트엔드",
      "#2 백엔드",
      "#3 풀스택",
      "#4 자바스크립트",
      "#5 자료구조",
    ],
  },
  {
    image: {
      uri: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    },
    title: "#모바일 앱",
    smallLabel: "포트폴리오",
    subtitle: "경희대학교 소프트웨어융합",
    description: "RN/Expo로 간단한 앱을 만드는 스터디",
    showAlert: false,
    bookmarked: false,
    details: {
      purpose: "React Native 앱 포트폴리오 제작",
      school: "경희대학교 소프트웨어융합",
      location: "서울시 동대문구",
      time: "저녁 8시 ~ 10시",
      days: "주중",
      freq: "주 2회, 2개월",
      age: "만 22~26세",
    },
    badges: ["3~4인", "비흡연", "프로젝트 위주"],
    tags: ["#ReactNative", "#Expo", "#TypeScript", "#포트폴리오"],
  },
  {
    image: {
      uri: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200",
    },
    title: "#알고리즘",
    smallLabel: "스터디",
    subtitle: "서강대학교 컴퓨터공학",
    description: "매주 5문제, 코드 리뷰 진행",
    showAlert: false,
    bookmarked: false,
    details: {
      purpose: "알고리즘 문제 풀이 및 PS 실력 향상",
      school: "서강대학교 컴퓨터공학",
      location: "서울시 마포구",
      time: "오후 7시 ~ 9시",
      days: "토/일",
      freq: "주 2회, 3개월",
      age: "무관",
    },
    badges: ["5인 이하", "코드리뷰", "실력향상"],
    tags: ["#Greedy", "#DP", "#Graph", "#PS", "#코딩테스트"],
  },
];

/* ───────────── Screen ───────────── */
const TodayScreen = () => {
  const [activeTopTab, setActiveTopTab] = useState<TopKey>("TODAY");
  const [page, setPage] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  // layout constants
  const horizontalPadding = 16;
  const cardGap = 14;
  const peekRight = 64;

  const cardWidth = useMemo(
    () => width - horizontalPadding * 2 - peekRight,
    [width]
  );
  const itemStride = useMemo(() => cardWidth + cardGap, [cardWidth, cardGap]);

  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const idx = Math.round(x / itemStride);
      const clamped = Math.max(0, Math.min(idx, CARDS.length - 1));
      setPage(clamped);
    },
    [itemStride]
  );

  const centerGap = (width - cardWidth) / 2;

  return (
    <Screen>
      <BrandHeader />

      <TopTabs
        items={TOP_TABS}
        activeKey={activeTopTab}
        onChange={(k) => setActiveTopTab(k as TopKey)}
        showUnderline
      />

      <Wrap>
        <Container>
          <CarouselWrap>
            <HScroll
              snapToInterval={itemStride}
              decelerationRate="fast"
              onMomentumScrollEnd={onMomentumEnd}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                paddingLeft: centerGap,
                paddingRight: centerGap, // ← +peekRight 빼기
                paddingVertical: 24,
              }}
            >
              {CARDS.map((c, i) => {
                const inputRange = [
                  (i - 1) * itemStride,
                  i * itemStride,
                  (i + 1) * itemStride,
                ];

                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.92, 1, 0.92],
                  extrapolate: "clamp",
                });

                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.85, 1, 0.85],
                  extrapolate: "clamp",
                });

                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange: [6, 0, 6],
                  extrapolate: "clamp",
                });

                return (
                  <Animated.View
                    key={i}
                    style={{
                      width: cardWidth,
                      marginRight: i < CARDS.length - 1 ? cardGap : 0,
                      transform: [{ scale }, { translateY }],
                      opacity,
                    }}
                  >
                    <StudyCard
                      image={c.image}
                      title={c.title}
                      smallLabel={c.smallLabel}
                      subtitle={c.subtitle}
                      description={c.description}
                      showAlert={c.showAlert}
                      bookmarked={c.bookmarked}
                      details={c.details}
                      badges={c.badges}
                      tags={c.tags}
                    />
                  </Animated.View>
                );
              })}
            </HScroll>
          </CarouselWrap>
        </Container>
      </Wrap>

      <BottomTabBar />
    </Screen>
  );
};

export default TodayScreen;
