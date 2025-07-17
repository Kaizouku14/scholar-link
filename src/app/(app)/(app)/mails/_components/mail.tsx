"use client";

import EmailList from "./email-list";
import EmailDetail from "./email-detail";
import { MoreVertical, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ComposeEmail from "./compose-email";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Email } from "@/types/email";

const Mail = () => {
  const [searchQuery, setSearchQuery] = useState("");

  //   const filteredEmails = mockEmails.filter(
  //     (email) =>
  //       email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       email.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  //   );

  const [selectedEmail, setSelectedEmail] = useState<Email | undefined>(
    undefined,
  );

  return (
    <div className="flex">
      <div className="bg-background flex w-full flex-col border-r md:w-96 lg:w-80 xl:w-96">
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border h-31.5 rounded-tl-xl border p-4 backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Inbox</h1>

            <div className="flex items-center space-x-1">
              <ComposeEmail />
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                  <DropdownMenuItem>Sort by date</DropdownMenuItem>
                  <DropdownMenuItem>Sort by sender</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            emails={[]}
            selectedEmail={selectedEmail}
            onEmailSelect={setSelectedEmail}
          />
        </ScrollArea>
      </div>

      <div className="hidden flex-1 flex-col md:flex">
        <EmailDetail email={selectedEmail} />
      </div>

      {/* Mobile Email Detail Overlay */}
      <div className="bg-background fixed inset-0 z-50 flex flex-col md:hidden">
        <EmailDetail email={selectedEmail} showBackButton onBack={() => {}} />
      </div>
    </div>
  );
};

export default Mail;
