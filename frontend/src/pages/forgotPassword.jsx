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
  // const [ error, setError ] = useState(null);
  // const [ success, setSuccess ] = useState(null);
  // const navigate = useNavigate();
  // const location = useLocation();

  axios.defaults.withCredentials = true;

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Basic validation
    if (!values.email) {
      toast.error("Please put in your email");
      // setError("Please put in your email");
      // setLoading(false);
      return;
    }

    // Email test
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      toast.error("Please provide your email.");
      // setError("Invalid email format!!!. Example of valid format: user@example.com");
      // setLoading(false);
      return;
    }

    // setLoading(true);
    // setError(null); // Reset error before new login attempt
    // setSuccess(null);  // Reset success message

    try {
      const response = await axios.put(`/api/v1/users/forgotPassword`, values);
      // Set success message if the request is successful
      if (response.status === 200) {
        // setSuccess("Password reset instructions have been sent to your email. Kindly follow the instructions.");
        // console.log("response.status in forgotPassword: ", response);
        toast.success("Password reset instructions have been sent to your email.");
      }

      // Clear success message after 3 seconds
      // const timer = setTimeout(() => {
      //   setSuccess(null);
      // }, 9000);

      // Cleanup timeout on unmount
      // return () => clearTimeout(timer);
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

            {/* Display error or success messages */}
            {/* {error && <div className="error-message">{error}</div>} */}
            {/* {success && <div className="success-message">{success}</div>} */}

            <button type='submit' className='forgotPasswordButton'><strong>SUBMIT</strong></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;
