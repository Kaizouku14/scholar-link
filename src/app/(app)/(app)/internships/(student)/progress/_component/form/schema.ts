import z from "zod";

export const progressFormSchema = z.object({
  date: z.date({ message: "Date is required" }),
  hoursCompleted: z.coerce
    .number()
    .gt(0, "Minimum is 1 hour")
    .max(8, "Maximum is 8 hours"),
});

export type ProgressFormSchema = z.infer<typeof progressFormSchema>;
