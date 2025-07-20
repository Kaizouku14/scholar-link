"use client";

import EmailList from "./email-list";
import EmailDetail from "./email-detail";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import ComposeEmail from "./compose-email";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Email } from "@/types/email";
import { api } from "@/trpc/react";
import { authClient } from "@/lib/auth-client";
import { filterAndSortMails, type SortOrder } from "./helper/email-utils";
import EmailActions from "./email-actions";
import { toast } from "sonner";

const Mail = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const { data: session } = authClient.useSession();
  const {
    data: Mails,
    isLoading: FetchingMails,
    refetch: refetchMails,
  } = api.mail.getAllUserMail.useQuery();
  const { mutateAsync: markAsRead } = api.mail.markMailAsRead.useMutation();
  const { mutateAsync: markAllAsRead } =
    api.mail.markAllMailAsRead.useMutation();

  const filteredMails = useMemo(() => {
    if (!Mails) return [];

    const normalizedQuery = searchQuery?.toLowerCase() || "";
    return filterAndSortMails(Mails, normalizedQuery, sortOrder);
  }, [Mails, searchQuery, sortOrder]);

  const [selectedEmail, setSelectedEmail] = useState<Email | undefined>(
    filteredMails[0],
  );

  const unreadCount = useMemo(() => {
    return filteredMails.filter((mail: Email) => !mail.isRead).length;
  }, [filteredMails]);

  const handleSelectedEmail = async (email: Email) => {
    if (email.isRead) {
      setSelectedEmail(email);
      return;
    }
    setSelectedEmail({ ...email, isRead: true });

    try {
      await markAsRead({ id: email.id });
    } catch (error) {
      setSelectedEmail(email);
    }
  };

  const handleMarkAllAsRead = async () => {
    setIsRefreshing(true);

    try {
      await markAllAsRead();
      refetchMails();
    } catch (error) {
      toast.error("Unexpected error occurred. Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await refetchMails();
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      toast.error("Unexpected error occurred. Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSort = (order: SortOrder) => {
    setSortOrder(order);
  };

  return (
    <div className="flex">
      <div className="bg-background flex w-full flex-col border-r md:w-96 lg:w-80 xl:w-96">
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border h-31.5 rounded-tl-xl border p-4 backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Inbox</h1>

            <div className="flex items-center space-x-1">
              <ComposeEmail />
              <EmailActions
                onRefresh={handleRefresh}
                onMarkAllAsRead={handleMarkAllAsRead}
                unreadCount={unreadCount}
                onSort={handleSort}
                currentSort={sortOrder}
                isRefreshing={isRefreshing}
              />
            </div>
          </div>

          <div className="relative mt-4.5">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="border-border h-[665px] rounded-bl-xl border-x border-b">
          <EmailList
            emails={filteredMails}
            selectedEmail={selectedEmail}
            onEmailSelect={handleSelectedEmail}
            currentUserId={session?.user?.id}
            isfetching={FetchingMails}
            isRefreshing={isRefreshing}
          />
        </ScrollArea>
      </div>

      <div className="hidden flex-1 flex-col md:flex">
        <EmailDetail
          email={selectedEmail}
          currentUserId={session?.user?.id}
          isfetching={FetchingMails}
          isRefreshing={isRefreshing}
          refresh={handleRefresh}
        />
      </div>

      {/* Mobile Email Detail Overlay */}
      <div className="bg-background fixed inset-0 z-50 flex flex-col md:hidden">
        <EmailDetail
          email={selectedEmail}
          showBackButton
          onBack={() => {}}
          currentUserId={session?.user?.id}
          isfetching={FetchingMails}
          isRefreshing={isRefreshing}
          refresh={handleRefresh}
        />
      </div>
    </div>
  );
};

export default Mail;
