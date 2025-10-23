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
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;
`;

const CardBox = styled.View`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  height: ${CARD_HEIGHT}px;
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;
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
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;
`;

const BackBody = styled(Pressable)`
  flex: 1;
  padding: 20px;
  padding-bottom: 80px;
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
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;
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
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 0px;
`;

const TitleText = styled.Text`
  font-size: 35px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
  line-height: 41px;
`;

const TitleDivider = styled.View`
  width: 2px;
  height: 15px;
  background-color: ${textColor};
  margin: 0px 10px 0px 10px;
`;

const SmallLabel = styled.Text`
  font-size: 18px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
`;

const SubText = styled.Text`
  margin-top: 10px;
  font-size: 15px;
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
  font-size: 30px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
  margin-bottom: 30px;
  line-height: 35px;
`;

const Line = styled.Text`
  font-size: 15px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
  line-height: 18px;
  margin-bottom: 15px;
`;

const ChipsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 6px;
`;

const ChipBox = styled.View`
  padding: 5px;
  border-radius: 8px;
  background: ${secondaryColorOpacity};
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;
`;

const ChipText = styled.Text`
  font-size: 15px;
  font-family: Paperlogy-SemiBold;
  color: #fff;
`;

const TagChipBox = styled.View`
  padding: 5px;
  border-radius: 8px;
  background: ${clickColorOpacity};
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;
`;

const TagChipText = styled.Text`
  font-size: 15px;
  font-family: Paperlogy-SemiBold;
  color: #fff;
`;

const BackFooter = styled.View`
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
`;

const CtaBtn = styled.TouchableOpacity`
  height: 58px;
  border-radius: 8px;
  background: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  elevation: 1;
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
              {Boolean(details?.freq) ? (
                <Line>선호 횟수 : {details!.freq}</Line>
              ) : null}
              {Boolean(details?.age) ? (
                <Line>나이 : {details!.age}</Line>
              ) : null}

              {Array.isArray(badges) && badges.length > 0 ? (
                <ChipsRow style={{ marginTop: 20 }}>
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
            </BackBody>

            {/* 하단 고정 CTA (본문 탭과 충돌 없음) */}
            <BackFooter>
              <CtaBtn
                disabled={ctaDisabled}
                activeOpacity={0.8}
                onPress={onPressCta ?? (() => {})}
              >
                {variant === "edit" && (
                  <Feather name="edit-2" size={20} color={textColor} />
                )}
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
                    <>
                      <TitleDivider />
                      <SmallLabel>{smallLabel}</SmallLabel>
                    </>
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
