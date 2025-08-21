import type { SectionType } from "@/constants/users/sections";
import type { internshipStatusType } from "@/constants/users/status";

export interface Interns {
  name: string;
  middleName: string;
  surname: string;
  profile: string;
  email: string;
  status: internshipStatusType;
  section: SectionType;
}
