import { useState } from "react";
import { LayoutChangeEvent } from "react-native";
import styled from "styled-components/native";

const TabsRow = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 8px 24px 4px;
`;

const TabBtn = styled.TouchableOpacity``;

const TabInner = styled.View`
  align-items: center; /* ⬅ 텍스트/언더라인 수평 중앙 */
`;

const TabText = styled.Text<{ active?: boolean }>`
  font-size: 20px;
  font-family: "Paperlogy-SemiBold";
  color: #000;
  opacity: ${({ active }) => (active ? 1 : 0.55)};
`;

const UnderlineItem = styled.View<{ visible: boolean; widthPx: number }>`
  height: 2px;
  background-color: #000;
  border-radius: 10px;
  margin-top: 2px; /* 텍스트와의 간격 */
  width: ${({ widthPx }) => `${Math.max(1, widthPx)}px`};
  align-self: center; /* ⬅ 텍스트 하단 ‘가운데’ 정렬 */
  opacity: ${({ visible }) => (visible ? 1 : 0)};
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
  /** 텍스트 폭 대비 언더라인 폭 비율 (0~1), 기본 1 = 텍스트와 동일 폭 */
  underlineRatio?: number;
}

export default function TopTabs({
  items,
  activeKey,
  onChange,
  showUnderline = true,
  underlineRatio = 1,
}: TopTabsProps) {
  // 각 탭 텍스트의 측정 폭 저장
  const [layouts, setLayouts] = useState<Record<string, number>>({});

  const onLayoutTab = (key: string) => (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setLayouts((prev) =>
      prev[key] === width ? prev : { ...prev, [key]: width }
    );
  };

  return (
    <TabsRow>
      {items.map((it) => {
        const active = it.key === activeKey;
        const textW = layouts[it.key] ?? 0;
        const underlineW = textW * underlineRatio;

        return (
          <TabBtn
            key={it.key}
            accessibilityRole="button"
            accessibilityLabel={it.accessibilityLabel ?? it.label}
            testID={it.testID ?? `top-tab-${it.key}`}
            onPress={() => onChange(it.key)}
          >
            <TabInner>
              <TabText active={active} onLayout={onLayoutTab(it.key)}>
                {it.label}
              </TabText>

              {showUnderline && (
                <UnderlineItem
                  visible={active && underlineW > 0}
                  widthPx={underlineW}
                />
              )}
            </TabInner>
          </TabBtn>
        );
      })}
    </TabsRow>
  );
}
