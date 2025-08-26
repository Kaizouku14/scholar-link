import * as ExcelJS from "exceljs";
import type { CoordinatorInternshipHeaders } from "@/interfaces/internship/csv-headers";
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

  const normalize = (s: string) =>
    s?.trim().toUpperCase().replace(/\s+/g, " ") || "";

  const isHeaderMatch = (cellText: string, requiredHeader: string) => {
    const cell = normalize(cellText);
    const required = normalize(requiredHeader);

    if (cell === required) return true;

    // Check if cell contains key words from required header
    const requiredWords = required.split(" ").filter((w) => w.length > 2);
    const cellWords = cell.split(" ");

    return requiredWords.some((reqWord) =>
      cellWords.some((cellWord) => cellWord.includes(reqWord)),
    );
  };

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

    // Find header row
    let headerRow: ExcelJS.Row | undefined;
    let headerRowNumber = 0;

    for (let i = 1; i <= Math.min(10, worksheet.rowCount); i++) {
      const row = worksheet.getRow(i);
      const cellValues: string[] = [];
      row.eachCell({ includeEmpty: true }, (cell) =>
        cellValues.push(cell.text || ""),
      );

      const matchCount = requiredHeaders.filter((header) =>
        cellValues.some((cell) => isHeaderMatch(cell, header)),
      ).length;

      if (matchCount >= requiredHeaders.length * 0.8) {
        headerRow = row;
        headerRowNumber = i;
        break;
      }
    }

    if (!headerRow) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Header row not found. Please check your Excel file headers.",
      });
    }

    // Map headers to column indices
    const headerMap = new Map<string, number>();
    headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      requiredHeaders.forEach((header) => {
        if (!headerMap.has(header) && isHeaderMatch(cell.text || "", header)) {
          headerMap.set(header, colNumber);
        }
      });
    });

    // Check all headers found
    const missingHeaders = requiredHeaders.filter((h) => !headerMap.has(h));
    if (missingHeaders.length > 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Missing headers: ${missingHeaders.join(", ")}`,
      });
    }

    // Parse data rows (skip footer)
    const validRows: CoordinatorInternshipHeaders[] = [];
    const invalidRows: string[] = [];

    for (let i = headerRowNumber + 1; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const rowData: Partial<CoordinatorInternshipHeaders> = {};

      requiredHeaders.forEach((header) => {
        const colIndex = headerMap.get(header);
        if (colIndex) {
          rowData[header] = row.getCell(colIndex).text?.trim() || "";
        }
      });

      // Skip empty rows
      const hasData = Object.values(rowData).some((v) => v?.trim());
      if (!hasData) continue;

      // Validate required fields
      const missingFields = requiredHeaders.filter((h) => !rowData[h]?.trim());

      // If missing more than half the fields, likely footer - stop processing
      if (missingFields.length > requiredHeaders.length / 2) {
        break;
      }

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
