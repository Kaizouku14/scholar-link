"use client";

import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Particles } from "@/components/magicui/particles";
import { PageRoutes } from "@/constants/page-routes";
import { GraduationCap, MoveUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MENU_ITEMS } from "@/constants/header-menu";

const Home = () => {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <section
      id={MENU_ITEMS.HOME}
      className="relative flex h-[calc(60vh-4rem)] min-h-[28rem] w-full flex-col items-center justify-center overflow-hidden md:h-[calc(90vh-4rem)] md:min-h-[35rem]"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={80}
        color={color}
        refresh
      />

      <div className="flex flex-col items-center justify-center space-y-6">
        <AnimatedShinyText className="border-border flex items-center justify-center gap-x-1 rounded-full border px-4 py-1 text-sm shadow-lg transition-all duration-300 ease-out hover:text-neutral-600 sm:text-base hover:dark:text-neutral-300">
          <div className="flex items-center gap-x-1">
            <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Introducing</span>
          </div>
          <div className="flex items-center">
            <span>Scholar</span>
            <span className="text-primary font-bold">Link</span>
          </div>
        </AnimatedShinyText>

        <div className="flex flex-col items-center text-center">
          <h1
            id="hero-heading"
            className="flex flex-wrap justify-center text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl lg:text-5xl"
          >
            <span className="text-primary">B</span>
            <span>UL</span>
            <span className="text-primary mr-1">SU</span>
            <span className="break-words">Sarmiento Campus Scholarship</span>
          </h1>
          <p className="max-w-2xl text-xl leading-snug font-extrabold sm:text-2xl md:text-3xl lg:text-5xl">
            & Internship Management
          </p>

          <p className="text-muted-foreground mt-3 max-w-xs text-xs sm:mt-4 sm:max-w-md sm:text-sm md:mt-6 md:max-w-2xl md:text-base">
            A unified platform to simplify your scholarship search and
            streamline internship management—so you can focus on building your
            future.
          </p>
        </div>

        <Link
          href={PageRoutes.LOGIN}
          className="bg-primary z-10 flex w-auto max-w-xs items-center gap-2 rounded-full px-4 py-2 text-sm md:px-5 md:py-1.5 md:text-base lg:text-lg"
          title="Get Started"
        >
          <span className="text-white">Get Started</span>
          <MoveUpRight
            size={20}
            className="rounded-full bg-white p-1 text-sm text-black"
          />
        </Link>
      </div>
    </section>
  );
};

export default Home;
