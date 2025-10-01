import React, { useState } from "react";
import styled from "styled-components/native";
import {
  TouchableOpacity,
  ImageSourcePropType,
  ImageBackground,
  Dimensions,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  clickColorOpacity,
  secondaryColorOpacity,
  textColor,
  thirdColor,
} from "../styles/Color";

const { height: windowHeight } = Dimensions.get("window");

/* ───────────── Types ───────────── */
export interface StudyDetails {
  purpose?: string; // 목적
  school?: string; // 대학교/전공
  location?: string; // 선호지역
  time?: string; // 선호시간대
  days?: string; // 선호요일대
  freq?: string; // 선호 횟수
  age?: string; // 나이
}

export interface StudyCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  description?: string;
  smallLabel?: string;
  showAlert?: boolean;
  bookmarked?: boolean;

  /** 뒷면 데이터 */
  details?: StudyDetails; // 본문 항목들
  badges?: string[]; // 상단 작은 칩들
  tags?: string[]; // 해시태그 칩들

  style?: any;
}

/* ───────────── Styled ───────────── */
const CARD_HEIGHT = windowHeight * 0.6;

const CardPress = styled(TouchableOpacity)`
  width: 100%;
`;

const CardBox = styled.View`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  height: ${CARD_HEIGHT}px;
`;

const Cover = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const BackRoot = styled.View`
  width: 100%;
  height: 100%;
  background: ${thirdColor};
  border-radius: 8px;
`;

const BadgeTopRight = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  flex-direction: row;
`;

const BadgeIcon = styled.View`
  width: 28px;
  height: 28px;
  margin-left: 6px;
  border-radius: 8px;
  background: ${thirdColor};
  align-items: center;
  justify-content: center;

  /* 살짝 띄워주기 */
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
  elevation: 3;
`;

const CaptionWrap = styled.View`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  border-radius: 14px;
  background: #fff;
  padding: 14px 14px 16px;

  /* ✅ 캡션 박스 그림자 */
  shadow-color: #000;
  shadow-opacity: 0.14;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 4;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
`;

const TitleText = styled.Text`
  flex: 1;
  font-size: 20px;
  font-family: "Paperlogy-SemiBold";
  color: ${textColor};
`;

// 협업 성향 (멘토 / 러너 / 피어)
const SmallLabel = styled.Text`
  padding: 2px 10px;
  border-radius: 999px;
  background: #f1f3f5;
  font-size: 12px;
  font-family: "Paperlogy-SemiBold";
  color: ${textColor};
`;

// 학교 + 전공
const SubText = styled.Text`
  margin-top: 6px;
  font-size: 13px;
  font-family: "Paperlogy-SemiBold";
  color: ${textColor};
`;

// 소개
const DescText = styled.Text`
  margin-top: 6px;
  font-size: 12px;
  font-family: "Paperlogy-SemiBold";
  color: ${textColor};
`;

const BackScroll = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 16 },
})`
  flex: 1;
`;

const BackHeader = styled.Text`
  font-size: 20px;
  font-family: "Paperlogy-SemiBold";
  color: ${textColor};
  margin-bottom: 12px;
`;

// 상세 정보
const Line = styled.Text`
  font-size: 13px;
  font-family: "Paperlogy-SemiBold";
  color: ${textColor};
  line-height: 20px;
  margin-bottom: 2px;
`;

const ChipsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

// 상단 태그 (Warm Coral)
const ChipBox = styled.View`
  padding: 4px 10px;
  border-radius: 10px;
  background: ${secondaryColorOpacity};

  shadow-color: #000;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
  elevation: 3;
`;

const ChipText = styled.Text`
  font-size: 12px;
  font-family: "Paperlogy-SemiBold";
  color: #fff;
`;

// 하단 태그 (Mint Green)
const TagChipBox = styled.View`
  padding: 4px 8px;
  border-radius: 8px;
  background: ${clickColorOpacity};

  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const TagChipText = styled.Text`
  font-size: 11px;
  font-family: "Paperlogy-SemiBold";
  color: #fff;
`;

/* ───────────── Component ───────────── */
export default function StudyCard({
  image,
  title,
  subtitle,
  description,
  smallLabel,
  showAlert,
  bookmarked,
  details,
  badges,
  tags,
  style,
}: StudyCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handlePress = () => {
    setFlipped((v) => !v);
  };

  return (
    <CardPress activeOpacity={0.9} onPress={handlePress}>
      <CardBox style={style}>
        {flipped ? (
          /* ───── Back (상세) ───── */
          <BackRoot>
            <BackScroll>
              <BackHeader>스터디 상세 정보</BackHeader>

              {details?.purpose && <Line>목적 : {details.purpose}</Line>}
              {details?.school && <Line>대학교/전공 : {details.school}</Line>}
              {details?.location && <Line>선호지역 : {details.location}</Line>}
              {details?.time && <Line>선호시간대 : {details.time}</Line>}
              {details?.days && <Line>선호요일대 : {details.days}</Line>}
              {details?.freq && <Line>선호 횟수 : {details?.freq}</Line>}
              {details?.age && <Line>나이 : {details.age}</Line>}

              {!!badges?.length && (
                <ChipsRow>
                  {badges.map((b, i) => (
                    <ChipBox key={`${b}-${i}`}>
                      <ChipText>{b}</ChipText>
                    </ChipBox>
                  ))}
                </ChipsRow>
              )}

              {!!tags?.length && (
                <ChipsRow>
                  {tags.map((t, i) => (
                    <TagChipBox key={`${t}-${i}`}>
                      <TagChipText>{t}</TagChipText>
                    </TagChipBox>
                  ))}
                </ChipsRow>
              )}

              <View style={{ height: 8 }} />
            </BackScroll>
          </BackRoot>
        ) : (
          /* ───── Front (커버) ───── */
          <Cover source={image} resizeMode="cover">
            <BadgeTopRight>
              {showAlert && (
                <BadgeIcon>
                  <Feather name="alert-triangle" size={15} color="#e11d48" />
                </BadgeIcon>
              )}
              {showAlert && (
                <BadgeIcon>
                  <Feather
                    name="star"
                    size={15}
                    color={bookmarked ? "#f59e0b" : "#111"}
                  />
                </BadgeIcon>
              )}
            </BadgeTopRight>

            <CaptionWrap>
              <TitleRow>
                <TitleText numberOfLines={1}>{title}</TitleText>
                {!!smallLabel && <SmallLabel>{smallLabel}</SmallLabel>}
              </TitleRow>

              <SubText numberOfLines={1}>{subtitle}</SubText>

              {!!description && (
                <DescText numberOfLines={2}>{description}</DescText>
              )}
            </CaptionWrap>
          </Cover>
        )}
      </CardBox>
    </CardPress>
  );
}
