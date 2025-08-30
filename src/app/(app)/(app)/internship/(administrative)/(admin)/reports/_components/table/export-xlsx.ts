import toast from "react-hot-toast";
import type { ReportSchema } from "./column-schema";
import ExcelJS from "exceljs";

export const exportByCoordinator = async (rows: ReportSchema[]) => {
  if (!rows || rows.length === 0) {
    toast.error("No data to export.");
    return;
  }

  // ==============================
  // GROUP DATA BY COORDINATOR
  // ==============================
  const groupedByCoordinator: Record<string, ReportSchema[]> = {};

  rows.forEach((row) => {
    const coordinatorName = row.coordinatorName ?? "Unknown Coordinator";
    groupedByCoordinator[coordinatorName] ??= [];
    groupedByCoordinator[coordinatorName].push(row);
  });

  // ==============================
  // CREATE SEPARATE FILES PER COORDINATOR
  // ==============================
  for (const [coordinatorName, coordinatorRows] of Object.entries(
    groupedByCoordinator,
  )) {
    const workbook = new ExcelJS.Workbook();

    // Group coordinator’s students by department → section
    const grouped: Record<string, Record<string, ReportSchema[]>> = {};

    coordinatorRows.forEach((row) => {
      const dept = row.department ?? "Unknown Department";
      const sections = Array.isArray(row.section)
        ? row.section
        : [row.section].filter(Boolean);

      sections.forEach((sec) => {
        const section = sec ?? "Unknown Section";

        grouped[dept] ??= {};
        grouped[dept][section] ??= [];
        grouped[dept][section].push(row);
      });
    });

    // ==============================
    // CREATE SHEETS FOR EACH DEPT/SECTION
    // ==============================
    for (const [department, sections] of Object.entries(grouped)) {
      for (const [section, students] of Object.entries(sections)) {
        const worksheetName = `${department}-${section}`
          .substring(0, 31)
          .replace(/[\\\/\?\*\[\]]/g, "_");
        const worksheet = workbook.addWorksheet(worksheetName);

        // ==============================
        // HEADER SECTION
        // ==============================
        worksheet.mergeCells("A1:F1");
        worksheet.getCell("A1").value = 'Annex "D"';
        worksheet.getCell("A1").alignment = { horizontal: "right" };
        worksheet.getCell("A1").font = { bold: true, size: 12 };

        worksheet.addRow([]);

        worksheet.getCell("A3").value = "Form for HEI";
        worksheet.getCell("A3").font = { bold: true };

        worksheet.addRow([]);
        worksheet.addRow([]);

        worksheet.mergeCells("A6:F6");
        worksheet.getCell("A6").value = "REPORT ON THE";
        worksheet.getCell("A6").alignment = { horizontal: "center" };
        worksheet.getCell("A6").font = { bold: true, size: 12 };

        worksheet.mergeCells("A7:F7");
        worksheet.getCell("A7").value =
          "LIST HOST TRAINING ESTABLISHMENTS (HTES) AND STUDENT INTERNS PARTICIPATING IN THE";
        worksheet.getCell("A7").alignment = { horizontal: "center" };
        worksheet.getCell("A7").font = { bold: true, size: 12 };

        worksheet.mergeCells("A8:F8");
        worksheet.getCell("A8").value =
          "STUDENT INTERNSHIP PROGRAM IN THE PHILIPPINES (SIPP)";
        worksheet.getCell("A8").alignment = { horizontal: "center" };
        worksheet.getCell("A8").font = { bold: true, size: 12 };

        worksheet.mergeCells("A9:F9");
        worksheet.getCell("A9").value = "AY 2024-2025";
        worksheet.getCell("A9").alignment = { horizontal: "center" };
        worksheet.getCell("A9").font = { bold: true, size: 12 };

        worksheet.addRow([]);

        worksheet.getCell("A11").value =
          `HEI: Bulacan State University - ${department} (${section})`;
        worksheet.getCell("A11").font = { bold: true };

        worksheet.getCell("A12").value =
          "ADDRESS: University Heights, Kaypian Road, San Jose del Monte City Bulacan";
        worksheet.getCell("A12").font = { bold: true };

        worksheet.addRow([]);

        // ==============================
        // TABLE HEADER
        // ==============================
        const tableHeader = [
          "PARTNER HOST TRAINING ESTABLISHMENTS (HTEs)",
          "NAME OF STUDENT INTERNS (First Name, Middle Initial & Last Name)",
          "FULL TITLE OF THE PROGRAM ENROLLED IN ( DO NOT ABBREVIATE)",
          "SEX",
          "DATES OF DURATION OF THE INTERNSHIP",
          "Contact Info of CT",
        ];
        worksheet.addRow(tableHeader);

        const headerRowNum = worksheet.lastRow!.number;
        const headerRow = worksheet.getRow(headerRowNum);
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

        // ==============================
        // DATA ROWS
        // ==============================
        students.forEach((r) => {
          worksheet.addRow([
            r.company,
            r.studentName,
            r.course,
            r.sex,
            r.duration,
            r.supervisorContactNo,
          ]);
        });

        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber > headerRowNum) {
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

        // ==============================
        // COLUMN WIDTHS
        // ==============================
        worksheet.columns = [
          { width: 49.14 },
          { width: 39 },
          { width: 53 },
          { width: 16.14 },
          { width: 46.43 },
          { width: 18.86 },
        ];

        // ==============================
        // FOOTER SECTION
        // ==============================
        worksheet.addRow([]);
        const footerRowNum = worksheet.lastRow!.number + 1;

        worksheet.getCell(`A${footerRowNum}`).value = "Prepared by:";
        worksheet.getCell(`A${footerRowNum}`).font = { bold: true };

        worksheet.getCell(`E${footerRowNum}`).value = "Certified correct:";
        worksheet.getCell(`E${footerRowNum}`).font = { bold: true };

        worksheet.addRow([]);

        const nameRowNum = worksheet.lastRow!.number + 1;

        worksheet.getCell(`A${nameRowNum}`).value =
          coordinatorName.toUpperCase();
        worksheet.getCell(`A${nameRowNum}`).font = { bold: true };
        worksheet.getCell(`A${nameRowNum + 1}`).value = "PT/FS Adviser";

        worksheet.getCell(`B${nameRowNum}`).value = "MARICEL CORREA GALANG";
        worksheet.getCell(`B${nameRowNum}`).font = { bold: true };
        worksheet.getCell(`B${nameRowNum + 1}`).value = "SIP Coordinator";

        worksheet.getCell(`E${nameRowNum}`).value = "DR. MARICIEL B. BALIGOD";
        worksheet.getCell(`E${nameRowNum}`).font = { bold: true };
        worksheet.getCell(`E${nameRowNum + 1}`).value = "Campus Dean";
      }
    }

    // ==============================
    // SAVE FILE PER COORDINATOR
    // ==============================
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `SIPP_Report_${coordinatorName.replace(/\s+/g, "_")}_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Export failed for ${coordinatorName}:`, error);
      toast.error(`Failed to export report for ${coordinatorName}.`);
      return;
    }
  }

  toast.success(
    `Successfully exported ${Object.keys(groupedByCoordinator).length} report file(s)!`,
  );
};
