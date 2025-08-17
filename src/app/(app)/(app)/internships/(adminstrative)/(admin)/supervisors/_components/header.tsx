const SupervisorHeader = () => {
  return (
    <div className="bg-primary mt-4 rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-1">
        <div className="space-y-1">
          <h1 className="text-center text-2xl font-bold text-white md:text-start md:text-3xl">
            Manage All Supervisor
          </h1>
          <p className="text-center text-sm font-medium text-white/90 md:text-start md:text-base">
            View and manage all supervisor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupervisorHeader;
