{
  /* steps for the coustume routes file
1 -  1st step required the express from express   
2- 2nd this is for access the Router from express
3- export the router variable  

jwt token step-
install jsonwebtoken
2- require('jsonwebtoken')
3- generate a token in our route tjis nis imp bcs with the help of this user login
    */
}

const express = require("express");
const router = express.Router();
// const dotenv = require('dotenv')
// dotenv.config();

// express validator
const { body, validationResult } = require("express-validator");

const userModel = require("../models/user.model.js");

const bcrypt = require("bcrypt"); // this is used for password save in the hashing from
const jwt = require("jsonwebtoken"); // this is used for getting toekn
// router.get('/test', (req, res) => {
//   res.send('user from the test')
// })

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",

  //this is the middle ware used for checking with inbuild methods
  body("email").trim().isEmail(), // this is third party middleware
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    // this is used for real validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //this is way to send errors to frontend
      return res.status(400).json({
        errors: errors.array(),
        message: "Inavlid data",
      });
    }
    // res.send(errors)

    const { email, username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10); // this th eway to gave the password in the production

    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    res.json(newUser);

    // console.log(req.body);
    // res.send('user register')
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

//login
router.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array(),
          message: "Invalid data",
        });
      }

      const { username, password } = req.body;

      // Find user in the database
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(400).json({
          message: "Username or password is incorrect",
        });
      }

      // Compare provided password with stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Username or password is incorrect",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        // { expiresIn: "1h" } // Optional: Set token expiration
      );

      // Respond with the token with the help of cookie accept two parameter ('name', token)
      res.cookie('token', token);
      res.send('Logged In')
    } catch (err) {
      console.error("Error in login route:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// final step to export router variable
module.exports = router;
