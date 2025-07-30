export const GENDERS = ["Male", "Female"] as const;
export type GenderType = (typeof GENDERS)[number];
