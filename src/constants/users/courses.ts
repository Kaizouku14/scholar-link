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

  // ==============================
  // TO REMOVE LATER
  // ==============================
  // IT & Computing
  "BS in Information Technology",
  "BS in Data Science",

  // Hospitality & Tourism
  "BS in Hospitality Management",
  "Hospitality Management",
  "BS in Tourism Management",
  "Tourism Management",

  // Education
  "Bachelor of Elementary Education",
  "BS in Elementary Education",
  "BSEd Major in Filipino",
  "BSEd Major in English (Mandarin)",
  "BSEd Major in Mathematics",
  "BSEd Major in Sciences",
  "BSEd Major in Social Studies",

  // Business & Entrepreneurship
  "BS in Business Administration",
  "BS in Administration",
  "BS in Entrepreneurship",

  // Industrial Technology
  "BIT Major in Drafting Technology",
  "BIT Major in Computer Technology",
  "BIT Major in Electronics Technology",
  "BIT Major in Food Processing Technology",
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

  // ==============================
  // TO REMOVE LATER
  // ==============================
  "BS in Information Technology": "BSIT",
  "BS in Data Science": "BSDS",

  // Hospitality & Tourism
  "BS in Hospitality Management": "BSHM",
  "BS in Tourism Management": "BSTM",

  // Education
  "BS in Elementary Education": "BEE",
  "BSEd Major in Filipino": "BSEd-FIL",
  "BSEd Major in English (Mandarin)": "BSEd-ENG(MAN)",
  "BSEd Major in Mathematics": "BSEd-MATH",
  "BSEd Major in Sciences": "BSEd-SCI",
  "BSEd Major in Social Studies": "BSEd-SS",

  // Business & Entrepreneurship
  "BS in Administration": "BSBA",
  "BS in Business Administration": "BSBA",
  "BS in Entrepreneurship": "BSE",

  // Industrial Technology
  "BIT Major in Drafting Technology": "BIT-DRAFT",
  "BIT Major in Computer Technology": "BIT-COMP",
  "BIT Major in Electronics Technology": "BIT-ELEX",
  "BIT Major in Food Processing Technology": "BIT-FOOD",
};

export const COURSE_FILTER = COURSES.map((course) => ({
  label: course,
  value: course,
}));

export type courseType = (typeof COURSES)[number];
