import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import {
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import BrandHeader from "../../components/logo/BrandHeader";
import StudyCard from "../../components/StudyCard";
import BottomTabBar from "../../components/BottomTabBar";
import TopTabs from "../../components/TopTabs";
// 하단 주석과 동일하게 개발용 토큰 삭제버튼
import DevButton from "../../components/DevButton";

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

/* ───────────── Types & Constants ───────────── */
type TopKey = "TODAY" | "HOT" | "DISCOVER";

const TOP_TABS: { key: TopKey; label: string }[] = [
  { key: "TODAY", label: "TODAY" },
  { key: "HOT", label: "HOT" },
  { key: "DISCOVER", label: "DISCOVER" },
];

/** 🔧 카드 타입에 popularity(인기 지표)와 id를 추가 */
type Card = {
  id: string;
  popularity?: number;
  image: { uri: string };
  title: string;
  smallLabel: string;
  subtitle: string;
  description: string;
  showAlert: boolean;
  bookmarked: boolean;
  details: {
    purpose?: string;
    school?: string;
    location?: string;
    time?: string;
    days?: string;
    freq?: string;
    age?: string;
  };
  badges?: string[];
  tags?: string[];
};

const CARDS: Card[] = [
  {
    id: "c1",
    popularity: 83, // 🔥 인기 지표 (예시)
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
    id: "c2",
    popularity: 71,
    image: {
      uri: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    },
    title: "#모바일 앱",
    smallLabel: "포트폴리오",
    subtitle: "경희대학교 소프트웨어융합",
    description: "RN/Expo로 간단한 앱을 만드는 스터디",
    showAlert: true,
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
    id: "c3",
    popularity: 65,
    image: {
      uri: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200",
    },
    title: "#알고리즘",
    smallLabel: "스터디",
    subtitle: "서강대학교 컴퓨터공학",
    description: "매주 5문제, 코드 리뷰 진행",
    showAlert: true,
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

/* ───────────── Utils: TODAY용 시드 셔플(우리 로직 자리) ───────────── */
const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const ymdSeed = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}${m}${day}`;
};

const hashString = (s: string) => {
  // 간단/빠른 해시 (deterministic)
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const seededShuffle = <T,>(arr: T[], seedStr: string): T[] => {
  const copy = [...arr];
  let seed = hashString(seedStr);
  // 피셔-예이츠 with LCG
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/* ───────────── Screen ───────────── */
const HomeScreen = () => {
  const [activeTopTab, setActiveTopTab] = useState<TopKey>("TODAY");
  const [page, setPage] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null); // 👈 탭 전환 시 맨 앞으로 스크롤
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

  /** 탭에 따라 보여줄 카드 목록 계산 */
  const displayedCards = useMemo(() => {
    if (activeTopTab === "HOT") {
      // HOT : 인기순 - 북마크 많이 한 순서? (좋아요할지 고민)
      return [...CARDS].sort(
        (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
      );
    }
    if (activeTopTab === "DISCOVER") {
      // DISCOVER : 전체
      return CARDS;
    }
    // TODAY: 우리 로직
    return seededShuffle(CARDS, `today-${ymdSeed()}`);
  }, [activeTopTab]);

  /** 탭 바뀔 때 맨 앞으로 스크롤 & 페이지 리셋 */
  useEffect(() => {
    setPage(0);
    scrollRef.current?.scrollTo({ x: 0, animated: true });
  }, [activeTopTab]);

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
              ref={scrollRef}
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
                paddingRight: centerGap,
                paddingVertical: 24,
              }}
            >
              {displayedCards.map((c, i) => {
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
                    key={c.id}
                    style={{
                      width: cardWidth,
                      marginRight: i < displayedCards.length - 1 ? cardGap : 0,
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

      {/* 저장된 토큰 삭제를 위한 임시 삭제 버튼 개발버전 이후 삭제(./utils) */}
      <DevButton />
    </Screen>
  );
};

export default HomeScreen;
