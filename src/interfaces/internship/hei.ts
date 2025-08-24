import type { courseType } from "@/constants/users/courses";
import type { departmentType } from "@/constants/users/departments";
import type { SectionType } from "@/constants/users/sections";
import type { internshipStatusType } from "@/constants/users/status";
import type { YearLevelType } from "@/constants/users/year-level";

export interface InternData {
  name: string;
  profile: string | null;
  email: string;
  section: SectionType[] | null;
  status: internshipStatusType;
  companyName: string | null;
  companyAddress: string | null;
  supervisorName: string | null;
  supervisorEmail: string | null;
  supervisorContactNo: string | null;
}

export interface CoordinatorSectionData extends InternData {
  section: SectionType[] | null;
  department: departmentType | null;
  course: courseType | null;
  yearLevel: YearLevelType | null;
}

export interface AdminIntern extends InternData {
  course: courseType;
}

export interface AdminSectionData {
  section: SectionType[] | null;
  course: courseType | null;
  department: departmentType | null;
  studentCount: number;
  totalProgressHours: string | null;
  interns: AdminIntern[];
}
