/* API 공통 헤더 유틸리티 */

export const createAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const createHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
