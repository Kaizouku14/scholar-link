import z from "zod";

export const progressFormSchema = z.object({
  date: z.date({ message: "Date is required" }),
  hoursCompleted: z
    .number({ message: "Hours completed is required" })
    .min(1, { message: "Hours completed must be at least 1" })
    .max(24, { message: "Hours completed must be less than 24" }),
  //ADD ADDITIONAL FIELDS IF NEEDED
});

export type ProgressFormSchema = z.infer<typeof progressFormSchema>;
