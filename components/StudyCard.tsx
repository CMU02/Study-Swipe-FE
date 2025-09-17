import styled from "styled-components/native";
import {
  TouchableOpacity,
  ImageSourcePropType,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { textColor, thirdColor } from "../styles/Color";

const { height: windowHeight } = Dimensions.get("window");

export interface StudyCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  description?: string;
  smallLabel?: string;
  tags?: string[];
  showAlert?: boolean;
  bookmarked?: boolean;
  mode?: "compact" | "detail";
  onPress?: () => void;
  style?: any;
}

const CardPress = styled(TouchableOpacity)`
  width: 100%;
`;

const CardBox = styled.View`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
`;

const Cover = styled(ImageBackground)`
  width: 100%;
  height: ${windowHeight * 0.6}px;
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
`;

const CaptionWrap = styled.View`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  border-radius: 14px;
  background: #fff;
  padding: 14px 14px 16px;
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
  font-weight: 800;
  color: ${textColor};
`;

const SmallLabel = styled.Text`
  padding: 2px 10px;
  border-radius: 999px;
  background: #f1f3f5;
  font-size: 12px;
  font-weight: 700;
  color: ${textColor};
`;

const SubText = styled.Text`
  margin-top: 6px;
  font-size: 13px;
  color: ${textColor};
`;

const DescText = styled.Text`
  margin-top: 6px;
  font-size: 12px;
  color: ${textColor};
`;

const TagRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

const TagChip = styled.Text`
  padding: 4px 8px;
  border-radius: 8px;
  background: ${thirdColor};
  font-size: 11px;
  color: ${textColor};
`;

export default function StudyCard({
  image,
  title,
  subtitle,
  description,
  smallLabel,
  tags,
  showAlert,
  bookmarked,
  mode = "compact",
  onPress,
  style,
}: StudyCardProps) {
  const body = (
    <CardBox style={style}>
      <Cover source={image} resizeMode="cover">
        {/* 상단 배지 */}
        <BadgeTopRight>
          {showAlert && (
            <BadgeIcon>
              <Feather name="alert-triangle" size={15} color="#e11d48" />
            </BadgeIcon>
          )}
          <BadgeIcon>
            <Feather
              name="star"
              size={15}
              color={bookmarked ? "#f59e0b" : "#111"}
            />
          </BadgeIcon>
        </BadgeTopRight>

        {/* 하단 캡션 */}
        <CaptionWrap>
          <TitleRow>
            <TitleText numberOfLines={1}>{title}</TitleText>
            {!!smallLabel && <SmallLabel>{smallLabel}</SmallLabel>}
          </TitleRow>

          <SubText numberOfLines={1}>{subtitle}</SubText>

          {!!description && (
            <DescText numberOfLines={mode === "compact" ? 2 : 3}>
              {description}
            </DescText>
          )}

          {mode === "detail" && !!tags?.length && (
            <TagRow>
              {tags.map((t, i) => (
                <TagChip key={`${t}-${i}`}>{t}</TagChip>
              ))}
            </TagRow>
          )}
        </CaptionWrap>
      </Cover>
    </CardBox>
  );

  return onPress ? (
    <CardPress activeOpacity={0.9} onPress={onPress}>
      {body}
    </CardPress>
  ) : (
    body
  );
}
