import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import "../stylesheets/register.css";
import "../stylesheets/errorSuccess.css";
import Logoo from "../components/Logoo.jsx";
import PasswordValidator from "password-validator";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";

const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return <Spinner loading={loading} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    // Basic validation
    if (
      !values.firstName ||
      !values.lastName ||
      !values.email ||
      !values.password ||
      !values.phoneNumber
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // First and Last Name validation of 2 letters
    if (values.firstName.length < 2 || values.lastName.length < 2) {
      setError(
        "First Name and Last Name should be at least two characters long"
      );
      setLoading(false);
      return;
    }

    // First and Last Name should be only alphabetic charaters
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(values.firstName) || !nameRegex.test(values.lastName)) {
      setError("First Name and Last Name should only contain alphabets.");
      setLoading(false);
      return;
    }

    // Email test
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      setError(
        "Invalid email format!!!. Example of valid format: user@example.com"
      );
      setLoading(false);
      return;
    }

    // Phone Number Validation
    // const phoneRegex = /^(?:\+1\s?)?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/;
    // const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/; //WORK ON PHONE FORMAT WITH libphonenumber-js on frontend and backend
    if (!phoneRegex.test(values.phoneNumber)) {
      setError(
        "Invalid Phone Number Format. Example of valid phone number format is '+1 (555) 123-4567'"
      );
      setLoading(false);
      return;
    }

    // Password validation
    const schema = new PasswordValidator();

    schema
      .is()
      .min(6) // Minimum length 6
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits() // Must have digits
      .has()
      .not()
      .spaces() // Should not have spaces
      .has()
      .symbols(); // Must have symbols

    const validatePassword = (password) => schema.validate(password);
    if (!validatePassword(values.password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one symbol, and be a minimum of 6 characters long."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`api/v1/users/register`, values); // POST values from the register form
      console.log("Response in register: ", response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        // Redirect to the specified page or to '/cart' by default
        const redirectTo = location.state?.redirectTo || "/cart";
        navigate(redirectTo);
      } else {
        setError(response.data.message || "Registration failed.");
      }

      // Clear success message after 3 seconds
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 3000);

      // Cleanup timeout on unmount
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Fetch error in Register:", error);

      // Capture error details for specific client feedback
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setValues({ ...values, password: "" }); // Clears password field
      setLoading(false); // This hides spinner after register attempt
    }
  };

  return (
    <div>
      <NavBar />
      <div className="registerContainer">
        <div className="registerDiv">
          <Logoo />
          <div className="registerHeading">
            <strong>Let's create your account.</strong>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div>
              {/* Displays error and success messages */}
              {error && <h1 className="error-message">{error}</h1>}
              {success && <h1 className="success-message">{success}</h1>}

              <label htmlFor="firstName" className="registerLabel">
                <strong>First Name: </strong>
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                name="name"
                id="firstName"
                autoComplete="on"
                className="registerInputField"
                value={values.firstName}
                onChange={(e) =>
                  setValues({ ...values, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="lastName" className="registerLabel">
                <strong>Last Name: </strong>
              </label>
              <input
                type="text"
                placeholder="Enter Last name"
                name="name"
                id="lastName"
                autoComplete="on"
                className="registerInputField"
                value={values.lastName}
                onChange={(e) =>
                  setValues({ ...values, lastName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email" className="registerLabel">
                <strong>Email: </strong>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                id="email"
                autoComplete="on"
                className="registerInputField"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="number" className="registerLabel">
                <strong>Phone Number: </strong>
              </label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                name="number"
                id="number"
                autoComplete="on"
                className="registerInputField"
                value={values.phoneNumber}
                onChange={(e) =>
                  setValues({ ...values, phoneNumber: e.target.value })
                }
              />
            </div>
            <div className="registerPasswordContainer">
              <label htmlFor="password" className="registerPasswordLabel">
                <strong>Password: </strong>
              </label>
              <div className="registerInputPasswordField">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  id="password"
                  autoComplete="on"
                  className="registerPasswordInput"
                  value={values.password} // This makes the use input remain
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="registerEyeIcon"
                >
                  {showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
                </div>
              </div>
            </div>

            <button type="submit" className="registerButton">
              Register
            </button>
          </form>

          <p className="registerLogin">
            Already have an account?
            <button onClick={() => navigate("/login")}>Login here</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
