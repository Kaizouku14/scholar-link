import type { notificationType } from "@/constants/notification";
import type { roleType } from "@/constants/users/roles";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  badgeType?: notificationType;
  isActive?: boolean;
  description?: string;
  badge?: number;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export interface RoleNavigation {
  main: NavGroup[];
  secondary?: NavGroup[];
  management?: NavGroup[];
}

export interface NotificationCounts {
  messages?: number;
  applications?: number;
  documents?: number;
}

export type NavigationData = Record<roleType, RoleNavigation>;
