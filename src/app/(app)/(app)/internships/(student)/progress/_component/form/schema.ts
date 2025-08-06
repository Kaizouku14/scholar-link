import z from "zod";

export const progressFormSchema = z.object({
  date: z.date({ message: "Date is required" }),
  hoursCompleted: z.coerce.number().min(0, "Minimum 0").max(24, "Maximum 24"),
  //ADD ADDITIONAL FIELDS IF NEEDED
});

export type ProgressFormSchema = z.infer<typeof progressFormSchema>;
