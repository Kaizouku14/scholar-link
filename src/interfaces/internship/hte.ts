import type { courseType } from "@/constants/users/courses";
import type { SectionType } from "@/constants/users/sections";
import type { internshipStatusType } from "@/constants/users/status";

export interface CompanyInterns {
  name: string;
  profile: string;
  email: string;
  course: courseType;
  section: SectionType[];
  status: internshipStatusType;
}

export interface Company {
  companyName: string | null;
  address: string | null;
  supervisor: string | null;
  supervisorEmail: string | null;
  supervisorNo: string | null;
  studentCount: number;
  interns: CompanyInterns[];
}
