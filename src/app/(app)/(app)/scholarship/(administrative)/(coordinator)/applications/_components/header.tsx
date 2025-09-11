const ApplicationsHeader = () => {
  return (
    <div className="bg-primary rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2">
        <div className="space-y-1.5">
          <h1 className="text-center text-2xl font-bold text-white md:text-start md:text-3xl">
            Manage Applications
          </h1>
          <p className="text-center text-sm font-medium text-white/90 md:text-start md:text-base">
            Manage your applicants efficiently and review their submitted
            documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsHeader;
