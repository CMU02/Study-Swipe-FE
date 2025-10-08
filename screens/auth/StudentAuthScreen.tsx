import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Modal, Animated, Alert } from "react-native";
import BrandHeader from "../../components/logo/BrandHeader";
import BrandTextField from "../../components/input/BrandTextField";
import PrimaryButton from "../../components/button/PrimaryButton";
import {
  primaryColor,
  secondaryColor,
  textOpacityColor,
  unClickColor,
} from "../../styles/Color";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StackList } from "../../navigation/AppNavigator";
import {
  sendVerificationCode,
  confirmVerificationCode,
  agreeToTerms,
} from "../../api/auth";

/* ----------------- Layout ----------------- */

const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Wrap = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, paddingTop: 24, paddingBottom: 32 },
  keyboardShouldPersistTaps: "handled",
})`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-family: "Paperlogy-SemiBold";
  line-height: 36px;
  color: #000;
  margin-bottom: 20px;
`;

const FormStack = styled.View`
  width: 100%;
  gap: 12px;
`;

const Spacer = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  width: 100%;
  align-items: center;
`;

/* ----------------- Bottom Sheet ----------------- */

const Dim = styled.View`
  flex: 1;
  background-color: ${textOpacityColor};
  justify-content: flex-end;
`;

const Sheet = styled(Animated.View)`
  background-color: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 16px 16px 24px;
`;

const SheetHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SheetTitle = styled.Text`
  font-size: 18px;
  font-family: "Paperlogy-SemiBold";
  color: #000;
`;

const CloseBtn = styled.TouchableOpacity`
  padding: 8px;
`;

const CloseText = styled.Text`
  font-size: 18px;
  font-family: "Paperlogy-SemiBold";
  color: #000;
`;

const TermRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  justify-content: space-between;
`;

const TermLeft = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const Circle = styled.View<{ checked?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border-width: 2px;
  border-color: ${({ checked }) => (checked ? "#000" : "#ccc")};
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.View<{ checked?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ checked }) => (checked ? "#000" : "transparent")};
`;

const TermLabel = styled.Text`
  font-size: 14px;
  font-family: "Paperlogy-SemiBold";
`;

const ViewBtn = styled(TouchableOpacity)`
  padding: 8px 12px;
`;

const ViewText = styled.Text`
  color: ${textOpacityColor};
  font-family: "Paperlogy-SemiBold";
`;

const SheetPrimaryBtnWrap = styled.View`
  margin-top: 10px;
  align-items: center;
