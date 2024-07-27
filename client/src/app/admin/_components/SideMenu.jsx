"use client";
import React from "react";
import { navData } from "./data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BellIcon, LayoutGridIcon } from "@/app/generate-quiz/IconsSVG";
import { Button } from "@/components/ui/button";
function SideMenu() {
  const pathName = usePathname();
  const router = useRouter();
  const logOut = () => {
    localStorage.removeItem("auth");
    router.push("/admin/login");
  };
  const activeLink = (name) => {
    return pathName.split("/")[2] === name;
  };
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 min-h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/admin">
            <LayoutGridIcon className="h-6 w-6" />
            <span>Dashboard</span>
          </Link>
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navData.map((ele, i) => {
              return (
                <Link
                  key={i}
                  className={
                    activeLink(ele.link)
                      ? "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                      : `flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`
                  }
                  href={ele.link}
                >
                  {ele.icon}
                  {ele.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
