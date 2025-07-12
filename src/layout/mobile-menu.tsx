import { Button } from "../components/ui/button";
import { AlignJustify } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { MENU_OPTIONS } from "@/constants/header-menu";
import { PageRoutes } from "@/constants/page-routes";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="hidden rounded-full shadow-sm max-lg:flex"
          aria-label="Open menu"
        >
          <AlignJustify className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="mx-auto block w-full max-w-md rounded-t-2xl pb-6 lg:hidden"
      >
        <SheetHeader>
          <SheetTitle className="flex justify-center">
            <Link href={PageRoutes.HOME} className="flex items-center gap-2">
              <Image
                src="/scholar-link-logo.png"
                width={40}
                height={40}
                alt="Scholar Link Logo"
                className="object-contain"
                priority
              />
              <span className="text-xl font-bold">
                Scholar<span className="text-primary">Link</span>
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-4 px-6">
          <SheetClose asChild>
            <ul className="divide-border bg-background divide-y rounded-lg">
              {MENU_OPTIONS.map(({ href, title }, idx) => (
                <li key={idx}>
                  <a
                    href={href}
                    className="hover:bg-muted block px-4 py-3 text-lg font-medium transition-colors"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </SheetClose>
        </nav>

        <SheetFooter className="mt-4 px-6">
          <SheetClose asChild>
            <Link href={PageRoutes.LOGIN} title="Sign In">
              <Button variant="default" title="Sign In" className="w-full">
                Sign In
              </Button>
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
