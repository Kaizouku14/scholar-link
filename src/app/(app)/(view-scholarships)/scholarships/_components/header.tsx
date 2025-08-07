import { GraduationCap } from "lucide-react";

const Header = () => {
  return (
    <div className="mb-10 text-center">
      <div className="from-primary to-primary/80 mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg lg:hidden">
        <GraduationCap className="size-8" />
      </div>

      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl dark:text-gray-300">
        Available Scholarships
      </h1>

      <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-600 md:text-lg">
        Bulacan State University – Sarmiento Campus offers more opportunities
        for you to achieve your dreams through accessible and diverse
        scholarship programs.
      </p>
    </div>
  );
};

export default Header;
