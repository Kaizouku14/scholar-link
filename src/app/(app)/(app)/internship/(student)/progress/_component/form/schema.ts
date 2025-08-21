import z from "zod";

export const progressFormSchema = z.object({
  date: z.date({ message: "Date is required" }),
  timeIn: z.date({ message: "Time in is required" }),
  timeOut: z.date({ message: "Time out is required" }),
  description: z.string({ message: "Actiivty description is required" }),
});

export type ProgressFormSchema = z.infer<typeof progressFormSchema>;
