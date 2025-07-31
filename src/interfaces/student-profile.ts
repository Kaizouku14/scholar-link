import type { courseType } from "@/constants/courses";
import type { GenderType } from "@/constants/genders";
import type { SectionType } from "@/constants/sections";
import type { YearLevelType } from "@/constants/year-level";

export interface StudentProfileType {
  id: string;
  profile: string;
  profileKey: string;
  gender: GenderType;
  address: string;
  contact: string;
  dateOfBirth: Date;
  course: courseType;
  section: SectionType;
  yearLevel: YearLevelType;
}
