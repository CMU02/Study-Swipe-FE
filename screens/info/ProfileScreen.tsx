// app/screens/profile/ProfileScreen.tsx
import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import BrandHeader from "../../components/logo/BrandHeader";
import StudyCard from "../../components/StudyCard";
import BottomTabBar from "../../components/BottomTabBar";
import TopTabs from "../../components/TopTabs";
import {
  clickColor,
  primaryColor,
  secondaryColor,
  textColor,
  textOpacityColor,
  thirdColor,
} from "../../styles/Color";

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

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const TogglePress = styled.TouchableOpacity``;

const Pill = styled.View<{ active: boolean }>`
  width: 27px;
  height: 17px;
  border-radius: 24px;
  border-width: 2px;
  border-color: ${textColor};
  background-color: ${({ active }) => (active ? primaryColor : secondaryColor)};
  padding: 3px;
  justify-content: center;
`;

const Knob = styled.View<{ active: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 3.5px;
  background-color: ${textColor};
  align-self: ${({ active }) => (active ? "flex-end" : "flex-start")};
`;

const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const CardWrap = styled.View<{ w: number }>`
  width: ${({ w }) => w}px;
`;

/* ───────────── Setting UI ───────────── */
const Section = styled.View`
  width: 100%;
  padding: 8px 0px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
  margin-bottom: 5px;
`;

const Card = styled.View`
  background: ${thirdColor};
  border-radius: 8px;
  padding: 10px 12px;
  gap: 12px;

  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 3;
`;

const Line = styled.Text`
  font-family: Paperlogy-SemiBold;
  font-size: 15px;
  color: ${textColor};
`;

const SmallLine = styled(Line)`
  font-size: 10px;
  margin-top: -7px;
`;

const BtnRow = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const SmallBtn = styled.TouchableOpacity<{ tone?: "click" | "secondary" }>`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${({ tone }) =>
    tone === "secondary" ? secondaryColor : clickColor};
`;

const SmallBtnText = styled.Text`
  font-family: Paperlogy-SemiBold;
  font-size: 15px;
  color: ${textColor};
`;

/* 태그 편집 행 */
const TagCard = styled(Card)`
  gap: 8px;
`;

const TagRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-width: 2px;
  border-color: ${textColor};
  border-radius: 10px;
  padding: 10px 12px;
`;

const TagLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const TagNo = styled.Text`
  font-family: Paperlogy-SemiBold;
  font-size: 16px;
  color: ${textColor};
  width: 22px; /* 번호 칸 고정 */
`;

const TagText = styled.Text`
  font-family: Paperlogy-SemiBold;
  font-size: 15px;
  color: ${textColor};
`;

const TagInput = styled.TextInput`
  flex: 1;
  font-family: Paperlogy-SemiBold;
  font-size: 15px;
  color: ${textColor};
  padding-vertical: 4px;
`;

const IconBtn = styled(TouchableOpacity)`
  padding: 6px;
  border-radius: 8px;
  margin-left: 8px;
`;

/* ───────────── Types & Dummy ───────────── */
type TopKey = "MY" | "SETTING";

type StudyTag = { tag_name: string; priority: number };
type StudyTagData = { study_tags: StudyTag[] };

const TOP_TABS: { key: TopKey; label: string }[] = [
  { key: "MY", label: "My Profile" },
  { key: "SETTING", label: "Profile Setting" },
];

const MY_PROFILE = {
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
  // 초기 태그(표시용)
  tags: ["프론트 엔드", "백엔드", "풀스택", "자바스크립트", "자료구조"],
};

/* 번호(①~⑤) 유니코드 헬퍼 */
const circled = (i: number) => {
  // 1~20 범위 지원 (①=U+2460)
  if (i >= 1 && i <= 20) return String.fromCharCode(0x2460 + (i - 1));
  return `${i}.`;
};

/* ───────────── Screen ───────────── */
const ProfileScreen = () => {
  const [activeTopTab, setActiveTopTab] = useState<TopKey>("MY");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const { width } = useWindowDimensions();

  // 태그 데이터 (설정에서 편집)
  const [tagData, setTagData] = useState<StudyTagData>(() => ({
    study_tags: (MY_PROFILE.tags || [])
      .slice(0, 5)
      .map((t, idx) => ({ tag_name: t, priority: idx + 1 })),
  }));

  // 인라인 편집 상태
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const horizontalPadding = 16;
  const peekRight = 64;
  const cardWidth = useMemo(
    () => width - horizontalPadding * 2 - peekRight,
    [width]
  );

  useEffect(() => {
    // TODO: get initial visibility from API/AsyncStorage
  }, []);

  const toggleVisibility = useCallback(() => {
    setIsPublic((p) => {
      const next = !p;
      // TODO: persist next to API/AsyncStorage
      return next;
    });
  }, []);

  const handleEditPress = useCallback(() => {
    setActiveTopTab("SETTING");
  }, []);

  // StudyTagStep 콜백들 (미리보기 반영)
  const handleTagDataChange = useCallback((partial: StudyTagData) => {
    setTagData(partial);
  }, []);

  const handleValidate = useCallback((valid: boolean) => {
    // 필요시 저장 버튼 활성화 제어 가능
  }, []);

  // 화면에 보여줄 태그 문자열 배열 (우선순위 순)
  const displayTags = useMemo(
    () =>
      tagData.study_tags
        .slice()
        .sort((a, b) => a.priority - b.priority)
        .map((t) => t.tag_name),
    [tagData.study_tags]
  );

  /* ───────────── 인라인 편집 로직 ───────────── */
  const startEdit = useCallback(
    (rowIndex: number) => {
      const current = displayTags[rowIndex] ?? "";
      setEditingIndex(rowIndex);
      setEditingText(current);
    },
    [displayTags]
  );

  const cancelEdit = useCallback(() => {
    setEditingIndex(null);
    setEditingText("");
  }, []);

  const commitEdit = useCallback(() => {
    if (editingIndex === null) return;
    const nextText = editingText.trim();

    // tagData.study_tags의 우선순위는 1~5라서, 표시 순서와 동일하다고 가정
    setTagData((prev) => {
      const sorted = prev.study_tags
        .slice()
        .sort((a, b) => a.priority - b.priority);

      // 편집 대상이 기존에 없었으면 새로 추가(빈 슬롯) 처리
      if (!sorted[editingIndex]) {
        sorted[editingIndex] = {
          tag_name: nextText || "",
          priority: editingIndex + 1,
        };
      } else {
        sorted[editingIndex] = {
          ...sorted[editingIndex],
          tag_name: nextText || "",
        };
      }

      return { study_tags: sorted };
    });

    setEditingIndex(null);
    setEditingText("");
  }, [editingIndex, editingText]);

  // 입력 도중 즉시 반영을 원하면 onChangeText에서 setTagData를 호출해도 됨.
  const liveChange = useCallback(
    (text: string) => {
      setEditingText(text);
      // 즉시 카드에 반영하고 싶다면 아래 주석을 풀어 사용:
      // if (editingIndex !== null) {
      //   setTagData((prev) => {
      //     const sorted = prev.study_tags.slice().sort((a,b)=>a.priority-b.priority);
      //     if (!sorted[editingIndex]) {
      //       sorted[editingIndex] = { tag_name: text, priority: editingIndex + 1 };
      //     } else {
      //       sorted[editingIndex] = { ...sorted[editingIndex], tag_name: text };
      //     }
      //     return { study_tags: sorted };
      //   });
      // }
    },
    [editingIndex]
  );

  return (
    <Screen>
      <BrandHeader />

      {/* 탭 + 공개 토글 */}
      <Row>
        <TopTabs
          items={TOP_TABS}
          activeKey={activeTopTab}
          onChange={(k) => setActiveTopTab(k as TopKey)}
          showUnderline
        />
        <TogglePress onPress={toggleVisibility} activeOpacity={0.8}>
          <Pill active={isPublic}>
            <Knob active={isPublic} />
          </Pill>
        </TogglePress>
      </Row>

      <Wrap>
        <Container>
          {activeTopTab === "MY" ? (
            <Center>
              <CardWrap w={cardWidth}>
                <StudyCard
                  image={MY_PROFILE.image}
                  title={MY_PROFILE.title}
                  smallLabel={MY_PROFILE.smallLabel}
                  subtitle={MY_PROFILE.subtitle}
                  description={MY_PROFILE.description}
                  showAlert={MY_PROFILE.showAlert}
                  bookmarked={MY_PROFILE.bookmarked}
                  details={MY_PROFILE.details}
                  badges={MY_PROFILE.badges}
                  tags={displayTags.map((t, i) => `#${i + 1} ${t}`)}
                  variant="edit"
                  onPressCta={handleEditPress}
                />
              </CardWrap>
            </Center>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 32,
                paddingHorizontal: 16,
              }}
            >
              {/* 계정 정보 */}
              <Section>
                <Card>
                  <SectionTitle>계정 정보</SectionTitle>
                  <SmallLine>아이디 : Design Test</SmallLine>
                  <SmallLine style={{ marginBottom: 0 }}>
                    이메일 : Design Test @ email.study-swipe.ac.kr
                  </SmallLine>
                  <BtnRow>
                    <SmallBtn tone="click">
                      <SmallBtnText>비밀번호 변경하기</SmallBtnText>
                    </SmallBtn>
                    <SmallBtn tone="secondary">
                      <SmallBtnText>계정 탈퇴하기</SmallBtnText>
                    </SmallBtn>
                  </BtnRow>
                </Card>
              </Section>

              {/* 스터디 정보 */}
              <Section>
                <Card>
                  <SectionTitle>스터디 정보</SectionTitle>
                  <Line>선호지역 : 경기도 안양시</Line>
                  <Line>선호시간대 : 오후 7시 ~ 9시</Line>
                  <Line>선호요일대 : 주중</Line>
                  <Line>선호 횟수 : 주 2회, 3개월</Line>
                  <Line>목적 : 전공 공부 및 포트폴리오 작성</Line>
                  <Line>스터디 스타일 : 피어</Line>
                  <Line>팀장 선호 여부 : 팀장</Line>
                  <Line>흡연 여부 : 흡연자</Line>
                  <Line>스터디 모임 여부 : 멤버 선호</Line>
                </Card>
              </Section>

              {/* 과목 태그 (인라인 편집) */}
              <Section>
                <TagCard>
                  <SectionTitle>과목 태그</SectionTitle>

                  {[0, 1, 2, 3, 4].map((i) => {
                    const label = displayTags[i] ?? "";
                    const isEditing = editingIndex === i;
                    return (
                      <TagRow key={`tag-row-${i}`}>
                        <TagLeft>
                          <TagNo>{circled(i + 1)}</TagNo>

                          {isEditing ? (
                            <TagInput
                              value={editingText}
                              onChangeText={liveChange}
                              autoFocus
                              placeholder="태그를 입력하세요"
                              placeholderTextColor={textOpacityColor}
                              returnKeyType="done"
                              onSubmitEditing={commitEdit}
                              onBlur={commitEdit} // 포커스 벗어나면 확정
                            />
                          ) : (
                            <TagText>{label || "미설정"}</TagText>
                          )}
                        </TagLeft>

                        {/* 오른쪽 아이콘: 편집 전 → 연필 / 편집 중 → 체크 + X */}
                        {isEditing ? (
                          <Row>
                            <IconBtn onPress={commitEdit} activeOpacity={0.8}>
                              <Feather
                                name="check"
                                size={18}
                                color={textColor}
                              />
                            </IconBtn>
                            <IconBtn onPress={cancelEdit} activeOpacity={0.8}>
                              <Feather name="x" size={18} color={textColor} />
                            </IconBtn>
                          </Row>
                        ) : (
                          <IconBtn
                            onPress={() => startEdit(i)}
                            activeOpacity={0.8}
                          >
                            <Feather
                              name="edit-2"
                              size={16}
                              color={textColor}
                            />
                          </IconBtn>
                        )}
                      </TagRow>
                    );
                  })}
                </TagCard>
              </Section>
            </ScrollView>
          )}
        </Container>
      </Wrap>

      <BottomTabBar />
    </Screen>
  );
};

export default ProfileScreen;
