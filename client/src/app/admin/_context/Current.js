"use client";
import { createContext, useState, useEffect } from "react";
import Loader from "../../components/Loader";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [client, setClient] = useState(false);
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
    if (!state) router.push("/admin/login");
  }, []);
  useEffect(() => {
    if (state?.token) fetchData();
    setClient(true);
  }, [state?.token]);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/admin/current`
      );
    } catch (error) {
      console.error("Error fetching current user:", error);
      if (error.response.status === 401) {
        router.push("/admin/login");
        window.localStorage.removeItem("auth");
      }
    }
  };

  return client ? <>{children}</> : <Loader />;
};

export { UserContext, UserProvider };
