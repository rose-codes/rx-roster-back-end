const express = require("express");
const router = new express.Router();
const cors = require("cors");

const {
  signUpUser,
  loginUser,
  getUserProfile,
} = require("../controllers/user");

router.use(express.json());
router.use(cors({ origin: "*" }));

const { protect } = require("../middleware/authMiddleware");

// Get entire medication history (w/ optional filter)
router.post("/login", loginUser);

router.post("/signup", signUpUser);
router.post("/profile", protect, getUserProfile);

module.exports = router;
