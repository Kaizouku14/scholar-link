const InternshipHeader = async () => {
  return (
    <div className="bg-primary rounded-lg p-6 shadow-md">
      <div className="flex flex-col gap-2">
        <div className="space-y-1.5">
          <h1 className="text-center text-2xl font-bold text-white md:text-start md:text-3xl">
            Manage Higher Education Institutions.
          </h1>
          <p className="text-center text-sm font-medium text-white/90 md:text-start md:text-base">
            Manage All the intern&apos;s in your department.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternshipHeader;
