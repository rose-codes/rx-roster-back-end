const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select("_id");
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
