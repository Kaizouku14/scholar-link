import type { GenderType } from "@/constants/users/genders";
import type { YearLevelType } from "@/constants/users/year-level";

export interface StudentProfileType {
  id: string;
  profile: string;
  profileKey: string;
  gender: GenderType;
  address: string;
  contact: string;
  dateOfBirth: Date;
  studentNo: string;
  yearLevel: YearLevelType;
}
