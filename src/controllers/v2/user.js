const { dynamoClient } = require("../../db/dynamo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const tableName = "rx-roster-users";

// @desc: Adds a new user
// @route: /api/users/signup
// @access: Public
const signUpUser = async (req, res) => {
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
  const checkPass = await bcrypt.compare(password, hashedPass);
  console.log(checkPass);
  const userId = crypto.randomUUID();
  const transactItems = {
    TransactItems: [
      {
        Put: {
          TableName: tableName,
          Item: {
            PK: "USER#" + userId,
            userId,
            email,
            password: hashedPass,
            firstName,
            surname,
          },
          ConditionExpression: "attribute_not_exists(PK)",
        },
      },
      {
        Put: {
          TableName: tableName,
          Item: {
            PK: "EMAIL#" + email,
            userId,
            email,
            password: hashedPass,
            firstName,
            surname,
          },
          ConditionExpression: "attribute_not_exists(PK)",
        },
      },
    ],
  };
  dynamoClient
    .transactWrite(transactItems)
    .promise()
    .then((user) => {
      const userBody = user.Item;
      res.status(201).json({
        id: userBody.userId,
        firstName: userBody.firstName,
        surname: userBody.surname,
        email: userBody.email,
        token: generateToken(userBody.userId),
      });
    })
    .catch((err) => {
      res.status(400).send("An account with this email already exists.");
    });
};

// @desc: Login a user
// @route: /api/users/login
// @access: Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await dynamoClient
      .get({
        TableName: tableName,
        Key: {
          PK: "EMAIL#" + email,
        },
      })
      .promise();
    if (user) {
      const userBody = user.Item;
      try {
        const isCorrectPass = await bcrypt.compare(password, userBody.password);
        if (isCorrectPass) {
          res.status(200).json({
            userId: userBody.userId,
            firstName: userBody.firstName,
            surname: userBody.surname,
            email: userBody.email,
            token: generateToken(userBody.userId),
          });
        }
      } catch {
        res.status(401).send("Invalid credentials");
      }
    }
  } catch {
    res.status(401).send("Cannot get user");
  }
};

// @desc: Login a user
// @route: /api/users/profile
// @access: Private
const getUserProfile = async (req, res) => {
  res.send("profile");
};

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { signUpUser, loginUser, getUserProfile };
