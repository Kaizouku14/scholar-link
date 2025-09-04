export interface InternsStats {
  internshipDetails:
    | {
        companyName: string | null;
        companyAddress: string | null;
        totalHoursRequired: number;
        duration: string;
      }
    | undefined;
  progress: {
    hoursLog: number;
    dateLogs: Date;
    description?: string | null;
  }[];
}
