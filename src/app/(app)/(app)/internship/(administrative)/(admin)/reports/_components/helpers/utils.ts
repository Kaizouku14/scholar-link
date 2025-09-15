import type { Reports } from "@/interfaces/internship/reports";
import type ExcelJS from "exceljs";

export const groupByCoordinator = (rows: Reports[]) => {
  const grouped: Record<string, Reports[]> = {};
  rows.forEach((row) => {
    if (
      !row.coordinatorName ||
      row.coordinatorName.trim() === "" ||
      row.coordinatorName === "N/A"
    ) {
      return; // Skip row
    }

    const name = row.coordinatorName;
    grouped[name] ??= [];
    grouped[name].push(row);
  });
  return grouped;
};

export const exportWorkbook = async (
  workbook: ExcelJS.Workbook,
  coordinatorName: string,
  coordinatorCourse?: string | null,
) => {
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;

  // Clean up the filename generation
  const cleanCoordinatorName = coordinatorName
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");
  const cleanCoordinatorCourse =
    coordinatorCourse?.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "") ?? "";
  const dateStr = new Date().toISOString().split("T")[0];

  link.download = `SIPP_Report_${cleanCoordinatorName}${cleanCoordinatorCourse ? `_${cleanCoordinatorCourse}` : ""}_${dateStr}.xlsx`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
