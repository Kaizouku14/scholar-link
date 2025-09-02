"use client";

import type React from "react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, RotateCw } from "lucide-react";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import type { ReplyFormProps } from "@/interfaces/email/email";
import type { Email } from "@/types/email";

const ReplyForm = ({
  thread,
  setSelectedThread,
  recipientName,
  currentUserId,
  isOpen,
  onClose,
}: ReplyFormProps) => {
  const [replyContent, setReplyContent] = useState("");
  const { mutateAsync: sendMailToMutation, isPending } =
    api.mail.replyToMail.useMutation();
  const lastMessage = thread[thread.length - 1];
  const recipientId =
    lastMessage?.sender === currentUserId
      ? lastMessage?.receiver
      : lastMessage?.sender;
  const handleSendReply = async (e: FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !thread) return;
    try {
      if (!lastMessage) return;
      const newMessage = {
        threadId: lastMessage.threadId,
        parentId: lastMessage.id,
        sender: currentUserId,
        receiver: recipientId!,
        subject: lastMessage.subject,
        content: replyContent,
      };

      await sendMailToMutation(newMessage);
      setSelectedThread([newMessage as Email, ...thread]);
      setReplyContent("");
      handleClose?.();
    } catch {
      toast.error("Failed to send reply. Please try again.");
      setSelectedThread([...thread]);
    }
  };

  const handleClose = () => {
    if (!isPending) {
      setReplyContent("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="flex max-h-[80vh] flex-col sm:max-w-[600px]">
        <form onSubmit={handleSendReply}>
          <DialogHeader className="mb-2 flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <span>Reply to :</span>
              <span className="font-medium">{recipientName}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 space-y-4">
            <div className="bg-muted/30 space-y-2 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Original Message</p>
                <p className="text-muted-foreground text-xs">
                  Subject: {lastMessage?.subject}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Your Reply</p>
              </div>

              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder={`Write your reply to ${recipientName}...`}
                className="min-h-[200px] resize-none"
                disabled={isPending}
                autoFocus
              />
            </div>
          </div>

          <div className="flex flex-shrink-0 justify-end space-x-2 border-t pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              type="button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendReply}
              disabled={!replyContent.trim() || isPending}
              type="submit"
            >
              {isPending ? (
                <div className="flex items-center gap-1">
                  <RotateCw className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Reply
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyForm;
