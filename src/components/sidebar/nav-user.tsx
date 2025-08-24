"use client";

import { Cog, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";
import { toast } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatText } from "@/lib/utils";

export interface UserItem {
  name?: string;
  email?: string;
  role?: string;
  profile?: string;
}

export const NavUser = ({ user }: { user?: UserItem }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("Signing out, please wait...", {
      position: "top-center",
    });
    try {
      const response = await authClient.signOut();
      if (response.error) throw new Error(response.error.message);
      toast.success("Signed out successfully!", {
        id: toastId,
        position: "top-center",
      });
      router.push(PageRoutes.LOGIN);
    } catch (error) {
      toast.error((error as Error).message, {
        id: toastId,
        position: "top-center",
      });
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="mx-1.5 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
              variant={"outline"}
            >
              <div className="flex w-full items-center">
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <div className="flex max-w-[8rem] items-center gap-x-1 truncate font-semibold">
                    <span> {formatText(user?.name ?? "")}</span>
                  </div>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email ?? "Unknown"}
                  </span>
                </div>
                <div className="flex size-8 items-center justify-center group-data-[collapsible=icon]:w-full">
                  <Avatar>
                    <AvatarImage src={user?.profile} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="flex items-center gap-x-1 truncate font-semibold">
                    <span>{formatText(user?.name ?? "")}</span>
                  </div>
                  <span className="truncate text-xs">
                    {user?.email ?? "Unknown"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={""}>
                <Cog />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
