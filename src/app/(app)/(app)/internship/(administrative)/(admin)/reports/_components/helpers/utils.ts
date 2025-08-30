import type { ReportSchema } from "../table/column-schema";
import type ExcelJS from "exceljs";

export const groupByCoordinator = (rows: ReportSchema[]) => {
  const grouped: Record<string, ReportSchema[]> = {};
  rows.forEach((row) => {
    const name = row.coordinatorName ?? "Unknown Coordinator";
    grouped[name] ??= [];
    grouped[name].push(row);
  });
  return grouped;
};

export const groupBySection = (rows: ReportSchema[]) => {
  const grouped: Record<string, ReportSchema[]> = {};
  rows.forEach((row) => {
    const sections = Array.isArray(row.section)
      ? row.section
      : [row.section].filter(Boolean);
    sections.forEach((sec) => {
      const section = sec ?? "Unknown Section";
      grouped[section] ??= [];
      grouped[section].push(row);
    });
  });
  return grouped;
};

export const exportWorkbook = async (
  workbook: ExcelJS.Workbook,
  coordinatorName: string,
  coordinatorCourse?: string,
) => {
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `SIPP_Report_${coordinatorName.replace(/\s+/g, "_")}_${coordinatorCourse?.replace(/\s+/g, "_")}_${
    new Date().toISOString().split("T")[0]
  }.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
};
