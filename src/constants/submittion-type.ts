export const SUBMISSION_TYPE = ["on-site", "online"] as const;
export type submissionType = (typeof SUBMISSION_TYPE)[number];
