import type { Email } from "@/types/email";

export type SortOrder = "newest" | "oldest";

export const getEmailDisplayInfo = (email?: Email, currentUserId?: string) => {
  const isSender = email?.sender === currentUserId;

  if (isSender) {
    return {
      name: email?.receiverName ?? email?.receiverEmail,
      email: email?.receiverEmail,
      profile: email?.receiverProfile,
      isSender: true,
    };
  } else {
    return {
      name: email?.senderName ?? email?.senderEmail,
      email: email?.senderEmail,
      profile: email?.senderProfile,
      isSender: false,
    };
  }
};

/**
 * Filter emails by a search query.
 * @param mails List of emails to search through
 * @param searchQuery Query to search for
 * @returns Filtered list of emails
 */
export const searchMails = (mails: Email[], searchQuery: string): Email[] => {
  const normalizedQuery = searchQuery?.toLowerCase().trim() || "";

  if (!normalizedQuery) return mails;

  return mails.filter((mail) => {
    const senderName = mail.senderName?.toLowerCase() ?? "";
    const senderEmail = mail.senderEmail?.toLowerCase() ?? "";
    const receiverName = mail.receiverName?.toLowerCase() ?? "";
    const receiverEmail = mail.receiverEmail?.toLowerCase() ?? "";

    return (
      senderName.includes(normalizedQuery) ||
      senderEmail.includes(normalizedQuery) ||
      receiverName.includes(normalizedQuery) ||
      receiverEmail.includes(normalizedQuery)
    );
  });
};
