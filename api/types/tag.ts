/* 태그 관련 타입 정의 */

/** 스터디 태그 */
export interface StudyTag {
  tag_name: string;
  priority: number;
}

/** 스터디 태그 생성 요청 */
export interface CreateStudyTagsRequest {
  study_tags: StudyTag[];
}

/** 스터디 태그 생성 응답 */
export interface CreateStudyTagsResponse {
  status_code: number;
  message: string;
  option?: {
    data?: any;
  };
}

/** AI 질문 */
export interface Question {
  no: number;
  level: string;
  text: string;
}

/** 태그별 질문 그룹 */
export interface TagQuestions {
  tag: string;
  questions: Question[];
}

/** AI 질문 생성 요청 */
export interface MakeQuestionsRequest {
  tags: string[];
}

/** AI 질문 생성 응답 */
export interface MakeQuestionsResponse {
  items: TagQuestions[];
}

/** 설문조사 답변 */
export interface SurveyAnswer {
  no: number;
  level: string;
  value: number;
}

/** 태그별 설문조사 답변 */
export interface SurveyTagAnswer {
  tag: string;
  questions: SurveyAnswer[];
}

/** 설문조사 완료 요청 */
export interface CompleteSurveyRequest {
  answers: SurveyTagAnswer[];
}

/** 설문조사 점수 상세 */
export interface SurveyScoreDetail {
  no: number;
  level: string;
  value: number;
}

/** 설문조사 점수 결과 */
export interface SurveyScoreResult {
  tag: string;
  count: number;
  sum: number;
  wavg: number;
  grade: string;
  details: SurveyScoreDetail[];
}

/** 설문조사 완료 응답 */
export interface CompleteSurveyResponse {
  message: string;
  scoreResult: {
    perTag: SurveyScoreResult[];
  };
}
