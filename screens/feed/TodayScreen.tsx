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
import { textColor, unClickColor } from "../../styles/Color";

/* ───────────── Styled ───────────── */
const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Wrap = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 0 16px;
`;

const CarouselWrap = styled.View`
  width: 100%;
  margin-top: 8px;
`;

const HScroll = styled(Animated.ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  scrollEventThrottle: 16,
})``;

const Dots = styled.View`
  width: 100%;
  padding: 8px 0;
  align-items: center;
  justify-content: center;
`;

const DotRow = styled.View`
  flex-direction: row;
  gap: 6px;
`;

const Dot = styled.View<{ active?: boolean }>`
  width: ${({ active }) => (active ? 6 : 5)}px;
  height: ${({ active }) => (active ? 6 : 5)}px;
  border-radius: 50px;
  background-color: ${({ active }) => (active ? textColor : unClickColor)};
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
              snapToAlignment="start"
              onMomentumScrollEnd={onMomentumEnd}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              contentContainerStyle={{
                paddingTop: 24,
                paddingBottom: 24,
                paddingLeft: horizontalPadding,
                paddingRight: horizontalPadding + peekRight,
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
                      mode="compact"
                    />
                  </Animated.View>
                );
              })}
            </HScroll>

            <Dots>
              <DotRow>
                {CARDS.map((_, i) => (
                  <Dot key={i} active={i === page} />
                ))}
              </DotRow>
            </Dots>
          </CarouselWrap>
        </Container>
      </Wrap>

      <BottomTabBar />
    </Screen>
  );
};

export default TodayScreen;
