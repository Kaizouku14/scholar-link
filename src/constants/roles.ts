export const ROLES = [
  "internshipStudent",
  "scholarshipStudent",
  "scholarshipAdmin",
  "internshipAdmin",
  "scholarshipCoordinator",
  "internshipCoordinator",
] as const;

export type roleType = (typeof ROLES)[number];
