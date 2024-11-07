import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { PrivateAuth } from "./routes/PrivateAuth";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AdminRoute } from "./routes/AdminRoute";
import { userContext } from "./context/myContext";
import LoanRequest from "./pages/Admin/LoanRequest";
const App = () => {
  const { handleLoad, handleFetchLoan, isUpload, isLogin } =
    useContext(userContext);
  useEffect(() => {
    const loadData = async () => {
      await handleLoad();

      
    };
    loadData();
  }, []);
  useEffect(() => {
    const loadData = async () => {
      await handleFetchLoan();
    };
    loadData();
  }, [isUpload, isLogin]);
  return (
    <div>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </div>
  );
};
const AppRoute = () => {
  const { pathname } = useLocation();
  const pathsWithoutHeader = ["/"];
  const shouldShowHeader = pathsWithoutHeader.includes(pathname);

  return (
    <>
      {shouldShowHeader && <Navbar />}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/request" element={<LoanRequest />} />
        </Route>

        <Route element={<PrivateAuth />}>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
