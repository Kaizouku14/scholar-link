"use client";

import EmailList from "./email-list";
import EmailDetail from "./email-detail";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Email } from "@/types/email";
import { api } from "@/trpc/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { searchMails } from "./helper/email-utils";
import ComposeEmail from "./compose-email";
import EmailActions from "./email-actions";

const Mail = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedThread, setSelectedThread] = useState<Email[] | undefined>();
  const { data: session } = authClient.useSession();
  const currentUserId = session?.user.id;
  const {
    data: Mails,
    isLoading: FetchingMails,
    refetch: refetchMails,
  } = api.mail.getAllUserMail.useQuery();
  const { mutateAsync: markThreadAsRead } =
    api.mail.markMailAsRead.useMutation();

  const groupedThreads = useMemo(() => {
    if (!Mails) return [];

    const normalizedQuery = searchQuery?.toLowerCase() || "";
    const filtered = searchMails(Mails, normalizedQuery);

    const grouped = filtered.reduce(
      (acc, email) => {
        acc[email.threadId] ??= [];
        acc[email.threadId]?.push(email);
        return acc;
      },
      {} as Record<string, Email[]>,
    );

    const threads = Object.values(grouped).map((thread) =>
      [...thread].sort(
        (a, b) =>
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime(),
      ),
    );

    return threads;
  }, [Mails, searchQuery]);

  const handleSelectedThread = async (thread: Email[]) => {
    if (!currentUserId) return;
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
    );

    setSelectedThread(updatedThread);
    try {
      await markThreadAsRead({
        ids: unreadMails.map((email) => email.id),
      });
      await refetchMails();
    } catch {
      setSelectedThread(thread);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetchMails();
      setSelectedThread(undefined);
    } catch {
      toast.error("Unexpected error occurred. Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex">
      <div className="bg-background flex w-full flex-col border-r md:w-96 lg:w-80 xl:w-96">
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border h-31.5 rounded-tl-xl border p-4 backdrop-blur max-md:rounded-t-xl">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Inbox</h1>

            <div className="flex items-center space-x-1">
              <ComposeEmail />
              <EmailActions
                onRefresh={handleRefresh}
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

      <div className="hidden flex-1 flex-col md:flex">
        <EmailDetail
          thread={selectedThread}
          setSelectedThread={setSelectedThread}
          currentUserId={currentUserId}
          isfetching={FetchingMails || isRefreshing}
          refresh={handleRefresh}
        />
      </div>

      {selectedThread && (
        <div className="bg-background fixed inset-0 z-50 flex flex-col md:hidden">
          <EmailDetail
            thread={selectedThread}
            setSelectedThread={setSelectedThread}
            showBackButton
            onBack={() => setSelectedThread(undefined)}
            currentUserId={currentUserId}
            isfetching={FetchingMails || isRefreshing}
            refresh={handleRefresh}
          />
        </div>
      )}
    </div>
  );
};

export default Mail;
