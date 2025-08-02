export const DOCUMENTS = [
  "letter_of_endorsement",
  "notice_of_acceptance",
  "internship_contract_agreement",
  "internship_plan",
  "memorandum_of_agreement",
  "weekly_activity_sheet",
  "internship_monitoring_form",
  "performance_appraisal_form",
  "pledge_of_commitment",
] as const;

export const DOCUMENT_LABELS = {
  letter_of_endorsement: "Letter Of Endorsement",
  notice_of_acceptance: "Notice Of Acceptance",
  internship_contract_agreement: "Internship Contract/Agreement",
  internship_plan: "Internship Plan",
  memorandum_of_agreement: "Memorandum Of Agreement",
  weekly_activity_sheet: "Weekly Activity Sheet",
  internship_monitoring_form: "Internship Monitoring Form",
  performance_appraisal_form: "Performance Appraisal Form",
  pledge_of_commitment: "Pledge Of Commitment",
} as const;

export type documentsType = (typeof DOCUMENTS)[number];
