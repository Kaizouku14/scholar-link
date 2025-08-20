export const SCHOLARSHIP_TYPES = [
  "Government",
  "Barangay",
  "Student assistantship",
  "Private",
] as const;
export type ScholarshipType = (typeof SCHOLARSHIP_TYPES)[number];
