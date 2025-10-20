import api from "./config";
import type {
  MatchingResponse,
  GetMatchingByTagParams,
} from "./types/matching";

/** 매칭: 태그 기반(또는 전체) 조회 */
export const getMatchingByTag = async (
  params: GetMatchingByTagParams,
  token: string
): Promise<MatchingResponse> => {
  const { tag_name, page = 1, limit = 20 } = params;

  // 서버 스펙: GET /matching/by-tag?tag_name=&page=&limit=
  const res = await api.get("/matching/by-tag", {
    params: {
      ...(tag_name ? { tag_name } : {}),
      page,
      limit: Math.min(limit, 50),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data as MatchingResponse;
};
