"use client";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./User";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import Loader from "../components/Loader";

function UserRouter({ children }) {
  const [ok, setOk] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    setOk(false);
    if (
      pathName.split("/").includes("login") ||
      pathName.split("/").includes("register") ||
      pathName.split("/").includes("payment")
    ) {
      setOk(true);
    } else {
      getCurrentUser();
    }
  }, [pathName]);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/users/current`
      );
      if (res.data.ok) setOk(true);
    } catch (error) {
      if (pathName.split("/").includes("admin")) {
        router.push("/admin/login");
      } else {
        router.push("/login");
      }
    }
  };

  return !ok ? <Loader /> : <>{children}</>;
}

export default UserRouter;
