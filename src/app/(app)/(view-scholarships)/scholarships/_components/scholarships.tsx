"use client";

import FeaturedCard from "@/components/cards/scholarship/featured-card";
import PagePagination from "@/components/pagination/page-pagination";
import { api } from "@/trpc/react";
import { useState } from "react";
import Loading from "./loading";
import Header from "./header";

const AvailableScholarships = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = api.public.getAllActivePrograms.useQuery();

  const itemsPerPage = 6;
  const totalPages = Math.ceil((data?.length ?? 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScholarships = data?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);

  if (isLoading) return <Loading />;

  if (!data || data.length === 0) {
    return (
      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Header />
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
        <Header />
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

export default AvailableScholarships;
