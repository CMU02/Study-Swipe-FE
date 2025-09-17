import { useMemo } from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { secondaryColor } from "../styles/Color";

/** 탭 정의: 라우트 이름만 실제 네비게이터 등록명과 일치시키면 됨 */
const TABS: Array<{
  key: string;
  route: string;
  icon: React.ComponentProps<typeof Feather>["name"];
}> = [
  { key: "home", route: "Today", icon: "home" },
  { key: "mail", route: "Mail", icon: "mail" },
  { key: "star", route: "Favorites", icon: "star" },
  { key: "user", route: "Profile", icon: "user" },
];

const ACTIVE_COLOR = "#000";

const Container = styled.View`
  padding: 10px 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
`;

const TabButton = styled.TouchableOpacity<{ active?: boolean }>`
  padding: 8px;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
`;

const Badge = styled.View`
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background-color: ${secondaryColor};
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: 700;
`;

/** 중첩 네비게이터의 최하위 활성 라우트 이름 추출 */
function getActiveRouteName(state: any): string | undefined {
  if (!state) return undefined;
  const route = state.routes?.[state.index ?? 0];
  return route?.state ? getActiveRouteName(route.state) : route?.name;
}

/** 특정 라우트의 params.tabBadge 값 조회 (없으면 0) */
function getRouteBadge(state: any, routeName: string): number {
  if (!state) return 0;
  const found = state.routes?.find((r: any) => r.name === routeName);
  if (found?.params?.tabBadge != null)
    return Number(found.params.tabBadge) || 0;
  for (const r of state.routes ?? []) {
    if (r.state) {
      const b = getRouteBadge(r.state, routeName);
      if (b) return b;
    }
  }
  return 0;
}

export default function BottomTabBar() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();

  const navState = useNavigationState((s) => s);
  const activeRouteName = useMemo(
    () => getActiveRouteName(navState),
    [navState]
  );

  return (
    <Container style={{ paddingBottom: Math.max(12, insets.bottom) }}>
      {TABS.map((it) => {
        const active = it.route === activeRouteName;
        const badge = getRouteBadge(navState, it.route);

        return (
          <TabButton
            key={it.key}
            active={active}
            accessibilityRole="button"
            accessibilityLabel={it.key}
            testID={`tab-${it.key}`}
            onPress={() => navigation.navigate(it.route as never)}
          >
            <Feather
              name={it.icon}
              size={22}
              color={active ? ACTIVE_COLOR : "#929292"}
            />
            {badge > 0 && (
              <Badge>
                <BadgeText numberOfLines={1}>
                  {badge > 99 ? "99+" : badge}
                </BadgeText>
              </Badge>
            )}
          </TabButton>
        );
      })}
    </Container>
  );
}
