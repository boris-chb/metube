import AuthButton from "@/components/auth-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";

export default function HomeNavbar() {
  return (
    <nav className="fixed start-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
      {/* MENU & LOGO */}
      <div className="flex items-center gap-4 w-full">
        <SidebarTrigger />
        {/* LOGO */}
        <Link prefetch href="/" className="hidden md:block">
          <p className="text-xl font-semibold tracking-tight">metube</p>
        </Link>
      </div>

      <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
        <input type="text" />
      </div>

      <div className="flex-shrink-0 items-center flex gap-4">
        <AuthButton />
      </div>
    </nav>
  );
}
