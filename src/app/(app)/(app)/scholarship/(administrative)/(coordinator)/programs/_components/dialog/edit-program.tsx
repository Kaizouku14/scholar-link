import TipTapEditor from "@/components/titap/editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Program } from "@/interfaces/scholarship/scholarship-card";
import { LoaderCircle, Megaphone } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

const PostAnnouncement = ({ data }: { data: Program }) => {
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState(
    data?.announcement ?? "Try to input here",
  );
  const { mutateAsync: PostAnnouncements, isPending } =
    api.scholarshipCoordinator.postAnnouncements.useMutation();
  const { refetch } = api.scholarshipCoordinator.fetchAllProgram.useQuery(
    undefined,
    {
      enabled: false,
    },
  );
  const handlePostAnnoucement = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      await PostAnnouncements({
        announcements: announcement,
        programId: data.programId,
      });

      await refetch();
      setOpen(false);
      toast.success("Announcement posted successfully!");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="cursor-pointer"
            >
              <Megaphone className="h-5 w-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Announcement</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="h-auto sm:max-w-[720px]">
        <form onSubmit={handlePostAnnoucement} className="mt-2 space-y-4">
          <DialogHeader>
            <DialogTitle>Post Announcement</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Post a scholarship program announcement
            </DialogDescription>
          </DialogHeader>
          <TipTapEditor
            value={announcement}
            onChange={setAnnouncement}
            className="max-h-[16.5rem] min-h-[16.5rem]"
            editable={true}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <LoaderCircle className="text-primary-foreground h-6 w-6 animate-spin" />
              ) : (
                "Post"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostAnnouncement;
