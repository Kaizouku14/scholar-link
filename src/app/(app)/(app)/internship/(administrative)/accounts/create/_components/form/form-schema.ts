import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { GENDERS } from "@/constants/users/genders";
import { ROLE } from "@/constants/users/roles";
import { SECTIONS } from "@/constants/users/sections";
import z from "zod";

export const accountFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    middleName: z.string().min(1, "Middle name is required"),
    email: z.string().email("Invalid email address"),
    profile: z.instanceof(File).optional(),
    contact: z.string().min(1, "Contact is required"),
    section: z.array(z.enum(SECTIONS), {
      required_error: "Section is required",
    }),
    address: z.string().min(1, "Address is required"),
    dateOfBirth: z.date({ required_error: "Date of birth is required" }),
    gender: z.enum(GENDERS, { required_error: "Gender is required" }),
    department: z.enum(DEPARTMENTS).optional(),
    role: z.enum([ROLE.INTERNSHIP_STUDENT, ROLE.INTERNSHIP_COORDINATOR], {
      required_error: "Role is required",
    }),
    studentNo: z.string().optional(),
    course: z.enum(COURSES).optional(),
  })
  .refine(
    (data) => {
      if (data.role === ROLE.INTERNSHIP_STUDENT) {
        return data.studentNo && data.course && data.section.length > 0;
      }
      if (data.role === ROLE.INTERNSHIP_COORDINATOR) {
        return data.department && data.course && data.section.length > 0;
      }
      return true;
    },
    {
      message: "Required fields are missing for the selected role",
      path: ["role"],
    },
  );

export type Accounts = z.infer<typeof accountFormSchema>;
