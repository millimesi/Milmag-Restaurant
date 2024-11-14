import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useLocation } from 'react-router-dom';
import '../stylesheets/login.css';
import '../stylesheets/errorSuccess.css';

const Login = () => {
  const [ values, setValues ] = useState({
    email: "",
    password: "",
  });
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.withCredentials = true;

  const handleSubmit = async(e) => {
    e.preventDefault();

     // Basic validation
    if (!values.email || !values.password) {
      setError("All fields are required.");
      // setLoading(false);
      return;
    }

    setLoading(true);
    setError(null); // Reset error before new login attempt
    setSuccess(null);  // Reset success message
    try {
      const response = await axios.post(`/api/v1/users/login`, values); // Post email and password. It uses proxy in package.json.

      if (response.data.status === 'success') {
        // Store token in local storage to persist login status
        localStorage.setItem("token", response.data.token);

        // Redirect to the specified page or to '/cart' by default
        const redirectTo = location.state?.redirectTo || '/cart';
        navigate(redirectTo);
      } else {
        setError(response.data.message || "Login Attempt Failed"); // Show error message
      }

      // Clears success message after 3 secs
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error('Fetch error in login:', error);

      // Capture error details for specific client feedback
      if (error.response && error.response.data) {
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
      <div className='loginContainer'>
        <div className='loginDiv'>
          <h3 className='loginHeading'>LOGIN</h3>
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
                onChange={e => setValues({...values, email: e.target.value})}
              />
            </div>
            <div className=''>
              <label htmlFor="password" className='loginLabel'><strong>Password: </strong></label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                autoComplete="on"
                id="password"
                className="loginInputField"
                value={values.password}
                onChange={e => setValues({...values, password: e.target.value})}
              />
            </div>

            {/* Display error or success messages */}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type='submit' className='loginButton'>Login</button>

          </form>

          <p className='loginRegister'>
            Don't have an account?
            <button onClick={() => navigate('/register')}>Register here</button>
          </p>

          <p className='loginForgotPassword'>
            <button>Forgot Password?</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;
