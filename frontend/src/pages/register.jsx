import React from 'react'

const Register = () => {
  return (
    <div>
      <div>
        <h2>REGISTER</h2>
        <form action="">
          <div>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder="Enter email" name="email" className=''/>
          </div>
          <div>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder="Enter password" name="password" className=''/>
          </div>
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register;
