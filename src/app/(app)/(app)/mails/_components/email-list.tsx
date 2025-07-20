"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Email } from "@/types/email";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";
import { getEmailDisplayInfo } from "./helper/email-utils";
import { RotateCw } from "lucide-react";

interface EmailListProps {
  emails: Email[];
  selectedEmail?: Email | undefined;
  onEmailSelect?: (email: Email) => void;
  currentUserId?: string;
  isfetching?: boolean;
  isRefreshing?: boolean;
}

const EmailList = ({
  emails,
  selectedEmail,
  onEmailSelect,
  currentUserId,
  isfetching,
  isRefreshing,
}: EmailListProps) => {
  return (
    <ScrollArea className="flex-1">
      <div>
        {isfetching || isRefreshing ? (
          <div className="flex h-[540px] items-center justify-center">
            <RotateCw className="text-muted-foreground h-6 w-6 animate-spin" />
          </div>
        ) : emails?.length > 0 ? (
          <>
            {emails.map((email) => {
              const displayInfo = getEmailDisplayInfo(email, currentUserId);

              return (
                <div
                  key={email.id}
                  className={cn(
                    "hover:bg-muted/50 border-border cursor-pointer border-b p-4 transition-colors",
                    selectedEmail?.id === email.id &&
                      "bg-muted border-l-primary border-l-2",
                    !displayInfo.isSender &&
                      !email.isRead &&
                      "bg-blue-50/30 dark:bg-blue-950/20",
                  )}
                  onClick={() => onEmailSelect?.(email)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="mt-0.5 h-8 w-8">
                      <AvatarImage
                        src={displayInfo.profile ?? undefined}
                        alt={displayInfo.name ?? undefined}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {displayInfo.fallback}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={cn(
                            "truncate text-sm",
                            !displayInfo.isSender && !email.isRead
                              ? "text-foreground font-semibold"
                              : "text-foreground/80 font-medium",
                          )}
                        >
                          {displayInfo.prefix}
                          {displayInfo.name}
                        </p>
                        <span className="text-muted-foreground ml-2 text-xs whitespace-nowrap">
                          {email.createdAt
                            ? differenceInSeconds(
                                new Date(),
                                new Date(email.createdAt),
                              ) < 60
                              ? "Just now"
                              : formatDistanceToNow(new Date(email.createdAt), {
                                  addSuffix: true,
                                })
                            : ""}
                        </span>
                      </div>

                      <h3
                        className={cn(
                          "truncate text-sm",
                          !displayInfo.isSender && !email.isRead
                            ? "text-foreground font-semibold"
                            : "text-foreground/90",
                        )}
                      >
                        {email.subject}
                      </h3>

                      <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                        {email.content}
                      </p>
                    </div>
                  </div>

                  {!displayInfo.isSender && !email.isRead && (
                    <div className="mt-2 flex justify-end">
                      <div className="bg-primary h-2 w-2 rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="flex h-[540px] items-center justify-center">
            <p className="text-muted-foreground">No emails found.</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default EmailList;
