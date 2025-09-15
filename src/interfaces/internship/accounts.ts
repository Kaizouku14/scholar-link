import type { SectionType } from "@/constants/users/sections";

export interface Accounts {
  name: string;
  email: string;
  role: string;
  section: SectionType[];
  course: string;
  yearLevel: string;
  profile: string | null;
  status: string;
}
