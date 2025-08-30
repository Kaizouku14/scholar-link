import toast from "react-hot-toast";
import type { ReportSchema } from "./column-schema";
import ExcelJS from "exceljs";
import { createWorksheet } from "../helpers/create-worksheet";
import {
  exportWorkbook,
  groupByCoordinator,
  groupBySection,
} from "../helpers/utils";

export const exportByCoordinator = async (rows: ReportSchema[]) => {
  if (!rows || rows.length === 0) {
    toast.error("No data to export.");
    return;
  }

  const groupedCoordinators = groupByCoordinator(rows);

  for (const [coordinatorName, coordinatorRows] of Object.entries(
    groupedCoordinators,
  )) {
    const workbook = new ExcelJS.Workbook();

    const coordinatorCourse =
      coordinatorRows[0]?.coordinatorCourse ?? coordinatorRows[0]?.course;

    const studentsByCourse = coordinatorRows.filter(
      (r) => r.course === coordinatorCourse,
    );
    if (studentsByCourse.length === 0) {
      console.warn(
        `No students found for ${coordinatorName} - ${coordinatorCourse}`,
      );
      continue;
    }

    const groupedSections = groupBySection(studentsByCourse);

    for (const [section, students] of Object.entries(groupedSections)) {
      createWorksheet(
        workbook,
        section,
        students,
        coordinatorName,
        coordinatorCourse!,
      );
    }

    try {
      await exportWorkbook(workbook, coordinatorName, coordinatorCourse!);
    } catch (err) {
      console.error(`Export failed for ${coordinatorName}:`, err);
      toast.error(`Failed to export report for ${coordinatorName}.`);
    }
  }

  toast.success(
    `Successfully exported ${Object.keys(groupedCoordinators).length} report file(s)!`,
  );
};
