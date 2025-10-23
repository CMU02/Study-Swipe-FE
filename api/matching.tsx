/* Matching API */

import api from "./config";
import { createAuthHeaders } from "./common/headers";
import type {
  MatchingByTagRequest,
  MatchingByTagResponse,
} from "./types/matching";

/**
 * 특정 태그를 가진 사용자 매칭 결과 조회
 */
export const getMatchingByTag = async (
  token: string,
  params: MatchingByTagRequest
): Promise<MatchingByTagResponse> => {
  const { tag_name, page = 1, limit = 20 } = params;

  const res = await api.get("/matching/by-tag", {
    params: {
      tag_name,
      page,
      limit,
    },
    headers: createAuthHeaders(token),
  });

  return res.data;
};

/**
 * 전체 사용자 대상 매칭 (태그 없이)
 */
export const getAllMatching = async (
  token: string,
  page: number = 1,
  limit: number = 20
): Promise<MatchingByTagResponse> => {
  const res = await api.get("/matching/by-tag", {
    params: {
      page,
      limit,
    },
    headers: createAuthHeaders(token),
  });

  return res.data;
};
