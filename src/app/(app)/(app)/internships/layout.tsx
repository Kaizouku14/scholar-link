import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <main className="mx-auto w-full">{children}</main>;
};

export default Layout;
