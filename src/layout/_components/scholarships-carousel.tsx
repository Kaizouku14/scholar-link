"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "../../components/ui/carousel";
import FeaturedCard from "../../components/cards/scholarship/featured-card";
import { api } from "@/trpc/react";
import { Skeleton } from "../../components/ui/skeleton";

const ScholarshipsCarousel = () => {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const { data, isLoading } = api.scholarships.getAllActivePrograms.useQuery();

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  if (isLoading)
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-96 w-[20rem] md:w-[23rem]" />
        ))}
      </div>
    );

  return (
    <div className="ml-1 flex flex-col">
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "center",
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="flex items-center justify-center">
          {data?.length === 0 ? (
            <div className="ml-4 flex h-96 w-full items-center justify-center rounded-xl">
              <div className="text-muted-foreground">No Scholarship yet.</div>
            </div>
          ) : (
            <>
              {data?.map((items, index) => (
                <CarouselItem key={index} className="flex-none">
                  <div className="py-1">
                    <FeaturedCard data={items} />
                  </div>
                </CarouselItem>
              ))}
            </>
          )}
        </CarouselContent>

        <CarouselPrevious className="flex max-lg:hidden" />
        <CarouselNext className="flex max-lg:hidden" />
      </Carousel>

      <div className="mt-1.5 flex w-full justify-center space-x-2">
        {Array.from({ length: count }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => carouselApi?.scrollTo(idx)}
            className={`size-2.5 rounded-full ${current === idx + 1 ? "bg-primary" : "bg-muted-foreground"} transition-opacity duration-200`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScholarshipsCarousel;
