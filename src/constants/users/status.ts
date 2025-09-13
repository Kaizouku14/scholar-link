export const STATUS = ["pending", "approved", "rejected"] as const;
export const INTERNSHIP_STATUS = [
  "pending",
  "on-going",
  "completed",
  "canceled",
] as const;
export const SCHOLARSHIP_STATUS = [
  "pending",
  "rejected",
  "qualified",
  "active",
  "unactive",
] as const;

export const STATUS_LABELS = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "approved",
    label: "Approved",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

export const INTERNSHIP_STATUS_LABELS = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "on-going",
    label: "On going",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

export const SCHOLARSHIP_STATUS_LABELS = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
  {
    value: "qualified",
    label: "Qualified",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "unactive",
    label: "Unactive",
  },
];

export type statusType = (typeof STATUS)[number];
export type internshipStatusType = (typeof INTERNSHIP_STATUS)[number];
export type scholarshipStatusType = (typeof SCHOLARSHIP_STATUS)[number];
