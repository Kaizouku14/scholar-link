export const DEPARTMENTS = ["ITDS", "BEED", "GATE"] as const;
export type departmentType = (typeof DEPARTMENTS)[number];
