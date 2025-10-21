import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Select from "../input/Select";
import type { AreaStepProps } from "./types";
import { textColor } from "../../styles/Color";
import { getRegionsCities, getSpecificCityRegion } from "../../api/area";
import type { Region } from "../../api/types";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 0 14px;
`;

const Question = styled.Text`
  font-size: 35px;
  font-family: Paperlogy-SemiBold;
  margin-bottom: 40px;
  align-self: stretch;
`;

const SubQuestion = styled.Text`
  font-size: 20px;
  font-family: Paperlogy-SemiBold;
  color: ${textColor};
`;

const Answer = styled.View`
  flex-direction: row;
  align-self: stretch;
  gap: 12px;
`;

export default function AreaStep({
  data,
  onDataChange,
  onValidationChange,
}: AreaStepProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    if (data.userArea_1) {
      loadRegions(data.userArea_1);
    } else {
      setRegions([]);
      onDataChange({ userArea_2: "", regionId: "" });
    }
  }, [data.userArea_1]);

  // 데이터 변경 시 validation 체크
  useEffect(() => {
    const isValid = !!data.userArea_1 && !!data.userArea_2 && !!data.regionId;
    onValidationChange(isValid);
  }, [data.userArea_1, data.userArea_2, data.regionId, onValidationChange]);

  const loadCities = async () => {
    try {
      const response = await getRegionsCities();
      setCities(response.option.meta_data.cities);
    } catch (error) {
      console.error("시/도 목록 로드 실패:", error);
    }
  };

  const loadRegions = async (city: string) => {
    try {
      const response = await getSpecificCityRegion(city);
      setRegions(response.option.meta_data.regions);
      // 첫 번째 지역이 변경될 때만 두 번째 지역 초기화
      // 이미 같은 도시의 지역이 선택되어 있다면 유지
      const currentRegionExists = response.option.meta_data.regions.some(
        (region) =>
          (region as any).regions_id === data.regionId ||
          region.id === data.regionId
      );

      if (!currentRegionExists) {
        onDataChange({ userArea_2: "", regionId: "" });
      }
    } catch (error) {
      console.error("지역 목록 로드 실패:", error);
      setRegions([]);
    }
  };

  const handleArea1Change = (area1: string) => {
    onDataChange({ userArea_1: area1 as "서울특별시" | "경기도" });
  };

  const handleArea2Change = (area2: string) => {
    const selectedRegion = regions.find(
      (region) => region.city_second === area2
    );

    if (selectedRegion) {
      // API 응답에서 실제로는 regions_id로 오고 있음
      const regionId = (selectedRegion as any).regions_id || selectedRegion.id;
      onDataChange({
        userArea_2: area2,
        regionId: regionId,
      });
    }
  };

  return (
    <Container>
      <Question>
        스터디의 선호지역을 {"\n"}알려주세요.{" "}
        <SubQuestion>(도/시/구)</SubQuestion>
      </Question>
      <Answer>
        <Select
          value={data.userArea_1}
          onChange={handleArea1Change}
          placeholder="시/도"
          options={cities}
          width={160}
          maxHeight={200}
        />
        <Select
          value={data.userArea_2}
          onChange={handleArea2Change}
          placeholder="시/구"
          options={regions
            .map((region) => region.city_second)
            .filter((city): city is string => city !== null)}
          width={160}
          maxHeight={200}
        />
      </Answer>
    </Container>
  );
}
