export const STATUS = ["pending", "approved", "rejected"] as const;
export const INTERNSHIP_STATUS = [
  "pending",
  "on-going",
  "completed",
  "canceled",
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

export type statusType = (typeof STATUS)[number];
export type internshipStatusType = (typeof INTERNSHIP_STATUS)[number];
