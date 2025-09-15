export const ELIGIBILITY_TYPE = ["document-only", "qualifiers"] as const;

export type eligibilityType = (typeof ELIGIBILITY_TYPE)[number];
