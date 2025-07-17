"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Email } from "@/types/email";
import { format } from "date-fns";

interface EmailListProps {
  emails: Email[];
  selectedEmail?: Email | undefined;
  onEmailSelect?: (email: Email) => void;
}

const EmailList = ({
  emails,
  selectedEmail,
  onEmailSelect,
}: EmailListProps) => {
  return (
    <ScrollArea className="flex-1">
      <div>
        {emails?.length > 0 ? (
          <>
            {emails.map((email) => (
              <div
                key={email.id}
                className={cn(
                  "hover:bg-muted/50 border-border cursor-pointer border-b p-4 transition-colors",
                  selectedEmail?.id === email.id &&
                    "bg-muted border-l-primary border-l-2",
                  !email.isRead && "bg-blue-50/30 dark:bg-blue-950/20",
                )}
                onClick={() => onEmailSelect?.(email)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="mt-0.5 h-8 w-8">
                    <AvatarImage
                      src={email?.senderProfile ?? undefined}
                      alt={email.sender}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {"NA"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p
                        className={cn(
                          "truncate text-sm",
                          !email.isRead
                            ? "text-foreground font-semibold"
                            : "text-foreground/80 font-medium",
                        )}
                      >
                        {email.sender}
                      </p>
                      <span className="text-muted-foreground ml-2 text-xs whitespace-nowrap">
                        {format("dd MMM yyyy", email.createdAt)}
                      </span>
                    </div>

                    <h3
                      className={cn(
                        "truncate text-sm",
                        !email.isRead
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

                {!email.isRead && (
                  <div className="mt-2 flex justify-end">
                    <div className="bg-primary h-2 w-2 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="flex h-[540px] items-center justify-center">
            <div className="text-muted-foreground">No mails yet.</div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default EmailList;
