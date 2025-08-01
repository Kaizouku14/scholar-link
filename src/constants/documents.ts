export const DOCUMENTS = [
  "Letter Of Endorsement",
  "Notice Of Acceptance",
  "Internship Contract/Agreement",
  "Internship Plan",
  "Memorandum Of Agreement",

  "Weekly Activity Sheet",
  "Internship Monitoring Form",
  "Performance Appraisal Form",
  "Pledge Of Commitment",
] as const;
export type documentsType = (typeof DOCUMENTS)[number];
