import type { courseType } from "@/constants/users/courses";
import type { GenderType } from "@/constants/users/genders";
import type { YearLevelType } from "@/constants/users/year-level";

export interface StudentProfileType {
  profile: string;
  profileKey: string;
  gender: GenderType;
  address: string;
  contact: string;
  dateOfBirth: Date;
  studentNo: string;
  yearLevel: YearLevelType;
  course: courseType;
}
