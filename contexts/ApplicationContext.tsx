import React, { createContext, useContext, useState, ReactNode } from "react";

// 신청한 스터디 데이터 타입
export type AppliedStudy = {
  id: string;
  tag: string;
  subTag: string;
  info: {
    purpose: string;
    university: string;
    location: string;
    time: string;
    days: string;
    frequency: string;
    ageGender: string;
  };
  prefs: string[];
  skills: string[];
  matchingStatus: "in-progress";
  appliedAt: Date;
};

type ApplicationContextType = {
  appliedStudies: AppliedStudy[];
  addAppliedStudy: (study: AppliedStudy) => void;
  removeAppliedStudy: (studyId: string) => void;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplication must be used within ApplicationProvider");
  }
  return context;
};

type ApplicationProviderProps = {
  children: ReactNode;
};

export const ApplicationProvider: React.FC<ApplicationProviderProps> = ({
  children,
}) => {
  const [appliedStudies, setAppliedStudies] = useState<AppliedStudy[]>([]);

  const addAppliedStudy = (study: AppliedStudy) => {
    setAppliedStudies((prev) => [study, ...prev]); // 새로운 신청을 맨 앞에 추가
  };

  const removeAppliedStudy = (studyId: string) => {
    setAppliedStudies((prev) => prev.filter((study) => study.id !== studyId));
  };

  return (
    <ApplicationContext.Provider
      value={{ appliedStudies, addAppliedStudy, removeAppliedStudy }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
