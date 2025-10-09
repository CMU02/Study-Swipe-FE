import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Select from "../input/Select";
import type { UserSettingData, AreaStepProps } from "./types";
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
      // 기존 선택된 지역 초기화
      onDataChange({ userArea_2: "", regionId: "" });
    } catch (error) {
      console.error("지역 목록 로드 실패:", error);
      setRegions([]);
    }
  };

  const handleArea1Change = (area1: string) => {
    onDataChange({ userArea_1: area1 as "서울특별시" | "경기도" });
    onValidationChange(!!area1 && !!data.regionId);
  };

  const handleArea2Change = (area2: string) => {
    const selectedRegion = regions.find(
      (region) => region.city_second === area2
    );

    if (selectedRegion) {
      onDataChange({
        userArea_2: area2,
        regionId: selectedRegion.id,
      });
      onValidationChange(!!data.userArea_1 && !!selectedRegion.id);
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
