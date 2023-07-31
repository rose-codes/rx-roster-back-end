// const dbClient = require("@aws-sdk/client-dynamodb");
const dotenv = require("dotenv").config();
// const dbLib = require("@aws-sdk/lib-dynamodb");
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// const client = new dbClient.DynamoDBClient({
//   region: "us-west-1",
//   credentials: {
//     SecretAccessKey: process.env.AWS_SECRET_KEY,
//     AccessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   },
// });
// const docClient = dbLib.DynamoDBDocumentClient.from(client);

// module.exports = { client, docClient };

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-1",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
});

// AWS.config.getCredentials(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Access Key:", AWS.config.credentials);
//   }
// });
const dynamodb = new AWS.DynamoDB();
const dynamoClient = new AWS.DynamoDB.DocumentClient();

// dynamodb.describeTable(
//   {
//     TableName: "Users",
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err.__type);
//     } else {
//       console.log(JSON.stringify(data, null, 2));
//     }
//   }
// );

module.exports = { dynamoClient };
