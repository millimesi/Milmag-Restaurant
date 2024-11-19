import React, { useState } from 'react';
import axios from 'axios';
import '../stylesheets/errorSuccess.css';
import Logoo from '../components/Logoo';
import NavBar from '../components/Navbar';
import Spinner from '../components/Spinner';
import '../stylesheets/passwordReset.css';
import { useLocation, useNavigate } from 'react-router-dom';


const PasswordReset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("Location in Password Reset", location);
  const queryParams = new URLSearchParams(location.search);
  // console.log("Query Params in Password Reset", queryParams);
  const token = queryParams.get('token'); // Extract token from URL
  const [ values, setValues ] = useState({
    newPassword: "",
    confirmPassword: "",
    // resetLink: ""
  });
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);
  // const navigate = useNavigate();
  // const location = useLocation();

  axios.defaults.withCredentials = true;

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Basic validation
    if (!values.newPassword || !values.confirmPassword) {
      setError("Please fill in all fields.");
      // setLoading(false);
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
        setError("Passwords do not match. Please try again.");
        return;
    }

    setLoading(true);
    setError(null); // Reset error before new login attempt
    setSuccess(null);  // Reset success message

    try {
      const response = await axios.put(`/api/v1/users/resetPassword`, {
        newPassword: values.newPassword,
        resetLink: token,
      });
      console.log("Response", response);
      // Set success message if the request is successful
      // if (response.status === 200) {
      //   setSuccess("Your password has been reset successfully. You can now log in.");
      //   setValues({ newPassword: "", confirmPassword: "", resetLink: "" }); // Clear fields
      //   navigate("/login");
      // }
      if (response.status === 200) {
        navigate("/login", { state: { success: "Your password has been reset successfully. You can now log in." } })
      }
    } catch (error) {
      console.error("Password reset error:", error);

      // Capture error details for specific client feedback
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
        setLoading(false); // This hides spinner after login attempt
    }
  }


  if (loading) {
    return <Spinner loading={loading} />
  }

  return (
    <div className=''>
      <NavBar />
      <div className='passwordResetContainer'>
        <div className='passwordResetDiv'>
          <div className='passwordResetHeading'><strong>Forgot Password</strong></div>
          <Logoo />
          <form action='' onSubmit={handleSubmit} className="">
            <div>
              <label htmlFor="email" className="passwordResetLabel"><strong>New Password: </strong></label>
              <input
                type="password"
                placeholder="Enter new password"
                name="password"
                autoComplete="off"
                className="passwordResetInputField"
                id="newPassword"
                value={values.newPassword}
                onChange={e => setValues({...values, newPassword: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="passwordResetLabel"><strong>Confirm Password: </strong></label>
              <input
                type="password"
                placeholder="Confirm password"
                name="password"
                autoComplete="off"
                className="passwordResetInputField"
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={e => setValues({...values, confirmPassword: e.target.value})}
              />
            </div>


            {/* Display error or success messages */}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type='submit' className='passwordResetButton'><strong>Reset Password</strong></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset;
