import { Marquee } from "@/components/magicui/marquee";
import { reviews } from "@/data/reviews";
import ReviewCard from "../cards/review-card";

const Testimonies = () => {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  const thirdRow = reviews.slice(0, reviews.length / 2);

  return (
    <div className="relative flex h-[35rem] w-full items-center justify-center overflow-hidden max-md:px-2.5">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        vertical
        className="block [--duration:20s] max-lg:hidden"
      >
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        vertical
        className="hidden [--duration:20s] md:block"
      >
        {thirdRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t"></div>
    </div>
  );
};

export default Testimonies;
