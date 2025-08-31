import type { Email, SortOrder } from "@/types/email";

export interface EmailListProps {
  threads: Email[][];
  selectedThread?: Email[];
  onThreadSelect?: (thread: Email[]) => void;
  currentUserId?: string;
  isfetching?: boolean;
  isRefreshing?: boolean;
}

export interface EmailDetailProps {
  thread?: Email[];
  setSelectedThread: (thread: Email[]) => void;
  currentUserId?: string;
  isfetching?: boolean;
  refresh: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  refetch: () => Promise<unknown>;
}

export interface EmailActionsProps {
  onRefresh: () => void;
  onMarkAllAsRead: () => void;
  unreadCount: number;
  onSort: (order: SortOrder) => void;
  currentSort: SortOrder;
  isRefreshing?: boolean;
}
