export const DEPARTMENTS = ["ITDS", "HTM", "BIT", "GATE"] as const;
export type departmentType = (typeof DEPARTMENTS)[number];

export const DEPARMENTS_LABELS = {
  ITDS: "Information Technology and Data Science",
  GATE: "General Academics and teacher education",
  HTM: "Bachelor of Hospitality Management",
  BIT: "Bachelor of Industrial Technology",
};
