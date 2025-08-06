export const STATUS = ["pending", "approved", "rejected"] as const;
export const INTERNSHIP_STATUS = ["pending", "completed", "canceled"] as const;

export type statusType = (typeof STATUS)[number];
export type internshipStatusType = (typeof INTERNSHIP_STATUS)[number];
