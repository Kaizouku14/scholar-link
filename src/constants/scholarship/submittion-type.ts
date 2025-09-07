export const SUBMISSION_TYPE = ["on-site", "online", "hybrid"] as const;
export type submissionType = (typeof SUBMISSION_TYPE)[number];
