import { COURSES } from "@/constants/users/courses";
import { DOCUMENTS } from "@/constants/internship/documents";
import { SECTIONS } from "@/constants/users/sections";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import z from "zod";

export const documentListColumnSchema = z.object({
  studentNo: z.string(),
  name: z.string(),
  email: z.string(),
  contactNo: z.string(),
  surname: z.string(),
  course: z.enum(COURSES),
  section: z.enum(SECTIONS),
  yearLevel: z.enum(YEAR_LEVEL),
  profile: z.string(),
  documents: z.array(
    z.object({
      id: z.string(),
      type: z.enum(DOCUMENTS),
      url: z.string(),
    }),
  ),
});

export type DocumentListColumn = z.infer<typeof documentListColumnSchema>;
