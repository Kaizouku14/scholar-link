import { PageRoutes } from "@/constants/page-routes";
import { ManagementCard } from "./_components/cards/admin-management";
import AdminDashboardStats from "./_components/cards/admin-stats";
import { Briefcase, Building2 } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="mt-2 flex flex-col">
        <span className="text-3xl">Dashboard</span>
        <span className="text-muted-foreground text-sm">
          Overview of your assigned students and internships
        </span>
      </div>
      <AdminDashboardStats />
      <div className="grid grid-cols-2 gap-4">
        <ManagementCard
          title="Company Management"
          description="Manage partner companies"
          total={35}
          totalLabel="Manage Companies"
          growth={3}
          icon={Building2}
          items={[
            { name: "TechCorp", count: 12, label: "Interns" },
            { name: "InnoSoft Inc.", count: 8, label: "Interns" },
            { name: "DataSys Solutions", count: 7, label: "Interns" },
          ]}
          actionLabel="Manage Companies"
          page={PageRoutes.INTERNSHIPS_COMPANIES}
        />

        <ManagementCard
          title="Internship Management"
          description="Track active internships"
          total={120}
          totalLabel="Active Internships"
          growth={5}
          icon={Briefcase}
          items={[
            { name: "TechCorp", count: 20, label: "Interns" },
            { name: "InnoSoft Inc.", count: 15, label: "Interns" },
          ]}
          actionLabel="Manage Internships"
          page={PageRoutes.INTERNSHIP_MANAGE_INTERNSHIPS}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
