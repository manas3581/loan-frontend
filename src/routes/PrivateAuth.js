import { Outlet } from "react-router-dom";
import PrivateLoader from "../components/PrivateLoader";
import { useContext } from "react";
import { userContext } from "../context/myContext";
export const PrivateAuth = () => {
  const { authenticate } = useContext(userContext);
  return authenticate ? <PrivateLoader path="/" /> : <Outlet />;
};
