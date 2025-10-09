/* 지역 관련 타입 정의 */

/** 시/도 목록 메타데이터 */
export interface MetaData {
  cities: string[];
}

/** 시/도 목록 조회 응답 */
export interface GetRegionsCitiesResponse {
  status_code: number;
  message: string;
  option: {
    meta_data: MetaData;
  };
}

/** 특정 시/도 지역 조회 요청 */
export interface GetSpecificCityRegionRequest {
  city: string;
}

/** 지역 정보 */
export interface Region {
  id: string;
  city_first: string;
  city_second: string | null;
  lat: string;
  lng: string;
}

/** 특정 시/도 지역 조회 응답 */
export interface GetSpecificCityRegionResponse {
  status_code: number;
  message: string;
  option: {
    meta_data: {
      regions: Region[];
    };
  };
}
