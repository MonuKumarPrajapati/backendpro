const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({}) this is used for creating schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "Password must be at least 5 character "],
  },
});

const user = mongoose.model('user', userSchema); //('table name- by thus entry done in db', schema tahts we create)

module.exports = user;
//this is should be required in the user.routes.js