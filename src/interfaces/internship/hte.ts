import type { SectionType } from "@/constants/users/sections";
import type { internshipStatusType } from "@/constants/users/status";

export interface CompanyInterns {
  name: string;
  profile: string;
  email: string;
  section: SectionType[];
  status: internshipStatusType;
}
