"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ComposeForm from "./form/compose-form";
import { PenSquare } from "lucide-react";

const ComposeEmail = ({ refetch }: { refetch: () => Promise<unknown> }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <PenSquare className="mr-1 h-4 w-4" />
          Compose
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Compose Email</DialogTitle>
        </DialogHeader>
        <ComposeForm onSuccess={handleSuccess} refetch={refetch} />
      </DialogContent>
    </Dialog>
  );
};

export default ComposeEmail;
