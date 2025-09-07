export const REQUIREMENT_TYPES = [
  "document", // applicant uploads a file
  "text", // applicant writes short answer
  "essay", // long text field
  "checkbox", // applicant confirms something
] as const;

export type RequirementType = (typeof REQUIREMENT_TYPES)[number];
