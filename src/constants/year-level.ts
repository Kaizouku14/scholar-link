export const YEAR_LEVEL = ["1st", "2nd", "3rd", "4th", "5th"] as const;
export type YearLevelType = (typeof YEAR_LEVEL)[number];
