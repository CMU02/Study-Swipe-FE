/* ProfileScreen 관련 타입 정의 */

export type TopKey = "MY" | "SETTING";

export interface StudyTag {
  tag_name: string;
  priority: number;
}

export interface StudyTagData {
  study_tags: StudyTag[];
}

export interface TopTabItem {
  key: TopKey;
  label: string;
}

export interface DisplayProfile {
  image: { uri: string } | any;
  title: string;
  smallLabel: string;
  subtitle: string;
  description: string;
  showAlert: boolean;
  bookmarked: boolean;
  details: {
    purpose: string;
    school: string;
    location: string;
    time: string;
    freq: string;
    age: string;
  };
  badges: string[];
  tags: string[];
}
