import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { GENDERS } from "@/constants/users/genders";
import { ROLE } from "@/constants/users/roles";
import { SECTIONS } from "@/constants/users/sections";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import z from "zod";

export const accountFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    middleName: z.string().min(1, "Middle name is required"),
    email: z.string().email("Invalid email address"),
    profile: z.instanceof(File).optional(),
    contact: z.string().min(1, "Contact is required"),
    address: z.string().min(1, "Address is required"),
    dateOfBirth: z.date({ required_error: "Date of birth is required" }),
    gender: z.enum(GENDERS, { required_error: "Gender is required" }),
    department: z.enum(DEPARTMENTS, {
      required_error: "Department is required",
    }),
    role: z.enum(
      [
        ROLE.INTERNSHIP_STUDENT,
        ROLE.INTERNSHIP_COORDINATOR,
        ROLE.INTERNSHIP_ADMIN,
      ],
      {
        required_error: "Role is required",
      },
    ),
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
