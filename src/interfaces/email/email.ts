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
}

export interface EmailActionsProps {
  onRefresh: () => void;
  onSort: (order: SortOrder) => void;
  currentSort: SortOrder;
  isRefreshing?: boolean;
}

export interface ReplyFormProps {
  thread: Email[];
  recipientName?: string | null;
  recipientEmail?: string | null;
  currentUserId: string;
  isOpen: boolean;
  onClose: () => void;
}
