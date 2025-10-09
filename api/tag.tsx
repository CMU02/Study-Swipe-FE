import api from "./config";
import type {
  CreateStudyTagsRequest,
  CreateStudyTagsResponse,
  MakeQuestionsRequest,
  MakeQuestionsResponse,
  CompleteSurveyRequest,
  CompleteSurveyResponse,
} from "./types/tag";

/* 태그 API */
// 공부 태그 생성/업데이트
export const createStudyTags = async (
  data: CreateStudyTagsRequest,
  token: string
): Promise<CreateStudyTagsResponse> => {
  const res = await api.post("/profiles/study-tags", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// AI 질문 생성
export const makeQuestions = async (
  data: MakeQuestionsRequest,
  token: string
): Promise<MakeQuestionsResponse> => {
  const res = await api.post("/ai/make-questions", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 설문조사 완료
export const completeSurvey = async (
  data: CompleteSurveyRequest,
  token: string
): Promise<CompleteSurveyResponse> => {
  const res = await api.post("/ai/complete-survey", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
