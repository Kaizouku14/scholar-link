import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import Image from "next/image";

const ScholarshipHero = () => {
  return (
    <section className="bg-primary relative mx-4 flex max-w-7xl  flex-col items-center justify-between gap-6 rounded-2xl p-6 sm:mx-6 sm:p-8 lg:mx-auto lg:flex-row ">
      <div className="w-full text-center lg:w-1/2 lg:text-left">
        <h2 className="text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl">
          Find Your Scholarship Easily
        </h2>
        <p className="mt-4 text-base text-white/90 sm:text-lg">
          Start discovering scholarships today and secure your academic future.
        </p>

        <div className="mt-6">
          <Button
            asChild
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-black transition hover:bg-gray-100 sm:w-auto"
            aria-label="Get started with scholarship search"
          >
            <Link href={PageRoutes.LOGIN}>
              <span>Get Started</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="block mt-6 w-full sm:w-3/4 md:w-2/3 lg:mt-0 lg:w-1/2 max-lg:hidden">
        <Image
          src="/student-scholar.jpg"
          alt="Students celebrating scholarship award"
          className="h-auto w-full rounded-lg shadow-lg"
          width={1000}
          height={1000}
          priority
        />
      </div>
    </section>
  );
};

export default ScholarshipHero;
