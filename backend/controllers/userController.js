// user controllers functions

import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import PasswordValidator from 'password-validator';

export const register = async (req, res) => {
  try {
    const { id, firstName, lastName, phoneNumber, email, password } = req.body;

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
    const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: "Invalid Phone Number Format. Example of valid phone number format is '+1 (555) 123-4567'" });
    }

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
      return res.status(400).json({ message: "Password validation failed" });
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
      res.status(400).json({message: "Error generating token"});
    }

    newUser.token = token;
    await newUser.save();

    newUser.password = undefined;

    // when a new user registers, they will automatically receive a token in their cookies,
    // allowing them to be authenticated without needing to log in immediately afterward.
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Registration error: ", error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get all fields
    if (!(email && password)) {
      res.status(400).json({ message: "All fields(email and password) are compulsory!!!" });
    }

    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!existingUser) {
      res.status(400).json({ message: "Invalid email or password" }); // "User with this email does not exist"
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
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true 
      };
      res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'development',
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      });
      res.status(200).cookie("token", token, options).json({
          success: true, token, user: existingUser
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" }); // "Invalid password"
    }
  } catch (error) {
    console.error('Login error: ', error);
        res.status(400).json({ error: error.message });
  }
};
