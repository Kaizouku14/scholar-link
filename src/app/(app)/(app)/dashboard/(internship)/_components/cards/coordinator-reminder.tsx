"use client";

import { AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DocumentReminder } from "@/interfaces/internship/alert-card";
import { COURSE_LABELS } from "@/constants/users/courses";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

export const CoordinatorDocumentReminder = ({
  data,
}: {
  data?: DocumentReminder[];
}) => {
  const { mutateAsync: sendReminder } = api.mail.sendMailTo.useMutation();
  const handleRemindStudent = async ({
    id,
    missingDocument,
  }: DocumentReminder) => {
    try {
      await sendReminder({
        reciever: id,
        subject: "Document Reminder",
        content: `Please submit the following document: ${missingDocument.join(", ")}`,
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="border-border flex flex-col space-y-4 rounded-xl border p-6">
      <div className="flex flex-col">
        <h1 className="text-foreground text-2xl font-semibold">Alerts</h1>
        <p className="text-sm">
          {data && data?.length > 0 && (
            <span className="text-primary font-medium">{data?.length} </span>
          )}
          <span className="text-muted-foreground">
            {data && data?.length > 0 && (
              <span>student{data?.length !== 1 && "s"}</span>
            )}
            <span> require your immediate attention</span>
          </span>
        </p>
      </div>

      <ScrollArea className="h-96 pr-2">
        <div className="space-y-3">
          {data?.length === 0 ? (
            <div className="flex h-90 w-full items-center justify-center">
              <p className="text-muted-foreground text-sm">
                There are no alert to display.
              </p>
            </div>
          ) : (
            <>
              {data?.map((document, index) => (
                <div
                  key={index}
                  className="border-destructive/40 bg-destructive/10 hover:bg-destructive/15 rounded-xl border p-4 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-destructive/20 rounded-full p-2">
                      <AlertCircle className="text-destructive h-5 w-5" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <h4 className="text-foreground text-sm font-semibold">
                        Missing Document
                        {document.missingDocument.length > 1 ? "s" : ""}:{" "}
                        {document.missingDocument.join(", ")}
                      </h4>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <span className="text-foreground font-medium">
                          {document.name} ({COURSE_LABELS[document.course!]} ·{" "}
                          {document.section?.[0]})
                        </span>{" "}
                        is missing the {document.missingDocument.join(", ")}.
                        The internship cannot be completed without this document
                        {document.missingDocument.length > 1 ? "s" : ""}.
                      </p>

                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary hover:text-primary/90"
                          onClick={() => handleRemindStudent(document)}
                        >
                          Remind Student
                        </Button>
                        {document.supervisorContactNo && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-primary text-primary hover:text-primary/90"
                          >
                            <a
                              href={`tel:${document.supervisorContactNo}`}
                              className="flex items-center"
                            >
                              <Phone className="mr-2 h-4 w-4" />
                              Contact Supervisor
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
