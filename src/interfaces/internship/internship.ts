import type { departmentType } from "@/constants/users/departments";

export interface createInternship {
  userId: string;
  department: departmentType;
  name: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactNo: string;
  duration: string;
}
