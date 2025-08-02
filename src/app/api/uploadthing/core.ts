import { auth } from "@/lib/auth";
import { TRPCError } from "@trpc/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  FileUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
    "application/pdf": { maxFileSize: "8MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "8MB",
      maxFileCount: 1,
    }, // .docx
    "application/msword": { maxFileSize: "8MB", maxFileCount: 1 }, // .doc
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "16MB",
      maxFileCount: 1,
    }, // .xlsx
    "application/vnd.ms-excel": { maxFileSize: "16MB", maxFileCount: 1 }, // .xls
  })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({ headers: req.headers });

      if (!session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "You are not authorized to access this feature. Please log in or contact an administrator to gain access.",
        });
      }

      return {
        userId: session.user.id,
      };
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
        key: file.key,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
