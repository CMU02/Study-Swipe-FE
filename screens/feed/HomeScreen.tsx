import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import {
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  Text,
  FlatList,
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
  useApplication,
  type AppliedStudy,
} from "../../contexts/ApplicationContext";

import {
  Screen,
  Container,
  LoadingWrap,
  LoadingText,
} from "../../styles/common";
import { textColor } from "../../styles/Color";

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

/* 태그 선택 모달 스타일 */
const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  background-color: white;
  width: 75%;
  max-height: 50%;
  border-radius: 16px;
  padding: 24px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
`;

const ModalTitle = styled.Text`
  font-family: Paperlogy-SemiBold;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
  color: ${textColor};
`;

const TagItem = styled.TouchableOpacity`
  padding: 14px 16px;
  border-radius: 8px;
  margin-bottom: 4px;
`;

const TagText = styled.Text`
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
  font-size: 15px;
  text-align: center;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 12px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const CloseButtonText = styled.Text`
  font-family: Paperlogy-SemiBold;
  text-align: center;
  font-size: 15px;
  color: ${textColor};
  font-weight: 500;
`;

const SubTabSelector = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  margin: 8px 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const SelectedTagText = styled.Text`
  font-family: Paperlogy-SemiBold;
  font-size: 15px;
  color: ${textColor};
  margin-right: 6px;
`;

const ChangeIcon = styled.Text`
  font-size: 12px;
  color: ${textColor};
`;

/* ───────────── Types & Constants ───────────── */

/* ───────────── Screen ───────────── */
const HomeScreen = () => {
  const [activeTopTab, setActiveTopTab] = useState<TopKey>("TODAY");
  const [page, setPage] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userFirstTag, setUserFirstTag] = useState<string>("");
  const [userTags, setUserTags] = useState<string[]>([]);
  const [selectedSubTag, setSelectedSubTag] = useState<string>("");
  const [showTagModal, setShowTagModal] = useState<boolean>(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null); // 👈 탭 전환 시 맨 앞으로 스크롤
  const { width } = useWindowDimensions();

  const navi = useNavigation<NativeStackNavigationProp<StackList>>();
  const { addAppliedStudy } = useApplication();

  // 카드 데이터를 AppliedStudy로 변환하는 함수
  const convertCardToAppliedStudy = (card: Card): AppliedStudy => {
    return {
      id: `applied-${Date.now()}-${Math.random()}`, // 고유 ID 생성
      tag: card.title, // 카드 제목을 태그로 사용
      subTag: card.smallLabel || "스터디", // smallLabel을 subTag로 사용
      info: {
        purpose: card.details?.purpose || "스터디 목적",
        university: card.details?.school || "대학교 정보",
        location: card.details?.location || "지역 정보",
        time: card.details?.time || "시간 정보",
        days: "주중", // 기본값
        frequency: card.details?.freq || "빈도 정보",
        ageGender: card.details?.age || "나이 정보",
      },
      prefs: card.badges || [], // badges를 prefs로 사용
      skills: card.tags || [], // tags를 skills로 사용
      matchingStatus: "in-progress" as const,
      appliedAt: new Date(),
    };
  };

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

  // 사용자 프로필에서 태그들 가져오기
  const loadUserProfile = async () => {
    try {
      const token = await getAuthToken();
      if (!token) return;

      const response = await getMyProfile(token);
      const profile = response.option.meta_data.profile;

      if (profile.study_tags && profile.study_tags.length > 0) {
        // 우선순위 순으로 정렬
        const sortedTags = profile.study_tags.sort(
          (a, b) => a.priority - b.priority
        );

        // 첫 번째 태그와 모든 태그 저장
        setUserFirstTag(sortedTags[0].tag_name);
        setUserTags(sortedTags.map((tag) => tag.tag_name));

        // SUB 탭의 기본 선택 태그를 첫 번째 태그로 설정
        if (!selectedSubTag) {
          setSelectedSubTag(sortedTags[0].tag_name);
        }
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

  // SUB 탭: 선택한 태그로 매칭
  const loadSubCards = async () => {
    try {
      setIsLoading(true);
      const token = await getAuthToken();
      if (!token || !selectedSubTag) return;

      const response = await getMatchingByTag(token, {
        tag_name: selectedSubTag,
        page: 1,
        limit: 20,
      });

      const transformedCards = response.option.data.map(
        transformMatchingProfileToCard
      );
      setCards(transformedCards);
    } catch (error) {
      console.error("SUB 카드 로드 실패:", error);
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
    } else if (activeTopTab === "SUB" && selectedSubTag) {
      loadSubCards();
    } else if (activeTopTab === "DISCOVER") {
      loadDiscoverCards();
    }
  }, [activeTopTab]);

  // SUB 탭에서 선택한 태그가 변경될 때 데이터 로드
  useEffect(() => {
    if (activeTopTab === "SUB" && selectedSubTag) {
      loadSubCards();
    }
  }, [selectedSubTag]);

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

      {/* SUB 탭일 때 태그 선택기 표시 */}
      {activeTopTab === "SUB" && (
        <SubTabSelector onPress={() => setShowTagModal(true)}>
          <SelectedTagText>#태그 : {selectedSubTag}</SelectedTagText>
          <ChangeIcon>▼</ChangeIcon>
        </SubTabSelector>
      )}

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
                  : activeTopTab === "SUB"
                  ? `${selectedSubTag} 태그의 매칭이 없습니다`
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
                        onPressCta={() => {
                          // 현재 카드 데이터를 AppliedStudy로 변환하여 Context에 추가
                          const appliedStudy = convertCardToAppliedStudy(c);
                          addAppliedStudy(appliedStudy);

                          Alert.alert("신청 완료", "신청되었습니다.", [
                            {
                              text: "확인",
                              style: "default",
                            },
                            {
                              text: "보기",
                              style: "default",
                              onPress: () => {
                                navi.navigate("Talk", { initialTab: "FROM" });
                              },
                            },
                          ]);
                        }}
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

      {/* 태그 선택 모달 */}
      <Modal
        visible={showTagModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTagModal(false)}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>태그 선택</ModalTitle>
            <FlatList
              data={userTags}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TagItem
                  onPress={() => {
                    setSelectedSubTag(item);
                    setShowTagModal(false);
                  }}
                  style={{
                    backgroundColor:
                      item === selectedSubTag ? "#e3f2fd" : "transparent",
                  }}
                >
                  <TagText
                    style={{
                      fontWeight: item === selectedSubTag ? "600" : "normal",
                      color: item === selectedSubTag ? "#1976d2" : "#495057",
                    }}
                  >
                    {item}
                  </TagText>
                </TagItem>
              )}
            />
            <CloseButton onPress={() => setShowTagModal(false)}>
              <CloseButtonText>닫기</CloseButtonText>
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Screen>
  );
};

export default HomeScreen;
