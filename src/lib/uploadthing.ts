import { genUploader } from "uploadthing/client";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";

const { uploadFiles } = genUploader<OurFileRouter>();

/**
 * Upload an file using the "uploader" route.
 *
 * @param {File | undefined} image - The file to upload. If undefined, no upload is performed.
 * @returns {Promise<{ url: string | undefined; key: string | undefined } | undefined>}
 *          A promise that resolves to an object containing the URL and key of the uploaded image,
 *          or undefined if the upload fails or the image is not provided.
 */
export const uploadFile = async (
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
      toast.error("Failed to upload image. Please try again.");
      return;
    }

    const uploadedFile = res[0];

    return {
      url: uploadedFile?.ufsUrl,
      key: uploadedFile?.key,
    };
  } catch (error) {
    console.error("Image upload error:", error);
    return;
  }
};
