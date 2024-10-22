import React, { useContext, useState } from "react";
import { userContext } from "../context/myContext";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const { setAuthenticate, setUser, setIsLogin, isLogin, setIsAdmin } =
    useContext(userContext);
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [customError, setCustomError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsError(false);
    setErrorMessage("");
    setEmailError("");
    setPasswordError("");
    setCustomError("");
    if (!name) {
      setIsError(true);
      setErrorMessage("name is necessary");
      return;
    }
    if (!email) {
      setIsError(true);
      setEmailError("email is necessary");
      return;
    }
    if (!password) {
      setIsError(true);
      setPasswordError("password is necessary");
      return;
    }
    if (!name || name.length < 3 || /\d/.test(name)) {
      setIsError(true);
      setErrorMessage(
        "Name should be at least three characters long and should not contain any numbers."
      );
      return;
    }
    if (!password || password.length < 6) {
      setIsError(true);
      setPasswordError("Password should be at least six characters long.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setIsError(true);
      emailError("Email should be in a valid format.");
      return;
    }
    setIsLogin(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/user/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        //  login
        window.localStorage.setItem("token", res?.data?.token);
        setIsLogin(false);
        setUser(res?.data?.user);
        setAuthenticate(res?.data?.success);
        console.log(res.data);
        if (res?.data?.user.role === "admin") {
          setIsAdmin(true);
        }
        if (res?.data?.user.role === "user") {
          return navigate("/");
        } else {
          return navigate("/admin/request");
        }
      } else {
        setIsLogin(false);

        console.log("error");
      }
    } catch (error) {
      setCustomError(error?.response?.data?.message);
      setIsLogin(false);

      console.log(error.response);
    }
  };
  return (
    <>
      <div className="row py-5 bg-light px-2 logoUp">
        <h4 onClick={() => navigate("/gallery")}>Dobby Ads</h4>
      </div>
      <div className="outerSignin">
        <div className="logUpper">
          <video
            id="videoElement-1"
            src="https://fast.artivive.com/assets/uploads/2022/03/debadc9efc030d2093a265d50ccb0fd5.mp4"
            playsinline="true"
            autoplay="autoplay"
            loop="true"
            muted
            class="outerdivlogin"
          ></video>
        </div>
        <div className="outerdivlog mx-5 px-4">
          <span className="headerupperlogin">Welcome to Dobby Ads !</span>
          <form className="row m-0 p-0 g-0" onSubmit={handleSubmit}>
            <div className="emailogin my-2">
              <TextField
                error={isError}
                helperText={isError && errorMessage}
                label="Name"
                variant="filled"
                className="insidemailog w-100"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="emailogin my-2">
              <TextField
                error={isError}
                helperText={isError && emailError}
                label="Email"
                variant="filled"
                className="insidemailog w-100"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="passwordlogin my-2">
              <TextField
                error={isError}
                helperText={
                  (isError || customError) && (passwordError || customError)
                }
                id="filled-multiline-flexible"
                label="Password"
                variant="filled"
                className="insidepasslog w-100"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn m-auto btnlogin mt-4 my-2"
              disabled={isLogin}
            >
              {isLogin ? "Loading..." : "Register"}
            </button>
          </form>
          <div className="signuplog w-100">
            <span onClick={() => navigate("/login")}>
              Already Registered? Login
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
