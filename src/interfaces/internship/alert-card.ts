import type { courseType } from "@/constants/users/courses";
import type { SectionType } from "@/constants/users/sections";

export interface DocumentReminder {
  id: string;
  name: string;
  course: courseType | null;
  section: SectionType[] | null;
  missingDocument: string[];
  supervisorContactNo: string | null;
}
