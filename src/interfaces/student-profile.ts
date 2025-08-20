import type { GenderType } from "@/constants/users/genders";
import type { SectionType } from "@/constants/users/sections";
import type { YearLevelType } from "@/constants/users/year-level";

export interface StudentProfileType {
  id: string;
  profile: string;
  profileKey: string;
  gender: GenderType;
  address: string;
  contact: string;
  dateOfBirth: Date;
  section: SectionType;
  yearLevel: YearLevelType;
}
