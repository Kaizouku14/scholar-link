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
import { Megaphone } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PostAnnouncement = ({ data }: { data: Program }) => {
  const [announcement, setAnnouncement] = useState(
    data?.announcement ?? "Try to input here",
  );
  const handlePostAnnoucement = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    console.log(announcement);
  };

  return (
    <Dialog>
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
      <DialogContent className="h-[40rem] sm:max-w-[920px] md:h-[35rem]">
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
            className="max-h-[18rem] min-h-[16.5rem]"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostAnnouncement;
