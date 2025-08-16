import { genUploader } from "uploadthing/client";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "react-hot-toast";

const { uploadFiles } = genUploader<OurFileRouter>();

/**
 * Uploads a single file using the FileUploader.
 *
 * @param file - The file to be uploaded. If undefined, the function will return immediately.
 * @returns A promise that resolves to an object containing the URL and key of the uploaded file, or undefined if the upload fails.
 *
 * The function attempts to upload the provided file and returns the URL and key of the uploaded file.
 * In case of failure, it logs the error and shows a toast notification.
 */
export const uploadSingleFile = async (
  file: File | undefined,
): Promise<
  { url: string | undefined; key: string | undefined } | undefined
> => {
  if (!file) return;

  try {
    const res = await uploadFiles("FileUploader", {
      files: [file],
    });

    if (!res || res.length === 0) {
      toast.error("Failed to upload file. Please try again.");
      return;
    }

    const uploadedFile = res[0];
    return {
      url: uploadedFile?.ufsUrl,
      key: uploadedFile?.key,
    };
  } catch (error) {
    console.error("Failed upload error:", error);
    return;
  }
};
