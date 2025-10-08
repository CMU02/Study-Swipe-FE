import api from "./config";

/* 타입 정의 */
export interface StudyTag {
  tag_name: string;
  priority: number;
}

export interface CreateStudyTagsRequest {
  study_tags: StudyTag[];
}

export interface CreateStudyTagsResponse {
  status_code: number;
  message: string;
  option?: {
    data?: any;
  };
}

export interface Question {
  no: number;
  level: string;
  text: string;
}

export interface TagQuestions {
  tag: string;
  questions: Question[];
}

export interface MakeQuestionsRequest {
  tags: string[];
}

export interface MakeQuestionsResponse {
  items: TagQuestions[];
}

export interface SurveyAnswer {
  no: number;
  level: string;
  value: number;
}

export interface SurveyTagAnswer {
  tag: string;
  questions: SurveyAnswer[];
}

export interface CompleteSurveyRequest {
  answers: SurveyTagAnswer[];
}

export interface SurveyScoreDetail {
  no: number;
  level: string;
  value: number;
}

export interface SurveyScoreResult {
  tag: string;
  count: number;
  sum: number;
  wavg: number;
  grade: string;
  details: SurveyScoreDetail[];
}

export interface CompleteSurveyResponse {
  message: string;
  scoreResult: {
    perTag: SurveyScoreResult[];
  };
}

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
