const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");
require("./db/mongoose");
const medicationRouter = require("./routes/medicationRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
// app.use("/", (req, res) => {
//   res.status(200).send({ message: "Welcome to the Rx-Roster API" });
// });
app.use("/api/medications", medicationRouter);
app.use("/api/users", userRouter);
app.use(cors({ origin: "*" }));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
