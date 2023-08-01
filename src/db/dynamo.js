const dotenv = require("dotenv").config();

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-1",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports = { dynamoClient };
