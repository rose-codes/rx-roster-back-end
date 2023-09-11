const jwt = require("jsonwebtoken");
const { dynamoClient } = require("../db/dynamo");
const usersTable = "rx-roster-users";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //console.log("authToken:", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log("authDecoded:", decoded);
      const user = await dynamoClient
        .get({
          TableName: usersTable,
          Key: {
            PK: "USER#" + decoded._id,
          },
        })
        .promise();
      console.log("authUser:", user);
      req.user = user.Item;
      next();
    } catch (err) {
      console.log("error inside auth", err);
      res.status(401);
      res.send(err);
    }

    if (!token) {
      res.status(401).send(err);
    }
  }
};

module.exports = protect;
