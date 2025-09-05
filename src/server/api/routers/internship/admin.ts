import { createTRPCRouter, adminRoute } from "../../trpc";
import { getAllCompany } from "@/lib/api/internship/admin/company/query";
import { getAdminDashboardStats } from "@/lib/api/internship/admin/dashboard/query";
import { getAllInternshipDeparments } from "@/lib/api/internship/admin/deparments/query";
import { cacheData } from "@/lib/redis";
import { getAdminSections } from "@/lib/api/internship/admin/hei/query";
import { getInternshipReports } from "@/lib/api/internship/admin/reports/query";
import { getInternsMoa } from "@/lib/api/internship/admin/moa/query";

export const internshipAdminRouter = createTRPCRouter({
  /******************************************
   *             Admin API Query            *
   ******************************************/
  getAdminDashboardStats: adminRoute.query(() => {
    return cacheData(
      "admin-dashboard",
      async () => await getAdminDashboardStats(),
    );
  }),
  getAllCompany: adminRoute.query(async () => {
    return await cacheData("company", async () => await getAllCompany());
  }),
  getAllInternshipDeparments: adminRoute.query(() => {
    return cacheData("departments", async () => getAllInternshipDeparments());
  }),
  getAllInternships: adminRoute.query(() => {
    return cacheData(`internships`, async () => {
      return await getAdminSections();
    });
  }),
  getInternshipReports: adminRoute.query(() => {
    return cacheData(
      "internship-reports",
      async () => await getInternshipReports(),
    );
  }),
  getAllInternsMoa: adminRoute.query(() => {
    return cacheData("internships-moa", async () => await getInternsMoa());
  }),
});
