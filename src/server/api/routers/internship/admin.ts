import { createTRPCRouter, protectedRoute } from "../../trpc";
import { getAllCompany } from "@/lib/api/internship/admin/company/query";
import { getAdminDashboardStats } from "@/lib/api/internship/admin/dashboard/query";
import { getAllInternshipDeparments } from "@/lib/api/internship/admin/deparments/query";
import { cacheData } from "@/lib/redis";
import { getAdminSections } from "@/lib/api/internship/admin/hei/query";

export const internshipAdminRouter = createTRPCRouter({
  /******************************************
   *             Admin API Query            *
   ******************************************/
  getAdminDashboardStats: protectedRoute.query(() => {
    return cacheData(
      "admin-dashboard",
      async () => await getAdminDashboardStats(),
    );
  }),
  getAllCompany: protectedRoute.query(async () => {
    return await cacheData("company", async () => await getAllCompany());
  }),
  getAllInternshipDeparments: protectedRoute.query(() => {
    return cacheData("departments", async () => getAllInternshipDeparments());
  }),
  getAllInternships: protectedRoute.query(() => {
    return cacheData(`internships`, async () => {
      return await getAdminSections();
    });
  }),
});
