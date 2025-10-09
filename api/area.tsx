import api from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  GetRegionsCitiesResponse,
  GetSpecificCityRegionResponse,
} from "./types/area";

/* 지역 API */
// 시/도 목록 조회
export const getRegionsCities = async (): Promise<GetRegionsCitiesResponse> => {
  const token = await AsyncStorage.getItem("accessToken");
  const res = await api.get("/regions/cities", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 특정 시/도의 지역 조회
export const getSpecificCityRegion = async (
  city: string
): Promise<GetSpecificCityRegionResponse> => {
  const token = await AsyncStorage.getItem("accessToken");
  const res = await api.get(`/regions/city/${city}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
