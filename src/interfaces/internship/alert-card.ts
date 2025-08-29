import type { courseType } from "@/constants/users/courses";
import type { SectionType } from "@/constants/users/sections";

export interface DocumentReminder {
  name: string;
  contact: string | null;
  course: courseType | null;
  section: SectionType[] | null;
  missingDocument: string[];
  supervisorContactNo: string | null;
}
