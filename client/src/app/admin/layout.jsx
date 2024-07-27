"use client";
import SideMenu from "./_components/SideMenu";
import { UserProvider, UserContext } from "./_context/Current";
import { useContext } from "react";

export default function RootLayout({ children }) {
  const user = useContext(UserContext);

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <UserProvider>
        <SideMenu />
        {children}
      </UserProvider>
    </div>
  );
}
