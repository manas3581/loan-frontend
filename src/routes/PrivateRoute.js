import { Outlet } from "react-router-dom";
import PrivateLoader from "../components/PrivateLoader";
import { useContext } from "react";
import { userContext } from "../context/myContext";
export const PrivateRoute = () => {
  const { authenticate } = useContext(userContext);
  return authenticate ? <Outlet /> : <PrivateLoader path="/login" />;
};
