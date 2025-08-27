import * as ExcelJS from "exceljs";
import {
  manualHeaderMap,
  type CoordinatorInternshipHeaders,
} from "@/interfaces/internship/csv-headers";
import { TRPCError } from "@trpc/server";

export const parseInternshipXLSX = async (fileBuffer: ArrayBuffer) => {
  const requiredHeaders: (keyof CoordinatorInternshipHeaders)[] = [
    "STUDENT NO.",
    "NAME OF STUDENT INTERNSHIPS (First Name, Middle Inital & Last Name)",
    "EMAIL",
    "CONTACT NO.",
    "SEX",
    "SECTION",
    "FULL TITLE OF THE PROGRAM ENROLLED IN (DO NOT ABBREVIATE)",
    "DATES OF DURATION OF THE INTERNSHIP",
    "PARTNER HOST TRAINING ESTABLISHMENTS (HTEs)",
    "ADDRESS",
    "SUPERVISOR NAME",
    "SUPERVISOR EMAIL",
    "SUPERVISOR NO.",
  ];

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.worksheets[0];

    if (!worksheet) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No worksheet found in the uploaded file.",
      });
    }

    // Verify mapping
    const headerRow = worksheet.getRow(1);

    // console.log("=== MANUAL MAPPING VERIFICATION ===");
    // console.log("Total columns in worksheet:", headerRow.cellCount);

    // // Verify each mapped column has data
    // manualHeaderMap.forEach((colIndex, header) => {
    //   const cell = headerRow.getCell(colIndex);
    //   const cellText = cell?.text ?? "";
    //   console.log(`${header} -> Column ${colIndex}: "${cellText}"`);
    // });

    // Check if all required columns exist
    const maxColumn = Math.max(...Array.from(manualHeaderMap.values()));
    if (maxColumn > headerRow.cellCount) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Excel file doesn't have enough columns. Expected at least ${maxColumn} columns, but found ${headerRow.cellCount}.`,
      });
    }

    // Parse data rows (starting from row 2)
    const validRows: CoordinatorInternshipHeaders[] = [];
    const invalidRows: string[] = [];

    // Process all data rows
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const rowData: Partial<CoordinatorInternshipHeaders> = {};

      requiredHeaders.forEach((header) => {
        const colIndex = manualHeaderMap.get(header);
        if (colIndex) {
          const cell = row.getCell(colIndex);
          rowData[header] = (cell?.text ?? "").trim();
        }
      });

      // Skip empty rows
      const hasData = Object.values(rowData).some((v) => v?.trim());
      if (!hasData) continue;

      // Validate required fields
      const missingFields = requiredHeaders.filter((h) => !rowData[h]?.trim());

      if (missingFields.length > 0) {
        invalidRows.push(`Row ${i}: Missing ${missingFields.join(", ")}`);
      } else {
        validRows.push(rowData as CoordinatorInternshipHeaders);
      }
    }

    return {
      validRows,
      invalidRows,
    };
  } catch (error: unknown) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        error instanceof Error ? error.message : "Error parsing Excel file",
    });
  }
};
