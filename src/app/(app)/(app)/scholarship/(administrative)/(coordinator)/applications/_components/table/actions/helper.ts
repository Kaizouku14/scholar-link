import type { scholarshipStatusType } from "@/constants/users/status";
import type { eligibilityType } from "@/constants/scholarship/eligiblity-type";

export const getNextApplicationStep = ({
  status,
  eligibilityType,
}: {
  status: scholarshipStatusType;
  eligibilityType: eligibilityType;
}): {
  nextStatus: scholarshipStatusType;
  actionLabel: string;
  toastMessage: string;
} => {
  const isSpecial =
    status === "qualified" ||
    status === "renewal" ||
    eligibilityType === "document-only";

  return isSpecial
    ? {
        nextStatus: "active",
        actionLabel: "Approve Application",
        toastMessage: "Application Successfully Accepted!",
      }
    : {
        nextStatus: "qualified",
        actionLabel: "Mark As Qualified",
        toastMessage: "Application Successfully Qualified!",
      };
};
