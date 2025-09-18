import z from "zod";

export const renewalSchema = z.object({
  requirements: z.array(
    z.object({
      label: z.string().min(1, "Requirement label is required"),
      file: z.instanceof(File).optional().or(z.undefined()), // allow undefined if no new file uploaded
    }),
  ),
});

export type RenewalSchema = z.infer<typeof renewalSchema>;
