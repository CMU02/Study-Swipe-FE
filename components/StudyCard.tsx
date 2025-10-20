import React, { useState } from "react";
import styled from "styled-components/native";
import {
  TouchableOpacity,
  ImageSourcePropType,
  ImageBackground,
  Dimensions,
  View,
  Pressable,
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
  details?: StudyDetails;
  badges?: string[];
  tags?: string[];

  /* CTA */
  ctaLabel?: string;
  onPressCta?: () => void;
  ctaDisabled?: boolean;
  variant?: "apply" | "edit";

  style?: any;
}

/* ───────────── Styled ───────────── */
const CARD_HEIGHT = windowHeight * 0.6;

const CardRoot = styled.View`
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

/* 스크롤 제거 → 본문 전체를 누르면 앞면으로 복귀 */
const BackBody = styled(Pressable)`
  flex: 1;
  padding: 16px;
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
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
`;

const SmallLabel = styled.Text`
  padding: 2px 10px;
  border-radius: 999px;
  background: #f1f3f5;
  font-size: 12px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
`;

const SubText = styled.Text`
  margin-top: 6px;
  font-size: 13px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
`;

const DescText = styled.Text`
  margin-top: 6px;
  font-size: 12px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
`;

const BackHeader = styled.Text`
  font-size: 20px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
  margin-bottom: 12px;
`;

const Line = styled.Text`
  font-size: 13px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
  line-height: 20px;
  margin-bottom: 2px;
`;

const ChipsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
`;

const ChipBox = styled.View`
  padding: 3px 5px;
  border-radius: 8px;
  background: ${secondaryColorOpacity};
  shadow-color: #000;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
  elevation: 3;
`;

const ChipText = styled.Text`
  font-size: 12px;
  font-family: Paperlogy-SemiBold;
  color: #fff;
`;

const TagChipBox = styled.View`
  padding: 3px 5px;
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
  font-family: Paperlogy-SemiBold;
  color: #fff;
`;

const BackFooter = styled.View`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
`;

const CtaBtn = styled.TouchableOpacity`
  height: 48px;
  border-radius: 12px;
  background: #fff;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(0, 0, 0, 0.08);

  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  shadow-offset: 0px -1px;

  elevation: 2;
`;

const CtaText = styled.Text`
  color: ${textColor};
  font-size: 16px;
  font-family: Paperlogy-SemiBold;
`;

/* ───────────── Component ───────────── */
export default function StudyCard(props: StudyCardProps) {
  const {
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
    ctaLabel,
    onPressCta,
    ctaDisabled,
    variant = "apply",
  } = props;

  const [flipped, setFlipped] = useState(false);

  const resolvedLabel =
    ctaLabel ??
    (variant === "edit" ? "프로필 수정하기" : "스터디 함께하기 신청");

  return (
    <CardRoot>
      <CardBox style={style}>
        {flipped ? (
          /* ───── Back (상세) ───── */
          <BackRoot>
            <BackBody onPress={() => setFlipped(false)}>
              <BackHeader>스터디 상세 정보</BackHeader>

              {Boolean(details?.purpose) ? (
                <Line>목적 : {details!.purpose}</Line>
              ) : null}
              {Boolean(details?.school) ? (
                <Line>대학교/전공 : {details!.school}</Line>
              ) : null}
              {Boolean(details?.location) ? (
                <Line>선호지역 : {details!.location}</Line>
              ) : null}
              {Boolean(details?.time) ? (
                <Line>선호시간대 : {details!.time}</Line>
              ) : null}
              {Boolean(details?.days) ? (
                <Line>선호요일대 : {details!.days}</Line>
              ) : null}
              {Boolean(details?.freq) ? (
                <Line>선호 횟수 : {details!.freq}</Line>
              ) : null}
              {Boolean(details?.age) ? (
                <Line>나이 : {details!.age}</Line>
              ) : null}

              {Array.isArray(badges) && badges.length > 0 ? (
                <ChipsRow>
                  {badges.map((b, i) => (
                    <ChipBox key={`${b}-${i}`}>
                      <ChipText>{b}</ChipText>
                    </ChipBox>
                  ))}
                </ChipsRow>
              ) : null}

              {Array.isArray(tags) && tags.length > 0 ? (
                <ChipsRow>
                  {tags.map((t, i) => (
                    <TagChipBox key={`${t}-${i}`}>
                      <TagChipText>{t}</TagChipText>
                    </TagChipBox>
                  ))}
                </ChipsRow>
              ) : null}

              {/* 버튼 높이만큼 여백 */}
              <View style={{ height: 72 }} />
            </BackBody>

            {/* 하단 고정 CTA (본문 탭과 충돌 없음) */}
            <BackFooter>
              <CtaBtn
                disabled={ctaDisabled}
                activeOpacity={0.8}
                onPress={onPressCta ?? (() => {})}
              >
                <CtaText>{resolvedLabel}</CtaText>
              </CtaBtn>
            </BackFooter>
          </BackRoot>
        ) : (
          /* ───── Front (커버) ───── */
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setFlipped(true)}
          >
            <Cover source={image} resizeMode="cover">
              <BadgeTopRight>
                {showAlert ? (
                  <BadgeIcon>
                    <Feather name="alert-triangle" size={15} color="#e11d48" />
                  </BadgeIcon>
                ) : null}

                {typeof bookmarked === "boolean" ? (
                  <BadgeIcon>
                    <Feather
                      name="star"
                      size={15}
                      color={bookmarked ? "#f59e0b" : "#111"}
                    />
                  </BadgeIcon>
                ) : null}
              </BadgeTopRight>

              <CaptionWrap>
                <TitleRow>
                  <TitleText numberOfLines={1}>{title}</TitleText>
                  {Boolean(smallLabel) ? (
                    <SmallLabel>{smallLabel}</SmallLabel>
                  ) : null}
                </TitleRow>

                <SubText numberOfLines={1}>{subtitle}</SubText>
                {Boolean(description) ? (
                  <DescText numberOfLines={2}>{description}</DescText>
                ) : null}
              </CaptionWrap>
            </Cover>
          </TouchableOpacity>
        )}
      </CardBox>
    </CardRoot>
  );
}
