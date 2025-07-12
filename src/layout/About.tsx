import { MENU_ITEMS } from "@/constants/header-menu";
import React from "react";

const About = () => {
  return (
    <section
      id={MENU_ITEMS.ABOUT}
      className="flex h-screen flex-col items-center"
    >
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        What is ScholarLink?
      </h1>

      <div className="mt-8 grid w-full grid-cols-1 gap-x-12 gap-y-8 text-center text-base leading-relaxed sm:text-lg md:grid-cols-2 md:text-left">
        <p>
          Many students at Bulacan State University–Sarmiento Campus were
          surprised to learn that their own university offers scholarship
          programs. A lack of information meant they consistently missed these
          opportunities to alleviate their financial burdens.
        </p>

        <p>
          Scholarship funds cover tuition, fees, room and board—and even hidden
          costs like campus tours. They let students focus on their studies and
          campus life without unexpected expenses.
        </p>

        <p>
          A scholarship is free (money you will not have to pay back after
          graduation). It’s not a student loan; scholarships are a gift that
          does not have to be repaid. As the cost of college continues to rise,
          applying for scholarships should be a priority for all college-bound
          and current students.
        </p>

        <p>
          Uncovering scholarships can feel overwhelming. When looking for ways
          to pay for college, parents and students want to know how to get
          scholarships, how to apply, and where to find a complete list. That’s
          where ScholarLink comes in—your one-stop platform for everything
          scholarship and internship.
        </p>
      </div>
    </section>
  );
};

export default About;
