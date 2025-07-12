"use client";

import { usePathname, useRouter } from "next/navigation";
import { data } from "@/data/footer";
import { Home } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = (href: string) => {
    if (pathname === "/") return;

    const newHref = pathname.replace(pathname, "/" + href);
    document.querySelector(newHref.replace("/", ""));
    router.push(newHref);
  };

  return (
    <footer className="mt-1 border-t px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 flex flex-col items-center text-center sm:col-span-2 sm:items-start sm:text-left lg:col-span-2">
            <div className="mb-4 flex items-center">
              <Image
                src="/scholar-link-logo.png"
                alt="ScholarLink logo"
                width={80}
                height={80}
                className="object-contain"
              />
              <div>
                <span className="text-xl font-bold">Scholar</span>
                <span className="text-primary text-xl font-bold">Link</span>
              </div>
            </div>

            <div className="md:ml-6">
              <div className="mb-4 flex items-center justify-center gap-x-2 sm:justify-start">
                <Home size={16} />
                <span className="text-sm">
                  University Heights BSU Sarmiento Campus
                </span>
              </div>

              <p className="text-sm">
                Connecting students, faculty, and resources for academic
                success.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center sm:items-start sm:text-left md:ml-6">
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2">
              {data[0]?.map((value, index) => (
                <li key={index}>
                  <a
                    href={value.href}
                    onClick={() => handleClick(value.href)}
                    className="hover:text-primary text-sm transition-colors duration-200"
                  >
                    {value.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center text-center sm:items-start sm:text-left md:ml-6">
            <h3 className="mb-4 font-semibold">Privacy &amp; Terms</h3>
            <ul className="space-y-2">
              {data[1]?.map((value, index) => (
                <li key={index}>
                  <a
                    href={value.href}
                    className="hover:text-primary text-sm transition-colors duration-200"
                  >
                    {value.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-500">
          <p>© {new Date().getFullYear()} ScholarLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
