export const DEPARTMENTS = ["ITDS", "GATE", "BINDTECH", "HTM", "BA"] as const;
export type departmentType = (typeof DEPARTMENTS)[number];

export const DEPARMENTS_LABELS = {
  ITDS: "Information Technology and Data Science",
  GATE: "General Academics and teacher education",
  BINDTECH: "Bachelor of Industrial Technology",
  HTM: "Hotel and Tourism Management",
  BA: "Business Administration",
};

export const DEPARMENT_FILTER = [
  {
    label: "ITDS",
    value: "ITDS",
  },
  {
    label: "GATE",
    value: "GATE",
  },
  {
    label: "BINDTECH",
    value: "BINDTECH",
  },
  {
    label: "HTM",
    value: "HTM",
  },
  {
    label: "BA",
    value: "BA",
  },
];
