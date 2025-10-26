import { useState, useMemo } from "react";
import { ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useApplication } from "../../contexts/ApplicationContext";
import styled from "styled-components/native";
import BrandHeader from "../../components/logo/BrandHeader";
import TopTabs from "../../components/TopTabs";
import NatificationBox from "../../components/NotificationBox";
import BottomTabBar from "../../components/BottomTabBar";
import { clickColor, secondaryColor, textColor } from "../../styles/Color";
import TagBox from "../../components/TagBox";

const Screen = styled.View`
  flex: 1;
  background-color: #fff;
`;

const NotificationContainer = styled.View`
  flex: 1;
`;

const NotificationContent = styled.View`
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 20px;
`;

const Card = styled.View`
  padding-left: 17px;
`;

const Info = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const InfoText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
  margin-bottom: 10px;
`;

const Tag = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

type TopKey = "TO" | "FROM";

const TOP_TABS: { key: TopKey; label: string }[] = [
  { key: "TO", label: "TO" },
  { key: "FROM", label: "FROM" },
];

// 더미 데이터
type NoticeItem = {
  id: string;
  tag: string;
  subTag: string;
  info: {
    purpose: string;
    university: string;
    location: string;
    time: string;
    days: string;
    frequency: string;
    ageGender: string;
  };
  prefs: string[]; // secondaryColor 태그
  skills: string[]; // clickColor 태그
  matchingStatus?: "completed" | "in-progress"; // FROM 탭용 매칭 상태
};

const toItems: NoticeItem[] = [
  {
    id: "to-1",
    tag: "프론트엔드",
    subTag: "피어",
    info: {
      purpose: "전공 공부 (FE 위주)",
      university: "중앙대학교 컴퓨터공학과",
      location: "경기도 의왕시",
      time: "오후 7시 ~ 9시",
      days: "주중",
      frequency: "주 2회, 3개월",
      ageGender: "만 21세 / 남",
    },
    prefs: ["2~3인", "비흡연자", "피어", "칼퇴 선호"],
    skills: [
      "#1 React",
      "#2 TypeScript",
      "#3 Next.js",
      "#4 Styled-Components",
      "#5 Zustand",
    ],
  },
  {
    id: "to-2",
    tag: "백엔드",
    subTag: "멘토",
    info: {
      purpose: "취업 대비 알고리즘 + BE",
      university: "숭실대학교 소프트웨어학부",
      location: "서울 동작구",
      time: "오후 8시 ~ 10시",
      days: "주 3일",
      frequency: "주 3회, 2개월",
      ageGender: "만 25세 / 남",
    },
    prefs: ["1~2인", "원격 가능", "야간 가능", "코드리뷰 선호"],
    skills: ["#1 Spring", "#2 JPA", "#3 MySQL", "#4 Redis", "#5 AWS"],
  },
];

const fromItems: NoticeItem[] = [
  {
    id: "from-1",
    tag: "SQLD",
    subTag: "러너",
    info: {
      purpose: "캡스톤 데이터 분석",
      university: "한양대학교 산업공학과",
      location: "서울 성동구",
      time: "오후 6시 ~ 8시",
      days: "주중",
      frequency: "주 2회, 1개월",
      ageGender: "만 23세 / 여",
    },
    prefs: ["3~4인", "원격/오프 혼합", "발표 역할 가능", "리서치 선호"],
    skills: [
      "#1 Python",
      "#2 Pandas",
      "#3 Scikit-Learn",
      "#4 UMAP",
      "#5 Matplotlib",
    ],
    matchingStatus: "completed", // 매칭 진행중 상태 (매칭 취소 가능)
  },
  {
    id: "from-2",
    tag: "모바일",
    subTag: "피어",
    info: {
      purpose: "RN 앱 퍼블리싱",
      university: "가톨릭대학교 컴퓨터정보공학부",
      location: "경기도 부천시",
      time: "오후 7시 ~ 9시",
      days: "주말",
      frequency: "주 1회, 6주",
      ageGender: "만 24세 / 남",
    },
    prefs: ["2~3인", "오프라인 선호", "디자인 관심", "코드리뷰 선호"],
    skills: [
      "#1 React Native",
      "#2 Expo",
      "#3 Reanimated",
      "#4 Zustand",
      "#5 Figma",
    ],
    matchingStatus: "completed", // 매칭 완료 상태
  },
];

// itemsByTab는 함수 내부에서 동적으로 생성하도록 변경

// 탭별 라벨/타이틀 세트
const labelsByTab: Record<
  TopKey,
  {
    expandedTitle: string;
    primaryButtonLabel: string;
    secondaryButtonLabel: string;
  }
> = {
  TO: {
    expandedTitle: "상세 정보",
    primaryButtonLabel: "자세히 보기",
    secondaryButtonLabel: "함께하기",
  },
  FROM: {
    expandedTitle: "신청 정보",
    primaryButtonLabel: "매칭 취소",
    secondaryButtonLabel: "매칭 취소",
  },
};

type NotificationScreenParams = {
  initialTab?: TopKey;
};

export default function NotificationScreen() {
  const route = useRoute();
  const params = route.params as NotificationScreenParams | undefined;
  const [activeTopTab, setActiveTopTab] = useState<TopKey>(
    params?.initialTab || "TO"
  );
  const { appliedStudies, removeAppliedStudy } = useApplication();

  const goNextNotification = (key: TopKey) => {
    if (key !== activeTopTab) setActiveTopTab(key);
  };

  // 매칭 취소 핸들러
  const handleCancelMatching = (itemId: string, itemTag: string) => {
    Alert.alert("매칭 취소", "정말 취소하시겠습니까?", [
      {
        text: "아니오",
        style: "cancel",
      },
      {
        text: "예",
        style: "destructive",
        onPress: () => {
          // 신청한 스터디 목록에서 해당 항목 삭제
          removeAppliedStudy(itemId);
          Alert.alert("취소 완료", "매칭이 취소되었습니다.");
        },
      },
    ]);
  };

  // 탭 별 콘텐츠 (TopTabs 아래만 교체)
  const content = useMemo(() => {
    // FROM 탭의 경우 신청한 스터디와 기존 더미 데이터를 합침
    const items =
      activeTopTab === "FROM" ? [...appliedStudies, ...fromItems] : toItems;
    const labels = labelsByTab[activeTopTab];

    return (
      <>
        {items.map((item) => (
          <NatificationBox
            key={`${activeTopTab}-${item.id}`}
            tag={item.tag}
            subTag={item.subTag}
            expandedTitle={labels.expandedTitle}
            primaryButtonLabel={
              activeTopTab === "FROM" && item.matchingStatus === "completed"
                ? "매칭 완료"
                : labels.primaryButtonLabel
            }
            secondaryButtonLabel={labels.secondaryButtonLabel}
            isDisabled={
              activeTopTab === "FROM" && item.matchingStatus === "completed"
            }
            matchingStatus={
              activeTopTab === "FROM" ? item.matchingStatus : undefined
            }
            onSecondaryPress={() => {
              // FROM 탭에서 매칭 취소 버튼 클릭 시
              if (
                activeTopTab === "FROM" &&
                item.matchingStatus === "in-progress"
              ) {
                handleCancelMatching(item.id, item.tag);
              }
            }}
          >
            <Card>
              <Info>
                <InfoText>목적 : {item.info.purpose}</InfoText>
                <InfoText>대학교/전공 : {item.info.university}</InfoText>
                <InfoText>선호지역 : {item.info.location}</InfoText>
                <InfoText>선호시간대 : {item.info.time}</InfoText>
                <InfoText>선호요일대 : {item.info.days}</InfoText>
                <InfoText>선호횟수 : {item.info.frequency}</InfoText>
                <InfoText>나이 : {item.info.ageGender}</InfoText>
              </Info>

              <Tag>
                {item.prefs.map((p) => (
                  <TagBox
                    key={`pref-${item.id}-${p}`}
                    label={p}
                    bgColor={secondaryColor}
                  />
                ))}
              </Tag>

              <Tag>
                {item.skills.map((s) => (
                  <TagBox
                    key={`skill-${item.id}-${s}`}
                    label={s}
                    bgColor={clickColor}
                  />
                ))}
              </Tag>
            </Card>
          </NatificationBox>
        ))}
      </>
    );
  }, [activeTopTab, appliedStudies]);

  return (
    <Screen>
      <BrandHeader />

      <TopTabs
        items={TOP_TABS}
        activeKey={activeTopTab}
        onChange={(k) => goNextNotification(k as TopKey)}
        showUnderline
      />

      {/* 탭 전환 시 내부 상태 초기화 (예: 확장/스크롤) */}
      <NotificationContainer>
        <ScrollView
          key={activeTopTab}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <NotificationContent>{content}</NotificationContent>
        </ScrollView>
      </NotificationContainer>

      <BottomTabBar />
    </Screen>
  );
}
