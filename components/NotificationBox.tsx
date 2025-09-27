// components/NatificationBox.tsx
import React, { useCallback, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, Platform } from "react-native";
import styled from "styled-components/native";
import {
  thirdColor,
  clickColor,
  primaryColor,
  unClickColor,
  textColor,
} from "../styles/Color";

// 버튼 색상
const BTN_DEFAULT = clickColor;
const BTN_ACTIVE = unClickColor;
const BTN_SECOND = primaryColor;

type NatificationBoxProps = {
  tag: string; // 닫힌 상태에서 왼쪽 타이틀
  subTag: string; // 닫힌 상태에서 오른쪽 타이틀
  expandedTitle?: string; // 열린 상태에서 타이틀
  children?: React.ReactNode;
  primaryButtonLabel?: string; // 닫힌 상태 버튼 이름
  secondaryButtonLabel?: string; // 열렸을 때 추가 버튼 이름
  onPrimaryPress?: (expanded: boolean) => void;
  onSecondaryPress?: () => void;
  onToggle?: (expanded: boolean) => void;
  dividerHeight?: number;
  style?: any;
};

const Card = styled(Animated.View)`
  border-radius: 12px;
  background-color: ${thirdColor};
  margin: 5px 21px;
  align-self: stretch;
  overflow: hidden;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 1px 1px;
      shadow-opacity: 0.25;
      shadow-radius: 1px;
    `,
    android: `
      elevation: 1;
    `,
  })}
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding: 0 16px;
`;

const TitleOpen = styled.Text`
  flex: 1;
  font-size: 30px;
  font-weight: 700;
  color: ${textColor};
`;

const TitleClosedRow = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const TagText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${textColor};
`;

const SubTagText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${textColor};
  opacity: 0.9;
`;

const VLine = styled.View<{ h: number }>`
  width: 1.5px;
  height: ${({ h }) => h}px;
  background-color: ${`${textColor}33`};
  margin: 0 8px;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TopButton = styled.TouchableOpacity<{ bg: string }>`
  padding: 6px 10px;
  border-radius: 8px;
  background-color: ${({ bg }) => bg};
  margin-left: 8px;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 1px 1px;
      shadow-opacity: 0.25;
      shadow-radius: 1px;
    `,
    android: `
      elevation: 1;
    `,
  })}
`;

const TopButtonText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  line-height: 16px;
`;

const ContentWrap = styled(Animated.View)`
  /* Content 자체 padding은 필요 없다. Card padding에 포함됨 */
`;

export default function NatificationBox({
  tag,
  subTag,
  expandedTitle,
  children,
  primaryButtonLabel = "열기",
  secondaryButtonLabel = "자세히 보기",
  onPrimaryPress,
  onSecondaryPress,
  onToggle,
  dividerHeight = 14,
  style,
}: NatificationBoxProps) {
  const [expanded, setExpanded] = useState(false);

  const widthRef = useRef(0);
  const contentHeightRef = useRef(0);

  const progress = useRef(new Animated.Value(0)).current;

  const CARD_PADDING = 3; // ✅ 카드 전체 여백
  const HEADER_HEIGHT = 50;
  const COLLAPSED_HEIGHT = HEADER_HEIGHT + CARD_PADDING * 2;

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    widthRef.current = e.nativeEvent.layout.width;
  }, []);

  // ✅ 내부 콘텐츠 높이 측정
  const onContentLayout = useCallback((e: LayoutChangeEvent) => {
    contentHeightRef.current = e.nativeEvent.layout.height;
  }, []);

  // 펼침 높이 = 헤더 + 콘텐츠 + padding*2
  const expandedHeight =
    HEADER_HEIGHT + (contentHeightRef.current || 0) + CARD_PADDING * 3;

  const animatedHeight = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [COLLAPSED_HEIGHT, expandedHeight],
  });

  const contentOpacity = progress.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0, 1],
  });

  const secondaryBtnOpacity = progress.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0.5, 1],
  });
  const secondaryBtnTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-6, 0],
  });

  const toggle = useCallback(() => {
    const next = !expanded;
    setExpanded(next);
    Animated.timing(progress, {
      toValue: next ? 1 : 0,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => onToggle?.(next));
  }, [expanded, onToggle, progress]);

  const primaryBg = expanded ? BTN_ACTIVE : BTN_DEFAULT;

  return (
    <Card
      style={[style, { height: animatedHeight, padding: CARD_PADDING }]}
      onLayout={onLayout}
    >
      <Row>
        {/* 닫힘/열림 타이틀 */}
        {expanded ? (
          <TitleOpen style={{ includeFontPadding: false }}>
            {expandedTitle}
          </TitleOpen>
        ) : (
          <TitleClosedRow>
            <TagText
              style={{ includeFontPadding: false }}
            >{`# ${tag}`}</TagText>
            <VLine h={dividerHeight} />
            <SubTagText style={{ includeFontPadding: false }}>
              {subTag}
            </SubTagText>
          </TitleClosedRow>
        )}

        <ButtonGroup>
          {/* 보조 버튼 (열림 상태) */}
          <Animated.View
            style={{
              opacity: secondaryBtnOpacity,
              transform: [{ translateY: secondaryBtnTranslateY }],
              pointerEvents: expanded ? "auto" : "none",
            }}
          >
            <TopButton
              bg={BTN_SECOND}
              onPress={() => onSecondaryPress?.()}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <TopButtonText>{secondaryButtonLabel}</TopButtonText>
            </TopButton>
          </Animated.View>

          {/* 기본 토글 버튼 */}
          <TopButton
            bg={primaryBg}
            onPress={() => {
              onPrimaryPress?.(expanded);
              toggle();
            }}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <TopButtonText>{primaryButtonLabel}</TopButtonText>
          </TopButton>
        </ButtonGroup>
      </Row>

      {/* ✅ 콘텐츠: 높이 계산(onLayout) */}
      <ContentWrap
        style={{ opacity: contentOpacity }}
        onLayout={onContentLayout}
      >
        {children}
      </ContentWrap>
    </Card>
  );
}
