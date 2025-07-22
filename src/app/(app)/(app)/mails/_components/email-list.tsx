"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Email } from "@/types/email";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";
import { RotateCw } from "lucide-react";

interface EmailListProps {
  threads: Email[][];
  selectedThread?: Email[];
  onThreadSelect?: (thread: Email[]) => void;
  currentUserId?: string;
  isfetching?: boolean;
  isRefreshing?: boolean;
}

const EmailList = ({
  threads,
  selectedThread,
  onThreadSelect,
  currentUserId,
  isfetching,
  isRefreshing,
}: EmailListProps) => {
  const getThreadDisplayInfo = (thread: Email[]) => {
    const lastMessage = thread[thread.length - 1];
    const isFromCurrentUser = lastMessage?.sender === currentUserId;

    const otherParticipant = isFromCurrentUser
      ? {
          name: lastMessage?.receiverName,
          email: lastMessage?.receiverEmail,
          avatar: lastMessage?.receiverProfile,
        }
      : {
          name: lastMessage?.senderName,
          email: lastMessage?.senderEmail,
          avatar: lastMessage?.senderProfile,
        };

    const unreadCount = thread.filter((mail) => !mail.isRead).length;

    return {
      subject: lastMessage?.subject,
      lastMessageContent: lastMessage?.content,
      lastMessageDate: lastMessage?.createdAt,
      isFromCurrentUser,
      unreadCount,
      otherParticipant,
    };
  };

  return (
    <ScrollArea className="flex-1">
      <div>
        {isfetching || isRefreshing ? (
          <div className="flex h-[540px] items-center justify-center">
            <RotateCw className="text-muted-foreground h-6 w-6 animate-spin" />
          </div>
        ) : threads.length > 0 ? (
          threads.map((thread) => {
            const displayInfo = getThreadDisplayInfo(thread);
            const {
              subject,
              lastMessageContent,
              lastMessageDate,
              isFromCurrentUser,
              unreadCount,
              otherParticipant,
            } = displayInfo;

            const isSelected =
              selectedThread?.[0]?.threadId === thread[0]?.threadId;

            return (
              <div
                key={thread[0]?.threadId}
                className={cn(
                  "hover:bg-muted/50 border-border cursor-pointer border-b p-4 transition-colors",
                  isSelected && "bg-muted border-l-primary border-l-2",
                  unreadCount > 0 && "bg-blue-50/30 dark:bg-blue-950/20",
                )}
                onClick={() => onThreadSelect?.(thread)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="mt-0.5 h-8 w-8">
                    <AvatarImage
                      src={otherParticipant.avatar || undefined}
                      alt={otherParticipant.name ?? undefined}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {otherParticipant.name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p
                        className={cn(
                          "truncate text-sm",
                          unreadCount > 0
                            ? "text-foreground font-semibold"
                            : "text-foreground/80 font-medium",
                        )}
                      >
                        {isFromCurrentUser
                          ? `To: ${otherParticipant.name}`
                          : otherParticipant.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        {thread.length > 1 && (
                          <Badge variant="secondary" className="text-xs">
                            {thread.length}
                          </Badge>
                        )}
                        <span className="text-muted-foreground ml-2 text-xs whitespace-nowrap">
                          {lastMessageDate
                            ? differenceInSeconds(
                                new Date(),
                                new Date(lastMessageDate),
                              ) < 60
                              ? "Just now"
                              : formatDistanceToNow(new Date(lastMessageDate), {
                                  addSuffix: true,
                                })
                            : ""}
                        </span>
                      </div>
                    </div>

                    <h3
                      className={cn(
                        "truncate text-sm",
                        unreadCount > 0
                          ? "text-foreground font-semibold"
                          : "text-foreground/90",
                      )}
                    >
                      {subject}
                    </h3>

                    <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                      {isFromCurrentUser && (
                        <span className="text-foreground/60 mr-1">You:</span>
                      )}
                      {lastMessageContent}
                    </p>
                  </div>
                </div>

                {unreadCount > 0 && (
                  <div className="mt-2 flex justify-end">
                    <div className="bg-primary h-2 w-2 rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex h-[540px] items-center justify-center">
            <p className="text-muted-foreground">No email threads found.</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default EmailList;
