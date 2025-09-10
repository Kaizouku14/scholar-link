export const NOTIFICATIONS = ["messages", "applications", "documents"] as const;

export type notificationType = (typeof NOTIFICATIONS)[number];
