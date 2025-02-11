// user controllers functions

import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import PasswordValidator from 'password-validator';
import nodemailer from 'nodemailer';

// Configuration for nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  }
});

export const register = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    // Check if token already exists, indicating the user is logged in
    // const existingToken = req.cookies.token || req.headers['authorization'];
    // if (existingToken) {
    //   try {
    //     // Verify the existing token
    //     const decoded = jwt.verify(existingToken, process.env.JWTSECRET);
        
    //     // If token is valid, return a message saying user is already logged in
    //     return res.status(200).json({ message: "You are already logged in" }); // Message used in the frontend for login authetication (login.jsx)
    //   } catch (error) {
    //     // If token is invalid or expired, continue with login
    //     console.log("Existing token is invalid or expired. Proceeding with login...");
    //   }
    // }

    // Basic checks for empty fields
    if (!(firstName && lastName && phoneNumber && email && password)) {
        return res.status(400).json({ message: "All fields(firstName, lastName, phoneNumber, email, password) are compulsory"});
    }

    // First and Last Name validation of 2 letters
    if (firstName.length < 2 || lastName.length < 2) {
        return res.status(400).json({ message: "firstName and lastName should be at least two characters long" });
    }

    // First and Last Name should be only alphabetic charaters
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        return res.status(400).json({ message: "firstName and lastName should only contain alphabets." });
    }

    // Email test
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format!!!. Example of valid format: user@example.com" })
    }

    // Phone Number Validation
    // const phoneRegex = /^(?:\+1\s?)?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/;
    // const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/; //WORK ON PHONE FORMAT WITH libphonenumber-js on frontend and backend
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: "Invalid Phone Number Format. Example of valid phone number format is '+1 (555) 123-4567'" });
    }

    // const existingUser = await User.findOne({ where: { email: req.body.email } });
    // if (existingUser) {
    //   return res.status(400).json({ status: "error", message: "Email already in use" });
    // }

    // Password validation
    const schema = new PasswordValidator();

    schema
      .is().min(6) // Minimum length 6
      .has().uppercase() // Must have uppercase letters
      .has().lowercase() // Must have lowercase letters
      .has().digits() // Must have digits
      .has().not().spaces() // Should not have spaces
      .has().symbols() // Must have symbols

    const validatePassword = (password) => schema.validate(password);
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        message: "Password validation failed. Password must contain at least one uppercase letter, one lowercase letter, one digit, one symbol, and be a minimum of 6 characters long."
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 8);
    if (!encryptedPassword) {
      return res.status(500).json({ message: "Could not encrypt password" });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      phoneNumber,
      isAdmin: false,
    });

    const token = jwt.sign(
      { id: newUser.id, email, isAdmin: newUser.isAdmin },
      process.env.JWTSECRET,
      { expiresIn: '7d' }
    );
    if (!token) {
      return res.status(400).json({message: "Error generating token"});
    }

    newUser.token = token;
    await newUser.save();

    newUser.password = undefined;

    // when a new user registers, they will automatically receive a token in their cookies,
    // allowing them to be authenticated without needing to log in immediately afterward.
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    // Sanitized User details for frontend usage
    const safeUser = {
      id: newUser.id,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    }

    return res.status(201).cookie("token", token, options).json({
      status: "success",
      token,
      safeUser
    }); // newUser
  } catch (error) {
    console.error("Registration error: ", error);
    // Specific error handling for unique constraint violations
    // if (error.name === 'SequelizeUniqueConstraintError') {
    //   return res.status(400).json({ message: "Email already exists." });
    // }
    // res.status(500).json({ error: error.message, message: "Server error. Please try again later." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if token already exists, indicating the user is logged in
    // const existingToken = req.cookies.token || req.headers['authorization'];
    // if (existingToken) {
    //   try {
    //     // Verify the existing token
    //     const decoded = jwt.verify(existingToken, process.env.JWTSECRET);
        
    //     // If token is valid, return a message saying user is already logged in
    //     return res.status(200).json({ message: "You are already logged in" });
    //   } catch (error) {
    //     // If token is invalid or expired, continue with login
    //     console.log("Existing token is invalid or expired. Proceeding with login...");
    //   }
    // }

    // Get all fields
    if (!(email && password)) {
      return res.status(400).json({ message: "All fields(email and password) are compulsory!!!" });
    }

    // Email test
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format!!!. Example of valid format: user@example.com" })
    }

    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" }); // "User with this email does not exist"
    }

    if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
      const token = jwt.sign(
        { id: existingUser.id, email: existingUser.email, isAdmin: existingUser.isAdmin },
        process.env.JWTSECRET,
        { expiresIn: '7d' }
      );

      existingUser.token = token;
      await existingUser.save();

      existingUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        // httpOnly: true, RE-ADD IT AFTER DELETING LOGOUT BUTTON IN FRONTEND
        secure: process.env.NODE_ENV === 'development',
      };

      // Sanitized User details for frontend usage
      const safeUser = {
        id: existingUser.id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin
      }
      // console.log("safeUser in Login: ", safeUser);
      return res.status(200).cookie("token", token, options).json({
          status: "success",
          token,
          user: safeUser
      }); // user: existingUser
    } else {
      return res.status(400).json({ message: "Invalid email or password" }); // "Invalid password"
    }
  } catch (error) {
    console.error('Login error: ', error);
    return res.status(400).json({ error: error.message });
  }
};

