export const COURSES = [
  // IT & Computing
  "Bachelor of Science in Information Technology",
  "Bachelor of Science in Data Science",

  // Hospitality & Tourism
  "Bachelor of Science in Hospitality Management",
  "Hospitality Management", // common shorthand
  "Bachelor of Science in Tourism Management",
  "Tourism Management", // common shorthand

  // Education
  "Bachelor of Elementary Education",
  "Bachelor of Science in Elementary Education",
  "Bachelor of Secondary Education Major in Filipino",
  "Bachelor of Secondary Education Major in English (Mandarin)",
  "Bachelor of Secondary Education Major in Mathematics",
  "Bachelor of Secondary Education Major in Sciences",
  "Bachelor of Secondary Education Major in Social Studies",

  // Business & Entrepreneurship
  "Bachelor of Science in Business Administration",
  "Bachelor of Science in Administration",
  "Bachelor of Science in Entrepreneurship",

  // Industrial Technology
  "Bachelor of Industrial Technology Major in Drafting Technology",
  "Bachelor of Industrial Technology Major in Computer Technology",
  "Bachelor of Industrial Technology Major in Electronics Technology",
  "Bachelor of Industrial Technology Major in Food Processing Technology",
] as const;

export const COURSE_LABELS: Record<(typeof COURSES)[number], string> = {
  // IT & Computing
  "Bachelor of Science in Information Technology": "BSIT",
  "Bachelor of Science in Data Science": "BSDS",

  // Hospitality & Tourism
  "Bachelor of Science in Hospitality Management": "BSHM",
  "Hospitality Management": "BSHM",
  "Bachelor of Science in Tourism Management": "BSTM",
  "Tourism Management": "BSTM",

  // Education
  "Bachelor of Elementary Education": "BEE",
  "Bachelor of Science in Elementary Education": "BEE",
  "Bachelor of Secondary Education Major in Filipino": "BSEd-FIL",
  "Bachelor of Secondary Education Major in English (Mandarin)":
    "BSEd-ENG(MAN)",
  "Bachelor of Secondary Education Major in Mathematics": "BSEd-MATH",
  "Bachelor of Secondary Education Major in Sciences": "BSEd-SCI",
  "Bachelor of Secondary Education Major in Social Studies": "BSEd-SS",

  // Business & Entrepreneurship
  "Bachelor of Science in Administration": "BSBA",
  "Bachelor of Science in Business Administration": "BSBA",
  "Bachelor of Science in Entrepreneurship": "BSE",

  // Industrial Technology
  "Bachelor of Industrial Technology Major in Drafting Technology": "BIT-DRAFT",
  "Bachelor of Industrial Technology Major in Computer Technology": "BIT-COMP",
  "Bachelor of Industrial Technology Major in Electronics Technology":
    "BIT-ELEX",
  "Bachelor of Industrial Technology Major in Food Processing Technology":
    "BIT-FOOD",
};

export const COURSE_FILTER = COURSES.map((course) => ({
  label: course,
  value: course,
}));

export type courseType = (typeof COURSES)[number];
