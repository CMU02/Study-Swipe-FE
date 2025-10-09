import { useState } from "react";
import styled from "styled-components/native";
import BrandHeader from "../../components/logo/BrandHeader";
import TopTabs from "../../components/TopTabs";
import BottomTabBar from "../../components/BottomTabBar";
import NatificationBox from "../../components/NotificationBox";
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

export default function From() {
  const [activeTopTab, setActiveTopTab] = useState<TopKey>("FROM");

  return (
    <Screen>
      <BrandHeader />

      <TopTabs
        items={TOP_TABS}
        activeKey={activeTopTab}
        onChange={(k) => setActiveTopTab(k as TopKey)}
        showUnderline
      />

      <Notification>
        <NatificationBox
          tag="프론트엔드"
          subTag="피어"
          expandedTitle="상세정보"
          primaryButtonLabel="자세히 보기"
          secondaryButtonLabel="함께하기"
        >
          <Card>
            <Info>
              <InfoText>목적 : 전공 공부</InfoText>
              <InfoText>대학교/전공 : 중앙대학교 컴퓨터공학과</InfoText>
              <InfoText>선호지역 : 경기도 의왕시</InfoText>
              <InfoText>선호시간대 : 오후 7시 ~ 9시</InfoText>
              <InfoText>선호요일대 : 주중</InfoText>
              <InfoText>선호횟수 : 주 2회, 3개월</InfoText>
              <InfoText>나이 : 만 21세/남</InfoText>
            </Info>

            <Tag>
              <TagBox label="2~3인" bgColor={secondaryColor} />
              <TagBox label="흡연자" bgColor={secondaryColor} />
              <TagBox label="피어" bgColor={secondaryColor} />
              <TagBox label="칼퇴 선호" bgColor={secondaryColor} />
            </Tag>

            <Tag>
              <TagBox label="#1 프론트엔드" bgColor={clickColor} />
              <TagBox label="#2 백엔드" bgColor={clickColor} />
              <TagBox label="#3 자바" bgColor={clickColor} />
              <TagBox label="#4 리눅스" bgColor={clickColor} />
              <TagBox label="#5 정보처리산업기사" bgColor={clickColor} />
            </Tag>
          </Card>
        </NatificationBox>

        <NatificationBox
          tag="프론트엔드"
          subTag="피어"
          expandedTitle="상세정보"
          primaryButtonLabel="자세히 보기"
          secondaryButtonLabel="함께하기"
        >
          <Card>
            <Info>
              <InfoText>목적 : 전공 공부</InfoText>
              <InfoText>대학교/전공 : 중앙대학교 컴퓨터공학과</InfoText>
              <InfoText>선호지역 : 경기도 의왕시</InfoText>
              <InfoText>선호시간대 : 오후 7시 ~ 9시</InfoText>
              <InfoText>선호요일대 : 주중</InfoText>
              <InfoText>선호횟수 : 주 2회, 3개월</InfoText>
              <InfoText>나이 : 만 21세/남</InfoText>
            </Info>

            <Tag>
              <TagBox label="2~3인" bgColor={secondaryColor} />
              <TagBox label="흡연자" bgColor={secondaryColor} />
              <TagBox label="피어" bgColor={secondaryColor} />
              <TagBox label="칼퇴 선호" bgColor={secondaryColor} />
            </Tag>

            <Tag>
              <TagBox label="#1 프론트엔드" bgColor={clickColor} />
              <TagBox label="#2 백엔드" bgColor={clickColor} />
              <TagBox label="#3 자바" bgColor={clickColor} />
              <TagBox label="#4 리눅스" bgColor={clickColor} />
              <TagBox label="#5 정보처리산업기사" bgColor={clickColor} />
            </Tag>
          </Card>
        </NatificationBox>
      </Notification>

      <BottomTabBar />
    </Screen>
  );
}
