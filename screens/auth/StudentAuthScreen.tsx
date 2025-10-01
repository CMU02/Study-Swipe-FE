import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import BrandHeader from "../../components/logo/BrandHeader";
import BrandTextField from "../../components/input/BrandTextField";
import PrimaryButton from "../../components/button/PrimaryButton";
import {
  primaryColor,
  secondaryColor,
  textOpacityColor,
  unClickColor,
} from "../../styles/Color";
import { TouchableOpacity, Modal } from "react-native";

/* ----------------- Layout ----------------- */

const Screen = styled.View`
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
  font-weight: 800;
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

const Sheet = styled.View`
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
  font-weight: 800;
  color: #000;
`;

const CloseBtn = styled.TouchableOpacity`
  padding: 8px;
`;

const CloseText = styled.Text`
  font-size: 18px;
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
  border-color: #000;
  background-color: ${({ checked }) => (checked ? "#000" : "transparent")};
`;

const TermLabel = styled.Text`
  color: #000;
  font-size: 14px;
`;

const ViewBtn = styled(TouchableOpacity)`
  padding: 8px 12px;
`;

const ViewText = styled.Text`
  color: ${textOpacityColor};
  font-weight: 700;
`;

const SheetPrimaryBtnWrap = styled.View`
  margin-top: 10px;
  align-items: center;
`;

/* ----------------- Component ----------------- */

const StudentAuthScreen = () => {
  // ----- 기존 인증 상태 -----
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [verified, setVerified] = useState(false);

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

  const onSendMail = () => {
    if (!emailAllowed) return;
    // TODO: 서버에 인증 메일 요청
    setMailSent(true);
    setVerified(false);
    startTimer();
  };

  const onConfirmCode = () => {
    if (!canConfirm) return;
    // TODO: 서버에 코드 검증
    setVerified(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // ----- 약관 모달 -----
  const [sheetOpen, setSheetOpen] = useState(false);
  const [terms, setTerms] = useState({
    age: false, // (필수) 만 18세 이상
    tos: false, // (필수) 이용 약관
    privacy: false, // (필수) 개인정보 수집 및 이용
    third: false, // (필수) 제3자 제공 동의
  });

  const allRequiredChecked =
    terms.age && terms.tos && terms.privacy && terms.third;

  const toggle = (key: keyof typeof terms) =>
    setTerms((prev) => ({ ...prev, [key]: !prev[key] }));

  const openSheet = () => setSheetOpen(true);
  const closeSheet = () => setSheetOpen(false);

  const onPressJoin = () => {
    if (!allRequiredChecked) return;
    // TODO: 회원가입 처리 or 다음 단계 이동
    closeSheet();
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
              rightButtonDisabled={!canSend}
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
              rightButtonDisabled={!canConfirm}
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
          <Sheet>
            <SheetHeader>
              <SheetTitle>약관 동의</SheetTitle>
              <CloseBtn onPress={closeSheet}>
                <CloseText>✕</CloseText>
              </CloseBtn>
            </SheetHeader>

            {/* 약관 항목들 */}
            <TermRow>
              <TermLeft onPress={() => toggle("age")}>
                <Circle checked={terms.age} />
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
              <TermLeft onPress={() => toggle("tos")}>
                <Circle checked={terms.tos} />
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
              <TermLeft onPress={() => toggle("privacy")}>
                <Circle checked={terms.privacy} />
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
              <TermLeft onPress={() => toggle("third")}>
                <Circle checked={terms.third} />
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

            <SheetPrimaryBtnWrap>
              <PrimaryButton
                title="회원가입"
                bgColor={allRequiredChecked ? secondaryColor : unClickColor}
                onPress={onPressJoin}
                // disabled={!allRequiredChecked}
              />
            </SheetPrimaryBtnWrap>
          </Sheet>
        </Dim>
      </Modal>
    </Screen>
  );
};

export default StudentAuthScreen;
