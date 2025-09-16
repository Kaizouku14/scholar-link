import ScholarProgramHeader from "./_components/program-header";
import ScholarProgramList from "./_components/program-list";

const Pages = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <ScholarProgramHeader />
      <ScholarProgramList />
    </div>
  );
};

export default Pages;
