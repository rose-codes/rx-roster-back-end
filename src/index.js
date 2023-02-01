const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");
require("./db/mongoose");
const medicationRouter = require("./routes/medicationRoutes");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(medicationRouter);
app.use(cors());

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
