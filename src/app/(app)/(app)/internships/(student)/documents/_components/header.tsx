const DocumentsHeader = () => {
  return (
    <div className="bg-primary mt-4 rounded-lg p-6 shadow-md">
      <div className="flex flex-col items-center gap-2 md:items-start">
        <div className="space-y-1.5">
          <h1 className="text-center text-2xl font-bold text-white md:text-start md:text-3xl">
            Manage Your Internship Documents
          </h1>
          <p className="text-center text-sm font-medium text-white/90 md:text-start md:text-base">
            Upload your documents and get feedback from your supervisor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentsHeader;
