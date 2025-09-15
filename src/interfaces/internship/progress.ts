import type { courseType } from "@/constants/users/courses";
import type { SectionType } from "@/constants/users/sections";
import type { internshipStatusType } from "@/constants/users/status";

export interface ProgressLogs {
  hours: number;
  date: number;
  activity: string;
}

export interface progressMonitoring {
  id: string;
  name: string;
  profile: string | null;
  section: SectionType[];
  course: courseType;
  companyName: string;
  status: internshipStatusType;
  totalRequiredHours: number;
  logs: ProgressLogs[];
}
