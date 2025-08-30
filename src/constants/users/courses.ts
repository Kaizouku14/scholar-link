export const COURSES = [
  "BS in Information Technology",
  "BS in Data Science",
  "BS in Hospitality Management",
  "BS in Tourism Management",

  "Bachelor of Elementary Education",
  "BSEd Major in Filipino",
  "BSEd Major in English (Mandarin)",
  "BSEd Major in Mathematics",
  "BSEd Major in Sciences",
  "BSEd Major in Social Studies",

  "BS in Business Administration",
  "BS in Entrepreneurship",

  "BIT Major in Drafting Technology",
  "BIT Major in Computer Technology",
  "BIT Major in Electronics Technology",
  "BIT Major in Food Processing Technology",
] as const;

export const COURSE_LABELS = {
  "BS in Information Technology": "BSIT",
  "BS in Data Science": "BSDS",
  "BS in Hospitality Management": "BSHM",
  "Hospitality Management": "BSHM",
  "BS in Tourism Management": "BSTM",
  "Tourism Management": "BSTM",

  "Bachelor of Elementary Education": "BEE",
  "BS in Elementary Education": "BEE",
  "BSEd Major in Filipino": "BSEd-FIL",
  "BSEd Major in English (Mandarin)": "BSEd-ENG(MAN)",
  "BSEd Major in Mathematics": "BSEd-MATH",
  "BSEd Major in Sciences": "BSEd-SCI",
  "BSEd Major in Social Studies": "BSEd-SS",

  "BS in Business Administration": "BSBA",
  "BS in Entrepreneurship": "BSE",

  "BIT Major in Drafting Technology": "BIT-DRAFT",
  "BIT Major in Computer Technology": "BIT-COMP",
  "BIT Major in Electronics Technology": "BIT-ELEX",
  "BIT Major in Food Processing Technology": "BIT-FOOD",
} as const;

export const COURSE_FILTER = COURSES.map((course) => ({
  label: course,
  value: course,
}));

export type courseType = (typeof COURSES)[number];
