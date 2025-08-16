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
import { toast } from "react-hot-toast";

const Mail = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMarkingRead, setIsMarkingRead] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const { data: session } = authClient.useSession();
  const currentUserId = session?.user.id;
  const {
    data: Mails,
    isLoading: FetchingMails,
    refetch: refetchMails,
  } = api.mail.getAllUserMail.useQuery();
  const { refetch: refetchUnreadCount } = api.mail.getUnReadCount.useQuery();

  const { mutateAsync: markThreadAsRead } =
    api.mail.markMailAsRead.useMutation();
  const { mutateAsync: markAllAsRead } =
    api.mail.markAllMailAsRead.useMutation();

  const groupedThreads = useMemo(() => {
    if (!Mails) return [];

    const normalizedQuery = searchQuery?.toLowerCase() || "";
    const filtered = filterAndSortMails(Mails, normalizedQuery, sortOrder);

    const grouped = filtered.reduce(
      (acc, email) => {
        if (!acc[email.threadId]) acc[email.threadId] = [];
        acc[email.threadId]?.push(email);
        return acc;
      },
      {} as Record<string, Email[]>,
    );

    const threads = Object.values(grouped).map((thread) =>
      thread.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateA - dateB; // always oldest to newest inside thread
      }),
    );

    return threads.sort((a, b) => {
      const lastA = a[a.length - 1];
      const lastB = b[b.length - 1];
      const dateA = lastA?.createdAt ? new Date(lastA.createdAt).getTime() : 0;
      const dateB = lastB?.createdAt ? new Date(lastB.createdAt).getTime() : 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [Mails, searchQuery, sortOrder]);

  const [selectedThread, setSelectedThread] = useState<Email[] | undefined>();

  const unreadCount = useMemo(() => {
    return groupedThreads.reduce(
      (total, thread) => total + thread.filter((mail) => !mail.isRead).length,
      0,
    );
  }, [groupedThreads]);

  const handleSelectedThread = async (thread: Email[]) => {
    if (!currentUserId || isMarkingRead) return;

    const unreadMails = thread.filter(
      (email) => email.sender !== currentUserId && !email.isRead,
    );

    if (unreadMails.length === 0) {
      setSelectedThread(thread);
      return;
    }

    const updatedThread = thread.map((email) =>
      unreadMails.some((unread) => unread.id === email.id)
        ? { ...email, isRead: true }
        : email,
    ) as Email[];

    setSelectedThread(updatedThread);
    setIsMarkingRead(true);

    try {
      await markThreadAsRead({
        ids: unreadMails.map((email) => email.id),
      });
      await refetchMails();
      await refetchUnreadCount();
    } catch (error) {
      setSelectedThread(thread);
    } finally {
      setIsMarkingRead(false);
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
      setSelectedThread(undefined);
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
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border h-31.5 rounded-tl-xl border p-4 backdrop-blur max-md:rounded-t-xl">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Inbox</h1>

            <div className="flex items-center space-x-1">
              <ComposeEmail refetch={refetchMails} />
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

        <ScrollArea className="border-border h-[662px] border-x border-b max-md:rounded-b-xl md:rounded-bl-xl">
          <EmailList
            threads={groupedThreads}
            selectedThread={selectedThread}
            onThreadSelect={handleSelectedThread}
            currentUserId={session?.user?.id}
            isfetching={FetchingMails}
            isRefreshing={isRefreshing}
          />
        </ScrollArea>
      </div>

      {/* Desktop: Email Detail */}
      <div className="hidden flex-1 flex-col md:flex">
        <EmailDetail
          thread={selectedThread}
          currentUserId={currentUserId}
          isfetching={FetchingMails || isRefreshing}
          refresh={handleRefresh}
          refetch={refetchMails}
        />
      </div>

      {/* Mobile: Overlay Detail */}
      {selectedThread && (
        <div className="bg-background fixed inset-0 z-50 flex flex-col md:hidden">
          <EmailDetail
            thread={selectedThread}
            showBackButton
            onBack={() => setSelectedThread(undefined)}
            currentUserId={currentUserId}
            isfetching={FetchingMails || isRefreshing}
            refresh={handleRefresh}
            refetch={refetchMails}
          />
        </div>
      )}
    </div>
  );
};

export default Mail;
