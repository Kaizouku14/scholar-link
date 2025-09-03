import { XLSXImport } from "@/components/forms/xlsx-import";
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
          <DialogTitle>Import XLSX</DialogTitle>
        </DialogHeader>
        <XLSXImport onImportCompleteAction={handleImportComplete} />
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;
