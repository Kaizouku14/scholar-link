import type { departmentType } from "@/constants/departments";

export interface createInternship {
  userId: string;
  department: departmentType;
  name: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactNo: string;
  startDate: Date;
  endDate: Date;
}
