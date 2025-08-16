import { CSVImport } from "@/components/forms/csv-import";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

const ImportDialog = ({
  isImportDialogOpen,
  setIsImportDialogOpen,
  handleImportComplete,
}: {
  isImportDialogOpen: boolean;
  setIsImportDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleImportComplete: () => void;
}) => {
  return (
    <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import CSV</DialogTitle>
        </DialogHeader>
        <CSVImport onImportCompleteAction={handleImportComplete} />
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;
