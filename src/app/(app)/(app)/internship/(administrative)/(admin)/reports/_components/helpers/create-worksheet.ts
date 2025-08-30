import type { ReportSchema } from "../table/column-schema";
import type ExcelJS from "exceljs";

export const createWorksheet = (
  workbook: ExcelJS.Workbook,
  students: ReportSchema[],
  coordinatorName: string,
) => {
  const worksheetName = `${coordinatorName.toUpperCase()}`
    .substring(0, 31)
    .replace(/[\\\/\?\*\[\]]/g, "_");
  const ws = workbook.addWorksheet(worksheetName);

  // ---------- HEADER ----------
  ws.mergeCells("A1:E1");
  ws.getCell("A1").value = 'Annex "D"';
  ws.getCell("A1").alignment = { horizontal: "right" };
  ws.getCell("A1").font = { bold: true, size: 12 };

  ws.addRow([]);
  ws.getCell("A3").value = "Form for HEI";
  ws.getCell("A3").font = { bold: true };
  ws.addRow([]);
  ws.addRow([]);

  const titles = [
    "REPORT ON THE",
    "LIST HOST TRAINING ESTABLISHMENTS (HTES) AND STUDENT INTERNS PARTICIPATING IN THE",
    "STUDENT INTERNSHIP PROGRAM IN THE PHILIPPINES (SIPP)",
    "AY 2024-2025",
  ];

  titles.forEach((title, i) => {
    const rowIndex = 6 + i;
    ws.mergeCells(`A${rowIndex}:F${rowIndex}`);
    ws.getCell(`A${rowIndex}`).value = title;
    ws.getCell(`A${rowIndex}`).alignment = { horizontal: "center" };
    ws.getCell(`A${rowIndex}`).font = { bold: true, size: 12 };
  });

  ws.addRow([]);
  ws.getCell("A11").value = `HEI: Bulacan State University`;
  ws.getCell("A11").font = { bold: true };

  ws.getCell("A12").value =
    "ADDRESS: University Heights, Kaypian Road, San Jose del Monte City Bulacan";
  ws.getCell("A12").font = { bold: true };

  ws.addRow([]);

  // ---------- TABLE ----------
  const headers = [
    "PARTNER HOST TRAINING ESTABLISHMENTS (HTEs)",
    "NAME OF STUDENT INTERNS (First Name, Middle Initial & Last Name)",
    "FULL TITLE OF THE PROGRAM ENROLLED IN ( DO NOT ABBREVIATE)",
    "SEX",
    "DATES OF DURATION OF THE INTERNSHIP",
    "Contact Info of CT",
  ];
  ws.addRow(headers);

  const headerRow = ws.lastRow!;
  headerRow.font = { bold: true, size: 10 };
  headerRow.alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };
  headerRow.height = 40;
  headerRow.eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE6E6E6" },
    };
  });

  // Data rows
  students.forEach((s) => {
    ws.addRow([
      s.company,
      s.studentName,
      s.course,
      s.sex,
      s.duration,
      s.supervisorContactNo,
    ]);
  });

  const headerRowNum = headerRow.number;
  ws.eachRow((row, rowNum) => {
    if (rowNum > headerRowNum) {
      row.alignment = { vertical: "top", wrapText: true };
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    }
  });

  ws.columns = [
    { width: 49.14 },
    { width: 39 },
    { width: 53 },
    { width: 16.14 },
    { width: 46.43 },
    { width: 18.86 },
  ];

  // ---------- FOOTER ----------
  ws.addRow([]);
  const footerRow = ws.lastRow!.number + 1;

  ws.getCell(`A${footerRow}`).value = "Prepared by:";
  ws.getCell(`A${footerRow}`).font = { bold: true };

  ws.getCell(`E${footerRow}`).value = "Certified correct:";
  ws.getCell(`E${footerRow}`).font = { bold: true };

  ws.addRow([]);

  const nameRow = ws.lastRow!.number + 1;

  ws.getCell(`A${nameRow}`).value = coordinatorName.toUpperCase();
  ws.getCell(`A${nameRow}`).font = { bold: true };
  ws.getCell(`A${nameRow + 1}`).value = "PT/FS Adviser";

  ws.getCell(`B${nameRow}`).value = "MARICEL CORREA GALANG";
  ws.getCell(`B${nameRow}`).font = { bold: true };
  ws.getCell(`B${nameRow + 1}`).value = "SIP Coordinator";

  ws.getCell(`E${nameRow}`).value = "DR. MARICIEL B. BALIGOD";
  ws.getCell(`E${nameRow}`).font = { bold: true };
  ws.getCell(`E${nameRow + 1}`).value = "Campus Dean";
};
