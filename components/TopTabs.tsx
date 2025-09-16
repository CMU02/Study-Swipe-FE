import { useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent } from "react-native";
import styled from "styled-components/native";

const TabsRow = styled.View`
  position: relative; /* 언더라인 절대배치 기준 */
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 8px 16px 12px; /* 아래 여백으로 언더라인 공간 확보 */
`;

const TabBtn = styled.TouchableOpacity``;

const TabText = styled.Text<{ active?: boolean }>`
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 700 : 600)};
  color: #000;
  opacity: ${({ active }) => (active ? 1 : 0.55)};
`;

const Underline = styled(Animated.View)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 2px;
  background-color: #000;
  border-radius: 10px;
`;

export interface TopTabItem {
  key: string;
  label: string;
  accessibilityLabel?: string;
  testID?: string;
}

export interface TopTabsProps {
  items: TopTabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  showUnderline?: boolean;
}

export default function TopTabs({
  items,
  activeKey,
  onChange,
  showUnderline = true,
}: TopTabsProps) {
  const [layouts, setLayouts] = useState<
    Record<string, { x: number; w: number }>
  >({});
  const underlineX = useRef(new Animated.Value(0)).current;
  const underlineW = useRef(new Animated.Value(0)).current;

  const onLayoutTab = (key: string) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setLayouts((prev) => ({ ...prev, [key]: { x, w: width } }));
  };

  // 활성 탭 변경 시 언더라인 이동 + 폭 변경
  useEffect(() => {
    const m = layouts[activeKey];
    if (!m) return;

    Animated.parallel([
      Animated.timing(underlineX, {
        toValue: m.x,
        duration: 180,
        useNativeDriver: false,
      }),
      Animated.timing(underlineW, {
        toValue: m.w,
        duration: 180,
        useNativeDriver: false, // width는 네이티브 드라이버 불가
      }),
    ]).start();
  }, [activeKey, layouts]);

  // 초기 위치/폭 세팅
  useEffect(() => {
    const first = items[0]?.key;
    if (!first || !layouts[first]) return;
    const { x, w } = layouts[first];
    underlineX.setValue(x);
    underlineW.setValue(w);
  }, [items, layouts]);

  return (
    <TabsRow>
      {items.map((it) => {
        const active = it.key === activeKey;
        return (
          <TabBtn
            key={it.key}
            accessibilityRole="button"
            accessibilityLabel={it.accessibilityLabel ?? it.label}
            testID={it.testID ?? `top-tab-${it.key}`}
            onLayout={onLayoutTab(it.key)}
            onPress={() => onChange(it.key)}
          >
            <TabText active={active}>{it.label}</TabText>
          </TabBtn>
        );
      })}

      {showUnderline && (
        <Underline
          style={{
            width: underlineW,
            transform: [{ translateX: underlineX }],
          }}
        />
      )}
    </TabsRow>
  );
}
