"use client";

import FeaturedCard from "@/components/cards/featured-card";
import PagePagination from "@/components/pagination/page-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Scholarships",
};

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = api.scholarships.getAllActivePrograms.useQuery();

  const itemsPerPage = 6;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScholarships = data?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const renderHeader = () => (
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

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          {renderHeader()}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton className="h-[28.5rem] w-full" key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          {renderHeader()}
          <div className="flex h-[28rem] items-center justify-center">
            <span className="text-muted-foreground text-lg">
              No available scholarships at the moment.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6">
        {renderHeader()}
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentScholarships?.map((items, index) => (
            <FeaturedCard key={index} data={items} />
          ))}
        </div>

        <PagePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-12"
        />
      </div>
    </div>
  );
};

export default Page;
