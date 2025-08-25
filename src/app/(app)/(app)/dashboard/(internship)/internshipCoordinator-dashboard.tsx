import CoordinatorDashboardStats from "./_components/cards/coordinator-stats";

const CoordinatorDashboard = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex flex-col">
        <span className="text-3xl">Dashboard</span>
        <span className="text-muted-foreground text-sm">
          Overview of your assigned students and internships
        </span>
      </div>
      <CoordinatorDashboardStats />
    </div>
  );
};

export default CoordinatorDashboard;
