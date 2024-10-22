import React, { useState } from "react";
import axios from "axios";
import { userContext } from "./myContext";
const UserProvider = ({ children }) => {
  const [authenticate, setAuthenticate] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loan, setLoan] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [AllLoan, setAllLoan] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleLoad = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}/user/me`,
        {
          withCredentials: true,
        }
      );
      console.log("user", data);
      setUser(data?.user);

      setAuthenticate(data?.success);
      if (data?.user.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loLogOut = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}/user/logout`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        console.log("logout", data);
        setUser(null);
        setLoan([]);
        setIsAdmin(false);
        setAuthenticate(false);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFetchLoan = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}/loan/loaanstack`,
        {
          withCredentials: true,
        }
      );
      console.log("loan", data);
      setLoan(data?.loans);
    } catch (error) {
      console.log(error);
    }
  };
  const addLoan = async (formdata) => {
    console.log(formdata);
    setLoader(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_KEY}/loan/loanrequest`,
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("gallery", data);
      setLoan([...loan, data?.loan]);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const handleGetAllLoan = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}/loan/loanget`,
        {
          withCredentials: true,
        }
      );
      console.log("loan", data);
      setAllLoan(data?.loans);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusUpdate = async (value, id) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_KEY}/loan/loanapproveddmin/${id}`,
        value,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("updated status", data);
      // setLoan([...loan, data?.loan]);
      // setAllLoan([...AllLoan,data?.loan]);

      const updateStatus = AllLoan?.map((l) => {
        if (l._id === id) {
          return data?.loan;
        }
        return l;
      });
      setAllLoan(updateStatus);
      console.log(updateStatus);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRepayment = async (re, id) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_KEY}/loan/repaayment/${id}`,
        re,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("updated status", data);

      const updateStatus = loan?.map((l) => {
        if (l._id === id) {
          return data?.loan;
        }
        return l;
      });
      setLoan(updateStatus);
      console.log(updateStatus);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <userContext.Provider
      value={{
        handleLoad,
        setAuthenticate,
        authenticate,
        loLogOut,
        user,
        setUser,
        setIsLogin,
        isLogin,
        handleFetchLoan,
        setLoan,
        addLoan,
        loader,
        isUpload,
        loan,
        handleGetAllLoan,
        AllLoan,
        handleStatusUpdate,
        handleRepayment,
        setIsAdmin,
        isAdmin,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
