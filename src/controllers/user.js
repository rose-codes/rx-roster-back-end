const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// @desc: Adds a new user
// @route: /api/users/signup
// @access: Public
const signUpUser = async (req, res) => {
  const { firstName, surname, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    surname,
    email,
    password: hashedPass,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid user data");
  }
};

// @desc: Login a user
// @route: /api/users/login
// @access: Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send("Invalid credentials");
  }
};

// @desc: Login a user
// @route: /api/users/login
// @access: Public
const getUserProfile = async (req, res) => {};

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { signUpUser, loginUser, getUserProfile };
