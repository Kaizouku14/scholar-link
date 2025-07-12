import { auth } from "@/lib/auth";
import { TRPCError } from "@trpc/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // If you're using BetterAuth or similar with tRPC
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
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        url: file.ufsUrl,
        key: file.key,
        uploadedBy: metadata.userId || "anonymous",
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