// Method to get all users
export const allUsers = async (req, res) => {
  // Get page and size from query params, with defaults
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const size = parseInt(req.query.size) || 10; // Default to 10 user record per page
  const offset = (page - 1) * size; // specifies where to start the records based on the current page.

  try {
    const { count, rows: users } = await User.findAndCountAll({
      attributes: { exclude: ['password'] }, // Excluded the password from the result
      limit: size,
      offset,
      order: [['createdAt', 'DESC']], // Optional: order by creation date
    });

    if (count === 0) {
      return res.status(404).json({ error: 'No User record found.' });
    }

    // Calculate total pages
    const totalPages = Math.ceil(count / size);

    res.status(200).json({
      message: "All Users",
      users,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user with email
export const AUser = async(req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({message: 'User details', user});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch a user', error: error.message });
  }
};

export const forgotPassword = async(req, res) => {
  const {email} = req.body;

  try {
    if (!email) {
      return res.status(400).json({message: 'Email is required.'});
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({message: `${email} not found`});
    }

    const token = jwt.sign(
      { id: user.id, email, isAdmin: user.isAdmin },
      process.env.RESET_PASSWORD_KEY,
      { expiresIn: '5m' }
    );
    if (!token) {
      res.status(400).json({message: "Error generating token"});
    }

    // Update user's reset link
    await User.update(
      {resetLink: token},
      { where: {id: user.id}},
    );

    const mailOption = {
      // from: `"Milmag Restaurant" <${process.env.GMAIL_USER}`,
      // from: 'noreply@milmagrestaurant.com',
      to: email,
      subject: 'Milmag Password Reset',
      html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #333;">Reset Your Milmag Password</h2>
                <p>You requested to reset your password.Click the following link to reset your Milmag password:</p>
                <p><a href="http://localhost:${process.env.PORT}/api/v1/users/resetPassword/${token}" target="_blank">Reset Your Password</a></p>
                <p>The link expires in 5 minutes. If you did not request this, please contact our customer support immediately.</p>
                <br />
                <p style="font-size: 12px; color: #999;">
                  Thank you,<br />
                  The Milmag Team
                </p>
              </div>
            `
    }

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to send email' });
      }
      return res.json({
        status: "success",
        message: 'An email has been sent to your inbox. Kindly follow the instructions.' });
    });
  } catch (error) {
    console.error({error: error.message});
    return res.status(500).json({message: 'Error in forgotPassword', error: error.message});
  }
};

// Method to resetPassword from email.
export const resetPassword = async (req, res) => {
  const { resetLink, newPassword } = req.body;
  // console.log("req.body in userController", req.body);
  // console.log("ResetLink in userController", resetLink);
  // console.log("newPassowrd in userController", newPassword);
  if (!resetLink || !newPassword) {
    return res.status(400).json({ error: 'Reset link and new password are required.' });
  }
  try {
    const decodedData = jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY);
    if (!decodedData) {
      return res.status(400).json({message: "Unable to verify"})
    }

    const user = await User.findOne({ where: { resetLink } });
    if (!user) {
      return res.status(401).json({ error: 'User with this token does not exist' });
    }

    // Password validations
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(401).json({ error: 'New password should contain at least one letter and one number, and be at least 4 characters long' });
    }

    // Encrypt the new password
    const encyptedPwd = await bcrypt.hash(newPassword, 10);
    if (!encyptedPwd) {
      return res.status(500).json({error: 'Could not encrypt password'});
    }

    // Update user password and clear reset link
    user.password = encyptedPwd;
    user.resetLink = null;

    // save user new informations
    await user.save();

    // Remove the password field from the response
    user.password = undefined;

    return res.status(200).json({ message: 'Your password has been updated successfully. Please log in with your new password.' });
  } catch (error) {
    console.error({error: error.message});
    res.status(401).json({ error: 'Token has expired or is invalid. Please request a new password reset link.' });
  }
};

// Route to redirect user to password reset form on the frontend
// export const resetPasswordToken = async(req, res) => {
//   const { token } = req.params;

//   // Redirect to the frontend with the token included in the query string
//   const frontendUrl = `http://localhost:${process.env.FRONTENDPORT}/passwordReset?token=${token}`;
//   return res.redirect(frontendUrl);
// }

// Route to redirect user to password reset form on the frontend
export const resetPasswordToken = async(req, res) => {
  const { token } = req.params;
  // console.log("Token in resetPasswordToken", token);

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Optional: Validate the token before redirecting (e.g., using JWT verify)
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
    // console.log("Decoded in backend resetPasswordToken: ", decoded);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Redirect to frontend with token
    const frontendUrl = `http://localhost:${process.env.FRONTENDPORT || 4000}/passwordReset?token=${token}`;
    return res.redirect(frontendUrl);
  } catch (error) {
    console.error("Token error:", error.message);
    return res.status(401).json({ message: 'Token has expired or is invalid' });
  }
};
