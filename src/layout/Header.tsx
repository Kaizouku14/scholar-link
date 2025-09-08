"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { PageRoutes } from "@/constants/page-routes";
import { MENU_OPTIONS } from "@/constants/header-menu";
import ModeToggle from "@/components/theme/mode-toggler";
import MobileMenu from "./mobile-menu";
import { usePathname, useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("#home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const scrollThreshold = 50;
  const { data } = authClient.useSession();

  useEffect(() => {
    const updatePathSection = () => {
      if (pathname !== "/") setActiveSection("");
      else setActiveSection(window.location.hash || "#home");
    };
    updatePathSection();
    window.addEventListener("hashchange", updatePathSection);
    return () => window.removeEventListener("hashchange", updatePathSection);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > scrollThreshold);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection: string | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSection = `#${entry.target.id}`;
          }
        });

        if (visibleSection) {
          setActiveSection(visibleSection);
          //   history.replaceState(null, "", visibleSection); //Set the visible section as the current URL
        } else {
          // When no section is visible, clear the active section
          setActiveSection("");
          //   history.replaceState(null, "", " "); //remove the hash
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px",
      },
    );

    MENU_OPTIONS.forEach((opt) => {
      const id = opt.href.replace(/^#/, "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    if (pathname === "/") return;

    const newHref = pathname.replace(pathname, "/" + href);
    document.querySelector(newHref.replace("/", ""));
    router.push(newHref);
  };

  return (
    <header
      className={`sticky z-50 mx-auto transition-all duration-300 ease-in-out ${isScrolled ? "top-0 bg-gradient-to-t py-4" : "py-4"}`}
    >
      <div className="mx-auto flex justify-center md:max-w-7xl">
        <div
          className={`rounded-2xl shadow-none transition-all duration-300 ease-in-out ${
            isScrolled
              ? "border-border bg-background/75 w-[30rem] border px-2 py-2 backdrop-blur-lg transition-all duration-300 max-lg:mx-2 md:w-5xl"
              : "w-full transition-all duration-300"
          }`}
        >
          <div className="flex h-12 items-center justify-between">
            <Link href={PageRoutes.HOME} className="flex items-center">
              <Image
                src="/scholar-link-logo.png"
                width={70}
                height={50}
                alt="Scholar Link Logo"
                className="object-contain"
                priority
              />
              <div className="flex items-center">
                <span className="text-xl font-bold">Scholar</span>
                <span className="text-primary text-xl font-bold">Link</span>
              </div>
            </Link>

            <NavigationMenu className="block max-lg:hidden">
              <NavigationMenuList>
                {MENU_OPTIONS.map((item) => {
                  const isActive =
                    pathname === "/" && activeSection === item.href;

                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink
                        href={item.href}
                        className={navigationMenuTriggerStyle({
                          className: isActive
                            ? "text-primary bg-accent/60 border-border rounded-full border font-medium"
                            : "text-muted-foreground rounded-full bg-transparent transition-colors duration-300 ease-in-out",
                        })}
                        onClick={() => handleClick(item.href)}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="mr-2 flex justify-end gap-2">
              <Link href={PageRoutes.LOGIN}>
                <Button
                  className="block rounded-full px-5 max-lg:hidden"
                  variant="default"
                  title="Sign In"
                >
                  {data?.session ? "Dashboard" : "Sign In"}
                </Button>
              </Link>
              <ModeToggle />
              <MobileMenu isLogged={!!data?.session} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
