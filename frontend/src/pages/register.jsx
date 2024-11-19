import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';
import '../stylesheets/register.css';
import '../stylesheets/errorSuccess.css';
import Logoo from '../components/Logoo.jsx';

const Register = () => {
  const [ values, setValues ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: ""
  });
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return <Spinner loading={loading} />
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    // Basic validation
    if (!values.firstName || !values.lastName || !values.email || !values.password || !values.phoneNumber) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`api/v1/users/register`, values); // POST values from the register form
      console.log("Response: ",response.data);
      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.token);

        // Redirect to the specified page or to '/cart' by default
        const redirectTo = location.state?.redirectTo || '/cart';
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
      console.error('Fetch error in Register:', error);
      
      // Capture error details for specific client feedback
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // This hides spinner after register attempt
    }
  }

  return (
    <div>
      <NavBar />
      <div className='registerContainer'>
        <div className='registerDiv'>
          <Logoo />
          <div className='registerHeading'><strong>Let's create your account.</strong></div>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className='registerLabel'><strong>First Name: </strong></label>
              <input
                type="text"
                placeholder="Enter First Name"
                name="name"
                id="firstName"
                autoComplete="on"
                className="registerInputField"
                value={values.firstName}
                onChange={e => setValues({...values, firstName: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="lastName" className='registerLabel'><strong>Last Name: </strong></label>
              <input
                type="text"
                placeholder="Enter Last name"
                name="name"
                id="lastName"
                autoComplete="on"
                className="registerInputField"
                value={values.lastName}
                onChange={e => setValues({...values, lastName: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="email" className='registerLabel'><strong>Email: </strong></label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                id="email"
                autoComplete="on"
                className="registerInputField"
                value={values.email}
                onChange={e => setValues({...values, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="number" className='registerLabel'><strong>Phone Number: </strong></label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                name="number"
                id="number"
                autoComplete="on"
                className="registerInputField"
                value={values.phoneNumber}
                onChange={e => setValues({...values, phoneNumber: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className='registerLabel'><strong>Password: </strong></label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                id="password"
                autoComplete="on"
                className="registerInputField"
                value={values.password} // This makes the use input remain
                onChange={e => setValues({...values, password: e.target.value})}
              />
            </div>

            {/* Displays error and success messages */}
            { error && <h1 className='error-message'>{error}</h1> }
            { success && <h1 className='success-message'>{success}</h1> }

            <button type='submit' className="registerButton">Register</button>

          </form>

          <p className='registerLogin'>
            Already have an account?
            <button onClick={() => navigate('/login')}>Login here</button>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register;
