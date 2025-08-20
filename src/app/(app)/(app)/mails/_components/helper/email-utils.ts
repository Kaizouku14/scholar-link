import type { Email } from "@/types/email";

export type SortOrder = "newest" | "oldest";

export const getEmailDisplayInfo = (email?: Email, currentUserId?: string) => {
  const isSender = email?.sender === currentUserId;

  if (isSender) {
    return {
      name: email?.receiverName ?? email?.receiverEmail,
      email: email?.receiverEmail,
      profile: email?.receiverProfile,
      prefix: "To: ",
      label: "To",
      fallback: email?.receiverName?.charAt(0).toUpperCase() ?? "R",
      isSender: true,
    };
  } else {
    return {
      name: email?.senderName ?? email?.senderEmail,
      email: email?.senderEmail,
      profile: email?.senderProfile,
      prefix: "",
      label: "From",
      fallback: email?.senderName?.charAt(0).toUpperCase() ?? "S",
      isSender: false,
    };
  }
};

/**
 * Filter emails by a search query.
 * @param mails List of emails to search through
 * @param searchQuery Query to search for
 * @returns Filtered list of emails
 * @example
 * searchMails(emails, "hello") // returns emails with sender/recipient name/email or subject containing "hello"
 */
export const searchMails = (mails: Email[], searchQuery: string): Email[] => {
  const normalizedQuery = searchQuery?.toLowerCase().trim() || "";

  if (!normalizedQuery) return mails;

  return mails.filter((mail) => {
    const senderName = mail.senderName?.toLowerCase() ?? "";
    const senderEmail = mail.senderEmail?.toLowerCase() ?? "";
    const receiverName = mail.receiverName?.toLowerCase() ?? "";
    const receiverEmail = mail.receiverEmail?.toLowerCase() ?? "";
    const subject = mail.subject?.toLowerCase() ?? "";

    return (
      senderName.includes(normalizedQuery) ||
      senderEmail.includes(normalizedQuery) ||
      receiverName.includes(normalizedQuery) ||
      receiverEmail.includes(normalizedQuery) ||
      subject.includes(normalizedQuery)
    );
  });
};

/**
 * Sorts a list of emails by their creation date.
 * @param mails Array of emails to be sorted
 * @param sortOrder Specifies the order of sorting: "newest" for descending order and "oldest" for ascending order
 * @returns A new array of emails sorted by the specified order
 */
export const sortMails = (mails: Email[], sortOrder: SortOrder): Email[] => {
  return [...mails].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });
};

export const filterAndSortMails = (
  mails: Email[],
  searchQuery: string,
  sortOrder: SortOrder,
): Email[] => {
  const searched = searchMails(mails, searchQuery);
  return sortMails(searched, sortOrder);
};
