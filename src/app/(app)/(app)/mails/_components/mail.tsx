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

const mockEmails = [
  {
    id: "1",
    sender: "John Doe",
    senderEmail: "john.doe@company.com",
    subject: "Q4 Planning Meeting - Action Items",
    preview:
      "Hi team, following up on our Q4 planning session. Here are the key action items we discussed...",
    content: `Hi team,

Following up on our Q4 planning session. Here are the key action items we discussed:

1. Finalize budget allocations by end of week
2. Review and approve new hire requisitions
3. Schedule follow-up meetings with department heads
4. Prepare quarterly review presentations

Please let me know if you have any questions or concerns about these items.

Best regards,
John Doe
Senior Project Manager`,
    timestamp: "10:30 AM",
    date: "Today",
    isRead: false,
    avatar: "JD",
  },
  {
    id: "2",
    sender: "Sarah Chen",
    senderEmail: "sarah.chen@company.com",
    subject: "Design Review Feedback",
    preview:
      "Thanks for sharing the latest mockups. I've reviewed them and have some feedback to share...",
    content: `Hi there,

Thanks for sharing the latest mockups. I've reviewed them and have some feedback to share:

Overall, the design direction looks great! The user flow is intuitive and the visual hierarchy is clear.

Specific feedback:
- Consider increasing the contrast on the secondary buttons
- The mobile layout could benefit from larger touch targets
- Love the new color palette - it's much more accessible

Let's schedule a quick call to discuss these points in more detail.

Best,
Sarah Chen
UX Designer`,
    timestamp: "9:15 AM",
    date: "Today",
    isRead: true,
    avatar: "SC",
  },
  {
    id: "3",
    sender: "Marketing Team",
    senderEmail: "marketing@company.com",
    subject: "Campaign Performance Update",
    preview:
      "Great news! Our latest email campaign exceeded expectations with impressive engagement rates...",
    content: `Team,

Great news! Our latest email campaign exceeded expectations with impressive engagement rates.

Key metrics:
• Open rate: 28.5% (industry average: 21%)
• Click-through rate: 4.2% (industry average: 2.6%)
• Conversion rate: 3.1% (previous campaign: 2.4%)

The personalized subject lines and targeted content segments were particularly effective. Let's apply these learnings to our upcoming campaigns.

Thanks to everyone who contributed to this success!

Marketing Team`,
    timestamp: "Yesterday",
    date: "Yesterday",
    isRead: true,
    avatar: "MT",
  },
  {
    id: "4",
    sender: "Alex Rodriguez",
    senderEmail: "alex.rodriguez@company.com",
    subject: "Server Maintenance Window",
    preview:
      "Scheduled maintenance for our production servers this weekend. Please plan accordingly...",
    content: `Hi everyone,

We have scheduled maintenance for our production servers this weekend:

Date: Saturday, March 16th
Time: 11:00 PM - 3:00 AM EST
Expected downtime: 2-3 hours

During this maintenance window:
- All services will be temporarily unavailable
- Database backups will be performed
- Security updates will be applied
- Performance optimizations will be implemented

We'll send updates throughout the maintenance window. Please save any work before the scheduled time.

If you have any concerns, please reach out.

Alex Rodriguez
DevOps Engineer`,
    timestamp: "2 days ago",
    date: "March 14",
    isRead: false,
    avatar: "AR",
  },
  {
    id: "5",
    sender: "Lisa Wang",
    senderEmail: "lisa.wang@company.com",
    subject: "Welcome to the Team!",
    preview:
      "We're excited to have you join our growing team. Here's everything you need to know for your first day...",
    content: `Welcome to the team!

We're excited to have you join our growing team. Here's everything you need to know for your first day:

Your first day schedule:
9:00 AM - Welcome meeting with HR
10:00 AM - Team introductions
11:00 AM - IT setup and equipment
12:00 PM - Lunch with your manager
2:00 PM - Department overview
3:00 PM - Project assignments

What to bring:
- Photo ID for building access
- Signed paperwork (if not already submitted)
- Any questions you might have!

We're looking forward to working with you and seeing the great things you'll accomplish here.

Welcome aboard!

Lisa Wang
HR Manager`,
    timestamp: "3 days ago",
    date: "March 13",
    isRead: true,
    avatar: "LW",
  },
];

const Mail = () => {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmails = mockEmails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex">
      <div className="bg-background flex w-full flex-col border-r md:w-96 lg:w-80 xl:w-96">
        {/* Header */}
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

          {/* Search */}
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

        {/* Email List */}
        <EmailList
          emails={filteredEmails}
          selectedEmail={selectedEmail}
          onEmailSelect={setSelectedEmail}
        />
      </div>

      {/* Email Detail Panel */}
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
