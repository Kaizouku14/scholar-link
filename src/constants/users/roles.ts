export const ROLES = [
  "internshipStudent",
  "scholarshipStudent",
  "scholarshipAdmin",
  "internshipAdmin",
  "scholarshipCoordinator",
  "internshipCoordinator",
] as const;

export type roleType = (typeof ROLES)[number];

export type UserInfo = {
  name: string;
  email: string;
  profile?: string;
};

export const ROLE = {
  INTERNSHIP_STUDENT: ROLES[0],
  SCHOLARSHIP_STUDENT: ROLES[1],
  SCHOLARSHIP_ADMIN: ROLES[2],
  INTERNSHIP_ADMIN: ROLES[3],
  SCHOLARSHIP_COORDINATOR: ROLES[4],
  INTERNSHIP_COORDINATOR: ROLES[5],
} as const;
