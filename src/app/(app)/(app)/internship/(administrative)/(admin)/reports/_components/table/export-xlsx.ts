import toast from "react-hot-toast";
import ExcelJS from "exceljs";
import { createWorksheet } from "../helpers/create-worksheet";
import { exportWorkbook, groupByCoordinator } from "../helpers/utils";
import type { Reports } from "@/interfaces/internship/reports";

export const exportByCoordinator = async (rows: Reports[]) => {
  if (!rows || rows.length === 0) {
    toast.error("No data to export.");
    return;
  }

  const groupedCoordinators = groupByCoordinator(rows);

  if (!(groupByCoordinator.length > 0)) {
    toast.error("No data to export.");
    return;
  }

  for (const [coordinatorName, coordinatorRows] of Object.entries(
    groupedCoordinators,
  )) {
    try {
      const workbook = new ExcelJS.Workbook();
      const coordinatorCourse = coordinatorRows[0]?.coordinatorCourse;

      // Create ONE worksheet per coordinator with ALL their students
      createWorksheet(workbook, coordinatorRows, coordinatorName);

      await exportWorkbook(workbook, coordinatorName, coordinatorCourse);
    } catch (err) {
      console.error(`Export failed for ${coordinatorName}:`, err);
      toast.error(`Failed to export report for ${coordinatorName}.`);
    }
  }

  toast.success("Reports exported successfully!");
};
