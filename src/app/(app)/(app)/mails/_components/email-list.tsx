"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  date: string;
  isRead: boolean;
  avatar: string;
}

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email;
  onEmailSelect: (email: Email) => void;
}

const EmailList = ({
  emails,
  selectedEmail,
  onEmailSelect,
}: EmailListProps) => {
  return (
    <ScrollArea className="border-border flex-1 rounded-bl-xl border-x border-b">
      <div className="divide-border divide-y">
        {emails.map((email) => (
          <div
            key={email.id}
            className={cn(
              "hover:bg-muted/50 cursor-pointer border-l-2 border-transparent p-4 transition-colors",
              selectedEmail.id === email.id && "bg-muted border-l-primary",
              !email.isRead && "bg-blue-50/30 dark:bg-blue-950/20",
            )}
            onClick={() => onEmailSelect(email)}
          >
            <div className="flex items-start space-x-3">
              <Avatar className="mt-0.5 h-8 w-8">
                <AvatarFallback className="text-xs font-medium">
                  {email.avatar}
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
                    {email.timestamp}
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
                  {email.preview}
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
      </div>
    </ScrollArea>
  );
};

export default EmailList;
