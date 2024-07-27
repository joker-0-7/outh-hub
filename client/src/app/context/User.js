"use client";
import { createContext, useState, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [client, setClient] = useState(false);
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    const storedAuth = window.localStorage.getItem("auth");
    if (storedAuth) {
      try {
        setState(JSON.parse(storedAuth));
      } catch (error) {
        console.error("Error parsing auth data from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    setClient(true);
  }, []);

  const token = state && state.token ? state.token : "";
  axios.defaults.headers.common["Authorization"] = token;

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      console.log(res);
      if (res && res.status === 401 && !pathName.split("/").includes("login")) {
        setState(null);
        window.localStorage.removeItem("auth");
        if (pathName.split("/").includes("admin")) {
          router.push("/admin/login");
        } else {
          router.push("/login");
        }
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (state?.token && pathName.split("/").includes("login")) {
      router.push("/");
    }
  }, [state]);
  return client ? (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  ) : (
    <Loader />
  );
};

export { UserContext, UserProvider };
