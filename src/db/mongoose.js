const mongoose = require("mongoose");
const dotenv = require("dotenv");

const URI = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(URI, {
  useNewURLParser: true,
});
