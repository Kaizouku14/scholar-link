import { COURSES } from "@/constants/courses";
import { DEPARTMENTS } from "@/constants/departments";
import { GENDERS } from "@/constants/genders";
import { ROLES } from "@/constants/roles";
import { SECTIONS } from "@/constants/sections";
import { YEAR_LEVEL } from "@/constants/year-level";
import z from "zod";

export const accountFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    middleName: z.string().min(1, "Middle name is required"),
    email: z.string().email("Invalid email address"),
    description: z.string().min(1, "Description is required"),
    profile: z.string().optional(),
    contact: z.string().min(1, "Contact is required"),
    address: z.string().min(1, "Address is required"),
    dateOfBirth: z.date({ required_error: "Date of birth is required" }),
    gender: z.enum(GENDERS, { required_error: "Gender is required" }),
    department: z.enum(DEPARTMENTS, {
      required_error: "Department is required",
    }),
    role: z.enum([ROLES[0], ROLES[3], ROLES[5]], {
      required_error: "Role is required",
    }),
    studentNo: z.string().optional(),
    course: z.enum(COURSES).optional(),
    section: z.enum(SECTIONS).optional(),
    yearLevel: z.enum(YEAR_LEVEL).optional(),
  })
  .refine(
    (data) => {
      // If role is internshipStudent, require student-specific fields
      if (data.role === "internshipStudent") {
        return data.studentNo && data.course && data.section && data.yearLevel;
      }
      return true;
    },
    {
      message: "Student fields are required when role is student",
      path: ["studentNo"],
    },
  );

export type Accounts = z.infer<typeof accountFormSchema>;
