import { useState, useMemo } from "react";
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

const Notification = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
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
  font-family: "Paperlogy-SemiBold";
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
    tag: "데이터사이언스",
    subTag: "프로젝트",
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
  },
];

const itemsByTab: Record<TopKey, NoticeItem[]> = {
  TO: toItems,
  FROM: fromItems,
};

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
    secondaryButtonLabel: "매칭중",
  },
};

export default function To() {
  const [activeTopTab, setActiveTopTab] = useState<TopKey>("TO");

  const goNextNotification = (key: TopKey) => {
    if (key !== activeTopTab) setActiveTopTab(key);
  };

  // 탭 별 콘텐츠 (TopTabs 아래만 교체)
  const content = useMemo(() => {
    const items = itemsByTab[activeTopTab];
    const labels = labelsByTab[activeTopTab];

    return (
      <>
        {items.map((item) => (
          <NatificationBox
            key={`${activeTopTab}-${item.id}`}
            tag={item.tag}
            subTag={item.subTag}
            expandedTitle={labels.expandedTitle}
            primaryButtonLabel={labels.primaryButtonLabel}
            secondaryButtonLabel={labels.secondaryButtonLabel}
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
  }, [activeTopTab]);

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
      <Notification key={activeTopTab}>{content}</Notification>

      <BottomTabBar />
    </Screen>
  );
}
