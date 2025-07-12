import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { PageRoutes } from "@/constants/page-routes";
import { redirect } from "next/navigation";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(PageRoutes.DASHBOARD);
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href={PageRoutes.HOME}
            className="flex items-center gap-2 font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <GraduationCap className="size-5" />
            </div>
            <div className="flex text-xl font-bold">
              <span>Scholar</span>
              <span className="text-primary">Link</span>
            </div>
          </Link>
        </div>
        {children}
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/bsu-picture.png"
          alt="Image"
          className="absolute inset-0 size-full object-cover"
          height={250}
          width={400}
        />
      </div>
    </div>
  );
};

export default Layout;
