const express = require("express");
const router = new express.Router();
const cors = require("cors");
// const User = require("../models/user");
const { signUpUser, loginUser } = require("../controllers/user");
router.use(express.json());
router.use(cors({ origin: "*" }));

// Get entire medication history (w/ optional filter)
router.post("/login", loginUser);

router.post("/signup", signUpUser);
router.post("/profile", getUserProfile);

module.exports = router;
