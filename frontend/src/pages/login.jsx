import React, { useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useLocation } from "react-router-dom";
import "../stylesheets/login.css";
import "../stylesheets/errorSuccess.css";
import Logoo from "../components/Logoo";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [ loading, setLoading ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!values.email || !values.password) {
      toast.error("All fields are required.")
      return;
    }

    // Email test
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      toast.error("Invalid email format. Example of valid email format: user@example.com");
      return;
    }

    try {
      const response = await axios.post(`/api/v1/users/login`, values); // Post email and password. It uses proxy in package.json.
      // console.log("response.data.status", response.data.status);
      // console.log("Response in login frontend: ", response);
      // console.log("Response.data in login frontend: ", response.data);
      if (response.status === 200) {
        // Store token in local storage to persist login status
        localStorage.setItem("token", response.data.token);
        // toast.success("Login Successful");

        toast.success("Login Successful", { // Need to still work on this, user should get notified synchronous to navigating to cart
          autoClose: 1000,
          onClose: () => {
            const redirectTo = location.state?.redirectTo || "/cart";
            navigate(redirectTo);
          },
        });

        // Redirect to the specified page or to '/cart' by default
        // const redirectTo = location.state?.redirectTo || "/cart";
        // navigate(redirectTo);
        // toast.success("Login Successful");
      } else {
        toast.error(response.data.message || "Login Attempt Failed");
      }
    } catch (error) {
      console.error("Fetch error in login:", error);

      // Capture error details for specific client feedback
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // This hides spinner after login attempt
    }
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="">
      <NavBar />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick={true} pauseOnHover={true} draggable={true} />
      <div className='loginContainer'>
        <div className='loginDiv'>
          <Logoo />
          <div className="loginHeading">
            <strong>Log into your account.</strong>
          </div>
          <form action="" onSubmit={handleSubmit} className=''>
            <div className=''>
              <label htmlFor="email" className='loginLabel'><strong>Email: </strong></label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                autoComplete="on"
                className="loginInputField"
                id="email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="loginPasswordContainer">
              <label htmlFor="password" className="loginPasswordLabel">
                <strong>Password: </strong>
              </label>
              <div className="loginInputPasswordField">
                <input
                  type={showPassword ? "text" : "password"} // Controls Password Visibility
                  placeholder="Enter password"
                  name="password"
                  autoComplete="on"
                  id="password"
                  className="loginPasswordInput"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="loginEyeIcon"
                >
                  {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
                </div>
              </div>
            </div>

            <button type="submit" className="loginButton">
              <strong>LOGIN</strong>
            </button>
          </form>

          <p className="loginRegister">
            Don't have an account?
            <button onClick={() => navigate("/register")}>Register here</button>
          </p>

          <p className="loginForgotPassword">
            <button onClick={() => navigate("/forgotPassword")}>
              Forgot Password?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
