"use client";

import { ArrowLeft, Mail, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";
import ReplyForm from "./form/reply-form";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "./helper/no-selected";
import { DeleteMail } from "./helper/delete-dialog";
import type { EmailDetailProps } from "@/interfaces/email/email";
import EmailMessageCard from "./message-card";

const EmailDetail = ({
  thread,
  setSelectedThread,
  currentUserId,
  isfetching,
  showBackButton = false,
  onBack,
}: EmailDetailProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const ids = thread?.map((email) => email.id);
  const handleReplyClick = () => setShowReplyForm(true);
  const handleReplyClose = () => setShowReplyForm(false);
  const lastMessage = thread?.[thread.length - 1];
  const recipientName =
    lastMessage?.sender === currentUserId
      ? lastMessage?.receiverName
      : lastMessage?.senderName;

  const sortedThread = useMemo(() => {
    return [...(thread ?? [])].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }, [thread]);

  return (
    <div className="bg-background border-border flex h-full flex-col rounded-r-xl border">
      {isfetching ? (
        <>
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center space-x-3">
              {showBackButton && (
                <Button variant="ghost" size="sm" disabled>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <Skeleton className="h-6 w-64" />
            </div>
          </div>
          <Skeleton className="mx-6 mb-6 h-full" />
        </>
      ) : !thread || thread.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="bg-muted/20 flex items-center justify-between border-b px-6 py-4">
            <div className="flex min-w-0 flex-1 items-center space-x-3">
              {showBackButton && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="space -x-1 flex truncate text-lg">
                        <span className="text-foreground font-semibold">
                          Subject :
                        </span>
                        <span className="font-medium">
                          {thread[0]?.subject}
                        </span>
                      </h1>
                    </div>
                    <div className="text-muted-foreground mt-1 flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>
                          {thread.length} message{thread.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      {lastMessage?.createdAt && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            Last reply{" "}
                            {formatDistanceToNow(
                              new Date(lastMessage.createdAt),
                              {
                                addSuffix: true,
                              },
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <DeleteMail ids={ids} setSelectedThread={setSelectedThread} />
                </div>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[700px]">
            <div className="space-y-4 px-6 py-6">
              {sortedThread.map((email, idx) => {
                const isSenderCurrentUser = email.sender === currentUserId;
                const isNewest = idx === 0;
                const isOldest = idx === thread.length - 1;

                return (
                  <EmailMessageCard
                    key={email.id}
                    email={email}
                    isNewest={isNewest}
                    isOldest={isOldest}
                    isSenderCurrentUser={isSenderCurrentUser}
                    threadLength={thread.length}
                    onReplyClick={handleReplyClick}
                  />
                );
              })}
            </div>
          </ScrollArea>

          {showReplyForm && lastMessage && (
            <ReplyForm
              thread={thread}
              recipientName={recipientName}
              currentUserId={currentUserId!}
              isOpen={showReplyForm}
              onClose={handleReplyClose}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EmailDetail;
