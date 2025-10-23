import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useWindowDimensions, ScrollView, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import BrandHeader from "../../components/logo/BrandHeader";
import StudyCard from "../../components/StudyCard";
import BottomTabBar from "../../components/BottomTabBar";
import TopTabs from "../../components/TopTabs";
import { textColor, textOpacityColor } from "../../styles/Color";
import { getMyProfile } from "../../api/profile";
import { getAuthToken, removeAuthToken } from "../../utils/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";
import type { MyProfile } from "../../api/types/profile";
import type { TopKey, StudyTagData } from "./types";
import { TOP_TABS, LAYOUT_CONSTANTS } from "./constants";
import {
  getCircledNumber,
  transformProfileData,
  sortTagsByPriority,
  transformApiTagsToLocal,
} from "./utils";
import {
  Screen,
  Wrap,
  Container,
  ProfileRow as Row,
  ProfileCenter as Center,
  CardWrap,
  Section,
  SectionTitle,
  Card,
  Line,
  SmallLine,
  BtnRow,
  SmallBtn,
  SmallBtnText,
  TagCard,
  TagRow,
  TagLeft,
  TagNo,
  TagText,
  TagInput,
  IconBtn,
} from "./styles";

/* ───────────── Screen ───────────── */
const ProfileScreen = () => {
  const [activeTopTab, setActiveTopTab] = useState<TopKey>("MY");
  const navigation = useNavigation<NativeStackNavigationProp<StackList>>();

  const { width } = useWindowDimensions();

  // API 데이터 상태
  const [profileData, setProfileData] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 태그 데이터 (설정에서 편집)
  const [tagData, setTagData] = useState<StudyTagData>(() => ({
    study_tags: [],
  }));

  // 인라인 편집 상태
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const cardWidth = useMemo(
    () =>
      width -
      LAYOUT_CONSTANTS.HORIZONTAL_PADDING * 2 -
      LAYOUT_CONSTANTS.PEEK_RIGHT,
    [width]
  );

  // 프로필 데이터 로드
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      const token = await getAuthToken();

      if (!token) {
        Alert.alert("오류", "인증 토큰이 없습니다. 다시 로그인해주세요.");
        return;
      }

      const response = await getMyProfile(token);
      const profile = response.option.meta_data.profile;
      setProfileData(profile);

      // API에서 받은 study_tags 데이터를 설정
      if (profile.study_tags && profile.study_tags.length > 0) {
        setTagData({
          study_tags: transformApiTagsToLocal(profile.study_tags),
        });
      }
    } catch (error) {
      console.error("프로필 로드 실패:", error);
      Alert.alert("오류", "프로필 정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPress = useCallback(() => {
    setActiveTopTab("SETTING");
  }, []);

  // 로그아웃 처리
  const handleLogout = useCallback(async () => {
    Alert.alert("로그아웃", "정말 로그아웃하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          try {
            await removeAuthToken();
            Alert.alert("로그아웃", "로그아웃되었습니다.", [
              {
                text: "확인",
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Starting" }],
                  });
                },
              },
            ]);
          } catch (error) {
            console.error("로그아웃 실패:", error);
            Alert.alert("오류", "로그아웃 중 오류가 발생했습니다.");
          }
        },
      },
    ]);
  }, [navigation]);

  // 화면에 보여줄 태그 문자열 배열 (우선순위 순)
  const displayTags = useMemo(
    () => sortTagsByPriority(tagData.study_tags),
    [tagData.study_tags]
  );

  // 프로필 데이터를 화면 표시용으로 변환
  const displayProfile = useMemo(
    () => transformProfileData(profileData, displayTags),
    [profileData, displayTags]
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

      <TopTabs
        items={TOP_TABS}
        activeKey={activeTopTab}
        onChange={(k) => setActiveTopTab(k as TopKey)}
        showUnderline
      />

      <Wrap>
        <Container>
          {activeTopTab === "MY" ? (
            <Center>
              <CardWrap w={cardWidth}>
                <StudyCard
                  image={displayProfile.image}
                  title={displayProfile.title}
                  smallLabel={displayProfile.smallLabel}
                  subtitle={displayProfile.subtitle}
                  description={displayProfile.description}
                  showAlert={displayProfile.showAlert}
                  bookmarked={displayProfile.bookmarked}
                  details={displayProfile.details}
                  badges={displayProfile.badges}
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
                  <SmallLine>
                    아이디 : {profileData?.user.user_id || "로딩중"}
                  </SmallLine>
                  <SmallLine style={{ marginBottom: 0 }}>
                    이메일 : {profileData?.user.email || "로딩중"}
                  </SmallLine>
                  <BtnRow>
                    <SmallBtn tone="secondary">
                      <SmallBtnText>탈퇴하기</SmallBtnText>
                    </SmallBtn>
                    <SmallBtn tone="click" onPress={handleLogout}>
                      <SmallBtnText>로그아웃</SmallBtnText>
                    </SmallBtn>
                  </BtnRow>
                </Card>
              </Section>

              {/* 스터디 정보 */}
              <Section>
                <Card>
                  <SectionTitle>스터디 정보</SectionTitle>
                  <Line>이름 : {profileData?.display_name || "로딩중"}</Line>
                  <Line>
                    나이 : {profileData ? `만 ${profileData.age}세` : "로딩중"}
                  </Line>
                  <Line>
                    성별 :{" "}
                    {profileData
                      ? profileData.gender === "남성"
                        ? "남성"
                        : "여성 "
                      : "로딩중"}
                  </Line>
                  <Line>
                    대학교/전공 :{" "}
                    {profileData
                      ? `${profileData.user.universities.university_name} ${profileData.major.name}`
                      : "로딩중"}
                  </Line>
                  <Line>
                    선호지역 :{" "}
                    {profileData
                      ? `${profileData.region.city_first} ${
                          profileData.region.city_second || ""
                        }`.trim()
                      : "로딩중"}
                  </Line>
                  <Line>
                    선호시간대 :{" "}
                    {profileData
                      ? `${profileData.participation_info.start_time} ~ ${profileData.participation_info.end_time}`
                      : "로딩중"}
                  </Line>
                  <Line>
                    선호 횟수 :{" "}
                    {profileData
                      ? `주 ${profileData.participation_info.period}회, ${profileData.participation_info.period_length}`
                      : "로딩중"}
                  </Line>
                  <Line>목적 : {profileData?.goals_note || "로딩중"}</Line>
                  <Line>
                    스터디 스타일 : {profileData?.collab_style.name || "로딩중"}
                  </Line>
                  <Line>
                    흡연 여부 :{" "}
                    {profileData
                      ? profileData.smoking_status.name === "비흡연"
                        ? "비흡연자"
                        : "흡연자"
                      : "로딩중"}
                  </Line>
                  <Line>
                    스터디 외 모임 여부 :{" "}
                    {profileData
                      ? profileData.social_pref.name === "네"
                        ? "회식 등 팀 모임 선호"
                        : "칼퇴 선호"
                      : "로딩중"}
                  </Line>
                </Card>
              </Section>

              {/* 과목 태그 (인라인 편집) */}
              <Section>
                <TagCard>
                  <SectionTitle>과목 태그</SectionTitle>

                  {LAYOUT_CONSTANTS.TAG_SLOTS.map((i) => {
                    const label = displayTags[i] ?? "";
                    const isEditing = editingIndex === i;
                    return (
                      <TagRow key={`tag-row-${i}`}>
                        <TagLeft>
                          <TagNo>{getCircledNumber(i + 1)}</TagNo>

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
