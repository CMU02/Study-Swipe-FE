import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import {
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
  ScrollView,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import BrandHeader from "../../components/logo/BrandHeader";
import StudyCard from "../../components/StudyCard";
import BottomTabBar from "../../components/BottomTabBar";
import TopTabs from "../../components/TopTabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";
import { getMatchingByTag, getAllMatching } from "../../api/matching";
import { getMyProfile } from "../../api/profile";
import { getAuthToken } from "../../utils/auth";
import { ymdSeed } from "./utils/dateUtils";
import { seededShuffle } from "./utils/shuffleUtils";
import {
  transformMatchingProfileToCard,
  type Card,
} from "./utils/dataTransform";
import { TOP_TABS, type TopKey } from "./types";

import {
  Screen,
  Container,
  LoadingWrap,
  LoadingText,
} from "../../styles/common";

/* ───────────── Styled ───────────── */
const Wrap = styled.View`
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

/* ───────────── Screen ───────────── */
const HomeScreen = () => {
  const [activeTopTab, setActiveTopTab] = useState<TopKey>("TODAY");
  const [page, setPage] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userFirstTag, setUserFirstTag] = useState<string>("");

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null); // 👈 탭 전환 시 맨 앞으로 스크롤
  const { width } = useWindowDimensions();

  const navi = useNavigation<NativeStackNavigationProp<StackList>>();

  // layout constants
  const horizontalPadding = 16;
  const cardGap = 14;
  const peekRight = 64;

  const cardWidth = useMemo(
    () => width - horizontalPadding * 2 - peekRight,
    [width]
  );
  const itemStride = useMemo(() => cardWidth + cardGap, [cardWidth, cardGap]);

  /** 탭에 따라 보여줄 카드 목록 계산 */
  const displayedCards = useMemo(() => {
    return cards;
  }, [cards]);

  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const idx = Math.round(x / itemStride);
      const clamped = Math.max(0, Math.min(idx, displayedCards.length - 1));
      setPage(clamped);
    },
    [itemStride, displayedCards.length]
  );

  const centerGap = (width - cardWidth) / 2;

  // 사용자 프로필에서 첫 번째 태그 가져오기
  const loadUserProfile = async () => {
    try {
      const token = await getAuthToken();
      if (!token) return;

      const response = await getMyProfile(token);
      const profile = response.option.meta_data.profile;

      if (profile.study_tags && profile.study_tags.length > 0) {
        // 우선순위 순으로 정렬하여 첫 번째 태그 가져오기
        const sortedTags = profile.study_tags.sort(
          (a, b) => a.priority - b.priority
        );
        setUserFirstTag(sortedTags[0].tag_name);
      }
    } catch (error) {
      console.error("사용자 프로필 로드 실패:", error);
    }
  };

  // TODAY 탭: 사용자의 첫 번째 태그로 매칭
  const loadTodayCards = async () => {
    try {
      setIsLoading(true);
      const token = await getAuthToken();
      if (!token || !userFirstTag) return;

      const response = await getMatchingByTag(token, {
        tag_name: userFirstTag,
        page: 1,
        limit: 20,
      });

      const transformedCards = response.option.data.map(
        transformMatchingProfileToCard
      );
      // 시드 셔플 적용
      const shuffledCards = seededShuffle(
        transformedCards,
        `today-${ymdSeed()}`
      );
      setCards(shuffledCards);
    } catch (error) {
      console.error("TODAY 카드 로드 실패:", error);
      Alert.alert("오류", "매칭 데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // DISCOVER 탭: 전체 사용자 매칭
  const loadDiscoverCards = async () => {
    try {
      setIsLoading(true);
      const token = await getAuthToken();
      if (!token) return;

      const response = await getAllMatching(token, 1, 20);
      const transformedCards = response.option.data.map(
        transformMatchingProfileToCard
      );
      setCards(transformedCards);
    } catch (error) {
      console.error("DISCOVER 카드 로드 실패:", error);
      Alert.alert("오류", "매칭 데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    loadUserProfile();
  }, []);

  // 사용자 태그가 로드되면 TODAY 카드 로드
  useEffect(() => {
    if (userFirstTag && activeTopTab === "TODAY") {
      loadTodayCards();
    }
  }, [userFirstTag, activeTopTab]);

  // 탭 변경 시 데이터 로드
  useEffect(() => {
    if (activeTopTab === "TODAY" && userFirstTag) {
      loadTodayCards();
    } else if (activeTopTab === "DISCOVER") {
      loadDiscoverCards();
    }
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
          {isLoading ? (
            <LoadingWrap>
              <LoadingText>매칭 데이터를 불러오는 중...</LoadingText>
            </LoadingWrap>
          ) : displayedCards.length === 0 ? (
            <LoadingWrap>
              <LoadingText>
                {activeTopTab === "TODAY"
                  ? "오늘의 추천 매칭이 없습니다"
                  : "매칭 데이터가 없습니다"}
              </LoadingText>
            </LoadingWrap>
          ) : (
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
                        marginRight:
                          i < displayedCards.length - 1 ? cardGap : 0,
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
                        onPressCta={() => navi.navigate("Talk")}
                      />
                    </Animated.View>
                  );
                })}
              </HScroll>
            </CarouselWrap>
          )}
        </Container>
      </Wrap>

      <BottomTabBar />
    </Screen>
  );
};

export default HomeScreen;
