"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Home, Settings } from "lucide-react";

export function SideBar() {
  const pathName = usePathname();

  debugger;

  return (
    <nav className="flex flex-col w-32 py-4 gap-20">
      <Logo />
      <div className="flex flex-col items-center gap-8">
        <Link
          href="/dashboard"
          className={
            pathName === "/dashboard"
              ? "cursor-pointer flex justify-center bg-gray-900 p-4 rounded-3xl w-max"
              : "cursor-pointer"
          }
        >
          <Home size={24} color="white" />
        </Link>
        <Link
          href="/login"
          className={
            pathName === "/profile" ? "flex justify-center bg-pink-900" : ""
          }
        >
          <Settings size={24} />
        </Link>
      </div>
    </nav>
  );
}
