export const YEAR_LEVEL = ["1st", "2nd", "3rd", "4th", "5th"] as const;

export const YEAR_LEVEL_LABELS = {
  "1st": "1",
  "2nd": "2",
  "3rd": "3",
  "4th": "4",
  "5th": "5",
} as const;

export type YearLevelType = (typeof YEAR_LEVEL)[number];
