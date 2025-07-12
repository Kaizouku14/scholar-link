import ScholarshipsCarousel from "@/components/landing-page/scholarships-carousel";
import { Button } from "@/components/ui/button";
import { MENU_ITEMS } from "@/constants/header-menu";
import { PageRoutes } from "@/constants/page-routes";
import Link from "next/link";
import React from "react";
import Testimonials from "./Testimonials";
import ScholarshipHero from "@/components/landing-page/hero-banner";
import FAQ from "./FAQ";

const Scholarships = () => {
  return (
    <section
      id={MENU_ITEMS.SCHOLARSHIPS}
      className="flex h-auto flex-col items-center gap-2.5"
    >
      <div className="flex w-full flex-col items-center text-center">
        <h1 className="text-2xl font-bold md:text-3xl">
          Available Scholarships
        </h1>
        <p className="line-clamp-2 w-1/2">
          ScholarLink highlights a list of new college scholarships available in
          Bulacan States University Sarmiento Campus.
        </p>
      </div>

      <div className="flex w-full max-w-6xl flex-col space-y-2">
        <Link
          href={PageRoutes.SCHOLARSHIPS_PUBLIC}
          className="text-primary cursor-pointer self-end"
        >
          <Button
            variant="outline"
            className="border-primary hover:text-primay/10 mx-2 border hover:underline"
          >
            See All Scholarships
          </Button>
        </Link>

        <ScholarshipsCarousel />
      </div>
      <Testimonials />
      <FAQ />
      <ScholarshipHero />
    </section>
  );
};

export default Scholarships;
