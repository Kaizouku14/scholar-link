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

// Role visibility map
export const roleVisibility = {
  [ROLE.INTERNSHIP_COORDINATOR]: [ROLE.INTERNSHIP_STUDENT],
  [ROLE.INTERNSHIP_ADMIN]: [ROLE.INTERNSHIP_COORDINATOR],
  [ROLE.INTERNSHIP_STUDENT]: [
    ROLE.INTERNSHIP_COORDINATOR,
    ROLE.INTERNSHIP_ADMIN,
  ],

  [ROLE.SCHOLARSHIP_COORDINATOR]: [ROLE.SCHOLARSHIP_STUDENT],
  [ROLE.SCHOLARSHIP_ADMIN]: [ROLE.SCHOLARSHIP_COORDINATOR],
  [ROLE.SCHOLARSHIP_STUDENT]: [
    ROLE.SCHOLARSHIP_COORDINATOR,
    ROLE.SCHOLARSHIP_ADMIN,
  ],
} satisfies Record<roleType, roleType[]>;
