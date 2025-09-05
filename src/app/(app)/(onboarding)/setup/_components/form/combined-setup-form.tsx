"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CombinedSetupSchema, combinedSetupSchema } from "./schema";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ProfileSetupForm from "./profile-setup";
import StudentSetupForm from "./student-setup";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/react";
import { uploadFile } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

interface CombinedSetupFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const CombinedSetupForm = ({
  currentStep,
  setCurrentStep,
  setIsLoading,
}: CombinedSetupFormProps) => {
  const [profilePreview, setProfilePreview] = useState<string>("");
  const router = useRouter();
  const { data: userInfo } = api.user.getUserInformation.useQuery();

  const form = useForm<CombinedSetupSchema>({
    resolver: zodResolver(combinedSetupSchema),
    defaultValues: {
      profile: undefined,
      gender: undefined,
      address: "",
      contact: "",
      dateOfBirth: undefined,
      studentNo: "",
      yearLevel: "4th",
      course: undefined,
    },
    mode: "onChange", // Validate on change to enable/disable next button
    shouldUnregister: false,
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        profile: undefined,
        gender: userInfo.gender ?? undefined,
        address: userInfo.address ?? "",
        contact: userInfo.contactNo ?? "",
        dateOfBirth: userInfo.dateOfBirth
          ? new Date(userInfo.dateOfBirth)
          : undefined,
        studentNo: userInfo.studentNo ?? "",
        yearLevel: userInfo.yearLevel ?? "4th",
        course: userInfo.course ?? undefined,
      });

      if (userInfo.profile) {
        setProfilePreview(userInfo.profile);
      }
    }
  }, [userInfo, form]);

  const handleFileSelect = (file: File) => {
    if (file.name === "") {
      setProfilePreview("");
      return;
    }

    form.setValue("profile", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileNext = async () => {
    const isValid = await form.trigger([
      "profile",
      "gender",
      "address",
      "contact",
      "dateOfBirth",
    ]);
    if (isValid) {
      setCurrentStep(2);
    } else {
      toast.error("Please complete all profile fields.");
    }
  };

  const { mutateAsync: insertStudentProfile } =
    api.user.insertStudentProfile.useMutation();
  const onSubmit = async (values: CombinedSetupSchema) => {
    try {
      setIsLoading(true);

      const uploadedImage = await uploadFile(values.profile);
      if (!uploadedImage?.url || !uploadedImage?.key) {
        toast.error("Failed to upload image. Please try again.");
        return;
      }

      await insertStudentProfile({
        profileKey: uploadedImage.key,
        ...values,
        profile: uploadedImage.url,
      });

      router.push(PageRoutes.DASHBOARD);
    } catch {
      toast.error("Failed to save data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {currentStep === 1 && (
          <ProfileSetupForm
            control={form.control}
            onFileSelect={handleFileSelect}
            profilePreview={profilePreview}
            onNext={handleProfileNext}
          />
        )}
        {currentStep === 2 && (
          <StudentSetupForm
            control={form.control}
            formState={form.formState}
            onBack={() => setCurrentStep(1)}
          />
        )}
      </form>
    </Form>
  );
};

export default CombinedSetupForm;
