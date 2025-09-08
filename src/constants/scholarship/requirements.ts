export const REQUIREMENT_TYPES = [
  "document", // applicant uploads a file
  "text", // applicant writes short answer
  "image",
] as const;

export type RequirementType = (typeof REQUIREMENT_TYPES)[number];
