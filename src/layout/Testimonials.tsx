import Testimonies from "@/components/landing-page/Testimonies";
import React from "react";

const Testimonials = () => {
  return (
    <section className="mt-12 flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold md:text-3xl">
          Empower Your Future with ScholarLink
        </h1>
        <p className="text-foreground">
          Connecting Students to Scholarship Opportunities at Bulacan State
          University Sarmiento Campus
        </p>
      </div>
      <Testimonies />
    </section>
  );
};

export default Testimonials;
