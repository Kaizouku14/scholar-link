import z from "zod";

export const companyformSchema = z.object({
  id: z.string().min(1, {
    message: "Student no is required.",
  }),
  companyName: z.string().min(1, {
    message: "Company name is required.",
  }),
  address: z.string().min(1, {
    message: "Address is required.",
  }),
  contactPerson: z.string().min(1, {
    message: "Contact person is required.",
  }),
  contactEmail: z.string().email({
    message: "Invalid email address.",
  }),
  contactNo: z
    .string()
    .min(1, {
      message: "Contact number is required.",
    })
    .min(1, { message: "Contact number is required" })
    .regex(/^09\d{9}$/, { message: "Invalid phone number format" }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
});

export type CompanyFormSchema = z.infer<typeof companyformSchema>;
