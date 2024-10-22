import { Outlet } from "react-router-dom";
import PrivateLoader from "../components/PrivateLoader";
import { useContext } from "react";
import { userContext } from "../context/myContext";
export const AdminRoute = () => {
  const { isAdmin } = useContext(userContext);
  return isAdmin ? <Outlet /> : <PrivateLoader path="/login" />;
};
