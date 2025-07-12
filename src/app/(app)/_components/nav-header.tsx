import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { GraduationCap } from "lucide-react";

const NavHeader = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-center">
        <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent group-data-[collapsible=icon]:!size flex w-full items-center justify-center gap-2 overflow-hidden rounded-md py-1.5 text-left text-sm transition-[width,height,padding] group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 group-data-[collapsible=icon]:!p-2">
          <div className="bg-sidebar-accent text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg">
            <GraduationCap className="size-5" />
          </div>
          <div className="flex items-center group-data-[collapsible=icon]:hidden">
            <span className="text-xl font-bold">Scholar</span>
            <span className="text-primary text-xl font-bold">Link</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavHeader;
