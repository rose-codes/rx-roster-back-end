const { dynamoClient } = require("../../db/dynamo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
const tableName = "Users";

// @desc: Adds a new user
// @route: /api/users/signup
// @access: Public
const signUpUser = async (req, res) => {
  console.log("handler called!");
  const { firstName, surname, email, password } = req.body;

  if (!email || !password || !firstName || !surname) {
    return console.log("All fields must be valid");
  }
  if (!validator.isEmail(email)) {
    return console.log("email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    return console.log("Password is not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  const uuid = uuidv4();
  const createdUser = dynamoClient
    .put({
      TableName: tableName,
      Item: {
        id: uuid,
        email,
        password: hashedPass,
        firstName,
        surname,
      },
    })
    .promise();
  createdUser
    .then((user) => {
      console.log("user:", user);
      res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        surname: user.surname,
        email: user.email,
        token: generateToken(user._id),
      });
    })
    .catch((err) => {
      console.log(err.__type);
      res.status(400).send(err);
    });
};

// @desc: Login a user
// @route: /api/users/login
// @access: Public
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const getCommand = new dynamoDBMethods.GetCommand({
//     TableName: tableName,
//     Key: {
//       email,
//       password,
//     },
//   });
//   const user = await docClient.send(getCommand);
//   // const user = await User.findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.status(200).json({
//       _id: user._id,
//       firstName: user.firstName,
//       surname: user.surname,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401).send("Invalid credentials");
//   }
// };

// // @desc: Login a user
// // @route: /api/users/profile
// // @access: Private
// const getUserProfile = async (req, res) => {
//   res.send("profile");
// };

// const generateToken = (_id) => {
//   return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// module.exports = { signUpUser, loginUser, getUserProfile };
module.exports = { signUpUser };
