import ProgramList from "./_components/program-list";
import ProgramHeader from "./_components/header";

const Pages = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <ProgramHeader />
      <ProgramList />
    </div>
  );
};

export default Pages;
