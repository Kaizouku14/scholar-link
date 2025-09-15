export const ELIGIBILITY_TYPE = ["document-only", "hybrid"] as const;

export type eligibilityType = (typeof ELIGIBILITY_TYPE)[number];
