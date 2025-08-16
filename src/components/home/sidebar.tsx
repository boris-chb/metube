import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SignedIn } from "@clerk/nextjs";
import React from "react";

type Props = {};

export default function HomeSidebar({}: Props) {
  return (
    <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
      <SidebarContent className="bg-background">
        <div className="">main</div>
        <Separator />
        <div className="">personal</div>
        <SignedIn>
          <Separator />
          <div className="">subscriptions</div>
        </SignedIn>
      </SidebarContent>
    </Sidebar>
  );
}