`;

/* ----------------- Component ----------------- */

const StudentAuthScreen = () => {
  const navi = useNavigation<NativeStackNavigationProp<StackList>>();
  const route = useRoute();
  const { user_id } = route.params as { user_id: string };

  // user_id 값 정상적으로 넘어오는지 확인하기 위해 log 추후 삭제
  console.log("StudentAuthScreen에서 받은 user_id:", user_id);

  // ----- 기존 인증 상태 -----
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // 5분(300초) 타이머
  const DURATION = 5 * 60;
  const [left, setLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const emailAllowed = useMemo(() => {
    const lower = email.trim().toLowerCase();
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lower) &&
      (lower.endsWith(".ac.kr") || lower.endsWith(".edu"))
    );
  }, [email]);

  const canSend = emailAllowed && !mailSent;
  const canConfirm = mailSent && code.trim().length > 0 && left > 0;

  const startTimer = () => {
    setLeft(DURATION);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const mmss = useMemo(() => {
    const m = Math.floor(left / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(left % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }, [left]);

  const onSendMail = async () => {
    if (!emailAllowed || loading) return;

    setLoading(true);
    try {
      const response = await sendVerificationCode({
        user_id: user_id,
        user_email: email.trim(),
      });

      if (response.status_code === 200) {
        setMailSent(true);
        setVerified(false);
        startTimer();
        Alert.alert("성공", response.message);
      }
    } catch (error: any) {
      Alert.alert(
        "인증 메일 발송 실패",
        error.response?.data?.message || "인증 메일 발송에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const onConfirmCode = async () => {
    if (!canConfirm || loading) return;

    setLoading(true);
    try {
      const response = await confirmVerificationCode({
        user_id: user_id,
        user_email: email.trim(),
        verify_code: code.trim(),
      });

      if (response.status_code === 200) {
        setVerified(true);
        if (timerRef.current) clearInterval(timerRef.current);
        Alert.alert("성공", response.message);
        // TODO: 토큰 저장
        console.log("Access Token:", response.option.data.accessToken);
        console.log("Refresh Token:", response.option.data.refreshToken);
      }
    } catch (error: any) {
      Alert.alert(
        "인증 실패",
        error.response?.data?.message || "인증에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // ----- 약관 모달 -----
  const [sheetOpen, setSheetOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; // 초기값: 아래로 300px 이동

  const [terms, setTerms] = useState({
    is_over_18: false, // (필수) 만 18세 이상
    terms_of_service: false, // (필수) 이용 약관
    collection_usage_personal_information: false, // (필수) 개인정보 수집 및 이용
    third_party_sharing: false, // (필수) 제3자 제공 동의
    user_alarm_advertisement: false, // (선택) 광고성 정보 수신 동의
  });

  const allRequiredChecked =
    terms.is_over_18 &&
    terms.terms_of_service &&
    terms.collection_usage_personal_information &&
    terms.third_party_sharing;

  const toggle = (key: keyof typeof terms) =>
    setTerms((prev) => ({ ...prev, [key]: !prev[key] }));

  const openSheet = () => {
    setSheetOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setSheetOpen(false);
    });
  };

  const onPressJoin = async () => {
    if (!allRequiredChecked || loading) return;

    setLoading(true);
    try {
      const response = await agreeToTerms({
        user_id: user_id,
        is_over_18: terms.is_over_18,
        terms_of_service: terms.terms_of_service,
        collection_usage_personal_information:
          terms.collection_usage_personal_information,
        third_party_sharing: terms.third_party_sharing,
        user_alarm_advertisement: terms.user_alarm_advertisement,
      });

      if (response.status_code === 200) {
        Alert.alert("성공", response.message, [
          {
            text: "확인",
            onPress: () => {
              closeSheet();
              navi.navigate("UserSetting");
            },
          },
        ]);
      }
    } catch (error: any) {
      Alert.alert(
        "약관 동의 실패",
        error.response?.data?.message || "약관 동의에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <BrandHeader />

      <Wrap>
        <Container>
          <Title>
            대학교 이메일을{"\n"}
            통해서 인증해주세요.
          </Title>

          <FormStack>
            {/* 이메일 입력 + 인증 */}
            <BrandTextField
              placeholder=".ac.kr 또는 .edu 이메일만 인증 가능합니다."
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              rightButtonLabel="인증"
              rightButtonColor={primaryColor}
              rightButtonDisabled={!canSend || loading}
              onPressRightButton={onSendMail}
            />

            {/* 인증코드 입력 + 타이머 + 확인 */}
            <BrandTextField
              placeholder="인증코드를 입력하세요"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              returnKeyType="done"
              rightInlineText={mailSent ? mmss : undefined}
              rightInlineTextColor={secondaryColor}
              rightButtonLabel="확인"
              rightButtonColor={secondaryColor}
              rightButtonDisabled={!canConfirm || loading}
              onPressRightButton={onConfirmCode}
            />
          </FormStack>

          <Spacer />

          <Footer>
            <PrimaryButton
              title="약관 동의"
              bgColor={verified ? secondaryColor : unClickColor}
              onPress={() => {
                if (!verified) return;
                openSheet();
              }}
              // disabled={!verified} (지원하면 사용)
            />
          </Footer>
        </Container>
      </Wrap>

      {/* ===== Bottom Sheet Modal ===== */}
      <Modal
        visible={sheetOpen}
        animationType="fade"
        transparent
        onRequestClose={closeSheet}
      >
        <Dim>
          <Sheet style={{ transform: [{ translateY: slideAnim }] }}>
            <SheetHeader>
              <SheetTitle>약관 동의</SheetTitle>
              <CloseBtn onPress={closeSheet}>
                <CloseText>✕</CloseText>
              </CloseBtn>
            </SheetHeader>

            {/* 약관 항목들 */}
            <TermRow>
              <TermLeft onPress={() => toggle("is_over_18")}>
                <Circle checked={terms.is_over_18}>
                  <InnerCircle checked={terms.is_over_18} />
                </Circle>
                <TermLabel>(필수) 만 18세 이상 입니다</TermLabel>
              </TermLeft>
              <ViewBtn
                onPress={() => {
                  /* TODO: 상세 보기 이동 */
                }}
              >
                <ViewText>보기</ViewText>
              </ViewBtn>
            </TermRow>

            <TermRow>
              <TermLeft onPress={() => toggle("terms_of_service")}>
                <Circle checked={terms.terms_of_service}>
                  <InnerCircle checked={terms.terms_of_service} />
                </Circle>
                <TermLabel>(필수) 이용 약관</TermLabel>
              </TermLeft>
              <ViewBtn
                onPress={() => {
                  /* TODO: 상세 보기 이동 */
                }}
              >
                <ViewText>보기</ViewText>
              </ViewBtn>
            </TermRow>

            <TermRow>
              <TermLeft
                onPress={() => toggle("collection_usage_personal_information")}
              >
                <Circle checked={terms.collection_usage_personal_information}>
                  <InnerCircle
                    checked={terms.collection_usage_personal_information}
                  />
                </Circle>
                <TermLabel>(필수) 개인정보 수집 및 이용 안내</TermLabel>
              </TermLeft>
              <ViewBtn
                onPress={() => {
                  /* TODO: 상세 보기 이동 */
                }}
              >
                <ViewText>보기</ViewText>
              </ViewBtn>
            </TermRow>

            <TermRow>
              <TermLeft onPress={() => toggle("third_party_sharing")}>
                <Circle checked={terms.third_party_sharing}>
                  <InnerCircle checked={terms.third_party_sharing} />
                </Circle>
                <TermLabel>(필수) 제 3자 제공 동의</TermLabel>
              </TermLeft>
              <ViewBtn
                onPress={() => {
                  /* TODO: 상세 보기 이동 */
                }}
              >
                <ViewText>보기</ViewText>
              </ViewBtn>
            </TermRow>

            <TermRow>
              <TermLeft onPress={() => toggle("user_alarm_advertisement")}>
                <Circle checked={terms.user_alarm_advertisement}>
                  <InnerCircle checked={terms.user_alarm_advertisement} />
                </Circle>
                <TermLabel>(선택) 광고성 정보 수신 동의</TermLabel>
              </TermLeft>
              <ViewBtn
                onPress={() => {
                  /* TODO: 상세 보기 이동 */
                }}
              >
                <ViewText>보기</ViewText>
              </ViewBtn>
            </TermRow>

            <SheetPrimaryBtnWrap>
              <PrimaryButton
                title={loading ? "처리 중..." : "회원가입"}
                bgColor={allRequiredChecked ? secondaryColor : unClickColor}
                onPress={onPressJoin}
                disabled={!allRequiredChecked || loading}
              />
            </SheetPrimaryBtnWrap>
          </Sheet>
        </Dim>
      </Modal>
    </Screen>
  );
};

export default StudentAuthScreen;
