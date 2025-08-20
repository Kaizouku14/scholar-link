import type { roleType } from "@/constants/users/roles";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  badgeType?: "messages" | "applications" | "documents";
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

export type NavigationData = Record<roleType, RoleNavigation>;

export interface NotificationCounts {
  messages?: number;
  //   applications?: number;
  //   documents?: number;
}
