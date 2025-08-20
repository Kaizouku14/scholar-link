import { createTRPCRouter, protectedRoute } from "../../trpc";
import { getAllCompany } from "@/lib/api/internship/admin/company/query";
import { getAdminDashboardStats } from "@/lib/api/internship/admin/dashboard/query";
import { getAllInternshipDeparments } from "@/lib/api/internship/admin/deparments/query";
import { getAllSupervisor } from "@/lib/api/internship/admin/supervisor/query";
import { cacheData } from "@/lib/redis";

export const internshipAdminRouter = createTRPCRouter({
  /******************************************
   *             Admin API Query            *
   ******************************************/
  getAdminDashboardStats: protectedRoute.query(() => {
    return cacheData("admin-dashboard", getAdminDashboardStats);
  }),
  getAllCompany: protectedRoute.query(async () => {
    return await cacheData("company", getAllCompany);
  }),
  getAllSupervisor: protectedRoute.query(async () => {
    return await cacheData("supervisor", getAllSupervisor);
  }),
  getAllInternshipDeparments: protectedRoute.query(async () => {
    return await cacheData("departments", getAllInternshipDeparments);
  }),
});
