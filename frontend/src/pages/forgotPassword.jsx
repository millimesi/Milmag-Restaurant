import React, { useState } from 'react';
import axios from 'axios';
import '../stylesheets/errorSuccess.css';
import Logoo from '../components/Logoo';
import NavBar from '../components/Navbar';
import Spinner from '../components/Spinner';
import '../stylesheets/forgotPassword.css';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
  const [ values, setValues ] = useState({
    email: ""
  });
  const [ loading, setLoading ] = useState(false);

  axios.defaults.withCredentials = true;

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Basic validation
    if (!values.email) {
      toast.error("Please put in your email");
      return;
    }

    // Email test
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      toast.error("Please provide your email.");
      return;
    }
    try {
      const response = await axios.put(`/api/v1/users/forgotPassword`, values);
      console.log("response in forgotPassword", response);

      // Set success message if the request is successful
      if (response.status === 200) {
        console.log("response.status in forgotPassword", response.status);
        toast.success("Password reset instructions have been sent to your email.");
      }

    } catch (error) {
      console.error('Fetch error in forgot password:', error);

      // Capture error details for specific client feedback
      // if (error.response && error.response.data  && error.response.data.message) {
      //   setError(error.response.data.message);
      // } else {
      //   setError("An error occurred. Please try again later.");
      // }

      // Display error toast for specific feedback
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again later.";
      toast.error(errorMessage);
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
      <ToastContainer position="top-right" autoClose={4000} closeOnClick={true} pauseOnHover={true} draggable={true}/>
      <div className='forgotPasswordContainer'>
        <div className='forgotPasswordDiv'>
          <div className='forgotPasswordHeading'><strong>Forgot Password</strong></div>
          <Logoo />
          <form action='' onSubmit={handleSubmit} className="">
            <div>
              <label htmlFor="email" className="forgotPasswordLabel"><strong>Email: </strong></label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                autoComplete="on"
                className="forgotPasswordInputField"
                id="email"
                value={values.email}
                onChange={e => setValues({...values, email: e.target.value})}
              />
            </div>

            <button type='submit' className='forgotPasswordButton'><strong>SUBMIT</strong></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;
