import z from "zod";

//TODO: FIELDS THAT NEED TO BE CLARIFIED FOR THE FORM

export const DetailsFormSchema = z.object({
  //Internship Details
  startDate: z.date({ message: "Start date is required" }),
  endDate: z.date({ message: "End date is required" }),
  totalOfHours: z.number({ message: "Total of hours is required" }),

  //Intern Details
  applicationDate: z.date({ message: "Application date is required" }),

  //Company Details
  companyName: z.string(),
  companyAddress: z.string(),
  contactPerson: z.string(),
  contactNumber: z.string(),

  //Supervisor Details
  supervisorName: z.string(),
  supervisorPosition: z.string(),
  supervisorEmail: z.string(),
  supervisorContactNumber: z.string(),
});

export type DetailsFormSchemaType = z.infer<typeof DetailsFormSchema>;
