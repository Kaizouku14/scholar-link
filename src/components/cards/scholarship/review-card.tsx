import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Review {
  name: string;
  username: string;
  body: string;
  img: string;
}

const ReviewCard: React.FC<Review> = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-32 w-96 cursor-pointer overflow-hidden rounded-xl border p-4",
        "transform transition-transform duration-200 ease-in-out hover:scale-105",
        "border-border border-1 shadow max-lg:w-auto md:my-1.5",
      )}
    >
      <blockquote className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {body}
      </blockquote>
      <div className="mt-4 flex flex-row items-center gap-3">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt={`${name} profile picture`}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {username}
          </p>
        </div>
      </div>
    </figure>
  );
}; 

export default ReviewCard;
