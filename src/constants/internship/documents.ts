export const DOCUMENTS = [
  "company_historical_background",
  "memorandum_of_agreement",
  "weekly_activity_sheet",
  "narrative_report_and_performance_evaluation",
  "letter_of_endorsement",
  "notice_of_acceptance",
  "parental_consent",
  "certificate_of_registration",
  "certificate_of_completion",
  "medical_certificates",
  "psychosocial_assessment",
  "seminar_certificate",
  "internship_plan",
  "dtr",
  "documentation_photos",
  "work_application",
  "curriculum_vitae",
] as const;

export const DOCUMENT_LABELS = {
  company_historical_background: "Company Historical Background",
  memorandum_of_agreement: "Memorandum Of Agreement",
  weekly_activity_sheet: "Weekly Activity Sheet",
  narrative_report_and_performance_evaluation:
    "Narrative Report and Performance Evaluation",
  letter_of_endorsement: "Letter of Endorsement",
  notice_of_acceptance: "Notice of Acceptance",
  parental_consent: "Parental Consent",
  certificate_of_registration: "Certificate Of Registration",
  certificate_of_completion: "Certificate of Completion",
  medical_certificates: "Medical Certificates",
  psychosocial_assessment: "Psychosocial Assessment",
  seminar_certificate: "Seminar Certificate",
  internship_plan: "Internship Plan",
  dtr: "DTR",
  documentation_photos: "Documentation Photos",
  work_application: "Work Application",
  curriculum_vitae: "Curriculum Vitae",
} as const;

export type documentsType = (typeof DOCUMENTS)[number];
